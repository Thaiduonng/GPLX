package vn.edu.gplx.modules.crm.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import vn.edu.gplx.modules.crm.domain.InteractionType;

import java.time.LocalDateTime;

public record AddInteractionRequest(
        @NotNull(message = "Loại tương tác không được để trống")
        InteractionType interactionType,

        @NotBlank(message = "Nội dung cuộc gọi / tương tác không được để trống")
        String content,

        String result,

        String nextAction,

        LocalDateTime nextActionAt
) {
}
