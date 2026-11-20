import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { LoadingSpinner } from '../../components/ui';

interface ProtectedRouteProps {
  children: React.ReactElement;
  requiredRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoles }) => {
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

  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = user.roles?.some((role) => requiredRoles.includes(role));
    if (!hasRequiredRole) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};
