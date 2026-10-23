package vn.edu.gplx.modules.examination.api.dto;

import vn.edu.gplx.modules.examination.domain.ExamSessionStatus;
import vn.edu.gplx.modules.examination.domain.ExamType;

import java.time.Instant;
import java.time.LocalDate;

public record ExamSessionResponse(
        Long id,
        String examCode,
        String name,
        Long categoryId,
        String categoryCode,
        LocalDate examDate,
        String location,
        ExamType examType,
        ExamSessionStatus status,
        int candidateCount,
        Instant createdAt
) {
}
