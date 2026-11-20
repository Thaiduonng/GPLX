import apiClient from './apiClient';
import { ApiResponse, PageResult } from '../types/api';
import { TrafficSign, TrafficSignSearchParams, TrafficSignUpdate } from '../types/trafficSign';

const BASE = '/learning/traffic-signs';

export const trafficSignService = {
  async search(params: TrafficSignSearchParams): Promise<PageResult<TrafficSign>> {
    const response = await apiClient.get<ApiResponse<PageResult<TrafficSign>>>(BASE, { params });
    return response.data.data;
  },

  async getByCode(code: string): Promise<TrafficSign> {
    const response = await apiClient.get<ApiResponse<TrafficSign>>(`${BASE}/${encodeURIComponent(code)}`);
    return response.data.data;
  },

  async update(code: string, body: TrafficSignUpdate): Promise<TrafficSign> {
    const response = await apiClient.put<ApiResponse<TrafficSign>>(`${BASE}/${encodeURIComponent(code)}`, body);
    return response.data.data;
  },
};
