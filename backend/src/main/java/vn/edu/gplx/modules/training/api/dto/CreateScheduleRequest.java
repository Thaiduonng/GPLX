package vn.edu.gplx.modules.training.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import vn.edu.gplx.modules.training.domain.ScheduleType;

import java.time.LocalDateTime;

public record CreateScheduleRequest(
        @NotNull(message = "Lớp học không được để trống")
        Long classId,

        @NotBlank(message = "Tiêu đề buổi học không được để trống")
        @Size(max = 150, message = "Tiêu đề không quá 150 ký tự")
        String title,

        @NotNull(message = "Loại lịch đào tạo không được để trống")
        ScheduleType scheduleType,

        @NotNull(message = "Thời gian bắt đầu không được để trống")
        LocalDateTime startTime,

        @NotNull(message = "Thời gian kết thúc không được để trống")
        LocalDateTime endTime,

        @NotBlank(message = "Địa điểm không được để trống")
        @Size(max = 200, message = "Địa điểm không quá 200 ký tự")
        String location,

        @NotNull(message = "Giảng viên phụ trách không được để trống")
        Long instructorId
) {
}
