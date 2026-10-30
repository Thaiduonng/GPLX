package vn.edu.gplx.modules.admission.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import vn.edu.gplx.modules.identity.domain.User;
import vn.edu.gplx.modules.learning.domain.Course;
import vn.edu.gplx.modules.training.domain.TrainingClass;
import vn.edu.gplx.shared.domain.BaseEntity;

import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "applications")
public class AdmissionApplication extends BaseEntity {

    @Column(name = "application_code", nullable = false, unique = true, length = 50)
    private String applicationCode;

    @Column(name = "tracking_token", length = 100)
    private String trackingToken;

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private LicenseCategory category;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id")
    private Course course;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(name = "national_id", nullable = false, length = 20)
    private String nationalId;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false, length = 10)
    private Gender gender = Gender.MALE;

    @Column(name = "phone", nullable = false, length = 20)
    private String phone;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "address", nullable = false, length = 255)
    private String address;

    @Column(name = "preferred_schedule", length = 50)
    private String preferredSchedule;

    @Column(name = "training_location", length = 150)
    private String trainingLocation;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    private ApplicationStatus status = ApplicationStatus.SUBMITTED;

    @Column(name = "rejection_reason", columnDefinition = "TEXT")
    private String rejectionReason;

    @Column(name = "reviewed_by")
    private Long reviewedBy;

    @Column(name = "reviewed_at")
    private Instant reviewedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_staff_id")
    private User assignedStaff;

    @Column(name = "consent_data_processing", nullable = false)
    private boolean consentDataProcessing = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enrolled_class_id")
    private TrainingClass enrolledClass;

    @Column(name = "enrolled_at")
    private Instant enrolledAt;

    @Version
    @Column(name = "version", nullable = false)
    private Long version = 0L;

    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AdmissionDocument> documents = new ArrayList<>();

    @OneToMany(mappedBy = "application", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("createdAt DESC")
    private List<ApplicationStatusHistory> statusHistories = new ArrayList<>();

    public AdmissionApplication() {
    }

    public AdmissionApplication(String applicationCode, Long userId, LicenseCategory category, String fullName,
                                String nationalId, LocalDate dateOfBirth, Gender gender, String phone, String email, String address) {
        this.applicationCode = applicationCode;
        this.userId = userId;
        this.category = category;
        this.fullName = fullName;
        this.nationalId = nationalId;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.status = ApplicationStatus.SUBMITTED;
        this.consentDataProcessing = true;
    }

    public void addDocument(AdmissionDocument document) {
        documents.add(document);
        document.setApplication(this);
    }

    public void addStatusHistory(ApplicationStatusHistory history) {
        statusHistories.add(history);
        history.setApplication(this);
    }

    public String getApplicationCode() {
        return applicationCode;
    }

    public void setApplicationCode(String applicationCode) {
        this.applicationCode = applicationCode;
    }

    public String getTrackingToken() {
        return trackingToken;
    }

    public void setTrackingToken(String trackingToken) {
        this.trackingToken = trackingToken;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LicenseCategory getCategory() {
        return category;
    }

    public void setCategory(LicenseCategory category) {
        this.category = category;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getNationalId() {
        return nationalId;
    }

    public void setNationalId(String nationalId) {
        this.nationalId = nationalId;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPreferredSchedule() {
        return preferredSchedule;
    }

    public void setPreferredSchedule(String preferredSchedule) {
        this.preferredSchedule = preferredSchedule;
    }

    public String getTrainingLocation() {
        return trainingLocation;
    }

    public void setTrainingLocation(String trainingLocation) {
        this.trainingLocation = trainingLocation;
    }

    public ApplicationStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicationStatus status) {
        this.status = status;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    public Long getReviewedBy() {
        return reviewedBy;
    }

    public void setReviewedBy(Long reviewedBy) {
        this.reviewedBy = reviewedBy;
    }

    public Instant getReviewedAt() {
        return reviewedAt;
    }

    public void setReviewedAt(Instant reviewedAt) {
        this.reviewedAt = reviewedAt;
    }

    public User getAssignedStaff() {
        return assignedStaff;
    }

    public void setAssignedStaff(User assignedStaff) {
        this.assignedStaff = assignedStaff;
    }

    public boolean isConsentDataProcessing() {
        return consentDataProcessing;
    }

    public void setConsentDataProcessing(boolean consentDataProcessing) {
        this.consentDataProcessing = consentDataProcessing;
    }

    public TrainingClass getEnrolledClass() {
        return enrolledClass;
    }

    public void setEnrolledClass(TrainingClass enrolledClass) {
        this.enrolledClass = enrolledClass;
    }

    public Instant getEnrolledAt() {
        return enrolledAt;
    }

    public void setEnrolledAt(Instant enrolledAt) {
        this.enrolledAt = enrolledAt;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public List<AdmissionDocument> getDocuments() {
        return documents;
    }

    public void setDocuments(List<AdmissionDocument> documents) {
        this.documents = documents;
    }

    public List<ApplicationStatusHistory> getStatusHistories() {
        return statusHistories;
    }

    public void setStatusHistories(List<ApplicationStatusHistory> statusHistories) {
        this.statusHistories = statusHistories;
    }
}
