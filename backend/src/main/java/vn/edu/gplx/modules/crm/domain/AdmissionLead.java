package vn.edu.gplx.modules.crm.domain;

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
import vn.edu.gplx.modules.admission.domain.AdmissionApplication;
import vn.edu.gplx.modules.admission.domain.LicenseCategory;
import vn.edu.gplx.modules.identity.domain.User;
import vn.edu.gplx.modules.learning.domain.Course;
import vn.edu.gplx.shared.domain.BaseEntity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "admission_leads")
public class AdmissionLead extends BaseEntity {

    @Column(name = "lead_code", nullable = false, unique = true, length = 50)
    private String leadCode;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Column(name = "phone", nullable = false, length = 20)
    private String phone;

    @Column(name = "email", length = 100)
    private String email;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private LicenseCategory category;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id")
    private Course course;

    @Enumerated(EnumType.STRING)
    @Column(name = "preferred_contact_channel", nullable = false, length = 30)
    private ContactChannel preferredContactChannel = ContactChannel.PHONE;

    @Column(name = "preferred_contact_time", length = 50)
    private String preferredContactTime;

    @Column(name = "training_location", length = 150)
    private String trainingLocation;

    @Column(name = "preferred_start_date")
    private LocalDate preferredStartDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "source", nullable = false, length = 50)
    private LeadSource source = LeadSource.HOMEPAGE;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    private LeadStatus status = LeadStatus.NEW;

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_to")
    private User assignedTo;

    @Column(name = "follow_up_at")
    private LocalDateTime followUpAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "converted_application_id")
    private AdmissionApplication convertedApplication;

    @Column(name = "consent_gdpr", nullable = false)
    private boolean consentGdpr = true;

    @OneToMany(mappedBy = "lead", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("createdAt DESC")
    private List<LeadInteraction> interactions = new ArrayList<>();

    public AdmissionLead() {
    }

    public AdmissionLead(String leadCode, String fullName, String phone, String email,
                         LicenseCategory category, Course course, ContactChannel preferredContactChannel,
                         String preferredContactTime, String trainingLocation, LeadSource source, String notes) {
        this.leadCode = leadCode;
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
        this.category = category;
        this.course = course;
        this.preferredContactChannel = preferredContactChannel != null ? preferredContactChannel : ContactChannel.PHONE;
        this.preferredContactTime = preferredContactTime;
        this.trainingLocation = trainingLocation;
        this.source = source != null ? source : LeadSource.HOMEPAGE;
        this.status = LeadStatus.NEW;
        this.notes = notes;
        this.consentGdpr = true;
    }

    public String getLeadCode() {
        return leadCode;
    }

    public void setLeadCode(String leadCode) {
        this.leadCode = leadCode;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
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

    public ContactChannel getPreferredContactChannel() {
        return preferredContactChannel;
    }

    public void setPreferredContactChannel(ContactChannel preferredContactChannel) {
        this.preferredContactChannel = preferredContactChannel;
    }

    public String getPreferredContactTime() {
        return preferredContactTime;
    }

    public void setPreferredContactTime(String preferredContactTime) {
        this.preferredContactTime = preferredContactTime;
    }

    public String getTrainingLocation() {
        return trainingLocation;
    }

    public void setTrainingLocation(String trainingLocation) {
        this.trainingLocation = trainingLocation;
    }

    public LocalDate getPreferredStartDate() {
        return preferredStartDate;
    }

    public void setPreferredStartDate(LocalDate preferredStartDate) {
        this.preferredStartDate = preferredStartDate;
    }

    public LeadSource getSource() {
        return source;
    }

    public void setSource(LeadSource source) {
        this.source = source;
    }

    public LeadStatus getStatus() {
        return status;
    }

    public void setStatus(LeadStatus status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public User getAssignedTo() {
        return assignedTo;
    }

    public void setAssignedTo(User assignedTo) {
        this.assignedTo = assignedTo;
    }

    public LocalDateTime getFollowUpAt() {
        return followUpAt;
    }

    public void setFollowUpAt(LocalDateTime followUpAt) {
        this.followUpAt = followUpAt;
    }

    public AdmissionApplication getConvertedApplication() {
        return convertedApplication;
    }

    public void setConvertedApplication(AdmissionApplication convertedApplication) {
        this.convertedApplication = convertedApplication;
    }

    public boolean isConsentGdpr() {
        return consentGdpr;
    }

    public void setConsentGdpr(boolean consentGdpr) {
        this.consentGdpr = consentGdpr;
    }

    public List<LeadInteraction> getInteractions() {
        return interactions;
    }

    public void setInteractions(List<LeadInteraction> interactions) {
        this.interactions = interactions;
    }

    public void addInteraction(LeadInteraction interaction) {
        interactions.add(interaction);
        interaction.setLead(this);
    }
}
