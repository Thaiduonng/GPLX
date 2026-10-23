import apiClient from './apiClient';
import { ApiResponse } from '../types/api';
import { AttendanceRecord, ClassStatus, DatSummary, TrainingClass, TrainingSchedule } from '../types/training';

export const trainingService = {
  /**
   * Lấy danh sách lớp đào tạo
   */
  async getClasses(status?: ClassStatus): Promise<TrainingClass[]> {
    const url = status ? `/training/classes?status=${status}` : '/training/classes';
    const response = await apiClient.get<ApiResponse<TrainingClass[]>>(url);
    return response.data.data;
  },

  /**
   * Lấy lịch học theo lớp
   */
  async getSchedulesByClass(classId: number): Promise<TrainingSchedule[]> {
    const response = await apiClient.get<ApiResponse<TrainingSchedule[]>>(`/training/schedules/class/${classId}`);
    return response.data.data;
  },

  /**
   * Lấy lịch sử điểm danh của học viên
   */
  async getMyAttendance(): Promise<AttendanceRecord[]> {
    const response = await apiClient.get<ApiResponse<AttendanceRecord[]>>('/training/attendance/my-records');
    return response.data.data;
  },

  /**
   * Học viên xem tổng hợp tiến độ thực hành lái xe đường trường DAT & Cabin mô phỏng
   */
  async getMyDatSummary(): Promise<DatSummary> {
    const response = await apiClient.get<ApiResponse<DatSummary>>('/training/dat/my-summary');
    return response.data.data;
  },
};
