import React, { useState, useEffect, useCallback } from 'react';
import { learningService } from '../../services/learningService';
import type { TheoryTopic, QuestionDetail } from '../../types/learning';
import { AppButton, LoadingSpinner, Alert, AppSelect, AppInput } from '../../components/ui';

interface TheoryTopicStudyTabProps {
  initialTopicId?: number | null;
}

export const TheoryTopicStudyTab: React.FC<TheoryTopicStudyTabProps> = ({ initialTopicId }) => {
  const [topics, setTopics] = useState<TheoryTopic[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(initialTopicId || null);
  const [questions, setQuestions] = useState<QuestionDetail[]>([]);
  const [filterMode, setFilterMode] = useState<'ALL' | 'PARALYSIS' | 'BOOKMARKED'>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'LIST' | 'INTERACTIVE'>('INTERACTIVE');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Trạng thái tương tác từng câu
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

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
    setCurrentIndex(0);
    setSelectedAnswerId(null);
    setShowExplanation(false);
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

  // Lọc câu hỏi theo filterMode và searchTerm
  const filteredQuestions = questions.filter((q) => {
    if (filterMode === 'PARALYSIS' && !q.isParalysis) return false;
    if (filterMode === 'BOOKMARKED' && !q.isBookmarked) return false;
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      const matchContent = q.content.toLowerCase().includes(term);
      const matchNumber = String(q.questionNumber).includes(term);
      const matchLaw = q.legalReference?.toLowerCase().includes(term);
      if (!matchContent && !matchNumber && !matchLaw) return false;
    }
    return true;
  });

  const currentQuestion: QuestionDetail | undefined = filteredQuestions[currentIndex];

  const handleNext = useCallback(() => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswerId(null);
      setShowExplanation(false);
    }
  }, [currentIndex, filteredQuestions.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedAnswerId(null);
      setShowExplanation(false);
    }
  }, [currentIndex]);

  // Phím tắt bàn phím (Mũi tên trái/phải, phím số 1-4, phím B để bookmark)
  useEffect(() => {
    if (viewMode !== 'INTERACTIVE' || !currentQuestion) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        const optIdx = parseInt(e.key, 10) - 1;
        if (currentQuestion.answers && currentQuestion.answers[optIdx]) {
          setSelectedAnswerId(currentQuestion.answers[optIdx].id);
          setShowExplanation(true);
        }
      } else if (e.key.toLowerCase() === 'b') {
        e.preventDefault();
        handleToggleBookmark(currentQuestion.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, currentQuestion, handleNext, handlePrev]);

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
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ flex: '1 1 340px' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.35rem' }}>
              Chọn chương / chủ đề lý thuyết:
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

          {/* Mode Switch: Interactive vs List */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '8px', padding: '3px' }}>
              <button
                type="button"
                onClick={() => setViewMode('INTERACTIVE')}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  background: viewMode === 'INTERACTIVE' ? '#ffffff' : 'transparent',
                  color: viewMode === 'INTERACTIVE' ? '#1e3a8a' : '#64748b',
                  boxShadow: viewMode === 'INTERACTIVE' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                🎴 Học từng câu
              </button>
              <button
                type="button"
                onClick={() => setViewMode('LIST')}
                style={{
                  padding: '0.4rem 0.85rem',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  background: viewMode === 'LIST' ? '#ffffff' : 'transparent',
                  color: viewMode === 'LIST' ? '#1e3a8a' : '#64748b',
                  boxShadow: viewMode === 'LIST' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                📜 Xem danh sách ({filteredQuestions.length})
              </button>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: '1 1 240px' }}>
            <AppInput
              placeholder="🔍 Tìm kiếm câu hỏi theo từ khóa, số câu (ví dụ: rượu bia, 15)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <AppButton
              variant={filterMode === 'ALL' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => {
                setFilterMode('ALL');
                setCurrentIndex(0);
              }}
            >
              Tất cả ({questions.length})
            </AppButton>
            <AppButton
              variant={filterMode === 'PARALYSIS' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => {
                setFilterMode('PARALYSIS');
                setCurrentIndex(0);
              }}
              style={filterMode === 'PARALYSIS' ? { backgroundColor: '#dc2626', borderColor: '#dc2626' } : { color: '#dc2626' }}
            >
              ⚠️ Điểm liệt ({questions.filter((q) => q.isParalysis).length})
            </AppButton>
            <AppButton
              variant={filterMode === 'BOOKMARKED' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => {
                setFilterMode('BOOKMARKED');
                setCurrentIndex(0);
              }}
              style={filterMode === 'BOOKMARKED' ? { backgroundColor: '#f59e0b', borderColor: '#f59e0b' } : { color: '#d97706' }}
            >
              ⭐ Đã lưu ({questions.filter((q) => q.isBookmarked).length})
            </AppButton>
          </div>
        </div>

        {selectedTopic && (
          <div style={{ padding: '0.75rem 1rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
            <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.95rem' }}>
              Chương {selectedTopic.orderIndex}: {selectedTopic.name}
            </div>
            <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.2rem' }}>
              {selectedTopic.description}
            </div>
          </div>
        )}
      </div>

      {errorMsg && <Alert type="danger" message={errorMsg} />}

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
      ) : viewMode === 'INTERACTIVE' && currentQuestion ? (
        /* INTERACTIVE SINGLE QUESTION VIEW */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', alignItems: 'start' }}>
          {/* Main Question Card */}
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
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    background: '#1e3a8a',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    padding: '0.25rem 0.7rem',
                    borderRadius: '6px',
                  }}
                >
                  Câu {currentIndex + 1} / {filteredQuestions.length}
                </span>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                  (Số gốc: #{currentQuestion.questionNumber})
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
                {currentQuestion.legalReference && (
                  <span
                    style={{
                      background: '#f1f5f9',
                      color: '#475569',
                      fontSize: '0.8rem',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                    }}
                  >
                    📜 {currentQuestion.legalReference}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleToggleBookmark(currentQuestion.id)}
                title={currentQuestion.isBookmarked ? 'Bỏ lưu câu hỏi' : 'Lưu câu hỏi (Phím B)'}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.6rem',
                  color: currentQuestion.isBookmarked ? '#f59e0b' : '#cbd5e1',
                  transition: 'transform 0.15s ease',
                }}
              >
                {currentQuestion.isBookmarked ? '⭐' : '☆'}
              </button>
            </div>

            {/* Question Content */}
            <div style={{ fontSize: '1.15rem', fontWeight: 600, color: '#1e293b', lineHeight: '1.65' }}>
              {currentQuestion.content}
            </div>

            {/* Image if available */}
            {currentQuestion.imageUrl && (
              <div style={{ maxWidth: '480px', margin: '0.25rem 0' }}>
                <img
                  src={currentQuestion.imageUrl}
                  alt={`Minh họa câu hỏi ${currentQuestion.questionNumber}`}
                  style={{ width: '100%', borderRadius: '8px', border: '1px solid #e2e8f0', objectFit: 'contain' }}
                />
              </div>
            )}

            {/* Answer Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {currentQuestion.answers.map((ans, optIndex) => {
                const isSelected = selectedAnswerId === ans.id;
                const isCorrect = ans.isCorrect === true;

                let bg = '#ffffff';
                let border = '1px solid #e2e8f0';

                if (showExplanation) {
                  if (isCorrect) {
                    bg = '#ecfdf5';
                    border = '2px solid #10b981';
                  } else if (isSelected && !isCorrect) {
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
                    onClick={() => {
                      setSelectedAnswerId(ans.id);
                      setShowExplanation(true);
                    }}
                    style={{
                      padding: '1rem 1.15rem',
                      borderRadius: '8px',
                      border,
                      background: bg,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      cursor: 'pointer',
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
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        background: showExplanation && isCorrect ? '#10b981' : isSelected ? '#3b82f6' : '#f1f5f9',
                        color: (showExplanation && isCorrect) || isSelected ? '#ffffff' : '#64748b',
                      }}
                    >
                      {String.fromCharCode(65 + optIndex)}
                    </span>
                    <span
                      style={{
                        flex: 1,
                        fontSize: '1rem',
                        color: showExplanation && isCorrect ? '#065f46' : '#1e293b',
                        fontWeight: isSelected || (showExplanation && isCorrect) ? 600 : 400,
                      }}
                    >
                      {ans.answerText}
                    </span>
                    {showExplanation && isCorrect && (
                      <span style={{ color: '#059669', fontWeight: 700, fontSize: '0.85rem' }}>
                        ✓ Đáp án đúng
                      </span>
                    )}
                    {showExplanation && isSelected && !isCorrect && (
                      <span style={{ color: '#dc2626', fontWeight: 700, fontSize: '0.85rem' }}>
                        ✗ Chưa chính xác
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Explanation Section */}
            {showExplanation && (
              <div
                style={{
                  background: '#f8fafc',
                  borderLeft: '4px solid #10b981',
                  borderRadius: '0 8px 8px 0',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                {currentQuestion.explanation && (
                  <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6 }}>
                    <strong style={{ color: '#065f46' }}>💡 Giải thích chi tiết: </strong>
                    {currentQuestion.explanation}
                  </div>
                )}
                {currentQuestion.legalReference && (
                  <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                    <strong>📜 Căn cứ quy phạm: </strong> {currentQuestion.legalReference}
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <AppButton
                variant="secondary"
                size="sm"
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                ← Câu trước (Phím ←)
              </AppButton>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {!showExplanation ? (
                  <AppButton
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowExplanation(true)}
                  >
                    Xem giải thích
                  </AppButton>
                ) : (
                  <AppButton
                    variant="primary"
                    size="sm"
                    onClick={handleNext}
                    disabled={currentIndex === filteredQuestions.length - 1}
                  >
                    Câu tiếp theo → (Phím →)
                  </AppButton>
                )}
              </div>
            </div>
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
                Lưới câu hỏi ({filteredQuestions.length})
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
              {filteredQuestions.map((q, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(idx);
                      setSelectedAnswerId(null);
                      setShowExplanation(false);
                    }}
                    title={`Câu ${idx + 1}${q.isParalysis ? ' - Điểm liệt' : ''}`}
                    style={{
                      height: '36px',
                      borderRadius: '6px',
                      border: isActive
                        ? '2px solid #2563eb'
                        : q.isParalysis
                        ? '1px solid #fca5a5'
                        : '1px solid #e2e8f0',
                      background: isActive
                        ? '#eff6ff'
                        : q.isParalysis
                        ? '#fee2e2'
                        : '#ffffff',
                      color: isActive
                        ? '#1d4ed8'
                        : q.isParalysis
                        ? '#b91c1c'
                        : '#334155',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    {idx + 1}
                    {q.isBookmarked && (
                      <span style={{ position: 'absolute', top: -3, right: 1, fontSize: '0.65rem' }}>⭐</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem', fontSize: '0.75rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: 12, height: 12, borderRadius: 2, background: '#fee2e2', border: '1px solid #fca5a5' }} />
                <span>Câu điểm liệt</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: 12, height: 12, borderRadius: 2, background: '#eff6ff', border: '2px solid #2563eb' }} />
                <span>Câu đang học</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* LIST VIEW */
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
                    Câu {index + 1}
                  </span>
                  <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                    (Số #{q.questionNumber})
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
                  }}
                >
                  {q.isBookmarked ? '⭐' : '☆'}
                </button>
              </div>

              <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1e293b', lineHeight: '1.6' }}>
                {q.content}
              </div>

              {q.imageUrl && (
                <div style={{ maxWidth: '400px', margin: '0.5rem 0' }}>
                  <img
                    src={q.imageUrl}
                    alt={`Minh họa câu hỏi ${q.questionNumber}`}
                    style={{ width: '100%', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  />
                </div>
              )}

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
