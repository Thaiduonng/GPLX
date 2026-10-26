package vn.edu.gplx.modules.learning.api.dto;

import java.util.List;

public record ReviewSessionDetailResponse(
        Long sessionId,
        String sessionCode,
        String reviewMode,
        String categoryCode,
        String topicName,
        int totalQuestions,
        int answeredQuestions,
        int correctAnswers,
        int incorrectAnswers,
        String status,
        String createdAt,
        List<QuestionDetailResponse> questions
) {
}
