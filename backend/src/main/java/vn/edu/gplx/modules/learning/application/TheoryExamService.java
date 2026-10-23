package vn.edu.gplx.modules.learning.application;

import vn.edu.gplx.modules.learning.api.dto.ExamResultResponse;
import vn.edu.gplx.modules.learning.api.dto.ExamSubmitRequest;
import vn.edu.gplx.modules.learning.api.dto.QuestionResponse;

import java.util.List;

public interface TheoryExamService {

    List<QuestionResponse> getQuestionsByCategory(String categoryCode);

    List<QuestionResponse> generateMockExam(String categoryCode, int limit);

    ExamResultResponse submitMockExam(Long userId, ExamSubmitRequest request);
}
