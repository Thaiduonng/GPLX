package vn.edu.gplx.modules.rawvehicle.api.dto;

import java.time.LocalDateTime;

public record RawVehicleSessionChangeLogDto(
        Long id,
        Long sessionId,
        String changedByName,
        String changeType,
        String oldValue,
        String newValue,
        String reason,
        LocalDateTime createdAt
) {}
