package vn.edu.gplx.modules.admission.api.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import vn.edu.gplx.modules.admission.domain.ApplicationStatus;

public record ReviewApplicationRequest(
        @NotNull(message = "Trạng thái thẩm định không được để trống")
        ApplicationStatus targetStatus,

        @Size(max = 1000, message = "Lý do hoặc ghi chú thẩm định không quá 1000 ký tự")
        String note
) {
}
