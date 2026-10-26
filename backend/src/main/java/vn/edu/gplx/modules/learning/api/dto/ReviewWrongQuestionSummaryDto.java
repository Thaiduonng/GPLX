package vn.edu.gplx.modules.learning.api.dto;

public record ReviewWrongQuestionSummaryDto(
        Long questionId,
        int questionNumber,
        String content,
        Long topicId,
        String topicName,
        String categoryCode,
        boolean isParalysis,
        int wrongAttempts,
        int correctAttempts,
        String lastWrongAt,
        int consecutiveCorrect,
        String masteryStatus,
        double priorityScore
) {
}
