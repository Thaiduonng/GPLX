package vn.edu.gplx.modules.learning.api.dto;

public record AnswerResponse(
        Long id,
        String answerText,
        int orderIndex
) {
}
