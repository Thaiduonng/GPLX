package vn.edu.gplx.modules.learning.api.dto;

import jakarta.validation.constraints.NotNull;

public record ReviewAnswerRequest(
        @NotNull(message = "ID câu hỏi không được để trống")
        Long questionId,
        @NotNull(message = "Phương án chọn không được để trống")
        Long selectedAnswerId
) {
}
