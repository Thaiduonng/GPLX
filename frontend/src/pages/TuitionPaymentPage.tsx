import React, { useState, useEffect } from 'react';
import { financeService } from '../services/financeService';
import { FeeInvoice, PaymentReceipt, PaymentMethod } from '../types/finance';
import { useAuth } from '../features/auth/AuthContext';

export const TuitionPaymentPage: React.FC = () => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<FeeInvoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<FeeInvoice | null>(null);
  const [receipts, setReceipts] = useState<PaymentReceipt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal nộp tiền
  const [showPayModal, setShowPayModal] = useState<boolean>(false);
  const [payAmount, setPayAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('BANK_TRANSFER');
  const [payNote, setPayNote] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isStaffOrAdmin = user?.roles.some(r => r === 'ROLE_ADMIN' || r === 'ROLE_STAFF' || r === 'ROLE_MANAGER');

  const loadInvoices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = isStaffOrAdmin
        ? await financeService.getAllInvoices()
        : await financeService.getMyInvoices();
      setInvoices(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể tải danh sách hóa đơn học phí.');
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
      const data = await financeService.getReceiptsByInvoice(inv.id);
      setReceipts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) return;

    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMsg(null);

      // FIN-001: Sinh Idempotency Key duy nhất theo thời gian và ngẫu nhiên
      const idempotencyKey = `PAY-${selectedInvoice.id}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

      const receipt = await financeService.payInvoice(selectedInvoice.id, {
        amount: Number(payAmount),
        paymentMethod,
        idempotencyKey,
        note: payNote
      });

      setShowPayModal(false);
      setSuccessMsg(`Thanh toán thành công! Mã biên lai: ${receipt.receiptCode} - Số tiền: ${receipt.amount.toLocaleString('vi-VN')} VNĐ`);
      loadInvoices();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Thanh toán thất bại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b' }}>
          Quản lý học phí & Biên lai nộp tiền (FIN-001, FIN-002)
        </h1>
        <p style={{ color: '#64748b', marginTop: '4px' }}>
          Tra cứu biểu phí trọn gói, theo dõi tiến độ nộp học phí và chống ghi nhận trùng lặp chứng từ
        </p>
      </div>

      {successMsg && (
        <div style={{ padding: '14px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', color: '#166534', marginBottom: '16px' }}>
          {successMsg}
        </div>
      )}

      {error && (
        <div style={{ padding: '14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#b91c1c', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Đang tải hóa đơn học phí...</div>
      ) : invoices.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', background: '#f8fafc', borderRadius: '12px', color: '#94a3b8' }}>
          Chưa có hóa đơn học phí nào được phát hành.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          {invoices.map((inv) => (
            <div
              key={inv.id}
              style={{
                background: '#fff',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                padding: '20px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#2563eb' }}>{inv.invoiceCode}</span>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: inv.status === 'PAID' ? '#dcfce7' : inv.status === 'PARTIALLY_PAID' ? '#fef3c7' : '#fee2e2',
                    color: inv.status === 'PAID' ? '#15803d' : inv.status === 'PARTIALLY_PAID' ? '#92400e' : '#b91c1c'
                  }}>
                    {inv.status === 'PAID' ? 'ĐÃ HOÀN TẤT' : inv.status === 'PARTIALLY_PAID' ? 'TRẢ GÓP' : 'CHƯA NỘP'}
                  </span>
                </div>

                <div style={{ fontSize: '14px', color: '#334155', lineHeight: '1.6', marginBottom: '14px' }}>
                  <div>Học viên: <strong>{inv.studentName}</strong></div>
                  <div>Khóa đào tạo: <strong>Hạng {inv.categoryCode}</strong></div>
                  <div>Hạn nộp: <strong>{inv.dueDate || 'Không giới hạn'}</strong></div>
                </div>

                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b' }}>
                    <span>Tổng học phí:</span>
                    <strong style={{ color: '#1e293b' }}>{inv.totalAmount.toLocaleString('vi-VN')} đ</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#16a34a', marginTop: '4px' }}>
                    <span>Đã thanh toán:</span>
                    <strong>{inv.paidAmount.toLocaleString('vi-VN')} đ</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#dc2626', marginTop: '4px', borderTop: '1px dashed #cbd5e1', paddingTop: '4px' }}>
                    <span>Còn nợ:</span>
                    <strong>{inv.remainingAmount.toLocaleString('vi-VN')} đ</strong>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => handleViewReceipts(inv)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Xem biên lai
                </button>
                {inv.status !== 'PAID' && (
                  <button
                    onClick={() => handleOpenPay(inv)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      background: '#16a34a',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Nộp học phí
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lịch sử biên lai đã xem */}
      {selectedInvoice && receipts.length > 0 && (
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '14px', color: '#1e293b' }}>
            Lịch sử chứng từ thu tiền — Hóa đơn {selectedInvoice.invoiceCode} ({receipts.length} biên lai)
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                  <th style={{ padding: '10px' }}>Mã biên lai</th>
                  <th style={{ padding: '10px' }}>Thời gian thu</th>
                  <th style={{ padding: '10px' }}>Số tiền</th>
                  <th style={{ padding: '10px' }}>Hình thức</th>
                  <th style={{ padding: '10px' }}>Người thu</th>
                  <th style={{ padding: '10px' }}>Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                {receipts.map((r) => (
                  <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px', fontWeight: 'bold', color: '#2563eb' }}>{r.receiptCode}</td>
                    <td style={{ padding: '10px' }}>{new Date(r.paidAt).toLocaleString('vi-VN')}</td>
                    <td style={{ padding: '10px', fontWeight: 'bold', color: '#16a34a' }}>{r.amount.toLocaleString('vi-VN')} đ</td>
                    <td style={{ padding: '10px' }}>{r.paymentMethod}</td>
                    <td style={{ padding: '10px' }}>{r.cashierName}</td>
                    <td style={{ padding: '10px', color: '#64748b' }}>{r.note || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal nộp học phí */}
      {showPayModal && selectedInvoice && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', width: '480px', maxWidth: '90%' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 'bold', marginBottom: '14px', color: '#1e293b' }}>
              Xác nhận nộp học phí
            </h2>
            <form onSubmit={handlePaySubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Hóa đơn thanh toán:
                </label>
                <div style={{ padding: '8px', background: '#f8fafc', borderRadius: '6px', fontSize: '14px', color: '#334155' }}>
                  {selectedInvoice.invoiceCode} — Học viên: {selectedInvoice.studentName}
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Số tiền nộp (VNĐ):
                </label>
                <input
                  type="number"
                  min="1000"
                  max={selectedInvoice.remainingAmount}
                  value={payAmount}
                  onChange={(e) => setPayAmount(Number(e.target.value))}
                  required
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
                <span style={{ fontSize: '11px', color: '#64748b' }}>
                  Tối đa: {selectedInvoice.remainingAmount.toLocaleString('vi-VN')} đ
                </span>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Phương thức thanh toán:
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                >
                  <option value="BANK_TRANSFER">Chuyển khoản Ngân hàng / Quét mã QR</option>
                  <option value="CASH">Tiền mặt tại quầy thu ngân</option>
                  <option value="INTERNAL_WALLET">Ví điện tử nội bộ</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Nội dung / Ghi chú thanh toán:
                </label>
                <input
                  type="text"
                  value={payNote}
                  onChange={(e) => setPayNote(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowPayModal(false)}
                  style={{ padding: '8px 16px', background: '#f1f5f9', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ padding: '8px 18px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
                >
                  {isSubmitting ? 'Đang xác nhận...' : 'Xác nhận nộp tiền'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
