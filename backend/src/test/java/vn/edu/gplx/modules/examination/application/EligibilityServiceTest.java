package vn.edu.gplx.modules.examination.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import vn.edu.gplx.modules.admission.domain.AdmissionApplication;
import vn.edu.gplx.modules.admission.domain.ApplicationStatus;
import vn.edu.gplx.modules.admission.domain.Gender;
import vn.edu.gplx.modules.admission.domain.LicenseCategory;
import vn.edu.gplx.modules.admission.infrastructure.AdmissionApplicationRepository;
import vn.edu.gplx.modules.admission.infrastructure.LicenseCategoryRepository;
import vn.edu.gplx.modules.examination.api.dto.EligibilityCheckResult;
import vn.edu.gplx.modules.examination.application.impl.EligibilityServiceImpl;
import vn.edu.gplx.modules.identity.domain.User;
import vn.edu.gplx.modules.learning.domain.Course;
import vn.edu.gplx.modules.learning.domain.CourseLesson;
import vn.edu.gplx.modules.learning.domain.LearningProgress;
import vn.edu.gplx.modules.learning.infrastructure.CourseLessonRepository;
import vn.edu.gplx.modules.learning.infrastructure.CourseRepository;
import vn.edu.gplx.modules.learning.infrastructure.LearningProgressRepository;
import vn.edu.gplx.modules.training.api.dto.DatSummaryResponse;
import vn.edu.gplx.modules.training.application.DatPracticeService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class EligibilityServiceTest {

    @Mock
    private AdmissionApplicationRepository applicationRepository;

    @Mock
    private LicenseCategoryRepository categoryRepository;

    @Mock
    private CourseRepository courseRepository;

    @Mock
    private CourseLessonRepository lessonRepository;

    @Mock
    private LearningProgressRepository progressRepository;

    @Mock
    private DatPracticeService datPracticeService;

    @InjectMocks
    private EligibilityServiceImpl eligibilityService;

    private LicenseCategory categoryB1;
    private Course courseB1;

    @BeforeEach
    void setUp() {
        categoryB1 = new LicenseCategory("B1", "Hạng B1 số tự động", "Mô tả", 18, BigDecimal.valueOf(14000000));
        ReflectionTestUtils.setField(categoryB1, "id", 10L);

        courseB1 = new Course(categoryB1, "CRS-B1", "Khóa đào tạo B1", "Mô tả", 60);
        ReflectionTestUtils.setField(courseB1, "id", 20L);
    }

    @Test
    @DisplayName("EXM-001: Đánh giá đủ điều kiện dự thi khi thỏa mãn cả 3 tiêu chuẩn (Hồ sơ APPROVED, Lý thuyết 100%, DAT đủ km/giờ)")
    void should_returnEligible_when_studentMeetsAllRequirements() {
        // Given
        when(categoryRepository.findByCode("B1")).thenReturn(Optional.of(categoryB1));

        AdmissionApplication approvedApp = new AdmissionApplication(
                "APP-001", 100L, categoryB1, "Nguyễn Văn A", "001200001234",
                LocalDate.of(2000, 1, 1), Gender.MALE, "0901234567", "student1@example.com", "Hà Nội"
        );
        approvedApp.setStatus(ApplicationStatus.APPROVED);
        when(applicationRepository.findByUserId(100L)).thenReturn(List.of(approvedApp));

        when(courseRepository.findByCategoryIdAndIsActiveTrue(10L)).thenReturn(List.of(courseB1));

        CourseLesson lesson1 = new CourseLesson(courseB1, "Bài 1", "Nội dung 1", "vid1.mp4", 60, 1);
        CourseLesson lesson2 = new CourseLesson(courseB1, "Bài 2", "Nội dung 2", "vid2.mp4", 60, 2);
        when(lessonRepository.findByCourseIdOrderByOrderIndexAsc(20L)).thenReturn(List.of(lesson1, lesson2));

        LearningProgress prog1 = new LearningProgress(100L, lesson1, 60);
        prog1.setCompleted(true);
        LearningProgress prog2 = new LearningProgress(100L, lesson2, 60);
        prog2.setCompleted(true);
        when(progressRepository.findByUserIdAndLessonCourseId(100L, 20L)).thenReturn(List.of(prog1, prog2));

        DatSummaryResponse datSummary = new DatSummaryResponse(
                100L, BigDecimal.valueOf(820.0), 1250, 10, BigDecimal.valueOf(810.0), 1200, true, Collections.emptyList()
        );
        when(datPracticeService.getStudentDatSummary(100L)).thenReturn(datSummary);

        // When
        EligibilityCheckResult result = eligibilityService.checkEligibility(100L, "B1");

        // Then
        assertThat(result.isEligible()).isTrue();
        assertThat(result.isAdmissionApproved()).isTrue();
        assertThat(result.isTheoryCompleted()).isTrue();
        assertThat(result.isDatCompleted()).isTrue();
        assertThat(result.missingRequirements()).isEmpty();
    }

    @Test
    @DisplayName("EXM-001: Không đủ điều kiện dự thi khi hồ sơ chưa được duyệt (APPROVED)")
    void should_returnNotEligible_when_admissionNotApproved() {
        // Given
        when(categoryRepository.findByCode("B1")).thenReturn(Optional.of(categoryB1));

        AdmissionApplication pendingApp = new AdmissionApplication(
                "APP-001", 100L, categoryB1, "Nguyễn Văn A", "001200001234",
                LocalDate.of(2000, 1, 1), Gender.MALE, "0901234567", "student1@example.com", "Hà Nội"
        );
        pendingApp.setStatus(ApplicationStatus.SUBMITTED);
        when(applicationRepository.findByUserId(100L)).thenReturn(List.of(pendingApp));

        when(courseRepository.findByCategoryIdAndIsActiveTrue(10L)).thenReturn(List.of(courseB1));
        when(lessonRepository.findByCourseIdOrderByOrderIndexAsc(20L)).thenReturn(Collections.emptyList());

        DatSummaryResponse datSummary = new DatSummaryResponse(
                100L, BigDecimal.valueOf(100.0), 200, 2, BigDecimal.valueOf(810.0), 1200, false, Collections.emptyList()
        );
        when(datPracticeService.getStudentDatSummary(100L)).thenReturn(datSummary);

        // When
        EligibilityCheckResult result = eligibilityService.checkEligibility(100L, "B1");

        // Then
        assertThat(result.isEligible()).isFalse();
        assertThat(result.isAdmissionApproved()).isFalse();
        assertThat(result.missingRequirements()).anyMatch(msg -> msg.contains("chưa được phê duyệt"));
    }

    @Test
    @DisplayName("EXM-001: Không đủ điều kiện dự thi khi chưa hoàn thành đủ số km hoặc thời gian DAT thực hành")
    void should_returnNotEligible_when_datIncomplete() {
        // Given
        when(categoryRepository.findByCode("B1")).thenReturn(Optional.of(categoryB1));

        AdmissionApplication approvedApp = new AdmissionApplication(
                "APP-001", 100L, categoryB1, "Nguyễn Văn A", "001200001234",
                LocalDate.of(2000, 1, 1), Gender.MALE, "0901234567", "student1@example.com", "Hà Nội"
        );
        approvedApp.setStatus(ApplicationStatus.APPROVED);
        when(applicationRepository.findByUserId(100L)).thenReturn(List.of(approvedApp));

        when(courseRepository.findByCategoryIdAndIsActiveTrue(10L)).thenReturn(List.of(courseB1));

        CourseLesson lesson1 = new CourseLesson(courseB1, "Bài 1", "Nội dung 1", "vid1.mp4", 60, 1);
        when(lessonRepository.findByCourseIdOrderByOrderIndexAsc(20L)).thenReturn(List.of(lesson1));

        LearningProgress prog1 = new LearningProgress(100L, lesson1, 60);
        prog1.setCompleted(true);
        when(progressRepository.findByUserIdAndLessonCourseId(100L, 20L)).thenReturn(List.of(prog1));

        // Thiếu km (mới được 600km/810km)
        DatSummaryResponse datSummary = new DatSummaryResponse(
                100L, BigDecimal.valueOf(600.0), 1000, 8, BigDecimal.valueOf(810.0), 1200, false, Collections.emptyList()
        );
        when(datPracticeService.getStudentDatSummary(100L)).thenReturn(datSummary);

        // When
        EligibilityCheckResult result = eligibilityService.checkEligibility(100L, "B1");

        // Then
        assertThat(result.isEligible()).isFalse();
        assertThat(result.isDatCompleted()).isFalse();
        assertThat(result.missingRequirements()).anyMatch(msg -> msg.contains("DAT"));
    }
}
