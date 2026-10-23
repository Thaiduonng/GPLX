import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { healthService } from '../services/healthService';
import type { HealthStatus } from '../types/health';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const checkHealthStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await healthService.checkHealth();
      setHealth(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Không thể kết nối đến máy chủ Backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealthStatus();
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h2>Chào mừng đến với Hệ thống Đào tạo & Tiếp nhận Hồ sơ GPLX</h2>
        <p>
          Giải pháp công nghệ hiện đại phục vụ quản lý toàn diện quy trình tuyển sinh,
          hồ sơ điện tử, lịch đào tạo thực hành và tổ chức sát hạch cấp giấy phép lái xe các hạng.
        </p>

        {isAuthenticated && user ? (
          <div style={{ marginTop: '1.25rem', padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
            <h4 style={{ color: '#1e40af', marginBottom: '0.25rem' }}>👋 Xin chào, {user.fullName || user.username}!</h4>
            <p style={{ fontSize: '0.9rem', color: '#1e3a8a', margin: 0 }}>
              Bạn đang đăng nhập với vai trò: <strong>{user.roles?.join(', ')}</strong>. Tài khoản của bạn đã được xác thực an toàn qua Spring Security 7 JWT.
            </p>
          </div>
        ) : (
          <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
            <Link
              to="/login"
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '0.6rem 1.25rem',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.95rem',
              }}
            >
              Đăng nhập ngay
            </Link>
            <Link
              to="/register"
              style={{
                backgroundColor: '#f3f4f6',
                color: '#374151',
                padding: '0.6rem 1.25rem',
                borderRadius: '6px',
                fontWeight: 600,
                fontSize: '0.95rem',
                border: '1px solid #d1d5db',
              }}
            >
              Tạo tài khoản học viên
            </Link>
          </div>
        )}
      </section>

      {/* Trạng thái kết nối Backend */}
      <section className={styles.statusSection}>
        <div className={styles.cardHeader}>
          <h3>🔍 Kiểm tra Tình trạng Hệ thống (Health Check)</h3>
          <button onClick={checkHealthStatus} className={styles.refreshBtn} disabled={loading}>
            {loading ? 'Đang kiểm tra...' : 'Làm mới'}
          </button>
        </div>

        {loading && (
          <div className={styles.loadingBox}>
            <p>⏳ Đang truy vấn endpoint <code>/api/v1/health</code>...</p>
          </div>
        )}

        {error && (
          <div className={styles.errorBox}>
            <h4>⚠️ Không kết nối được Backend:</h4>
            <p>{error}</p>
            <span className={styles.hint}>
              Gợi ý: Đảm bảo máy chủ Spring Boot đang chạy tại cổng 8080 hoặc khởi động qua Docker Compose.
            </span>
          </div>
        )}

        {health && !loading && (
          <div className={styles.successBox}>
            <div className={styles.badge}>✅ DỊCH VỤ SẴN SÀNG</div>
            <div className={styles.infoGrid}>
              <div><strong>Ứng dụng:</strong> {health.application}</div>
              <div><strong>Trạng thái:</strong> <span className={styles.statusUp}>{health.status}</span></div>
              <div><strong>Phiên bản:</strong> {health.version}</div>
              <div><strong>Nền tảng:</strong> {health.framework || 'Spring Boot 4.1.1 (Java 21)'}</div>
              <div className={styles.fullWidth}><strong>Thời điểm hệ thống:</strong> {health.timestamp}</div>
            </div>
          </div>
        )}
      </section>

      {/* Các Module Nghiệp vụ */}
      <section className={styles.modulesSection}>
        <h3>📦 Ranh giới các Module Nghiệp vụ (Modular Monolith)</h3>
        <div className={styles.grid}>
          <div className={styles.moduleCard}>
            <div className={styles.moduleIcon}>🔐</div>
            <h4>Identity (Phase 1 ✅)</h4>
            <p>Xác thực JWT Stateless, phân quyền RBAC, quản lý tài khoản người dùng, mã hóa mật khẩu BCrypt.</p>
          </div>
          <div className={styles.moduleCard}>
            <div className={styles.moduleIcon}>📋</div>
            <h4>Admission (Phase 2)</h4>
            <p>Tuyển sinh khóa học, tiếp nhận hồ sơ điện tử và quy trình thẩm định hồ sơ theo hạng bằng.</p>
          </div>
          <div className={styles.moduleCard}>
            <div className={styles.moduleIcon}>📚</div>
            <h4>Learning (Phase 3)</h4>
            <p>Bài học lý thuyết trực tuyến, tiến độ học tập và ngân hàng câu hỏi ôn luyện.</p>
          </div>
          <div className={styles.moduleCard}>
            <div className={styles.moduleIcon}>🏫</div>
            <h4>Training (Phase 3)</h4>
            <p>Lập lịch học thực hành, xếp lớp, điểm danh và quản lý thời lượng lái xe DAT.</p>
          </div>
          <div className={styles.moduleCard}>
            <div className={styles.moduleIcon}>📝</div>
            <h4>Examination (Phase 4)</h4>
            <p>Thẩm định điều kiện dự thi, quản lý kỳ thi và ghi nhận biên bản kết quả sát hạch.</p>
          </div>
          <div className={styles.moduleCard}>
            <div className={styles.moduleIcon}>💰</div>
            <h4>Finance & Fleet (Phase 5)</h4>
            <p>Quản lý biểu học phí, công nợ và điều phối đội xe tập lái an toàn.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
