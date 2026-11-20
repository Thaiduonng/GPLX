package vn.edu.gplx.modules.learning.api.dto;

public record PracticeAnswerResultResponse(
        Long questionId,
        Long selectedAnswerId,
        Long correctAnswerId,
        boolean isCorrect,
        String explanation,
        String legalReference,
        int currentProgressTotal,
        int currentProgressCorrect
) {
}
