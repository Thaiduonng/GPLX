import { useState, useEffect } from 'react';
import { PageHeader, Tabs } from '../components/ui';
import { TheoryOverviewTab } from '../features/theory/TheoryOverviewTab';
import { TheoryTopicStudyTab } from '../features/theory/TheoryTopicStudyTab';
import { TheoryPracticeTab } from '../features/theory/TheoryPracticeTab';
import { TheoryMockExamTab } from '../features/theory/TheoryMockExamTab';
import { TheoryReviewTab } from '../features/theory/TheoryReviewTab';
import { TheoryAdminConfigTab } from '../features/theory/TheoryAdminConfigTab';
import { learningService } from '../services/learningService';
import type { TheoryStatistics, PracticeMode } from '../types/learning';
import { useAuth } from '../features/auth/AuthContext';
import { canAccessPath } from '../features/navigation/navigation';

export default function TheoryExamPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('OVERVIEW');
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [practiceInitialMode, setPracticeInitialMode] = useState<PracticeMode>('PARALYSIS');

  const [stats, setStats] = useState<TheoryStatistics | null>(null);
  const [loadingStats, setLoadingStats] = useState<boolean>(true);
  const [statsError, setStatsError] = useState<string>('');

  useEffect(() => {
    loadStats();
  }, [activeTab]);

  const loadStats = async () => {
    try {
      setLoadingStats(true);
      const data = await learningService.getStatistics();
      setStats(data);
    } catch (err: any) {
      setStatsError(err.message || 'Không thể tải thống kê.');
    } finally {
      setLoadingStats(false);
    }
  };

  const handleStartPracticeMode = (mode: PracticeMode) => {
    setPracticeInitialMode(mode);
    setActiveTab('PRACTICE');
  };

  const handleSelectTopicFromOverview = (topicId: number) => {
    setSelectedTopicId(topicId);
    setActiveTab('TOPICS');
  };

  const isStaffOrAdmin = canAccessPath('/admin/theory', user?.roles ?? []);

  const tabItems = [
    { id: 'OVERVIEW', label: '📊 Tổng quan & Tiến độ' },
    { id: 'TOPICS', label: '📖 Học theo 6 chương' },
    { id: 'PRACTICE', label: '🎯 Rèn luyện 8 chế độ' },
    { id: 'MOCK_EXAM', label: '🚗 Thi thử theo hạng' },
    { id: 'REVIEW', label: '🔄 Ôn tập câu sai & Đánh dấu' },
    ...(isStaffOrAdmin ? [{ id: 'ADMIN', label: '🛠️ Quản trị dữ liệu & Đề thi' }] : []),
  ];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <PageHeader
        title="Học tập, Rèn luyện & Thi thử Lý thuyết GPLX"
        description="Hệ thống chuẩn hóa theo bộ 600 câu hỏi sát hạch lý thuyết lái xe của Cục Cảnh sát giao thông"
      />

      <Tabs
        tabs={tabItems}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div style={{ marginTop: '0.5rem' }}>
        {activeTab === 'OVERVIEW' && (
          <TheoryOverviewTab
            stats={stats}
            loading={loadingStats}
            errorMsg={statsError}
            onSelectTab={setActiveTab}
            onSelectTopic={handleSelectTopicFromOverview}
            onStartPracticeMode={handleStartPracticeMode}
          />
        )}

        {activeTab === 'TOPICS' && (
          <TheoryTopicStudyTab initialTopicId={selectedTopicId} />
        )}

        {activeTab === 'PRACTICE' && (
          <TheoryPracticeTab initialMode={practiceInitialMode} />
        )}

        {activeTab === 'MOCK_EXAM' && (
          <TheoryMockExamTab />
        )}

        {activeTab === 'REVIEW' && (
          <TheoryReviewTab onStartPractice={handleStartPracticeMode} />
        )}

        {activeTab === 'ADMIN' && isStaffOrAdmin && (
          <TheoryAdminConfigTab />
        )}
      </div>
    </div>
  );
}
