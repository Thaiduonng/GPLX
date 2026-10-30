const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'frontend', 'src', 'pages', 'TheoryReviewPage.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

// 1. Add types import
content = content.replace(
    "import type { QuestionDetail } from '../types/learning';",
    "import type { QuestionDetail, MockExamSession, MockExamResult } from '../types/learning';"
);

// 2. Extend ActiveTab
content = content.replace(
    "type ActiveTab = 'OVERVIEW' | 'WRONG_ANSWERS' | 'CRITICAL' | 'BOOKMARKED' | 'TOPICS' | 'HISTORY';",
    "type ActiveTab = 'OVERVIEW' | 'MOCK_EXAM_SETS' | 'WRONG_ANSWERS' | 'CRITICAL' | 'BOOKMARKED' | 'TOPICS' | 'HISTORY';"
);

// 3. Add state and handlers right after startingSession state
const stateInsertionMarker = "const [startingSession, setStartingSession] = useState<boolean>(false);";
const stateAndHandlersCode = `const [startingSession, setStartingSession] = useState<boolean>(false);

  // ==============================================================================
  // STATE & LOGIC CHO PHÂN HỆ THI THỬ RANDOM 20 ĐỀ MẪU
  // ==============================================================================
  const [examSetsCategory, setExamSetsCategory] = useState<string>('B');
  const [currentSetNumber, setCurrentSetNumber] = useState<number>(1);
  const [examSetResults, setExamSetResults] = useState<Record<number, {
    score: number;
    totalQuestions: number;
    passed: boolean;
    failedParalysis: boolean;
    date: string;
  }>>(() => {
    try {
      const stored = localStorage.getItem('gplx_mock_set_results_v1');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [examSession, setExamSession] = useState<MockExamSession | null>(null);
  const [examCurrentIndex, setExamCurrentIndex] = useState<number>(0);
  const [examAnswers, setExamAnswers] = useState<Record<number, number>>({});
  const [examFlagged, setExamFlagged] = useState<Set<number>>(new Set());
  const [examRemainingSeconds, setExamRemainingSeconds] = useState<number>(0);
  const [examSubmitting, setExamSubmitting] = useState<boolean>(false);
  const [examStarting, setExamStarting] = useState<boolean>(false);
  const [examResult, setExamResult] = useState<MockExamResult | null>(null);
  const [examResultFilter, setExamResultFilter] = useState<'all' | 'wrong' | 'paralysis'>('all');

  // Countdown timer for mock exam
  useEffect(() => {
    if (!examSession || examRemainingSeconds <= 0) return;
    const interval = setInterval(() => {
      setExamRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitMockExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [examSession, examRemainingSeconds]);

  // Start exam by set number (1..20)
  const handleStartExamSet = async (setNumber: number) => {
    try {
      setExamStarting(true);
      setCurrentSetNumber(setNumber);
      setExamResult(null);
      setExamAnswers({});
      setExamFlagged(new Set());
      setExamCurrentIndex(0);

      // Call learningService to generate structured mock exam
      const sessionData = await learningService.startMockExam(examSetsCategory);
      setExamSession(sessionData);
      setExamRemainingSeconds(sessionData.remainingSeconds || sessionData.durationMinutes * 60);
      setActiveTab('MOCK_EXAM_SETS');
    } catch (err: any) {
      alert(err.message || 'Không thể khởi tạo đề thi thử số ' + setNumber);
    } finally {
      setExamStarting(false);
    }
  };

  // Start random exam from 20 sets
  const handleStartRandomExam = () => {
    const randomSet = Math.floor(Math.random() * 20) + 1;
    handleStartExamSet(randomSet);
  };

  // Answer question in mock exam
  const handleSelectExamAnswer = (questionId: number, answerId: number) => {
    setExamAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  // Toggle flag for review in mock exam
  const handleToggleExamFlag = (questionId: number) => {
    setExamFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };

  // Submit mock exam
  const handleSubmitMockExam = async () => {
    if (!examSession || examSubmitting) return;
    try {
      setExamSubmitting(true);
      const res = await learningService.submitMockExamSession(examSession.sessionCode, examAnswers);
      setExamResult(res);

      // Save to localStorage for this set
      const updatedResults = {
        ...examSetResults,
        [currentSetNumber]: {
          score: res.score,
          totalQuestions: res.totalQuestions,
          passed: res.passed,
          failedParalysis: res.failedParalysis,
          date: new Date().toLocaleDateString('vi-VN'),
        },
      };
      setExamSetResults(updatedResults);
      try {
        localStorage.setItem('gplx_mock_set_results_v1', JSON.stringify(updatedResults));
      } catch (e) {
        // Ignore localStorage error
      }

      setExamSession(null);
    } catch (err: any) {
      alert(err.message || 'Lỗi khi nộp bài thi thử');
    } finally {
      setExamSubmitting(false);
    }
  };

  // Format seconds MM:SS
  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return \`\${m < 10 ? '0' : ''}\${m}:\${s < 10 ? '0' : ''}\${s}\`;
  };
`;

content = content.replace(stateInsertionMarker, stateAndHandlersCode);

// 4. Add Tab Button in tabNav
const oldOverviewTabButton = `<button
              type="button"
              className={\`\${styles.tabButton} \${activeTab === 'OVERVIEW' ? styles.active : ''}\`}
              onClick={() => setActiveTab('OVERVIEW')}
            >
              <Icons.BarChart size={16} />
              Tổng quan & Đề xuất
            </button>`;

const newTabButtons = `<button
              type="button"
              className={\`\${styles.tabButton} \${activeTab === 'OVERVIEW' ? styles.active : ''}\`}
              onClick={() => setActiveTab('OVERVIEW')}
            >
              <Icons.BarChart size={16} />
              Tổng quan & Đề xuất
            </button>
            <button
              type="button"
              className={\`\${styles.tabButton} \${activeTab === 'MOCK_EXAM_SETS' ? styles.active : ''}\`}
              onClick={() => setActiveTab('MOCK_EXAM_SETS')}
              style={{ fontWeight: 700, color: activeTab === 'MOCK_EXAM_SETS' ? 'var(--color-primary)' : undefined }}
            >
              <Icons.Award size={16} />
              Thi thử 20 đề mẫu 🎲
            </button>`;

content = content.replace(oldOverviewTabButton, newTabButtons);

// 5. Add Quick Banner in OVERVIEW tab right above statsGrid
const statsGridMarker = `<div className={styles.statsGrid}>`;
const bannerToInsert = `{/* Phân hệ Thi Thử 20 Đề Mẫu Nổi Bật */}
            <div className={styles.mockExamsBanner} style={{ marginBottom: '1.5rem' }}>
              <div className={styles.mockExamsBannerContent}>
                <h3>
                  <Icons.Award size={24} />
                  Bộ 20 Đề Thi Thử Sát Hạch Chuẩn Quốc Gia 2026
                </h3>
                <p>
                  Ngân hàng 600 câu được cơ cấu thành 20 đề thi chuẩn theo quy chuẩn của Cục Cảnh sát giao thông (Thông tư 12/2025/TT-BCA). Đề thi có thời gian đếm ngược, tự động chấm điểm và đánh dấu câu điểm liệt.
                </p>
              </div>
              <div className={styles.mockExamsBannerActions}>
                <button
                  type="button"
                  className={styles.randomExamButton}
                  onClick={handleStartRandomExam}
                  disabled={examStarting}
                >
                  <Icons.Zap size={18} />
                  {examStarting ? 'Đang tạo đề...' : '🎲 Làm đề thi ngẫu nhiên ngay'}
                </button>
                <AppButton
                  variant="outline"
                  size="md"
                  onClick={() => setActiveTab('MOCK_EXAM_SETS')}
                  style={{ color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }}
                >
                  Xem danh sách 20 đề
                </AppButton>
              </div>
            </div>

            <div className={styles.statsGrid}>`;

content = content.replace(statsGridMarker, bannerToInsert);

// 6. Add render section for MOCK_EXAM_SETS tab
const activeTabHistoryMarker = `{activeTab === 'HISTORY' && (`;
const mockExamSectionJsx = `{/* ==============================================================================
             TAB: THI THỬ 20 ĐỀ MẪU NGẪU NHIÊN
             ============================================================================== */}
          {activeTab === 'MOCK_EXAM_SETS' && (
            <div className={styles.mockExamsSection}>
              {/* Trường hợp 1: Đang làm bài thi thử (Exam Taking View) */}
              {examSession ? (
                <div className={styles.examTakingContainer}>
                  {/* Exam Top Bar */}
                  <div className={styles.examTopBar}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                          ĐỀ THI MẪU SỐ {currentSetNumber < 10 ? '0' + currentSetNumber : currentSetNumber}
                        </span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: '#e0f2fe', color: '#0369a1' }}>
                          HẠNG {examSetsCategory}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-muted-foreground)', marginTop: '2px' }}>
                        Mã phiên: {examSession.sessionCode} • {examSession.totalQuestions} câu hỏi • Điểm đạt: {examSession.passingScore}/{examSession.totalQuestions}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className={\`\${styles.examTimerBadge} \${examRemainingSeconds < 120 ? styles.timerCritical : examRemainingSeconds < 300 ? styles.timerWarning : ''}\`}>
                        <Icons.Clock size={18} />
                        <span>{formatTimer(examRemainingSeconds)}</span>
                      </div>
                      <AppButton
                        variant="primary"
                        onClick={() => {
                          const unanswered = examSession.questions.length - Object.keys(examAnswers).length;
                          const msg = unanswered > 0
                            ? \`Bạn còn \${unanswered} câu chưa trả lời. Bạn có chắc chắn muốn nộp bài thi ngay không?\`
                            : 'Bạn có chắc chắn muốn nộp bài thi để chấm điểm không?';
                          if (window.confirm(msg)) {
                            handleSubmitMockExam();
                          }
                        }}
                        loading={examSubmitting}
                      >
                        <Icons.CheckCircle size={16} />
                        Nộp bài thi
                      </AppButton>
                    </div>
                  </div>

                  {/* Warning banner about critical questions */}
                  <Alert
                    type="warning"
                    title="Quy chế sát hạch đặc biệt"
                    message="Đề thi có chứa 01 câu hỏi điểm liệt (tình huống mất an toàn giao thông nghiêm trọng). Nếu trả lời sai câu điểm liệt, bài thi sẽ bị truất quyền đạt ngay cả khi đủ tổng điểm!"
                  />

                  {/* Exam Body Layout */}
                  {examSession.questions[examCurrentIndex] && (() => {
                    const currentQ = examSession.questions[examCurrentIndex];
                    const isFlagged = examFlagged.has(currentQ.id);
                    const selectedAnsId = examAnswers[currentQ.id];

                    return (
                      <div className={styles.examBodyLayout}>
                        {/* Cột trái: Nội dung câu hỏi và lựa chọn */}
                        <div className={styles.examQuestionBox}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-primary)' }}>
                                Câu {examCurrentIndex + 1} / {examSession.questions.length}
                              </span>
                              {currentQ.isParalysis && (
                                <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', background: '#fee2e2', color: '#dc2626' }}>
                                  ⚠️ CÂU ĐIỂM LIỆT
                                </span>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => handleToggleExamFlag(currentQ.id)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                background: isFlagged ? '#fef3c7' : 'transparent',
                                color: isFlagged ? '#b45309' : 'var(--color-muted-foreground)',
                                border: '1px solid',
                                borderColor: isFlagged ? '#f59e0b' : 'var(--color-border)',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                              }}
                            >
                              <Icons.Award size={14} />
                              {isFlagged ? 'Đã đánh dấu cờ' : 'Đánh dấu xem lại'}
                            </button>
                          </div>

                          <div className={styles.examQuestionTitle}>
                            {currentQ.content}
                          </div>

                          {currentQ.imageUrl && (
                            <div style={{ textAlign: 'center' }}>
                              <img
                                src={currentQ.imageUrl}
                                alt={\`Minh họa câu \${examCurrentIndex + 1}\`}
                                className={styles.examQuestionImage}
                              />
                            </div>
                          )}

                          <div className={styles.examOptionsList}>
                            {currentQ.answers.map((ans, aIdx) => {
                              const letter = ['A', 'B', 'C', 'D'][aIdx] || (aIdx + 1);
                              const isSelected = selectedAnsId === ans.id;
                              return (
                                <div
                                  key={ans.id}
                                  className={\`\${styles.examOptionItem} \${isSelected ? styles.examOptionSelected : ''}\`}
                                  onClick={() => handleSelectExamAnswer(currentQ.id, ans.id)}
                                >
                                  <div className={styles.examOptionKey}>
                                    {letter}
                                  </div>
                                  <div style={{ flex: 1 }}>
                                    {ans.answerText}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Controls Prev / Next */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                            <AppButton
                              variant="outline"
                              size="md"
                              disabled={examCurrentIndex === 0}
                              onClick={() => setExamCurrentIndex((prev) => Math.max(0, prev - 1))}
                            >
                              ← Câu trước
                            </AppButton>
                            <span style={{ fontSize: '0.9rem', color: 'var(--color-muted-foreground)' }}>
                              Đã trả lời: {Object.keys(examAnswers).length} / {examSession.questions.length} câu
                            </span>
                            <AppButton
                              variant="primary"
                              size="md"
                              disabled={examCurrentIndex === examSession.questions.length - 1}
                              onClick={() => setExamCurrentIndex((prev) => Math.min(examSession.questions.length - 1, prev + 1))}
                            >
                              Câu tiếp theo →
                            </AppButton>
                          </div>
                        </div>

                        {/* Cột phải: Bảng điều hướng câu hỏi */}
                        <div className={styles.examNavBox}>
                          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                            Danh sách câu hỏi
                          </div>
                          <div className={styles.examNavGrid}>
                            {examSession.questions.map((q, idx) => {
                              const isAnswered = examAnswers[q.id] !== undefined;
                              const isCurrent = idx === examCurrentIndex;
                              const isFlg = examFlagged.has(q.id);

                              return (
                                <button
                                  key={q.id}
                                  type="button"
                                  className={\`\${styles.examNavCell} \${isAnswered ? styles.examNavCellAnswered : ''} \${isCurrent ? styles.examNavCellCurrent : ''} \${isFlg ? styles.examNavCellFlagged : ''}\`}
                                  onClick={() => setExamCurrentIndex(idx)}
                                  title={\`Câu \${idx + 1}\${q.isParalysis ? ' (Điểm liệt)' : ''}\`}
                                >
                                  {idx + 1}
                                </button>
                              );
                            })}
                          </div>

                          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: 'var(--color-muted-foreground)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ width: '12px', height: '12px', background: '#3b82f6', borderRadius: '2px', display: 'inline-block' }} />
                              <span>Đã trả lời ({Object.keys(examAnswers).length})</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ width: '12px', height: '12px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '2px', display: 'inline-block' }} />
                              <span>Chưa làm ({examSession.questions.length - Object.keys(examAnswers).length})</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ width: '12px', height: '12px', background: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '2px', display: 'inline-block' }} />
                              <span>Đánh dấu cờ xem lại ({examFlagged.size})</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : examResult ? (
                /* Trường hợp 2: Màn hình kết quả thi thử chi tiết */
                <div className={styles.examResultModal}>
                  {/* Hero Result Banner */}
                  <div className={\`\${styles.resultHeroBanner} \${examResult.passed ? styles.resultHeroPassed : styles.resultHeroFailed}\`}>
                    <div style={{ fontSize: '3rem', marginBottom: '8px' }}>
                      {examResult.passed ? '🎉' : examResult.failedParalysis ? '🚨' : '❌'}
                    </div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 8px 0' }}>
                      {examResult.passed
                        ? 'CHÚC MỪNG BẠN ĐÃ ĐẠT YÊU CẦU SÁT HẠCH!'
                        : examResult.failedParalysis
                        ? 'KHÔNG ĐẠT: TRẢ LỜI SAI CÂU ĐIỂM LIỆT!'
                        : 'RẤT TIẾC, BẠN CHƯA ĐẠT YÊU CẦU!'}
                    </h2>
                    <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                      Kết quả: {examResult.score} / {examResult.totalQuestions} câu đúng (Cần đạt từ {examResult.passingScore}/{examResult.totalQuestions} câu)
                    </div>
                    {examResult.failedParalysis && (
                      <div style={{ marginTop: '10px', background: 'rgba(0,0,0,0.3)', padding: '6px 14px', borderRadius: '6px', display: 'inline-block', fontWeight: 700 }}>
                        ⚠️ Bị truất quyền sát hạch trực tiếp do trả lời sai câu hỏi điểm liệt!
                      </div>
                    )}
                  </div>

                  {/* Actions buttons */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <AppButton
                      variant="primary"
                      size="lg"
                      onClick={() => handleStartExamSet(currentSetNumber)}
                    >
                      <Icons.RefreshCw size={18} />
                      Thi lại đề số {currentSetNumber}
                    </AppButton>
                    <button
                      type="button"
                      className={styles.randomExamButton}
                      onClick={handleStartRandomExam}
                    >
                      🎲 Thử sức đề ngẫu nhiên khác
                    </button>
                    <AppButton
                      variant="outline"
                      size="lg"
                      onClick={() => setExamResult(null)}
                    >
                      Quay lại danh sách 20 đề mẫu
                    </AppButton>
                  </div>

                  {/* Detailed question review filter */}
                  <div style={{ marginTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <h4 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
                        Chi tiết bài thi thử (Đề số {currentSetNumber})
                      </h4>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          className={\`\${styles.filterBtn} \${examResultFilter === 'all' ? styles.active : ''}\`}
                          onClick={() => setExamResultFilter('all')}
                        >
                          Tất cả ({examResult.questions?.length || 0})
                        </button>
                        <button
                          type="button"
                          className={\`\${styles.filterBtn} \${examResultFilter === 'wrong' ? styles.active : ''}\`}
                          onClick={() => setExamResultFilter('wrong')}
                        >
                          Chỉ xem câu sai ({examResult.questions?.filter((q: any) => !q.isCorrect).length || 0})
                        </button>
                        <button
                          type="button"
                          className={\`\${styles.filterBtn} \${examResultFilter === 'paralysis' ? styles.active : ''}\`}
                          onClick={() => setExamResultFilter('paralysis')}
                        >
                          Câu điểm liệt ({examResult.questions?.filter((q: any) => q.isParalysis).length || 0})
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {examResult.questions
                        ?.filter((q: any) => {
                          if (examResultFilter === 'wrong') return !q.isCorrect;
                          if (examResultFilter === 'paralysis') return q.isParalysis;
                          return true;
                        })
                        .map((q: any, qIdx: number) => (
                          <div
                            key={q.questionId}
                            style={{
                              border: '1px solid var(--color-border)',
                              borderRadius: 'var(--radius-lg)',
                              padding: '16px',
                              background: q.isCorrect ? 'rgba(34, 197, 94, 0.04)' : 'rgba(239, 68, 68, 0.05)',
                              borderLeft: \`5px solid \${q.isCorrect ? '#22c55e' : '#ef4444'}\`,
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <span style={{ fontWeight: 700 }}>
                                Câu {q.orderIndex || qIdx + 1}: {q.content}
                              </span>
                              <div style={{ display: 'flex', gap: '6px' }}>
                                {q.isParalysis && (
                                  <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', background: '#fee2e2', color: '#dc2626' }}>
                                    ĐIỂM LIỆT
                                  </span>
                                )}
                                <span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: q.isCorrect ? '#dcfce7' : '#fee2e2', color: q.isCorrect ? '#15803d' : '#b91c1c' }}>
                                  {q.isCorrect ? '✓ ĐÚNG' : '✗ SAI'}
                                </span>
                              </div>
                            </div>

                            {q.imageUrl && (
                              <div style={{ marginBottom: '10px' }}>
                                <img
                                  src={q.imageUrl}
                                  alt="Minh họa"
                                  style={{ maxHeight: '180px', objectFit: 'contain', borderRadius: '6px' }}
                                />
                              </div>
                            )}

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem' }}>
                              {q.answers?.map((ans: any, aIdx: number) => {
                                const letter = ['A', 'B', 'C', 'D'][aIdx] || (aIdx + 1);
                                const isUserSelected = q.selectedAnswerId === ans.id;
                                const isCorrectAnswer = ans.id === q.correctAnswerId || ans.isCorrect;

                                let bg = 'transparent';
                                let color = 'inherit';
                                let border = '1px solid transparent';

                                if (isCorrectAnswer) {
                                  bg = '#dcfce7';
                                  color = '#15803d';
                                  border = '1px solid #86efac';
                                } else if (isUserSelected && !isCorrectAnswer) {
                                  bg = '#fee2e2';
                                  color = '#b91c1c';
                                  border = '1px solid #fca5a5';
                                }

                                return (
                                  <div
                                    key={ans.id}
                                    style={{
                                      padding: '8px 12px',
                                      borderRadius: '6px',
                                      background: bg,
                                      color: color,
                                      border: border,
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '8px',
                                      fontWeight: isUserSelected || isCorrectAnswer ? 600 : 400,
                                    }}
                                  >
                                    <span style={{ fontWeight: 800 }}>{letter}.</span>
                                    <span>{ans.answerText}</span>
                                    {isUserSelected && (
                                      <span style={{ marginLeft: 'auto', fontSize: '0.75rem', fontWeight: 700 }}>
                                        (Bạn đã chọn)
                                      </span>
                                    )}
                                    {isCorrectAnswer && (
                                      <span style={{ marginLeft: isUserSelected ? '8px' : 'auto', fontSize: '0.75rem', fontWeight: 700, color: '#15803d' }}>
                                        (Đáp án đúng)
                                      </span>
                                    )}
                                  </div>
                                );
                              })}
                            </div>

                            {q.explanation && (
                              <div style={{ marginTop: '10px', padding: '8px 12px', background: '#f8fafc', borderRadius: '6px', fontSize: '0.85rem', color: '#475569', borderLeft: '3px solid #3b82f6' }}>
                                💡 <strong>Giải thích / Căn cứ pháp lý:</strong> {q.explanation}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Trường hợp 3: Danh sách 20 Đề thi mẫu chuẩn */
                <>
                  <div className={styles.mockExamsBanner}>
                    <div className={styles.mockExamsBannerContent}>
                      <h3>
                        <Icons.Award size={24} />
                        Bộ 20 Đề Thi Thử Sát Hạch Chuẩn Quốc Gia
                      </h3>
                      <p>
                        Mỗi đề thi gồm 35 câu (hạng B) có chứa 01 câu điểm liệt bắt buộc, thời gian làm bài 22 phút. Hãy thử sức làm ngẫu nhiên hoặc luyện tập lần lượt từng đề từ Đề số 01 đến Đề số 20 để bảo đảm đỗ 100% trong kỳ sát hạch thật!
                      </p>
                    </div>
                    <div className={styles.mockExamsBannerActions}>
                      <div className={styles.categorySelectWrapper}>
                        <span style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>Hạng thi:</span>
                        <select
                          value={examSetsCategory}
                          onChange={(e) => setExamSetsCategory(e.target.value)}
                        >
                          <option value="B">Hạng B / B2 (35 câu - 22 phút)</option>
                          <option value="B1">Hạng B1 (30 câu - 20 phút)</option>
                          <option value="A1">Hạng A1 (25 câu - 19 phút)</option>
                          <option value="A2">Hạng A2 (25 câu - 19 phút)</option>
                          <option value="C">Hạng C (40 câu - 24 phút)</option>
                        </select>
                      </div>

                      <button
                        type="button"
                        className={styles.randomExamButton}
                        onClick={handleStartRandomExam}
                        disabled={examStarting}
                      >
                        <Icons.Zap size={18} />
                        {examStarting ? 'Đang tạo đề...' : '🎲 Bắt đầu làm đề ngẫu nhiên ngay'}
                      </button>
                    </div>
                  </div>

                  {/* Lưới 20 Đề Thi Mẫu */}
                  <div className={styles.examSetsGrid}>
                    {Array.from({ length: 20 }, (_, idx) => {
                      const setNum = idx + 1;
                      const res = examSetResults[setNum];

                      return (
                        <div key={setNum} className={styles.examSetCard}>
                          <div className={styles.examSetCardHeader}>
                            <div className={styles.examSetNumberBadge}>
                              Đề số {setNum < 10 ? '0' + setNum : setNum}
                            </div>
                            {res ? (
                              <span className={\`\${styles.examSetStatusBadge} \${res.passed ? styles.statusPassed : styles.statusFailed}\`}>
                                {res.passed ? '✓ ĐẠT' : res.failedParalysis ? '✗ LIỆT' : '✗ TRƯỢT'}
                              </span>
                            ) : (
                              <span className={\`\${styles.examSetStatusBadge} \${styles.statusNotTaken}\`}>
                                Chưa thi
                              </span>
                            )}
                          </div>

                          <div className={styles.examSetMeta}>
                            <div>• Số câu: {examSetsCategory === 'C' ? 40 : examSetsCategory === 'B1' ? 30 : examSetsCategory === 'A1' ? 25 : 35} câu hỏi</div>
                            <div>• Thời gian: {examSetsCategory === 'C' ? 24 : examSetsCategory === 'B1' ? 20 : examSetsCategory === 'A1' ? 19 : 22} phút</div>
                            <div>• Điểm liệt: 01 câu bắt buộc</div>
                            {res && (
                              <div style={{ marginTop: '4px', fontWeight: 700, color: res.passed ? '#15803d' : '#b91c1c' }}>
                                Điểm: {res.score}/{res.totalQuestions} ({res.date})
                              </div>
                            )}
                          </div>

                          <button
                            type="button"
                            className={styles.examSetActionBtn}
                            onClick={() => handleStartExamSet(setNum)}
                            disabled={examStarting}
                          >
                            <Icons.Award size={15} />
                            {res ? 'Thi lại đề này' : 'Vào thi thử'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'HISTORY' && (`;

content = content.replace(activeTabHistoryMarker, mockExamSectionJsx);

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Successfully integrated Mock Exam Sets into TheoryReviewPage.tsx!');
