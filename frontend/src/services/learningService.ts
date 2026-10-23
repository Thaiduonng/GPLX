import apiClient from './apiClient';
import { ApiResponse } from '../types/api';
import { Course, ExamResult, ExamSubmitRequest, Lesson, TheoryQuestion, UpdateProgressRequest } from '../types/learning';

export const learningService = {
  /**
   * Lấy danh sách khóa học đang mở
   */
  async getCourses(): Promise<Course[]> {
    const response = await apiClient.get<ApiResponse<Course[]>>('/courses');
    return response.data.data;
  },

  /**
   * Lấy chi tiết khóa học
   */
  async getCourseById(id: number): Promise<Course> {
    const response = await apiClient.get<ApiResponse<Course>>(`/courses/${id}`);
    return response.data.data;
  },

  /**
   * Lấy danh sách bài giảng kèm tiến độ học viên
   */
  async getLessons(courseId: number): Promise<Lesson[]> {
    const response = await apiClient.get<ApiResponse<Lesson[]>>(`/courses/${courseId}/lessons`);
    return response.data.data;
  },

  /**
   * Cập nhật tiến độ học tập bài giảng (LRN-001, LRN-002)
   */
  async updateProgress(lessonId: number, request: UpdateProgressRequest) {
    const response = await apiClient.post<ApiResponse<any>>(`/courses/lessons/${lessonId}/progress`, request);
    return response.data.data;
  },

  /**
   * Ngân hàng câu hỏi lý thuyết ôn tập
   */
  async getQuestions(category = 'B1'): Promise<TheoryQuestion[]> {
    const response = await apiClient.get<ApiResponse<TheoryQuestion[]>>(`/theory/questions?category=${category}`);
    return response.data.data;
  },

  /**
   * Sinh đề thi thử ngẫu nhiên
   */
  async generateMockExam(category = 'B1', limit = 25): Promise<TheoryQuestion[]> {
    const response = await apiClient.get<ApiResponse<TheoryQuestion[]>>(`/theory/mock-exam?category=${category}&limit=${limit}`);
    return response.data.data;
  },

  /**
   * Nộp bài thi thử và nhận kết quả chấm điểm tức thì
   */
  async submitMockExam(request: ExamSubmitRequest): Promise<ExamResult> {
    const response = await apiClient.post<ApiResponse<ExamResult>>('/theory/mock-exam/submit', request);
    return response.data.data;
  },
};
