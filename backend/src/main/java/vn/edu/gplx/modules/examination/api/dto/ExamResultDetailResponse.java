package vn.edu.gplx.modules.examination.api.dto;

import vn.edu.gplx.modules.examination.domain.FinalExamResult;

import java.time.Instant;

public record ExamResultDetailResponse(
        Long candidateId,
        String candidateNumber,
        Long userId,
        String examCode,
        String categoryCode,
        Integer theoryScore,
        Boolean theoryPassed,
        Integer simulationScore,
        Boolean simulationPassed,
        Integer yardScore,
        Boolean yardPassed,
        Integer roadScore,
        Boolean roadPassed,
        FinalExamResult finalResult,
        Long examinerId,
        String examinerNote,
        Instant updatedAt
) {
}
