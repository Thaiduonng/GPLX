package vn.edu.gplx.modules.training.api.dto;

import vn.edu.gplx.modules.training.domain.ClassStatus;

import java.time.Instant;
import java.time.LocalDate;

public record TrainingClassResponse(
        Long id,
        Long courseId,
        String courseTitle,
        String classCode,
        String name,
        Long instructorId,
        LocalDate startDate,
        LocalDate endDate,
        int maxStudents,
        int enrolledStudents,
        ClassStatus status,
        Instant createdAt
) {
}
