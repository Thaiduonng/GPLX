package vn.edu.gplx.modules.rawvehicle.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import vn.edu.gplx.modules.admission.domain.LicenseCategory;
import vn.edu.gplx.modules.identity.domain.User;
import vn.edu.gplx.shared.domain.BaseEntity;

import java.time.LocalDate;

/**
 * Đăng ký tham gia đào tạo xe thô của học viên.
 */
@Entity
@Table(name = "raw_vehicle_enrollments")
public class RawVehicleEnrollment extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private LicenseCategory licenseCategory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id")
    private User instructor;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    private RawVehicleEnrollmentStatus status = RawVehicleEnrollmentStatus.ENROLLED;

    @Column(name = "enrolled_date", nullable = false)
    private LocalDate enrolledDate;

    @Column(name = "completed_date")
    private LocalDate completedDate;

    @Column(name = "total_completed_stages", nullable = false)
    private Integer totalCompletedStages = 0;

    @Column(name = "total_confirmed_minutes", nullable = false)
    private Integer totalConfirmedMinutes = 0;

    @Column(name = "total_sessions_count", nullable = false)
    private Integer totalSessionsCount = 0;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    public RawVehicleEnrollment() {
    }

    public RawVehicleEnrollment(User student, LicenseCategory licenseCategory, User instructor, LocalDate enrolledDate) {
        this.student = student;
        this.licenseCategory = licenseCategory;
        this.instructor = instructor;
        this.enrolledDate = enrolledDate;
        this.status = RawVehicleEnrollmentStatus.ENROLLED;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public LicenseCategory getLicenseCategory() {
        return licenseCategory;
    }

    public void setLicenseCategory(LicenseCategory licenseCategory) {
        this.licenseCategory = licenseCategory;
    }

    public User getInstructor() {
        return instructor;
    }

    public void setInstructor(User instructor) {
        this.instructor = instructor;
    }

    public RawVehicleEnrollmentStatus getStatus() {
        return status;
    }

    public void setStatus(RawVehicleEnrollmentStatus status) {
        this.status = status;
    }

    public LocalDate getEnrolledDate() {
        return enrolledDate;
    }

    public void setEnrolledDate(LocalDate enrolledDate) {
        this.enrolledDate = enrolledDate;
    }

    public LocalDate getCompletedDate() {
        return completedDate;
    }

    public void setCompletedDate(LocalDate completedDate) {
        this.completedDate = completedDate;
    }

    public Integer getTotalCompletedStages() {
        return totalCompletedStages;
    }

    public void setTotalCompletedStages(Integer totalCompletedStages) {
        this.totalCompletedStages = totalCompletedStages;
    }

    public Integer getTotalConfirmedMinutes() {
        return totalConfirmedMinutes;
    }

    public void setTotalConfirmedMinutes(Integer totalConfirmedMinutes) {
        this.totalConfirmedMinutes = totalConfirmedMinutes;
    }

    public Integer getTotalSessionsCount() {
        return totalSessionsCount;
    }

    public void setTotalSessionsCount(Integer totalSessionsCount) {
        this.totalSessionsCount = totalSessionsCount;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
