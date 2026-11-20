package vn.edu.gplx.modules.learning.api.dto;

public record ReviewAnswerResultResponse(
        Long questionId,
        Long selectedAnswerId,
        boolean correct,
        Long correctAnswerId,
        String explanation,
        String legalReference,
        int boxLevel,
        int consecutiveCorrect,
        String masteryStatus,
        int intervalDays,
        String nextReviewAt,
        int sessionAnswered,
        int sessionTotal,
        boolean sessionCompleted
) {
}
