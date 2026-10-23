package vn.edu.gplx.modules.fleet.api.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import vn.edu.gplx.modules.fleet.domain.TransmissionType;

import java.time.LocalDate;

public record CreateVehicleRequest(
        @NotBlank(message = "Biển số xe không được để trống")
        @Pattern(regexp = "^[0-9]{2}[A-Z]-[0-9]{3,5}(\\.[0-9]{2})?$", message = "Biển số xe không đúng định dạng (Ví dụ: 29A-888.12)")
        String plateNumber,

        @NotBlank(message = "Model/Dòng xe không được để trống")
        String model,

        @NotNull(message = "Hạng GPLX tương ứng không được để trống")
        Long categoryId,

        @NotNull(message = "Hộp số (Số sàn / Tự động) không được để trống")
        TransmissionType transmission,

        @NotNull(message = "Hạn đăng kiểm không được để trống")
        @Future(message = "Hạn đăng kiểm phải còn hiệu lực trong tương lai")
        LocalDate inspectionExpiryDate
) {
}
