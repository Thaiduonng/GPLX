package vn.edu.gplx.modules.learning.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.gplx.modules.identity.application.UserPrincipal;
import vn.edu.gplx.modules.learning.api.dto.ExamResultResponse;
import vn.edu.gplx.modules.learning.api.dto.ExamSubmitRequest;
import vn.edu.gplx.modules.learning.api.dto.QuestionResponse;
import vn.edu.gplx.modules.learning.application.TheoryExamService;
import vn.edu.gplx.shared.api.ApiResponse;

import java.util.List;

@Tag(name = "Theory Examination", description = "Ngân hàng 600 câu hỏi lý thuyết và Thi thử trực tuyến")
@RestController
@RequestMapping("/api/v1/theory")
public class TheoryExamController {

    private final TheoryExamService examService;

    public TheoryExamController(TheoryExamService examService) {
        this.examService = examService;
    }

    @Operation(summary = "Lấy ngân hàng câu hỏi lý thuyết ôn tập theo hạng GPLX")
    @GetMapping("/questions")
    public ResponseEntity<ApiResponse<List<QuestionResponse>>> getQuestions(
            @RequestParam(defaultValue = "B1") String category) {
        List<QuestionResponse> questions = examService.getQuestionsByCategory(category);
        return ResponseEntity.ok(ApiResponse.success(questions));
    }

    @Operation(summary = "Sinh đề thi thử lý thuyết ngẫu nhiên theo hạng GPLX")
    @GetMapping("/mock-exam")
    public ResponseEntity<ApiResponse<List<QuestionResponse>>> generateMockExam(
            @RequestParam(defaultValue = "B1") String category,
            @RequestParam(defaultValue = "25") int limit) {
        List<QuestionResponse> questions = examService.generateMockExam(category, limit);
        return ResponseEntity.ok(ApiResponse.success(questions));
    }

    @Operation(summary = "Nộp bài thi thử lý thuyết và chấm điểm tự động")
    @PostMapping("/mock-exam/submit")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<ExamResultResponse>> submitMockExam(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody ExamSubmitRequest request) {
        ExamResultResponse result = examService.submitMockExam(userPrincipal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Chấm điểm bài thi thành công", result));
    }
}
