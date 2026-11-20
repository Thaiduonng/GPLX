package vn.edu.gplx.modules.learning.application;

import vn.edu.gplx.modules.learning.api.dto.QuestionDetailResponse;

import java.util.List;

public interface TheoryBookmarkService {
    void addBookmark(Long userId, Long questionId, String note);
    void removeBookmark(Long userId, Long questionId);
    boolean toggleBookmark(Long userId, Long questionId);
    List<QuestionDetailResponse> getBookmarkedQuestions(Long userId);
}
