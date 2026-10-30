package vn.edu.gplx.modules.learning.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import vn.edu.gplx.shared.domain.BaseEntity;

@Entity
@Table(name = "exam_configurations")
public class ExamConfiguration extends BaseEntity {

    @Column(name = "category_code", nullable = false, length = 20)
    private String categoryCode;

    @Column(name = "total_questions", nullable = false)
    private int totalQuestions;

    @Column(name = "duration_minutes", nullable = false)
    private int durationMinutes;

    @Column(name = "passing_score", nullable = false)
    private int passingScore;

    @Column(name = "rules_version", nullable = false, length = 50)
    private String rulesVersion = "TT12-TT04-BGTVT";

    @Column(name = "is_active", nullable = false)
    private boolean active = true;

    @Column(name = "structure_json", columnDefinition = "TEXT")
    private String structureJson;

    @Column(name = "legal_source", nullable = false, length = 255)
    private String legalSource = "Thông tư 12/2017/TT-BGTVT, Thông tư 04/2022/TT-BGTVT";

    @Column(name = "valid_until")
    private java.time.LocalDate validUntil;

    public java.time.LocalDate getValidUntil() { return validUntil; }
    public void setValidUntil(java.time.LocalDate date) { this.validUntil = date; }

    public ExamConfiguration() {
    }

    public ExamConfiguration(String categoryCode, int totalQuestions, int durationMinutes, int passingScore, String rulesVersion, boolean active, String legalSource) {
        this.categoryCode = categoryCode;
        this.totalQuestions = totalQuestions;
        this.durationMinutes = durationMinutes;
        this.passingScore = passingScore;
        this.rulesVersion = rulesVersion;
        this.active = active;
        this.legalSource = legalSource;
    }

    public String getCategoryCode() {
        return categoryCode;
    }

    public void setCategoryCode(String categoryCode) {
        this.categoryCode = categoryCode;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public int getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(int durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public int getPassingScore() {
        return passingScore;
    }

    public void setPassingScore(int passingScore) {
        this.passingScore = passingScore;
    }

    public String getRulesVersion() {
        return rulesVersion;
    }

    public void setRulesVersion(String rulesVersion) {
        this.rulesVersion = rulesVersion;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public String getStructureJson() {
        return structureJson;
    }

    public void setStructureJson(String structureJson) {
        this.structureJson = structureJson;
    }

    public String getLegalSource() {
        return legalSource;
    }

    public void setLegalSource(String legalSource) {
        this.legalSource = legalSource;
    }
}
