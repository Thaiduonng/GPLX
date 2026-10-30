import React from 'react';
import { Icons } from '../ui';
import styles from './HeroSection.module.css';

export const HeroSection: React.FC = () => {
  return (
    <section className={styles.heroSection} aria-label="Giới thiệu Hệ thống Ôn Thi GPLX">
      {/* Official Legal Dispatch Badge */}
      <div className={styles.officialBadge}>
        <div className={styles.badgeIcon}>
          <Icons.ShieldCheck size={16} />
        </div>
        <span className={styles.badgeText}>
          Theo Công văn 2262/CSGT-P5 ngày 7/5/2025 Cục Cảnh sát giao thông
        </span>
      </div>

      {/* Main Hero Title */}
      <h1 className={styles.heroTitle}>
        Ôn thi Giấy phép lái xe{' '}
        <span className={styles.verifiedTextGroup}>
          <span className={styles.gradientTitle}>Chuẩn Cục CSGT</span>
          <span className={styles.verifiedCheckIcon} title="Dữ liệu chuẩn hóa chính thức">
            <Icons.Check size={20} />
          </span>
        </span>
      </h1>

      {/* Subtitle */}
      <p className={styles.heroSubtitle}>
        Hệ thống 600 câu hỏi sát hạch mới nhất — Tích hợp 20 đề thi chuẩn cấu trúc, 60 câu điểm liệt
        và sa hình mô phỏng 3D dành cho mọi hạng lái xe.
      </p>
    </section>
  );
};
