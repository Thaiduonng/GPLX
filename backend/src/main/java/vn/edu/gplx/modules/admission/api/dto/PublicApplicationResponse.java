package vn.edu.gplx.modules.admission.api.dto;

import vn.edu.gplx.modules.admission.domain.ApplicationStatus;

import java.time.Instant;
import java.util.List;

public record PublicApplicationResponse(
        String applicationCode,
        String trackingToken,
        String maskedFullName,
        String maskedPhone,
        String categoryCode,
        String categoryName,
        String courseTitle,
        ApplicationStatus status,
        String rejectionReason,
        String trainingLocation,
        String preferredSchedule,
        String enrolledClassName,
        Instant enrolledAt,
        Instant submittedAt,
        Instant updatedAt,
        List<DocumentResponse> documents,
        List<StatusHistoryResponse> statusHistories
) {
}
