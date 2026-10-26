package vn.edu.gplx.modules.learning.api.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ExamConfigurationDto(
        Long id,
        @NotBlank(message = "Hạng GPLX không được để trống")
        String categoryCode,
        @NotNull @Min(10)
        int totalQuestions,
        @NotNull @Min(5)
        int durationMinutes,
        @NotNull @Min(1)
        int passingScore,
        String rulesVersion,
        boolean active,
        String legalSource
) {
}
