package vn.edu.gplx.modules.rawvehicle.api;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import vn.edu.gplx.shared.api.ApiResponse;
import vn.edu.gplx.modules.identity.application.UserPrincipal;
import vn.edu.gplx.modules.rawvehicle.api.dto.*;
import vn.edu.gplx.modules.rawvehicle.application.RawVehicleTrainingService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/raw-vehicle/instructor")
@PreAuthorize("hasAnyRole('INSTRUCTOR', 'ADMIN', 'MANAGER')")
public class RawVehicleInstructorController {

    private final RawVehicleTrainingService trainingService;

    public RawVehicleInstructorController(RawVehicleTrainingService trainingService) {
        this.trainingService = trainingService;
    }

    @GetMapping("/students")
    public ResponseEntity<ApiResponse<List<RawVehicleEnrollmentSummaryDto>>> getAssignedStudents(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<RawVehicleEnrollmentSummaryDto> students = trainingService.getInstructorAssignedStudents(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(students));
    }

    @GetMapping("/sessions")
    public ResponseEntity<ApiResponse<List<RawVehicleSessionDto>>> getSessions(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<RawVehicleSessionDto> sessions = trainingService.getInstructorSessions(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(sessions));
    }

    @GetMapping("/sessions/{sessionId}")
    public ResponseEntity<ApiResponse<RawVehicleSessionDto>> getSessionDetail(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long sessionId) {
        RawVehicleSessionDto session = trainingService.getSessionDetail(sessionId, userPrincipal.getId(), true);
        return ResponseEntity.ok(ApiResponse.success(session));
    }

    @PostMapping("/sessions/{sessionId}/attendance")
    public ResponseEntity<ApiResponse<RawVehicleSessionDto>> recordAttendance(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long sessionId,
            @Valid @RequestBody RecordSessionAttendanceRequest request) {
        RawVehicleSessionDto session = trainingService.recordAttendance(sessionId, userPrincipal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Ghi nhận điểm danh và nhận xét thành công", session));
    }

    @PostMapping("/sessions/{sessionId}/complete")
    public ResponseEntity<ApiResponse<RawVehicleSessionDto>> completeSession(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long sessionId,
            @Valid @RequestBody CompleteSessionRequest request) {
        RawVehicleSessionDto session = trainingService.completeSession(sessionId, userPrincipal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Hoàn thành buổi thực hành xe thô và xác nhận thời lượng thực tế", session));
    }

    @PostMapping("/evaluations")
    public ResponseEntity<ApiResponse<RawVehicleSkillEvaluationDto>> evaluateSkill(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody EvaluateSkillRequest request) {
        RawVehicleSkillEvaluationDto evaluation = trainingService.evaluateSkill(userPrincipal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Đánh giá kỹ năng thành công", evaluation));
    }
}
