import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { admissionService } from '../services/admissionService';
import { ApplicationResponse, ApplicationStatus } from '../types/admission';

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedApp, setSelectedApp] = useState<ApplicationResponse | null>(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const data = await admissionService.getMyApplications(0, 20);
      setApplications(data.content || []);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Không thể tải danh sách hồ sơ.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'SUBMITTED':
        return { label: 'Đã nộp — Chờ tiếp nhận', bg: '#dbeafe', color: '#1e40af' };
      case 'UNDER_REVIEW':
        return { label: 'Đang thẩm định', bg: '#ffedd5', color: '#9a3412' };
      case 'APPROVED':
        return { label: 'Đã phê duyệt', bg: '#dcfce7', color: '#166534' };
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
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', color: '#1e3a8a', fontWeight: 700, margin: 0 }}>
            📁 Danh Sách Hồ Sơ Của Tôi
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: '0.25rem 0 0 0' }}>
            Theo dõi tiến trình xử lý và thẩm định hồ sơ điện tử của bạn
          </p>
        </div>
        <Link
          to="/admissions/new"
          style={{
            background: '#2563eb',
            color: 'white',
            textDecoration: 'none',
            padding: '0.65rem 1.25rem',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
        >
          ➕ Nộp hồ sơ mới
        </Link>
      </div>

      {errorMsg && (
        <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '1rem', color: '#991b1b', marginBottom: '1.5rem', borderRadius: '4px' }}>
          ⚠️ {errorMsg}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
          ⏳ Đang tải danh sách hồ sơ...
        </div>
      ) : applications.length === 0 ? (
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '3rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>📭</span>
          <h3 style={{ color: '#374151', marginBottom: '0.5rem' }}>Bạn chưa có hồ sơ nào</h3>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Hãy đăng ký nộp hồ sơ trực tuyến để bắt đầu khóa đào tạo lái xe.</p>
          <Link
            to="/admissions/new"
            style={{
              background: '#2563eb',
              color: 'white',
              textDecoration: 'none',
              padding: '0.65rem 1.5rem',
              borderRadius: '8px',
              fontWeight: 600,
            }}
          >
            Nộp hồ sơ ngay
          </Link>
        </div>
      ) : (
        <div style={{ background: '#ffffff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: 600 }}>
                <th style={{ padding: '1rem' }}>Mã hồ sơ</th>
                <th style={{ padding: '1rem' }}>Hạng GPLX</th>
                <th style={{ padding: '1rem' }}>Số CCCD</th>
                <th style={{ padding: '1rem' }}>Ngày nộp</th>
                <th style={{ padding: '1rem' }}>Trạng thái</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => {
                const badge = getStatusBadge(app.status);
                return (
                  <tr key={app.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1rem', fontWeight: 600, color: '#1e40af' }}>{app.applicationCode}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ fontWeight: 600 }}>{app.category.code}</span> — {app.category.name}
                    </td>
                    <td style={{ padding: '1rem', color: '#64748b' }}>{app.nationalId}</td>
                    <td style={{ padding: '1rem', color: '#64748b' }}>{new Date(app.createdAt).toLocaleDateString('vi-VN')}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ background: badge.bg, color: badge.color, padding: '0.25rem 0.65rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
                        {badge.label}
                      </span>
                      {app.rejectionReason && (
                        <div style={{ fontSize: '0.78rem', color: '#b91c1c', marginTop: '0.25rem' }}>
                          Lý do: {app.rejectionReason}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button
                        onClick={() => setSelectedApp(app)}
                        style={{
                          background: '#eff6ff',
                          color: '#2563eb',
                          border: '1px solid #bfdbfe',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: 500,
                          fontSize: '0.85rem',
                        }}
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Xem chi tiết hồ sơ */}
      {selectedApp && (
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
          <div style={{ background: '#ffffff', borderRadius: '12px', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: '#1e3a8a', margin: 0, fontWeight: 700 }}>
                  Hồ Sơ: {selectedApp.applicationCode}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>
                  Hạng {selectedApp.category.code} | Nộp ngày {new Date(selectedApp.createdAt).toLocaleString('vi-VN')}
                </p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#94a3b8' }}
              >
                ✕
              </button>
            </div>

            {/* Thông tin cá nhân */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#334155', fontWeight: 600, marginBottom: '0.5rem' }}>1. Thông tin học viên</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', fontSize: '0.9rem', color: '#475569', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                <div><strong>Họ và tên:</strong> {selectedApp.fullName}</div>
                <div><strong>CCCD:</strong> {selectedApp.nationalId}</div>
                <div><strong>Ngày sinh:</strong> {selectedApp.dateOfBirth}</div>
                <div><strong>Giới tính:</strong> {selectedApp.gender}</div>
                <div><strong>Số điện thoại:</strong> {selectedApp.phone}</div>
                <div><strong>Email:</strong> {selectedApp.email}</div>
                <div style={{ gridColumn: 'span 2' }}><strong>Địa chỉ:</strong> {selectedApp.address}</div>
              </div>
            </div>

            {/* Tài liệu đính kèm */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#334155', fontWeight: 600, marginBottom: '0.5rem' }}>2. Tài liệu đính kèm ({selectedApp.documents.length})</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {selectedApp.documents.map((doc) => (
                  <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f1f5f9', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.85rem' }}>
                    <span>📄 {doc.documentType}: <strong>{doc.fileName}</strong></span>
                    <a href={doc.fileUrl} target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}>Xem tệp</a>
                  </div>
                ))}
              </div>
            </div>

            {/* Lịch sử trạng thái */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: '#334155', fontWeight: 600, marginBottom: '0.5rem' }}>3. Nhật ký thẩm định & Lịch sử xử lý</h4>
              <div style={{ borderLeft: '2px solid #cbd5e1', paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {selectedApp.statusHistories.map((h) => (
                  <div key={h.id} style={{ fontSize: '0.85rem' }}>
                    <div style={{ fontWeight: 600, color: '#1e3a8a' }}>
                      {h.fromStatus ? `${h.fromStatus} ➔ ${h.toStatus}` : `Khởi tạo: ${h.toStatus}`}
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.78rem' }}>{new Date(h.createdAt).toLocaleString('vi-VN')}</div>
                    {h.note && <div style={{ color: '#334155', marginTop: '0.2rem', fontStyle: 'italic' }}>"{h.note}"</div>}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setSelectedApp(null)}
                style={{ padding: '0.6rem 1.5rem', background: '#e2e8f0', color: '#334155', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
