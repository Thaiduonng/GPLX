import React, { useState, useEffect } from 'react';
import { learningService } from '../../services/learningService';
import type { QuestionDetail, PracticeSessionSummary, PracticeMode } from '../../types/learning';
import { AppButton, LoadingSpinner, Alert } from '../../components/ui';

interface TheoryReviewTabProps {
  onStartPractice?: (mode: PracticeMode) => void;
}

export const TheoryReviewTab: React.FC<TheoryReviewTabProps> = ({ onStartPractice }) => {
  const [subTab, setSubTab] = useState<'INCORRECT' | 'BOOKMARKS' | 'HISTORY'>('INCORRECT');
  const [questions, setQuestions] = useState<QuestionDetail[]>([]);
  const [historySessions, setHistorySessions] = useState<PracticeSessionSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    loadData();
  }, [subTab]);

  const loadData = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      if (subTab === 'INCORRECT') {
        const data = await learningService.getIncorrectQuestions();
        setQuestions(data);
      } else if (subTab === 'BOOKMARKS') {
        const data = await learningService.getBookmarks();
        setQuestions(data);
      } else {
        const data = await learningService.getPracticeHistory();
        setHistorySessions(data.content || []);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Không thể tải dữ liệu ôn tập.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleBookmark = async (questionId: number) => {
    try {
      const bookmarked = await learningService.toggleBookmark(questionId);
      if (subTab === 'BOOKMARKS' && !bookmarked) {
        setQuestions((prev) => prev.filter((q) => q.id !== questionId));
      } else {
        setQuestions((prev) =>
          prev.map((q) => (q.id === questionId ? { ...q, isBookmarked: bookmarked } : q))
        );
      }
    } catch (err: any) {
      alert(err.message || 'Lỗi khi cập nhật đánh dấu.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Sub Tabs Selector */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '1.25rem',
          border: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <AppButton
            variant={subTab === 'INCORRECT' ? 'primary' : 'secondary'}
            onClick={() => setSubTab('INCORRECT')}
            style={subTab === 'INCORRECT' ? { backgroundColor: '#dc2626', borderColor: '#dc2626' } : {}}
          >
            ❌ Các câu hỏi từng làm sai
          </AppButton>
          <AppButton
            variant={subTab === 'BOOKMARKS' ? 'primary' : 'secondary'}
            onClick={() => setSubTab('BOOKMARKS')}
            style={subTab === 'BOOKMARKS' ? { backgroundColor: '#f59e0b', borderColor: '#f59e0b' } : {}}
          >
            ⭐ Câu hỏi đã lưu đánh dấu
          </AppButton>
          <AppButton
            variant={subTab === 'HISTORY' ? 'primary' : 'secondary'}
            onClick={() => setSubTab('HISTORY')}
            style={subTab === 'HISTORY' ? { backgroundColor: '#2563eb', borderColor: '#2563eb' } : {}}
          >
            📜 Lịch sử các phiên rèn luyện
          </AppButton>
        </div>

        {subTab !== 'HISTORY' && questions.length > 0 && onStartPractice && (
          <AppButton
            variant="primary"
            size="sm"
            onClick={() => onStartPractice(subTab === 'INCORRECT' ? 'INCORRECT' : 'BOOKMARKED')}
          >
            🎯 Rèn luyện ngay danh sách này
          </AppButton>
        )}
      </div>

      {errorMsg && <Alert type="danger" message={errorMsg} />}

      {loading ? (
        <LoadingSpinner text="Đang tải dữ liệu ôn tập..." />
      ) : subTab === 'HISTORY' ? (
        /* HISTORY SESSIONS LIST */
        historySessions.length === 0 ? (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '3rem',
              textAlign: 'center',
              color: '#64748b',
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📜</div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>Chưa có lịch sử rèn luyện</h3>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              Hãy bắt đầu luyện tập ở tab "Rèn luyện 8 chế độ" để theo dõi tiến độ của bạn.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {historySessions.map((hs) => {
              const accuracy = hs.answeredQuestions > 0 ? Math.round((hs.correctAnswers / hs.answeredQuestions) * 100) : 0;
              return (
                <div
                  key={hs.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: '10px',
                    padding: '1.25rem',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>🎯</span>
                    <div>
                      <div style={{ fontWeight: 600, color: '#1e293b' }}>
                        Phiên {hs.sessionCode} — Chế độ: <span style={{ color: '#2563eb' }}>{hs.practiceMode}</span>
                      </div>
                      <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                        Bắt đầu lúc: {new Date(hs.createdAt).toLocaleString('vi-VN')}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, color: accuracy >= 80 ? '#10b981' : accuracy >= 50 ? '#f59e0b' : '#ef4444' }}>
                        Đúng {hs.correctAnswers} / {hs.answeredQuestions} câu ({accuracy}%)
                      </div>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.15rem 0.5rem',
                          borderRadius: '4px',
                          background: hs.status === 'COMPLETED' ? '#ecfdf5' : '#eff6ff',
                          color: hs.status === 'COMPLETED' ? '#065f46' : '#1d4ed8',
                          fontWeight: 600,
                        }}
                      >
                        {hs.status === 'COMPLETED' ? 'Đã hoàn tất' : 'Đang thực hiện'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : questions.length === 0 ? (
        <div
          style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '3rem',
            textAlign: 'center',
            color: '#64748b',
            border: '1px solid #e2e8f0',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
            {subTab === 'INCORRECT' ? '🎉' : '📂'}
          </div>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>
            {subTab === 'INCORRECT'
              ? 'Tuyệt vời! Bạn không có câu hỏi nào bị sai.'
              : 'Bạn chưa đánh dấu câu hỏi nào.'}
          </h3>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>
            {subTab === 'INCORRECT'
              ? 'Hãy tiếp tục làm bài thi thử hoặc rèn luyện theo chương để duy trì phong độ.'
              : 'Trong lúc học, nhấn biểu tượng ngôi sao ⭐ trên từng câu để lưu vào đây ôn tập lại.'}
          </p>
        </div>
      ) : (
        /* QUESTIONS LIST (INCORRECT OR BOOKMARKS) */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {questions.map((q, idx) => (
            <div
              key={q.id}
              style={{
                background: '#ffffff',
                borderRadius: '12px',
                padding: '1.5rem',
                border: q.isParalysis ? '1px solid #fecaca' : '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                    Câu #{q.questionNumber || idx + 1}
                  </span>
                  {q.isParalysis && (
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
                  {q.topicName && (
                    <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                      Chương: {q.topicName}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleBookmark(q.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.4rem',
                    color: q.isBookmarked ? '#f59e0b' : '#cbd5e1',
                  }}
                >
                  {q.isBookmarked ? '⭐' : '☆'}
                </button>
              </div>

              <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1e293b', lineHeight: '1.6' }}>
                {q.content}
              </div>

              {q.imageUrl && (
                <div style={{ maxWidth: '400px' }}>
                  <img
                    src={q.imageUrl}
                    alt="Hình ảnh câu hỏi"
                    style={{ width: '100%', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                </div>
              )}

              {/* Answers */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {q.answers.map((ans, optIdx) => {
                  const isCorrect = ans.isCorrect === true;
                  return (
                    <div
                      key={ans.id}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        border: isCorrect ? '2px solid #10b981' : '1px solid #e2e8f0',
                        background: isCorrect ? '#ecfdf5' : '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                      }}
                    >
                      <span
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          background: isCorrect ? '#10b981' : '#f1f5f9',
                          color: isCorrect ? '#ffffff' : '#64748b',
                        }}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span
                        style={{
                          flex: 1,
                          fontSize: '0.9rem',
                          color: isCorrect ? '#065f46' : '#334155',
                          fontWeight: isCorrect ? 600 : 400,
                        }}
                      >
                        {ans.answerText}
                      </span>
                      {isCorrect && (
                        <span style={{ color: '#059669', fontWeight: 700, fontSize: '0.8rem' }}>
                          ✓ Đáp án đúng
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {q.explanation && (
                <div
                  style={{
                    background: '#f8fafc',
                    borderLeft: '4px solid #10b981',
                    borderRadius: '0 8px 8px 0',
                    padding: '0.85rem 1rem',
                    fontSize: '0.9rem',
                    color: '#334155',
                  }}
                >
                  <strong style={{ color: '#065f46' }}>💡 Giải thích: </strong>
                  {q.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
