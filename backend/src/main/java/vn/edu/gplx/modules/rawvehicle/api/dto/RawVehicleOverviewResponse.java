package vn.edu.gplx.modules.rawvehicle.api.dto;

import vn.edu.gplx.modules.rawvehicle.domain.RawVehicleEnrollmentStatus;

import java.time.LocalDate;
import java.util.List;

public record RawVehicleOverviewResponse(
        Long enrollmentId,
        Long studentId,
        String studentName,
        String categoryCode,
        String categoryName,
        String instructorName,
        RawVehicleEnrollmentStatus enrollmentStatus,
        LocalDate enrolledDate,
        Integer totalSessionsCount,
        Integer totalConfirmedMinutes,
        Integer totalCompletedStages,
        Integer totalStagesCount,
        Double progressPercentage,
        Integer skillsPassedCount,
        Integer skillsNeedsPracticeCount,
        RawVehicleSessionDto nextSession,
        List<RawVehicleSessionDto> recentSessions,
        List<RawVehicleStageDto> stagesProgress
) {}
