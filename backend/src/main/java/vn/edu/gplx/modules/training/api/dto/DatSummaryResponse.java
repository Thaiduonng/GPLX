package vn.edu.gplx.modules.training.api.dto;

import java.math.BigDecimal;
import java.util.List;

public record DatSummaryResponse(
        Long studentId,
        BigDecimal totalDistanceKm,
        int totalDurationMinutes,
        int totalSessions,
        BigDecimal targetDistanceKm, // Ví dụ: 810km đối với hạng B1/B
        int targetDurationMinutes,   // Ví dụ: 1200 phút (20 giờ)
        boolean isCompleted,
        List<DatSessionResponse> sessions
) {
}
