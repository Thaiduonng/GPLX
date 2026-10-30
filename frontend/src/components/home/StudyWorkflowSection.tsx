import React from 'react';
import { Icons } from '../ui';
import styles from './StudyWorkflowSection.module.css';

interface StepItem {
  step: string;
  title: string;
  desc: string;
  icon: keyof typeof Icons;
  highlight: string;
}

const STEPS: StepItem[] = [
  {
    step: '01',
    title: 'Tiếp nhận hồ sơ & Khám sức khỏe',
    desc: 'Đăng ký hồ sơ online, đồng bộ giấy khám sức khỏe điện tử liên thông từ cổng Dịch vụ công Quốc gia.',
    icon: 'FileText',
    highlight: 'Hồ sơ số hóa 100%',
  },
  {
    step: '02',
    title: 'Học lý thuyết & Thi thử 20 bộ đề',
    desc: 'Học trọn bộ 600 câu hỏi, làm quen với 60 câu điểm liệt và thi thử các bộ đề có cấu trúc chuẩn của Cục CSGT.',
    icon: 'BookOpen',
    highlight: 'Chống trượt lý thuyết',
  },
  {
    step: '03',
    title: 'Thực hành Cabin & Giám sát DAT',
    desc: 'Tập lái trên cabin mô phỏng 3D và chạy thực tế trên đường với thiết bị giám sát hành trình DAT đủ số km quy định.',
    icon: 'Car',
    highlight: 'Đủ 810km (Hạng B)',
  },
  {
    step: '04',
    title: 'Sát hạch CSGT & Cấp bằng GPLX',
    desc: 'Dự thi 4 phần: Lý thuyết trắc nghiệm, Mô phỏng tình huống, Sa hình 11 bài và Đường trường thực tế để nhận bằng.',
    icon: 'Trophy',
    highlight: 'Đạt chuẩn quốc gia',
  },
];

export const StudyWorkflowSection: React.FC = () => {
  return (
    <section className={styles.workflowSection} aria-label="Quy trình đào tạo và sát hạch lái xe">
      <div className={styles.sectionHeader}>
        <div className={styles.badge}>
          <Icons.ShieldCheck size={14} />
          <span>Lộ trình đào tạo chuẩn mực</span>
        </div>
        <h2 className={styles.sectionTitle}>Quy trình 4 bước từ đăng ký đến nhận bằng</h2>
        <p className={styles.sectionSubtitle}>
          Tuân thủ nghiêm ngặt Luật Trật tự an toàn giao thông đường bộ 2024 và Thông tư của Bộ Giao thông Vận tải & Bộ Công an.
        </p>
      </div>

      <div className={styles.stepsContainer}>
        {STEPS.map((item, idx) => {
          const IconComp = Icons[item.icon] || Icons.CheckCircle;
          return (
            <div key={item.step} className={styles.stepCard}>
              <div className={styles.stepBadgeRow}>
                <span className={styles.stepNumber}>{item.step}</span>
                <span className={styles.highlightPill}>{item.highlight}</span>
              </div>

              <div className={styles.stepIconWrapper}>
                <IconComp size={24} />
              </div>

              <h3 className={styles.stepTitle}>{item.title}</h3>
              <p className={styles.stepDesc}>{item.desc}</p>

              {idx < STEPS.length - 1 && (
                <div className={styles.stepConnector}>
                  <Icons.ArrowRight size={18} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
