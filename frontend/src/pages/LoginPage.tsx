import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { Icons } from '../components/ui';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameOrEmail.trim() || !password.trim()) {
      setErrorMessage('Vui lòng nhập đầy đủ tên đăng nhập/email và mật khẩu.');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      await login({ usernameOrEmail, password });
      navigate('/');
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setErrorMessage(axiosErr.response?.data?.message || 'Tên đăng nhập hoặc mật khẩu không chính xác.');
      } else {
        setErrorMessage('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <Icons.ShieldCheck size={32} />
          </div>
          <h2>Đăng nhập Hệ thống</h2>
          <p>Nhập thông tin tài khoản để truy cập hệ thống đào tạo GPLX</p>
        </div>

        {errorMessage && (
          <div className={styles.errorAlert} role="alert">
            <span className={styles.errorIcon}>!</span>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="usernameOrEmail">Tên đăng nhập hoặc Email</label>
            <input
              id="usernameOrEmail"
              type="text"
              placeholder="VD: nguyenvana hoặc email@example.com"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              disabled={loading}
              required
              autoComplete="username"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Đang xác thực...' : 'Đăng nhập'}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Chưa có tài khoản?{' '}
            <Link to="/register" className={styles.link}>
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
