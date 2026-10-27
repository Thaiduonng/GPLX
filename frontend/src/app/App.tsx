import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../features/auth/AuthContext';
import { ProtectedRoute } from '../features/auth/ProtectedRoute';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import NotFoundPage from '../pages/NotFoundPage';
import SubmitApplicationPage from '../pages/SubmitApplicationPage';
import MyApplicationsPage from '../pages/MyApplicationsPage';
import ApplicationManagementPage from '../pages/ApplicationManagementPage';
import CoursesPage from '../pages/CoursesPage';
import TheoryExamPage from '../pages/TheoryExamPage';
import TheoryReviewPage from '../pages/TheoryReviewPage';
import TrainingSchedulePage from '../pages/TrainingSchedulePage';
import { EligibilityCheckPage } from '../pages/EligibilityCheckPage';
import { ExamSessionsPage } from '../pages/ExamSessionsPage';
import { ExamGradingPage } from '../pages/ExamGradingPage';
import { MyExamResultsPage } from '../pages/MyExamResultsPage';
import { TuitionPaymentPage } from '../pages/TuitionPaymentPage';
import { FleetManagementPage } from '../pages/FleetManagementPage';
import { DashboardPage } from '../pages/DashboardPage';
import { AuditLogPage } from '../pages/AuditLogPage';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public Routes: Trang chủ quảng cáo & Đăng nhập / Đăng ký */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes: Chỉ khi đăng nhập mới được truy cập các phân hệ module */}
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <CoursesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/theory-exam"
            element={
              <ProtectedRoute>
                <TheoryExamPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/theory-review"
            element={
              <ProtectedRoute>
                <TheoryReviewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/review"
            element={
              <ProtectedRoute>
                <TheoryReviewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training/schedules"
            element={
              <ProtectedRoute>
                <TrainingSchedulePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fleet"
            element={
              <ProtectedRoute>
                <FleetManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admissions/new"
            element={
              <ProtectedRoute>
                <SubmitApplicationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-applications"
            element={
              <ProtectedRoute>
                <MyApplicationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/finance/tuition"
            element={
              <ProtectedRoute>
                <TuitionPaymentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/examination/eligibility"
            element={
              <ProtectedRoute>
                <EligibilityCheckPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/examination/sessions"
            element={
              <ProtectedRoute>
                <ExamSessionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/examination/my-results"
            element={
              <ProtectedRoute>
                <MyExamResultsPage />
              </ProtectedRoute>
            }
          />

          {/* Phân hệ dành riêng cho Tuyển sinh / Giám khảo / Quản trị viên */}
          <Route
            path="/admin/admissions"
            element={
              <ProtectedRoute requiredRoles={['ROLE_ADMIN', 'ROLE_STAFF', 'ROLE_MANAGER']}>
                <ApplicationManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/examination/grading"
            element={
              <ProtectedRoute requiredRoles={['ROLE_ADMIN', 'ROLE_EXAMINER', 'ROLE_MANAGER']}>
                <ExamGradingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRoles={['ROLE_ADMIN', 'ROLE_MANAGER']}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/audit-logs"
            element={
              <ProtectedRoute requiredRoles={['ROLE_ADMIN', 'ROLE_MANAGER']}>
                <AuditLogPage />
              </ProtectedRoute>
            }
          />

          {/* Trang 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
