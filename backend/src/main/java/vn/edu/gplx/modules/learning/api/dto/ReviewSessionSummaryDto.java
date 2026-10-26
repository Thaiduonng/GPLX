package vn.edu.gplx.modules.learning.api.dto;

public record ReviewSessionSummaryDto(
        Long id,
        String sessionCode,
        String reviewMode,
        String categoryCode,
        String topicName,
        int totalQuestions,
        int answeredQuestions,
        int correctAnswers,
        int incorrectAnswers,
        double accuracyRate,
        String status,
        String createdAt,
        String completedAt
) {
}
