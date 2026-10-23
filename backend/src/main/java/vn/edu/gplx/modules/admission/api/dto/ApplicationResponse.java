package vn.edu.gplx.modules.admission.api.dto;

import vn.edu.gplx.modules.admission.domain.ApplicationStatus;
import vn.edu.gplx.modules.admission.domain.Gender;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

public record ApplicationResponse(
        Long id,
        String applicationCode,
        Long userId,
        LicenseCategoryResponse category,
        String fullName,
        String nationalId,
        LocalDate dateOfBirth,
        Gender gender,
        String phone,
        String email,
        String address,
        ApplicationStatus status,
        String rejectionReason,
        Long reviewedBy,
        Instant reviewedAt,
        Long version,
        Instant createdAt,
        Instant updatedAt,
        List<DocumentResponse> documents,
        List<StatusHistoryResponse> statusHistories
) {
}
