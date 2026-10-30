package vn.edu.gplx.modules.admission.api.dto;

import jakarta.validation.constraints.NotBlank;

public record TrackApplicationRequest(
        @NotBlank(message = "Mã hồ sơ không được để trống")
        String applicationCode,

        String phone,

        String trackingToken
) {
}
