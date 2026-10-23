package vn.edu.gplx.modules.reporting.api.dto;

import java.time.Instant;

public record AuditLogResponse(
        Long id,
        Long userId,
        String username,
        String action,
        String resourceType,
        String resourceId,
        String details,
        String ipAddress,
        Instant createdAt
) {
}
