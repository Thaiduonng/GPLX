package vn.edu.gplx.modules.learning.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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
import vn.edu.gplx.modules.learning.api.dto.PracticeAnswerRequest;
import vn.edu.gplx.modules.learning.api.dto.PracticeAnswerResultResponse;
import vn.edu.gplx.modules.learning.api.dto.PracticeSessionStartRequest;
import vn.edu.gplx.modules.learning.api.dto.PracticeSessionSummaryResponse;
import vn.edu.gplx.modules.learning.api.dto.QuestionDetailResponse;
import vn.edu.gplx.modules.learning.api.dto.TheoryStatisticsResponse;
import vn.edu.gplx.modules.learning.api.dto.TopicResponse;
import vn.edu.gplx.modules.learning.application.TheoryBookmarkService;
import vn.edu.gplx.modules.learning.application.TheoryPracticeService;
import vn.edu.gplx.modules.learning.application.TheoryStatisticsService;
import vn.edu.gplx.modules.learning.application.TheoryTopicService;
import vn.edu.gplx.shared.api.ApiResponse;

import java.util.List;

@Tag(name = "Theory Learning & Practice", description = "Học theo chủ đề, rèn luyện 8 chế độ, bookmark và thống kê cá nhân")
@RestController
@RequestMapping("/api/v1/theory")
public class TheoryLearningController {

    private final TheoryTopicService topicService;
    private final TheoryBookmarkService bookmarkService;
    private final TheoryPracticeService practiceService;
    private final TheoryStatisticsService statisticsService;

    public TheoryLearningController(TheoryTopicService topicService,
                                    TheoryBookmarkService bookmarkService,
                                    TheoryPracticeService practiceService,
                                    TheoryStatisticsService statisticsService) {
        this.topicService = topicService;
        this.bookmarkService = bookmarkService;
        this.practiceService = practiceService;
        this.statisticsService = statisticsService;
    }

    // --- TOPICS ---
    @Operation(summary = "Lấy danh sách chương của ngân hàng lý thuyết hiện hành và tiến độ người học")
    @GetMapping("/topics")
    public ResponseEntity<ApiResponse<List<TopicResponse>>> getTopics(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Long userId = userPrincipal != null ? userPrincipal.getId() : null;
        List<TopicResponse> topics = topicService.getAllTopics(userId);
        return ResponseEntity.ok(ApiResponse.success(topics));
    }

    @Operation(summary = "Lấy danh sách câu hỏi học tập thuộc chủ đề (có tìm kiếm, lọc và phân trang)")
    @GetMapping("/topics/{topicId}/questions")
    public ResponseEntity<ApiResponse<Page<QuestionDetailResponse>>> getQuestionsByTopic(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long topicId,
            @RequestParam(required = false) String categoryCode,
            @RequestParam(required = false) Boolean isParalysis,
            @RequestParam(required = false) String keyword,
            @PageableDefault(size = 20) Pageable pageable) {
        Long userId = userPrincipal != null ? userPrincipal.getId() : null;
        Page<QuestionDetailResponse> questions = topicService.getQuestionsByTopic(topicId, userId, categoryCode, isParalysis, keyword, pageable);
        return ResponseEntity.ok(ApiResponse.success(questions));
    }

    // --- BOOKMARKS ---
    @Operation(summary = "Đánh dấu hoặc bỏ đánh dấu câu hỏi yêu thích")
    @PostMapping("/bookmarks/{questionId}")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Boolean>> toggleBookmark(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable Long questionId) {
        boolean bookmarked = bookmarkService.toggleBookmark(userPrincipal.getId(), questionId);
        String msg = bookmarked ? "Đã lưu vào danh sách đánh dấu" : "Đã bỏ đánh dấu câu hỏi";
        return ResponseEntity.ok(ApiResponse.success(msg, bookmarked));
    }

    @Operation(summary = "Lấy danh sách câu hỏi đã đánh dấu của người học")
    @GetMapping("/bookmarks")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<List<QuestionDetailResponse>>> getBookmarks(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<QuestionDetailResponse> bookmarks = bookmarkService.getBookmarkedQuestions(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(bookmarks));
    }

    // --- PRACTICE ---
    @Operation(summary = "Bắt đầu phiên rèn luyện câu hỏi (8 chế độ)")
    @PostMapping("/practice/start")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<PracticeSessionSummaryResponse>> startPractice(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody PracticeSessionStartRequest request) {
        PracticeSessionSummaryResponse session = practiceService.startPracticeSession(userPrincipal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success("Bắt đầu phiên rèn luyện", session));
    }

    @Operation(summary = "Lấy danh sách câu hỏi của phiên rèn luyện")
    @GetMapping("/practice/{sessionCode}/questions")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<List<QuestionDetailResponse>>> getPracticeQuestions(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable String sessionCode) {
        List<QuestionDetailResponse> questions = practiceService.getSessionQuestions(sessionCode, userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(questions));
    }

    @Operation(summary = "Trả lời câu hỏi trong phiên rèn luyện (nhận phản hồi ngay)")
    @PostMapping("/practice/{sessionCode}/answer")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<PracticeAnswerResultResponse>> submitPracticeAnswer(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable String sessionCode,
            @Valid @RequestBody PracticeAnswerRequest request) {
        PracticeAnswerResultResponse result = practiceService.submitAnswer(sessionCode, userPrincipal.getId(), request);
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    @Operation(summary = "Hoàn tất phiên rèn luyện")
    @PostMapping("/practice/{sessionCode}/complete")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<PracticeSessionSummaryResponse>> completePractice(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PathVariable String sessionCode) {
        PracticeSessionSummaryResponse summary = practiceService.completeSession(sessionCode, userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success("Hoàn tất phiên rèn luyện", summary));
    }

    @Operation(summary = "Lấy lịch sử các phiên rèn luyện của người học (có phân trang)")
    @GetMapping("/practice/history")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Page<PracticeSessionSummaryResponse>>> getPracticeHistory(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @PageableDefault(size = 10) Pageable pageable) {
        Page<PracticeSessionSummaryResponse> history = practiceService.getUserPracticeHistory(userPrincipal.getId(), pageable);
        return ResponseEntity.ok(ApiResponse.success(history));
    }

    // --- STATISTICS ---
    @Operation(summary = "Báo cáo thống kê tiến độ học tập và tỷ lệ đúng/sai cá nhân")
    @GetMapping("/statistics")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<TheoryStatisticsResponse>> getStatistics(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        TheoryStatisticsResponse stats = statisticsService.getUserStatistics(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    @Operation(summary = "Lấy danh sách các câu hỏi đã làm sai để ôn tập củng cố")
    @GetMapping("/statistics/incorrect-questions")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<List<QuestionDetailResponse>>> getIncorrectQuestions(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<QuestionDetailResponse> questions = statisticsService.getIncorrectQuestions(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(questions));
    }
}
