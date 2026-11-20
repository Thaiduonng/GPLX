package vn.edu.gplx.modules.learning.application;

import vn.edu.gplx.modules.learning.api.dto.QuestionDetailResponse;
import vn.edu.gplx.modules.learning.api.dto.TheoryStatisticsResponse;

import java.util.List;

public interface TheoryStatisticsService {
    TheoryStatisticsResponse getUserStatistics(Long userId);
    List<QuestionDetailResponse> getIncorrectQuestions(Long userId);
}
