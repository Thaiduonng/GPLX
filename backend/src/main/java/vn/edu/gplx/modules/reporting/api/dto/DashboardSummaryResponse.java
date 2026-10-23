package vn.edu.gplx.modules.reporting.api.dto;

import java.math.BigDecimal;
import java.util.List;

public record DashboardSummaryResponse(
        long totalStudents,
        long totalApplications,
        long approvedApplications,
        long totalExamCandidates,
        long totalPassedCandidates,
        double overallPassRate,
        BigDecimal totalTuitionRevenue,
        BigDecimal totalDatDistanceKm,
        long totalVehicles,
        long availableVehicles,
        List<CategoryStatResponse> categoryStats,
        List<AuditLogResponse> recentActivities
) {
}
