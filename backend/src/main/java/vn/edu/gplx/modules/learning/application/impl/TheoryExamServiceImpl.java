package vn.edu.gplx.modules.learning.application.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.learning.api.dto.AnswerResponse;
import vn.edu.gplx.modules.learning.api.dto.ExamQuestionOptionResponse;
import vn.edu.gplx.modules.learning.api.dto.ExamQuestionResponse;
import vn.edu.gplx.modules.learning.api.dto.ExamResultResponse;
import vn.edu.gplx.modules.learning.api.dto.ExamSubmitRequest;
import vn.edu.gplx.modules.learning.api.dto.MockExamResultResponse;
import vn.edu.gplx.modules.learning.api.dto.MockExamSessionResponse;
import vn.edu.gplx.modules.learning.api.dto.MockExamSummaryResponse;
import vn.edu.gplx.modules.learning.api.dto.QuestionResponse;
import vn.edu.gplx.modules.learning.api.dto.StartMockExamRequest;
import vn.edu.gplx.modules.learning.api.dto.StudyAnswerOptionResponse;
import vn.edu.gplx.modules.learning.api.dto.SubmitMockExamRequest;
import vn.edu.gplx.modules.learning.application.TheoryExamService;
import vn.edu.gplx.modules.learning.domain.ExamConfiguration;
import vn.edu.gplx.modules.learning.domain.MockExamSession;
import vn.edu.gplx.modules.learning.domain.MockExamSessionAnswer;
import vn.edu.gplx.modules.learning.domain.TheoryAnswer;
import vn.edu.gplx.modules.learning.domain.TheoryQuestion;
import vn.edu.gplx.modules.learning.infrastructure.ExamConfigurationRepository;
import vn.edu.gplx.modules.learning.infrastructure.MockExamSessionAnswerRepository;
import vn.edu.gplx.modules.learning.infrastructure.MockExamSessionRepository;
import vn.edu.gplx.modules.learning.infrastructure.TheoryQuestionRepository;
import vn.edu.gplx.shared.exception.BadRequestException;
import vn.edu.gplx.shared.exception.ResourceNotFoundException;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
@Transactional
public class TheoryExamServiceImpl implements TheoryExamService {

    private static final Logger log = LoggerFactory.getLogger(TheoryExamServiceImpl.class);

    private final TheoryQuestionRepository questionRepository;
    private final ExamConfigurationRepository configRepository;
    private final MockExamSessionRepository examSessionRepository;
    private final MockExamSessionAnswerRepository sessionAnswerRepository;

    public TheoryExamServiceImpl(TheoryQuestionRepository questionRepository,
                                 ExamConfigurationRepository configRepository,
                                 MockExamSessionRepository examSessionRepository,
                                 MockExamSessionAnswerRepository sessionAnswerRepository) {
        this.questionRepository = questionRepository;
        this.configRepository = configRepository;
        this.examSessionRepository = examSessionRepository;
        this.sessionAnswerRepository = sessionAnswerRepository;
    }

    // -------------------------------------------------------------------------
    // BẢO MẬT & CHUẨN HÓA THI THỬ LÝ THUYẾT THEO HẠNG GPLX
    // -------------------------------------------------------------------------

    @Override
    public MockExamSessionResponse startMockExam(Long userId, StartMockExamRequest request) {
        String category = request.categoryCode().toUpperCase();
        ExamConfiguration config = configRepository.findByCategoryCodeAndActiveTrue(category)
                .orElseGet(() -> {
                    // Fallback cấu hình mặc định
                    return new ExamConfiguration(category, 30, 20, 27, "DEFAULT", true, "Quy chế chung");
                });

        // Lấy danh sách câu hỏi phù hợp với hạng thi
        List<TheoryQuestion> eligibleQuestions = questionRepository.findForLicenseCategory(category);
        if (eligibleQuestions.isEmpty()) {
            eligibleQuestions = questionRepository.findAll();
        }

        // Đảm bảo có ít nhất 1 câu hỏi điểm liệt
        List<TheoryQuestion> paralysisQuestions = eligibleQuestions.stream().filter(TheoryQuestion::isParalysis).toList();
        List<TheoryQuestion> normalQuestions = eligibleQuestions.stream().filter(q -> !q.isParalysis()).toList();

        List<TheoryQuestion> selected = new ArrayList<>();
        if (!paralysisQuestions.isEmpty()) {
            List<TheoryQuestion> shuffledParalysis = new ArrayList<>(paralysisQuestions);
            Collections.shuffle(shuffledParalysis);
            selected.add(shuffledParalysis.get(0)); // Thêm 1 câu điểm liệt bắt buộc
        }

        List<TheoryQuestion> shuffledNormal = new ArrayList<>(normalQuestions);
        Collections.shuffle(shuffledNormal);

        int remainingCount = config.getTotalQuestions() - selected.size();
        for (int i = 0; i < Math.min(remainingCount, shuffledNormal.size()); i++) {
            selected.add(shuffledNormal.get(i));
        }

        // Đảo ngẫu nhiên lại danh sách câu hỏi trong đề
        Collections.shuffle(selected);

        // Tạo phiên thi trong cơ sở dữ liệu
        String sessionCode = "EXAM-" + UUID.randomUUID().toString().substring(0, 12).toUpperCase();
        MockExamSession session = new MockExamSession(
                sessionCode,
                userId,
                category,
                config.getId() != null ? config : null,
                selected.size(),
                config.getDurationMinutes(),
                config.getPassingScore()
        );
        session = examSessionRepository.save(session);

        // Lưu câu hỏi vào session answers với thứ tự làm bài
        List<MockExamSessionAnswer> sessionAnswers = new ArrayList<>();
        List<ExamQuestionResponse> clientQuestions = new ArrayList<>();

        for (int i = 0; i < selected.size(); i++) {
            TheoryQuestion q = selected.get(i);
            MockExamSessionAnswer sa = new MockExamSessionAnswer(session, q, i + 1);
            sessionAnswers.add(sa);

            // BẢO MẬT: Trả về client không có isCorrect
            List<ExamQuestionOptionResponse> options = q.getAnswers().stream()
                    .map(a -> new ExamQuestionOptionResponse(a.getId(), a.getAnswerText(), a.getOrderIndex()))
                    .toList();

            clientQuestions.add(new ExamQuestionResponse(
                    q.getId(),
                    i + 1,
                    q.getQuestionNumber(),
                    q.getContent(),
                    q.getImageUrl(),
                    q.isParalysis(),
                    options
            ));
        }
        sessionAnswerRepository.saveAll(sessionAnswers);

        long remainingSeconds = (long) session.getDurationMinutes() * 60;
        return new MockExamSessionResponse(
                session.getSessionCode(),
                session.getCategoryCode(),
                session.getTotalQuestions(),
                session.getDurationMinutes(),
                session.getPassingScore(),
                session.getStartedAt(),
                remainingSeconds,
                clientQuestions
        );
    }

    @Override
    @Transactional(readOnly = true)
    public MockExamSessionResponse getMockExamSession(String sessionCode, Long userId) {
        MockExamSession session = examSessionRepository.findBySessionCode(sessionCode)
                .orElseThrow(() -> new ResourceNotFoundException("MockExamSession", "sessionCode", sessionCode));

        if (!session.getUserId().equals(userId)) {
            throw new BadRequestException("Bạn không có quyền truy cập đề thi này");
        }

        List<MockExamSessionAnswer> answers = sessionAnswerRepository.findByMockExamIdOrderByOrderIndexAsc(session.getId());
        List<ExamQuestionResponse> clientQuestions = answers.stream().map(sa -> {
            TheoryQuestion q = sa.getQuestion();
            List<ExamQuestionOptionResponse> options = q.getAnswers().stream()
                    .map(a -> new ExamQuestionOptionResponse(a.getId(), a.getAnswerText(), a.getOrderIndex()))
                    .toList();
            return new ExamQuestionResponse(
                    q.getId(),
                    sa.getOrderIndex(),
                    q.getQuestionNumber(),
                    q.getContent(),
                    q.getImageUrl(),
                    q.isParalysis(),
                    options
            );
        }).toList();

        long elapsedSeconds = Duration.between(session.getStartedAt(), Instant.now()).getSeconds();
        long totalSeconds = (long) session.getDurationMinutes() * 60;
        long remainingSeconds = Math.max(0, totalSeconds - elapsedSeconds);

        return new MockExamSessionResponse(
                session.getSessionCode(),
                session.getCategoryCode(),
                session.getTotalQuestions(),
                session.getDurationMinutes(),
                session.getPassingScore(),
                session.getStartedAt(),
                remainingSeconds,
                clientQuestions
        );
    }

    @Override
    public MockExamResultResponse submitMockExamSession(String sessionCode, Long userId, SubmitMockExamRequest request) {
        MockExamSession session = examSessionRepository.findBySessionCode(sessionCode)
                .orElseThrow(() -> new ResourceNotFoundException("MockExamSession", "sessionCode", sessionCode));

        if (!session.getUserId().equals(userId)) {
            throw new BadRequestException("Bạn không có quyền nộp bài thi này");
        }

        // IDEMPOTENCY: Nếu đã hoàn thành trước đó, trả luôn kết quả
        if ("COMPLETED".equals(session.getStatus())) {
            return buildResultResponse(session);
        }

        List<MockExamSessionAnswer> sessionAnswers = sessionAnswerRepository.findByMockExamIdOrderByOrderIndexAsc(session.getId());
        Map<Long, Long> userAnswers = request.answers() != null ? request.answers() : Collections.emptyMap();

        int correctCount = 0;
        boolean failedParalysis = false;

        for (MockExamSessionAnswer sa : sessionAnswers) {
            TheoryQuestion question = sa.getQuestion();
            Long selectedAnswerId = userAnswers.get(question.getId());

            TheoryAnswer selectedAnswer = null;
            if (selectedAnswerId != null) {
                selectedAnswer = question.getAnswers().stream()
                        .filter(a -> a.getId().equals(selectedAnswerId))
                        .findFirst()
                        .orElse(null);
            }

            Long correctAnswerId = question.getAnswers().stream()
                    .filter(TheoryAnswer::isCorrect)
                    .map(TheoryAnswer::getId)
                    .findFirst()
                    .orElse(null);

            boolean isCorrect = selectedAnswer != null && selectedAnswer.isCorrect();
            sa.setSelectedAnswer(selectedAnswer);
            sa.setCorrect(isCorrect);

            if (isCorrect) {
                correctCount++;
            } else {
                if (question.isParalysis()) {
                    failedParalysis = true;
                }
            }
        }
        sessionAnswerRepository.saveAll(sessionAnswers);

        boolean passed = !failedParalysis && (correctCount >= session.getPassingScore());
        session.setScore(correctCount);
        session.setPassed(passed);
        session.setFailedParalysis(failedParalysis);
        session.setStatus("COMPLETED");
        session.setCompletedAt(Instant.now());
        examSessionRepository.save(session);

        log.info("Mock exam completed: sessionCode={}, user={}, score={}/{}, passed={}, failedParalysis={}",
                sessionCode, userId, correctCount, session.getTotalQuestions(), passed, failedParalysis);

        return buildResultResponse(session);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MockExamSummaryResponse> getUserExamHistory(Long userId) {
        return examSessionRepository.findByUserIdOrderByStartedAtDesc(userId).stream()
                .map(s -> new MockExamSummaryResponse(
                        s.getId(),
                        s.getSessionCode(),
                        s.getCategoryCode(),
                        s.getScore(),
                        s.getTotalQuestions(),
                        s.getPassingScore(),
                        s.isPassed(),
                        s.isFailedParalysis(),
                        s.getStatus(),
                        s.getStartedAt(),
                        s.getCompletedAt()
                ))
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public MockExamResultResponse getExamDetail(String sessionCode, Long userId) {
        MockExamSession session = examSessionRepository.findBySessionCode(sessionCode)
                .orElseThrow(() -> new ResourceNotFoundException("MockExamSession", "sessionCode", sessionCode));

        if (!session.getUserId().equals(userId)) {
            throw new BadRequestException("Bạn không có quyền xem bài thi này");
        }

        return buildResultResponse(session);
    }

    private MockExamResultResponse buildResultResponse(MockExamSession session) {
        List<MockExamSessionAnswer> answers = sessionAnswerRepository.findByMockExamIdOrderByOrderIndexAsc(session.getId());
        List<MockExamResultResponse.QuestionResultItem> items = answers.stream().map(sa -> {
            TheoryQuestion q = sa.getQuestion();
            Long correctAnswerId = q.getAnswers().stream()
                    .filter(TheoryAnswer::isCorrect)
                    .map(TheoryAnswer::getId)
                    .findFirst()
                    .orElse(null);

            List<StudyAnswerOptionResponse> options = q.getAnswers().stream()
                    .map(a -> new StudyAnswerOptionResponse(a.getId(), a.getAnswerText(), a.getOrderIndex(), a.isCorrect()))
                    .toList();

            return new MockExamResultResponse.QuestionResultItem(
                    q.getId(),
                    sa.getOrderIndex(),
                    q.getQuestionNumber(),
                    q.getContent(),
                    q.getImageUrl(),
                    q.isParalysis(),
                    sa.getSelectedAnswer() != null ? sa.getSelectedAnswer().getId() : null,
                    correctAnswerId,
                    sa.isCorrect(),
                    q.getExplanation(),
                    q.getLegalReference(),
                    options
            );
        }).toList();

        long durationSeconds = session.getCompletedAt() != null
                ? Duration.between(session.getStartedAt(), session.getCompletedAt()).getSeconds()
                : 0;

        return new MockExamResultResponse(
                session.getSessionCode(),
                session.getCategoryCode(),
                session.getScore(),
                session.getTotalQuestions(),
                session.getPassingScore(),
                session.isPassed(),
                session.isFailedParalysis(),
                session.getStartedAt(),
                session.getCompletedAt(),
                durationSeconds,
                items
        );
    }

    // -------------------------------------------------------------------------
    // LEGACY METHODS (BACKWARD COMPATIBILITY)
    // -------------------------------------------------------------------------

    @Override
    @Transactional(readOnly = true)
    public List<QuestionResponse> getQuestionsByCategory(String categoryCode) {
        return questionRepository.findByCategoryCodeOrderByQuestionNumberAsc(categoryCode).stream()
                .map(this::toLegacyQuestionResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<QuestionResponse> generateMockExam(String categoryCode, int limit) {
        List<TheoryQuestion> all = questionRepository.findForLicenseCategory(categoryCode);
        if (all.isEmpty()) {
            all = questionRepository.findAll();
        }
        List<TheoryQuestion> shuffled = new ArrayList<>(all);
        Collections.shuffle(shuffled);
        int count = Math.min(limit > 0 ? limit : 25, shuffled.size());
        return shuffled.subList(0, count).stream()
                .map(this::toLegacyQuestionResponse)
                .toList();
    }

    @Override
    public ExamResultResponse submitMockExam(Long userId, ExamSubmitRequest request) {
        Map<Long, Long> userAnswers = request.userAnswers();
        List<ExamResultResponse.QuestionResultDetail> details = new ArrayList<>();

        int correctCount = 0;
        int wrongCount = 0;
        boolean failedDueToParalysis = false;

        for (Map.Entry<Long, Long> entry : userAnswers.entrySet()) {
            Long questionId = entry.getKey();
            Long selectedAnswerId = entry.getValue();

            TheoryQuestion question = questionRepository.findById(questionId)
                    .orElseThrow(() -> new ResourceNotFoundException("TheoryQuestion", "id", questionId));

            Long correctAnswerId = question.getAnswers().stream()
                    .filter(TheoryAnswer::isCorrect)
                    .map(TheoryAnswer::getId)
                    .findFirst()
                    .orElse(null);

            boolean isCorrect = correctAnswerId != null && correctAnswerId.equals(selectedAnswerId);
            if (isCorrect) {
                correctCount++;
            } else {
                wrongCount++;
                if (question.isParalysis()) {
                    failedDueToParalysis = true;
                }
            }

            details.add(new ExamResultResponse.QuestionResultDetail(
                    question.getId(),
                    question.getQuestionNumber(),
                    question.getContent(),
                    question.isParalysis(),
                    selectedAnswerId,
                    correctAnswerId,
                    isCorrect,
                    question.getExplanation()
            ));
        }

        int totalQuestions = userAnswers.size();
        int passingScore = (int) Math.ceil(totalQuestions * 0.80);
        boolean passed = !failedDueToParalysis && (correctCount >= passingScore);

        return new ExamResultResponse(
                request.categoryCode(),
                totalQuestions,
                correctCount,
                wrongCount,
                failedDueToParalysis,
                passed,
                passingScore,
                Instant.now(),
                details
        );
    }

    private QuestionResponse toLegacyQuestionResponse(TheoryQuestion q) {
        List<AnswerResponse> answerResponses = q.getAnswers().stream()
                .map(a -> new AnswerResponse(a.getId(), a.getAnswerText(), a.getOrderIndex()))
                .toList();

        return new QuestionResponse(
                q.getId(),
                q.getCategoryCode(),
                q.getQuestionNumber(),
                q.getContent(),
                q.getImageUrl(),
                q.getExplanation(),
                q.isParalysis(),
                answerResponses
        );
    }
}
