import { useState } from 'react';
import { Icons } from '../components/ui';
import styles from './ExamTipsPage.module.css';

export default function ExamTipsPage() {
  const [activeTab, setActiveTab] = useState<'ALL' | 'CHU' | 'SA_HINH' | 'BIEN_BAO' | 'DIEM_LIET'>('ALL');

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.headerSection}>
        <div className={styles.badge}>
          <Icons.ShieldCheck size={16} />
          <span>KHO KINH NGHIỆM ĐỖ 100% SÁT HẠCH</span>
        </div>
        <h1 className={styles.title}>Mẹo Thi Lý Thuyết GPLX 600 Câu 2026</h1>
        <p className={styles.subtitle}>
          Tổng hợp các công thức nhớ nhanh, từ khóa vàng và quy tắc 5 bước giải sa hình giúp bạn làm bài tự tin, chuẩn xác và tiết kiệm thời gian làm bài sát hạch.
        </p>
      </div>

      {/* Tabs */}
      <div className={styles.tipsTabs}>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'ALL' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('ALL')}
        >
          <Icons.Award size={18} />
          <span>Tất cả mẹo</span>
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'CHU' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('CHU')}
        >
          <Icons.FileText size={18} />
          <span>Mẹo câu hỏi chữ</span>
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'SA_HINH' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('SA_HINH')}
        >
          <Icons.Car size={18} />
          <span>Mẹo giải sa hình</span>
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'BIEN_BAO' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('BIEN_BAO')}
        >
          <Icons.AlertOctagon size={18} />
          <span>Mẹo nhớ biển báo</span>
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'DIEM_LIET' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('DIEM_LIET')}
        >
          <Icons.AlertTriangle size={18} />
          <span>60 Câu điểm liệt</span>
        </button>
      </div>

      {/* Lưới các thẻ Mẹo */}
      <div className={styles.tipsGrid}>
        {/* Mẹo 1: Từ khóa vàng */}
        {(activeTab === 'ALL' || activeTab === 'CHU') && (
          <div className={styles.tipCard}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIcon} ${styles.blueIcon}`}>
                <Icons.Check size={22} />
              </div>
              <h3 className={styles.cardTitle}>Từ Khóa Vàng — Chọn Luôn Đáp Án Đúng</h3>
            </div>
            <div className={styles.cardBody}>
              <p>Khi đọc câu hỏi, nếu thấy các phương án có chứa những cụm từ sau đây thì thường là đáp án đúng 100%:</p>
              <ul className={styles.ruleList}>
                <li className={styles.ruleItem}>
                  <span className={styles.ruleBullet}>•</span>
                  <div><span className={styles.highlightPill}>Bị nghiêm cấm</span> hoặc <span className={styles.highlightPill}>Nghiêm cấm</span></div>
                </li>
                <li className={styles.ruleItem}>
                  <span className={styles.ruleBullet}>•</span>
                  <div><span className={styles.highlightPill}>Không được phép</span> / <span className={styles.highlightPill}>Không được</span> (trừ câu hỏi về xe ưu tiên)</div>
                </li>
                <li className={styles.ruleItem}>
                  <span className={styles.ruleBullet}>•</span>
                  <div><span className={styles.highlightPill}>Cơ quan có thẩm quyền cấp phép</span></div>
                </li>
                <li className={styles.ruleItem}>
                  <span className={styles.ruleBullet}>•</span>
                  <div><span className={styles.highlightPill}>Giảm tốc độ</span>, đi về phía bên phải</div>
                </li>
                <li className={styles.ruleItem}>
                  <span className={styles.ruleBullet}>•</span>
                  <div><span className={styles.highlightPill}>Phải nhường đường</span> cho người đi bộ, xe trên đường ưu tiên</div>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Mẹo 2: 5 Bước thần thánh giải sa hình */}
        {(activeTab === 'ALL' || activeTab === 'SA_HINH') && (
          <div className={styles.tipCard}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIcon} ${styles.purpleIcon}`}>
                <Icons.Car size={22} />
              </div>
              <h3 className={styles.cardTitle}>5 Bước Vàng Giải Quyết Mọi Thế Sa Hình</h3>
            </div>
            <div className={styles.cardBody}>
              <p>Áp dụng tuần tự 5 quy tắc ưu tiên bất biến sau đây:</p>
              <ol className={styles.ruleList} style={{ listStyleType: 'decimal', paddingLeft: '1.2rem' }}>
                <li><strong>Nhất chớm:</strong> Xe nào đã chớm lọt vào giao lộ trước thì được quyền đi trước.</li>
                <li><strong>Nhì ưu:</strong> Thứ tự ưu tiên: <em>Hỏa ➔ Sự ➔ An ➔ Thương</em> (Cứu hỏa ➔ Quân sự ➔ Công an ➔ Cứu thương).</li>
                <li><strong>Tam đường:</strong> Xe trên đường ưu tiên (gặp biển hình thoi hoặc biển W.207) được đi trước xe trên đường không ưu tiên.</li>
                <li><strong>Tứ phải:</strong> Tại ngã tư cùng cấp, xe nào có <em>bên phải không vướng (trống)</em> được quyền đi trước.</li>
                <li><strong>Ngũ hướng:</strong> Rẽ phải đi trước ➔ Đi thẳng ➔ Rẽ trái đi sau cùng.</li>
              </ol>
            </div>
          </div>
        )}

        {/* Mẹo 3: Biển báo cấm nhỏ cấm lớn */}
        {(activeTab === 'ALL' || activeTab === 'BIEN_BAO') && (
          <div className={styles.tipCard}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIcon} ${styles.amberIcon}`}>
                <Icons.AlertOctagon size={22} />
              </div>
              <h3 className={styles.cardTitle}>Quy Tắc: Cấm Nhỏ Thì Cấm Lớn</h3>
            </div>
            <div className={styles.cardBody}>
              <p>Mẹo nhớ trật tự kích cỡ xe từ nhỏ đến lớn:</p>
              <div style={{ padding: '0.75rem', background: 'var(--color-surface-subtle)', borderRadius: '10px', textAlign: 'center', fontWeight: 700, color: '#2563eb', margin: '0.5rem 0' }}>
                Xe con ➔ Xe tải ➔ Máy kéo ➔ Rơ moóc
              </div>
              <ul className={styles.ruleList}>
                <li className={styles.ruleItem}>
                  <span className={styles.ruleBullet}>•</span>
                  <div><strong>Cấm nhỏ thì cấm lớn:</strong> Cấm xe con ➔ cấm luôn cả xe tải, máy kéo, rơ moóc.</div>
                </li>
                <li className={styles.ruleItem}>
                  <span className={styles.ruleBullet}>•</span>
                  <div><strong>Cấm lớn KHÔNG cấm nhỏ:</strong> Cấm xe tải ➔ xe con VẪN ĐƯỢC ĐI bình thường.</div>
                </li>
                <li className={styles.ruleItem}>
                  <span className={styles.ruleBullet}>•</span>
                  <div><strong>Cấm rẽ trái:</strong> Theo quy chuẩn QCVN 41:2019 mới nhất, biển cấm rẽ trái <em>KHÔNG cấm quay đầu xe</em>!</div>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Mẹo 4: Độ tuổi lái xe */}
        {(activeTab === 'ALL' || activeTab === 'CHU') && (
          <div className={styles.tipCard}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIcon} ${styles.greenIcon}`}>
                <Icons.GraduationCap size={22} />
              </div>
              <h3 className={styles.cardTitle}>Mẹo Nhớ Độ Tuổi Lái Xe (Cách Nhau 3 Tuổi)</h3>
            </div>
            <div className={styles.cardBody}>
              <ul className={styles.ruleList}>
                <li className={styles.ruleItem}>
                  <span className={styles.ruleBullet}>•</span>
                  <div><span className={styles.highlightPill}>16 tuổi:</span> Xe gắn máy dưới 50 cm³.</div>
                </li>
                <li className={styles.ruleItem}>
                  <span className={styles.ruleBullet}>•</span>
                  <div><span className={styles.highlightPill}>18 tuổi:</span> Hạng A1, A, B1, B, C1.</div>
                </li>
                <li className={styles.ruleItem}>
                  <span className={styles.ruleBullet}>•</span>
                  <div><span className={styles.highlightPill}>21 tuổi:</span> Hạng C, BE.</div>
                </li>
                <li className={styles.ruleItem}>
                  <span className={styles.ruleBullet}>•</span>
                  <div><span className={styles.highlightPill}>24 tuổi:</span> Hạng D1, D2, C1E, CE.</div>
                </li>
                <li className={styles.ruleItem}>
                  <span className={styles.ruleBullet}>•</span>
                  <div><span className={styles.highlightPill}>27 tuổi:</span> Hạng D, D1E, D2E, DE.</div>
                </li>
                <li className={styles.ruleItem}>
                  <span className={styles.ruleBullet}>•</span>
                  <div><strong>Tuổi tối đa lái xe trên 29 chỗ / giường nằm:</strong> Nam đủ 57 tuổi, nữ đủ 55 tuổi (Điều 59 Luật 36/2024/QH15).</div>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Mẹo 5: Tốc độ và khoảng cách */}
        {(activeTab === 'ALL' || activeTab === 'CHU') && (
          <div className={styles.tipCard}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIcon} ${styles.blueIcon}`}>
                <Icons.Zap size={22} />
              </div>
              <h3 className={styles.cardTitle}>Mẹo Tốc Độ Trong & Ngoài Khu Dân Cư</h3>
            </div>
            <div className={styles.cardBody}>
              <p><strong>Trong khu vực đông dân cư:</strong></p>
              <ul className={styles.ruleList}>
                <li className={styles.ruleItem}>
                  <span className={styles.ruleBullet}>•</span>
                  <div>Đường đôi (có dải phân cách giữa) hoặc đường 1 chiều ≥ 2 làn: <span className={styles.highlightPill}>60 km/h</span></div>
                </li>
                <li className={styles.ruleItem}>
                  <span className={styles.ruleBullet}>•</span>
                  <div>Đường 2 chiều (không có giải phân cách) hoặc 1 chiều 1 làn: <span className={styles.highlightPill}>50 km/h</span></div>
                </li>
              </ul>
              <p style={{ marginTop: '0.75rem' }}><strong>Khoảng cách an toàn theo vận tốc:</strong></p>
              <ul className={styles.ruleList}>
                <li className={styles.ruleItem}>
                  <span className={styles.ruleBullet}>•</span>
                  <div>Vận tốc đến 60 km/h: <strong>35 mét</strong></div>
                </li>
                <li className={styles.ruleItem}>
                  <span className={styles.ruleBullet}>•</span>
                  <div>Từ 60 – 80 km/h: <strong>55 mét</strong></div>
                </li>
                <li className={styles.ruleItem}>
                  <span className={styles.ruleBullet}>•</span>
                  <div>Từ 80 – 100 km/h: <strong>70 mét</strong></div>
                </li>
                <li className={styles.ruleItem}>
                  <span className={styles.ruleBullet}>•</span>
                  <div>Từ 100 – 120 km/h: <strong>100 mét</strong></div>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Mẹo 6: Cảnh báo câu điểm liệt */}
        {(activeTab === 'ALL' || activeTab === 'DIEM_LIET') && (
          <div className={styles.tipCard}>
            <div className={styles.cardHeader}>
              <div className={`${styles.cardIcon} ${styles.redIcon}`}>
                <Icons.AlertTriangle size={22} />
              </div>
              <h3 className={styles.cardTitle}>Chiến Thuật Vượt Qua 60 Câu Điểm Liệt</h3>
            </div>
            <div className={styles.cardBody}>
              <div className={styles.warningBox}>
                <Icons.AlertTriangle size={20} />
                <span>CHỈ CẦN SAI 1 CÂU ĐIỂM LIỆT LÀ TRƯỢT NGAY LẬP TỨC!</span>
              </div>
              <p style={{ marginTop: '0.75rem' }}>Các nội dung luôn luôn là câu điểm liệt:</p>
              <ul className={styles.ruleList}>
                <li className={styles.ruleItem}>
                  <span className={styles.ruleBullet}>•</span>
                  <div>Hành vi điều khiển xe có nồng độ cồn, ma túy, chất kích thích.</div>
                </li>
                <li className={styles.ruleItem}>
                  <span className={styles.ruleBullet}>•</span>
                  <div>Đua xe, cổ vũ đua xe trái phép, lạng lách đánh võng.</div>
                </li>
                <li className={styles.ruleItem}>
                  <span className={styles.ruleBullet}>•</span>
                  <div>Lùi xe, quay đầu trên đường cao tốc.</div>
                </li>
                <li className={styles.ruleItem}>
                  <span className={styles.ruleBullet}>•</span>
                  <div>Vượt xe ở nơi tầm nhìn bị che khuất, trên đường cong dốc cua, trên cầu hẹp 1 làn xe.</div>
                </li>
                <li className={styles.ruleItem}>
                  <span className={styles.ruleBullet}>•</span>
                  <div>Giao xe cho người không đủ điều kiện (chưa có bằng, say rượu).</div>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
