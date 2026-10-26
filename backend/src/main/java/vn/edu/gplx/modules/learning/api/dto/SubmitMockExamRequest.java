package vn.edu.gplx.modules.learning.api.dto;

import java.util.Map;

public record SubmitMockExamRequest(
        Map<Long, Long> answers // questionId -> selectedAnswerId
) {
}
