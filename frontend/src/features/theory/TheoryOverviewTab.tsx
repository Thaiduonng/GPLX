import React from 'react';
import { StatCard, AppButton, LoadingSpinner, Alert } from '../../components/ui';
import type { TheoryStatistics } from '../../types/learning';

interface TheoryOverviewTabProps {
  stats: TheoryStatistics | null;
  loading: boolean;
  errorMsg: string;
  onSelectTab: (tab: string) => void;
  onSelectTopic: (topicId: number) => void;
  onStartPracticeMode: (mode: 'PARALYSIS' | 'INCORRECT' | 'RANDOM') => void;
}

export const TheoryOverviewTab: React.FC<TheoryOverviewTabProps> = ({
  stats,
  loading,
  errorMsg,
  onSelectTab,
  onSelectTopic,
  onStartPracticeMode,
}) => {
  if (loading) {
    return <LoadingSpinner text="Đang tải dữ liệu tiến độ học tập..." />;
  }

  if (errorMsg) {
    return <Alert type="danger" message={errorMsg} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Quick Action Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
          color: '#ffffff',
          borderRadius: '12px',
          padding: '1.75rem 2rem',
          boxShadow: '0 4px 14px rgba(30, 58, 138, 0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>
            Hệ thống Học tập & Thi thử Lý thuyết GPLX
          </h2>
          <p style={{ margin: 0, opacity: 0.9, fontSize: '0.95rem', maxWidth: '640px' }}>
            Chuẩn hóa theo bộ 600 câu hỏi của Cục Cảnh sát giao thông. Phân chia rõ ràng 6 chương nghiệp vụ,
            60 câu hỏi điểm liệt và cấu trúc đề thi chính thức cho từng hạng giấy phép lái xe.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <AppButton
            variant="primary"
            onClick={() => onSelectTab('MOCK_EXAM')}
            style={{ backgroundColor: '#10b981', borderColor: '#10b981' }}
          >
            🎯 Thi thử theo hạng
          </AppButton>
          <AppButton
            variant="secondary"
            onClick={() => onStartPracticeMode('PARALYSIS')}
            style={{ backgroundColor: '#ffffff', color: '#dc2626', fontWeight: 600 }}
          >
            ⚠️ 60 Câu điểm liệt
          </AppButton>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
        }}
      >
        <StatCard
          title="Tiến độ học tập"
          value={`${stats?.questionsLearned || 0} / ${stats?.totalQuestionsInBank || 600}`}
          subtitle={`Đạt ${stats?.completionRate || 0}% toàn bộ ngân hàng`}
          icon="📚"
        />
        <StatCard
          title="Tỷ lệ trả lời chính xác"
          value={`${stats?.accuracyRate || 0}%`}
          subtitle={`${stats?.correctAnswersSubmitted || 0} câu đúng trên ${stats?.totalAnswersSubmitted || 0} lượt trả lời`}
          icon="✅"
        />
        <StatCard
          title="Lượt thi thử đạt"
          value={`${stats?.examsPassed || 0} / ${stats?.examsTaken || 0}`}
          subtitle={`Tỷ lệ đỗ thi thử: ${stats?.examPassRate || 0}%`}
          icon="🏆"
        />
        <StatCard
          title="Câu sai cần củng cố"
          value={stats?.incorrectQuestionsCount || 0}
          subtitle={`${stats?.bookmarkedCount || 0} câu đã lưu đánh dấu`}
          icon="📌"
        />
      </div>

      {/* 7 Chapters Progress Section */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '1.75rem',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.25rem',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0, color: '#1e293b' }}>
              Tiến độ theo 6 chương lý thuyết theo PDF 2025
            </h3>
            <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.875rem' }}>
              Hoàn thành đầy đủ các chương để tự tin đạt điểm tối đa trong kỳ sát hạch chính thức
            </p>
          </div>
          <AppButton variant="secondary" size="sm" onClick={() => onSelectTab('TOPICS')}>
            Xem tất cả chương →
          </AppButton>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {stats?.topicProgress && stats.topicProgress.length > 0 ? (
            stats.topicProgress.map((tp, idx) => {
              const progress = Math.min(100, Math.max(0, tp.progressPercentage || 0));
              return (
                <div
                  key={tp.topicId}
                  style={{
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid #f1f5f9',
                    background: '#f8fafc',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: '#e0e7ff',
                          color: '#4338ca',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                        }}
                      >
                        {idx + 1}
                      </span>
                      <span style={{ fontWeight: 600, color: '#1e293b', fontSize: '0.95rem' }}>
                        {tp.topicName}
                      </span>
                      {tp.paralysisQuestions > 0 && (
                        <span
                          style={{
                            fontSize: '0.75rem',
                            padding: '0.15rem 0.45rem',
                            background: '#fee2e2',
                            color: '#b91c1c',
                            borderRadius: '4px',
                            fontWeight: 600,
                          }}
                        >
                          {tp.paralysisQuestions} câu điểm liệt
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                        {tp.answeredQuestions} / {tp.totalQuestions} câu ({progress}%)
                      </span>
                      <AppButton
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          onSelectTopic(tp.topicId);
                          onSelectTab('TOPICS');
                        }}
                      >
                        Học chương này
                      </AppButton>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div
                    style={{
                      height: '8px',
                      background: '#e2e8f0',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${progress}%`,
                        background: progress === 100 ? '#10b981' : '#3b82f6',
                        borderRadius: '4px',
                        transition: 'width 0.4s ease',
                      }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
              Đang đồng bộ danh mục 6 chương lý thuyết...
            </div>
          )}
        </div>
      </div>

      {/* Recommended Practice Modes Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #e2e8f0',
          }}
        >
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚠️</div>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>Luyện 60 câu điểm liệt</h4>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1rem' }}>
            Sai một câu điểm liệt trong kỳ thi thật sẽ bị TRƯỢT ngay lập tức. Hãy nắm vững 100% nhóm câu hỏi này.
          </p>
          <AppButton
            variant="primary"
            size="sm"
            onClick={() => onStartPracticeMode('PARALYSIS')}
            style={{ width: '100%', backgroundColor: '#dc2626', borderColor: '#dc2626' }}
          >
            Luyện tập ngay
          </AppButton>
        </div>

        <div
          style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #e2e8f0',
          }}
        >
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔄</div>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>Ôn lại các câu làm sai</h4>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1rem' }}>
            Hệ thống tự động lưu trữ các câu bạn từng làm sai trong quá trình luyện tập để ôn luyện lại cho nhớ lâu.
          </p>
          <AppButton
            variant="secondary"
            size="sm"
            onClick={() => onSelectTab('REVIEW')}
            style={{ width: '100%' }}
          >
            Xem danh sách câu sai ({stats?.incorrectQuestionsCount || 0})
          </AppButton>
        </div>

        <div
          style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '1.5rem',
            border: '1px solid #e2e8f0',
          }}
        >
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎲</div>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e293b' }}>Luyện ngẫu nhiên 20 câu</h4>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1rem' }}>
            Phù hợp với những khoảng thời gian ngắn 5-10 phút để rèn luyện phản xạ và kiểm tra trí nhớ tức thời.
          </p>
          <AppButton
            variant="secondary"
            size="sm"
            onClick={() => onStartPracticeMode('RANDOM')}
            style={{ width: '100%' }}
          >
            Bắt đầu ngẫu nhiên
          </AppButton>
        </div>
      </div>
    </div>
  );
};
