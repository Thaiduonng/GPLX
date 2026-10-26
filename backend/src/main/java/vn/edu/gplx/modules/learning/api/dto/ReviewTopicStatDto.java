package vn.edu.gplx.modules.learning.api.dto;

public record ReviewTopicStatDto(
        Long topicId,
        String topicCode,
        String topicName,
        int totalAnswered,
        int wrongCount,
        int needReviewCount,
        double recentAccuracyRate,
        String lastReviewedAt,
        String priorityLevel
) {
}
