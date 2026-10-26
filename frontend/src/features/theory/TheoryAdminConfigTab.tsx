import React, { useState, useEffect } from 'react';
import { learningService } from '../../services/learningService';
import type { ExamConfiguration } from '../../types/learning';
import { AppButton, AppInput, LoadingSpinner, Alert, Modal } from '../../components/ui';

export const TheoryAdminConfigTab: React.FC = () => {
  const [configs, setConfigs] = useState<ExamConfiguration[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  const [editingConfig, setEditingConfig] = useState<ExamConfiguration | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    loadConfigs();
  }, []);

  const loadConfigs = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const data = await learningService.getExamConfigurations();
      setConfigs(data);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Không thể tải cấu hình đề thi.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveConfig = async () => {
    if (!editingConfig) return;
    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const updated = await learningService.updateExamConfig(editingConfig.id, editingConfig);
      setConfigs((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      setSuccessMsg(`Đã cập nhật cấu hình đề thi hạng ${updated.categoryCode} thành công!`);
      setEditingConfig(null);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Lỗi khi lưu cấu hình.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Đang tải cấu hình đề thi các hạng..." />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '1.5rem',
          border: '1px solid #e2e8f0',
        }}
      >
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>
          ⚙️ Quản trị Cấu hình Đề thi Sát hạch theo Hạng GPLX
        </h3>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
          Quản lý số lượng câu hỏi, thời gian làm bài, điểm sàn đạt và căn cứ văn bản quy phạm pháp luật cho từng hạng.
        </p>
      </div>

      {successMsg && <Alert type="success" message={successMsg} />}
      {errorMsg && <Alert type="danger" message={errorMsg} />}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {configs.map((c) => (
          <div
            key={c.id}
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  background: '#1e3a8a',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '6px',
                }}
              >
                Hạng {c.categoryCode}
              </span>
              <span
                style={{
                  padding: '0.2rem 0.6rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  background: c.active ? '#dcfce7' : '#fee2e2',
                  color: c.active ? '#15803d' : '#b91c1c',
                }}
              >
                {c.active ? 'Đang hiệu lực' : 'Tạm ngưng'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.9rem' }}>
              <div>
                <span style={{ color: '#64748b', display: 'block' }}>Số câu hỏi:</span>
                <strong style={{ fontSize: '1.1rem', color: '#1e293b' }}>{c.totalQuestions} câu</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block' }}>Thời gian thi:</span>
                <strong style={{ fontSize: '1.1rem', color: '#1e293b' }}>{c.durationMinutes} phút</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block' }}>Điểm đạt tối thiểu:</span>
                <strong style={{ fontSize: '1.1rem', color: '#059669' }}>
                  {c.passingScore} / {c.totalQuestions}
                </strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block' }}>Phiên bản quy chế:</span>
                <span style={{ fontWeight: 600, color: '#475569' }}>{c.rulesVersion}</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem', fontSize: '0.85rem', color: '#64748b' }}>
              📜 <strong>Nguồn căn cứ:</strong> {c.legalSource}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
              <AppButton
                variant="secondary"
                size="sm"
                onClick={() => setEditingConfig({ ...c })}
                style={{ width: '100%' }}
              >
                ✏️ Điều chỉnh thông số
              </AppButton>
            </div>
          </div>
        ))}
      </div>

      {/* Modal chỉnh sửa cấu hình */}
      {editingConfig && (
        <Modal
          isOpen={true}
          onClose={() => setEditingConfig(null)}
          title={`Điều chỉnh cấu hình thi sát hạch Hạng ${editingConfig.categoryCode}`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                Tổng số câu hỏi trong đề:
              </label>
              <AppInput
                type="number"
                value={editingConfig.totalQuestions}
                onChange={(e) =>
                  setEditingConfig({ ...editingConfig, totalQuestions: parseInt(e.target.value) || 0 })
                }
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                Thời gian làm bài (phút):
              </label>
              <AppInput
                type="number"
                value={editingConfig.durationMinutes}
                onChange={(e) =>
                  setEditingConfig({ ...editingConfig, durationMinutes: parseInt(e.target.value) || 0 })
                }
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                Điểm sàn đạt yêu cầu (số câu đúng tối thiểu):
              </label>
              <AppInput
                type="number"
                value={editingConfig.passingScore}
                onChange={(e) =>
                  setEditingConfig({ ...editingConfig, passingScore: parseInt(e.target.value) || 0 })
                }
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                Nguồn căn cứ văn bản pháp lý:
              </label>
              <AppInput
                value={editingConfig.legalSource}
                onChange={(e) =>
                  setEditingConfig({ ...editingConfig, legalSource: e.target.value })
                }
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
              <AppButton variant="secondary" onClick={() => setEditingConfig(null)}>
                Hủy bỏ
              </AppButton>
              <AppButton variant="primary" onClick={handleSaveConfig} disabled={saving}>
                {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
              </AppButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
