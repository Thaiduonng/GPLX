import { useEffect, useState } from 'react';
import { learningService } from '../services/learningService';
import { ExamResult, TheoryQuestion } from '../types/learning';

export default function TheoryExamPage() {
  const [activeTab, setActiveTab] = useState<'PRACTICE' | 'MOCK_EXAM'>('PRACTICE');
  const [category, setCategory] = useState('B1');
  const [questions, setQuestions] = useState<TheoryQuestion[]>([]);
  const [mockQuestions, setMockQuestions] = useState<TheoryQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [examResult, setExamResult] = useState<ExamResult | null>(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    loadPracticeQuestions();
  }, [category]);

  const loadPracticeQuestions = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const data = await learningService.getQuestions(category);
      setQuestions(data);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Không thể tải ngân hàng câu hỏi.');
    } finally {
      setLoading(false);
    }
  };

  const startMockExam = async () => {
    setLoading(true);
    setErrorMsg('');
    setExamResult(null);
    setUserAnswers({});
    try {
      const data = await learningService.generateMockExam(category, 20);
      setMockQuestions(data);
      setActiveTab('MOCK_EXAM');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Không thể tạo đề thi thử.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAnswer = (questionId: number, answerId: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleSubmitExam = async () => {
    setErrorMsg('');
    if (Object.keys(userAnswers).length === 0) {
      setErrorMsg('Vui lòng chọn ít nhất một câu trả lời trước khi nộp bài.');
      return;
    }

    setLoading(true);
    try {
      const result = await learningService.submitMockExam({
        categoryCode: category,
        userAnswers,
      });
      setExamResult(result);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Lỗi nộp bài thi thử.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', color: '#1e3a8a', fontWeight: 700, margin: 0 }}>
            🚦 Ngân Hàng Câu Hỏi & Thi Thử Lý Thuyết GPLX
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: '0.25rem 0 0 0' }}>
            Hệ thống 600 câu hỏi sát hạch chuẩn Tổng cục Đường bộ Việt Nam
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.9rem', fontWeight: 600 }}
          >
            <option value="B1">Hạng B1 (Ô tô tự động)</option>
            <option value="B">Hạng B (Ô tô số sàn/tự động)</option>
            <option value="A1">Hạng A1 (Mô tô đến 125cc)</option>
            <option value="C">Hạng C (Xe tải)</option>
          </select>

          <button
            onClick={() => {
              setActiveTab('PRACTICE');
              loadPracticeQuestions();
            }}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'PRACTICE' ? '#2563eb' : '#e2e8f0',
              color: activeTab === 'PRACTICE' ? 'white' : '#334155',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            📖 Ôn tập
          </button>

          <button
            onClick={startMockExam}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'MOCK_EXAM' ? '#2563eb' : '#e2e8f0',
              color: activeTab === 'MOCK_EXAM' ? 'white' : '#334155',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            ⏱️ Thi thử trực tuyến
          </button>
        </div>
      </div>

      {errorMsg && (
        <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '1rem', color: '#991b1b', marginBottom: '1.5rem', borderRadius: '4px' }}>
          ⚠️ {errorMsg}
        </div>
      )}

      {examResult && (
        <div
          style={{
            background: examResult.passed ? '#f0fdf4' : '#fef2f2',
            border: examResult.passed ? '2px solid #22c55e' : '2px solid #ef4444',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>{examResult.passed ? '🎉' : '❌'}</span>
            <div>
              <h3 style={{ fontSize: '1.4rem', color: examResult.passed ? '#166534' : '#991b1b', margin: 0, fontWeight: 700 }}>
                {examResult.passed ? 'KẾT QUẢ: ĐẠT' : 'KẾT QUẢ: KHÔNG ĐẠT'}
              </h3>
              <p style={{ margin: '0.25rem 0 0 0', color: '#4b5563', fontSize: '0.95rem' }}>
                Số câu đúng: <strong>{examResult.correctAnswers} / {examResult.totalQuestions}</strong> câu (Yêu cầu tối thiểu: {examResult.passingScore} câu đúng)
              </p>
              {examResult.failedDueToParalysisQuestion && (
                <div style={{ color: '#dc2626', fontWeight: 600, marginTop: '0.35rem', fontSize: '0.9rem' }}>
                  ⚠️ BẠN ĐÃ TRẢ LỜI SAI CÂU HỎI ĐIỂM LIỆT! Theo quy chế sát hạch GPLX, sai câu điểm liệt bị đánh trượt bài thi.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab Ôn tập */}
      {activeTab === 'PRACTICE' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {questions.map((q) => (
            <div key={q.id} style={{ background: '#ffffff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: 700, color: '#1e40af' }}>Câu {q.questionNumber}:</span>
                {q.isParalysis && (
                  <span style={{ background: '#fee2e2', color: '#dc2626', padding: '0.25rem 0.6rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700 }}>
                    ⚠️ CÂU ĐIỂM LIỆT
                  </span>
                )}
              </div>
              <h4 style={{ fontSize: '1.05rem', color: '#1f2937', marginBottom: '1rem', fontWeight: 600 }}>{q.content}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                {q.answers.map((ans) => (
                  <div key={ans.id} style={{ padding: '0.65rem 1rem', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.92rem', color: '#334155' }}>
                    {ans.orderIndex}. {ans.answerText}
                  </div>
                ))}
              </div>
              {q.explanation && (
                <div style={{ background: '#eff6ff', padding: '0.75rem 1rem', borderRadius: '6px', fontSize: '0.875rem', color: '#1d4ed8' }}>
                  💡 <strong>Giải thích:</strong> {q.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab Thi thử trực tuyến */}
      {activeTab === 'MOCK_EXAM' && (
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
            {mockQuestions.map((q, idx) => (
              <div key={q.id} style={{ background: '#ffffff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontWeight: 700, color: '#1e40af' }}>Câu hỏi {idx + 1}:</span>
                  {q.isParalysis && (
                    <span style={{ background: '#fee2e2', color: '#dc2626', padding: '0.25rem 0.6rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700 }}>
                      ⚠️ CÂU ĐIỂM LIỆT
                    </span>
                  )}
                </div>
                <h4 style={{ fontSize: '1.05rem', color: '#1f2937', marginBottom: '1rem', fontWeight: 600 }}>{q.content}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {q.answers.map((ans) => {
                    const isSelected = userAnswers[q.id] === ans.id;
                    return (
                      <button
                        key={ans.id}
                        type="button"
                        onClick={() => handleSelectAnswer(q.id, ans.id)}
                        style={{
                          textAlign: 'left',
                          padding: '0.75rem 1rem',
                          borderRadius: '8px',
                          border: isSelected ? '2px solid #2563eb' : '1px solid #cbd5e1',
                          background: isSelected ? '#eff6ff' : '#ffffff',
                          color: isSelected ? '#1d4ed8' : '#334155',
                          fontWeight: isSelected ? 600 : 400,
                          cursor: 'pointer',
                          fontSize: '0.92rem',
                        }}
                      >
                        {ans.orderIndex}. {ans.answerText}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={handleSubmitExam}
              disabled={loading}
              style={{
                background: '#16a34a',
                color: 'white',
                border: 'none',
                padding: '0.85rem 3rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '1.1rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
              }}
            >
              {loading ? 'Đang chấm điểm...' : 'Nộp Bài Thi Thử'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
