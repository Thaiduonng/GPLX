package vn.edu.gplx.modules.learning.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * Yêu cầu cập nhật một biển báo (chỉ ADMIN, MANAGER).
 */
public record TrafficSignUpdateRequest(
        @NotBlank(message = "Vui lòng nhập tên biển báo")
        @Size(max = 255, message = "Tên biển báo tối đa 255 ký tự")
        String name,

        @Size(max = 4000, message = "Ý nghĩa tối đa 4000 ký tự")
        String meaning,

        @NotNull(message = "Vui lòng chọn trạng thái pháp lý")
        @Pattern(regexp = "VERIFIED|NEEDS_VERIFICATION|INTERNAL_RULE",
                message = "Trạng thái pháp lý chỉ nhận VERIFIED, NEEDS_VERIFICATION hoặc INTERNAL_RULE")
        String legalStatus,

        @Size(max = 20, message = "Mã thay thế tối đa 20 ký tự")
        String replacedByCode,

        @Size(max = 255, message = "Đường dẫn SVG tối đa 255 ký tự")
        String svgAsset
) {
}
