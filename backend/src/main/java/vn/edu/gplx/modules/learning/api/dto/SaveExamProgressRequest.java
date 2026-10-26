package vn.edu.gplx.modules.learning.api.dto;

import jakarta.validation.constraints.NotNull;

public record SaveExamProgressRequest(
        @NotNull(message = "Mã câu hỏi không được để trống")
        Long questionId,
        Long selectedAnswerId
) {
}
