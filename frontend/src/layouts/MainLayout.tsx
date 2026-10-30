import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { Icons } from '../components/ui';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { NavigationDrawer } from '../components/layout/NavigationDrawer';
import { getQuickLinks, getRoleLabel, isNavigationActive } from '../features/navigation/navigation';
import styles from './MainLayout.module.css';

export default function MainLayout() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);

  // Theme management: light / dark mode (theo thiết kế mẫu 2026)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('gplx_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('gplx_theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const roles = user?.roles ?? [];
  const quickLinks = getQuickLinks(roles);
  useEffect(() => { setLeftDrawerOpen(false); }, [location.pathname, user?.id]);

  return (
    <div className={styles.layout}>
      {/* WCAG 2.1 AA Accessibility: Skip to Main Content */}
      <a href="#main-content" className="skip-to-content">
        Chuyển đến nội dung chính
      </a>

      {/* Primary Header */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} user={user} isAuthenticated={isAuthenticated} logout={logout} onOpenDrawer={() => setLeftDrawerOpen(value => !value)} drawerOpen={leftDrawerOpen} />

      {/* Role Workspace Sub-bar: lối tắt từ cùng bảng quyền với route và danh mục. */}
      {isAuthenticated && <section className={styles.workspaceBar} aria-label="Không gian làm việc theo vai trò">
        <div className={styles.workspaceContainer}>
          <div className={styles.workspaceLabelWrapper}><Icons.ShieldCheck size={16} /><span className={styles.workspaceLabel}>{getRoleLabel(roles)}</span></div>
          <nav className={styles.roleLinks} aria-label="Lối tắt theo vai trò">
            {quickLinks.map(item => <Link key={item.path} to={item.path} aria-current={isNavigationActive(location.pathname, item) ? 'page' : undefined}
              className={`${styles.wsLink} ${isNavigationActive(location.pathname, item) ? styles.active : ''} ${item.path === '/student/driving-simulation' ? styles.simulationLink : ''}`}>
              {item.path === '/student/driving-simulation' && <Icons.Car size={16} />}{item.label}
            </Link>)}
          </nav>
        </div>
      </section>}

      {/* Native dialog giữ focus trong danh mục, hỗ trợ Escape và trả focus khi đóng. */}
      <NavigationDrawer open={leftDrawerOpen} roles={roles} authenticated={isAuthenticated} onClose={() => setLeftDrawerOpen(false)} />

      {/* Main Content Area */}
      <main id="main-content" className={styles.main}>
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
