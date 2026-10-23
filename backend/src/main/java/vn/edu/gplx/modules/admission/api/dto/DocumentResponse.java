package vn.edu.gplx.modules.admission.api.dto;

import vn.edu.gplx.modules.admission.domain.DocumentType;

import java.time.Instant;

public record DocumentResponse(
        Long id,
        DocumentType documentType,
        String fileName,
        String fileUrl,
        Long fileSize,
        String mimeType,
        Instant createdAt
) {
}
