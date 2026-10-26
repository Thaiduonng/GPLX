package vn.edu.gplx.modules.learning.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import vn.edu.gplx.shared.domain.BaseEntity;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "practice_sessions")
public class PracticeSession extends BaseEntity {

    @Column(name = "session_code", nullable = false, unique = true, length = 64)
    private String sessionCode;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "practice_mode", nullable = false, length = 50)
    private String practiceMode; // TOPIC, CATEGORY, UNANSWERED, INCORRECT, PARALYSIS, BOOKMARKED, RANDOM, ALL

    @Column(name = "category_code", length = 20)
    private String categoryCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id")
    private TheoryTopic topic;

    @Column(name = "total_questions", nullable = false)
    private int totalQuestions = 0;

    @Column(name = "answered_questions", nullable = false)
    private int answeredQuestions = 0;

    @Column(name = "correct_answers", nullable = false)
    private int correctAnswers = 0;

    @Column(name = "status", nullable = false, length = 20)
    private String status = "IN_PROGRESS"; // IN_PROGRESS, COMPLETED

    @Column(name = "completed_at")
    private Instant completedAt;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PracticeAnswer> answers = new ArrayList<>();

    public PracticeSession() {
    }

    public PracticeSession(String sessionCode, Long userId, String practiceMode, String categoryCode, TheoryTopic topic, int totalQuestions) {
        this.sessionCode = sessionCode;
        this.userId = userId;
        this.practiceMode = practiceMode;
        this.categoryCode = categoryCode;
        this.topic = topic;
        this.totalQuestions = totalQuestions;
        this.status = "IN_PROGRESS";
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

    public String getPracticeMode() {
        return practiceMode;
    }

    public void setPracticeMode(String practiceMode) {
        this.practiceMode = practiceMode;
    }

    public String getCategoryCode() {
        return categoryCode;
    }

    public void setCategoryCode(String categoryCode) {
        this.categoryCode = categoryCode;
    }

    public TheoryTopic getTopic() {
        return topic;
    }

    public void setTopic(TheoryTopic topic) {
        this.topic = topic;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public int getAnsweredQuestions() {
        return answeredQuestions;
    }

    public void setAnsweredQuestions(int answeredQuestions) {
        this.answeredQuestions = answeredQuestions;
    }

    public int getCorrectAnswers() {
        return correctAnswers;
    }

    public void setCorrectAnswers(int correctAnswers) {
        this.correctAnswers = correctAnswers;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(Instant completedAt) {
        this.completedAt = completedAt;
    }

    public List<PracticeAnswer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<PracticeAnswer> answers) {
        this.answers = answers;
    }
}
