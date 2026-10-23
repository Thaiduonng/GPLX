package vn.edu.gplx.modules.finance.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.finance.domain.PaymentReceipt;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentReceiptRepository extends JpaRepository<PaymentReceipt, Long> {

    Optional<PaymentReceipt> findByReceiptCode(String receiptCode);

    Optional<PaymentReceipt> findByIdempotencyKey(String idempotencyKey);

    boolean existsByIdempotencyKey(String idempotencyKey);

    List<PaymentReceipt> findByInvoiceId(Long invoiceId);
}
