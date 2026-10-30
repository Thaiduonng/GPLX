package vn.edu.gplx.modules.admission.api.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import vn.edu.gplx.modules.admission.domain.Gender;

import java.time.LocalDate;
import java.util.List;

public record SubmitApplicationRequest(
        @NotNull(message = "Hạng GPLX đăng ký không được để trống")
        Long categoryId,

        Long courseId,

        @NotBlank(message = "Họ và tên không được để trống")
        @Size(max = 100, message = "Họ và tên không quá 100 ký tự")
        String fullName,

        @NotBlank(message = "Số CCCD/CMND không được để trống")
        @Pattern(regexp = "^[0-9]{9,12}$", message = "Số CCCD/CMND phải gồm 9 đến 12 chữ số")
        String nationalId,

        @NotNull(message = "Ngày sinh không được để trống")
        @Past(message = "Ngày sinh phải là một ngày trong quá khứ")
        LocalDate dateOfBirth,

        @NotNull(message = "Giới tính không được để trống")
        Gender gender,

        @NotBlank(message = "Số điện thoại không được để trống")
        @Pattern(regexp = "^[0-9+]{9,15}$", message = "Số điện thoại không hợp lệ")
        String phone,

        @NotBlank(message = "Email không được để trống")
        @Email(message = "Email không đúng định dạng")
        String email,

        @NotBlank(message = "Địa chỉ liên hệ không được để trống")
        @Size(max = 255, message = "Địa chỉ không quá 255 ký tự")
        String address,

        String preferredSchedule,

        String trainingLocation,

        boolean consentDataProcessing,

        @NotEmpty(message = "Hồ sơ bắt buộc phải đính kèm ít nhất một tài liệu chứng minh")
        List<@Valid DocumentUploadItem> documents
) {
    // Constructor tương thích ngược cho các unit test cũ
    public SubmitApplicationRequest(Long categoryId, String fullName, String nationalId, LocalDate dateOfBirth,
                                    Gender gender, String phone, String email, String address, List<DocumentUploadItem> documents) {
        this(categoryId, null, fullName, nationalId, dateOfBirth, gender, phone, email, address, "WEEKEND", null, true, documents);
    }
}
