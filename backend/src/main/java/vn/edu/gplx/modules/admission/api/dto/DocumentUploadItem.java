package vn.edu.gplx.modules.admission.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import vn.edu.gplx.modules.admission.domain.DocumentType;

public record DocumentUploadItem(
        @NotNull(message = "Loại tài liệu không được để trống")
        DocumentType documentType,

        @NotBlank(message = "Tên tệp không được để trống")
        String fileName,

        @NotBlank(message = "Đường dẫn tệp không được để trống")
        String fileUrl,

        long fileSize,

        @NotBlank(message = "MIME type không được để trống")
        String mimeType
) {
}
