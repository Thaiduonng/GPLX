import { Link } from 'react-router-dom';
import { LICENSE_CATEGORIES } from '../components/home/categoryConfig';
import styles from './LicenseCategoriesPage.module.css';

export default function LicenseCategoriesPage() {
  return <main className={styles.page}>
    <header className={styles.header}>
      <span className={styles.eyebrow}>TRA CỨU GPLX</span>
      <h1>15 hạng giấy phép lái xe</h1>
      <p>Phạm vi phương tiện theo Điều 57 Luật Trật tự, an toàn giao thông đường bộ. Số chỗ chở người dưới đây không bao gồm người lái xe.</p>
      <Link to="/courses">Xem các khóa đang tuyển sinh →</Link>
    </header>
    <p className={styles.note}><strong>Lưu ý hạng B1:</strong> Hạng B1 cấp mới là mô tô ba bánh. Giấy phép B1 ô tô đã cấp trước năm 2025 được quản lý theo quy định chuyển tiếp, không tự đổi thành B1 mô tô.</p>
    <div className={styles.grid}>
      {LICENSE_CATEGORIES.map(c => <article key={c.code} className={styles.card}>
        <div className={styles.top}><h2>{c.name}</h2><span>{c.totalQuestions} câu ôn tập</span></div>
        <p>{c.description}</p>
        <dl><div><dt>Tuổi tối thiểu</dt><dd>Đủ {c.minAge} tuổi</dd></div>
          <div><dt>Thi thử lý thuyết</dt><dd>{c.examVerified ? `${c.questionsPerExam} câu · ${c.timeMinutes} phút · đạt ${c.passingScore}` : 'Đang xác minh quy trình; có thể ôn ngân hàng câu hỏi'}</dd></div></dl>
      </article>)}
    </div>
    <footer className={styles.sources}>
      <p>Danh mục phương tiện và độ tuổi: <a href="https://xaydungchinhsach.chinhphu.vn/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-119240909105718285.htm" target="_blank" rel="noreferrer">Luật 36/2024/QH15, Điều 57, 59 và 89</a>.</p>
      <p>Phạm vi ngân hàng câu hỏi: <a href="https://xaydungchinhsach.chinhphu.vn/huong-dan-su-dung-bo-600-cau-hoi-dung-de-sat-hach-lai-xe-co-gioi-duong-bo-119250513110514585.htm" target="_blank" rel="noreferrer">Công văn 2262/CSGT-P5 và phụ lục 1–3</a>. Cấu hình thi thử đang áp dụng giai đoạn chuyển tiếp đến 28/02/2027; kết quả dùng để luyện tập.</p>
    </footer>
  </main>;
}
