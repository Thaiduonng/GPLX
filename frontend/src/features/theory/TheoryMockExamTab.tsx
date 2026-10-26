import React, { useState, useEffect } from 'react';
import { learningService } from '../../services/learningService';
import type {
  MockExamSession,
  MockExamResult,
  ExamQuestion,
} from '../../types/learning';
import { AppButton, AppSelect, Alert, Modal } from '../../components/ui';

interface ExamRuleConfig {
  category: string;
  name: string;
  questions: number;
  timeMinutes: number;
  passScore: number;
  desc: string;
}

const EXAM_RULES: ExamRuleConfig[] = [
  { category: 'A1', name: 'Hạng A1 (Mô tô 2 bánh)', questions: 25, timeMinutes: 19, passScore: 21, desc: 'Đạt từ 21/25 câu, không sai câu điểm liệt' },
  { category: 'A2', name: 'Hạng A2 (Mô tô PKL)', questions: 25, timeMinutes: 19, passScore: 23, desc: 'Đạt từ 23/25 câu, không sai câu điểm liệt' },
  { category: 'B1', name: 'Hạng B1 (Ô tô tự động)', questions: 30, timeMinutes: 20, passScore: 27, desc: 'Đạt từ 27/30 câu, không sai câu điểm liệt' },
  { category: 'B',  name: 'Hạng B / B2 (Ô tô chở người & tải nhẹ)', questions: 35, timeMinutes: 22, passScore: 32, desc: 'Đạt từ 32/35 câu, không sai câu điểm liệt' },
  { category: 'C',  name: 'Hạng C (Ô tô tải lớn)', questions: 40, timeMinutes: 24, passScore: 36, desc: 'Đạt từ 36/40 câu, không sai câu điểm liệt' },
];

export const TheoryMockExamTab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('B1');
  const [session, setSession] = useState<MockExamSession | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<MockExamResult | null>(null);

  // Timer
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [showConfirmSubmit, setShowConfirmSubmit] = useState<boolean>(false);

  // Countdown Interval
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isTimerActive && remainingSeconds > 0) {
      timer = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsTimerActive(false);
            // Tự động nộp bài khi hết giờ
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerActive, remainingSeconds]);

  const handleStartExam = async () => {
    setLoading(true);
    setErrorMsg('');
    setResult(null);
    setUserAnswers({});
    setCurrentIndex(0);

    try {
      const data = await learningService.startMockExam(selectedCategory);
      setSession(data);
      setRemainingSeconds(data.remainingSeconds || data.durationMinutes * 60);
      setIsTimerActive(true);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Không thể khởi tạo đề thi.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionId: number, answerId: number) => {
    if (result) return; // Đã nộp bài thì không sửa
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleAutoSubmit = async () => {
    if (!session || submitting) return;
    await doSubmitExam();
  };

  const doSubmitExam = async () => {
    if (!session) return;
    setSubmitting(true);
    setIsTimerActive(false);
    setShowConfirmSubmit(false);
    setErrorMsg('');

    try {
      const examResult = await learningService.submitMockExamSession(session.sessionCode, userAnswers);
      setResult(examResult);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Lỗi khi nộp bài thi.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const activeRule: ExamRuleConfig = EXAM_RULES.find((r) => r.category === selectedCategory) || {
    category: 'B1',
    name: 'Hạng B1 (Ô tô tự động)',
    questions: 30,
    timeMinutes: 20,
    passScore: 27,
    desc: 'Đạt từ 27/30 câu, không sai câu điểm liệt',
  };
  const currentQuestion: ExamQuestion | undefined = session?.questions[currentIndex];

  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = (session?.questions.length || 0) - answeredCount;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 1. MÀN HÌNH CHỌN HẠNG BẰNG & QUY CHẾ THI */}
      {!session ? (
        <div
          style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '2rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          <div>
            <h2 style={{ margin: '0 0 0.5rem 0', color: '#1e293b', fontSize: '1.4rem' }}>
              🚗 Thi Thử Lý Thuyết Sát Hạch GPLX Chuẩn Bộ GTVT
            </h2>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>
              Cơ cấu bộ đề thi được sinh ngẫu nhiên theo đúng quy định Thông tư 12/2017/TT-BGTVT và Thông tư 04/2022/TT-BGTVT.
            </p>
          </div>

          <div style={{ maxWidth: '400px' }}>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
              Chọn hạng GPLX thi thử:
            </label>
            <AppSelect
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              options={EXAM_RULES.map((r) => ({
                value: r.category,
                label: `${r.name} - ${r.questions} câu / ${r.timeMinutes} phút`,
              }))}
            />
          </div>

          {/* Quy chế chi tiết */}
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '1.25rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
            }}
          >
            <div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Hạng thi</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e3a8a' }}>{activeRule.name}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Số câu hỏi</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>{activeRule.questions} câu</div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Thời gian làm bài</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>{activeRule.timeMinutes} phút</div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Điểm đạt tối thiểu</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#059669' }}>
                {activeRule.passScore} / {activeRule.questions} câu
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '1rem',
              background: '#fff1f2',
              border: '1px solid #fecdd3',
              borderRadius: '8px',
              color: '#991b1b',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>⚠️</span>
            <div>
              <strong>Lưu ý đặc biệt quan trọng về Câu hỏi Điểm liệt:</strong>
              <div>
                Trong đề thi có ít nhất 1 câu hỏi điểm liệt. Nếu thí sinh trả lời SAI câu điểm liệt thì đề thi sẽ bị đánh giá
                là <strong>KHÔNG ĐẠT (TRƯỢT)</strong> ngay lập tức, bất kể tổng số điểm có đạt hay không!
              </div>
            </div>
          </div>

          {errorMsg && <Alert type="danger" message={errorMsg} />}

          <div>
            <AppButton
              variant="primary"
              size="lg"
              onClick={handleStartExam}
              disabled={loading}
              style={{ backgroundColor: '#1e3a8a', borderColor: '#1e3a8a' }}
            >
              {loading ? 'Đang tạo đề thi bảo mật...' : 'Bắt đầu làm bài thi ngay →'}
            </AppButton>
          </div>
        </div>
      ) : result ? (
        /* 2. MÀN HÌNH KẾT QUẢ THI THỬ */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div
            style={{
              background: result.passed ? '#ecfdf5' : '#fef2f2',
              border: result.passed ? '2px solid #10b981' : '2px solid #ef4444',
              borderRadius: '12px',
              padding: '2rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div style={{ fontSize: '3rem' }}>{result.passed ? '🎉' : '❌'}</div>
            <h2 style={{ margin: 0, fontSize: '1.8rem', color: result.passed ? '#065f46' : '#991b1b' }}>
              KẾT QUẢ: {result.passed ? 'ĐẠT YÊU CẦU' : 'KHÔNG ĐẠT'}
            </h2>

            {result.failedParalysis && (
              <div
                style={{
                  background: '#b91c1c',
                  color: '#ffffff',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                }}
              >
                ⚠️ BẠN ĐÃ TRẢ LỜI SAI CÂU HỎI ĐIỂM LIỆT (Tình huống mất an toàn giao thông nghiêm trọng)
              </div>
            )}

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Hạng sát hạch</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1e293b' }}>{result.categoryCode}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Điểm số đạt được</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: result.passed ? '#059669' : '#dc2626' }}>
                  {result.score} / {result.totalQuestions}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Điểm sàn yêu cầu</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1e293b' }}>
                  {result.passingScore} câu
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Thời gian làm bài</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1e293b' }}>
                  {Math.floor(result.durationSeconds / 60)} phút {result.durationSeconds % 60} giây
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <AppButton
                variant="primary"
                onClick={() => {
                  setSession(null);
                  setResult(null);
                }}
              >
                Làm đề thi khác 🔄
              </AppButton>
            </div>
          </div>

          {/* Chi tiết từng câu hỏi trong bài thi */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ margin: 0, color: '#1e293b' }}>Chi tiết câu hỏi và phân tích bài thi:</h3>

            {result.questions.map((q, idx) => (
              <div
                key={q.questionId}
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  border: q.isCorrect ? '1px solid #bbf7d0' : '1px solid #fecdd3',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span
                      style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: '6px',
                        background: '#1e3a8a',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                      }}
                    >
                      Câu {idx + 1}
                    </span>
                    {q.isParalysis && (
                      <span
                        style={{
                          background: '#fee2e2',
                          color: '#b91c1c',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '6px',
                        }}
                      >
                        ⚠️ Điểm liệt
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontWeight: 700,
                      color: q.isCorrect ? '#166534' : '#991b1b',
                      fontSize: '0.9rem',
                    }}
                  >
                    {q.isCorrect ? '✓ Trả lời đúng' : '✗ Trả lời sai'}
                  </span>
                </div>

                <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '1rem', lineHeight: '1.5' }}>
                  {q.content}
                </div>

                {q.imageUrl && (
                  <div style={{ maxWidth: '360px' }}>
                    <img
                      src={q.imageUrl}
                      alt="Hình ảnh câu hỏi"
                      style={{ width: '100%', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                    />
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {q.answers.map((ans, optIdx) => {
                    const isSelected = ans.id === q.selectedAnswerId;
                    const isCorrect = ans.id === q.correctAnswerId;
                    let bg = '#ffffff';
                    let border = '1px solid #e2e8f0';

                    if (isCorrect) {
                      bg = '#ecfdf5';
                      border = '2px solid #10b981';
                    } else if (isSelected && !q.isCorrect) {
                      bg = '#fef2f2';
                      border = '2px solid #ef4444';
                    }

                    return (
                      <div
                        key={ans.id}
                        style={{
                          padding: '0.65rem 0.85rem',
                          borderRadius: '6px',
                          border,
                          background: bg,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.9rem',
                        }}
                      >
                        <span style={{ fontWeight: 700, color: '#475569' }}>
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span style={{ flex: 1, color: '#1e293b' }}>{ans.answerText}</span>
                        {isCorrect && (
                          <span style={{ color: '#059669', fontWeight: 700, fontSize: '0.8rem' }}>
                            ✓ Đáp án đúng
                          </span>
                        )}
                        {isSelected && !isCorrect && (
                          <span style={{ color: '#dc2626', fontWeight: 700, fontSize: '0.8rem' }}>
                            (Bạn đã chọn)
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {q.explanation && (
                  <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem', color: '#334155' }}>
                    <strong>💡 Lời giải: </strong> {q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* 3. MÀN HÌNH LÀM BÀI THI THỬ TRỰC TIẾP */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', alignItems: 'start' }}>
          {/* Cột trái: Câu hỏi hiện tại */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '1.75rem',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {currentQuestion ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span
                      style={{
                        background: '#1e3a8a',
                        color: '#ffffff',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '6px',
                      }}
                    >
                      Câu {currentIndex + 1} / {session.questions.length}
                    </span>
                    {currentQuestion.isParalysis && (
                      <span
                        style={{
                          background: '#fee2e2',
                          color: '#b91c1c',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '6px',
                          border: '1px solid #fca5a5',
                        }}
                      >
                        ⚠️ CÂU ĐIỂM LIỆT
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    Hạng: <strong>{session.categoryCode}</strong>
                  </span>
                </div>

                <div style={{ fontSize: '1.15rem', fontWeight: 600, color: '#1e293b', lineHeight: '1.6' }}>
                  {currentQuestion.content}
                </div>

                {currentQuestion.imageUrl && (
                  <div style={{ maxWidth: '450px' }}>
                    <img
                      src={currentQuestion.imageUrl}
                      alt="Hình ảnh minh họa câu hỏi"
                      style={{ width: '100%', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    />
                  </div>
                )}

                {/* Các phương án lựa chọn */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {currentQuestion.options.map((opt, optIdx) => {
                    const isSelected = userAnswers[currentQuestion.id] === opt.id;
                    return (
                      <label
                        key={opt.id}
                        style={{
                          padding: '0.9rem 1.1rem',
                          borderRadius: '8px',
                          border: isSelected ? '2px solid #3b82f6' : '1px solid #cbd5e1',
                          background: isSelected ? '#eff6ff' : '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <input
                          type="radio"
                          name={`exam-question-${currentQuestion.id}`}
                          value={opt.id}
                          checked={isSelected}
                          onChange={() => handleSelectOption(currentQuestion.id, opt.id)}
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <span style={{ fontWeight: 700, color: '#475569' }}>
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span style={{ flex: 1, fontSize: '0.95rem', color: '#1e293b' }}>
                          {opt.answerText}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {/* Navigation Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                  <AppButton
                    variant="secondary"
                    size="sm"
                    onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentIndex === 0}
                  >
                    ← Câu trước
                  </AppButton>
                  <AppButton
                    variant="primary"
                    size="sm"
                    onClick={() => setCurrentIndex((prev) => Math.min(session.questions.length - 1, prev + 1))}
                    disabled={currentIndex === session.questions.length - 1}
                  >
                    Câu tiếp theo →
                  </AppButton>
                </div>
              </>
            ) : null}
          </div>

          {/* Cột phải: Đồng hồ đếm ngược & Question Grid chuyển câu nhanh */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Countdown Timer Widget */}
            <div
              style={{
                background: remainingSeconds < 120 ? '#fee2e2' : '#ffffff',
                border: remainingSeconds < 120 ? '2px solid #ef4444' : '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '1.25rem',
                textAlign: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>THỜI GIAN CÒN LẠI</div>
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: remainingSeconds < 120 ? '#dc2626' : '#1e3a8a',
                  fontVariantNumeric: 'tabular-nums',
                  margin: '0.25rem 0',
                }}
              >
                ⏱️ {formatTime(remainingSeconds)}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                Đã trả lời: <strong>{answeredCount}</strong> / {session.questions.length} câu
              </div>
            </div>

            {/* Question Matrix Grid */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '12px',
                padding: '1.25rem',
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
                Danh sách câu hỏi:
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '0.4rem',
                }}
              >
                {session.questions.map((q, idx) => {
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isCurrent = idx === currentIndex;

                  let bg = '#f1f5f9';
                  let color = '#475569';
                  let border = '1px solid #cbd5e1';

                  if (isAnswered) {
                    bg = '#10b981';
                    color = '#ffffff';
                    border = '1px solid #059669';
                  }

                  if (isCurrent) {
                    border = '2px solid #1e3a8a';
                    if (!isAnswered) {
                      bg = '#dbeafe';
                      color = '#1e3a8a';
                    }
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      style={{
                        padding: '0.45rem 0',
                        borderRadius: '6px',
                        background: bg,
                        color,
                        border,
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        position: 'relative',
                      }}
                    >
                      {idx + 1}
                      {q.isParalysis && (
                        <span
                          style={{
                            position: 'absolute',
                            top: '-3px',
                            right: '-3px',
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#ef4444',
                          }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Submit Button */}
              <div style={{ marginTop: '1.25rem' }}>
                <AppButton
                  variant="primary"
                  onClick={() => setShowConfirmSubmit(true)}
                  disabled={submitting}
                  style={{ width: '100%', backgroundColor: '#059669', borderColor: '#059669' }}
                >
                  {submitting ? 'Đang chấm điểm...' : '✅ Nộp bài thi'}
                </AppButton>
              </div>
            </div>
          </div>

          {/* Modal xác nhận nộp bài */}
          <Modal
            isOpen={showConfirmSubmit}
            onClose={() => setShowConfirmSubmit(false)}
            title="Xác nhận nộp bài thi thử"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ margin: 0, color: '#334155' }}>
                Bạn đã trả lời <strong>{answeredCount}</strong> / {session.questions.length} câu hỏi.
                {unansweredCount > 0 && (
                  <span style={{ color: '#dc2626', display: 'block', marginTop: '0.5rem' }}>
                    ⚠️ Bạn vẫn còn <strong>{unansweredCount}</strong> câu chưa trả lời. Bạn có chắc chắn muốn nộp bài ngay bây giờ?
                  </span>
                )}
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <AppButton variant="secondary" onClick={() => setShowConfirmSubmit(false)}>
                  Tiếp tục làm bài
                </AppButton>
                <AppButton variant="primary" onClick={doSubmitExam} disabled={submitting}>
                  {submitting ? 'Đang nộp...' : 'Đồng ý nộp bài'}
                </AppButton>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};
