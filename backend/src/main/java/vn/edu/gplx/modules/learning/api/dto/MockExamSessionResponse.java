package vn.edu.gplx.modules.learning.api.dto;

import java.time.Instant;
import java.util.List;

public record MockExamSessionResponse(
        String sessionCode,
        String categoryCode,
        int totalQuestions,
        int durationMinutes,
        int passingScore,
        Instant startedAt,
        long remainingSeconds,
        List<ExamQuestionResponse> questions
) {
}
