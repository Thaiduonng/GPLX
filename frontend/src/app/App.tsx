import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../features/auth/AuthContext';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';
import SubmitApplicationPage from '../pages/SubmitApplicationPage';
import MyApplicationsPage from '../pages/MyApplicationsPage';
import ApplicationManagementPage from '../pages/ApplicationManagementPage';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admissions/new" element={<SubmitApplicationPage />} />
          <Route path="/my-applications" element={<MyApplicationsPage />} />
          <Route path="/admin/admissions" element={<ApplicationManagementPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
