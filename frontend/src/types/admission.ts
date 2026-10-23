export type ApplicationStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'SUPPLEMENT_REQUIRED';

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
  isActive: boolean;
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
  userId: number;
  category: LicenseCategory;
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
  version: number;
  createdAt: string;
  updatedAt: string;
  documents: DocumentResponse[];
  statusHistories: StatusHistoryResponse[];
}

export interface SubmitApplicationRequest {
  categoryId: number;
  fullName: string;
  nationalId: string;
  dateOfBirth: string; // YYYY-MM-DD
  gender: Gender;
  phone: string;
  email: string;
  address: string;
  documents: DocumentUploadItem[];
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
