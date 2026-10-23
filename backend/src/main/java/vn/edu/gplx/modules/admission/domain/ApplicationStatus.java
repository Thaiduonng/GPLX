package vn.edu.gplx.modules.admission.domain;

/**
 * Trạng thái hồ sơ tuyển sinh theo quy tắc nghiệp vụ ADM-001.
 */
public enum ApplicationStatus {
    DRAFT,
    SUBMITTED,
    UNDER_REVIEW,
    APPROVED,
    REJECTED,
    SUPPLEMENT_REQUIRED
}
