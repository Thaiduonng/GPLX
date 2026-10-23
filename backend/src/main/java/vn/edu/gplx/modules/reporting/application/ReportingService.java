package vn.edu.gplx.modules.reporting.application;

import vn.edu.gplx.modules.reporting.api.dto.AuditLogResponse;
import vn.edu.gplx.modules.reporting.api.dto.DashboardSummaryResponse;

import java.util.List;

public interface ReportingService {

    DashboardSummaryResponse getDashboardSummary();

    List<AuditLogResponse> getAuditLogs(String resourceType, String action, int page, int size);

    void recordAuditLog(Long userId, String username, String action, String resourceType,
                        String resourceId, String details, String ipAddress);
}
