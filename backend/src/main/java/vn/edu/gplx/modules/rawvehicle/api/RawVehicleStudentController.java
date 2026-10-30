package vn.edu.gplx.modules.rawvehicle.api;

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
@RequestMapping("/api/v1/raw-vehicle/student")
@PreAuthorize("hasAnyRole('STUDENT', 'ADMIN', 'MANAGER')")
public class RawVehicleStudentController {

    private final RawVehicleTrainingService trainingService;

    public RawVehicleStudentController(RawVehicleTrainingService trainingService) {
        this.trainingService = trainingService;
    }

    @GetMapping("/overview")
    public ResponseEntity<ApiResponse<RawVehicleOverviewResponse>> getOverview(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestParam(required = false) Long categoryId) {
        RawVehicleOverviewResponse overview = trainingService.getStudentOverview(userPrincipal.getId(), categoryId);
        return ResponseEntity.ok(ApiResponse.success(overview));
    }

    @GetMapping("/stages")
    public ResponseEntity<ApiResponse<List<RawVehicleStageDto>>> getStages(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<RawVehicleStageDto> stages = trainingService.getStudentStages(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(stages));
    }

    @GetMapping("/sessions")
    public ResponseEntity<ApiResponse<List<RawVehicleSessionDto>>> getSessions(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<RawVehicleSessionDto> sessions = trainingService.getStudentSessions(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(sessions));
    }

    @GetMapping("/evaluations")
    public ResponseEntity<ApiResponse<List<RawVehicleSkillEvaluationDto>>> getEvaluations(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<RawVehicleSkillEvaluationDto> evaluations = trainingService.getStudentEvaluations(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(evaluations));
    }

    @GetMapping("/sessions/{sessionId}")
    public ResponseEntity<ApiResponse<RawVehicleSessionDto>> getSessionDetail(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long sessionId) {
        RawVehicleSessionDto session = trainingService.getSessionDetail(sessionId, userPrincipal.getId(), false);
        return ResponseEntity.ok(ApiResponse.success(session));
    }
}
