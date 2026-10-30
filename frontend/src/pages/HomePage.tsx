import { useState } from 'react';
import { useAuth } from '../features/auth/AuthContext';
import { HeroSection } from '../components/home/HeroSection';
import { ConfigCapsuleBar } from '../components/home/ConfigCapsuleBar';
import { LearningRoadmapCard } from '../components/home/LearningRoadmapCard';
import { MockExamCard } from '../components/home/MockExamCard';
import { AdmissionPromoSection } from '../components/home/AdmissionPromoSection';
import { EdTechToolsSection } from '../components/home/EdTechToolsSection';
import { StudyWorkflowSection } from '../components/home/StudyWorkflowSection';
import { FAQSection } from '../components/home/FAQSection';
import { DEFAULT_CATEGORY, getCategoryConfig, type CategoryConfig } from '../components/home/categoryConfig';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const [selectedCat, setSelectedCat] = useState<string>(DEFAULT_CATEGORY);

  const currentConfig: CategoryConfig = getCategoryConfig(selectedCat);

  return (
    <div className={styles.homeContainer}>
      {/* Ambient Radial Lights (Glassmorphic Background Effects) */}
      <div className={styles.ambientGlowTopLeft} />
      <div className={styles.ambientGlowTopRight} />

      {/* 1. HERO HEADER: CSGT Ribbon & Title & Subtitle */}
      <HeroSection />

      {/* 2. CAPSULE STATS BAR: License Category Selector & 4 Key Exam Metrics */}
      <ConfigCapsuleBar
        selectedCategory={selectedCat}
        onSelectCategory={setSelectedCat}
      />

      {/* 3. MAIN DASHBOARD CONTENT GRID (62% Left Learning Roadmap / 38% Right Mock Exam) */}
      <section className={styles.mainGridSection} aria-label="Bảng điều khiển học tập">
        <div className={styles.mainGrid}>
          {/* Left Column (62%): Learning Roadmap Pathway */}
          <div className={styles.leftColumn}>
            <LearningRoadmapCard config={currentConfig} />
          </div>

          {/* Right Column (38%): Online Mock Exam Simulator Card */}
          <div className={styles.rightColumn}>
            <MockExamCard
              config={currentConfig}
              isAuthenticated={isAuthenticated}
            />
          </div>
        </div>
      </section>

      {/* 4. ADMISSION & ELECTRONIC DOSSIER PROMOTION (Quảng cáo & Tiếp nhận hồ sơ điện tử học viên) */}
      <AdmissionPromoSection isAuthenticated={isAuthenticated} />

      {/* 5. 6 EDTECH TOOLS SECTION: 6 Chương, 20 Đề, 60 Điểm liệt, Câu hay sai, Biển báo, Mẹo thi */}
      <EdTechToolsSection />

      {/* 6. 4-STEP TRAINING WORKFLOW: Từ tiếp nhận hồ sơ đến nhận bằng */}
      <StudyWorkflowSection />

      {/* 7. FAQ SECTION: Giải đáp thắc mắc sát hạch lái xe */}
      <FAQSection />
    </div>
  );
}
