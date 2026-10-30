package vn.edu.gplx.modules.learning.application.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.learning.api.dto.AnswerResponse;
import vn.edu.gplx.modules.learning.api.dto.ExamProgressResponse;
import vn.edu.gplx.modules.learning.api.dto.ExamQuestionOptionResponse;
import vn.edu.gplx.modules.learning.api.dto.ExamQuestionResponse;
import vn.edu.gplx.modules.learning.api.dto.ExamResultResponse;
import vn.edu.gplx.modules.learning.api.dto.ExamSubmitRequest;
import vn.edu.gplx.modules.learning.api.dto.MockExamResultResponse;
import vn.edu.gplx.modules.learning.api.dto.MockExamSessionResponse;
import vn.edu.gplx.modules.learning.api.dto.MockExamSummaryResponse;
import vn.edu.gplx.modules.learning.api.dto.QuestionResponse;
import vn.edu.gplx.modules.learning.api.dto.SaveExamProgressRequest;
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
import java.util.Set;
import java.util.UUID;

@Service
@Transactional
public class TheoryExamServiceImpl implements TheoryExamService {

    private static final Logger log = LoggerFactory.getLogger(TheoryExamServiceImpl.class);
    private static final int GRACE_PERIOD_SECONDS = 30; // Dung sai độ trễ mạng khi nộp bài

    private final TheoryQuestionRepository questionRepository;
    private final ExamConfigurationRepository configRepository;
    private final MockExamSessionRepository examSessionRepository;
    private final MockExamSessionAnswerRepository sessionAnswerRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

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
                .orElseThrow(() -> new BadRequestException("Hạng GPLX chưa có cấu hình thi đã xác minh"));

        if (config.getValidUntil() != null && java.time.LocalDate.now(java.time.ZoneId.of("Asia/Ho_Chi_Minh"))
                .isAfter(config.getValidUntil())) {
            throw new BadRequestException("Quy trình thi đã hết thời hạn xác minh, cần cập nhật cấu hình mới");
        }

        // Lựa chọn câu hỏi theo đúng cơ cấu đã xác minh
        List<TheoryQuestion> selected = generateQuestionsFromStructure(config, category);

        // Đảo ngẫu nhiên lại thứ tự câu hỏi trong đề
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
                    q.isParalysisForCategory(session.getCategoryCode()),
                    null, // Chưa có đáp án đã chọn ban đầu
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

    private List<TheoryQuestion> generateQuestionsFromStructure(ExamConfiguration config, String category) {
        List<TheoryQuestion> selected = new ArrayList<>();
        try {
            JsonNode root = objectMapper.readTree(config.getStructureJson());
            Map<String, List<String>> topics = Map.of(
                    "rules", List.of("PDF25_CH1"), "culture", List.of("PDF25_CH2"),
                    "technique", List.of("PDF25_CH3"), "repair", List.of("PDF25_CH4"),
                    "techniqueOrRepair", List.of("PDF25_CH3", "PDF25_CH4"),
                    "signs", List.of("PDF25_CH5"), "scenarios", List.of("PDF25_CH6"));
            addRandomQuestions(selected, questionRepository.findParalysisForLicenseCategory(category),
                    root.path("paralysis").asInt());
            for (Map.Entry<String, List<String>> entry : topics.entrySet()) {
                int needed = root.path(entry.getKey()).asInt();
                if (needed == 0) continue;
                List<TheoryQuestion> pool = new ArrayList<>();
                for (String topic : entry.getValue()) {
                    pool.addAll(questionRepository.findByTopicCodeAndParalysis(topic, category, false));
                }
                addRandomQuestions(selected, pool, needed);
            }
        } catch (com.fasterxml.jackson.core.JsonProcessingException | IllegalArgumentException e) {
            log.error("Cấu hình thi không hợp lệ cho hạng {}", category, e);
            throw new BadRequestException("Cấu hình đề thi không hợp lệ, vui lòng liên hệ quản trị viên");
        }
        if (selected.size() != config.getTotalQuestions()) {
            throw new BadRequestException("Ngân hàng câu hỏi chưa đủ đúng cơ cấu của hạng GPLX này");
        }
        return selected;
    }

    private void addRandomQuestions(List<TheoryQuestion> selected, List<TheoryQuestion> candidates, int count) {
        Set<Long> chosen = new HashSet<>(selected.stream().map(TheoryQuestion::getId).toList());
        List<TheoryQuestion> pool = new ArrayList<>(candidates.stream().filter(q -> !chosen.contains(q.getId())).toList());
        if (count < 0 || pool.size() < count) {
            throw new BadRequestException("Không đủ câu hỏi đúng phạm vi và cơ cấu hạng GPLX");
        }
        Collections.shuffle(pool);
        selected.addAll(pool.subList(0, count));
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
                    q.isParalysisForCategory(session.getCategoryCode()),
                    sa.getSelectedAnswer() != null ? sa.getSelectedAnswer().getId() : null, // Khôi phục câu đã làm
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
    public ExamProgressResponse saveProgress(String sessionCode, Long userId, SaveExamProgressRequest request) {
        MockExamSession session = examSessionRepository.findBySessionCode(sessionCode)
                .orElseThrow(() -> new ResourceNotFoundException("MockExamSession", "sessionCode", sessionCode));

        if (!session.getUserId().equals(userId)) {
            throw new BadRequestException("Bạn không có quyền thao tác trên đề thi này");
        }

        long elapsedSeconds = Duration.between(session.getStartedAt(), Instant.now()).getSeconds();
        long allowedSeconds = (long) session.getDurationMinutes() * 60 + GRACE_PERIOD_SECONDS;
        boolean isExpired = elapsedSeconds > allowedSeconds;

        if (isExpired && !"COMPLETED".equals(session.getStatus())) {
            session.setStatus("EXPIRED");
            examSessionRepository.save(session);
        }

        if ("COMPLETED".equals(session.getStatus()) || "EXPIRED".equals(session.getStatus())) {
            long remaining = Math.max(0, (long) session.getDurationMinutes() * 60 - elapsedSeconds);
            return new ExamProgressResponse(sessionCode, countAnsweredQuestions(session.getId()), session.getTotalQuestions(), remaining, true);
        }

        // Tìm câu hỏi trong đề thi
        List<MockExamSessionAnswer> answers = sessionAnswerRepository.findByMockExamIdOrderByOrderIndexAsc(session.getId());
        for (MockExamSessionAnswer sa : answers) {
            if (sa.getQuestion().getId().equals(request.questionId())) {
                if (request.selectedAnswerId() != null) {
                    TheoryAnswer answer = sa.getQuestion().getAnswers().stream()
                            .filter(a -> a.getId().equals(request.selectedAnswerId()))
                            .findFirst()
                            .orElse(null);
                    sa.setSelectedAnswer(answer);
                } else {
                    sa.setSelectedAnswer(null);
                }
                sessionAnswerRepository.save(sa);
                break;
            }
        }

        int answeredCount = countAnsweredQuestions(session.getId());
        long remaining = Math.max(0, (long) session.getDurationMinutes() * 60 - elapsedSeconds);

        return new ExamProgressResponse(sessionCode, answeredCount, session.getTotalQuestions(), remaining, false);
    }

    private int countAnsweredQuestions(Long mockExamId) {
        return (int) sessionAnswerRepository.findByMockExamIdOrderByOrderIndexAsc(mockExamId).stream()
                .filter(a -> a.getSelectedAnswer() != null)
                .count();
    }

    @Override
    public MockExamResultResponse submitMockExamSession(String sessionCode, Long userId, SubmitMockExamRequest request) {
        MockExamSession session = examSessionRepository.findBySessionCode(sessionCode)
                .orElseThrow(() -> new ResourceNotFoundException("MockExamSession", "sessionCode", sessionCode));

        if (!session.getUserId().equals(userId)) {
            throw new BadRequestException("Bạn không có quyền nộp bài thi này");
        }

        // IDEMPOTENCY: Nếu đã hoàn thành trước đó, trả luôn kết quả đã lưu
        if ("COMPLETED".equals(session.getStatus())) {
            return buildResultResponse(session);
        }

        long elapsedSeconds = Duration.between(session.getStartedAt(), Instant.now()).getSeconds();
        long allowedSeconds = (long) session.getDurationMinutes() * 60 + GRACE_PERIOD_SECONDS;
        boolean isTimeExpired = elapsedSeconds > allowedSeconds;

        List<MockExamSessionAnswer> sessionAnswers = sessionAnswerRepository.findByMockExamIdOrderByOrderIndexAsc(session.getId());
        Map<Long, Long> userAnswers = request.answers() != null ? request.answers() : Collections.emptyMap();

        int correctCount = 0;
        boolean failedParalysis = false;

        for (MockExamSessionAnswer sa : sessionAnswers) {
            TheoryQuestion question = sa.getQuestion();
            // Nếu client có gửi trong submit request thì dùng, không thì lấy đáp án đã lưu trước đó trong saveProgress
            Long selectedAnswerId = userAnswers.containsKey(question.getId())
                    ? userAnswers.get(question.getId())
                    : (sa.getSelectedAnswer() != null ? sa.getSelectedAnswer().getId() : null);

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
                if (question.isParalysisForCategory(session.getCategoryCode())) {
                    failedParalysis = true;
                }
            }
        }
        sessionAnswerRepository.saveAll(sessionAnswers);

        boolean passed = !failedParalysis && (correctCount >= session.getPassingScore()) && !isTimeExpired;
        session.setScore(correctCount);
        session.setPassed(passed);
        session.setFailedParalysis(failedParalysis);
        session.setStatus(isTimeExpired ? "EXPIRED" : "COMPLETED");
        session.setCompletedAt(Instant.now());
        examSessionRepository.save(session);

        log.info("Mock exam completed: sessionCode={}, user={}, score={}/{}, passed={}, failedParalysis={}, expired={}",
                sessionCode, userId, correctCount, session.getTotalQuestions(), passed, failedParalysis, isTimeExpired);

        return buildResultResponse(session);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MockExamSummaryResponse> getUserExamHistory(Long userId) {
        return examSessionRepository.findByUserIdOrderByStartedAtDesc(userId).stream()
                .map(this::toSummaryResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<MockExamSummaryResponse> getUserExamHistory(Long userId, Pageable pageable) {
        return examSessionRepository.findByUserIdOrderByStartedAtDesc(userId, pageable)
                .map(this::toSummaryResponse);
    }

    private MockExamSummaryResponse toSummaryResponse(MockExamSession s) {
        return new MockExamSummaryResponse(
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
        );
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
                    q.isParalysisForCategory(session.getCategoryCode()),
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
                if (question.isParalysisForCategory(request.categoryCode())) {
                    failedDueToParalysis = true;
                }
            }

            details.add(new ExamResultResponse.QuestionResultDetail(
                    question.getId(),
                    question.getQuestionNumber(),
                    question.getContent(),
                    question.isParalysisForCategory(request.categoryCode()),
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
