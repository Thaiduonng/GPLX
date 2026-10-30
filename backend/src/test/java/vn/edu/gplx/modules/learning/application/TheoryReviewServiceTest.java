package vn.edu.gplx.modules.learning.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import vn.edu.gplx.modules.learning.api.dto.ReviewAnswerRequest;
import vn.edu.gplx.modules.learning.api.dto.ReviewAnswerResultResponse;
import vn.edu.gplx.modules.learning.api.dto.ReviewDashboardOverviewResponse;
import vn.edu.gplx.modules.learning.api.dto.ReviewSessionDetailResponse;
import vn.edu.gplx.modules.learning.api.dto.ReviewSessionResultResponse;
import vn.edu.gplx.modules.learning.api.dto.ReviewSessionStartRequest;
import vn.edu.gplx.modules.learning.application.impl.TheoryReviewServiceImpl;
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

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("TheoryReviewService Unit Tests")
class TheoryReviewServiceTest {

    @Mock
    private QuestionRetentionStateRepository retentionRepository;

    @Mock
    private ReviewSessionRepository sessionRepository;

    @Mock
    private ReviewSessionAnswerRepository answerRepository;

    @Mock
    private TheoryQuestionRepository questionRepository;

    @Mock
    private TheoryTopicRepository topicRepository;

    @Mock
    private BookmarkedQuestionRepository bookmarkRepository;

    @Mock
    private PracticeAnswerRepository practiceAnswerRepository;

    @InjectMocks
    private TheoryReviewServiceImpl reviewService;

    private TheoryQuestion sampleQuestion;
    private TheoryAnswer sampleCorrectAnswer;
    private TheoryAnswer sampleWrongAnswer;
    private TheoryTopic sampleTopic;

    @BeforeEach
    void setUp() {
        sampleTopic = new TheoryTopic();
        sampleTopic.setId(1L);
        sampleTopic.setCode("CH1_RULES");
        sampleTopic.setName("Khái niệm và quy tắc giao thông");

        sampleQuestion = new TheoryQuestion();
        sampleQuestion.setId(10L);
        sampleQuestion.setQuestionNumber(10);
        sampleQuestion.setContent("Hành vi cố ý không cứu giúp người bị nạn có bị nghiêm cấm không?");
        sampleQuestion.setCategoryCode("ALL");
        sampleQuestion.setTopic(sampleTopic);
        sampleQuestion.setParalysis(true);
        sampleQuestion.setExplanation("Bị nghiêm cấm theo quy định pháp luật.");
        sampleQuestion.setLegalReference("Khoản 18 Điều 8 Luật GTĐB");

        sampleCorrectAnswer = new TheoryAnswer();
        sampleCorrectAnswer.setId(101L);
        sampleCorrectAnswer.setQuestion(sampleQuestion);
        sampleCorrectAnswer.setAnswerText("Bị nghiêm cấm.");
        sampleCorrectAnswer.setCorrect(true);
        sampleCorrectAnswer.setOrderIndex(1);

        sampleWrongAnswer = new TheoryAnswer();
        sampleWrongAnswer.setId(102L);
        sampleWrongAnswer.setQuestion(sampleQuestion);
        sampleWrongAnswer.setAnswerText("Không bị nghiêm cấm.");
        sampleWrongAnswer.setCorrect(false);
        sampleWrongAnswer.setOrderIndex(2);

        List<TheoryAnswer> answers = new ArrayList<>();
        answers.add(sampleCorrectAnswer);
        answers.add(sampleWrongAnswer);
        sampleQuestion.setAnswers(answers);
    }

    @Test
    @DisplayName("Leitner & Spaced Repetition logic: Cập nhật hộp và chu kỳ ngày đúng")
    void testSpacedRepetitionProgressionAndReset() {
        QuestionRetentionState state = new QuestionRetentionState(1L, sampleQuestion);
        assertEquals(1, state.getBoxLevel());
        assertEquals(1, state.getIntervalDays());
        assertEquals("NEEDS_PRACTICE", state.getMasteryStatus());
        assertTrue(state.getPriorityScore() > 0);

        // Lần 1: Trả lời đúng -> Lên hộp 2, chu kỳ 3 ngày
        state.recordAttempt(true);
        assertEquals(2, state.getBoxLevel());
        assertEquals(3, state.getIntervalDays());
        assertEquals(1, state.getConsecutiveCorrect());
        assertEquals("REVIEWING", state.getMasteryStatus());

        // Lần 2: Trả lời đúng -> Lên hộp 3, chu kỳ 7 ngày
        state.recordAttempt(true);
        assertEquals(3, state.getBoxLevel());
        assertEquals(7, state.getIntervalDays());
        assertEquals(2, state.getConsecutiveCorrect());

        // Lần 3: Trả lời đúng -> Lên hộp 4, chu kỳ 14 ngày, thành thạo (MASTERED)
        state.recordAttempt(true);
        assertEquals(4, state.getBoxLevel());
        assertEquals(14, state.getIntervalDays());
        assertEquals(3, state.getConsecutiveCorrect());
        assertEquals("MASTERED", state.getMasteryStatus());

        // Lần 4: Trả lời sai -> Reset về hộp 1, chu kỳ 1 ngày, cần củng cố lại (NEEDS_PRACTICE)
        state.recordAttempt(false);
        assertEquals(1, state.getBoxLevel());
        assertEquals(1, state.getIntervalDays());
        assertEquals(0, state.getConsecutiveCorrect());
        assertEquals(1, state.getIncorrectAttempts());
        assertEquals("NEEDS_PRACTICE", state.getMasteryStatus());
        assertTrue(state.getPriorityScore() >= 35.0, "Câu điểm liệt bị sai phải có điểm ưu tiên rất cao");
    }

    @Test
    @DisplayName("Khởi tạo Dashboard khi học viên mới chưa có lịch sử trả lời")
    void testGetDashboardOverviewNewUser() {
        Long userId = 99L;
        when(retentionRepository.countUnmasteredWrongQuestions(userId)).thenReturn(0L);
        when(retentionRepository.countDueToday(eq(userId), any())).thenReturn(0L);
        when(retentionRepository.countParalysisNeedingReview(userId)).thenReturn(0L);
        when(bookmarkRepository.countByUserId(userId)).thenReturn(0L);
        when(retentionRepository.countByUserIdAndMasteryStatus(userId, "MASTERED")).thenReturn(0L);
        when(retentionRepository.countByUserIdAndMasteryStatus(userId, "REVIEWING")).thenReturn(0L);
        when(sessionRepository.findRecentCompletedSessions(eq(userId), any())).thenReturn(Collections.emptyList());
        when(topicRepository.findAllByOrderByOrderIndexAsc()).thenReturn(List.of(sampleTopic));
        when(retentionRepository.findByUserId(userId)).thenReturn(Collections.emptyList());
        when(sessionRepository.findByUserIdOrderByCreatedAtDesc(userId)).thenReturn(Collections.emptyList());

        ReviewDashboardOverviewResponse overview = reviewService.getDashboardOverview(userId, "ALL");

        assertNotNull(overview);
        assertEquals(0, overview.totalQuestionsNeedingReview());
        assertEquals(0, overview.unconsolidatedWrongCount());
        assertEquals(0, overview.dueTodayCount());
        assertEquals("SMART", overview.recommendedMode());
        assertEquals(1, overview.topicStats().size());
    }

    @Test
    @DisplayName("Khởi tạo phiên ôn tập chế độ SMART thành công")
    void testStartReviewSessionSmartMode() {
        Long userId = 1L;
        ReviewSessionStartRequest request = new ReviewSessionStartRequest("SMART", "ALL", null, 10);

        when(practiceAnswerRepository.findIncorrectQuestionIdsByUserId(userId)).thenReturn(Collections.emptyList());
        when(retentionRepository.findDueForReview(eq(userId), any())).thenReturn(Collections.emptyList());
        when(retentionRepository.findByUserIdOrderByPriorityScoreDesc(userId)).thenReturn(Collections.emptyList());
        when(questionRepository.findParalysisForLicenseCategory("ALL")).thenReturn(List.of(sampleQuestion));
        when(bookmarkRepository.findQuestionIdsByUserId(userId)).thenReturn(Collections.emptyList());

        when(sessionRepository.save(any(ReviewSession.class))).thenAnswer(invocation -> {
            ReviewSession s = invocation.getArgument(0);
            s.setId(100L);
            s.setCreatedAt(java.time.Instant.now());
            return s;
        });

        ReviewSessionDetailResponse response = reviewService.startReviewSession(userId, request);

        assertNotNull(response);
        assertEquals("SMART", response.reviewMode());
        assertEquals(1, response.totalQuestions());
        assertEquals(1, response.questions().size());
        assertEquals(10L, response.questions().get(0).id());
        assertTrue(response.sessionCode().startsWith("REV-"));
    }

    @Test
    @DisplayName("Nộp đáp án ôn tập chính xác và cập nhật điểm thành thạo")
    void testSubmitAnswerCorrect() {
        Long userId = 1L;
        String sessionCode = "REV-TEST-001";
        ReviewSession session = new ReviewSession(sessionCode, userId, "SMART", "ALL", sampleTopic, 1);
        session.setId(200L);

        when(sessionRepository.findBySessionCode(sessionCode)).thenReturn(Optional.of(session));
        when(questionRepository.findById(10L)).thenReturn(Optional.of(sampleQuestion));
        when(answerRepository.findBySessionIdAndQuestionId(200L, 10L)).thenReturn(Optional.empty());
        when(retentionRepository.findByUserIdAndQuestionId(userId, 10L)).thenReturn(Optional.empty());

        ReviewAnswerRequest request = new ReviewAnswerRequest(10L, 101L); // 101L is correct

        ReviewAnswerResultResponse result = reviewService.submitAnswer(userId, sessionCode, request);

        assertNotNull(result);
        assertTrue(result.correct());
        assertEquals(101L, result.correctAnswerId());
        assertEquals(2, result.boxLevel());
        assertEquals(1, result.sessionAnswered());
        assertTrue(result.sessionCompleted());
        verify(retentionRepository, times(1)).save(any(QuestionRetentionState.class));
        verify(sessionRepository, times(1)).save(session);
    }

    @Test
    @DisplayName("Hoàn thành phiên ôn tập và sinh gợi ý củng cố")
    void testCompleteReviewSession() {
        Long userId = 1L;
        String sessionCode = "REV-TEST-002";
        ReviewSession session = new ReviewSession(sessionCode, userId, "SMART", "ALL", sampleTopic, 2);
        session.setId(300L);

        ReviewSessionAnswer answer1 = new ReviewSessionAnswer(session, sampleQuestion, sampleCorrectAnswer, true, 1);
        ReviewSessionAnswer answer2 = new ReviewSessionAnswer(session, sampleQuestion, sampleWrongAnswer, false, 2);
        session.setAnsweredQuestions(2);
        session.setCorrectAnswers(1);
        session.setIncorrectAnswers(1);

        when(sessionRepository.findBySessionCode(sessionCode)).thenReturn(Optional.of(session));
        when(answerRepository.findBySessionIdOrderByOrderIndexAsc(300L)).thenReturn(List.of(answer1, answer2));
        when(bookmarkRepository.findQuestionIdsByUserId(userId)).thenReturn(Collections.emptyList());

        ReviewSessionResultResponse result = reviewService.completeReviewSession(userId, sessionCode);

        assertNotNull(result);
        assertEquals(2, result.totalQuestions());
        assertEquals(1, result.correctAnswers());
        assertEquals(1, result.incorrectAnswers());
        assertEquals(50.0, result.accuracyRate());
        assertEquals(1, result.questionsNeedingConsolidation().size());
        assertTrue(result.suggestedNextStep().contains("Ôn lại câu sai"));
    }
}
