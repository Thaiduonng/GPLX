package vn.edu.gplx.modules.training.api.dto;

import vn.edu.gplx.modules.training.domain.ScheduleType;

import java.time.LocalDateTime;

public record TrainingScheduleResponse(
        Long id,
        Long classId,
        String className,
        String title,
        ScheduleType scheduleType,
        LocalDateTime startTime,
        LocalDateTime endTime,
        String location,
        Long instructorId,
        String status
) {
}
