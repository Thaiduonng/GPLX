package vn.edu.gplx.modules.learning.api.dto;

import java.time.Instant;

public record MockExamSummaryResponse(
        Long id,
        String sessionCode,
        String categoryCode,
        int score,
        int totalQuestions,
        int passingScore,
        boolean passed,
        boolean failedParalysis,
        String status,
        Instant startedAt,
        Instant completedAt
) {
}
