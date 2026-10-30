import { useState, useMemo } from 'react';
import { ROAD_SIGNS_DATA, ROAD_SIGN_CATEGORIES, RoadSign } from '../data/roadSignsData';
import { RoadSignVisual } from '../components/road-signs/RoadSignVisual';
import { Icons } from '../components/ui';
import styles from './RoadSignsPage.module.css';

export default function RoadSignsPage() {
  const [selectedCat, setSelectedCat] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSign, setActiveSign] = useState<RoadSign | null>(null);

  const filteredSigns = useMemo(() => {
    return ROAD_SIGNS_DATA.filter((sign) => {
      const matchCat = selectedCat === 'ALL' || sign.category === selectedCat;
      const matchSearch =
        sign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sign.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sign.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCat, searchQuery]);

  return (
    <div className={styles.container}>
      {/* Header giới thiệu */}
      <div className={styles.headerSection}>
        <div className={styles.badge}>
          <Icons.ShieldCheck size={16} />
          <span>QUY CHUẨN KỸ THUẬT QUỐC GIA QCVN 41:2019/BGTVT</span>
        </div>
        <h1 className={styles.title}>Hệ Thống Biển Báo Giao Thông Đường Bộ</h1>
        <p className={styles.subtitle}>
          Tra cứu đầy đủ hình ảnh, mã số và ý nghĩa quy chuẩn của 5 nhóm biển báo đường bộ Việt Nam. Hỗ trợ học viên ghi nhớ nhanh để trả lời chính xác 185 câu hỏi phần biển báo sát hạch GPLX.
        </p>
      </div>

      {/* Thanh tìm kiếm & bộ lọc nhóm */}
      <div className={styles.controlsSection}>
        <div className={styles.searchBarWrapper}>
          <span className={styles.searchIcon}>
            <Icons.BookOpen size={18} />
          </span>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Tìm kiếm biển báo theo mã (P.102, W.208...) hoặc tên biển báo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.categoryTabs}>
          {ROAD_SIGN_CATEGORIES.map((cat) => {
            const count =
              cat.id === 'ALL'
                ? ROAD_SIGNS_DATA.length
                : ROAD_SIGNS_DATA.filter((s) => s.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                className={`${styles.tabBtn} ${selectedCat === cat.id ? styles.tabBtnActive : ''}`}
                onClick={() => setSelectedCat(cat.id)}
              >
                <span>{cat.name}</span>
                <span style={{ fontSize: '0.78rem', opacity: 0.85 }}>({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lưới danh sách biển báo */}
      {filteredSigns.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-muted-foreground)' }}>
          <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>Không tìm thấy biển báo nào phù hợp với từ khóa "{searchQuery}"</p>
          <button
            type="button"
            className={styles.tabBtn}
            onClick={() => {
              setSelectedCat('ALL');
              setSearchQuery('');
            }}
            style={{ marginTop: '1rem' }}
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className={styles.signsGrid}>
          {filteredSigns.map((sign) => (
            <div
              key={sign.id}
              className={styles.signCard}
              onClick={() => setActiveSign(sign)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActiveSign(sign);
                }
              }}
            >
              <div className={styles.signVisualBox}>
                <RoadSignVisual svgType={sign.svgType} size={84} />
              </div>
              <span className={styles.signCodeBadge}>{sign.code}</span>
              <h3 className={styles.signName}>{sign.name}</h3>
              <p className={styles.signDesc}>{sign.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modal chi tiết biển báo */}
      {activeSign && (
        <div className={styles.modalBackdrop} onClick={() => setActiveSign(null)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={() => setActiveSign(null)}
              aria-label="Đóng"
            >
              ✕
            </button>

            <span className={styles.modalCode}>{activeSign.code} — {activeSign.categoryName}</span>
            <div className={styles.modalVisualBox}>
              <RoadSignVisual svgType={activeSign.svgType} size={130} />
            </div>

            <h2 className={styles.modalTitle}>{activeSign.name}</h2>

            <div className={styles.modalDescBox}>
              <div style={{ fontWeight: 700, marginBottom: '6px', color: '#2563eb' }}>
                Ý nghĩa & Quy tắc chấp hành:
              </div>
              <div>{activeSign.description}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
