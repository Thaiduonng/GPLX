export type RawVehicleEnrollmentStatus = 'ENROLLED' | 'IN_PROGRESS' | 'COMPLETED' | 'PAUSED';

export type RawVehicleSessionStatus = 'SCHEDULED' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export type AttendeeAttendanceStatus = 'NOT_YET' | 'PRESENT' | 'ABSENT' | 'EXCUSED';

export type SkillEvaluationStatus = 'NOT_EVALUATED' | 'PASSED' | 'NEEDS_PRACTICE';

export interface RawVehicleSkillEvaluationDto {
  id: number;
  enrollmentId: number;
  studentId: number;
  stageId: number;
  stageCode: string;
  stageName: string;
  criterionCode: string;
  skillName: string;
  ratingLevel: number;
  evaluationStatus: SkillEvaluationStatus;
  comments?: string;
  evaluatedByName: string;
  evaluatedAt: string;
}

export interface RawVehicleStageDto {
  id: number;
  stageCode: string;
  stageName: string;
  description: string;
  stepOrder: number;
  prerequisiteStageCode?: string;
  expectedDurationMinutes: number;
  evaluationCriteria?: string;
  status: string;
  complianceStatus: string;
  isCompleted?: boolean;
  evaluations?: RawVehicleSkillEvaluationDto[];
}

export interface RawVehicleSessionAttendeeDto {
  id: number;
  studentId: number;
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  attendanceStatus: AttendeeAttendanceStatus;
  attendedAt?: string;
  instructorFeedback?: string;
  skillsToImprove?: string;
}

export interface RawVehicleSessionDto {
  id: number;
  sessionCode: string;
  instructorId: number;
  instructorName: string;
  vehicleId?: number;
  plateNumber?: string;
  vehicleModel?: string;
  stageId?: number;
  stageCode?: string;
  stageName?: string;
  practiceLocation: string;
  scheduledStartTime: string;
  scheduledEndTime: string;
  actualStartTime?: string;
  actualEndTime?: string;
  actualDurationMinutes?: number;
  maxStudents?: number;
  status: RawVehicleSessionStatus;
  safetyChecklistPassed?: boolean;
  instructorNotes?: string;
  cancelReason?: string;
  attendees: RawVehicleSessionAttendeeDto[];
}

export interface RawVehicleOverviewResponse {
  enrollmentId?: number;
  studentId: number;
  studentName: string;
  categoryCode: string;
  categoryName: string;
  instructorName?: string;
  enrollmentStatus: RawVehicleEnrollmentStatus;
  enrolledDate: string;
  totalSessionsCount: number;
  totalConfirmedMinutes: number;
  totalCompletedStages: number;
  totalStagesCount: number;
  progressPercentage: number;
  skillsPassedCount: number;
  skillsNeedsPracticeCount: number;
  nextSession?: RawVehicleSessionDto;
  recentSessions: RawVehicleSessionDto[];
  stagesProgress: RawVehicleStageDto[];
}

export interface RawVehicleEnrollmentSummaryDto {
  id: number;
  studentId: number;
  studentName: string;
  studentPhone?: string;
  studentEmail: string;
  categoryCode: string;
  categoryName: string;
  instructorId?: number;
  instructorName?: string;
  status: RawVehicleEnrollmentStatus;
  enrolledDate: string;
  completedDate?: string;
  totalCompletedStages: number;
  totalConfirmedMinutes: number;
  totalSessionsCount: number;
  progressPercentage: number;
  passedSkillsCount: number;
  needsPracticeSkillsCount: number;
  notes?: string;
}

export interface RawVehicleSessionChangeLogDto {
  id: number;
  sessionId: number;
  changedByName: string;
  changeType: string;
  oldValue?: string;
  newValue?: string;
  reason?: string;
  createdAt: string;
}

export interface EnrollRawVehicleRequest {
  studentId: number;
  categoryId: number;
  instructorId?: number;
  notes?: string;
}

export interface CreateRawVehicleSessionRequest {
  instructorId: number;
  vehicleId: number;
  stageId?: number;
  practiceLocation: string;
  scheduledStartTime: string;
  scheduledEndTime: string;
  maxStudents?: number;
  studentIds: number[];
}

export interface UpdateRawVehicleSessionRequest {
  scheduledStartTime: string;
  scheduledEndTime: string;
  instructorId?: number;
  vehicleId?: number;
  practiceLocation?: string;
  reason: string;
}

export interface CancelRawVehicleSessionRequest {
  cancellationReason: string;
}

export interface RecordSessionAttendanceRequest {
  studentId: number;
  attendanceStatus: AttendeeAttendanceStatus;
  instructorFeedback?: string;
  skillsToImprove?: string;
}

export interface CompleteSessionRequest {
  actualStartTime: string;
  actualEndTime: string;
  instructorNotes?: string;
}

export interface EvaluateSkillRequest {
  enrollmentId: number;
  stageId: number;
  criterionCode: string;
  skillName: string;
  ratingLevel: number;
  evaluationStatus: SkillEvaluationStatus;
  comments?: string;
}
