package vn.edu.gplx.modules.learning.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import vn.edu.gplx.shared.domain.BaseEntity;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "mock_exam_sessions")
public class MockExamSession extends BaseEntity {

    @Column(name = "session_code", nullable = false, unique = true, length = 64)
    private String sessionCode;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "category_code", nullable = false, length = 20)
    private String categoryCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exam_config_id")
    private ExamConfiguration examConfig;

    @Column(name = "total_questions", nullable = false)
    private int totalQuestions;

    @Column(name = "duration_minutes", nullable = false)
    private int durationMinutes;

    @Column(name = "passing_score", nullable = false)
    private int passingScore;

    @Column(name = "score", nullable = false)
    private int score = 0;

    @Column(name = "is_passed", nullable = false)
    private boolean passed = false;

    @Column(name = "has_failed_paralysis", nullable = false)
    private boolean failedParalysis = false;

    @Column(name = "status", nullable = false, length = 20)
    private String status = "IN_PROGRESS"; // IN_PROGRESS, COMPLETED, EXPIRED

    @Column(name = "started_at", nullable = false)
    private Instant startedAt = Instant.now();

    @Column(name = "completed_at")
    private Instant completedAt;

    @OneToMany(mappedBy = "mockExam", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orderIndex ASC")
    private List<MockExamSessionAnswer> answers = new ArrayList<>();

    public MockExamSession() {
    }

    public MockExamSession(String sessionCode, Long userId, String categoryCode, ExamConfiguration examConfig, int totalQuestions, int durationMinutes, int passingScore) {
        this.sessionCode = sessionCode;
        this.userId = userId;
        this.categoryCode = categoryCode;
        this.examConfig = examConfig;
        this.totalQuestions = totalQuestions;
        this.durationMinutes = durationMinutes;
        this.passingScore = passingScore;
        this.status = "IN_PROGRESS";
        this.startedAt = Instant.now();
    }

    public String getSessionCode() {
        return sessionCode;
    }

    public void setSessionCode(String sessionCode) {
        this.sessionCode = sessionCode;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCategoryCode() {
        return categoryCode;
    }

    public void setCategoryCode(String categoryCode) {
        this.categoryCode = categoryCode;
    }

    public ExamConfiguration getExamConfig() {
        return examConfig;
    }

    public void setExamConfig(ExamConfiguration examConfig) {
        this.examConfig = examConfig;
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

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public boolean isPassed() {
        return passed;
    }

    public void setPassed(boolean passed) {
        this.passed = passed;
    }

    public boolean isFailedParalysis() {
        return failedParalysis;
    }

    public void setFailedParalysis(boolean failedParalysis) {
        this.failedParalysis = failedParalysis;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getStartedAt() {
        return startedAt;
    }

    public void setStartedAt(Instant startedAt) {
        this.startedAt = startedAt;
    }

    public Instant getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(Instant completedAt) {
        this.completedAt = completedAt;
    }

    public List<MockExamSessionAnswer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<MockExamSessionAnswer> answers) {
        this.answers = answers;
    }
}
