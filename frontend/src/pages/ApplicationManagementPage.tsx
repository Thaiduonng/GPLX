import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { admissionService } from '../services/admissionService';
import type { ApplicationResponse, ApplicationStatus } from '../types/admission';
import {
  PageHeader,
  StatusBadge,
  Modal,
  AppButton,
  AppSelect,
  AppTextarea,
  Alert,
  DataTable,
  Column,
} from '../components/ui';
import { formatDate } from '../utils/formatters';

export default function ApplicationManagementPage() {
  const [applications, setApplications] = useState<ApplicationResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<ApplicationStatus | ''>('');

  // Modal Thẩm định
  const [reviewingApp, setReviewingApp] = useState<ApplicationResponse | null>(null);
  const [targetStatus, setTargetStatus] = useState<ApplicationStatus>('APPROVED');
  const [reviewNote, setReviewNote] = useState<string>('');
  const [submittingReview, setSubmittingReview] = useState<boolean>(false);

  useEffect(() => {
    loadApplications();
  }, [filterStatus]);

  const loadApplications = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const data = await admissionService.getApplications(filterStatus || undefined, 0, 50);
      setApplications(data.content || []);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorMsg(err.response?.data?.message || 'Lỗi khi tải hồ sơ tiếp nhận.');
      } else if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Lỗi không xác định khi tải danh sách hồ sơ.');
      }
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
      setErrorMsg('Theo quy tắc ADM-002: Bắt buộc phải ghi nhận lý do khi từ chối hoặc yêu cầu bổ sung hồ sơ.');
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
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorMsg(err.response?.data?.message || 'Lỗi khi thẩm định hồ sơ.');
      } else if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Lỗi không xác định khi thẩm định hồ sơ.');
      }
    } finally {
      setSubmittingReview(false);
    }
  };

  const columns: Column<ApplicationResponse>[] = [
    {
      key: 'applicationCode',
      header: 'Mã hồ sơ',
      render: (app) => <strong style={{ color: 'var(--color-primary)' }}>{app.applicationCode}</strong>,
      width: '130px',
    },
    {
      key: 'fullName',
      header: 'Học viên',
      render: (app) => (
        <div>
          <div style={{ fontWeight: 600 }}>{app.fullName}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            {app.phone} | {app.email}
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Hạng GPLX',
      render: (app) => <strong>Hạng {app.category.code}</strong>,
      width: '110px',
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
      width: '110px',
    },
    {
      key: 'status',
      header: 'Trạng thái',
      render: (app) => <StatusBadge type="application" status={app.status} />,
      width: '150px',
    },
    {
      key: 'actions',
      header: 'Thao tác',
      align: 'right',
      render: (app) => {
        const isApproved = app.status === 'APPROVED';
        return (
          <AppButton
            variant={isApproved ? 'outline' : 'primary'}
            size="sm"
            onClick={() => handleOpenReview(app)}
            disabled={isApproved}
          >
            {isApproved ? 'Đã duyệt ✓' : 'Thẩm định ⚖️'}
          </AppButton>
        );
      },
      width: '130px',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title="Quản Lý & Thẩm Định Hồ Sơ Tuyển Sinh (ADM-002)"
        description="Dành cho Cán bộ tuyển sinh, Đào tạo & Quản trị hệ thống tiếp nhận và đối soát hồ sơ học viên."
        actions={
          <div style={{ width: '240px' }}>
            <AppSelect
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as ApplicationStatus | '')}
              options={[
                { value: '', label: 'Tất cả trạng thái hồ sơ' },
                { value: 'SUBMITTED', label: 'Chờ tiếp nhận (SUBMITTED)' },
                { value: 'UNDER_REVIEW', label: 'Đang thẩm định (UNDER_REVIEW)' },
                { value: 'APPROVED', label: 'Đã phê duyệt (APPROVED)' },
                { value: 'SUPPLEMENT_REQUIRED', label: 'Yêu cầu bổ sung (SUPPLEMENT_REQUIRED)' },
                { value: 'REJECTED', label: 'Đã từ chối (REJECTED)' },
              ]}
            />
          </div>
        }
      />

      {errorMsg && (
        <Alert
          type="danger"
          message={errorMsg}
          onClose={() => setErrorMsg('')}
        />
      )}

      {successMsg && (
        <Alert
          type="success"
          message={successMsg}
          onClose={() => setSuccessMsg('')}
        />
      )}

      <DataTable
        columns={columns}
        data={applications}
        keyExtractor={(item) => String(item.id)}
        loading={loading}
        emptyMessage="Không tìm thấy hồ sơ nào phù hợp với bộ lọc."
      />

      {/* Modal Thẩm định hồ sơ */}
      {reviewingApp && (
        <Modal
          isOpen={Boolean(reviewingApp)}
          onClose={() => setReviewingApp(null)}
          title={`Thẩm định hồ sơ: ${reviewingApp.applicationCode}`}
          size="lg"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <div
              style={{
                backgroundColor: 'var(--color-bg-app)',
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: 'var(--radius-md)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              <div>Học viên: <strong>{reviewingApp.fullName}</strong></div>
              <div>Số CCCD: <strong>{reviewingApp.nationalId}</strong></div>
              <div>Hạng đăng ký: <strong style={{ color: 'var(--color-primary)' }}>{reviewingApp.category.code}</strong></div>
              <div>Ngày nộp: <strong>{formatDate(reviewingApp.createdAt)}</strong></div>
            </div>

            {/* Tài liệu đính kèm */}
            <div>
              <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                Tài liệu số hóa kèm theo:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {reviewingApp.documents.length === 0 ? (
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                    Không có tài liệu đính kèm.
                  </span>
                ) : (
                  reviewingApp.documents.map((doc) => (
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
                        📄 {doc.documentType}: <strong>{doc.fileName}</strong> ({(doc.fileSize / 1024).toFixed(0)} KB)
                      </span>
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: 'var(--color-primary)', fontWeight: 600 }}
                      >
                        Xem bản gốc ↗
                      </a>
                    </div>
                  ))
                )}
              </div>
            </div>

            <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <AppSelect
                label="Quyết định thẩm định"
                required
                value={targetStatus}
                onChange={(e) => setTargetStatus(e.target.value as ApplicationStatus)}
                options={[
                  { value: 'APPROVED', label: '✅ Phê duyệt (APPROVED) — Hồ sơ hợp lệ đủ điều kiện vào khóa' },
                  { value: 'SUPPLEMENT_REQUIRED', label: '⚠️ Yêu cầu bổ sung (SUPPLEMENT_REQUIRED) — Thiếu tài liệu hoặc ảnh mờ' },
                  { value: 'REJECTED', label: '❌ Từ chối hồ sơ (REJECTED) — Không đáp ứng tiêu chuẩn đào tạo' },
                  { value: 'UNDER_REVIEW', label: '⏳ Tiếp nhận đang thẩm định (UNDER_REVIEW)' },
                ]}
              />

              <AppTextarea
                label="Ghi chú thẩm định / Lý do quyết định"
                required={targetStatus === 'REJECTED' || targetStatus === 'SUPPLEMENT_REQUIRED'}
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
                placeholder={
                  targetStatus === 'REJECTED' || targetStatus === 'SUPPLEMENT_REQUIRED'
                    ? 'Bắt buộc nhập lý do chi tiết theo quy tắc ADM-002...'
                    : 'Ghi chú thêm cho học viên hoặc nội bộ...'
                }
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <AppButton variant="outline" type="button" onClick={() => setReviewingApp(null)}>
                  Đóng
                </AppButton>
                <AppButton
                  variant={
                    targetStatus === 'REJECTED'
                      ? 'danger'
                      : targetStatus === 'SUPPLEMENT_REQUIRED'
                      ? 'warning'
                      : 'success'
                  }
                  type="submit"
                  loading={submittingReview}
                >
                  Xác nhận quyết định
                </AppButton>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}
