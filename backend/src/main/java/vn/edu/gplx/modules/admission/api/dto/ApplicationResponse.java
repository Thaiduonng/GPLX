package vn.edu.gplx.modules.admission.api.dto;

import vn.edu.gplx.modules.admission.domain.ApplicationStatus;
import vn.edu.gplx.modules.admission.domain.Gender;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

public record ApplicationResponse(
        Long id,
        String applicationCode,
        String trackingToken,
        Long userId,
        LicenseCategoryResponse category,
        Long courseId,
        String courseTitle,
        String fullName,
        String nationalId,
        LocalDate dateOfBirth,
        Gender gender,
        String phone,
        String email,
        String address,
        String preferredSchedule,
        String trainingLocation,
        ApplicationStatus status,
        String rejectionReason,
        Long reviewedBy,
        Instant reviewedAt,
        String assignedStaffName,
        Long enrolledClassId,
        String enrolledClassName,
        Instant enrolledAt,
        Long version,
        Instant createdAt,
        Instant updatedAt,
        List<DocumentResponse> documents,
        List<StatusHistoryResponse> statusHistories
) {
    // Constructor tương thích ngược cho các unit test cũ
    public ApplicationResponse(
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
        this(
                id,
                applicationCode,
                null,
                userId,
                category,
                null,
                null,
                fullName,
                nationalId,
                dateOfBirth,
                gender,
                phone,
                email,
                address,
                null,
                null,
                status,
                rejectionReason,
                reviewedBy,
                reviewedAt,
                null,
                null,
                null,
                null,
                version,
                createdAt,
                updatedAt,
                documents,
                statusHistories
        );
    }
}
