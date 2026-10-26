-- =============================================================================
-- Migration: V9__create_theory_learning_and_exam_config_tables.sql
-- Description: Hệ thống Học tập, Rèn luyện và Thi thử lý thuyết GPLX Việt Nam
-- =============================================================================

-- 1. Bảng danh mục chủ đề lý thuyết (7 chương chuẩn Tổng cục Đường bộ Việt Nam)
CREATE TABLE theory_topics (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    order_index INT NOT NULL DEFAULT 1,
    total_questions INT NOT NULL DEFAULT 0,
    paralysis_questions INT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Bổ sung các cột mở rộng cho theory_questions
ALTER TABLE theory_questions
    ADD COLUMN topic_id BIGINT NULL AFTER category_code,
    ADD COLUMN version VARCHAR(50) NOT NULL DEFAULT 'VN-600-2020' AFTER is_paralysis,
    ADD COLUMN verification_status VARCHAR(30) NOT NULL DEFAULT 'VERIFIED' AFTER version,
    ADD COLUMN legal_reference VARCHAR(255) NULL AFTER verification_status;

ALTER TABLE theory_questions
    ADD CONSTRAINT fk_theory_questions_topic FOREIGN KEY (topic_id) REFERENCES theory_topics (id) ON DELETE SET NULL,
    ADD INDEX idx_theory_questions_topic (topic_id);

-- 3. Bảng cấu hình cấu trúc đề thi theo từng hạng GPLX
CREATE TABLE exam_configurations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    category_code VARCHAR(20) NOT NULL,
    total_questions INT NOT NULL,
    duration_minutes INT NOT NULL,
    passing_score INT NOT NULL,
    rules_version VARCHAR(50) NOT NULL DEFAULT 'TT12-TT04-BGTVT',
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    structure_json TEXT NULL,
    legal_source VARCHAR(255) NOT NULL DEFAULT 'Thông tư 12/2017/TT-BGTVT, Thông tư 04/2022/TT-BGTVT',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE INDEX idx_exam_config_cat_ver (category_code, rules_version)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Bảng câu hỏi đánh dấu (Bookmark) của học viên
CREATE TABLE bookmarked_questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    question_id BIGINT NOT NULL,
    note VARCHAR(500) NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_bookmark_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_bookmark_question FOREIGN KEY (question_id) REFERENCES theory_questions (id) ON DELETE CASCADE,
    UNIQUE INDEX idx_bookmark_user_question (user_id, question_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Bảng phiên rèn luyện (Practice Sessions - 8 chế độ)
CREATE TABLE practice_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_code VARCHAR(64) NOT NULL UNIQUE,
    user_id BIGINT NOT NULL,
    practice_mode VARCHAR(50) NOT NULL, -- TOPIC, CATEGORY, UNANSWERED, INCORRECT, PARALYSIS, BOOKMARKED, RANDOM, ALL
    category_code VARCHAR(20) NULL,
    topic_id BIGINT NULL,
    total_questions INT NOT NULL DEFAULT 0,
    answered_questions INT NOT NULL DEFAULT 0,
    correct_answers INT NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'IN_PROGRESS', -- IN_PROGRESS, COMPLETED
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME NULL,
    CONSTRAINT fk_practice_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_practice_topic FOREIGN KEY (topic_id) REFERENCES theory_topics (id) ON DELETE SET NULL,
    INDEX idx_practice_user (user_id),
    INDEX idx_practice_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Bảng câu trả lời trong phiên rèn luyện
CREATE TABLE practice_answers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_id BIGINT NOT NULL,
    question_id BIGINT NOT NULL,
    selected_answer_id BIGINT NULL,
    is_correct TINYINT(1) NOT NULL DEFAULT 0,
    answered_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_practice_answers_session FOREIGN KEY (session_id) REFERENCES practice_sessions (id) ON DELETE CASCADE,
    CONSTRAINT fk_practice_answers_question FOREIGN KEY (question_id) REFERENCES theory_questions (id) ON DELETE CASCADE,
    CONSTRAINT fk_practice_answers_selected FOREIGN KEY (selected_answer_id) REFERENCES theory_answers (id) ON DELETE SET NULL,
    INDEX idx_practice_answers_session (session_id),
    INDEX idx_practice_answers_question (question_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Bảng phiên thi thử lý thuyết (Mock Exam Sessions)
CREATE TABLE mock_exam_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_code VARCHAR(64) NOT NULL UNIQUE,
    user_id BIGINT NOT NULL,
    category_code VARCHAR(20) NOT NULL,
    exam_config_id BIGINT NULL,
    total_questions INT NOT NULL,
    duration_minutes INT NOT NULL,
    passing_score INT NOT NULL,
    score INT NOT NULL DEFAULT 0,
    is_passed TINYINT(1) NOT NULL DEFAULT 0,
    has_failed_paralysis TINYINT(1) NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'IN_PROGRESS', -- IN_PROGRESS, COMPLETED, EXPIRED
    started_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_mock_exam_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT fk_mock_exam_config FOREIGN KEY (exam_config_id) REFERENCES exam_configurations (id) ON DELETE SET NULL,
    INDEX idx_mock_exam_user (user_id),
    INDEX idx_mock_exam_category (category_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Bảng chi tiết câu trả lời thi thử
CREATE TABLE mock_exam_session_answers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    mock_exam_id BIGINT NOT NULL,
    question_id BIGINT NOT NULL,
    selected_answer_id BIGINT NULL,
    is_correct TINYINT(1) NOT NULL DEFAULT 0,
    order_index INT NOT NULL DEFAULT 1,
    CONSTRAINT fk_mock_answers_exam FOREIGN KEY (mock_exam_id) REFERENCES mock_exam_sessions (id) ON DELETE CASCADE,
    CONSTRAINT fk_mock_answers_question FOREIGN KEY (question_id) REFERENCES theory_questions (id) ON DELETE CASCADE,
    CONSTRAINT fk_mock_answers_selected FOREIGN KEY (selected_answer_id) REFERENCES theory_answers (id) ON DELETE SET NULL,
    INDEX idx_mock_answers_exam (mock_exam_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- SEED DATA BAN ĐẦU
-- =============================================================================

-- Seed 7 chương lý thuyết chuẩn
INSERT INTO theory_topics (id, code, name, description, order_index, total_questions, paralysis_questions) VALUES
(1, 'CH1_RULES', 'Khái niệm và quy tắc giao thông đường bộ', 'Quy tắc ưu tiên, làn đường, tốc độ, khoảng cách và các hành vi bị nghiêm cấm', 1, 166, 45),
(2, 'CH2_TRANSPORT', 'Nghiệp vụ vận tải', 'Quy định về vận tải hàng hóa, hành khách, quyền và nghĩa vụ của người kinh doanh vận tải', 2, 30, 0),
(3, 'CH3_CULTURE', 'Văn hóa giao thông và đạo đức người lái xe', 'Trách nhiệm, hành vi ứng xử văn minh và đạo đức của người điều khiển phương tiện', 3, 21, 4),
(4, 'CH4_TECHNIQUES', 'Kỹ thuật lái xe', 'Kỹ thuật phanh, lái xe trên đường trơn, xuống dốc quanh co và ban đêm', 4, 56, 11),
(5, 'CH5_REPAIR', 'Cấu tạo và sửa chữa xe cơ giới', 'Cấu tạo động cơ, hệ thống phanh, điện, lốp và bảo dưỡng xe cơ bản', 5, 35, 0),
(6, 'CH6_SIGNS', 'Hệ thống biển báo hiệu đường bộ', 'Biển báo cấm, biển nguy hiểm, biển hiệu lệnh, biển chỉ dẫn và vạch kẻ đường', 6, 178, 0),
(7, 'CH7_SCENARIOS', 'Giải các thế sa hình và kỹ năng xử lý tình huống', 'Nguyên tắc thứ tự ưu tiên xe tại ngã tư, vòng xuyến và tình huống giao thông', 7, 114, 0);

-- Gán topic_id cho 3 câu hỏi mẫu ban đầu (thuộc Chương 1: Quy tắc giao thông)
UPDATE theory_questions SET topic_id = 1, legal_reference = 'Khoản 8 Điều 8 Luật GTĐB' WHERE id IN (1, 2, 3);

-- Seed cấu hình đề thi chuẩn các hạng GPLX
INSERT INTO exam_configurations (category_code, total_questions, duration_minutes, passing_score, rules_version, is_active, legal_source) VALUES
('A1', 25, 19, 21, 'TT12-TT04-BGTVT', 1, 'Thông tư 12/2017/TT-BGTVT, Thông tư 04/2022/TT-BGTVT'),
('A2', 25, 19, 23, 'TT12-TT04-BGTVT', 1, 'Thông tư 12/2017/TT-BGTVT, Thông tư 04/2022/TT-BGTVT'),
('B1', 30, 20, 27, 'TT12-TT04-BGTVT', 1, 'Thông tư 12/2017/TT-BGTVT, Thông tư 04/2022/TT-BGTVT'),
('B',  35, 22, 32, 'TT12-TT04-BGTVT', 1, 'Thông tư 12/2017/TT-BGTVT, Thông tư 04/2022/TT-BGTVT, Luật TTATGTĐB 2024'),
('B2', 35, 22, 32, 'TT12-TT04-BGTVT', 1, 'Thông tư 12/2017/TT-BGTVT, Thông tư 04/2022/TT-BGTVT'),
('C',  40, 24, 36, 'TT12-TT04-BGTVT', 1, 'Thông tư 12/2017/TT-BGTVT, Thông tư 04/2022/TT-BGTVT');

-- Seed thêm 25+ câu hỏi mẫu trải đều các chương và hạng bằng để hệ thống có đủ câu hỏi thi thử và học tập phong phú
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, legal_reference) VALUES
(4, 'ALL', 1, 4, 'Hành vi vượt xe tại các đoạn đường cua nguy hiểm có tầm nhìn bị che khuất có được phép không?', NULL, 'Cấm vượt xe khi tầm nhìn bị hạn chế hoặc đường cong nguy hiểm.', 1, 'Điều 14 Luật GTĐB'),
(5, 'ALL', 1, 5, 'Tại nơi đường giao nhau không có báo hiệu đi theo vòng xuyến, người điều khiển phương tiện phải nhường đường như thế nào?', NULL, 'Không có vòng xuyến phải nhường đường cho xe đến từ bên phải.', 0, 'Điều 24 Luật GTĐB'),
(6, 'ALL', 1, 6, 'Phương tiện tham gia giao thông đường bộ di chuyển với tốc độ thấp hơn phải đi về phía bên nào?', NULL, 'Phương tiện đi tốc độ thấp hơn phải đi về phía bên phải.', 0, 'Điều 13 Luật GTĐB'),
(7, 'ALL', 2, 7, 'Thời gian làm việc của người lái xe ô tô trong một ngày không được quá bao nhiêu giờ?', NULL, 'Thời gian làm việc của người lái xe ô tô không quá 10 giờ trong một ngày và không được lái xe liên tục quá 4 giờ.', 0, 'Điều 65 Luật GTĐB'),
(8, 'ALL', 2, 8, 'Hàng siêu trường, siêu trọng được hiểu như thế nào là đúng quy chuẩn?', NULL, 'Là hàng không thể tháo rời và có kích thước hoặc trọng lượng vượt quá giới hạn quy định.', 0, 'Thông tư 46/2015/TT-BGTVT'),
(9, 'ALL', 3, 9, 'Khi điều khiển xe ô tô, hành vi nào dưới đây thể hiện văn hóa giao thông và đạo đức người lái xe?', NULL, 'Chấp hành nghiêm quy định, nhường đường cho người đi bộ, giữ thái độ hòa nhã khi xảy ra va chạm.', 0, 'Văn hóa giao thông ĐBVN'),
(10, 'ALL', 3, 10, 'Hành vi cố ý không cấp cứu người bị tai nạn giao thông có bị nghiêm cấm không?', NULL, 'Nghiêm cấm hành vi thấy người gặp tai nạn giao thông mà có điều kiện cứu giúp nhưng không cứu giúp.', 1, 'Khoản 18 Điều 8 Luật GTĐB'),
(11, 'ALL', 4, 11, 'Khi điều khiển xe ô tô xuống dốc cao dài, người lái xe cần thực hiện thao tác nào để đảm bảo an toàn?', NULL, 'Về số thấp (số 1 hoặc 2), nhả chân ga, kết hợp phanh chân để khống chế tốc độ; không được về số mo (N) hoặc tắt máy.', 1, 'Kỹ thuật lái xe ô tô an toàn'),
(12, 'ALL', 4, 12, 'Khi lái xe qua vũng nước sâu ngập nửa bánh xe, người lái xe nên xử lý như thế nào?', NULL, 'Quan sát ước lượng mực nước, về số thấp, giữ đều chân ga tránh nước vào ống xả.', 0, 'Kỹ thuật lái xe vượt địa hình'),
(13, 'ALL', 5, 13, 'Hệ thống phanh (thắng) của xe cơ giới có tác dụng gì?', NULL, 'Dùng để giảm tốc độ, dừng hẳn chuyển động của xe hoặc giữ cho xe đứng yên trên dốc.', 0, 'Cấu tạo ô tô cơ bản'),
(14, 'ALL', 5, 14, 'Đèn báo phanh trên xe ô tô sáng liên tục khi đang chạy biểu hiện điều gì?', NULL, 'Báo hiệu thiếu dầu phanh, mòn má phanh hoặc phanh tay chưa được hạ hết.', 0, 'Cấu tạo & sửa chữa ô tô'),
(15, 'ALL', 6, 15, 'Biển báo hiệu hình tròn, viền đỏ, nền trắng, hình vẽ màu đen là loại biển báo gì?', NULL, 'Biển báo cấm biểu thị các điều cấm mà người tham gia giao thông không được vi phạm.', 0, 'Quy chuẩn QCVN 41:2019/BGTVT'),
(16, 'ALL', 6, 16, 'Biển báo hiệu hình tam giác đều, viền đỏ, nền vàng, hình vẽ màu đen là loại biển gì?', NULL, 'Biển báo nguy hiểm và cảnh báo nhằm thông báo cho người lái xe biết trước các nguy hiểm trên đường.', 0, 'Quy chuẩn QCVN 41:2019/BGTVT'),
(17, 'ALL', 6, 17, 'Biển báo hiệu hình tròn nền xanh lam với hình vẽ màu trắng bên trong biểu thị điều gì?', NULL, 'Biển hiệu lệnh bắt buộc người tham gia giao thông phải thi hành theo chỉ dẫn.', 0, 'Quy chuẩn QCVN 41:2019/BGTVT'),
(18, 'ALL', 6, 18, 'Gặp biển nào dưới đây thì xe tải trọng trên 5 tấn không được phép đi vào?', NULL, 'Biển số P.115 - Hạn chế tải trọng toàn bộ xe vượt quá trị số ghi trên biển.', 0, 'Quy chuẩn QCVN 41:2019/BGTVT'),
(19, 'ALL', 7, 19, 'Theo thứ tự ưu tiên tại nơi đường giao nhau: Xe cứu hỏa, Xe cứu thương, Xe công an thì xe nào được đi trước?', NULL, 'Thứ tự xe ưu tiên: Xe chữa cháy đi làm nhiệm vụ -> Xe quân sự, công an đi làm nhiệm vụ -> Xe cứu thương.', 0, 'Điều 22 Luật GTĐB'),
(20, 'ALL', 7, 20, 'Xe nào phải nhường đường trong trường hợp xe xuống dốc và xe lên dốc tránh nhau tại đường hẹp?', NULL, 'Xe xuống dốc phải nhường đường cho xe đang lên dốc.', 0, 'Điều 17 Luật GTĐB'),
(21, 'ALL', 7, 21, 'Xe con quay đầu tại nơi có biển cấm rẽ trái có được phép không theo quy chuẩn mới?', NULL, 'Theo QCVN 41:2019, biển cấm rẽ trái không còn cấm quay đầu xe (trừ khi có biển cấm quay đầu).', 0, 'Quy chuẩn QCVN 41:2019/BGTVT'),
(22, 'ALL', 1, 22, 'Người ngồi trên xe mô tô hai bánh, ba bánh, xe gắn máy có được mang vác vật cồng kềnh không?', NULL, 'Nghiêm cấm người ngồi trên mô tô, xe gắn máy mang, vác vật cồng kềnh khi tham gia giao thông.', 1, 'Khoản 3 Điều 30 Luật GTĐB'),
(23, 'ALL', 1, 23, 'Khoảng cách an toàn tối thiểu giữa hai xe ô tô chạy với tốc độ 60 km/h trên đường cao tốc là bao nhiêu mét trong điều kiện mặt đường khô ráo?', NULL, 'Tốc độ 60 km/h thì khoảng cách an toàn tối thiểu là 35 mét.', 0, 'Thông tư 31/2019/TT-BGTVT'),
(24, 'ALL', 4, 24, 'Khi gặp sự cố thủng lốp trên đường cao tốc, người lái xe phải làm gì để đảm bảo an toàn?', NULL, 'Bật đèn báo khẩn cấp, từ từ điều khiển xe vào làn dừng xe khẩn cấp, đặt biển cảnh báo nguy hiểm cách xe tối thiểu 150m.', 0, 'Kỹ năng an toàn đường cao tốc'),
(25, 'ALL', 6, 25, 'Vạch kẻ đường màu vàng nét đứt dùng để làm gì?', NULL, 'Vạch đơn, nét đứt màu vàng dùng để phân chia hai chiều xe chạy ngược chiều, cho phép xe đè vạch khi cần vượt.', 0, 'Quy chuẩn QCVN 41:2019/BGTVT'),
(26, 'ALL', 7, 26, 'Thứ tự các xe đi như thế nào là đúng quy tắc giao thông: Ngã tư gồm Xe con A (đi thẳng), Xe con B (rẽ trái), Xe máy C (rẽ phải)?', NULL, 'Nguyên tắc hướng đi: Đi thẳng và rẽ phải trước, rẽ trái sau. Do đó Xe tải/máy rẽ phải và Xe đi thẳng đi trước, xe rẽ trái đi sau cùng.', 0, 'Quy tắc sa hình');

-- Seed đáp án tương ứng cho các câu hỏi 4 -> 26
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES
(4, 'Được phép vượt nếu xe phía trước đi chậm.', 0, 1),
(4, 'Bị nghiêm cấm tuyệt đối.', 1, 2),
(4, 'Được phép vượt nếu bấm còi liên tục.', 0, 3),

(5, 'Phải nhường đường cho xe đến từ bên phải.', 1, 1),
(5, 'Phải nhường đường cho xe đến từ bên trái.', 0, 2),
(5, 'Xe nào có tốc độ nhanh hơn thì được đi trước.', 0, 3),

(6, 'Đi về phía bên trái.', 0, 1),
(6, 'Đi về phía bên phải.', 1, 2),
(6, 'Đi ở làn giữa.', 0, 3),

(7, 'Không quá 8 giờ trong một ngày.', 0, 1),
(7, 'Không quá 10 giờ trong một ngày và không lái xe liên tục quá 4 giờ.', 1, 2),
(7, 'Không quá 12 giờ trong một ngày.', 0, 3),

(8, 'Là hàng có trọng lượng trên 20 tấn.', 0, 1),
(8, 'Là hàng không thể tháo rời, có kích thước hoặc trọng lượng vượt quá giới hạn quy định.', 1, 2),
(8, 'Là hàng hóa dễ vỡ và nguy hiểm.', 0, 3),

(9, 'Nhường đường cho người đi bộ, người già, trẻ em và giữ thái độ hòa nhã khi xảy ra va chạm.', 1, 1),
(9, 'Tranh thủ vượt đèn vàng khi đường vắng.', 0, 2),
(9, 'Bấm còi to để giục xe phía trước đi nhanh.', 0, 3),

(10, 'Bị nghiêm cấm tuyệt đối.', 1, 1),
(10, 'Không bị cấm nếu đang bận việc.', 0, 2),
(10, 'Chỉ cấm nếu nạn nhân yêu cầu giúp đỡ.', 0, 3),

(11, 'Về số 0 (N), tắt động cơ và rà phanh chân liên tục.', 0, 1),
(11, 'Về số thấp, nhả chân ga và phối hợp phanh chân để kiểm soát tốc độ.', 1, 2),
(11, 'Chỉ sử dụng phanh tay suốt đoạn dốc.', 0, 3),

(12, 'Tăng ga thật mạnh để vượt nhanh qua vũng nước.', 0, 1),
(12, 'Về số thấp, giữ đều ga, điều khiển xe đi qua từ từ tránh nước vào cổ hút động cơ.', 1, 2),
(12, 'Tắt máy dắt bộ xe qua vũng nước.', 0, 3),

(13, 'Tăng tốc độ cho xe khi cần vượt.', 0, 1),
(13, 'Dùng để giảm tốc độ, dừng xe hoặc giữ cho xe đứng yên trên dốc.', 1, 2),
(13, 'Thay đổi hướng chuyển động của bánh xe.', 0, 3),

(14, 'Hệ thống phanh hoạt động bình thường.', 0, 1),
(14, 'Cảnh báo phanh tay chưa nhả hết hoặc mức dầu phanh xuống thấp bất thường.', 1, 2),
(14, 'Ắc quy xe sắp hết điện.', 0, 3),

(15, 'Biển báo cấm.', 1, 1),
(15, 'Biển báo nguy hiểm.', 0, 2),
(15, 'Biển báo hiệu lệnh.', 0, 3),

(16, 'Biển báo chỉ dẫn.', 0, 1),
(16, 'Biển báo nguy hiểm và cảnh báo.', 1, 2),
(16, 'Biển phụ.', 0, 3),

(17, 'Biển hiệu lệnh (bắt buộc phải chấp hành hướng đi theo biển).', 1, 1),
(17, 'Biển báo cấm đi vào.', 0, 2),
(17, 'Biển chỉ dẫn thông tin địa điểm.', 0, 3),

(18, 'Biển hạn chế tải trọng toàn bộ xe có trị số dưới hoặc bằng 5 tấn.', 1, 1),
(18, 'Biển hạn chế tốc độ tối đa 50 km/h.', 0, 2),
(18, 'Biển cấm xe con.', 0, 3),

(19, 'Xe cứu hỏa -> Xe công an -> Xe cứu thương.', 1, 1),
(19, 'Xe cứu thương -> Xe cứu hỏa -> Xe công an.', 0, 2),
(19, 'Xe công an -> Xe cứu hỏa -> Xe cứu thương.', 0, 3),

(20, 'Xe xuống dốc phải nhường đường cho xe lên dốc.', 1, 1),
(20, 'Xe lên dốc phải nhường đường cho xe xuống dốc.', 0, 2),
(20, 'Xe nào to hơn thì được đi trước.', 0, 3),

(21, 'Được phép quay đầu xe nếu không có biển cấm quay đầu.', 1, 1),
(21, 'Tuyệt đối không được phép quay đầu.', 0, 2),
(21, 'Chỉ xe máy mới được quay đầu.', 0, 3),

(22, 'Được mang vác nếu chằng buộc chắc chắn.', 0, 1),
(22, 'Không được phép mang, vác vật cồng kềnh.', 1, 2),
(22, 'Được mang vác vào ban đêm khi đường vắng.', 0, 3),

(23, '35 mét.', 1, 1),
(23, '55 mét.', 0, 2),
(23, '70 mét.', 0, 3),

(24, 'Dừng xe ngay giữa làn đường và thay lốp.', 0, 1),
(24, 'Bật đèn khẩn cấp, đưa xe vào làn dừng khẩn cấp và đặt cảnh báo phía sau tối thiểu 150m.', 1, 2),
(24, 'Tiếp tục phóng nhanh tìm trạm sửa chữa gần nhất.', 0, 3),

(25, 'Phân chia hai chiều xe chạy ngược chiều nhau, được phép đè vạch khi cần thiết.', 1, 1),
(25, 'Cấm đè vạch cấm vượt hoàn toàn.', 0, 2),
(25, 'Phân chia các làn xe cùng chiều.', 0, 3),

(26, 'Xe máy và xe con đi thẳng trước -> Xe rẽ trái đi sau.', 1, 1),
(26, 'Xe rẽ trái đi trước -> Xe đi thẳng đi sau.', 0, 2),
(26, 'Tất cả các xe đi cùng một lúc.', 0, 3);
