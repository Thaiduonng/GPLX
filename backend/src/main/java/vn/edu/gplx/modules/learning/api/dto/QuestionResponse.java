package vn.edu.gplx.modules.learning.api.dto;

import java.util.List;

public record QuestionResponse(
        Long id,
        String categoryCode,
        int questionNumber,
        String content,
        String imageUrl,
        String explanation,
        boolean isParalysis,
        List<AnswerResponse> answers
) {
}
