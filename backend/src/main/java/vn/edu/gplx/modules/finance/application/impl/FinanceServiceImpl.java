package vn.edu.gplx.modules.finance.application.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.admission.domain.LicenseCategory;
import vn.edu.gplx.modules.admission.infrastructure.LicenseCategoryRepository;
import vn.edu.gplx.modules.finance.api.dto.CreateInvoiceRequest;
import vn.edu.gplx.modules.finance.api.dto.InvoiceResponse;
import vn.edu.gplx.modules.finance.api.dto.PaymentReceiptResponse;
import vn.edu.gplx.modules.finance.api.dto.RecordPaymentRequest;
import vn.edu.gplx.modules.finance.application.FinanceService;
import vn.edu.gplx.modules.finance.domain.FeeInvoice;
import vn.edu.gplx.modules.finance.domain.InvoiceStatus;
import vn.edu.gplx.modules.finance.domain.PaymentReceipt;
import vn.edu.gplx.modules.finance.infrastructure.FeeInvoiceRepository;
import vn.edu.gplx.modules.finance.infrastructure.PaymentReceiptRepository;
import vn.edu.gplx.modules.identity.domain.User;
import vn.edu.gplx.modules.identity.infrastructure.UserRepository;
import vn.edu.gplx.shared.exception.BusinessRuleViolationException;
import vn.edu.gplx.shared.exception.ResourceNotFoundException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Transactional
public class FinanceServiceImpl implements FinanceService {

    private static final Logger log = LoggerFactory.getLogger(FinanceServiceImpl.class);

    private final FeeInvoiceRepository invoiceRepository;
    private final PaymentReceiptRepository receiptRepository;
    private final UserRepository userRepository;
    private final LicenseCategoryRepository categoryRepository;

    public FinanceServiceImpl(FeeInvoiceRepository invoiceRepository,
                              PaymentReceiptRepository receiptRepository,
                              UserRepository userRepository,
                              LicenseCategoryRepository categoryRepository) {
        this.invoiceRepository = invoiceRepository;
        this.receiptRepository = receiptRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public InvoiceResponse createInvoice(CreateInvoiceRequest request) {
        log.info("Creating invoice for studentId: {}, categoryId: {}", request.studentId(), request.categoryId());

        User student = userRepository.findById(request.studentId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.studentId()));

        LicenseCategory category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new ResourceNotFoundException("LicenseCategory", "id", request.categoryId()));

        long count = invoiceRepository.count();
        String dateStr = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMM"));
        String invoiceCode = String.format("INV-%s-%s-%04d", category.getCode(), dateStr, count + 1);

        LocalDate dueDate = request.dueDate() != null ? request.dueDate() : LocalDate.now().plusMonths(1);

        FeeInvoice invoice = new FeeInvoice(invoiceCode, student, category, request.totalAmount(), dueDate);
        FeeInvoice savedInvoice = invoiceRepository.save(invoice);

        return toInvoiceResponse(savedInvoice);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InvoiceResponse> getAllInvoices(InvoiceStatus status) {
        List<FeeInvoice> invoices = (status != null)
                ? invoiceRepository.findByStatus(status)
                : invoiceRepository.findAll();

        return invoices.stream().map(this::toInvoiceResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<InvoiceResponse> getMyInvoices(Long userId) {
        List<FeeInvoice> invoices = invoiceRepository.findByUserId(userId);
        return invoices.stream().map(this::toInvoiceResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public InvoiceResponse getInvoiceById(Long id) {
        FeeInvoice invoice = invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FeeInvoice", "id", id));
        return toInvoiceResponse(invoice);
    }

    @Override
    public PaymentReceiptResponse recordPayment(Long invoiceId, Long cashierId, RecordPaymentRequest request) {
        log.info("Recording payment for invoiceId: {}, amount: {}, key: {}", invoiceId, request.amount(), request.idempotencyKey());

        // Quy tắc FIN-001: Chống ghi nhận trùng lặp thanh toán với Idempotency Key
        if (receiptRepository.existsByIdempotencyKey(request.idempotencyKey())) {
            throw new BusinessRuleViolationException("FIN-001",
                    "Giao dịch thanh toán đã được ghi nhận trước đó trong hệ thống (Trùng khóa Idempotency: " + request.idempotencyKey() + ").");
        }

        FeeInvoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new ResourceNotFoundException("FeeInvoice", "id", invoiceId));

        if (invoice.getStatus() == InvoiceStatus.PAID) {
            throw new BusinessRuleViolationException("FIN-003", "Hóa đơn học phí này đã được thanh toán hoàn tất 100%.");
        }

        BigDecimal remaining = invoice.getTotalAmount().subtract(invoice.getPaidAmount());
        if (request.amount().compareTo(remaining) > 0) {
            throw new BusinessRuleViolationException("FIN-004",
                    "Số tiền nộp (" + request.amount() + " VNĐ) vượt quá số tiền còn nợ của hóa đơn (" + remaining + " VNĐ).");
        }

        User cashier = cashierId != null ? userRepository.findById(cashierId).orElse(null) : null;

        long receiptCount = receiptRepository.count();
        String dateStr = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String receiptCode = String.format("REC-%s-%04d", dateStr, receiptCount + 1);

        PaymentReceipt receipt = new PaymentReceipt(
                receiptCode,
                invoice,
                request.amount(),
                request.paymentMethod(),
                request.idempotencyKey(),
                cashier,
                request.note()
        );

        PaymentReceipt savedReceipt = receiptRepository.save(receipt);

        // Cập nhật số tiền đã trả trên hóa đơn
        BigDecimal newPaidAmount = invoice.getPaidAmount().add(request.amount());
        invoice.setPaidAmount(newPaidAmount);

        if (newPaidAmount.compareTo(invoice.getTotalAmount()) >= 0) {
            invoice.setStatus(InvoiceStatus.PAID);
        } else {
            invoice.setStatus(InvoiceStatus.PARTIALLY_PAID);
        }

        invoiceRepository.save(invoice);

        return toReceiptResponse(savedReceipt);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaymentReceiptResponse> getReceiptsByInvoice(Long invoiceId) {
        List<PaymentReceipt> receipts = receiptRepository.findByInvoiceId(invoiceId);
        return receipts.stream().map(this::toReceiptResponse).toList();
    }

    private InvoiceResponse toInvoiceResponse(FeeInvoice invoice) {
        BigDecimal remaining = invoice.getTotalAmount().subtract(invoice.getPaidAmount());
        return new InvoiceResponse(
                invoice.getId(),
                invoice.getInvoiceCode(),
                invoice.getUser().getId(),
                invoice.getUser().getFullName(),
                invoice.getCategory().getId(),
                invoice.getCategory().getCode(),
                invoice.getTotalAmount(),
                invoice.getPaidAmount(),
                remaining,
                invoice.getStatus(),
                invoice.getDueDate(),
                invoice.getCreatedAt()
        );
    }

    private PaymentReceiptResponse toReceiptResponse(PaymentReceipt receipt) {
        Long cashierId = receipt.getCashier() != null ? receipt.getCashier().getId() : null;
        String cashierName = receipt.getCashier() != null ? receipt.getCashier().getFullName() : "Cổng thu tự động";

        return new PaymentReceiptResponse(
                receipt.getId(),
                receipt.getReceiptCode(),
                receipt.getInvoice().getId(),
                receipt.getInvoice().getInvoiceCode(),
                receipt.getAmount(),
                receipt.getPaymentMethod(),
                receipt.getIdempotencyKey(),
                receipt.getPaidAt(),
                cashierId,
                cashierName,
                receipt.getNote()
        );
    }
}
