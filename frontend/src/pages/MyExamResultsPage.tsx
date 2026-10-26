import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { examinationService } from '../services/examinationService';
import type { ExamResultDetail } from '../types/examination';
import {
  PageHeader,
  StatusBadge,
  Alert,
  LoadingSpinner,
  EmptyState,
} from '../components/ui';

export const MyExamResultsPage: React.FC = () => {
  const [results, setResults] = useState<ExamResultDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyResults = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await examinationService.getMyResults();
        setResults(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Không thể tải kết quả thi của bạn.');
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Lỗi không xác định khi tải kết quả thi.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMyResults();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title="Tra Cứu Kết Quả Thi Sát Hạch Cá Nhân"
        description="Xem chi tiết điểm số từng nội dung thi, số báo danh và quyết định công nhận kết quả cấp GPLX."
      />

      {loading && (
        <div style={{ padding: '60px 0', textAlign: 'center' }}>
          <LoadingSpinner size="lg" text="Đang tra cứu lịch sử thi sát hạch..." />
        </div>
      )}

      {error && (
        <Alert
          type="danger"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {!loading && results.length === 0 ? (
        <EmptyState
          icon="🏆"
          title="Chưa có kết quả sát hạch"
          description="Bạn chưa tham gia kỳ thi tốt nghiệp hoặc sát hạch nào trong hệ thống."
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {results.map((r, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                padding: 'var(--space-6)',
                boxShadow: 'var(--shadow-xs)',
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
                    Kỳ thi: {r.examCode} — Hạng {r.categoryCode}
                  </h3>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                    Số báo danh (SBD): <strong style={{ color: 'var(--color-primary)' }}>{r.candidateNumber}</strong>
                  </div>
                </div>

                <div>
                  <StatusBadge
                    variant={r.finalResult === 'PASSED' ? 'success' : r.finalResult === 'FAILED' ? 'danger' : 'default'}
                    label={
                      r.finalResult === 'PASSED'
                        ? '🏆 ĐẠT SÁT HẠCH'
                        : r.finalResult === 'FAILED'
                        ? '❌ KHÔNG ĐẠT'
                        : '⏳ ĐANG CHỜ KẾT QUẢ'
                    }
                  />
                </div>
              </div>

              {/* Bảng 4 môn thi */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: 'var(--space-3)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                <div style={{ padding: 'var(--space-3) var(--space-4)', backgroundColor: 'var(--color-bg-app)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>1. Lý thuyết</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '2px' }}>
                    {r.theoryScore !== null && r.theoryScore !== undefined ? `${r.theoryScore} điểm` : 'Chưa thi'}
                  </div>
                  {r.theoryPassed !== null && r.theoryPassed !== undefined && (
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: r.theoryPassed ? 'var(--color-success)' : 'var(--color-danger)' }}>
                      {r.theoryPassed ? '✓ Đạt' : '✗ Không đạt'}
                    </div>
                  )}
                </div>

                <div style={{ padding: 'var(--space-3) var(--space-4)', backgroundColor: 'var(--color-bg-app)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>2. Mô phỏng tình huống</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '2px' }}>
                    {r.simulationScore !== null && r.simulationScore !== undefined ? `${r.simulationScore} điểm` : 'Không áp dụng'}
                  </div>
                  {r.simulationPassed !== null && r.simulationPassed !== undefined && (
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: r.simulationPassed ? 'var(--color-success)' : 'var(--color-danger)' }}>
                      {r.simulationPassed ? '✓ Đạt' : '✗ Không đạt'}
                    </div>
                  )}
                </div>

                <div style={{ padding: 'var(--space-3) var(--space-4)', backgroundColor: 'var(--color-bg-app)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>3. Thực hành Sa hình</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '2px' }}>
                    {r.yardScore !== null && r.yardScore !== undefined ? `${r.yardScore} điểm` : 'Chưa thi'}
                  </div>
                  {r.yardPassed !== null && r.yardPassed !== undefined && (
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: r.yardPassed ? 'var(--color-success)' : 'var(--color-danger)' }}>
                      {r.yardPassed ? '✓ Đạt' : '✗ Không đạt'}
                    </div>
                  )}
                </div>

                <div style={{ padding: 'var(--space-3) var(--space-4)', backgroundColor: 'var(--color-bg-app)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>4. Đường trường</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-main)', marginTop: '2px' }}>
                    {r.roadScore !== null && r.roadScore !== undefined ? `${r.roadScore} điểm` : 'Không áp dụng'}
                  </div>
                  {r.roadPassed !== null && r.roadPassed !== undefined && (
                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: r.roadPassed ? 'var(--color-success)' : 'var(--color-danger)' }}>
                      {r.roadPassed ? '✓ Đạt' : '✗ Không đạt'}
                    </div>
                  )}
                </div>
              </div>

              {r.examinerNote && (
                <div
                  style={{
                    padding: 'var(--space-3) var(--space-4)',
                    backgroundColor: 'var(--color-warning-bg)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-warning-border)',
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-warning)',
                  }}
                >
                  <strong>Nhận xét của Hội đồng sát hạch:</strong> {r.examinerNote}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default MyExamResultsPage;
