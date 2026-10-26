import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { reportingService } from '../services/reportingService';
import type { AuditLog } from '../types/reporting';
import {
  PageHeader,
  DataTable,
  AppButton,
  AppInput,
  AppSelect,
  Alert,
  Column,
} from '../components/ui';
import { formatDateTime } from '../utils/formatters';

export const AuditLogPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [resourceType, setResourceType] = useState<string>('');
  const [action, setAction] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const pageSize = 20;

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await reportingService.getAuditLogs(
        resourceType || undefined,
        action || undefined,
        page,
        pageSize
      );
      setLogs(data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Không thể tải nhật ký kiểm toán hệ thống');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Lỗi không xác định khi tải nhật ký kiểm toán');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [page, resourceType, action]);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    fetchLogs();
  };

  const handleResetFilters = () => {
    setResourceType('');
    setAction('');
    setPage(0);
  };

  const columns: Column<AuditLog>[] = [
    {
      key: 'id',
      header: 'ID',
      render: (log) => <span style={{ color: 'var(--color-text-muted)' }}>#{log.id}</span>,
      width: '60px',
    },
    {
      key: 'createdAt',
      header: 'Thời điểm',
      render: (log) => formatDateTime(log.createdAt),
      width: '160px',
    },
    {
      key: 'username',
      header: 'Người thực hiện',
      render: (log) => (
        <span>
          <strong>{log.username}</strong>
          {log.userId && (
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', marginLeft: '4px' }}>
              (#{log.userId})
            </span>
          )}
        </span>
      ),
      width: '150px',
    },
    {
      key: 'action',
      header: 'Hành động',
      render: (log) => (
        <span
          style={{
            padding: '2px 8px',
            borderRadius: '4px',
            backgroundColor: '#eff6ff',
            color: '#1d4ed8',
            fontSize: '0.75rem',
            fontFamily: 'monospace',
            fontWeight: 600,
          }}
        >
          {log.action}
        </span>
      ),
      width: '180px',
    },
    {
      key: 'resourceType',
      header: 'Phân hệ',
      render: (log) => <strong>{log.resourceType}</strong>,
      width: '130px',
    },
    {
      key: 'resourceId',
      header: 'Đối tượng',
      render: (log) => log.resourceId || '—',
      width: '120px',
    },
    {
      key: 'details',
      header: 'Chi tiết thay đổi',
    },
    {
      key: 'ipAddress',
      header: 'Địa chỉ IP',
      render: (log) => (
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontFamily: 'monospace' }}>
          {log.ipAddress || '—'}
        </span>
      ),
      width: '120px',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title="Nhật Ký Kiểm Toán Toàn Hệ Thống (Audit Logs)"
        description="Truy vết mọi hành động quản trị, cập nhật trạng thái hồ sơ, chấm điểm thi, duyệt thanh toán và phân công xe."
        actions={
          <Link to="/dashboard">
            <AppButton variant="outline" size="sm">
              &larr; Về Dashboard KPI
            </AppButton>
          </Link>
        }
      />

      {/* Filter Card */}
      <div
        style={{
          background: 'var(--color-surface)',
          padding: 'var(--space-4) var(--space-5)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-xs)',
        }}
      >
        <form
          onSubmit={handleFilterSubmit}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr)) auto',
            gap: 'var(--space-4)',
            alignItems: 'flex-end',
          }}
        >
          <AppSelect
            label="Module / Phân hệ"
            value={resourceType}
            onChange={(e) => {
              setResourceType(e.target.value);
              setPage(0);
            }}
            options={[
              { value: '', label: '-- Tất cả phân hệ --' },
              { value: 'ADMISSION', label: 'ADMISSION (Tuyển sinh & Hồ sơ)' },
              { value: 'EXAMINATION', label: 'EXAMINATION (Sát hạch & Điểm)' },
              { value: 'FINANCE', label: 'FINANCE (Tài chính & Học phí)' },
              { value: 'FLEET', label: 'FLEET (Đội xe tập lái)' },
              { value: 'TRAINING', label: 'TRAINING (Đào tạo & DAT)' },
              { value: 'IDENTITY', label: 'IDENTITY (Tài khoản người dùng)' },
            ]}
          />

          <AppInput
            label="Hành động (Action)"
            placeholder="VD: APPROVE_APPLICATION, GRADE_CANDIDATE"
            value={action}
            onChange={(e) => setAction(e.target.value)}
          />

          <div style={{ display: 'flex', gap: '8px', marginBottom: '2px' }}>
            <AppButton type="submit" variant="primary" icon="🔍">
              Tìm kiếm
            </AppButton>
            <AppButton type="button" variant="outline" onClick={handleResetFilters}>
              Đặt lại
            </AppButton>
          </div>
        </form>
      </div>

      {error && <Alert type="danger" title="Lỗi tải dữ liệu kiểm toán" message={error} />}

      {/* Audit Log Table */}
      <DataTable
        columns={columns}
        data={logs}
        keyExtractor={(item) => String(item.id)}
        loading={loading}
        emptyMessage="Không tìm thấy bản ghi nhật ký kiểm toán nào phù hợp."
      />

      {/* Pagination Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'var(--space-3) var(--space-4)',
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
        }}
      >
        <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          Trang hiện tại: <strong>{page + 1}</strong> (Hiển thị tối đa {pageSize} bản ghi/trang)
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <AppButton
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0 || loading}
          >
            &larr; Trang trước
          </AppButton>
          <AppButton
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={logs.length < pageSize || loading}
          >
            Trang sau &rarr;
          </AppButton>
        </div>
      </div>
    </div>
  );
};
export default AuditLogPage;
