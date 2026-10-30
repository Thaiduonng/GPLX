export type ApplicationStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'SUPPLEMENT_REQUIRED'
  | 'RESUBMITTED'
  | 'ENROLLED'
  | 'WITHDRAWN';

export type DocumentType =
  | 'PORTRAIT_PHOTO'
  | 'NATIONAL_ID_FRONT'
  | 'NATIONAL_ID_BACK'
  | 'HEALTH_CERTIFICATE'
  | 'OTHER';

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export interface LicenseCategory {
  id: number;
  code: string;
  name: string;
  description: string;
  minAge: number;
  tuitionFee: number;
  active: boolean;
}

export interface DocumentUploadItem {
  documentType: DocumentType;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
}

export interface DocumentResponse {
  id: number;
  documentType: DocumentType;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  createdAt: string;
}

export interface StatusHistoryResponse {
  id: number;
  fromStatus: ApplicationStatus | null;
  toStatus: ApplicationStatus;
  note: string | null;
  changedBy: number | null;
  createdAt: string;
}

export interface ApplicationResponse {
  id: number;
  applicationCode: string;
  userId?: number | null;
  category: LicenseCategory;
  courseId?: number | null;
  courseTitle?: string | null;
  fullName: string;
  nationalId: string;
  dateOfBirth: string;
  gender: Gender;
  phone: string;
  email: string;
  address: string;
  status: ApplicationStatus;
  rejectionReason: string | null;
  reviewedBy: number | null;
  reviewedAt: string | null;
  trackingToken?: string | null;
  assignedStaffId?: number | null;
  preferredSchedule?: string | null;
  trainingLocation?: string | null;
  enrolledClassId?: number | null;
  enrolledAt?: string | null;
  version: number;
  createdAt: string;
  updatedAt: string;
  documents: DocumentResponse[];
  statusHistories: StatusHistoryResponse[];
}

export interface SubmitApplicationRequest {
  categoryId: number;
  courseId?: number;
  fullName: string;
  nationalId: string;
  dateOfBirth: string; // YYYY-MM-DD
  gender: Gender;
  phone: string;
  email: string;
  address: string;
  preferredSchedule?: string;
  trainingLocation?: string;
  consentDataProcessing?: boolean;
  documents: DocumentUploadItem[];
}

export interface TrackApplicationRequest {
  applicationCode: string;
  phone?: string;
  trackingToken?: string;
}

export interface PublicApplicationResponse {
  applicationCode: string;
  trackingToken?: string;
  fullName?: string;
  maskedFullName?: string;
  maskedPhone?: string;
  categoryCode: string;
  categoryName: string;
  courseTitle: string | null;
  status: ApplicationStatus;
  rejectionReason: string | null;
  createdAt?: string;
  submittedAt?: string;
  updatedAt?: string;
  preferredSchedule: string | null;
  trainingLocation: string | null;
  enrolledClassName?: string | null;
  enrolledAt?: string | null;
  documents: DocumentResponse[];
  statusHistories: StatusHistoryResponse[];
}

export interface SupplementDocumentRequest {
  trackingToken?: string;
  documents: DocumentUploadItem[];
  note?: string;
}

export interface EnrollApplicationRequest {
  classId: number;
  notes?: string;
}

export interface ReviewApplicationRequest {
  targetStatus: ApplicationStatus;
  note: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
