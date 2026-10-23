import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import styles from './LoginPage.module.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('ROLE_STUDENT');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Mật khẩu xác nhận không khớp.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Mật khẩu phải có tối thiểu 6 ký tự.');
      return;
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      await register({
        username,
        email,
        fullName,
        phone: phone.trim() ? phone : undefined,
        password,
        role,
      });
      navigate('/');
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setErrorMessage(axiosErr.response?.data?.message || 'Đăng ký tài khoản thất bại.');
      } else {
        setErrorMessage('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card} style={{ maxWidth: '520px' }}>
        <div className={styles.header}>
          <div className={styles.icon}>📝</div>
          <h2>Đăng ký Tài khoản Mới</h2>
          <p>Tạo tài khoản học viên để tham gia đào tạo và nộp hồ sơ GPLX</p>
        </div>

        {errorMessage && (
          <div className={styles.errorAlert}>
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="fullName">Họ và tên *</label>
            <input
              id="fullName"
              type="text"
              placeholder="VD: Nguyễn Văn An"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="username">Tên đăng nhập *</label>
            <input
              id="username"
              type="text"
              placeholder="VD: nguyenvanan"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Địa chỉ Email *</label>
            <input
              id="email"
              type="email"
              placeholder="VD: an.nguyen@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Số điện thoại liên hệ</label>
            <input
              id="phone"
              type="tel"
              placeholder="VD: 0912345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="role">Vai trò đăng ký</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              disabled={loading}
            >
              <option value="ROLE_STUDENT">Học viên lái xe</option>
              <option value="ROLE_INSTRUCTOR">Giáo viên giảng dạy</option>
              <option value="ROLE_COUNSELOR">Tư vấn viên</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Mật khẩu *</label>
            <input
              id="password"
              type="password"
              placeholder="Tối thiểu 6 ký tự"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Xác nhận mật khẩu *</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Đang tạo tài khoản...' : 'Hoàn tất Đăng ký'}
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Đã có tài khoản?{' '}
            <Link to="/login" className={styles.link}>
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
