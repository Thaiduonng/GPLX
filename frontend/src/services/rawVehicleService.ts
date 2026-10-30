import apiClient from './apiClient';
import { ApiResponse } from '../types/api';
import {
  RawVehicleOverviewResponse,
  RawVehicleStageDto,
  RawVehicleSessionDto,
  RawVehicleSkillEvaluationDto,
  RawVehicleEnrollmentSummaryDto,
  RawVehicleSessionChangeLogDto,
  EnrollRawVehicleRequest,
  CreateRawVehicleSessionRequest,
  UpdateRawVehicleSessionRequest,
  CancelRawVehicleSessionRequest,
  RecordSessionAttendanceRequest,
  CompleteSessionRequest,
  EvaluateSkillRequest,
} from '../types/rawVehicle';

export const rawVehicleService = {
  // ==================== DÀNH CHO HỌC VIÊN ====================
  async getStudentOverview(): Promise<ApiResponse<RawVehicleOverviewResponse>> {
    const res = await apiClient.get<ApiResponse<RawVehicleOverviewResponse>>('/raw-vehicle/student/overview');
    return res.data;
  },

  async getStudentStages(): Promise<ApiResponse<RawVehicleStageDto[]>> {
    const res = await apiClient.get<ApiResponse<RawVehicleStageDto[]>>('/raw-vehicle/student/stages');
    return res.data;
  },

  async getStudentSessions(): Promise<ApiResponse<RawVehicleSessionDto[]>> {
    const res = await apiClient.get<ApiResponse<RawVehicleSessionDto[]>>('/raw-vehicle/student/sessions');
    return res.data;
  },

  async getStudentEvaluations(): Promise<ApiResponse<RawVehicleSkillEvaluationDto[]>> {
    const res = await apiClient.get<ApiResponse<RawVehicleSkillEvaluationDto[]>>('/raw-vehicle/student/evaluations');
    return res.data;
  },

  async getStudentChangeLogs(sessionId: number): Promise<ApiResponse<RawVehicleSessionChangeLogDto[]>> {
    const res = await apiClient.get<ApiResponse<RawVehicleSessionChangeLogDto[]>>(`/raw-vehicle/student/sessions/${sessionId}/logs`);
    return res.data;
  },

  // ==================== DÀNH CHO GIÁO VIÊN ====================
  async getInstructorSessions(): Promise<ApiResponse<RawVehicleSessionDto[]>> {
    const res = await apiClient.get<ApiResponse<RawVehicleSessionDto[]>>('/raw-vehicle/instructor/sessions');
    return res.data;
  },

  async getInstructorSessionDetail(sessionId: number): Promise<ApiResponse<RawVehicleSessionDto>> {
    const res = await apiClient.get<ApiResponse<RawVehicleSessionDto>>(`/raw-vehicle/instructor/sessions/${sessionId}`);
    return res.data;
  },

  async getInstructorStudents(): Promise<ApiResponse<RawVehicleEnrollmentSummaryDto[]>> {
    const res = await apiClient.get<ApiResponse<RawVehicleEnrollmentSummaryDto[]>>('/raw-vehicle/instructor/students');
    return res.data;
  },

  async recordAttendance(
    sessionId: number,
    attendees: RecordSessionAttendanceRequest[]
  ): Promise<ApiResponse<RawVehicleSessionDto>> {
    const res = await apiClient.post<ApiResponse<RawVehicleSessionDto>>(
      `/raw-vehicle/instructor/sessions/${sessionId}/attendance`,
      attendees
    );
    return res.data;
  },

  async completeSession(
    sessionId: number,
    request: CompleteSessionRequest
  ): Promise<ApiResponse<RawVehicleSessionDto>> {
    const res = await apiClient.post<ApiResponse<RawVehicleSessionDto>>(
      `/raw-vehicle/instructor/sessions/${sessionId}/complete`,
      request
    );
    return res.data;
  },

  async evaluateSkill(
    request: EvaluateSkillRequest
  ): Promise<ApiResponse<RawVehicleSkillEvaluationDto>> {
    const res = await apiClient.post<ApiResponse<RawVehicleSkillEvaluationDto>>(
      '/raw-vehicle/instructor/evaluations',
      request
    );
    return res.data;
  },

  // ==================== DÀNH CHO QUẢN LÝ ====================
  async enrollStudent(request: EnrollRawVehicleRequest): Promise<ApiResponse<RawVehicleEnrollmentSummaryDto>> {
    const res = await apiClient.post<ApiResponse<RawVehicleEnrollmentSummaryDto>>(
      '/raw-vehicle/manager/enrollments',
      request
    );
    return res.data;
  },

  async getAllEnrollments(
    status?: string,
    search?: string
  ): Promise<ApiResponse<RawVehicleEnrollmentSummaryDto[]>> {
    const res = await apiClient.get<ApiResponse<RawVehicleEnrollmentSummaryDto[]>>(
      '/raw-vehicle/manager/enrollments',
      {
        params: { status, search },
      }
    );
    return res.data;
  },

  async createSession(
    request: CreateRawVehicleSessionRequest
  ): Promise<ApiResponse<RawVehicleSessionDto>> {
    const res = await apiClient.post<ApiResponse<RawVehicleSessionDto>>(
      '/raw-vehicle/manager/sessions',
      request
    );
    return res.data;
  },

  async updateSession(
    sessionId: number,
    request: UpdateRawVehicleSessionRequest
  ): Promise<ApiResponse<RawVehicleSessionDto>> {
    const res = await apiClient.put<ApiResponse<RawVehicleSessionDto>>(
      `/raw-vehicle/manager/sessions/${sessionId}`,
      request
    );
    return res.data;
  },

  async cancelSession(
    sessionId: number,
    request: CancelRawVehicleSessionRequest
  ): Promise<ApiResponse<RawVehicleSessionDto>> {
    const res = await apiClient.post<ApiResponse<RawVehicleSessionDto>>(
      `/raw-vehicle/manager/sessions/${sessionId}/cancel`,
      request
    );
    return res.data;
  },

  async getAllStages(): Promise<ApiResponse<RawVehicleStageDto[]>> {
    const res = await apiClient.get<ApiResponse<RawVehicleStageDto[]>>('/raw-vehicle/manager/stages');
    return res.data;
  },

  async getAllSessions(params?: {
    status?: string;
    from?: string;
    to?: string;
  }): Promise<ApiResponse<RawVehicleSessionDto[]>> {
    const res = await apiClient.get<ApiResponse<RawVehicleSessionDto[]>>(
      '/raw-vehicle/manager/sessions',
      { params }
    );
    return res.data;
  },

  async getSessionChangeLogs(sessionId: number): Promise<ApiResponse<RawVehicleSessionChangeLogDto[]>> {
    const res = await apiClient.get<ApiResponse<RawVehicleSessionChangeLogDto[]>>(
      `/raw-vehicle/manager/sessions/${sessionId}/logs`
    );
    return res.data;
  },
};
