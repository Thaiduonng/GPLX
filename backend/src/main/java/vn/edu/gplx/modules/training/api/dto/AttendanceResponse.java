package vn.edu.gplx.modules.training.api.dto;

import vn.edu.gplx.modules.training.domain.AttendanceStatus;

import java.time.Instant;

public record AttendanceResponse(
        Long id,
        Long scheduleId,
        Long studentId,
        AttendanceStatus status,
        Instant checkedInAt,
        String note
) {
}
