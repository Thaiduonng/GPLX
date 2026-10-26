package vn.edu.gplx.modules.learning.application;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.edu.gplx.modules.learning.api.dto.QuestionDetailResponse;
import vn.edu.gplx.modules.learning.api.dto.QuestionUpsertRequest;

public interface QuestionAdminService {
    Page<QuestionDetailResponse> searchQuestions(Long topicId, String categoryCode, Boolean isParalysis, Pageable pageable);
    QuestionDetailResponse getQuestionById(Long id);
    QuestionDetailResponse createQuestion(QuestionUpsertRequest request);
    QuestionDetailResponse updateQuestion(Long id, QuestionUpsertRequest request);
    void deleteQuestion(Long id);
}
