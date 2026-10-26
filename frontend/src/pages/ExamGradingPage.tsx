import React, { useState, useEffect } from 'react';
import { examinationService } from '../services/examinationService';
import { ExamSession, CandidateResponse, ExamResultDetail, RecordExamScoreRequest } from '../types/examination';

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
      } catch (err: any) {
        setError('Không thể tải danh sách kỳ thi');
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
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể tải danh sách thí sinh.');
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
    } catch (err) {
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
        examinerNote
      };

      const result = await examinationService.recordScore(selectedCandidate.id, request);
      setCandidateResult(result);
      setSuccessMsg(`Đã ghi nhận điểm thành công cho SBD ${selectedCandidate.candidateNumber}! Kết quả: ${result.finalResult === 'PASSED' ? 'ĐẠT (PASSED)' : 'KHÔNG ĐẠT (FAILED)'}`);

      // Reload candidates list
      fetchCandidates(selectedSessionId);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi lưu bảng điểm.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b' }}>
          Bảng chấm điểm sát hạch & Nhập kết quả thi (EXM-002)
        </h1>
        <p style={{ color: '#64748b', marginTop: '4px' }}>
          Dành cho Giám thị / Sát hạch viên — Kết quả thi được lưu vĩnh viễn và không được xóa bản ghi
        </p>
      </div>

      {/* Chọn Kỳ thi */}
      <div style={{ background: '#fff', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
          Chọn kỳ thi sát hạch:
        </label>
        <select
          value={selectedSessionId}
          onChange={(e) => setSelectedSessionId(Number(e.target.value))}
          style={{ width: '100%', maxWidth: '500px', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
        >
          {sessions.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.examCode}) - Hạng {s.categoryCode} - Ngày {s.examDate}
            </option>
          ))}
        </select>
      </div>

      {successMsg && (
        <div style={{ padding: '14px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', color: '#166534', marginBottom: '16px' }}>
          {successMsg}
        </div>
      )}

      {error && (
        <div style={{ padding: '14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#b91c1c', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '24px' }}>
        {/* Cột trái: Danh sách thí sinh */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '14px' }}>
            Danh sách thí sinh ({candidates.length})
          </h2>

          {loading && <div style={{ color: '#64748b' }}>Đang tải danh sách...</div>}

          {!loading && candidates.length === 0 ? (
            <div style={{ color: '#94a3b8', textAlign: 'center', padding: '30px' }}>Chưa có thí sinh đăng ký trong kỳ thi này.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {candidates.map((c) => (
                <div
                  key={c.id}
                  onClick={() => handleSelectCandidate(c)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: selectedCandidate?.id === c.id ? '2px solid #2563eb' : '1px solid #e2e8f0',
                    background: selectedCandidate?.id === c.id ? '#eff6ff' : '#f8fafc',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#1e293b' }}>{c.candidateNumber}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>User ID: {c.userId}</div>
                    {c.eligibilityStatus === 'DISQUALIFIED' && (
                      <div style={{ fontSize: '11px', color: '#b91c1c' }}>⚠️ Không đủ điều kiện: {c.disqualificationReason}</div>
                    )}
                  </div>
                  <div>
                    <span style={{
                      fontSize: '11px',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontWeight: 600,
                      background: c.finalResult === 'PASSED' ? '#dcfce7' : c.finalResult === 'FAILED' ? '#fee2e2' : '#f1f5f9',
                      color: c.finalResult === 'PASSED' ? '#15803d' : c.finalResult === 'FAILED' ? '#b91c1c' : '#475569'
                    }}>
                      {c.finalResult}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cột phải: Form chấm điểm 4 môn */}
        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>
            {selectedCandidate ? `Bảng điểm: ${selectedCandidate.candidateNumber}` : 'Chọn thí sinh để chấm điểm'}
          </h2>

          {selectedCandidate ? (
            <form onSubmit={handleGradeSubmit}>
              {selectedCandidate.eligibilityStatus === 'DISQUALIFIED' && (
                <div style={{ padding: '12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#b91c1c', marginBottom: '16px', fontSize: '13px' }}>
                  Thí sinh bị loại khỏi danh sách thi do không đáp ứng điều kiện dự thi tự động.
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '13px', marginBottom: '6px' }}>
                    1. Lý thuyết (Thang 30 / Đạt ≥ 27):
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="35"
                    value={theoryScore}
                    onChange={(e) => setTheoryScore(Number(e.target.value))}
                    disabled={selectedCandidate.eligibilityStatus === 'DISQUALIFIED'}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                  {candidateResult?.theoryPassed !== undefined && (
                    <span style={{ fontSize: '12px', fontWeight: 600, color: candidateResult.theoryPassed ? '#16a34a' : '#dc2626' }}>
                      {candidateResult.theoryPassed ? '✓ Đạt' : '✗ Trượt'}
                    </span>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '13px', marginBottom: '6px' }}>
                    2. Mô phỏng tình huống (Thang 50 / Đạt ≥ 35):
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={simulationScore}
                    onChange={(e) => setSimulationScore(Number(e.target.value))}
                    disabled={selectedCandidate.eligibilityStatus === 'DISQUALIFIED'}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                  {candidateResult?.simulationPassed !== undefined && (
                    <span style={{ fontSize: '12px', fontWeight: 600, color: candidateResult.simulationPassed ? '#16a34a' : '#dc2626' }}>
                      {candidateResult.simulationPassed ? '✓ Đạt' : '✗ Trượt'}
                    </span>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '13px', marginBottom: '6px' }}>
                    3. Thực hành Sa hình (Thang 100 / Đạt ≥ 80):
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={yardScore}
                    onChange={(e) => setYardScore(Number(e.target.value))}
                    disabled={selectedCandidate.eligibilityStatus === 'DISQUALIFIED'}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                  {candidateResult?.yardPassed !== undefined && (
                    <span style={{ fontSize: '12px', fontWeight: 600, color: candidateResult.yardPassed ? '#16a34a' : '#dc2626' }}>
                      {candidateResult.yardPassed ? '✓ Đạt' : '✗ Trượt'}
                    </span>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '13px', marginBottom: '6px' }}>
                    4. Thực hành Đường trường (Thang 100 / Đạt ≥ 80):
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={roadScore}
                    onChange={(e) => setRoadScore(Number(e.target.value))}
                    disabled={selectedCandidate.eligibilityStatus === 'DISQUALIFIED'}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                  {candidateResult?.roadPassed !== undefined && (
                    <span style={{ fontSize: '12px', fontWeight: 600, color: candidateResult.roadPassed ? '#16a34a' : '#dc2626' }}>
                      {candidateResult.roadPassed ? '✓ Đạt' : '✗ Trượt'}
                    </span>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '13px', marginBottom: '6px' }}>
                  Nhận xét của Giám thị / Sát hạch viên:
                </label>
                <textarea
                  rows={3}
                  value={examinerNote}
                  onChange={(e) => setExaminerNote(e.target.value)}
                  placeholder="Ghi chú tác phong, lỗi vi phạm thao tác hoặc lý do truất quyền thi..."
                  disabled={selectedCandidate.eligibilityStatus === 'DISQUALIFIED'}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              {candidateResult && (
                <div style={{
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  background: candidateResult.finalResult === 'PASSED' ? '#f0fdf4' : candidateResult.finalResult === 'FAILED' ? '#fef2f2' : '#f8fafc',
                  border: candidateResult.finalResult === 'PASSED' ? '1px solid #bbf7d0' : candidateResult.finalResult === 'FAILED' ? '1px solid #fecaca' : '1px solid #e2e8f0',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  KẾT QUẢ CHUNG: {candidateResult.finalResult === 'PASSED' ? '🏆 ĐẠT SÁT HẠCH' : candidateResult.finalResult === 'FAILED' ? '❌ KHÔNG ĐẠT' : '⏳ ĐANG CHỜ CHẤM ĐIỂM'}
                </div>
              )}

              <button
                type="submit"
                disabled={selectedCandidate.eligibilityStatus === 'DISQUALIFIED' || loading}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: selectedCandidate.eligibilityStatus === 'DISQUALIFIED' ? '#94a3b8' : '#2563eb',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: selectedCandidate.eligibilityStatus === 'DISQUALIFIED' ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Đang lưu kết quả...' : 'Xác nhận & Lưu bảng điểm vĩnh viễn'}
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
              Vui lòng nhấp chọn một thí sinh từ danh sách bên trái để nhập bảng điểm và kết luận kết quả sát hạch.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
