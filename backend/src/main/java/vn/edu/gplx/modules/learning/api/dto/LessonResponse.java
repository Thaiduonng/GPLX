package vn.edu.gplx.modules.learning.api.dto;

public record LessonResponse(
        Long id,
        Long courseId,
        String title,
        String content,
        String videoUrl,
        int durationMinutes,
        int orderIndex,
        boolean completed,
        int timeSpentSeconds
) {
}
