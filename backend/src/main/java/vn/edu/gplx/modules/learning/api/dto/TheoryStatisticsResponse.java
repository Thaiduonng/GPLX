package vn.edu.gplx.modules.learning.api.dto;

import java.util.List;

public record TheoryStatisticsResponse(
        long totalQuestionsInBank,
        long questionsLearned,
        double completionRate,
        long totalAnswersSubmitted,
        long correctAnswersSubmitted,
        double accuracyRate,
        long examsTaken,
        long examsPassed,
        long examsFailed,
        double examPassRate,
        long bookmarkedCount,
        long incorrectQuestionsCount,
        List<TopicProgressDto> topicProgress
) {
    public record TopicProgressDto(
            Long topicId,
            String topicCode,
            String topicName,
            int totalQuestions,
            int paralysisQuestions,
            int answeredQuestions,
            int correctQuestions,
            double progressPercentage
    ) {}
}
