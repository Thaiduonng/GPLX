import { useEffect, useState } from 'react';
import { trainingService } from '../services/trainingService';
import { DatSummary, TrainingClass, TrainingSchedule } from '../types/training';
import { useAuth } from '../features/auth/AuthContext';

export default function TrainingSchedulePage() {
  const { isAuthenticated } = useAuth();
  const [classes, setClasses] = useState<TrainingClass[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<number | ''>('');
  const [schedules, setSchedules] = useState<TrainingSchedule[]>([]);
  const [datSummary, setDatSummary] = useState<DatSummary | null>(null);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

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
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Lỗi tải danh sách lớp học.');
    } finally {
      setLoading(false);
    }
  };

  const loadSchedules = async (classId: number) => {
    try {
      const data = await trainingService.getSchedulesByClass(classId);
      setSchedules(data);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Lỗi tải lịch học.');
    }
  };

  const loadDatSummary = async () => {
    try {
      const data = await trainingService.getMyDatSummary();
      setDatSummary(data);
    } catch {
      // Học viên chưa có phiên thực hành
    }
  };

  const handleClassChange = (classId: number) => {
    setSelectedClassId(classId);
    loadSchedules(classId);
  };

  const getScheduleTypeLabel = (type: string) => {
    switch (type) {
      case 'THEORY':
        return { label: 'Lý thuyết trên lớp', bg: '#eff6ff', color: '#1d4ed8' };
      case 'PRACTICE_YARD':
        return { label: 'Thực hành Sa hình', bg: '#fef3c7', color: '#b45309' };
      case 'PRACTICE_ROAD':
        return { label: 'Thực hành Đường trường (DAT)', bg: '#dcfce7', color: '#15803d' };
      case 'CABIN_SIMULATION':
        return { label: 'Mô phỏng Cabin điện tử', bg: '#f3e8ff', color: '#7e22ce' };
      default:
        return { label: type, bg: '#f1f5f9', color: '#475569' };
    }
  };

  const distancePercent = datSummary && datSummary.targetDistanceKm > 0
    ? Math.min(100, Math.round((Number(datSummary.totalDistanceKm) / Number(datSummary.targetDistanceKm)) * 100))
    : 0;

  return (
    <div style={{ maxWidth: '1100px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.6rem', color: '#1e3a8a', fontWeight: 700, margin: 0 }}>
          🚗 Kế Hoạch Đào Tạo, Lịch Học & Tiến Độ DAT
        </h2>
        <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: '0.25rem 0 0 0' }}>
          Theo dõi lịch học tập trung, thực hành sa hình, thực hành đường trường và thiết bị giám sát DAT
        </p>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '1.5rem', color: '#64748b' }}>
          Đang tải dữ liệu đào tạo...
        </div>
      )}

      {errorMsg && (
        <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '1rem', color: '#991b1b', marginBottom: '1.5rem', borderRadius: '4px' }}>
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Tiến độ DAT (Nếu đăng nhập) */}
      {isAuthenticated && datSummary && (
        <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', marginBottom: '2rem', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#1e3a8a', margin: 0, fontWeight: 700 }}>
              📊 Tiến Độ Thực Hành Lái Xe Đường Trường DAT (Thiết bị giám sát hành trình)
            </h3>
            <span style={{ background: datSummary.isCompleted ? '#dcfce7' : '#fef3c7', color: datSummary.isCompleted ? '#166534' : '#b45309', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700 }}>
              {datSummary.isCompleted ? '✓ ĐỦ ĐIỀU KIỆN DỰ THI' : 'CHƯA ĐỦ ĐIỀU KIỆN DỰ THI'}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Quãng đường tích lũy</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e40af' }}>
                {datSummary.totalDistanceKm} / {datSummary.targetDistanceKm} km
              </div>
            </div>
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Thời gian thực hành</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e40af' }}>
                {(datSummary.totalDurationMinutes / 60).toFixed(1)} / {(datSummary.targetDurationMinutes / 60).toFixed(0)} giờ
              </div>
            </div>
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Số phiên thực hành</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e40af' }}>
                {datSummary.totalSessions} phiên
              </div>
            </div>
          </div>

          {/* Thanh tiến trình */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
              <span>Tiến độ hoàn thành quãng đường DAT:</span>
              <span>{distancePercent}%</span>
            </div>
            <div style={{ width: '100%', height: '10px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ width: `${distancePercent}%`, height: '100%', background: '#2563eb', transition: 'width 0.4s ease' }} />
            </div>
          </div>
        </div>
      )}

      {/* Chọn lớp học để xem lịch */}
      <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#1f2937', margin: 0, fontWeight: 700 }}>
            📅 Lịch Học Tập & Lịch Thực Hành Theo Khóa
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#475569' }}>Lớp đào tạo:</label>
            <select
              value={selectedClassId}
              onChange={(e) => handleClassChange(Number(e.target.value))}
              style={{ padding: '0.45rem 0.85rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.9rem' }}
            >
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name} ({cls.classCode})
                </option>
              ))}
            </select>
          </div>
        </div>

        {schedules.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
            Chưa có lịch học nào được sắp xếp cho lớp này.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {schedules.map((s) => {
              const badge = getScheduleTypeLabel(s.scheduleType);
              const start = new Date(s.startTime);
              const end = new Date(s.endTime);
              return (
                <div
                  key={s.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem 1.25rem',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 700, color: '#1e3a8a', fontSize: '1.05rem' }}>{s.title}</span>
                      <span style={{ background: badge.bg, color: badge.color, padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                        {badge.label}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      📍 Địa điểm: <strong>{s.location}</strong>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 600, color: '#1f2937', fontSize: '0.95rem' }}>
                      {start.toLocaleDateString('vi-VN')}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      {start.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} — {end.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
