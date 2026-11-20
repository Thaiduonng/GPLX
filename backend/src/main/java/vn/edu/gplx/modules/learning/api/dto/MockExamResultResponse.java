package vn.edu.gplx.modules.learning.api.dto;

import java.time.Instant;
import java.util.List;

public record MockExamResultResponse(
        String sessionCode,
        String categoryCode,
        int score,
        int totalQuestions,
        int passingScore,
        boolean passed,
        boolean failedParalysis,
        Instant startedAt,
        Instant completedAt,
        long durationSeconds,
        List<QuestionResultItem> questions
) {
    public record QuestionResultItem(
            Long questionId,
            int orderIndex,
            int questionNumber,
            String content,
            String imageUrl,
            boolean isParalysis,
            Long selectedAnswerId,
            Long correctAnswerId,
            boolean isCorrect,
            String explanation,
            String legalReference,
            List<StudyAnswerOptionResponse> answers
    ) {}
}
