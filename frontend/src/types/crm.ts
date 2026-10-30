export type LeadStatus =
  | 'NEW'
  | 'CONTACTING'
  | 'CONSULTED'
  | 'FOLLOW_UP'
  | 'CONVERTED'
  | 'NOT_INTERESTED';

export type LeadSource =
  | 'HOMEPAGE'
  | 'COURSE_DETAIL'
  | 'CAMPAIGN'
  | 'DIRECT'
  | 'REFERRAL'
  | 'OTHER';

export type ContactChannel =
  | 'PHONE'
  | 'ZALO'
  | 'EMAIL'
  | 'FACEBOOK'
  | 'IN_PERSON';

export type InteractionType =
  | 'CALL'
  | 'SMS'
  | 'ZALO_MESSAGE'
  | 'EMAIL'
  | 'MEETING'
  | 'NOTE';

export interface LeadInteraction {
  id: number;
  leadId: number;
  staffId: number;
  staffName: string;
  interactionType: InteractionType;
  content: string;
  result: string | null;
  nextAction: string | null;
  nextActionAt: string | null;
  createdAt: string;
}

export interface AdmissionLead {
  id: number;
  leadCode: string;
  fullName: string;
  phone: string;
  email: string | null;
  categoryCode: string | null;
  categoryName: string | null;
  courseId: number | null;
  courseTitle: string | null;
  preferredContactChannel: ContactChannel;
  preferredContactTime: string | null;
  trainingLocation: string | null;
  status: LeadStatus;
  source: LeadSource;
  assignedToId: number | null;
  assignedToName: string | null;
  notes: string | null;
  followUpAt: string | null;
  convertedApplicationId: number | null;
  convertedApplicationCode: string | null;
  consentGdpr: boolean;
  createdAt: string;
  updatedAt: string;
  interactions: LeadInteraction[];
}

export interface CreateLeadInquiryRequest {
  fullName: string;
  phone: string;
  email?: string;
  categoryId?: number;
  courseId?: number;
  preferredContactChannel?: ContactChannel;
  preferredContactTime?: string;
  trainingLocation?: string;
  source?: LeadSource;
  notes?: string;
  consentGdpr: boolean;
}

export interface UpdateLeadStatusRequest {
  status: LeadStatus;
  notes?: string;
  assignedToId?: number;
  followUpAt?: string;
}

export interface AddInteractionRequest {
  interactionType: InteractionType;
  content: string;
  result?: string;
  nextAction?: string;
  nextActionAt?: string;
}

export interface ConvertLeadRequest {
  categoryId?: number;
  courseId?: number;
  preferredSchedule?: string;
  trainingLocation?: string;
  note?: string;
}

export interface AdmissionDashboardStats {
  totalLeads: number;
  newLeads: number;
  contactingLeads: number;
  convertedLeads: number;
  totalApplications: number;
  submittedApplications: number;
  underReviewApplications: number;
  supplementRequiredApplications: number;
  approvedApplications: number;
  enrolledStudents: number;
  rejectedApplications: number;
  leadConversionRate: number;
  applicationApprovalRate: number;
  leadsBySource: Record<string, number>;
  applicationsByCategory: Record<string, number>;
}
