package vn.edu.gplx.modules.learning.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import vn.edu.gplx.shared.domain.BaseEntity;

import java.time.Instant;

@Entity
@Table(name = "learning_progress")
public class LearningProgress extends BaseEntity {

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "lesson_id", nullable = false)
    private CourseLesson lesson;

    @Column(name = "completed", nullable = false)
    private boolean completed = false;

    @Column(name = "time_spent_seconds", nullable = false)
    private int timeSpentSeconds = 0;

    @Column(name = "completed_at")
    private Instant completedAt;

    public LearningProgress() {
    }

    public LearningProgress(Long userId, CourseLesson lesson, int timeSpentSeconds) {
        this.userId = userId;
        this.lesson = lesson;
        this.timeSpentSeconds = timeSpentSeconds;
        this.completed = false;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public CourseLesson getLesson() {
        return lesson;
    }

    public void setLesson(CourseLesson lesson) {
        this.lesson = lesson;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public int getTimeSpentSeconds() {
        return timeSpentSeconds;
    }

    public void setTimeSpentSeconds(int timeSpentSeconds) {
        this.timeSpentSeconds = timeSpentSeconds;
    }

    public Instant getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(Instant completedAt) {
        this.completedAt = completedAt;
    }
}
