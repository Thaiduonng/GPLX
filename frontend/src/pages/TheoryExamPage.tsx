import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { learningService } from '../services/learningService';
import type { ExamResult, TheoryQuestion } from '../types/learning';
import {
  PageHeader,
  Tabs,
  AppButton,
  AppSelect,
  Alert,
  LoadingSpinner,
  StatusBadge,
} from '../components/ui';

export default function TheoryExamPage() {
  const [activeTab, setActiveTab] = useState<'PRACTICE' | 'MOCK_EXAM'>('PRACTICE');
  const [category, setCategory] = useState<string>('B1');
  const [questions, setQuestions] = useState<TheoryQuestion[]>([]);
  const [mockQuestions, setMockQuestions] = useState<TheoryQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [examResult, setExamResult] = useState<ExamResult | null>(null);

  // Mock Exam Timer (20 minutes = 1200s)
  const [timeLeft, setTimeLeft] = useState<number>(1200);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    loadPracticeQuestions();
  }, [category]);

  // Countdown timer for mock exam
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const loadPracticeQuestions = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const data = await learningService.getQuestions(category);
      setQuestions(data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorMsg(err.response?.data?.message || 'Không thể tải ngân hàng câu hỏi.');
      } else if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Lỗi không xác định khi tải câu hỏi.');
      }
    } finally {
      setLoading(false);
    }
  };

  const startMockExam = async () => {
    setLoading(true);
    setErrorMsg('');
    setExamResult(null);
    setUserAnswers({});
    setTimeLeft(1200); // 20 mins
    try {
      const data = await learningService.generateMockExam(category, 20);
      setMockQuestions(data);
      setActiveTab('MOCK_EXAM');
      setIsTimerRunning(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorMsg(err.response?.data?.message || 'Không thể tạo đề thi thử.');
      } else if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Lỗi không xác định khi tạo đề thi.');
      }
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
    setIsTimerRunning(false);
    try {
      const result = await learningService.submitMockExam({
        categoryCode: category,
        userAnswers,
      });
      setExamResult(result);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorMsg(err.response?.data?.message || 'Lỗi nộp bài thi thử.');
      } else if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Lỗi không xác định khi nộp bài.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formattedTimer = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, [timeLeft]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title="Ngân Hàng Câu Hỏi & Thi Thử Lý Thuyết GPLX"
        description="Bộ 600 câu hỏi sát hạch theo tiêu chuẩn Cục Đường bộ Việt Nam, bao gồm 60 câu điểm liệt bắt buộc phải đạt."
        actions={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '220px' }}>
              <AppSelect
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={[
                  { value: 'B1', label: 'Hạng B1 (Ô tô tự động)' },
                  { value: 'B', label: 'Hạng B (Ô tô số sàn/tự động)' },
                  { value: 'A1', label: 'Hạng A1 (Mô tô đến 125cc)' },
                  { value: 'C', label: 'Hạng C (Xe tải trên 3.5T)' },
                ]}
              />
            </div>
          </div>
        }
      />

      <Tabs
        tabs={[
          { id: 'PRACTICE', label: '📖 Ngân hàng ôn tập', badge: questions.length },
          { id: 'MOCK_EXAM', label: '⏱️ Đề thi thử sát hạch', badge: mockQuestions.length || undefined },
        ]}
        activeTab={activeTab}
        onChange={(tabId) => {
          if (tabId === 'PRACTICE') {
            setActiveTab('PRACTICE');
            loadPracticeQuestions();
          } else {
            if (mockQuestions.length === 0) {
              startMockExam();
            } else {
              setActiveTab('MOCK_EXAM');
            }
          }
        }}
      />

      {errorMsg && (
        <Alert
          type="danger"
          message={errorMsg}
          onClose={() => setErrorMsg('')}
        />
      )}

      {/* Kết quả thi thử */}
      {examResult && (
        <div
          style={{
            backgroundColor: examResult.passed ? 'var(--color-success-bg)' : 'var(--color-danger-bg)',
            border: `2px solid ${examResult.passed ? 'var(--color-success-border)' : 'var(--color-danger-border)'}`,
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-6)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-4)',
          }}
        >
          <div style={{ fontSize: '3rem' }}>{examResult.passed ? '🎉' : '❌'}</div>
          <div>
            <h3
              style={{
                fontSize: '1.3rem',
                fontWeight: 700,
                color: examResult.passed ? 'var(--color-success)' : 'var(--color-danger)',
                margin: '0 0 4px 0',
              }}
            >
              {examResult.passed ? 'KẾT QUẢ: ĐẠT SÁT HẠCH LÝ THUYẾT' : 'KẾT QUẢ: KHÔNG ĐẠT'}
            </h3>
            <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
              Điểm số: <strong>{examResult.correctAnswers} / {examResult.totalQuestions}</strong> câu đúng (Điểm chuẩn đạt tối thiểu: {examResult.passingScore} câu)
            </p>
            {examResult.failedDueToParalysisQuestion && (
              <p style={{ margin: '6px 0 0 0', fontSize: 'var(--font-size-sm)', color: 'var(--color-danger)', fontWeight: 600 }}>
                ⚠️ BẠN ĐÃ TRẢ LỜI SAI CÂU HỎI ĐIỂM LIỆT! Theo Luật GTĐB, sai câu điểm liệt bị đánh trượt toàn bộ bài thi lý thuyết.
              </p>
            )}
            <div style={{ marginTop: '12px' }}>
              <AppButton variant="primary" size="sm" onClick={startMockExam}>
                Làm đề thi thử mới
              </AppButton>
            </div>
          </div>
        </div>
      )}

      {/* Tab Ôn tập */}
      {activeTab === 'PRACTICE' && (
        <div>
          {loading ? (
            <div style={{ padding: '60px 0', textAlign: 'center' }}>
              <LoadingSpinner size="lg" text="Đang tải ngân hàng câu hỏi lý thuyết..." />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {questions.map((q) => (
                <div
                  key={q.id}
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid var(--color-border)',
                    padding: 'var(--space-5)',
                    boxShadow: 'var(--shadow-xs)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                      Câu hỏi {q.questionNumber}:
                    </span>
                    {q.isParalysis && (
                      <span
                        style={{
                          backgroundColor: 'var(--color-danger-bg)',
                          color: 'var(--color-danger)',
                          border: '1px solid var(--color-danger-border)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 700,
                        }}
                      >
                        ⚠️ CÂU ĐIỂM LIỆT
                      </span>
                    )}
                  </div>

                  <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: 'var(--space-3)' }}>
                    {q.content}
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 'var(--space-3)' }}>
                    {q.answers.map((ans) => (
                      <div
                        key={ans.id}
                        style={{
                          padding: 'var(--space-2) var(--space-4)',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--color-bg-app)',
                          border: '1px solid var(--color-border)',
                          fontSize: 'var(--font-size-sm)',
                        }}
                      >
                        <strong>{ans.orderIndex}.</strong> {ans.answerText}
                      </div>
                    ))}
                  </div>

                  {q.explanation && (
                    <div
                      style={{
                        backgroundColor: 'var(--color-primary-light)',
                        padding: 'var(--space-3) var(--space-4)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--font-size-xs)',
                        color: 'var(--color-primary-dark)',
                      }}
                    >
                      💡 <strong>Giải thích đáp án:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Thi thử trực tuyến */}
      {activeTab === 'MOCK_EXAM' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* Header thi thử kèm đồng hồ đếm ngược */}
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: 'var(--space-4) var(--space-6)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: 'var(--shadow-xs)',
              position: 'sticky',
              top: '64px',
              zIndex: 10,
            }}
          >
            <div>
              <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                Đề thi trắc nghiệm Hạng <strong>{category}</strong> ({mockQuestions.length} câu)
              </span>
              <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                Đã trả lời: <strong>{Object.keys(userAnswers).length} / {mockQuestions.length}</strong> câu
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: timeLeft <= 180 ? 'var(--color-danger-bg)' : '#f1f5f9',
                  color: timeLeft <= 180 ? 'var(--color-danger)' : 'var(--color-text-main)',
                  padding: '0.4rem 0.8rem',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  fontFamily: 'monospace',
                }}
              >
                ⏱️ {formattedTimer}
              </div>

              <AppButton
                variant="success"
                onClick={handleSubmitExam}
                loading={loading}
                icon="📤"
              >
                Nộp bài thi
              </AppButton>
            </div>
          </div>

          {/* Quick Navigator Grid */}
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginRight: '6px' }}>
              Chuyển nhanh:
            </span>
            {mockQuestions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              return (
                <a
                  key={q.id}
                  href={`#question-${q.id}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 600,
                    backgroundColor: isAnswered ? 'var(--color-primary)' : '#f1f5f9',
                    color: isAnswered ? 'white' : 'var(--color-text-main)',
                    border: q.isParalysis ? '2px solid var(--color-danger)' : '1px solid var(--color-border)',
                    textDecoration: 'none',
                  }}
                  title={q.isParalysis ? 'Câu hỏi điểm liệt' : `Câu ${idx + 1}`}
                >
                  {idx + 1}
                </a>
              );
            })}
          </div>

          {/* Danh sách câu hỏi thi thử */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            {mockQuestions.map((q, idx) => (
              <div
                key={q.id}
                id={`question-${q.id}`}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--color-border)',
                  padding: 'var(--space-5)',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                    Câu hỏi {idx + 1}:
                  </span>
                  {q.isParalysis && (
                    <StatusBadge variant="danger" label="⚠️ CÂU ĐIỂM LIỆT" />
                  )}
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-main)', marginBottom: 'var(--space-4)' }}>
                  {q.content}
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {q.answers.map((ans) => {
                    const isSelected = userAnswers[q.id] === ans.id;
                    return (
                      <button
                        key={ans.id}
                        type="button"
                        onClick={() => handleSelectAnswer(q.id, ans.id)}
                        style={{
                          textAlign: 'left',
                          padding: 'var(--space-3) var(--space-4)',
                          borderRadius: 'var(--radius-md)',
                          border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                          backgroundColor: isSelected ? 'var(--color-primary-light)' : 'var(--color-surface)',
                          color: isSelected ? 'var(--color-primary-dark)' : 'var(--color-text-main)',
                          fontWeight: isSelected ? 600 : 400,
                          cursor: 'pointer',
                          fontSize: 'var(--font-size-sm)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'all var(--transition-fast)',
                        }}
                      >
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: isSelected ? '6px solid var(--color-primary)' : '2px solid #cbd5e1',
                            flexShrink: 0,
                          }}
                        />
                        <span>
                          <strong>{ans.orderIndex}.</strong> {ans.answerText}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-4)' }}>
            <AppButton
              variant="success"
              size="lg"
              onClick={handleSubmitExam}
              loading={loading}
              icon="📤"
            >
              Nộp Bài Thi Thử Trực Tuyến
            </AppButton>
          </div>
        </div>
      )}
    </div>
  );
}
