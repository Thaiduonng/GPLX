package vn.edu.gplx.modules.learning.api.dto;

import java.util.List;

public record ReviewDashboardOverviewResponse(
        long totalQuestionsNeedingReview,
        long unconsolidatedWrongCount,
        long dueTodayCount,
        long criticalNeedingReviewCount,
        long bookmarkedCount,
        double recentAccuracyRate,
        long totalMasteredCount,
        long totalReviewingCount,
        String recommendedMode,
        String recommendedReason,
        List<ReviewTopicStatDto> topicStats,
        List<ReviewSessionSummaryDto> recentSessions
) {
}
