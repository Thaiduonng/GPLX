import { LICENSE_CATEGORIES, CATEGORY_CONFIGS, getCategoryConfig } from '../components/home/categoryConfig';
import { useEffect, useState } from 'react';
import { useAuth } from '../features/auth/AuthContext';
import { reviewService } from '../services/reviewService';
import { learningService } from '../services/learningService';
import type {
  ReviewDashboardOverview,
  ReviewWrongQuestionSummary,
  ReviewTopicStat,
  ReviewSessionDetail,
  ReviewAnswerResult,
  ReviewSessionResult,
  ReviewSessionSummary,
} from '../types/review';
import type { QuestionDetail, MockExamSession, MockExamResult } from '../types/learning';
import { AppButton, StatCard, StatusBadge, Alert, LoadingSpinner, Icons } from '../components/ui';
import styles from './TheoryReviewPage.module.css';

type ActiveTab = 'OVERVIEW' | 'MOCK_EXAM_SETS' | 'WRONG_ANSWERS' | 'CRITICAL' | 'BOOKMARKED' | 'TOPICS' | 'HISTORY';

export default function TheoryReviewPage() {
  useAuth();

  // Navigation & Category filter
  const [activeTab, setActiveTab] = useState<ActiveTab>('OVERVIEW');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  // Overview data
  const [overview, setOverview] = useState<ReviewDashboardOverview | null>(null);
  const [loadingOverview, setLoadingOverview] = useState<boolean>(true);
  const [overviewError, setOverviewError] = useState<string | null>(null);

  // Tab specific data
  const [wrongQuestions, setWrongQuestions] = useState<ReviewWrongQuestionSummary[]>([]);
  const [criticalQuestions, setCriticalQuestions] = useState<QuestionDetail[]>([]);
  const [criticalFilter, setCriticalFilter] = useState<'ALL' | 'NEEDS_PRACTICE' | 'MASTERED'>('ALL');
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<QuestionDetail[]>([]);
  const [topicStats, setTopicStats] = useState<ReviewTopicStat[]>([]);
  const [historyList, setHistoryList] = useState<ReviewSessionSummary[]>([]);
  const [loadingTabData, setLoadingTabData] = useState<boolean>(false);

  // Live Review Session state
  const [activeSession, setActiveSession] = useState<ReviewSessionDetail | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [answerFeedback, setAnswerFeedback] = useState<ReviewAnswerResult | null>(null);
  const [submittingAnswer, setSubmittingAnswer] = useState<boolean>(false);
  const [sessionResult, setSessionResult] = useState<ReviewSessionResult | null>(null);
  const [startingSession, setStartingSession] = useState<boolean>(false);

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
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };


  // Load Dashboard Overview
  const fetchOverview = async (category = selectedCategory) => {
    try {
      setLoadingOverview(true);
      setOverviewError(null);
      const data = await reviewService.getDashboardOverview(category);
      setOverview(data);
      setTopicStats(data.topicStats);
      setHistoryList(data.recentSessions);
    } catch (err) {
      setOverviewError(err instanceof Error ? err.message : 'Không thể tải dữ liệu tổng quan ôn tập');
    } finally {
      setLoadingOverview(false);
    }
  };

  useEffect(() => {
    fetchOverview(selectedCategory);
  }, [selectedCategory]);

  // Load tab-specific data when tab changes
  useEffect(() => {
    if (activeTab === 'WRONG_ANSWERS') {
      loadWrongQuestions();
    } else if (activeTab === 'CRITICAL') {
      loadCriticalQuestions();
    } else if (activeTab === 'BOOKMARKED') {
      loadBookmarkedQuestions();
    } else if (activeTab === 'TOPICS') {
      loadTopicStats();
    } else if (activeTab === 'HISTORY') {
      loadHistory();
    }
  }, [activeTab, selectedCategory, criticalFilter]);

  const loadWrongQuestions = async () => {
    try {
      setLoadingTabData(true);
      const data = await reviewService.getWrongQuestions(selectedCategory);
      setWrongQuestions(data);
    } catch (err) {
      console.error('Lỗi tải câu hỏi sai:', err);
    } finally {
      setLoadingTabData(false);
    }
  };

  const loadCriticalQuestions = async () => {
    try {
      setLoadingTabData(true);
      const data = await reviewService.getCriticalQuestions(selectedCategory, criticalFilter);
      setCriticalQuestions(data);
    } catch (err) {
      console.error('Lỗi tải câu điểm liệt:', err);
    } finally {
      setLoadingTabData(false);
    }
  };

  const loadBookmarkedQuestions = async () => {
    try {
      setLoadingTabData(true);
      const data = await reviewService.getBookmarkedQuestions();
      setBookmarkedQuestions(data);
    } catch (err) {
      console.error('Lỗi tải câu đã đánh dấu:', err);
    } finally {
      setLoadingTabData(false);
    }
  };

  const loadTopicStats = async () => {
    try {
      setLoadingTabData(true);
      const data = await reviewService.getTopicStats(selectedCategory);
      setTopicStats(data);
    } catch (err) {
      console.error('Lỗi tải thống kê chủ đề:', err);
    } finally {
      setLoadingTabData(false);
    }
  };

  const loadHistory = async () => {
    try {
      setLoadingTabData(true);
      const data = await reviewService.getReviewHistory();
      setHistoryList(data);
    } catch (err) {
      console.error('Lỗi tải lịch sử ôn tập:', err);
    } finally {
      setLoadingTabData(false);
    }
  };

  // Start a Review Session
  const handleStartReview = async (
    mode: 'SMART' | 'WRONG_ANSWERS' | 'CRITICAL_PARALYSIS' | 'BOOKMARKED' | 'TOPIC' | 'CATEGORY',
    topicId?: number
  ) => {
    try {
      setStartingSession(true);
      setSessionResult(null);
      const session = await reviewService.startReviewSession({
        reviewMode: mode,
        categoryCode: selectedCategory,
        topicId: topicId,
        limit: 15,
      });
      setActiveSession(session);
      setCurrentQuestionIndex(0);
      setSelectedAnswerId(null);
      setAnswerFeedback(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Không thể khởi tạo phiên ôn tập');
    } finally {
      setStartingSession(false);
    }
  };

  // Submit Answer in Live Review Session
  const handleSubmitAnswer = async () => {
    if (!activeSession || selectedAnswerId === null) return;
    const currentQ = activeSession.questions[currentQuestionIndex];
    if (!currentQ) return;

    try {
      setSubmittingAnswer(true);
      const feedback = await reviewService.submitAnswer(activeSession.sessionCode, {
        questionId: currentQ.id,
        selectedAnswerId: selectedAnswerId,
      });
      setAnswerFeedback(feedback);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Lỗi khi gửi câu trả lời');
    } finally {
      setSubmittingAnswer(false);
    }
  };

  // Next Question
  const handleNextQuestion = () => {
    if (!activeSession) return;
    if (currentQuestionIndex + 1 < activeSession.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswerId(null);
      setAnswerFeedback(null);
    } else {
      handleCompleteSession();
    }
  };

  // Complete Session
  const handleCompleteSession = async () => {
    if (!activeSession) return;
    try {
      const result = await reviewService.completeReviewSession(activeSession.sessionCode);
      setSessionResult(result);
      setActiveSession(null);
      fetchOverview();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Lỗi khi kết thúc phiên ôn tập');
    }
  };

  // Bookmark Toggle
  const handleToggleBookmark = async (questionId: number) => {
    try {
      const isBookmarked = await learningService.toggleBookmark(questionId);
      if (activeSession) {
        const updatedQuestions = activeSession.questions.map((q) =>
          q.id === questionId ? { ...q, isBookmarked } : q
        );
        setActiveSession({ ...activeSession, questions: updatedQuestions });
      }
      if (activeTab === 'BOOKMARKED') {
        loadBookmarkedQuestions();
      }
    } catch (err) {
      console.error('Lỗi bookmark:', err);
    }
  };

  // Format mode names in Vietnamese
  const getModeDisplayName = (mode: string) => {
    switch (mode) {
      case 'SMART':
        return 'Ôn tập Thông minh (Spaced Repetition)';
      case 'WRONG_ANSWERS':
        return 'Ôn câu trả lời sai';
      case 'CRITICAL_PARALYSIS':
        return 'Ôn câu điểm liệt ⚠️';
      case 'BOOKMARKED':
        return 'Ôn câu đã đánh dấu';
      case 'TOPIC':
        return 'Ôn theo chủ đề';
      default:
        return 'Ôn tập tổng hợp';
    }
  };

  return (
    <div className={styles.container}>
      {/* ==============================================================================
          A. MÀN HÌNH PHIÊN ÔN TẬP ĐANG DIỄN RA (LIVE REVIEW SESSION)
          ============================================================================== */}
      {activeSession ? (
        <div className={styles.sessionWrapper}>
          {/* Top Session Status Bar */}
          <div className={styles.sessionTopBar}>
            <div className={styles.sessionTitleGroup}>
              <span className={styles.sessionModeTag}>
                {getModeDisplayName(activeSession.reviewMode)}
              </span>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-main)' }}>
                Câu {currentQuestionIndex + 1} / {activeSession.questions.length}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AppButton
                variant="outline"
                size="sm"
                onClick={() => {
                  if (window.confirm('Bạn có chắc chắn muốn kết thúc phiên ôn tập sớm?')) {
                    handleCompleteSession();
                  }
                }}
              >
                Kết thúc phiên
              </AppButton>
            </div>
          </div>

          {/* Progress Bar */}
          <div className={styles.progressBarContainer}>
            <div
              className={styles.progressBarFill}
              style={{
                width: `${((currentQuestionIndex + (answerFeedback ? 1 : 0)) / activeSession.questions.length) * 100}%`,
              }}
            />
          </div>

          {/* Question Card */}
          {(() => {
            const currentQuestion = activeSession.questions[currentQuestionIndex];
            if (!currentQuestion) return null;
            return (
            <div className={styles.questionCard}>
              <div className={styles.questionHeader}>
                <div className={styles.questionMeta}>
                  <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                    Câu hỏi #{currentQuestion.questionNumber}
                  </span>
                  {currentQuestion.topicName && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-muted-foreground)' }}>
                      • {currentQuestion.topicName}
                    </span>
                  )}
                  {currentQuestion.isParalysis && (
                    <span className={styles.paralysisWarningBadge}>
                      ⚠️ CÂU ĐIỂM LIỆT
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleBookmark(currentQuestion.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: currentQuestion.isBookmarked ? '#f59e0b' : 'var(--color-muted-foreground)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                  title="Đánh dấu câu hỏi để xem lại"
                >
                  <Icons.Award size={18} />
                  {currentQuestion.isBookmarked ? 'Đã lưu' : 'Lưu câu này'}
                </button>
              </div>

              {/* Question Content */}
              <div className={styles.questionContent}>
                {currentQuestion.content}
              </div>

              {/* Illustration Image */}
              {currentQuestion.imageUrl && (
                <img
                  src={currentQuestion.imageUrl}
                  alt="Minh họa tình huống"
                  className={styles.questionImage}
                />
              )}

              {/* Answer Options */}
              <div className={styles.optionsList}>
                {currentQuestion.answers.map((ans, idx) => {
                  let optionClass = styles.optionItem;
                  if (answerFeedback) {
                    if (ans.id === answerFeedback.correctAnswerId) {
                      optionClass += ` ${styles.correct}`;
                    } else if (ans.id === selectedAnswerId && !answerFeedback.correct) {
                      optionClass += ` ${styles.incorrect}`;
                    }
                  } else if (selectedAnswerId === ans.id) {
                    optionClass += ` ${styles.correct}`;
                  }

                  return (
                    <button
                      key={ans.id}
                      type="button"
                      className={optionClass}
                      onClick={() => !answerFeedback && setSelectedAnswerId(ans.id)}
                      disabled={!!answerFeedback || submittingAnswer}
                    >
                      <div className={styles.optionIndexBadge}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <div style={{ flex: 1 }}>{ans.answerText}</div>
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Explanations */}
              {answerFeedback && (
                <div
                  className={`${styles.feedbackCard} ${
                    answerFeedback.correct ? styles.success : styles.danger
                  }`}
                >
                  <div className={styles.feedbackHeader}>
                    {answerFeedback.correct ? (
                      <>
                        <Icons.CheckCircle size={20} color="var(--color-success)" />
                        <span style={{ color: 'var(--color-success)' }}>
                          CHÍNH XÁC! Bạn đã trả lời đúng.
                        </span>
                      </>
                    ) : (
                      <>
                        <Icons.X size={20} color="var(--color-danger)" />
                        <span style={{ color: 'var(--color-danger)' }}>
                          CHƯA CHÍNH XÁC. Hãy ghi nhớ kiến thức dưới đây.
                        </span>
                      </>
                    )}
                  </div>

                  {answerFeedback.explanation && (
                    <div className={styles.feedbackExplanation}>
                      <strong>Giải thích:</strong> {answerFeedback.explanation}
                    </div>
                  )}

                  {answerFeedback.legalReference && (
                    <div className={styles.feedbackLegal}>
                      Căn cứ pháp lý: {answerFeedback.legalReference}
                    </div>
                  )}

                  {/* Leitner Spaced Repetition Indicator */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
                    <span className={styles.leitnerBoxBadge}>
                      Hộp Leitner {answerFeedback.boxLevel}/5
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-muted-foreground)' }}>
                      Chu kỳ ôn tiếp theo: <strong>{answerFeedback.intervalDays} ngày</strong> (Hạn ôn: {answerFeedback.nextReviewAt})
                    </span>
                    <StatusBadge
                      variant={answerFeedback.masteryStatus === 'MASTERED' ? 'success' : 'warning'}
                      label={answerFeedback.masteryStatus === 'MASTERED' ? 'Đã thành thạo' : 'Đang củng cố'}
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className={styles.sessionActions}>
                <AppButton
                  variant="outline"
                  size="md"
                  onClick={() => {
                    if (currentQuestionIndex > 0) {
                      setCurrentQuestionIndex(currentQuestionIndex - 1);
                      setSelectedAnswerId(null);
                      setAnswerFeedback(null);
                    }
                  }}
                  disabled={currentQuestionIndex === 0}
                >
                  ← Câu trước
                </AppButton>

                {!answerFeedback ? (
                  <AppButton
                    variant="primary"
                    size="md"
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswerId === null || submittingAnswer}
                    loading={submittingAnswer}
                  >
                    Xác nhận đáp án
                  </AppButton>
                ) : (
                  <AppButton
                    variant="success"
                    size="md"
                    onClick={handleNextQuestion}
                  >
                    {currentQuestionIndex + 1 < activeSession.questions.length ? 'Câu tiếp theo →' : 'Xem kết quả tổng kết 🏆'}
                  </AppButton>
                )}
              </div>
            </div>
            );
          })()}
        </div>
      ) : sessionResult ? (
        /* ==============================================================================
           B. MÀN HÌNH KẾT QUẢ PHIÊN ÔN TẬP (SESSION RESULT SCREEN)
           ============================================================================== */
        <div className={styles.resultCard}>
          <div
            className={styles.resultHeaderIcon}
            style={{
              backgroundColor: sessionResult.accuracyRate >= 80 ? 'var(--color-success-bg)' : 'var(--color-warning-bg)',
              color: sessionResult.accuracyRate >= 80 ? 'var(--color-success)' : 'var(--color-warning)',
            }}
          >
            <Icons.Award size={40} />
          </div>

          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: '0 0 6px 0' }}>
              Hoàn thành Phiên Ôn tập
            </h2>
            <p style={{ color: 'var(--color-muted-foreground)', fontSize: '0.9rem', margin: 0 }}>
              Mã phiên: <code>{sessionResult.sessionCode}</code> • {getModeDisplayName(sessionResult.reviewMode)}
            </p>
          </div>

          {/* Stats Boxes */}
          <div className={styles.resultStatsRow}>
            <div className={styles.resultStatBox}>
              <span className={styles.resultStatNumber} style={{ color: 'var(--color-primary)' }}>
                {sessionResult.totalQuestions}
              </span>
              <span className={styles.resultStatTitle}>Tổng số câu đã ôn</span>
            </div>
            <div className={styles.resultStatBox}>
              <span className={styles.resultStatNumber} style={{ color: 'var(--color-success)' }}>
                {sessionResult.correctAnswers}
              </span>
              <span className={styles.resultStatTitle}>Trả lời đúng</span>
            </div>
            <div className={styles.resultStatBox}>
              <span className={styles.resultStatNumber} style={{ color: sessionResult.incorrectAnswers > 0 ? 'var(--color-danger)' : 'var(--color-text-main)' }}>
                {sessionResult.incorrectAnswers}
              </span>
              <span className={styles.resultStatTitle}>Trả lời sai</span>
            </div>
          </div>

          {/* Suggested Next Step Banner */}
          <Alert
            type={sessionResult.incorrectAnswers === 0 ? 'success' : 'warning'}
            title="Đánh giá & Gợi ý từ Thuật toán Ôn tập"
            message={sessionResult.suggestedNextStep}
          />

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {sessionResult.incorrectAnswers > 0 && (
              <AppButton
                variant="primary"
                size="md"
                onClick={() => handleStartReview('WRONG_ANSWERS')}
                icon={<Icons.RefreshCw size={16} />}
              >
                Ôn lại toàn bộ câu sai
              </AppButton>
            )}
            <AppButton
              variant="outline"
              size="md"
              onClick={() => {
                setSessionResult(null);
                setActiveTab('OVERVIEW');
              }}
            >
              Về trang tổng quan
            </AppButton>
          </div>
        </div>
      ) : (
        /* ==============================================================================
           C. TRANG CHÍNH MODULE ÔN TẬP (OVERVIEW & TABS)
           ============================================================================== */
        <>
          {/* Page Header */}
          <div className={styles.pageHeader}>
            <div className={styles.titleArea}>
              <h2>Phân Hệ Ôn Tập & Củng Cố Kiến Thức (LMS)</h2>
              <p>
                Thuật toán lặp lại ngắt quãng (Spaced Repetition) giúp củng cố kiến thức chưa vững, xóa điểm yếu và chinh phục 600 câu hỏi GPLX.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-muted-foreground)' }}>
                Hạng đào tạo:
              </span>
              <select
                className={styles.filterSelect}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="ALL">Tất cả hạng bằng</option>
                {LICENSE_CATEGORIES.map(c => <option key={c.code} value={c.code}>{c.fullName}</option>)}
              </select>
            </div>
          </div>

          {overviewError && (
            <Alert
              type="danger"
              title="Lỗi tải dữ liệu"
              message={overviewError}
            />
          )}

          {/* Smart Recommendation Banner */}
          {overview && (
            <div className={styles.smartBanner}>
              <div className={styles.smartBannerContent}>
                <div className={styles.smartBadge}>
                  <Icons.Activity size={14} />
                  <span>Gợi ý Ôn tập Thông minh</span>
                </div>
                <div className={styles.smartTitle}>
                  {overview.recommendedMode === 'CRITICAL_PARALYSIS'
                    ? 'Ưu tiên củng cố câu hỏi Điểm liệt ⚠️'
                    : overview.recommendedMode === 'WRONG_ANSWERS'
                    ? 'Khắc phục các câu từng trả lời sai'
                    : 'Đến lịch lặp lại ngắt quãng hôm nay'}
                </div>
                <p className={styles.smartDesc}>
                  {overview.recommendedReason}
                </p>
              </div>
              <div className={styles.smartBannerActions}>
                <AppButton
                  variant="success"
                  size="lg"
                  onClick={() =>
                    handleStartReview(
                      overview.recommendedMode as
                        | 'SMART'
                        | 'WRONG_ANSWERS'
                        | 'CRITICAL_PARALYSIS'
                        | 'BOOKMARKED'
                        | 'TOPIC'
                        | 'CATEGORY'
                    )
                  }
                  loading={startingSession}
                  icon={<Icons.BookOpen size={18} />}
                >
                  Bắt đầu phiên ôn tập ngay
                </AppButton>
              </div>
            </div>
          )}

          {/* KPI Summary Cards */}
          {loadingOverview ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <LoadingSpinner text="Đang đồng bộ dữ liệu ôn tập..." />
            </div>
          ) : overview ? (
            <>
              {/* Phân hệ Thi Thử 20 Đề Mẫu Nổi Bật */}
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
                  ⚡
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

            <div className={styles.statsGrid}>
              <StatCard
                title="Tổng câu cần ôn tập"
                value={overview.totalQuestionsNeedingReview}
                subtitle="Dựa trên lịch sử trả lời & chu kỳ SR"
                icon={<Icons.BookOpen size={24} />}
                variant="primary"
              />
              <StatCard
                title="Câu sai chưa củng cố"
                value={overview.unconsolidatedWrongCount}
                subtitle="Chưa đạt mức ghi nhớ thành thạo"
                icon={<Icons.X size={24} />}
                variant="danger"
              />
              <StatCard
                title="Câu điểm liệt cần ôn"
                value={overview.criticalNeedingReviewCount}
                subtitle="⚠️ Bắt buộc đúng 100% khi thi"
                icon={<Icons.ShieldCheck size={24} />}
                variant="warning"
              />
              <StatCard
                title="Câu hỏi đã thành thạo"
                value={overview.totalMasteredCount}
                subtitle="Đạt hộp Leitner 4..5 liên tục"
                icon={<Icons.CheckCircle size={24} />}
                variant="success"
              />
            </div>
          </>
          ) : null}

          {/* Sub-Tabs Navigation */}
          <div className={styles.tabNav}>
            <button
              type="button"
              className={`${styles.tabButton} ${activeTab === 'OVERVIEW' ? styles.active : ''}`}
              onClick={() => setActiveTab('OVERVIEW')}
            >
              <Icons.BarChart size={16} />
              Tổng quan & Đề xuất
            </button>
            <button
              type="button"
              className={`${styles.tabButton} ${activeTab === 'WRONG_ANSWERS' ? styles.active : ''}`}
              onClick={() => setActiveTab('WRONG_ANSWERS')}
            >
              <Icons.X size={16} />
              Ôn câu trả lời sai
              {overview && overview.unconsolidatedWrongCount > 0 && (
                <span className={styles.tabCountBadge}>
                  {overview.unconsolidatedWrongCount}
                </span>
              )}
            </button>
            <button
              type="button"
              className={`${styles.tabButton} ${activeTab === 'CRITICAL' ? styles.active : ''}`}
              onClick={() => setActiveTab('CRITICAL')}
            >
              <Icons.ShieldCheck size={16} />
              Ôn câu điểm liệt ⚠️
            </button>
            <button
              type="button"
              className={`${styles.tabButton} ${activeTab === 'BOOKMARKED' ? styles.active : ''}`}
              onClick={() => setActiveTab('BOOKMARKED')}
            >
              <Icons.Award size={16} />
              Câu đã đánh dấu
            </button>
            <button
              type="button"
              className={`${styles.tabButton} ${activeTab === 'TOPICS' ? styles.active : ''}`}
              onClick={() => setActiveTab('TOPICS')}
            >
              <Icons.BookOpen size={16} />
              Ôn theo 7 chủ đề
            </button>
            <button
              type="button"
              className={`${styles.tabButton} ${activeTab === 'HISTORY' ? styles.active : ''}`}
              onClick={() => setActiveTab('HISTORY')}
            >
              <Icons.Calendar size={16} />
              Lịch sử phiên ôn
            </button>
          </div>

          {/* Tab Content Display */}
          {activeTab === 'OVERVIEW' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Topics Progress Summary */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>
                  Tình trạng Nắm vững theo 7 Chương Lý thuyết
                </h3>
                <AppButton
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('TOPICS')}
                >
                  Xem chi tiết từng chương →
                </AppButton>
              </div>

              <div className={styles.topicsGrid}>
                {topicStats.map((topic) => (
                  <div key={topic.topicId} className={styles.topicCard}>
                    <div className={styles.topicCardHeader}>
                      <h4 className={styles.topicCardTitle}>{topic.topicName}</h4>
                      <span
                        className={`${styles.topicPriorityBadge} ${
                          topic.priorityLevel === 'HIGH'
                            ? styles.priorityHigh
                            : topic.priorityLevel === 'MEDIUM'
                            ? styles.priorityMedium
                            : styles.priorityLow
                        }`}
                      >
                        Ưu tiên: {topic.priorityLevel === 'HIGH' ? 'CAO' : topic.priorityLevel === 'MEDIUM' ? 'TRUNG BÌNH' : 'THẤP'}
                      </span>
                    </div>

                    <div className={styles.topicCardStats}>
                      <div>
                        <span className={styles.statItemLabel}>Đã làm: </span>
                        <span className={styles.statItemValue}>{topic.totalAnswered} câu</span>
                      </div>
                      <div>
                        <span className={styles.statItemLabel}>Từng sai: </span>
                        <span className={styles.statItemValue} style={{ color: topic.wrongCount > 0 ? 'var(--color-danger)' : 'inherit' }}>
                          {topic.wrongCount} câu
                        </span>
                      </div>
                      <div>
                        <span className={styles.statItemLabel}>Độ chính xác: </span>
                        <span className={styles.statItemValue}>{topic.recentAccuracyRate}%</span>
                      </div>
                      <div>
                        <span className={styles.statItemLabel}>Cần ôn tập: </span>
                        <span className={styles.statItemValue} style={{ color: 'var(--color-primary)' }}>
                          {topic.needReviewCount} câu
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-foreground)' }}>
                        {topic.lastReviewedAt}
                      </span>
                      <AppButton
                        variant="outline"
                        size="sm"
                        onClick={() => handleStartReview('TOPIC', topic.topicId)}
                      >
                        Ôn chương này
                      </AppButton>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'WRONG_ANSWERS' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className={styles.filterBar}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700 }}>
                    Danh sách câu hỏi từng trả lời sai ({wrongQuestions.length} câu)
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-muted-foreground)' }}>
                    Tổng hợp từ bài luyện tập, bài thi thử và phiên ôn tập. Bổ sung liên tục vào hàng đợi củng cố.
                  </p>
                </div>
                {wrongQuestions.length > 0 && (
                  <AppButton
                    variant="primary"
                    size="md"
                    onClick={() => handleStartReview('WRONG_ANSWERS')}
                    icon={<Icons.BookOpen size={16} />}
                  >
                    Bắt đầu ôn {wrongQuestions.length} câu sai
                  </AppButton>
                )}
              </div>

              {loadingTabData ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <LoadingSpinner text="Đang tải danh sách câu sai..." />
                </div>
              ) : wrongQuestions.length === 0 ? (
                <Alert
                  type="success"
                  title="Không có câu hỏi sai chưa củng cố"
                  message="Xuất sắc! Bạn không có câu hỏi sai nào đang tồn đọng. Hãy làm thêm bài luyện tập hoặc thi thử để phát hiện các lỗ hổng kiến thức nếu có."
                />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {wrongQuestions.map((q) => (
                    <div
                      key={q.questionId}
                      style={{
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '1rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      <div style={{ flex: 1, minWidth: '260px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                            Câu #{q.questionNumber}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--color-muted-foreground)' }}>
                            • {q.topicName}
                          </span>
                          {q.isParalysis && (
                            <span className={styles.paralysisWarningBadge}>
                              ⚠️ ĐIỂM LIỆT
                            </span>
                          )}
                          <StatusBadge
                            variant={q.masteryStatus === 'MASTERED' ? 'success' : 'danger'}
                            label={q.masteryStatus === 'MASTERED' ? 'Đã nắm vững' : 'Cần ôn gấp'}
                          />
                        </div>
                        <p style={{ margin: '0 0 6px 0', fontSize: '0.95rem', color: 'var(--color-text-main)', fontWeight: 500 }}>
                          {q.content}
                        </p>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-muted-foreground)', display: 'flex', gap: '12px' }}>
                          <span>Số lần sai: <strong style={{ color: 'var(--color-danger)' }}>{q.wrongAttempts}</strong></span>
                          <span>Đúng liên tiếp: <strong>{q.consecutiveCorrect}</strong></span>
                          <span>Sai gần nhất: {q.lastWrongAt}</span>
                        </div>
                      </div>

                      <AppButton
                        variant="outline"
                        size="sm"
                        onClick={() => handleStartReview('WRONG_ANSWERS')}
                      >
                        Ôn câu này
                      </AppButton>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'CRITICAL' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className={styles.filterBar}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700 }}>
                    Ngân hàng 60 Câu Hỏi Điểm Liệt Đã Xác Minh (VERIFIED)
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-muted-foreground)' }}>
                    Căn cứ Thông tư 12/2017/TT-BGTVT và Thông tư 04/2022/TT-BGTVT. Bắt buộc phải trả lời đúng 100% trong bài thi.
                  </p>
                </div>
                <div className={styles.filterGroup}>
                  <select
                    className={styles.filterSelect}
                    value={criticalFilter}
                    onChange={(e) => setCriticalFilter(e.target.value as 'ALL' | 'NEEDS_PRACTICE' | 'MASTERED')}
                  >
                    <option value="ALL">Tất cả câu điểm liệt</option>
                    <option value="NEEDS_PRACTICE">Chưa nắm vững / Cần ôn</option>
                    <option value="MASTERED">Đã thành thạo</option>
                  </select>
                  <AppButton
                    variant="primary"
                    size="md"
                    onClick={() => handleStartReview('CRITICAL_PARALYSIS')}
                    icon={<Icons.ShieldCheck size={16} />}
                  >
                    Bắt đầu ôn câu điểm liệt
                  </AppButton>
                </div>
              </div>

              {loadingTabData ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <LoadingSpinner text="Đang tải danh mục câu điểm liệt..." />
                </div>
              ) : criticalQuestions.length === 0 ? (
                <Alert
                  type="info"
                  title="Không có câu hỏi phù hợp"
                  message="Không tìm thấy câu hỏi điểm liệt nào tương ứng với bộ lọc đã chọn."
                />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {criticalQuestions.map((q) => (
                    <div
                      key={q.id}
                      style={{
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '1rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      <div style={{ flex: 1, minWidth: '260px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                            Câu #{q.questionNumber}
                          </span>
                          <span className={styles.paralysisWarningBadge}>
                            ⚠️ ĐIỂM LIỆT
                          </span>
                          {q.legalReference && (
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-foreground)' }}>
                              ({q.legalReference})
                            </span>
                          )}
                        </div>
                        <p style={{ margin: '0 0 6px 0', fontSize: '0.95rem', color: 'var(--color-text-main)', fontWeight: 500 }}>
                          {q.content}
                        </p>
                        {q.explanation && (
                          <div style={{ fontSize: '0.85rem', color: 'var(--color-success)', fontWeight: 500 }}>
                            Đáp án đúng & giải thích: {q.explanation}
                          </div>
                        )}
                      </div>

                      <AppButton
                        variant="outline"
                        size="sm"
                        onClick={() => handleStartReview('CRITICAL_PARALYSIS')}
                      >
                        Luyện ngay
                      </AppButton>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'BOOKMARKED' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className={styles.filterBar}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700 }}>
                    Danh sách câu hỏi đã lưu đánh dấu ({bookmarkedQuestions.length} câu)
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-muted-foreground)' }}>
                    Các câu hỏi bạn đã chủ động cắm cờ hoặc gắn nhãn lưu lại trong quá trình học tập và thi thử.
                  </p>
                </div>
                {bookmarkedQuestions.length > 0 && (
                  <AppButton
                    variant="primary"
                    size="md"
                    onClick={() => handleStartReview('BOOKMARKED')}
                    icon={<Icons.Award size={16} />}
                  >
                    Bắt đầu ôn {bookmarkedQuestions.length} câu đã lưu
                  </AppButton>
                )}
              </div>

              {loadingTabData ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <LoadingSpinner text="Đang tải danh sách câu đánh dấu..." />
                </div>
              ) : bookmarkedQuestions.length === 0 ? (
                <Alert
                  type="info"
                  title="Chưa có câu hỏi nào được đánh dấu"
                  message="Trong khi học hoặc làm bài, bạn có thể bấm nút 'Lưu câu này' để đưa câu hỏi vào danh sách xem lại tại đây."
                />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {bookmarkedQuestions.map((q) => (
                    <div
                      key={q.id}
                      style={{
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '1rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      <div style={{ flex: 1, minWidth: '260px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                            Câu #{q.questionNumber}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--color-muted-foreground)' }}>
                            • {q.topicName}
                          </span>
                          {q.isParalysis && (
                            <span className={styles.paralysisWarningBadge}>
                              ⚠️ ĐIỂM LIỆT
                            </span>
                          )}
                        </div>
                        <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-text-main)', fontWeight: 500 }}>
                          {q.content}
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <AppButton
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleBookmark(q.id)}
                        >
                          Bỏ lưu
                        </AppButton>
                        <AppButton
                          variant="outline"
                          size="sm"
                          onClick={() => handleStartReview('BOOKMARKED')}
                        >
                          Ôn tập
                        </AppButton>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'TOPICS' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className={styles.filterBar}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700 }}>
                    Tiến độ Ôn tập & Nắm vững theo 7 Chương Lý thuyết
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-muted-foreground)' }}>
                    Hệ thống đánh giá độ ưu tiên (CAO/TRUNG BÌNH/THẤP) dựa trên số câu trả lời sai và độ chính xác gần đây.
                  </p>
                </div>
              </div>

              <div className={styles.topicsGrid}>
                {topicStats.map((topic) => (
                  <div key={topic.topicId} className={styles.topicCard}>
                    <div className={styles.topicCardHeader}>
                      <h4 className={styles.topicCardTitle}>{topic.topicName}</h4>
                      <span
                        className={`${styles.topicPriorityBadge} ${
                          topic.priorityLevel === 'HIGH'
                            ? styles.priorityHigh
                            : topic.priorityLevel === 'MEDIUM'
                            ? styles.priorityMedium
                            : styles.priorityLow
                        }`}
                      >
                        Ưu tiên: {topic.priorityLevel === 'HIGH' ? 'CAO' : topic.priorityLevel === 'MEDIUM' ? 'TRUNG BÌNH' : 'THẤP'}
                      </span>
                    </div>

                    <div className={styles.topicCardStats}>
                      <div>
                        <span className={styles.statItemLabel}>Đã làm: </span>
                        <span className={styles.statItemValue}>{topic.totalAnswered} câu</span>
                      </div>
                      <div>
                        <span className={styles.statItemLabel}>Từng sai: </span>
                        <span className={styles.statItemValue} style={{ color: topic.wrongCount > 0 ? 'var(--color-danger)' : 'inherit' }}>
                          {topic.wrongCount} câu
                        </span>
                      </div>
                      <div>
                        <span className={styles.statItemLabel}>Độ chính xác: </span>
                        <span className={styles.statItemValue}>{topic.recentAccuracyRate}%</span>
                      </div>
                      <div>
                        <span className={styles.statItemLabel}>Cần ôn tập: </span>
                        <span className={styles.statItemValue} style={{ color: 'var(--color-primary)' }}>
                          {topic.needReviewCount} câu
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-muted-foreground)' }}>
                        {topic.lastReviewedAt}
                      </span>
                      <AppButton
                        variant="primary"
                        size="sm"
                        onClick={() => handleStartReview('TOPIC', topic.topicId)}
                      >
                        Bắt đầu ôn chương này
                      </AppButton>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ==============================================================================
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
                      <div className={`${styles.examTimerBadge} ${examRemainingSeconds < 120 ? styles.timerCritical : examRemainingSeconds < 300 ? styles.timerWarning : ''}`}>
                        ⏱️
                        <span>{formatTimer(examRemainingSeconds)}</span>
                      </div>
                      <AppButton
                        variant="primary"
                        onClick={() => {
                          const unanswered = examSession.questions.length - Object.keys(examAnswers).length;
                          const msg = unanswered > 0
                            ? `Bạn còn ${unanswered} câu chưa trả lời. Bạn có chắc chắn muốn nộp bài thi ngay không?`
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
                                alt={`Minh họa câu ${examCurrentIndex + 1}`}
                                className={styles.examQuestionImage}
                              />
                            </div>
                          )}

                          <div className={styles.examOptionsList}>
                            {currentQ.options.map((ans: any, aIdx: number) => {
                              const letter = ['A', 'B', 'C', 'D'][aIdx] || (aIdx + 1);
                              const isSelected = selectedAnsId === ans.id;
                              return (
                                <div
                                  key={ans.id}
                                  className={`${styles.examOptionItem} ${isSelected ? styles.examOptionSelected : ''}`}
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
                                  className={`${styles.examNavCell} ${isAnswered ? styles.examNavCellAnswered : ''} ${isCurrent ? styles.examNavCellCurrent : ''} ${isFlg ? styles.examNavCellFlagged : ''}`}
                                  onClick={() => setExamCurrentIndex(idx)}
                                  title={`Câu ${idx + 1}${q.isParalysis ? ' (Điểm liệt)' : ''}`}
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
                  <div className={`${styles.resultHeroBanner} ${examResult.passed ? styles.resultHeroPassed : styles.resultHeroFailed}`}>
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
                          className={`${styles.filterBtn} ${examResultFilter === 'all' ? styles.active : ''}`}
                          onClick={() => setExamResultFilter('all')}
                        >
                          Tất cả ({examResult.questions?.length || 0})
                        </button>
                        <button
                          type="button"
                          className={`${styles.filterBtn} ${examResultFilter === 'wrong' ? styles.active : ''}`}
                          onClick={() => setExamResultFilter('wrong')}
                        >
                          Chỉ xem câu sai ({examResult.questions?.filter((q: any) => !q.isCorrect).length || 0})
                        </button>
                        <button
                          type="button"
                          className={`${styles.filterBtn} ${examResultFilter === 'paralysis' ? styles.active : ''}`}
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
                              borderLeft: `5px solid ${q.isCorrect ? '#22c55e' : '#ef4444'}`,
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
                          {Object.values(CATEGORY_CONFIGS).map(c => <option key={c.code} value={c.code}>{c.name} ({c.questionsPerExam} câu - {c.timeMinutes} phút)</option>)}
                        </select>
                      </div>

                      <button
                        type="button"
                        className={styles.randomExamButton}
                        onClick={handleStartRandomExam}
                        disabled={examStarting}
                      >
                        ⚡
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
                              <span className={`${styles.examSetStatusBadge} ${res.passed ? styles.statusPassed : styles.statusFailed}`}>
                                {res.passed ? '✓ ĐẠT' : res.failedParalysis ? '✗ LIỆT' : '✗ TRƯỢT'}
                              </span>
                            ) : (
                              <span className={`${styles.examSetStatusBadge} ${styles.statusNotTaken}`}>
                                Chưa thi
                              </span>
                            )}
                          </div>

                          <div className={styles.examSetMeta}>
                            <div>• Số câu: {getCategoryConfig(examSetsCategory).questionsPerExam} câu hỏi</div>
                            <div>• Thời gian: {getCategoryConfig(examSetsCategory).timeMinutes} phút</div>
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

          {activeTab === 'HISTORY' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className={styles.filterBar}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700 }}>
                    Lịch sử các phiên ôn tập đã thực hiện
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-muted-foreground)' }}>
                    Lưu trữ vĩnh viễn kết quả các phiên ôn tập để đánh giá mức độ tiến bộ qua từng thời kỳ.
                  </p>
                </div>
              </div>

              {loadingTabData ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <LoadingSpinner text="Đang tải lịch sử phiên ôn..." />
                </div>
              ) : historyList.length === 0 ? (
                <Alert
                  type="info"
                  title="Chưa có lịch sử phiên ôn tập"
                  message="Bạn chưa thực hiện phiên ôn tập nào. Hãy chọn một chế độ ôn tập ở trên để bắt đầu củng cố kiến thức."
                />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {historyList.map((s) => (
                    <div
                      key={s.id}
                      style={{
                        backgroundColor: 'var(--color-surface)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '1rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                            {getModeDisplayName(s.reviewMode)}
                          </span>
                          <span style={{ fontSize: '0.8rem', color: 'var(--color-muted-foreground)' }}>
                            (Mã: {s.sessionCode})
                          </span>
                          <StatusBadge
                            variant={s.status === 'COMPLETED' ? 'success' : 'warning'}
                            label={s.status === 'COMPLETED' ? 'Đã hoàn thành' : 'Đang làm dở'}
                          />
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-main)' }}>
                          Đã làm: <strong>{s.answeredQuestions}/{s.totalQuestions} câu</strong> • Đúng: <strong style={{ color: 'var(--color-success)' }}>{s.correctAnswers}</strong> • Sai: <strong style={{ color: 'var(--color-danger)' }}>{s.incorrectAnswers}</strong> • Tỷ lệ chính xác: <strong>{s.accuracyRate}%</strong>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-foreground)', marginTop: '2px' }}>
                          Bắt đầu: {s.createdAt} {s.completedAt ? `• Hoàn thành: ${s.completedAt}` : ''}
                        </div>
                      </div>

                      <AppButton
                        variant="outline"
                        size="sm"
                        onClick={() => handleStartReview(s.reviewMode as any)}
                      >
                        Ôn lại chế độ này
                      </AppButton>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
