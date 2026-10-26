import React, { useState, useEffect } from 'react';
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

export const TheoryPracticeTab: React.FC<TheoryPracticeTabProps> = ({ initialMode = 'PARALYSIS' }) => {
  const [mode, setMode] = useState<PracticeMode>(initialMode);
  const [category, setCategory] = useState<string>('B1');
  const [topicId, setTopicId] = useState<number | null>(null);
  const [topics, setTopics] = useState<TheoryTopic[]>([]);

  const [activeSession, setActiveSession] = useState<PracticeSessionSummary | null>(null);
  const [questions, setQuestions] = useState<QuestionDetail[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Trạng thái câu hiện tại
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [answerResult, setAnswerResult] = useState<PracticeAnswerResult | null>(null);

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
    setSelectedAnswerId(null);
    setAnswerResult(null);

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

  const handleCheckAnswer = async () => {
    if (!activeSession || !currentQuestion || selectedAnswerId === null) return;

    setSubmitting(true);
    setErrorMsg('');
    try {
      const res = await learningService.submitPracticeAnswer(
        activeSession.sessionCode,
        currentQuestion.id,
        selectedAnswerId
      );
      setAnswerResult(res);
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

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswerId(null);
      setAnswerResult(null);
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedAnswerId(null);
      setAnswerResult(null);
    }
  };

  const handleCompleteSession = async () => {
    if (!activeSession) return;
    try {
      const completed = await learningService.completePracticeSession(activeSession.sessionCode);
      setActiveSession(completed);
    } catch (err: any) {
      alert(err.message || 'Lỗi khi hoàn thành phiên.');
    }
  };

  const currentQuestion = questions[currentIndex];

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
              🎯 Tùy chọn 8 Chế độ Rèn luyện Thực hành
            </h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
              Luyện tập với chế độ phản hồi đáp án tức thời giúp khắc sâu kiến thức và nguyên tắc lái xe an toàn.
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
                    value: t.id.toString(),
                    label: `Chương ${t.orderIndex}: ${t.name}`,
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

          {activeSession && activeSession.status === 'COMPLETED' && (
            <div
              style={{
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                borderRadius: '8px',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}
            >
              <div>
                <strong style={{ color: '#065f46' }}>🎉 Đã hoàn tất phiên rèn luyện!</strong>
                <p style={{ margin: '0.2rem 0 0 0', color: '#047857', fontSize: '0.9rem' }}>
                  Kết quả: Trả lời đúng {activeSession.correctAnswers} / {activeSession.answeredQuestions} câu hỏi.
                </p>
              </div>
              <AppButton variant="secondary" size="sm" onClick={() => setActiveSession(null)}>
                Đóng kết quả
              </AppButton>
            </div>
          )}

          <div>
            <AppButton variant="primary" onClick={startPractice} disabled={loading}>
              {loading ? 'Đang khởi tạo...' : '🚀 Bắt đầu luyện tập ngay'}
            </AppButton>
          </div>
        </div>
      ) : (
        /* Active Practice Interface */
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
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.25rem' }}>🎯</span>
              <div>
                <span style={{ fontWeight: 600, color: '#1e293b' }}>
                  Câu {currentIndex + 1} / {questions.length}
                </span>
                <span style={{ color: '#64748b', fontSize: '0.85rem', marginLeft: '0.75rem' }}>
                  Đúng: <strong style={{ color: '#10b981' }}>{activeSession.correctAnswers}</strong> | Sai: <strong style={{ color: '#ef4444' }}>{activeSession.answeredQuestions - activeSession.correctAnswers}</strong>
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
                border: currentQuestion.isParalysis ? '1px solid #fca5a5' : '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
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
                    ⚠️ CÂU ĐIỂM LIỆT
                  </span>
                )}
                {currentQuestion.topicName && (
                  <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                    Chủ đề: {currentQuestion.topicName}
                  </span>
                )}
              </div>

              <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1e293b', lineHeight: '1.6' }}>
                {currentQuestion.content}
              </div>

              {currentQuestion.imageUrl && (
                <div style={{ maxWidth: '400px' }}>
                  <img
                    src={currentQuestion.imageUrl}
                    alt="Hình ảnh câu hỏi"
                    style={{ width: '100%', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                </div>
              )}

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {currentQuestion.answers.map((ans, optIdx) => {
                  const isSelected = selectedAnswerId === ans.id;
                  let bg = '#ffffff';
                  let border = '1px solid #e2e8f0';

                  if (answerResult) {
                    if (ans.id === answerResult.correctAnswerId) {
                      bg = '#ecfdf5';
                      border = '2px solid #10b981';
                    } else if (isSelected && !answerResult.isCorrect) {
                      bg = '#fef2f2';
                      border = '2px solid #ef4444';
                    }
                  } else if (isSelected) {
                    bg = '#eff6ff';
                    border = '2px solid #3b82f6';
                  }

                  return (
                    <label
                      key={ans.id}
                      style={{
                        padding: '0.9rem 1.1rem',
                        borderRadius: '8px',
                        border,
                        background: bg,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        cursor: answerResult ? 'default' : 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={ans.id}
                        checked={isSelected}
                        disabled={answerResult !== null}
                        onChange={() => setSelectedAnswerId(ans.id)}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                      <span style={{ fontWeight: 700, color: '#475569' }}>
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      <span style={{ flex: 1, fontSize: '0.95rem', color: '#1e293b' }}>
                        {ans.answerText}
                      </span>
                      {answerResult && ans.id === answerResult.correctAnswerId && (
                        <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.85rem' }}>
                          ✓ Chính xác
                        </span>
                      )}
                      {answerResult && isSelected && !answerResult.isCorrect && (
                        <span style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.85rem' }}>
                          ✗ Chưa đúng
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>

              {/* Instant Feedback Explanation */}
              {answerResult && (
                <div
                  style={{
                    background: answerResult.isCorrect ? '#f0fdf4' : '#fff1f2',
                    border: answerResult.isCorrect ? '1px solid #bbf7d0' : '1px solid #fecdd3',
                    borderRadius: '8px',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <div style={{ fontWeight: 700, color: answerResult.isCorrect ? '#166534' : '#991b1b' }}>
                    {answerResult.isCorrect ? '🎉 Bạn đã trả lời đúng!' : '⚠️ Câu trả lời chưa chính xác.'}
                  </div>
                  {answerResult.explanation && (
                    <div style={{ fontSize: '0.9rem', color: '#334155' }}>
                      <strong>Giải thích: </strong> {answerResult.explanation}
                    </div>
                  )}
                  {answerResult.legalReference && (
                    <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                      <strong>Căn cứ: </strong> {answerResult.legalReference}
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
                  ← Câu trước
                </AppButton>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {!answerResult ? (
                    <AppButton
                      variant="primary"
                      onClick={handleCheckAnswer}
                      disabled={selectedAnswerId === null || submitting}
                    >
                      {submitting ? 'Đang kiểm tra...' : 'Kiểm tra đáp án'}
                    </AppButton>
                  ) : (
                    <AppButton
                      variant="primary"
                      onClick={handleNextQuestion}
                      disabled={currentIndex === questions.length - 1}
                    >
                      Câu tiếp theo →
                    </AppButton>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
