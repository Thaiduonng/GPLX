package vn.edu.gplx.modules.finance.api.dto;

import vn.edu.gplx.modules.finance.domain.InvoiceStatus;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

public record InvoiceResponse(
        Long id,
        String invoiceCode,
        Long userId,
        String studentName,
        Long categoryId,
        String categoryCode,
        BigDecimal totalAmount,
        BigDecimal paidAmount,
        BigDecimal remainingAmount,
        InvoiceStatus status,
        LocalDate dueDate,
        Instant createdAt
) {
}
