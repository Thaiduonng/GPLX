package vn.edu.gplx.modules.crm.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import vn.edu.gplx.modules.crm.domain.ContactChannel;
import vn.edu.gplx.modules.crm.domain.LeadSource;

public record CreateLeadInquiryRequest(
        @NotBlank(message = "Họ và tên không được để trống")
        @Size(max = 100, message = "Họ và tên không vượt quá 100 ký tự")
        String fullName,

        @NotBlank(message = "Số điện thoại không được để trống")
        @Pattern(regexp = "^[0-9+]{9,15}$", message = "Số điện thoại không hợp lệ")
        String phone,

        String email,

        Long categoryId,

        Long courseId,

        ContactChannel preferredContactChannel,

        String preferredContactTime,

        String trainingLocation,

        LeadSource source,

        String notes,

        boolean consentGdpr
) {
}
