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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.gplx.modules.training.api.dto.CreateClassRequest;
import vn.edu.gplx.modules.training.api.dto.EnrollStudentRequest;
import vn.edu.gplx.modules.training.api.dto.TrainingClassResponse;
import vn.edu.gplx.modules.training.application.TrainingClassService;
import vn.edu.gplx.modules.training.domain.ClassStatus;
import vn.edu.gplx.shared.api.ApiResponse;

import java.util.List;

@Tag(name = "Training Classes", description = "Quản lý Lớp học và Khóa đào tạo")
@RestController
@RequestMapping("/api/v1/training/classes")
@SecurityRequirement(name = "bearerAuth")
public class TrainingClassController {

    private final TrainingClassService classService;

    public TrainingClassController(TrainingClassService classService) {
        this.classService = classService;
    }

    @Operation(summary = "Lấy danh sách các lớp học đào tạo")
    @GetMapping
    public ResponseEntity<ApiResponse<List<TrainingClassResponse>>> getClasses(
            @RequestParam(required = false) ClassStatus status) {
        List<TrainingClassResponse> classes = classService.getClasses(status);
        return ResponseEntity.ok(ApiResponse.success(classes));
    }

    @Operation(summary = "Xem chi tiết một lớp học theo ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<TrainingClassResponse>> getClassById(@PathVariable Long id) {
        TrainingClassResponse tc = classService.getClassById(id);
        return ResponseEntity.ok(ApiResponse.success(tc));
    }

    @Operation(summary = "Tạo mới lớp đào tạo lái xe")
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'MANAGER')")
    public ResponseEntity<ApiResponse<TrainingClassResponse>> createClass(
            @Valid @RequestBody CreateClassRequest request) {
        TrainingClassResponse tc = classService.createClass(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Tạo lớp đào tạo thành công", tc));
    }

    @Operation(summary = "Phân bổ học viên vào lớp học")
    @PostMapping("/{id}/enroll")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'MANAGER')")
    public ResponseEntity<ApiResponse<Void>> enrollStudent(
            @PathVariable Long id,
            @Valid @RequestBody EnrollStudentRequest request) {
        classService.enrollStudent(id, request.studentId());
        return ResponseEntity.ok(ApiResponse.success("Phân bổ học viên vào lớp thành công", null));
    }
}
