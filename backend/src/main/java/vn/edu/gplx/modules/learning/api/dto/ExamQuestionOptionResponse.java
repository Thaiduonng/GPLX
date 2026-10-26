package vn.edu.gplx.modules.learning.api.dto;

public record ExamQuestionOptionResponse(
        Long id,
        String answerText,
        int orderIndex
) {
}
