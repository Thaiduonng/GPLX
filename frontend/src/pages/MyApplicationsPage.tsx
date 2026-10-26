import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { admissionService } from '../services/admissionService';
import type { ApplicationResponse } from '../types/admission';
import {
  PageHeader,
  DataTable,
  StatusBadge,
  Modal,
  AppButton,
  Alert,
  Column,
} from '../components/ui';
import { formatDate, formatDateTime } from '../utils/formatters';

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [selectedApp, setSelectedApp] = useState<ApplicationResponse | null>(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const data = await admissionService.getMyApplications(0, 20);
      setApplications(data.content || []);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorMsg(err.response?.data?.message || 'Không thể tải danh sách hồ sơ.');
      } else if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Lỗi không xác định khi tải danh sách hồ sơ.');
      }
    } finally {
      setLoading(false);
    }
  };

  const columns: Column<ApplicationResponse>[] = [
    {
      key: 'applicationCode',
      header: 'Mã hồ sơ',
      render: (app) => <strong style={{ color: 'var(--color-primary)' }}>{app.applicationCode}</strong>,
      width: '140px',
    },
    {
      key: 'category',
      header: 'Hạng GPLX',
      render: (app) => (
        <span>
          <strong>{app.category.code}</strong> — {app.category.name}
        </span>
      ),
    },
    {
      key: 'nationalId',
      header: 'Số CCCD',
      render: (app) => app.nationalId,
      width: '130px',
    },
    {
      key: 'createdAt',
      header: 'Ngày nộp',
      render: (app) => formatDate(app.createdAt),
      width: '120px',
    },
    {
      key: 'status',
      header: 'Trạng thái',
      render: (app) => (
        <div>
          <StatusBadge type="application" status={app.status} />
          {app.rejectionReason && (
            <div style={{ fontSize: '0.75rem', color: 'var(--color-danger)', marginTop: '4px' }}>
              Lý do: {app.rejectionReason}
            </div>
          )}
        </div>
      ),
      width: '180px',
    },
    {
      key: 'actions',
      header: 'Thao tác',
      align: 'right',
      render: (app) => (
        <AppButton variant="outline" size="sm" onClick={() => setSelectedApp(app)}>
          Xem chi tiết
        </AppButton>
      ),
      width: '120px',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title="Danh Sách Hồ Sơ Của Tôi"
        description="Theo dõi tiến trình xử lý, thẩm định và phê duyệt hồ sơ điện tử đào tạo lái xe của bạn."
        actions={
          <Link to="/admissions/new">
            <AppButton variant="primary" icon="➕">
              Nộp hồ sơ mới
            </AppButton>
          </Link>
        }
      />

      {errorMsg && (
        <Alert
          type="danger"
          message={errorMsg}
          onClose={() => setErrorMsg('')}
        />
      )}

      <DataTable
        columns={columns}
        data={applications}
        keyExtractor={(item) => String(item.id)}
        loading={loading}
        emptyMessage="Bạn chưa có hồ sơ đào tạo nào trong hệ thống. Hãy bấm 'Nộp hồ sơ mới' để đăng ký tham gia khóa đào tạo."
      />

      {/* Modal Xem chi tiết hồ sơ */}
      {selectedApp && (
        <Modal
          isOpen={Boolean(selectedApp)}
          onClose={() => setSelectedApp(null)}
          title={`Hồ sơ điện tử: ${selectedApp.applicationCode}`}
          size="lg"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            {/* Thông tin học viên */}
            <div>
              <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                1. Thông tin học viên đăng ký
              </h4>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '8px',
                  fontSize: 'var(--font-size-sm)',
                  backgroundColor: 'var(--color-bg-app)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <div>Họ và tên: <strong>{selectedApp.fullName}</strong></div>
                <div>Số CCCD: <strong>{selectedApp.nationalId}</strong></div>
                <div>Ngày sinh: <strong>{formatDate(selectedApp.dateOfBirth)}</strong></div>
                <div>Giới tính: <strong>{selectedApp.gender === 'MALE' ? 'Nam' : selectedApp.gender === 'FEMALE' ? 'Nữ' : selectedApp.gender}</strong></div>
                <div>Số điện thoại: <strong>{selectedApp.phone}</strong></div>
                <div>Email: <strong>{selectedApp.email}</strong></div>
                <div style={{ gridColumn: 'span 2' }}>Địa chỉ: <strong>{selectedApp.address}</strong></div>
              </div>
            </div>

            {/* Tài liệu số hóa đính kèm */}
            <div>
              <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                2. Tài liệu số hóa kèm theo ({selectedApp.documents.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedApp.documents.map((doc) => (
                  <div
                    key={doc.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: 'var(--color-surface)',
                      padding: 'var(--space-2) var(--space-3)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      fontSize: 'var(--font-size-xs)',
                    }}
                  >
                    <span>
                      📄 {doc.documentType}: <strong>{doc.fileName}</strong>
                    </span>
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: 'var(--color-primary)', fontWeight: 600 }}
                    >
                      Xem tệp đính kèm ↗
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Lịch sử thẩm định */}
            <div>
              <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                3. Nhật ký thẩm định & Tiến trình xử lý (ADM-002)
              </h4>
              <div
                style={{
                  borderLeft: '2px solid var(--color-border)',
                  paddingLeft: 'var(--space-4)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-3)',
                }}
              >
                {selectedApp.statusHistories.map((h) => (
                  <div key={h.id} style={{ fontSize: 'var(--font-size-xs)' }}>
                    <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                      {h.fromStatus ? `${h.fromStatus} ➔ ${h.toStatus}` : `Khởi tạo: ${h.toStatus}`}
                    </div>
                    <div style={{ color: 'var(--color-text-muted)' }}>{formatDateTime(h.createdAt)}</div>
                    {h.note && (
                      <div style={{ color: 'var(--color-text-secondary)', marginTop: '2px', fontStyle: 'italic' }}>
                        "{h.note}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-2)' }}>
              <AppButton variant="outline" onClick={() => setSelectedApp(null)}>
                Đóng
              </AppButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
