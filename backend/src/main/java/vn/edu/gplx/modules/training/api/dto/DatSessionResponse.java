package vn.edu.gplx.modules.training.api.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;

public record DatSessionResponse(
        Long id,
        Long studentId,
        Long instructorId,
        String sessionType,
        LocalDateTime startTime,
        LocalDateTime endTime,
        BigDecimal distanceKm,
        int durationMinutes,
        String status,
        String deviceId,
        String note,
        Instant createdAt
) {
}
