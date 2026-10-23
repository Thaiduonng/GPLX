export type ClassStatus = 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export type ScheduleType = 'THEORY' | 'PRACTICE_YARD' | 'PRACTICE_ROAD' | 'CABIN_SIMULATION';

export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'EXCUSED';

export interface TrainingClass {
  id: number;
  courseId: number;
  courseTitle: string;
  classCode: string;
  name: string;
  instructorId: number;
  startDate: string;
  endDate: string;
  maxStudents: number;
  enrolledStudents: number;
  status: ClassStatus;
  createdAt: string;
}

export interface TrainingSchedule {
  id: number;
  classId: number;
  className: string;
  title: string;
  scheduleType: ScheduleType;
  startTime: string;
  endTime: string;
  location: string;
  instructorId: number;
  status: string;
}

export interface AttendanceRecord {
  id: number;
  scheduleId: number;
  studentId: number;
  status: AttendanceStatus;
  checkedInAt: string;
  note: string | null;
}

export interface DatSession {
  id: number;
  studentId: number;
  instructorId: number;
  sessionType: string;
  startTime: string;
  endTime: string;
  distanceKm: number;
  durationMinutes: number;
  status: string;
  deviceId: string | null;
  note: string | null;
  createdAt: string;
}

export interface DatSummary {
  studentId: number;
  totalDistanceKm: number;
  totalDurationMinutes: number;
  totalSessions: number;
  targetDistanceKm: number;
  targetDurationMinutes: number;
  isCompleted: boolean;
  sessions: DatSession[];
}

export interface CreateClassRequest {
  courseId: number;
  name: string;
  instructorId: number;
  startDate: string;
  endDate: string;
  maxStudents: number;
}

export interface CreateScheduleRequest {
  classId: number;
  title: string;
  scheduleType: ScheduleType;
  startTime: string;
  endTime: string;
  location: string;
  instructorId: number;
}
