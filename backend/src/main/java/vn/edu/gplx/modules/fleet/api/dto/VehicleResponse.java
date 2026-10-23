package vn.edu.gplx.modules.fleet.api.dto;

import vn.edu.gplx.modules.fleet.domain.TransmissionType;
import vn.edu.gplx.modules.fleet.domain.VehicleStatus;

import java.time.Instant;
import java.time.LocalDate;

public record VehicleResponse(
        Long id,
        String plateNumber,
        String model,
        Long categoryId,
        String categoryCode,
        TransmissionType transmission,
        VehicleStatus status,
        LocalDate inspectionExpiryDate,
        boolean isInspectionValid,
        Instant createdAt
) {
}
