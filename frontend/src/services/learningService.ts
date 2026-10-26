import apiClient from './apiClient';
import { ApiResponse } from '../types/api';
import {
  Course,
  ExamConfiguration,
  ExamResult,
  ExamSubmitRequest,
  Lesson,
  MockExamResult,
  MockExamSession,
  MockExamSummary,
  PracticeAnswerResult,
  PracticeMode,
  PracticeSessionSummary,
  QuestionDetail,
  TheoryQuestion,
  TheoryStatistics,
  TheoryTopic,
  UpdateProgressRequest,
} from '../types/learning';

export const learningService = {
  // ---------------------------------------------------------------------------
  // KHÓA HỌC & BÀI GIẢNG E-LEARNING
  // ---------------------------------------------------------------------------
  async getCourses(): Promise<Course[]> {
    const response = await apiClient.get<ApiResponse<Course[]>>('/courses');
    return response.data.data;
  },

  async getCourseById(id: number): Promise<Course> {
    const response = await apiClient.get<ApiResponse<Course>>(`/courses/${id}`);
    return response.data.data;
  },

  async getLessons(courseId: number): Promise<Lesson[]> {
    const response = await apiClient.get<ApiResponse<Lesson[]>>(`/courses/${courseId}/lessons`);
    return response.data.data;
  },

  async updateProgress(lessonId: number, request: UpdateProgressRequest) {
    const response = await apiClient.post<ApiResponse<any>>(`/courses/lessons/${lessonId}/progress`, request);
    return response.data.data;
  },

  // ---------------------------------------------------------------------------
  // CHỦ ĐỀ & HỌC TẬP LÝ THUYẾT (7 CHƯƠNG)
  // ---------------------------------------------------------------------------
  async getTopics(): Promise<TheoryTopic[]> {
    const response = await apiClient.get<ApiResponse<TheoryTopic[]>>('/theory/topics');
    return response.data.data;
  },

  async getQuestionsByTopic(topicId: number): Promise<QuestionDetail[]> {
    const response = await apiClient.get<ApiResponse<QuestionDetail[]>>(`/theory/topics/${topicId}/questions`);
    return response.data.data;
  },

  async toggleBookmark(questionId: number): Promise<boolean> {
    const response = await apiClient.post<ApiResponse<boolean>>(`/theory/bookmarks/${questionId}`);
    return response.data.data;
  },

  async getBookmarks(): Promise<QuestionDetail[]> {
    const response = await apiClient.get<ApiResponse<QuestionDetail[]>>('/theory/bookmarks');
    return response.data.data;
  },

  // ---------------------------------------------------------------------------
  // RÈN LUYỆN 8 CHẾ ĐỘ (PRACTICE)
  // ---------------------------------------------------------------------------
  async startPractice(params: {
    practiceMode: PracticeMode;
    categoryCode?: string;
    topicId?: number;
    limit?: number;
  }): Promise<PracticeSessionSummary> {
    const response = await apiClient.post<ApiResponse<PracticeSessionSummary>>('/theory/practice/start', params);
    return response.data.data;
  },

  async getPracticeQuestions(sessionCode: string): Promise<QuestionDetail[]> {
    const response = await apiClient.get<ApiResponse<QuestionDetail[]>>(`/theory/practice/${sessionCode}/questions`);
    return response.data.data;
  },

  async submitPracticeAnswer(
    sessionCode: string,
    questionId: number,
    selectedAnswerId: number | null
  ): Promise<PracticeAnswerResult> {
    const response = await apiClient.post<ApiResponse<PracticeAnswerResult>>(`/theory/practice/${sessionCode}/answer`, {
      questionId,
      selectedAnswerId,
    });
    return response.data.data;
  },

  async completePracticeSession(sessionCode: string): Promise<PracticeSessionSummary> {
    const response = await apiClient.post<ApiResponse<PracticeSessionSummary>>(`/theory/practice/${sessionCode}/complete`);
    return response.data.data;
  },

  async getPracticeHistory(): Promise<PracticeSessionSummary[]> {
    const response = await apiClient.get<ApiResponse<PracticeSessionSummary[]>>('/theory/practice/history');
    return response.data.data;
  },

  // ---------------------------------------------------------------------------
  // THI THỬ LÝ THUYẾT BẢO MẬT & CHUẨN HÓA THEO HẠNG GPLX
  // ---------------------------------------------------------------------------
  async startMockExam(categoryCode: string): Promise<MockExamSession> {
    const response = await apiClient.post<ApiResponse<MockExamSession>>('/theory/mock-exam/start', { categoryCode });
    return response.data.data;
  },

  async getMockExamSession(sessionCode: string): Promise<MockExamSession> {
    const response = await apiClient.get<ApiResponse<MockExamSession>>(`/theory/mock-exam/${sessionCode}`);
    return response.data.data;
  },

  async submitMockExamSession(
    sessionCode: string,
    answers: Record<number, number>
  ): Promise<MockExamResult> {
    const response = await apiClient.post<ApiResponse<MockExamResult>>(`/theory/mock-exam/${sessionCode}/submit`, {
      answers,
    });
    return response.data.data;
  },

  async getMockExamDetail(sessionCode: string): Promise<MockExamResult> {
    const response = await apiClient.get<ApiResponse<MockExamResult>>(`/theory/mock-exam/${sessionCode}/result`);
    return response.data.data;
  },

  async getMockExamHistory(): Promise<MockExamSummary[]> {
    const response = await apiClient.get<ApiResponse<MockExamSummary[]>>('/theory/mock-exam/history');
    return response.data.data;
  },

  // ---------------------------------------------------------------------------
  // BÁO CÁO TIẾN ĐỘ & CÂU HỎI LÀM SAI
  // ---------------------------------------------------------------------------
  async getStatistics(): Promise<TheoryStatistics> {
    const response = await apiClient.get<ApiResponse<TheoryStatistics>>('/theory/statistics');
    return response.data.data;
  },

  async getIncorrectQuestions(): Promise<QuestionDetail[]> {
    const response = await apiClient.get<ApiResponse<QuestionDetail[]>>('/theory/statistics/incorrect-questions');
    return response.data.data;
  },

  // ---------------------------------------------------------------------------
  // QUẢN TRỊ ADMIN (NGÂN HÀNG & CẤU HÌNH ĐỀ)
  // ---------------------------------------------------------------------------
  async getExamConfigurations(): Promise<ExamConfiguration[]> {
    const response = await apiClient.get<ApiResponse<ExamConfiguration[]>>('/admin/theory/exam-configs');
    return response.data.data;
  },

  async updateExamConfig(id: number, config: Partial<ExamConfiguration>): Promise<ExamConfiguration> {
    const response = await apiClient.put<ApiResponse<ExamConfiguration>>(`/admin/theory/exam-configs/${id}`, config);
    return response.data.data;
  },

  // ---------------------------------------------------------------------------
  // LEGACY
  // ---------------------------------------------------------------------------
  async getQuestions(category = 'B1'): Promise<TheoryQuestion[]> {
    const response = await apiClient.get<ApiResponse<TheoryQuestion[]>>(`/theory/questions?category=${category}`);
    return response.data.data;
  },

  async generateMockExam(category = 'B1', limit = 25): Promise<TheoryQuestion[]> {
    const response = await apiClient.get<ApiResponse<TheoryQuestion[]>>(`/theory/mock-exam?category=${category}&limit=${limit}`);
    return response.data.data;
  },

  async submitMockExam(request: ExamSubmitRequest): Promise<ExamResult> {
    const response = await apiClient.post<ApiResponse<ExamResult>>('/theory/mock-exam/submit', request);
    return response.data.data;
  },
};
