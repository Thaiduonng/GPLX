package vn.edu.gplx.modules.learning.api.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record UpdateProgressRequest(
        @NotNull(message = "Thời gian học không được để trống")
        @Min(value = 0, message = "Thời gian học phải lớn hơn hoặc bằng 0 giây")
        int timeSpentSeconds,

        boolean markCompleted
) {
}
