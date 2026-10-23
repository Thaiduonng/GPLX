package vn.edu.gplx.modules.examination.application.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.admission.domain.AdmissionApplication;
import vn.edu.gplx.modules.admission.domain.ApplicationStatus;
import vn.edu.gplx.modules.admission.domain.LicenseCategory;
import vn.edu.gplx.modules.admission.infrastructure.AdmissionApplicationRepository;
import vn.edu.gplx.modules.admission.infrastructure.LicenseCategoryRepository;
import vn.edu.gplx.modules.examination.api.dto.EligibilityCheckResult;
import vn.edu.gplx.modules.examination.application.EligibilityService;
import vn.edu.gplx.modules.learning.domain.Course;
import vn.edu.gplx.modules.learning.domain.CourseLesson;
import vn.edu.gplx.modules.learning.domain.LearningProgress;
import vn.edu.gplx.modules.learning.infrastructure.CourseLessonRepository;
import vn.edu.gplx.modules.learning.infrastructure.CourseRepository;
import vn.edu.gplx.modules.learning.infrastructure.LearningProgressRepository;
import vn.edu.gplx.modules.training.api.dto.DatSummaryResponse;
import vn.edu.gplx.modules.training.application.DatPracticeService;
import vn.edu.gplx.shared.exception.ResourceNotFoundException;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class EligibilityServiceImpl implements EligibilityService {

    private static final Logger log = LoggerFactory.getLogger(EligibilityServiceImpl.class);

    private final AdmissionApplicationRepository applicationRepository;
    private final LicenseCategoryRepository categoryRepository;
    private final CourseRepository courseRepository;
    private final CourseLessonRepository lessonRepository;
    private final LearningProgressRepository progressRepository;
    private final DatPracticeService datPracticeService;

    public EligibilityServiceImpl(AdmissionApplicationRepository applicationRepository,
                                  LicenseCategoryRepository categoryRepository,
                                  CourseRepository courseRepository,
                                  CourseLessonRepository lessonRepository,
                                  LearningProgressRepository progressRepository,
                                  DatPracticeService datPracticeService) {
        this.applicationRepository = applicationRepository;
        this.categoryRepository = categoryRepository;
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
        this.progressRepository = progressRepository;
        this.datPracticeService = datPracticeService;
    }

    @Override
    public EligibilityCheckResult checkEligibility(Long userId, String categoryCode) {
        log.info("Checking examination eligibility for userId: {}, categoryCode: {}", userId, categoryCode);

        LicenseCategory category = categoryRepository.findByCode(categoryCode)
                .orElseThrow(() -> new ResourceNotFoundException("LicenseCategory", "code", categoryCode));

        List<String> missingRequirements = new ArrayList<>();

        // 1. Kiểm tra hồ sơ tuyển sinh đã được phê duyệt hợp lệ (APPROVED)
        List<AdmissionApplication> userApps = applicationRepository.findByUserId(userId);
        boolean isAdmissionApproved = userApps.stream()
                .anyMatch(app -> app.getCategory().getId().equals(category.getId())
                        && app.getStatus() == ApplicationStatus.APPROVED);

        if (!isAdmissionApproved) {
            missingRequirements.add("Hồ sơ đăng ký học/thi hạng " + categoryCode + " chưa được phê duyệt (Trạng thái APPROVED).");
        }

        // 2. Kiểm tra hoàn thành 100% thời lượng bài học lý thuyết trực tuyến
        List<Course> courses = courseRepository.findByCategoryIdAndIsActiveTrue(category.getId());
        boolean isTheoryCompleted = false;

        if (courses.isEmpty()) {
            // Nếu chưa có khóa học cấu hình cho hạng này, mặc định chưa thỏa mãn
            missingRequirements.add("Chưa có chương trình bài học lý thuyết khả dụng cho hạng " + categoryCode + ".");
        } else {
            Course course = courses.get(0);
            List<CourseLesson> lessons = lessonRepository.findByCourseIdOrderByOrderIndexAsc(course.getId());
            if (lessons.isEmpty()) {
                missingRequirements.add("Khóa học " + course.getTitle() + " chưa có bài giảng nào được cấu hình.");
            } else {
                List<LearningProgress> userProgress = progressRepository.findByUserIdAndLessonCourseId(userId, course.getId());
                long completedCount = userProgress.stream()
                        .filter(LearningProgress::isCompleted)
                        .count();

                if (completedCount >= lessons.size()) {
                    isTheoryCompleted = true;
                } else {
                    missingRequirements.add("Chưa hoàn thành đủ 100% bài học lý thuyết ("
                            + completedCount + "/" + lessons.size() + " bài đã học).");
                }
            }
        }

        // 3. Kiểm tra đào tạo thực hành DAT đường trường
        // Đối với xe máy A1, A2: không yêu cầu thiết bị giám sát hành trình DAT
        boolean isMotorbike = "A1".equalsIgnoreCase(categoryCode) || "A2".equalsIgnoreCase(categoryCode);
        DatSummaryResponse datSummary = datPracticeService.getStudentDatSummary(userId);

        boolean isDatCompleted;
        BigDecimal datDistanceKm = datSummary.totalDistanceKm();
        BigDecimal targetDatDistanceKm = datSummary.targetDistanceKm();
        int datDurationMinutes = datSummary.totalDurationMinutes();
        int targetDatDurationMinutes = datSummary.targetDurationMinutes();

        if (isMotorbike) {
            isDatCompleted = true;
            targetDatDistanceKm = BigDecimal.ZERO;
            targetDatDurationMinutes = 0;
        } else {
            isDatCompleted = datSummary.isCompleted()
                    || (datDistanceKm.compareTo(targetDatDistanceKm) >= 0
                    && datDurationMinutes >= targetDatDurationMinutes);

            if (!isDatCompleted) {
                missingRequirements.add("Chưa hoàn thành đủ điều kiện thực hành lái xe trên đường (DAT): đạt "
                        + datDistanceKm + "/" + targetDatDistanceKm + " km và "
                        + datDurationMinutes + "/" + targetDatDurationMinutes + " phút.");
            }
        }

        boolean isEligible = isAdmissionApproved && isTheoryCompleted && isDatCompleted;

        return new EligibilityCheckResult(
                userId,
                categoryCode,
                isEligible,
                isAdmissionApproved,
                isTheoryCompleted,
                isDatCompleted,
                datDistanceKm,
                targetDatDistanceKm,
                datDurationMinutes,
                targetDatDurationMinutes,
                missingRequirements
        );
    }
}
