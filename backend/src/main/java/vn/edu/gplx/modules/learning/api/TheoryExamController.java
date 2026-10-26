package vn.edu.gplx.modules.learning.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.gplx.modules.identity.application.UserPrincipal;
import vn.edu.gplx.modules.learning.api.dto.ExamResultResponse;
import vn.edu.gplx.modules.learning.api.dto.ExamSubmitRequest;
import vn.edu.gplx.modules.learning.api.dto.MockExamResultResponse;
import vn.edu.gplx.modules.learning.api.dto.MockExamSessionResponse;
import vn.edu.gplx.modules.learning.api.dto.MockExamSummaryResponse;
import vn.edu.gplx.modules.learning.api.dto.QuestionResponse;
import vn.edu.gplx.modules.learning.api.dto.StartMockExamRequest;
import vn.edu.gplx.modules.learning.api.dto.SubmitMockExamRequest;
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

    // -------------------------------------------------------------------------
    // CHUẨN HÓA BẢO MẬT: PHIÊN THI THỬ LÝ THUYẾT THEO HẠNG GPLX
    // -------------------------------------------------------------------------

    @Operation(summary = "Khởi tạo đề thi thử lý thuyết bảo mật theo hạng GPLX")
    @PostMapping("/mock-exam/start")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<MockExamSessionResponse>> startMockExam(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody StartMockExamRequest request) {
        MockExamSessionResponse response = examService.startMockExam(userPrincipal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Khởi tạo đề thi thành công", response));
    }

    @Operation(summary = "Lấy thông tin đề thi đang diễn ra theo mã phiên")
    @GetMapping("/mock-exam/{sessionCode}")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<MockExamSessionResponse>> getMockExamSession(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable String sessionCode) {
        MockExamSessionResponse response = examService.getMockExamSession(sessionCode, userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @Operation(summary = "Nộp bài thi thử trực tuyến và nhận kết quả tự động")
    @PostMapping("/mock-exam/{sessionCode}/submit")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<MockExamResultResponse>> submitMockExamSession(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable String sessionCode,
            @Valid @RequestBody SubmitMockExamRequest request) {
        MockExamResultResponse result = examService.submitMockExamSession(sessionCode, userPrincipal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Chấm điểm bài thi thành công", result));
    }

    @Operation(summary = "Xem lại chi tiết bài thi đã làm kèm lời giải và căn cứ pháp lý")
    @GetMapping("/mock-exam/{sessionCode}/result")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<MockExamResultResponse>> getExamResultDetail(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable String sessionCode) {
        MockExamResultResponse result = examService.getExamDetail(sessionCode, userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    @Operation(summary = "Lấy lịch sử các lần thi thử của học viên")
    @GetMapping("/mock-exam/history")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<List<MockExamSummaryResponse>>> getExamHistory(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<MockExamSummaryResponse> history = examService.getUserExamHistory(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(history));
    }

    // -------------------------------------------------------------------------
    // LEGACY COMPATIBILITY ENDPOINTS
    // -------------------------------------------------------------------------

    @Operation(summary = "Lấy ngân hàng câu hỏi lý thuyết ôn tập theo hạng GPLX (Legacy)")
    @GetMapping("/questions")
    public ResponseEntity<ApiResponse<List<QuestionResponse>>> getQuestions(
            @RequestParam(defaultValue = "B1") String category) {
        List<QuestionResponse> questions = examService.getQuestionsByCategory(category);
        return ResponseEntity.ok(ApiResponse.success(questions));
    }

    @Operation(summary = "Sinh đề thi thử lý thuyết ngẫu nhiên theo hạng GPLX (Legacy)")
    @GetMapping("/mock-exam")
    public ResponseEntity<ApiResponse<List<QuestionResponse>>> generateMockExam(
            @RequestParam(defaultValue = "B1") String category,
            @RequestParam(defaultValue = "25") int limit) {
        List<QuestionResponse> questions = examService.generateMockExam(category, limit);
        return ResponseEntity.ok(ApiResponse.success(questions));
    }

    @Operation(summary = "Nộp bài thi thử lý thuyết và chấm điểm tự động (Legacy)")
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
