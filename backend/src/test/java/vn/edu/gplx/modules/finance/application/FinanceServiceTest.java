package vn.edu.gplx.modules.finance.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import vn.edu.gplx.modules.admission.domain.LicenseCategory;
import vn.edu.gplx.modules.admission.infrastructure.LicenseCategoryRepository;
import vn.edu.gplx.modules.finance.api.dto.CreateInvoiceRequest;
import vn.edu.gplx.modules.finance.api.dto.InvoiceResponse;
import vn.edu.gplx.modules.finance.api.dto.PaymentReceiptResponse;
import vn.edu.gplx.modules.finance.api.dto.RecordPaymentRequest;
import vn.edu.gplx.modules.finance.application.impl.FinanceServiceImpl;
import vn.edu.gplx.modules.finance.domain.FeeInvoice;
import vn.edu.gplx.modules.finance.domain.InvoiceStatus;
import vn.edu.gplx.modules.finance.domain.PaymentMethod;
import vn.edu.gplx.modules.finance.domain.PaymentReceipt;
import vn.edu.gplx.modules.finance.infrastructure.FeeInvoiceRepository;
import vn.edu.gplx.modules.finance.infrastructure.PaymentReceiptRepository;
import vn.edu.gplx.modules.identity.domain.User;
import vn.edu.gplx.modules.identity.infrastructure.UserRepository;
import vn.edu.gplx.shared.exception.BusinessRuleViolationException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FinanceServiceTest {

    @Mock
    private FeeInvoiceRepository invoiceRepository;

    @Mock
    private PaymentReceiptRepository receiptRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private LicenseCategoryRepository categoryRepository;

    @InjectMocks
    private FinanceServiceImpl financeService;

    private User student;
    private LicenseCategory categoryB1;
    private FeeInvoice sampleInvoice;

    @BeforeEach
    void setUp() {
        student = new User("student1", "student1@gmail.com", "hash", "Nguyễn Văn A", "0901234567");
        ReflectionTestUtils.setField(student, "id", 100L);

        categoryB1 = new LicenseCategory("B1", "Hạng B1 tự động", "Mô tả", 18, BigDecimal.valueOf(14000000));
        ReflectionTestUtils.setField(categoryB1, "id", 10L);

        sampleInvoice = new FeeInvoice("INV-B1-202610-0001", student, categoryB1, BigDecimal.valueOf(14000000), LocalDate.now().plusMonths(1));
        ReflectionTestUtils.setField(sampleInvoice, "id", 1L);
    }

    @Test
    @DisplayName("Tạo hóa đơn học phí mới thành công")
    void should_createInvoice_successfully() {
        CreateInvoiceRequest request = new CreateInvoiceRequest(100L, 10L, BigDecimal.valueOf(14000000), LocalDate.now().plusMonths(1));

        when(userRepository.findById(100L)).thenReturn(Optional.of(student));
        when(categoryRepository.findById(10L)).thenReturn(Optional.of(categoryB1));
        when(invoiceRepository.count()).thenReturn(0L);
        when(invoiceRepository.save(any(FeeInvoice.class))).thenAnswer(i -> {
            FeeInvoice inv = i.getArgument(0);
            ReflectionTestUtils.setField(inv, "id", 1L);
            return inv;
        });

        InvoiceResponse response = financeService.createInvoice(request);

        assertThat(response).isNotNull();
        assertThat(response.totalAmount()).isEqualByComparingTo(BigDecimal.valueOf(14000000));
        assertThat(response.status()).isEqualTo(InvoiceStatus.PENDING);
        verify(invoiceRepository).save(any(FeeInvoice.class));
    }

    @Test
    @DisplayName("FIN-001: Chặn ghi nhận thanh toán trùng lặp khi idempotencyKey đã tồn tại")
    void should_throwException_when_idempotencyKeyDuplicated() {
        RecordPaymentRequest request = new RecordPaymentRequest(
                BigDecimal.valueOf(5000000), PaymentMethod.BANK_TRANSFER, "TXN-12345678", "Nộp đợt 1"
        );

        when(receiptRepository.existsByIdempotencyKey("TXN-12345678")).thenReturn(true);

        assertThatThrownBy(() -> financeService.recordPayment(1L, 999L, request))
                .isInstanceOf(BusinessRuleViolationException.class)
                .hasMessageContaining("FIN-001");
    }

    @Test
    @DisplayName("FIN-001: Ghi nhận thanh toán thành công và cập nhật số tiền đã trả")
    void should_recordPayment_successfully_andUpdateInvoiceStatus() {
        RecordPaymentRequest request = new RecordPaymentRequest(
                BigDecimal.valueOf(14000000), PaymentMethod.BANK_TRANSFER, "TXN-UNIQUE-001", "Nộp toàn bộ học phí"
        );

        when(receiptRepository.existsByIdempotencyKey("TXN-UNIQUE-001")).thenReturn(false);
        when(invoiceRepository.findById(1L)).thenReturn(Optional.of(sampleInvoice));
        when(receiptRepository.count()).thenReturn(0L);
        when(receiptRepository.save(any(PaymentReceipt.class))).thenAnswer(i -> {
            PaymentReceipt r = i.getArgument(0);
            ReflectionTestUtils.setField(r, "id", 50L);
            return r;
        });

        PaymentReceiptResponse response = financeService.recordPayment(1L, null, request);

        assertThat(response).isNotNull();
        assertThat(response.amount()).isEqualByComparingTo(BigDecimal.valueOf(14000000));
        assertThat(sampleInvoice.getStatus()).isEqualTo(InvoiceStatus.PAID);
        assertThat(sampleInvoice.getPaidAmount()).isEqualByComparingTo(BigDecimal.valueOf(14000000));
    }

    @Test
    @DisplayName("Chặn nộp số tiền vượt quá số tiền còn nợ của hóa đơn")
    void should_throwException_when_paymentExceedsRemainingAmount() {
        RecordPaymentRequest request = new RecordPaymentRequest(
                BigDecimal.valueOf(20000000), PaymentMethod.CASH, "TXN-EXCESS-001", "Nộp thừa tiền"
        );

        when(receiptRepository.existsByIdempotencyKey("TXN-EXCESS-001")).thenReturn(false);
        when(invoiceRepository.findById(1L)).thenReturn(Optional.of(sampleInvoice));

        assertThatThrownBy(() -> financeService.recordPayment(1L, null, request))
                .isInstanceOf(BusinessRuleViolationException.class)
                .hasMessageContaining("vượt quá số tiền còn nợ");
    }
}
