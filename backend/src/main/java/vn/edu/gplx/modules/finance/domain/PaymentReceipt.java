package vn.edu.gplx.modules.finance.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import vn.edu.gplx.modules.identity.domain.User;
import vn.edu.gplx.shared.domain.BaseEntity;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "payment_receipts")
public class PaymentReceipt extends BaseEntity {

    @Column(name = "receipt_code", nullable = false, unique = true, length = 50)
    private String receiptCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "invoice_id", nullable = false)
    private FeeInvoice invoice;

    @Column(name = "amount", nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_method", nullable = false, length = 30)
    private PaymentMethod paymentMethod;

    @Column(name = "idempotency_key", nullable = false, unique = true, length = 100)
    private String idempotencyKey;

    @Column(name = "paid_at", nullable = false)
    private Instant paidAt = Instant.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cashier_id")
    private User cashier;

    @Column(name = "note")
    private String note;

    public PaymentReceipt() {
    }

    public PaymentReceipt(String receiptCode, FeeInvoice invoice, BigDecimal amount,
                          PaymentMethod paymentMethod, String idempotencyKey, User cashier, String note) {
        this.receiptCode = receiptCode;
        this.invoice = invoice;
        this.amount = amount;
        this.paymentMethod = paymentMethod;
        this.idempotencyKey = idempotencyKey;
        this.cashier = cashier;
        this.note = note;
        this.paidAt = Instant.now();
    }

    public String getReceiptCode() {
        return receiptCode;
    }

    public void setReceiptCode(String receiptCode) {
        this.receiptCode = receiptCode;
    }

    public FeeInvoice getInvoice() {
        return invoice;
    }

    public void setInvoice(FeeInvoice invoice) {
        this.invoice = invoice;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getIdempotencyKey() {
        return idempotencyKey;
    }

    public void setIdempotencyKey(String idempotencyKey) {
        this.idempotencyKey = idempotencyKey;
    }

    public Instant getPaidAt() {
        return paidAt;
    }

    public void setPaidAt(Instant paidAt) {
        this.paidAt = paidAt;
    }

    public User getCashier() {
        return cashier;
    }

    public void setCashier(User cashier) {
        this.cashier = cashier;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
