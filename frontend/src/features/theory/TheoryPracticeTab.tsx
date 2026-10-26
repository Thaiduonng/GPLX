import React, { useState, useEffect, useCallback } from 'react';
import { learningService } from '../../services/learningService';
import type {
  PracticeMode,
  PracticeSessionSummary,
  QuestionDetail,
  PracticeAnswerResult,
  TheoryTopic,
} from '../../types/learning';
import { AppButton, AppSelect, Alert } from '../../components/ui';

interface TheoryPracticeTabProps {
  initialMode?: PracticeMode;
}

interface QuestionAnswerState {
  selectedAnswerId: number | null;
  result: PracticeAnswerResult | null;
}

export const TheoryPracticeTab: React.FC<TheoryPracticeTabProps> = ({ initialMode = 'PARALYSIS' }) => {
  const [mode, setMode] = useState<PracticeMode>(initialMode);
  const [category, setCategory] = useState<string>('B1');
  const [topicId, setTopicId] = useState<number | null>(null);
  const [topics, setTopics] = useState<TheoryTopic[]>([]);

  const [activeSession, setActiveSession] = useState<PracticeSessionSummary | null>(null);
  const [questions, setQuestions] = useState<QuestionDetail[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Lưu trữ trạng thái câu trả lời của từng câu hỏi trong phiên
  const [answersMap, setAnswersMap] = useState<Record<number, QuestionAnswerState>>({});

  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      const data = await learningService.getTopics();
      setTopics(data);
      if (data.length > 0 && data[0]) {
        setTopicId(data[0].id);
      }
    } catch (e) {
      // Ignored
    }
  };

  const startPractice = async () => {
    setLoading(true);
    setErrorMsg('');
    setActiveSession(null);
    setQuestions([]);
    setCurrentIndex(0);
    setAnswersMap({});

    try {
      const session = await learningService.startPractice({
        practiceMode: mode,
        categoryCode: category,
        topicId: mode === 'TOPIC' ? (topicId || undefined) : undefined,
        limit: mode === 'RANDOM' ? 20 : undefined,
      });

      setActiveSession(session);
      const qList = await learningService.getPracticeQuestions(session.sessionCode);
      setQuestions(qList);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Không thể bắt đầu phiên rèn luyện.');
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion: QuestionDetail | undefined = questions[currentIndex];
  const currentAnsState = currentQuestion ? answersMap[currentQuestion.id] : undefined;
  const currentState: QuestionAnswerState = {
    selectedAnswerId: currentAnsState?.selectedAnswerId ?? null,
    result: currentAnsState?.result ?? null,
  };

  const handleSelectAnswer = (ansId: number) => {
    if (!currentQuestion || currentState.result !== null) return;
    setAnswersMap((prev) => {
      const existing = prev[currentQuestion.id];
      return {
        ...prev,
        [currentQuestion.id]: {
          selectedAnswerId: ansId,
          result: existing?.result ?? null,
        },
      };
    });
  };

  const handleCheckAnswer = async () => {
    if (!activeSession || !currentQuestion || currentState.selectedAnswerId === null) return;

    setSubmitting(true);
    setErrorMsg('');
    try {
      const res = await learningService.submitPracticeAnswer(
        activeSession.sessionCode,
        currentQuestion.id,
        currentState.selectedAnswerId
      );

      setAnswersMap((prev) => ({
        ...prev,
        [currentQuestion.id]: {
          selectedAnswerId: currentState.selectedAnswerId,
          result: res,
        },
      }));

      setActiveSession((prev) =>
        prev
          ? {
              ...prev,
              answeredQuestions: res.currentProgressTotal,
              correctAnswers: res.currentProgressCorrect,
            }
          : null
      );
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Không thể nộp câu trả lời.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleNextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, questions.length]);

  const handlePrevQuestion = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const handleCompleteSession = async () => {
    if (!activeSession) return;
    try {
      const completed = await learningService.completePracticeSession(activeSession.sessionCode);
      setActiveSession(completed);
    } catch (err: any) {
      alert(err.message || 'Lỗi khi hoàn thành phiên.');
    }
  };

  // Keyboard Shortcuts: ArrowLeft, ArrowRight, Numbers 1-4, Enter
  useEffect(() => {
    if (!activeSession || activeSession.status === 'COMPLETED' || !currentQuestion) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextQuestion();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevQuestion();
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        const optIdx = parseInt(e.key, 10) - 1;
        if (currentQuestion.answers && currentQuestion.answers[optIdx]) {
          handleSelectAnswer(currentQuestion.answers[optIdx].id);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (!currentState.result && currentState.selectedAnswerId !== null) {
          handleCheckAnswer();
        } else if (currentState.result && currentIndex < questions.length - 1) {
          handleNextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSession, currentQuestion, currentState, currentIndex, questions.length, handleNextQuestion, handlePrevQuestion]);

  // Thống kê phiên
  const correctCount = Object.values(answersMap).filter((a) => a?.result?.isCorrect).length;
  const incorrectQuestions = questions.filter((q) => {
    const res = answersMap[q.id]?.result;
    return Boolean(res && !res.isCorrect);
  });
  const incorrectCount = Object.values(answersMap).filter((a) => {
    const res = a?.result;
    return Boolean(res && !res.isCorrect);
  }).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Session Config / Setup Card */}
      {!activeSession || activeSession.status === 'COMPLETED' ? (
        <div
          style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '1.75rem',
            border: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <div>
            <h3 style={{ margin: '0 0 0.35rem 0', color: '#1e293b' }}>
              🎯 Tùy chọn 8 Chế độ Rèn luyện Thực hành Chuyên sâu
            </h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
              Luyện tập với chế độ phản hồi đáp án tức thời giúp bạn khắc sâu kiến thức và nguyên tắc lái xe an toàn.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
                Chế độ rèn luyện:
              </label>
              <AppSelect
                value={mode}
                onChange={(e) => setMode(e.target.value as PracticeMode)}
                options={[
                  { value: 'PARALYSIS', label: '⚠️ 60 Câu hỏi điểm liệt (Quan trọng)' },
                  { value: 'TOPIC', label: '📖 Rèn luyện theo từng chương' },
                  { value: 'CATEGORY', label: '🚗 Rèn luyện theo hạng GPLX' },
                  { value: 'INCORRECT', label: '🔄 Ôn luyện lại các câu từng sai' },
                  { value: 'BOOKMARKED', label: '⭐ Câu hỏi đã đánh dấu lưu trữ' },
                  { value: 'UNANSWERED', label: '🆕 Các câu hỏi chưa từng trả lời' },
                  { value: 'RANDOM', label: '🎲 Đề ngẫu nhiên 20 câu phản xạ' },
                  { value: 'ALL', label: '📚 Toàn bộ ngân hàng 600 câu' },
                ]}
              />
            </div>

            {mode === 'TOPIC' && (
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
                  Chọn chương:
                </label>
                <AppSelect
                  value={topicId?.toString() || ''}
                  onChange={(e) => setTopicId(Number(e.target.value))}
                  options={topics.map((t) => ({
                    value: String(t?.id ?? ''),
                    label: `Chương ${t?.orderIndex ?? ''}: ${t?.name ?? ''}`,
                  }))}
                />
              </div>
            )}

            {(mode === 'CATEGORY' || mode === 'UNANSWERED' || mode === 'RANDOM') && (
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
                  Hạng GPLX mục tiêu:
                </label>
                <AppSelect
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  options={[
                    { value: 'A1', label: 'Hạng A1 (Mô tô 2 bánh)' },
                    { value: 'A2', label: 'Hạng A2 (Mô tô PKL)' },
                    { value: 'B1', label: 'Hạng B1 (Ô tô số tự động)' },
                    { value: 'B', label: 'Hạng B / B2 (Ô tô chở người & tải nhẹ)' },
                    { value: 'C', label: 'Hạng C (Ô tô tải lớn)' },
                  ]}
                />
              </div>
            )}
          </div>

          {errorMsg && <Alert type="danger" message={errorMsg} />}

          {/* Practice Summary Box after completion */}
          {activeSession && activeSession.status === 'COMPLETED' && (
            <div
              style={{
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                borderRadius: '8px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                <div>
                  <strong style={{ color: '#065f46', fontSize: '1.1rem' }}>
                    🎉 Đã hoàn tất phiên rèn luyện ({mode})!
                  </strong>
                  <p style={{ margin: '0.25rem 0 0 0', color: '#047857', fontSize: '0.95rem' }}>
                    Trả lời đúng <strong>{correctCount}</strong> / <strong>{questions.length}</strong> câu hỏi
                    (Đạt {questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0}%).
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <AppButton variant="secondary" size="sm" onClick={() => startPractice()}>
                    Luyện tập lại
                  </AppButton>
                  <AppButton variant="primary" size="sm" onClick={() => setActiveSession(null)}>
                    Đổi chế độ khác
                  </AppButton>
                </div>
              </div>

              {incorrectQuestions.length > 0 && (
                <div style={{ borderTop: '1px dashed #6ee7b7', paddingTop: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#991b1b' }}>
                    Các câu trả lời sai cần chú ý ({incorrectQuestions.length} câu):
                  </span>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.35rem' }}>
                    {incorrectQuestions.map((iq) => (
                      <span
                        key={iq.id}
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.2rem 0.5rem',
                          background: '#fee2e2',
                          color: '#b91c1c',
                          borderRadius: '4px',
                          border: '1px solid #fca5a5',
                        }}
                      >
                        Câu #{iq.questionNumber} {iq.isParalysis ? '(Liệt)' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div>
            <AppButton variant="primary" onClick={startPractice} disabled={loading}>
              {loading ? 'Đang khởi tạo...' : '🚀 Bắt đầu luyện tập ngay'}
            </AppButton>
          </div>
        </div>
      ) : (
        /* ACTIVE PRACTICE INTERFACE */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', alignItems: 'start' }}>
          {/* Main Question Practice Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Practice Header & Status Bar */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '12px',
                padding: '1rem 1.5rem',
                border: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.3rem' }}>🎯</span>
                <div>
                  <span style={{ fontWeight: 700, color: '#1e293b' }}>
                    Câu {currentIndex + 1} / {questions.length}
                  </span>
                  <span style={{ color: '#64748b', fontSize: '0.85rem', marginLeft: '0.75rem' }}>
                    Đúng: <strong style={{ color: '#10b981' }}>{correctCount}</strong> | Sai:{' '}
                    <strong style={{ color: '#ef4444' }}>{incorrectCount}</strong>
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <AppButton variant="secondary" size="sm" onClick={handleCompleteSession}>
                  Kết thúc phiên
                </AppButton>
              </div>
            </div>

            {/* Current Question Card */}
            {currentQuestion && (
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '1.75rem',
                  border: currentQuestion.isParalysis ? '2px solid #fca5a5' : '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      background: '#1e3a8a',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                    }}
                  >
                    Câu số {currentQuestion.questionNumber}
                  </span>
                  {currentQuestion.isParalysis && (
                    <span
                      style={{
                        background: '#fee2e2',
                        color: '#b91c1c',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '6px',
                        border: '1px solid #fca5a5',
                      }}
                    >
                      ⚠️ CÂU ĐIỂM LIỆT (BẮT BUỘC ĐÚNG)
                    </span>
                  )}
                  {currentQuestion.topicName && (
                    <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                      Chương: {currentQuestion.topicName}
                    </span>
                  )}
                </div>

                <div style={{ fontSize: '1.15rem', fontWeight: 600, color: '#1e293b', lineHeight: '1.65' }}>
                  {currentQuestion.content}
                </div>

                {currentQuestion.imageUrl && (
                  <div style={{ maxWidth: '440px' }}>
                    <img
                      src={currentQuestion.imageUrl}
                      alt="Hình ảnh câu hỏi"
                      style={{ width: '100%', borderRadius: '8px', border: '1px solid #e2e8f0', objectFit: 'contain' }}
                    />
                  </div>
                )}

                {/* Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {currentQuestion.answers.map((ans, optIdx) => {
                    const isSelected = currentState.selectedAnswerId === ans.id;
                    const res = currentState.result;

                    let bg = '#ffffff';
                    let border = '1px solid #e2e8f0';

                    if (res) {
                      if (ans.id === res.correctAnswerId) {
                        bg = '#ecfdf5';
                        border = '2px solid #10b981';
                      } else if (isSelected && !res.isCorrect) {
                        bg = '#fef2f2';
                        border = '2px solid #ef4444';
                      }
                    } else if (isSelected) {
                      bg = '#eff6ff';
                      border = '2px solid #3b82f6';
                    }

                    return (
                      <div
                        key={ans.id}
                        onClick={() => handleSelectAnswer(ans.id)}
                        style={{
                          padding: '1rem 1.15rem',
                          borderRadius: '8px',
                          border,
                          background: bg,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.85rem',
                          cursor: res ? 'default' : 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <span
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            background:
                              res && ans.id === res.correctAnswerId
                                ? '#10b981'
                                : isSelected
                                ? '#3b82f6'
                                : '#f1f5f9',
                            color:
                              (res && ans.id === res.correctAnswerId) || isSelected
                                ? '#ffffff'
                                : '#64748b',
                          }}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span style={{ flex: 1, fontSize: '0.95rem', color: '#1e293b' }}>
                          {ans.answerText}
                        </span>
                        {res && ans.id === res.correctAnswerId && (
                          <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.85rem' }}>
                            ✓ Chính xác
                          </span>
                        )}
                        {res && isSelected && !res.isCorrect && (
                          <span style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.85rem' }}>
                            ✗ Chưa đúng
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Instant Feedback Explanation */}
                {currentState.result && (
                  <div
                    style={{
                      background: currentState.result.isCorrect ? '#f0fdf4' : '#fff1f2',
                      border: currentState.result.isCorrect ? '1px solid #bbf7d0' : '1px solid #fecdd3',
                      borderRadius: '8px',
                      padding: '1rem 1.25rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                    }}
                  >
                    <div style={{ fontWeight: 700, color: currentState.result.isCorrect ? '#166534' : '#991b1b' }}>
                      {currentState.result.isCorrect ? '🎉 Bạn đã trả lời đúng!' : '⚠️ Câu trả lời chưa chính xác.'}
                    </div>
                    {currentState.result.explanation && (
                      <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6 }}>
                        <strong>Giải thích: </strong> {currentState.result.explanation}
                      </div>
                    )}
                    {currentState.result.legalReference && (
                      <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                        <strong>Căn cứ: </strong> {currentState.result.legalReference}
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                  <AppButton
                    variant="secondary"
                    size="sm"
                    onClick={handlePrevQuestion}
                    disabled={currentIndex === 0}
                  >
                    ← Câu trước (Phím ←)
                  </AppButton>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {!currentState.result ? (
                      <AppButton
                        variant="primary"
                        onClick={handleCheckAnswer}
                        disabled={currentState.selectedAnswerId === null || submitting}
                      >
                        {submitting ? 'Đang kiểm tra...' : 'Kiểm tra đáp án (Enter)'}
                      </AppButton>
                    ) : (
                      <AppButton
                        variant="primary"
                        onClick={handleNextQuestion}
                        disabled={currentIndex === questions.length - 1}
                      >
                        Câu tiếp theo → (Phím →)
                      </AppButton>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Question Grid Navigator (Right Sidebar) */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '1.25rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxHeight: '620px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.95rem' }}>
                Lưới câu hỏi ({questions.length})
              </span>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Đang ở câu {currentIndex + 1}
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '0.4rem',
                overflowY: 'auto',
                paddingRight: '4px',
              }}
            >
              {questions.map((q, idx) => {
                const ansState = answersMap[q.id];
                const isActive = idx === currentIndex;
                const isAnswered = ansState?.result !== null && ansState?.result !== undefined;
                const isCorrect = ansState?.result?.isCorrect === true;
                const isWrong = ansState?.result && !ansState.result.isCorrect;

                let border = '1px solid #e2e8f0';
                let bg = '#ffffff';
                let color = '#334155';

                if (isActive) {
                  border = '2px solid #2563eb';
                  bg = '#eff6ff';
                  color = '#1d4ed8';
                } else if (isCorrect) {
                  border = '1px solid #10b981';
                  bg = '#ecfdf5';
                  color = '#065f46';
                } else if (isWrong) {
                  border = '1px solid #ef4444';
                  bg = '#fef2f2';
                  color = '#991b1b';
                } else if (q.isParalysis) {
                  border = '1px solid #fca5a5';
                  bg = '#fff1f2';
                  color = '#991b1b';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    title={`Câu ${idx + 1}${q.isParalysis ? ' - Điểm liệt' : ''}`}
                    style={{
                      height: '36px',
                      borderRadius: '6px',
                      border,
                      background: bg,
                      color,
                      fontWeight: isActive || isAnswered ? 700 : 500,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    {idx + 1}
                    {isCorrect && (
                      <span style={{ position: 'absolute', top: -3, right: 1, fontSize: '0.65rem', color: '#10b981' }}>✓</span>
                    )}
                    {isWrong && (
                      <span style={{ position: 'absolute', top: -3, right: 1, fontSize: '0.65rem', color: '#ef4444' }}>✗</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem', fontSize: '0.75rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: 12, height: 12, borderRadius: 2, background: '#ecfdf5', border: '1px solid #10b981' }} />
                <span>Trả lời đúng</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: 12, height: 12, borderRadius: 2, background: '#fef2f2', border: '1px solid #ef4444' }} />
                <span>Trả lời sai</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: 12, height: 12, borderRadius: 2, background: '#eff6ff', border: '2px solid #2563eb' }} />
                <span>Câu đang làm</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
