package vn.edu.gplx.modules.learning.application.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.admission.api.dto.LicenseCategoryResponse;
import vn.edu.gplx.modules.learning.api.dto.CourseResponse;
import vn.edu.gplx.modules.learning.api.dto.LearningProgressResponse;
import vn.edu.gplx.modules.learning.api.dto.LessonResponse;
import vn.edu.gplx.modules.learning.api.dto.UpdateProgressRequest;
import vn.edu.gplx.modules.learning.application.CourseService;
import vn.edu.gplx.modules.learning.domain.Course;
import vn.edu.gplx.modules.learning.domain.CourseLesson;
import vn.edu.gplx.modules.learning.domain.LearningProgress;
import vn.edu.gplx.modules.learning.infrastructure.CourseLessonRepository;
import vn.edu.gplx.modules.learning.infrastructure.CourseRepository;
import vn.edu.gplx.modules.learning.infrastructure.LearningProgressRepository;
import vn.edu.gplx.shared.exception.BusinessRuleViolationException;
import vn.edu.gplx.shared.exception.ResourceNotFoundException;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
public class CourseServiceImpl implements CourseService {

    private static final Logger log = LoggerFactory.getLogger(CourseServiceImpl.class);

    private final CourseRepository courseRepository;
    private final CourseLessonRepository lessonRepository;
    private final LearningProgressRepository progressRepository;

    public CourseServiceImpl(CourseRepository courseRepository,
                             CourseLessonRepository lessonRepository,
                             LearningProgressRepository progressRepository) {
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
        this.progressRepository = progressRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CourseResponse> getAllActiveCourses() {
        return courseRepository.findByIsActiveTrue().stream()
                .map(this::toCourseResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<CourseResponse> getFeaturedCourses() {
        return courseRepository.findByFeaturedTrueAndIsActiveTrue().stream()
                .map(this::toCourseResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public CourseResponse getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", id));
        return toCourseResponse(course);
    }

    @Override
    @Transactional(readOnly = true)
    public CourseResponse getCourseBySlug(String slug) {
        Course course = courseRepository.findBySlug(slug)
                .or(() -> courseRepository.findByCode(slug))
                .orElseThrow(() -> new ResourceNotFoundException("Course", "slug", slug));
        return toCourseResponse(course);
    }

    @Override
    @Transactional(readOnly = true)
    public List<LessonResponse> getLessonsByCourse(Long courseId, Long userId) {
        List<CourseLesson> lessons = lessonRepository.findByCourseIdOrderByOrderIndexAsc(courseId);

        Map<Long, LearningProgress> progressMap = Map.of();
        if (userId != null) {
            List<LearningProgress> userProgress = progressRepository.findByUserIdAndLessonCourseId(userId, courseId);
            progressMap = userProgress.stream()
                    .collect(Collectors.toMap(p -> p.getLesson().getId(), p -> p));
        }

        Map<Long, LearningProgress> finalProgressMap = progressMap;
        return lessons.stream()
                .map(lesson -> {
                    LearningProgress progress = finalProgressMap.get(lesson.getId());
                    boolean completed = progress != null && progress.isCompleted();
                    int timeSpent = progress != null ? progress.getTimeSpentSeconds() : 0;

                    return new LessonResponse(
                            lesson.getId(),
                            lesson.getCourse().getId(),
                            lesson.getTitle(),
                            lesson.getContent(),
                            lesson.getVideoUrl(),
                            lesson.getDurationMinutes(),
                            lesson.getOrderIndex(),
                            completed,
                            timeSpent
                    );
                })
                .toList();
    }

    @Override
    public LearningProgressResponse updateLessonProgress(Long lessonId, Long userId, UpdateProgressRequest request) {
        CourseLesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("CourseLesson", "id", lessonId));

        // Quy tắc LRN-001: Lưu tiến độ học tập gắn liền với user_id và lesson_id
        LearningProgress progress = progressRepository.findByUserIdAndLessonId(userId, lessonId)
                .orElseGet(() -> new LearningProgress(userId, lesson, 0));

        int newTotalTime = progress.getTimeSpentSeconds() + request.timeSpentSeconds();
        progress.setTimeSpentSeconds(newTotalTime);

        // Quy tắc LRN-002: Không cho phép đánh dấu hoàn thành nếu chưa đáp ứng điều kiện
        // Điều kiện: Thời gian học tích lũy phải tối thiểu ít nhất 30 giây
        if (request.markCompleted()) {
            if (newTotalTime < 30) {
                throw new BusinessRuleViolationException(
                        "LRN-002",
                        "Chưa đủ điều kiện hoàn thành bài học. Yêu cầu xem nội dung tối thiểu ít nhất 30 giây trước khi đánh dấu hoàn thành."
                );
            }
            progress.setCompleted(true);
            progress.setCompletedAt(Instant.now());
        }

        LearningProgress saved = progressRepository.save(progress);
        log.info("Updated progress for user {} on lesson {}: completed={}, totalTime={}s",
                userId, lessonId, saved.isCompleted(), saved.getTimeSpentSeconds());

        return new LearningProgressResponse(
                lesson.getId(),
                lesson.getTitle(),
                saved.isCompleted(),
                saved.getTimeSpentSeconds(),
                saved.getCompletedAt()
        );
    }

    private CourseResponse toCourseResponse(Course course) {
        LicenseCategoryResponse catResponse = null;
        if (course.getCategory() != null) {
            catResponse = new LicenseCategoryResponse(
                    course.getCategory().getId(),
                    course.getCategory().getCode(),
                    course.getCategory().getName(),
                    course.getCategory().getDescription(),
                    course.getCategory().getMinAge(),
                    course.getCategory().getTuitionFee(),
                    course.getCategory().getIsActive()
            );
        }

        return new CourseResponse(
                course.getId(),
                course.getCode(),
                course.getSlug(),
                course.getTitle(),
                course.getDescription(),
                course.getTotalHours(),
                course.getTuitionFee(),
                course.getExpectedStartDate(),
                course.getTrainingLocation(),
                course.getTargetAudience(),
                course.getCurriculumSummary(),
                course.getDocumentsRequired(),
                course.getBannerImageUrl(),
                course.isFeatured(),
                course.isActive(),
                catResponse,
                course.getLessons() != null ? course.getLessons().size() : 0,
                course.getCreatedAt()
        );
    }
}
