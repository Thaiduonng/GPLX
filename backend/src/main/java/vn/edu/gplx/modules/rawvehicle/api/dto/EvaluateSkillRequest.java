package vn.edu.gplx.modules.rawvehicle.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import vn.edu.gplx.modules.rawvehicle.domain.SkillEvaluationStatus;

public record EvaluateSkillRequest(
        @NotNull(message = "Mã đăng ký không được để trống")
        Long enrollmentId,

        @NotNull(message = "Giai đoạn kỹ năng không được để trống")
        Long stageId,

        @NotBlank(message = "Mã tiêu chí không được để trống")
        String criterionCode,

        @NotBlank(message = "Tên kỹ năng không được để trống")
        String skillName,

        Integer ratingLevel,

        @NotNull(message = "Trạng thái đánh giá không được để trống")
        SkillEvaluationStatus evaluationStatus,

        String comments
) {}
