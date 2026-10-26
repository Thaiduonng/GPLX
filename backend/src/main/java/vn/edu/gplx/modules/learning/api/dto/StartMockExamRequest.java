package vn.edu.gplx.modules.learning.api.dto;

import jakarta.validation.constraints.NotBlank;

public record StartMockExamRequest(
        @NotBlank(message = "Hạng GPLX không được để trống")
        String categoryCode
) {
}
