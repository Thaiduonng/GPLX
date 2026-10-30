import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../ui';
import styles from './Footer.module.css';
import { useAuth } from '../../features/auth/AuthContext';
import { getNavigationGroups } from '../../features/navigation/navigation';

export const Footer: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const groups = getNavigationGroups(isAuthenticated ? user?.roles ?? [] : []);
  const learning = groups.find(group => group.id === 'learning');
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        {/* Top Grid */}
        <div className={styles.footerGrid}>
          {/* Brand Col */}
          <div className={styles.brandCol}>
            <div className={styles.brandTitleRow}>
              <div className={styles.brandLogo}>600</div>
              <span className={styles.brandTitle}>Hệ Thống Ôn Thi GPLX Quốc Gia</span>
            </div>
            <p className={styles.brandDesc}>
              Nền tảng đào tạo, học trực tuyến và tiếp nhận hồ sơ thi sát hạch cấp Giấy phép lái xe các hạng.
              Đồng bộ dữ liệu chuẩn ngân hàng 600 câu hỏi sát hạch theo Công văn 2262/CSGT-P5 Cục Cảnh sát giao thông.
            </p>
            <div className={styles.legalBadge}>
              <Icons.ShieldCheck size={16} />
              <span>Chuẩn hóa Cục Cảnh sát giao thông & Bộ Công an</span>
            </div>
          </div>

          {/* Các đường dẫn học tập chỉ hiện khi đúng vai trò. */}
          {learning && <div className={styles.linkCol}><h4 className={styles.colHeading}>{learning.label}</h4><ul className={styles.linkList}>{learning.items.map(item => <li key={item.path}><Link to={item.path}>{item.label}</Link></li>)}</ul></div>}
          <div className={styles.linkCol}><h4 className={styles.colHeading}>Thông tin & đăng ký</h4><ul className={styles.linkList}>
            {groups.find(group => group.id === 'public')?.items.map(item => <li key={item.path}><Link to={item.path}>{item.label}</Link></li>)}
          </ul></div>

          {/* Support & Contact */}
          <div className={styles.linkCol}>
            <h4 className={styles.colHeading}>Hỗ trợ học viên</h4>
            <ul className={styles.linkList}>
              <li>
                <Link to="/application-status">Tra cứu hồ sơ</Link>
              </li>
              {groups.flatMap(group => group.items).filter(item => item.path === '/training/schedules').map(item => <li key={item.path}><Link to={item.path}>{item.label}</Link></li>)}
              <li>
                <a href="#faq">Câu hỏi thường gặp (FAQ)</a>
              </li>
              <li>
                <span className={styles.hotlineText}>Hotline hỗ trợ: 1900 6868</span>
              </li>
              <li>
                <span className={styles.contactEmail}>support@gplx.gov.vn</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>
            © {new Date().getFullYear()} Hệ thống Ôn Thi & Đào Tạo Giấy Phép Lái Xe. Bảo lưu mọi quyền.
          </div>
          <div className={styles.disclaimer}>
            Hệ thống tuân thủ Luật Trật tự, an toàn giao thông đường bộ 2024 và Thông tư hướng dẫn đào tạo lái xe.
          </div>
        </div>
      </div>
    </footer>
  );
};
