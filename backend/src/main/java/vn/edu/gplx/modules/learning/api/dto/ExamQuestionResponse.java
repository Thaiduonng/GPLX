package vn.edu.gplx.modules.learning.api.dto;

import java.util.List;

public record ExamQuestionResponse(
        Long id,
        int questionIndex,
        int questionNumber,
        String content,
        String imageUrl,
        boolean isParalysis,
        Long selectedAnswerId,
        List<ExamQuestionOptionResponse> options
) {
}
