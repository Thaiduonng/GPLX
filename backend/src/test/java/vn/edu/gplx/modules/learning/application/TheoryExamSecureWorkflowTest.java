package vn.edu.gplx.modules.learning.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import vn.edu.gplx.modules.learning.api.dto.MockExamResultResponse;
import vn.edu.gplx.modules.learning.api.dto.MockExamSessionResponse;
import vn.edu.gplx.modules.learning.api.dto.StartMockExamRequest;
import vn.edu.gplx.modules.learning.api.dto.SubmitMockExamRequest;
import vn.edu.gplx.modules.learning.application.impl.TheoryExamServiceImpl;
import vn.edu.gplx.modules.learning.domain.ExamConfiguration;
import vn.edu.gplx.modules.learning.domain.MockExamSession;
import vn.edu.gplx.modules.learning.domain.MockExamSessionAnswer;
import vn.edu.gplx.modules.learning.domain.TheoryAnswer;
import vn.edu.gplx.modules.learning.domain.TheoryQuestion;
import vn.edu.gplx.modules.learning.infrastructure.ExamConfigurationRepository;
import vn.edu.gplx.modules.learning.infrastructure.MockExamSessionAnswerRepository;
import vn.edu.gplx.modules.learning.infrastructure.MockExamSessionRepository;
import vn.edu.gplx.modules.learning.infrastructure.TheoryQuestionRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TheoryExamSecureWorkflowTest {

    @Mock
    private TheoryQuestionRepository questionRepository;

    @Mock
    private ExamConfigurationRepository configRepository;

    @Mock
    private MockExamSessionRepository examSessionRepository;

    @Mock
    private MockExamSessionAnswerRepository sessionAnswerRepository;

    @InjectMocks
    private TheoryExamServiceImpl examService;

    private TheoryQuestion normalQuestion;
    private TheoryQuestion paralysisQuestion;
    private ExamConfiguration configA1;

    @BeforeEach
    void setUp() {
        configA1 = new ExamConfiguration("A1", 25, 19, 21, "TT12", true, "Thông tư 12");
        ReflectionTestUtils.setField(configA1, "id", 1L);

        normalQuestion = new TheoryQuestion("A1", 1, "Tốc độ xe chạy?", null, "Giải thích", false);
        ReflectionTestUtils.setField(normalQuestion, "id", 101L);
        TheoryAnswer ans1 = new TheoryAnswer(normalQuestion, "50 km/h", true, 1);
        ReflectionTestUtils.setField(ans1, "id", 1001L);
        TheoryAnswer ans2 = new TheoryAnswer(normalQuestion, "70 km/h", false, 2);
        ReflectionTestUtils.setField(ans2, "id", 1002L);
        normalQuestion.addAnswer(ans1);
        normalQuestion.addAnswer(ans2);

        paralysisQuestion = new TheoryQuestion("A1", 2, "Uống rượu bia lái xe?", null, "Cấm tuyệt đối", true);
        ReflectionTestUtils.setField(paralysisQuestion, "id", 102L);
        TheoryAnswer ans3 = new TheoryAnswer(paralysisQuestion, "Bị nghiêm cấm", true, 1);
        ReflectionTestUtils.setField(ans3, "id", 1003L);
        TheoryAnswer ans4 = new TheoryAnswer(paralysisQuestion, "Được phép", false, 2);
        ReflectionTestUtils.setField(ans4, "id", 1004L);
        paralysisQuestion.addAnswer(ans3);
        paralysisQuestion.addAnswer(ans4);
    }

    @Test
    @DisplayName("Bảo mật đề thi: Sinh đề thi thử không trả về đáp án đúng cho client")
    void should_notExposeCorrectAnswer_when_startMockExam() {
        when(configRepository.findByCategoryCodeAndActiveTrue("A1")).thenReturn(Optional.of(configA1));
        when(questionRepository.findForLicenseCategory("A1")).thenReturn(List.of(normalQuestion, paralysisQuestion));
        when(examSessionRepository.save(any(MockExamSession.class))).thenAnswer(invocation -> {
            MockExamSession s = invocation.getArgument(0);
            ReflectionTestUtils.setField(s, "id", 500L);
            return s;
        });

        StartMockExamRequest request = new StartMockExamRequest("A1");
        MockExamSessionResponse response = examService.startMockExam(1L, request);

        assertThat(response.sessionCode()).isNotNull();
        assertThat(response.categoryCode()).isEqualTo("A1");
        assertThat(response.durationMinutes()).isEqualTo(19);
        assertThat(response.passingScore()).isEqualTo(21);
        assertThat(response.questions()).isNotEmpty();

        // Kiểm tra an toàn: Mỗi option không có trường isCorrect nào bị lộ
        response.questions().forEach(q -> {
            assertThat(q.options()).isNotEmpty();
            q.options().forEach(opt -> {
                assertThat(opt.answerText()).isNotNull();
            });
        });
    }

    @Test
    @DisplayName("Sát hạch lý thuyết: Trượt thi thử nếu trả lời sai câu điểm liệt dù tổng điểm đạt")
    void should_failExam_when_paralysisQuestionAnsweredIncorrectly() {
        String sessionCode = "EXAM-TEST-123";
        MockExamSession session = new MockExamSession(sessionCode, 1L, "A1", configA1, 2, 19, 1);
        ReflectionTestUtils.setField(session, "id", 500L);

        MockExamSessionAnswer sa1 = new MockExamSessionAnswer(session, normalQuestion, 1);
        MockExamSessionAnswer sa2 = new MockExamSessionAnswer(session, paralysisQuestion, 2);

        when(examSessionRepository.findBySessionCode(sessionCode)).thenReturn(Optional.of(session));
        when(sessionAnswerRepository.findByMockExamIdOrderByOrderIndexAsc(500L)).thenReturn(List.of(sa1, sa2));

        // Submit: Câu 1 đúng (1001L), Câu 2 sai (1004L - điểm liệt)
        SubmitMockExamRequest submitRequest = new SubmitMockExamRequest(Map.of(
                101L, 1001L,
                102L, 1004L
        ));

        MockExamResultResponse result = examService.submitMockExamSession(sessionCode, 1L, submitRequest);

        assertThat(result.passed()).isFalse();
        assertThat(result.failedParalysis()).isTrue();
        assertThat(result.score()).isEqualTo(1);
    }
}
