package vn.edu.gplx.modules.rawvehicle.api.dto;

import vn.edu.gplx.modules.rawvehicle.domain.RawVehicleSessionStatus;

import java.time.LocalDateTime;
import java.util.List;

public record RawVehicleSessionDto(
        Long id,
        String sessionCode,
        Long instructorId,
        String instructorName,
        Long vehicleId,
        String plateNumber,
        String vehicleModel,
        Long stageId,
        String stageCode,
        String stageName,
        String practiceLocation,
        LocalDateTime scheduledStartTime,
        LocalDateTime scheduledEndTime,
        LocalDateTime actualStartTime,
        LocalDateTime actualEndTime,
        Integer actualDurationMinutes,
        Integer maxStudents,
        RawVehicleSessionStatus status,
        Boolean safetyChecklistPassed,
        String instructorNotes,
        String cancelReason,
        List<RawVehicleSessionAttendeeDto> attendees
) {}
