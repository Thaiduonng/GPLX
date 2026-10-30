import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { canAccessPath } from '../navigation/navigation';
import { Link } from 'react-router-dom';
import { LoadingSpinner } from '../../components/ui';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <LoadingSpinner size="md" text="Đang xác thực quyền truy cập..." />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Registered module policy applies to every route, including legacy aliases.
  if (!canAccessPath(location.pathname, user.roles)) {
    return <section style={{ padding: '3rem', textAlign: 'center' }} role="alert">
      <h1>Bạn không có quyền truy cập chức năng này</h1>
      <p>Hãy chọn chức năng phù hợp trong Danh mục chức năng hoặc liên hệ quản trị viên.</p>
      <Link to="/">Về trang chủ</Link>
    </section>;
  }

  return children;
};
