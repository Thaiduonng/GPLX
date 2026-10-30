package vn.edu.gplx.modules.crm.api.dto;

import vn.edu.gplx.modules.crm.domain.InteractionType;

import java.time.Instant;
import java.time.LocalDateTime;

public record LeadInteractionResponse(
        Long id,
        Long leadId,
        Long staffId,
        String staffName,
        InteractionType interactionType,
        String content,
        String result,
        String nextAction,
        LocalDateTime nextActionAt,
        Instant createdAt
) {
}
