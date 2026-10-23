import React, { useEffect, useState } from 'react';
import { admissionService } from '../services/admissionService';
import { ApplicationResponse, ApplicationStatus } from '../types/admission';

export default function ApplicationManagementPage() {
  const [applications, setApplications] = useState<ApplicationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [filterStatus, setFilterStatus] = useState<ApplicationStatus | ''>('');

  // Modal Thẩm định
  const [reviewingApp, setReviewingApp] = useState<ApplicationResponse | null>(null);
  const [targetStatus, setTargetStatus] = useState<ApplicationStatus>('APPROVED');
  const [reviewNote, setReviewNote] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    loadApplications();
  }, [filterStatus]);

  const loadApplications = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const data = await admissionService.getApplications(filterStatus || undefined, 0, 50);
      setApplications(data.content || []);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Lỗi khi tải hồ sơ tiếp nhận.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenReview = (app: ApplicationResponse) => {
    setReviewingApp(app);
    setTargetStatus('APPROVED');
    setReviewNote('');
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewingApp) return;

    if (
      (targetStatus === 'REJECTED' || targetStatus === 'SUPPLEMENT_REQUIRED') &&
      !reviewNote.trim()
    ) {
      setErrorMsg('Theo quy định (ADM-002): Bắt buộc phải ghi nhận lý do khi từ chối hoặc yêu cầu bổ sung hồ sơ.');
      return;
    }

    setSubmittingReview(true);
    setErrorMsg('');
    try {
      const updated = await admissionService.reviewApplication(reviewingApp.id, {
        targetStatus,
        note: reviewNote.trim(),
      });
      setSuccessMsg(`Đã thẩm định hồ sơ ${updated.applicationCode} thành công sang trạng thái ${updated.status}.`);
      setReviewingApp(null);
      loadApplications();
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Lỗi khi thẩm định hồ sơ.');
    } finally {
      setSubmittingReview(false);
    }
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'SUBMITTED':
        return { label: 'Chờ tiếp nhận', bg: '#dbeafe', color: '#1e40af' };
      case 'UNDER_REVIEW':
        return { label: 'Đang thẩm định', bg: '#ffedd5', color: '#9a3412' };
      case 'APPROVED':
        return { label: 'Đã duyệt', bg: '#dcfce7', color: '#166534' };
      case 'REJECTED':
        return { label: 'Bị từ chối', bg: '#fee2e2', color: '#991b1b' };
      case 'SUPPLEMENT_REQUIRED':
        return { label: 'Yêu cầu bổ sung', bg: '#fef9c3', color: '#854d0e' };
      case 'DRAFT':
      default:
        return { label: 'Bản nháp', bg: '#f3f4f6', color: '#374151' };
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', color: '#1e3a8a', fontWeight: 700, margin: 0 }}>
            🛡️ Quản Lý & Thẩm Định Hồ Sơ Tuyển Sinh
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: '0.25rem 0 0 0' }}>
            Dành cho Cán bộ tuyển sinh, Đào tạo & Quản trị hệ thống
          </p>
        </div>

        {/* Lọc trạng thái */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#374151' }}>Lọc theo trạng thái:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as ApplicationStatus | '')}
            style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="SUBMITTED">Chờ tiếp nhận (SUBMITTED)</option>
            <option value="UNDER_REVIEW">Đang thẩm định (UNDER_REVIEW)</option>
            <option value="APPROVED">Đã phê duyệt (APPROVED)</option>
            <option value="SUPPLEMENT_REQUIRED">Yêu cầu bổ sung (SUPPLEMENT_REQUIRED)</option>
            <option value="REJECTED">Đã từ chối (REJECTED)</option>
          </select>
        </div>
      </div>

      {errorMsg && (
        <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '1rem', color: '#991b1b', marginBottom: '1.5rem', borderRadius: '4px' }}>
          ⚠️ {errorMsg}
        </div>
      )}

      {successMsg && (
        <div style={{ background: '#f0fdf4', borderLeft: '4px solid #22c55e', padding: '1rem', color: '#166534', marginBottom: '1.5rem', borderRadius: '4px' }}>
          ✅ {successMsg}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
          ⏳ Đang tải dữ liệu hồ sơ...
        </div>
      ) : applications.length === 0 ? (
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '3rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>📭</span>
          <h3 style={{ color: '#374151' }}>Không có hồ sơ nào phù hợp</h3>
        </div>
      ) : (
        <div style={{ background: '#ffffff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: 600 }}>
                <th style={{ padding: '1rem' }}>Mã hồ sơ</th>
                <th style={{ padding: '1rem' }}>Học viên</th>
                <th style={{ padding: '1rem' }}>Hạng GPLX</th>
                <th style={{ padding: '1rem' }}>Số CCCD</th>
                <th style={{ padding: '1rem' }}>Ngày nộp</th>
                <th style={{ padding: '1rem' }}>Trạng thái</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Thẩm định</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => {
                const badge = getStatusBadge(app.status);
                const isApproved = app.status === 'APPROVED';
                return (
                  <tr key={app.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1rem', fontWeight: 600, color: '#1e40af' }}>{app.applicationCode}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 600, color: '#1f2937' }}>{app.fullName}</div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{app.phone} | {app.email}</div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ fontWeight: 600 }}>{app.category.code}</span>
                    </td>
                    <td style={{ padding: '1rem', color: '#4b5563' }}>{app.nationalId}</td>
                    <td style={{ padding: '1rem', color: '#6b7280' }}>{new Date(app.createdAt).toLocaleDateString('vi-VN')}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ background: badge.bg, color: badge.color, padding: '0.25rem 0.65rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
                        {badge.label}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button
                        onClick={() => handleOpenReview(app)}
                        disabled={isApproved}
                        style={{
                          background: isApproved ? '#f3f4f6' : '#2563eb',
                          color: isApproved ? '#9ca3af' : 'white',
                          border: 'none',
                          padding: '0.45rem 0.9rem',
                          borderRadius: '6px',
                          cursor: isApproved ? 'not-allowed' : 'pointer',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                        }}
                      >
                        {isApproved ? 'Đã duyệt ✓' : 'Thẩm định ⚖️'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Thẩm định hồ sơ */}
      {reviewingApp && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            zIndex: 50,
          }}
        >
          <div style={{ background: '#ffffff', borderRadius: '12px', width: '100%', maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: '#1e3a8a', margin: 0, fontWeight: 700 }}>
                  Thẩm Định Hồ Sơ: {reviewingApp.applicationCode}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>
                  Học viên: <strong>{reviewingApp.fullName}</strong> | Đăng ký hạng: <strong>{reviewingApp.category.code}</strong>
                </p>
              </div>
              <button
                onClick={() => setReviewingApp(null)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#94a3b8' }}
              >
                ✕
              </button>
            </div>

            {/* Tài liệu đính kèm */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#334155', fontWeight: 600, marginBottom: '0.5rem' }}>Tài liệu số hóa kèm theo:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {reviewingApp.documents.map((doc) => (
                  <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '0.6rem 1rem', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.875rem' }}>
                    <span>📄 {doc.documentType}: <strong>{doc.fileName}</strong> ({(doc.fileSize / 1024).toFixed(0)} KB)</span>
                    <a href={doc.fileUrl} target="_blank" rel="noreferrer" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
                      Xem bản gốc ↗
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmitReview}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                  Trạng thái thẩm định quyết định <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <select
                  value={targetStatus}
                  onChange={(e) => setTargetStatus(e.target.value as ApplicationStatus)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.95rem' }}
                >
                  <option value="APPROVED">✅ Phê duyệt (APPROVED) — Hồ sơ hợp lệ đủ điều kiện vào khóa</option>
                  <option value="SUPPLEMENT_REQUIRED">⚠️ Yêu cầu bổ sung (SUPPLEMENT_REQUIRED) — Thiếu tài liệu hoặc ảnh mờ</option>
                  <option value="REJECTED">❌ Từ chối hồ sơ (REJECTED) — Không đáp ứng tiêu chuẩn đào tạo</option>
                  <option value="UNDER_REVIEW">⏳ Tiếp nhận đang thẩm định (UNDER_REVIEW)</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                  Ghi chú thẩm định / Lý do <span style={{ color: '#ef4444' }}>{(targetStatus === 'REJECTED' || targetStatus === 'SUPPLEMENT_REQUIRED') ? '*' : ''}</span>
                </label>
                <textarea
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  placeholder={(targetStatus === 'REJECTED' || targetStatus === 'SUPPLEMENT_REQUIRED') ? 'Bắt buộc nhập lý do cụ thể theo quy tắc ADM-002...' : 'Ghi chú thêm (không bắt buộc)...'}
                  rows={3}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.9rem', resize: 'vertical' }}
                  required={targetStatus === 'REJECTED' || targetStatus === 'SUPPLEMENT_REQUIRED'}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setReviewingApp(null)}
                  style={{ padding: '0.65rem 1.25rem', background: '#e2e8f0', color: '#334155', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  disabled={submittingReview}
                  style={{
                    padding: '0.65rem 1.75rem',
                    background: targetStatus === 'REJECTED' ? '#ef4444' : targetStatus === 'SUPPLEMENT_REQUIRED' ? '#eab308' : '#16a34a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {submittingReview ? 'Đang lưu...' : 'Xác nhận thẩm định'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
