package vn.edu.gplx.modules.finance.api;

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
import vn.edu.gplx.modules.finance.api.dto.CreateInvoiceRequest;
import vn.edu.gplx.modules.finance.api.dto.InvoiceResponse;
import vn.edu.gplx.modules.finance.api.dto.PaymentReceiptResponse;
import vn.edu.gplx.modules.finance.api.dto.RecordPaymentRequest;
import vn.edu.gplx.modules.finance.application.FinanceService;
import vn.edu.gplx.modules.finance.domain.InvoiceStatus;
import vn.edu.gplx.modules.identity.application.UserPrincipal;
import vn.edu.gplx.shared.api.ApiResponse;

import java.util.List;

@Tag(name = "Finance & Tuition", description = "Quản lý hóa đơn học phí, biên lai nộp tiền và thanh toán (FIN-001, FIN-002)")
@RestController
@RequestMapping("/api/v1/finance")
@SecurityRequirement(name = "BearerAuth")
public class FinanceController {

    private final FinanceService financeService;

    public FinanceController(FinanceService financeService) {
        this.financeService = financeService;
    }

    @Operation(summary = "Tạo hóa đơn học phí mới cho học viên (Role: ADMIN, STAFF, MANAGER)")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'MANAGER')")
    @PostMapping("/invoices")
    public ResponseEntity<ApiResponse<InvoiceResponse>> createInvoice(
            @Valid @RequestBody CreateInvoiceRequest request) {
        InvoiceResponse response = financeService.createInvoice(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Tạo hóa đơn học phí thành công", response));
    }

    @Operation(summary = "Tra cứu danh sách toàn bộ hóa đơn học phí (Role: ADMIN, STAFF, MANAGER)")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF', 'MANAGER')")
    @GetMapping("/invoices")
    public ResponseEntity<ApiResponse<List<InvoiceResponse>>> getAllInvoices(
            @RequestParam(required = false) InvoiceStatus status) {
        List<InvoiceResponse> invoices = financeService.getAllInvoices(status);
        return ResponseEntity.ok(ApiResponse.success(invoices));
    }

    @Operation(summary = "Học viên tra cứu hóa đơn học phí của chính mình")
    @GetMapping("/invoices/my")
    public ResponseEntity<ApiResponse<List<InvoiceResponse>>> getMyInvoices(
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        List<InvoiceResponse> invoices = financeService.getMyInvoices(userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(invoices));
    }

    @Operation(summary = "Xem chi tiết một hóa đơn học phí")
    @GetMapping("/invoices/{id}")
    public ResponseEntity<ApiResponse<InvoiceResponse>> getInvoiceById(@PathVariable Long id) {
        InvoiceResponse invoice = financeService.getInvoiceById(id);
        return ResponseEntity.ok(ApiResponse.success(invoice));
    }

    @Operation(summary = "Ghi nhận thanh toán / biên lai nộp tiền học phí (FIN-001 chống trùng)")
    @PostMapping("/invoices/{id}/pay")
    public ResponseEntity<ApiResponse<PaymentReceiptResponse>> payInvoice(
            @PathVariable Long id,
            @Valid @RequestBody RecordPaymentRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        PaymentReceiptResponse receipt = financeService.recordPayment(id, userPrincipal.getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Ghi nhận biên lai thanh toán học phí thành công", receipt));
    }

    @Operation(summary = "Xem lịch sử biên lai thanh toán của một hóa đơn")
    @GetMapping("/invoices/{id}/receipts")
    public ResponseEntity<ApiResponse<List<PaymentReceiptResponse>>> getReceiptsByInvoice(
            @PathVariable Long id) {
        List<PaymentReceiptResponse> receipts = financeService.getReceiptsByInvoice(id);
        return ResponseEntity.ok(ApiResponse.success(receipts));
    }
}
