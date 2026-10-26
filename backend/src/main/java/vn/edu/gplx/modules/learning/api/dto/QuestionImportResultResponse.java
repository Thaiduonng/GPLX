package vn.edu.gplx.modules.learning.api.dto;

import java.util.List;

public record QuestionImportResultResponse(
        int totalReceived,
        int successCount,
        int failureCount,
        List<String> errors
) {
}
