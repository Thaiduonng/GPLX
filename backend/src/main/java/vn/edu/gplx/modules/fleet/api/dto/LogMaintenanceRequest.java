package vn.edu.gplx.modules.fleet.api.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public record LogMaintenanceRequest(
        @NotNull(message = "Ngày bảo dưỡng không được để trống")
        LocalDate maintenanceDate,

        @NotBlank(message = "Nội dung bảo dưỡng không được để trống")
        String description,

        @NotNull(message = "Chi phí bảo dưỡng không được để trống")
        @DecimalMin(value = "0.0", message = "Chi phí không được âm")
        BigDecimal cost,

        String performedBy
) {
}
