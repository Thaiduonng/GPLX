package vn.edu.gplx.modules.finance.application;

import vn.edu.gplx.modules.finance.api.dto.CreateInvoiceRequest;
import vn.edu.gplx.modules.finance.api.dto.InvoiceResponse;
import vn.edu.gplx.modules.finance.api.dto.PaymentReceiptResponse;
import vn.edu.gplx.modules.finance.api.dto.RecordPaymentRequest;
import vn.edu.gplx.modules.finance.domain.InvoiceStatus;

import java.util.List;

public interface FinanceService {

    InvoiceResponse createInvoice(CreateInvoiceRequest request);

    List<InvoiceResponse> getAllInvoices(InvoiceStatus status);

    List<InvoiceResponse> getMyInvoices(Long userId);

    InvoiceResponse getInvoiceById(Long id);

    PaymentReceiptResponse recordPayment(Long invoiceId, Long cashierId, RecordPaymentRequest request);

    List<PaymentReceiptResponse> getReceiptsByInvoice(Long invoiceId);
}
