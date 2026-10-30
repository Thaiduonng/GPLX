package vn.edu.gplx.modules.rawvehicle.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record UpdateRawVehicleSessionRequest(
        @NotNull(message = "Thời gian bắt đầu mới không được để trống")
        LocalDateTime scheduledStartTime,

        @NotNull(message = "Thời gian kết thúc mới không được để trống")
        LocalDateTime scheduledEndTime,

        Long instructorId,

        Long vehicleId,

        String practiceLocation,

        @NotBlank(message = "Lý do thay đổi lịch bắt buộc phải nhập")
        String reason
) {}
