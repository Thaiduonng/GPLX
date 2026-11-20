package vn.edu.gplx.modules.learning.application;

import vn.edu.gplx.modules.learning.api.dto.QuestionDetailResponse;
import vn.edu.gplx.modules.learning.api.dto.ReviewAnswerRequest;
import vn.edu.gplx.modules.learning.api.dto.ReviewAnswerResultResponse;
import vn.edu.gplx.modules.learning.api.dto.ReviewDashboardOverviewResponse;
import vn.edu.gplx.modules.learning.api.dto.ReviewSessionDetailResponse;
import vn.edu.gplx.modules.learning.api.dto.ReviewSessionResultResponse;
import vn.edu.gplx.modules.learning.api.dto.ReviewSessionStartRequest;
import vn.edu.gplx.modules.learning.api.dto.ReviewSessionSummaryDto;
import vn.edu.gplx.modules.learning.api.dto.ReviewTopicStatDto;
import vn.edu.gplx.modules.learning.api.dto.ReviewWrongQuestionSummaryDto;

import java.util.List;

public interface TheoryReviewService {

    ReviewDashboardOverviewResponse getDashboardOverview(Long userId, String categoryCode);

    List<ReviewWrongQuestionSummaryDto> getWrongQuestions(Long userId, String categoryCode, Long topicId);

    List<QuestionDetailResponse> getCriticalQuestions(Long userId, String categoryCode, String statusFilter);

    List<QuestionDetailResponse> getBookmarkedQuestions(Long userId, Long topicId);

    List<ReviewTopicStatDto> getTopicStats(Long userId, String categoryCode);

    ReviewSessionDetailResponse startReviewSession(Long userId, ReviewSessionStartRequest request);

    ReviewSessionDetailResponse getReviewSession(Long userId, String sessionCode);

    ReviewAnswerResultResponse submitAnswer(Long userId, String sessionCode, ReviewAnswerRequest request);

    ReviewSessionResultResponse completeReviewSession(Long userId, String sessionCode);

    List<ReviewSessionSummaryDto> getReviewHistory(Long userId);
}
