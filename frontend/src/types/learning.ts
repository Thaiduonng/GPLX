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
  isCorrect?: boolean;
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

export interface TheoryTopic {
  id: number;
  code: string;
  name: string;
  description: string;
  orderIndex: number;
  totalQuestions: number;
  paralysisQuestions: number;
  userLearnedQuestions: number;
}

export interface QuestionDetail {
  id: number;
  categoryCode: string;
  topicId: number | null;
  topicName: string;
  questionNumber: number;
  content: string;
  imageUrl: string | null;
  explanation: string;
  isParalysis: boolean;
  legalReference: string | null;
  isBookmarked: boolean;
  answers: Answer[];
}

export type PracticeMode =
  | 'TOPIC'
  | 'CATEGORY'
  | 'UNANSWERED'
  | 'INCORRECT'
  | 'PARALYSIS'
  | 'BOOKMARKED'
  | 'RANDOM'
  | 'ALL';

export interface PracticeSessionSummary {
  id: number;
  sessionCode: string;
  practiceMode: PracticeMode;
  categoryCode: string | null;
  topicId: number | null;
  topicName: string | null;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  status: 'IN_PROGRESS' | 'COMPLETED';
  createdAt: string;
  completedAt: string | null;
}

export interface PracticeAnswerResult {
  questionId: number;
  selectedAnswerId: number | null;
  correctAnswerId: number;
  isCorrect: boolean;
  explanation: string;
  legalReference: string | null;
  currentProgressTotal: number;
  currentProgressCorrect: number;
}

export interface ExamOption {
  id: number;
  answerText: string;
  orderIndex: number;
}

export interface ExamQuestion {
  id: number;
  questionIndex: number;
  questionNumber: number;
  content: string;
  imageUrl: string | null;
  isParalysis: boolean;
  options: ExamOption[];
}

export interface MockExamSession {
  sessionCode: string;
  categoryCode: string;
  totalQuestions: number;
  durationMinutes: number;
  passingScore: number;
  startedAt: string;
  remainingSeconds: number;
  questions: ExamQuestion[];
}

export interface MockExamResultItem {
  questionId: number;
  orderIndex: number;
  questionNumber: number;
  content: string;
  imageUrl: string | null;
  isParalysis: boolean;
  selectedAnswerId: number | null;
  correctAnswerId: number;
  isCorrect: boolean;
  explanation: string;
  legalReference: string | null;
  answers: Answer[];
}

export interface MockExamResult {
  sessionCode: string;
  categoryCode: string;
  score: number;
  totalQuestions: number;
  passingScore: number;
  passed: boolean;
  failedParalysis: boolean;
  startedAt: string;
  completedAt: string;
  durationSeconds: number;
  questions: MockExamResultItem[];
}

export interface MockExamSummary {
  id: number;
  sessionCode: string;
  categoryCode: string;
  score: number;
  totalQuestions: number;
  passingScore: number;
  passed: boolean;
  failedParalysis: boolean;
  status: string;
  startedAt: string;
  completedAt: string | null;
}

export interface TopicProgress {
  topicId: number;
  topicCode: string;
  topicName: string;
  totalQuestions: number;
  paralysisQuestions: number;
  answeredQuestions: number;
  correctQuestions: number;
  progressPercentage: number;
}

export interface TheoryStatistics {
  totalQuestionsInBank: number;
  questionsLearned: number;
  completionRate: number;
  totalAnswersSubmitted: number;
  correctAnswersSubmitted: number;
  accuracyRate: number;
  examsTaken: number;
  examsPassed: number;
  examsFailed: number;
  examPassRate: number;
  bookmarkedCount: number;
  incorrectQuestionsCount: number;
  topicProgress: TopicProgress[];
}

export interface ExamConfiguration {
  id: number;
  categoryCode: string;
  totalQuestions: number;
  durationMinutes: number;
  passingScore: number;
  rulesVersion: string;
  active: boolean;
  legalSource: string;
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

export interface AnswerUpsertItem {
  id?: number;
  answerText: string;
  isCorrect: boolean;
  orderIndex: number;
}

export interface QuestionUpsertRequest {
  categoryCode: string;
  topicId?: number | null;
  questionNumber: number;
  content: string;
  imageUrl?: string | null;
  explanation?: string | null;
  isParalysis: boolean;
  legalReference?: string | null;
  answers: AnswerUpsertItem[];
}

export interface QuestionImportResult {
  totalReceived: number;
  successCount: number;
  failureCount: number;
  errors: string[];
}
