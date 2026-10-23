import { LicenseCategory } from './admission';

export interface Course {
  id: number;
  code: string;
  title: string;
  description: string;
  totalHours: number;
  isActive: boolean;
  category: LicenseCategory;
  lessonCount: number;
  createdAt: string;
}

export interface Lesson {
  id: number;
  courseId: number;
  title: string;
  content: string;
  videoUrl: string;
  durationMinutes: number;
  orderIndex: number;
  completed: boolean;
  timeSpentSeconds: number;
}

export interface Answer {
  id: number;
  answerText: string;
  orderIndex: number;
}

export interface TheoryQuestion {
  id: number;
  categoryCode: string;
  questionNumber: number;
  content: string;
  imageUrl: string | null;
  explanation: string;
  isParalysis: boolean;
  answers: Answer[];
}

export interface QuestionResultDetail {
  questionId: number;
  questionNumber: number;
  content: string;
  isParalysis: boolean;
  selectedAnswerId: number | null;
  correctAnswerId: number;
  isCorrect: boolean;
  explanation: string;
}

export interface ExamResult {
  categoryCode: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  failedDueToParalysisQuestion: boolean;
  passed: boolean;
  passingScore: number;
  submittedAt: string;
  details: QuestionResultDetail[];
}

export interface UpdateProgressRequest {
  timeSpentSeconds: number;
  markCompleted: boolean;
}

export interface ExamSubmitRequest {
  categoryCode: string;
  userAnswers: Record<number, number>;
}
