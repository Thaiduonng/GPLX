import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../ui';
import styles from './EdTechToolsSection.module.css';

interface ToolItem {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  tag: string;
  path: string;
  icon: keyof typeof Icons;
  colorTheme: 'blue' | 'purple' | 'amber' | 'emerald' | 'rose' | 'indigo';
}

const TOOLS_DATA: ToolItem[] = [
  {
    id: 'chapters',
    title: 'Học theo 6 chương',
    subtitle: 'Ngân hàng 600 câu chuẩn',
    desc: 'Học tuần tự 6 chương: Quy tắc giao thông, Nghiệp vụ vận tải, Văn hóa đạo đức, Kỹ thuật lái xe, Cấu tạo sửa chữa và Biển báo thế sa hình.',
    tag: '600 Câu hỏi',
    path: '/theory',
    icon: 'BookOpen',
    colorTheme: 'blue',
  },
  {
    id: 'mock20',
    title: 'Thi thử 20 bộ đề',
    subtitle: 'Cấu trúc đề ngẫu nhiên',
    desc: 'Hệ thống 20 bộ đề thi thử được phân bổ chuẩn xác ma trận đề của Cục CSGT với đồng hồ đếm ngược và chấm điểm tự động tức thì.',
    tag: '20 Đề mẫu',
    path: '/student/review',
    icon: 'GraduationCap',
    colorTheme: 'purple',
  },
  {
    id: 'paralysis',
    title: '60 Câu điểm liệt',
    subtitle: 'Chống trượt ngay lập tức',
    desc: 'Tuyển tập 60 tình huống mất an toàn giao thông nghiêm trọng. Sai 1 câu là bị truất quyền sát hạch. Phải luyện tập thật thuần thục.',
    tag: 'Tối quan trọng',
    path: '/student/review',
    icon: 'AlertTriangle',
    colorTheme: 'rose',
  },
  {
    id: 'traps',
    title: 'Ôn câu hay sai & bẫy đề',
    subtitle: 'Phòng tránh lỗi mất điểm',
    desc: 'Tổng hợp 50 câu hỏi học viên thường nhầm lẫn nhất (vận tốc khu đông dân cư, cự ly phanh an toàn, niên hạn xe tải và quyền ưu tiên xe).',
    tag: 'Bí kíp đậu 100%',
    path: '/student/review',
    icon: 'Zap',
    colorTheme: 'amber',
  },
  {
    id: 'road-signs',
    title: 'Biển báo giao thông',
    subtitle: 'Quy chuẩn QCVN 41:2019',
    desc: 'Đầy đủ 5 nhóm biển báo đường bộ: Biển cấm, Biển nguy hiểm, Biển hiệu lệnh, Biển chỉ dẫn và Biển phụ kèm hình vẽ vector sắc nét.',
    tag: 'Đồ họa SVG',
    path: '/road-signs',
    icon: 'ShieldCheck',
    colorTheme: 'emerald',
  },
  {
    id: 'tips',
    title: 'Mẹo thi sát hạch',
    subtitle: 'Kinh nghiệm vàng sa hình & lý thuyết',
    desc: 'Mẹo nhớ nhanh đáp án từ khóa vàng, các bước vượt 11 bài thi sa hình (dốc cầu B2, vệt bánh xe, ghép ngang) và mẹo đường trường thực tế.',
    tag: 'Kinh nghiệm thực tế',
    path: '/tips',
    icon: 'Lightbulb',
    colorTheme: 'indigo',
  },
];

export const EdTechToolsSection: React.FC = () => {
  return (
    <section className={styles.sectionWrapper} aria-label="Bộ công cụ ôn luyện GPLX">
      <div className={styles.sectionHeader}>
        <div className={styles.badge}>
          <Icons.Layers size={14} />
          <span>Hệ thống học tập thông minh</span>
        </div>
        <h2 className={styles.sectionTitle}>Bộ công cụ toàn diện giúp bạn đậu ngay lần đầu</h2>
        <p className={styles.sectionSubtitle}>
          Được thiết kế dựa trên phương pháp học ngắt quãng (Spaced Repetition) và mô phỏng sát hạch thực tế.
        </p>
      </div>

      <div className={styles.gridContainer}>
        {TOOLS_DATA.map((tool) => {
          const IconComp = Icons[tool.icon] || Icons.BookOpen;
          return (
            <Link
              key={tool.id}
              to={tool.path}
              className={`${styles.toolCard} ${styles[`theme_${tool.colorTheme}`]}`}
            >
              <div className={styles.cardTopRow}>
                <div className={styles.toolIcon}>
                  <IconComp size={24} />
                </div>
                <span className={styles.toolTag}>{tool.tag}</span>
              </div>

              <div className={styles.cardBody}>
                <span className={styles.toolSubtitle}>{tool.subtitle}</span>
                <h3 className={styles.toolTitle}>{tool.title}</h3>
                <p className={styles.toolDesc}>{tool.desc}</p>
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.actionText}>Bắt đầu luyện tập</span>
                <span className={styles.actionArrow}>
                  <Icons.ArrowRight size={16} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
