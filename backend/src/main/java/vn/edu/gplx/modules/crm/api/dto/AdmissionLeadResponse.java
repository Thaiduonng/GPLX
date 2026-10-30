package vn.edu.gplx.modules.crm.api.dto;

import vn.edu.gplx.modules.crm.domain.ContactChannel;
import vn.edu.gplx.modules.crm.domain.LeadSource;
import vn.edu.gplx.modules.crm.domain.LeadStatus;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record AdmissionLeadResponse(
        Long id,
        String leadCode,
        String fullName,
        String phone,
        String email,
        Long categoryId,
        String categoryCode,
        String categoryName,
        Long courseId,
        String courseCode,
        String courseTitle,
        ContactChannel preferredContactChannel,
        String preferredContactTime,
        String trainingLocation,
        LocalDate preferredStartDate,
        LeadSource source,
        LeadStatus status,
        String notes,
        Long assignedToId,
        String assignedToName,
        LocalDateTime followUpAt,
        Long convertedApplicationId,
        String convertedApplicationCode,
        boolean consentGdpr,
        Instant createdAt,
        Instant updatedAt,
        List<LeadInteractionResponse> interactions
) {
}
