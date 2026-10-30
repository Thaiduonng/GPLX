package vn.edu.gplx.modules.learning.application;

import vn.edu.gplx.modules.learning.api.dto.CourseResponse;
import vn.edu.gplx.modules.learning.api.dto.LearningProgressResponse;
import vn.edu.gplx.modules.learning.api.dto.LessonResponse;
import vn.edu.gplx.modules.learning.api.dto.UpdateProgressRequest;

import java.util.List;

public interface CourseService {

    List<CourseResponse> getAllActiveCourses();

    List<CourseResponse> getFeaturedCourses();

    CourseResponse getCourseById(Long id);

    CourseResponse getCourseBySlug(String slug);

    List<LessonResponse> getLessonsByCourse(Long courseId, Long userId);

    LearningProgressResponse updateLessonProgress(Long lessonId, Long userId, UpdateProgressRequest request);
}
