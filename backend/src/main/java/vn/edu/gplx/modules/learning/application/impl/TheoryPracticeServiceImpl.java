package vn.edu.gplx.modules.learning.application.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.learning.api.dto.PracticeAnswerRequest;
import vn.edu.gplx.modules.learning.api.dto.PracticeAnswerResultResponse;
import vn.edu.gplx.modules.learning.api.dto.PracticeSessionStartRequest;
import vn.edu.gplx.modules.learning.api.dto.PracticeSessionSummaryResponse;
import vn.edu.gplx.modules.learning.api.dto.QuestionDetailResponse;
import vn.edu.gplx.modules.learning.api.dto.StudyAnswerOptionResponse;
import vn.edu.gplx.modules.learning.application.TheoryPracticeService;
import vn.edu.gplx.modules.learning.domain.BookmarkedQuestion;
import vn.edu.gplx.modules.learning.domain.PracticeAnswer;
import vn.edu.gplx.modules.learning.domain.PracticeSession;
import vn.edu.gplx.modules.learning.domain.TheoryAnswer;
import vn.edu.gplx.modules.learning.domain.TheoryQuestion;
import vn.edu.gplx.modules.learning.domain.TheoryTopic;
import vn.edu.gplx.modules.learning.infrastructure.BookmarkedQuestionRepository;
import vn.edu.gplx.modules.learning.infrastructure.PracticeAnswerRepository;
import vn.edu.gplx.modules.learning.infrastructure.PracticeSessionRepository;
import vn.edu.gplx.modules.learning.infrastructure.TheoryQuestionRepository;
import vn.edu.gplx.modules.learning.infrastructure.TheoryTopicRepository;
import vn.edu.gplx.shared.exception.BadRequestException;
import vn.edu.gplx.shared.exception.ResourceNotFoundException;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
@Transactional
public class TheoryPracticeServiceImpl implements TheoryPracticeService {

    private static final Logger log = LoggerFactory.getLogger(TheoryPracticeServiceImpl.class);

    private final PracticeSessionRepository sessionRepository;
    private final PracticeAnswerRepository answerRepository;
    private final TheoryQuestionRepository questionRepository;
    private final TheoryTopicRepository topicRepository;
    private final BookmarkedQuestionRepository bookmarkRepository;

    public TheoryPracticeServiceImpl(PracticeSessionRepository sessionRepository,
                                     PracticeAnswerRepository answerRepository,
                                     TheoryQuestionRepository questionRepository,
                                     TheoryTopicRepository topicRepository,
                                     BookmarkedQuestionRepository bookmarkRepository) {
        this.sessionRepository = sessionRepository;
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
        this.topicRepository = topicRepository;
        this.bookmarkRepository = bookmarkRepository;
    }

    @Override
    public PracticeSessionSummaryResponse startPracticeSession(Long userId, PracticeSessionStartRequest request) {
        String mode = request.practiceMode().toUpperCase();
        List<TheoryQuestion> candidateQuestions = new ArrayList<>();
        TheoryTopic topic = null;

        switch (mode) {
            case "TOPIC":
                if (request.topicId() == null) {
                    throw new BadRequestException("Chủ đề không được để trống khi chọn chế độ TOPIC");
                }
                topic = topicRepository.findById(request.topicId())
                        .orElseThrow(() -> new ResourceNotFoundException("TheoryTopic", "id", request.topicId()));
                candidateQuestions = questionRepository.findByTopicIdOrderByQuestionNumberAsc(request.topicId());
                break;

            case "CATEGORY":
                String cat = request.categoryCode() != null ? request.categoryCode() : "ALL";
                candidateQuestions = questionRepository.findForLicenseCategory(cat);
                break;

            case "PARALYSIS":
                String pCat = request.categoryCode() != null ? request.categoryCode() : "ALL";
                candidateQuestions = questionRepository.findParalysisForLicenseCategory(pCat);
                if (candidateQuestions.isEmpty()) {
                    candidateQuestions = questionRepository.findByIsParalysisTrueOrderByQuestionNumberAsc();
                }
                break;

            case "BOOKMARKED":
                List<BookmarkedQuestion> bookmarks = bookmarkRepository.findByUserIdOrderByCreatedAtDesc(userId);
                candidateQuestions = bookmarks.stream().map(BookmarkedQuestion::getQuestion).toList();
                break;

            case "INCORRECT":
                List<Long> wrongIds = answerRepository.findIncorrectQuestionIdsByUserId(userId);
                if (!wrongIds.isEmpty()) {
                    candidateQuestions = questionRepository.findByIdsIn(wrongIds);
                }
                break;

            case "UNANSWERED":
                List<Long> answeredIds = answerRepository.findAnsweredQuestionIdsByUserId(userId);
                Set<Long> answeredSet = new HashSet<>(answeredIds);
                String uCat = request.categoryCode() != null ? request.categoryCode() : "ALL";
                candidateQuestions = questionRepository.findForLicenseCategory(uCat).stream()
                        .filter(q -> !answeredSet.contains(q.getId()))
                        .toList();
                break;

            case "RANDOM":
                String rCat = request.categoryCode() != null ? request.categoryCode() : "ALL";
                List<TheoryQuestion> all = new ArrayList<>(questionRepository.findForLicenseCategory(rCat));
                Collections.shuffle(all);
                int limit = (request.limit() != null && request.limit() > 0) ? request.limit() : 20;
                candidateQuestions = all.subList(0, Math.min(limit, all.size()));
                break;

            case "ALL":
            default:
                candidateQuestions = questionRepository.findAll();
                break;
        }

        if (candidateQuestions.isEmpty()) {
            throw new BadRequestException("Không tìm thấy câu hỏi phù hợp với chế độ luyện tập: " + mode);
        }

        String sessionCode = "PRAC-" + UUID.randomUUID().toString().substring(0, 12).toUpperCase();
        PracticeSession session = new PracticeSession(
                sessionCode,
                userId,
                mode,
                request.categoryCode(),
                topic,
                candidateQuestions.size()
        );

        session = sessionRepository.save(session);

        return toSummary(session);
    }

    @Override
    @Transactional(readOnly = true)
    public List<QuestionDetailResponse> getSessionQuestions(String sessionCode, Long userId) {
        PracticeSession session = sessionRepository.findBySessionCode(sessionCode)
                .orElseThrow(() -> new ResourceNotFoundException("PracticeSession", "sessionCode", sessionCode));

        if (!session.getUserId().equals(userId)) {
            throw new BadRequestException("Bạn không có quyền truy cập phiên luyện tập này");
        }

        List<TheoryQuestion> questions;
        String mode = session.getPracticeMode();
        if ("TOPIC".equals(mode) && session.getTopic() != null) {
            questions = questionRepository.findByTopicIdOrderByQuestionNumberAsc(session.getTopic().getId());
        } else if ("PARALYSIS".equals(mode)) {
            questions = questionRepository.findByIsParalysisTrueOrderByQuestionNumberAsc();
        } else if ("BOOKMARKED".equals(mode)) {
            questions = bookmarkRepository.findByUserIdOrderByCreatedAtDesc(userId).stream().map(BookmarkedQuestion::getQuestion).toList();
        } else if ("INCORRECT".equals(mode)) {
            List<Long> wrongIds = answerRepository.findIncorrectQuestionIdsByUserId(userId);
            questions = wrongIds.isEmpty() ? List.of() : questionRepository.findByIdsIn(wrongIds);
        } else {
            String cat = session.getCategoryCode() != null ? session.getCategoryCode() : "ALL";
            questions = questionRepository.findForLicenseCategory(cat);
        }

        Set<Long> bookmarkedIds = new HashSet<>(bookmarkRepository.findByUserIdOrderByCreatedAtDesc(userId).stream().map(b -> b.getQuestion().getId()).toList());

        return questions.stream().map(q -> {
            List<StudyAnswerOptionResponse> answers = q.getAnswers().stream()
                    .map(a -> new StudyAnswerOptionResponse(a.getId(), a.getAnswerText(), a.getOrderIndex(), a.isCorrect()))
                    .toList();
            return new QuestionDetailResponse(
                    q.getId(),
                    q.getCategoryCode(),
                    q.getTopic() != null ? q.getTopic().getId() : null,
                    q.getTopic() != null ? q.getTopic().getName() : "",
                    q.getQuestionNumber(),
                    q.getContent(),
                    q.getImageUrl(),
                    q.getExplanation(),
                    q.isParalysis(),
                    q.getLegalReference(),
                    bookmarkedIds.contains(q.getId()),
                    answers
            );
        }).toList();
    }

    @Override
    public PracticeAnswerResultResponse submitAnswer(String sessionCode, Long userId, PracticeAnswerRequest request) {
        PracticeSession session = sessionRepository.findBySessionCode(sessionCode)
                .orElseThrow(() -> new ResourceNotFoundException("PracticeSession", "sessionCode", sessionCode));

        if (!session.getUserId().equals(userId)) {
            throw new BadRequestException("Bạn không có quyền thao tác trên phiên luyện tập này");
        }

        TheoryQuestion question = questionRepository.findById(request.questionId())
                .orElseThrow(() -> new ResourceNotFoundException("TheoryQuestion", "id", request.questionId()));

        TheoryAnswer selectedAnswer = null;
        if (request.selectedAnswerId() != null) {
            selectedAnswer = question.getAnswers().stream()
                    .filter(a -> a.getId().equals(request.selectedAnswerId()))
                    .findFirst()
                    .orElse(null);
        }

        Long correctAnswerId = question.getAnswers().stream()
                .filter(TheoryAnswer::isCorrect)
                .map(TheoryAnswer::getId)
                .findFirst()
                .orElse(null);

        boolean isCorrect = selectedAnswer != null && selectedAnswer.isCorrect();

        PracticeAnswer practiceAnswer = new PracticeAnswer(session, question, selectedAnswer, isCorrect);
        answerRepository.save(practiceAnswer);

        session.setAnsweredQuestions(session.getAnsweredQuestions() + 1);
        if (isCorrect) {
            session.setCorrectAnswers(session.getCorrectAnswers() + 1);
        }
        sessionRepository.save(session);

        return new PracticeAnswerResultResponse(
                question.getId(),
                request.selectedAnswerId(),
                correctAnswerId,
                isCorrect,
                question.getExplanation(),
                question.getLegalReference(),
                session.getAnsweredQuestions(),
                session.getCorrectAnswers()
        );
    }

    @Override
    public PracticeSessionSummaryResponse completeSession(String sessionCode, Long userId) {
        PracticeSession session = sessionRepository.findBySessionCode(sessionCode)
                .orElseThrow(() -> new ResourceNotFoundException("PracticeSession", "sessionCode", sessionCode));

        if (!session.getUserId().equals(userId)) {
            throw new BadRequestException("Bạn không có quyền thao tác trên phiên luyện tập này");
        }

        session.setStatus("COMPLETED");
        session.setCompletedAt(Instant.now());
        session = sessionRepository.save(session);

        return toSummary(session);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PracticeSessionSummaryResponse> getUserPracticeHistory(Long userId) {
        return sessionRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::toSummary)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public Page<PracticeSessionSummaryResponse> getUserPracticeHistory(Long userId, Pageable pageable) {
        return sessionRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable)
                .map(this::toSummary);
    }

    private PracticeSessionSummaryResponse toSummary(PracticeSession s) {
        return new PracticeSessionSummaryResponse(
                s.getId(),
                s.getSessionCode(),
                s.getPracticeMode(),
                s.getCategoryCode(),
                s.getTopic() != null ? s.getTopic().getId() : null,
                s.getTopic() != null ? s.getTopic().getName() : null,
                s.getTotalQuestions(),
                s.getAnsweredQuestions(),
                s.getCorrectAnswers(),
                s.getStatus(),
                s.getCreatedAt(),
                s.getCompletedAt()
        );
    }
}
