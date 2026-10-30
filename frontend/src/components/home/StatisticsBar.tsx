import React from 'react';
import { Icons } from '../ui';
import type { CategoryConfig } from './categoryConfig';
import styles from './StatisticsBar.module.css';

interface StatisticsBarProps {
  config: CategoryConfig;
}

export const StatisticsBar: React.FC<StatisticsBarProps> = ({ config }) => {
  return (
    <div className={styles.statsContainer}>
      {/* Metric 1: Số câu hỏi / đề */}
      <div className={styles.metricItem}>
        <div className={styles.iconWrapper}>
          <Icons.ClipboardList size={18} />
        </div>
        <div className={styles.metricContent}>
          <span className={styles.metricValue}>{config.questionsPerExam} câu</span>
          <span className={styles.metricLabel}>Số câu hỏi / đề</span>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Metric 2: Thời gian làm bài */}
      <div className={styles.metricItem}>
        <div className={styles.iconWrapper}>
          <Icons.Clock size={18} />
        </div>
        <div className={styles.metricContent}>
          <span className={styles.metricValue}>{config.timeMinutes} phút</span>
          <span className={styles.metricLabel}>Thời gian thi</span>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Metric 3: Điểm đạt tối thiểu */}
      <div className={styles.metricItem}>
        <div className={`${styles.iconWrapper} ${styles.successIcon}`}>
          <Icons.CheckCircle size={18} />
        </div>
        <div className={styles.metricContent}>
          <span className={styles.metricValue}>{config.passingScore}</span>
          <span className={styles.metricLabel}>Điểm đạt yêu cầu</span>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Metric 4: Tổng số câu trong ngân hàng */}
      <div className={styles.metricItem}>
        <div className={styles.iconWrapper}>
          <Icons.BookOpen size={18} />
        </div>
        <div className={styles.metricContent}>
          <span className={styles.metricValue}>{config.totalQuestions} câu</span>
          <span className={styles.metricLabel}>Ngân hàng câu hỏi</span>
        </div>
      </div>
    </div>
  );
};
