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
import vn.edu.gplx.modules.admission.domain.LicenseCategory;
import vn.edu.gplx.shared.domain.BaseEntity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "courses")
public class Course extends BaseEntity {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private LicenseCategory category;

    @Column(name = "code", nullable = false, unique = true, length = 50)
    private String code;

    @Column(name = "slug", unique = true, length = 120)
    private String slug;

    @Column(name = "title", nullable = false, length = 150)
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "total_hours", nullable = false)
    private int totalHours = 40;

    @Column(name = "tuition_fee", precision = 15, scale = 2)
    private BigDecimal tuitionFee;

    @Column(name = "expected_start_date")
    private LocalDate expectedStartDate;

    @Column(name = "training_location", length = 150)
    private String trainingLocation;

    @Column(name = "target_audience", columnDefinition = "TEXT")
    private String targetAudience;

    @Column(name = "curriculum_summary", columnDefinition = "TEXT")
    private String curriculumSummary;

    @Column(name = "documents_required", columnDefinition = "TEXT")
    private String documentsRequired;

    @Column(name = "banner_image_url", length = 500)
    private String bannerImageUrl;

    @Column(name = "featured", nullable = false)
    private boolean featured = false;

    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orderIndex ASC")
    private List<CourseLesson> lessons = new ArrayList<>();

    public Course() {
    }

    public Course(LicenseCategory category, String code, String title, String description, int totalHours) {
        this.category = category;
        this.code = code;
        this.title = title;
        this.description = description;
        this.totalHours = totalHours;
        this.isActive = true;
    }

    public LicenseCategory getCategory() {
        return category;
    }

    public void setCategory(LicenseCategory category) {
        this.category = category;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getTotalHours() {
        return totalHours;
    }

    public void setTotalHours(int totalHours) {
        this.totalHours = totalHours;
    }

    public BigDecimal getTuitionFee() {
        return tuitionFee;
    }

    public void setTuitionFee(BigDecimal tuitionFee) {
        this.tuitionFee = tuitionFee;
    }

    public LocalDate getExpectedStartDate() {
        return expectedStartDate;
    }

    public void setExpectedStartDate(LocalDate expectedStartDate) {
        this.expectedStartDate = expectedStartDate;
    }

    public String getTrainingLocation() {
        return trainingLocation;
    }

    public void setTrainingLocation(String trainingLocation) {
        this.trainingLocation = trainingLocation;
    }

    public String getTargetAudience() {
        return targetAudience;
    }

    public void setTargetAudience(String targetAudience) {
        this.targetAudience = targetAudience;
    }

    public String getCurriculumSummary() {
        return curriculumSummary;
    }

    public void setCurriculumSummary(String curriculumSummary) {
        this.curriculumSummary = curriculumSummary;
    }

    public String getDocumentsRequired() {
        return documentsRequired;
    }

    public void setDocumentsRequired(String documentsRequired) {
        this.documentsRequired = documentsRequired;
    }

    public String getBannerImageUrl() {
        return bannerImageUrl;
    }

    public void setBannerImageUrl(String bannerImageUrl) {
        this.bannerImageUrl = bannerImageUrl;
    }

    public boolean isFeatured() {
        return featured;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public List<CourseLesson> getLessons() {
        return lessons;
    }

    public void setLessons(List<CourseLesson> lessons) {
        this.lessons = lessons;
    }

    public void addLesson(CourseLesson lesson) {
        lessons.add(lesson);
        lesson.setCourse(this);
    }
}
