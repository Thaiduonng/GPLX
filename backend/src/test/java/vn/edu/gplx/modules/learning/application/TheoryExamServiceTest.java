package vn.edu.gplx.modules.learning.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import vn.edu.gplx.modules.learning.api.dto.ExamResultResponse;
import vn.edu.gplx.modules.learning.api.dto.ExamSubmitRequest;
import vn.edu.gplx.modules.learning.application.impl.TheoryExamServiceImpl;
import vn.edu.gplx.modules.learning.domain.TheoryAnswer;
import vn.edu.gplx.modules.learning.domain.TheoryQuestion;
import vn.edu.gplx.modules.learning.infrastructure.TheoryQuestionRepository;

import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TheoryExamServiceTest {

    @Mock
    private TheoryQuestionRepository questionRepository;

    @InjectMocks
    private TheoryExamServiceImpl examService;

    private TheoryQuestion normalQuestion;
    private TheoryQuestion paralysisQuestion;

    @BeforeEach
    void setUp() {
        // Câu hỏi bình thường
        normalQuestion = new TheoryQuestion("B1", 1, "Tốc độ tối đa?", null, "Giải thích", false);
        ReflectionTestUtils.setField(normalQuestion, "id", 101L);
        TheoryAnswer ans1 = new TheoryAnswer(normalQuestion, "50 km/h", true, 1);
        ReflectionTestUtils.setField(ans1, "id", 1001L);
        TheoryAnswer ans2 = new TheoryAnswer(normalQuestion, "60 km/h", false, 2);
        ReflectionTestUtils.setField(ans2, "id", 1002L);
        normalQuestion.addAnswer(ans1);
        normalQuestion.addAnswer(ans2);

        // Câu hỏi điểm liệt
        paralysisQuestion = new TheoryQuestion("B1", 2, "Hành vi cồn khi lái xe?", null, "Nghiêm cấm", true);
        ReflectionTestUtils.setField(paralysisQuestion, "id", 102L);
        TheoryAnswer ans3 = new TheoryAnswer(paralysisQuestion, "Bị nghiêm cấm", true, 1);
        ReflectionTestUtils.setField(ans3, "id", 1003L);
        TheoryAnswer ans4 = new TheoryAnswer(paralysisQuestion, "Được phép", false, 2);
        ReflectionTestUtils.setField(ans4, "id", 1004L);
        paralysisQuestion.addAnswer(ans3);
        paralysisQuestion.addAnswer(ans4);
    }

    @Test
    @DisplayName("Thi thử lý thuyết: Đạt bài thi khi trả lời đúng toàn bộ câu hỏi")
    void should_passMockExam_when_scoreAbovePassingAndNoParalysisFailed() {
        when(questionRepository.findById(101L)).thenReturn(Optional.of(normalQuestion));
        when(questionRepository.findById(102L)).thenReturn(Optional.of(paralysisQuestion));

        ExamSubmitRequest request = new ExamSubmitRequest("B1", Map.of(
                101L, 1001L, // Đúng
                102L, 1003L  // Đúng câu điểm liệt
        ));

        ExamResultResponse response = examService.submitMockExam(1L, request);

        assertThat(response.passed()).isTrue();
        assertThat(response.failedDueToParalysisQuestion()).isFalse();
        assertThat(response.correctAnswers()).isEqualTo(2);
        assertThat(response.wrongAnswers()).isEqualTo(0);
    }

    @Test
    @DisplayName("Quy chế sát hạch: Trượt ngay lập tức khi làm sai câu hỏi điểm liệt")
    void should_failMockExam_when_paralysisQuestionAnsweredWrong() {
        when(questionRepository.findById(101L)).thenReturn(Optional.of(normalQuestion));
        when(questionRepository.findById(102L)).thenReturn(Optional.of(paralysisQuestion));

        ExamSubmitRequest request = new ExamSubmitRequest("B1", Map.of(
                101L, 1001L, // Đúng câu 1
                102L, 1004L  // SAI CÂU ĐIỂM LIỆT
        ));

        ExamResultResponse response = examService.submitMockExam(1L, request);

        assertThat(response.passed()).isFalse();
        assertThat(response.failedDueToParalysisQuestion()).isTrue();
        assertThat(response.correctAnswers()).isEqualTo(1);
        assertThat(response.wrongAnswers()).isEqualTo(1);
    }
}
