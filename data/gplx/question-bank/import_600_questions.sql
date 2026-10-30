SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
START TRANSACTION;

-- Question 1
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (1, 'ALL', 1, 1, 'Phần của đường bộ được sử dụng cho phương tiện giao thông đường bộ đi lại là gì?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 1;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (1, 'Phần mặt đường và lề đường.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (1, 'Phần đường xe chạy.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (1, 'Phần đường xe cơ giới.', 0, 3);

-- Question 2
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (2, 'ALL', 1, 2, 'Làn đường là gì?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 2;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (2, 'Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, sử dụng cho xe chạy.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (2, 'Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, có đủ chiều rộng cho xe chạy an toàn.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (2, 'Là đường cho xe ô tô chạy, dừng, đỗ an toàn.', 0, 3);

-- Question 3
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (3, 'ALL', 1, 3, 'Khổ giới hạn của đường bộ được hiểu như thế nào là đúng?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 3;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (3, 'Khổ giới hạn của đường bộ là khoảng trống có kích thước giới hạn về chiều rộng, chiều cao của đường bộ để các xe, bao gồm cả hàng hoá xếp trên xe đi qua được an toàn và được xác định theo quy chuẩn, tiêu chuẩn kỹ thuật của đường bộ.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (3, 'Là khoảng trống có kích thước giới hạn về chiều rộng của đường, cầu, bến phà, hầm trên đường b ộ để các xe kể cả hàng hóa xếp trên xe đi qua được an toàn.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (3, 'Là khoảng trống có kích thước giới hạn về chiều cao của cầu, bến phà, hầm trên đường bộ để các xe đi qua được an toàn.', 0, 3);

-- Question 4
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (4, 'ALL', 1, 4, 'Dải phân cách được lắp đặt để làm gì?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 4;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (4, 'Để phân chia các làn đường dành cho xe cơ giới và xe thô sơ trên đường cao tốc.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (4, 'Để phân chia phần đường xe chạy thành hai chiều riêng biệt hoặc để phân chia phần đường dành cho xe cơ giới và xe thô sơ hoặc của nhiều loại xe khác nhau trên cùng một chiều đường.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (4, 'Để phân tách phần đường xe chạy và hành lang an toàn giao thông.', 0, 3);

-- Question 5
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (5, 'ALL', 1, 5, 'Vạch kẻ đường là gì?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 5;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (5, 'Là báo hiệu đường bộ để hỗ trợ cảnh báo nguy hiểm cho người tham gia giao thông đường bộ.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (5, 'Là vạch chỉ sự phân chia làn đường, vị trí hoặc hướng đi, vị trí dừng lại.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (5, 'Là báo hiệu cho người tham gia giao thông đường bộ về các thông tin của đường bộ.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (5, 'Cả ba ý trên.', 0, 4);

-- Question 6
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (6, 'ALL', 1, 6, 'Người điều khiển phương tiện tham gia giao thông đường bộ được hiểu như thế nào là đúng?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 6;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (6, 'Là người điều khiển xe cơ giới, người điều khiển xe thô sơ, người điều khiển xe máy chuyên dùng.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (6, 'Là người được giao nhiệm vụ hướng dẫn giao thông trên đường bộ.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (6, 'Cả hai ý trên.', 0, 3);

-- Question 7
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (7, 'ALL', 1, 7, 'Người lái xe được hiểu như thế nào là đúng?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 7;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (7, 'Là người điều khiển xe cơ giới.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (7, 'Là người điều khiển xe thô sơ.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (7, 'Là người điều khiển xe máy chuyên dùng.', 0, 3);

-- Question 8
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (8, 'ALL', 1, 8, 'Trong nhóm các phương tiện giao thông đường bộ dưới đây, nhóm phương tiện nào là xe cơ giới?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 8;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (8, 'Xe ô tô; máy kéo; xe mô tô hai bánh; xe mô tô ba bánh; xe gắn máy; xe cơ giới dùng cho người khuyết tật và xe máy chuyên dùng; xe đạp, xe đạp máy, xe đạp điện.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (8, 'Xe ô tô; rơ moóc được kéo bởi xe ô tô; sơ mi rơ moóc được kéo bởi ô tô đầu kéo; xe chở người bốn bánh có gắn động cơ; xe chở hàng bốn bánh có gắn động cơ; xe mô tô, xe gắn máy và các loại xe tương tự.', 1, 2);

-- Question 9
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (9, 'ALL', 1, 9, 'Trong nhóm các phương tiện giao thông đường bộ dưới đây, nhóm phương tiện nào là xe thô sơ?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 9;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (9, 'Xe đạp, xe đạp máy, xe đạp điện; xe xích lô; xe lăn dùng cho người khuyết tật; xe vật nuôi kéo và các loại xe tương tự.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (9, 'Xe đạp (kể cả xe đạp máy, xe đạp điện), xe gắn máy, xe cơ giới dùng cho người khuyết tật và xe máy chuyên dùng.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (9, 'Xe ô tô, máy kéo, rơ moóc hoặc sơ mi rơ moóc được kéo bởi xe ô tô, máy kéo.', 0, 3);

-- Question 10
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (10, 'ALL', 1, 10, 'Phương tiện giao thông đường bộ gồm những loại nào?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 10;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (10, 'Phương tiện giao thông cơ giới đường bộ.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (10, 'Phương tiện giao thông thô sơ đường bộ, xe máy chuyên dùng và các loại xe tương tự.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (10, 'Cả hai ý trên.', 1, 3);

-- Question 11
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (11, 'ALL', 1, 11, 'Người tham gia giao thông đường bộ gồm những đối tượng nào?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 11;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (11, 'Người điều khiển, người được chở trên phương tiện tham gia giao thông đường bộ.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (11, 'Người điều khiển, dẫn dắt vật nuôi trên đường bộ; người đi bộ trên đường bộ.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (11, 'Cả hai ý trên.', 1, 3);

-- Question 12
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (12, 'ALL', 1, 12, 'Người điều khiển phương tiện tham gia giao thông đường bộ gồm những đối tượng nào dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 12;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (12, 'Người điều khiển xe cơ giới, người điều khiển xe thô sơ.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (12, 'Người điều khiển xe máy chuyên dùng.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (12, 'Cả hai ý trên.', 1, 3);

-- Question 13
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (13, 'ALL', 1, 13, 'Người điều khiển giao thông đường bộ được hiểu như thế nào là đúng?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 13;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (13, 'Là người điều khiển phương tiện tham gia giao thông đường bộ.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (13, 'Là Cảnh sát giao thông và người được giao nhiệm vụ hướng dẫn giao thông trên đường bộ.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (13, 'Là người tham gia giao thông đường bộ.', 0, 3);

-- Question 14
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (14, 'ALL', 1, 14, 'Dừng xe được hiểu như thế nào là đúng?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 14;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (14, 'Là trạng thái đứng yên của xe không giới hạn thời gian để cho người lên, xuống xe, xếp dỡ hàng hóa hoặc thực hiện công việc khác.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (14, 'Là trạng thái đứng yên tạm thời của xe trong một khoảng thời gian cần thiết đủ để cho người lên xe, xuống xe, xếp dỡ hàng hóa, kiểm tra kỹ thuật xe hoặc hoạt động khác. Khi dừng xe không được tắt máy và không được rời khỏi vị trí lái, trừ trường hợp rời khỏi vị trí lái để đóng, mở cửa xe, xếp dỡ hàng hóa, kiểm tra kỹ thuật xe nhưng phải sử dụng phanh đỗ xe hoặc thực hiện biện pháp an toàn khác.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (14, 'Là trạng thái đứng yên của xe không giới hạn thời gian giữa 02 lần vận chuyển hàng hóa hoặc hành khách.', 0, 3);

-- Question 15
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (15, 'ALL', 1, 15, 'Đỗ xe được hiểu như thế nào là đúng?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 15;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (15, 'Là trạng thái đứng yên của xe có giới hạn thời gian trong một khoảng thời gian cần thiết đủ để cho người lên, xuống xe đó, xếp dỡ hàng hóa hoặc thực hiện công việc khác.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (15, 'Là trạng thái đứng yên của xe không giới hạn thời gian. Khi đỗ xe, người điều khiển phương tiện tham gia giao thông đường bộ chỉ được rời khỏi xe khi đã sử dụng phanh đỗ xe hoặc thực hiện biện pháp an toàn khác. Xe đỗ trên đoạn đường dốc phải đánh lái về phía lề đường, chèn bánh.', 1, 2);

-- Question 16
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (16, 'ALL', 1, 16, 'Đường cao tốc được hiểu như thế nào là đúng?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 16;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (16, 'Là một cấp kỹ thuật của đường bộ, chỉ dành cho một số loại xe cơ giới, xe máy chuyên dùng tham gia giao thông theo quy định của pháp luật. Có dải phân cách phân chia hai chiều xe chạy riêng biệt, không giao nhau cùng mức với một hoặc các đường khác, chỉ cho xe ra, vào ở những điểm nhất định. Có hàng rào bảo vệ, trang thiết bị phục vụ, bảo đảm giao thông liên tục, an toàn, rút ngắn thời gian hành trình.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (16, 'Là đường nối liền Thủ đô Hà Nội với trung tâm hành chính cấp tỉnh; đường nối liền các trung tâm hành chính cấp tỉnh; đường có vị trí quan trọng đối với sự phát triển kinh tế - xã hội, bảo đảm quốc phòng, an ninh của vùng, khu vực.', 0, 2);

-- Question 17
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (17, 'ALL', 1, 17, 'Thiết bị an toàn cho trẻ em được hiểu như thế nào là đúng?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 17;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (17, 'Là thiết bị có đủ khả năng bảo đảm an toàn cho trẻ em ở tư thế ngồi hoặc nằm trên xe ô tô, được thiết kế để giảm nguy cơ chấn thương cho người dùng trong trường hợp xảy ra va chạm hoặc xe ô tô giảm tốc độ đột ngột, bằng cách hạn chế sự di chuyển của cơ thể trẻ em.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (17, 'Là thiết bị có đủ khả năng bảo đảm an toàn cho trẻ em ở tư thế đứng hoặc nằm trên xe ô tô, được thiết kế để giảm nguy cơ chấn thương cho người dùng trong trường hợp xe ô tô lưu thông bình thường.', 0, 2);

-- Question 18
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (18, 'ALL', 1, 18, 'Theo chức năng phục vụ thì đường bộ được phân loại như thế nào?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 18;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (18, 'Đường chính, đường nhánh, đường gom, đường bên, đường dành cho giao thông công cộng, đường nội bộ, đường dành riêng cho người đi bộ, người đi xe đạp và các đường khác.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (18, 'Đường chính, đường nhánh, đường gom, đường dành cho giao thông công cộng, đường nội bộ, đường dành riêng cho người đi bộ, người đi xe đạp và các đường khác.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (18, 'Đường chính, đường nhánh, đường gom, đường bên, đường dành cho giao thông công cộng, đường dành riêng cho người đi bộ, người đi xe đạp và các đường khác.', 0, 3);

-- Question 19
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (19, 'ALL', 1, 19, 'Hành vi nào dưới đây bị nghiêm cấm?', NULL, '💡 Từ khóa \'nghiêm cấm\' → Chọn hành vi nguy hiểm/vi phạm pháp luật nhất', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 19;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (19, 'Sử dụng xe đạp đi trên các tuyến quốc lộ.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (19, 'Rải vật sắc nhọn, đổ chất gây trơn trượt trên đường bộ.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (19, 'Cả hai ý trên.', 0, 3);

-- Question 20
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (20, 'ALL', 1, 20, 'Hành vi đưa xe cơ giới, xe máy chuyên dùng tham gia giao thông đường bộ nào dưới đây bị cấm?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 20;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (20, 'Không có chứng nhận kiểm định an toàn kỹ thuật và bảo vệ môi trường.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (20, 'Hết niên hạn sử dụng.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (20, 'Cả hai ý trên.', 1, 3);

-- Question 21
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (21, 'ALL', 1, 21, 'Tổ chức đua xe được phép thực hiện khi nào?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 21;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (21, 'Trên đường phố không có người qua lại.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (21, 'Được người dân ủng hộ.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (21, 'Được cơ quan có thẩm quyền cấp phép.', 1, 3);

-- Question 22
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (22, 'ALL', 1, 22, 'Hành vi đua xe trái phép bị xử lý như thế nào?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 22;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (22, 'Chỉ bị nhắc nhở.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (22, 'Tùy theo mức độ của hành vi vi phạm có thể bị xử lý hành chính hoặc xử lý hình sự.', 1, 2);

-- Question 23
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (23, 'ALL', 1, 23, 'Hành vi của người điều khiển xe ô tô và các loại xe tương tự khi tham gia giao thông đường bộ mà trong cơ thể có chất ma túy thì bị áp dụng hình thức xử phạt vi phạm hành chính nào dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 23;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (23, 'Bị phạt tiền.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (23, 'Bị tước giấy phép lái xe.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (23, 'Cả hai ý trên.', 1, 3);

-- Question 24
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (24, 'ALL', 1, 24, 'Người điều khiển phương tiện tham gia giao thông đường bộ mà trong máu hoặc hơi thở có nồng độ cồn có bị nghiêm cấm không?', NULL, '💡 Từ khóa \'nghiêm cấm\' → Chọn hành vi nguy hiểm/vi phạm pháp luật nhất', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 24;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (24, 'Bị nghiêm cấm.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (24, 'Không bị nghiêm cấm.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (24, 'Không bị nghiêm cấm, nếu nồng độ cồn trong máu ở mức nhẹ, có thể điều khiển phương tiện tham gia giao thông.', 0, 3);

-- Question 25
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (25, 'ALL', 1, 25, 'Hành vi của người điều khiển xe ô tô và các loại xe tương tự khi tham gia giao thông đường bộ mà trong máu hoặc hơi thở có nồng độ cồn thì bị áp dụng hình thức xử phạt vi phạm hành chính nào dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 25;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (25, 'Bị phạt tiền.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (25, 'Có thể bị tước giấy phép lái xe.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (25, 'Cả hai ý trên.', 1, 3);

-- Question 26
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (26, 'ALL', 1, 26, 'Theo Luật Phòng chống tác hại của rượu, bia, đối tượng nào dưới đây bị cấm sử dụng rượu, bia khi tham gia giao thông?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 26;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (26, 'Người điều khiển xe ô tô, xe mô tô, xe đạp, xe gắn máy.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (26, 'Người được chở trên xe cơ giới.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (26, 'Cả hai ý trên.', 0, 3);

-- Question 27
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (27, 'ALL', 1, 27, 'Hành vi giao xe ô tô, mô tô cho người nào sau đây tham gia giao thông đường bộ bị nghiêm cấm?', NULL, '💡 Từ khóa \'nghiêm cấm\' → Chọn hành vi nguy hiểm/vi phạm pháp luật nhất', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 27;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (27, 'Người chưa đủ tuổi theo quy định.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (27, 'Người không có giấy phép lái xe.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (27, 'Người có giấy phép lái xe nhưng đã bị trừ hết 12 điểm.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (27, 'Cả ba ý trên.', 1, 4);

-- Question 28
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (28, 'ALL', 1, 28, 'Hành vi nào sau đây bị nghiêm cấm?', NULL, '💡 Từ khóa \'nghiêm cấm\' → Chọn hành vi nguy hiểm/vi phạm pháp luật nhất', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 28;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (28, 'Điều khiển xe cơ giới lạng lách, đánh võng, rú ga liên tục khi tham gia giao thông trên đường.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (28, 'Xúc phạm, đe dọa, cản trở, chống đối hoặc không chấp hành hiệu lệnh, hướng dẫn, yêu cầu kiểm tra, kiểm soát của người thi hành công vụ về bảo đảm trật tự, an toàn giao thông đường bộ.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (28, 'Cả hai ý trên.', 1, 3);

-- Question 29
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (29, 'ALL', 1, 29, 'Các hành vi nào sau đây bị cấm đối với phương tiện tham gia giao thông đường bộ?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 29;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (29, 'Cải tạo xe ô tô loại khác thành xe ô tô chở người phục vụ mục đích quốc phòng, an ninh.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (29, 'Cải tạo trái phép; cố ý can thiệp làm sai lệch chỉ số trên đồng hồ báo quãng đường đã chạy của xe ô tô; cắt, hàn, tẩy xóa, đục sửa, đóng lại trái phép số khung, số động cơ của xe cơ giới, xe máy chuyên dùng.', 1, 2);

-- Question 30
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (30, 'ALL', 1, 30, 'Hành vi nào sau đây bị cấm?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 30;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (30, 'Lắp đặt, sử dụng thiết bị âm thanh, ánh sáng trên xe cơ giới, xe máy chuyên dùng gây mất trật tự, an toàn giao thông đường bộ.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (30, 'Cản trở người, phương tiện tham gia giao thông trên đường bộ; ném gạch, đất, đá, cát hoặc vật thể khác vào người, phương tiện đang tham gia giao thông trên đường bộ.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (30, 'Cả hai ý trên.', 1, 3);

-- Question 31
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (31, 'ALL', 1, 31, 'Việc sản xuất, sử dụng, mua, bán trái phép biển số xe có bị nghiêm cấm hay không?', NULL, '💡 Từ khóa \'nghiêm cấm\' → Chọn hành vi nguy hiểm/vi phạm pháp luật nhất', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 31;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (31, 'Không bị nghiêm cấm.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (31, 'Bị nghiêm cấm.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (31, 'Bị nghiêm cấm tuỳ trường hợp.', 0, 3);

-- Question 32
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (32, 'ALL', 1, 32, 'Khi điều khiển phương tiện tham gia giao thông, những hành vi nào dưới đây bị nghiêm cấm?', NULL, '💡 Từ khóa \'nghiêm cấm\' → Chọn hành vi nguy hiểm/vi phạm pháp luật nhất', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 32;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (32, 'Thay đổi tốc độ của xe nhiều lần.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (32, 'Điều khiển phương tiện sau 23 giờ trong ngày.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (32, 'Lạng lách, đánh võng, rú ga liên tục.', 1, 3);

-- Question 33
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (33, 'ALL', 1, 33, 'Có bao nhiêu nhóm biển báo hiệu đường bộ?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 33;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (33, 'Ba nhóm: Biển báo cấm, biển báo nguy hiểm và biển hiệu lệnh.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (33, 'Bốn nhóm: Biển báo cấm, biển báo nguy hiểm, biển hiệu lệnh và biển phụ.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (33, 'Năm nhóm: Biển báo cấm, biển báo nguy hiểm, biển hiệu lệnh, biển chỉ dẫn, biển phụ.', 1, 3);

-- Question 34
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (34, 'ALL', 1, 34, 'Tại nơi có vạch kẻ đường hoặc tại nơi mà người đi bộ, xe lăn của người khuyết tật đang qua đường, người điều khiển phương tiện tham gia giao thông phải thực hiện như thế nào?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 34;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (34, 'Giảm tốc độ và nhường đường cho người đi bộ, xe lăn của người khuyết tật qua đường đảm bảo an toàn.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (34, 'Quan sát, giảm tốc độ hoặc dừng lại để bảo đảm an toàn cho người đi bộ, xe lăn của người khuyết tật qua đường.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (34, 'Quan sát, tăng tốc độ và điều khiển phương tiện nhanh chóng đi qua.', 0, 3);

-- Question 35
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (35, 'ALL', 1, 35, 'Người điều khiển xe mô tô phải phải quan sát, giảm tốc độ hoặc dừng lại để bảo đảm an toàn trong các trường hợp nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 3)', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 35;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (35, 'Đường hẹp, đường vòng, đường quanh co, đường đèo, dốc.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (35, 'Nơi cầu, cống hẹp, đập tràn, đường ngầm, hầm chui, hầm đường bộ.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (35, 'Trời mưa, gió, sương, khói, bụi, mặt đường trơn trượt, lầy lội, có nhiều đất đá, vật liệu rơi vãi ảnh hưởng đến an toàn giao thông đường bộ.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (35, 'Cả ba ý trên.', 1, 4);

-- Question 36
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (36, 'ALL', 1, 36, 'Khi gặp hiệu lệnh điều khiển của Cảnh sát giao thông như hình dưới đây thì người tham gia giao thông đường bộ phải đi như thế nào là đúng quy tắc giao thông?', '/question-images/q36.jpg', '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 3)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 36;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (36, 'Người tham gia giao thông đường bộ ở các hướng phải dừng lại.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (36, 'Người tham gia giao thông đường bộ ở các hướng được đi theo chiều gậy chỉ của Cảnh sát giao thông.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (36, 'Người tham gia giao thông đường bộ ở phía trước và phía sau người điều khiển được đi tất cả các hướng; người tham gia giao thông đường bộ ở phía bên phải và phía bên trái người điều khiển phải dừng lại.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (36, 'Người tham gia giao thông đường bộ ở phía trước và phía sau người điều khiển phải dừng lại; người tham gia giao thông đường bộ ở phía bên phải và phía bên trái người điều khiển được đi tất cả các hướng.', 1, 4);

-- Question 37
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (37, 'ALL', 1, 37, 'Khi gặp hiệu lệnh điều khiển của Cảnh sát giao thông như hình dưới đây thì người tham gia giao thông đường bộ phải đi như thế nào là đúng quy tắc giao thông?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 37;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (37, 'Người tham gia giao thông đường bộ ở phía sau Cảnh sát giao thông được đi, các hướng khác phải dừng lại.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (37, 'Người tham gia giao thông đường bộ được rẽ phải theo chiều mũi tên màu xanh ở bục Cảnh sát giao thông.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (37, 'Người tham gia giao thông đường bộ ở tất cả các hướng phải dừng lại, trừ các xe đã ở trong khu vực giao nhau.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (37, 'Người tham gia giao thông đường bộ ở phía trước Cảnh sát giao thông phải dừng lại, các hướng khác được đi.', 0, 4);

-- Question 38
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (38, 'ALL', 1, 38, 'Khi hiệu lệnh của người điều khiển giao thông trái với tín hiệu đèn giao thông hoặc biển báo hiệu đường bộ thì người tham gia giao thông đường bộ phải chấp hành báo hiệu đường bộ nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 38;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (38, 'Theo hiệu lệnh của người điều khiển giao thông.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (38, 'Theo tín hiệu đèn giao thông.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (38, 'Theo biển báo hiệu đường bộ.', 0, 3);

-- Question 39
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (39, 'ALL', 1, 39, 'Khi ở một vị trí vừa có biển báo hiệu đặt cố định vừa có biển báo hiệu tạm thời mà hai biển có ý nghĩa khác nhau, người tham gia giao thông đường bộ phải chấp hành hiệu lệnh của biển báo hiệu nào?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 3)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 39;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (39, 'Biển báo hiệu đặt cố định.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (39, 'Biển báo hiệu tạm thời.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (39, 'Theo quyết định của người tham gia giao thông nhưng phải bảo đảm an toàn.', 0, 3);

-- Question 40
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (40, 'ALL', 1, 40, 'Tại nơi đường giao nhau, khi đèn điều khiển giao thông có tín hiệu màu vàng, người điều khiển phương tiện tham gia giao thông phải chấp hành như thế nào là đúng quy tắc giao thông?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 40;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (40, 'Dừng lại trước vạch dừng; trường hợp đang đi trên vạch dừng hoặc đã đi qua vạch dừng mà tín hiệu đèn màu vàng thì được đi tiếp; trường hợp tín hiệu đèn màu vàng nhấp nháy, người điều khiển phương tiện tham gia giao thông đường bộ được đi nhưng phải quan sát, giảm tốc độ hoặc dừng lại nhường đường cho người đi bộ, xe lăn của người khuyết tật qua đường hoặc các phương tiện khác.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (40, 'Tăng tốc độ nhanh chóng vượt qua nút giao.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (40, 'Quan sát, giảm tốc độ, từ từ vượt qua nút giao.', 0, 3);

-- Question 41
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (41, 'ALL', 1, 41, 'Người lái xe trên đường cần chấp hành quy định về tốc độ tối đa như thế nào?', NULL, '💡 Tốc độ: Khu dân cư ≤50km/h | Ngoài đô thị ≤80km/h | Cao tốc ≤120km/h', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 41;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (41, 'Chỉ lớn hơn tốc độ tối đa cho phép khi đường vắng.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (41, 'Chỉ lớn hơn tốc độ tối đa cho phép khi vào ban đêm.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (41, 'Không vượt quá tốc độ tối đa cho phép.', 1, 3);

-- Question 42
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (42, 'ALL', 1, 42, 'Khi chở trẻ em dưới 10 tuổi và chiều cao dưới 1,35 mét trên xe ô tô, người lái xe phải thực hiện quy tắc nào dưới đây để bảo đảm an toàn?', NULL, '👶 Nhớ: Trẻ em <10 tuổi và <1.35m cần ghế chuyên dụng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 42;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (42, 'Không được cho trẻ em ngồi cùng hàng ghế với người lái xe, trừ loại xe ô tô chỉ có một hàng ghế; người lái xe phải sử dụng, hướng dẫn sử dụng thiết bị an toàn phù hợp cho trẻ em.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (42, 'Cho trẻ em ngồi cùng hàng ghế với người lái xe, người lái xe phải sử dụng, hướng dẫn sử dụng thiết bị an toàn phù hợp cho trẻ em.', 0, 2);

-- Question 43
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (43, 'ALL', 1, 43, 'Phương tiện tham gia giao thông đường bộ di chuyển với tốc độ thấp hơn phải đi như thế nào?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 3)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 43;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (43, 'Đi về bên trái theo chiều đi của mình.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (43, 'Đi về bên phải theo chiều đi của mình.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (43, 'Đi ở bất cứ bên nào nhưng phải bấm đèn cảnh báo nguy hiểm để báo hiệu cho các phương tiện khác.', 0, 3);

-- Question 44
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (44, 'ALL', 1, 44, 'Trên một chiều đường có vạch kẻ phân làn đường, người lái xe cơ giới, xe máy chuyên dùng phải điều khiển xe đi trên làn đường nào?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 3)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 44;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (44, 'Đi trên làn đường bên phải trong cùng.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (44, 'Đi trên làn đường bên trái.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (44, 'Đi ở bất cứ làn nào nhưng phải bảo đảm tốc độ cho phép.', 0, 3);

-- Question 45
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (45, 'ALL', 1, 45, 'Người lái xe phải giảm tốc độ, có tín hiệu rẽ phải và đi sát về bên phải của phần đường xe chạy trong các trường hợp nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 45;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (45, 'Khi xe chạy phía trước có tín hiệu vượt xe khác.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (45, 'Khi phía trước có xe chạy ngược chiều.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (45, 'Khi xe sau xin vượt nếu đủ điều kiện an toàn.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (45, 'Khi xe sau có tín hiệu vượt bên phải.', 0, 4);

-- Question 46
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (46, 'ALL', 1, 46, 'Vượt xe là gì?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 46;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (46, 'Là tình huống giao thông trên đường mà mỗi chiều đường xe chạy chỉ có một làn đường dành cho xe cơ giới, xe đi phía sau di chuyển sang bên trái để di chuyển lên trước xe phía trước.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (46, 'Là tình huống giao thông trên đường có từ hai làn đường dành cho xe cơ giới cùng chiều trở lên được phân biệt bằng vạch kẻ đường, xe đi phía sau di chuyển lên trước xe phía trước theo quy tắc sử dụng làn đường.', 0, 2);

-- Question 47
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (47, 'ALL', 1, 47, 'Người lái xe được phép vượt xe trên cầu hẹp có một làn đường, đường cong có tầm nhìn bị hạn chế hay không?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 47;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (47, 'Được phép vượt khi đường vắng.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (47, 'Không được phép vượt.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (47, 'Được phép vượt khi có việc gấp.', 0, 3);

-- Question 48
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (48, 'ALL', 1, 48, 'Muốn vượt xe phía trước, người lái xe mô tô phải có tín hiệu như thế nào dưới đây để bảo đảm an toàn?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 48;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (48, 'Bấm còi liên tục để xe phía trước biết xe mình xin vượt.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (48, 'Rú ga liên tục để xe phía trước biết xe mình xin vượt.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (48, 'Báo hiệu nhấp nháy bằng đèn chiếu sáng phía trước hoặc còi.', 1, 3);

-- Question 49
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (49, 'ALL', 1, 49, 'Khi lái xe trong khu đông dân cư, khu vực cơ sở khám bệnh, chữa bệnh trừ các khu vực có biển cấm sử dụng còi, người lái xe được sử dụng còi trong thời gian nào?', NULL, '⏱️ Thời gian lái xe: Tối đa 10 giờ/ngày | Liên tục không quá 4 giờ phải nghỉ', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 49;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (49, 'Từ 22 giờ ngày hôm trước đến 05 giờ ngày hôm sau.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (49, 'Từ 05 giờ đến 22 giờ.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (49, 'Từ 23 giờ ngày hôm trước đến 05 giờ sáng hôm sau.', 0, 3);

-- Question 50
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (50, 'ALL', 1, 50, 'Phương tiện tham gia giao thông đường bộ chỉ được sử dụng tín hiệu còi trong các trường hợp nào sau đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 50;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (50, 'Để báo hiệu cho người tham gia giao thông đường bộ khi xuất hiện tình huống có thể mất an toàn giao thông hoặc báo hiệu chuẩn bị vượt xe.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (50, 'Để báo hiệu cho người tham gia giao thông đường bộ từ 22 giờ ngày hôm trước đến 05 giờ ngày hôm sau trong khu đông dân cư, khu vực cơ sở khám bệnh, chữa bệnh, trừ xe ưu tiên.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (50, 'Cả hai ý trên.', 0, 3);

-- Question 51
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (51, 'ALL', 1, 51, 'Người lái xe sử dụng đèn như thế nào khi đi trên các đoạn đường qua khu đông dân cư có hệ thống chiếu sáng đang hoạt động?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 51;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (51, 'Chỉ bật đèn chiếu xa (đèn pha).', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (51, 'Bật đèn chiếu xa (đèn pha) khi đường vắng, bật đèn chiếu gần (đèn cốt) khi có xe đi ngược chiều.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (51, 'Chỉ bật đèn chiếu gần (đèn cốt).', 1, 3);

-- Question 52
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (52, 'ALL', 1, 52, 'Khi điều khiển phương tiện tham gia giao thông, hành vi nào sau đây bị cấm?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 52;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (52, 'Dùng tay cầm và sử dụng điện thoại hoặc thiết bị điện tử khác.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (52, 'Chỉ được chở người trên thùng xe ô tô chở hàng trong trường hợp chở người đi làm nhiệm vụ cứu nạn, cứu hộ, phòng, chống thiên tai, dịch bệnh hoặc thực hiện nhiệm vụ khẩn cấp.', 0, 2);

-- Question 53
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (53, 'ALL', 1, 53, 'Người lái xe không được vượt xe khác khi gặp trường hợp nào dưới đây?', NULL, '💡 \'Không được\' → Chọn hành vi bị cấm hoàn toàn', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 53;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (53, 'Trên cầu hẹp có một làn đường; nơi đường giao nhau, đường bộ giao nhau cùng mức với đường sắt; khi gặp xe ưu tiên.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (53, 'Trên cầu có từ 02 làn xe trở lên.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (53, 'Trên đường có 02 làn đường được phân chia làn bằng vạch kẻ nét đứt.', 0, 3);

-- Question 54
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (54, 'ALL', 1, 54, 'Nơi nào cấm quay đầu xe?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 54;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (54, 'Ở phần đường dành cho người đi bộ qua đường, trên cầu, đầu cầu, gầm cầu vượt, ngầm.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (54, 'Tại nơi đường bộ giao nhau cùng mức với đường sắt, đường hẹp, đường dốc, đoạn đường cong tầm nhìn bị che khuất, trên đường cao tốc, trong hầm đường bộ, trên đường một chiều.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (54, 'Cả hai ý trên.', 1, 3);

-- Question 55
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (55, 'ALL', 1, 55, 'Người lái xe không được quay đầu xe trong các trường hợp nào dưới đây?', NULL, '💡 \'Không được\' → Chọn hành vi bị cấm hoàn toàn', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 55;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (55, 'Ở phần đường dành cho người đi bộ qua đường, trên cầu, đầu cầu, trên đường cao tốc, tại nơi đường bộ giao nhau cùng mức với đường sắt,đường hẹp, đường dốc.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (55, 'Ở phía trước hoặc phía sau của phần đường dành cho người đi bộ qua đường, trên đường quốc lộ.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (55, 'Cả hai ý trên.', 0, 3);

-- Question 56
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (56, 'ALL', 1, 56, 'Trước khi cho xe chuyển hướng, người lái xe phải làm gì để bảo đảm an toàn giao thông?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 3)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 56;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (56, 'Phải quan sát, bảo đảm khoảng cách an toàn với xe phía sau.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (56, 'Giảm tốc độ và có tín hiệu báo hướng rẽ.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (56, 'Chuyển dần sang làn gần nhất với hướng rẽ. Khi bảo đảm an toàn, không gây trở ngại cho người và phương tiện khác mới được chuyển hướng.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (56, 'Cả ba ý trên.', 1, 4);

-- Question 57
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (57, 'ALL', 1, 57, 'Khi chuyển làn đường, người lái xe phải bật đèn tín hiệu báo rẽ như thế nào là đúng quy tắc giao thông?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 57;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (57, 'Khi bắt đầu chuyển làn đường.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (57, 'Trước khi thay đổi làn đường.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (57, 'Sau khi thay đổi làn đường.', 0, 3);

-- Question 58
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (58, 'ALL', 1, 58, 'Người lái xe không được lùi xe ở những khu vực nào dưới đây?', NULL, '💡 \'Không được\' → Chọn hành vi bị cấm hoàn toàn', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 58;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (58, 'Ở đường một chiều, khu vực cấm dừng, trên phần đường dành cho người đi bộ qua đường.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (58, 'Nơi đường bộ giao nhau, đường bộ giao nhau cùng mức với đường sắt.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (58, 'Nơi tầm nhìn bị che khuất, trong hầm đường bộ, trên đường cao tốc.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (58, 'Cả ba ý trên.', 1, 4);

-- Question 59
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (59, 'ALL', 1, 59, 'Người điều khiển phương tiện tham gia giao thông không được dừng xe, đỗ xe ở những vị trí nào sau đây?', NULL, '💡 \'Không được\' → Chọn hành vi bị cấm hoàn toàn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 59;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (59, 'Trên miệng cống thoát nước, miệng hầm của đường điện thoại, điện cao thế, chỗ dành riêng cho xe chữa cháy lấy nước.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (59, 'Trong phạm vi an toàn của đường sắt.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (59, 'Cả hai ý trên.', 1, 3);

-- Question 60
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (60, 'ALL', 1, 60, 'Trên đường phố, người điều khiển phương tiện tham gia giao thông đường bộ được dừng xe, đỗ xe sát theo lề đường, vỉa hè phía bên phải theo chiều đi của mình; bánh xe gần nhất không được cách xa lề đường, vỉa hè không quá bao nhiêu mét trong các trường hợp dưới đây và không gây cản trở, nguy hiểm cho người và phương tiện tham gia giao thông đường bộ?', NULL, '💡 \'Không được\' → Chọn hành vi bị cấm hoàn toàn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 60;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (60, '0,25 mét.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (60, '0,3 mét.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (60, '0,4 mét.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (60, '0,5 mét.', 0, 4);

-- Question 61
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (61, 'ALL', 1, 61, 'Khi dừng, đỗ xe trên đường phố hẹp, người lái xe ô tô phải dừng, đỗ xe ở vị trí cách xe ô tô đang đỗ ngược chiều khoảng cách tối thiểu là bao nhiêu mét trong các trường hợp dưới đây để bảo đảm an toàn?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 61;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (61, '10 mét.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (61, '15 mét.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (61, '20 mét.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (61, '25 mét.', 0, 4);

-- Question 62
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (62, 'ALL', 1, 62, 'Người điều khiển phương tiện tham gia giao thông đường bộ không được dừng xe, đỗ xe tại các vị trí nào sau đây?', NULL, '💡 \'Không được\' → Chọn hành vi bị cấm hoàn toàn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 62;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (62, 'Nơi có lề đường rộng hoặc khu đất ở bên ngoài phần đường xe chạy.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (62, 'Song song cùng chiều với một xe khác đang dừng, đỗ trên đường; trên đoạn đường cong hoặc gần đầu dốc mà tầm nhìn bị che khuất; bên trái đường một chiều.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (62, 'Cả hai ý trên.', 0, 3);

-- Question 63
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (63, 'ALL', 1, 63, 'Người điều khiển xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy có được phép sử dụng xe để kéo hoặc đẩy các phương tiện khác khi tham gia giao thông không?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 63;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (63, 'Được phép.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (63, 'Nếu phương tiện được kéo, đẩy có khối lượng nhỏ hơn phương tiện của mình.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (63, 'Tùy trường hợp.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (63, 'Không được phép.', 1, 4);

-- Question 64
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (64, 'ALL', 1, 64, 'Khi điều khiển xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy, những hành vi nào sau đây không được phép?', NULL, '💡 \'Không được\' → Chọn hành vi bị cấm hoàn toàn', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 64;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (64, 'Buông cả hai tay; đứng, nằm trên xe điều khiển xe; sử dụng chân chống hoặc vật khác quệt xuống đường khi xe đang chạy.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (64, 'Chở tối đa hai người phía sau khi chở người bệnh đi cấp cứu, áp giải người có hành vi vi phạm pháp luật, trẻ em dưới 12 tuổi và người già yếu hoặc người khuyết tật.', 0, 2);

-- Question 65
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (65, 'ALL', 1, 65, 'Khi điều khiển xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy, những hành vi nào sau đây không được phép?', NULL, '💡 \'Không được\' → Chọn hành vi bị cấm hoàn toàn', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 65;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (65, 'Buông cả hai tay; sử dụng xe để kéo, đẩy xe khác, vật khác; sử dụng chân chống hoặc vật khác quệt xuống đường khi xe đang chạy.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (65, 'Sử dụng xe để chở người hoặc hàng hóa; để chân chạm xuống đất khi khởi hành.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (65, 'Đội mũ bảo hiểm; chạy xe đúng tốc độ quy định và chấp hành đúng quy tắc giao thông đường bộ.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (65, 'Chở người ngồi sau dưới 16 tuổi.', 0, 4);

-- Question 66
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (66, 'ALL', 1, 66, 'Người được chở trên xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy khi tham gia giao thông đường bộ không được thực hiện hành vi nào sau đây?', NULL, '💡 \'Không được\' → Chọn hành vi bị cấm hoàn toàn', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 66;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (66, 'Mang, vác vật cồng kềnh.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (66, 'Bám, kéo hoặc đẩy các phương tiện khác.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (66, 'Dùng tay cầm điện thoại hoặc các thiết bị điện tử khác.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (66, 'Ý 1 và ý 2.', 1, 4);

-- Question 67
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (67, 'ALL', 1, 67, 'Người được chở trên xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy khi tham gia giao thông đường bộ có được bám, kéo hoặc đẩy các phương tiện khác không?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 67;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (67, 'Được phép.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (67, 'Được bám trong trường hợp phương tiện của mình bị hỏng.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (67, 'Được kéo, đẩy trong trường hợp phương tiện khác bị hỏng.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (67, 'Không được phép.', 1, 4);

-- Question 68
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (68, 'ALL', 1, 68, 'Người lái xe, người được chở trên xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy phải thực hiện quy định nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 2)', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 68;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (68, 'Đội mũ bảo hiểm theo đúng quy chuẩn kỹ thuật quốc gia và cài quai đúng quy cách.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (68, 'Người lái xe phải đội mũ bảo hiểm, người được chở trên xe không nhất thiết phải đội mũ bảo hiểm.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (68, 'Phải đội mũ bảo hiểm nhưng không nhất thiết phải cài quai.', 0, 3);

-- Question 69
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (69, 'ALL', 1, 69, 'Người lái xe mô tô hai bánh, xe gắn máy được phép chở tối đa hai người trong những trường hợp nào?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 69;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (69, 'Chở người bệnh đi cấp cứu; áp giải người có hành vi vi phạm pháp luật; trẻ em dưới 12 tuổi; người già yếu hoặc người khuyết tật.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (69, 'Người đã uống rượu, bia; người trong cơ thể có chất ma tuý.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (69, 'Cả hai ý trên.', 0, 3);

-- Question 70
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (70, 'ALL', 1, 70, 'Người lái xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy không được thực hiện các hành vi nào dưới đây?', NULL, '💡 \'Không được\' → Chọn hành vi bị cấm hoàn toàn', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 70;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (70, 'Đi xe dàn hàng ngang; buông cả hai tay.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (70, 'Sử dụng xe để kéo, đẩy xe khác, vật khác, dẫn dắt vật nuôi, mang, vác và chở vật cồng kềnh; chở người đứng trên xe, giá đèo hàng hoặc ngồi trên tay lái; xếp hàng hóa trên xe quá giới hạn quy định.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (70, 'Ngồi về một bên điều khiển xe; đứng, nằm trên xe điều khiển xe; thay người lái xe khi xe đang chạy; quay người về phía sau để điều khiển xe hoặc bịt mắt điều khiển xe; sử dụng chân chống hoặc vật khác quệt xuống đường khi xe đang chạy.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (70, 'Cả ba ý trên.', 1, 4);

-- Question 71
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (71, 'ALL', 1, 71, 'Người lái xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy không được thực hiện các hành vi nào sau đây?', NULL, '💡 \'Không được\' → Chọn hành vi bị cấm hoàn toàn', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 71;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (71, 'Đi xe dàn hàng ngang; đi xe vào phần đường dành cho người đi bộ và phương tiện khác.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (71, 'Sử dụng ô, thiết bị âm thanh, trừ thiết bị trợ thính.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (71, 'Cả hai ý trên.', 1, 3);

-- Question 72
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (72, 'ALL', 1, 72, 'Người lái xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy không được thực hiện hành vi nào sau đây?', NULL, '💡 \'Không được\' → Chọn hành vi bị cấm hoàn toàn', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 72;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (72, 'Đi trên phần đường, làn đường quy định, chấp hành hiệu lệnh của người điều khiển giao thông, đèn tín hiệu giao thông.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (72, 'Đi xe dàn hàng ngang, đi xe vào phần đường dành cho người đi bộ.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (72, 'Cả hai ý trên.', 0, 3);

-- Question 73
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (73, 'ALL', 1, 73, 'Người được chở trên xe mô tô hai bánh, xe mô tô ba bánh, xe gắn máy khi tham gia giao thông đường bộ có được sử dụng ô khi trời mưa hay không?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 73;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (73, 'Được sử dụng.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (73, 'Chỉ người ngồi sau được sử dụng.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (73, 'Không được sử dụng.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (73, 'Được sử dụng nếu không có áo mưa.', 0, 4);

-- Question 74
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (74, 'ALL', 1, 74, 'Người được chở trên xe mô tô có được kéo theo người đang điều khiển xe đạp hay không?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 74;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (74, 'Chỉ được phép nếu cả hai đội mũ bảo hiểm.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (74, 'Không được phép.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (74, 'Chỉ được thực hiện trên đường vắng.', 0, 3);

-- Question 75
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (75, 'ALL', 1, 75, 'Trường hợp người được chở trên xe mô tô, xe gắn máy, các loại xe tương tự xe mô tô và các loại xe tương tự xe gắn máy không đội "mũ bảo hiểm cho người đi mô tô, xe máy" hoặc không cài quai đúng quy cách (trừ trường hợp chở người bệnh đi cấp cứu, trẻ em dưới 06 tuổi, áp giải người có hành vi vi phạm pháp luật) thì việc xử phạt vi phạm hành chính được quy định như thế nào?', NULL, '👶 Nhớ: Trẻ em <10 tuổi và <1.35m cần ghế chuyên dụng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 75;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (75, 'Không bị xử phạt chỉ bị nhắc nhở.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (75, 'Người được chở không bị xử phạt, chỉ xử phạt người điều khiển xe mô tô, xe gắn máy.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (75, 'Người được chở bị xử phạt, không xử phạt người điều khiển xe mô tô, xe gắn máy.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (75, 'Xử phạt cả người điều khiển và người được chở trên xe mô tô, xe gắn máy.', 1, 4);

-- Question 76
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (76, 'ALL', 1, 76, 'Trong các trường hợp dưới đây, để bảo đảm an toàn khi tham gia giao thông, người lái xe mô tô cần thực hiện như thế nào?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 76;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (76, 'Phải đội mũ bảo hiểm theo đúng quy chuẩn kỹ thuật quốc gia và cài quai đúng quy cách, không sử dụng ô, điện thoại di động, thiết bị âm thanh (trừ thiết bị trợ thính).', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (76, 'Phải đội mũ bảo hiểm khi trời mưa gió hoặc trời quá nắng; có thể sử dụng ô, điện thoại di động, thiết bị âm thanh nhưng phải bảo đảm an toàn.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (76, 'Phải đội mũ bảo hiểm khi cảm thấy mất an toàn giao thông hoặc khi chuẩn bị di chuyển quãng đường xa.', 0, 3);

-- Question 77
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (77, 'ALL', 1, 77, 'Thứ tự xuống phà như thế nào là đúng quy tắc giao thông?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 77;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (77, 'Xe thô sơ, người đi bộ xuống trước, xe cơ giới, xe máy chuyên dùng xuống sau.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (77, 'Xe cơ giới, xe máy chuyên dùng xuống trước, xe thô sơ, người đi bộ xuống sau.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (77, 'Xe cơ giới, xe thô sơ xuống trước, xe máy chuyên dùng, người đi bộ xuống sau.', 0, 3);

-- Question 78
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (78, 'ALL', 1, 78, 'Trên đường có nhiều làn đường cho xe đi cùng chiều được phân biệt bằng vạch kẻ phân làn đường, người điều khiển phương tiện tham gia giao thông đường bộ phải cho xe đi như thế nào?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 2)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 78;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (78, 'Cho xe đi trên bất kỳ làn đường nào hoặc giữa 02 làn đường nếu không có xe đi phía trước; khi cần thiết phải chuyển làn đường, người lái xe phải quan sát xe phía trước để bảo đảm an toàn.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (78, 'Phải cho xe đi trong một làn đường và chỉ được chuyển làn đường ở những nơi cho phép; mỗi lần chuyển làn đường chỉ được phép chuyển sang một làn đường liền kề; khi chuyển làn đường phải có tín hiệu báo trước; phải quan sát bảo đảm khoảng cách an toàn với xe phía trước, phía sau và hai bên mới được chuyển làn.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (78, 'Phải cho xe đi trong một làn đường, chỉ được chuyển làn đường khi vượt xe phía trước cùng làn đường.', 0, 3);

-- Question 79
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (79, 'ALL', 1, 79, 'Trên đường một chiều có vạch kẻ phân làn đường, xe thô sơ và xe cơ giới phải đi như thế nào là đúng quy tắc giao thông?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 79;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (79, 'Xe thô sơ phải đi trên làn đường bên trái, xe cơ giới, xe máy chuyên dùng đi trên làn đường bên phải trong cùng.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (79, 'Xe thô sơ phải đi trên làn đường bên phải trong cùng, xe cơ giới, xe máy chuyên dùng đi trên làn đường bên trái.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (79, 'Xe thô sơ phải đi trên làn đường bên phải trong cùng, xe cơ giới, xe máy chuyên dùng được đi trên tất cả các làn đường.', 0, 3);

-- Question 80
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (80, 'ALL', 1, 80, 'Khi lái xe trong đô thị và khu đông dân cư trong thời gian từ 22 giờ ngày hôm trước đến 05 giờ ngày hôm sau, nếu cần vượt một xe khác, người lái xe phải báo hiệu như thế nào là đúng quy tắc giao thông?', NULL, '⏱️ Thời gian lái xe: Tối đa 10 giờ/ngày | Liên tục không quá 4 giờ phải nghỉ', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 80;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (80, 'Chỉ được báo hiệu bằng còi.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (80, 'Phải báo hiệu bằng cả còi và đèn.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (80, 'Chỉ được báo hiệu bằng đèn.', 1, 3);

-- Question 81
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (81, 'ALL', 1, 81, 'Khi điều khiển xe chạy trên đường, biết có xe sau xin vượt, nếu đủ điều kiện an toàn người điều khiển phương tiện phải làm gì?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 2)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 81;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (81, 'Tăng tốc độ và ra hiệu cho xe sau vượt, không được gây trở ngại cho xe xin vượt.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (81, 'Giảm tốc độ, có tín hiệu rẽ phải để báo hiệu cho người điều khiển phương tiện tham gia giao thông đường bộ phía sau biết được vượt và đi sát về bên phải của phần đường xe chạy cho đến khi xe sau đã vượt qua, không được cản trở đối với xe xin vượt.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (81, 'Cho xe đi sát về bên trái của phần đường xe chạy và ra hiệu cho xe sau vượt, không được gây trở ngại cho xe xin vượt.', 0, 3);

-- Question 82
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (82, 'ALL', 1, 82, 'Khi điều khiển xe chạy trên đường, biết có xe sau xin vượt, nếu không đủ điều kiện an toàn người điều khiển phương tiện phải làm gì?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 82;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (82, 'Có tín hiệu rẽ trái để báo hiệu cho người điều khiển phương tiện tham gia giao thông đường bộ phía sau biết là chưa được vượt.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (82, 'Tiếp tục đi cho đến khi đủ điều kiện an toàn, nếu xe sau vẫn xin vượt thì báo hiệu cho xe sau vượt.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (82, 'Tăng tốc độ để báo hiệu cho xe xin vượt biết là chưa được vượt.', 0, 3);

-- Question 83
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (83, 'ALL', 1, 83, 'Khi chuyển hướng, người lái xe, người điều khiển xe máy chuyên dùng phải làm gì để bảo đảm an toàn?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 83;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (83, 'Phải nhường đường cho người đi bộ, xe thô sơ, xe đi ngược chiều và chỉ chuyển hướng khi không gây trở ngại hoặc nguy hiểm cho người, phương tiện khác.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (83, 'Nhanh chóng chuyển hướng để không gây trở ngại hoặc nguy hiểm cho người, phương tiện khác.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (83, 'Ra tín hiệu chuyển hướng để yêu cầu các phương tiện khác dừng lại cho xe chuyển hướng di chuyển.', 0, 3);

-- Question 84
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (84, 'ALL', 1, 84, 'Trước khi chuyển hướng, người điều khiển phương tiện tham gia giao thông đường bộ phải thực hiện như thế nào để bảo đảm an toàn?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 2)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 84;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (84, 'Quan sát gương, nếu không có phương tiện gần hướng rẽ thì nhanh chóng chuyển hướng.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (84, 'Quan sát, bảo đảm khoảng cách an toàn với xe phía sau, giảm tốc độ và có tín hiệu báo hướng rẽ hoặc có tín hiệu bằng tay theo hướng rẽ đối với xe thô sơ không có đèn báo hướng rẽ, chuyển dần sang làn gần nhất với hướng rẽ. Tín hiệu báo hướng rẽ hoặc tín hiệu bằng tay phải sử dụng liên tục trong quá trình chuyển hướng. Khi bảo đảm an toàn, không gây trở ngại cho người và phương tiện khác mới được chuyển hướng.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (84, 'Quan sát gương, tăng tốc độ, ra tín hiệu và chuyển hướng.', 0, 3);

-- Question 85
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (85, 'ALL', 1, 85, 'Khi lùi xe, người điều khiển phương tiện tham gia giao thông đường bộ phải làm gì để bảo đảm an toàn?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 2)', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 85;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (85, 'Quan sát phía sau và cho lùi xe ở tốc độ chậm.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (85, 'Có tín hiệu báo lùi, nếu phía sau không có người hoặc phương tiện khác thì nhanh chóng lùi để bảo đảm an toàn.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (85, 'Phải quan sát hai bên và phía sau xe, có tín hiệu lùi và chỉ lùi xe khi bảo đảm an toàn.', 1, 3);

-- Question 86
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (86, 'ALL', 1, 86, 'Khi muốn lùi xe ở nơi có tầm nhìn bị che khuất, người lái xe phải xử lý như thế nào để đảm bảo an toàn?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 2)', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 86;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (86, 'Phải lùi thật chậm.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (86, 'Bấm còi 3 lần liên tiếp trước khi lùi.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (86, 'Không được lùi xe.', 1, 3);

-- Question 87
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (87, 'ALL', 1, 87, 'Trên đường không phân chia thành hai chiều xe chạy riêng biệt, người điều khiển phương tiện tham gia giao thông đường bộ phải tránh xe đi ngược chiều như thế nào để bảo đảm an toàn?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 3)', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 87;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (87, 'Giảm tốc độ và cho xe đi về bên phải theo chiều xe chạy của mình.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (87, 'Một trong hai xe phải dừng lại cho xe kia đi qua mới được đi.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (87, 'Tăng tốc độ, cho xe đi về bên phải theo chiều xe chạy của mình để nhanh chóng vượt qua.', 0, 3);

-- Question 88
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (88, 'ALL', 1, 88, 'Khi tránh xe đi ngược chiều, các xe phải nhường đường như thế nào là đúng quy tắc giao thông?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 88;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (88, 'Nơi đường hẹp chỉ đủ cho một xe chạy và có chỗ tránh xe thì xe nào ở gần chỗ tránh hơn phải vào vị trí tránh, nhường đường cho xe đi ngược chiều.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (88, 'Xe xuống dốc phải nhường đường cho xe lên dốc.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (88, 'Xe có chướng ngại vật phía trước phải nhường đường cho xe không có chướng ngại vật phía trước.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (88, 'Cả ba ý trên.', 1, 4);

-- Question 89
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (89, 'ALL', 1, 89, 'Khi đang lái xe xuống dốc gặp một xe đang đi lên dốc, người lái xe phải làm gì?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 89;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (89, 'Tiếp tục đi và phát tín hiệu cho xe lên dốc nhường đường cho xe bạn.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (89, 'Nhường đường cho xe lên dốc.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (89, 'Chỉ nhường đường khi xe lên dốc nháy đèn.', 0, 3);

-- Question 90
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (90, 'ALL', 1, 90, 'Người lái xe phải làm gì để bảo đảm an toàn khi lái xe trên đường cong có tầm nhìn bị hạn chế?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 2)', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 90;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (90, 'Quan sát, giảm tốc độ hoặc dừng lại để bảo đảm an toàn.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (90, 'Đi sang làn đường của xe ngược chiều để mở rộng tầm nhìn và vượt xe khác.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (90, 'Cho xe đi sát bên phải làn đường, bật tín hiệu báo hiệu để vượt bên phải xe khác.', 0, 3);

-- Question 91
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (91, 'ALL', 1, 91, 'Tại nơi đường giao nhau, người lái xe đang đi trên đường không ưu tiên, đường nhánh phải nhường đường như thế nào là đúng quy tắc giao thông?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 3)', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 91;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (91, 'Nhường đường cho xe đi ở bên phải mình tới.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (91, 'Nhường đường cho xe đi ở bên trái mình tới.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (91, 'Nhường đường cho xe đi trên đường ưu tiên hoặc đường chính từ bất kỳ hướng nào tới.', 1, 3);

-- Question 92
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (92, 'ALL', 1, 92, 'Tại nơi đường giao nhau có báo hiệu đi theo vòng xuyến, người lái xe phải nhường đường như thế nào là đúng quy tắc giao thông?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 92;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (92, 'Nhường đường cho xe đi đến từ bên phải.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (92, 'Nhường đường cho xe đi đến từ bên trái.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (92, 'Không phải nhường đường.', 0, 3);

-- Question 93
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (93, 'ALL', 1, 93, 'Tại nơi đường giao nhau không có báo hiệu đi theo vòng xuyến, người điều khiển phương tiện phải nhường đường như thế nào là đúng quy tắc giao thông?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 93;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (93, 'Phải nhường đường cho xe đi đến từ bên phải.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (93, 'Xe báo hiệu xin đường trước, xe đó được đi trước.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (93, 'Phải nhường đường cho xe đi đến từ bên trái.', 0, 3);

-- Question 94
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (94, 'ALL', 1, 94, 'Người lái xe phải nhanh chóng giảm tốc độ, đi sát lề đường bên phải hoặc dừng lại để nhường đường cho các loại xe nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 2)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 94;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (94, 'Xe chữa cháy của Cảnh sát phòng cháy, chữa cháy và cứu nạn, cứu hộ và xe chữa cháy của các lực lượng khác; xe của lực lượng quân sự, công an và kiểm sát; đoàn xe có xe Cảnh sát giao thông dẫn đường; xe cứu thương; xe hộ đê không có tín hiệu ưu tiên theo quy định.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (94, 'Xe ưu tiêngồm xe chữa cháy của Cảnh sát phòng cháy, chữa cháy và cứu nạn, cứu hộ và xe chữa cháy của các lực lượng khác được huy động đi làm nhiệm vụ chữa cháy; xe của lực lượng quân sự, công an và kiểm sát đi làm nhiệm vụ khẩn cấp; đoàn xe có xe Cảnh sát giao thông dẫn đường; xe cứu thương đi làm nhiệm vụ cấp cứu; xe hộ đê đi làm nhiệm vụ; xe đi làm nhiệm vụ cứu nạn, cứu hộ, khắc phục sự cố thiên tai, dịch bệnh hoặc xe đi làm nhiệm vụ trong tình trạng khẩn cấp theo quy định của pháp luật; đoàn xe tang.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (94, 'Xe ô tô, xe máy, đoàn xe đang diễu hành có tổ chức có báo tín hiệu xin vượt bằng còi và đèn.', 0, 3);

-- Question 95
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (95, 'ALL', 1, 95, 'Xe ưu tiên (trừ đoàn xe tang) tham gia giao thông đường bộ khi đi làm nhiệm vụ được quyền ưu tiên nào dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 95;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (95, 'Không bị hạn chế tốc độ.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (95, 'Được phép đi không phụ thuộc vào tín hiệu đèn giao thông, đi vào đường ngược chiều, các đường khác có thể đi được.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (95, 'Được đi ngược chiều trên làn dừng xe khẩn cấp trên đường cao tốc.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (95, 'Cả ba ý trên.', 1, 4);

-- Question 96
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (96, 'ALL', 1, 96, 'Khi có tín hiệu của xe ưu tiên, người và phương tiện tham gia giao thông đường bộ phải tuân thủ quy định nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 96;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (96, 'Giảm tốc độ, đi sát lề đường bên phải hoặc dừng lại để nhường đường.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (96, 'Tăng tốc độ và đi sát lề đường bên phải để nhường đường.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (96, 'Giảm tốc độ, đi sát lề đường bên trái để nhường đường.', 0, 3);

-- Question 97
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (97, 'ALL', 1, 97, 'Khi đang lái xe, phía trước có một xe Cảnh sát giao thông không phát tín hiệu ưu tiên, người lái xe có được phép vượt hay không?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 97;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (97, 'Không được vượt.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (97, 'Được phép vượt ở phần đường dành cho người đi bộ qua đường.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (97, 'Được vượt khi bảo đảm an toàn.', 1, 3);

-- Question 98
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (98, 'ALL', 1, 98, 'Khi đang lái xe, phía trước có một xe cứu thương đang phát tín hiệu ưu tiên, người lái xe có được phép vượt hay không?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 98;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (98, 'Không được vượt.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (98, 'Được vượt khi đang đi trên cầu.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (98, 'Được phép vượt khi đi qua nơi giao nhau có ít phương tiện cùng tham gia giao thông.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (98, 'Được vượt khi bảo đảm an toàn.', 0, 4);

-- Question 99
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (99, 'ALL', 1, 99, 'Khi tới đường ngang không có người gác, chắn đường bộ, chuông, đèn tín hiệu, người tham gia giao thông đường bộ phải làm gì để bảo đảm an toàn?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 99;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (99, 'Dừng lại về bên phải đường của mình, trước vạch dừng xe và quan sát hai phía, khi không có phương tiện giao thông đường sắt tới mới được đi qua.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (99, 'Quan sát hai phía, khi không có phương tiện giao thông đường sắt tới thì nhanh chóng đi qua.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (99, 'Dừng lại khoảng cách tối thiểu 3 mét tính từ ray đường sắt gần nhất, khi không có phương tiện giao thông đường sắt tới thì nhanh chóng đi qua.', 0, 3);

-- Question 100
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (100, 'ALL', 1, 100, 'Tại đường ngang, cầu chung đường sắt, khi có hiệu lệnh của nhân viên gác chắn, đèn đỏ sáng nhấp nháy, chuông kêu, chắn đường bộ đang dịch chuyển hoặc đã đóng, người tham gia giao thông đường bộ phải làm gì để bảo đảm an toàn?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 100;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (100, 'Dừng lại về bên trái đường của mình, trước vạch dừng xe.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (100, 'Dừng lại giữa đường của mình, trước vạch dừng xe.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (100, 'Dừng lại về bên phải đường của mình, trước vạch dừng xe.', 1, 3);

-- Question 101
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (101, 'ALL', 1, 101, 'Khi xe ô tô bị hư hỏng, bị tai nạn trên đường ngang, cầu chung đường sắt mà không thể di chuyển ngay khỏi phạm vi an toàn đường sắt, người lái xe và người có mặt xử lý như thế nào là đúng quy định?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 101;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (101, 'Người lái xe và người có mặt phải ngay lập tức báo hiệu để dừng tàu, thực hiện các biện pháp bảo đảm an toàn.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (101, 'Để xe lại, tìm cách báo cho người quản lý đường sắt, nhà ga nơi gần nhất.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (101, 'Không di chuyển phương tiện, tự khắc phục sửa chữa.', 0, 3);

-- Question 102
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (102, 'ALL', 1, 102, 'Người tham gia giao thông đường bộ phải dừng lại về bên phải đường của mình trước vạch dừng xe tại đường ngang, cầu chung đường sắt khi có báo hiệu nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 3)', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 102;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (102, 'Hiệu lệnh của nhân viên gác chắn.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (102, 'Đèn đỏ sáng nhấp nháy, chuông kêu.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (102, 'Chắn đường bộ đang dịch chuyển hoặc đã đóng.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (102, 'Cả ba ý trên.', 1, 4);

-- Question 103
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (103, 'ALL', 1, 103, 'Người điều khiển phương tiện tham gia giao thông trong hầm đường bộ ngoài việc phải tuân thủ các quy tắc giao thông còn phải thực hiện những quy định nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 103;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (103, 'Xe cơ giới, xe máy chuyên dùng phải bật đèn chiếu gần; xe thô sơ phải bậtđèn hoặc có vật phát sáng báo hiệu; không dừng xe, đỗ xe trong hầm đường bộ; trường hợp gặp sự cố kỹ thuật hoặc bất khả kháng khác buộc phải dừng xe, đỗ xe, người lái xe, người điều khiển xe máy chuyên dùng phải đưa xe vào vị trí dừng xe, đỗ xe khẩn cấp, nếu không di chuyển được, phải có báo hiệu bằng đèn khẩn cấp và đặt biển hoặc đèn cảnh báo về phía sau xe khoảng cách bảo đảm an toàn.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (103, 'Xe cơ giới, xe máy chuyên dùng phải bật đèn chiếu xa; được dừng xe, đỗ xe khi cần thiết.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (103, 'Phải cho xe chạy trên một làn đường và chỉ chuyển làn ở nơi được phép; được quay đầu xe, lùi xe khi cần thiết.', 0, 3);

-- Question 104
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (104, 'ALL', 1, 104, 'Việc nối giữa xe kéo với xe được kéo trong trường hợp hệ thống hãm của xe được kéo không còn hiệu lực thì xe kéo nhau phải nối bằng cách nào?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 104;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (104, 'Nối bằng dây cáp có độ dài 6 mét.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (104, 'Nối bằng dây cáp có độ dài 8 mét.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (104, 'Nối bằng thanh nối cứng.', 1, 3);

-- Question 105
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (105, 'ALL', 1, 105, 'Xe kéo rơ moóc, xe ô tô đầu kéo khi tham gia giao thông đường bộ phải tuân thủ quy tắc giao thông nào ghi ở dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 105;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (105, 'Chỉ được kéo rơ moóc, sơ mi rơ moóc phù hợp với thiết kế của xe; việc kết nối xe kéo với rơ moóc, xe ô tô đầu kéo với sơ mi rơ moóc phải bảo đảm chắc chắn, an toàn.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (105, 'Phải có tổng trọng lượng tương đương tổng trọng lượng của rơ moóc hoặc phải có hệ thống hãm có hiệu lực cho rơ moóc.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (105, 'Phải được lắp phanh phụ theo quy định để đảm bảo an toàn.', 0, 3);

-- Question 106
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (106, 'ALL', 1, 106, 'Luật Trật tự, an toàn giao thông đường bộ quy định về xe kéo xe, xe kéo rơ moóc và xe ô tô đầu kéo kéo sơ mi rơ moóc như thế nào dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 106;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (106, 'Một xe ô tô được kéo theo nhiều xe ô tô hoặc xe máy chuyên dùng khác khi xe được kéo không tự chạy được (trừ trường hợp xe vận chuyển hàng siêu trường, siêu trọng).', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (106, 'Xe được kéo phải có người điều khiển và hệ thống lái của xe đó phải còn hiệu lực; việc nối xe kéo với xe được kéo phải bảo đảm chắc chắn, an toàn; trường hợp hệ thống hãm của xe được kéo không còn hiệu lực thì xe kéo nhau phải nối bằng thanh nối cứng. Phía trước của xe kéo và phía sau của xe được kéo phải có biển báo hiệu, có đèn cảnh báo nhấp nháy màu vàng.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (106, 'Cả hai ý trên.', 0, 3);

-- Question 107
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (107, 'ALL', 1, 107, 'Người điều khiển phương tiện tham gia giao thông đường bộ phải quan sát, giảm tốc độ hoặc dừng lại để bảo đảm an toàn trong các trường hợp nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 107;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (107, 'Có báo hiệu cảnh báo nguy hiểm hoặc có chướng ngại vật trên đường; chuyển hướng xe chạy hoặc tầm nhìn bị hạn chế.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (107, 'Nơi cầu, cống hẹp, đập tràn, đường ngầm, hầm chui, hầm đường bộ; có vật nuôi đi trên đường hoặc chăn thả ở ven đường.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (107, 'Điểm dừng xe, đỗ xe trên đường bộ có khách đang lên, xuống xe.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (107, 'Cả ba ý trên.', 1, 4);

-- Question 108
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (108, 'ALL', 1, 108, 'Trên đường mà mỗi chiều đường xe chạy chỉ có một làn đường dành cho xe cơ giới, người lái xe không được vượt xe khác trong trường hợp nào dưới đây?', NULL, '💡 \'Không được\' → Chọn hành vi bị cấm hoàn toàn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 108;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (108, 'Có chướng ngại vật phía trước, xe chạy phía trước có tín hiệu vượt xe khác.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (108, 'Xe chạy phía trước đã có tín hiệu rẽ phải và tránh về bên phải.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (108, 'Cả hai ý trên.', 0, 3);

-- Question 109
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (109, 'ALL', 1, 109, 'Người lái xe được phép vượt xe khác về bên phải trong trường hợp nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 109;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (109, 'Xe phía trước có tín hiệu rẽ trái hoặc đang rẽ trái hoặc khi xe chuyên dùng đang làm việc trên đường mà không thể vượt bên trái.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (109, 'Xe phía trước đang đi sát lề đường bên trái.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (109, 'Cả hai ý trên.', 0, 3);

-- Question 110
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (110, 'ALL', 1, 110, 'Khi có xe xin vượt, người lái xe mô tô xử lý như thế nào nếu đủ điều kiện an toàn cho xe phía sau vượt?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 110;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (110, 'Giảm tốc độ, có tín hiệu rẽ phải để báo hiệu cho người điều khiển phương tiện tham gia giao thông đường bộ phía sau biết được vượt và đi sát về bên phải của phần đường xe chạy cho đến khi xe sau đã vượt qua, không được cản trở đối với xe xin vượt.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (110, 'Lái xe vào lề đường bên trái và giảm tốc độ để xe phía sau vượt qua, không được gây trở ngại đối với xe xin vượt.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (110, 'Tăng tốc độ, đi sát về bên phải của phần đường xe chạy cho đến khi xe sau đã vượt qua.', 0, 3);

-- Question 111
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (111, 'ALL', 1, 111, 'Những trường hợp nào dưới đây không được đi trên đường cao tốc, trừ người, phương tiện giao thông đường bộ và thiết bị phục vụ việc quản lý, bảo trì đường cao tốc?', NULL, '💡 \'Không được\' → Chọn hành vi bị cấm hoàn toàn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 111;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (111, 'Xe máy chuyên dùng có tốc độ thiết kế nhỏ hơn tốc độ tối thiểu quy định đối với đường cao tốc, xe chở người bốn bánh có gắn động cơ, xe chở hàng bốn bánh có gắn động cơ, xe mô tô, xe gắn máy, các loại xe tương tự xe mô tô, xe gắn máy, xe thô sơ, người đi bộ.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (111, 'Xe máy chuyên dùng có tốc độ thiết kế lớn hơn tốc độ tối thiểu quy định đối với đường cao tốc.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (111, 'Xe ô tô và xe máy chuyên dùng có tốc độ thiết kế lớn hơn 80 km/h.', 0, 3);

-- Question 112
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (112, 'ALL', 1, 112, 'Khi tham gia giao thông trên đường cao tốc, xe ưu tiên đi làm nhiệm vụ khẩn cấp được đi ngược chiều trong trường hợp nào dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 112;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (112, 'Được đi ngược chiều bất cứ làn đường nào của đường cao tốc có thể đi được.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (112, 'Chỉ được đi ngược chiều trên làn dừng xe khẩn cấp.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (112, 'Chỉ được đi ngược chiều trên làn đường sát dải phân cách của đường cao tốc.', 0, 3);

-- Question 113
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (113, 'ALL', 1, 113, 'Khi tham gia giao thông trên đường cao tốc, người lái xe không được thực hiện hành vi nào sau đây?', NULL, '💡 \'Không được\' → Chọn hành vi bị cấm hoàn toàn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 113;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (113, 'Dừng, đỗ xe trên phần đường xe chạy, trừ trường hợp xe không thể di chuyển được vào làn đường khẩn cấp.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (113, 'Lùi xe, quay đầu xe.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (113, 'Cả hai ý trên.', 1, 3);

-- Question 114
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (114, 'ALL', 1, 114, 'Khi xe gặp sự cố kỹ thuật trên đường cao tốc, bạn phải xử lý như thế nào để bảo đảm an toàn giao thông?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 3)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 114;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (114, 'Bật đèn tín hiệu khẩn cấp, dừng xe ngay lập tức và đặt biển báo hiệu nguy hiểm để cảnh báo cho các xe khác.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (114, 'Bật tín hiệu khẩn cấp, lập tức đưa xe vào làn đường xe chạy bên phải trong cùng, đặt biển báo hiệu nguy hiểm để cảnh báo cho các xe khác.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (114, 'Dừng xe, đỗ xe ở làn dừng khẩn cấp cùng chiều xe chạy và phải có báo hiệu bằng đèn khẩn cấp; trường hợp xe không thể di chuyển được vào làn dừng khẩn cấp, phải có báo hiệu bằng đèn khẩn cấp và đặt biển hoặc đèn cảnh báo về phía sau xe khoảng cách tối thiểu 150 mét, nhanh chóng báo cho cơ quan Cảnh sát giao thông thực hiện nhiệm vụ bảo đảm trật tự, an toàn giao thông trên tuyến hoặc cơ quan quản lý đường cao tốc.', 1, 3);

-- Question 115
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (115, 'ALL', 1, 115, 'Trên đường cao tốc, người lái xe xử lý như thế nào khi đã vượt quá lối ra của đường định rẽ?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 115;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (115, 'Quay đầu xe, chạy trên lề đường có lối ra và rẽ khỏi đường cao tốc.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (115, 'Lùi xe trên lề đường có lối ra và rẽ khỏi đường cao tốc.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (115, 'Tiếp tục lái xe và rẽ ở lối ra tiếp theo.', 1, 3);

-- Question 116
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (116, 'ALL', 1, 116, 'Khi xảy ra ùn tắc trên đường cao tốc có làn dừng xe khẩn cấp, người lái xe có được cho xe chạy ở làn dừng xe khẩn cấp để nhanh chóng thoát khỏi khu vực ùn tắc không (trừ xe ưu tiên)?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 116;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (116, 'Có.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (116, 'Không.', 1, 2);

-- Question 117
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (117, 'ALL', 1, 117, 'Khi chuẩn bị nhập vào làn đường của đường cao tốc, người lái xe, người điều khiển xe máy chuyên dùng phải thực hiện như thế nào là đúng quy tắc giao thông?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 3)', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 117;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (117, 'Có tín hiệu xin vào và phải nhường đường cho xe đang chạy trên đường.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (117, 'Quan sát xe phía sau bảo đảm khoảng cách an toàn mới cho xe nhập vào làn đường sát bên phải.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (117, 'Nếu có làn đường tăng tốc thì phải cho xe chạy trên làn đường đó trước khi nhập vào làn đường của đường cao tốc.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (117, 'Cả ba ý trên.', 1, 4);

-- Question 118
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (118, 'ALL', 1, 118, 'Theo quy định về độ tuổi, người đủ bao nhiêu tuổi trở lên thì được cấp giấy phép lái xe ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế trên 3.500 kg đến 7.500 kg; các loại xe ô tô tải quy định cho giấy phép lái xe hạng C1 kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg?', NULL, '👶 Nhớ: Trẻ em <10 tuổi và <1.35m cần ghế chuyên dụng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 118;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (118, '18 tuổi.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (118, '17 tuổi.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (118, '16 tuổi.', 0, 3);

-- Question 119
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (119, 'ALL', 1, 119, 'Theo quy định về độ tuổi, người đủ bao nhiêu tuổi trở lên thì được cấp giấy phép lái xe mô tô hai bánh có dung tích xi lanh đến 125 cm3 và xe ô tô chở người đến 8 chỗ (không kể chỗ của người lái xe); xe ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế đến 3.500 kg?', NULL, '👶 Nhớ: Trẻ em <10 tuổi và <1.35m cần ghế chuyên dụng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 119;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (119, '16 tuổi.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (119, '17 tuổi', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (119, '18 tuổi.', 1, 3);

-- Question 120
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (120, 'ALL', 1, 120, 'Theo quy định về độ tuổi, người lái xe ô tô chở người (kể cả xe buýt) trên 29 chỗ (không kể chỗ của người lái xe); xe ô tô chở người giường nằm; các loại xe ô tô chở người quy định cho giấy phép lái xe hạng D kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg phải đủ bao nhiêu tuổi trở lên?', NULL, '👶 Nhớ: Trẻ em <10 tuổi và <1.35m cần ghế chuyên dụng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 120;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (120, '23 tuổi.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (120, '24 tuổi.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (120, '27 tuổi.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (120, '30 tuổi.', 0, 4);

-- Question 121
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (121, 'ALL', 1, 121, 'Tuổi tối đa của người lái xe ô tô chở người (kể cả xe buýt) trên 29 chỗ (không kể chỗ của người lái xe), xe ô tô chở người giường nằm là bao nhiêu tuổi?', NULL, '👶 Nhớ: Trẻ em <10 tuổi và <1.35m cần ghế chuyên dụng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 121;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (121, 'Đủ 55 tuổi đối với nam và đủ 50 tuổi đối với nữ.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (121, 'Đủ 55 tuổi đối với nam và nữ.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (121, 'Đủ 57 tuổi đối với nam và đủ 55 tuổi đối với nữ.', 1, 3);

-- Question 122
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (122, 'ALL', 1, 122, 'Theo quy định về độ tuổi, người lái xe ô tô chở người (kể cả xe buýt) trên 16 chỗ (không kể chỗ của người lái xe) đến 29 chỗ (không kể chỗ của người lái xe); các loại xe ô tô chở người quy định cho giấy phép lái xe hạng D2 kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg phải đủ bao nhiêu tuổi trở lên?', NULL, '👶 Nhớ: Trẻ em <10 tuổi và <1.35m cần ghế chuyên dụng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 122;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (122, '23 tuổi.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (122, '24 tuổi.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (122, '22 tuổi.', 0, 3);

-- Question 123
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (123, 'ALL', 1, 123, 'Người đủ 16 tuổi đến dưới 18 tuổi chỉ được điều khiển các loại xe nào dưới đây?', NULL, '👶 Nhớ: Trẻ em <10 tuổi và <1.35m cần ghế chuyên dụng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 123;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (123, 'Xe mô tô hai bánh có dung tích xi-lanh đến 125 cm3.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (123, 'Xe gắn máy.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (123, 'Xe ô tô chở người đến 08 chỗ (không kể chỗ của người lái xe); xe ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế đến 3.500 kg; các loại xe ô tô quy định cho giấy phép lái xe hạng B kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (123, 'Cả ba ý trên.', 0, 4);

-- Question 124
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (124, 'ALL', 1, 124, 'Người có Giấy phép lái xe mô tô hạng A1 không được phép điều khiển loại xe nào dưới đây?', NULL, '💡 \'Không được\' → Chọn hành vi bị cấm hoàn toàn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 124;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (124, 'Xe mô tô hai bánh có dung tích xi-lanh 125 cm3 hoặc có công suất động cơ điện đến 11 kW.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (124, 'Xe mô tô ba bánh.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (124, 'Cả hai ý trên.', 0, 3);

-- Question 125
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (125, 'ALL', 1, 125, 'Người có Giấy phép lái xe mô tô hạng A1 được cấp sau ngày 01/01/2025 được phép điều khiển loại xe nào dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 125;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (125, 'Xe mô tô hai bánh có dung tích xi-lanh đến 125 cm3 hoặc có công suất động cơ điện đến 11 kW.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (125, 'Xe mô tô ba bánh.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (125, 'Cả hai ý trên.', 0, 3);

-- Question 126
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (126, 'ALL', 1, 126, 'Người có Giấy phép lái xe mô tô hạng A được phép điều khiển loại xe nào dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 126;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (126, 'Xe mô tô hai bánh có dung tích xi-lanh đến 125 cm3 hoặc có công suất động cơ điện đến 11 kW.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (126, 'Xe mô tô hai bánh có dung tích xi-lanh trên 125 cm3 hoặc có công suất động cơ điện trên 11 kW.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (126, 'Cả hai ý trên.', 1, 3);

-- Question 127
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (127, 'ALL', 1, 127, 'Người có Giấy phép lái xe ô tô hạng B được phép điều khiển loại xe nào dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 127;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (127, 'Xe ô tô chở người đến 08 chỗ (không kể chỗ của người lái xe).', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (127, 'Xe ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế đến 3.500 kg.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (127, 'Cả hai ý trên.', 1, 3);

-- Question 128
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (128, 'ALL', 1, 128, 'Người có Giấy phép lái xe hạng C1 được điều khiển loại xe nào dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 128;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (128, 'Xe ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế trên 7.500 kg; các loại xe ô tô tải quy định cho giấy phép lái xe hạng C1 kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (128, 'Xe ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế trên 3.500 kg đến 7.500 kg; các loại xe ô tô tải quy định cho giấy phép lái xe hạng C1 kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (128, 'Cả hai ý trên.', 0, 3);

-- Question 129
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (129, 'ALL', 1, 129, 'Người có Giấy phép lái xe hạng C được điều khiển loại xe nào dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 129;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (129, 'Xe ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế trên 3.500 kg đến 7.500 kg; các loại xe ô tô tải quy định cho giấy phép lái xe hạng C1 kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (129, 'Xe ô tô tải và ô tô chuyên dùng có khối lượng toàn bộ theo thiết kế trên 7.500 kg; các loại xe ô tô tải quy định cho giấy phép lái xe hạng C kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (129, 'Cả hai ý trên.', 1, 3);

-- Question 130
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (130, 'ALL', 1, 130, 'Người có Giấy phép lái xe hạng D1 được điều khiển loại xe nào dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 130;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (130, 'Xe ô tô chở người (kể cả xe buýt) trên 16 chỗ (không kể chỗ của người lái xe) đến 29 chỗ (không kể chỗ của người lái xe); các loại xe ô tô chở người quy định cho giấy phép lái xe hạng D1 kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (130, 'Xe ô tô chở người trên 08 chỗ (không kể chỗ của người lái xe) đến 16 chỗ (không kể chỗ của người lái xe); các loại xe ô tô chở người quy định cho giấy phép lái xe hạng D1 kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (130, 'Cả hai ý trên.', 0, 3);

-- Question 131
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (131, 'ALL', 1, 131, 'Người có Giấy phép lái xe hạng D2 được điều khiển loại xe nào dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 131;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (131, 'Xe ô tô chở người (kể cả xe buýt) trên 16 chỗ (không kể chỗ của người lái xe) đến 29 chỗ (không kể chỗ của người lái xe); các loại xe ô tô chở người quy định cho giấy phép lái xe hạng D2 kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (131, 'Xe ô tô chở người trên 08 chỗ (không kể chỗ của người lái xe) đến 16 chỗ (không kể chỗ của người lái xe); các loại xe ô tô chở người quy định cho giấy phép lái xe hạng D1 kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (131, 'Cả hai ý trên.', 1, 3);

-- Question 132
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (132, 'ALL', 1, 132, 'Người có Giấy phép lái xe hạng D được điều khiển loại xe nào dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 132;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (132, 'Xe ô tô chở người (kể cả xe buýt) trên 29 chỗ (không kể chỗ của người lái xe); xe ô tô chở người giường nằm; các loại xe ô tô chở người quy định cho giấy phép lái xe hạng D kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (132, 'Xe ô tô chở người (kể cả xe buýt) trên 16 chỗ (không kể chỗ của người lái xe) đến 29 chỗ (không kể chỗ của người lái xe).', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (132, 'Các loại xe ô tô quy định cho giấy phép lái xe hạng C kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg; xe ô tô đầu kéo kéo sơ mi rơ moóc.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (132, 'Ý 1 và ý 2.', 1, 4);

-- Question 133
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (133, 'ALL', 1, 133, 'Người có Giấy phép lái xe hạng BE được điều khiển loại xe nào dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 133;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (133, 'Xe ô tô chở người (kể cả xe buýt) trên 29 chỗ (không kể chỗ của người lái xe); xe ô tô chở người giường nằm.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (133, 'Các loại xe ô tô quy định cho giấy phép lái xe hạng B kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (133, 'Xe ô tô chở người (kể cả xe buýt) trên 16 chỗ (không kể chỗ của người lái xe) đến 29 chỗ (không kể chỗ của người lái xe); các loại xe ô tô chở người quy định cho giấy phép lái xe hạng D2 kéo rơ moóc có khối lượng toàn bộ theo thiết kế đến 750 kg.', 0, 3);

-- Question 134
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (134, 'ALL', 1, 134, 'Người có Giấy phép lái xe hạng CE được điều khiển loại xe nào dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 134;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (134, 'Các loại xe ô tô quy định cho giấy phép lái xe hạng C kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg; xe ô tô đầu kéo kéo sơ mi rơ moóc.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (134, 'Các loại xe ô tô quy định cho giấy phép lái xe hạng D1 kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (134, 'Cả hai ý trên.', 0, 3);

-- Question 135
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (135, 'ALL', 1, 135, 'Người có Giấy phép lái xe hạng DE được điều khiển loại xe nào dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 135;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (135, 'Các loại xe ô tô quy định cho giấy phép lái xe hạng D kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg; xe ô tô chở khách nối toa.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (135, 'Các loại xe ô tô quy định cho giấy phép lái xe hạng C kéo rơ moóc có khối lượng toàn bộ theo thiết kế trên 750 kg; xe ô tô đầu kéo kéo sơ mi rơ moóc.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (135, 'Cả hai ý trên.', 0, 3);

-- Question 136
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (136, 'ALL', 1, 136, 'Người tập lái xe ô tô khi tham gia giao thông đường bộ phải bảo đảm các điều kiện nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 136;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (136, 'Phải thực hành trên xe tập lái, trên tuyến đường tập lái và có giáo viên dạy lái bảo trợ tay lái.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (136, 'Phải mang theo giấy phép xe tập lái.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (136, 'Cả hai ý trên.', 0, 3);

-- Question 137
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (137, 'ALL', 1, 137, 'Người lái xe khi tham gia giao thông đường bộ phải đảm bảo các điều kiện nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 137;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (137, 'Phải đủ tuổi, sức khỏe theo quy định của pháp luật; có giấy phép lái xe đang còn điểm, còn hiệu lực phù hợp với loại xe đang điều khiển do cơ quan có thẩm quyền cấp (trừ người lái xe gắn máy).', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (137, 'Phải là người đứng tên trong đăng ký xe.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (137, 'Cả hai ý trên.', 0, 3);

-- Question 138
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (138, 'ALL', 1, 138, 'Khi tham gia giao thông đường bộ, người lái xe phải mang theo các giấy tờ gì?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 138;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (138, 'Chứng nhận đăng ký xe hoặc bản sao Chứng nhận đăng ký xe có chứng thực kèm bản gốc giấy tờ xác nhận của tổ chức tín dụng, chi nhánh ngân hàng nước ngoài còn hiệu lực trong trường hợp xe đang được thế chấp tại tổ chức tín dụng, chi nhánh ngân hàng nước ngoài.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (138, 'Giấy phép lái xe phù hợp với loại xe đang điều khiển; chứng nhận kiểm định an toàn kỹ thuật và bảo vệ môi trường đối với xe cơ giới theo quy định của pháp luật; chứng nhận bảo hiểm bắt buộc trách nhiệm dân sự của chủ xe cơ giới.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (138, 'Trường hợp các giấy tờ nêu trên đã được tích hợp vào tài khoản định danh điện tử thì việc xuất trình, kiểm tra có thể thực hiện thông qua tài khoản định danh điện tử.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (138, 'Cả ba ý trên.', 1, 4);

-- Question 139
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (139, 'ALL', 1, 139, 'Giấy phép lái xe bị thu hồi trong các trường hợp nào sau đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 139;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (139, 'Người được cấp giấy phép lái xe không đủ điều kiện sức khỏe theo kết luận của cơ sở khám bệnh, chữa bệnh đối với từng hạng giấy phép lái xe.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (139, 'Giấy phép lái xe được cấp sai quy định.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (139, 'Giấy phép lái xe đã quá thời hạn tạm giữ hoặc hết thời hiệu thi hành quyết định xử phạt vi phạm hành chính theo quy định của pháp luật về xử lý vi phạm hành chính nếu người vi phạm không đến nhận mà không có lý do chính đáng.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (139, 'Cả ba ý trên.', 1, 4);

-- Question 140
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (140, 'ALL', 1, 140, 'Người có giấy phép lái xe chưa bị trừ hết 12 điểm, được phục hồi điểm giấy phép lái xe trong trường hợp nào sau đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 140;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (140, 'Không được phục hồi.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (140, 'Được phục hồi đủ 12 điểm, nếu không bị trừ điểm trong thời hạn 12 tháng từ ngày bị trừ điểm gần nhất.', 1, 2);

-- Question 141
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (141, 'ALL', 1, 141, 'Người có giấy phép lái xe đã bị trừ hết điểm phải làm gì để phục hồi điểm giấy phép lái xe?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 2)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 141;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (141, 'Không vi phạm pháp luật trật tự, an toàn giao thông đường bộ trong thời gian 12 tháng kể từ ngày bị trừ hết điểm.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (141, 'Sau thời hạn ít nhất là 06 tháng kể từ ngày bị trừ hết điểm, người có phép lái xe được tham gia kiểm tra nội dung kiến thức pháp luật về trật tự, an toàn giao thông đường bộ theo quy định, có kết quả đạt yêu cầu thì được phục hồi đủ 12 điểm.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (141, 'Cả hai ý trên.', 0, 3);

-- Question 142
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (142, 'ALL', 1, 142, 'Trách nhiệm của tổ chức, cá nhân đứng tên trong giấy chứng nhận đăng ký xe khi chưa thực hiện thu hồi chứng nhận đăng ký xe, biển số xe được quy định như thế nào?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 142;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (142, 'Tiếp tục chịu trách nhiệm của chủ xe.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (142, 'Không chịu trách nhiệm sau khi đã chuyển nhượng, trao đổi, tặng, cho.', 0, 2);

-- Question 143
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (143, 'ALL', 1, 143, 'Để bảo đảm điều kiện tham gia giao thông đường bộ, loại phương tiện nào phải lắp thiết bị giám sát hành trình?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 2)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 143;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (143, 'Xe ô tô kinh doanh vận tải.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (143, 'Xe ô tô chở người từ 08 chỗ trở lên (không kể chỗ của người lái xe) kinh doanh vận tải, xe ô tô đầu kéo, xe cứu thương.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (143, 'Cả hai ý trên.', 1, 3);

-- Question 144
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (144, 'ALL', 1, 144, 'Tốc độ khai thác tối đa cho phép đối với xe máy chuyên dùng, xe gắn máy và các loại xe tương tự tham gia giao thông trên đường bộ (trừ đường cao tốc) là bao nhiêu km/h?', NULL, '💡 Tốc độ: Khu dân cư ≤50km/h | Ngoài đô thị ≤80km/h | Cao tốc ≤120km/h', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 144;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (144, '50 km/h.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (144, '40 km/h.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (144, '60 km/h.', 0, 3);

-- Question 145
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (145, 'ALL', 1, 145, 'Trên đường bộ, trong khu vực đông dân cư, đường đôi hoặc đường một chiều có từ hai làn xe cơ giới trở lên, xe mô tô hai bánh, ô tô chở người đến 28 chỗ không kể chỗ của người lái xe tham gia giao thông với tốc độ khai thác tối đa cho phép là bao nhiêu?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 145;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (145, '60 km/h.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (145, '50 km/h.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (145, '40 km/h.', 0, 3);

-- Question 146
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (146, 'ALL', 1, 146, 'Trên đường bộ (trừ đường cao tốc) trong khu vực đông dân cư, đường hai chiều hoặc đường một chiều có một làn xe cơ giới, xe mô tô hai bánh, ô tô chở người đến 28 chỗ không kể chỗ của người lái xe tham gia giao thông với tốc độ khai thác tối đa cho phép là bao nhiêu?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 146;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (146, '60 km/h.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (146, '50 km/h.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (146, '40 km/h.', 0, 3);

-- Question 147
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (147, 'ALL', 1, 147, 'Trên đường bộ (trừ đường cao tốc) trong khu vực đông dân cư, đường hai chiều hoặc đường một chiều có một làn xe cơ giới, loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa cho phép là 50 km/h?', NULL, '💡 Tốc độ: Khu dân cư ≤50km/h | Ngoài đô thị ≤80km/h | Cao tốc ≤120km/h', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 147;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (147, 'Ô tô tải, ô tô chở người trên 28 chỗ không kể chỗ của người lái xe.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (147, 'Xe gắn máy, xe máy chuyên dùng.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (147, 'Cả hai ý trên.', 0, 3);

-- Question 148
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (148, 'ALL', 1, 148, 'Trên đường bộ (trừ đường cao tốc) trong khu vực đông dân cư, đường đôi hoặc đường một chiều có từ hai làn cơ giới trở lên, loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa là 60 km/h?', NULL, '💡 Tốc độ: Khu dân cư ≤50km/h | Ngoài đô thị ≤80km/h | Cao tốc ≤120km/h', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 148;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (148, 'Ô tô tải, ô tô chở người trên 28 chỗ không kể chỗ của người lái xe.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (148, 'Xe gắn máy, xe máy chuyên dùng.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (148, 'Cả hai ý trên.', 0, 3);

-- Question 149
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (149, 'ALL', 1, 149, 'Trên đường bộ (trừ đường cao tốc) ngoài khu vực đông dân cư, đường đôi hoặc đường một chiều có từ hai làn xe cơ giới trở lên, loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa cho phép là 90 km/h?', NULL, '💡 Tốc độ: Khu dân cư ≤50km/h | Ngoài đô thị ≤80km/h | Cao tốc ≤120km/h', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 149;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (149, 'Xe ô tô chở người đến 28 chỗ không kể chỗ của người lái xe (trừ xe buýt); ô tô tải có trọng tải không lớn hơn 3,5 tấn.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (149, 'Xe ô tô chở người trên 28 chỗ không kể chỗ người lái xe (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc).', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (149, 'Xe buýt; ô tô đầu kéo kéo sơ mi rơ moóc (trừ ô tô đầu kéo kéo sơ mi rơ moóc xi téc); xe mô tô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông lưu động).', 0, 3);

-- Question 150
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (150, 'ALL', 1, 150, 'Trên đường bộ ngoài khu vực đông dân cư, đường đôi hoặc đường một chiều có từ hai làn xe cơ giới trở lên (trừ đường cao tốc) loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa cho phép là 80 km/h?', NULL, '💡 Tốc độ: Khu dân cư ≤50km/h | Ngoài đô thị ≤80km/h | Cao tốc ≤120km/h', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 150;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (150, 'Xe ô tô chở người đến 28 chỗ không kể chỗ của người lái xe (trừ xe buýt); ô tô tải có trọng tải không lớn hơn 3,5 tấn.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (150, 'Xe ô tô chở người trên 28 chỗ không kể chỗ người lái xe (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc).', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (150, 'Xe buýt; ô tô đầu kéo kéo sơ mi rơ moóc (trừ ô tô đầu kéo kéo sơ mi rơ moóc xi téc); xe mô tô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông lưu động).', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (150, 'Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông lưu động, ô tô xi téc, ô tô đầu kéo kéo sơ mi rơ moóc xi téc, ô tô kéo theo rơ moóc xi téc).', 0, 4);

-- Question 151
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (151, 'ALL', 1, 151, 'Trên đường bộ ngoài khu vực đông dân cư, đường đôi hoặc đường một chiều có từ hai làn xe cơ giới trở lên (trừ đường cao tốc) loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa cho phép là 70 km/h?', NULL, '💡 Tốc độ: Khu dân cư ≤50km/h | Ngoài đô thị ≤80km/h | Cao tốc ≤120km/h', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 151;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (151, 'Xe ô tô chở người đến 28 chỗ không kể chỗ của người lái xe (trừ xe buýt); ô tô tải có trọng tải không lớn hơn 3,5 tấn.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (151, 'Xe ô tô chở người trên 28 chỗ không kể chỗ người lái xe (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc).', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (151, 'Xe buýt; ô tô đầu kéo kéo sơ mi rơ moóc (trừ ô tô đầu kéo kéo sơ mi rơ moóc xi téc); xe mô tô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông lưu động).', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (151, 'Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông lưu động, ô tô xi téc, ô tô đầu kéo kéo sơ mi rơ moóc xi téc, ô tô kéo theo rơ moóc xi téc.', 0, 4);

-- Question 152
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (152, 'ALL', 1, 152, 'Trên đường bộ ngoài khu vực đông dân cư, đường đôi hoặc đường một chiều có từ hai làn xe cơ giới trở lên (trừ đường cao tốc) loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa cho phép là 60 km/h?', NULL, '💡 Tốc độ: Khu dân cư ≤50km/h | Ngoài đô thị ≤80km/h | Cao tốc ≤120km/h', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 152;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (152, 'Xe ô tô chở người đến 28 chỗ không kể chỗ của người lái xe (trừ xe buýt); ô tô tải có trọng tải không lớn hơn 3,5 tấn.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (152, 'Xe ô tô chở người trên 28 chỗ không kể chỗ người lái xe (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc).', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (152, 'Xe buýt; ô tô đầu kéo kéo sơ mi rơ moóc (trừ ô tô đầu kéo kéo sơ mi rơ moóc xi téc); xe mô tô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông lưu động).', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (152, 'Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông lưu động, ô tô xi téc, ô tô đầu kéo kéo sơ mi rơ moóc xi téc, ô tô kéo theo rơ moóc xi téc.', 1, 4);

-- Question 153
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (153, 'ALL', 1, 153, 'Trên đường bộ ngoài khu vực đông dân cư, đường hai chiều hoặc đường một chiều có một làn xe cơ giới (trừ đường cao tốc), loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa cho phép là 80 km/h?', NULL, '💡 Tốc độ: Khu dân cư ≤50km/h | Ngoài đô thị ≤80km/h | Cao tốc ≤120km/h', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 153;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (153, 'Xe ô tô chở người đến 28 chỗ không kể chỗ của người lái xe (trừ xe buýt); ô tô tải có trọng tải không lớn hơn 3,5 tấn.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (153, 'Xe ô tô chở người trên 28 chỗ không kể chỗ người lái xe (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc).', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (153, 'Xe buýt; ô tô đầu kéo kéo sơ mi rơ moóc (trừ ô tô đầu kéo kéo sơ mi rơ moóc xi téc); xe mô tô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông lưu động).', 0, 3);

-- Question 154
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (154, 'ALL', 1, 154, 'Trên đường bộ ngoài khu vực đông dân cư, đường hai chiều hoặc đường một chiều có một làn xe cơ giới (trừ đường cao tốc), loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa cho phép là 70 km/h?', NULL, '💡 Tốc độ: Khu dân cư ≤50km/h | Ngoài đô thị ≤80km/h | Cao tốc ≤120km/h', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 154;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (154, 'Xe ô tô chở người đến 28 chỗ không kể chỗ của người lái xe (trừ xe buýt); ô tô tải có trọng tải không lớn hơn 3,5 tấn.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (154, 'Xe ô tô chở người trên 28 chỗ không kể chỗ người lái xe (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc).', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (154, 'Xe buýt; ô tô đầu kéo kéo sơ mi rơ moóc (trừ ô tô đầu kéo kéo sơ mi rơ moóc xi téc); xe mô tô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông lưu động).', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (154, 'Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông lưu động, ô tô xi téc, ô tô đầu kéo kéo sơ mi rơ moóc xi téc, ô tô kéo theo rơ moóc xi téc.', 0, 4);

-- Question 155
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (155, 'ALL', 1, 155, 'Trên đường bộ ngoài khu vực đông dân cư, đường hai chiều hoặc đường một chiều có một làn xe cơ giới (trừ đường cao tốc), loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa cho phép là 60 km/h?', NULL, '💡 Tốc độ: Khu dân cư ≤50km/h | Ngoài đô thị ≤80km/h | Cao tốc ≤120km/h', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 155;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (155, 'Xe ô tô chở người đến 28 chỗ không kể chỗ của người lái xe (trừ xe buýt); ô tô tải có trọng tải không lớn hơn 3,5 tấn.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (155, 'Xe ô tô chở người trên 28 chỗ không kể chỗ người lái xe (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc).', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (155, 'Xe buýt; ô tô đầu kéo kéo sơ mi rơ moóc (trừ ô tô đầu kéo kéo sơ mi rơ moóc xi téc); xe mô tô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông lưu động).', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (155, 'Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông lưu động, ô tô xi téc, ô tô đầu kéo kéo sơ mi rơ moóc xi téc, ô tô kéo theo rơ moóc xi téc.', 0, 4);

-- Question 156
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (156, 'ALL', 1, 156, 'Trên đường bộ ngoài khu vực đông dân cư, đường hai chiều hoặc đường một chiều có một làn xe cơ giới (trừ đường cao tốc), loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa cho phép là 50 km/h?', NULL, '💡 Tốc độ: Khu dân cư ≤50km/h | Ngoài đô thị ≤80km/h | Cao tốc ≤120km/h', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 156;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (156, 'Xe ô tô chở người đến 28 chỗ không kể chỗ của người lái xe (trừ xe buýt); ô tô tải có trọng tải không lớn hơn 3,5 tấn.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (156, 'Xe ô tô chở người trên 28 chỗ không kể chỗ người lái xe (trừ xe buýt); ô tô tải có trọng tải trên 3,5 tấn (trừ ô tô xi téc).', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (156, 'Xe buýt; ô tô đầu kéo kéo sơ mi rơ moóc (trừ ô tô đầu kéo kéo sơ mi rơ moóc xi téc); xe mô tô; ô tô chuyên dùng (trừ ô tô trộn vữa, ô tô trộn bê tông lưu động).', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (156, 'Ô tô kéo rơ moóc; ô tô kéo xe khác; ô tô trộn vữa, ô tô trộn bê tông lưu động, ô tô xi téc, ô tô đầu kéo kéo sơ mi rơ moóc xi téc, ô tô kéo theo rơ moóc xi téc.', 1, 4);

-- Question 157
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (157, 'ALL', 1, 157, 'Khi tham gia giao thông trên đường bộ (trừ đường cao tốc), loại xe nào dưới đây được tham gia giao thông với tốc độ khai thác tối đa cho phép là 50 km/h?', NULL, '💡 Tốc độ: Khu dân cư ≤50km/h | Ngoài đô thị ≤80km/h | Cao tốc ≤120km/h', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 157;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (157, 'Xe máy chuyên dùng, xe gắn máy và các loại xe tương tự.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (157, 'Xe chở người bốn bánh có gắn động cơ khi tham gia giao thông trong phạm vi và thời gian cho phép hoạt động.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (157, 'Xe chở hàng bốn bánh có gắn động cơ khi tham gia giao thông trong phạm vi và thời gian cho phép hoạt động.', 1, 3);

-- Question 158
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (158, 'ALL', 1, 158, 'Khi tham gia giao thông trên đoạn đường không có biển báo "Cự ly tối thiểu giữa hai xe", trong điều kiện mặt đường khô ráo, không có sương mù, mặt đường không trơn trượt, địa hình bằng phẳng, đường thẳng, tầm nhìn bảo đảm, xe cơ giới đang chạy với tốc độ từ trên 80 km/h đến 100 km/h, người lái xe phải giữ khoảng cách an toàn với xe đang chạy liền trước tối thiểu là bao nhiêu?', NULL, '💡 Tốc độ: Khu dân cư ≤50km/h | Ngoài đô thị ≤80km/h | Cao tốc ≤120km/h', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 158;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (158, '35 m.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (158, '55 m.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (158, '70 m.', 1, 3);

-- Question 159
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (159, 'ALL', 1, 159, 'Khi tham gia giao thông trên đoạn đường không có biển báo "cự ly tối thiểu giữa hai xe", trong điều kiện mặt đường khô ráo, không có sương mù, mặt đường không trơn trượt, địa hình bằng phẳng, đường thẳng, tầm nhìn bảo đảm, xe cơ giới đang chạy với tốc độ từ trên 100 km/h đến 120 km/h, người lái xe phải giữ khoảng cách an toàn với xe đang chạy liền trước tối thiểu là bao nhiêu?', NULL, '💡 Tốc độ: Khu dân cư ≤50km/h | Ngoài đô thị ≤80km/h | Cao tốc ≤120km/h', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 159;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (159, '55 m.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (159, '70 m.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (159, '100 m.', 1, 3);

-- Question 160
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (160, 'ALL', 1, 160, 'Khi tham gia giao thông trên đoạn đường không có biển báo "cự ly tối thiểu giữa hai xe", trong điều kiện mặt đường khô ráo, không có sương mù, mặt đường không trơn trượt, địa hình bằng phẳng, đường thẳng, tầm nhìn bảo đảm, xe cơ giới đang chạy với tốc độ từ trên 60 km/h đến 80 km/h, người lái xe phải giữ khoảng cách an toàn với xe đang chạy liền trước tối thiểu là bao nhiêu?', NULL, '💡 Tốc độ: Khu dân cư ≤50km/h | Ngoài đô thị ≤80km/h | Cao tốc ≤120km/h', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 160;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (160, '55 m.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (160, '70 m.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (160, '100 m.', 0, 3);

-- Question 161
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (161, 'ALL', 1, 161, 'Khi tham gia giao thông trên đoạn đường không có biển báo "cự ly tối thiểu giữa hai xe", trong điều kiện mặt đường khô ráo, không có sương mù, mặt đường không trơn trượt, địa hình bằng phẳng, đường thẳng, tầm nhìn bảo đảm, xe cơ giới đang chạy với tốc độ 60 km/h, người lái xe phải giữ khoảng cách an toàn với xe đang chạy liền trước tối thiểu là bao nhiêu?', NULL, '💡 Tốc độ: Khu dân cư ≤50km/h | Ngoài đô thị ≤80km/h | Cao tốc ≤120km/h', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 161;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (161, '35 m.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (161, '55 m.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (161, '70 m.', 0, 3);

-- Question 162
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (162, 'ALL', 1, 162, 'Khi điều khiển xe chạy với tốc độ dưới 60 km/h, để bảo đảm khoảng cách an toàn giữa hai xe, người lái xe phải điều khiển xe như thế nào?', NULL, '💡 Tốc độ: Khu dân cư ≤50km/h | Ngoài đô thị ≤80km/h | Cao tốc ≤120km/h', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 162;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (162, 'Chủ động giữ khoảng cách an toàn phù hợp với xe chạy liền trước xe của mình.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (162, 'Bảo đảm khoảng cách an toàn tùy thuộc vào mật độ phương tiện, tình hình giao thông thực tế.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (162, 'Cả hai ý trên.', 1, 3);

-- Question 163
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (163, 'ALL', 1, 163, 'Người lái xe phải giảm tốc độ thấp hơn tốc độ tối đa cho phép đến mức cần thiết, chú ý quan sát và chuẩn bị sẵn sàng những tình huống có thể xảy ra để phòng ngừa tai nạn trong các trường hợp nào dưới đây?', NULL, '💡 Tốc độ: Khu dân cư ≤50km/h | Ngoài đô thị ≤80km/h | Cao tốc ≤120km/h', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 163;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (163, 'Gặp biển báo nguy hiểm và cảnh báo trên đường.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (163, 'Gặp biển chỉ dẫn trên đường.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (163, 'Gặp biển báo hết mọi lệnh cấm.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (163, 'Gặp biển báo hết hạn chế tốc độ tối đa cho phép.', 0, 4);

-- Question 164
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (164, 'ALL', 1, 164, 'Xe đưa đón trẻ em mầm non, học sinh được ưu tiên gì khi tham gia giao thông đường bộ?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 164;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (164, 'Tổ chức phân luồng, điều tiết giao thông, bố trí nơi dừng xe, đỗ xe tại khu vực trường học và tại các điểm trên lộ trình đưa đón trẻ em mầm non, học sinh.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (164, 'Được bố trí xe dẫn đường để bảo đảm an toàn giao thông.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (164, 'Cả hai ý trên.', 0, 3);

-- Question 165
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (165, 'ALL', 1, 165, 'Người điều khiển phương tiện tham gia giao thông đường bộ phải quan sát, giảm tốc độ hoặc dừng lại để bảo đảm an toàn trong các trường hợp nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 3)', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 165;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (165, 'Tại nơi có vạch kẻ đường hoặc báo hiệu khác dành cho người đi bộ hoặc tại nơi mà người đi bộ, xe lăn của người khuyết tật đang qua đường.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (165, 'Nơi đường bộ giao nhau cùng mức với đường bộ, đường bộ giao nhau cùng mức với đường sắt; đường hẹp, đường vòng, đường quanh co, đường đèo, dốc.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (165, 'Khu vực có trường học, bệnh viện, bến xe, công trình công cộng tập trung đông người, khu vực đông dân cư, chợ, khu vực đang thi công trên đường bộ, hiện trường vụ tai nạn giao thông đường bộ.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (165, 'Cả ba ý trên.', 1, 4);

-- Question 166
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (166, 'ALL', 1, 166, 'Tại những đoạn đường không bố trí biển báo hạn chế tốc độ, không bố trí biển báo khoảng cách an toàn tối thiểu giữa hai xe, người lái xe phải thực hiện quy định nào dưới đây để bảo đảm an toàn?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 2)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 166;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (166, 'Được phép lái xe không hạn chế tốc độ và khoảng cách an toàn tối thiểu với xe phía trước cùng làn đường hoặc phần đường.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (166, 'Được phép lái xe không hạn chế tốc độ và khoảng cách an toàn tối thiểu với xe phía trước cùng làn đường hoặc phần đường khi tham gia giao thông trên đường nhánh.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (166, 'Chấp hành quy định về tốc độ, khoảng cách an toàn tối thiểu với xe phía trước cùng làn đường hoặc phần đường.', 1, 3);

-- Question 167
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (167, 'ALL', 1, 167, 'Khi gặp xe buýt đang dừng đón, trả khách, người điều khiển xe mô tô phải xử lý như thế nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 2)', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 167;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (167, 'Tăng tốc độ để nhanh chóng vượt qua xe buýt.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (167, 'Quan sát, giảm tốc độ đi qua xe buýt hoặc dừng lạiđể bảo đảm an toàn.', 1, 2);

-- Question 168
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (168, 'ALL', 1, 168, 'Việc vận chuyển hành khách bằng xe ô tô phải tuân thủ các quy định nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 168;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (168, 'Đón, trả hành khách đúng nơi quy định; hướng dẫn sử dụng trang thiết bị an toàn trên xe; có biện pháp giữ gìn vệ sinh trong xe; vận chuyển hành khách đúng lịch trình, lộ trình đã đăng ký, trừ trường hợp bất khả kháng; không chở hành khách trên nóc xe, trong khoang chở hành lý hoặc để hành khách đu, bám bên ngoài xe.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (168, 'Đón, trả hành khách theo yêu cầu của hành khách trên xe; hướng dẫn sử dụng trang thiết bị an toàn trên xe; có biện pháp giữ gìn vệ sinh trong xe; vận chuyển hành khách đúng lịch trình, lộ trình đã đăng ký, trừ trường hợp bất khả kháng; không chở hành khách trên nóc xe, trong khoang chở hành lý hoặc để hành khách đu, bám bên ngoài xe.', 0, 2);

-- Question 169
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (169, 'ALL', 1, 169, 'Trong hoạt động vận tải đường bộ, các hành vi nào dưới đây bị nghiêm cấm?', NULL, '💡 Từ khóa \'nghiêm cấm\' → Chọn hành vi nguy hiểm/vi phạm pháp luật nhất', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 169;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (169, 'Vận chuyển hàng hóa cấm lưu hành.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (169, 'Vận chuyển trái phép hoặc không thực hiện đầy đủ các quy định của pháp luật về vận chuyển hàng hóa nguy hiểm.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (169, 'Vận chuyển động vật hoang dã.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (169, 'Cả ba ý trên.', 1, 4);

-- Question 170
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (170, 'ALL', 1, 170, 'Trong hoạt động vận tải hành khách, những hành vi nào dưới đây bị nghiêm cấm?', NULL, '💡 Từ khóa \'nghiêm cấm\' → Chọn hành vi nguy hiểm/vi phạm pháp luật nhất', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 170;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (170, 'Cạnh tranh nhau nhằm tăng lợi nhuận.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (170, 'Giảm giá để thu hút khách.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (170, 'Đe dọa, xúc phạm, tranh giành, lôi kéo hành khách; đe doạ, cưỡng ép hành khách sử dụng dịch vụ ngoài ý muốn; chuyển tải, xuống khách hoặc các hành vi khác nhằm trốn tránh phát hiện xe chở quá tải, quá số người theo quy định của pháp luật.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (170, 'Cả ba ý trên.', 0, 4);

-- Question 171
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (171, 'ALL', 1, 171, 'Thời gian lái xe liên tục của người lái xe ô tô kinh doanh vận tải được quy định như thế nào để bảo đảm an toàn giao thông?', NULL, '⏱️ Thời gian lái xe: Tối đa 10 giờ/ngày | Liên tục không quá 4 giờ phải nghỉ', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 171;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (171, 'Không quá 4 giờ.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (171, 'Không quá 6 giờ.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (171, 'Không quá 8 giờ.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (171, 'Liên tục tùy thuộc vào sức khỏe và khả năng của người lái xe.', 0, 4);

-- Question 172
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (172, 'ALL', 1, 172, 'Thời gian làm việc của người lái xe ô tô kinh doanh vận tải trong một ngày được quy định như thế nào để bảo đảm an toàn giao thông?', NULL, '⏱️ Thời gian lái xe: Tối đa 10 giờ/ngày | Liên tục không quá 4 giờ phải nghỉ', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 172;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (172, 'Không quá 6 giờ trong một ngày.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (172, 'Không quá 8 giờ trong một ngày.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (172, 'Không quá 10 giờ trong một ngày.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (172, 'Không hạn chế tùy thuộc vào sức khỏe và khả năng của người lái xe.', 0, 4);

-- Question 173
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (173, 'ALL', 1, 173, 'Trước khi xe khởi hành, người lái xe, nhân viên phục vụ trên xe ô tô vận chuyển hành khách có trách nhiệm nào sau đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 173;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (173, 'Kiểm tra các điều kiện bảo đảm an toàn của xe.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (173, 'Hướng dẫn cho hành khách về an toàn giao thông đường bộ và thoát hiểm khi gặp sự cố.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (173, 'Kiểm tra nhân thân và hành lý của hành khách đi xe.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (173, 'Ý 1 và ý 2.', 1, 4);

-- Question 174
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (174, 'ALL', 1, 174, 'Xe ô tô kinh doanh vận tải chở trẻ em mầm non, học sinh phải đáp ứng các yêu cầu nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 3)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 174;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (174, 'Có thiết bị ghi nhận hình ảnh trẻ em mầm non, học sinh và thiết bị có chức năng cảnh báo, chống bỏ quên trẻ em trên xe; có niên hạn sử dụng không quá 20 năm; có màu sơn theo quy định của Chính phủ.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (174, 'Có dây đai an toàn phù hợp với lứa tuổi hoặc sử dụng xe có ghế ngồi phù hợp với lứa tuổi theo quy định của pháp luật.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (174, 'Được cấp chứng nhận đăng kí xe và gắn biển số xe, bảo đảm an toàn kĩ thuật và bảo vệ môi trường theo quy định của pháp luật; xe ô tô chở người từ 08 chỗ trở lên (không kể chỗ của người lái xe) phải lắp thiết bị giám sát hành trình và thiết bị ghi nhận hình ảnh người lái xe.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (174, 'Cả ba ý trên.', 1, 4);

-- Question 175
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (175, 'ALL', 1, 175, 'Việc vận chuyển động vật sống khi tham gia giao thông đường bộ phải thực hiện các yêu cầu nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 3)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 175;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (175, 'Người lái xe phải mang đủ giấy tờ theo quy định của pháp luật.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (175, 'Phương tiện vận chuyển phải có kết cấu phù hợp với loại động vật chuyên chở.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (175, 'Trong quá trình vận chuyển phải chấp hành các quy định của pháp luật về trật tự, an toàn giao thông đường bộ, vệ sinh dịch tễ, phòng dịch và bảo đảm vệ sinh môi trường.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (175, 'Cả ba ý trên.', 1, 4);

-- Question 176
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (176, 'ALL', 1, 176, 'Việc vận chuyển hàng hóa nguy hiểm khi tham gia giao thông đường bộ phải chấp hành các quy định nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 176;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (176, 'Phải có giấy phép vận chuyển; trong trường hợp cần thiết, đơn vị vận chuyển hàng hoá nguy hiểm phải bố trí người áp tải để bảo đảm trật tự, an toàn giao thông đường bộ.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (176, 'Phải có giấy phép vận chuyển; không phải bố trí người áp tải khi tham gia giao thông đường bộ.', 0, 2);

-- Question 177
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (177, 'ALL', 1, 177, 'Việc lưu hành xe ô tô của người nước ngoài đăng ký tại nước ngoài có tay lái ở bên phải tham gia giao thông tại Việt Nam, xe cơ giới nước ngoài do người nước ngoài đưa vào Việt Nam du lịch được quy định như như thế nào?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 177;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (177, 'Phải chấp hành quy định của pháp luật về trật tự, an toàn giao thông đường bộ của Việt Nam. Trường hợp điều ước quốc tế mà nước Cộng hòa xã hội chủ nghĩa Việt Nam là thành viên có quy định khác thì áp dụng theo điều ước quốc tế đó.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (177, 'Tham gia giao thông đúng trong phạm vi, tuyến đường, thời gian đã được cơ quan có thẩm quyền của Việt Nam cấp phép.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (177, 'Xe ô tô của người nước ngoài đăng ký tại nước ngoài có tay lái ở bên phải phải đi theo đoàn và có người, phương tiện hỗ trợ, hướng dẫn giao thông.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (177, 'Cả ba ý trên.', 1, 4);

-- Question 178
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (178, 'ALL', 1, 178, 'Việc sử dụng xe mô tô, xe gắn máy, xe thô sơ để vận chuyển hành khách, hàng hóa phải thực hiện các quy định nào dưới đây để đảm bảo an toàn giao thông?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 2)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 178;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (178, 'Kiểm tra điều kiện bảo đảm an toàn của xe trước khi tham gia giao thông đường bộ; mang đủ giấy tờ theo quy định của pháp luật.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (178, 'Kiểm tra việc sắp xếp hàng hóa bảo đảm an toàn; không chở quá số người, chở hành lý, hàng hoá vượt quá khối lượng cho phép hoặc vượt quá khổ giới hạn của xe.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (178, 'Cả hai ý trên.', 1, 3);

-- Question 179
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (179, 'ALL', 1, 179, 'Xe vận chuyển hàng siêu trường, siêu trọng phải thực hiện các quy định nào dưới đây để bảo đảm an toàn giao thông?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 179;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (179, 'Phải chạy với tốc độ quy định trong giấy phép và phải có báo hiệu kích thước của hàng; trường hợp cần thiết, phải có người, phương tiện hỗ trợ lái xe, cảnh báo cho người, phương tiện tham gia giao thông đường bộ khác và thực hiện các biện pháp bảo đảm an toàn giao thông khi vận chuyển hàng siêu trường, siêu trọng trên đường bộ.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (179, 'Phải chạy với tốc độ quy định trong giấy phép; phải có người, phương tiện hỗ trợ lái xe, cảnh báo cho người, phương tiện tham gia giao thông đường bộ khác và thực hiện các biện pháp bảo đảm an toàn giao thông đường khi vận chuyển hàng siêu trường, siêu trọng trên đường dành cho giao thông công cộng.', 0, 2);

-- Question 180
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (180, 'ALL', 1, 180, 'Xe cứu hộ giao thông đường bộ cần thực hiện yêu cầu nào sau đây để bảo đảm trật tự an toàn giao thông?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 180;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (180, 'Xe cứu hộ giao thông đường bộ phải có dấu hiệu nhận diện, niêm yết thông tin trên xe, gắn thiết bị giám sát hành trình và thiết bị ghi nhận hình ảnh người lái xe.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (180, 'Phải tuân thủ quy định của pháp luật về khối lượng hàng hóa chuyên chở của xe cứu hộ và khối lượng của xe được cứu hộ ghi trên Chứng nhận kiểm định an toàn kỹ thuật và bảo vệ môi trường.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (180, 'Cả hai ý trên. NĂNG PHÒNG CHÁY, CHỮA CHÁY VÀ CỨU HỘ, CỨU NẠN', 1, 3);

-- Question 181
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (181, 'ALL', 3, 181, 'Người lái xe kinh doanh vận tải khi thực hiện tốt việc rèn luyện, nâng cao trách nhiệm, đạo đức nghề nghiệp sẽ thu được kết quả như thế nào dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 181;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (181, 'Được khách hàng, xã hội tôn trọng; được đồng nghiệp quý mến, giúp đỡ; được doanh nghiệp tin dùng và đóng góp nhiều cho xã hội; thu hút được khách hàng, góp phần quan trọng trong xây dựng thương hiệu, kinh doanh có hiệu quả cao.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (181, 'Được cộng điểm vào giấy phép lái xe.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (181, 'Cả hai ý trên.', 0, 3);

-- Question 182
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (182, 'ALL', 3, 182, 'Những hành vi nào sau đây thể hiện là người có văn hóa giao thông?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 182;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (182, 'Luôn tuân thủ pháp luật về trật tự, an toàn giao thông đường bộ, nhường nhịn và giúp đỡ người khác.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (182, 'Đi nhanh, vượt đèn đỏ nếu không có lực lượng Công an.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (182, 'Bấm còi và nháy đèn liên tục để cảnh báo xe khác.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (182, 'Tránh nhường đường để đi nhanh hơn.', 0, 4);

-- Question 183
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (183, 'ALL', 3, 183, 'Người lái xe kinh doanh vận tải cần thực hiện những công việc gì ghi ở dưới đây để thường xuyên rèn luyện nâng cao đạo đức nghề nghiệp?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 183;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (183, 'Quản lý và sử dụng xe tốt; bảo dưỡng xe đúng định kỳ; thực hành tiết kiệm vật tư, nhiên liệu; luôn tu dưỡng bản thân, có lối sống lành mạnh, tác phong làm việc công nghiệp.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (183, 'Nắm vững và tự giác chấp hành các quy định của pháp luật về trật tự, an toàn giao thông đường bộ, lái xe an toàn; thực hiện đầy đủ trách nhiệm với khách hàng; có ý thức tổ chức kỷ luật và xây dựng doanh nghiệp vững mạnh; có tinh thần hợp tác, tương trợ, giúp đỡ đồng nghiệp.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (183, 'Cả hai ý trên.', 1, 3);

-- Question 184
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (184, 'ALL', 3, 184, 'Người lái xe ô tô vận chuyểnhành khách phải có những phẩm chất, đạo đức nghề nghiệp gì dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 2)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 184;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (184, 'Phải có thái độ lịch sự, tôn trọng, thân mật với hành khách; giúp đỡ những người có hoàn cảnh khó khăn, người già, người khuyết tật, phụ nữ có thai, có con nhỏ và trẻ em.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (184, 'Luôn tu dưỡng bản thân, có lối sống lành mạnh, khiêm tốn, có tác phong làm việc công nghiệp, không tham gia vào các tệ nạn xã hội; tôn trọng người cùng tham gia giao thông đường bộ và có ý thức bảo vệ môi trường.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (184, 'Cả hai ý trên.', 1, 3);

-- Question 185
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (185, 'ALL', 3, 185, 'Khái niệm về văn hóa giao thông được hiểu như thế nào là đúng?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 185;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (185, 'Là sự hiểu biết và chấp hành nghiêm chỉnh pháp luật về giao thông, là ý thức trách nhiệm với cộng đồng khi tham gia giao thông.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (185, 'Là sự tôn trọng, nhường nhịn, giúp đỡ và ứng xử có văn hóa giữa những người tham gia giao thông với nhau.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (185, 'Cả hai ý trên.', 1, 3);

-- Question 186
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (186, 'ALL', 3, 186, 'Trên làn đường dành cho ô tô có vũng nước lớn, người lái xe ô tô bắt buộc phải đi qua vũng nước, trên làn đường bên cạnh có nhiều người đang lái xe mô tô tham gia giao thông, người lái xe ô tô xử lý như thế nào khi lái xe qua vũng nước là có văn hóa giao thông?', NULL, '💡 \'Bắt buộc\' → Chọn nghĩa vụ/trách nhiệm pháp lý bắt buộc', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 186;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (186, 'Cho xe chạy thật nhanh qua vũng nước.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (186, 'Giảm tốc độ cho xe chạy chậm qua vũng nước.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (186, 'Giảm tốc độ cho xe chạy qua làn đường dành cho mô tô để tránh vũng nước.', 0, 3);

-- Question 187
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (187, 'ALL', 3, 187, 'Người lái xe không điều khiển xe đi đúng làn đường quy định, phóng nhanh, vượt ẩu, vượt đèn đỏ, đi vào đường cấm được coi là hành vi nào trong các hành vi dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 187;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (187, 'Là thiếu văn hóa giao thông, vi phạm pháp luật về trật tự, an toàn giao thông đường bộ.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (187, 'Là thiếu văn hóa giao thông.', 0, 2);

-- Question 188
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (188, 'ALL', 3, 188, 'Khi sơ cứu người bị tai nạn giao thông đường bộ, có vết thương chảy máu ngoài, phun thành tia và phun mạnh khi mạch đập, bạn phải làm gì dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 2)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 188;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (188, 'Thực hiện cầm máu trực tiếp.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (188, 'Thực hiện cầm máu không trực tiếp (chặn động mach).', 1, 2);

-- Question 189
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (189, 'ALL', 3, 189, 'Người lái xe có văn hóa giao thông khi tham gia giao thông đường bộ phải đáp ứng các điều kiện nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 189;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (189, 'Hiểu biết và chấp hành nghiêm chỉnh pháp luật về giao thông đường bộ; có ý thức trách nhiệm với cộng đồng khi tham gia giao thông; tôn trọng, nhường nhịn, giúp đỡ và ứng xử có văn hóa với những người cùng tham gia giao thông.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (189, 'Điều khiển xe vượt quá tốc độ, đi không đúng làn đường.', 0, 2);

-- Question 190
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (190, 'ALL', 3, 190, 'Người lái xe có văn hóa giao thông khi tham gia giao thông phải tuân thủ những quy định nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 2)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 190;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (190, 'Điều khiển xe đi trên phần đường, làn đường có ít phương tiện tham gia giao thông, chỉ đội mũ bảo hiểm ở nơi có biển báo bắt buộc đội mũ bảo hiểm.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (190, 'Chấp hành hiệu lệnh, chỉ dẫn của người điều khiển giao thông, quy định về tốc độ, tín hiệu đèn, biển báo hiệu, vạch kẻ đường khi lái xe; nhường đường cho người đi bộ, người già, trẻ em, người khuyết tật.', 1, 2);

-- Question 191
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (191, 'ALL', 3, 191, 'Người lái xe mô tô có văn hóa giao thông khi tham gia giao thông phải tuân thủ những quy định nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 191;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (191, 'Điều khiển xe đi bên phải theo chiều đi của mình; đi đúng phần đường, làn đường quy định; đội mũ bảo hiểm đúng quy chuẩn kỹ thuật quốc gia, cài quai đúng quy cách.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (191, 'Điều khiển xe đi trên phần đường, làn đường có ít phương tiện tham gia giao thông.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (191, 'Điều khiển xe và đội mũ bảo hiểm ở nơi có biển báo bắt buộc đội mũ bảo hiểm.', 0, 3);

-- Question 192
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (192, 'ALL', 3, 192, 'Trong các hành vi dưới đây, người lái xe có văn hóa giao thông phải ứng xử như thế nào?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 192;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (192, 'Điều khiển xe đi bên phải theo chiều đi của mình; đi đúng phần đường, làn đường quy định; dừng, đỗ xe đúng nơi quy định; đã uống rượu, bia thì không lái xe.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (192, 'Điều khiển xe đi trên phần đường, làn đường có ít phương tiện giao thông; dừng xe, đỗ xe ở nơi thuận tiện hoặc theo yêu cầu của hành khách, của người thân.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (192, 'Dừng và đỗ xe ở nơi thuận tiện cho việc chuyên chở hành khách và giao nhận hàng hóa; sử dụng ít rượu, bia thì có thể lái xe.', 0, 3);

-- Question 193
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (193, 'ALL', 3, 193, 'Khi tham gia giao thông việc sử dụng còi xe nên dùng như thế nào để thể hiện là người có văn hóa giao thông?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 193;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (193, 'Chỉ bấm còi khi thật sự cần thiết, không bấm còi liên tục hoặc kéo dài, sử dụng còi với mức âm lượng theo quy định.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (193, 'Bấm còi liên tục để các xe khác nhường đường.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (193, 'Bấm còi to khi đi qua khu vực đông dân cư.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (193, 'Không cần dùng còi, tránh gây tiếng ồn là văn minh.', 0, 4);

-- Question 194
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (194, 'ALL', 3, 194, 'Người điều khiển phương tiện tham giao thông đường bộ gây ra tai nạn giao thông đường bộ, người liên quan đến vụ tai nạn giao thông đường bộ có trách nhiệm gì dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 194;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (194, 'Dừng ngay phương tiện, cảnh báo nguy hiểm, giữ nguyên hiện trường, trợ giúp người bị nạn và báo tin cho cơ quan Công an, cơ sở khám bệnh, chữa bệnh.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (194, 'Ở lại hiện trường vụ tai nạn giao thông đường bộ cho đến khi người của cơ quan Công an đến, trừ trường hợp phải đi cấp cứu, đưa người bị nạn đi cấp cứu hoặc xét thấy bị đe dọa đến tính mạng, sức khỏe nhưng phải đến trình báo ngay cơ quan Công an, Ủy ban nhân dân nơi gần nhất.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (194, 'Cung cấp thông tin xác định danh tính về bản thân, người liên quan đến vụ tai nạn giao thông đường bộ và thông tin liên quan của vụ tai nạn giao thông đường bộ cho cơ quan có thẩm quyền.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (194, 'Cả ba ý trên.', 1, 4);

-- Question 195
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (195, 'ALL', 3, 195, 'Người có mặt tại nơi xảy ra vụ tai giao thông đường bộ có trách nhiệm gì dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 195;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (195, 'Giúp đỡ, cứu chữa kịp thời người bị nạn; báo tin ngay cho cơ quan Công an, cơ sở khám bệnh, chữa bệnh hoặc Ủy ban nhân dân nơi gần nhất; tham gia bảo vệ hiện trường; tham gia bảo vệ tài sản của người bị nạn; cung cấp thông tin liên quan về vụ tai nạn theo yêu cầu của cơ quan có thẩm quyền.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (195, 'Chụp lại hình ảnh vụ tai nạn (nếu có thiết bị ghi hình) và nhanh chóng rời khỏi hiện trường vụ tai nạn.', 0, 2);

-- Question 196
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (196, 'ALL', 3, 196, 'Khi sơ cứu ban đầu cho người bị tai nạn giao thông đường bộ không còn hô hấp, người lái xe và người có mặt tại hiện trường vụ tai nạn phải thực hiện các công việc gì dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 196;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (196, 'Đặt nạn nhân nằm ngửa, khai thông đường thở của nạn nhân; thực hiện các biện pháp hô hấp nhân tạo.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (196, 'Thực hiện các biện pháp hô hấp nhân tạo.', 0, 2);

-- Question 197
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (197, 'ALL', 3, 197, 'Hành vi bỏ trốn sau khi gây tai nạn để trốn tránh trách nhiệm hoặc khi có điều kiện mà cố ý không cứu giúp người bị tai nạn giao thông có bị nghiêm cấm hay không?', NULL, '💡 Từ khóa \'nghiêm cấm\' → Chọn hành vi nguy hiểm/vi phạm pháp luật nhất', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 197;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (197, 'Không bị nghiêm cấm.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (197, 'Nghiêm cấm tuỳ từng trường hợp cụ thể.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (197, 'Bị nghiêm cấm.', 1, 3);

-- Question 198
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (198, 'ALL', 3, 198, 'Khi đang lái xe, thấy một người đi bộ đang sang đường trên vạch kẻ đường dành cho người đi bộ, người lái xe nên làm gì?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 198;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (198, 'Giảm tốc độ và nhường đường cho người đi bộ.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (198, 'Bấm còi để họ đi nhanh hơn.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (198, 'Tiếp tục đi nếu đang vội.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (198, 'Vượt qua nếu thấy khoảng trống đủ rộng.', 0, 4);

-- Question 199
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (199, 'ALL', 3, 199, 'Khi gặp vụ tai nạn giao thông, người lái xe nên hành động như thế nào?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 199;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (199, 'Chạy đi để tránh rắc rối.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (199, 'Dừng xe, hỗ trợ nạn nhân và báo cho cơ quan chức năng.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (199, 'Chỉ quan sát rồi tiếp tục di chuyển.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (199, 'Chỉ giúp đỡ nếu có người thân trong vụ tai nạn.', 0, 4);

-- Question 200
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (200, 'ALL', 3, 200, 'Trong đoạn đường hai chiều tại khu đông dân cư đang ùn tắc, người điều khiển xe mô tô có văn hóa giao thông sẽ lựa chọn cách xử lý tình huống nào dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 200;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (200, 'Cho xe lấn sang làn ngược chiều để nhanh chóng thoát khỏi nơi ùn tắc.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (200, 'Điều khiển xe trên vỉa hè để nhanh chóng thoát khỏi nơi ùn tắc.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (200, 'Kiên nhẫn tuân thủ hướng dẫn của người điều khiển giao thông hoặc tín hiệu đèn giao thông, di chuyển trên đúng phần đường bên phải theo chiều đi, nhường đường cho các phương tiện đi ngược chiều.', 1, 3);

-- Question 201
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (201, 'ALL', 3, 201, 'Khi điều khiển phương tiện tham gia giao thông trên đoạn đường bộ đang xảy ra ùn tắc, những hành vi nào dưới đây là thiếu văn hóa?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 201;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (201, 'Bấm còi liên tục thúc giục các phương tiện phía trước nhường đường; đi trên vỉa hè, tận dụng mọi khoảng trống để nhanh chóng thoát khỏi nơi ùn tắc; lấn sang trái đường cố gắng vượt lên xe khác.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (201, 'Tuân thủ hướng dẫn của người điều khiển giao thông hoặc tín hiệu giao thông, đi đúng phần đường, làn đường quy định.', 0, 2);

-- Question 202
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (202, 'ALL', 3, 202, 'Người lái xe, chủ phương tiện giao thông cơ giới đường bộ nên thực hiện các biện pháp phòng cháy, chữa cháy như thế nào dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 202;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (202, 'Không lắp đặt thêm thiết bị điện, phụ kiện không đúng theo thiết kế của nhà sản xuất; tuân thủ quy trình vận hành bảo trì bảo dưỡng định kỳ; thường xuyên kiểm tra phương tiện, khi phát hiện thấy dấu hiệu khác lạ (khó nổ, có hơi xăng, có tiếng kêu bất thường, nhiệt độ của máy cao, có mùi khét) cần khắc phục ngay.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (202, 'Khi để xe trong nhà, ở nơi trông giữ xe phải tắt khóa điện, để xa nguồn lửa, nguồn nhiệt; không mua xăng, dầu ở các điểm bán tự phát, không rõ nguồn gốc; không sử dụng các biện pháp “tiết kiệm xăng, dầu” khi chưa được kiểm chứng về mức độ an toàn có thể gây hỏng xe hoặc dẫn đến nguy cơ xảy ra cháy cao.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (202, 'Không để các chất dễ cháy, dễ bắt lửa trong xe, dưới yên xe, trong cốp xe, trong khoang động cơ. Đối với xe điện cần chọn địa điểm sạc an toàn, sử dụng các thiết bị sạc đúng cách và giám sát quá trình sạc.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (202, 'Cả ba ý trên.', 1, 4);

-- Question 203
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (203, 'ALL', 3, 203, 'Người điều khiển phương tiện cơ giới đường bộ phải thực hiện những biện pháp gì dưới đây để chữa cháy trong trường hợp phương tiện bị cháy, xét thấy có khả năng dập tắt đám cháy?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 2)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 203;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (203, 'Tắt khoá điện, hô hoán để mọi người đến trợ giúp chữa cháy, gọi Cảnh sát phòng cháy chữa cháy và cứu nạn cứu hộ (điện thoại 114).', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (203, 'Nếu nhiên liệu chưa trào ra ngoài (ngọn lửa chưa cháy dữ dội) thì có thể sử dụng nước, hoặc bất kỳ chất, phương tiện chữa cháy có được để dập lửa; nếu nhiên liệu đã trào ra ngoài (ngọn lửa cháy dữ dội) thì phải sử dụng các bình chữa cháy, cát, chăn chiên, bao tải, vải nhúng nước để dập lửa.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (203, 'Cả hai ý trên.', 1, 3);

-- Question 204
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (204, 'ALL', 3, 204, 'Khi phát hiện thấy có ngọn lửa, khói hoặc nhiệt độ cao bất thường từ phương tiện giao thông do mình điều khiển người lái xe phải làm gì trước tiên?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 2)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 204;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (204, 'Bình tĩnh, đưa xe sát vào lề đường, tránh xa nơi có nhiều người, nhiều chất dễ cháy và tắt khóa điện, thực hiện các bước chữa cháy.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (204, 'Hô hoán để mọi người đến trợ giúp chữa cháy, gọi Cảnh sát giao thông, Cảnh sát phòng cháy chữa cháy và cứu nạn, cứu hộ, lực lượng y tế để sẵn sàng hỗ trợ cứu người.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (204, 'Nếu nhiên liệu trào ra ngoài, ngọn lửa chưa cháy dữ dội thì tiếp tục sử dụng nước, hoặc bất kỳ chất, phương tiện chữa cháy có được để dập lửa.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (204, 'Cả ba ý trên.', 0, 4);

-- Question 205
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (205, 'ALL', 3, 205, 'Khi gặp nạn nhân bị bỏng trong vụ tai nạn giao thông, người lái xe cần làm gì?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 205;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (205, 'Gọi số 115 để thông báo về tình trạng tai nạn và yêu cầu hỗ trợ y tế ngay lập tức. Quan sát hiện trường để giúp nạn nhân, đồng thời tránh gây tổn thương cho mình.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (205, 'Nhanh chóng loại bỏ nguyên nhân gây bỏng bằng cách tách nạn nhân khỏi vật gây cháy, cởi bỏ quần áo nếu bén lửa, ngâm vùng da bị bỏng vào nước sạch hoặc đắp khăn mát, lưu ý không dùng khăn hoặc nước quá lạnh.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (205, 'Nếu nạn nhân còn tỉnh, cần cho uống bù nước. Trong thời tiết lạnh, cần giữ ấm cho cơ thể nạn nhân, sau đó nhanh chóng đưa đến cơ sở y tế gần nhất.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (205, 'Cả ba ý trên.', 1, 4);

-- Question 206
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (206, 'ALL', 4, 206, 'Khi điều khiển xe mô tô tay ga xuống đường dốc dài, độ dốc cao, người lái xe cần thực hiện các thao tác nào dưới đây để bảo đảm an toàn?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 206;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (206, 'Giữ tay ga ở mức độ phù hợp, sử dụng phanh trước và phanh sau để giảm tốc độ.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (206, 'Nhả hết tay ga, tắt động cơ, sử dụng phanh trước và phanh sau để giảm tốc độ.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (206, 'Sử dụng phanh trước để giảm tốc độ kết hợp với tắt chìa khóa điện của xe.', 0, 3);

-- Question 207
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (207, 'ALL', 4, 207, 'Khi vào số để khởi hành xe ô tô có số tự động, người lái xe phải thực hiện các thao tác nào để bảo đảm an toàn?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 207;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (207, 'Đạp bàn đạp phanh chân hết hành trình, vào số và nhả phanh đỗ, kiểm tra lại xem có bị nhầm số không rồi mới cho xe lăn bánh.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (207, 'Đạp bàn đạp để tăng ga với mức độ phù hợp, vào số và kiểm tra lại xem có bị nhầm số không rồi mới cho xe lăn bánh.', 0, 2);

-- Question 208
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (208, 'ALL', 4, 208, 'Khi nhả phanh đỗcơ khí điều khiển bằng tay (phanh tay), người lái xe cần phải thực hiện các thao tác nào?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 208;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (208, 'Dùng lực tay phải kéo cần phanh tay về phía sau hết hành trình; nếu khóa hãm bị kẹt cứng phải đẩy mạnh phanh tay về phía trước, sau đó bóp khóa hãm.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (208, 'Dùng lực tay phải bóp khóa hãm đẩy cần phanh tay về phía trước hết hành trình; nếu khóa hãm bị kẹt cứng phải kéo cần phanh tay về phía sau đồng thời bóp khóa hãm.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (208, 'Dùng lực tay phải đẩy cần phanh tay về phía trước hết hành trình; nếu khóa hãm bị kẹt cứng phải đẩy mạnh phanh tay về phía trước, sau đó bóp khóa hãm.', 0, 3);

-- Question 209
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (209, 'ALL', 4, 209, 'Khi khởi hành ô tô sử dụng hộp số cơ khí trên đường bằng, người lái xe cần thực hiện các thao tác nào theo trình tự dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 209;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (209, 'Kiểm tra an toàn xung quanh xe ô tô; nhả từ từ đến 1/2 hành trình bàn đạp ly hợp (côn) và giữ trong khoảng 3 giây; vào số 1; nhả hết phanh tay, báo hiệu bằng còi, đèn trước khi xuất phát; tăng ga đủ để xuất phát, sau đó vừa tăng ga vừa nhả hết côn để cho xe ô tô chuyển động.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (209, 'Kiểm tra an toàn xung quanh xe ô tô; đạp ly hợp (côn) hết hành trình; vào số 1; nhả hết phanh tay, báo hiệu bằng còi, đèn trước khi xuất phát; tăng ga đủ để xuất phát; nhả từ từ đến 1/2 hành trình bàn đạp côn và giữ trong khoảng 3 giây, sau đó vừa tăng ga vừa nhả hết côn để cho xe ô tô chuyển động.', 1, 2);

-- Question 210
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (210, 'ALL', 4, 210, 'Khi quay đầu xe, người lái xe cần phải quan sát và thực hiện các thao tác nào để bảo đảm an toàn giao thông?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 210;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (210, 'Quan sát biển báo hiệu để biết nơi được phép quay đầu; quan sát kỹ địa hình nơi chọn để quay đầu; lựa chọn quỹ đạo quay đầu xe cho thích hợp; quay đầu xe với tốc độ thấp; thường xuyên báo tín hiệu để người, các phương tiện xung quanh được biết; nếu quay đầu xe ở nơi nguy hiểm thì đưa đầu xe về phía nguy hiểm, đưa đuôi xe về phía an toàn.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (210, 'Quan sát biển báo hiệu để biết nơi được phép quay đầu; quan sát kỹ địa hình nơi chọn để quay đầu; lựa chọn quỹ đạo quay đầu xe; quay đầu xe với tốc độ tối đa; thường xuyên báo tín hiệu để người, các phương tiện xung quanh được biết; nếu quay đầu xe ở nơi nguy hiểm thì đưa đuôi xe về phía nguy hiểm và đầu xe về phía an toàn.', 0, 2);

-- Question 211
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (211, 'ALL', 4, 211, 'Khi ngồi lái ô tô tư thế chân, lưng, tay của người lái xe như thế nào là đúng để bảo đảm an toàn và thoải mái?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 211;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (211, 'Điều chỉnh ghế sao cho chân có thể đạp phanh và ga dễ dàng, ngồi thẳng lưng, hai tay nắm vô lăng, tay trái nắm ở vị trí 9 đến 10 giờ và tay phải nắm ở vị trí từ 2 đến 4 giờ.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (211, 'Ngồi sát vô lăng để dễ quan sát hoặc ngồi tự do, không cần điều chỉnh ghế.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (211, 'Ngồi ngả người về phía sau nhiều để thư giãn, chân trái để ở vị trí chân ga, hai tay nắm vô lăng ở vị trí bất kỳ.', 0, 3);

-- Question 212
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (212, 'ALL', 4, 212, 'Khi điều khiển ô tô lên dốc cao, người lái xe cần thực hiện các thao tác nào dưới đây để bảo đảm an toàn?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 212;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (212, 'Tăng lên số cao từ chân dốc, điều chỉnh ga cho xe nhanh lên dốc; đến gần đỉnh dốc phải tăng ga để xe nhanh chóng qua dốc; về số thấp, đi sát về phía bên phải đường, có tín hiệu (còi, đèn) để báo cho người lái xe đi ngược chiều biết.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (212, 'Về số thấp từ chân dốc, điều chỉnh ga cho xe từ từ lên dốc; đến gần đỉnh dốc phải đi chậm, đi sát về phía bên phải đường, có tín hiệu (còi, đèn) để báo cho người lái xe đi ngược chiều biết.', 1, 2);

-- Question 213
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (213, 'ALL', 4, 213, 'Khi điều khiển ô tô xuống dốc dài, người lái xe cần thực hiện các thao tác nào dưới đây để bảo đảm an toàn?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 213;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (213, 'Tăng lên số cao, nhả bàn đạp ga ở mức độ phù hợp, kết hợp với phanh chân để khống chế tốc độ.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (213, 'Về số thấp, nhả bàn đạp ga ở mức độ phù hợp, kết hợp với phanh chân để khống chế tốc độ.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (213, 'Về số không (0), nhả bàn đạp ga ở mức độ phù hợp, kết hợp với phanh chân để khống chế tốc độ.', 0, 3);

-- Question 214
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (214, 'ALL', 4, 214, 'Khi xuống dốc, muốn dừng xe, người lái xe cần thực hiện các thao tác nào để bảo đảm an toàn?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 214;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (214, 'Có tín hiệu rẽ phải, điều khiển xe sát vào lề đường bên phải; đạp phanh sớm và mạnh hơn lúc dừng xe trên đường bằng để xe đi với tốc độ chậm đến mức dễ dàng dừng lại được; về số 1, đạp 1/2 ly hợp (côn) cho xe đến chỗ dừng; khi xe đã dừng, về số không (N), đạp phanh chân, sử dụng phanh đỗ.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (214, 'Có tín hiệu rẽ phải, điều khiển xe sát vào lề đường bên trái; đạp hết hành trình ly hợp (côn) và nhả bàn đạp ga để xe đi với tốc độ chậm đến mức dễ dàng dừng lại được tại chỗ dừng; khi xe đã dừng, đạp và giữ phanh chân.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (214, 'Có tín hiệu rẽ trái, điều khiển xe sát vào lề đường bên phải; đạp phanh sớm và mạnh hơn lúc dừng xe trên đường bằng để xe đi với tốc độ chậm đến mức dễ dàng dừng lại được; về số không (N) để xe đi đến chỗ dừng, khi xe đã dừng, sử dụng phanh đỗ.', 0, 3);

-- Question 215
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (215, 'ALL', 4, 215, 'Khi điều khiển xe trên đường vòng người lái xe cần phải làm gì để bảo đảm an toàn?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 215;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (215, 'Quan sát cẩn thận các chướng ngại vật và báo hiệu bằng coi, đèn; giảm tốc độ tới mức cần thiết, về số thấp và thực hiện quay vòng với tốc độ phù hợp với bán kính cong của đường vòng.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (215, 'Quan sát cẩn thận các chướng ngại vật và báo hiệu bằng còi, đèn; tăng tốc để nhanh chóng qua đường vòng và giảm tốc độ sau khi qua đường vòng.', 0, 2);

-- Question 216
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (216, 'ALL', 4, 216, 'Khi điều khiển xe ô tô rẽ phải, người lái xe cần thực hiện các thao tác nào để bảo đảm an toàn?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 3)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 216;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (216, 'Có tín hiệu rẽ phải; quan sát an toàn phía sau; điều khiển xe sang làn đường bên trái; giảm tốc độ và quan sát an toàn phía bên phải để điều khiển xe qua chỗ đường giao nhau.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (216, 'Cách chỗ rẽ một khoảng cách an toàn có tín hiệu rẽ phải; giảm tốc độ, quan sát an toàn phía trước, sau, bên phải và điều khiển xe từ từ rẽ phải.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (216, 'Cách chỗ rẽ một khoảng cách an toàn có tín hiệu rẽ phải; quan sát an toàn phía sau; điều khiển xe bám sát vào phía phải đường; tăng tốc độ và quan sát an toàn phía bên trái để điều khiển xe qua chỗ đường giao nhau.', 0, 3);

-- Question 217
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (217, 'ALL', 4, 217, 'Khi điều khiển xe ô tô rẽ trái, người lái xe cần thực hiện các thao tác nào để bảo đảm an toàn?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 217;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (217, 'Cách chỗ rẽ một khoảng cách an toàn có tín hiệu rẽ trái; giảm tốc độ, quan sát an toàn xung quanh đặc biệt là bên trái; đổi sang làn đường bên trái và điều khiển xe từ từ rẽ trái.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (217, 'Cách chỗ rẽ một khoảng cách an toàn có tín hiệu rẽ trái, tăng tốc độ để xe nhanh chóng qua chỗ đường giao nhau; có tín hiệu xin đổi làn đường; quan sát an toàn xung quanh đặc biệt là bên trái; đổi làn đường sang phải để mở rộng vòng cua.', 0, 2);

-- Question 218
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (218, 'ALL', 4, 218, 'Khi điều khiển xe sử dụng hộp số cơ khí vượt qua rãnh lớn cắt ngang mặt đường, người lái xe cần thực hiện các thao tác nào để đảm bảo an toàn?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 218;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (218, 'Vào số một (1) và từ từ cho hai bánh xe trước xuống rãnh, tăng ga cho hai bánh xe trước vượt lên khỏi rãnh, tăng số, tăng tốc độ để bánh xe sau vượt qua rãnh.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (218, 'Tăng ga, tăng số để hai bánh xe trước và bánh xe sau vượt qua khỏi rãnh và chạy bình thường.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (218, 'Vào số một (1) và từ từ cho hai bánh xe trước xuống rãnh, tăng ga cho hai bánh xe trước vượt lên khỏi rãnh, tiếp tục để bánh xe sau từ từ xuống rãnh rồi tăng dần ga cho xe ô tô lên khỏi rãnh.', 1, 3);

-- Question 219
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (219, 'ALL', 4, 219, 'Khi điều khiển xe qua đường sắt, người lái xe cần phải thực hiện các thao tác nào dưới đây để bảo đảm an toàn?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 2)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 219;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (219, 'Khi có chuông báo hoặc thanh chắn đã hạ xuống, người lái xe phải dừng xe tạm thời đúng khoảng cách an toàn, kéo phanh tay nếu đường dốc hoặc phải chờ lâu.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (219, 'Khi không có chuông báo hoặc thanh chắn không hạ xuống, người lái xe cần phải quan sát nếu thấy đủ điều kiện an toàn thì về số thấp, tăng ga nhẹ và không thay đổi số trong quá trình vượt qua đường sắt để tránh động cơ chết máy cho xe cho vượt qua.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (219, 'Cả hai ý trên.', 1, 3);

-- Question 220
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (220, 'ALL', 4, 220, 'Khi điều khiển xe ô tô tự đổ, người lái xe cần chú ý những điểm gì để  bảo đảm an toàn?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 220;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (220, 'Khi chạy trên đường xấu, nhiều ổ gà nên chạy chậm để thùng xe không bị lắc mạnh, không gây hiện tượng lệch "ben"; khi chạy vào đường vòng, cần giảm tốc độ, không lấy lái gấp và không phanh gấp.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (220, 'Khi chạy trên đường quốc lộ, đường bằng phẳng không cần hạ hết thùng xe xuống.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (220, 'Khi đổ hàng phải chọn vị trí có nền đường cứng và phẳng, dừng hẳn xe, kéo hết phanh đỗ; sau đó mới điều khiển cơ cấu nâng "ben" để đổ hàng, đổ xong hàng mới hạ thùng xuống.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (220, 'Ý 1 và ý 3.', 1, 4);

-- Question 221
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (221, 'ALL', 4, 221, 'Khi điều khiển xe tăng số, người lái xe cần chú ý những điểm gì để bảo đảm an toàn?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 221;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (221, 'Không được nhìn xuống buồng lái, cần phải tăng thứ tự từ thấp đến cao, phối hợp các động tác phải nhịp nhàng, chính xác.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (221, 'Nhìn xuống buồng lái để biết chính xác vị trí các tay số, cần phải tăng thứ tự từ thấp đến cao, phối hợp các động tác phải nhịp nhàng, vù ga phải phù hợp với tốc độ.', 0, 2);

-- Question 222
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (222, 'ALL', 4, 222, 'Khi điều khiển xe giảm số, người lái xe cần phải chú ý những điểm gì để bảo đảm an toàn?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 222;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (222, 'Nhìn xuống buồng lái để biết chính xác vị trí các tay số, cần phải giảm thứ tự từ cao xuống thấp, phối hợp các động tác phải nhịp nhàng, chính xác.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (222, 'Không được nhìn xuống buồng lái, cần phải giảm thứ tự từ cao xuống thấp, phối hợp các động tác phải nhịp nhàng, chính xác, vù ga phải phù hợp với tốc độ.', 1, 2);

-- Question 223
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (223, 'ALL', 4, 223, 'Để giảm tốc độ khi ô tô đi xuống đường dốc dài, người lái xe phải thực hiện các thao tác nào để bảo đảm an toàn?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 223;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (223, 'Nhả bàn đạp ga, đạp ly hợp (côn) hết hành trình, đạp mạnh phanh chân để giảm tốc độ.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (223, 'Về số thấp phù hợp, nhả bàn đạp ga, kết hợp đạp phanh chân với mức độ phù hợp để giảm tốc độ.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (223, 'Nhả bàn đạp ga, tăng lên số cao, đạp phanh chân với mức độ phù hợp để giảm tốc độ.', 0, 3);

-- Question 224
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (224, 'ALL', 4, 224, 'Khi điều khiển ô tô qua đường ngập nước, người lái xe cần thực hiện các thao tác nào để đảm bảo an toàn?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 224;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (224, 'Tăng lên số cao, tăng ga và giảm ga liên tục để thay đổi tốc độ, giữ vững tay lái để ô tô vượt qua đoạn đường ngập nước.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (224, 'Đạp ly hợp (côn) hết hành trình, tăng ga và giảm ga liên tục để thay đổi tốc độ, giữ vững tay lái để ô tô vượt qua đoạn đường ngập nước.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (224, 'Quan sát, ước lượng độ ngập nước mà xe ô tô có thể vượt qua an toàn, về số thấp, giữ đều ga và giữ vững tay lái để ô tô vượt qua đoạn đường ngập nước.', 1, 3);

-- Question 225
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (225, 'ALL', 4, 225, 'Khi điều khiển xe ô tô tới gần xe chạy ngược chiều vào ban đêm, người lái xe cần thực hiện các thao tác nào để bảo đảm an toàn?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 225;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (225, 'Chuyển từ đèn chiếu xa sang đèn chiếu gần; không nhìn thẳng vào đèn của xe chạy ngược chiều mà nhìn chếch sang phía phải theo chiều chuyển động của xe mình.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (225, 'Chuyển từ đèn chiếu gần sang đèn chiếu xa; không nhìn thẳng vào đèn của xe chạy ngược chiều mà nhìn chếch sang phía phải theo chiều chuyển động của xe mình.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (225, 'Chuyển từ đèn chiếu xa sang đèn chiếu gần; nhìn thẳng vào đèn của xe chạy ngược chiều để tránh xe bảo đảm an toàn.', 0, 3);

-- Question 226
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (226, 'ALL', 4, 226, 'Khi điều khiển xe ô tô trên đường trơn cần chú ý những điểm gì để bảo đảm an toàn?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 226;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (226, 'Giữ vững tay lái cho xe đi đúng vệt bánh xe đi trước, sử dụng số thấp đi chậm, giữ đều ga, đánh lái ngoặt và phanh gấp khi cần thiết.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (226, 'Giữ vững tay lái cho xe đi đúng vệt bánh xe đi trước, sử dụng số thấp đi chậm, gài cầu (nếu có), giữ đều ga, không lấy nhiều lái, không đánh lái ngoặt và phanh gấp.', 1, 2);

-- Question 227
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (227, 'ALL', 4, 227, 'Khi động cơ xe ô tô đã khởi động, bảng đồng hồ xuất hiện ký hiệu như hình vẽ dưới đây là báo hiệu tình trạng gì của xe ô tô?', '/question-images/q227.jpg', '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 227;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (227, 'Đang sử dụng phanh đỗ.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (227, 'Nhiệt độ nước làm mát quá mức cho phép.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (227, 'Cửa xe đang mở.', 0, 3);

-- Question 228
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (228, 'ALL', 4, 228, 'Khi động cơ xe ô tô đã khởi động, bảng đồng hồ xuất hiện ký hiệu như hình vẽ dưới đây là báo hiệu tình trạng gì của xe ô tô?', '/question-images/q228.jpg', '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 228;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (228, 'Đang sử dụng phanh đỗ.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (228, 'Thiếu dầu phanh.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (228, 'Nhiệt độ nước làm mát tăng quá mức cho phép.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (228, 'Áp suất dầu ở mức thấp.', 1, 4);

-- Question 229
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (229, 'ALL', 4, 229, 'Khi động cơ xe ô tô đã khởi động, bảng đồng hồ xuất hiện ký hiệu như hình vẽ dưới đây là báo hiệu tình trạng gì của xe ô tô?', '/question-images/q229.jpg', '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 229;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (229, 'Cửa xe đóng chưa chặt hoặc có cửa xe chưa đóng.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (229, 'Bộ nạp ắc quy gặp sự cố kỹ thuật.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (229, 'Dầu bôi trơn bị thiếu.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (229, 'Ý 2 và ý 3.', 0, 4);

-- Question 230
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (230, 'ALL', 4, 230, 'Khi động cơ xe ô tô đã khởi động, bảng đồng hồ xuất hiện ký hiệu như hình vẽ dưới đây là báo hiệu tình trạng gì của xe ô tô?', '/question-images/q230.jpg', '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 230;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (230, 'Thiếu dầu phanh, phanh tay đang hãm.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (230, 'Hệ thống túi khí an toàn gặp sự cố.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (230, 'Lái xe và người ngồi ghế trước chưa cài dây đai an toàn.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (230, 'Cửa đóng chưa chặt, có cửa chưa đóng.', 0, 4);

-- Question 231
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (231, 'ALL', 4, 231, 'Khi động cơ xe ô tô đã khởi động, bảng đồng hồ xuất hiện ký hiệu như hình vẽ dưới đây là báo hiệu tình trạng gì của xe ô tô?', '/question-images/q231.jpg', '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 231;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (231, 'Báo hiệu thiếu dầu phanh.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (231, 'Áp suất lốp không đủ.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (231, 'Đang sử dụng phanh đỗ.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (231, 'Sắp hết nhiên liệu.', 1, 4);

-- Question 232
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (232, 'ALL', 4, 232, 'Trong các loại nhiên liệu dưới đây, loại nhiên liệu nào giảm thiểu ô nhiễm môi trường?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 232;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (232, 'Xăng và dầu diesel.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (232, 'Xăng sinh học và khí sinh học.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (232, 'Ý 1 và ý 2.', 0, 3);

-- Question 233
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (233, 'ALL', 4, 233, 'Các biện pháp tiết kiệm nhiên liệu khi chạy xe?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 233;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (233, 'Bảo dưỡng xe theo định kỳ và có kế hoạch lộ trình trước khi xe chạy.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (233, 'Kiểm tra áp suất lốp theo quy định và chạy xe với tốc độ phù hợp với tình trạng mặt đường và mật độ giao thông trên đường.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (233, 'Cả hai ý trên.', 1, 3);

-- Question 234
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (234, 'ALL', 4, 234, 'Khi đã đỗ xe ô tô sát lề đường bên phải, người lái xe phải thực hiện các thao tác nào dưới đây khi mở cửa xuống xe để đảm bảo an toàn?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 234;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (234, 'Quan sát tình hình giao thông phía trước, phía sau và phía bên mở cửa xe, mở hé cánh cửa, nếu đảm bảo an toàn thì mở cửa ở mức cần thiết để xuống xe ô tô.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (234, 'Mở cánh cửa và quan sát tình hình giao thông phía trước, nếu đảm bảo an toàn thì mở cửa ở mức cần thiết để xuống xe ô tô.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (234, 'Mở cánh cửa hết hành trình và nhanh chóng ra khỏi xe ô tô.', 0, 3);

-- Question 235
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (235, 'ALL', 4, 235, 'Khi điều khiển xe ô tô qua đường sắt không có rào chắn, không có người điều khiển giao thông, người lái xe phải xử lý như thế nào?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 235;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (235, 'Giảm tốc độ, dừng lại trước vạch dừng, quan sát cả hai phía, nếu không có tàu đi tới, tăng ga nhẹ vượt qua đường sắt.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (235, 'Nếu thấy có tàu đi tới thì dừng lại trước vạch dừng, chỉ khi tàu đi qua mới được đi.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (235, 'Cả hai ý trên.', 1, 3);

-- Question 236
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (236, 'ALL', 4, 236, 'Khi lái xe ô tô qua đường sắt không có rào chắn, không có người điều khiển giao thông, người lái xe thực hiện thao tác: “giảm tốc độ, dừng lại trước vạch dừng, quan sát cả hai phía, nếu không có tàu đi tới, tăng ga nhẹ vượt qua đường sắt. Nếu thấy có tàu đi tới thì dừng lại trước vạch dừng, chỉ khi tàu đi qua mới được đi” để đảm bảo an toàn là đúng hay không?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 3)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 236;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (236, 'Không đúng.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (236, 'Đúng.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (236, 'Không cần thiết, vì nếu nhìn thấy tàu còn cách xa, người lái xe có thể tăng số cao, tăng ga để cho xe nhanh chóng vượt qua đường sắt.', 0, 3);

-- Question 237
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (237, 'ALL', 4, 237, 'Khi điều khiển xe ô tô có hộp số tự động đi vào đường trơn trượt, lầy lội, người lái xe phải xử lý như thế nào để đảm bảo an toàn?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 237;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (237, 'Về số thấp, kết hợp phanh chân để giảm tốc độ.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (237, 'Giữ nguyên tay số D, kết hợp phanh đỗ để giảm tốc độ.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (237, 'Về số N (số 0), kết hợp phanh chân để giảm tốc độ.', 0, 3);

-- Question 238
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (238, 'ALL', 4, 238, 'Khi động cơ ô tô đã khởi động, muốn điều chỉnh ghế của người lái, người lái xe phải để cần số ở vị trí nào?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 238;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (238, 'Vị trí N hoặc vị trí P hoặc số 0.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (238, 'Vị trí D hoặc số 1.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (238, 'Vị trí R.', 0, 3);

-- Question 239
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (239, 'ALL', 4, 239, 'Khi điều khiển xe ô tô có hộp số tự động, người lái xe sử dụng chân như thế nào là đúng để bảo đảm an toàn?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 239;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (239, 'Không sử dụng chân trái; chân phải điều khiển bàn đạp phanh và bàn đạp ga.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (239, 'Chân trái điều khiển bàn đạp phanh, chân phải điều khiển bàn đạp ga.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (239, 'Không sử dụng chân phải; chân trái điều khiển bàn đạp phanh và bàn đạp ga.', 0, 3);

-- Question 240
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (240, 'ALL', 4, 240, 'Khi tầm nhìn bị hạn chế bởi sương mù hoặc mưa to, người lái xe phải thực hiện các thao tác nào để bảo đảm an toàn?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 2)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 240;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (240, 'Tăng tốc độ, chạy gần xe trước, nhìn đèn hậu để định hướng.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (240, 'Giảm tốc độ, chạy cách xa xe trước với khoảng cách an toàn, bật đèn sương mù và đèn chiếu gần.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (240, 'Tăng tốc độ, bật đèn pha vượt qua xe chạy trước.', 0, 3);

-- Question 241
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (241, 'ALL', 4, 241, 'Khi đèn pha của xe đi ngược chiều gây chói mắt, làm giảm khả năng quan sát trên đường, người lái xe xử lý như thế nào dưới đây để bảo đảm an toàn?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 241;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (241, 'Giảm tốc độ, giữ vững tay lái, nhìn chếch sang lề đường bên phải.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (241, 'Bật đèn pha chiếu xa và giữ nguyên tốc độ.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (241, 'Tăng tốc độ, bật đèn pha đối diện xe phía trước.', 0, 3);

-- Question 242
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (242, 'ALL', 4, 242, 'Để đạt được hiệu quả phanh cao nhất, người lái xe mô tô phải sử dụng các kỹ năng như thế nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 3)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 242;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (242, 'Sử dụng phanh trước.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (242, 'Sử dụng phanh sau.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (242, 'Giảm hết ga, sử dụng đồng thời cả phanh sau và phanh trước.', 1, 3);

-- Question 243
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (243, 'ALL', 4, 243, 'Khi lái xe ô tô trên mặt đường có nhiều "ổ gà", người lái xe phải thực hiện thao tác như thế nào để bảo đảm an toàn?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 3)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 243;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (243, 'Giảm tốc độ, về số thấp và giữ đều ga.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (243, 'Tăng tốc độ cho xe lướt qua nhanh.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (243, 'Tăng tốc độ, đánh lái liên tục để tránh "ổ gà".', 0, 3);

-- Question 244
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (244, 'ALL', 4, 244, 'Khi điều khiển xe ô tô gặp mưa to hoặc sương mù, người lái xe phải làm gì để bảo đảm an toàn?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 244;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (244, 'Bật đèn chiếu gần và đèn vàng (nếu có), điều khiển gạt nước, điều khiển ô tô đi với tốc độ chậm để có thể quan sát được; tìm chỗ an toàn dừng xe, bật đèn dừng khẩn cấp báo hiệu cho các xe khác biết.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (244, 'Bật đèn chiếu xa và đèn vàng, điều khiển gạt nước, tăng tốc độ điều khiển ô tô qua khỏi khu vực mưa hoặc sương mù.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (244, 'Tăng tốc độ, bật đèn pha vượt qua xe chạy phía trước.', 0, 3);

-- Question 245
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (245, 'ALL', 4, 245, 'Điều khiển xe ô tô trong trời mưa, người lái xe phải xử lý như thế nào để bảo đảm an toàn?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 245;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (245, 'Giảm tốc độ, tăng cường quan sát, không nên phanh gấp, không nên tăng ga hay đánh vô lăng đột ngột, bật đèn chiếu gần, mở chế độ gạt nước ở chế độ phù hợp để đảm bảo quan sát.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (245, 'Phanh gấp khi xe đi vào vũng nước và tăng ga ngay sau khi ra khỏi vũng nước.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (245, 'Bật đèn chiếu xa, tăng tốc độ điều khiển ô tô qua khỏi khu vực mưa.', 0, 3);

-- Question 246
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (246, 'ALL', 4, 246, 'Khi lùi xe, người lái xe phải xử lý như thế nào để bảo đảm an toàn giao thông?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 246;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (246, 'Quan sát bên trái, bên phải, phía sau xe, có tín hiệu cần thiết và lùi xe với tốc độ phù hợp.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (246, 'Quan sát phía trước xe và lùi xe với tốc độ nhanh.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (246, 'Quan sát bên trái và phía trước của xe và lùi xe với tốc độ nhanh.', 0, 3);

-- Question 247
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (247, 'ALL', 4, 247, 'Điều khiển xe ô tô trong khu vực đông dân cư cần lưu ý điều gì dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 247;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (247, 'Giảm tốc độ đến mức an toàn, quan sát, nhường đường cho người đi bộ, giữ khoảng cách an toàn với các xe phía trước.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (247, 'Đi đúng làn đường quy định, chỉ được chuyển làn đường ở nơi cho phép, nhưng phải quan sát.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (247, 'Cả hai ý trên.', 1, 3);

-- Question 248
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (248, 'ALL', 4, 248, 'Khi điều khiển xe ô tô nhập vào đường cao tốc người lái xe cần thực hiện như thế nào dưới đây để bảo đảm an toàn giao thông?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 248;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (248, 'Quan sát, phát tín hiệu, nhường đường cho các xe đang chạy trên đường cao tốc, khi đủ điều kiện an toàn thì tăng tốc độ cho xe nhập vào làn đường cao tốc, nếu có làn đường tăng tốc thì phải cho xe chạy trên làn đường đó trước khi cho xe nhập vào làn của đường cao tốc.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (248, 'Phát tín hiệu, quan sát các xe đang chạy phía trước, nếu bảo đảm các điều kiện an toàn thì tăng tốc độ cho xe nhập ngay vào làn đường cao tốc.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (248, 'Phát tín hiệu và lái xe nhập vào làn đường tăng tốc, quan sát các xe phía sau đang chạy trên đường cao tốc, khi đủ điều kiện an toàn thì giảm tốc độ, từ từ cho xe nhập vào làn đường cao tốc.', 0, 3);

-- Question 249
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (249, 'ALL', 4, 249, 'Khi điều khiển xe ô tô ra khỏi đường cao tốc người lái xe cần thực hiện như thế nào dưới đây để bảo đảm an toàn giao thông?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 249;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (249, 'Quan sát phía trước để tìm biển báo chỉ dẫn "lối ra đường cao tốc", kiểm tra tình trạng giao thông phía sau và bên phải, nếu bảo đảm điều kiện an toàn thì phát tín hiệu và điều khiển xe chuyển dần sang làn bên phải, nếu có làn đường giảm tốc thì phải cho xe di chuyển trên làn đường đó trước khi ra khỏi đường cao tốc.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (249, 'Quan sát phía trước để tìm biển báo chỉ dẫn "lối ra đường cao tốc", trường hợp vượt qua "lối ra đường cao tốc" thì phát tín hiệu, di chuyển sang làn đường giảm tốc và lùi xe quay trở lại.', 0, 2);

-- Question 250
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (250, 'ALL', 4, 250, 'Người lái xe được dừng xe, đỗ xe trên làn dừng khẩn cấp của đường cao tốc trong trường hợp nào dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 250;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (250, 'Xe gặp sự cố, tai nạn hoặc trường hợp khẩn cấp không thể di chuyển bình thường.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (250, 'Để nghỉ ngơi, đi vệ sinh, chụp ảnh, làm việc riêng...', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (250, 'Cả hai ý trên.', 0, 3);

-- Question 251
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (251, 'ALL', 4, 251, 'Trên đường đôi muốn vượt xe kéo rơ moóc phía trước, người lái xe phải xử lý như thế nào?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 2)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 251;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (251, 'Giữ khoảng cách an toàn, tránh đi vào vị trí điểm mù của xe kéo rơ moóc, bật xi nhan trái đồng thời kết hợp đèn, còi xin vượt.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (251, 'Khi xe kéo rơ moóc đã có tín hiệu cho vượt (không có chướng ngại vật phía trước và xe đi ngược chiều), thấy đủ điều kiện an toàn thì vượt dứt khoát, không di chuyển song song bên cạnh xe kéo rơ moóc.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (251, 'Khi vượt qua, phải quan sát gương chiếu hậu bên phải nếu có khoảng trống an toàn mới được cho xe chạy vào làn của mình, tắt xi nhan và tiếp tục hành trình.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (251, 'Cả ba ý trên.', 1, 4);

-- Question 252
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (252, 'ALL', 4, 252, 'Khi điều khiển xe ô tô xuống đường dốc dài, độ dốc cao, người lái xe số tự động cần thực hiện các thao tác nào dưới đây để bảo đảm an toàn?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 252;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (252, 'Nhả bàn đạp ga, về số thấp, đạp phanh chân với mức độ phù hợp để giảm tốc độ.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (252, 'Nhả bàn đạp ga, về số N đạp phanh chân và kéo phanh tay để giảm tốc độ.', 0, 2);

-- Question 253
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (253, 'ALL', 4, 253, 'Khi đi từ đường nhánh ra đường chính, người lái xe phải xử lý như thế nào là đúng?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 3)', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 253;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (253, 'Quan sát, giảm tốc độ, phát tín hiệu, nhường đường cho xe trên đường chính từ bất kỳ hướng nào tới.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (253, 'Nháy đèn, bấm còi để xe đi trên đường chính biết và tăng tốc độ cho xe đi ra đường chính.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (253, 'Quan sát xe đang đi trên đường chính, nếu là xe có kích thước lớn hơn thì nhường đường, xe có kích thước nhỏ hơn thì tăng tốc độ cho xe đi ra đường chính.', 0, 3);

-- Question 254
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (254, 'ALL', 4, 254, 'Khi đang lái xe mô tô hoặc ô tô, nếu có nhu cầu sử dụng điện thoại để nhắn tin hoặc gọi điện, người lái xe phải thực hiện như thế nào trong các tình huống nêu dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 254;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (254, 'Giảm tốc độ để bảo đảm an toàn với xe phía trước và sử dụng điện thoại để liên lạc.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (254, 'Giảm tốc độ để dừng xe ở nơi cho phép sau đó sử dụng điện thoại để liên lạc.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (254, 'Tăng tốc độ để cách xa xe phía sau và sử dụng điện thoại để liên lạc.', 0, 3);

-- Question 255
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (255, 'ALL', 4, 255, 'Những thói quen nào dưới đây khi điều khiển xe mô tô tay ga tham gia giao thông dễ gây tai nạn nguy hiểm?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 255;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (255, 'Sử dụng còi.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (255, 'Phanh đồng thời cả phanh trước và phanh sau.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (255, 'Chỉ sử dụng phanh trước.', 1, 3);

-- Question 256
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (256, 'ALL', 4, 256, 'Người ngồi trên xe ô tô cần thực hiện những thao tác mở cửa như thế nào dưới đây để xuống xe để bảo đảm an toàn?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 256;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (256, 'Quan sát phía trước, phía sau và bên phía mở cửa để phát hiện các phương tiện đang di chuyển tới gần, khi đủ điều kiện an toàn, mở hé cửa, sau đó mở ở mức cần thiết để xuống xe.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (256, 'Quan sát tình hình giao thông phía trước, không cần quan sát phía sau và bên mở cửa; mở cánh cửa hết hành trình và nhanh chóng ra khỏi xe ô tô.', 0, 2);

-- Question 257
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (257, 'ALL', 4, 257, 'Khi điều khiển xe mô tô quay đầu, người lái xe cần thực hiện như thế nào để bảo đảm an toàn?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 257;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (257, 'Bật tín hiệu báo rẽ trước khi quay đầu, từ từ giảm tốc độ đến mức có thể dừng lại.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (257, 'Chỉ quay đầu xe tại những nơi được phép quay đầu.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (257, 'Quan sát an toàn các phương tiện tới từ phía trước, phía sau, hai bên đồng thời nhường đường cho xe từ bên phải và phía trước đi tới.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (257, 'Cả ba ý trên.', 1, 4);

-- Question 258
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (258, 'ALL', 4, 258, 'Tay ga trên xe mô tô hai bánh có tác dụng gì dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 258;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (258, 'Để điều khiển xe chạy về phía trước.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (258, 'Để điều tiết công suất động cơ qua đó điều khiển tốc độ của xe.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (258, 'Để điều khiển xe chạy lùi.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (258, 'Ý 1 và ý 2.', 1, 4);

-- Question 259
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (259, 'ALL', 4, 259, 'Gương chiếu hậu của xe mô tô hai bánh có tác dụng gì dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 259;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (259, 'Để quan sát an toàn phía bên trái khi chuẩn bị rẽ trái.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (259, 'Để quan sát an toàn phía bên phải khi chuẩn bị rẽ phải.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (259, 'Để quan sát an toàn phía sau của bên trái và bên phải trước khi chuyển hướng.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (259, 'Để quan sát an toàn phía trước cả bên trái và bên phải trước khi chuyển hướng.', 0, 4);

-- Question 260
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (260, 'ALL', 4, 260, 'Để bảo đảm an toàn khi tham gia giao thông, người lái xe mô tô hai bánh cần điều khiển tay ga như thế nào?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 1, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 260;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (260, 'Tăng ga thật mạnh, giảm ga từ từ.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (260, 'Tăng ga thật mạnh, giảm ga thật nhanh.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (260, 'Tăng ga từ từ, giảm ga thật nhanh.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (260, 'Tăng ga từ từ, giảm ga từ từ.', 0, 4);

-- Question 261
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (261, 'ALL', 4, 261, 'Để tránh đổ, ngã khi điều khiển xe mô tô hai bánh ở nơi đường xấu, nhỏ và hẹp, người lái xe cần xử lý như thế nào?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 261;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (261, 'Đi ở tốc độ thấp, quan sát liên tục khoảng cách từ 05 m đến 10 m phía trước để điều chỉnh sớm hướng di chuyển.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (261, 'Trong quá trình di chuyển không nên dùng phanh trước tránh làm khóa bánh dẫn hướng.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (261, 'Không được lắc người sang trái hoặc phải nhiều, trọng tâm cơ thể cần trùng với trọng tâm của xe.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (261, 'Cả ba ý trên.', 1, 4);

-- Question 262
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (262, 'ALL', 4, 262, 'Khi lái xe ô tô điện xuống dốc dài, đổ đèo, người lái xe cần chú ý những vấn đề gì để bảo đảm an toàn?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 262;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (262, 'Kiểm tra hệ thống an toàn, pin của xe trước khi xuất phát.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (262, 'Nhả chân ga để phanh tái sinh hoạt động.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (262, 'Rà phanh chân để kịp thời xử lý tình huống khẩn cấp.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (262, 'Cả ba ý trên.', 1, 4);

-- Question 263
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (263, 'ALL', 4, 263, 'Khi lái xe ô tô điện qua khu vực ngập nước, người lái xe cần phải chú ý những vấn đề gì?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 2)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 263;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (263, 'Người lái xe phải tìm hiểu khả năng chìm trong nước của xe để xác định cung đường di chuyển.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (263, 'Giữ vững tay lái, đi đều ga, tránh không để xe chết máy giữa dòng, không nên dừng xe trên đường ngập nước.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (263, 'Lái xe tốc độ chậm, không tạo sóng và giữ khoảng cách an toàn với các phương tiện xung quanh, nhất là người đi bộ.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (263, 'Cả ba ý trên.', 1, 4);

-- Question 264
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (264, 'ALL', 5, 264, 'Phương pháp kiểm tra mức dầu bôi trơn động cơ nào dưới đây là đúng?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 264;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (264, 'Kiểm tra que thăm dầu trên các-te. Quan sát vệt dầu trên que thăm, mức dầu này phải nằm ở mức tối đa được thể hiện trên que thăm.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (264, 'Rút que thăm dầu trên các-te. Quan sát vệt dầu trên que thăm, mức dầu này phải nằm ở mức tối thiểu được thể hiện trên que thăm.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (264, 'Rút que thăm dầu trên các-te, lau sạch que thăm sau đó cắm vào các-te và rút ra quan sát vệt dầu trên que thăm, mức dầu phải nằm trong khoảng vạch mức tối thiểu và tối đa được thể hiện trên que thăm.', 1, 3);

-- Question 265
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (265, 'ALL', 5, 265, 'Xe ô tô tham gia giao thông đường bộ phải bảo đảm các quy định về chất lượng, an toàn kỹ thuật và bảo vệ môi trường nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 265;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (265, 'Kính chắn gió, kính cửa phải là loại kính an toàn, bảo đảm tầm nhìn cho người điều khiển; có đủ hệ thống hãm và hệ thống chuyển hướng có hiệu lực, tay lái xe ô tô ở bên trái của xe, có còi với âm lượng đúng quy chuẩn kỹ thuật.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (265, 'Có đủ đèn chiếu sáng gần và xa, đèn soi biển số, đèn báo hãm, đèn tín hiệu; có đủ bộ phận giảm thanh, giảm khói, các kết cấu phải đủ độ bền và bảo đảm tính năng vận hành ổn định.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (265, 'Cả hai ý trên.', 1, 3);

-- Question 266
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (266, 'ALL', 5, 266, 'Xe mô tô và xe ô tô tham gia giao thông trên đường bộ có bắt buộc phải đủ bộ phận giảm thanh không?', NULL, '💡 \'Bắt buộc\' → Chọn nghĩa vụ/trách nhiệm pháp lý bắt buộc', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 266;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (266, 'Không bắt buộc.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (266, 'Bắt buộc.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (266, 'Tùy từng trường hợp.', 0, 3);

-- Question 267
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (267, 'ALL', 5, 267, 'Xe ô tô tham gia giao thông trên đường bộ phải có đủ các loại đèn nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 2)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 267;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (267, 'Đèn chiếu sáng gần và xa.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (267, 'Đèn soi biển số, đèn báo hãm và đèn tín hiệu.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (267, 'Dàn đèn pha trên nóc xe.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (267, 'Ý 1 và ý 2.', 1, 4);

-- Question 268
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (268, 'ALL', 5, 268, 'Kính chắn gió của xe ô tô phải bảo đảm yêu cầu nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 268;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (268, 'Là loại kính an toàn, kính nhiều lớp, đúng quy cách, không rạn nứt, bảo đảm hình ảnh quan sát rõ ràng, không bị méo mó.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (268, 'Là loại kính trong suốt, không rạn nứt, bảo đảm tầm nhìn cho người điều khiển về phía trước mặt và hai bên.', 0, 2);

-- Question 269
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (269, 'ALL', 5, 269, 'Bánh xe, lốp lắp cho xe ô tô phải bảo đảm an toàn kỹ thuật như thế nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 2)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 269;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (269, 'Bánh xe phải có kết cấu chắc chắn, lắp đặt đúng quy cách của nhà sản xuât.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (269, 'Lốp phải đủ số lượng, đủ áp suất, không phồng rộp, đúng cỡ lốp của nhà sản xuất hoặc tài liệu kỹ thuật quy định; lốp trên cùng một trục của xe sử dụng trong điều kiện hoạt động bình thường phải cùng kiểu loại.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (269, 'Cả hai ý trên.', 1, 3);

-- Question 270
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (270, 'ALL', 5, 270, 'Hệ thống lái trên xe ô tô phải bảo đảm yêu cầu nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 2)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 270;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (270, 'Bảo đảm cho xe chuyển hướng chính xác, điều khiển nhẹ nhàng, an toàn ở mọi vận tốc và tải trọng trong phạm vi tính năng kỹ thuật cho phép của xe.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (270, 'Khi hoạt động các cơ cấu chuyển động của hệ thống lái không được va chạm với bất kỳ bộ phận nào của xe; khi quay vô lăng lái về bên phải và bên trái thì không được có sự khác biệt đáng kể về lực tác động lên vành tay lái.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (270, 'Cả hai ý trên.', 1, 3);

-- Question 271
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (271, 'ALL', 5, 271, 'Mục đích của bảo dưỡng thường xuyên đối với xe ô tô có tác dụng gì dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 271;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (271, 'Bảo dưỡng ô tô thường xuyên làm cho ô tô luôn luôn có tính năng kỹ thuật tốt, giảm cường độ hao mòn của các chi tiết, kéo dài tuổi thọ của xe.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (271, 'Ngăn ngừa và phát hiện kịp thời các hư hỏng và sai lệch kỹ thuật để khắc phục, giữ gìn được hình thức bên ngoài.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (271, 'Cả hai ý trên.', 1, 3);

-- Question 272
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (272, 'ALL', 5, 272, 'Trong các nguyên nhân nêu dưới đây, nguyên nhân nào làm động cơ diesel không nổ?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 272;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (272, 'Hết nhiên liệu, lõi lọc nhiên liệu bị tắc, lọc khí bị tắc, nhiên liệu lẫn không khí, tạp chất.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (272, 'Hết nhiên liệu, lõi lọc nhiên liệu bị tắc, lọc khí bị tắc, nhiên liệu lẫn không khí, không có tia lửa điện.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (272, 'Hết nhiên liệu, lõi lọc nhiên liệu bị tắc, lọc khí bị tắc, nhiên liệu lẫn không khí và nước, không có tia lửa điện.', 0, 3);

-- Question 273
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (273, 'ALL', 5, 273, 'Ống xả lắp trên xe ô tô phải bảo đảm yêu cầu an toàn kỹ thuật nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 273;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (273, 'Ống xả không được đặt ở vị trí có thể gây cháy xe hoặc ảnh hưởng đến người ngồi trên xe và gây cản trở hoạt động của hệ thống khác.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (273, 'Miệng thoát khí thải của ống xả không được hướng về phía trước và không được hướng về bên phải theo chiều tiến của xe.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (273, 'Cả hai ý trên.', 1, 3);

-- Question 274
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (274, 'ALL', 5, 274, 'Dây đai an toàn lắp trên xe ô tô phải bảo đảm yêu cầu an toàn kỹ thuật nào dưới đây?', NULL, '💡 Câu \'phải/quan sát/nhường\' → Chọn đáp án đầy đủ nhất (thường đáp án 1)', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 274;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (274, 'Đủ số lượng, lắp đặt chắc chắn không bị rách, đứt, khóa cài đóng, mở nhẹ nhàng, không tự mở, không bị kẹt; kéo ra thu vào dễ dàng, cơ cấu hãm giữ chặt dây khi giật dây đột ngột.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (274, 'Đủ số lượng, lắp đặt chắc chắn không bị rách, đứt, khóa cài đóng, mở nhẹ nhàng, không tự mở, không bị kẹt; kéo ra thu vào dễ dàng, cơ cấu hãm mở ra khi giật dây đột ngột.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (274, 'Cả hai ý trên.', 0, 3);

-- Question 275
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (275, 'ALL', 5, 275, 'Thế nào là động cơ 4 kỳ?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 275;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (275, 'Là loại động cơ: để hoàn thành một chu trình công tác của động cơ, pít tông thực hiện 2 (hai) hành trình, trong đó có một lần sinh công.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (275, 'Là loại động cơ: để hoàn thành một chu trình công tác của động cơ, pít tông thực hiện 4 (bốn) hành trình, trong đó có một lần sinh công.', 1, 2);

-- Question 276
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (276, 'ALL', 5, 276, 'Công dụng của hệ thống bôi trơn đối với động cơ ô tô?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 276;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (276, 'Cung cấp một lượng dầu bôi trơn đủ và sạch dưới áp suất nhất định đi bôi trơn cho các chi tiết của động cơ để giảm ma sát, giảm mài mòn, làm kín, làm sạch, làm mát và chống gỉ.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (276, 'Cung cấp một lượng nhiên liệu đầy đủ và sạch để cho động cơ ô tô hoạt động.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (276, 'Cả hai ý trên.', 0, 3);

-- Question 277
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (277, 'ALL', 5, 277, 'Niên hạn sử dụng của xe ô tô tải (tính bắt đầu từ năm sản xuất) không quá bao nhiêu năm?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 277;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (277, '15 năm.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (277, '20 năm.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (277, '25 năm.', 1, 3);

-- Question 278
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (278, 'ALL', 5, 278, 'Niên hạn sử dụng của xe ô tô chở người trên 8 chỗ ngồi (không kể chỗ của người lái xe) tính bắt đầu từ năm sản xuất không quá bao nhiêu năm?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 278;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (278, '5 năm.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (278, '20 năm.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (278, '25 năm.', 0, 3);

-- Question 279
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (279, 'ALL', 5, 279, 'Hãy nêu công dụng của động cơ xe ô tô?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 279;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (279, 'Khi làm việc, nhiệt năng được biến đổi thành cơ năng làm trục khủy động cơ quay, truyền lực đến các bánh xe chủ động tạo ra chuyển động tịnh tiến cho xe ô tô.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (279, 'Khi làm việc, cơ năng được biến đổi thành nhiệt năng và truyền đến các bánh xe chủ động tạo ra chuyển động tịnh tiến cho xe ô tô.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (279, 'Cả hai ý trên.', 0, 3);

-- Question 280
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (280, 'ALL', 5, 280, 'Hãy nêu công dụng hệ thống truyền lực của xe ô tô?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 280;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (280, 'Dùng để truyền mô men quay từ động cơ tới các bánh xe chủ động của xe ô tô.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (280, 'Dùng để thay đổi hướng chuyển động hoặc giữ cho xe ô tô chuyển động ổn định theo hướng xác định.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (280, 'Dùng để làm giảm tốc độ, dừng chuyển động của xe ô tô.', 0, 3);

-- Question 281
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (281, 'ALL', 5, 281, 'Hãy nêu công dụng ly hợp (côn) của xe ô tô?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 281;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (281, 'Dùng để truyền mô men xoắn giữa các trục không cùng nằm trên một đường thẳng và góc lệch trục luôn thay đổi trong quá trình xe ô tô chuyển động.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (281, 'Dùng để truyền hoặc ngắt truyền động từ động cơ đến hộp số của xe ô tô.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (281, 'Dùng để truyền truyền động từ hộp số đến bánh xe chủ động của ô tô.', 0, 3);

-- Question 282
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (282, 'ALL', 5, 282, 'Hãy nêu công dụng hộp số của xe ô tô?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 282;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (282, 'Truyền và tăng mô men xoắn giữa các trục vuông góc nhau, bảo đảm cho các bánh xe chủ động quay với tốc độ khác nhau khi sức cản chuyển động ở bánh xe hai bên không bằng nhau.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (282, 'Truyền và thay đổi mô men xoắn giữa các trục không cùng nằm trên một đường thẳng và góc lệch trục luôn thay đổi trong quá trình ô tô chuyển động, chuyển số êm dịu, dễ điều khiển.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (282, 'Truyền và thay đổi mô men từ động cơ đến bánh xe chủ động, cắt truyền động từ động cơ đến bánh xe chủ động, bảo đảm cho xe ô tô chuyển động lùi.', 1, 3);

-- Question 283
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (283, 'ALL', 5, 283, 'Hãy nêu công dụng hệ thống lái của xe ô tô?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 283;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (283, 'Dùng để thay đổi mô men từ động cơ tới các bánh xe chủ động khi xe ô tô chuyển động theo hướng xác định.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (283, 'Dùng để thay đổi mô men giữa các trục vuông góc nhau khi xe ô tô chuyển động theo hướng xác định.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (283, 'Dùng để thay đổi hướng chuyển động hoặc giữ cho xe ô tô chuyển động ổn định theo hướng xác định.', 1, 3);

-- Question 284
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (284, 'ALL', 5, 284, 'Hãy nêu công dụng hệ thống phanh của xe ô tô?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 284;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (284, 'Dùng để giảm tốc độ, dừng chuyển động của xe ô tô và giữ cho xe ô tô đứng yên trên dốc.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (284, 'Dùng để thay đổi hướng chuyển động hoặc giữ cho xe ô tô chuyển động ổn định theo hướng xác định.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (284, 'Dùng để truyền hoặc ngắt truyền động từ động cơ đến bánh xe chủ động của xe ô tô.', 0, 3);

-- Question 285
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (285, 'ALL', 5, 285, 'Đèn phanh trên xe mô tô có tác dụng gì dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 285;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (285, 'Có tác dụng cảnh báo cho các xe phía sau biết xe đang giảm tốc để chủ động tránh hoặc giảm tốc để tránh va chạm.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (285, 'Có tác dụng định vị vào ban đêm với các xe từ phía sau tới để tránh va chạm.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (285, 'Cả hai ý trên.', 1, 3);

-- Question 286
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (286, 'ALL', 5, 286, 'Khi động cơ ô tô đã khởi động, bảng đồng hồ xuất hiện ký hiệu như hình vẽ dưới đây, báo hiệu tình trạng như thế nào của xe ô tô?', '/question-images/q286.jpg', '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 286;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (286, 'Nhiệt độ nước làm mát động cơ quá ngưỡng cho phép.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (286, 'Áp suất lốp không đủ.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (286, 'Đang hãm phanh tay.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (286, 'Cần kiểm tra động cơ.', 0, 4);

-- Question 287
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (287, 'ALL', 5, 287, 'Khi động cơ ô tô đã khởi động, bảng đồng hồ xuất hiện ký hiệu như hình vẽ dưới đây, báo hiệu tình trạng như thế nào của xe ô tô?', '/question-images/q287.jpg', '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 287;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (287, 'Báo hiệu hệ thống chống bó cứng khi phanh bị lỗi.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (287, 'Áp suất lốp không đủ.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (287, 'Đang hãm phanh tay.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (287, 'Cần kiểm tra động cơ.', 1, 4);

-- Question 288
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (288, 'ALL', 5, 288, 'Khi động cơ ô tô đã khởi động, bảng đồng hồ xuất hiện ký hiệu như hình vẽ dưới đây, báo hiệu tình trạng như thế nào của xe ô tô?', '/question-images/q288.jpg', '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 288;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (288, 'Báo hiệu thiếu dầu phanh.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (288, 'Áp suất lốp không đủ.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (288, 'Đang hãm phanh tay.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (288, 'Sắp hết nhiên liệu.', 0, 4);

-- Question 289
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (289, 'ALL', 5, 289, 'Khi động cơ ô tô đã khởi động, bảng đồng hồ xuất hiện ký hiệu như hình vẽ dưới đây, báo hiệu tình trạng như thế nào của xe ô tô?', '/question-images/q289.jpg', '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 289;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (289, 'Báo hiệu hệ thống chống bó cứng phanh bị lỗi.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (289, 'Áp suất lốp không đủ.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (289, 'Đang hãm phanh tay.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (289, 'Sắp hết nhiên liệu.', 0, 4);

-- Question 290
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (290, 'ALL', 5, 290, 'Khi khởi động xe ô tô số tự động có trang bị chìa khóa thông minh có cần đạp hết hành trình bàn đạp chân phanh hay không?', '/question-images/q290.jpg', '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 290;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (290, 'Phải đạp hết hành trình bàn đạp chân phanh.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (290, 'Không cần đạp phanh.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (290, 'Tùy từng trường hợp.', 0, 3);

-- Question 291
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (291, 'ALL', 5, 291, 'Ắc quy được trang bị trên xe ô tô có tác dụng gì dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 291;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (291, 'Giúp người lái xe kịp thời tạo xung lực tối đa lên hệ thống phanh trong khoảnh khắc đầu tiên của tình huống khẩn cấp.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (291, 'Ổn định chuyển động của xe ô tô khi đi vào đường vòng.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (291, 'Hỗ trợ người lái xe khởi hành ngang dốc.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (291, 'Để tích trữ điện năng, cung cấp cho các phụ tải khi máy phát chưa làm việc.', 1, 4);

-- Question 292
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (292, 'ALL', 5, 292, 'Máy phát điện được trang bị trên xe ô tô có tác dụng gì dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 292;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (292, 'Để phát điện năng cung cấp cho các phụ tải làm việc và nạp điện cho ắc quy.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (292, 'Ổn định chuyển động của xe ô tô khi đi vào đường vòng.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (292, 'Hỗ trợ người lái xe khởi hành ngang dốc.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (292, 'Để tích trữ điện năng và cung cấp điện cho các phụ tải làm việc.', 0, 4);

-- Question 293
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (293, 'ALL', 5, 293, 'Dây đai an toàn được trang bị trên xe ô tô có tác dụng gì dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 293;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (293, 'Ổn định chuyển động của xe ô tô khi đi vào đường vòng.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (293, 'Giữ chặt người lái và hành khách trên ghế ngồi khi xe ô tô đột ngột dừng lại.', 1, 2);

-- Question 294
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (294, 'ALL', 5, 294, 'Túi khí được trang bị trên xe ô tô có tác dụng gì dưới đây?', NULL, '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 294;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (294, 'Giữ chặt người lái và hành khách trên ghế ngồi khi xe ô tô đột ngột dừng lại.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (294, 'Giảm khả năng va đập của một số bộ phận cơ thể quan trọng với các vật thể trong xe.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (294, 'Hấp thụ một phần lực va đập lên người lái và hành khách.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (294, 'Ý 2 và ý 3.', 1, 4);

-- Question 295
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (295, 'ALL', 5, 295, 'Khi động cơ ô tô đã khởi động, bảng đồng hồ xuất hiện ký hiệu như hình vẽ dưới đây không tắt trong thời gian dài, báo hiệu tình trạng như thế nào của xe ô tô?', '/question-images/q295.jpg', '⏱️ Thời gian lái xe: Tối đa 10 giờ/ngày | Liên tục không quá 4 giờ phải nghỉ', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 295;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (295, 'Nhiệt độ nước làm mát động cơ quá ngưỡng cho phép.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (295, 'Áp suất lốp không đủ.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (295, 'Đang hãm phanh tay.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (295, 'Hệ thống lái gặp sự cố.', 1, 4);

-- Question 296
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (296, 'ALL', 5, 296, 'Trên xe ô tô có trang bị thiết bị như hình vẽ dưới đây có tác dụng gì?', '/question-images/q296.jpg', '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 296;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (296, 'Dùng để kích (hay nâng) xe ô tô.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (296, 'Vặn ốc lắp bánh xe.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (296, 'Ổn định chuyển động của xe ô tô khi đi vào đường vòng.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (296, 'Giữ chặt người lái và hành khách trên ghế ngồi khi xe ô tô đột ngột dừng lại.', 0, 4);

-- Question 297
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (297, 'ALL', 5, 297, 'Trên xe ô tô có trang bị thiết bị như hình vẽ dưới đây, dùng để làm gì?', '/question-images/q297.jpg', '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 297;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (297, 'Thay lốp xe.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (297, 'Chữa cháy.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (297, 'Phá cửa kính xe ô tô trong các trường hợp khẩn cấp.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (297, 'Vặn ốc để tháo lắp bánh xe.', 0, 4);

-- Question 298
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (298, 'ALL', 5, 298, 'Trên xe ô tô có trang bị thiết bị như hình vẽ dưới đây, dùng để làm gì?', '/question-images/q298.jpg', '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 298;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (298, 'Thay lốp xe.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (298, 'Chữa cháy trong các trường hợp hỏa hoạn.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (298, 'Cầm máu cho người bị nạn.', 0, 3);

-- Question 299
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (299, 'ALL', 5, 299, 'Nút bấm biểu tượng như hình vẽ trên xe ô tô có ý nghĩa như thế nào?', '/question-images/q299.jpg', '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 299;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (299, 'Báo hiệu xin đường cho xe đi thẳng.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (299, 'Báo hiệu hệ thống phanh bị lỗi.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (299, 'Báo hiệu xe đang ở tình huống nguy hiểm.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (299, 'Báo hiệu đến thời gian cần bảo dưỡng.', 0, 4);

-- Question 300
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (300, 'ALL', 5, 300, 'Khi động cơ đã hoạt động, bảng đồng hồ xuất hiện biểu tượng hình vẽ dưới đây, báo hiệu tình trạng như thế nào của xe?', '/question-images/q300.jpg', '📖 Đọc kỹ câu hỏi, chú ý từ khóa quan trọng', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 300;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (300, 'Báo hiệu hệ thống túi khí đã bật.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (300, 'Báo hiệu đèn chiếu sáng xa đã bật.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (300, 'Báo hiệu chế độ lái tiết kiệm nhiên liệu đã bật.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (300, 'Báo hiệu đèn cảnh báo khoảng cách đã bật.', 0, 4);

-- Question 301
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (301, 'ALL', 6, 301, 'Biển nào cấm các loại xe cơ giới đi vào, trừ xe máy hai bánh, xe gắn máy và các loại xe ưu tiên theo quy định?', '/question-images/q301.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 301;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (301, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (301, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (301, 'Biển 1 và biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (301, 'Cả ba biển.', 0, 4);

-- Question 302
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (302, 'ALL', 6, 302, 'Biển nào cấm xe ô tô tải?', '/question-images/q302.jpg', '🚛 Cấm xe theo trọng tải: Biển ghi rõ tấn | Cấm xe tải không cấm xe con', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 302;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (302, 'Cả ba biển.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (302, 'Biển 2 và biển 3.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (302, 'Biển 1 và biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (302, 'Biển 1 và biển 2.', 1, 4);

-- Question 303
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (303, 'ALL', 6, 303, 'Biển nào cấm máy kéo?', '/question-images/q303.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 303;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (303, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (303, 'Biển 2 và biển 3.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (303, 'Biển 1 và biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (303, 'Cả ba biển.', 0, 4);

-- Question 304
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (304, 'ALL', 6, 304, 'Biển nào báo hiệu cấm xe mô tô ba bánh chở hàng đi qua?', '/question-images/q304.jpg', '🚛 Cấm xe theo trọng tải: Biển ghi rõ tấn | Cấm xe tải không cấm xe con', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 304;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (304, 'Biển 1 và biển 2.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (304, 'Biển 1 và biển 3.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (304, 'Biển 2 và biển 3.', 0, 3);

-- Question 305
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (305, 'ALL', 6, 305, 'Biển nào dưới đây xe gắn máy được phép đi vào?', '/question-images/q305.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 305;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (305, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (305, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (305, 'Cả hai biển.', 1, 3);

-- Question 306
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (306, 'ALL', 6, 306, 'Biển nào báo hiệu cấm xe mô tô đi vào?', '/question-images/q306.jpg', '🚛 Cấm xe theo trọng tải: Biển ghi rõ tấn | Cấm xe tải không cấm xe con', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 306;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (306, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (306, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (306, 'Biển 3.', 0, 3);

-- Question 307
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (307, 'ALL', 6, 307, 'Khi gặp biển nào thì xe mô tô hai bánh được đi vào?', '/question-images/q307.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 307;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (307, 'Không biển nào.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (307, 'Biển 1 và biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (307, 'Biển 2 và biển 3.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (307, 'Cả ba biển.', 0, 4);

-- Question 308
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (308, 'ALL', 6, 308, 'Biển nào cho phép xe ô tô con được vượt?', '/question-images/q308.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 308;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (308, 'Biển 1 và biển 2.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (308, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (308, 'Biển 1 và biển 3.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (308, 'Biển 2 và biển 3.', 0, 4);

-- Question 309
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (309, 'ALL', 6, 309, 'Biển nào không cho phép xe ô tô con vượt?', '/question-images/q309.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 309;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (309, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (309, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (309, 'Biển 3.', 0, 3);

-- Question 310
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (310, 'ALL', 6, 310, 'Biển nào cấm xe ô tô tải vượt?', '/question-images/q310.jpg', '🚛 Cấm xe theo trọng tải: Biển ghi rõ tấn | Cấm xe tải không cấm xe con', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 310;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (310, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (310, 'Biển 1 và biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (310, 'Biển 1 và biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (310, 'Biển 2 và biển 3.', 1, 4);

-- Question 311
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (311, 'ALL', 6, 311, 'Biển nào cấm xe tải vượt?', '/question-images/q311.jpg', '🚛 Cấm xe theo trọng tải: Biển ghi rõ tấn | Cấm xe tải không cấm xe con', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 311;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (311, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (311, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (311, 'Cả hai biển.', 1, 3);

-- Question 312
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (312, 'ALL', 6, 312, 'Biển nào xe ô tô con được phép vượt?', '/question-images/q312.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 312;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (312, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (312, 'Biển 2.', 1, 2);

-- Question 313
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (313, 'ALL', 6, 313, 'Biển nào cấm quay đầu xe?', '/question-images/q313.jpg', '↩️ Cấm rẽ trái thường đi kèm cấm quay đầu', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 313;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (313, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (313, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (313, 'Không biển nào.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (313, 'Cả hai biển.', 0, 4);

-- Question 314
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (314, 'ALL', 6, 314, 'Biển nào cấm xe rẽ trái?', '/question-images/q314.jpg', '🚛 Cấm xe theo trọng tải: Biển ghi rõ tấn | Cấm xe tải không cấm xe con', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 314;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (314, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (314, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (314, 'Cả hai biển.', 0, 3);

-- Question 315
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (315, 'ALL', 6, 315, 'Khi gặp biển nào xe được rẽ trái?', '/question-images/q315.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 315;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (315, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (315, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (315, 'Không biển nào.', 0, 3);

-- Question 316
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (316, 'ALL', 6, 316, 'Biển nào cấm xe ô tô rẽ trái?', '/question-images/q316.jpg', '🚛 Cấm xe theo trọng tải: Biển ghi rõ tấn | Cấm xe tải không cấm xe con', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 316;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (316, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (316, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (316, 'Cả hai biển.', 1, 3);

-- Question 317
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (317, 'ALL', 6, 317, 'Biển nào cấm các phương tiện rẽ phải?', '/question-images/q317.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 317;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (317, 'Biển 1 và biển 2.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (317, 'Biển 1 và biển 3.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (317, 'Biển 2 và biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (317, 'Cả ba biển.', 0, 4);

-- Question 318
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (318, 'ALL', 6, 318, 'Biển nào cấm các phương tiện rẽ trái?', '/question-images/q318.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 318;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (318, 'Biển 1 và biển 2.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (318, 'Biển 1 và biển 3.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (318, 'Biển 2 và biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (318, 'Cả ba biển.', 0, 4);

-- Question 319
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (319, 'ALL', 6, 319, 'Biển nào dưới đây chỉ cấm xe ô tô quay đầu?', '/question-images/q319.jpg', '🚛 Cấm xe theo trọng tải: Biển ghi rõ tấn | Cấm xe tải không cấm xe con', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 319;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (319, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (319, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (319, 'Biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (319, 'Biển 1 và biển 3.', 0, 4);

-- Question 320
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (320, 'ALL', 6, 320, 'Biển nào dưới đây cấm xe ô tô rẽ trái và quay đầu?', '/question-images/q320.jpg', '🚛 Cấm xe theo trọng tải: Biển ghi rõ tấn | Cấm xe tải không cấm xe con', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 320;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (320, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (320, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (320, 'Biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (320, 'Biển 1 và biển 3.', 0, 4);

-- Question 321
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (321, 'ALL', 6, 321, 'Biển nào cấm xe taxi mà không cấm các phương tiện khác?', '/question-images/q321.jpg', '🚛 Cấm xe theo trọng tải: Biển ghi rõ tấn | Cấm xe tải không cấm xe con', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 321;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (321, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (321, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (321, 'Không biển nào.', 0, 3);

-- Question 322
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (322, 'ALL', 6, 322, 'Biển nào xe được phép rẽ trái?', '/question-images/q322.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 322;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (322, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (322, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (322, 'Không biển nào.', 0, 3);

-- Question 323
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (323, 'ALL', 6, 323, 'Biển nào xe quay đầu không bị cấm?', '/question-images/q323.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 323;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (323, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (323, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (323, 'Cả hai biển.', 1, 3);

-- Question 324
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (324, 'ALL', 6, 324, 'Biển nào xe được phép quay đầu nhưng không được rẽ trái?', '/question-images/q324.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 324;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (324, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (324, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (324, 'Cả hai biển.', 0, 3);

-- Question 325
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (325, 'ALL', 6, 325, 'Biển nào là biển "Cấm đi ngược chiều"?', '/question-images/q325.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 325;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (325, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (325, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (325, 'Cả ba biển.', 0, 3);

-- Question 326
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (326, 'ALL', 6, 326, 'Biển nào dưới đây các phương tiện không được phép đi vào?', '/question-images/q326.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 326;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (326, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (326, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (326, 'Biển 1 và biển 2.', 1, 3);

-- Question 327
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (327, 'ALL', 6, 327, 'Gặp biển nào người lái xe không được đỗ xe vào ngày chẵn?', '/question-images/q327.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 327;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (327, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (327, 'Biển 1 và biển 3.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (327, 'Biển 2 và biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (327, 'Biển 3.', 0, 4);

-- Question 328
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (328, 'ALL', 6, 328, 'Gặp biển nào người lái xe không được đỗ xe vào ngày lẻ?', '/question-images/q328.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 328;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (328, 'Biển 1 và biển 2.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (328, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (328, 'Biển 2 và biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (328, 'Biển 3.', 0, 4);

-- Question 329
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (329, 'ALL', 6, 329, 'Khi gặp biển nào xe ưu tiên theo luật định vẫn phải dừng lại?', '/question-images/q329.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 329;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (329, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (329, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (329, 'Cả ba biển.', 0, 3);

-- Question 330
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (330, 'ALL', 6, 330, 'Biển nào cấm tất cả các loại xe cơ giới và thô sơ đi lại trên đường, trừ xe ưu tiên theo luật định (nếu đường vẫn cho xe chạy được)?', '/question-images/q330.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 330;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (330, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (330, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (330, 'Cả hai biển.', 0, 3);

-- Question 331
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (331, 'ALL', 6, 331, 'Biển nào là biển "Cấm xe chở hàng nguy hiểm"?', '/question-images/q331.jpg', '🚛 Cấm xe theo trọng tải: Biển ghi rõ tấn | Cấm xe tải không cấm xe con', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 331;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (331, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (331, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (331, 'Biển 3.', 1, 3);

-- Question 332
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (332, 'ALL', 6, 332, 'Gặp biển nào xe xích lô được phép đi vào?', '/question-images/q332.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 332;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (332, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (332, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (332, 'Biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (332, 'Biển 1 và biển 2.', 1, 4);

-- Question 333
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (333, 'ALL', 6, 333, 'Gặp biển nào xe lam, xe xích lô máy được phép đi vào?', '/question-images/q333.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 333;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (333, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (333, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (333, 'Biển 3.', 1, 3);

-- Question 334
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (334, 'ALL', 6, 334, 'Biển báo này có ý nghĩa như thế nào?', '/question-images/q334.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 334;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (334, 'Đường cấm súc vật vận tải hàng hóa.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (334, 'Đường cấm súc vật vận tải hành khách.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (334, 'Đường cấm súc vật vận tải hàng hóa hoặc hành khách dù kéo xe hay chở trên lưng đi qua.', 1, 3);

-- Question 335
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (335, 'ALL', 6, 335, 'Biển báo này có ý nghĩa như thế nào?', '/question-images/q335.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 335;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (335, 'Tốc độ tối đa cho phép về ban đêm cho các phương tiện là 70 km/h.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (335, 'Tốc độ tối thiểu cho phép về ban đêm cho các phương tiện là 70 km/h.', 0, 2);

-- Question 336
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (336, 'ALL', 6, 336, 'Khi gặp các biển này xe ưu tiên theo luật định (có tải trọng hay chiều cao toàn bộ vượt quá chỉ số ghi trên biển) có được phép đi qua hay không?', '/question-images/q336.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 336;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (336, 'Được phép.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (336, 'Không được phép.', 1, 2);

-- Question 337
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (337, 'ALL', 6, 337, 'Biển nào hạn chế chiều cao của xe và hàng?', '/question-images/q337.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 337;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (337, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (337, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (337, 'Biển 3.', 0, 3);

-- Question 338
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (338, 'ALL', 6, 338, 'Biển số 2 có ý nghĩa như thế nào?', '/question-images/q338.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 338;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (338, 'Cho phép xe ô tô có tải trọng trục lớn hơn 7 tấn đi qua.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (338, 'Cho phép xe ô tô có tải trọng trên trục xe từ 7 tấn trở xuống đi qua.', 1, 2);

-- Question 339
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (339, 'ALL', 6, 339, 'Biển số 3 có ý nghĩa như thế nào?', '/question-images/q339.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 339;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (339, 'Cấm các loại xe có tải trọng toàn bộ trên 10 tấn đi qua.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (339, 'Hạn chế khối lượng hàng hóa chở trên xe.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (339, 'Hạn chế tải trọng trên trục xe.', 0, 3);

-- Question 340
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (340, 'ALL', 6, 340, 'Biển nào cấm máy kéo kéo theo rơ moóc?', '/question-images/q340.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 340;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (340, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (340, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (340, 'Cả hai biển.', 1, 3);

-- Question 341
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (341, 'ALL', 6, 341, 'Khi gặp biển số 1, xe ô tô tải có được đi vào không?', '/question-images/q341.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 341;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (341, 'Được đi vào.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (341, 'Không được đi vào.', 0, 2);

-- Question 342
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (342, 'ALL', 6, 342, 'Biển nào không có hiệu lực đối với xe ô tô tải không kéo moóc?', '/question-images/q342.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 342;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (342, 'Biển 1 và biển 2.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (342, 'Biển 2 và biển 3.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (342, 'Biển 1 và biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (342, 'Cả ba biển.', 0, 4);

-- Question 343
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (343, 'ALL', 6, 343, 'Biển nào cấm máy kéo?', '/question-images/q343.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 343;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (343, 'Biển 1 và biển 2.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (343, 'Biển 1 và biển 3.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (343, 'Biển 2 và biển 3.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (343, 'Cả ba biển.', 0, 4);

-- Question 344
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (344, 'ALL', 6, 344, 'Khi gặp biển này, xe mô tô ba bánh chở hàng có được phép rẽ trái hoặc rẽ phải hay không?', '/question-images/q344.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 344;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (344, 'Được phép.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (344, 'Không được phép.', 1, 2);

-- Question 345
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (345, 'ALL', 6, 345, 'Biển này có hiệu lực đối với xe mô tô hai bánh, ba bánh chở hàng không?', '/question-images/q345.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 345;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (345, 'Có.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (345, 'Không.', 0, 2);

-- Question 346
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (346, 'ALL', 6, 346, 'Biển này có ý nghĩa như thế nào?', '/question-images/q346.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 346;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (346, 'Cấm xe cơ giới (trừ xe ưu tiên theo luật định) đi thẳng.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (346, 'Cấm các loại xe cơ giới và xe mô tô (trừ xe ưu tiên theo luật định) đi về bên trái và bên phải.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (346, 'Hướng trái và phải không cấm xe cơ giới.', 0, 3);

-- Question 347
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (347, 'ALL', 6, 347, 'Biển phụ đặt dưới biển cấm bóp còi có ý nghĩa như thế nào?', '/question-images/q347.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 347;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (347, 'Báo khoảng cách đến nơi cấm bóp còi.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (347, 'Chiều dài đoạn đường cấm bóp còi từ nơi đặt biển.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (347, 'Báo cấm dùng còi có độ vang xa 500m.', 0, 3);

-- Question 348
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (348, 'ALL', 6, 348, 'Chiều dài đoạn đường 500 m từ nơi đặt biển này, người lái xe có được phép bấm còi không?', '/question-images/q348.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 348;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (348, 'Được phép.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (348, 'Không được phép.', 1, 2);

-- Question 349
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (349, 'ALL', 6, 349, 'Biển nào xe mô tô hai bánh được đi vào?', '/question-images/q349.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 349;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (349, 'Biển 1 và biển 2.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (349, 'Biển 1 và biển 3.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (349, 'Biển 2 và biển 3.', 0, 3);

-- Question 350
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (350, 'ALL', 6, 350, 'Biển nào xe mô tô hai bánh không được đi vào?', '/question-images/q350.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 350;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (350, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (350, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (350, 'Biển 3.', 0, 3);

-- Question 351
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (351, 'ALL', 6, 351, 'Ba biển này có hiệu lực như thế nào?', '/question-images/q351.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 351;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (351, 'Cấm các loại xe ở biển phụ đi vào.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (351, 'Cấm các loại xe cơ giới đi vào trừ loại xe ở biển phụ.', 0, 2);

-- Question 352
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (352, 'ALL', 6, 352, 'Biển nào báo hiệu chiều dài đoạn đường phải giữ cự ly tối thiểu giữa hai xe?', '/question-images/q352.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 352;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (352, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (352, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (352, 'Cả hai biển.', 0, 3);

-- Question 353
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (353, 'ALL', 6, 353, 'Biển nào báo hiệu khoảng cách thực tế từ nơi đặt biển đến nơi cần cự ly tối thiểu giữa hai xe?', '/question-images/q353.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 353;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (353, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (353, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (353, 'Cả hai biển.', 0, 3);

-- Question 354
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (354, 'ALL', 6, 354, 'Biển này có ý nghĩa như thế nào?', '/question-images/q354.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 354;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (354, 'Cấm dừng xe về hướng bên trái.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (354, 'Cấm dừng và đỗ xe theo hướng bên phải.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (354, 'Được phép đỗ xe và dừng xe theo hướng bên phải.', 0, 3);

-- Question 355
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (355, 'ALL', 6, 355, 'Theo hướng bên phải có được phép đỗ xe, dừng xe không?', '/question-images/q355.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 355;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (355, 'Không được phép.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (355, 'Được phép.', 0, 2);

-- Question 356
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (356, 'ALL', 6, 356, 'Gặp biển này, xe ô tô sơ mi rơ moóc có chiều dài toàn bộ kể cả xe, moóc và hàng lớn hơn trị số ghi trên biển có được phép đi vào hay không?', '/question-images/q356.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 356;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (356, 'Không được phép.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (356, 'Được phép.', 0, 2);

-- Question 357
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (357, 'ALL', 6, 357, 'Xe ô tô chở hàng vượt quá phía trước và sau thùng xe, mỗi phía quá 10% chiều dài toàn bộ thân xe, tổng chiều dài xe (cả hàng) từ trước đến sau nhỏ hơn trị số ghi trên biển thì có được phép đi vào không?', '/question-images/q357.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 357;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (357, 'Không được phép.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (357, 'Được phép.', 0, 2);

-- Question 358
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (358, 'ALL', 6, 358, 'Biển này có ý nghĩa như thế nào?', '/question-images/q358.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 358;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (358, 'Cấm ô tô buýt.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (358, 'Cấm xe ô tô khách.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (358, 'Cấm xe ô tô con.', 0, 3);

-- Question 359
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (359, 'ALL', 6, 359, 'Biển này có ý nghĩa như thế nào?', '/question-images/q359.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 359;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (359, 'Hạn chế chiều cao của xe và hàng.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (359, 'Hạn chế chiều ngang của xe và hàng.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (359, 'Hạn chế chiều dài của xe và hàng.', 0, 3);

-- Question 360
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (360, 'ALL', 6, 360, 'Biển nào là biển "Tốc độ tối đa cho phép về ban đêm"?', '/question-images/q360.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 360;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (360, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (360, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (360, 'Cả hai biển.', 0, 3);

-- Question 361
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (361, 'ALL', 6, 361, 'Biển báo nào báo hiệu bắt đầu đoạn đường vào phạm vi khu dân cư, các phương tiện tham gia giao thông phải tuân theo các quy định đi đường được áp dụng ở khu đông dân cư?', '/question-images/q361.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 361;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (361, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (361, 'Biển 2.', 0, 2);

-- Question 362
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (362, 'ALL', 6, 362, 'Biển nào báo hiệu hạn chế tốc độ của phương tiện không vượt quá trị số ghi trên biển? 1                         2', '/question-images/q362.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 362;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (362, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (362, 'Biển 2.', 1, 2);

-- Question 363
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (363, 'ALL', 6, 363, 'Trong các biển báo dưới đây biển nào báo hiệu "Kết thúc đường cao tốc"?', '/question-images/q363.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 363;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (363, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (363, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (363, 'Biển 3.', 0, 3);

-- Question 364
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (364, 'ALL', 6, 364, 'Số 50 ghi trên biển báo dưới đây có ý nghĩa như thế nào?', '/question-images/q364.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 364;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (364, 'Tốc độ tối đa các xe cơ giới được phép chạy.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (364, 'Tốc độ tối thiểu các xe cơ giới được phép chạy.', 0, 2);

-- Question 365
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (365, 'ALL', 6, 365, 'Biển nào dưới đây chỉ dẫn bắt đầu đường cao tốc phân làn đường có tốc độ khác nhau?', '/question-images/q365.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 365;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (365, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (365, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (365, 'Cả hai biển.', 0, 3);

-- Question 366
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (366, 'ALL', 6, 366, 'Biển báo dưới đây có ý nghĩa như thế nào?', '/question-images/q366.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 366;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (366, 'Báo hiệu tốc độ tối đa cho phép các xe cơ giới chạy.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (366, 'Báo hiệu tốc độ tối thiểu cho phép các xe cơ giới chạy.', 1, 2);

-- Question 367
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (367, 'ALL', 6, 367, 'Gặp biển nào người lái xe phải nhường đường cho người đi bộ?', '/question-images/q367.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 367;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (367, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (367, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (367, 'Biển 3.', 0, 3);

-- Question 368
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (368, 'ALL', 6, 368, 'Biển nào chỉ đường dành cho người đi bộ, các loại xe không được đi vào khi gặp biển này?', '/question-images/q368.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 368;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (368, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (368, 'Biển 1 và biển 3.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (368, 'Biển 3.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (368, 'Cả ba biển.', 0, 4);

-- Question 369
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (369, 'ALL', 6, 369, 'Biển nào báo hiệu "Đường dành cho xe thô sơ"?', '/question-images/q369.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 369;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (369, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (369, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (369, 'Biển 3.', 0, 3);

-- Question 370
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (370, 'ALL', 6, 370, 'Biển nào báo hiệu sắp đến chỗ giao nhau nguy hiểm?', '/question-images/q370.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 370;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (370, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (370, 'Biển 1 và biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (370, 'Biển 2 và biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (370, 'Cả ba biển.', 1, 4);

-- Question 371
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (371, 'ALL', 6, 371, 'Biển nào báo hiệu "Giao nhau với đường sắt có rào chắn"?', '/question-images/q371.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 371;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (371, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (371, 'Biển 2 và biển 3.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (371, 'Biển 3.', 0, 3);

-- Question 372
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (372, 'ALL', 6, 372, 'Biển nào báo hiệu "Giao nhau có tín hiệu đèn"?', '/question-images/q372.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 372;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (372, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (372, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (372, 'Biển 3.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (372, 'Cả ba biển.', 0, 4);

-- Question 373
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (373, 'ALL', 6, 373, 'Biển nào báo hiệu nguy hiểm giao nhau với đường sắt?', '/question-images/q373.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 373;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (373, 'Biển 1 và biển 2.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (373, 'Biển 1 và biển 3.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (373, 'Biển 2 và biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (373, 'Cả ba biển.', 0, 4);

-- Question 374
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (374, 'ALL', 6, 374, 'Biển nào báo hiệu đường bộ giao nhau với đường sắt không có rào chắn?', '/question-images/q374.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 374;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (374, 'Biển 1 và biển 2.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (374, 'Biển 1 và biển 3.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (374, 'Biển 2 và biển 3.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (374, 'Cả ba biển.', 0, 4);

-- Question 375
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (375, 'ALL', 6, 375, 'Biển nào báo hiệu sắp đến chỗ giao nhau giữa đường bộ và đường sắt?', '/question-images/q375.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 375;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (375, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (375, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (375, 'Biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (375, 'Biển 1 và biển 3.', 0, 4);

-- Question 376
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (376, 'ALL', 6, 376, 'Biển nào báo hiệu "Cửa chui"?', '/question-images/q376.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 376;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (376, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (376, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (376, 'Biển 3.', 0, 3);

-- Question 377
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (377, 'ALL', 6, 377, 'Hai biển này có ý nghĩa như thế nào?', '/question-images/q377.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 377;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (377, 'Để chỉ nơi đường sắt giao vuông góc với đường bộ không có rào chắn.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (377, 'Để báo trước sắp đến vị trí giao cắt đường bộ với đường sắt cùng mức, không vuông góc và không có người gác, không có rào chắn.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (377, 'Nơi đường sắt giao nhau với đường bộ.', 0, 3);

-- Question 378
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (378, 'ALL', 6, 378, 'Biển nào báo hiệu "Nơi đường sắt giao vuông góc với đường bộ"?', '/question-images/q378.jpg', '🟦 Biển VUÔNG/CHỮ NHẬT XANH = Biển chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 378;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (378, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (378, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (378, 'Biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (378, 'Biển 1 và biển 2.', 1, 4);

-- Question 379
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (379, 'ALL', 6, 379, 'Các biển này có ý nghĩa như thế nào?', '/question-images/q379.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 379;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (379, 'Nơi đường sắt giao nhau với đường bộ.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (379, 'Nơi đường sắt giao vuông góc với đường bộ.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (379, 'Để báo trước sắp đến vị trí đường sắt giao không vuông góc với đường bộ, không có người gác và không có rào chắn.', 1, 3);

-- Question 380
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (380, 'ALL', 6, 380, 'Biển nào báo hiệu "Hết đoạn đường ưu tiên"?', '/question-images/q380.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 380;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (380, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (380, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (380, 'Biển 3.', 1, 3);

-- Question 381
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (381, 'ALL', 6, 381, 'Biển nào báo hiệu, chỉ dẫn xe đi trên đường này được quyền ưu tiên qua nơi giao nhau?', '/question-images/q381.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 381;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (381, 'Biển 1 và biển 2.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (381, 'Biển 1 và biển 3.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (381, 'Biển 2 và biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (381, 'Cả ba biển.', 0, 4);

-- Question 382
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (382, 'ALL', 6, 382, 'Biển nào báo hiệu "Giao nhau với đường không ưu tiên"?', '/question-images/q382.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 382;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (382, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (382, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (382, 'Biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (382, 'Biển 2 và biển 3.', 0, 4);

-- Question 383
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (383, 'ALL', 6, 383, 'Biển nào báo hiệu "Giao nhau với đường ưu tiên"?', '/question-images/q383.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 383;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (383, 'Biển 1 và biển 3.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (383, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (383, 'Biển 3.', 0, 3);

-- Question 384
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (384, 'ALL', 6, 384, 'Biển nào báo hiệu "Đường bị thu hẹp"?', '/question-images/q384.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 384;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (384, 'Biển 1 và biển 2.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (384, 'Biển 1 và biển 3.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (384, 'Biển 2 và biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (384, 'Cả ba biển.', 0, 4);

-- Question 385
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (385, 'ALL', 6, 385, 'Khi gặp biển nào, người lái xe phải giảm tốc độ, chú ý xe đi ngược chiều, xe đi ở phía đường bị hẹp phải nhường đường cho xe đi ngược chiều?', '/question-images/q385.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 385;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (385, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (385, 'Biển 1 và biển 3.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (385, 'Biển 2 và biển 3.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (385, 'Cả ba biển.', 0, 4);

-- Question 386
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (386, 'ALL', 6, 386, 'Biển nào báo hiệu "Giao nhau với đường ưu tiên"?', '/question-images/q386.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 386;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (386, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (386, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (386, 'Biển 3.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (386, 'Cả ba biển.', 0, 4);

-- Question 387
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (387, 'ALL', 6, 387, 'Biển nào báo hiệu "Đường giao nhau" của các tuyến đường cùng cấp?', '/question-images/q387.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 387;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (387, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (387, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (387, 'Biển 3.', 0, 3);

-- Question 388
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (388, 'ALL', 6, 388, 'Biển nào báo hiệu "Giao nhau với đường không ưu tiên"?', NULL, '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 388;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (388, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (388, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (388, 'Biển 3.', 0, 3);

-- Question 389
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (389, 'ALL', 6, 389, 'Biển nào báo hiệu "Đường hai chiều"?', '/question-images/q389.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 389;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (389, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (389, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (389, 'Biển 3.', 0, 3);

-- Question 390
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (390, 'ALL', 6, 390, 'Biển nào báo hiệu phải giảm tốc độ, nhường đường cho xe cơ giới đi ngược chiều qua đường hẹp?', '/question-images/q390.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 390;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (390, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (390, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (390, 'Biển 3.', 0, 3);

-- Question 391
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (391, 'ALL', 6, 391, 'Biển nào chỉ dẫn "Được ưu tiên qua đường hẹp"?', '/question-images/q391.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 391;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (391, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (391, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (391, 'Biển 3.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (391, 'Biển 2 và biển 3.', 0, 4);

-- Question 392
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (392, 'ALL', 6, 392, 'Biển nào báo hiệu "Đường đôi"?', '/question-images/q392.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 392;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (392, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (392, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (392, 'Biển 3.', 0, 3);

-- Question 393
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (393, 'ALL', 6, 393, 'Biển nào báo hiệu "Đường đôi"?', '/question-images/q393.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 393;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (393, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (393, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (393, 'Biển 3.', 1, 3);

-- Question 394
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (394, 'ALL', 6, 394, 'Biển nào báo hiệu "Kết thúc đường đôi"?', '/question-images/q394.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 394;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (394, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (394, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (394, 'Biển 3.', 1, 3);

-- Question 395
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (395, 'ALL', 6, 395, 'Biển nào báo hiệu "Giao nhau với đường hai chiều"?', '/question-images/q395.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 395;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (395, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (395, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (395, 'Biển 3.', 0, 3);

-- Question 396
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (396, 'ALL', 6, 396, 'Biển nào báo hiệu "Đường hai chiều"?', '/question-images/q396.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 396;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (396, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (396, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (396, 'Biển 3.', 0, 3);

-- Question 397
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (397, 'ALL', 6, 397, 'Biển nào báo hiệu "Giao nhau với đường hai chiều"?', '/question-images/q397.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 397;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (397, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (397, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (397, 'Biển 3.', 0, 3);

-- Question 398
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (398, 'ALL', 6, 398, 'Biển nào báo hiệu "Chú ý chướng ngại vật"?', '/question-images/q398.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 398;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (398, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (398, 'Biển 2 và biển 3.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (398, 'Cả ba biển.', 0, 3);

-- Question 399
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (399, 'ALL', 6, 399, 'Biển nào chỉ dẫn cho người tham gia giao thông biết vị trí và khoảng cách có làn đường cứu nạn hay làn thoát xe khẩn cấp?', '/question-images/q399.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 399;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (399, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (399, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (399, 'Cả hai biển.', 0, 3);

-- Question 400
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (400, 'ALL', 6, 400, 'Biển nào báo hiệu "Đường hầm"?', '/question-images/q400.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 400;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (400, 'Cả ba biển.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (400, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (400, 'Biển 2 và biển 3.', 0, 3);

-- Question 401
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (401, 'ALL', 6, 401, 'Biển nào dưới đây là biển "Cầu hẹp"?', '/question-images/q401.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 401;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (401, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (401, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (401, 'Biển 3.', 0, 3);

-- Question 402
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (402, 'ALL', 6, 402, 'Biển nào dưới đây là biển "Cầu quay - cầu cất"?', '/question-images/q402.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 402;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (402, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (402, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (402, 'Biển 3.', 1, 3);

-- Question 403
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (403, 'ALL', 6, 403, 'Biển nào dưới đây là biển "Kè, vực sâu phía trước"?', '/question-images/q403.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 403;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (403, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (403, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (403, 'Biển 3.', 0, 3);

-- Question 404
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (404, 'ALL', 6, 404, 'Biển nào sau đây là biển "Kè, vực sâu bên đường phía bên trái"?', '/question-images/q404.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 404;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (404, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (404, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (404, 'Biển 3.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (404, 'Biển 1 và biển 2.', 0, 4);

-- Question 405
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (405, 'ALL', 6, 405, 'Biển nào sau đây là biển "Kè, vực sâu bên đường phía bên phải"?', '/question-images/q405.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 405;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (405, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (405, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (405, 'Biển 3.', 0, 3);

-- Question 406
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (406, 'ALL', 6, 406, 'Biển nào sau đây là biển "Đường trơn"?', '/question-images/q406.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 406;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (406, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (406, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (406, 'Biển 3.', 0, 3);

-- Question 407
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (407, 'ALL', 6, 407, 'Biển nào sau đây là biển "Lề đường nguy hiểm"?', '/question-images/q407.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 407;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (407, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (407, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (407, 'Biển 3.', 0, 3);

-- Question 408
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (408, 'ALL', 6, 408, 'Biển nào sau đây báo trước gần tới đoạn đường đang tiến hành thi công sửa chữa?', '/question-images/q408.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 408;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (408, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (408, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (408, 'Biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (408, 'Không biển nào.', 0, 4);

-- Question 409
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (409, 'ALL', 6, 409, 'Biển nào sau đây cảnh báo nguy hiểm đoạn đường thường xảy ra tai nạn?', '/question-images/q409.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 409;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (409, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (409, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (409, 'Biển 3.', 0, 3);

-- Question 410
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (410, 'ALL', 6, 410, 'Biển nào dưới đây báo hiệu đoạn đường hay xảy ra ùn tắc giao thông?', '/question-images/q410.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 410;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (410, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (410, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (410, 'Biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (410, 'Cả ba biển.', 0, 4);

-- Question 411
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (411, 'ALL', 6, 411, 'Gặp biển nào người tham gia giao thông phải đi chậm và thận trọng đề phòng khả năng xuất hiện và di chuyển bất ngờ của trẻ em trên mặt đường?', '/question-images/q411.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 411;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (411, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (411, 'Biển 2.', 1, 2);

-- Question 412
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (412, 'ALL', 6, 412, 'Biển nào chỉ dẫn nơi bắt đầu đoạn đường dành cho người đi bộ?', '/question-images/q412.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 412;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (412, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (412, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (412, 'Biển 3.', 0, 3);

-- Question 413
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (413, 'ALL', 6, 413, 'Biển nào dưới đây báo hiệu gần đến đoạn đường thường có trẻ em đi ngang qua?', '/question-images/q413.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 413;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (413, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (413, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (413, 'Biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (413, 'Cả ba biển.', 0, 4);

-- Question 414
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (414, 'ALL', 6, 414, 'Gặp biển nào dưới đây người tham gia giao thông cần phải điều chỉnh tốc độ xe chạy cho thích hợp, đề phòng gió ngang thổi mạnh gây lật xe?', '/question-images/q414.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 414;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (414, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (414, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (414, 'Cả hai biển.', 0, 3);

-- Question 415
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (415, 'ALL', 6, 415, 'Biển nào sau đây là biển "Dốc xuống nguy hiểm"?', '/question-images/q415.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 415;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (415, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (415, 'Biển 2.', 0, 2);

-- Question 416
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (416, 'ALL', 6, 416, 'Biển nào sau đây là biển "Dốc lên nguy hiểm"?', '/question-images/q416.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 416;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (416, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (416, 'Biển 2.', 1, 2);

-- Question 417
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (417, 'ALL', 6, 417, 'Biển báo này có ý nghĩa như thế nào?', '/question-images/q417.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 417;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (417, 'Chỗ ngoặt nguy hiểm có nguy cơ lật xe bên phải khi đường cong vòng sang trái.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (417, 'Chỗ ngoặt nguy hiểm có nguy cơ lật xe bên trái khi đường cong vòng sang phải.', 0, 2);

-- Question 418
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (418, 'ALL', 6, 418, 'Biển báo này có ý nghĩa như thế nào?', '/question-images/q418.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 418;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (418, 'Báo trước đoạn đường có gió ngang.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (418, 'Báo trước đoạn đường trơn trượt.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (418, 'Báo trước sắp đến bến phà.', 1, 3);

-- Question 419
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (419, 'ALL', 6, 419, 'Biển báo này có ý nghĩa như thế nào?', '/question-images/q419.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 419;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (419, 'Báo hiệu đường có ổ gà, lồi lõm.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (419, 'Báo hiệu đường có gồ giảm tốc phía trước.', 0, 2);

-- Question 420
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (420, 'ALL', 6, 420, 'Biển báo này có ý nghĩa như thế nào?', '/question-images/q420.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 420;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (420, 'Báo hiệu đường có ổ gà, lồi lõm.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (420, 'Báo hiệu đường có gồ giảm tốc phía trước.', 1, 2);

-- Question 421
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (421, 'ALL', 6, 421, 'Biển báo dưới đây có ý nghĩa như thế nào?', '/question-images/q421.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 421;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (421, 'Để báo trước gần tới đoạn đường có hiện tượng đất đá từ trên ta luy dương sụt lở bất ngờ gây nguy hiểm cho xe cộ và người đi đường.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (421, 'Để báo trước nơi có kết cấu mặt đường rời rạc, khi phương tiện đi qua, làm cho các viên đá, sỏi văng lên gây nguy hiểm và mất an toàn cho người và phương tiện tham gia giao thông.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (421, 'Để cảnh báo những đoạn nền đường yếu, đoạn đường đang theo dõi lún mà việc vận hành xe ở tốc độ cao có thể gây nguy hiểm.', 1, 3);

-- Question 422
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (422, 'ALL', 6, 422, 'Các biển báo này có ý nghĩa như thế nào?', '/question-images/q422.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 422;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (422, 'Để báo trước gần tới đoạn đường có hiện tượng đất đá từ trên ta luy dương sụt lở bất ngờ gây nguy hiểm cho xe cộ và người đi đường.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (422, 'Để báo trước nơi có kết cấu mặt đường rời rạc, khi phương tiện đi qua, làm cho các viên đá, sỏi văng lên gây nguy hiểm và mất an toàn cho người và phương tiện tham gia giao thông.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (422, 'Để cảnh báo những đoạn nền đường yếu, đoạn đường đang theo dõi lún mà việc vận hành xe ở tốc độ cao có thể gây nguy hiểm.', 0, 3);

-- Question 423
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (423, 'ALL', 6, 423, 'Biển báo này có ý nghĩa như thế nào?', '/question-images/q423.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 423;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (423, 'Để báo trước gần tới đoạn đường có hiện tượng đất đá từ trên ta luy dương sụt lở bất ngờ gây nguy hiểm cho xe cộ và người đi đường.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (423, 'Để báo trước nơi có kết cấu mặt đường rời rạc, khi phương tiện đi qua, làm cho các viên đá, sỏi văng lên gây nguy hiểm và mất an toàn cho người và phương tiện tham gia giao thông.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (423, 'Để cảnh báo những đoạn nền đường yếu, đoạn đường đang theo dõi lún mà việc vận hành xe ở tốc độ cao có thể gây nguy hiểm.', 0, 3);

-- Question 424
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (424, 'ALL', 6, 424, 'Gặp biển báo này người lái xe phải xử lý thế nào?', '/question-images/q424.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 424;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (424, 'Đi chậm, quan sát và dừng lại nếu gặp gia súc trên đường.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (424, 'Bấm còi to để gia súc tránh đường và nhanh chóng di chuyển qua đoạn đường có gia súc.', 0, 2);

-- Question 425
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (425, 'ALL', 6, 425, 'Biển báo này có ý nghĩa như thế nào?', '/question-images/q425.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 425;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (425, 'Báo hiệu khu vực nguy hiểm thường xuyên có sét đánh.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (425, 'Báo hiệu khu vực có đường dây điện cắt ngang phía trên tuyến đường.', 1, 2);

-- Question 426
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (426, 'ALL', 6, 426, 'Biển nào báo hiệu các phương tiện phải đi đúng làn đường quy định và tuân thủ tốc độ tối đa cho phép?', '/question-images/q426.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 426;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (426, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (426, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (426, 'Cả hai biển.', 0, 3);

-- Question 427
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (427, 'ALL', 6, 427, 'Biển nào báo hiệu các phương tiện phải tuân thủ tốc độ tối đa cho phép trên từng làn đường?', '/question-images/q427.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 427;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (427, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (427, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (427, 'Cả hai biển.', 1, 3);

-- Question 428
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (428, 'ALL', 6, 428, 'Biển nào báo hiệu "Đường dành cho xe ô tô"?', '/question-images/q428.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 428;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (428, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (428, 'Biển 2.', 0, 2);

-- Question 429
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (429, 'ALL', 6, 429, 'Biển nào báo hiệu "Hết đoạn đường dành cho xe ô tô"?', '/question-images/q429.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 429;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (429, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (429, 'Biển 2.', 1, 2);

-- Question 430
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (430, 'ALL', 6, 430, 'Khi gặp biển nào thì các phương tiện không được đi vào, trừ xe ô tô và xe mô tô?', '/question-images/q430.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 430;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (430, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (430, 'Biển 2.', 0, 2);

-- Question 431
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (431, 'ALL', 6, 431, 'Biển này có ý nghĩa như thế nào?', '/question-images/q431.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 431;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (431, 'Chỉ hướng đi phải theo.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (431, 'Biển báo hiệu cho người lái xe biết số lượng làn đường trên mặt đường và hướng đi trên mỗi làn đường phải theo.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (431, 'Chỉ hướng đường phải theo.', 0, 3);

-- Question 432
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (432, 'ALL', 6, 432, 'Biển nào (đặt trước ngã ba, ngã tư) cho phép xe được rẽ sang hướng khác?', '/question-images/q432.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 432;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (432, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (432, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (432, 'Không biển nào.', 1, 3);

-- Question 433
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (433, 'ALL', 6, 433, 'Biển nào báo hiệu "Hướng đi thẳng phải theo"?', '/question-images/q433.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 433;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (433, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (433, 'Biển 2.', 0, 2);

-- Question 434
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (434, 'ALL', 6, 434, 'Biển nào báo hiệu "Đường một chiều"?', '/question-images/q434.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 434;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (434, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (434, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (434, 'Cả hai biển.', 0, 3);

-- Question 435
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (435, 'ALL', 6, 435, 'Trong các biển dưới đây biển nào là biển "Hết tốc độ tối đa cho phép"?', '/question-images/q435.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 435;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (435, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (435, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (435, 'Biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (435, 'Cả ba biển.', 0, 4);

-- Question 436
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (436, 'ALL', 6, 436, 'Hiệu lực của biển "Tốc độ tối đa cho phép" hết tác dụng khi gặp biển nào dưới đây?', '/question-images/q436.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 436;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (436, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (436, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (436, 'Biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (436, 'Biển 1 và biển 2.', 1, 4);

-- Question 437
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (437, 'ALL', 6, 437, 'Trong các biển dưới đây biển nào là biển "Hết tốc độ tối thiểu"?', '/question-images/q437.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 437;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (437, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (437, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (437, 'Biển 3.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (437, 'Cả ba biển.', 0, 4);

-- Question 438
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (438, 'ALL', 6, 438, 'Biển nào dưới đây báo hiệu hết cấm vượt?', '/question-images/q438.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 438;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (438, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (438, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (438, 'Biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (438, 'Biển 2 và biển 3.', 1, 4);

-- Question 439
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (439, 'ALL', 6, 439, 'Trong các biển dưới đây biển nào là biển "Hết mọi lệnh cấm"?', '/question-images/q439.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 439;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (439, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (439, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (439, 'Biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (439, 'Cả ba biển.', 0, 4);

-- Question 440
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (440, 'ALL', 6, 440, 'Biển nào cho phép được quay đầu xe đi theo hướng ngược lại khi đặt biển trước ngã ba, ngã tư?', '/question-images/q440.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 440;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (440, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (440, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (440, 'Biển 3.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (440, 'Không biển nào.', 0, 4);

-- Question 441
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (441, 'ALL', 6, 441, 'Biển nào không cho phép rẽ phải?', '/question-images/q441.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 441;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (441, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (441, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (441, 'Biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (441, 'Biển 1 và biển 3.', 0, 4);

-- Question 442
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (442, 'ALL', 6, 442, 'Khi đến chỗ giao nhau, gặp biển nào thì người lái xe không được cho xe đi thẳng, phải rẽ sang hướng khác?', '/question-images/q442.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 442;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (442, 'Biển 1 và biển 2.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (442, 'Biển 1 và biển 3.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (442, 'Biển 2 và biển 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (442, 'Cả ba biển.', 0, 4);

-- Question 443
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (443, 'ALL', 6, 443, 'Biển nào cho phép quay đầu xe?', '/question-images/q443.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 443;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (443, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (443, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (443, 'Cả hai biển.', 1, 3);

-- Question 444
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (444, 'ALL', 6, 444, 'Biển nào chỉ dẫn tên đường trên các tuyến đường đối ngoại?', '/question-images/q444.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 444;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (444, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (444, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (444, 'Biển 3.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (444, 'Biển 1 và biển 2.', 0, 4);

-- Question 445
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (445, 'ALL', 6, 445, 'Biển số 1 có ý nghĩa như thế nào?', '/question-images/q445.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 445;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (445, 'Biển chỉ dẫn hết cấm đỗ xe theo giờ trong khu vực.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (445, 'Biển chỉ dẫn hết hiệu lực khu vực đỗ xe trên các tuyến đường đối ngoại.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (445, 'Biển chỉ dẫn khu vực đỗ xe trên các tuyến đường đối ngoại.', 0, 3);

-- Question 446
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (446, 'ALL', 6, 446, 'Biển số 3 có ý nghĩa như thế nào?', '/question-images/q446.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 446;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (446, 'Biển chỉ dẫn khu vực cấm đỗ xe trên các tuyến đường đối ngoại.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (446, 'Biển chỉ dẫn khu vực đỗ xe trên các tuyến đường đối ngoại.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (446, 'Biển hạn chế tốc độ tối đa trong khu vực.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (446, 'Biển chỉ dẫn hết hiệu lực khu vực cấm đỗ xe theo giờ trên các tuyến đường đối ngoại.', 0, 4);

-- Question 447
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (447, 'ALL', 6, 447, 'Biển nào báo hiệu "Đường phía trước có làn đường dành cho ô tô khách"?', '/question-images/q447.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 447;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (447, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (447, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (447, 'Biển 3.', 0, 3);

-- Question 448
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (448, 'ALL', 6, 448, 'Biển nào báo hiệu "Rẽ ra đường có làn đường dành cho ô tô khách"?', '/question-images/q448.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 448;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (448, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (448, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (448, 'Biển 3.', 1, 3);

-- Question 449
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (449, 'ALL', 6, 449, 'Biển nào đặt trên đường chính trước khi đến nơi đường giao nhau để rẽ vào đường cụt?', '/question-images/q449.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 449;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (449, 'Biển 1 và 2.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (449, 'Cả ba biển.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (449, 'Không biển nào.', 0, 3);

-- Question 450
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (450, 'ALL', 6, 450, 'Biển nào chỉ dẫn cho người đi bộ sử dụng cầu vượt qua đường?', '/question-images/q450.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 450;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (450, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (450, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (450, 'Cả hai biển.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (450, 'Không biển nào.', 0, 4);

-- Question 451
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (451, 'ALL', 6, 451, 'Biển nào chỉ dẫn cho người đi bộ sử dụng hầm chui qua đường?', '/question-images/q451.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 451;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (451, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (451, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (451, 'Cả hai biển.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (451, 'Không biển nào.', 0, 4);

-- Question 452
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (452, 'ALL', 6, 452, 'Biển nào báo hiệu "Nơi đỗ xe dành cho người khuyết tật"?', '/question-images/q452.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 452;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (452, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (452, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (452, 'Biển 3.', 0, 3);

-- Question 453
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (453, 'ALL', 6, 453, 'Gặp biển báo này, người lái xe phải đỗ xe như thế nào?', '/question-images/q453.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 453;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (453, 'Đỗ xe hoàn toàn trên hè phố.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (453, 'Đỗ xe hoàn toàn dưới lòng đường.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (453, 'Đỗ từ 1/2 thân xe trở lên trên hè phố.', 1, 3);

-- Question 454
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (454, 'ALL', 6, 454, 'Gặp biển báo này, người tham gia giao thông phải xử lý như thế nào?', '/question-images/q454.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 454;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (454, 'Dừng xe tại khu vực có trạm Cảnh sát giao thông.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (454, 'Tiếp tục lưu thông với tốc độ bình thường.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (454, 'Phải giảm tốc độ đến mức an toàn và không được vượt khi đi qua khu vực này.', 1, 3);

-- Question 455
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (455, 'ALL', 6, 455, 'Gặp biển báo dưới đây, người lái xe có bắt buộc phải chạy vòng theo đảo an toàn theo hướng mũi tên khi muốn chuyển hướng hay không?', '/question-images/q455.jpg', '➡️ 2 mũi tên song song = được quay đầu', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 455;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (455, 'Bắt buộc.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (455, 'Không bắt buộc.', 0, 2);

-- Question 456
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (456, 'ALL', 6, 456, 'Biển nào dưới đây chỉ dẫn địa giới hành chính giữa các thành phố, tỉnh, huyện?', '/question-images/q456.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 456;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (456, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (456, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (456, 'Biển 3.', 0, 3);

-- Question 457
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (457, 'ALL', 6, 457, 'Biển nào báo hiệu "Cầu vượt liên thông"?', '/question-images/q457.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 457;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (457, 'Biển 2 và biển 3.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (457, 'Biển 1 và biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (457, 'Biển 1 và biển 3.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (457, 'Cả ba biển.', 0, 4);

-- Question 458
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (458, 'ALL', 6, 458, 'Biển số 1 có ý nghĩa như thế nào?', '/question-images/q458.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 458;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (458, 'Đi thẳng hoặc rẽ trái trên cầu vượt.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (458, 'Đi thẳng hoặc rẽ phải trên cầu vượt.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (458, 'Báo hiệu cầu vượt liên thông.', 1, 3);

-- Question 459
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (459, 'ALL', 6, 459, 'Biển nào báo hiệu "Tuyến đường cầu vượt cắt qua"?', '/question-images/q459.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 459;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (459, 'Biển 1 và biển 2.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (459, 'Biển 1 và biển 3.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (459, 'Biển 2 và biển 3.', 0, 3);

-- Question 460
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (460, 'ALL', 6, 460, 'Biển báo dưới đây có ý nghĩa như thế nào?', '/question-images/q460.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 460;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (460, 'Chỉ dẫn khoảng cách đến làn đường cứu nạn (làn thoát xe khẩn cấp).', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (460, 'Báo hiệu đường cụt phía trước.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (460, 'Báo hiệu nút giao gần nhất phía trước.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (460, 'Báo hiệu trạm dừng nghỉ phía trước.', 0, 4);

-- Question 461
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (461, 'ALL', 6, 461, 'Tại đoạn đường có biển "Làn đường dành riêng cho từng loại xe" dưới đây, các phương tiện có được phép chuyển sang làn khác để đi theo hành trình mong muốn khi đến gần nơi đường bộ giao nhau hay không?', '/question-images/q461.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 461;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (461, 'Được phép chuyển sang làn khác.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (461, 'Không được phép chuyển sang làn khác, chỉ được đi trong làn quy định theo biển.', 0, 2);

-- Question 462
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (462, 'ALL', 6, 462, 'Tại đoạn đường có cắm biển dưới đây, xe tải và xe khách có được phép đi vào không?', '/question-images/q462.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 462;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (462, 'Có.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (462, 'Không.', 0, 2);

-- Question 463
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (463, 'ALL', 6, 463, 'Tại đoạn đường có cắm biển dưới đây, xe tải và xe khách có được phép đi vào không?', '/question-images/q463.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 463;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (463, 'Có.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (463, 'Không.', 1, 2);

-- Question 464
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (464, 'ALL', 6, 464, 'Biển nào báo hiệu kết thúc đường cao tốc?', '/question-images/q464.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 464;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (464, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (464, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (464, 'Biển 3.', 0, 3);

-- Question 465
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (465, 'ALL', 6, 465, 'Biển này có ý nghĩa như thế nào?', '/question-images/q465.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 465;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (465, 'Chỉ dẫn sắp đến vị trí nhập làn xe.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (465, 'Chỉ dẫn vị trí nhập làn xe cách 250 m.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (465, 'Chỉ dẫn vị trí nhập làn cách trạm thu phí 250 m.', 0, 3);

-- Question 466
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (466, 'ALL', 6, 466, 'Biển nào chỉ dẫn nhập làn xe?', '/question-images/q466.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 466;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (466, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (466, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (466, 'Cả hai biển.', 1, 3);

-- Question 467
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (467, 'ALL', 6, 467, 'Biển này có ý nghĩa như thế nào?', '/question-images/q467.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 467;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (467, 'Bắt đầu đường cao tốc.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (467, 'Chỉ dẫn địa giới đường cao tốc, chiều dài đường cao tốc.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (467, 'Tên và ký hiệu đường cao tốc, giá trị hạn chế tốc độ tối đa và tối thiểu.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (467, 'Ý 1 và ý 3.', 1, 4);

-- Question 468
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (468, 'ALL', 6, 468, 'Ý nghĩa các biểu tượng ghi trên biển chỉ dẫn là như thế nào?', '/question-images/q468.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 468;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (468, 'Xăng dầu, ăn uống, thông tin, sửa chữa xe.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (468, 'Xăng dầu, ăn uống, nhà nghỉ, sửa chữa xe.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (468, 'Xăng dầu, ăn uống, cấp cứu, sửa chữa xe.', 0, 3);

-- Question 469
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (469, 'ALL', 6, 469, 'Biển này có ý nghĩa như thế nào?', '/question-images/q469.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 469;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (469, 'Chỉ dẫn đến trạm kiểm tra tải trọng xe.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (469, 'Chỉ dẫn hướng rẽ vào nơi đặt trạm kiểm tra tải trọng xe.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (469, 'Chỉ dẫn khoảng cách đến trạm kiểm tra tải trọng xe cách 750 m.', 1, 3);

-- Question 470
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (470, 'ALL', 6, 470, 'Trên đường cao tốc, gặp biển nào thì người lái xe đi theo hướng bên trái để tránh chướng ngại vật?', '/question-images/q470.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 470;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (470, 'Biển 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (470, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (470, 'Biển 3.', 0, 3);

-- Question 471
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (471, 'ALL', 6, 471, 'Trên đường cao tốc, gặp biển nào thì người lái xe đi theo hướng bên phải để tránh chướng ngại vật?', '/question-images/q471.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 471;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (471, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (471, 'Biển 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (471, 'Biển 3.', 1, 3);

-- Question 472
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (472, 'ALL', 6, 472, 'Trên đường cao tốc, gặp biển nào thì người lái xe đi được cả hai hướng (bên trái hoặc bên phải) để tránh chướng ngại vật?', '/question-images/q472.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 472;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (472, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (472, 'Biển 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (472, 'Biển 3.', 0, 3);

-- Question 473
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (473, 'ALL', 6, 473, 'Trên đường cao tốc, gặp biển nào người lái xe phải chú ý đổi hướng đi khi sắp vào đường cong nguy hiểm?', '/question-images/q473.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 473;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (473, 'Biển 1 và biển 2.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (473, 'Biển 1 và biển 3.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (473, 'Biển 2.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (473, 'Biển 3.', 0, 4);

-- Question 474
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (474, 'ALL', 6, 474, 'Biển nào chỉ dẫn người lái xe đi được cả hai hướng?', '/question-images/q474.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 474;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (474, 'Biển 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (474, 'Biển 2.', 1, 2);

-- Question 475
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (475, 'ALL', 6, 475, 'Biển này có ý nghĩa như thế nào?', '/question-images/q475.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 475;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (475, 'Chỉ dẫn chướng ngại vật phía trước để cảnh báo phía trước có sự cản trở lưu thông bình thường (nằm bên trong phần xe chạy hay ngay sát phần đường xe chạy) và chỉ dẫn hướng đi qua đó cần đặt biển.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (475, 'Chỉ dẫn hướng rẽ để nhắc người điều khiển phương tiện chuẩn bị đổi hướng đi khi sắp vào đường cong nguy hiểm, có bán kính cong nhỏ.', 1, 2);

-- Question 476
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (476, 'ALL', 6, 476, 'Vạch mũi tên chỉ hướng trên mặt đường nào dưới đây cho phép xe chỉ được đi thẳng và rẽ phải?', '/question-images/q476.jpg', '➡️ 2 mũi tên song song = được quay đầu', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 476;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (476, 'Vạch 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (476, 'Vạch 2 và vạch 3.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (476, 'Vạch 3.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (476, 'Vạch 1 và vạch 2.', 0, 4);

-- Question 477
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (477, 'ALL', 6, 477, 'Vạch kẻ đường nào dưới đây là vạch phân chia các làn xe cùng chiều?', '/question-images/q477.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 477;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (477, 'Vạch 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (477, 'Vạch 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (477, 'Vạch 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (477, 'Vạch 1 và vạch 2.', 1, 4);

-- Question 478
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (478, 'ALL', 6, 478, 'Vạch kẻ đường nào dưới đây là vạch phân chia hai chiều xe chạy (vạch tim đường), xe không được lấn làn, không được đè lên vạch?', '/question-images/q478.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 478;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (478, 'Vạch 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (478, 'Vạch 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (478, 'Vạch 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (478, 'Cả ba vạch.', 0, 4);

-- Question 479
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (479, 'ALL', 6, 479, 'Vạch kẻ đường nào dưới đây là vạch phân chia hai chiều xe chạy (vạch tim đường)?', '/question-images/q479.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 479;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (479, 'Vạch 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (479, 'Vạch 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (479, 'Vạch 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (479, 'Vạch 1 và vạch 3.', 1, 4);

-- Question 480
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (480, 'ALL', 6, 480, 'Các vạch dưới đây có tác dụng như thế nào?', '/question-images/q480.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 480;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (480, 'Phân chia hai chiều xe chạy ngược chiều nhau.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (480, 'Phân chia các làn xe chạy cùng chiều nhau.', 0, 2);

-- Question 481
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (481, 'ALL', 6, 481, 'Các vạch dưới đây có tác dụng như thế nào?', '/question-images/q481.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 481;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (481, 'Phân chia hai chiều xe chạy ngược chiều nhau.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (481, 'Phân chia các làn xe chạy cùng chiều nhau.', 1, 2);

-- Question 482
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (482, 'ALL', 6, 482, 'Khi gặp vạch kẻ đường nào các xe được phép đè vạch?', '/question-images/q482.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 482;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (482, 'Vạch 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (482, 'Vạch 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (482, 'Vạch 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (482, 'Vạch 1 và vạch 3.', 1, 4);

-- Question 483
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (483, 'ALL', 6, 483, 'Vạch dưới đây có tác dụng như thế nào?', '/question-images/q483.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 483;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (483, 'Để xác định làn đường.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (483, 'Báo hiệu người lái xe chỉ được phép đi thẳng.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (483, 'Dùng để xác định khoảng cách giữa các phương tiện trên đường.', 1, 3);

-- Question 484
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (484, 'ALL', 6, 484, 'Vạch dưới đây có ý nghĩa như thế nào?', '/question-images/q484.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 484;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (484, 'Báo cho người điều khiển không được dừng phương tiện trong phạm vi phần mặt đường có bố trí vạch để tránh ùn tắc giao thông.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (484, 'Báo hiệu sắp đến chỗ có bố trí vạch đi bộ qua đường.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (484, 'Dùng để xác định khoảng cách giữa các phương tiện trên đường.', 0, 3);

-- Question 485
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (485, 'ALL', 6, 485, 'Vạch dưới đây có ý nghĩa như thế nào?', '/question-images/q485.jpg', '🚦 Nhớ nhanh: 🔺Tam giác=Nguy hiểm | 🔴Tròn đỏ=Cấm | 🔵Tròn xanh=Hiệu lệnh | 🟦Vuông=Chỉ dẫn', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 485;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (485, 'Vị trí dừng xe của các phương tiện vận tải hành khách công cộng.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (485, 'Báo cho người điều khiển được dừng phương tiện trong phạm vi phần mặt đường có bố trí vạch để tránh ùn tắc giao thông.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (485, 'Dùng để xác định vị trí giữa các phương tiện trên đường. TÌNH HUỐNG GIAO THÔNG', 0, 3);

-- Question 486
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (486, 'ALL', 7, 486, 'Theo hướng mũi tên, xe nào chấp hành đúng quy tắc giao thông?', '/question-images/q486.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 486;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (486, 'Xe khách, xe tải, xe mô tô.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (486, 'Xe tải, xe mô tô.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (486, 'Chỉ xe con.', 1, 3);

-- Question 487
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (487, 'ALL', 7, 487, 'Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?', '/question-images/q487.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 487;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (487, 'Xe tải, xe khách, xe con, xe mô tô.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (487, 'Xe tải, xe mô tô, xe khách, xe con.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (487, 'Xe khách, xe tải, xe con, xe mô tô.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (487, 'Xe mô tô, xe khách, xe tải, xe con.', 0, 4);

-- Question 488
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (488, 'ALL', 7, 488, 'Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?', '/question-images/q488.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 488;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (488, 'Xe công an đi làm nhiệm vụ khẩn cấp, xe con, xe tải, xe khách.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (488, 'Xe công an đi làm nhiệm vụ khẩn cấp, xe khách, xe con, xe tải.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (488, 'Xe công an đi làm nhiệm vụ khẩn cấp, xe tải, xe khách, xe con.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (488, 'Xe con, xe công an đi làm nhiệm vụ khẩn cấp, xe tải, xe khách.', 0, 4);

-- Question 489
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (489, 'ALL', 7, 489, 'Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?', '/question-images/q489.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 489;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (489, 'Xe tải, xe công an đi làm nhiệm vụ khẩn cấp, xe khách, xe con.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (489, 'Xe công an đi làm nhiệm vụ khẩn cấp, xe khách, xe con, xe tải.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (489, 'Xe công an đi làm nhiệm vụ khẩn cấp, xe con, xe tải, xe khách.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (489, 'Xe công an đi làm nhiệm vụ khẩn cấp, xe tải, xe khách, xe con.', 1, 4);

-- Question 490
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (490, 'ALL', 7, 490, 'Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?', '/question-images/q490.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 490;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (490, 'Xe tải, xe con, xe mô tô.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (490, 'Xe con, xe tải, xe mô tô.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (490, 'Xe mô tô, xe con, xe tải.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (490, 'Xe con, xe mô tô, xe tải.', 0, 4);

-- Question 491
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (491, 'ALL', 7, 491, 'Xe nào phải nhường đường trong trường hợp này?', '/question-images/q491.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 491;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (491, 'Xe con.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (491, 'Xe tải.', 0, 2);

-- Question 492
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (492, 'ALL', 7, 492, 'Trường hợp này xe nào được quyền đi trước?', '/question-images/q492.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 492;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (492, 'Xe mô tô.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (492, 'Xe con.', 1, 2);

-- Question 493
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (493, 'ALL', 7, 493, 'Thứ tự các xe đi như thế nào là đúng quy tắc giao thông?', '/question-images/q493.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 493;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (493, 'Xe con (A), xe cứu thương đi làm nhiệm vụ cấp cứu, xe con (B).', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (493, 'Xe cứu thương đi làm nhiệm vụ cấp cứu, xe con (B), xe con (A).', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (493, 'Xe con (B), xe con (A), xe cứu thương đi làm nhiệm vụ cấp cứu.', 0, 3);

-- Question 494
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (494, 'ALL', 7, 494, 'Thứ tự các xe đi như thế nào là đúng quy tắc giao thông?', '/question-images/q494.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 494;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (494, 'Xe cứu thương đi làm nhiệm vụ cấp cứu, xe chữa cháy đi làm nhiệm vụ chữa cháy, xe con.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (494, 'Xe chữa cháy đi làm nhiệm vụ chữa cháy, xe cứu thương đi làm nhiệm vụ cấp cứu, xe con.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (494, 'Xe cứu thương đi làm nhiệm vụ cấp cứu, xe con, xe chữa cháy đi làm nhiệm vụ chữa cháy.', 0, 3);

-- Question 495
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (495, 'ALL', 7, 495, 'Xe nào được quyền đi trước trong trường hợp này?', '/question-images/q495.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 495;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (495, 'Xe mô tô.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (495, 'Xe cứu thương đi làm nhiệm vụ cấp cứu.', 1, 2);

-- Question 496
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (496, 'ALL', 7, 496, 'Theo hướng mũi tên, xe nào phải nhường đường đi cuối cùng qua nơi giao nhau này?', '/question-images/q496.jpg', '🗺️ Thứ tự ưu tiên: ①Xe trong giao lộ →②Xe ưu tiên →③Đường ưu tiên →④Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 496;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (496, 'Xe khách.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (496, 'Xe tải.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (496, 'Xe con.', 0, 3);

-- Question 497
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (497, 'ALL', 7, 497, 'Theo hướng mũi tên, xe nào phải nhường đường là đúng quy tắc giao thông?', '/question-images/q497.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 497;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (497, 'Xe con.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (497, 'Xe tải.', 0, 2);

-- Question 498
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (498, 'ALL', 7, 498, 'Xe nào được quyền đi trước trong trường hợp này?', '/question-images/q498.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 498;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (498, 'Xe công an đi làm nhiệm vụ khẩn cấp.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (498, 'Xe chữa cháy đi làm nhiệm vụ chữa cháy.', 1, 2);

-- Question 499
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (499, 'ALL', 7, 499, 'Theo tín hiệu đèn, xe nào được phép đi?', '/question-images/q499.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 499;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (499, 'Xe con và xe khách.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (499, 'Xe mô tô.', 0, 2);

-- Question 500
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (500, 'ALL', 7, 500, 'Theo tín hiệu đèn, xe nào đi là đúng quy tắc giao thông?', '/question-images/q500.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 500;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (500, 'Xe khách, xe mô tô.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (500, 'Xe con, xe tải.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (500, 'Xe tải, xe mô tô.', 0, 3);

-- Question 501
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (501, 'ALL', 7, 501, 'Trong trường hợp này xe nào được quyền đi trước?', '/question-images/q501.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 501;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (501, 'Xe công an đi làm nhiệm vụ khẩn cấp.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (501, 'Xe quân sự đi làm nhiệm vụ khẩn cấp.', 1, 2);

-- Question 502
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (502, 'ALL', 7, 502, 'Theo tín hiệu đèn, xe tải đi theo hướng nào là đúng quy tắc giao thông?', '/question-images/q502.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 502;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (502, 'Hướng 2, 3, 4.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (502, 'Chỉ hướng 1.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (502, 'Hướng 1 và 2.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (502, 'Hướng 3 và 4.', 0, 4);

-- Question 503
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (503, 'ALL', 7, 503, 'Các xe đi theo hướng mũi tên, những xe nào vi phạm quy tắc giao thông?', '/question-images/q503.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 503;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (503, 'Xe khách, xe tải, xe mô tô.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (503, 'Xe tải, xe con, xe mô tô.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (503, 'Xe khách, xe con, xe mô tô.', 0, 3);

-- Question 504
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (504, 'ALL', 7, 504, 'Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?', '/question-images/q504.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 504;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (504, 'Xe khách, xe tải, xe mô tô, xe con.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (504, 'Xe con, xe khách, xe tải, xe mô tô.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (504, 'Xe mô tô, xe tải, xe khách, xe con.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (504, 'Xe mô tô, xe tải, xe con, xe khách.', 0, 4);

-- Question 505
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (505, 'ALL', 7, 505, 'Trong trường hợp này xe nào đỗ vi phạm quy tắc giao thông?', '/question-images/q505.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 505;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (505, 'Xe tải.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (505, 'Xe con và mô tô.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (505, 'Cả ba xe.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (505, 'Xe con và xe tải.', 0, 4);

-- Question 506
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (506, 'ALL', 7, 506, 'Theo hướng mũi tên, xe nào được quyền đi trước?', '/question-images/q506.jpg', 'Xe tải đi trên đường ưu tiên (biển W.207 giao nhau với đường không ưu tiên) nên được quyền đi trước.', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 506;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (506, 'Xe tải.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (506, 'Xe con (B).', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (506, 'Xe con (A).', 0, 3);

-- Question 507
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (507, 'ALL', 7, 507, 'Theo hướng mũi tên, những hướng nào xe gắn máy được phép đi?', '/question-images/q507.svg', 'Biển số P.105 "Cấm xe mô tô" (hướng 2) và biển số P.103a "Cấm ô tô" (hướng 3) đều không có giá trị cấm xe gắn máy (xe dung tích xi-lanh dưới 50cm3). Hướng 1 không có biển cấm. Do đó, người điều khiển xe gắn máy được phép đi ở cả 3 hướng.', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 507;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (507, 'Cả ba hướng.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (507, 'Chỉ hướng 1 và 3.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (507, 'Chỉ hướng 1.', 0, 3);

-- Question 508
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (508, 'ALL', 7, 508, 'Xe nào đỗ vi phạm quy tắc giao thông?', '/question-images/q508.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 508;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (508, 'Cả hai xe.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (508, 'Không xe nào vi phạm.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (508, 'Chỉ xe mô tô vi phạm.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (508, 'Chỉ xe tải vi phạm.', 0, 4);

-- Question 509
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (509, 'ALL', 7, 509, 'Xe nào đỗ vi phạm quy tắc giao thông?', '/question-images/q509.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 509;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (509, 'Chỉ xe mô tô.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (509, 'Chỉ xe tải.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (509, 'Cả ba xe.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (509, 'Chỉ xe mô tô và xe tải.', 0, 4);

-- Question 510
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (510, 'ALL', 7, 510, 'Xe tải kéo xe mô tô ba bánh như hình này có đúng quy tắc giao thông không?', '/question-images/q510.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 510;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (510, 'Đúng.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (510, 'Không đúng.', 1, 2);

-- Question 511
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (511, 'ALL', 7, 511, 'Theo hướng mũi tên, hướng nào xe không được phép đi?', '/question-images/q511.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 511;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (511, 'Hướng 2 và 5.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (511, 'Chỉ hướng 1.', 1, 2);

-- Question 512
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (512, 'ALL', 7, 512, 'Theo hướng mũi tên, những hướng nào xe ô tô không được phép đi?', '/question-images/q512.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 512;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (512, 'Hướng 1 và 2.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (512, 'Hướng 3.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (512, 'Hướng 1 và 4.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (512, 'Hướng 2 và 3.', 0, 4);

-- Question 513
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (513, 'ALL', 7, 513, 'Xe nào vượt đúng quy tắc giao thông?', '/question-images/q513.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 513;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (513, 'Cả hai xe đều đúng.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (513, 'Xe con.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (513, 'Xe khách.', 0, 3);

-- Question 514
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (514, 'ALL', 7, 514, 'Theo hướng mũi tên, gặp biển hướng đi phải theo đặt trước ngã tư, những hướng nào xe được phép đi?', '/question-images/q514.jpg', '🗺️ Thứ tự ưu tiên: ①Xe trong giao lộ →②Xe ưu tiên →③Đường ưu tiên →④Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 514;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (514, 'Hướng 2 và 3.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (514, 'Hướng 1, 2 và 3.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (514, 'Hướng 1 và 3.', 0, 3);

-- Question 515
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (515, 'ALL', 7, 515, 'Xe kéo nhau như hình này có vi phạm quy tắc giao thông không?', '/question-images/q515.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 515;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (515, 'Không.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (515, 'Vi phạm.', 1, 2);

-- Question 516
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (516, 'ALL', 7, 516, 'Xe nào phải nhường đường trong trường hợp này?', '/question-images/q516.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 516;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (516, 'Xe khách.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (516, 'Xe tải.', 0, 2);

-- Question 517
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (517, 'ALL', 7, 517, 'Xe nào được quyền đi trước trong trường hợp này?', '/question-images/q517.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 517;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (517, 'Xe con.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (517, 'Xe mô tô.', 1, 2);

-- Question 518
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (518, 'ALL', 7, 518, 'Xe kéo nhau trong trường hợp này đúng quy định không?', '/question-images/q518.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 518;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (518, 'Không đúng.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (518, 'Đúng.', 0, 2);

-- Question 519
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (519, 'ALL', 7, 519, 'Theo hướng mũi tên, những hướng nào xe ô tô con được phép đi?', '/question-images/q519.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 519;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (519, 'Hướng 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (519, 'Hướng 1, 3 và 4.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (519, 'Hướng 2, 3 và 4.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (519, 'Cả bốn hướng.', 0, 4);

-- Question 520
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (520, 'ALL', 7, 520, 'Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?', '/question-images/q520.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 520;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (520, 'Xe con (A), xe mô tô, xe con (B), xe đạp.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (520, 'Xe con (B), xe đạp, xe mô tô, xe con (A).', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (520, 'Xe con (A), xe con (B), xe mô tô + xe đạp.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (520, 'Xe mô tô + xe đạp, xe con (A), xe con (B).', 1, 4);

-- Question 521
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (521, 'ALL', 7, 521, 'Theo hướng mũi tên, những hướng nào xe tải được phép đi?', '/question-images/q521.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 521;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (521, 'Chỉ hướng 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (521, 'Hướng 1, 3 và 4.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (521, 'Hướng 1, 2 và 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (521, 'Cả bốn hướng.', 0, 4);

-- Question 522
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (522, 'ALL', 7, 522, 'Những hướng nào xe tải được phép đi?', '/question-images/q522.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 522;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (522, 'Cả ba hướng.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (522, 'Hướng 2 và 3.', 1, 2);

-- Question 523
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (523, 'ALL', 7, 523, 'Những hướng nào xe ô tô tải được phép đi?', '/question-images/q523.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 523;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (523, 'Chỉ hướng 1.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (523, 'Hướng 1 và 4.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (523, 'Hướng 1 và 5.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (523, 'Hướng 1, 4 và 5.', 0, 4);

-- Question 524
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (524, 'ALL', 7, 524, 'Những hướng nào xe ô tô tải được phép đi?', '/question-images/q524.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 524;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (524, 'Cả bốn hướng.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (524, 'Trừ hướng 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (524, 'Hướng 2, 3 và 4.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (524, 'Trừ hướng 4.', 0, 4);

-- Question 525
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (525, 'ALL', 7, 525, 'Xe nào được quyền đi trước trong trường hợp này?', '/question-images/q525.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 525;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (525, 'Xe mô tô.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (525, 'Xe con.', 0, 2);

-- Question 526
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (526, 'ALL', 7, 526, 'Xe ô tô con đi theo chiều mũi tên có vi phạm quy tắc giao thông không?', '/question-images/q526.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 526;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (526, 'Không vi phạm.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (526, 'Vi phạm.', 1, 2);

-- Question 527
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (527, 'ALL', 7, 527, 'Xe nào vi phạm quy tắc giao thông?', '/question-images/q527.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 527;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (527, 'Xe khách.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (527, 'Xe mô tô.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (527, 'Xe con.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (527, 'Xe con và xe mô tô.', 0, 4);

-- Question 528
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (528, 'ALL', 7, 528, 'Các xe đi như thế nào là đúng quy tắc giao thông?', '/question-images/q528.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 528;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (528, 'Các xe ở phía tay phải và tay trái của người điều khiển được phép đi thẳng.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (528, 'Cho phép các xe ở mọi hướng được phép rẽ phải.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (528, 'Tất cả các xe phải dừng lại trước ngã tư, trừ những xe đã ở trong ngã tư được phép tiếp tục đi.', 1, 3);

-- Question 529
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (529, 'ALL', 7, 529, 'Theo hướng mũi tên, xe nào được phép đi?', '/question-images/q529.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 529;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (529, 'Xe mô tô, xe con.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (529, 'Xe con, xe tải.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (529, 'Xe mô tô, xe tải.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (529, 'Cả ba xe.', 0, 4);

-- Question 530
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (530, 'ALL', 7, 530, 'Xe con vượt xe tải như trường hợp này có đúng không?', '/question-images/q530.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 530;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (530, 'Đúng.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (530, 'Không đúng.', 0, 2);

-- Question 531
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (531, 'ALL', 7, 531, 'Xe nào vượt đúng quy tắc giao thông?', '/question-images/q531.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 531;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (531, 'Xe tải.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (531, 'Cả hai xe.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (531, 'Xe con.', 1, 3);

-- Question 532
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (532, 'ALL', 7, 532, 'Đi theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?', '/question-images/q532.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 532;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (532, 'Xe chữa cháy đi làm nhiệm vụ chữa cháy.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (532, 'Xe tải.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (532, 'Cả hai xe.', 0, 3);

-- Question 533
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (533, 'ALL', 7, 533, 'Thứ tự các xe đi như thế nào là đúng quy tắc giao thông?', '/question-images/q533.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 533;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (533, 'Xe khách, xe tải, xe con.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (533, 'Xe con, xe tải, xe khách.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (533, 'Xe tải, xe khách, xe con.', 1, 3);

-- Question 534
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (534, 'ALL', 7, 534, 'Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng quy tắc giao thông?', '/question-images/q534.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 534;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (534, 'Xe khách và xe tải, xe con.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (534, 'Xe tải, xe khách, xe con.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (534, 'Xe con, xe khách, xe tải.', 0, 3);

-- Question 535
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (535, 'ALL', 7, 535, 'Những hướng nào xe ô tô tải được phép đi?', '/question-images/q535.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 535;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (535, 'Cả bốn hướng.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (535, 'Chỉ hướng 1 và 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (535, 'Trừ hướng 4.', 1, 3);

-- Question 536
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (536, 'ALL', 7, 536, 'Theo hướng mũi tên, thứ tự các xe đi như thế nào là đúng?', '/question-images/q536.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 536;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (536, 'Xe công an đi làm nhiệm vụ khẩn cấp, xe con, xe tải, xe khách.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (536, 'Xe con, xe khách và xe công an đi làm nhiệm vụ khẩn cấp, xe tải.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (536, 'Xe công an đi làm nhiệm vụ khẩn cấp, xe con, xe khách, xe tải.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (536, 'Xe con, xe tải, xe khách, xe công an đi làm nhiệm vụ khẩn cấp.', 0, 4);

-- Question 537
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (537, 'ALL', 7, 537, 'Những hướng nào ô tô tải được phép đi?', '/question-images/q537.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 537;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (537, 'Cả bốn hướng.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (537, 'Hướng 1, 2 và 3.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (537, 'Hướng 1 và 4.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (537, 'Hướng 1, 3 và 4.', 1, 4);

-- Question 538
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (538, 'ALL', 7, 538, 'Trong hình dưới đây, xe nào chấp hành đúng quy tắc giao thông?', '/question-images/q538.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 538;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (538, 'Chỉ xe khách, xe mô tô.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (538, 'Tất cả các loại xe trên.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (538, 'Không xe nào chấp hành đúng quy tắc giao thông.', 0, 3);

-- Question 539
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (539, 'ALL', 7, 539, 'Theo hướng mũi tên, những hướng nào xe mô tô được phép đi?', '/question-images/q539.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 539;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (539, 'Cả ba hướng.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (539, 'Hướng 1 và 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (539, 'Hướng 1 và 3.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (539, 'Hướng 2 và 3.', 0, 4);

-- Question 540
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (540, 'ALL', 7, 540, 'Trong trường hợp này, thứ tự xe đi như thế nào là đúng quy tắc giao thông?', '/question-images/q540.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 540;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (540, 'Xe công an đi làm nhiệm vụ khẩn cấp, xe quân sự đi làm nhiệm vụ khẩn cấp, xe con + xe mô tô.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (540, 'Xe quân sự đi làm nhiệm vụ khẩn cấp, xe công an đi làm nhiệm vụ khẩn cấp, xe con + xe mô tô.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (540, 'Xe mô tô + xe con, xe quân sự đi làm nhiệm vụ khẩn cấp, xe công an đi làm nhiệm vụ khẩn cấp.', 0, 3);

-- Question 541
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (541, 'ALL', 7, 541, 'Xe nào phải nhường đường là đúng quy tắc giao thông?', '/question-images/q541.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 541;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (541, 'Xe A.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (541, 'Xe B.', 0, 2);

-- Question 542
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (542, 'ALL', 7, 542, 'Xe con quay đầu đi ngược lại như hình vẽ dưới có vi phạm quy tắc giao thông không?', '/question-images/q542.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 542;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (542, 'Không vi phạm.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (542, 'Vi phạm.', 1, 2);

-- Question 543
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (543, 'ALL', 7, 543, 'Trong hình dưới, những xe nào vi phạm quy tắc giao thông?', '/question-images/q543.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 543;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (543, 'Xe con (E), xe mô tô (C).', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (543, 'Xe tải (A), xe mô tô (D).', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (543, 'Xe khách (B), xe mô tô (C).', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (543, 'Xe khách (B), xe mô tô (D).', 0, 4);

-- Question 544
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (544, 'ALL', 7, 544, 'Để điều khiển cho xe đi thẳng, người lái xe phải làm gì là đúng quy tắc giao thông?', '/question-images/q544.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 544;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (544, 'Nhường xe con rẽ trái trước.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (544, 'Đi thẳng không nhường.', 0, 2);

-- Question 545
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (545, 'ALL', 7, 545, 'Người lái xe điều khiển xe đi theo hướng nào là đúng quy tắc giao thông?', '/question-images/q545.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 545;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (545, 'Chỉ hướng 2.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (545, 'Hướng 1 và 2.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (545, 'Tất cả các hướng trừ hướng 3.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (545, 'Tất cả các hướng trừ hướng 4.', 0, 4);

-- Question 546
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (546, 'ALL', 7, 546, 'Xe nào phải nhường đường là đúng quy tắc giao thông?', '/question-images/q546.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 546;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (546, 'Xe con (A).', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (546, 'Xe con (B).', 1, 2);

-- Question 547
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (547, 'ALL', 7, 547, 'Người lái xe điều khiển xe rẽ trái như thế nào là đúng quy tắc giao thông?', '/question-images/q547.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 547;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (547, 'Rẽ trái ngay trước xe buýt.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (547, 'Rẽ trái trước xe tải.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (547, 'Nhường đường cho xe buýt và xe tải.', 1, 3);

-- Question 548
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (548, 'ALL', 7, 548, 'Trong hình dưới, những xe nào vi phạm quy tắc giao thông?', '/question-images/q548.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 548;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (548, 'Xe con (B), xe mô tô (C).', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (548, 'Xe con (A), xe mô tô (C).', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (548, 'Xe con (E), xe mô tô (D).', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (548, 'Tất cả các loại xe trên.', 0, 4);

-- Question 549
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (549, 'ALL', 7, 549, 'Xe nào đi trước là đúng quy tắc giao thông?', '/question-images/q549.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 549;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (549, 'Xe của bạn.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (549, 'Xe tải.', 1, 2);

-- Question 550
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (550, 'ALL', 7, 550, 'Người lái xe có thể quay đầu xe như thế nào là đúng quy tắc giao thông?', '/question-images/q550.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 550;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (550, 'Quay đầu theo hướng A.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (550, 'Quay đầu theo hướng B.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (550, 'Cấm quay đầu.', 0, 3);

-- Question 551
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (551, 'ALL', 7, 551, 'Thứ tự các xe đi như thế nào là đúng quy tắc giao thông?', '/question-images/q551.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 551;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (551, 'Xe con và xe tải, xe của bạn.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (551, 'Xe của bạn, xe tải, xe con.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (551, 'Xe của bạn và xe con, xe tải.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (551, 'Xe của bạn, xe tải + xe con.', 0, 4);

-- Question 552
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (552, 'ALL', 7, 552, 'Khi muốn vượt xe tải, người lái xe phải làm gì là đúng quy tắc giao thông?', '/question-images/q552.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 552;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (552, 'Tăng tốc cho xe chạy vượt qua.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (552, 'Bật tín hiệu báo hiệu bằng đèn hoặc còi, khi đủ điều kiện an toàn, tăng tốc cho xe chạy vượt qua.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (552, 'Đánh lái sang làn bên trái và tăng tốc cho xe chạy vượt qua.', 0, 3);

-- Question 553
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (553, 'ALL', 7, 553, 'Theo tín hiệu đèn, xe nào phải dừng lại là đúng quy tắc giao thông?', '/question-images/q553.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 553;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (553, 'Xe khách, xe mô tô.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (553, 'Xe tải, xe mô tô.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (553, 'Xe con, xe tải.', 1, 3);

-- Question 554
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (554, 'ALL', 7, 554, 'Trong hình dưới, những xe nào chấp hành quy tắc giao thông?', '/question-images/q554.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 554;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (554, 'Xe tải ( D), xe con (B).', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (554, 'Xe con (A), xe con (C), xe con (E), xe buýt (G).', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (554, 'Xe con (A), xe con (B), xe tải (D).', 0, 3);

-- Question 555
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (555, 'ALL', 7, 555, 'Người lái xe có được phép vượt xe tải để đi thẳng trong trường hợp này không?', '/question-images/q555.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 555;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (555, 'Được vượt.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (555, 'Cấm vượt.', 1, 2);

-- Question 556
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (556, 'ALL', 7, 556, 'Bạn có được phép vượt xe mô tô phía trước không?', NULL, '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 556;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (556, 'Cho phép.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (556, 'Không được vượt.', 1, 2);

-- Question 557
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (557, 'ALL', 7, 557, 'Người lái xe dừng tại vị trí nào là đúng quy tắc giao thông?', '/question-images/q557.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 557;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (557, 'Vị trí A và B.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (557, 'Vị trí A và C.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (557, 'Vị trí B và C.', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (557, 'Cả ba vị trí A, B, C.', 0, 4);

-- Question 558
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (558, 'ALL', 7, 558, 'Bạn được dừng xe ở vị trí nào trong tình huống này?', '/question-images/q558.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 558;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (558, 'Được phép dừng ở vị trí A.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (558, 'Được phép dừng ở vị trí B.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (558, 'Được phép dừng ở vị trí A và B.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (558, 'Không được dừng.', 1, 4);

-- Question 559
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (559, 'ALL', 7, 559, 'Theo tín hiệu đèn của xe cơ giới, xe nào vi phạm quy tắc giao thông?', '/question-images/q559.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 559;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (559, 'Xe mô tô.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (559, 'Xe ô tô con.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (559, 'Không xe nào vi phạm.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (559, 'Cả hai xe.', 1, 4);

-- Question 560
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (560, 'ALL', 7, 560, 'Các xe đi theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?', '/question-images/q560.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 560;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (560, 'Xe con.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (560, 'Xe tải.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (560, 'Xe con, xe tải.', 0, 3);

-- Question 561
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (561, 'ALL', 7, 561, 'Các xe đi theo hướng mũi tên, những xe nào vi phạm quy tắc giao thông?', '/question-images/q561.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 561;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (561, 'Xe tải, xe con.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (561, 'Xe khách, xe con.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (561, 'Xe khách, xe tải.', 1, 3);

-- Question 562
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (562, 'ALL', 7, 562, 'Các xe đi theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?', '/question-images/q562.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 562;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (562, 'Xe con, xe tải, xe khách.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (562, 'Xe tải, xe khách, xe mô tô.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (562, 'Xe khách, xe mô tô, xe con.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (562, 'Cả bốn xe.', 0, 4);

-- Question 563
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (563, 'ALL', 7, 563, 'Các xe đi theo hướng mũi tên, xe nào vi phạm quy tắc giao thông?', '/question-images/q563.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 563;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (563, 'Xe khách, xe tải.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (563, 'Xe khách, xe con.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (563, 'Xe con, xe tải.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (563, 'Xe khách, xe tải, xe con.', 0, 4);

-- Question 564
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (564, 'ALL', 7, 564, 'Trong tình huống dưới đây, để tránh xe phía trước bị hỏng đột xuất trên đường, người lái xe phải làm gì?', '/question-images/q564.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 564;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (564, 'Đánh lái sang trái cho xe vượt qua.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (564, 'Quan sát phía trước, phía sau, khi đủ điều kiện an toàn, bật tín hiệu bằng đèn hoặc còi rồi cho xe chạy vượt qua.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (564, 'Cấm vượt.', 0, 3);

-- Question 565
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (565, 'ALL', 7, 565, 'Các xe đi theo hướng mũi tên, xe nào chấp hành đúng quy tắc giao thông?', '/question-images/q565.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 565;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (565, 'Xe tải, xe mô tô.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (565, 'Xe khách, xe mô tô.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (565, 'Xe tải, xe con.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (565, 'Xe mô tô, xe con.', 0, 4);

-- Question 566
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (566, 'ALL', 7, 566, 'Trong hình dưới, những xe nào vi phạm quy tắc giao thông?', '/question-images/q566.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 566;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (566, 'Xe con (A), xe con (B), xe tải (D).', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (566, 'Xe tải (D), xe con (E), xe buýt (G).', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (566, 'Xe tải ( D), xe con (B).', 1, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (566, 'Xe con (B), xe con (C).', 0, 4);

-- Question 567
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (567, 'ALL', 7, 567, 'Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?', '/question-images/q567.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 567;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (567, 'Xe của bạn, xe mô tô, xe con.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (567, 'Xe con, xe của bạn, xe mô tô.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (567, 'Xe mô tô, xe con, xe của bạn.', 1, 3);

-- Question 568
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (568, 'ALL', 7, 568, 'Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?', '/question-images/q568.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 568;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (568, 'Xe của bạn, xe mô tô, xe con.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (568, 'Xe con, xe của bạn, xe mô tô.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (568, 'Xe mô tô, xe con, xe của bạn.', 0, 3);

-- Question 569
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (569, 'ALL', 7, 569, 'Xe nào phải dừng lại trong trường hợp này?', '/question-images/q569.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 569;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (569, 'Xe con.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (569, 'Xe của bạn.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (569, 'Cả hai xe.', 0, 3);

-- Question 570
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (570, 'ALL', 7, 570, 'Xe của bạn được đi theo hướng nào trong trường hợp này?', '/question-images/q570.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 570;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (570, 'Đi thẳng, rẽ trái.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (570, 'Đi thẳng, rẽ phải.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (570, 'Rẽ trái.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (570, 'Đi thẳng, rẽ phải, rẽ trái.', 0, 4);

-- Question 571
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (571, 'ALL', 7, 571, 'Xe của bạn được đi theo hướng nào trong trường hợp này?', '/question-images/q571.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 571;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (571, 'Chuyển sang làn đường bên phải và rẽ phải.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (571, 'Dừng lại trước vạch dừng và rẽ phải khi đèn xanh.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (571, 'Dừng lại trước vạch dừng và đi thẳng hoặc rẽ trái khi đèn xanh.', 1, 3);

-- Question 572
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (572, 'ALL', 7, 572, 'Bạn xử lý như thế nào trong trường hợp này?', '/question-images/q572.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 572;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (572, 'Tăng tốc độ, rẽ phải trước xe tải và xe đạp.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (572, 'Giảm tốc độ, rẽ phải sau xe tải và xe đạp.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (572, 'Tăng tốc độ, rẽ phải trước xe đạp.', 0, 3);

-- Question 573
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (573, 'ALL', 7, 573, 'Bạn xử lý như thế nào trong trường hợp này?', '/question-images/q573.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 573;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (573, 'Tăng tốc độ, rẽ phải trước xe con màu xanh phía trước và người đi bộ.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (573, 'Giảm tốc độ, để người đi bộ qua đường và rẽ phải trước xe con màu xanh.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (573, 'Giảm tốc độ, để người đi bộ qua đường và rẽ phải sau xe con màu xanh.', 1, 3);

-- Question 574
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (574, 'ALL', 7, 574, 'Bạn xử lý như thế nào trong trường hợp này?', '/question-images/q574.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 574;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (574, 'Nhường đường cho xe khách và đi trước xe đạp.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (574, 'Nhường đường cho xe đạp và đi trước xe khách.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (574, 'Nhường đường cho xe đạp và xe khách.', 1, 3);

-- Question 575
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (575, 'ALL', 7, 575, 'Xe nào phải nhường đường trong trường hợp này?', '/question-images/q575.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 575;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (575, 'Xe con.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (575, 'Xe tải.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (575, 'Xe của bạn.', 0, 3);

-- Question 576
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (576, 'ALL', 7, 576, 'Xe nào phải nhường đường trong trường hợp này?', '/question-images/q576.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 576;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (576, 'Xe đi ngược chiều.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (576, 'Xe của bạn.', 1, 2);

-- Question 577
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (577, 'ALL', 7, 577, 'Bạn xử lý như thế nào khi lái xe ô tô vượt qua đoàn người đi xe đạp có tổ chức?', '/question-images/q577.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 577;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (577, 'Tăng tốc độ, chuyển sang làn đường bên trái để vượt.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (577, 'Không được vượt những người đi xe đạp.', 1, 2);

-- Question 578
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (578, 'ALL', 7, 578, 'Phía trước có một xe đang lùi vào nơi đỗ, xe con phía trước đang chuyển sang làn đường bên trái, bạn xử lý như thế nào trong trường hợp này?', '/question-images/q578.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 578;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (578, 'Nếu phía sau không có xe xin vượt, chuyển sang làn đường bên trái.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (578, 'Nếu phía sau có xe xin vượt, thì giảm tốc độ, ở lại làn đường, dừng lại khi cần thiết.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (578, 'Tăng tốc độ trên làn đường của mình và vượt xe con.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (578, 'Ý 1 và ý 2.', 1, 4);

-- Question 579
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (579, 'ALL', 7, 579, 'Bạn xử lý như thế nào khi xe phía trước đang lùi ra khỏi nơi đỗ?', '/question-images/q579.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 579;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (579, 'Chuyển sang nửa đường bên trái để đi tiếp.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (579, 'Bấm còi, nháy đèn báo hiệu và đi tiếp.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (579, 'Giảm tốc độ, dừng lại nhường đường.', 1, 3);

-- Question 580
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (580, 'ALL', 7, 580, 'Phía trước có một xe màu xanh đang vượt xe màu vàng trên làn đường của bạn, bạn xử lý như thế nào trong trường hợp này?', '/question-images/q580.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 580;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (580, 'Phanh xe giảm tốc độ và đi sát lề đường bên phải.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (580, 'Bấm còi, nháy đèn báo hiệu, giữ nguyên tốc độ và đi tiếp.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (580, 'Phanh xe giảm tốc độ và đi sát vào lề đường bên trái.', 0, 3);

-- Question 581
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (581, 'ALL', 7, 581, 'Xe tải phía trước có tín hiệu xin chuyển làn đường, bạn xử lý như thế nào trong trường hợp này?', '/question-images/q581.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 581;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (581, 'Bật tín hiệu xin chuyển làn đường sang trái để vượt xe tải.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (581, 'Phanh xe giảm tốc độ chờ xe tải phía trước chuyển làn đường.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (581, 'Bấm còi báo hiệu và vượt qua xe tải trên làn đường của mình.', 0, 3);

-- Question 582
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (582, 'ALL', 7, 582, 'Bạn xử lý như thế nào trong trường hợp này?', '/question-images/q582.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 582;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (582, 'Tăng tốc độ và đi thẳng qua ngã tư.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (582, 'Dừng xe trước vạch dừng.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (582, 'Giảm tốc độ và đi thẳng qua ngã tư.', 1, 3);

-- Question 583
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (583, 'ALL', 7, 583, 'Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?', '/question-images/q583.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 583;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (583, 'Xe của bạn, xe mô tô, xe đạp.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (583, 'Xe mô tô, xe đạp, xe của bạn.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (583, 'Xe đạp, xe mô tô, xe của bạn.', 1, 3);

-- Question 584
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (584, 'ALL', 7, 584, 'Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?', '/question-images/q584.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 584;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (584, 'Xe của bạn, xe tải, xe con.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (584, 'Xe con, xe tải, xe của bạn.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (584, 'Xe tải, xe của bạn, xe con.', 0, 3);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (584, 'Xe của bạn, xe con, xe tải.', 1, 4);

-- Question 585
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (585, 'ALL', 7, 585, 'Xe nào phải nhường đường trong trường hợp này?', '/question-images/q585.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 585;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (585, 'Xe của bạn.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (585, 'Xe con.', 0, 2);

-- Question 586
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (586, 'ALL', 7, 586, 'Xe nào phải nhường đường trong trường hợp này?', '/question-images/q586.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 586;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (586, 'Xe con.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (586, 'Xe của bạn.', 1, 2);

-- Question 587
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (587, 'ALL', 7, 587, 'Bạn xử lý như thế nào trong trường hợp này?', '/question-images/q587.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 587;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (587, 'Tăng tốc độ, đi qua vạch người đi bộ sang đường, để người đi bộ sang đường sau.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (587, 'Giảm tốc độ, đi qua vạch người đi bộ sang đường, để người đi bộ sang đường sau.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (587, 'Giảm tốc độ, để người đi bộ sang đường trước, sau đó cho xe đi qua vạch người đi bộ sang đường.', 1, 3);

-- Question 588
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (588, 'ALL', 7, 588, 'Xe nào được đi trước trong trường hợp này?', '/question-images/q588.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 588;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (588, 'Xe con.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (588, 'Xe của bạn.', 1, 2);

-- Question 589
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (589, 'ALL', 7, 589, 'Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?', '/question-images/q589.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 589;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (589, 'Xe con, xe tải, xe của bạn.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (589, 'Xe tải, xe con, xe của bạn.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (589, 'Xe tải, xe của bạn, xe con.', 0, 3);

-- Question 590
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (590, 'ALL', 7, 590, 'Bạn xử lý như thế nào trong trường hợp này?', '/question-images/q590.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 590;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (590, 'Tăng tốc độ cho xe lấn sang phần đường bên trái.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (590, 'Giảm tốc độ cho xe lấn sang phần đường bên trái.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (590, 'Giảm tốc độ cho xe đi sát phần đường bên phải.', 1, 3);

-- Question 591
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (591, 'ALL', 7, 591, 'Xe nào được đi trước trong trường hợp này?', '/question-images/q591.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 591;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (591, 'Xe tải.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (591, 'Xe của bạn.', 0, 2);

-- Question 592
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (592, 'ALL', 7, 592, 'Xe nào dừng đúng theo quy tắc giao thông?', '/question-images/q592.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 592;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (592, 'Xe con.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (592, 'Xe mô tô.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (592, 'Cả 2 xe đều đúng.', 0, 3);

-- Question 593
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (593, 'ALL', 7, 593, 'Các xe đi theo thứ tự nào là đúng quy tắc giao thông đường bộ?', '/question-images/q593.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 593;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (593, 'Xe tải, xe đạp, xe của bạn.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (593, 'Xe của bạn, xe đạp, xe tải.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (593, 'Xe của bạn, xe tải, xe đạp.', 1, 3);

-- Question 594
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (594, 'ALL', 7, 594, 'Để điều khiển xe rẽ trái, bạn chọn hướng đi nào dưới đây?', '/question-images/q594.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 594;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (594, 'Hướng 1.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (594, 'Hướng 2.', 0, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (594, 'Cả hai hướng đều được.', 0, 3);

-- Question 595
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (595, 'ALL', 7, 595, 'Khi gặp xe ngược chiều bật đèn pha trong tình huống dưới dây, bạn xử lý như thế nào?', '/question-images/q595.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 595;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (595, 'Bật đèn chiếu xa, tăng tốc độ vượt xe cùng chiều.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (595, 'Giữ nguyên đèn chiếu gần, giảm tốc độ, đi sau xe phía trước.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (595, 'Giữ nguyên đèn chiếu gần, tăng tốc độ vượt xe cùng chiều.', 0, 3);

-- Question 596
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (596, 'ALL', 7, 596, 'Xe của bạn đang di chuyển gần đến khu vực giao cắt với đường sắt, khi rào chắn đang dịch chuyển, bạn điều khiển xe như thế nào là đúng quy tắc giao thông?', '/question-images/q596.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 596;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (596, 'Quan sát nếu thấy không có tàu thì tăng tốc cho xe vượt qua đường sắt.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (596, 'Dừng lại trước rào chắn một khoảng cách an toàn.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (596, 'Ra tín hiệu, yêu cầu người gác chắn tàu kéo chậm barie để xe bạn qua.', 0, 3);

-- Question 597
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (597, 'ALL', 7, 597, 'Trong tình huống dưới đây, xe con màu đỏ nhập làn đường cao tốc theo hướng mũi tên là đúng hay sai?', '/question-images/q597.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 597;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (597, 'Đúng.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (597, 'Sai.', 1, 2);

-- Question 598
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (598, 'ALL', 7, 598, 'Trong tình huống dưới đây, xe con màu đỏ có được phép vượt khi xe con màu xanh đang vượt xe tải hay không?', '/question-images/q598.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 598;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (598, 'Được vượt.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (598, 'Không được vượt.', 1, 2);

-- Question 599
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (599, 'ALL', 7, 599, 'Trong tình huống dưới đây, xe con màu vàng vượt xe con màu đỏ là đúng quy tắc giao thông hay không?', '/question-images/q599.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 599;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (599, 'Đúng.', 1, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (599, 'Không đúng.', 0, 2);

-- Question 600
INSERT INTO theory_questions (id, category_code, topic_id, question_number, content, image_url, explanation, is_paralysis, version, verification_status, legal_reference, created_at, updated_at)
VALUES (600, 'ALL', 7, 600, 'Trong tình huống dưới đây, xe đầu kéo kéo rơ moóc (xe container) đang rẽ phải, xe con màu xanh và xe máy phía sau xe container đi như thế nào để bảo đảm an toàn?', '/question-images/q600.jpg', '🗺️ Sa hình: Xe trong giao lộ → Xe ưu tiên → Đường ưu tiên → Xe bên phải', 0, 'VN-600-2025', 'VERIFIED', 'Công văn 2262/CSGT-P5 ngày 07/05/2025, Cục Cảnh sát giao thông — Bộ Công an', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    category_code = VALUES(category_code),
    topic_id = VALUES(topic_id),
    question_number = VALUES(question_number),
    content = VALUES(content),
    image_url = VALUES(image_url),
    explanation = VALUES(explanation),
    is_paralysis = VALUES(is_paralysis),
    version = VALUES(version),
    verification_status = VALUES(verification_status),
    legal_reference = VALUES(legal_reference),
    updated_at = NOW();

DELETE FROM theory_answers WHERE question_id = 600;

INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (600, 'Vượt về phía bên phải để đi tiếp.', 0, 1);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (600, 'Giảm tốc độ chờ xe container rẽ xong rồi tiếp tục đi.', 1, 2);
INSERT INTO theory_answers (question_id, answer_text, is_correct, order_index) VALUES (600, 'Vượt về phía bên trái để đi tiếp.', 0, 3);
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;