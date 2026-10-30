package vn.edu.gplx.modules.rawvehicle.api.dto;

import vn.edu.gplx.modules.rawvehicle.domain.RawVehicleEnrollmentStatus;

import java.time.LocalDate;

public record RawVehicleEnrollmentSummaryDto(
        Long id,
        Long studentId,
        String studentName,
        String studentPhone,
        String studentEmail,
        String categoryCode,
        String categoryName,
        Long instructorId,
        String instructorName,
        RawVehicleEnrollmentStatus status,
        LocalDate enrolledDate,
        LocalDate completedDate,
        Integer totalCompletedStages,
        Integer totalConfirmedMinutes,
        Integer totalSessionsCount,
        Double progressPercentage,
        Integer passedSkillsCount,
        Integer needsPracticeSkillsCount,
        String notes
) {}
