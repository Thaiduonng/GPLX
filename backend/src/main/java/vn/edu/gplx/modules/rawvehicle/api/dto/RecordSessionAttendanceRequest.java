package vn.edu.gplx.modules.rawvehicle.api.dto;

import jakarta.validation.constraints.NotEmpty;
import vn.edu.gplx.modules.rawvehicle.domain.AttendeeAttendanceStatus;

import java.util.List;

public record RecordSessionAttendanceRequest(
        @NotEmpty(message = "Danh sách điểm danh không được để trống")
        List<StudentAttendanceItem> attendanceList,

        Boolean safetyChecklistPassed,

        String instructorNotes
) {
    public record StudentAttendanceItem(
            Long studentId,
            AttendeeAttendanceStatus attendanceStatus,
            String feedback,
            String skillsToImprove
    ) {}
}
