package vn.edu.gplx.modules.examination.api.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record RecordExamScoreRequest(
        @Min(value = 0, message = "Điểm lý thuyết không âm")
        Integer theoryScore,

        @Min(value = 0, message = "Điểm mô phỏng từ 0 đến 50")
        @Max(value = 50, message = "Điểm mô phỏng tối đa 50")
        Integer simulationScore,

        @Min(value = 0, message = "Điểm thực hành sa hình từ 0 đến 100")
        @Max(value = 100, message = "Điểm thực hành sa hình tối đa 100")
        Integer yardScore,

        @Min(value = 0, message = "Điểm thực hành đường trường từ 0 đến 100")
        @Max(value = 100, message = "Điểm thực hành đường trường tối đa 100")
        Integer roadScore,

        String examinerNote
) {
}
