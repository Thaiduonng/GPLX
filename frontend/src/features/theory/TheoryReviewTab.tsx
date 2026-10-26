import React, { useState, useEffect } from 'react';
import { learningService } from '../../services/learningService';
import type { QuestionDetail } from '../../types/learning';
import { AppButton, LoadingSpinner, Alert } from '../../components/ui';

export const TheoryReviewTab: React.FC = () => {
  const [subTab, setSubTab] = useState<'INCORRECT' | 'BOOKMARKS'>('INCORRECT');
  const [questions, setQuestions] = useState<QuestionDetail[]>([]);
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
      } else {
        const data = await learningService.getBookmarks();
        setQuestions(data);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Không thể tải danh sách ôn tập.');
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
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem' }}>
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
            ⭐ Câu hỏi đã đánh dấu lưu trữ
          </AppButton>
        </div>

        <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
          Tổng cộng: <strong>{questions.length}</strong> câu hỏi
        </div>
      </div>

      {errorMsg && <Alert type="danger" message={errorMsg} />}

      {loading ? (
        <LoadingSpinner text="Đang tải danh sách câu hỏi..." />
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
                    Câu {q.questionNumber || idx + 1}
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
                      {q.topicName}
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
                  title={q.isBookmarked ? 'Bỏ đánh dấu' : 'Đánh dấu'}
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
                    alt="Minh họa câu hỏi"
                    style={{ width: '100%', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                </div>
              )}

              {/* Đáp án */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {q.answers.map((ans, optIdx) => {
                  const isCorrect = ans.isCorrect === true;
                  return (
                    <div
                      key={ans.id}
                      style={{
                        padding: '0.75rem 1rem',
                        borderRadius: '6px',
                        border: isCorrect ? '2px solid #10b981' : '1px solid #e2e8f0',
                        background: isCorrect ? '#ecfdf5' : '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <span style={{ fontWeight: 700, color: '#475569' }}>
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      <span style={{ flex: 1, color: isCorrect ? '#065f46' : '#334155', fontWeight: isCorrect ? 600 : 400 }}>
                        {ans.answerText}
                      </span>
                      {isCorrect && (
                        <span style={{ color: '#059669', fontWeight: 700, fontSize: '0.85rem' }}>
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
                    borderLeft: '4px solid #3b82f6',
                    borderRadius: '0 6px 6px 0',
                    padding: '0.75rem 1rem',
                    fontSize: '0.9rem',
                    color: '#334155',
                  }}
                >
                  <strong>💡 Lời giải & Cơ sở: </strong> {q.explanation}
                  {q.legalReference && (
                    <div style={{ marginTop: '0.3rem', color: '#475569', fontSize: '0.85rem' }}>
                      📜 <strong>Căn cứ: </strong> {q.legalReference}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
