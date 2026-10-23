package vn.edu.gplx.modules.training.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
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
import vn.edu.gplx.modules.training.api.dto.DatSessionResponse;
import vn.edu.gplx.modules.training.api.dto.DatSummaryResponse;
import vn.edu.gplx.modules.training.api.dto.LogDatSessionRequest;
import vn.edu.gplx.modules.training.application.DatPracticeService;
import vn.edu.gplx.shared.api.ApiResponse;

@Tag(name = "DAT Practice", description = "Quản lý dữ liệu thực hành lái xe đường trường DAT & Cabin mô phỏng")
@RestController
@RequestMapping("/api/v1/training/dat")
@SecurityRequirement(name = "bearerAuth")
public class DatPracticeController {

    private final DatPracticeService datService;

    public DatPracticeController(DatPracticeService datService) {
        this.datService = datService;
    }

    @Operation(summary = "Ghi nhận phiên thực hành lái xe đường trường DAT hoặc cabin mô phỏng")
    @PostMapping("/sessions")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'INSTRUCTOR')")
    public ResponseEntity<ApiResponse<DatSessionResponse>> logPracticeSession(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody LogDatSessionRequest request) {
        DatSessionResponse session = datService.logPracticeSession(userPrincipal.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Ghi nhận phiên thực hành DAT thành công", session));
    }

    @Operation(summary = "Học viên tra cứu tiến độ tích lũy số km và giờ thực hành DAT của bản thân")
    @GetMapping("/my-summary")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<DatSummaryResponse>> getMyDatSummary(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        DatSummaryResponse summary = datService.getStudentDatSummary(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(summary));
    }

    @Operation(summary = "Giáo viên/Cán bộ tra cứu tiến độ thực hành DAT của một học viên")
    @GetMapping("/student/{studentId}/summary")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'INSTRUCTOR')")
    public ResponseEntity<ApiResponse<DatSummaryResponse>> getStudentDatSummary(
            @PathVariable Long studentId) {
        DatSummaryResponse summary = datService.getStudentDatSummary(studentId);
        return ResponseEntity.ok(ApiResponse.success(summary));
    }
}
