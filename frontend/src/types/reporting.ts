export interface CategoryStat {
    categoryCode: string;
    categoryName: string;
    totalApplications: number;
    totalExamCandidates: number;
    totalPassedCandidates: number;
    passRate: number;
}

export interface AuditLog {
    id: number;
    userId: number | null;
    username: string;
    action: string;
    resourceType: string;
    resourceId: string;
    details: string;
    ipAddress: string;
    createdAt: string;
}

export interface DashboardSummary {
    totalStudents: number;
    totalApplications: number;
    approvedApplications: number;
    totalExamCandidates: number;
    totalPassedCandidates: number;
    overallPassRate: number;
    totalTuitionRevenue: number;
    totalDatDistanceKm: number;
    totalVehicles: number;
    availableVehicles: number;
    categoryStats: CategoryStat[];
    recentActivities: AuditLog[];
}
