package vn.edu.gplx.modules.finance.api.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import vn.edu.gplx.modules.finance.domain.PaymentMethod;

import java.math.BigDecimal;

public record RecordPaymentRequest(
        @NotNull(message = "Số tiền thanh toán không được để trống")
        @DecimalMin(value = "1000.0", message = "Số tiền tối thiểu là 1,000 VNĐ")
        BigDecimal amount,

        @NotNull(message = "Phương thức thanh toán không được để trống")
        PaymentMethod paymentMethod,

        @NotBlank(message = "Idempotency key không được để trống để đảm bảo chống thanh toán trùng")
        String idempotencyKey,

        String note
) {
}
