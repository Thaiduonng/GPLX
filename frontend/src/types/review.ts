import type { QuestionDetail } from './learning';

export interface ReviewDashboardOverview {
  totalQuestionsNeedingReview: number;
  unconsolidatedWrongCount: number;
  dueTodayCount: number;
  criticalNeedingReviewCount: number;
  bookmarkedCount: number;
  recentAccuracyRate: number;
  totalMasteredCount: number;
  totalReviewingCount: number;
  recommendedMode: string;
  recommendedReason: string;
  topicStats: ReviewTopicStat[];
  recentSessions: ReviewSessionSummary[];
}

export interface ReviewTopicStat {
  topicId: number;
  topicCode: string;
  topicName: string;
  totalAnswered: number;
  wrongCount: number;
  needReviewCount: number;
  recentAccuracyRate: number;
  lastReviewedAt: string;
  priorityLevel: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface ReviewWrongQuestionSummary {
  questionId: number;
  questionNumber: number;
  content: string;
  topicId: number | null;
  topicName: string;
  categoryCode: string;
  isParalysis: boolean;
  wrongAttempts: number;
  correctAttempts: number;
  lastWrongAt: string;
  consecutiveCorrect: number;
  masteryStatus: string;
  priorityScore: number;
}

export interface ReviewSessionStartRequest {
  reviewMode: 'SMART' | 'WRONG_ANSWERS' | 'CRITICAL_PARALYSIS' | 'BOOKMARKED' | 'TOPIC' | 'CATEGORY';
  categoryCode?: string;
  topicId?: number;
  limit?: number;
}

export interface ReviewSessionDetail {
  sessionId: number;
  sessionCode: string;
  reviewMode: string;
  categoryCode: string;
  topicName: string | null;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  status: 'IN_PROGRESS' | 'COMPLETED';
  createdAt: string;
  questions: QuestionDetail[];
}

export interface ReviewAnswerRequest {
  questionId: number;
  selectedAnswerId: number;
}

export interface ReviewAnswerResult {
  questionId: number;
  selectedAnswerId: number;
  correct: boolean;
  correctAnswerId: number;
  explanation: string;
  legalReference: string;
  boxLevel: number;
  consecutiveCorrect: number;
  masteryStatus: string;
  intervalDays: number;
  nextReviewAt: string;
  sessionAnswered: number;
  sessionTotal: number;
  sessionCompleted: boolean;
}

export interface ReviewSessionResult {
  sessionCode: string;
  reviewMode: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracyRate: number;
  completedAt: string;
  questionsNeedingConsolidation: QuestionDetail[];
  suggestedNextStep: string;
}

export interface ReviewSessionSummary {
  id: number;
  sessionCode: string;
  reviewMode: string;
  categoryCode: string;
  topicName: string | null;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracyRate: number;
  status: string;
  createdAt: string;
  completedAt: string | null;
}
