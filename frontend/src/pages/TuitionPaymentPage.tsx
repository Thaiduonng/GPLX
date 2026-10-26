import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { financeService } from '../services/financeService';
import type { FeeInvoice, PaymentReceipt, PaymentMethod } from '../types/finance';
import { useAuth } from '../features/auth/AuthContext';
import {
  PageHeader,
  StatusBadge,
  Modal,
  AppButton,
  AppInput,
  AppSelect,
  Alert,
  EmptyState,
  LoadingSpinner,
  DataTable,
  Column,
} from '../components/ui';
import { formatCurrency, formatDateTime } from '../utils/formatters';

export const TuitionPaymentPage: React.FC = () => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<FeeInvoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<FeeInvoice | null>(null);
  const [receipts, setReceipts] = useState<PaymentReceipt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingReceipts, setLoadingReceipts] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal nộp tiền
  const [showPayModal, setShowPayModal] = useState<boolean>(false);
  const [payAmount, setPayAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('BANK_TRANSFER');
  const [payNote, setPayNote] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isStaffOrAdmin =
    user?.roles.some((r) => r === 'ROLE_ADMIN' || r === 'ROLE_STAFF' || r === 'ROLE_MANAGER') ?? false;

  const loadInvoices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = isStaffOrAdmin
        ? await financeService.getAllInvoices()
        : await financeService.getMyInvoices();
      setInvoices(data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Không thể tải danh sách hóa đơn học phí.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Lỗi không xác định khi tải danh sách hóa đơn');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, [isStaffOrAdmin]);

  const handleOpenPay = (inv: FeeInvoice) => {
    setSelectedInvoice(inv);
    setPayAmount(inv.remainingAmount);
    setPayNote(`Nộp học phí khóa ${inv.categoryCode} - ${inv.invoiceCode}`);
    setShowPayModal(true);
    setSuccessMsg(null);
    setError(null);
  };

  const handleViewReceipts = async (inv: FeeInvoice) => {
    setSelectedInvoice(inv);
    try {
      setLoadingReceipts(true);
      const data = await financeService.getReceiptsByInvoice(inv.id);
      setReceipts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingReceipts(false);
    }
  };

  const handlePaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) return;

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMsg(null);

      // FIN-001: Sinh Idempotency Key duy nhất theo thời gian và chuỗi ngẫu nhiên
      const idempotencyKey = `PAY-${selectedInvoice.id}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

      const receipt = await financeService.payInvoice(selectedInvoice.id, {
        amount: Number(payAmount),
        paymentMethod,
        idempotencyKey,
        note: payNote,
      });

      setShowPayModal(false);
      setSuccessMsg(
        `Thanh toán thành công! Mã biên lai: ${receipt.receiptCode} — Số tiền: ${formatCurrency(receipt.amount)}`
      );
      loadInvoices();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Thanh toán thất bại.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Lỗi không xác định trong quá trình thanh toán');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const receiptColumns: Column<PaymentReceipt>[] = [
    {
      key: 'receiptCode',
      header: 'Mã biên lai',
      render: (r) => <strong style={{ color: 'var(--color-primary)' }}>{r.receiptCode}</strong>,
    },
    {
      key: 'paidAt',
      header: 'Thời điểm thanh toán',
      render: (r) => formatDateTime(r.paidAt),
    },
    {
      key: 'amount',
      header: 'Số tiền nộp',
      align: 'right',
      render: (r) => (
        <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>
          {formatCurrency(r.amount)}
        </span>
      ),
    },
    {
      key: 'paymentMethod',
      header: 'Phương thức',
      render: (r) => (
        <span style={{ fontSize: '0.85rem' }}>
          {r.paymentMethod === 'BANK_TRANSFER'
            ? 'Chuyển khoản'
            : r.paymentMethod === 'CASH'
            ? 'Tiền mặt'
            : 'Thẻ tín dụng / Ví'}
        </span>
      ),
    },
    {
      key: 'note',
      header: 'Ghi chú',
      render: (r) => r.note || '—',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title="Quản Lý Học Phí & Biên Lai Nộp Tiền (FIN-001, FIN-002)"
        description="Tra cứu biểu phí trọn gói, theo dõi tiến độ đóng học phí và bảo vệ thanh toán an toàn chống trùng lặp."
      />

      {successMsg && (
        <Alert
          type="success"
          message={successMsg}
          onClose={() => setSuccessMsg(null)}
        />
      )}

      {error && (
        <Alert
          type="danger"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {loading ? (
        <div style={{ padding: '60px 0', textAlign: 'center' }}>
          <LoadingSpinner size="lg" text="Đang tải dữ liệu hóa đơn học phí..." />
        </div>
      ) : invoices.length === 0 ? (
        <EmptyState
          icon="💰"
          title="Chưa có hóa đơn học phí"
          description={
            isStaffOrAdmin
              ? 'Hiện chưa có hồ sơ nào được tạo hóa đơn học phí.'
              : 'Hồ sơ của bạn chưa phát sinh hóa đơn học phí hoặc đang chờ phê duyệt.'
          }
        />
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 'var(--space-5)',
          }}
        >
          {invoices.map((inv) => (
            <div
              key={inv.id}
              style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                padding: 'var(--space-5)',
                boxShadow: 'var(--shadow-xs)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 'var(--space-4)',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                    {inv.invoiceCode}
                  </span>
                  <StatusBadge type="payment" status={inv.status} />
                </div>

                <div
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  <div>
                    Học viên: <strong>{inv.studentName}</strong>
                  </div>
                  <div>
                    Khóa đào tạo: <strong style={{ color: 'var(--color-primary)' }}>Hạng {inv.categoryCode}</strong>
                  </div>
                  <div>
                    Hạn nộp: <strong>{inv.dueDate || 'Không giới hạn'}</strong>
                  </div>
                </div>

                {/* Amount breakdown */}
                <div
                  style={{
                    backgroundColor: 'var(--color-bg-app)',
                    padding: 'var(--space-3) var(--space-4)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Tổng học phí:</span>
                    <strong>{formatCurrency(inv.totalAmount)}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)' }}>
                    <span style={{ color: 'var(--color-success)' }}>Đã thanh toán:</span>
                    <strong style={{ color: 'var(--color-success)' }}>{formatCurrency(inv.paidAmount)}</strong>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 'var(--font-size-sm)',
                      borderTop: '1px dashed var(--color-border)',
                      paddingTop: '4px',
                    }}
                  >
                    <span style={{ color: 'var(--color-danger)', fontWeight: 600 }}>Còn nợ:</span>
                    <strong style={{ color: 'var(--color-danger)' }}>{formatCurrency(inv.remainingAmount)}</strong>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <AppButton
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => handleViewReceipts(inv)}
                  icon="🧾"
                >
                  Xem biên lai
                </AppButton>
                {inv.status !== 'PAID' && (
                  <AppButton
                    variant="success"
                    size="sm"
                    fullWidth
                    onClick={() => handleOpenPay(inv)}
                    icon="💳"
                  >
                    Nộp tiền
                  </AppButton>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Receipts list section */}
      {selectedInvoice && (
        <section
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border)',
            padding: 'var(--space-5)',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                🧾 Lịch sử chứng từ thu tiền — Hóa đơn {selectedInvoice.invoiceCode}
              </h3>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
                Học viên: {selectedInvoice.studentName} | Khóa: Hạng {selectedInvoice.categoryCode}
              </p>
            </div>
            <AppButton variant="ghost" size="sm" onClick={() => setSelectedInvoice(null)}>
              Đóng xem lại
            </AppButton>
          </div>

          <DataTable
            columns={receiptColumns}
            data={receipts}
            keyExtractor={(item) => String(item.id)}
            loading={loadingReceipts}
            emptyMessage="Chưa có biên lai thanh toán nào được ghi nhận cho hóa đơn này."
          />
        </section>
      )}

      {/* Modal nộp tiền */}
      {selectedInvoice && (
        <Modal
          isOpen={showPayModal}
          onClose={() => setShowPayModal(false)}
          title={`Nộp học phí — ${selectedInvoice.invoiceCode}`}
        >
          <form onSubmit={handlePaySubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div
              style={{
                backgroundColor: 'var(--color-primary-light)',
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-primary-dark)',
              }}
            >
              <div>Khóa học: <strong>Hạng {selectedInvoice.categoryCode}</strong></div>
              <div>Số tiền còn phải nộp: <strong>{formatCurrency(selectedInvoice.remainingAmount)}</strong></div>
            </div>

            <AppInput
              label="Số tiền nộp (₫)"
              type="number"
              min="1000"
              max={selectedInvoice.remainingAmount}
              required
              value={payAmount}
              onChange={(e) => setPayAmount(Number(e.target.value))}
              helperText="Có thể nộp toàn bộ hoặc nộp từng phần"
            />

            <AppSelect
              label="Phương thức thanh toán"
              required
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              options={[
                { value: 'BANK_TRANSFER', label: 'Chuyển khoản ngân hàng (QR Code / Internet Banking)' },
                { value: 'CASH', label: 'Nộp tiền mặt trực tiếp tại quầy tuyển sinh' },
                { value: 'CREDIT_CARD', label: 'Thẻ tín dụng / Thẻ ghi nợ quốc tế' },
              ]}
            />

            <AppInput
              label="Nội dung nộp tiền"
              placeholder="VD: Nguyễn Văn A nộp học phí B2 đợt 1"
              value={payNote}
              onChange={(e) => setPayNote(e.target.value)}
            />

            <Alert
              type="info"
              message="Giao dịch được bảo vệ bằng Idempotency Key tự động (FIN-001) để ngăn chặn trừ tiền 2 lần."
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: 'var(--space-2)' }}>
              <AppButton variant="outline" type="button" onClick={() => setShowPayModal(false)}>
                Hủy
              </AppButton>
              <AppButton variant="success" type="submit" loading={isSubmitting} icon="✅">
                Xác nhận nộp tiền
              </AppButton>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
export default TuitionPaymentPage;
