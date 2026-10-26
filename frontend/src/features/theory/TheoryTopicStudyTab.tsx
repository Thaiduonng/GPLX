import React, { useState, useEffect } from 'react';
import { learningService } from '../../services/learningService';
import type { TheoryTopic, QuestionDetail } from '../../types/learning';
import { AppButton, LoadingSpinner, Alert, AppSelect } from '../../components/ui';

interface TheoryTopicStudyTabProps {
  initialTopicId?: number | null;
}

export const TheoryTopicStudyTab: React.FC<TheoryTopicStudyTabProps> = ({ initialTopicId }) => {
  const [topics, setTopics] = useState<TheoryTopic[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(initialTopicId || null);
  const [questions, setQuestions] = useState<QuestionDetail[]>([]);
  const [filterMode, setFilterMode] = useState<'ALL' | 'PARALYSIS' | 'BOOKMARKED'>('ALL');
  const [loadingTopics, setLoadingTopics] = useState<boolean>(true);
  const [loadingQuestions, setLoadingQuestions] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    loadTopics();
  }, []);

  useEffect(() => {
    if (selectedTopicId) {
      loadQuestions(selectedTopicId);
    }
  }, [selectedTopicId]);

  const loadTopics = async () => {
    setLoadingTopics(true);
    try {
      const data = await learningService.getTopics();
      setTopics(data);
      if (!selectedTopicId && data.length > 0 && data[0]) {
        setSelectedTopicId(data[0].id);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Không thể tải danh sách chương lý thuyết.');
    } finally {
      setLoadingTopics(false);
    }
  };

  const loadQuestions = async (topicId: number) => {
    setLoadingQuestions(true);
    setErrorMsg('');
    try {
      const data = await learningService.getQuestionsByTopic(topicId);
      setQuestions(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Không thể tải câu hỏi trong chương.');
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleToggleBookmark = async (questionId: number) => {
    try {
      const bookmarked = await learningService.toggleBookmark(questionId);
      setQuestions((prev) =>
        prev.map((q) => (q.id === questionId ? { ...q, isBookmarked: bookmarked } : q))
      );
    } catch (err: any) {
      alert(err.message || 'Không thể lưu câu hỏi.');
    }
  };

  const filteredQuestions = questions.filter((q) => {
    if (filterMode === 'PARALYSIS') return q.isParalysis;
    if (filterMode === 'BOOKMARKED') return q.isBookmarked;
    return true;
  });

  const selectedTopic = topics.find((t) => t.id === selectedTopicId);

  if (loadingTopics) {
    return <LoadingSpinner text="Đang tải danh mục chương lý thuyết..." />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Topic Selector & Filter Header */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '1.5rem',
          border: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 320px' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
              Chọn chương / chủ đề học tập:
            </label>
            <AppSelect
              value={selectedTopicId?.toString() || ''}
              onChange={(e) => setSelectedTopicId(Number(e.target.value))}
              options={topics.map((t) => ({
                value: t.id.toString(),
                label: `Chương ${t.orderIndex}: ${t.name} (${t.totalQuestions} câu${t.paralysisQuestions > 0 ? ` - ${t.paralysisQuestions} câu liệt` : ''})`,
              }))}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <AppButton
              variant={filterMode === 'ALL' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilterMode('ALL')}
            >
              Tất cả ({questions.length})
            </AppButton>
            <AppButton
              variant={filterMode === 'PARALYSIS' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilterMode('PARALYSIS')}
              style={filterMode === 'PARALYSIS' ? { backgroundColor: '#dc2626', borderColor: '#dc2626' } : { color: '#dc2626' }}
            >
              ⚠️ Điểm liệt ({questions.filter((q) => q.isParalysis).length})
            </AppButton>
            <AppButton
              variant={filterMode === 'BOOKMARKED' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setFilterMode('BOOKMARKED')}
              style={filterMode === 'BOOKMARKED' ? { backgroundColor: '#f59e0b', borderColor: '#f59e0b' } : { color: '#d97706' }}
            >
              ⭐ Đã đánh dấu ({questions.filter((q) => q.isBookmarked).length})
            </AppButton>
          </div>
        </div>

        {selectedTopic && (
          <div style={{ padding: '0.75rem 1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
            <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.95rem' }}>
              {selectedTopic.name}
            </div>
            <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.2rem' }}>
              {selectedTopic.description}
            </div>
          </div>
        )}
      </div>

      {errorMsg && <Alert type="danger" message={errorMsg} />}

      {/* Questions List */}
      {loadingQuestions ? (
        <LoadingSpinner text="Đang tải danh sách câu hỏi..." />
      ) : filteredQuestions.length === 0 ? (
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
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📭</div>
          <p style={{ margin: 0 }}>Không có câu hỏi nào thỏa mãn bộ lọc hiện tại.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filteredQuestions.map((q, index) => (
            <div
              key={q.id}
              style={{
                background: '#ffffff',
                borderRadius: '12px',
                padding: '1.5rem',
                border: q.isParalysis ? '1px solid #fecaca' : '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {/* Question Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
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
                    Câu {q.questionNumber || index + 1}
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
                      ⚠️ CÂU ĐIỂM LIỆT (BẮT BUỘC ĐÚNG)
                    </span>
                  )}
                  {q.legalReference && (
                    <span
                      style={{
                        background: '#f1f5f9',
                        color: '#475569',
                        fontSize: '0.8rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '6px',
                      }}
                    >
                      📜 {q.legalReference}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleBookmark(q.id)}
                  title={q.isBookmarked ? 'Bỏ lưu câu hỏi' : 'Lưu câu hỏi để ôn lại'}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.4rem',
                    color: q.isBookmarked ? '#f59e0b' : '#cbd5e1',
                    transition: 'transform 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  {q.isBookmarked ? '⭐' : '☆'}
                </button>
              </div>

              {/* Content */}
              <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1e293b', lineHeight: '1.6' }}>
                {q.content}
              </div>

              {/* Image if available */}
              {q.imageUrl && (
                <div style={{ maxWidth: '400px', margin: '0.5rem 0' }}>
                  <img
                    src={q.imageUrl}
                    alt={`Minh họa câu hỏi ${q.questionNumber}`}
                    style={{ width: '100%', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                </div>
              )}

              {/* Answers */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {q.answers.map((ans, optIndex) => {
                  const isCorrect = ans.isCorrect === true;
                  return (
                    <div
                      key={ans.id}
                      style={{
                        padding: '0.85rem 1rem',
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
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          background: isCorrect ? '#10b981' : '#f1f5f9',
                          color: isCorrect ? '#ffffff' : '#64748b',
                        }}
                      >
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                      <span
                        style={{
                          flex: 1,
                          fontSize: '0.95rem',
                          color: isCorrect ? '#065f46' : '#334155',
                          fontWeight: isCorrect ? 600 : 400,
                        }}
                      >
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

              {/* Explanation & Legal Reference */}
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
                  <strong style={{ color: '#065f46' }}>💡 Giải thích chi tiết: </strong>
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
