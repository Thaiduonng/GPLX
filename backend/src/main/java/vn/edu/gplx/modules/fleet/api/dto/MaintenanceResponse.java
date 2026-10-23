package vn.edu.gplx.modules.fleet.api.dto;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

public record MaintenanceResponse(
        Long id,
        Long vehicleId,
        String plateNumber,
        LocalDate maintenanceDate,
        String description,
        BigDecimal cost,
        String performedBy,
        Instant createdAt
) {
}
