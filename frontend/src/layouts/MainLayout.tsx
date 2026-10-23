import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import styles from './MainLayout.module.css';

export default function MainLayout() {
  const { user, isAuthenticated, logout } = useAuth();

  const isStaffOrAdmin =
    user?.roles?.some(
      (r) => r === 'ROLE_ADMIN' || r === 'ROLE_STAFF' || r === 'ROLE_MANAGER'
    ) ?? false;

  const isExaminerOrAdmin =
    user?.roles?.some(
      (r) => r === 'ROLE_ADMIN' || r === 'ROLE_EXAMINER' || r === 'ROLE_MANAGER'
    ) ?? false;

  const isAdminOrManager =
    user?.roles?.some(
      (r) => r === 'ROLE_ADMIN' || r === 'ROLE_MANAGER'
    ) ?? false;

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.brand}>
            <span className={styles.icon}>🚗</span>
            <div>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h1 className={styles.title}>HỆ THỐNG ĐÀO TẠO & SÁT HẠCH GPLX</h1>
              </Link>
              <p className={styles.subtitle}>Đồ án tốt nghiệp — Modular Monolith</p>
            </div>
          </div>
          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>Trang chủ</Link>
            <Link to="/courses" className={styles.navLink}>Khóa học</Link>
            <Link to="/theory-exam" className={styles.navLink}>Thi thử 600 câu</Link>
            <Link to="/training/schedules" className={styles.navLink}>Lịch học & DAT</Link>
            <Link to="/fleet" className={styles.navLink}>Xe tập lái</Link>
            <Link to="/examination/sessions" className={styles.navLink}>Kỳ sát hạch</Link>

            {isAuthenticated && (
              <>
                <Link to="/finance/tuition" className={styles.navLink} style={{ color: '#86efac', fontWeight: 600 }}>💰 Học phí</Link>
                <Link to="/examination/eligibility" className={styles.navLink}>Điều kiện thi</Link>
                <Link to="/examination/my-results" className={styles.navLink}>Kết quả thi</Link>
                <Link to="/admissions/new" className={styles.navLink}>Nộp hồ sơ</Link>
                <Link to="/my-applications" className={styles.navLink}>Hồ sơ của tôi</Link>
                {isExaminerOrAdmin && (
                  <Link
                    to="/examination/grading"
                    className={styles.navLink}
                    style={{ color: '#93c5fd', fontWeight: 600 }}
                  >
                    📝 Chấm điểm
                  </Link>
                )}
                {isStaffOrAdmin && (
                  <Link
                    to="/admin/admissions"
                    className={styles.navLink}
                    style={{ color: '#fef08a', fontWeight: 600 }}
                  >
                    🛡️ Tuyển sinh
                  </Link>
                )}
                {isAdminOrManager && (
                  <>
                    <Link
                      to="/dashboard"
                      className={styles.navLink}
                      style={{ color: '#fed7aa', fontWeight: 600 }}
                    >
                      📊 Dashboard
                    </Link>
                    <Link
                      to="/audit-logs"
                      className={styles.navLink}
                      style={{ color: '#fed7aa', fontWeight: 600 }}
                    >
                      🛡️ Kiểm toán
                    </Link>
                  </>
                )}
              </>
            )}

            <a href="http://localhost:8080/swagger-ui/index.html" target="_blank" rel="noreferrer" className={styles.navLink}>
              OpenAPI
            </a>

            {isAuthenticated && user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: '0.5rem' }}>
                <span style={{ fontSize: '0.9rem', color: '#e0e7ff' }}>
                  👤 <strong>{user.fullName || user.username}</strong>
                  {user.roles && user.roles.length > 0 && (
                    <span style={{ marginLeft: '0.35rem', fontSize: '0.75rem', backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>
                      {user.roles[0].replace('ROLE_', '')}
                    </span>
                  )}
                </span>
                <button
                  onClick={logout}
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.85)',
                    color: 'white',
                    border: 'none',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '0.5rem' }}>
                <Link
                  to="/login"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                  }}
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#1d4ed8',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <p>© 2026 GPLX Training System. Hệ thống quản lý đào tạo lái xe và tiếp nhận hồ sơ thi.</p>
          <p className={styles.footerNote}>
            Đồ án tốt nghiệp CNTT — Tuân thủ Luật Giao thông đường bộ Việt Nam
          </p>
        </div>
      </footer>
    </div>
  );
}
