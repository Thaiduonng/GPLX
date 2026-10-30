package vn.edu.gplx.modules.rawvehicle.api.dto;

import jakarta.validation.constraints.NotBlank;

public record CancelRawVehicleSessionRequest(
        @NotBlank(message = "Lý do hủy buổi thực hành không được để trống")
        String reason
) {}
