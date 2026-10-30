package vn.edu.gplx.modules.rawvehicle.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import vn.edu.gplx.modules.identity.domain.User;
import vn.edu.gplx.shared.domain.BaseEntity;

import java.time.LocalDateTime;

/**
 * Đánh giá kỹ năng của học viên theo giai đoạn / tiêu chí.
 */
@Entity
@Table(name = "raw_vehicle_skill_evaluations")
public class RawVehicleSkillEvaluation extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enrollment_id", nullable = false)
    private RawVehicleEnrollment enrollment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stage_id", nullable = false)
    private RawVehicleStage stage;

    @Column(name = "criterion_code", nullable = false, length = 50)
    private String criterionCode;

    @Column(name = "skill_name", nullable = false, length = 150)
    private String skillName;

    @Column(name = "rating_level", nullable = false)
    private Integer ratingLevel = 0; // 1 to 5, 0 = not evaluated

    @Enumerated(EnumType.STRING)
    @Column(name = "evaluation_status", nullable = false, length = 30)
    private SkillEvaluationStatus evaluationStatus = SkillEvaluationStatus.NOT_EVALUATED;

    @Column(name = "comments", columnDefinition = "TEXT")
    private String comments;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "evaluated_by_id", nullable = false)
    private User evaluatedBy;

    @Column(name = "evaluated_at", nullable = false)
    private LocalDateTime evaluatedAt = LocalDateTime.now();

    public RawVehicleSkillEvaluation() {
    }

    public RawVehicleSkillEvaluation(RawVehicleEnrollment enrollment, User student, RawVehicleStage stage,
                                     String criterionCode, String skillName, Integer ratingLevel,
                                     SkillEvaluationStatus evaluationStatus, String comments, User evaluatedBy) {
        this.enrollment = enrollment;
        this.student = student;
        this.stage = stage;
        this.criterionCode = criterionCode;
        this.skillName = skillName;
        this.ratingLevel = ratingLevel;
        this.evaluationStatus = evaluationStatus;
        this.comments = comments;
        this.evaluatedBy = evaluatedBy;
        this.evaluatedAt = LocalDateTime.now();
    }

    public RawVehicleEnrollment getEnrollment() {
        return enrollment;
    }

    public void setEnrollment(RawVehicleEnrollment enrollment) {
        this.enrollment = enrollment;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public RawVehicleStage getStage() {
        return stage;
    }

    public void setStage(RawVehicleStage stage) {
        this.stage = stage;
    }

    public String getCriterionCode() {
        return criterionCode;
    }

    public void setCriterionCode(String criterionCode) {
        this.criterionCode = criterionCode;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public Integer getRatingLevel() {
        return ratingLevel;
    }

    public void setRatingLevel(Integer ratingLevel) {
        this.ratingLevel = ratingLevel;
    }

    public SkillEvaluationStatus getEvaluationStatus() {
        return evaluationStatus;
    }

    public void setEvaluationStatus(SkillEvaluationStatus evaluationStatus) {
        this.evaluationStatus = evaluationStatus;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public User getEvaluatedBy() {
        return evaluatedBy;
    }

    public void setEvaluatedBy(User evaluatedBy) {
        this.evaluatedBy = evaluatedBy;
    }

    public LocalDateTime getEvaluatedAt() {
        return evaluatedAt;
    }

    public void setEvaluatedAt(LocalDateTime evaluatedAt) {
        this.evaluatedAt = evaluatedAt;
    }
}
