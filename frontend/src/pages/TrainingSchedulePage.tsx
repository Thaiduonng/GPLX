import { useEffect, useState } from 'react';
import axios from 'axios';
import { trainingService } from '../services/trainingService';
import type { DatSummary, TrainingClass, TrainingSchedule } from '../types/training';
import { useAuth } from '../features/auth/AuthContext';
import {
  PageHeader,
  StatCard,
  StatusBadge,
  AppSelect,
  Alert,
  LoadingSpinner,
  EmptyState,
} from '../components/ui';
import { formatDate, formatDistanceKm, formatDurationHours } from '../utils/formatters';

export default function TrainingSchedulePage() {
  const { isAuthenticated } = useAuth();
  const [classes, setClasses] = useState<TrainingClass[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<number | ''>('');
  const [schedules, setSchedules] = useState<TrainingSchedule[]>([]);
  const [datSummary, setDatSummary] = useState<DatSummary | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    loadClasses();
    if (isAuthenticated) {
      loadDatSummary();
    }
  }, [isAuthenticated]);

  const loadClasses = async () => {
    try {
      const data = await trainingService.getClasses();
      setClasses(data);
      if (data.length > 0 && data[0]) {
        setSelectedClassId(data[0].id);
        loadSchedules(data[0].id);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorMsg(err.response?.data?.message || 'Lỗi tải danh sách lớp học.');
      } else if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Lỗi không xác định khi tải danh sách lớp.');
      }
    } finally {
      setLoading(false);
    }
  };

  const loadSchedules = async (classId: number) => {
    try {
      const data = await trainingService.getSchedulesByClass(classId);
      setSchedules(data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorMsg(err.response?.data?.message || 'Lỗi tải lịch học.');
      } else if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Lỗi không xác định khi tải lịch học.');
      }
    }
  };

  const loadDatSummary = async () => {
    try {
      const data = await trainingService.getMyDatSummary();
      setDatSummary(data);
    } catch {
      // Học viên chưa có phiên thực hành DAT
    }
  };

  const handleClassChange = (classId: number) => {
    setSelectedClassId(classId);
    loadSchedules(classId);
  };

  const getScheduleTypeLabel = (type: string) => {
    switch (type) {
      case 'THEORY':
        return { label: 'Lý thuyết trên lớp', variant: 'info' as const };
      case 'PRACTICE_YARD':
        return { label: 'Thực hành Sa hình', variant: 'warning' as const };
      case 'PRACTICE_ROAD':
        return { label: 'Thực hành Đường trường (DAT)', variant: 'success' as const };
      case 'CABIN_SIMULATION':
        return { label: 'Mô phỏng Cabin điện tử', variant: 'default' as const };
      default:
        return { label: type, variant: 'default' as const };
    }
  };

  const distancePercent =
    datSummary && datSummary.targetDistanceKm > 0
      ? Math.min(
          100,
          Math.round((Number(datSummary.totalDistanceKm) / Number(datSummary.targetDistanceKm)) * 100)
        )
      : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title="Kế Hoạch Đào Tạo, Lịch Học & Tiến Độ DAT"
        description="Theo dõi lịch học tập trung, thực hành sa hình, thực hành đường trường và thiết bị giám sát hành trình DAT."
      />

      {errorMsg && (
        <Alert
          type="danger"
          message={errorMsg}
          onClose={() => setErrorMsg('')}
        />
      )}

      {/* Tiến độ DAT (Nếu đăng nhập) */}
      {isAuthenticated && datSummary && (
        <section
          style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-6)',
            boxShadow: 'var(--shadow-xs)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--space-4)',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 4px 0' }}>
                🛰️ Tiến Độ Thực Hành Lái Xe Đường Trường DAT
              </h3>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
                Dữ liệu đồng bộ trực tiếp từ thiết bị giám sát thời gian & quãng đường học thực hành lái xe
              </p>
            </div>
            <StatusBadge
              variant={datSummary.isCompleted ? 'success' : 'warning'}
              label={datSummary.isCompleted ? '✓ ĐỦ ĐIỀU KIỆN DỰ THI' : 'CHƯA ĐỦ ĐIỀU KIỆN DỰ THI'}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-5)',
            }}
          >
            <StatCard
              title="Quãng đường tích lũy"
              value={`${formatDistanceKm(datSummary.totalDistanceKm)}`}
              subtitle={`Mục tiêu quy định: ${formatDistanceKm(datSummary.targetDistanceKm)}`}
              icon="🛣️"
              variant="primary"
            />
            <StatCard
              title="Thời gian thực hành"
              value={formatDurationHours(datSummary.totalDurationMinutes / 60)}
              subtitle={`Mục tiêu quy định: ${formatDurationHours(datSummary.targetDurationMinutes / 60)}`}
              icon="⏱️"
              variant="primary"
            />
            <StatCard
              title="Số phiên thực hành"
              value={`${datSummary.totalSessions} phiên`}
              subtitle="Đã xác thực khuôn mặt học viên"
              icon="🚗"
              variant="success"
            />
          </div>

          {/* Thanh tiến trình */}
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
                marginBottom: '6px',
              }}
            >
              <span>Tiến độ hoàn thành quãng đường DAT:</span>
              <span>{distancePercent}%</span>
            </div>
            <div
              style={{
                width: '100%',
                height: '10px',
                backgroundColor: '#e2e8f0',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${distancePercent}%`,
                  height: '100%',
                  backgroundColor: distancePercent >= 100 ? 'var(--color-success)' : 'var(--color-primary)',
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Chọn lớp học & Danh sách lịch */}
      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-6)',
          boxShadow: 'var(--shadow-xs)',
          border: '1px solid var(--color-border)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--space-5)',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
          }}
        >
          <h3 style={{ fontSize: '1.2rem', color: 'var(--color-text-main)', margin: 0, fontWeight: 700 }}>
            📅 Lịch Học Tập & Lịch Thực Hành Theo Khóa
          </h3>
          <div style={{ width: '280px' }}>
            <AppSelect
              label="Lớp đào tạo"
              value={selectedClassId}
              onChange={(e) => handleClassChange(Number(e.target.value))}
              options={classes.map((cls) => ({
                value: cls.id,
                label: `${cls.name} (${cls.classCode})`,
              }))}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '40px 0', textAlign: 'center' }}>
            <LoadingSpinner size="md" text="Đang tải lịch học của lớp..." />
          </div>
        ) : schedules.length === 0 ? (
          <EmptyState
            icon="📅"
            title="Chưa có lịch học"
            description="Hiện chưa có buổi học lý thuyết hoặc thực hành nào được phân bổ cho lớp này."
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {schedules.map((s) => {
              const meta = getScheduleTypeLabel(s.scheduleType);
              const start = new Date(s.startTime);
              const end = new Date(s.endTime);
              return (
                <div
                  key={s.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 'var(--space-4) var(--space-5)',
                    backgroundColor: 'var(--color-bg-app)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-border)',
                    flexWrap: 'wrap',
                    gap: 'var(--space-3)',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '1rem' }}>
                        {s.title}
                      </span>
                      <StatusBadge variant={meta.variant} label={meta.label} />
                    </div>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                      📍 Địa điểm học: <strong>{s.location}</strong>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 600, color: 'var(--color-text-main)', fontSize: 'var(--font-size-sm)' }}>
                      {formatDate(s.startTime)}
                    </div>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                      {start.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} —{' '}
                      {end.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
