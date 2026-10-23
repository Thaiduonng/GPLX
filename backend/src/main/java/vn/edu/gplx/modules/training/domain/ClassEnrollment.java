package vn.edu.gplx.modules.training.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.Instant;

@Entity
@Table(name = "class_enrollments")
public class ClassEnrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "class_id", nullable = false)
    private TrainingClass trainingClass;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "status", nullable = false, length = 30)
    private String status = "ENROLLED";

    @Column(name = "enrolled_at", nullable = false)
    private Instant enrolledAt = Instant.now();

    public ClassEnrollment() {
    }

    public ClassEnrollment(TrainingClass trainingClass, Long userId) {
        this.trainingClass = trainingClass;
        this.userId = userId;
        this.status = "ENROLLED";
        this.enrolledAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TrainingClass getTrainingClass() {
        return trainingClass;
    }

    public void setTrainingClass(TrainingClass trainingClass) {
        this.trainingClass = trainingClass;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getEnrolledAt() {
        return enrolledAt;
    }

    public void setEnrolledAt(Instant enrolledAt) {
        this.enrolledAt = enrolledAt;
    }
}
