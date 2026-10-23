import apiClient from './apiClient';
import { ApiResponse } from '../types/api';
import {
  ExamSession,
  CreateExamSessionRequest,
  EligibilityCheckResult,
  CandidateResponse,
  ExamResultDetail,
  RecordExamScoreRequest,
  ExamSessionStatus
} from '../types/examination';

export const examinationService = {
  // 1. Danh sách kỳ thi sát hạch
  getExamSessions: async (categoryId?: number, status?: ExamSessionStatus): Promise<ExamSession[]> => {
    const params: Record<string, string | number> = {};
    if (categoryId) params.categoryId = categoryId;
    if (status) params.status = status;

    const response = await apiClient.get<ApiResponse<ExamSession[]>>('/api/v1/examination/sessions', { params });
    return response.data.data;
  },

  // 2. Chi tiết kỳ thi
  getExamSessionById: async (id: number): Promise<ExamSession> => {
    const response = await apiClient.get<ApiResponse<ExamSession>>(`/api/v1/examination/sessions/${id}`);
    return response.data.data;
  },

  // 3. Tạo kỳ thi mới (ADMIN, MANAGER)
  createExamSession: async (request: CreateExamSessionRequest): Promise<ExamSession> => {
    const response = await apiClient.post<ApiResponse<ExamSession>>('/api/v1/examination/sessions', request);
    return response.data.data;
  },

  // 4. Kiểm tra điều kiện dự thi tự động (EXM-001)
  checkEligibility: async (categoryCode: string): Promise<EligibilityCheckResult> => {
    const response = await apiClient.get<ApiResponse<EligibilityCheckResult>>('/api/v1/examination/eligibility/check', {
      params: { categoryCode }
    });
    return response.data.data;
  },

  // 5. Đăng ký thí sinh dự thi
  registerCandidate: async (sessionId: number, studentId?: number): Promise<CandidateResponse> => {
    const body = studentId ? { studentId } : {};
    const response = await apiClient.post<ApiResponse<CandidateResponse>>(`/api/v1/examination/sessions/${sessionId}/register`, body);
    return response.data.data;
  },

  // 6. Danh sách thí sinh trong kỳ thi
  getCandidatesBySession: async (sessionId: number): Promise<CandidateResponse[]> => {
    const response = await apiClient.get<ApiResponse<CandidateResponse[]>>(`/api/v1/examination/sessions/${sessionId}/candidates`);
    return response.data.data;
  },

  // 7. Nhập điểm 4 môn sát hạch (EXAMINER, ADMIN)
  recordScore: async (candidateId: number, request: RecordExamScoreRequest): Promise<ExamResultDetail> => {
    const response = await apiClient.post<ApiResponse<ExamResultDetail>>(`/api/v1/examination/candidates/${candidateId}/score`, request);
    return response.data.data;
  },

  // 8. Tra cứu kết quả của 1 thí sinh
  getCandidateResult: async (candidateId: number): Promise<ExamResultDetail> => {
    const response = await apiClient.get<ApiResponse<ExamResultDetail>>(`/api/v1/examination/candidates/${candidateId}/result`);
    return response.data.data;
  },

  // 9. Học viên xem danh sách kết quả của mình
  getMyResults: async (): Promise<ExamResultDetail[]> => {
    const response = await apiClient.get<ApiResponse<ExamResultDetail[]>>('/api/v1/examination/my-results');
    return response.data.data;
  }
};
