import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { Icons } from '../components/ui';
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
      {/* WCAG 2.1 AA Accessibility: Skip to Main Content */}
      <a href="#main-content" className="skip-to-content">
        Chuyển đến nội dung chính
      </a>

      {/* Primary Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link to="/" className={styles.brand} aria-label="Trang chủ Hệ thống Đào tạo & Sát hạch GPLX">
            <span className={styles.brandIconWrapper}>
              <Icons.Car size={24} />
            </span>
            <div>
              <h1 className={styles.brandTitle}>HỆ THỐNG ĐÀO TẠO & SÁT HẠCH GPLX</h1>
              <p className={styles.brandSubtitle}>Cổng đào tạo trực tuyến & tiếp nhận hồ sơ cấp GPLX Quốc gia</p>
            </div>
          </Link>

          <button
            type="button"
            className={styles.mobileToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu điều hướng'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <Icons.X size={24} /> : <Icons.Menu size={24} />}
          </button>

          {/* Desktop & Collapsible Nav */}
          <nav
            className={`${styles.desktopNav} ${mobileMenuOpen ? styles.open : ''}`}
            aria-label="Điều hướng chính"
          >
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
              <Icons.BookOpen size={16} />
              Khóa học
            </Link>
            <Link
              to="/theory-exam"
              className={`${styles.navLink} ${isActive('/theory-exam') ? styles.active : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Icons.ClipboardList size={16} />
              Thi thử 600 câu
            </Link>
            <Link
              to="/training/schedules"
              className={`${styles.navLink} ${isActive('/training/schedules') ? styles.active : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Icons.Calendar size={16} />
              Lịch học & DAT
            </Link>
            <Link
              to="/fleet"
              className={`${styles.navLink} ${isActive('/fleet') ? styles.active : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Icons.Car size={16} />
              Xe tập lái
            </Link>
            <Link
              to="/examination/sessions"
              className={`${styles.navLink} ${isActive('/examination/sessions') ? styles.active : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Icons.Award size={16} />
              Kỳ sát hạch
            </Link>

            <a
              href="http://localhost:8088/swagger-ui/index.html"
              target="_blank"
              rel="noreferrer"
              className={styles.navLink}
              title="Tài liệu OpenAPI / Swagger Specification"
            >
              API Spec <Icons.ExternalLink size={13} />
            </a>

            {/* Auth Actions */}
            <div className={styles.userSection}>
              {isAuthenticated && user ? (
                <>
                  <div className={styles.userBadge}>
                    <Icons.User size={15} />
                    <span><strong>{user.fullName || user.username}</strong></span>
                    {user.roles && user.roles.length > 0 && (
                      <span className={styles.roleTag}>
                        {getRoleDisplayName(user.roles[0])}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className={styles.logoutButton}
                    title="Đăng xuất khỏi hệ thống"
                  >
                    <Icons.LogOut size={14} />
                    Đăng xuất
                  </button>
                </>
              ) : (
                <div className={styles.authButtons}>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className={styles.loginButton}
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className={styles.registerButton}
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
        <section className={styles.workspaceBar} aria-label="Không gian làm việc theo vai trò">
          <div className={styles.workspaceContainer}>
            <div className={styles.workspaceLabelWrapper}>
              {isAdminOrManager ? (
                <>
                  <Icons.ShieldCheck size={16} />
                  <span className={styles.workspaceLabel}>Phân hệ Quản trị & Giám sát</span>
                </>
              ) : isExaminerOrAdmin ? (
                <>
                  <Icons.ClipboardList size={16} />
                  <span className={styles.workspaceLabel}>Phân hệ Hội đồng Sát hạch</span>
                </>
              ) : isStaffOrAdmin ? (
                <>
                  <Icons.FileText size={16} />
                  <span className={styles.workspaceLabel}>Phân hệ Tuyển sinh & Tiếp nhận</span>
                </>
              ) : (
                <>
                  <Icons.GraduationCap size={16} />
                  <span className={styles.workspaceLabel}>Không gian Học viên</span>
                </>
              )}
            </div>

            <div className={styles.workspaceLinks}>
              {/* Common Student Links */}
              {(isStudent || isAdminOrManager) && (
                <>
                  <Link
                    to="/my-applications"
                    className={`${styles.wsLink} ${isActive('/my-applications') ? styles.active : ''}`}
                  >
                    <Icons.FileText size={14} />
                    Hồ sơ của tôi
                  </Link>
                  <Link
                    to="/admissions/new"
                    className={`${styles.wsLink} ${isActive('/admissions/new') ? styles.active : ''}`}
                  >
                    <Icons.Plus size={14} />
                    Nộp hồ sơ mới
                  </Link>
                  <Link
                    to="/finance/tuition"
                    className={`${styles.wsLink} ${isActive('/finance/tuition') ? styles.active : ''}`}
                  >
                    <Icons.CreditCard size={14} />
                    Nộp học phí
                  </Link>
                  <Link
                    to="/examination/eligibility"
                    className={`${styles.wsLink} ${isActive('/examination/eligibility') ? styles.active : ''}`}
                  >
                    <Icons.CheckCircle size={14} />
                    Xét điều kiện thi
                  </Link>
                  <Link
                    to="/examination/my-results"
                    className={`${styles.wsLink} ${isActive('/examination/my-results') ? styles.active : ''}`}
                  >
                    <Icons.Award size={14} />
                    Kết quả sát hạch
                  </Link>
                </>
              )}

              {/* Staff / Examiner / Admin Actions */}
              {isStaffOrAdmin && (
                <Link
                  to="/admin/admissions"
                  className={`${styles.wsLink} ${isActive('/admin/admissions') ? styles.active : ''}`}
                >
                  <Icons.FileText size={14} />
                  Thẩm định hồ sơ
                </Link>
              )}

              {isExaminerOrAdmin && (
                <Link
                  to="/examination/grading"
                  className={`${styles.wsLink} ${isActive('/examination/grading') ? styles.active : ''}`}
                >
                  <Icons.ClipboardList size={14} />
                  Chấm điểm sát hạch
                </Link>
              )}

              {isAdminOrManager && (
                <>
                  <Link
                    to="/dashboard"
                    className={`${styles.wsLink} ${isActive('/dashboard') ? styles.active : ''}`}
                  >
                    <Icons.BarChart size={14} />
                    Thống kê KPI
                  </Link>
                  <Link
                    to="/audit-logs"
                    className={`${styles.wsLink} ${isActive('/audit-logs') ? styles.active : ''}`}
                  >
                    <Icons.ShieldCheck size={14} />
                    Nhật ký kiểm toán
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Content Area */}
      <main id="main-content" className={styles.main}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerBrand}>
            <Icons.Car size={20} className={styles.footerIcon} />
            <strong>HỆ THỐNG ĐÀO TẠO & SÁT HẠCH CẤP GIẤY PHÉP LÁI XE</strong>
          </div>
          <p>© 2026 GPLX Training System. Toàn bộ quy trình tuân thủ quy định đào tạo lái xe cơ giới đường bộ Việt Nam.</p>
          <p className={styles.footerNote}>
            Căn cứ pháp lý: Luật Trật tự, an toàn giao thông đường bộ 2024, Nghị định 168/2024/NĐ-CP, Thông tư 05/2024/TT-BGTVT và quy chuẩn thiết bị giám sát hành trình DAT.
          </p>
        </div>
      </footer>
    </div>
  );
}
