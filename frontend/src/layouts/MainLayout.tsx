import { Outlet, Link } from 'react-router-dom';
import styles from './MainLayout.module.css';

export default function MainLayout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.brand}>
            <span className={styles.icon}>🚗</span>
            <div>
              <h1 className={styles.title}>HỆ THỐNG ĐÀO TẠO & SÁT HẠCH GPLX</h1>
              <p className={styles.subtitle}>Đồ án tốt nghiệp — Modular Monolith</p>
            </div>
          </div>
          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>Trang chủ</Link>
            <a href="http://localhost:8080/swagger-ui/index.html" target="_blank" rel="noreferrer" className={styles.navLink}>
              Tài liệu OpenAPI
            </a>
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
