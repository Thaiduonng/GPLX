package vn.edu.gplx.modules.reporting.api.dto;

public record CategoryStatResponse(
        String categoryCode,
        String categoryName,
        long applicationCount,
        long candidateCount,
        long passedCount,
        double passRate
) {
}
