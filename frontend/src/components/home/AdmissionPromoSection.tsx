import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from '../ui';
import styles from './AdmissionPromoSection.module.css';

interface AdmissionPromoSectionProps {
  isAuthenticated: boolean;
}

export const AdmissionPromoSection: React.FC<AdmissionPromoSectionProps> = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleApplyNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/admissions/new');
    }
  };

  const handleTrackDossier = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/my-applications');
    }
  };

  return (
    <section className={styles.sectionWrapper} aria-label="Cổng Tiếp Nhận Và Quản Lý Hồ Sơ Điện Tử">
      {/* Background Radial Glow */}
      <div className={styles.promoGlow} />

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.badge}>
          <Icons.ShieldCheck size={16} />
          <span>Dịch Vụ Công Trực Tuyến Toàn Trình • Cổng Tiếp Nhận Hồ Sơ 2026</span>
        </div>
        <h2 className={styles.title}>
          Nộp Hồ Sơ Đào Tạo Lái Xe Trực Tuyến — Nhanh Chóng, Minh Bạch & Quản Lý Tập Trung
        </h2>
        <p className={styles.subtitle}>
          Hệ thống tiếp nhận, thẩm định hồ sơ điện tử và quản lý tiến trình đào tạo của học viên theo
          chuẩn Thông tư 05/2024/TT-BGTVT và Luật Trật tự, an toàn giao thông đường bộ 2024.
        </p>
      </div>

      {/* Main Grid Content */}
      <div className={styles.gridContainer}>
        {/* Left Side: 4 Core Features & CTA */}
        <div className={styles.featuresCol}>
          <div className={styles.featuresList}>
            {/* Feature 1 */}
            <div className={styles.featureCard}>
              <div className={`${styles.featureIcon} ${styles.iconBlue}`}>
                <Icons.UploadCloud size={22} />
              </div>
              <div className={styles.featureText}>
                <h3 className={styles.featureTitle}>Nộp hồ sơ 100% Online</h3>
                <p className={styles.featureDesc}>
                  Tải ảnh chụp CCCD 2 mặt và ảnh thẻ 3x4 trực tiếp từ điện thoại hoặc máy tính. Không cần
                  xếp hàng, không cần photo công chứng giấy tờ phức tạp.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className={styles.featureCard}>
              <div className={`${styles.featureIcon} ${styles.iconGreen}`}>
                <Icons.ShieldCheck size={22} />
              </div>
              <div className={styles.featureText}>
                <h3 className={styles.featureTitle}>Liên thông Giấy khám sức khỏe điện tử</h3>
                <p className={styles.featureDesc}>
                  Tự động tra cứu mã GKSK điện tử liên thông từ các cơ sở y tế đủ thẩm quyền theo dữ liệu
                  Bộ Y tế, đảm bảo 100% tính hợp pháp khi đăng ký dự thi.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className={styles.featureCard}>
              <div className={`${styles.featureIcon} ${styles.iconPurple}`}>
                <Icons.Activity size={22} />
              </div>
              <div className={styles.featureText}>
                <h3 className={styles.featureTitle}>Theo dõi tiến trình hồ sơ thời gian thực</h3>
                <p className={styles.featureDesc}>
                  Minh bạch từng bước thẩm định: Đã nộp ➔ Đang duyệt ➔ Đã duyệt ➔ Xếp lớp. Nhận thông báo
                  ngay trên hệ thống khi có cập nhật hoặc yêu cầu bổ sung giấy tờ.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className={styles.featureCard}>
              <div className={`${styles.featureIcon} ${styles.iconAmber}`}>
                <Icons.CreditCard size={22} />
              </div>
              <div className={styles.featureText}>
                <h3 className={styles.featureTitle}>Học phí minh bạch & Xuất biên lai điện tử</h3>
                <p className={styles.featureDesc}>
                  Đóng học phí an toàn qua tài khoản ngân hàng hoặc cổng QR tiện lợi, tự động cấp biên
                  lai thu học phí có mã tra cứu và phân bổ lớp đào tạo tức thì.
                </p>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className={styles.actionsRow}>
            <button
              type="button"
              className={styles.primaryCtaBtn}
              onClick={handleApplyNow}
              aria-label="Nộp hồ sơ học lái xe ngay"
            >
              <Icons.FileText size={18} />
              <span>Nộp hồ sơ học lái xe ngay</span>
              <Icons.ArrowRight size={18} />
            </button>

            <button
              type="button"
              className={styles.secondaryCtaBtn}
              onClick={handleTrackDossier}
              aria-label="Tra cứu và quản lý hồ sơ đã nộp"
            >
              <Icons.UserCheck size={18} />
              <span>Quản lý hồ sơ của tôi</span>
            </button>
          </div>

          <div className={styles.hotlineNote}>
            <Icons.CheckCircle size={15} className={styles.greenCheck} />
            <span>
              Bảo mật dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP • Hotline tư vấn tuyển sinh:{' '}
              <strong>1900 6868</strong>
            </span>
          </div>
        </div>

        {/* Right Side: Live Electronic Dossier Tracker Preview */}
        <div className={styles.mockupCol}>
          <div className={styles.mockupCard}>
            <div className={styles.mockupHeader}>
              <div className={styles.mockupMeta}>
                <span className={styles.mockupLabel}>Hồ sơ đào tạo điện tử</span>
                <span className={styles.mockupCode}>HS-B2-2026-0899</span>
              </div>
              <div className={styles.mockupStatusBadge}>
                <span className={styles.statusDot} />
                <span>ĐÃ DUYỆT (APPROVED)</span>
              </div>
            </div>

            <div className={styles.studentInfoBox}>
              <div className={styles.avatarCircle}>
                <Icons.User size={24} />
              </div>
              <div className={styles.studentDetails}>
                <h4 className={styles.studentName}>Nguyễn Văn An</h4>
                <div className={styles.studentMetaRow}>
                  <span>CCCD: 001099******</span>
                  <span>•</span>
                  <span className={styles.categoryPill}>Hạng B</span>
                </div>
              </div>
            </div>

            <div className={styles.courseInfoBlock}>
              <div className={styles.courseRow}>
                <span className={styles.courseLabel}>Khóa học:</span>
                <span className={styles.courseVal}>K48 — Đào tạo ô tô chất lượng cao</span>
              </div>
              <div className={styles.courseRow}>
                <span className={styles.courseLabel}>Ngày khai giảng:</span>
                <span className={styles.courseVal}>15/11/2026 (Dự kiến)</span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={`${styles.timelineIcon} ${styles.timelineSuccess}`}>
                  <Icons.Check size={14} />
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeading}>Nộp hồ sơ & Ảnh CCCD 2 mặt</div>
                  <div className={styles.timelineDesc}>Tải lên hoàn tất • Trích xuất thông tin khớp 100%</div>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={`${styles.timelineIcon} ${styles.timelineSuccess}`}>
                  <Icons.Check size={14} />
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeading}>GKSK điện tử liên thông</div>
                  <div className={styles.timelineDesc}>Bệnh viện Đa khoa xác nhận • Mã: 2401889/GKSK</div>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={`${styles.timelineIcon} ${styles.timelineSuccess}`}>
                  <Icons.Check size={14} />
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeading}>Thẩm định & Duyệt hồ sơ</div>
                  <div className={styles.timelineDesc}>Cán bộ tuyển sinh phê duyệt ngày 27/10/2026</div>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={`${styles.timelineIcon} ${styles.timelineActive}`}>
                  <Icons.Car size={14} />
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeading}>Xếp lớp & Phân bổ giáo viên DAT</div>
                  <div className={styles.timelineDesc}>Đã sẵn sàng vào học lý thuyết & thực hành đường trường</div>
                </div>
              </div>
            </div>

            {/* Live Notice Box */}
            <div className={styles.liveNotice}>
              <Icons.ShieldCheck size={18} className={styles.liveNoticeIcon} />
              <p>
                <strong>Trạng thái hồ sơ:</strong> Đã sẵn sàng. Bạn có thể bắt đầu học 600 câu lý thuyết
                và theo dõi lịch học lái xe ngay trên hệ thống.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
