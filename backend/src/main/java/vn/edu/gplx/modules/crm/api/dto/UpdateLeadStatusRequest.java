package vn.edu.gplx.modules.crm.api.dto;

import jakarta.validation.constraints.NotNull;
import vn.edu.gplx.modules.crm.domain.LeadStatus;

import java.time.LocalDateTime;

public record UpdateLeadStatusRequest(
        @NotNull(message = "Trạng thái mới không được để trống")
        LeadStatus status,

        String notes,

        Long assignedToId,

        LocalDateTime followUpAt
) {
}
