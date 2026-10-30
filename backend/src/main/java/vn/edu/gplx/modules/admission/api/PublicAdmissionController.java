package vn.edu.gplx.modules.admission.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.gplx.modules.admission.api.dto.PublicApplicationResponse;
import vn.edu.gplx.modules.admission.api.dto.SubmitApplicationRequest;
import vn.edu.gplx.modules.admission.api.dto.SupplementDocumentRequest;
import vn.edu.gplx.modules.admission.api.dto.TrackApplicationRequest;
import vn.edu.gplx.modules.admission.application.AdmissionService;
import vn.edu.gplx.modules.crm.api.dto.AdmissionLeadResponse;
import vn.edu.gplx.modules.crm.api.dto.CreateLeadInquiryRequest;
import vn.edu.gplx.modules.crm.application.CrmLeadService;
import vn.edu.gplx.shared.api.ApiResponse;

@Tag(name = "Public Admissions", description = "Cổng thông tin tuyển sinh công khai, đăng ký học và tra cứu hồ sơ trực tuyến")
@RestController
@RequestMapping("/api/v1/public")
public class PublicAdmissionController {

    private final AdmissionService admissionService;
    private final CrmLeadService crmLeadService;

    public PublicAdmissionController(AdmissionService admissionService, CrmLeadService crmLeadService) {
        this.admissionService = admissionService;
        this.crmLeadService = crmLeadService;
    }

    @Operation(summary = "Gửi yêu cầu tư vấn khóa học trực tuyến (Khách hàng tiềm năng / Lead)")
    @PostMapping("/admission-inquiries")
    public ResponseEntity<ApiResponse<AdmissionLeadResponse>> submitInquiry(
            @Valid @RequestBody CreateLeadInquiryRequest request) {
        AdmissionLeadResponse response = crmLeadService.createInquiry(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Yêu cầu tư vấn của bạn đã được tiếp nhận. Đội ngũ tuyển sinh sẽ liên hệ sớm nhất!", response));
    }

    @Operation(summary = "Nộp đơn đăng ký học lái xe trực tuyến (Dành cho khách vãng lai & học viên)")
    @PostMapping("/applications")
    public ResponseEntity<ApiResponse<PublicApplicationResponse>> submitApplication(
            @Valid @RequestBody SubmitApplicationRequest request) {
        PublicApplicationResponse response = admissionService.submitPublicApplication(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Nộp đơn đăng ký học lái xe thành công. Vui lòng lưu lại mã hồ sơ để tra cứu tiến độ!", response));
    }

    @Operation(summary = "Tra cứu tiến độ xử lý hồ sơ an toàn (Bằng Mã hồ sơ + SĐT hoặc Tracking Token)")
    @PostMapping("/applications/track")
    public ResponseEntity<ApiResponse<PublicApplicationResponse>> trackApplication(
            @Valid @RequestBody TrackApplicationRequest request) {
        PublicApplicationResponse response = admissionService.trackPublicApplication(request);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @Operation(summary = "Nộp bổ sung giấy tờ khi hồ sơ có yêu cầu bổ sung (SUPPLEMENT_REQUIRED)")
    @PostMapping("/applications/{code}/supplement")
    public ResponseEntity<ApiResponse<PublicApplicationResponse>> supplementDocuments(
            @PathVariable String code,
            @Valid @RequestBody SupplementDocumentRequest request) {
        PublicApplicationResponse response = admissionService.supplementDocuments(code, request);
        return ResponseEntity.ok(ApiResponse.success("Nộp bổ sung tài liệu hồ sơ thành công", response));
    }
}
