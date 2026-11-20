import apiClient from './apiClient';
import type { ApiResponse } from '../types/api';
import type { QuestionDetail } from '../types/learning';
import type {
  ReviewDashboardOverview,
  ReviewWrongQuestionSummary,
  ReviewTopicStat,
  ReviewSessionStartRequest,
  ReviewSessionDetail,
  ReviewAnswerRequest,
  ReviewAnswerResult,
  ReviewSessionResult,
  ReviewSessionSummary,
} from '../types/review';

export const reviewService = {
  async getDashboardOverview(categoryCode: string = 'ALL'): Promise<ReviewDashboardOverview> {
    const response = await apiClient.get<ApiResponse<ReviewDashboardOverview>>('/review/overview', {
      params: { categoryCode },
    });
    return response.data.data;
  },

  async getWrongQuestions(categoryCode?: string, topicId?: number): Promise<ReviewWrongQuestionSummary[]> {
    const response = await apiClient.get<ApiResponse<ReviewWrongQuestionSummary[]>>('/review/wrong-questions', {
      params: { categoryCode, topicId },
    });
    return response.data.data;
  },

  async getCriticalQuestions(categoryCode: string = 'ALL', statusFilter: string = 'ALL'): Promise<QuestionDetail[]> {
    const response = await apiClient.get<ApiResponse<QuestionDetail[]>>('/review/critical-questions', {
      params: { categoryCode, statusFilter },
    });
    return response.data.data;
  },

  async getBookmarkedQuestions(topicId?: number): Promise<QuestionDetail[]> {
    const response = await apiClient.get<ApiResponse<QuestionDetail[]>>('/review/bookmarked-questions', {
      params: { topicId },
    });
    return response.data.data;
  },

  async getTopicStats(categoryCode: string = 'ALL'): Promise<ReviewTopicStat[]> {
    const response = await apiClient.get<ApiResponse<ReviewTopicStat[]>>('/review/topics', {
      params: { categoryCode },
    });
    return response.data.data;
  },

  async startReviewSession(request: ReviewSessionStartRequest): Promise<ReviewSessionDetail> {
    const response = await apiClient.post<ApiResponse<ReviewSessionDetail>>('/review/sessions', request);
    return response.data.data;
  },

  async getReviewSession(sessionCode: string): Promise<ReviewSessionDetail> {
    const response = await apiClient.get<ApiResponse<ReviewSessionDetail>>(`/review/sessions/${sessionCode}`);
    return response.data.data;
  },

  async submitAnswer(sessionCode: string, request: ReviewAnswerRequest): Promise<ReviewAnswerResult> {
    const response = await apiClient.post<ApiResponse<ReviewAnswerResult>>(`/review/sessions/${sessionCode}/answers`, request);
    return response.data.data;
  },

  async completeReviewSession(sessionCode: string): Promise<ReviewSessionResult> {
    const response = await apiClient.post<ApiResponse<ReviewSessionResult>>(`/review/sessions/${sessionCode}/complete`);
    return response.data.data;
  },

  async getReviewHistory(): Promise<ReviewSessionSummary[]> {
    const response = await apiClient.get<ApiResponse<ReviewSessionSummary[]>>('/review/history');
    return response.data.data;
  },
};
