package vn.edu.gplx.modules.learning.api.dto;

import vn.edu.gplx.modules.admission.api.dto.LicenseCategoryResponse;

import java.time.Instant;

public record CourseResponse(
        Long id,
        String code,
        String title,
        String description,
        int totalHours,
        boolean isActive,
        LicenseCategoryResponse category,
        int lessonCount,
        Instant createdAt
) {
}
