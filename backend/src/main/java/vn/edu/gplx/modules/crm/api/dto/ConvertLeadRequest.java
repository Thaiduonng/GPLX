package vn.edu.gplx.modules.crm.api.dto;

import jakarta.validation.constraints.NotNull;

public record ConvertLeadRequest(
        @NotNull(message = "Mã hồ sơ đăng ký liên kết không được để trống")
        Long applicationId,

        String note
) {
}
