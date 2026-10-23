package vn.edu.gplx.modules.training.api.dto;

import jakarta.validation.constraints.NotNull;

public record EnrollStudentRequest(
        @NotNull(message = "ID học viên không được để trống")
        Long studentId
) {
}
