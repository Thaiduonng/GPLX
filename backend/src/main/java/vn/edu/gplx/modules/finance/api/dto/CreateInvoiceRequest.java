package vn.edu.gplx.modules.finance.api.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;

public record CreateInvoiceRequest(
        @NotNull(message = "ID học viên không được để trống")
        Long studentId,

        @NotNull(message = "Hạng GPLX không được để trống")
        Long categoryId,

        @NotNull(message = "Học phí không được để trống")
        @DecimalMin(value = "0.0", inclusive = false, message = "Học phí phải lớn hơn 0")
        BigDecimal totalAmount,

        LocalDate dueDate
) {
}
