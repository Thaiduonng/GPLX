package vn.edu.gplx.modules.learning.api.dto;

import java.time.Instant;
import java.util.List;

public record ExamResultResponse(
        String categoryCode,
        int totalQuestions,
        int correctAnswers,
        int wrongAnswers,
        boolean failedDueToParalysisQuestion,
        boolean passed,
        int passingScore,
        Instant submittedAt,
        List<QuestionResultDetail> details
) {
    public record QuestionResultDetail(
            Long questionId,
            int questionNumber,
            String content,
            boolean isParalysis,
            Long selectedAnswerId,
            Long correctAnswerId,
            boolean isCorrect,
            String explanation
    ) {
    }
}
