import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { Icons } from '../components/ui';
import { UserAccountMenu } from '../components/layout/UserAccountMenu';
import styles from './MainLayout.module.css';

export default function MainLayout() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);

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

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Close drawer on route change or Escape key
  useEffect(() => {
    setLeftDrawerOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLeftDrawerOpen(false);
    };
    if (leftDrawerOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [leftDrawerOpen]);

  return (
    <div className={styles.layout}>
      {/* WCAG 2.1 AA Accessibility: Skip to Main Content */}
      <a href="#main-content" className="skip-to-content">
        Chuyển đến nội dung chính
      </a>

      {/* Primary Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          {/* GÓC TRÁI: Thanh Menu, Logo thương hiệu và Điều hướng chính */}
          <div className={styles.leftSection}>
            {/* Nút bật/mở Thanh Menu góc trái */}
            <button
              type="button"
              className={styles.menuToggleButton}
              onClick={() => setLeftDrawerOpen(!leftDrawerOpen)}
              aria-label={leftDrawerOpen ? 'Đóng menu' : 'Mở thanh menu hệ thống'}
              aria-expanded={leftDrawerOpen}
              title="Mở menu danh mục phân hệ"
            >
              <Icons.Menu size={22} />
              <span className={styles.menuToggleLabel}>Danh mục</span>
            </button>

            {/* Logo Thương Hiệu */}
            <Link to="/" className={styles.brand} aria-label="Trang chủ Hệ thống GPLX">
              <span className={styles.brandIconWrapper}>
                <Icons.Car size={22} />
              </span>
              <div className={styles.brandText}>
                <h1 className={styles.brandTitle}>HỆ THỐNG ĐÀO TẠO & SÁT HẠCH GPLX</h1>
                <p className={styles.brandSubtitle}>Cổng dịch vụ công đào tạo lái xe Quốc gia</p>
              </div>
            </Link>

            {/* Thanh menu điều hướng chính ở góc trái */}
            <nav className={styles.leftNav} aria-label="Điều hướng chính">
              <Link
                to="/"
                className={`${styles.navLink} ${isActive('/') && location.pathname === '/' ? styles.active : ''}`}
              >
                Trang chủ
              </Link>
              <Link
                to="/courses"
                className={`${styles.navLink} ${isActive('/courses') ? styles.active : ''}`}
              >
                <Icons.BookOpen size={16} />
                Khóa học
              </Link>
              <Link
                to="/theory-exam"
                className={`${styles.navLink} ${isActive('/theory-exam') ? styles.active : ''}`}
              >
                <Icons.ClipboardList size={16} />
                Thi thử 600 câu
              </Link>
              <Link
                to="/training/schedules"
                className={`${styles.navLink} ${isActive('/training/schedules') ? styles.active : ''}`}
              >
                <Icons.Calendar size={16} />
                Lịch học & DAT
              </Link>
              <Link
                to="/fleet"
                className={`${styles.navLink} ${isActive('/fleet') ? styles.active : ''}`}
              >
                <Icons.Car size={16} />
                Xe tập lái
              </Link>
              <Link
                to="/examination/sessions"
                className={`${styles.navLink} ${isActive('/examination/sessions') ? styles.active : ''}`}
              >
                <Icons.Award size={16} />
                Kỳ sát hạch
              </Link>
              <a
                href="http://localhost:8088/swagger-ui/index.html"
                target="_blank"
                rel="noreferrer"
                className={styles.navLink}
                title="Tài liệu OpenAPI / Swagger API"
              >
                API <Icons.ExternalLink size={12} />
              </a>
            </nav>
          </div>

          {/* GÓC PHẢI: Nút Đăng ký/Đăng nhập (khi chưa đăng nhập) HOẶC Khu vực Người dùng & Quản lý tài khoản (sau khi đăng nhập) */}
          <div className={styles.rightSection}>
            {isAuthenticated && user ? (
              <UserAccountMenu user={user} logout={logout} />
            ) : (
              <div className={styles.authButtons}>
                <Link to="/login" className={styles.loginButton}>
                  <Icons.User size={15} />
                  Đăng nhập
                </Link>
                <Link to="/register" className={styles.registerButton}>
                  <Icons.Plus size={15} />
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Role Workspace Sub-bar (Phân hệ nghiệp vụ hiển thị khi đã đăng nhập) */}
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

              {/* Staff Actions */}
              {isStaffOrAdmin && (
                <Link
                  to="/admin/admissions"
                  className={`${styles.wsLink} ${isActive('/admin/admissions') ? styles.active : ''}`}
                >
                  <Icons.FileText size={14} />
                  Thẩm định hồ sơ
                </Link>
              )}

              {/* Examiner Actions */}
              {isExaminerOrAdmin && (
                <Link
                  to="/examination/grading"
                  className={`${styles.wsLink} ${isActive('/examination/grading') ? styles.active : ''}`}
                >
                  <Icons.ClipboardList size={14} />
                  Chấm điểm sát hạch
                </Link>
              )}

              {/* Admin / Manager Actions */}
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

      {/* THANH MENU GÓC TRÁI (LEFT SIDEBAR DRAWER) */}
      {leftDrawerOpen && (
        <div className={styles.drawerBackdrop} onClick={() => setLeftDrawerOpen(false)}>
          <aside
            className={styles.leftDrawer}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Thanh điều hướng toàn bộ hệ thống"
          >
            {/* Drawer Header */}
            <div className={styles.drawerHeader}>
              <div className={styles.drawerBrand}>
                <div className={styles.drawerBrandIcon}>
                  <Icons.Car size={20} />
                </div>
                <div>
                  <h3 className={styles.drawerTitle}>DANH MỤC HỆ THỐNG</h3>
                  <p className={styles.drawerSubtitle}>Hệ thống Đào tạo & Sát hạch GPLX</p>
                </div>
              </div>
              <button
                type="button"
                className={styles.drawerCloseButton}
                onClick={() => setLeftDrawerOpen(false)}
                aria-label="Đóng thanh menu"
              >
                <Icons.X size={20} />
              </button>
            </div>

            {/* Drawer Navigation Links by Modules */}
            <div className={styles.drawerBody}>
              {/* Group 1: Học tập & Thi thử */}
              <div className={styles.drawerGroup}>
                <span className={styles.drawerGroupLabel}>Học tập & Sát hạch</span>
                <Link to="/" className={styles.drawerLink} onClick={() => setLeftDrawerOpen(false)}>
                  <Icons.BookOpen size={16} />
                  <span>Trang chủ hệ thống</span>
                </Link>
                <Link to="/courses" className={styles.drawerLink} onClick={() => setLeftDrawerOpen(false)}>
                  <Icons.BookOpen size={16} />
                  <span>Khóa học đào tạo lái xe</span>
                </Link>
                <Link to="/theory-exam" className={styles.drawerLink} onClick={() => setLeftDrawerOpen(false)}>
                  <Icons.ClipboardList size={16} />
                  <span>Thi thử 600 câu lý thuyết</span>
                </Link>
                <Link to="/examination/sessions" className={styles.drawerLink} onClick={() => setLeftDrawerOpen(false)}>
                  <Icons.Award size={16} />
                  <span>Danh sách kỳ sát hạch</span>
                </Link>
              </div>

              {/* Group 2: Thực hành & Đội xe */}
              <div className={styles.drawerGroup}>
                <span className={styles.drawerGroupLabel}>Thực hành & Đội xe</span>
                <Link to="/training/schedules" className={styles.drawerLink} onClick={() => setLeftDrawerOpen(false)}>
                  <Icons.Calendar size={16} />
                  <span>Lịch học & Giám sát DAT</span>
                </Link>
                <Link to="/fleet" className={styles.drawerLink} onClick={() => setLeftDrawerOpen(false)}>
                  <Icons.Car size={16} />
                  <span>Quản lý xe tập lái & Đăng kiểm</span>
                </Link>
              </div>

              {/* Group 3: Tuyển sinh & Tài chính */}
              <div className={styles.drawerGroup}>
                <span className={styles.drawerGroupLabel}>Hồ sơ & Tài chính</span>
                <Link to="/admissions/new" className={styles.drawerLink} onClick={() => setLeftDrawerOpen(false)}>
                  <Icons.Plus size={16} />
                  <span>Nộp hồ sơ điện tử mới</span>
                </Link>
                <Link to="/my-applications" className={styles.drawerLink} onClick={() => setLeftDrawerOpen(false)}>
                  <Icons.FileText size={16} />
                  <span>Theo dõi hồ sơ của tôi</span>
                </Link>
                <Link to="/finance/tuition" className={styles.drawerLink} onClick={() => setLeftDrawerOpen(false)}>
                  <Icons.CreditCard size={16} />
                  <span>Thanh toán học phí trực tuyến</span>
                </Link>
                <Link to="/examination/eligibility" className={styles.drawerLink} onClick={() => setLeftDrawerOpen(false)}>
                  <Icons.CheckCircle size={16} />
                  <span>Kiểm tra điều kiện dự thi</span>
                </Link>
              </div>

              {/* Group 4: Nghiệp vụ Quản trị & Báo cáo */}
              {isStaffOrAdmin && (
                <div className={styles.drawerGroup}>
                  <span className={styles.drawerGroupLabel}>Nghiệp vụ Quản trị</span>
                  <Link to="/admin/admissions" className={styles.drawerLink} onClick={() => setLeftDrawerOpen(false)}>
                    <Icons.FileText size={16} />
                    <span>Thẩm định hồ sơ tuyển sinh</span>
                  </Link>
                  {isExaminerOrAdmin && (
                    <Link to="/examination/grading" className={styles.drawerLink} onClick={() => setLeftDrawerOpen(false)}>
                      <Icons.ClipboardList size={16} />
                      <span>Chấm điểm hội đồng sát hạch</span>
                    </Link>
                  )}
                  {isAdminOrManager && (
                    <>
                      <Link to="/dashboard" className={styles.drawerLink} onClick={() => setLeftDrawerOpen(false)}>
                        <Icons.BarChart size={16} />
                        <span>Thống kê & Báo cáo KPI</span>
                      </Link>
                      <Link to="/audit-logs" className={styles.drawerLink} onClick={() => setLeftDrawerOpen(false)}>
                        <Icons.ShieldCheck size={16} />
                        <span>Nhật ký kiểm toán hệ thống</span>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className={styles.drawerFooter}>
              <a
                href="http://localhost:8088/swagger-ui/index.html"
                target="_blank"
                rel="noreferrer"
                className={styles.drawerApiLink}
              >
                <Icons.Server size={15} />
                <span>OpenAPI / Swagger Spec</span>
                <Icons.ExternalLink size={12} />
              </a>
              <p className={styles.drawerVersion}>GPLX System v1.9.0 • Tiêu chuẩn Cục Đường bộ VN</p>
            </div>
          </aside>
        </div>
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
