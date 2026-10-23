import React, { useState, useEffect } from 'react';
import { examinationService } from '../services/examinationService';
import { ExamResultDetail } from '../types/examination';

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
      } catch (err: any) {
        setError(err.response?.data?.message || 'Không thể tải kết quả thi của bạn.');
      } finally {
        setLoading(false);
      }
    };
    fetchMyResults();
  }, []);

  return (
    <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b' }}>
          Tra cứu kết quả thi sát hạch cá nhân
        </h1>
        <p style={{ color: '#64748b', marginTop: '4px' }}>
          Xem chi tiết điểm số từng nội dung thi, số báo danh và quyết định công nhận kết quả cấp GPLX
        </p>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Đang tải lịch sử thi...</div>
      )}

      {error && (
        <div style={{ padding: '14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#b91c1c', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      {!loading && results.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', background: '#f8fafc', borderRadius: '12px', color: '#94a3b8' }}>
          Bạn chưa tham gia kỳ thi sát hạch hoặc tốt nghiệp nào.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {results.map((r, idx) => (
            <div
              key={idx}
              style={{
                background: '#fff',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                padding: '24px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
                    Kỳ thi: {r.examCode} - Hạng {r.categoryCode}
                  </h3>
                  <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                    Số báo danh (SBD): <strong style={{ color: '#2563eb' }}>{r.candidateNumber}</strong>
                  </div>
                </div>

                <div>
                  <span style={{
                    fontSize: '13px',
                    fontWeight: 'bold',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    background: r.finalResult === 'PASSED' ? '#dcfce7' : r.finalResult === 'FAILED' ? '#fee2e2' : '#f1f5f9',
                    color: r.finalResult === 'PASSED' ? '#15803d' : r.finalResult === 'FAILED' ? '#b91c1c' : '#475569'
                  }}>
                    {r.finalResult === 'PASSED' ? '🏆 ĐẠT SÁT HẠCH' : r.finalResult === 'FAILED' ? '❌ KHÔNG ĐẠT' : '⏳ ĐANG CHỜ KẾT QUẢ'}
                  </span>
                </div>
              </div>

              {/* Bảng 4 môn thi */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>1. Lý thuyết</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e293b', marginTop: '4px' }}>
                    {r.theoryScore !== null && r.theoryScore !== undefined ? `${r.theoryScore} điểm` : 'Chưa thi'}
                  </div>
                  {r.theoryPassed !== null && r.theoryPassed !== undefined && (
                    <div style={{ fontSize: '12px', fontWeight: 600, color: r.theoryPassed ? '#16a34a' : '#dc2626' }}>
                      {r.theoryPassed ? '✓ Đạt' : '✗ Không đạt'}
                    </div>
                  )}
                </div>

                <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>2. Mô phỏng</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e293b', marginTop: '4px' }}>
                    {r.simulationScore !== null && r.simulationScore !== undefined ? `${r.simulationScore} điểm` : 'Không áp dụng'}
                  </div>
                  {r.simulationPassed !== null && r.simulationPassed !== undefined && (
                    <div style={{ fontSize: '12px', fontWeight: 600, color: r.simulationPassed ? '#16a34a' : '#dc2626' }}>
                      {r.simulationPassed ? '✓ Đạt' : '✗ Không đạt'}
                    </div>
                  )}
                </div>

                <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>3. Thực hành sa hình</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e293b', marginTop: '4px' }}>
                    {r.yardScore !== null && r.yardScore !== undefined ? `${r.yardScore} điểm` : 'Chưa thi'}
                  </div>
                  {r.yardPassed !== null && r.yardPassed !== undefined && (
                    <div style={{ fontSize: '12px', fontWeight: 600, color: r.yardPassed ? '#16a34a' : '#dc2626' }}>
                      {r.yardPassed ? '✓ Đạt' : '✗ Không đạt'}
                    </div>
                  )}
                </div>

                <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>4. Đường trường</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e293b', marginTop: '4px' }}>
                    {r.roadScore !== null && r.roadScore !== undefined ? `${r.roadScore} điểm` : 'Không áp dụng'}
                  </div>
                  {r.roadPassed !== null && r.roadPassed !== undefined && (
                    <div style={{ fontSize: '12px', fontWeight: 600, color: r.roadPassed ? '#16a34a' : '#dc2626' }}>
                      {r.roadPassed ? '✓ Đạt' : '✗ Không đạt'}
                    </div>
                  )}
                </div>
              </div>

              {r.examinerNote && (
                <div style={{ padding: '10px 14px', background: '#fefce8', borderRadius: '6px', border: '1px solid #fef08a', fontSize: '13px', color: '#854d0e' }}>
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
