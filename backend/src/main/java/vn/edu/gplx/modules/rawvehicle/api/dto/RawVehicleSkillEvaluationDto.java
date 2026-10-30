package vn.edu.gplx.modules.rawvehicle.api.dto;

import vn.edu.gplx.modules.rawvehicle.domain.SkillEvaluationStatus;

import java.time.LocalDateTime;

public record RawVehicleSkillEvaluationDto(
        Long id,
        Long enrollmentId,
        Long studentId,
        Long stageId,
        String stageCode,
        String stageName,
        String criterionCode,
        String skillName,
        Integer ratingLevel,
        SkillEvaluationStatus evaluationStatus,
        String comments,
        String evaluatedByName,
        LocalDateTime evaluatedAt
) {}
