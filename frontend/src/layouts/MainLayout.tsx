import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import styles from './MainLayout.module.css';

export default function MainLayout() {
  const { user, isAuthenticated, logout } = useAuth();

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
            <a href="http://localhost:8080/swagger-ui/index.html" target="_blank" rel="noreferrer" className={styles.navLink}>
              Tài liệu OpenAPI
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
          <p>© 2026 Hệ thống Quản lý Đào tạo và Tiếp nhận Hồ sơ thi GPLX các hạng.</p>
          <p className={styles.note}>Kiến trúc: Java 21 | Spring Boot 4.1.1 | React 19 + TypeScript | MySQL 8.4 LTS</p>
        </div>
      </footer>
    </div>
  );
}
