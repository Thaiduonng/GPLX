package vn.edu.gplx.modules.learning.api.dto;

import jakarta.validation.constraints.NotBlank;

public record PracticeSessionStartRequest(
        @NotBlank(message = "Chế độ luyện tập không được để trống")
        String practiceMode, // TOPIC, CATEGORY, UNANSWERED, INCORRECT, PARALYSIS, BOOKMARKED, RANDOM, ALL
        String categoryCode,
        Long topicId,
        Integer limit
) {
}
