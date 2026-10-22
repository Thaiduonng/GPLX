import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h2 style={{ fontSize: '3rem', color: '#1e3a8a', fontWeight: 800 }}>404</h2>
      <h3 style={{ fontSize: '1.4rem', color: '#374151', margin: '0.5rem 0 1rem' }}>Không tìm thấy trang yêu cầu</h3>
      <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
        Đường dẫn bạn truy cập không tồn tại hoặc đã được thay đổi.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          backgroundColor: '#2563eb',
          color: 'white',
          padding: '0.6rem 1.25rem',
          borderRadius: '6px',
          fontWeight: 500,
        }}
      >
        ← Quay lại Trang chủ
      </Link>
    </div>
  );
}
