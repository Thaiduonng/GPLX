package vn.edu.gplx.modules.examination.api.dto;

import jakarta.validation.constraints.NotNull;

public record RegisterCandidateRequest(
        @NotNull(message = "ID học viên không được để trống")
        Long studentId
) {
}
