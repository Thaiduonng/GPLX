import apiClient from './apiClient';
import type { ApiResponse } from '../types/api';
import type { HealthStatus } from '../types/health';

export const healthService = {
  async checkHealth(): Promise<HealthStatus> {
    const response = await apiClient.get<ApiResponse<HealthStatus>>('/health');
    return response.data.data;
  },
};
