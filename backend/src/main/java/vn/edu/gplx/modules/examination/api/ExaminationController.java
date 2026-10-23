package vn.edu.gplx.modules.examination.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
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
import vn.edu.gplx.modules.examination.api.dto.CandidateResponse;
import vn.edu.gplx.modules.examination.api.dto.CreateExamSessionRequest;
import vn.edu.gplx.modules.examination.api.dto.EligibilityCheckResult;
import vn.edu.gplx.modules.examination.api.dto.ExamResultDetailResponse;
import vn.edu.gplx.modules.examination.api.dto.ExamSessionResponse;
import vn.edu.gplx.modules.examination.api.dto.RecordExamScoreRequest;
import vn.edu.gplx.modules.examination.api.dto.RegisterCandidateRequest;
import vn.edu.gplx.modules.examination.application.EligibilityService;
import vn.edu.gplx.modules.examination.application.ExaminationService;
import vn.edu.gplx.modules.examination.domain.ExamSessionStatus;
import vn.edu.gplx.modules.identity.application.UserPrincipal;
import vn.edu.gplx.shared.api.ApiResponse;

import java.util.List;

@Tag(name = "Examination Management", description = "Tổ chức thi, xét duyệt điều kiện dự thi và quản lý kết quả sát hạch")
@RestController
@RequestMapping("/api/v1/examination")
public class ExaminationController {

    private final ExaminationService examinationService;
    private final EligibilityService eligibilityService;

    public ExaminationController(ExaminationService examinationService,
                                 EligibilityService eligibilityService) {
        this.examinationService = examinationService;
        this.eligibilityService = eligibilityService;
    }

    @Operation(summary = "Lấy danh sách các kỳ thi sát hạch/tốt nghiệp")
    @GetMapping("/sessions")
    public ResponseEntity<ApiResponse<List<ExamSessionResponse>>> getExamSessions(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) ExamSessionStatus status) {
        List<ExamSessionResponse> sessions = examinationService.getExamSessions(categoryId, status);
        return ResponseEntity.ok(ApiResponse.success(sessions));
    }

    @Operation(summary = "Xem chi tiết một kỳ thi theo ID")
    @GetMapping("/sessions/{id}")
    public ResponseEntity<ApiResponse<ExamSessionResponse>> getExamSessionById(@PathVariable Long id) {
        ExamSessionResponse session = examinationService.getExamSessionById(id);
        return ResponseEntity.ok(ApiResponse.success(session));
    }

    @Operation(summary = "Tạo kỳ thi sát hạch mới (Role: ADMIN, MANAGER)")
    @SecurityRequirement(name = "BearerAuth")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PostMapping("/sessions")
    public ResponseEntity<ApiResponse<ExamSessionResponse>> createExamSession(
            @Valid @RequestBody CreateExamSessionRequest request) {
        ExamSessionResponse response = examinationService.createExamSession(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Tạo kỳ thi thành công", response));
    }

    @Operation(summary = "Tự động đánh giá điều kiện dự thi của học viên (EXM-001)")
    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/eligibility/check")
    public ResponseEntity<ApiResponse<EligibilityCheckResult>> checkEligibility(
            @RequestParam String categoryCode,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        EligibilityCheckResult result = eligibilityService.checkEligibility(userPrincipal.getId(), categoryCode);
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    @Operation(summary = "Đăng ký thí sinh vào kỳ thi (Tự động gán SBD & thẩm định điều kiện)")
    @SecurityRequirement(name = "BearerAuth")
    @PostMapping("/sessions/{id}/register")
    public ResponseEntity<ApiResponse<CandidateResponse>> registerCandidate(
            @PathVariable Long id,
            @RequestBody(required = false) RegisterCandidateRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        Long studentId = (request != null && request.studentId() != null)
                ? request.studentId()
                : userPrincipal.getId();

        CandidateResponse response = examinationService.registerCandidate(
                id, new RegisterCandidateRequest(studentId)
        );
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Đăng ký thí sinh vào kỳ thi thành công", response));
    }

    @Operation(summary = "Lấy danh sách thí sinh và số báo danh trong kỳ thi")
    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/sessions/{id}/candidates")
    public ResponseEntity<ApiResponse<List<CandidateResponse>>> getCandidatesBySession(
            @PathVariable Long id) {
        List<CandidateResponse> candidates = examinationService.getCandidatesBySession(id);
        return ResponseEntity.ok(ApiResponse.success(candidates));
    }

    @Operation(summary = "Sát hạch viên nhập điểm 4 môn sát hạch (Role: EXAMINER, ADMIN)")
    @SecurityRequirement(name = "BearerAuth")
    @PreAuthorize("hasAnyRole('EXAMINER', 'ADMIN')")
    @PostMapping("/candidates/{candidateId}/score")
    public ResponseEntity<ApiResponse<ExamResultDetailResponse>> recordScore(
            @PathVariable Long candidateId,
            @Valid @RequestBody RecordExamScoreRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        ExamResultDetailResponse response = examinationService.recordScore(
                candidateId, userPrincipal.getId(), request
        );
        return ResponseEntity.ok(ApiResponse.success("Ghi nhận điểm sát hạch thành công", response));
    }

    @Operation(summary = "Tra cứu chi tiết kết quả sát hạch của một thí sinh")
    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/candidates/{candidateId}/result")
    public ResponseEntity<ApiResponse<ExamResultDetailResponse>> getCandidateResult(
            @PathVariable Long candidateId) {
        ExamResultDetailResponse response = examinationService.getCandidateResult(candidateId);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @Operation(summary = "Học viên tra cứu lịch sử và kết quả các kỳ thi của chính mình")
    @SecurityRequirement(name = "BearerAuth")
    @GetMapping("/my-results")
    public ResponseEntity<ApiResponse<List<ExamResultDetailResponse>>> getMyResults(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<ExamResultDetailResponse> results = examinationService.getMyResults(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(results));
    }
}
