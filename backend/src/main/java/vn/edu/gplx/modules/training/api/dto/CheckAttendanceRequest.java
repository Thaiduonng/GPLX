package vn.edu.gplx.modules.training.api.dto;

import jakarta.validation.constraints.NotNull;
import vn.edu.gplx.modules.training.domain.AttendanceStatus;

public record CheckAttendanceRequest(
        @NotNull(message = "Lịch học không được để trống")
        Long scheduleId,

        @NotNull(message = "Học viên không được để trống")
        Long studentId,

        @NotNull(message = "Trạng thái điểm danh không được để trống")
        AttendanceStatus status,

        String note
) {
}
