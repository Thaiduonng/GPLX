import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../ui';
import type { CategoryConfig } from './categoryConfig';
import styles from './MockExamCard.module.css';

interface MockExamCardProps {
  config: CategoryConfig;
  isAuthenticated: boolean;
}

export const MockExamCard: React.FC<MockExamCardProps> = ({ config, isAuthenticated }) => {
  const navigate = useNavigate();

  const handleStartExam = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/student/review');
    }
  };

  return (
    <div className={styles.mockExamCard}>
      {/* Decorative Background Glow and Shapes */}
      <div className={styles.cardGlow} />

      {/* Top Header & Icon */}
      <div className={styles.cardTop}>
        <div className={styles.examIconBadge}>
          <Icons.GraduationCap size={28} />
        </div>
        <div className={styles.badgePillGroup}>
          <span className={styles.badgePill}>Chuẩn CSGT 2026</span>
          <span className={styles.badgePill}>Miễn phí 100%</span>
        </div>
      </div>

      {/* Main Title & Description */}
      <div className={styles.contentArea}>
        <h2 className={styles.examTitle}>Thi thử Online</h2>
        <p className={styles.examDesc}>
          Phần mềm thi thử sát hạch mô phỏng chính xác giao diện thi thật của Tổng cục Đường bộ và
          Cục Cảnh sát giao thông với cấu trúc {config.name}.
        </p>

        {/* Exam Parameter Highlights */}
        <div className={styles.examFeaturesList}>
          <div className={styles.featureItem}>
            <span className={styles.featureCheck}>
              <Icons.Check size={16} />
            </span>
            <span>
              <strong>{config.questionsPerExam} câu trắc nghiệm</strong> ngẫu nhiên chuẩn cấu trúc
            </span>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureCheck}>
              <Icons.Check size={16} />
            </span>
            <span>
              <strong>{config.timeMinutes} phút</strong> bấm giờ làm bài tự động
            </span>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureCheck}>
              <Icons.Check size={16} />
            </span>
            <span>
              Cảnh báo <strong>câu điểm liệt</strong> và chấm điểm đạt/trượt tức thì
            </span>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureCheck}>
              <Icons.Check size={16} />
            </span>
            <span>
              Xem lại toàn bộ <strong>đáp án & giải thích chi tiết</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Call to Action Button */}
      <div className={styles.actionArea}>
        <button
          type="button"
          className={styles.startExamBtn}
          onClick={handleStartExam}
          aria-label="Bắt đầu thi thử sát hạch trực tuyến"
        >
          <span>Bắt đầu thi thử ngay</span>
          <Icons.ArrowRight size={18} />
        </button>
        <p className={styles.helperNotice}>
          {isAuthenticated
            ? 'Đang đăng nhập — Kết quả bài thi sẽ được lưu tự động vào tiến độ'
            : 'Đăng nhập để lưu tiến độ và xem lại lịch sử các lần thi thử'}
        </p>
      </div>
    </div>
  );
};
