export type ExamType = 'GRADUATION' | 'CERTIFICATION';

export type ExamSessionStatus = 'PLANNED' | 'REGISTRATION_OPEN' | 'REGISTRATION_CLOSED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export type CandidateEligibility = 'QUALIFIED' | 'DISQUALIFIED' | 'PENDING_REVIEW';

export type FinalExamResult = 'PENDING' | 'PASSED' | 'FAILED';

export interface ExamSession {
  id: number;
  examCode: string;
  name: string;
  categoryId: number;
  categoryCode: string;
  examDate: string;
  location: string;
  examType: ExamType;
  status: ExamSessionStatus;
  candidateCount: number;
  createdAt: string;
}

export interface CreateExamSessionRequest {
  name: string;
  categoryId: number;
  examDate: string;
  location: string;
  examType: ExamType;
}

export interface EligibilityCheckResult {
  userId: number;
  categoryCode: string;
  isEligible: boolean;
  isAdmissionApproved: boolean;
  isTheoryCompleted: boolean;
  isDatCompleted: boolean;
  datDistanceKm: number;
  targetDatDistanceKm: number;
  datDurationMinutes: number;
  targetDatDurationMinutes: number;
  missingRequirements: string[];
}

export interface CandidateResponse {
  id: number;
  examSessionId: number;
  examCode: string;
  userId: number;
  candidateNumber: string;
  eligibilityStatus: CandidateEligibility;
  disqualificationReason?: string;
  finalResult: FinalExamResult;
  createdAt: string;
}

export interface ExamResultDetail {
  candidateId: number;
  candidateNumber: string;
  userId: number;
  examCode: string;
  categoryCode: string;
  theoryScore?: number;
  theoryPassed?: boolean;
  simulationScore?: number;
  simulationPassed?: boolean;
  yardScore?: number;
  yardPassed?: boolean;
  roadScore?: number;
  roadPassed?: boolean;
  finalResult: FinalExamResult;
  examinerId?: number;
  examinerNote?: string;
  updatedAt: string;
}

export interface RecordExamScoreRequest {
  theoryScore?: number;
  simulationScore?: number;
  yardScore?: number;
  roadScore?: number;
  examinerNote?: string;
}
