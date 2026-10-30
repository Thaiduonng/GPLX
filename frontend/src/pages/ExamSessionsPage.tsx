import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { examinationService } from '../services/examinationService';
import { admissionService } from '../services/admissionService';
import type { ExamSession, ExamType } from '../types/examination';
import type { LicenseCategory } from '../types/admission';
import { useAuth } from '../features/auth/AuthContext';
import {
  PageHeader,
  Modal,
  AppButton,
  AppInput,
  AppSelect,
  StatusBadge,
  Alert,
  LoadingSpinner,
  EmptyState,
} from '../components/ui';
import { formatDate } from '../utils/formatters';

export const ExamSessionsPage: React.FC = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<ExamSession[]>([]);
  const [categories, setCategories] = useState<LicenseCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [registeringId, setRegisteringId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Modal tạo kỳ thi
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number>(0);
  const [examDate, setExamDate] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [examType, setExamType] = useState<ExamType>('CERTIFICATION');
  const [submittingCreate, setSubmittingCreate] = useState<boolean>(false);

  const canRegisterSelf = user?.roles.includes('ROLE_STUDENT') ?? false;
  const isAdminOrManager = user?.roles?.some((r) => r === 'ROLE_ADMIN' || r === 'ROLE_MANAGER');

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [sessionsData, catsData] = await Promise.all([
        examinationService.getExamSessions(),
        admissionService.getCategories(),
      ]);
      setSessions(sessionsData);
      setCategories(catsData);
      if (catsData.length > 0 && catsData[0]) {
        setCategoryId(catsData[0].id);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Không thể tải danh sách kỳ thi.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Lỗi không xác định khi tải danh sách kỳ thi');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRegister = async (sessionId: number) => {
    try {
      setRegisteringId(sessionId);
      setActionMessage(null);
      setError(null);
      const response = await examinationService.registerCandidate(sessionId);
      if (response.eligibilityStatus === 'QUALIFIED') {
        setActionMessage(`Đăng ký thành công! Số báo danh (SBD) của bạn là: ${response.candidateNumber}`);
      } else {
        setError(`Bạn được ghi nhận vào danh sách nhưng CHƯA ĐỦ ĐIỀU KIỆN DỰ THI (${response.disqualificationReason})`);
      }
      loadData();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Đăng ký dự thi thất bại.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Lỗi không xác định khi đăng ký dự thi');
      }
    } finally {
      setRegisteringId(null);
    }
  };

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmittingCreate(true);
      setError(null);
      await examinationService.createExamSession({
        name: name.trim(),
        categoryId: Number(categoryId),
        examDate,
        location: location.trim(),
        examType,
      });
      setShowCreateModal(false);
      setName('');
      setExamDate('');
      setLocation('');
      setActionMessage('Đã tạo kỳ thi sát hạch thành công!');
      loadData();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Lỗi khi tạo kỳ thi.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Lỗi không xác định khi tạo kỳ thi');
      }
    } finally {
      setSubmittingCreate(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title="Kỳ Thi Sát Hạch & Tốt Nghiệp GPLX"
        description="Quản lý hội đồng thi, danh sách kỳ sát hạch chính thức và tiếp nhận đăng ký thi cấp GPLX."
        actions={
          isAdminOrManager ? (
            <AppButton variant="primary" onClick={() => setShowCreateModal(true)} icon="➕">
              Tạo kỳ thi mới
            </AppButton>
          ) : undefined
        }
      />

      {actionMessage && (
        <Alert
          type="success"
          message={actionMessage}
          onClose={() => setActionMessage(null)}
        />
      )}

      {error && (
        <Alert
          type="danger"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {loading ? (
        <div style={{ padding: '60px 0', textAlign: 'center' }}>
          <LoadingSpinner size="lg" text="Đang tải danh sách các kỳ thi sát hạch..." />
        </div>
      ) : sessions.length === 0 ? (
        <EmptyState
          icon="📋"
          title="Chưa có kỳ thi nào"
          description="Hiện chưa có kỳ thi sát hạch hoặc tốt nghiệp nào được lên kế hoạch."
          action={
            isAdminOrManager ? (
              <AppButton variant="primary" onClick={() => setShowCreateModal(true)}>
                Lên lịch kỳ thi đầu tiên
              </AppButton>
            ) : undefined
          }
        />
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 'var(--space-5)',
          }}
        >
          {sessions.map((session) => (
            <div
              key={session.id}
              style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                padding: 'var(--space-5)',
                boxShadow: 'var(--shadow-xs)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 'var(--space-4)',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  <StatusBadge
                    variant={session.examType === 'CERTIFICATION' ? 'warning' : 'info'}
                    label={session.examType === 'CERTIFICATION' ? 'Sát hạch Sở GTVT' : 'Thi tốt nghiệp'}
                  />
                  <StatusBadge type="exam" status={session.status} />
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>
                  {session.name}
                </h3>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
                  Mã kỳ thi: <strong>{session.examCode}</strong> | Hạng: <strong style={{ color: 'var(--color-primary)' }}>{session.categoryCode}</strong>
                </div>

                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div>📅 Ngày thi: <strong>{formatDate(session.examDate)}</strong></div>
                  <div>📍 Địa điểm: <strong>{session.location}</strong></div>
                  <div>👥 Số thí sinh đã đăng ký: <strong>{session.candidateCount} thí sinh</strong></div>
                </div>
              </div>

              {canRegisterSelf && <AppButton
                variant="success"
                onClick={() => handleRegister(session.id)}
                loading={registeringId === session.id}
                fullWidth
                icon="✍️"
              >
                Đăng ký dự thi
              </AppButton>}
            </div>
          ))}
        </div>
      )}

      {/* Modal tạo kỳ thi */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Tạo kỳ thi sát hạch / tốt nghiệp mới"
      >
        <form onSubmit={handleCreateSession} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <AppInput
            label="Tên kỳ thi"
            required
            placeholder="Ví dụ: Kỳ sát hạch GPLX Khóa 12/2026"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <AppSelect
            label="Hạng đào tạo & sát hạch"
            required
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            options={categories.map((c) => ({
              value: c.id,
              label: `${c.code} — ${c.name}`,
            }))}
          />

          <AppSelect
            label="Hình thức kỳ thi"
            required
            value={examType}
            onChange={(e) => setExamType(e.target.value as ExamType)}
            options={[
              { value: 'CERTIFICATION', label: 'Sát hạch cấp GPLX (Hội đồng Sở GTVT)' },
              { value: 'GRADUATION', label: 'Thi kiểm tra tốt nghiệp cấp chứng chỉ nghề' },
            ]}
          />

          <AppInput
            label="Ngày tổ chức thi"
            type="date"
            required
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
          />

          <AppInput
            label="Địa điểm / Trung tâm sát hạch"
            required
            placeholder="Ví dụ: Trung tâm Sát hạch Lái xe Thành Đô"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: 'var(--space-2)' }}>
            <AppButton variant="outline" type="button" onClick={() => setShowCreateModal(false)}>
              Hủy bỏ
            </AppButton>
            <AppButton variant="primary" type="submit" loading={submittingCreate}>
              Lưu kỳ thi
            </AppButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};
export default ExamSessionsPage;
