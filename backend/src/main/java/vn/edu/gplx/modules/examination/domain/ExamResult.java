package vn.edu.gplx.modules.examination.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import vn.edu.gplx.shared.domain.BaseEntity;

@Entity
@Table(name = "exam_results")
public class ExamResult extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "candidate_id", nullable = false, unique = true)
    private ExamCandidate candidate;

    @Column(name = "theory_score")
    private Integer theoryScore;

    @Column(name = "theory_passed")
    private Boolean theoryPassed;

    @Column(name = "simulation_score")
    private Integer simulationScore;

    @Column(name = "simulation_passed")
    private Boolean simulationPassed;

    @Column(name = "yard_score")
    private Integer yardScore;

    @Column(name = "yard_passed")
    private Boolean yardPassed;

    @Column(name = "road_score")
    private Integer roadScore;

    @Column(name = "road_passed")
    private Boolean roadPassed;

    @Enumerated(EnumType.STRING)
    @Column(name = "final_result", nullable = false, length = 30)
    private FinalExamResult finalResult = FinalExamResult.PENDING;

    @Column(name = "examiner_id")
    private Long examinerId;

    @Column(name = "examiner_note", columnDefinition = "TEXT")
    private String examinerNote;

    public ExamResult() {
    }

    public ExamResult(ExamCandidate candidate) {
        this.candidate = candidate;
        this.finalResult = FinalExamResult.PENDING;
    }

    public ExamCandidate getCandidate() {
        return candidate;
    }

    public void setCandidate(ExamCandidate candidate) {
        this.candidate = candidate;
    }

    public Integer getTheoryScore() {
        return theoryScore;
    }

    public void setTheoryScore(Integer theoryScore) {
        this.theoryScore = theoryScore;
    }

    public Boolean getTheoryPassed() {
        return theoryPassed;
    }

    public void setTheoryPassed(Boolean theoryPassed) {
        this.theoryPassed = theoryPassed;
    }

    public Integer getSimulationScore() {
        return simulationScore;
    }

    public void setSimulationScore(Integer simulationScore) {
        this.simulationScore = simulationScore;
    }

    public Boolean getSimulationPassed() {
        return simulationPassed;
    }

    public void setSimulationPassed(Boolean simulationPassed) {
        this.simulationPassed = simulationPassed;
    }

    public Integer getYardScore() {
        return yardScore;
    }

    public void setYardScore(Integer yardScore) {
        this.yardScore = yardScore;
    }

    public Boolean getYardPassed() {
        return yardPassed;
    }

    public void setYardPassed(Boolean yardPassed) {
        this.yardPassed = yardPassed;
    }

    public Integer getRoadScore() {
        return roadScore;
    }

    public void setRoadScore(Integer roadScore) {
        this.roadScore = roadScore;
    }

    public Boolean getRoadPassed() {
        return roadPassed;
    }

    public void setRoadPassed(Boolean roadPassed) {
        this.roadPassed = roadPassed;
    }

    public FinalExamResult getFinalResult() {
        return finalResult;
    }

    public void setFinalResult(FinalExamResult finalResult) {
        this.finalResult = finalResult;
    }

    public Long getExaminerId() {
        return examinerId;
    }

    public void setExaminerId(Long examinerId) {
        this.examinerId = examinerId;
    }

    public String getExaminerNote() {
        return examinerNote;
    }

    public void setExaminerNote(String examinerNote) {
        this.examinerNote = examinerNote;
    }
}
