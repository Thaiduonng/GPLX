package vn.edu.gplx.modules.examination.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import vn.edu.gplx.shared.domain.BaseEntity;

@Entity
@Table(name = "exam_candidates")
public class ExamCandidate extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_session_id", nullable = false)
    private ExamSession examSession;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "candidate_number", nullable = false, length = 20)
    private String candidateNumber; // Số báo danh (SBD)

    @Enumerated(EnumType.STRING)
    @Column(name = "eligibility_status", nullable = false, length = 30)
    private CandidateEligibility eligibilityStatus = CandidateEligibility.QUALIFIED;

    @Column(name = "disqualification_reason")
    private String disqualificationReason;

    @OneToOne(mappedBy = "candidate", cascade = CascadeType.ALL)
    private ExamResult result;

    public ExamCandidate() {
    }

    public ExamCandidate(ExamSession examSession, Long userId, String candidateNumber,
                         CandidateEligibility eligibilityStatus, String disqualificationReason) {
        this.examSession = examSession;
        this.userId = userId;
        this.candidateNumber = candidateNumber;
        this.eligibilityStatus = eligibilityStatus;
        this.disqualificationReason = disqualificationReason;
    }

    public ExamSession getExamSession() {
        return examSession;
    }

    public void setExamSession(ExamSession examSession) {
        this.examSession = examSession;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCandidateNumber() {
        return candidateNumber;
    }

    public void setCandidateNumber(String candidateNumber) {
        this.candidateNumber = candidateNumber;
    }

    public CandidateEligibility getEligibilityStatus() {
        return eligibilityStatus;
    }

    public void setEligibilityStatus(CandidateEligibility eligibilityStatus) {
        this.eligibilityStatus = eligibilityStatus;
    }

    public String getDisqualificationReason() {
        return disqualificationReason;
    }

    public void setDisqualificationReason(String disqualificationReason) {
        this.disqualificationReason = disqualificationReason;
    }

    public ExamResult getResult() {
        return result;
    }

    public void setResult(ExamResult result) {
        this.result = result;
        if (result != null) {
            result.setCandidate(this);
        }
    }
}
