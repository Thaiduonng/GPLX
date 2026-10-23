package vn.edu.gplx.modules.finance.api.dto;

import vn.edu.gplx.modules.finance.domain.PaymentMethod;

import java.math.BigDecimal;
import java.time.Instant;

public record PaymentReceiptResponse(
        Long id,
        String receiptCode,
        Long invoiceId,
        String invoiceCode,
        BigDecimal amount,
        PaymentMethod paymentMethod,
        String idempotencyKey,
        Instant paidAt,
        Long cashierId,
        String cashierName,
        String note
) {
}
