package vn.edu.gplx.modules.rawvehicle.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

public record CreateRawVehicleSessionRequest(
        @NotNull(message = "Giáo viên phụ trách không được để trống")
        Long instructorId,

        @NotNull(message = "Phương tiện tập lái không được để trống")
        Long vehicleId,

        Long stageId,

        @NotBlank(message = "Địa điểm thực hành không được để trống")
        String practiceLocation,

        @NotNull(message = "Thời gian bắt đầu dự kiến không được để trống")
        LocalDateTime scheduledStartTime,

        @NotNull(message = "Thời gian kết thúc dự kiến không được để trống")
        LocalDateTime scheduledEndTime,

        Integer maxStudents,

        @NotEmpty(message = "Danh sách học viên tham gia không được để trống")
        List<Long> studentIds
) {}
