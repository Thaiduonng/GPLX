package vn.edu.gplx.modules.examination.api.dto;

import vn.edu.gplx.modules.examination.domain.CandidateEligibility;
import vn.edu.gplx.modules.examination.domain.FinalExamResult;

import java.time.Instant;

public record CandidateResponse(
        Long id,
        Long examSessionId,
        String examCode,
        Long userId,
        String candidateNumber,
        CandidateEligibility eligibilityStatus,
        String disqualificationReason,
        FinalExamResult finalResult,
        Instant createdAt
) {
}
