package vn.edu.gplx.modules.learning.api.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.Map;

public record ExamSubmitRequest(
        @NotNull(message = "Hạng GPLX thi thử không được để trống")
        String categoryCode,

        /**
         * Map lưu: key là questionId, value là answerId mà người thi đã chọn
         */
        @NotEmpty(message = "Danh sách câu trả lời không được để trống")
        Map<Long, Long> userAnswers
) {
}
