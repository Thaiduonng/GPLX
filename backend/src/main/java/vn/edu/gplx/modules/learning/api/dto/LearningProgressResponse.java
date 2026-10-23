package vn.edu.gplx.modules.learning.api.dto;

import java.time.Instant;

public record LearningProgressResponse(
        Long lessonId,
        String lessonTitle,
        boolean completed,
        int timeSpentSeconds,
        Instant completedAt
) {
}
