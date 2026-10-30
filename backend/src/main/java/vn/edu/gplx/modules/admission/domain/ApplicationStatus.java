package vn.edu.gplx.modules.admission.domain;

/**
 * Trạng thái hồ sơ tuyển sinh theo quy tắc nghiệp vụ ADM-001.
 * DRAFT -> SUBMITTED -> UNDER_REVIEW -> SUPPLEMENT_REQUIRED -> RESUBMITTED -> APPROVED -> ENROLLED (hoặc REJECTED / WITHDRAWN)
 */
public enum ApplicationStatus {
    DRAFT,
    SUBMITTED,
    UNDER_REVIEW,
    SUPPLEMENT_REQUIRED,
    RESUBMITTED,
    APPROVED,
    REJECTED,
    ENROLLED,
    WITHDRAWN
}
