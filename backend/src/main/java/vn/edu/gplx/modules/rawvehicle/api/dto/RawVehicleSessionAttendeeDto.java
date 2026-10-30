package vn.edu.gplx.modules.rawvehicle.api.dto;

import vn.edu.gplx.modules.rawvehicle.domain.AttendeeAttendanceStatus;

import java.time.LocalDateTime;

public record RawVehicleSessionAttendeeDto(
        Long id,
        Long studentId,
        String studentName,
        String studentEmail,
        String studentPhone,
        AttendeeAttendanceStatus attendanceStatus,
        LocalDateTime attendedAt,
        String instructorFeedback,
        String skillsToImprove
) {}
