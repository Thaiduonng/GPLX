package vn.edu.gplx.modules.learning.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.gplx.modules.identity.application.UserPrincipal;
import vn.edu.gplx.modules.learning.api.dto.CourseResponse;
import vn.edu.gplx.modules.learning.api.dto.LessonResponse;
import vn.edu.gplx.modules.learning.application.CourseService;
import vn.edu.gplx.shared.api.ApiResponse;

import java.util.List;

@Tag(name = "Courses & E-Learning", description = "Khóa học đào tạo và Học trực tuyến")
@RestController
@RequestMapping("/api/v1/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @Operation(summary = "Lấy danh sách các khóa học đào tạo đang mở")
    @GetMapping
    public ResponseEntity<ApiResponse<List<CourseResponse>>> getAllCourses() {
        List<CourseResponse> courses = courseService.getAllActiveCourses();
        return ResponseEntity.ok(ApiResponse.success(courses));
    }

    @Operation(summary = "Lấy danh sách các khóa học nổi bật trên trang chủ")
    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<List<CourseResponse>>> getFeaturedCourses() {
        List<CourseResponse> courses = courseService.getFeaturedCourses();
        return ResponseEntity.ok(ApiResponse.success(courses));
    }

    @Operation(summary = "Xem thông tin chi tiết một khóa học theo ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CourseResponse>> getCourseById(@PathVariable Long id) {
        CourseResponse course = courseService.getCourseById(id);
        return ResponseEntity.ok(ApiResponse.success(course));
    }

    @Operation(summary = "Xem thông tin chi tiết một khóa học theo Slug đường dẫn hoặc Mã")
    @GetMapping("/slug/{slug}")
    public ResponseEntity<ApiResponse<CourseResponse>> getCourseBySlug(@PathVariable String slug) {
        CourseResponse course = courseService.getCourseBySlug(slug);
        return ResponseEntity.ok(ApiResponse.success(course));
    }

    @Operation(summary = "Lấy danh sách bài giảng của khóa học kèm tiến độ học tập")
    @GetMapping("/{id}/lessons")
    public ResponseEntity<ApiResponse<List<LessonResponse>>> getLessons(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Long userId = userPrincipal != null ? userPrincipal.getId() : null;
        List<LessonResponse> lessons = courseService.getLessonsByCourse(id, userId);
        return ResponseEntity.ok(ApiResponse.success(lessons));
    }
}
