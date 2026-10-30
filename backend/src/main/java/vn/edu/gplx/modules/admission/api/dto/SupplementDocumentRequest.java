package vn.edu.gplx.modules.admission.api.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record SupplementDocumentRequest(
        String phone,

        String trackingToken,

        String note,

        @NotEmpty(message = "Bắt buộc phải đính kèm ít nhất một tài liệu bổ sung")
        List<@Valid DocumentUploadItem> documents
) {
}
