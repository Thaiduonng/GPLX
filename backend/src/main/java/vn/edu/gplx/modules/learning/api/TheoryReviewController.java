package vn.edu.gplx.modules.learning.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
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
import vn.edu.gplx.modules.learning.api.dto.QuestionDetailResponse;
import vn.edu.gplx.modules.learning.api.dto.ReviewAnswerRequest;
import vn.edu.gplx.modules.learning.api.dto.ReviewAnswerResultResponse;
import vn.edu.gplx.modules.learning.api.dto.ReviewDashboardOverviewResponse;
import vn.edu.gplx.modules.learning.api.dto.ReviewSessionDetailResponse;
import vn.edu.gplx.modules.learning.api.dto.ReviewSessionResultResponse;
import vn.edu.gplx.modules.learning.api.dto.ReviewSessionStartRequest;
import vn.edu.gplx.modules.learning.api.dto.ReviewSessionSummaryDto;
import vn.edu.gplx.modules.learning.api.dto.ReviewTopicStatDto;
import vn.edu.gplx.modules.learning.api.dto.ReviewWrongQuestionSummaryDto;
import vn.edu.gplx.modules.learning.application.TheoryReviewService;
import vn.edu.gplx.shared.api.ApiResponse;

import java.util.List;

@Tag(name = "Theory Review", description = "Phân hệ Ôn tập thông minh, củng cố câu sai, câu điểm liệt và lặp lại ngắt quãng")
@RestController
@RequestMapping("/api/v1/review")
@PreAuthorize("isAuthenticated()")
public class TheoryReviewController {

    private final TheoryReviewService reviewService;

    public TheoryReviewController(TheoryReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @Operation(summary = "Lấy tổng quan bảng điều khiển ôn tập cá nhân")
    @GetMapping("/overview")
    public ResponseEntity<ApiResponse<ReviewDashboardOverviewResponse>> getDashboardOverview(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestParam(required = false, defaultValue = "ALL") String categoryCode) {
        ReviewDashboardOverviewResponse overview = reviewService.getDashboardOverview(userPrincipal.getId(), categoryCode);
        return ResponseEntity.ok(ApiResponse.success(overview));
    }

    @Operation(summary = "Lấy danh sách các câu hỏi từng trả lời sai cần củng cố")
    @GetMapping("/wrong-questions")
    public ResponseEntity<ApiResponse<List<ReviewWrongQuestionSummaryDto>>> getWrongQuestions(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestParam(required = false) String categoryCode,
            @RequestParam(required = false) Long topicId) {
        List<ReviewWrongQuestionSummaryDto> wrongQuestions = reviewService.getWrongQuestions(userPrincipal.getId(), categoryCode, topicId);
        return ResponseEntity.ok(ApiResponse.success(wrongQuestions));
    }

    @Operation(summary = "Lấy danh sách câu điểm liệt đã xác minh và trạng thái ôn tập")
    @GetMapping("/critical-questions")
    public ResponseEntity<ApiResponse<List<QuestionDetailResponse>>> getCriticalQuestions(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestParam(required = false, defaultValue = "ALL") String categoryCode,
            @RequestParam(required = false, defaultValue = "ALL") String statusFilter) {
        List<QuestionDetailResponse> criticalQuestions = reviewService.getCriticalQuestions(userPrincipal.getId(), categoryCode, statusFilter);
        return ResponseEntity.ok(ApiResponse.success(criticalQuestions));
    }

    @Operation(summary = "Lấy danh sách câu hỏi đã đánh dấu để ôn tập")
    @GetMapping("/bookmarked-questions")
    public ResponseEntity<ApiResponse<List<QuestionDetailResponse>>> getBookmarkedQuestions(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestParam(required = false) Long topicId) {
        List<QuestionDetailResponse> bookmarkedQuestions = reviewService.getBookmarkedQuestions(userPrincipal.getId(), topicId);
        return ResponseEntity.ok(ApiResponse.success(bookmarkedQuestions));
    }

    @Operation(summary = "Lấy tình trạng ôn tập và mức độ ưu tiên theo 7 chủ đề lý thuyết")
    @GetMapping("/topics")
    public ResponseEntity<ApiResponse<List<ReviewTopicStatDto>>> getTopicStats(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestParam(required = false, defaultValue = "ALL") String categoryCode) {
        List<ReviewTopicStatDto> topicStats = reviewService.getTopicStats(userPrincipal.getId(), categoryCode);
        return ResponseEntity.ok(ApiResponse.success(topicStats));
    }

    @Operation(summary = "Bắt đầu phiên ôn tập mới theo chế độ lựa chọn")
    @PostMapping("/sessions")
    public ResponseEntity<ApiResponse<ReviewSessionDetailResponse>> startReviewSession(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody ReviewSessionStartRequest request) {
        ReviewSessionDetailResponse session = reviewService.startReviewSession(userPrincipal.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Khởi tạo phiên ôn tập thành công", session));
    }

    @Operation(summary = "Lấy thông tin và danh sách câu hỏi của một phiên ôn tập")
    @GetMapping("/sessions/{sessionCode}")
    public ResponseEntity<ApiResponse<ReviewSessionDetailResponse>> getReviewSession(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable String sessionCode) {
        ReviewSessionDetailResponse session = reviewService.getReviewSession(userPrincipal.getId(), sessionCode);
        return ResponseEntity.ok(ApiResponse.success(session));
    }

    @Operation(summary = "Gửi đáp án câu hỏi trong phiên ôn tập và nhận kết quả tức thì")
    @PostMapping("/sessions/{sessionCode}/answers")
    public ResponseEntity<ApiResponse<ReviewAnswerResultResponse>> submitAnswer(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable String sessionCode,
            @Valid @RequestBody ReviewAnswerRequest request) {
        ReviewAnswerResultResponse result = reviewService.submitAnswer(userPrincipal.getId(), sessionCode, request);
        return ResponseEntity.ok(ApiResponse.success("Ghi nhận câu trả lời ôn tập thành công", result));
    }

    @Operation(summary = "Kết thúc phiên ôn tập và xem tổng kết đánh giá")
    @PostMapping("/sessions/{sessionCode}/complete")
    public ResponseEntity<ApiResponse<ReviewSessionResultResponse>> completeReviewSession(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable String sessionCode) {
        ReviewSessionResultResponse result = reviewService.completeReviewSession(userPrincipal.getId(), sessionCode);
        return ResponseEntity.ok(ApiResponse.success("Hoàn thành phiên ôn tập thành công", result));
    }

    @Operation(summary = "Lấy lịch sử các phiên ôn tập đã thực hiện")
    @GetMapping("/history")
    public ResponseEntity<ApiResponse<List<ReviewSessionSummaryDto>>> getReviewHistory(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<ReviewSessionSummaryDto> history = reviewService.getReviewHistory(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(history));
    }
}
