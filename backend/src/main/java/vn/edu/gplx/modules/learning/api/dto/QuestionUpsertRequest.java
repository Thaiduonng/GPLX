package vn.edu.gplx.modules.learning.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record QuestionUpsertRequest(
        @NotBlank String categoryCode,
        Long topicId,
        @NotNull int questionNumber,
        @NotBlank String content,
        String imageUrl,
        String explanation,
        boolean isParalysis,
        String legalReference,
        List<AnswerUpsertItem> answers,
        @Size(max = 20) String trafficSignCode
) {
    /** Giữ tương thích cho nơi tạo yêu cầu chưa có mã biển báo (vd import Excel cũ). */
    public QuestionUpsertRequest(String categoryCode, Long topicId, int questionNumber, String content, String imageUrl,
                                 String explanation, boolean isParalysis, String legalReference,
                                 List<AnswerUpsertItem> answers) {
        this(categoryCode, topicId, questionNumber, content, imageUrl, explanation, isParalysis, legalReference, answers, null);
    }

    public record AnswerUpsertItem(
            Long id,
            @NotBlank String answerText,
            boolean isCorrect,
            int orderIndex
    ) {}
}
