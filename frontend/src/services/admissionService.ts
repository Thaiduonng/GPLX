import apiClient from './apiClient';
import { ApiResponse } from '../types/api';
import {
  ApplicationResponse,
  ApplicationStatus,
  EnrollApplicationRequest,
  LicenseCategory,
  PageResponse,
  PublicApplicationResponse,
  ReviewApplicationRequest,
  SubmitApplicationRequest,
  SupplementDocumentRequest,
  TrackApplicationRequest,
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
   * Alias tương thích getCategories
   */
  async getCategories(): Promise<LicenseCategory[]> {
    return this.getActiveCategories();
  },

  /**
   * Lấy thông tin một hạng GPLX theo ID
   */
  async getCategoryById(id: number): Promise<LicenseCategory> {
    const response = await apiClient.get<ApiResponse<LicenseCategory>>(`/license-categories/${id}`);
    return response.data.data;
  },

  /**
   * Học viên đăng nhập nộp hồ sơ điện tử
   */
  async submitApplication(request: SubmitApplicationRequest): Promise<ApplicationResponse> {
    const response = await apiClient.post<ApiResponse<ApplicationResponse>>('/admissions', request);
    return response.data.data;
  },

  /**
   * Khách vãng lai / Học viên nộp hồ sơ trực tuyến công khai không cần đăng nhập trước
   */
  async submitPublicApplication(request: SubmitApplicationRequest): Promise<PublicApplicationResponse & { trackingToken?: string }> {
    const response = await apiClient.post<ApiResponse<PublicApplicationResponse & { trackingToken?: string }>>(
      '/public/applications',
      request
    );
    return response.data.data;
  },

  /**
   * Tra cứu trạng thái hồ sơ trực tuyến bằng mã hồ sơ + SĐT hoặc mã tra cứu an toàn
   */
  async trackApplication(request: TrackApplicationRequest): Promise<PublicApplicationResponse> {
    const response = await apiClient.post<ApiResponse<PublicApplicationResponse>>(
      '/public/applications/track',
      request
    );
    return response.data.data;
  },

  /**
   * Bổ sung tài liệu hồ sơ theo yêu cầu cán bộ thẩm định
   */
  async supplementDocuments(
    applicationCode: string,
    request: SupplementDocumentRequest
  ): Promise<PublicApplicationResponse> {
    const response = await apiClient.post<ApiResponse<PublicApplicationResponse>>(
      `/public/applications/${applicationCode}/supplement`,
      request
    );
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
   * Cán bộ xem danh sách hồ sơ (có bộ lọc nâng cao)
   */
  async getApplications(
    status?: ApplicationStatus,
    page = 0,
    size = 10,
    categoryId?: number,
    keyword?: string
  ): Promise<PageResponse<ApplicationResponse>> {
    const params = new URLSearchParams({ page: page.toString(), size: size.toString() });
    if (status) {
      params.append('status', status);
    }
    if (categoryId) {
      params.append('categoryId', categoryId.toString());
    }
    if (keyword && keyword.trim()) {
      params.append('keyword', keyword.trim());
    }
    const response = await apiClient.get<ApiResponse<PageResponse<ApplicationResponse>>>(
      `/admissions?${params.toString()}`
    );
    return response.data.data;
  },

  /**
   * Cán bộ thẩm định xét duyệt hồ sơ (Duyệt, từ chối hoặc yêu cầu bổ sung)
   */
  async reviewApplication(id: number, request: ReviewApplicationRequest): Promise<ApplicationResponse> {
    const response = await apiClient.post<ApiResponse<ApplicationResponse>>(`/admissions/${id}/review`, request);
    return response.data.data;
  },

  /**
   * Xếp lớp và chuyển hồ sơ thành học viên chính thức
   */
  async enrollApplication(id: number, request: EnrollApplicationRequest): Promise<ApplicationResponse> {
    const response = await apiClient.post<ApiResponse<ApplicationResponse>>(
      `/admissions/${id}/enroll`,
      request
    );
    return response.data.data;
  },
};
export default admissionService;
