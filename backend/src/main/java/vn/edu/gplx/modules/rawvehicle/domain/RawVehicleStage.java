package vn.edu.gplx.modules.rawvehicle.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import vn.edu.gplx.shared.domain.BaseEntity;

/**
 * Giai đoạn kỹ năng làm quen xe thô (Stage 1 đến Stage 8).
 */
@Entity
@Table(name = "raw_vehicle_stages")
public class RawVehicleStage extends BaseEntity {

    @Column(name = "stage_code", nullable = false, unique = true, length = 50)
    private String stageCode;

    @Column(name = "stage_name", nullable = false, length = 150)
    private String stageName;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "step_order", nullable = false)
    private Integer stepOrder;

    @Column(name = "prerequisite_stage_code", length = 50)
    private String prerequisiteStageCode;

    @Column(name = "expected_duration_minutes", nullable = false)
    private Integer expectedDurationMinutes = 60;

    @Column(name = "evaluation_criteria", nullable = false, columnDefinition = "TEXT")
    private String evaluationCriteria;

    @Column(name = "status", nullable = false, length = 30)
    private String status = "ACTIVE";

    @Column(name = "compliance_status", nullable = false, length = 30)
    private String complianceStatus = "INTERNAL_RULE";

    public RawVehicleStage() {
    }

    public RawVehicleStage(String stageCode, String stageName, String description, Integer stepOrder,
                           String prerequisiteStageCode, Integer expectedDurationMinutes,
                           String evaluationCriteria, String status, String complianceStatus) {
        this.stageCode = stageCode;
        this.stageName = stageName;
        this.description = description;
        this.stepOrder = stepOrder;
        this.prerequisiteStageCode = prerequisiteStageCode;
        this.expectedDurationMinutes = expectedDurationMinutes;
        this.evaluationCriteria = evaluationCriteria;
        this.status = status;
        this.complianceStatus = complianceStatus;
    }

    public String getStageCode() {
        return stageCode;
    }

    public void setStageCode(String stageCode) {
        this.stageCode = stageCode;
    }

    public String getStageName() {
        return stageName;
    }

    public void setStageName(String stageName) {
        this.stageName = stageName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getStepOrder() {
        return stepOrder;
    }

    public void setStepOrder(Integer stepOrder) {
        this.stepOrder = stepOrder;
    }

    public String getPrerequisiteStageCode() {
        return prerequisiteStageCode;
    }

    public void setPrerequisiteStageCode(String prerequisiteStageCode) {
        this.prerequisiteStageCode = prerequisiteStageCode;
    }

    public Integer getExpectedDurationMinutes() {
        return expectedDurationMinutes;
    }

    public void setExpectedDurationMinutes(Integer expectedDurationMinutes) {
        this.expectedDurationMinutes = expectedDurationMinutes;
    }

    public String getEvaluationCriteria() {
        return evaluationCriteria;
    }

    public void setEvaluationCriteria(String evaluationCriteria) {
        this.evaluationCriteria = evaluationCriteria;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getComplianceStatus() {
        return complianceStatus;
    }

    public void setComplianceStatus(String complianceStatus) {
        this.complianceStatus = complianceStatus;
    }
}
