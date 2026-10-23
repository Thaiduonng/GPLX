package vn.edu.gplx.modules.training.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.gplx.modules.identity.application.UserPrincipal;
import vn.edu.gplx.modules.training.api.dto.AttendanceResponse;
import vn.edu.gplx.modules.training.api.dto.CheckAttendanceRequest;
import vn.edu.gplx.modules.training.application.AttendanceService;
import vn.edu.gplx.shared.api.ApiResponse;

import java.util.List;

@Tag(name = "Attendance", description = "Điểm danh học viên theo buổi học")
@RestController
@RequestMapping("/api/v1/training/attendance")
@SecurityRequirement(name = "bearerAuth")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @Operation(summary = "Ghi nhận điểm danh học viên (kiểm tra khung thời gian cho phép TRN-002)")
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'INSTRUCTOR')")
    public ResponseEntity<ApiResponse<AttendanceResponse>> recordAttendance(
            @Valid @RequestBody CheckAttendanceRequest request) {
        AttendanceResponse record = attendanceService.recordAttendance(request);
        return ResponseEntity.ok(ApiResponse.success("Ghi nhận điểm danh thành công", record));
    }

    @Operation(summary = "Xem danh sách điểm danh của một buổi học")
    @GetMapping("/schedule/{scheduleId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'INSTRUCTOR')")
    public ResponseEntity<ApiResponse<List<AttendanceResponse>>> getAttendanceBySchedule(
            @PathVariable Long scheduleId) {
        List<AttendanceResponse> records = attendanceService.getAttendanceBySchedule(scheduleId);
        return ResponseEntity.ok(ApiResponse.success(records));
    }

    @Operation(summary = "Học viên xem lịch sử điểm danh của bản thân")
    @GetMapping("/my-records")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<List<AttendanceResponse>>> getMyAttendance(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<AttendanceResponse> records = attendanceService.getMyAttendance(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(records));
    }
}
