import apiClient from './apiClient';
import { ApiResponse } from '../types/api';
import {
  ApplicationResponse,
  ApplicationStatus,
  LicenseCategory,
  PageResponse,
  ReviewApplicationRequest,
  SubmitApplicationRequest,
} from '../types/admission';

export const admissionService = {
  /**
   * Lấy danh mục các hạng GPLX đang hoạt động (Public)
   */
  async getActiveCategories(): Promise<LicenseCategory[]> {
    const response = await apiClient.get<ApiResponse<LicenseCategory[]>>('/license-categories');
    return response.data.data;
  },

  /**
   * Lấy thông tin một hạng GPLX theo ID
   */
  async getCategoryById(id: number): Promise<LicenseCategory> {
    const response = await apiClient.get<ApiResponse<LicenseCategory>>(`/license-categories/${id}`);
    return response.data.data;
  },

  /**
   * Học viên nộp hồ sơ điện tử
   */
  async submitApplication(request: SubmitApplicationRequest): Promise<ApplicationResponse> {
    const response = await apiClient.post<ApiResponse<ApplicationResponse>>('/admissions', request);
    return response.data.data;
  },

  /**
   * Học viên xem danh sách hồ sơ của mình
   */
  async getMyApplications(page = 0, size = 10): Promise<PageResponse<ApplicationResponse>> {
    const response = await apiClient.get<ApiResponse<PageResponse<ApplicationResponse>>>(
      `/admissions/my-applications?page=${page}&size=${size}`
    );
    return response.data.data;
  },

  /**
   * Xem chi tiết một hồ sơ
   */
  async getApplicationById(id: number): Promise<ApplicationResponse> {
    const response = await apiClient.get<ApiResponse<ApplicationResponse>>(`/admissions/${id}`);
    return response.data.data;
  },

  /**
   * Cán bộ xem danh sách hồ sơ (có thể lọc theo trạng thái)
   */
  async getApplications(status?: ApplicationStatus, page = 0, size = 10): Promise<PageResponse<ApplicationResponse>> {
    const params = new URLSearchParams({ page: page.toString(), size: size.toString() });
    if (status) {
      params.append('status', status);
    }
    const response = await apiClient.get<ApiResponse<PageResponse<ApplicationResponse>>>(
      `/admissions?${params.toString()}`
    );
    return response.data.data;
  },

  /**
   * Cán bộ thẩm định xét duyệt hồ sơ
   */
  async reviewApplication(id: number, request: ReviewApplicationRequest): Promise<ApplicationResponse> {
    const response = await apiClient.post<ApiResponse<ApplicationResponse>>(`/admissions/${id}/review`, request);
    return response.data.data;
  },
};
