package vn.edu.gplx.modules.rawvehicle.api.dto;

import java.util.List;

public record RawVehicleStageDto(
        Long id,
        String stageCode,
        String stageName,
        String description,
        Integer stepOrder,
        String prerequisiteStageCode,
        Integer expectedDurationMinutes,
        String evaluationCriteria,
        String status,
        String complianceStatus,
        Boolean isCompleted,
        List<RawVehicleSkillEvaluationDto> evaluations
) {}
