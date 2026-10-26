package vn.edu.gplx.modules.learning.application;

import vn.edu.gplx.modules.learning.api.dto.PracticeAnswerRequest;
import vn.edu.gplx.modules.learning.api.dto.PracticeAnswerResultResponse;
import vn.edu.gplx.modules.learning.api.dto.PracticeSessionStartRequest;
import vn.edu.gplx.modules.learning.api.dto.PracticeSessionSummaryResponse;
import vn.edu.gplx.modules.learning.api.dto.QuestionDetailResponse;

import java.util.List;

public interface TheoryPracticeService {
    PracticeSessionSummaryResponse startPracticeSession(Long userId, PracticeSessionStartRequest request);
    List<QuestionDetailResponse> getSessionQuestions(String sessionCode, Long userId);
    PracticeAnswerResultResponse submitAnswer(String sessionCode, Long userId, PracticeAnswerRequest request);
    PracticeSessionSummaryResponse completeSession(String sessionCode, Long userId);
    List<PracticeSessionSummaryResponse> getUserPracticeHistory(Long userId);
}
