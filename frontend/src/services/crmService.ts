import apiClient from './apiClient';
import { ApiResponse } from '../types/api';
import { PageResponse } from '../types/admission';
import {
  AddInteractionRequest,
  AdmissionDashboardStats,
  AdmissionLead,
  ConvertLeadRequest,
  CreateLeadInquiryRequest,
  LeadInteraction,
  LeadSource,
  LeadStatus,
  UpdateLeadStatusRequest,
} from '../types/crm';

export const crmService = {
  /**
   * Khách gửi yêu cầu tư vấn khóa học (Public)
   */
  async submitInquiry(request: CreateLeadInquiryRequest): Promise<AdmissionLead> {
    const response = await apiClient.post<ApiResponse<AdmissionLead>>('/public/admission-inquiries', request);
    return response.data.data;
  },

  /**
   * Cán bộ tư vấn / Quản trị viên lấy danh sách khách hàng tiềm năng
   */
  async getLeads(
    params: {
      status?: LeadStatus;
      categoryId?: number;
      source?: LeadSource;
      assignedToId?: number;
      keyword?: string;
      page?: number;
      size?: number;
    } = {}
  ): Promise<PageResponse<AdmissionLead>> {
    const searchParams = new URLSearchParams();
    if (params.page !== undefined) searchParams.append('page', params.page.toString());
    if (params.size !== undefined) searchParams.append('size', params.size.toString());
    if (params.status) searchParams.append('status', params.status);
    if (params.categoryId) searchParams.append('categoryId', params.categoryId.toString());
    if (params.source) searchParams.append('source', params.source);
    if (params.assignedToId) searchParams.append('assignedToId', params.assignedToId.toString());
    if (params.keyword && params.keyword.trim()) searchParams.append('keyword', params.keyword.trim());

    const response = await apiClient.get<ApiResponse<PageResponse<AdmissionLead>>>(
      `/admin/admissions/leads?${searchParams.toString()}`
    );
    return response.data.data;
  },

  /**
   * Chi tiết Lead
   */
  async getLeadById(id: number): Promise<AdmissionLead> {
    const response = await apiClient.get<ApiResponse<AdmissionLead>>(`/admin/admissions/leads/${id}`);
    return response.data.data;
  },

  /**
   * Cập nhật trạng thái và phân công nhân viên chăm sóc
   */
  async updateLead(id: number, request: UpdateLeadStatusRequest): Promise<AdmissionLead> {
    const response = await apiClient.put<ApiResponse<AdmissionLead>>(`/admin/admissions/leads/${id}`, request);
    return response.data.data;
  },

  /**
   * Ghi log tương tác (gọi điện, nhắn Zalo, ghi chú)
   */
  async addInteraction(leadId: number, request: AddInteractionRequest): Promise<LeadInteraction> {
    const response = await apiClient.post<ApiResponse<LeadInteraction>>(
      `/admin/admissions/leads/${leadId}/interactions`,
      request
    );
    return response.data.data;
  },

  /**
   * Chuyển đổi Lead thành Hồ sơ đăng ký học chính thức
   */
  async convertLead(leadId: number, request: ConvertLeadRequest): Promise<AdmissionLead> {
    const response = await apiClient.post<ApiResponse<AdmissionLead>>(
      `/admin/admissions/leads/${leadId}/convert`,
      request
    );
    return response.data.data;
  },

  /**
   * Thống kê KPI Tuyển sinh thời gian thực
   */
  async getDashboardStats(): Promise<AdmissionDashboardStats> {
    const response = await apiClient.get<ApiResponse<AdmissionDashboardStats>>('/admin/admissions/dashboard-stats');
    return response.data.data;
  },
};

export default crmService;
