package vn.edu.gplx.modules.learning.application.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.learning.api.dto.QuestionDetailResponse;
import vn.edu.gplx.modules.learning.api.dto.ReviewAnswerRequest;
import vn.edu.gplx.modules.learning.api.dto.ReviewAnswerResultResponse;
import vn.edu.gplx.modules.learning.api.dto.ReviewDashboardOverviewResponse;
import vn.edu.gplx.modules.learning.api.dto.ReviewSessionDetailResponse;
import vn.edu.gplx.modules.learning.api.dto.ReviewSessionResultResponse;
import vn.edu.gplx.modules.learning.api.dto.ReviewSessionStartRequest;
import vn.edu.gplx.modules.learning.api.dto.ReviewSessionSummaryDto;
import vn.edu.gplx.modules.learning.api.dto.ReviewTopicStatDto;
import vn.edu.gplx.modules.learning.api.dto.ReviewWrongQuestionSummaryDto;
import vn.edu.gplx.modules.learning.api.dto.StudyAnswerOptionResponse;
import vn.edu.gplx.modules.learning.application.TheoryReviewService;
import vn.edu.gplx.modules.learning.domain.BookmarkedQuestion;
import vn.edu.gplx.modules.learning.domain.QuestionRetentionState;
import vn.edu.gplx.modules.learning.domain.ReviewSession;
import vn.edu.gplx.modules.learning.domain.ReviewSessionAnswer;
import vn.edu.gplx.modules.learning.domain.TheoryAnswer;
import vn.edu.gplx.modules.learning.domain.TheoryQuestion;
import vn.edu.gplx.modules.learning.domain.TheoryTopic;
import vn.edu.gplx.modules.learning.infrastructure.BookmarkedQuestionRepository;
import vn.edu.gplx.modules.learning.infrastructure.PracticeAnswerRepository;
import vn.edu.gplx.modules.learning.infrastructure.QuestionRetentionStateRepository;
import vn.edu.gplx.modules.learning.infrastructure.ReviewSessionAnswerRepository;
import vn.edu.gplx.modules.learning.infrastructure.ReviewSessionRepository;
import vn.edu.gplx.modules.learning.infrastructure.TheoryQuestionRepository;
import vn.edu.gplx.modules.learning.infrastructure.TheoryTopicRepository;
import vn.edu.gplx.shared.exception.BadRequestException;
import vn.edu.gplx.shared.exception.ResourceNotFoundException;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class TheoryReviewServiceImpl implements TheoryReviewService {

    private static final Logger log = LoggerFactory.getLogger(TheoryReviewServiceImpl.class);
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm").withZone(ZoneId.systemDefault());

    private final QuestionRetentionStateRepository retentionRepository;
    private final ReviewSessionRepository sessionRepository;
    private final ReviewSessionAnswerRepository answerRepository;
    private final TheoryQuestionRepository questionRepository;
    private final TheoryTopicRepository topicRepository;
    private final BookmarkedQuestionRepository bookmarkRepository;
    private final PracticeAnswerRepository practiceAnswerRepository;

    public TheoryReviewServiceImpl(QuestionRetentionStateRepository retentionRepository,
                                   ReviewSessionRepository sessionRepository,
                                   ReviewSessionAnswerRepository answerRepository,
                                   TheoryQuestionRepository questionRepository,
                                   TheoryTopicRepository topicRepository,
                                   BookmarkedQuestionRepository bookmarkRepository,
                                   PracticeAnswerRepository practiceAnswerRepository) {
        this.retentionRepository = retentionRepository;
        this.sessionRepository = sessionRepository;
        this.answerRepository = answerRepository;
        this.questionRepository = questionRepository;
        this.topicRepository = topicRepository;
        this.bookmarkRepository = bookmarkRepository;
        this.practiceAnswerRepository = practiceAnswerRepository;
    }

    /**
     * Đồng bộ lịch sử trả lời sai từ Practice vào QuestionRetentionState nếu chưa có
     */
    private void syncWrongAnswersFromHistory(Long userId) {
        try {
            List<Long> wrongIds = practiceAnswerRepository.findIncorrectQuestionIdsByUserId(userId);
            for (Long qId : wrongIds) {
                Optional<QuestionRetentionState> existing = retentionRepository.findByUserIdAndQuestionId(userId, qId);
                if (existing.isEmpty()) {
                    questionRepository.findById(qId).ifPresent(q -> {
                        QuestionRetentionState state = new QuestionRetentionState(userId, q);
                        state.setIncorrectAttempts(1);
                        state.setTotalAttempts(1);
                        state.setMasteryStatus("NEEDS_PRACTICE");
                        state.calculatePriorityScore();
                        retentionRepository.save(state);
                    });
                }
            }
        } catch (Exception e) {
            log.warn("Lỗi đồng bộ lịch sử câu hỏi sai cho user {}: {}", userId, e.getMessage());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public ReviewDashboardOverviewResponse getDashboardOverview(Long userId, String categoryCode) {
        Instant now = Instant.now();

        long unconsolidatedWrongCount = retentionRepository.countUnmasteredWrongQuestions(userId);
        long dueTodayCount = retentionRepository.countDueToday(userId, now);
        long criticalNeedingReviewCount = retentionRepository.countParalysisNeedingReview(userId);
        long bookmarkedCount = bookmarkRepository.countByUserId(userId);
        long totalMastered = retentionRepository.countByUserIdAndMasteryStatus(userId, "MASTERED");
        long totalReviewing = retentionRepository.countByUserIdAndMasteryStatus(userId, "REVIEWING");

        long totalNeedingReview = unconsolidatedWrongCount + dueTodayCount;

        // Tính tỷ lệ chính xác gần đây từ các phiên hoàn thành
        List<ReviewSession> recentCompleted = sessionRepository.findRecentCompletedSessions(userId, PageRequest.of(0, 5));
        double recentAccuracyRate = 0.0;
        if (!recentCompleted.isEmpty()) {
            int totalAns = recentCompleted.stream().mapToInt(ReviewSession::getAnsweredQuestions).sum();
            int correctAns = recentCompleted.stream().mapToInt(ReviewSession::getCorrectAnswers).sum();
            if (totalAns > 0) {
                recentAccuracyRate = Math.round(((double) correctAns / totalAns) * 1000.0) / 10.0;
            }
        }

        // Đề xuất chế độ thông minh
        String recommendedMode;
        String recommendedReason;
        if (criticalNeedingReviewCount > 0) {
            recommendedMode = "CRITICAL_PARALYSIS";
            recommendedReason = "Bạn có " + criticalNeedingReviewCount + " câu điểm liệt chưa củng cố. Đây là các câu bắt buộc phải đúng để đạt kỳ sát hạch.";
        } else if (unconsolidatedWrongCount > 0) {
            recommendedMode = "WRONG_ANSWERS";
            recommendedReason = "Bạn có " + unconsolidatedWrongCount + " câu từng trả lời sai chưa nắm vững. Hãy ôn lại để xóa các điểm yếu này.";
        } else if (dueTodayCount > 0) {
            recommendedMode = "SMART";
            recommendedReason = "Hôm nay có " + dueTodayCount + " câu đến chu kỳ lặp lại ngắt quãng để củng cố trí nhớ dài hạn.";
        } else {
            recommendedMode = "SMART";
            recommendedReason = "Thuật toán gợi ý củng cố toàn diện ngân hàng câu hỏi để giữ vững phong độ.";
        }

        List<ReviewTopicStatDto> topicStats = getTopicStats(userId, categoryCode);
        List<ReviewSessionSummaryDto> recentSessionDtos = sessionRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .limit(5)
                .map(this::toSummaryDto)
                .toList();

        return new ReviewDashboardOverviewResponse(
                totalNeedingReview,
                unconsolidatedWrongCount,
                dueTodayCount,
                criticalNeedingReviewCount,
                bookmarkedCount,
                recentAccuracyRate,
                totalMastered,
                totalReviewing,
                recommendedMode,
                recommendedReason,
                topicStats,
                recentSessionDtos
        );
    }

    @Override
    public List<ReviewWrongQuestionSummaryDto> getWrongQuestions(Long userId, String categoryCode, Long topicId) {
        syncWrongAnswersFromHistory(userId);

        List<QuestionRetentionState> wrongStates = retentionRepository.findIncorrectQuestions(userId);

        return wrongStates.stream()
                .filter(state -> {
                    TheoryQuestion q = state.getQuestion();
                    if (q == null) return false;
                    boolean matchTopic = (topicId == null) || (q.getTopic() != null && q.getTopic().getId().equals(topicId));
                    boolean matchCategory = (categoryCode == null || categoryCode.isBlank() || "ALL".equalsIgnoreCase(categoryCode))
                            || "ALL".equalsIgnoreCase(q.getCategoryCode())
                            || categoryCode.equalsIgnoreCase(q.getCategoryCode());
                    return matchTopic && matchCategory;
                })
                .map(state -> {
                    TheoryQuestion q = state.getQuestion();
                    String lastWrongStr = state.getLastReviewedAt() != null ? FORMATTER.format(state.getLastReviewedAt()) : "Chưa có";
                    String tName = q.getTopic() != null ? q.getTopic().getName() : "Quy tắc chung";
                    Long tId = q.getTopic() != null ? q.getTopic().getId() : null;

                    return new ReviewWrongQuestionSummaryDto(
                            q.getId(),
                            q.getQuestionNumber(),
                            q.getContent(),
                            tId,
                            tName,
                            q.getCategoryCode(),
                            q.isParalysis(),
                            state.getIncorrectAttempts(),
                            state.getCorrectAttempts(),
                            lastWrongStr,
                            state.getConsecutiveCorrect(),
                            state.getMasteryStatus(),
                            state.getPriorityScore()
                    );
                })
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<QuestionDetailResponse> getCriticalQuestions(Long userId, String categoryCode, String statusFilter) {
        String cat = (categoryCode != null && !categoryCode.isBlank()) ? categoryCode : "ALL";
        List<TheoryQuestion> questions = questionRepository.findParalysisForLicenseCategory(cat);

        // Lấy danh sách bookmark của user
        Set<Long> bookmarkedIds = new HashSet<>(bookmarkRepository.findQuestionIdsByUserId(userId));

        // Lấy retention states của user
        Map<Long, QuestionRetentionState> retentionMap = retentionRepository.findByUserId(userId).stream()
                .collect(Collectors.toMap(s -> s.getQuestion().getId(), s -> s, (s1, s2) -> s1));

        return questions.stream()
                .filter(q -> {
                    if (statusFilter == null || "ALL".equalsIgnoreCase(statusFilter)) return true;
                    QuestionRetentionState state = retentionMap.get(q.getId());
                    if ("MASTERED".equalsIgnoreCase(statusFilter)) {
                        return state != null && "MASTERED".equalsIgnoreCase(state.getMasteryStatus());
                    }
                    if ("NEEDS_PRACTICE".equalsIgnoreCase(statusFilter)) {
                        return state == null || !"MASTERED".equalsIgnoreCase(state.getMasteryStatus());
                    }
                    return true;
                })
                .map(q -> toQuestionDetailResponse(q, bookmarkedIds.contains(q.getId()), cat))
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<QuestionDetailResponse> getBookmarkedQuestions(Long userId, Long topicId) {
        List<BookmarkedQuestion> bookmarks = bookmarkRepository.findByUserIdOrderByCreatedAtDesc(userId);

        return bookmarks.stream()
                .map(BookmarkedQuestion::getQuestion)
                .filter(q -> topicId == null || (q.getTopic() != null && q.getTopic().getId().equals(topicId)))
                .map(q -> toQuestionDetailResponse(q, true))
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewTopicStatDto> getTopicStats(Long userId, String categoryCode) {
        List<TheoryTopic> topics = topicRepository.findAllByOrderByOrderIndexAsc();
        List<QuestionRetentionState> userStates = retentionRepository.findByUserId(userId);

        Map<Long, List<QuestionRetentionState>> statesByTopic = userStates.stream()
                .filter(s -> s.getQuestion() != null && s.getQuestion().getTopic() != null)
                .collect(Collectors.groupingBy(s -> s.getQuestion().getTopic().getId()));

        List<ReviewTopicStatDto> dtos = new ArrayList<>();

        for (TheoryTopic topic : topics) {
            List<QuestionRetentionState> topicStates = statesByTopic.getOrDefault(topic.getId(), Collections.emptyList());
            int totalAnswered = topicStates.size();
            int wrongCount = (int) topicStates.stream().filter(s -> s.getIncorrectAttempts() > 0).count();
            int needReview = (int) topicStates.stream().filter(s -> !"MASTERED".equalsIgnoreCase(s.getMasteryStatus())).count();

            double accuracyRate = 0.0;
            int totalAttempts = topicStates.stream().mapToInt(QuestionRetentionState::getTotalAttempts).sum();
            int correctAttempts = topicStates.stream().mapToInt(QuestionRetentionState::getCorrectAttempts).sum();
            if (totalAttempts > 0) {
                accuracyRate = Math.round(((double) correctAttempts / totalAttempts) * 1000.0) / 10.0;
            }

            Instant lastReviewed = topicStates.stream()
                    .map(QuestionRetentionState::getLastReviewedAt)
                    .filter(java.util.Objects::nonNull)
                    .max(Comparator.naturalOrder())
                    .orElse(null);
            String lastReviewedStr = lastReviewed != null ? FORMATTER.format(lastReviewed) : "Chưa ôn tập";

            String priorityLevel = "LOW";
            if (wrongCount >= 3 || (totalAnswered > 0 && accuracyRate < 70.0)) {
                priorityLevel = "HIGH";
            } else if (wrongCount > 0 || needReview > 0) {
                priorityLevel = "MEDIUM";
            }

            dtos.add(new ReviewTopicStatDto(
                    topic.getId(),
                    topic.getCode(),
                    topic.getName(),
                    totalAnswered,
                    wrongCount,
                    needReview,
                    accuracyRate,
                    lastReviewedStr,
                    priorityLevel
            ));
        }

        return dtos;
    }

    @Override
    public ReviewSessionDetailResponse startReviewSession(Long userId, ReviewSessionStartRequest request) {
        syncWrongAnswersFromHistory(userId);

        String mode = request.reviewMode().toUpperCase();
        int limit = (request.limit() != null && request.limit() > 0) ? Math.min(request.limit(), 30) : 15;
        TheoryTopic topic = null;
        List<TheoryQuestion> candidates = new ArrayList<>();

        switch (mode) {
            case "WRONG_ANSWERS":
                List<QuestionRetentionState> wrongStates = retentionRepository.findIncorrectQuestions(userId);
                candidates = wrongStates.stream()
                        .map(QuestionRetentionState::getQuestion)
                        .filter(java.util.Objects::nonNull)
                        .toList();
                break;

            case "CRITICAL_PARALYSIS":
                String pCat = request.categoryCode() != null ? request.categoryCode() : "ALL";
                candidates = questionRepository.findParalysisForLicenseCategory(pCat);
                break;

            case "BOOKMARKED":
                List<BookmarkedQuestion> bookmarks = bookmarkRepository.findByUserIdOrderByCreatedAtDesc(userId);
                candidates = bookmarks.stream().map(BookmarkedQuestion::getQuestion).toList();
                break;

            case "TOPIC":
                if (request.topicId() == null) {
                    throw new BadRequestException("Chủ đề không được để trống khi chọn chế độ TOPIC");
                }
                topic = topicRepository.findById(request.topicId())
                        .orElseThrow(() -> new ResourceNotFoundException("TheoryTopic", "id", request.topicId()));
                candidates = questionRepository.findByTopicIdOrderByQuestionNumberAsc(request.topicId());
                break;

            case "CATEGORY":
                String cat = request.categoryCode() != null ? request.categoryCode() : "ALL";
                candidates = questionRepository.findForLicenseCategory(cat);
                break;

            case "SMART":
            default:
                // Bộ chọn thông minh dựa trên hàng đợi Spaced Repetition + Priority Score
                List<QuestionRetentionState> dueStates = retentionRepository.findDueForReview(userId, Instant.now());
                if (!dueStates.isEmpty()) {
                    candidates.addAll(dueStates.stream().map(QuestionRetentionState::getQuestion).toList());
                }

                // Nếu chưa đủ limit câu, bổ sung các câu có điểm ưu tiên cao nhất
                if (candidates.size() < limit) {
                    List<QuestionRetentionState> priorityStates = retentionRepository.findByUserIdOrderByPriorityScoreDesc(userId);
                    for (QuestionRetentionState s : priorityStates) {
                        if (!candidates.contains(s.getQuestion())) {
                            candidates.add(s.getQuestion());
                            if (candidates.size() >= limit) break;
                        }
                    }
                }

                // Nếu học viên mới chưa có lịch sử, chọn câu điểm liệt & câu cốt lõi
                candidates = candidates.stream().filter(q -> q.isActive() && q.appliesTo(request.categoryCode())).toList();
        if (candidates.isEmpty()) {
                    String sCat = request.categoryCode() != null ? request.categoryCode() : "ALL";
                    candidates = questionRepository.findParalysisForLicenseCategory(sCat);
                    candidates = candidates.stream().filter(q -> q.isActive() && q.appliesTo(request.categoryCode())).toList();
        if (candidates.isEmpty()) {
                        candidates = questionRepository.findAll();
                    }
                }
                break;
        }

        candidates = candidates.stream().filter(q -> q.isActive() && q.appliesTo(request.categoryCode())).toList();
        if (candidates.isEmpty()) {
            throw new BadRequestException("Không tìm thấy câu hỏi phù hợp cho chế độ ôn tập này");
        }

        // Lấy tối đa limit câu hỏi
        List<TheoryQuestion> selectedQuestions = new ArrayList<>(candidates);
        Collections.shuffle(selectedQuestions);
        if (selectedQuestions.size() > limit) {
            selectedQuestions = selectedQuestions.subList(0, limit);
        }

        String sessionCode = "REV-" + UUID.randomUUID().toString().substring(0, 12).toUpperCase();
        ReviewSession session = new ReviewSession(
                sessionCode,
                userId,
                mode,
                request.categoryCode() != null ? request.categoryCode() : "ALL",
                topic,
                selectedQuestions.size()
        );

        ReviewSession savedSession = sessionRepository.save(session);

        Set<Long> bookmarkedIds = new HashSet<>(bookmarkRepository.findQuestionIdsByUserId(userId));
        List<QuestionDetailResponse> questionDtos = selectedQuestions.stream()
                .map(q -> toQuestionDetailResponse(q, bookmarkedIds.contains(q.getId()), savedSession.getCategoryCode()))
                .toList();

        return new ReviewSessionDetailResponse(
                savedSession.getId(),
                savedSession.getSessionCode(),
                savedSession.getReviewMode(),
                savedSession.getCategoryCode(),
                topic != null ? topic.getName() : null,
                savedSession.getTotalQuestions(),
                savedSession.getAnsweredQuestions(),
                savedSession.getCorrectAnswers(),
                savedSession.getIncorrectAnswers(),
                savedSession.getStatus(),
                FORMATTER.format(savedSession.getCreatedAt()),
                questionDtos
        );
    }

    @Override
    @Transactional(readOnly = true)
    public ReviewSessionDetailResponse getReviewSession(Long userId, String sessionCode) {
        ReviewSession session = sessionRepository.findBySessionCode(sessionCode)
                .orElseThrow(() -> new ResourceNotFoundException("ReviewSession", "sessionCode", sessionCode));

        if (!session.getUserId().equals(userId)) {
            throw new BadRequestException("Bạn không có quyền truy cập phiên ôn tập này");
        }

        Set<Long> bookmarkedIds = new HashSet<>(bookmarkRepository.findQuestionIdsByUserId(userId));
        List<TheoryQuestion> questions = session.getAnswers().stream()
                .map(ReviewSessionAnswer::getQuestion)
                .toList();

        List<QuestionDetailResponse> questionDtos = questions.stream()
                .map(q -> toQuestionDetailResponse(q, bookmarkedIds.contains(q.getId()), session.getCategoryCode()))
                .toList();

        return new ReviewSessionDetailResponse(
                session.getId(),
                session.getSessionCode(),
                session.getReviewMode(),
                session.getCategoryCode(),
                session.getTopic() != null ? session.getTopic().getName() : null,
                session.getTotalQuestions(),
                session.getAnsweredQuestions(),
                session.getCorrectAnswers(),
                session.getIncorrectAnswers(),
                session.getStatus(),
                FORMATTER.format(session.getCreatedAt()),
                questionDtos
        );
    }

    @Override
    public ReviewAnswerResultResponse submitAnswer(Long userId, String sessionCode, ReviewAnswerRequest request) {
        ReviewSession session = sessionRepository.findBySessionCode(sessionCode)
                .orElseThrow(() -> new ResourceNotFoundException("ReviewSession", "sessionCode", sessionCode));

        if (!session.getUserId().equals(userId)) {
            throw new BadRequestException("Bạn không có quyền truy cập phiên ôn tập này");
        }

        if ("COMPLETED".equalsIgnoreCase(session.getStatus())) {
            throw new BadRequestException("Phiên ôn tập này đã hoàn thành, không thể gửi thêm đáp án");
        }

        TheoryQuestion question = questionRepository.findById(request.questionId())
                .orElseThrow(() -> new ResourceNotFoundException("TheoryQuestion", "id", request.questionId()));

        TheoryAnswer selectedAnswer = question.getAnswers().stream()
                .filter(a -> a.getId().equals(request.selectedAnswerId()))
                .findFirst()
                .orElseThrow(() -> new BadRequestException("Đáp án đã chọn không thuộc câu hỏi này"));

        // Chống gửi lặp đáp án (Idempotency)
        Optional<ReviewSessionAnswer> existingAnswer = answerRepository.findBySessionIdAndQuestionId(session.getId(), question.getId());
        if (existingAnswer.isPresent()) {
            ReviewSessionAnswer ans = existingAnswer.get();
            QuestionRetentionState state = retentionRepository.findByUserIdAndQuestionId(userId, question.getId())
                    .orElse(new QuestionRetentionState(userId, question));

            TheoryAnswer correctAnswer = question.getAnswers().stream()
                    .filter(TheoryAnswer::isCorrect)
                    .findFirst()
                    .orElse(selectedAnswer);

            return new ReviewAnswerResultResponse(
                    question.getId(),
                    ans.getSelectedAnswer() != null ? ans.getSelectedAnswer().getId() : null,
                    ans.isCorrect(),
                    correctAnswer.getId(),
                    question.getExplanation(),
                    question.getLegalReference(),
                    state.getBoxLevel(),
                    state.getConsecutiveCorrect(),
                    state.getMasteryStatus(),
                    state.getIntervalDays(),
                    state.getNextReviewAt() != null ? FORMATTER.format(state.getNextReviewAt()) : "",
                    session.getAnsweredQuestions(),
                    session.getTotalQuestions(),
                    "COMPLETED".equalsIgnoreCase(session.getStatus())
            );
        }

        boolean isCorrect = selectedAnswer.isCorrect();

        ReviewSessionAnswer sessionAnswer = new ReviewSessionAnswer(
                session,
                question,
                selectedAnswer,
                isCorrect,
                session.getAnsweredQuestions() + 1
        );
        answerRepository.save(sessionAnswer);
        session.addAnswer(sessionAnswer);
        sessionRepository.save(session);

        // Cập nhật trạng thái ghi nhớ Spaced Repetition
        QuestionRetentionState state = retentionRepository.findByUserIdAndQuestionId(userId, question.getId())
                .orElseGet(() -> new QuestionRetentionState(userId, question));
        state.recordAttempt(isCorrect);
        retentionRepository.save(state);

        TheoryAnswer correctAnswer = question.getAnswers().stream()
                .filter(TheoryAnswer::isCorrect)
                .findFirst()
                .orElse(selectedAnswer);

        return new ReviewAnswerResultResponse(
                question.getId(),
                selectedAnswer.getId(),
                isCorrect,
                correctAnswer.getId(),
                question.getExplanation(),
                question.getLegalReference(),
                state.getBoxLevel(),
                state.getConsecutiveCorrect(),
                state.getMasteryStatus(),
                state.getIntervalDays(),
                state.getNextReviewAt() != null ? FORMATTER.format(state.getNextReviewAt()) : "",
                session.getAnsweredQuestions(),
                session.getTotalQuestions(),
                "COMPLETED".equalsIgnoreCase(session.getStatus())
        );
    }

    @Override
    public ReviewSessionResultResponse completeReviewSession(Long userId, String sessionCode) {
        ReviewSession session = sessionRepository.findBySessionCode(sessionCode)
                .orElseThrow(() -> new ResourceNotFoundException("ReviewSession", "sessionCode", sessionCode));

        if (!session.getUserId().equals(userId)) {
            throw new BadRequestException("Bạn không có quyền thao tác phiên ôn tập này");
        }

        if (!"COMPLETED".equalsIgnoreCase(session.getStatus())) {
            session.completeSession();
            sessionRepository.save(session);
        }

        List<ReviewSessionAnswer> answers = answerRepository.findBySessionIdOrderByOrderIndexAsc(session.getId());
        List<TheoryQuestion> incorrectQuestions = answers.stream()
                .filter(a -> !a.isCorrect())
                .map(ReviewSessionAnswer::getQuestion)
                .toList();

        Set<Long> bookmarkedIds = new HashSet<>(bookmarkRepository.findQuestionIdsByUserId(userId));
        List<QuestionDetailResponse> needConsolidation = incorrectQuestions.stream()
                .map(q -> toQuestionDetailResponse(q, bookmarkedIds.contains(q.getId()), session.getCategoryCode()))
                .toList();

        double accuracyRate = 0.0;
        if (session.getAnsweredQuestions() > 0) {
            accuracyRate = Math.round(((double) session.getCorrectAnswers() / session.getAnsweredQuestions()) * 1000.0) / 10.0;
        }

        String suggestion;
        if (!needConsolidation.isEmpty()) {
            suggestion = "Bạn có " + needConsolidation.size() + " câu trả lời sai trong phiên này. Hãy chọn chế độ 'Ôn lại câu sai' để khắc phục ngay.";
        } else if (accuracyRate >= 90.0) {
            suggestion = "Xuất sắc! Bạn đã làm chủ hoàn toàn các câu hỏi trong phiên ôn này. Hãy tiếp tục ôn tập theo chu kỳ ngắt quãng.";
        } else {
            suggestion = "Bạn đã hoàn thành phiên ôn tập. Tiếp tục luyện tập và thi thử để nâng cao phản xạ.";
        }

        return new ReviewSessionResultResponse(
                session.getSessionCode(),
                session.getReviewMode(),
                session.getTotalQuestions(),
                session.getCorrectAnswers(),
                session.getIncorrectAnswers(),
                accuracyRate,
                session.getCompletedAt() != null ? FORMATTER.format(session.getCompletedAt()) : FORMATTER.format(Instant.now()),
                needConsolidation,
                suggestion
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewSessionSummaryDto> getReviewHistory(Long userId) {
        return sessionRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::toSummaryDto)
                .toList();
    }

    private ReviewSessionSummaryDto toSummaryDto(ReviewSession s) {
        double rate = 0.0;
        if (s.getAnsweredQuestions() > 0) {
            rate = Math.round(((double) s.getCorrectAnswers() / s.getAnsweredQuestions()) * 1000.0) / 10.0;
        }
        return new ReviewSessionSummaryDto(
                s.getId(),
                s.getSessionCode(),
                s.getReviewMode(),
                s.getCategoryCode(),
                s.getTopic() != null ? s.getTopic().getName() : null,
                s.getTotalQuestions(),
                s.getAnsweredQuestions(),
                s.getCorrectAnswers(),
                s.getIncorrectAnswers(),
                rate,
                s.getStatus(),
                FORMATTER.format(s.getCreatedAt()),
                s.getCompletedAt() != null ? FORMATTER.format(s.getCompletedAt()) : null
        );
    }

    private QuestionDetailResponse toQuestionDetailResponse(TheoryQuestion q, boolean isBookmarked) {
        return toQuestionDetailResponse(q, isBookmarked, null);
    }

    private QuestionDetailResponse toQuestionDetailResponse(TheoryQuestion q, boolean isBookmarked, String category) {
        List<StudyAnswerOptionResponse> answerDtos = q.getAnswers().stream()
                .map(a -> new StudyAnswerOptionResponse(a.getId(), a.getAnswerText(), a.getOrderIndex(), a.isCorrect()))
                .toList();

        return new QuestionDetailResponse(
                q.getId(),
                q.getCategoryCode(),
                q.getTopic() != null ? q.getTopic().getId() : null,
                q.getTopic() != null ? q.getTopic().getName() : "Quy tắc chung",
                q.getQuestionNumber(),
                q.getContent(),
                q.getImageUrl(),
                q.getExplanation(),
                q.isParalysisForCategory(category),
                q.getLegalReference(),
                isBookmarked,
                answerDtos
        );
    }
}
