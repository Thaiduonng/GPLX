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

/**
 * Phiên ôn tập củng cố kiến thức (Review Session)
 */
@Entity
@Table(name = "review_sessions")
public class ReviewSession extends BaseEntity {

    @Column(name = "session_code", nullable = false, unique = true, length = 64)
    private String sessionCode;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "review_mode", nullable = false, length = 50)
    private String reviewMode; // SMART, WRONG_ANSWERS, CRITICAL_PARALYSIS, BOOKMARKED, TOPIC, CATEGORY

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

    @Column(name = "incorrect_answers", nullable = false)
    private int incorrectAnswers = 0;

    @Column(name = "status", nullable = false, length = 20)
    private String status = "IN_PROGRESS"; // IN_PROGRESS, COMPLETED

    @Column(name = "completed_at")
    private Instant completedAt;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReviewSessionAnswer> answers = new ArrayList<>();

    public ReviewSession() {
    }

    public ReviewSession(String sessionCode, Long userId, String reviewMode, String categoryCode, TheoryTopic topic, int totalQuestions) {
        this.sessionCode = sessionCode;
        this.userId = userId;
        this.reviewMode = reviewMode;
        this.categoryCode = categoryCode;
        this.topic = topic;
        this.totalQuestions = totalQuestions;
        this.answeredQuestions = 0;
        this.correctAnswers = 0;
        this.incorrectAnswers = 0;
        this.status = "IN_PROGRESS";
    }

    public void addAnswer(ReviewSessionAnswer answer) {
        this.answers.add(answer);
        answer.setSession(this);
        this.answeredQuestions++;
        if (answer.isCorrect()) {
            this.correctAnswers++;
        } else {
            this.incorrectAnswers++;
        }

        if (this.answeredQuestions >= this.totalQuestions) {
            this.status = "COMPLETED";
            this.completedAt = Instant.now();
        }
    }

    public void completeSession() {
        this.status = "COMPLETED";
        this.completedAt = Instant.now();
    }

    // Getters and Setters

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

    public String getReviewMode() {
        return reviewMode;
    }

    public void setReviewMode(String reviewMode) {
        this.reviewMode = reviewMode;
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

    public int getIncorrectAnswers() {
        return incorrectAnswers;
    }

    public void setIncorrectAnswers(int incorrectAnswers) {
        this.incorrectAnswers = incorrectAnswers;
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

    public List<ReviewSessionAnswer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<ReviewSessionAnswer> answers) {
        this.answers = answers;
    }
}
