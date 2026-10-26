package vn.edu.gplx.modules.learning.api.dto;

public record TopicResponse(
        Long id,
        String code,
        String name,
        String description,
        int orderIndex,
        int totalQuestions,
        int paralysisQuestions,
        int userLearnedQuestions
) {
}
