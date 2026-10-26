import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { examinationService } from '../services/examinationService';
import type { ExamSession, CandidateResponse, ExamResultDetail, RecordExamScoreRequest } from '../types/examination';
import {
  PageHeader,
  AppSelect,
  AppInput,
  AppTextarea,
  AppButton,
  StatusBadge,
  Alert,
  LoadingSpinner,
  EmptyState,
} from '../components/ui';

export const ExamGradingPage: React.FC = () => {
  const [sessions, setSessions] = useState<ExamSession[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<number>(0);
  const [candidates, setCandidates] = useState<CandidateResponse[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateResponse | null>(null);
  const [candidateResult, setCandidateResult] = useState<ExamResultDetail | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form chấm điểm
  const [theoryScore, setTheoryScore] = useState<number>(30);
  const [simulationScore, setSimulationScore] = useState<number>(40);
  const [yardScore, setYardScore] = useState<number>(90);
  const [roadScore, setRoadScore] = useState<number>(85);
  const [examinerNote, setExaminerNote] = useState<string>('');

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await examinationService.getExamSessions();
        setSessions(data);
        if (data.length > 0 && data[0]) {
          setSelectedSessionId(data[0].id);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Không thể tải danh sách kỳ thi');
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Lỗi không xác định khi tải danh sách kỳ thi');
        }
      }
    };
    fetchSessions();
  }, []);

  const fetchCandidates = async (sessionId: number) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedCandidate(null);
      setCandidateResult(null);
      const data = await examinationService.getCandidatesBySession(sessionId);
      setCandidates(data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Không thể tải danh sách thí sinh.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Lỗi không xác định khi tải danh sách thí sinh');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedSessionId) {
      fetchCandidates(selectedSessionId);
    }
  }, [selectedSessionId]);

  const handleSelectCandidate = async (cand: CandidateResponse) => {
    setSelectedCandidate(cand);
    setSuccessMsg(null);
    setError(null);
    try {
      const res = await examinationService.getCandidateResult(cand.id);
      setCandidateResult(res);
      if (res.theoryScore !== undefined && res.theoryScore !== null) setTheoryScore(res.theoryScore);
      if (res.simulationScore !== undefined && res.simulationScore !== null) setSimulationScore(res.simulationScore);
      if (res.yardScore !== undefined && res.yardScore !== null) setYardScore(res.yardScore);
      if (res.roadScore !== undefined && res.roadScore !== null) setRoadScore(res.roadScore);
      if (res.examinerNote) setExaminerNote(res.examinerNote);
    } catch {
      setCandidateResult(null);
    }
  };

  const handleGradeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCandidate) return;

    try {
      setLoading(true);
      setError(null);
      setSuccessMsg(null);

      const request: RecordExamScoreRequest = {
        theoryScore: Number(theoryScore),
        simulationScore: Number(simulationScore),
        yardScore: Number(yardScore),
        roadScore: Number(roadScore),
        examinerNote: examinerNote.trim(),
      };

      const result = await examinationService.recordScore(selectedCandidate.id, request);
      setCandidateResult(result);
      setSuccessMsg(
        `Đã ghi nhận điểm thành công cho SBD ${selectedCandidate.candidateNumber}! Kết quả chung: ${
          result.finalResult === 'PASSED' ? 'ĐẠT (PASSED)' : 'KHÔNG ĐẠT (FAILED)'
        }`
      );

      // Reload candidates list
      fetchCandidates(selectedSessionId);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Có lỗi xảy ra khi lưu bảng điểm.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Lỗi không xác định khi lưu bảng điểm');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title="Bảng Chấm Điểm Sát Hạch & Nhập Kết Quả Thi (EXM-002)"
        description="Dành cho Giám thị / Sát hạch viên — Nhập điểm 4 môn sát hạch: Lý thuyết, Mô phỏng tình huống, Sa hình và Đường trường."
      />

      {/* Chọn Kỳ thi */}
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          padding: 'var(--space-4) var(--space-5)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-xs)',
        }}
      >
        <AppSelect
          label="Chọn kỳ thi sát hạch"
          value={selectedSessionId}
          onChange={(e) => setSelectedSessionId(Number(e.target.value))}
          options={sessions.map((s) => ({
            value: s.id,
            label: `${s.name} (${s.examCode}) — Hạng ${s.categoryCode} — Ngày thi: ${s.examDate}`,
          }))}
        />
      </div>

      {successMsg && (
        <Alert
          type="success"
          message={successMsg}
          onClose={() => setSuccessMsg(null)}
        />
      )}

      {error && (
        <Alert
          type="danger"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 1fr) minmax(400px, 1.4fr)',
          gap: 'var(--space-6)',
          alignItems: 'start',
        }}
      >
        {/* Cột trái: Danh sách thí sinh */}
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            padding: 'var(--space-5)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 'var(--space-4)' }}>
            Danh sách thí sinh ({candidates.length})
          </h3>

          {loading ? (
            <div style={{ padding: '20px 0', textAlign: 'center' }}>
              <LoadingSpinner size="sm" text="Đang tải danh sách..." />
            </div>
          ) : candidates.length === 0 ? (
            <EmptyState
              icon="👥"
              title="Không có thí sinh"
              description="Chưa có thí sinh nào đăng ký trong kỳ thi này."
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {candidates.map((c) => {
                const isSelected = selectedCandidate?.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => handleSelectCandidate(c)}
                    style={{
                      padding: 'var(--space-3) var(--space-4)',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected
                        ? '2px solid var(--color-primary)'
                        : '1px solid var(--color-border)',
                      backgroundColor: isSelected ? 'var(--color-primary-light)' : 'var(--color-bg-app)',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--color-text-main)', fontSize: '0.95rem' }}>
                        {c.candidateNumber}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Thí sinh #{c.userId}
                      </div>
                      {c.eligibilityStatus === 'DISQUALIFIED' && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-danger)', marginTop: '2px' }}>
                          ⚠️ Bị truất quyền: {c.disqualificationReason}
                        </div>
                      )}
                    </div>
                    <div>
                      <StatusBadge type="exam" status={c.finalResult} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Cột phải: Form chấm điểm 4 môn */}
        <div
          style={{
            backgroundColor: 'var(--color-surface)',
            padding: 'var(--space-6)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-xs)',
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 'var(--space-4)' }}>
            {selectedCandidate
              ? `Bảng điểm chi tiết: ${selectedCandidate.candidateNumber}`
              : 'Chọn thí sinh từ danh sách để chấm điểm'}
          </h3>

          {selectedCandidate ? (
            <form onSubmit={handleGradeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {selectedCandidate.eligibilityStatus === 'DISQUALIFIED' && (
                <Alert
                  type="danger"
                  message="Thí sinh bị loại khỏi danh sách thi do không đáp ứng điều kiện dự thi bắt buộc."
                />
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                <div>
                  <AppInput
                    label="1. Lý thuyết (Thang 30/35, Đạt ≥ 27)"
                    type="number"
                    min="0"
                    max="35"
                    value={theoryScore}
                    onChange={(e) => setTheoryScore(Number(e.target.value))}
                    disabled={selectedCandidate.eligibilityStatus === 'DISQUALIFIED'}
                  />
                  {candidateResult?.theoryPassed !== undefined && (
                    <div style={{ marginTop: '4px', fontSize: '0.75rem' }}>
                      <StatusBadge
                        variant={candidateResult.theoryPassed ? 'success' : 'danger'}
                        label={candidateResult.theoryPassed ? '✓ Đạt lý thuyết' : '✗ Trượt lý thuyết'}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <AppInput
                    label="2. Mô phỏng tình huống (Thang 50, Đạt ≥ 35)"
                    type="number"
                    min="0"
                    max="50"
                    value={simulationScore}
                    onChange={(e) => setSimulationScore(Number(e.target.value))}
                    disabled={selectedCandidate.eligibilityStatus === 'DISQUALIFIED'}
                  />
                  {candidateResult?.simulationPassed !== undefined && (
                    <div style={{ marginTop: '4px', fontSize: '0.75rem' }}>
                      <StatusBadge
                        variant={candidateResult.simulationPassed ? 'success' : 'danger'}
                        label={candidateResult.simulationPassed ? '✓ Đạt mô phỏng' : '✗ Trượt mô phỏng'}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <AppInput
                    label="3. Thực hành Sa hình (Thang 100, Đạt ≥ 80)"
                    type="number"
                    min="0"
                    max="100"
                    value={yardScore}
                    onChange={(e) => setYardScore(Number(e.target.value))}
                    disabled={selectedCandidate.eligibilityStatus === 'DISQUALIFIED'}
                  />
                  {candidateResult?.yardPassed !== undefined && (
                    <div style={{ marginTop: '4px', fontSize: '0.75rem' }}>
                      <StatusBadge
                        variant={candidateResult.yardPassed ? 'success' : 'danger'}
                        label={candidateResult.yardPassed ? '✓ Đạt sa hình' : '✗ Trượt sa hình'}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <AppInput
                    label="4. Đường trường (Thang 100, Đạt ≥ 80)"
                    type="number"
                    min="0"
                    max="100"
                    value={roadScore}
                    onChange={(e) => setRoadScore(Number(e.target.value))}
                    disabled={selectedCandidate.eligibilityStatus === 'DISQUALIFIED'}
                  />
                  {candidateResult?.roadPassed !== undefined && (
                    <div style={{ marginTop: '4px', fontSize: '0.75rem' }}>
                      <StatusBadge
                        variant={candidateResult.roadPassed ? 'success' : 'danger'}
                        label={candidateResult.roadPassed ? '✓ Đạt đường trường' : '✗ Trượt đường trường'}
                      />
                    </div>
                  )}
                </div>
              </div>

              <AppTextarea
                label="Nhận xét của Sát hạch viên"
                placeholder="Ghi chú thao tác, lỗi chạm vạch sa hình, tốc độ hoặc lý do trừ điểm..."
                value={examinerNote}
                onChange={(e) => setExaminerNote(e.target.value)}
                disabled={selectedCandidate.eligibilityStatus === 'DISQUALIFIED'}
              />

              {candidateResult && (
                <div
                  style={{
                    padding: 'var(--space-3) var(--space-4)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor:
                      candidateResult.finalResult === 'PASSED'
                        ? 'var(--color-success-bg)'
                        : candidateResult.finalResult === 'FAILED'
                        ? 'var(--color-danger-bg)'
                        : 'var(--color-bg-app)',
                    border: `1px solid ${
                      candidateResult.finalResult === 'PASSED'
                        ? 'var(--color-success-border)'
                        : candidateResult.finalResult === 'FAILED'
                        ? 'var(--color-danger-border)'
                        : 'var(--color-border)'
                    }`,
                    fontWeight: 700,
                    textAlign: 'center',
                    fontSize: '1rem',
                    color:
                      candidateResult.finalResult === 'PASSED'
                        ? 'var(--color-success)'
                        : candidateResult.finalResult === 'FAILED'
                        ? 'var(--color-danger)'
                        : 'var(--color-text-main)',
                  }}
                >
                  KẾT LUẬN SÁT HẠCH: {candidateResult.finalResult === 'PASSED' ? '🏆 ĐẠT YÊU CẦU CẤP BẰNG' : candidateResult.finalResult === 'FAILED' ? '❌ KHÔNG ĐẠT SÁT HẠCH' : '⏳ ĐANG CHỜ CHẤM ĐIỂM'}
                </div>
              )}

              <AppButton
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                disabled={selectedCandidate.eligibilityStatus === 'DISQUALIFIED'}
                fullWidth
                icon="💾"
              >
                Xác nhận & Lưu Bảng Điểm Sát Hạch
              </AppButton>
            </form>
          ) : (
            <EmptyState
              icon="✍️"
              title="Chưa chọn thí sinh"
              description="Vui lòng bấm chọn một thí sinh từ danh sách bên trái để nhập điểm và kết luận."
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default ExamGradingPage;
