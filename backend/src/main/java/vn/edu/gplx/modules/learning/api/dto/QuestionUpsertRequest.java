package vn.edu.gplx.modules.learning.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

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
        List<AnswerUpsertItem> answers
) {
    public record AnswerUpsertItem(
            Long id,
            @NotBlank String answerText,
            boolean isCorrect,
            int orderIndex
    ) {}
}
