package vn.edu.gplx.modules.training.api.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record LogDatSessionRequest(
        @NotNull(message = "ID học viên không được để trống")
        Long studentId,

        @NotBlank(message = "Loại phiên thực hành không được để trống")
        String sessionType,

        @NotNull(message = "Thời gian bắt đầu không được để trống")
        LocalDateTime startTime,

        @NotNull(message = "Thời gian kết thúc không được để trống")
        LocalDateTime endTime,

        @NotNull(message = "Quãng đường không được để trống")
        @DecimalMin(value = "0.0", inclusive = true, message = "Quãng đường phải >= 0")
        BigDecimal distanceKm,

        @Min(value = 1, message = "Thời lượng thực hành tối thiểu là 1 phút")
        int durationMinutes,

        String deviceId,
        String note
) {
}
