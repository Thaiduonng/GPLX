const fs = require('fs');
const path = require('path');

// 1. CẬP NHẬT CSS CHO HEADER & THEME MỚI TRONG MainLayout.module.css
const cssFile = path.join(__dirname, '..', 'frontend', 'src', 'layouts', 'MainLayout.module.css');
let cssContent = fs.readFileSync(cssFile, 'utf8');

const extraLayoutCss = `

/* ==============================================================================
   HEADER THEO THIẾT KẾ MẪU ÔN THI GPLX 2026 (LIGHT & DARK THEME)
   ============================================================================== */
.headerLightDark {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  color: #0f172a;
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  transition: all 0.2s ease;
}

:global([data-theme='dark']) .headerLightDark {
  background: rgba(11, 15, 25, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: #f8fafc;
}

.brandLogoCircle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: conic-gradient(from 0deg, #ea4335, #fbbc05, #34a853, #4285f4, #ea4335);
  padding: 3px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
}

.brandLogoInner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 0.65rem;
  color: #1e40af;
  text-align: center;
  line-height: 1;
}

:global([data-theme='dark']) .brandLogoInner {
  background: #0f172a;
  color: #60a5fa;
}

.brandNameText {
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-text-main);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 5px;
}

.brandNameHighlight {
  color: #2563eb;
}

:global([data-theme='dark']) .brandNameHighlight {
  color: #38bdf8;
}

/* Nav links pill style */
.centerNavPills {
  display: flex;
  align-items: center;
  gap: 6px;
  overflow-x: auto;
}

.navPillItem {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0.45rem 0.9rem;
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-muted-foreground);
  text-decoration: none;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.navPillItem:hover {
  color: var(--color-text-main);
  background: rgba(0, 0, 0, 0.04);
}

:global([data-theme='dark']) .navPillItem:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
}

.navPillActive {
  background: #e0f2fe !important;
  color: #0284c7 !important;
  font-weight: 700;
}

:global([data-theme='dark']) .navPillActive {
  background: rgba(37, 99, 235, 0.25) !important;
  color: #38bdf8 !important;
}

/* Social and theme toggle */
.socialIconBtn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.15s ease;
  flex-shrink: 0;
}

.socialIconBtn:hover {
  transform: scale(1.08);
}

.fbIcon {
  background: #1877f2;
  color: #ffffff;
}

.tiktokIcon {
  background: #000000;
  color: #ffffff;
}

:global([data-theme='dark']) .tiktokIcon {
  background: #27272a;
}

.themeToggleBtn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-main);
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.15s ease;
}

.themeToggleBtn:hover {
  background: var(--color-surface-hover);
  border-color: var(--color-primary);
}

.loginTextLink {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--color-text-main);
  text-decoration: none;
  padding: 0.45rem 0.75rem;
  border-radius: var(--radius-md);
  transition: color 0.15s ease;
}

.loginTextLink:hover {
  color: var(--color-primary);
}

.registerPillBtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-full);
  background: #2563eb;
  color: #ffffff;
  font-weight: 700;
  font-size: 0.92rem;
  text-decoration: none;
  border: none;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.35);
  transition: all 0.15s ease;
}

.registerPillBtn:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.45);
}
`;

if (!cssContent.includes('.headerLightDark')) {
    cssContent += extraLayoutCss;
    fs.writeFileSync(cssFile, cssContent, 'utf8');
    console.log('Appended extraLayoutCss to MainLayout.module.css');
}

// 2. CẬP NHẬT MainLayout.tsx
const layoutFile = path.join(__dirname, '..', 'frontend', 'src', 'layouts', 'MainLayout.tsx');
let layoutContent = fs.readFileSync(layoutFile, 'utf8');

// Add theme state & useEffect
const themeStateCode = `export default function MainLayout() {
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
  };`;

layoutContent = layoutContent.replace(
    /export default function MainLayout\(\) \{[\s\S]*?const \[leftDrawerOpen, setLeftDrawerOpen\] = useState\(false\);/,
    themeStateCode
);

// Replace Header markup
const oldHeaderRegex = /<header className=\{styles\.header\}>[\s\S]*?<\/header>/;
const newHeaderMarkup = `<header className={styles.headerLightDark}>
        <div className={styles.headerContainer}>
          {/* GÓC TRÁI: Menu Toggle & Logo Ôn Thi GPLX */}
          <div className={styles.leftSection}>
            {/* Nút bật/mở Thanh Menu Drawer hệ thống */}
            {isAuthenticated && (
              <button
                type="button"
                className={styles.menuToggleButton}
                onClick={() => setLeftDrawerOpen(!leftDrawerOpen)}
                aria-label={leftDrawerOpen ? 'Đóng menu' : 'Mở thanh menu hệ thống'}
                aria-expanded={leftDrawerOpen}
                title="Mở menu danh mục phân hệ"
                style={{ color: 'var(--color-text-main)', borderColor: 'var(--color-border)', background: 'transparent' }}
              >
                <Icons.Menu size={20} />
                <span className={styles.menuToggleLabel}>Danh mục</span>
              </button>
            )}

            {/* Logo Thương Hiệu Ôn Thi GPLX (Theo ảnh mẫu) */}
            <Link to="/" className={styles.brand} aria-label="Trang chủ Hệ thống GPLX" style={{ gap: '10px' }}>
              <div className={styles.brandLogoCircle}>
                <div className={styles.brandLogoInner}>
                  <span>600</span>
                </div>
              </div>
              <div className={styles.brandText}>
                <div className={styles.brandNameText}>
                  Ôn Thi <span className={styles.brandNameHighlight}>GPLX</span>
                </div>
              </div>
            </Link>

            {/* Menu giữa dạng Pill (Trang chủ, Mục tiêu, Lý thuyết, 20 Bộ đề, Xe thô, Lịch học, Hồ sơ) */}
            <nav className={styles.centerNavPills} aria-label="Điều hướng chính">
              <Link
                to="/"
                className={\`\${styles.navPillItem} \${location.pathname === '/' ? styles.navPillActive : ''}\`}
              >
                Trang chủ
              </Link>

              {/* Các phân hệ hiển thị khi đã đăng nhập */}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/theory"
                    className={\`\${styles.navPillItem} \${isActive('/theory') || isActive('/theory-exam') ? styles.navPillActive : ''}\`}
                  >
                    Lý thuyết
                  </Link>
                  <Link
                    to="/student/review"
                    className={\`\${styles.navPillItem} \${isActive('/student/review') || isActive('/theory-review') ? styles.navPillActive : ''}\`}
                  >
                    Ôn tập & 20 Đề
                  </Link>
                  <Link
                    to="/student/raw-vehicle"
                    className={\`\${styles.navPillItem} \${isActive('/student/raw-vehicle') ? styles.navPillActive : ''}\`}
                  >
                    Đào tạo xe thô
                  </Link>
                  <Link
                    to="/training/schedules"
                    className={\`\${styles.navPillItem} \${isActive('/training/schedules') ? styles.navPillActive : ''}\`}
                  >
                    Lịch học & DAT
                  </Link>
                  <Link
                    to="/my-applications"
                    className={\`\${styles.navPillItem} \${isActive('/my-applications') ? styles.navPillActive : ''}\`}
                  >
                    Hồ sơ & Học phí
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/theory"
                    className={\`\${styles.navPillItem} \${isActive('/theory') ? styles.navPillActive : ''}\`}
                  >
                    Ngân hàng 600 câu
                  </Link>
                  <Link
                    to="/courses"
                    className={\`\${styles.navPillItem} \${isActive('/courses') ? styles.navPillActive : ''}\`}
                  >
                    Khóa đào tạo
                  </Link>
                </>
              )}
            </nav>
          </div>

          {/* GÓC PHẢI: Social Icons, Theme Toggle & Nút Đăng nhập/Đăng ký */}
          <div className={styles.rightSection} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Social Icons */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className={\`\${styles.socialIconBtn} \${styles.fbIcon}\`}
              title="Facebook Cục Cảnh sát giao thông"
              aria-label="Facebook"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className={\`\${styles.socialIconBtn} \${styles.tiktokIcon}\`}
              title="Kênh TikTok hướng dẫn an toàn giao thông"
              aria-label="TikTok"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.54c0 2.11-.6 4.24-1.81 5.89-1.67 2.32-4.41 3.65-7.27 3.53-2.74-.08-5.34-1.49-6.85-3.8-1.55-2.31-1.74-5.35-.5-7.79 1.25-2.49 3.73-4.14 6.52-4.34v4.06c-1.48.07-2.91.87-3.62 2.18-.73 1.3-.64 2.97.23 4.19.85 1.21 2.34 1.88 3.82 1.69 1.48-.18 2.75-1.25 3.19-2.67.24-.76.33-1.57.32-2.37V.02z"/>
              </svg>
            </a>

            {/* Nút Toggle Light / Dark Mode */}
            <button
              type="button"
              className={styles.themeToggleBtn}
              onClick={toggleTheme}
              title={theme === 'dark' ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Auth Buttons hoặc UserAccountMenu */}
            {isAuthenticated && user ? (
              <UserAccountMenu user={user} logout={logout} />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Link to="/login" className={styles.loginTextLink}>
                  Đăng nhập
                </Link>
                <Link to="/register" className={styles.registerPillBtn}>
                  Đăng ký ngay
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>`;

layoutContent = layoutContent.replace(oldHeaderRegex, newHeaderMarkup);
fs.writeFileSync(layoutFile, layoutContent, 'utf8');
console.log('Successfully updated MainLayout.tsx with 2026 Modern Header!');
