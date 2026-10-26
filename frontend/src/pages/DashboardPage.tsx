import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { reportingService } from '../services/reportingService';
import type { DashboardSummary } from '../types/reporting';
import {
  PageHeader,
  StatCard,
  DataTable,
  AppButton,
  Alert,
  LoadingSpinner,
  Column,
} from '../components/ui';
import { formatCurrency, formatDateTime } from '../utils/formatters';

export const DashboardPage: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await reportingService.getDashboardSummary();
      setSummary(data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Không thể tải dữ liệu Dashboard báo cáo');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Lỗi không xác định khi tải dữ liệu báo cáo');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center' }}>
        <LoadingSpinner size="lg" text="Đang tổng hợp dữ liệu thống kê quản trị & KPI..." />
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div style={{ maxWidth: '800px', margin: '40px auto' }}>
        <Alert
          type="danger"
          title="Không thể tải báo cáo KPI"
          message={error || 'Không có dữ liệu báo cáo từ máy chủ'}
        />
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <AppButton variant="primary" onClick={fetchSummary}>
            Thử tải lại
          </AppButton>
        </div>
      </div>
    );
  }

  const categoryColumns: Column<DashboardSummary['categoryStats'][0]>[] = [
    {
      key: 'categoryCode',
      header: 'Hạng GPLX',
      render: (cat) => <strong style={{ color: 'var(--color-primary)' }}>{cat.categoryCode}</strong>,
    },
    {
      key: 'categoryName',
      header: 'Tên hạng',
    },
    {
      key: 'totalApplications',
      header: 'Hồ sơ tiếp nhận',
      align: 'right',
    },
    {
      key: 'totalExamCandidates',
      header: 'Thí sinh dự thi',
      align: 'right',
    },
    {
      key: 'totalPassedCandidates',
      header: 'Số lượng ĐẠT',
      align: 'right',
      render: (cat) => (
        <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>
          {cat.totalPassedCandidates}
        </span>
      ),
    },
    {
      key: 'passRate',
      header: 'Tỷ lệ đỗ (%)',
      render: (cat) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              flex: 1,
              height: '8px',
              backgroundColor: '#e2e8f0',
              borderRadius: '4px',
              overflow: 'hidden',
              minWidth: '60px',
            }}
          >
            <div
              style={{
                width: `${Math.min(cat.passRate, 100)}%`,
                height: '100%',
                backgroundColor:
                  cat.passRate >= 80 ? 'var(--color-success)' : cat.passRate >= 50 ? 'var(--color-warning)' : 'var(--color-danger)',
              }}
            />
          </div>
          <span style={{ fontWeight: 600, minWidth: '40px', fontSize: '0.85rem' }}>
            {cat.passRate}%
          </span>
        </div>
      ),
    },
  ];

  const auditColumns: Column<DashboardSummary['recentActivities'][0]>[] = [
    {
      key: 'createdAt',
      header: 'Thời gian',
      render: (log) => formatDateTime(log.createdAt),
      width: '160px',
    },
    {
      key: 'username',
      header: 'Tài khoản',
      render: (log) => <strong>{log.username}</strong>,
      width: '130px',
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
      width: '140px',
    },
    {
      key: 'resourceType',
      header: 'Phân hệ',
      width: '120px',
    },
    {
      key: 'resourceId',
      header: 'Mã đối tượng',
      render: (log) => log.resourceId || '—',
      width: '120px',
    },
    {
      key: 'details',
      header: 'Chi tiết thay đổi',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <PageHeader
        title="Dashboard Quản trị & Báo cáo KPI"
        description="Giám sát thời gian thực toàn bộ chu trình: Tuyển sinh, Đào tạo, Thực hành DAT, Sát hạch và Tài chính."
        actions={
          <div style={{ display: 'flex', gap: '8px' }}>
            <Link to="/audit-logs">
              <AppButton variant="outline" size="sm" icon="🛡️">
                Nhật ký kiểm toán
              </AppButton>
            </Link>
            <AppButton variant="primary" size="sm" onClick={fetchSummary} icon="🔄">
              Làm mới
            </AppButton>
          </div>
        }
      />

      {/* KPI Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'var(--space-4)',
        }}
      >
        <StatCard
          title="Tài khoản học viên"
          value={summary.totalStudents}
          subtitle="Người dùng đăng ký trong hệ thống"
          icon="👥"
          variant="primary"
        />

        <StatCard
          title="Hồ sơ đã phê duyệt"
          value={`${summary.approvedApplications} / ${summary.totalApplications}`}
          subtitle="Hồ sơ đạt tiêu chuẩn tuyển sinh"
          icon="📑"
          variant="success"
        />

        <StatCard
          title="Tỷ lệ đỗ sát hạch"
          value={`${summary.overallPassRate}%`}
          subtitle={`${summary.totalPassedCandidates} đạt trên ${summary.totalExamCandidates} thí sinh`}
          icon="🏆"
          variant="warning"
        />

        <StatCard
          title="Doanh thu học phí"
          value={formatCurrency(summary.totalTuitionRevenue)}
          subtitle="Tổng số tiền đã thu qua hóa đơn"
          icon="💰"
          variant="success"
        />

        <StatCard
          title="Quãng đường DAT tích lũy"
          value={`${summary.totalDatDistanceKm.toLocaleString('vi-VN')} km`}
          subtitle="Đã truy vết qua thiết bị DAT"
          icon="🛣️"
          variant="primary"
        />

        <StatCard
          title="Phương tiện khả dụng"
          value={`${summary.availableVehicles} / ${summary.totalVehicles}`}
          subtitle="Xe đủ điều kiện & còn hạn kiểm định"
          icon="🚗"
          variant="warning"
        />
      </div>

      {/* Category Stats Section */}
      <section>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 'var(--space-3)' }}>
          📊 Thống kê chỉ số theo từng hạng Giấy phép lái xe
        </h3>
        <DataTable
          columns={categoryColumns}
          data={summary.categoryStats}
          keyExtractor={(item) => item.categoryCode}
          emptyMessage="Chưa có dữ liệu thống kê cho các hạng bằng."
        />
      </section>

      {/* Recent Audit Activities Section */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-main)', margin: 0 }}>
            🛡️ Nhật ký kiểm toán gần đây (Audit Trail)
          </h3>
          <Link to="/audit-logs" style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600 }}>
            Xem toàn bộ nhật ký &rarr;
          </Link>
        </div>
        <DataTable
          columns={auditColumns}
          data={summary.recentActivities}
          keyExtractor={(item) => String(item.id)}
          emptyMessage="Chưa có nhật ký hoạt động gần đây."
        />
      </section>
    </div>
  );
};
export default DashboardPage;
