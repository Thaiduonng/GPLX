package vn.edu.gplx.modules.reporting.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.gplx.modules.reporting.api.dto.AuditLogResponse;
import vn.edu.gplx.modules.reporting.api.dto.DashboardSummaryResponse;
import vn.edu.gplx.modules.reporting.application.ReportingService;
import vn.edu.gplx.shared.api.ApiResponse;

import java.util.List;

@Tag(name = "Reporting & Audit", description = "Dashboard thống kê quản trị và tra cứu nhật ký kiểm toán hệ thống")
@RestController
@RequestMapping("/api/v1/reporting")
@SecurityRequirement(name = "BearerAuth")
public class ReportingController {

    private final ReportingService reportingService;

    public ReportingController(ReportingService reportingService) {
        this.reportingService = reportingService;
    }

    @Operation(summary = "Lấy dữ liệu tổng quan báo cáo KPI và Dashboard quản trị")
    @GetMapping("/dashboard")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<DashboardSummaryResponse>> getDashboardSummary() {
        DashboardSummaryResponse summary = reportingService.getDashboardSummary();
        return ResponseEntity.ok(ApiResponse.success(summary));
    }

    @Operation(summary = "Tra cứu danh sách nhật ký kiểm toán (Audit Logs) có phân trang và bộ lọc")
    @GetMapping("/audit-logs")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<List<AuditLogResponse>>> getAuditLogs(
            @RequestParam(required = false) String resourceType,
            @RequestParam(required = false) String action,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        List<AuditLogResponse> logs = reportingService.getAuditLogs(resourceType, action, page, size);
        return ResponseEntity.ok(ApiResponse.success(logs));
    }
}
