import { CATEGORY_CONFIGS } from '../../components/home/categoryConfig';
import React, { useState, useEffect, useCallback } from 'react';
import { learningService } from '../../services/learningService';
import type {
  MockExamSession,
  MockExamResult,
  MockExamSummary,
  ExamQuestion,
} from '../../types/learning';
import { AppButton, AppSelect, Alert, Modal, LoadingSpinner } from '../../components/ui';

interface ExamRuleConfig {
  category: string;
  name: string;
  questions: number;
  timeMinutes: number;
  passScore: number;
  desc: string;
}

const EXAM_RULES: ExamRuleConfig[] = Object.values(CATEGORY_CONFIGS).map(c => ({
  category: c.code, name: c.fullName, questions: c.questionsPerExam,
  timeMinutes: c.timeMinutes, passScore: Number(c.passingScore.split('/')[0]),
  desc: `Đạt từ ${c.passingScore} câu, không sai câu điểm liệt`,
}));

export const TheoryMockExamTab: React.FC = () => {
  // Mode: 'config' (chuẩn bị thi), 'exam' (đang thi), 'result' (xem kết quả bài thi)
  const [viewTab, setViewTab] = useState<'create' | 'history'>('create');
  const [selectedCategory, setSelectedCategory] = useState<string>('B');
  const [session, setSession] = useState<MockExamSession | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [result, setResult] = useState<MockExamResult | null>(null);

  // Filter xem lại kết quả: 'all' | 'wrong' | 'paralysis'
  const [resultFilter, setResultFilter] = useState<'all' | 'wrong' | 'paralysis'>('all');

  // Timer
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);

  // Trạng thái lưu tiến độ ngầm (Realtime auto-save indicator)
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');

  // Loading & Modals
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [showConfirmSubmit, setShowConfirmSubmit] = useState<boolean>(false);

  // Mock Exam History
  const [historyList, setHistoryList] = useState<MockExamSummary[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);
  const [historyPage, setHistoryPage] = useState<number>(0);
  const [historyTotal, setHistoryTotal] = useState<number>(0);

  // ---------------------------------------------------------------------------
  // Load Exam History
  // ---------------------------------------------------------------------------
  const loadExamHistory = useCallback(async (page = 0) => {
    setHistoryLoading(true);
    try {
      const res = await learningService.getMockExamHistory(page, 10);
      setHistoryList(res.content || []);
      setHistoryTotal(res.totalElements || 0);
      setHistoryPage(page);
    } catch (err: any) {
      console.error('Lỗi tải lịch sử thi thử:', err);
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  useEffect(() => {
    if (viewTab === 'history') {
      loadExamHistory(0);
    }
  }, [viewTab, loadExamHistory]);

  // ---------------------------------------------------------------------------
  // Countdown Timer & Auto-Submit
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isTimerActive && remainingSeconds > 0) {
      timer = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsTimerActive(false);
            // Tự động nộp bài khi hết thời gian
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerActive, remainingSeconds]);

  // ---------------------------------------------------------------------------
  // Keyboard Shortcuts (1-4 chọn đáp án, ←/→ chuyển câu, F cắm cờ)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!session || result) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Bỏ qua nếu đang gõ trong input/textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      const currentQ = session.questions[currentIndex];
      if (!currentQ) return;

      // Phím 1, 2, 3, 4 chọn phương án tương ứng
      if (['1', '2', '3', '4'].includes(e.key)) {
        const optionIndex = parseInt(e.key, 10) - 1;
        if (optionIndex < currentQ.options.length) {
          const opt = currentQ.options[optionIndex];
          if (opt) {
            handleSelectOption(currentQ.id, opt.id);
          }
        }
      }

      // Phím F / f: Toggle cắm cờ câu hỏi
      if (e.key === 'f' || e.key === 'F') {
        toggleFlagQuestion(currentQ.id);
      }

      // Phím Mũi tên trái / Phải chuyển câu
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => Math.min(session.questions.length - 1, prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [session, currentIndex, result, userAnswers]);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------
  const handleStartExam = async () => {
    setLoading(true);
    setErrorMsg('');
    setResult(null);
    setUserAnswers({});
    setFlaggedQuestions(new Set());
    setCurrentIndex(0);

    try {
      const data = await learningService.startMockExam(selectedCategory);
      setSession(data);
      setRemainingSeconds(data.remainingSeconds || data.durationMinutes * 60);
      setIsTimerActive(true);
      setSaveStatus('saved');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Không thể khởi tạo đề thi.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionId: number, answerId: number) => {
    if (result || !session) return; // Đã nộp bài thì không sửa

    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));

    // Gửi lưu tiến độ ngầm thời gian thực
    setSaveStatus('saving');
    learningService
      .saveExamProgress(session.sessionCode, questionId, answerId)
      .then(() => setSaveStatus('saved'))
      .catch(() => setSaveStatus('error'));
  };

  const toggleFlagQuestion = (questionId: number) => {
    setFlaggedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
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

  const handleViewHistoricalExam = async (sessionCode: string) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const examDetail = await learningService.getMockExamDetail(sessionCode);
      setResult(examDetail);
      setSession(null);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Không thể lấy thông tin chi tiết bài thi.');
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const activeRule: ExamRuleConfig = EXAM_RULES.find((r) => r.category === selectedCategory) ?? EXAM_RULES[0]!;
  const currentQuestion: ExamQuestion | undefined = session?.questions[currentIndex];

  const answeredCount = Object.keys(userAnswers).length;
  const unansweredCount = (session?.questions.length || 0) - answeredCount;
  const flaggedCount = flaggedQuestions.size;

  // Lọc câu hỏi ở màn hình kết quả
  const filteredResultQuestions = result?.questions.filter((q) => {
    if (resultFilter === 'wrong') return !q.isCorrect;
    if (resultFilter === 'paralysis') return q.isParalysis;
    return true;
  }) || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 1. MÀN HÌNH CHỌN HẠNG BẰNG & QUY CHẾ HOẶC LỊCH SỬ THI (KHI CHƯA VÀO PHÒNG THI) */}
      {!session && !result ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Sub Navigation Bar: Tạo đề thi mới | Lịch sử thi */}
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '0.75rem',
            }}
          >
            <button
              type="button"
              onClick={() => setViewTab('create')}
              style={{
                background: viewTab === 'create' ? '#1e3a8a' : '#f1f5f9',
                color: viewTab === 'create' ? '#ffffff' : '#475569',
                border: 'none',
                borderRadius: '8px',
                padding: '0.6rem 1.25rem',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s',
              }}
            >
              <span>🚗</span> Bắt đầu thi thử mới
            </button>
            <button
              type="button"
              onClick={() => setViewTab('history')}
              style={{
                background: viewTab === 'history' ? '#1e3a8a' : '#f1f5f9',
                color: viewTab === 'history' ? '#ffffff' : '#475569',
                border: 'none',
                borderRadius: '8px',
                padding: '0.6rem 1.25rem',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s',
              }}
            >
              <span>📜</span> Lịch sử các bài thi ({historyTotal})
            </button>
          </div>

          {errorMsg && <Alert type="danger" message={errorMsg} />}

          {/* TAB 1: BẮT ĐẦU THI THỬ MỚI */}
          {viewTab === 'create' && (
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
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  Hệ thống tự động sinh cấu trúc đề thi ngẫu nhiên theo ma trận tỷ lệ quy chuẩn
                  (Thông tư 12/2017/TT-BGTVT và Thông tư 04/2022/TT-BGTVT).
                  Đề thi áp dụng kiểm soát câu điểm liệt nghiêm ngặt tương đương kỳ thi sát hạch thực tế.
                </p>
              </div>

              <div style={{ maxWidth: '460px' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
                  Chọn hạng giấy phép lái xe (GPLX):
                </label>
                <AppSelect
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  options={EXAM_RULES.map((r) => ({
                    value: r.category,
                    label: `${r.name} (${r.questions} câu - ${r.timeMinutes} phút)`,
                  }))}
                />
              </div>

              {/* Thông tin quy chế thi chuẩn hóa */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '1.25rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1.25rem',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Hạng sát hạch</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e3a8a' }}>{activeRule.name}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Tổng số câu hỏi</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>{activeRule.questions} câu</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Thời gian làm bài</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>{activeRule.timeMinutes} phút</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Điểm đạt tối thiểu</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#059669' }}>
                    {activeRule.passScore} / {activeRule.questions} câu ({Math.round((activeRule.passScore / activeRule.questions) * 100)}%)
                  </div>
                </div>
              </div>

              {/* Cảnh báo câu điểm liệt */}
              <div
                style={{
                  padding: '1.1rem 1.25rem',
                  background: '#fff1f2',
                  border: '1px solid #fecdd3',
                  borderRadius: '8px',
                  color: '#991b1b',
                  fontSize: '0.92rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.85rem',
                }}
              >
                <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>⚠️</span>
                <div>
                  <strong style={{ fontSize: '0.95rem' }}>QUY CHẾ ĐẶC BIỆT VỀ CÂU HỎI ĐIỂM LIỆT:</strong>
                  <div style={{ marginTop: '0.3rem', color: '#7f1d1d', lineHeight: '1.5' }}>
                    Trong mỗi đề thi có ít nhất 1 câu hỏi thuộc bộ 60 câu điểm liệt (tình huống gây mất an toàn giao thông nghiêm trọng).
                    Nếu thí sinh trả lời <strong>SAI DÙ CHỈ 1 CÂU ĐIỂM LIỆT</strong>, bài thi sẽ bị kết luận là <strong>KHÔNG ĐẠT (TRƯỢT)</strong> ngay lập tức, bất kể đạt điểm số tối đa ở các câu còn lại.
                  </div>
                </div>
              </div>

              {/* Hướng dẫn thao tác */}
              <div
                style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '8px',
                  padding: '1rem 1.25rem',
                  fontSize: '0.88rem',
                  color: '#166534',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <span>💡</span>
                <span>
                  <strong>Mẹo phòng thi:</strong> Hệ thống hỗ trợ phím tắt <strong>[1-4]</strong> để chọn đáp án, <strong>[← / →]</strong> để chuyển câu, và phím <strong>[F]</strong> để cắm cờ xem lại. Tiến độ bài thi được lưu tự động theo thời gian thực!
                </span>
              </div>

              <div>
                <AppButton
                  variant="primary"
                  size="lg"
                  onClick={handleStartExam}
                  disabled={loading}
                  style={{ backgroundColor: '#1e3a8a', borderColor: '#1e3a8a', padding: '0.75rem 2rem' }}
                >
                  {loading ? 'Đang tạo đề thi bảo mật...' : 'Bắt đầu làm bài thi ngay →'}
                </AppButton>
              </div>
            </div>
          )}

          {/* TAB 2: LỊCH SỬ CÁC BÀI THI THỬ */}
          {viewTab === 'history' && (
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.2rem' }}>
                  📜 Lịch sử các lượt thi thử sát hạch
                </h3>
                <AppButton
                  variant="secondary"
                  size="sm"
                  onClick={() => loadExamHistory(historyPage)}
                  disabled={historyLoading}
                >
                  {historyLoading ? 'Đang làm mới...' : '🔄 Làm mới'}
                </AppButton>
              </div>

              {historyLoading ? (
                <div style={{ padding: '3rem', textAlign: 'center' }}>
                  <LoadingSpinner />
                </div>
              ) : historyList.length === 0 ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                  Chưa có lượt thi thử nào được ghi nhận. Hãy bắt đầu một bài thi thử mới để kiểm tra trình độ!
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                        <th style={{ padding: '0.75rem 1rem' }}>Mã bài thi</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Hạng GPLX</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Thời gian nộp</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Điểm số</th>
                        <th style={{ padding: '0.75rem 1rem' }}>Kết quả</th>
                        <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historyList.map((item) => (
                        <tr key={item.sessionCode} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: '#1e293b' }}>
                            {item.sessionCode}
                          </td>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <span
                              style={{
                                background: '#e0f2fe',
                                color: '#0369a1',
                                padding: '0.2rem 0.5rem',
                                borderRadius: '4px',
                                fontWeight: 700,
                                fontSize: '0.8rem',
                              }}
                            >
                              Hạng {item.categoryCode}
                            </span>
                          </td>
                          <td style={{ padding: '0.75rem 1rem', color: '#64748b' }}>
                            {item.completedAt ? new Date(item.completedAt).toLocaleString('vi-VN') : 'Chưa hoàn thành'}
                          </td>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 700 }}>
                            <span style={{ color: item.passed ? '#059669' : '#dc2626' }}>
                              {item.score} / {item.totalQuestions}
                            </span>
                          </td>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            {item.passed ? (
                              <span
                                style={{
                                  background: '#dcfce7',
                                  color: '#15803d',
                                  padding: '0.25rem 0.6rem',
                                  borderRadius: '6px',
                                  fontWeight: 700,
                                  fontSize: '0.82rem',
                                }}
                              >
                                ✓ ĐẠT
                              </span>
                            ) : (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                <span
                                  style={{
                                    background: '#fee2e2',
                                    color: '#b91c1c',
                                    padding: '0.25rem 0.6rem',
                                    borderRadius: '6px',
                                    fontWeight: 700,
                                    fontSize: '0.82rem',
                                    display: 'inline-block',
                                    width: 'fit-content',
                                  }}
                                >
                                  ✗ KHÔNG ĐẠT
                                </span>
                                {item.failedParalysis && (
                                  <span style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: 600 }}>
                                    (Sai câu điểm liệt)
                                  </span>
                                )}
                              </div>
                            )}
                          </td>
                          <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                            <AppButton
                              variant="secondary"
                              size="sm"
                              onClick={() => handleViewHistoricalExam(item.sessionCode)}
                            >
                              Xem lại bài thi 🔍
                            </AppButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      ) : result ? (
        /* 2. MÀN HÌNH KẾT QUẢ THI THỬ VÀ XEM LẠI BÀI THI */
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
              KẾT QUẢ SÁT HẠCH: {result.passed ? 'ĐẠT YÊU CẦU' : 'KHÔNG ĐẠT'}
            </h2>

            {result.failedParalysis && (
              <div
                style={{
                  background: '#b91c1c',
                  color: '#ffffff',
                  padding: '0.6rem 1.25rem',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  boxShadow: '0 2px 4px rgba(185, 28, 28, 0.2)',
                }}
              >
                ⚠️ BẠN ĐÃ TRẢ LỜI SAI CÂU HỎI ĐIỂM LIỆT (Tình huống mất an toàn giao thông nghiêm trọng)
              </div>
            )}

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Hạng sát hạch</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1e293b' }}>Hạng {result.categoryCode}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Điểm số đạt được</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: result.passed ? '#059669' : '#dc2626' }}>
                  {result.score} / {result.totalQuestions}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Điểm chuẩn yêu cầu</div>
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

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <AppButton
                variant="primary"
                onClick={() => {
                  setSession(null);
                  setResult(null);
                  setViewTab('create');
                }}
                style={{ backgroundColor: '#1e3a8a', borderColor: '#1e3a8a' }}
              >
                Thi lại đề mới 🔄
              </AppButton>
              <AppButton
                variant="secondary"
                onClick={() => {
                  setSession(null);
                  setResult(null);
                  setViewTab('history');
                }}
              >
                Trở về lịch sử thi 📜
              </AppButton>
            </div>
          </div>

          {/* Bộ lọc xem lại câu hỏi */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '1.25rem 1.5rem',
              border: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.15rem' }}>
              Phân tích đáp án chi tiết ({filteredResultQuestions.length} câu)
            </h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setResultFilter('all')}
                style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  background: resultFilter === 'all' ? '#1e3a8a' : '#ffffff',
                  color: resultFilter === 'all' ? '#ffffff' : '#334155',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                Tất cả ({result.questions.length})
              </button>
              <button
                type="button"
                onClick={() => setResultFilter('wrong')}
                style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: '6px',
                  border: '1px solid #fca5a5',
                  background: resultFilter === 'wrong' ? '#ef4444' : '#fff1f2',
                  color: resultFilter === 'wrong' ? '#ffffff' : '#991b1b',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                Chỉ câu sai ({result.questions.filter((q) => !q.isCorrect).length})
              </button>
              <button
                type="button"
                onClick={() => setResultFilter('paralysis')}
                style={{
                  padding: '0.4rem 0.8rem',
                  borderRadius: '6px',
                  border: '1px solid #fed7aa',
                  background: resultFilter === 'paralysis' ? '#f97316' : '#fff7ed',
                  color: resultFilter === 'paralysis' ? '#ffffff' : '#c2410c',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                Câu điểm liệt ({result.questions.filter((q) => q.isParalysis).length})
              </button>
            </div>
          </div>

          {/* Chi tiết từng câu hỏi trong bài thi */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredResultQuestions.map((q, idx) => (
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
                  gap: '0.85rem',
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
                          border: '1px solid #fca5a5',
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
                  <div style={{ maxWidth: '400px' }}>
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
                  <div style={{ background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '6px', fontSize: '0.85rem', color: '#334155' }}>
                    <strong>💡 Lời giải chi tiết: </strong> {q.explanation}
                  </div>
                )}

                {q.legalReference && (
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>
                    ⚖️ Căn cứ pháp lý: {q.legalReference}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : session ? (
        /* 3. MÀN HÌNH LÀM BÀI THI THỬ TRỰC TIẾP (PHÒNG THI ONLINE TẬP TRUNG) */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>
          {/* CỘT TRÁI: CÂU HỎI HIỆN TẠI & BẢNG ĐÁP ÁN */}
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
            {currentQuestion ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
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

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {/* Realtime Save status indicator */}
                    <span style={{ fontSize: '0.78rem', color: saveStatus === 'saving' ? '#d97706' : '#10b981' }}>
                      {saveStatus === 'saving' ? '⏳ Đang lưu...' : '☁️ Đã lưu'}
                    </span>

                    {/* Nút cắm cờ xem lại */}
                    <button
                      type="button"
                      onClick={() => toggleFlagQuestion(currentQuestion.id)}
                      style={{
                        background: flaggedQuestions.has(currentQuestion.id) ? '#fef3c7' : '#f8fafc',
                        border: flaggedQuestions.has(currentQuestion.id) ? '1px solid #f59e0b' : '1px solid #cbd5e1',
                        color: flaggedQuestions.has(currentQuestion.id) ? '#b45309' : '#64748b',
                        padding: '0.3rem 0.65rem',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      <span>🚩</span>
                      {flaggedQuestions.has(currentQuestion.id) ? 'Đã đánh dấu (F)' : 'Đánh dấu xem lại (F)'}
                    </button>
                  </div>
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
                        <span
                          style={{
                            fontWeight: 700,
                            color: isSelected ? '#1e40af' : '#475569',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            background: isSelected ? '#dbeafe' : '#f1f5f9',
                            fontSize: '0.85rem',
                          }}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span style={{ flex: 1, fontSize: '0.95rem', color: '#1e293b' }}>
                          {opt.answerText}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {/* Thanh điều hướng câu trước / câu sau */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                  <AppButton
                    variant="secondary"
                    size="sm"
                    onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                    disabled={currentIndex === 0}
                  >
                    ← Câu trước (←)
                  </AppButton>
                  <AppButton
                    variant="primary"
                    size="sm"
                    onClick={() => setCurrentIndex((prev) => Math.min(session.questions.length - 1, prev + 1))}
                    disabled={currentIndex === session.questions.length - 1}
                  >
                    Câu tiếp theo (→) →
                  </AppButton>
                </div>

                {/* Hướng dẫn phím tắt */}
                <div
                  style={{
                    background: '#f8fafc',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    color: '#64748b',
                    textAlign: 'center',
                  }}
                >
                  💡 Phím tắt phòng thi: <strong>[1-4]</strong> Chọn đáp án | <strong>[← / →]</strong> Chuyển câu | <strong>[F]</strong> Đánh dấu xem lại
                </div>
              </>
            ) : null}
          </div>

          {/* CỘT PHẢI: ĐỒNG HỒ ĐẾM NGƯỢC, LƯỚI CÂU HỎI & NÚT NỘP BÀI */}
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
                Hạng: <strong>{session.categoryCode}</strong> | Điểm chuẩn: <strong>{session.passingScore}/{session.totalQuestions}</strong>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.9rem' }}>
                  Danh sách câu hỏi:
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  {answeredCount} / {session.questions.length} đã làm
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap: '0.45rem',
                }}
              >
                {session.questions.map((q, idx) => {
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isCurrent = idx === currentIndex;
                  const isFlagged = flaggedQuestions.has(q.id);

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
                        padding: '0.5rem 0',
                        borderRadius: '6px',
                        background: bg,
                        color,
                        border,
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'all 0.1s ease',
                      }}
                    >
                      {idx + 1}
                      {/* Dấu chấm đỏ câu điểm liệt */}
                      {q.isParalysis && (
                        <span
                          title="Câu điểm liệt"
                          style={{
                            position: 'absolute',
                            top: '-3px',
                            right: '-3px',
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#ef4444',
                            border: '1px solid #ffffff',
                          }}
                        />
                      )}
                      {/* Cờ vàng nếu được đánh dấu xem lại */}
                      {isFlagged && (
                        <span
                          title="Được đánh dấu xem lại"
                          style={{
                            position: 'absolute',
                            bottom: '-2px',
                            left: '2px',
                            fontSize: '0.65rem',
                            lineHeight: 1,
                          }}
                        >
                          🚩
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Chú thích màu sắc */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.35rem',
                  fontSize: '0.72rem',
                  color: '#64748b',
                  marginTop: '0.85rem',
                  paddingTop: '0.75rem',
                  borderTop: '1px solid #f1f5f9',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '2px' }} />
                  Đã trả lời ({answeredCount})
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: '10px', height: '10px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '2px' }} />
                  Chưa làm ({unansweredCount})
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ fontSize: '0.75rem' }}>🚩</span>
                  Cắm cờ xem lại ({flaggedCount})
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span style={{ width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }} />
                  Câu điểm liệt
                </div>
              </div>

              {/* Submit Button */}
              <div style={{ marginTop: '1.25rem' }}>
                <AppButton
                  variant="primary"
                  onClick={() => setShowConfirmSubmit(true)}
                  disabled={submitting}
                  style={{ width: '100%', backgroundColor: '#059669', borderColor: '#059669', padding: '0.65rem' }}
                >
                  {submitting ? 'Đang chấm điểm...' : '✅ Nộp bài thi'}
                </AppButton>
              </div>
            </div>
          </div>

          {/* Modal xác nhận nộp bài an toàn */}
          <Modal
            isOpen={showConfirmSubmit}
            onClose={() => setShowConfirmSubmit(false)}
            title="Xác nhận nộp bài thi thử sát hạch"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.5' }}>
                Bạn đã hoàn thành <strong>{answeredCount}</strong> / {session.questions.length} câu hỏi.
              </div>

              {unansweredCount > 0 && (
                <div
                  style={{
                    background: '#fff1f2',
                    border: '1px solid #fecdd3',
                    borderRadius: '6px',
                    padding: '0.75rem',
                    color: '#991b1b',
                    fontSize: '0.88rem',
                  }}
                >
                  ⚠️ Bạn vẫn còn <strong>{unansweredCount}</strong> câu chưa chọn đáp án! Các câu chưa làm sẽ được tính là sai.
                </div>
              )}

              {flaggedCount > 0 && (
                <div
                  style={{
                    background: '#fffbeb',
                    border: '1px solid #fef3c7',
                    borderRadius: '6px',
                    padding: '0.75rem',
                    color: '#b45309',
                    fontSize: '0.88rem',
                  }}
                >
                  🚩 Bạn đang cắm cờ xem lại <strong>{flaggedCount}</strong> câu hỏi. Bạn đã chắc chắn rà soát lại kỹ lưỡng?
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <AppButton variant="secondary" onClick={() => setShowConfirmSubmit(false)}>
                  Tiếp tục làm bài
                </AppButton>
                <AppButton
                  variant="primary"
                  onClick={doSubmitExam}
                  disabled={submitting}
                  style={{ backgroundColor: '#059669', borderColor: '#059669' }}
                >
                  {submitting ? 'Đang chấm điểm...' : 'Đồng ý nộp bài ngay'}
                </AppButton>
              </div>
            </div>
          </Modal>
        </div>
      ) : null}
    </div>
  );
};
