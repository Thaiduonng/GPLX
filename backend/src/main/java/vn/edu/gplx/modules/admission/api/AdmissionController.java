package vn.edu.gplx.modules.admission.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.gplx.modules.admission.api.dto.ApplicationResponse;
import vn.edu.gplx.modules.admission.api.dto.ReviewApplicationRequest;
import vn.edu.gplx.modules.admission.api.dto.SubmitApplicationRequest;
import vn.edu.gplx.modules.admission.application.AdmissionService;
import vn.edu.gplx.modules.admission.domain.ApplicationStatus;
import vn.edu.gplx.modules.identity.application.UserPrincipal;
import vn.edu.gplx.shared.api.ApiResponse;

@Tag(name = "Admissions", description = "Tuyển sinh và Tiếp nhận hồ sơ điện tử")
@RestController
@RequestMapping("/api/v1/admissions")
@SecurityRequirement(name = "bearerAuth")
public class AdmissionController {

    private final AdmissionService admissionService;

    public AdmissionController(AdmissionService admissionService) {
        this.admissionService = admissionService;
    }

    @Operation(summary = "Học viên nộp hồ sơ điện tử đăng ký học lái xe")
    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<ApplicationResponse>> submitApplication(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody SubmitApplicationRequest request) {
        ApplicationResponse response = admissionService.submitApplication(userPrincipal.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Nộp hồ sơ điện tử thành công", response));
    }

    @Operation(summary = "Học viên xem danh sách hồ sơ của chính mình")
    @GetMapping("/my-applications")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Page<ApplicationResponse>>> getMyApplications(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<ApplicationResponse> page = admissionService.getMyApplications(userPrincipal.getId(), pageable);
        return ResponseEntity.ok(ApiResponse.success(page));
    }

    @Operation(summary = "Xem thông tin chi tiết một bộ hồ sơ")
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<ApplicationResponse>> getApplicationById(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        boolean isStaffOrAdmin = isStaffOrAdmin(userPrincipal);
        ApplicationResponse response = admissionService.getApplicationById(id, userPrincipal.getId(), isStaffOrAdmin);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @Operation(summary = "Cán bộ tuyển sinh/Quản trị viên xem danh sách hồ sơ cần thẩm định")
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'MANAGER')")
    public ResponseEntity<ApiResponse<Page<ApplicationResponse>>> getApplications(
            @RequestParam(required = false) ApplicationStatus status,
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<ApplicationResponse> page = admissionService.getApplications(status, pageable);
        return ResponseEntity.ok(ApiResponse.success(page));
    }

    @Operation(summary = "Cán bộ tuyển sinh/Quản trị viên thẩm định xét duyệt hồ sơ")
    @PostMapping("/{id}/review")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'MANAGER')")
    public ResponseEntity<ApiResponse<ApplicationResponse>> reviewApplication(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody ReviewApplicationRequest request) {
        ApplicationResponse response = admissionService.reviewApplication(id, userPrincipal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Thẩm định hồ sơ thành công", response));
    }

    private boolean isStaffOrAdmin(UserPrincipal userPrincipal) {
        return userPrincipal.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN")
                        || a.getAuthority().equals("ROLE_STAFF")
                        || a.getAuthority().equals("ROLE_MANAGER"));
    }
}
