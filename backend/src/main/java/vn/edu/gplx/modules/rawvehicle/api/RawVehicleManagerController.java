package vn.edu.gplx.modules.rawvehicle.api;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import vn.edu.gplx.shared.api.ApiResponse;
import vn.edu.gplx.modules.identity.application.UserPrincipal;
import vn.edu.gplx.modules.rawvehicle.api.dto.*;
import vn.edu.gplx.modules.rawvehicle.application.RawVehicleTrainingService;
import vn.edu.gplx.modules.rawvehicle.domain.RawVehicleEnrollmentStatus;

import java.util.List;

@RestController
@RequestMapping("/api/v1/raw-vehicle/manager")
@PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'STAFF')")
public class RawVehicleManagerController {

    private final RawVehicleTrainingService trainingService;

    public RawVehicleManagerController(RawVehicleTrainingService trainingService) {
        this.trainingService = trainingService;
    }

    @PostMapping("/enrollments")
    public ResponseEntity<ApiResponse<RawVehicleEnrollmentSummaryDto>> enrollStudent(
            @Valid @RequestBody EnrollRawVehicleRequest request) {
        RawVehicleEnrollmentSummaryDto result = trainingService.enrollStudent(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Đăng ký học viên vào chương trình xe thô thành công", result));
    }

    @GetMapping("/enrollments")
    public ResponseEntity<ApiResponse<List<RawVehicleEnrollmentSummaryDto>>> getAllEnrollments(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) RawVehicleEnrollmentStatus status) {
        List<RawVehicleEnrollmentSummaryDto> list = trainingService.getAllEnrollments(categoryId, status);
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @PostMapping("/sessions")
    public ResponseEntity<ApiResponse<RawVehicleSessionDto>> createSession(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody CreateRawVehicleSessionRequest request) {
        RawVehicleSessionDto session = trainingService.createSession(userPrincipal.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Lên lịch thực hành xe thô thành công", session));
    }

    @PutMapping("/sessions/{sessionId}")
    public ResponseEntity<ApiResponse<RawVehicleSessionDto>> updateSession(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long sessionId,
            @Valid @RequestBody UpdateRawVehicleSessionRequest request) {
        RawVehicleSessionDto session = trainingService.updateSession(sessionId, userPrincipal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Điều chỉnh lịch thực hành xe thô thành công", session));
    }

    @PostMapping("/sessions/{sessionId}/cancel")
    public ResponseEntity<ApiResponse<RawVehicleSessionDto>> cancelSession(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long sessionId,
            @Valid @RequestBody CancelRawVehicleSessionRequest request) {
        RawVehicleSessionDto session = trainingService.cancelSession(sessionId, userPrincipal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Hủy buổi thực hành xe thô thành công", session));
    }

    @GetMapping("/sessions")
    public ResponseEntity<ApiResponse<List<RawVehicleSessionDto>>> getAllSessions() {
        List<RawVehicleSessionDto> list = trainingService.getAllSessions();
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @GetMapping("/sessions/{sessionId}/logs")
    public ResponseEntity<ApiResponse<List<RawVehicleSessionChangeLogDto>>> getSessionLogs(
            @PathVariable Long sessionId) {
        List<RawVehicleSessionChangeLogDto> logs = trainingService.getSessionChangeLogs(sessionId);
        return ResponseEntity.ok(ApiResponse.success(logs));
    }

    @GetMapping("/stages")
    public ResponseEntity<ApiResponse<List<RawVehicleStageDto>>> getAllStages() {
        List<RawVehicleStageDto> stages = trainingService.getAllStages();
        return ResponseEntity.ok(ApiResponse.success(stages));
    }
}
