import React, { useState } from 'react';
import { Icons } from '../ui';
import styles from './FAQSection.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS_DATA: FAQItem[] = [
  {
    question: 'Bộ 600 câu hỏi sát hạch mới nhất áp dụng theo văn bản quy phạm nào?',
    answer:
      'Bộ câu hỏi được chuẩn hóa theo Công văn số 2262/CSGT-P5 ngày 07/05/2025 của Cục Cảnh sát giao thông — Bộ Công an và Luật Trật tự, an toàn giao thông đường bộ 2024. Toàn bộ đáp án, biển báo và tình huống giao thông được cập nhật đồng bộ.',
  },
  {
    question: 'Câu hỏi điểm liệt là gì và sai câu điểm liệt bị xử lý như thế nào?',
    answer:
      'Câu điểm liệt là những câu hỏi về tình huống mất an toàn giao thông đặc biệt nghiêm trọng (như vượt đèn đỏ, đi ngược chiều trên cao tốc, nồng độ cồn, qua đường sắt khi rào chắn đang đóng). Trong bài thi sát hạch, nếu học viên trả lời sai dù chỉ 01 câu điểm liệt, bài thi sẽ bị đánh trượt ngay lập tức bất kể tổng điểm đạt bao nhiêu.',
  },
  {
    question: 'Cấu trúc đề thi sát hạch lý thuyết Hạng B (B2) mới nhất gồm những gì?',
    answer:
      'Đề thi Hạng B gồm 35 câu hỏi trắc nghiệm, thời gian làm bài là 22 phút. Học viên phải trả lời đúng từ 32/35 câu trở lên và không được sai câu điểm liệt nào để được công nhận "ĐẠT" phần thi lý thuyết.',
  },
  {
    question: 'Hệ thống thi thử 20 bộ đề trên website có giống với đề thi thật không?',
    answer:
      '20 bộ đề mẫu trên hệ thống được xây dựng bằng thuật toán ma trận câu hỏi chuẩn xác của Cục CSGT, bao gồm đầy đủ tỷ lệ câu khái niệm, quy tắc, vận tải, kỹ thuật, sửa chữa, biển báo và sa hình. Học viên làm đủ 20 bộ đề với điểm đỗ 100% sẽ đảm bảo bao quát toàn bộ ngân hàng 600 câu hỏi.',
  },
  {
    question: 'Quy định thực hành giám sát hành trình DAT đối với học lái xe ô tô là gì?',
    answer:
      'Theo Thông tư quy định của Bộ GTVT, học viên lái xe ô tô hạng B bắt buộc phải hoàn thành tối thiểu 810km thực hành lái xe trên đường giao thông công cộng và được ghi nhận tự động bằng thiết bị DAT có nhận diện khuôn mặt trước khi đủ điều kiện đăng ký dự thi sát hạch.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className={styles.faqSection} aria-label="Giải đáp thắc mắc thường gặp">
      <div className={styles.sectionHeader}>
        <div className={styles.badge}>
          <Icons.HelpCircle size={14} />
          <span>Hỏi đáp phổ biến</span>
        </div>
        <h2 className={styles.sectionTitle}>Giải đáp thắc mắc sát hạch lái xe</h2>
        <p className={styles.sectionSubtitle}>
          Những câu hỏi thường gặp nhất của học viên về quy chế thi, bộ 600 câu hỏi và điều kiện nhận bằng.
        </p>
      </div>

      <div className={styles.accordionContainer}>
        {FAQS_DATA.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`${styles.faqCard} ${isOpen ? styles.cardOpen : ''}`}
            >
              <button
                type="button"
                className={styles.faqQuestionBtn}
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
              >
                <span className={styles.questionText}>{item.question}</span>
                <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>

              {isOpen && (
                <div className={styles.faqAnswer}>
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
