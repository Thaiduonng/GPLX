import apiClient from './apiClient';
import { ApiResponse } from '../types/api';
import { AuditLog, DashboardSummary } from '../types/reporting';

export const reportingService = {
    getDashboardSummary: async (): Promise<DashboardSummary> => {
        const response = await apiClient.get<ApiResponse<DashboardSummary>>('/reporting/dashboard');
        return response.data.data;
    },

    getAuditLogs: async (resourceType?: string, action?: string, page: number = 0, size: number = 20): Promise<AuditLog[]> => {
        const params: Record<string, any> = { page, size };
        if (resourceType) params.resourceType = resourceType;
        if (action) params.action = action;

        const response = await apiClient.get<ApiResponse<AuditLog[]>>('/reporting/audit-logs', { params });
        return response.data.data;
    }
};
