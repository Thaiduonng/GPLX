package vn.edu.gplx.modules.learning.application;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.edu.gplx.modules.learning.api.dto.QuestionDetailResponse;
import vn.edu.gplx.modules.learning.api.dto.TopicResponse;

import java.util.List;

public interface TheoryTopicService {
    List<TopicResponse> getAllTopics(Long userId);
    TopicResponse getTopicByCode(String code);
    List<QuestionDetailResponse> getQuestionsByTopic(Long topicId, Long userId);
    Page<QuestionDetailResponse> getQuestionsByTopic(Long topicId, Long userId, String categoryCode, Boolean isParalysis, String keyword, Pageable pageable);
}
