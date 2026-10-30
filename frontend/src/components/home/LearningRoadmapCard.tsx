import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../ui';
import type { CategoryConfig } from './categoryConfig';
import styles from './LearningRoadmapCard.module.css';

interface LearningRoadmapCardProps {
  config: CategoryConfig;
}

export const LearningRoadmapCard: React.FC<LearningRoadmapCardProps> = ({ config }) => {
  return (
    <div className={styles.roadmapCard}>
      {/* Top Header */}
      <div className={styles.cardHeader}>
        <div className={styles.eyebrowBadge}>
          <Icons.Bookmark size={14} />
          <span>Lộ trình của bạn</span>
        </div>
        <h2 className={styles.roadmapTitle}>
          Mục tiêu đậu {config.name}
        </h2>
        <p className={styles.roadmapDescription}>
          Lộ trình 3 trạm chuẩn hóa giúp bạn nắm vững kiến thức lý thuyết sát hạch lái xe, phòng tránh bẫy
          điểm liệt và tự tin đạt điểm tuyệt đối.
        </p>
      </div>

      {/* Interactive Visual Roadmap Pathway (3 Stations) */}
      <div className={styles.stationsPathway}>
        {/* Pathway Connecting Line */}
        <div className={styles.pathwayLine} />

        {/* Station 1: Ôn tập câu hỏi */}
        <Link to="/theory" className={styles.stationNode} title="Bắt đầu học 6 chương lý thuyết">
          <div className={`${styles.stationIconCircle} ${styles.station1}`}>
            <Icons.BookOpen size={20} />
            <span className={styles.stationNumber}>1</span>
          </div>
          <div className={styles.stationContent}>
            <span className={styles.stationStep}>Trạm 1</span>
            <h3 className={styles.stationTitle}>Ôn tập câu hỏi</h3>
            <p className={styles.stationDesc}>
              Toàn bộ {config.totalQuestions} câu hỏi chia 6 chương chuẩn hóa
            </p>
          </div>
          <div className={styles.stationArrow}>
            <Icons.ArrowRight size={16} />
          </div>
        </Link>

        {/* Station 2: Câu hay sai & Điểm liệt */}
        <Link
          to="/student/review"
          className={styles.stationNode}
          title="Luyện 60 câu điểm liệt và câu hay sai"
        >
          <div className={`${styles.stationIconCircle} ${styles.station2}`}>
            <Icons.AlertTriangle size={20} />
            <span className={styles.stationNumber}>2</span>
          </div>
          <div className={styles.stationContent}>
            <span className={styles.stationStep}>Trạm 2</span>
            <h3 className={styles.stationTitle}>Câu hay sai & Điểm liệt</h3>
            <p className={styles.stationDesc}>
              60 câu điểm liệt tuyệt đối không được sai & bẫy đề thi
            </p>
          </div>
          <div className={styles.stationArrow}>
            <Icons.ArrowRight size={16} />
          </div>
        </Link>

        {/* Station 3: Bộ đề luyện tập */}
        <Link
          to="/student/review"
          className={styles.stationNode}
          title="Luyện 20 đề thi thử mẫu"
        >
          <div className={`${styles.stationIconCircle} ${styles.station3}`}>
            <Icons.Layers size={20} />
            <span className={styles.stationNumber}>3</span>
          </div>
          <div className={styles.stationContent}>
            <span className={styles.stationStep}>Trạm 3</span>
            <h3 className={styles.stationTitle}>Bộ đề luyện tập</h3>
            <p className={styles.stationDesc}>
              20 đề thi thử random mô phỏng chính xác cấu trúc thi thật
            </p>
          </div>
          <div className={styles.stationArrow}>
            <Icons.ArrowRight size={16} />
          </div>
        </Link>
      </div>

      {/* Road & Car Illustration Banner */}
      <div className={styles.roadIllustration}>
        <div className={styles.roadTrack}>
          <div className={styles.roadDashLine} />
          <div className={styles.carWrapper}>
            <Icons.Car size={26} className={styles.movingCar} />
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className={styles.progressContainer}>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>Tiến độ ôn luyện tổng thể</span>
          <span className={styles.progressPercentage}>Sẵn sàng 100% khi hoàn thành 3 trạm</span>
        </div>
        <div className={styles.progressBarTrack}>
          <div className={styles.progressBarFill} style={{ width: '45%' }} />
        </div>
      </div>
    </div>
  );
};
