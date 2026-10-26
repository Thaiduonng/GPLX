package vn.edu.gplx.modules.learning.api.dto;

import java.util.List;

public record QuestionDetailResponse(
        Long id,
        String categoryCode,
        Long topicId,
        String topicName,
        int questionNumber,
        String content,
        String imageUrl,
        String explanation,
        boolean isParalysis,
        String legalReference,
        boolean isBookmarked,
        List<StudyAnswerOptionResponse> answers
) {
}
