package vn.edu.gplx.modules.admission.api.dto;

import vn.edu.gplx.modules.admission.domain.ApplicationStatus;

import java.time.Instant;

public record StatusHistoryResponse(
        Long id,
        ApplicationStatus fromStatus,
        ApplicationStatus toStatus,
        String note,
        Long changedBy,
        Instant createdAt
) {
}
