import LicenseCategoriesPage from '../pages/LicenseCategoriesPage';
import { lazy, Suspense } from 'react';
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
import CourseDetailPage from '../pages/CourseDetailPage';
import ApplyPage from '../pages/ApplyPage';
import ApplicationStatusPage from '../pages/ApplicationStatusPage';
import CrmLeadsPage from '../pages/CrmLeadsPage';
import AdmissionDashboardPage from '../pages/AdmissionDashboardPage';
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
import RawVehicleStudentPage from '../pages/RawVehicleStudentPage';
import RawVehicleInstructorPage from '../pages/RawVehicleInstructorPage';
import RawVehicleManagerPage from '../pages/RawVehicleManagerPage';
import RoadSignsPage from '../pages/RoadSignsPage';
import ExamTipsPage from '../pages/ExamTipsPage';
import DrivingSimulationPage from '../pages/DrivingSimulationPage';
const DrivingSimulation3DPage = lazy(() => import('../pages/DrivingSimulation3DPage'));
import { TheoryAdminConfigTab } from '../features/theory/TheoryAdminConfigTab';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public Routes: Trang chủ, Khóa học, Nộp hồ sơ trực tuyến & Tra cứu hồ sơ */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/license-categories" element={<LicenseCategoriesPage />} />
          <Route path="/courses/:slug" element={<CourseDetailPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/application-status" element={<ApplicationStatusPage />} />
          <Route path="/apply/track" element={<ApplicationStatusPage />} />

          {/* Protected Routes: Học tập & Ôn thi lý thuyết */}
          <Route
            path="/theory"
            element={
              <ProtectedRoute>
                <TheoryExamPage />
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
            path="/road-signs"
            element={
              <ProtectedRoute>
                <RoadSignsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tips"
            element={
              <ProtectedRoute>
                <ExamTipsPage />
              </ProtectedRoute>
            }
          />

          <Route path="/student/driving-simulation" element={<ProtectedRoute><Suspense fallback={<p role="status" style={{ padding: 32 }}>Đang tải mô phỏng 3D…</p>}><DrivingSimulation3DPage /></Suspense></ProtectedRoute>} />
          <Route path="/student/driving-simulation/2d" element={<ProtectedRoute><DrivingSimulationPage /></ProtectedRoute>} />

          {/* Module Đào tạo Xe Thô (Raw Vehicle Training) */}
          <Route
            path="/student/raw-vehicle"
            element={
              <ProtectedRoute>
                <RawVehicleStudentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/raw_vehicle"
            element={
              <ProtectedRoute>
                <RawVehicleStudentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/raw vehicle"
            element={
              <ProtectedRoute>
                <RawVehicleStudentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/raw-vehicle"
            element={
              <ProtectedRoute>
                <RawVehicleInstructorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/training/raw-vehicle"
            element={
              <ProtectedRoute>
                <RawVehicleManagerPage />
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
            path="/submit-application"
            element={
              <ProtectedRoute>
                <SubmitApplicationPage />
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

          {/* Phân hệ Tuyển sinh, CRM Leads & Dashboard dành cho Cán bộ / Tư vấn / Quản trị viên */}
          <Route
            path="/admin/admissions"
            element={
              <ProtectedRoute>
                <ApplicationManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/admissions/applications"
            element={
              <ProtectedRoute>
                <ApplicationManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/admissions/leads"
            element={
              <ProtectedRoute>
                <CrmLeadsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/admissions/dashboard"
            element={
              <ProtectedRoute>
                <AdmissionDashboardPage />
              </ProtectedRoute>
            }
          />

          <Route path="/admin/theory" element={<ProtectedRoute><div style={{ maxWidth: 1280, margin: '0 auto', padding: 24 }}><h1>Ngân hàng câu hỏi & cấu hình đề</h1><TheoryAdminConfigTab /></div></ProtectedRoute>} />

          {/* Sát hạch & Giám khảo */}
          <Route
            path="/examination/grading"
            element={
              <ProtectedRoute>
                <ExamGradingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/audit-logs"
            element={
              <ProtectedRoute>
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
