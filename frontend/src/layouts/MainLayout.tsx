import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import styles from './MainLayout.module.css';

export default function MainLayout() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const isStudent =
    !isStaffOrAdmin && !isExaminerOrAdmin && !isAdminOrManager;

  const getRoleDisplayName = (role?: string) => {
    switch (role) {
      case 'ROLE_ADMIN':
        return 'Quản trị viên';
      case 'ROLE_STAFF':
        return 'Tuyển sinh';
      case 'ROLE_EXAMINER':
        return 'Sát hạch viên';
      case 'ROLE_INSTRUCTOR':
        return 'Giáo viên';
      case 'ROLE_MANAGER':
        return 'Quản lý';
      default:
        return 'Học viên';
    }
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className={styles.layout}>
      {/* Primary Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link to="/" className={styles.brand}>
            <span className={styles.brandIcon}>🚗</span>
            <div>
              <h1 className={styles.brandTitle}>HỆ THỐNG ĐÀO TẠO & SÁT HẠCH GPLX</h1>
              <p className={styles.brandSubtitle}>Cổng đào tạo trực tuyến & tiếp nhận hồ sơ cấp GPLX</p>
            </div>
          </Link>

          <button
            type="button"
            className={styles.mobileToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Chuyển đổi menu"
          >
            ☰
          </button>

          {/* Desktop & Collapsible Nav */}
          <nav className={`${styles.desktopNav} ${mobileMenuOpen ? styles.open : ''}`}>
            <Link
              to="/"
              className={`${styles.navLink} ${isActive('/') && location.pathname === '/' ? styles.active : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Trang chủ
            </Link>
            <Link
              to="/courses"
              className={`${styles.navLink} ${isActive('/courses') ? styles.active : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Khóa học
            </Link>
            <Link
              to="/theory-exam"
              className={`${styles.navLink} ${isActive('/theory-exam') ? styles.active : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Thi thử 600 câu
            </Link>
            <Link
              to="/training/schedules"
              className={`${styles.navLink} ${isActive('/training/schedules') ? styles.active : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Lịch học & DAT
            </Link>
            <Link
              to="/fleet"
              className={`${styles.navLink} ${isActive('/fleet') ? styles.active : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Xe tập lái
            </Link>
            <Link
              to="/examination/sessions"
              className={`${styles.navLink} ${isActive('/examination/sessions') ? styles.active : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Kỳ sát hạch
            </Link>

            <a
              href="http://localhost:8088/swagger-ui/index.html"
              target="_blank"
              rel="noreferrer"
              className={styles.navLink}
              title="Tài liệu Swagger REST API"
            >
              OpenAPI ↗
            </a>

            {/* Auth Actions */}
            <div className={styles.userSection}>
              {isAuthenticated && user ? (
                <>
                  <div className={styles.userBadge}>
                    <span>👤 <strong>{user.fullName || user.username}</strong></span>
                    {user.roles && user.roles.length > 0 && (
                      <span className={styles.roleTag}>
                        {getRoleDisplayName(user.roles[0])}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    style={{
                      backgroundColor: 'rgba(239, 68, 68, 0.85)',
                      color: 'white',
                      border: 'none',
                      padding: '0.4rem 0.8rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--font-size-xs)',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Đăng xuất
                  </button>
                </>
              ) : (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      color: 'white',
                      padding: '0.4rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 500,
                      textDecoration: 'none',
                    }}
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      backgroundColor: '#ffffff',
                      color: '#1d4ed8',
                      padding: '0.4rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    Đăng ký
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Role Workspace Sub-bar (Only when authenticated) */}
      {isAuthenticated && (
        <section className={styles.workspaceBar}>
          <div className={styles.workspaceContainer}>
            <span className={styles.workspaceLabel}>
              {isAdminOrManager
                ? '⚙️ Khu vực Quản trị & Báo cáo'
                : isExaminerOrAdmin
                ? '📋 Khu vực Sát hạch viên'
                : isStaffOrAdmin
                ? '🛡️ Khu vực Tuyển sinh & Đào tạo'
                : '🎓 Không gian Học viên'}
            </span>

            <div className={styles.workspaceLinks}>
              {/* Common Student Links */}
              {(isStudent || isAdminOrManager) && (
                <>
                  <Link
                    to="/my-applications"
                    className={`${styles.wsLink} ${isActive('/my-applications') ? styles.active : ''}`}
                  >
                    📁 Hồ sơ của tôi
                  </Link>
                  <Link
                    to="/admissions/new"
                    className={`${styles.wsLink} ${isActive('/admissions/new') ? styles.active : ''}`}
                  >
                    ➕ Nộp hồ sơ mới
                  </Link>
                  <Link
                    to="/finance/tuition"
                    className={`${styles.wsLink} ${isActive('/finance/tuition') ? styles.active : ''}`}
                  >
                    💳 Nộp học phí
                  </Link>
                  <Link
                    to="/examination/eligibility"
                    className={`${styles.wsLink} ${isActive('/examination/eligibility') ? styles.active : ''}`}
                  >
                    🚦 Xét điều kiện thi
                  </Link>
                  <Link
                    to="/examination/my-results"
                    className={`${styles.wsLink} ${isActive('/examination/my-results') ? styles.active : ''}`}
                  >
                    🏆 Kết quả sát hạch
                  </Link>
                </>
              )}

              {/* Staff / Examiner / Admin Actions */}
              {isStaffOrAdmin && (
                <Link
                  to="/admin/admissions"
                  className={`${styles.wsLink} ${isActive('/admin/admissions') ? styles.active : ''}`}
                >
                  📝 Thẩm định hồ sơ
                </Link>
              )}

              {isExaminerOrAdmin && (
                <Link
                  to="/examination/grading"
                  className={`${styles.wsLink} ${isActive('/examination/grading') ? styles.active : ''}`}
                >
                  ✍️ Chấm điểm sát hạch
                </Link>
              )}

              {isAdminOrManager && (
                <>
                  <Link
                    to="/dashboard"
                    className={`${styles.wsLink} ${isActive('/dashboard') ? styles.active : ''}`}
                  >
                    📊 Thống kê KPI
                  </Link>
                  <Link
                    to="/audit-logs"
                    className={`${styles.wsLink} ${isActive('/audit-logs') ? styles.active : ''}`}
                  >
                    🛡️ Nhật ký kiểm toán
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Body */}
      <main className={styles.main}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <p>© 2026 GPLX Training System. Hệ thống quản lý đào tạo lái xe và tiếp nhận hồ sơ cấp GPLX.</p>
          <p className={styles.footerNote}>
            Hệ thống tuân thủ Nghị định 168/2024/NĐ-CP, Thông tư 05/2024/TT-BGTVT và quy chuẩn thiết bị giám sát hành trình DAT.
          </p>
        </div>
      </footer>
    </div>
  );
}
