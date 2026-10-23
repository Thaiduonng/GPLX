package vn.edu.gplx.modules.examination.api.dto;

import java.math.BigDecimal;
import java.util.List;

public record EligibilityCheckResult(
        Long userId,
        String categoryCode,
        boolean isEligible,
        boolean isAdmissionApproved,
        boolean isTheoryCompleted,
        boolean isDatCompleted,
        BigDecimal datDistanceKm,
        BigDecimal targetDatDistanceKm,
        int datDurationMinutes,
        int targetDatDurationMinutes,
        List<String> missingRequirements
) {
}
