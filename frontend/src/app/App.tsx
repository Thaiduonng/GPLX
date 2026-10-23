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
import CoursesPage from '../pages/CoursesPage';
import TheoryExamPage from '../pages/TheoryExamPage';
import TrainingSchedulePage from '../pages/TrainingSchedulePage';
import { EligibilityCheckPage } from '../pages/EligibilityCheckPage';
import { ExamSessionsPage } from '../pages/ExamSessionsPage';
import { ExamGradingPage } from '../pages/ExamGradingPage';
import { MyExamResultsPage } from '../pages/MyExamResultsPage';
import { TuitionPaymentPage } from '../pages/TuitionPaymentPage';
import { FleetManagementPage } from '../pages/FleetManagementPage';

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
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/theory-exam" element={<TheoryExamPage />} />
          <Route path="/training/schedules" element={<TrainingSchedulePage />} />
          <Route path="/examination/eligibility" element={<EligibilityCheckPage />} />
          <Route path="/examination/sessions" element={<ExamSessionsPage />} />
          <Route path="/examination/grading" element={<ExamGradingPage />} />
          <Route path="/examination/my-results" element={<MyExamResultsPage />} />
          <Route path="/finance/tuition" element={<TuitionPaymentPage />} />
          <Route path="/fleet" element={<FleetManagementPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
