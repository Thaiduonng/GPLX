import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { healthService } from '../services/healthService';
import type { HealthStatus } from '../types/health';
import { AppButton, StatCard, StatusBadge, Alert, LoadingSpinner } from '../components/ui';
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
      {/* Hero Banner */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Hệ thống Đào tạo & Tiếp nhận hồ sơ GPLX</span>
          <h2 className={styles.heroTitle}>Đào tạo lái xe chuẩn hóa, minh bạch & ứng dụng công nghệ DAT</h2>
          <p className={styles.heroDescription}>
            Nền tảng quản lý toàn diện quy trình tiếp nhận hồ sơ trực tuyến, ôn thi 600 câu lý thuyết,
            theo dõi lộ trình thực hành qua thiết bị DAT và quản lý kỳ sát hạch theo tiêu chuẩn của Bộ GTVT.
          </p>

          {isAuthenticated && user ? (
            <div className={styles.userWelcomeCard}>
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 600 }}>
                  👋 Xin chào, {user.fullName || user.username}!
                </h4>
                <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.9 }}>
                  Vai trò: <strong>{user.roles?.map((r) => r.replace('ROLE_', '')).join(', ')}</strong> | Hệ thống đã kích hoạt đầy đủ quyền nghiệp vụ cho bạn.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link to="/my-applications">
                  <AppButton variant="secondary" size="sm">
                    📁 Hồ sơ của tôi
                  </AppButton>
                </Link>
                <Link to="/courses">
                  <AppButton variant="outline" size="sm" style={{ color: 'white', borderColor: 'white' }}>
                    📚 Khóa học
                  </AppButton>
                </Link>
              </div>
            </div>
          ) : (
            <div className={styles.heroActions}>
              <Link to="/register">
                <AppButton variant="secondary" size="lg">
                  Tạo tài khoản học viên ngay
                </AppButton>
              </Link>
              <Link to="/theory-exam">
                <AppButton variant="outline" size="lg" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}>
                  Thi thử 600 câu trắc nghiệm
                </AppButton>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* KPI Highlights */}
      <section className={styles.statsGrid}>
        <StatCard
          title="Hạng GPLX hỗ trợ"
          value="B1, B2, C, D, E"
          subtitle="Đầy đủ tiêu chuẩn đào tạo lái xe toàn quốc"
          icon="🚗"
          variant="primary"
        />
        <StatCard
          title="Ngân hàng câu hỏi lý thuyết"
          value="600 câu"
          subtitle="Gồm 60 câu điểm liệt bắt buộc phải đạt"
          icon="📚"
          variant="success"
        />
        <StatCard
          title="Giám sát thiết bị DAT"
          value="100% km & giờ"
          subtitle="Truy vết hành trình và nhận diện khuôn mặt học viên"
          icon="🛰️"
          variant="warning"
        />
        <StatCard
          title="Thẩm định hồ sơ điện tử"
          value="Nhanh chóng"
          subtitle="Rà soát đối chiếu CCCD & Giấy KSK trực tuyến"
          icon="📑"
          variant="primary"
        />
      </section>

      {/* Roadmap 4 bước */}
      <section className={styles.roadmapSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Lộ trình đào tạo & sát hạch 4 bước chuẩn hóa</h3>
          <p className={styles.sectionSubtitle}>
            Học viên theo dõi xuyên suốt từ ngày nộp hồ sơ đến ngày nhận Giấy phép lái xe
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
              <AppButton variant="outline" size="sm" fullWidth>
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
              <AppButton variant="outline" size="sm" fullWidth>
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
              <AppButton variant="outline" size="sm" fullWidth>
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
              <AppButton variant="outline" size="sm" fullWidth>
                Kiểm tra điều kiện
              </AppButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Ranh giới các Module Nghiệp vụ */}
      <section className={styles.modulesSection}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>
            📦 Phân hệ chức năng chính (Modular Monolith)
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0 }}>
            Kiến trúc phân tầng độc lập, giao tiếp qua API RESTful và tuân thủ các quy tắc nghiệp vụ nghiêm ngặt
          </p>
        </div>

        <div className={styles.moduleGrid}>
          <Link to="/courses" className={styles.moduleCard}>
            <div className={styles.moduleIcon}>📚</div>
            <div className={styles.moduleInfo}>
              <h4>Đào tạo Lý thuyết (Learning)</h4>
              <p>Khóa học lý thuyết, bài giảng điện tử và ngân hàng 600 câu hỏi trắc nghiệm Cục Đường bộ.</p>
            </div>
          </Link>

          <Link to="/training/schedules" className={styles.moduleCard}>
            <div className={styles.moduleIcon}>🏫</div>
            <div className={styles.moduleInfo}>
              <h4>Đào tạo Thực hành (Training & DAT)</h4>
              <p>Phân bổ lịch thực hành, điểm danh giáo viên - học viên và giám sát thiết bị DAT thời gian thực.</p>
            </div>
          </Link>

          <Link to="/examination/sessions" className={styles.moduleCard}>
            <div className={styles.moduleIcon}>📝</div>
            <div className={styles.moduleInfo}>
              <h4>Quản lý Kỳ Sát hạch (Examination)</h4>
              <p>Xét duyệt danh sách dự thi, lập hội đồng sát hạch và biên bản chấm điểm 4 nội dung thi.</p>
            </div>
          </Link>

          <Link to="/finance/tuition" className={styles.moduleCard}>
            <div className={styles.moduleIcon}>💰</div>
            <div className={styles.moduleInfo}>
              <h4>Tài chính & Học phí (Finance)</h4>
              <p>Tra cứu công nợ học phí, thanh toán an toàn chống trùng lặp (Idempotency Key) và xuất hóa đơn.</p>
            </div>
          </Link>

          <Link to="/fleet" className={styles.moduleCard}>
            <div className={styles.moduleIcon}>🚗</div>
            <div className={styles.moduleInfo}>
              <h4>Quản lý Đội xe tập lái (Fleet)</h4>
              <p>Theo dõi thời hạn đăng kiểm an toàn kỹ thuật (FLT-001) và lịch bảo dưỡng xe tập lái.</p>
            </div>
          </Link>

          <Link to="/audit-logs" className={styles.moduleCard}>
            <div className={styles.moduleIcon}>🛡️</div>
            <div className={styles.moduleInfo}>
              <h4>Kiểm toán & Báo cáo (Audit & Reporting)</h4>
              <p>Truy vết mọi thao tác duyệt, sửa điểm, hủy hồ sơ với bằng chứng nhật ký bất biến (REP-001).</p>
            </div>
          </Link>
        </div>
      </section>

      {/* System Health Check Status */}
      <section className={styles.healthCard}>
        <div className={styles.healthHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.25rem' }}>🔌</span>
            <div>
              <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>Tình trạng kết nối máy chủ Backend</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Truy vấn tự động endpoint <code>/api/v1/health</code>
              </span>
            </div>
          </div>
          <AppButton
            variant="outline"
            size="sm"
            onClick={checkHealthStatus}
            loading={loadingHealth}
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <StatusBadge variant="success" label="DỊCH VỤ HOẠT ĐỘNG TỐT" />
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                <strong>{health.application}</strong> — {health.framework || 'Spring Boot 4.1.1 (Java 21)'}
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
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
