package vn.edu.gplx.modules.admission.api.dto;

import jakarta.validation.constraints.NotNull;

public record EnrollApplicationRequest(
        @NotNull(message = "Lớp đào tạo không được để trống")
        Long classId,

        String note
) {
}
