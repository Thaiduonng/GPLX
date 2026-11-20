# LEGAL VERIFICATION LOG — NHẬT KÝ ĐỐI SOÁT VĂN BẢN PHÁP LUẬT

| Mã nhật ký | Ngày kiểm tra | Điều khoản / Quy định | Nguồn chính thức | Trạng thái | Ghi chú áp dụng vào hệ thống | Người kiểm tra |
|---|---|---|---|---|---|---|
| `VERIF-2026-001` | 2026-10-26 | Bộ 600 câu hỏi sát hạch lý thuyết lái xe cơ giới đường bộ | Tổng cục Đường bộ VN (nay là Cục ĐBVN), Thông tư 12/2017/TT-BGTVT, Thông tư 04/2022/TT-BGTVT | `VERIFIED` | Chia 7 chương chuẩn, 60 câu điểm liệt. Áp dụng bảng `theory_topics` và `theory_questions`. | System Architect |
| `VERIF-2026-002` | 2026-10-26 | Cấu trúc đề thi và thời gian thi theo hạng A1, A2, B1, B, C | Quyết định hướng dẫn sát hạch lái xe, Thông tư 12/2017/TT-BGTVT | `VERIFIED` | Áp dụng cấu hình đề thi chuẩn hóa bảng `exam_configurations`: A1 (25 câu, 19p, 21/25), B1 (30 câu, 20p, 27/30), B (35 câu, 22p, 32/35), C (40 câu, 24p, 36/40). | System Architect |
| `VERIF-2026-003` | 2026-10-26 | Quy định câu hỏi điểm liệt (trượt ngay khi sai câu liệt) | Thông tư 04/2022/TT-BGTVT | `VERIFIED` | Áp dụng logic `hasFailedParalysis = true` thì `passed = false` bất kể tổng điểm đạt điều kiện. | System Architect |
