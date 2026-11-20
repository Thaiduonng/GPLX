package vn.edu.gplx.modules.learning.api.dto;

import java.util.List;

public record ReviewSessionResultResponse(
        String sessionCode,
        String reviewMode,
        int totalQuestions,
        int correctAnswers,
        int incorrectAnswers,
        double accuracyRate,
        String completedAt,
        List<QuestionDetailResponse> questionsNeedingConsolidation,
        String suggestedNextStep
) {
}
