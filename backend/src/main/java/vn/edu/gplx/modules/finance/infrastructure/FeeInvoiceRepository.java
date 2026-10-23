package vn.edu.gplx.modules.finance.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.finance.domain.FeeInvoice;
import vn.edu.gplx.modules.finance.domain.InvoiceStatus;

import java.util.List;
import java.util.Optional;

@Repository
public interface FeeInvoiceRepository extends JpaRepository<FeeInvoice, Long> {

    Optional<FeeInvoice> findByInvoiceCode(String invoiceCode);

    List<FeeInvoice> findByUserId(Long userId);

    List<FeeInvoice> findByStatus(InvoiceStatus status);

    boolean existsByUserIdAndCategoryIdAndStatusNot(Long userId, Long categoryId, InvoiceStatus status);
}
