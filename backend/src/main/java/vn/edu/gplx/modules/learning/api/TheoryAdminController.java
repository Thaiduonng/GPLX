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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.gplx.modules.learning.api.dto.ExamConfigurationDto;
import vn.edu.gplx.modules.learning.api.dto.QuestionDetailResponse;
import vn.edu.gplx.modules.learning.api.dto.QuestionUpsertRequest;
import vn.edu.gplx.modules.learning.application.ExamConfigService;
import vn.edu.gplx.modules.learning.application.QuestionAdminService;
import vn.edu.gplx.shared.api.ApiResponse;

import java.util.List;

@Tag(name = "Theory Administration", description = "Quản lý ngân hàng câu hỏi lý thuyết và cấu hình đề thi theo hạng GPLX")
@RestController
@RequestMapping("/api/v1/admin/theory")
@PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
@SecurityRequirement(name = "bearerAuth")
public class TheoryAdminController {

    private final ExamConfigService configService;
    private final QuestionAdminService questionAdminService;

    public TheoryAdminController(ExamConfigService configService, QuestionAdminService questionAdminService) {
        this.configService = configService;
        this.questionAdminService = questionAdminService;
    }

    // --- CẤU HÌNH ĐỀ THI ---
    @Operation(summary = "Lấy danh sách cấu hình đề thi các hạng GPLX")
    @GetMapping("/exam-configs")
    public ResponseEntity<ApiResponse<List<ExamConfigurationDto>>> getExamConfigurations() {
        List<ExamConfigurationDto> configs = configService.getActiveConfigurations();
        return ResponseEntity.ok(ApiResponse.success(configs));
    }

    @Operation(summary = "Lấy cấu hình đề thi theo hạng GPLX")
    @GetMapping("/exam-configs/{categoryCode}")
    public ResponseEntity<ApiResponse<ExamConfigurationDto>> getConfigByCategory(@PathVariable String categoryCode) {
        ExamConfigurationDto config = configService.getConfigByCategory(categoryCode);
        return ResponseEntity.ok(ApiResponse.success(config));
    }

    @Operation(summary = "Cập nhật cấu hình đề thi theo hạng GPLX")
    @PutMapping("/exam-configs/{id}")
    public ResponseEntity<ApiResponse<ExamConfigurationDto>> updateExamConfig(
            @PathVariable Long id,
            @Valid @RequestBody ExamConfigurationDto dto) {
        ExamConfigurationDto updated = configService.updateConfig(id, dto);
        return ResponseEntity.ok(ApiResponse.success("Cập nhật cấu hình đề thi thành công", updated));
    }

    // --- QUẢN LÝ CÂU HỎI ---
    @Operation(summary = "Tìm kiếm và phân trang ngân hàng câu hỏi")
    @GetMapping("/questions")
    public ResponseEntity<ApiResponse<Page<QuestionDetailResponse>>> searchQuestions(
            @RequestParam(required = false) Long topicId,
            @RequestParam(required = false) String categoryCode,
            @RequestParam(required = false) Boolean isParalysis,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<QuestionDetailResponse> page = questionAdminService.searchQuestions(topicId, categoryCode, isParalysis, pageable);
        return ResponseEntity.ok(ApiResponse.success(page));
    }

    @Operation(summary = "Xem chi tiết một câu hỏi")
    @GetMapping("/questions/{id}")
    public ResponseEntity<ApiResponse<QuestionDetailResponse>> getQuestionById(@PathVariable Long id) {
        QuestionDetailResponse q = questionAdminService.getQuestionById(id);
        return ResponseEntity.ok(ApiResponse.success(q));
    }

    @Operation(summary = "Thêm mới câu hỏi vào ngân hàng")
    @PostMapping("/questions")
    public ResponseEntity<ApiResponse<QuestionDetailResponse>> createQuestion(
            @Valid @RequestBody QuestionUpsertRequest request) {
        QuestionDetailResponse created = questionAdminService.createQuestion(request);
        return ResponseEntity.ok(ApiResponse.success("Tạo câu hỏi thành công", created));
    }

    @Operation(summary = "Cập nhật câu hỏi trong ngân hàng")
    @PutMapping("/questions/{id}")
    public ResponseEntity<ApiResponse<QuestionDetailResponse>> updateQuestion(
            @PathVariable Long id,
            @Valid @RequestBody QuestionUpsertRequest request) {
        QuestionDetailResponse updated = questionAdminService.updateQuestion(id, request);
        return ResponseEntity.ok(ApiResponse.success("Cập nhật câu hỏi thành công", updated));
    }

    @Operation(summary = "Xóa câu hỏi khỏi ngân hàng")
    @DeleteMapping("/questions/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteQuestion(@PathVariable Long id) {
        questionAdminService.deleteQuestion(id);
        return ResponseEntity.ok(ApiResponse.success("Xóa câu hỏi thành công", null));
    }
}
