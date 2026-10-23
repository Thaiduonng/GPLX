import React, { useState, useEffect } from 'react';
import { examinationService } from '../services/examinationService';
import { admissionService } from '../services/admissionService';
import { ExamSession, ExamType } from '../types/examination';
import { LicenseCategory } from '../types/admission';
import { useAuth } from '../features/auth/AuthContext';

export const ExamSessionsPage: React.FC = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<ExamSession[]>([]);
  const [categories, setCategories] = useState<LicenseCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Modal tạo kỳ thi
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number>(0);
  const [examDate, setExamDate] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [examType, setExamType] = useState<ExamType>('CERTIFICATION');

  const isAdminOrManager = user?.roles.some(r => r === 'ROLE_ADMIN' || r === 'ROLE_MANAGER');

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [sessionsData, catsData] = await Promise.all([
        examinationService.getExamSessions(),
        admissionService.getCategories()
      ]);
      setSessions(sessionsData);
      setCategories(catsData);
      if (catsData.length > 0) {
        setCategoryId(catsData[0].id);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể tải danh sách kỳ thi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRegister = async (sessionId: number) => {
    try {
      setActionMessage(null);
      setError(null);
      const response = await examinationService.registerCandidate(sessionId);
      if (response.eligibilityStatus === 'QUALIFIED') {
        setActionMessage(`Đăng ký thành công! Số báo danh (SBD) của bạn là: ${response.candidateNumber}`);
      } else {
        setError(`Bạn được ghi nhận vào danh sách nhưng CHƯA ĐỦ ĐIỀU KIỆN DỰ THI (${response.disqualificationReason})`);
      }
      loadData();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng ký dự thi thất bại.');
    }
  };

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      await examinationService.createExamSession({
        name,
        categoryId: Number(categoryId),
        examDate,
        location,
        examType
      });
      setShowCreateModal(false);
      setName('');
      setExamDate('');
      setLocation('');
      setActionMessage('Đã tạo kỳ thi sát hạch thành công!');
      loadData();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi tạo kỳ thi.');
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b' }}>
            Kỳ thi sát hạch & Tốt nghiệp GPLX
          </h1>
          <p style={{ color: '#64748b', marginTop: '4px' }}>
            Quản lý hội đồng thi, danh sách kỳ sát hạch chính thức và đăng ký thi cấp GPLX
          </p>
        </div>
        {isAdminOrManager && (
          <button
            onClick={() => setShowCreateModal(true)}
            style={{
              padding: '10px 18px',
              backgroundColor: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            + Tạo kỳ thi mới
          </button>
        )}
      </div>

      {actionMessage && (
        <div style={{ padding: '14px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', color: '#166534', marginBottom: '16px' }}>
          {actionMessage}
        </div>
      )}

      {error && (
        <div style={{ padding: '14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#b91c1c', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Đang tải danh sách kỳ thi...</div>
      ) : sessions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', background: '#f8fafc', borderRadius: '12px', color: '#94a3b8' }}>
          Hiện chưa có kỳ thi nào được lên kế hoạch.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
          {sessions.map((session) => (
            <div
              key={session.id}
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: session.examType === 'CERTIFICATION' ? '#fef3c7' : '#e0e7ff',
                    color: session.examType === 'CERTIFICATION' ? '#92400e' : '#3730a3'
                  }}>
                    {session.examType === 'CERTIFICATION' ? 'Sát hạch Sở GTVT' : 'Thi tốt nghiệp'}
                  </span>
                  <span style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    background: session.status === 'PLANNED' ? '#dbeafe' : '#f1f5f9',
                    color: session.status === 'PLANNED' ? '#1d4ed8' : '#475569'
                  }}>
                    {session.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '6px' }}>
                  {session.name}
                </h3>
                <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>
                  Mã kỳ thi: <strong>{session.examCode}</strong> | Hạng: <strong style={{ color: '#2563eb' }}>{session.categoryCode}</strong>
                </div>

                <div style={{ fontSize: '14px', color: '#334155', lineHeight: '1.6', marginBottom: '16px' }}>
                  <div>📅 Ngày thi: <strong>{session.examDate}</strong></div>
                  <div>📍 Địa điểm: <strong>{session.location}</strong></div>
                  <div>👥 Thí sinh đăng ký: <strong>{session.candidateCount} người</strong></div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => handleRegister(session.id)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: '#10b981',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Đăng ký dự thi
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal tạo kỳ thi mới */}
      {showCreateModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', padding: '28px', borderRadius: '12px', width: '500px', maxWidth: '90%' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', color: '#1e293b' }}>
              Tạo kỳ thi sát hạch / tốt nghiệp mới
            </h2>
            <form onSubmit={handleCreateSession}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>
                  Tên kỳ thi:
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Kỳ Sát Hạch GPLX Hạng B1 Đợt 2"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>
                  Hạng GPLX:
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.code} - {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>
                  Loại kỳ thi:
                </label>
                <select
                  value={examType}
                  onChange={(e) => setExamType(e.target.value as ExamType)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                >
                  <option value="CERTIFICATION">Sát hạch chính thức (Sở GTVT cấp bằng)</option>
                  <option value="GRADUATION">Thi tốt nghiệp (Cấp chứng chỉ nghề cơ sở)</option>
                </select>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>
                  Ngày tổ chức thi:
                </label>
                <input
                  type="date"
                  required
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>
                  Địa điểm tổ chức:
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ví dụ: Trung tâm Sát hạch Lái xe Quốc gia"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  style={{ padding: '8px 16px', background: '#f1f5f9', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Lưu kỳ thi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
