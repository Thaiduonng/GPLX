package vn.edu.gplx.modules.learning.application;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import vn.edu.gplx.modules.learning.api.dto.QuestionImportResultResponse;
import vn.edu.gplx.modules.learning.api.dto.QuestionUpsertRequest;
import vn.edu.gplx.modules.learning.application.impl.QuestionAdminServiceImpl;
import vn.edu.gplx.modules.learning.domain.TheoryQuestion;
import vn.edu.gplx.modules.learning.domain.TheoryTopic;
import vn.edu.gplx.modules.learning.infrastructure.TheoryQuestionRepository;
import vn.edu.gplx.modules.learning.infrastructure.TheoryTopicRepository;
import vn.edu.gplx.shared.exception.BadRequestException;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class QuestionAdminServiceTest {

    @Mock
    private TheoryQuestionRepository questionRepository;

    @Mock
    private TheoryTopicRepository topicRepository;

    @Mock
    private TrafficSignService trafficSignService;

    @InjectMocks
    private QuestionAdminServiceImpl questionAdminService;

    @Test
    @DisplayName("Validation câu hỏi: Bắt buộc tối thiểu 2 đáp án")
    void should_throwException_when_questionHasLessThanTwoAnswers() {
        QuestionUpsertRequest request = new QuestionUpsertRequest(
                "B2", 1L, 1, "Nội dung câu hỏi?", null, "Giải thích", false, null,
                List.of(new QuestionUpsertRequest.AnswerUpsertItem(null, "Đáp án 1", true, 1))
        );

        assertThatThrownBy(() -> questionAdminService.createQuestion(request))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("ít nhất 2 phương án trả lời");
    }

    @Test
    @DisplayName("Validation câu hỏi: Bắt buộc phải có đúng 1 đáp án đúng (quy tắc GPLX Việt Nam)")
    void should_throwException_when_questionHasMultipleCorrectAnswers() {
        QuestionUpsertRequest request = new QuestionUpsertRequest(
                "B2", 1L, 1, "Nội dung câu hỏi?", null, "Giải thích", false, null,
                List.of(
                        new QuestionUpsertRequest.AnswerUpsertItem(null, "Đáp án 1", true, 1),
                        new QuestionUpsertRequest.AnswerUpsertItem(null, "Đáp án 2", true, 2)
                )
        );

        assertThatThrownBy(() -> questionAdminService.createQuestion(request))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("phải có duy nhất 1 đáp án đúng");
    }

    @Test
    @DisplayName("Bulk Import: Bỏ qua hoặc ghi nhận lỗi khi câu hỏi không hợp lệ, lưu câu hỏi hợp lệ")
    void should_importValidQuestions_andReportInvalidOnes() {
        QuestionUpsertRequest valid = new QuestionUpsertRequest(
                "B2", null, 10, "Khi lái xe cần quan sát gì?", null, "Cần chú ý", false, null,
                List.of(
                        new QuestionUpsertRequest.AnswerUpsertItem(null, "Quan sát gương", true, 1),
                        new QuestionUpsertRequest.AnswerUpsertItem(null, "Không cần quan sát", false, 2)
                )
        );

        QuestionUpsertRequest invalid = new QuestionUpsertRequest(
                "B2", null, 11, "Câu hỏi lỗi?", null, "Không có đáp án đúng", false, null,
                List.of(
                        new QuestionUpsertRequest.AnswerUpsertItem(null, "Sai 1", false, 1),
                        new QuestionUpsertRequest.AnswerUpsertItem(null, "Sai 2", false, 2)
                )
        );

        TheoryTopic topic1 = new TheoryTopic("CH1_RULES", "Khái niệm và quy tắc", "Mô tả", 1, 166, 1);
        when(topicRepository.findByCode("CH1_RULES")).thenReturn(Optional.of(topic1));
        when(questionRepository.findByQuestionNumber(10)).thenReturn(Optional.empty());
        when(questionRepository.save(any(TheoryQuestion.class))).thenAnswer(i -> i.getArgument(0));

        QuestionImportResultResponse result = questionAdminService.importQuestions(List.of(valid, invalid));

        assertThat(result.totalReceived()).isEqualTo(2);
        assertThat(result.successCount()).isEqualTo(1);
        assertThat(result.failureCount()).isEqualTo(1);
        assertThat(result.errors()).hasSize(1);
        assertThat(result.errors().get(0)).contains("duy nhất 1 đáp án đúng");
    }
    @Test
    @DisplayName("Tạo câu hỏi thành công khi dữ liệu hợp lệ")
    void should_createQuestion_successfully_when_valid() {
        QuestionUpsertRequest request = new QuestionUpsertRequest(
                "B1", 1L, 100, "Nội dung câu hỏi số 100?", "/img/q100.png", "Giải thích q100", false, "TT04",
                List.of(
                        new QuestionUpsertRequest.AnswerUpsertItem(null, "Đáp án 1", true, 1),
                        new QuestionUpsertRequest.AnswerUpsertItem(null, "Đáp án 2", false, 2)
                )
        );
        TheoryTopic topic = new TheoryTopic("CH1_RULES", "Khái niệm", "Mô tả", 1, 166, 1);
        when(topicRepository.findById(1L)).thenReturn(Optional.of(topic));
        when(questionRepository.save(any(TheoryQuestion.class))).thenAnswer(i -> i.getArgument(0));
        var response = questionAdminService.createQuestion(request);
        assertThat(response).isNotNull();
        assertThat(response.questionNumber()).isEqualTo(100);
        assertThat(response.categoryCode()).isEqualTo("B1");
    }

    @Test
    @DisplayName("Xóa câu hỏi thành công")
    void should_deleteQuestion_successfully() {
        TheoryQuestion q = new TheoryQuestion("B1", 50, "Nội dung", null, "GT", false);
        when(questionRepository.existsById(50L)).thenReturn(true);
        questionAdminService.deleteQuestion(50L);
        org.mockito.Mockito.verify(questionRepository).deleteById(50L);
    }

    private QuestionUpsertRequest requestWithSign(String signCode) {
        return new QuestionUpsertRequest(
                "B", 1L, 320, "Biển nào cấm đi ngược chiều?", null, "GT", false, null,
                List.of(
                        new QuestionUpsertRequest.AnswerUpsertItem(null, "Biển 1", true, 1),
                        new QuestionUpsertRequest.AnswerUpsertItem(null, "Biển 2", false, 2)
                ),
                signCode
        );
    }

    @Test
    @DisplayName("Liên kết biển báo: mã không có trong danh mục bị từ chối")
    void upsertQuestionWithUnknownSignCodeIsRejected() {
        when(trafficSignService.existsByCode("X.999")).thenReturn(false);

        assertThatThrownBy(() -> questionAdminService.createQuestion(requestWithSign("X.999")))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("Mã biển báo không tồn tại trong danh mục");
    }

    @Test
    @DisplayName("Liên kết biển báo: mã hợp lệ được lưu và trả về trong chi tiết")
    void upsertQuestionWithSignCodeIsReturnedInDetail() {
        TheoryTopic topic = new TheoryTopic("CH6_SIGNS", "Biển báo", "Mô tả", 6, 178, 0);
        when(topicRepository.findById(1L)).thenReturn(Optional.of(topic));
        when(trafficSignService.existsByCode("P.102")).thenReturn(true);
        when(questionRepository.save(any(TheoryQuestion.class))).thenAnswer(i -> i.getArgument(0));

        var response = questionAdminService.createQuestion(requestWithSign("P.102"));

        assertThat(response.trafficSignCode()).isEqualTo("P.102");
    }
}
