import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { healthService } from '../services/healthService';
import type { HealthStatus } from '../types/health';
import { AppButton, StatCard, StatusBadge, Alert, LoadingSpinner, Icons } from '../components/ui';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loadingHealth, setLoadingHealth] = useState<boolean>(true);
  const [healthError, setHealthError] = useState<string | null>(null);

  const checkHealthStatus = async () => {
    try {
      setLoadingHealth(true);
      setHealthError(null);
      const data = await healthService.checkHealth();
      setHealth(data);
    } catch (err) {
      setHealthError(err instanceof Error ? err.message : 'Không thể kết nối đến máy chủ Backend');
    } finally {
      setLoadingHealth(false);
    }
  };

  useEffect(() => {
    checkHealthStatus();
  }, []);

  return (
    <div className={styles.container}>
      {/* Hero Banner - Enterprise Gateway Style */}
      <section className={styles.hero} aria-label="Giới thiệu hệ thống">
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <Icons.ShieldCheck size={16} />
            <span>Cổng Dịch vụ Công & Đào tạo Sát hạch Giấy phép Lái xe</span>
          </div>
          <h2 className={styles.heroTitle}>
            Đào tạo lái xe chuẩn hóa, minh bạch & ứng dụng công nghệ giám sát DAT
          </h2>
          <p className={styles.heroDescription}>
            Nền tảng quản lý toàn diện quy trình tiếp nhận hồ sơ trực tuyến, ôn thi 600 câu hỏi lý thuyết,
            theo dõi lộ trình thực hành qua thiết bị DAT và tổ chức kỳ sát hạch theo tiêu chuẩn của Cục Đường bộ Việt Nam.
          </p>

          {isAuthenticated && user ? (
            <div className={styles.userWelcomeCard}>
              <div className={styles.userWelcomeInfo}>
                <div className={styles.userWelcomeHeader}>
                  <Icons.User size={20} className={styles.userIcon} />
                  <h4>Xin chào, {user.fullName || user.username}!</h4>
                </div>
                <p>
                  Vai trò: <strong>{user.roles?.map((r) => r.replace('ROLE_', '')).join(', ')}</strong> | Quyền hạn nghiệp vụ đã được kích hoạt.
                </p>
              </div>
              <div className={styles.userWelcomeActions}>
                <Link to="/my-applications">
                  <AppButton variant="secondary" size="sm" icon={<Icons.FileText size={16} />}>
                    Hồ sơ của tôi
                  </AppButton>
                </Link>
                <Link to="/courses">
                  <AppButton variant="outline" size="sm" icon={<Icons.BookOpen size={16} />} style={{ color: 'white', borderColor: 'rgba(255,255,255,0.6)' }}>
                    Khóa học
                  </AppButton>
                </Link>
                <Link to="/student/review">
                  <AppButton variant="primary" size="sm" icon={<Icons.RefreshCw size={16} />}>
                    Ôn tập thông minh
                  </AppButton>
                </Link>
              </div>
            </div>
          ) : (
            <div className={styles.heroActions}>
              <Link to="/register">
                <AppButton variant="success" size="lg" icon={<Icons.Plus size={18} />}>
                  Đăng ký hồ sơ học viên ngay
                </AppButton>
              </Link>
              <Link to="/theory-exam">
                <AppButton variant="outline" size="lg" icon={<Icons.ClipboardList size={18} />} style={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}>
                  Thi thử 600 câu trắc nghiệm
                </AppButton>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* KPI Highlights */}
      <section className={styles.statsGrid} aria-label="Các chỉ số hệ thống">
        <StatCard
          title="Hạng GPLX hỗ trợ"
          value="B1, B2, C, D, E"
          subtitle="Đầy đủ tiêu chuẩn đào tạo lái xe toàn quốc"
          icon={<Icons.Car size={24} />}
          variant="primary"
        />
        <StatCard
          title="Ngân hàng câu hỏi lý thuyết"
          value="600 câu"
          subtitle="Gồm 60 câu điểm liệt bắt buộc phải đạt"
          icon={<Icons.BookOpen size={24} />}
          variant="success"
        />
        <StatCard
          title="Giám sát thiết bị DAT"
          value="100% km & giờ"
          subtitle="Truy vết hành trình và nhận diện khuôn mặt học viên"
          icon={<Icons.Activity size={24} />}
          variant="warning"
        />
        <StatCard
          title="Thẩm định hồ sơ điện tử"
          value="Nhanh chóng"
          subtitle="Rà soát đối chiếu CCCD & Giấy KSK trực tuyến"
          icon={<Icons.FileText size={24} />}
          variant="primary"
        />
      </section>

      {/* Roadmap 4 bước */}
      <section className={styles.roadmapSection} aria-label="Lộ trình đào tạo 4 bước">
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Lộ trình đào tạo & sát hạch 4 bước chuẩn hóa</h3>
          <p className={styles.sectionSubtitle}>
            Học viên theo dõi xuyên suốt từ ngày nộp hồ sơ điện tử đến ngày nhận Giấy phép lái xe
          </p>
        </div>

        <div className={styles.roadmapGrid}>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>1</div>
            <h4 className={styles.stepTitle}>Nộp hồ sơ trực tuyến</h4>
            <p className={styles.stepDesc}>
              Điền thông tin CCCD, tải giấy khám sức khỏe và ảnh chân dung. Nhân viên tuyển sinh thẩm định hồ sơ theo quy tắc ADM-002.
            </p>
            <Link to="/admissions/new">
              <AppButton variant="outline" size="sm" fullWidth icon={<Icons.Plus size={15} />}>
                Nộp hồ sơ
              </AppButton>
            </Link>
          </div>

          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>2</div>
            <h4 className={styles.stepTitle}>Học lý thuyết & Thi thử</h4>
            <p className={styles.stepDesc}>
              Ôn luyện 600 câu hỏi trắc nghiệm, các tình huống mô phỏng và thi thử trực tiếp theo đề thi chuẩn của Cục Đường bộ.
            </p>
            <Link to="/theory-exam">
              <AppButton variant="outline" size="sm" fullWidth icon={<Icons.ClipboardList size={15} />}>
                Luyện thi ngay
              </AppButton>
            </Link>
          </div>

          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>3</div>
            <h4 className={styles.stepTitle}>Thực hành lái xe & DAT</h4>
            <p className={styles.stepDesc}>
              Thực hành cabin mô phỏng, lái xe sa hình và chạy đường trường tích lũy đủ số km quy định qua thiết bị giám sát DAT.
            </p>
            <Link to="/training/schedules">
              <AppButton variant="outline" size="sm" fullWidth icon={<Icons.Calendar size={15} />}>
                Xem lịch học
              </AppButton>
            </Link>
          </div>

          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>4</div>
            <h4 className={styles.stepTitle}>Sát hạch & Nhận bằng</h4>
            <p className={styles.stepDesc}>
              Xét duyệt đủ điều kiện dự thi, tham gia 4 nội dung sát hạch (Lý thuyết, Mô phỏng, Sa hình, Đường trường) và nhận kết quả.
            </p>
            <Link to="/examination/eligibility">
              <AppButton variant="outline" size="sm" fullWidth icon={<Icons.CheckCircle size={15} />}>
                Kiểm tra điều kiện
              </AppButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Ranh giới các Module Nghiệp vụ */}
      <section className={styles.modulesSection} aria-label="Phân hệ chức năng chính">
        <div className={styles.modulesHeader}>
          <h3 className={styles.modulesTitle}>
            Phân hệ chức năng chính (Modular Monolith)
          </h3>
          <p className={styles.modulesSubtitle}>
            Kiến trúc phân tầng độc lập, giao tiếp qua API RESTful và tuân thủ các quy tắc nghiệp vụ nghiêm ngặt
          </p>
        </div>

        <div className={styles.moduleGrid}>
          <Link to="/courses" className={styles.moduleCard}>
            <div className={styles.moduleIcon}>
              <Icons.BookOpen size={24} />
            </div>
            <div className={styles.moduleInfo}>
              <h4>Đào tạo Lý thuyết (Learning)</h4>
              <p>Khóa học lý thuyết, bài giảng điện tử và ngân hàng 600 câu hỏi trắc nghiệm Cục Đường bộ.</p>
            </div>
          </Link>

          <Link to="/student/review" className={styles.moduleCard}>
            <div className={styles.moduleIcon}>
              <Icons.RefreshCw size={24} />
            </div>
            <div className={styles.moduleInfo}>
              <h4>Ôn tập Thông minh (Spaced Repetition)</h4>
              <p>Củng cố câu sai, 60 câu điểm liệt, thuật toán lặp lại ngắt quãng Leitner 5 hộp tăng phản xạ.</p>
            </div>
          </Link>

          <Link to="/training/schedules" className={styles.moduleCard}>
            <div className={styles.moduleIcon}>
              <Icons.Calendar size={24} />
            </div>
            <div className={styles.moduleInfo}>
              <h4>Đào tạo Thực hành (Training & DAT)</h4>
              <p>Phân bổ lịch thực hành, điểm danh giáo viên - học viên và giám sát thiết bị DAT thời gian thực.</p>
            </div>
          </Link>

          <Link to="/examination/sessions" className={styles.moduleCard}>
            <div className={styles.moduleIcon}>
              <Icons.Award size={24} />
            </div>
            <div className={styles.moduleInfo}>
              <h4>Quản lý Kỳ Sát hạch (Examination)</h4>
              <p>Xét duyệt danh sách dự thi, lập hội đồng sát hạch và biên bản chấm điểm 4 nội dung thi.</p>
            </div>
          </Link>

          <Link to="/finance/tuition" className={styles.moduleCard}>
            <div className={styles.moduleIcon}>
              <Icons.CreditCard size={24} />
            </div>
            <div className={styles.moduleInfo}>
              <h4>Tài chính & Học phí (Finance)</h4>
              <p>Tra cứu công nợ học phí, thanh toán an toàn chống trùng lặp (Idempotency Key) và xuất hóa đơn.</p>
            </div>
          </Link>

          <Link to="/fleet" className={styles.moduleCard}>
            <div className={styles.moduleIcon}>
              <Icons.Car size={24} />
            </div>
            <div className={styles.moduleInfo}>
              <h4>Quản lý Đội xe tập lái (Fleet)</h4>
              <p>Theo dõi thời hạn đăng kiểm an toàn kỹ thuật (FLT-001) và lịch bảo dưỡng xe tập lái.</p>
            </div>
          </Link>

          <Link to="/audit-logs" className={styles.moduleCard}>
            <div className={styles.moduleIcon}>
              <Icons.ShieldCheck size={24} />
            </div>
            <div className={styles.moduleInfo}>
              <h4>Kiểm toán & Báo cáo (Audit & Reporting)</h4>
              <p>Truy vết mọi thao tác duyệt, sửa điểm, hủy hồ sơ với bằng chứng nhật ký bất biến (REP-001).</p>
            </div>
          </Link>
        </div>
      </section>

      {/* System Health Check Status */}
      <section className={styles.healthCard} aria-label="Tình trạng hệ thống">
        <div className={styles.healthHeader}>
          <div className={styles.healthTitleGroup}>
            <div className={styles.healthIconWrapper}>
              <Icons.Server size={20} />
            </div>
            <div>
              <h4 className={styles.healthTitle}>Tình trạng kết nối máy chủ Backend</h4>
              <span className={styles.healthSubtitle}>
                Truy vấn tự động endpoint <code>/api/v1/health</code>
              </span>
            </div>
          </div>
          <AppButton
            variant="outline"
            size="sm"
            onClick={checkHealthStatus}
            loading={loadingHealth}
            icon={<Icons.RefreshCw size={14} />}
          >
            Làm mới kết nối
          </AppButton>
        </div>

        {healthError ? (
          <Alert
            type="danger"
            title="Lỗi kết nối Backend"
            message={`${healthError}. Vui lòng kiểm tra container backend gplx-backend đang chạy ở cổng 8088.`}
          />
        ) : health ? (
          <div className={styles.healthStatusBody}>
            <div className={styles.healthStatusMain}>
              <StatusBadge variant="success" label="DỊCH VỤ HOẠT ĐỘNG TỐT" />
              <span className={styles.healthAppName}>
                <strong>{health.application}</strong> — {health.framework || 'Spring Boot 4.1.1 (Java 21)'}
              </span>
            </div>
            <span className={styles.healthTimestamp}>
              Cập nhật: {health.timestamp}
            </span>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <LoadingSpinner size="sm" text="Đang kiểm tra kết nối máy chủ..." />
          </div>
        )}
      </section>
    </div>
  );
}
