package vn.edu.gplx.modules.training.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.gplx.modules.training.api.dto.CreateScheduleRequest;
import vn.edu.gplx.modules.training.api.dto.TrainingScheduleResponse;
import vn.edu.gplx.modules.training.application.TrainingScheduleService;
import vn.edu.gplx.shared.api.ApiResponse;

import java.util.List;

@Tag(name = "Training Schedules", description = "Quản lý Lịch học lý thuyết và thực hành")
@RestController
@RequestMapping("/api/v1/training/schedules")
@SecurityRequirement(name = "bearerAuth")
public class TrainingScheduleController {

    private final TrainingScheduleService scheduleService;

    public TrainingScheduleController(TrainingScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @Operation(summary = "Lấy danh sách lịch học của một lớp")
    @GetMapping("/class/{classId}")
    public ResponseEntity<ApiResponse<List<TrainingScheduleResponse>>> getSchedulesByClass(@PathVariable Long classId) {
        List<TrainingScheduleResponse> schedules = scheduleService.getSchedulesByClass(classId);
        return ResponseEntity.ok(ApiResponse.success(schedules));
    }

    @Operation(summary = "Lấy danh sách lịch giảng dạy của một giảng viên")
    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<ApiResponse<List<TrainingScheduleResponse>>> getSchedulesByInstructor(@PathVariable Long instructorId) {
        List<TrainingScheduleResponse> schedules = scheduleService.getSchedulesByInstructor(instructorId);
        return ResponseEntity.ok(ApiResponse.success(schedules));
    }

    @Operation(summary = "Xếp lịch đào tạo mới (có kiểm tra chống xung đột lịch TRN-001)")
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'MANAGER', 'INSTRUCTOR')")
    public ResponseEntity<ApiResponse<TrainingScheduleResponse>> createSchedule(
            @Valid @RequestBody CreateScheduleRequest request) {
        TrainingScheduleResponse schedule = scheduleService.createSchedule(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Xếp lịch đào tạo thành công", schedule));
    }
}
