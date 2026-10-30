package vn.edu.gplx.modules.learning.api.dto;

import vn.edu.gplx.modules.admission.api.dto.LicenseCategoryResponse;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

public record CourseResponse(
        Long id,
        String code,
        String slug,
        String title,
        String description,
        int totalHours,
        BigDecimal tuitionFee,
        LocalDate expectedStartDate,
        String trainingLocation,
        String targetAudience,
        String curriculumSummary,
        String documentsRequired,
        String bannerImageUrl,
        boolean featured,
        boolean isActive,
        LicenseCategoryResponse category,
        int lessonCount,
        Instant createdAt
) {
}
