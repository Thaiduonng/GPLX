package vn.edu.gplx.modules.learning.api.dto;

public record StudyAnswerOptionResponse(
        Long id,
        String answerText,
        int orderIndex,
        boolean isCorrect
) {
}
