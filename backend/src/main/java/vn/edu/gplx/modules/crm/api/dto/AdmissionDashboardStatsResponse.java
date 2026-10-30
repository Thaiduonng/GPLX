package vn.edu.gplx.modules.crm.api.dto;

import java.util.Map;

public record AdmissionDashboardStatsResponse(
        long totalLeads,
        long newLeads,
        long contactingLeads,
        long convertedLeads,
        long totalApplications,
        long submittedApplications,
        long underReviewApplications,
        long supplementRequiredApplications,
        long approvedApplications,
        long enrolledStudents,
        long rejectedApplications,
        double leadConversionRate,
        double applicationApprovalRate,
        Map<String, Long> leadsBySource,
        Map<String, Long> applicationsByCategory
) {
}
