package vn.edu.gplx.modules.learning.api.dto;

import jakarta.validation.constraints.NotBlank;

public record ReviewSessionStartRequest(
        @NotBlank(message = "Chế độ ôn tập không được để trống")
        String reviewMode, // SMART, WRONG_ANSWERS, CRITICAL_PARALYSIS, BOOKMARKED, TOPIC, CATEGORY
        String categoryCode,
        Long topicId,
        Integer limit
) {
}
