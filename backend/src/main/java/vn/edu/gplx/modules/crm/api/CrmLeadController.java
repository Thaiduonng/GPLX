package vn.edu.gplx.modules.crm.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.gplx.modules.crm.api.dto.AddInteractionRequest;
import vn.edu.gplx.modules.crm.api.dto.AdmissionDashboardStatsResponse;
import vn.edu.gplx.modules.crm.api.dto.AdmissionLeadResponse;
import vn.edu.gplx.modules.crm.api.dto.ConvertLeadRequest;
import vn.edu.gplx.modules.crm.api.dto.LeadInteractionResponse;
import vn.edu.gplx.modules.crm.api.dto.UpdateLeadStatusRequest;
import vn.edu.gplx.modules.crm.application.CrmLeadService;
import vn.edu.gplx.modules.crm.domain.LeadSource;
import vn.edu.gplx.modules.crm.domain.LeadStatus;
import vn.edu.gplx.modules.identity.application.UserPrincipal;
import vn.edu.gplx.shared.api.ApiResponse;

@Tag(name = "CRM & Admissions", description = "Quản lý khách hàng tiềm năng, tư vấn và Dashboard tuyển sinh")
@RestController
@RequestMapping("/api/v1/admin/admissions")
@SecurityRequirement(name = "bearerAuth")
public class CrmLeadController {

    private final CrmLeadService crmLeadService;

    public CrmLeadController(CrmLeadService crmLeadService) {
        this.crmLeadService = crmLeadService;
    }

    @Operation(summary = "Lấy danh sách khách hàng tiềm năng kèm bộ lọc CRM")
    @GetMapping("/leads")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'MANAGER', 'COUNSELOR')")
    public ResponseEntity<ApiResponse<Page<AdmissionLeadResponse>>> getLeads(
            @RequestParam(required = false) LeadStatus status,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) LeadSource source,
            @RequestParam(required = false) Long assignedToId,
            @RequestParam(required = false) String keyword,
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<AdmissionLeadResponse> page = crmLeadService.getLeads(status, categoryId, source, assignedToId, keyword, pageable);
        return ResponseEntity.ok(ApiResponse.success(page));
    }

    @Operation(summary = "Xem chi tiết khách hàng tiềm năng và lịch sử tương tác")
    @GetMapping("/leads/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'MANAGER', 'COUNSELOR')")
    public ResponseEntity<ApiResponse<AdmissionLeadResponse>> getLeadById(@PathVariable Long id) {
        AdmissionLeadResponse response = crmLeadService.getLeadById(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @Operation(summary = "Cập nhật trạng thái, phân công nhân viên và ghi chú khách hàng")
    @PatchMapping("/leads/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'MANAGER', 'COUNSELOR')")
    public ResponseEntity<ApiResponse<AdmissionLeadResponse>> updateLead(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody UpdateLeadStatusRequest request) {
        AdmissionLeadResponse response = crmLeadService.updateLead(id, request, userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success("Cập nhật thông tin khách hàng thành công", response));
    }

    @Operation(summary = "Thêm nhật ký cuộc gọi / tương tác tư vấn tuyển sinh")
    @PostMapping("/leads/{id}/interactions")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'MANAGER', 'COUNSELOR')")
    public ResponseEntity<ApiResponse<LeadInteractionResponse>> addInteraction(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody AddInteractionRequest request) {
        LeadInteractionResponse response = crmLeadService.addInteraction(id, userPrincipal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Ghi nhận tương tác thành công", response));
    }

    @Operation(summary = "Chuyển đổi khách hàng tiềm năng thành Hồ sơ học viên")
    @PostMapping("/leads/{id}/convert")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'MANAGER', 'COUNSELOR')")
    public ResponseEntity<ApiResponse<AdmissionLeadResponse>> convertLead(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody ConvertLeadRequest request) {
        AdmissionLeadResponse response = crmLeadService.convertLeadToApplication(id, request, userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success("Chuyển đổi khách hàng thành công", response));
    }

    @Operation(summary = "Thống kê chỉ số Dashboard tuyển sinh và CRM thời gian thực")
    @GetMapping("/dashboard-stats")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'MANAGER', 'COUNSELOR')")
    public ResponseEntity<ApiResponse<AdmissionDashboardStatsResponse>> getDashboardStats() {
        AdmissionDashboardStatsResponse stats = crmLeadService.getDashboardStats();
        return ResponseEntity.ok(ApiResponse.success(stats));
    }
}
