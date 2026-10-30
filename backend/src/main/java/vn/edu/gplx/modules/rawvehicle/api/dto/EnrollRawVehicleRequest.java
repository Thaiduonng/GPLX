package vn.edu.gplx.modules.rawvehicle.api.dto;

import jakarta.validation.constraints.NotNull;

public record EnrollRawVehicleRequest(
        @NotNull(message = "Mã học viên không được để trống")
        Long studentId,

        @NotNull(message = "Hạng GPLX không được để trống")
        Long categoryId,

        Long instructorId,

        String notes
) {}
