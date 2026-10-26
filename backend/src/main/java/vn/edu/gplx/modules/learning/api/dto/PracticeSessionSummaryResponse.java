package vn.edu.gplx.modules.learning.api.dto;

import java.time.Instant;

public record PracticeSessionSummaryResponse(
        Long id,
        String sessionCode,
        String practiceMode,
        String categoryCode,
        Long topicId,
        String topicName,
        int totalQuestions,
        int answeredQuestions,
        int correctAnswers,
        String status,
        Instant createdAt,
        Instant completedAt
) {
}
