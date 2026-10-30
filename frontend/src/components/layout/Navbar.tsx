import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icons } from '../ui';
import { ThemeToggle } from './ThemeToggle';
import { UserAccountMenu } from './UserAccountMenu';
import type { UserProfile } from '../../types/auth';
import styles from './Navbar.module.css';
import { canAccessPath } from '../../features/navigation/navigation';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  user: UserProfile | null;
  isAuthenticated: boolean;
  logout: () => void;
  onOpenDrawer?: () => void;
  drawerOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  user,
  isAuthenticated,
  logout,
  onOpenDrawer,
  drawerOpen = false,
}) => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={styles.navbarWrapper}>
      <div className={styles.navbarContainer}>
        {/* Left Section: Brand Logo & Title */}
        <div className={styles.leftSection}>
          {onOpenDrawer && (
            <button
              type="button"
              className={styles.drawerToggleBtn}
              onClick={onOpenDrawer}
              aria-label="Mở danh mục chức năng"
              aria-expanded={drawerOpen}
              aria-controls="module-navigation"
              aria-haspopup="dialog"
              title="Danh mục menu"
            >
              <Icons.Menu size={20} /><span className={styles.menuLabel}>Danh mục</span>
            </button>
          )}

          {/* Brand Logo & Name */}
          <Link to="/" className={styles.brandLink} aria-label="Ôn Thi GPLX Trang Chủ">
            <div className={styles.brandBadge}>
              <span className={styles.badgeNumber}>600</span>
            </div>
            <div className={styles.brandTextGroup}>
              <div className={styles.brandName}>
                <span>Ôn Thi</span>
                <span className={styles.brandHighlight}>GPLX</span>
              </div>
              <span className={styles.brandSubTitle}>Chuẩn CSGT 2026</span>
            </div>
          </Link>

          {/* Navigation Links (Pill Style) */}
          <nav className={styles.navMenu} aria-label="Điều hướng chính">
            <Link
              to="/"
              className={`${styles.navItem} ${location.pathname === '/' ? styles.navItemActive : ''}`}
            >
              Trang chủ
            </Link>

            <Link
              to="/courses"
              className={`${styles.navItem} ${isActive('/courses') ? styles.navItemActive : ''}`}
            >
              Khóa đào tạo
            </Link>

            {isAuthenticated && canAccessPath('/student/driving-simulation', user?.roles ?? []) && <Link to="/student/driving-simulation" className={`${styles.navItem} ${isActive('/student/driving-simulation') ? styles.navItemActive : ''}`}>Luyện sa hình</Link>}
            {!isAuthenticated && <Link to="/application-status" className={`${styles.navItem} ${isActive('/application-status') ? styles.navItemActive : ''}`}>Tra cứu hồ sơ</Link>}
          </nav>
        </div>

        {/* Right Section: Primary Apply CTA, Theme Toggle, Auth */}
        <div className={styles.rightSection}>
          {/* Nút Kêu gọi Hành động Nổi bật: Nộp hồ sơ trực tuyến */}
          {(!isAuthenticated || user?.roles.includes('ROLE_STUDENT')) && <Link
            to="/apply"
            className={`${styles.applyCtaBtn} ${isActive('/apply') ? styles.applyCtaBtnActive : ''}`}
            title="Đăng ký học & nộp hồ sơ đào tạo lái xe trực tuyến"
          >
            <span className={styles.applyCtaPulse}></span>
            <Icons.FileText size={16} />
            <span>Nộp hồ sơ trực tuyến</span>
          </Link>}

          {/* Theme Toggle */}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          {/* User Auth or Sign In / Sign Up */}
          {isAuthenticated && user ? (
            <UserAccountMenu user={user} logout={logout} />
          ) : (
            <div className={styles.authButtons}>
              <Link to="/login" className={styles.loginLink}>
                Đăng nhập
              </Link>
              <Link to="/register" className={styles.registerBtn}>
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
