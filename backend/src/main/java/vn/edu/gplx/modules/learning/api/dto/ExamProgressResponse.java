package vn.edu.gplx.modules.learning.api.dto;

public record ExamProgressResponse(
        String sessionCode,
        int answeredCount,
        int totalQuestions,
        long remainingSeconds,
        boolean isExpired
) {
}
