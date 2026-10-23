package vn.edu.gplx.modules.learning.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import vn.edu.gplx.modules.admission.domain.LicenseCategory;
import vn.edu.gplx.modules.learning.api.dto.LearningProgressResponse;
import vn.edu.gplx.modules.learning.api.dto.UpdateProgressRequest;
import vn.edu.gplx.modules.learning.application.impl.CourseServiceImpl;
import vn.edu.gplx.modules.learning.domain.Course;
import vn.edu.gplx.modules.learning.domain.CourseLesson;
import vn.edu.gplx.modules.learning.domain.LearningProgress;
import vn.edu.gplx.modules.learning.infrastructure.CourseLessonRepository;
import vn.edu.gplx.modules.learning.infrastructure.CourseRepository;
import vn.edu.gplx.modules.learning.infrastructure.LearningProgressRepository;
import vn.edu.gplx.shared.exception.BusinessRuleViolationException;

import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CourseServiceTest {

    @Mock
    private CourseRepository courseRepository;

    @Mock
    private CourseLessonRepository lessonRepository;

    @Mock
    private LearningProgressRepository progressRepository;

    @InjectMocks
    private CourseServiceImpl courseService;

    private CourseLesson sampleLesson;

    @BeforeEach
    void setUp() {
        LicenseCategory category = new LicenseCategory("B1", "Hạng B1", "Mô tả", 18, BigDecimal.valueOf(14000000));
        Course course = new Course(category, "COURSE-B1", "Khóa B1", "Mô tả", 60);
        sampleLesson = new CourseLesson(course, "Bài 1: Luật GTĐB", "Nội dung", "video.mp4", 45, 1);
        ReflectionTestUtils.setField(sampleLesson, "id", 10L);
    }

    @Test
    @DisplayName("Quy tắc LRN-001: Cập nhật thời gian học và hoàn thành bài giảng hợp lệ")
    void should_updateLessonProgress_successfully_when_validTime() {
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(sampleLesson));
        when(progressRepository.findByUserIdAndLessonId(1L, 10L)).thenReturn(Optional.empty());
        when(progressRepository.save(any(LearningProgress.class))).thenAnswer(i -> i.getArgument(0));

        UpdateProgressRequest request = new UpdateProgressRequest(120, true);
        LearningProgressResponse response = courseService.updateLessonProgress(10L, 1L, request);

        assertThat(response).isNotNull();
        assertThat(response.completed()).isTrue();
        assertThat(response.timeSpentSeconds()).isEqualTo(120);

        verify(progressRepository).save(any(LearningProgress.class));
    }

    @Test
    @DisplayName("Vi phạm Rule LRN-002: Đánh dấu hoàn thành khi chưa học đủ thời gian tối thiểu 30s")
    void should_throwException_when_markingCompletedWithoutMinimumTime() {
        when(lessonRepository.findById(10L)).thenReturn(Optional.of(sampleLesson));
        when(progressRepository.findByUserIdAndLessonId(1L, 10L)).thenReturn(Optional.empty());

        // Gửi 10 giây nhưng yêu cầu markCompleted = true
        UpdateProgressRequest request = new UpdateProgressRequest(10, true);

        assertThatThrownBy(() -> courseService.updateLessonProgress(10L, 1L, request))
                .isInstanceOf(BusinessRuleViolationException.class)
                .hasMessageContaining("LRN-002")
                .hasMessageContaining("Chưa đủ điều kiện hoàn thành bài học");
    }
}
