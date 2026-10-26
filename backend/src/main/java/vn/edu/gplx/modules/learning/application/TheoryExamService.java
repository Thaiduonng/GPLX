package vn.edu.gplx.modules.learning.application;

import vn.edu.gplx.modules.learning.api.dto.ExamResultResponse;
import vn.edu.gplx.modules.learning.api.dto.ExamSubmitRequest;
import vn.edu.gplx.modules.learning.api.dto.MockExamResultResponse;
import vn.edu.gplx.modules.learning.api.dto.MockExamSessionResponse;
import vn.edu.gplx.modules.learning.api.dto.MockExamSummaryResponse;
import vn.edu.gplx.modules.learning.api.dto.QuestionResponse;
import vn.edu.gplx.modules.learning.api.dto.StartMockExamRequest;
import vn.edu.gplx.modules.learning.api.dto.SubmitMockExamRequest;

import java.util.List;

public interface TheoryExamService {

    // Legacy support
    List<QuestionResponse> getQuestionsByCategory(String categoryCode);
    List<QuestionResponse> generateMockExam(String categoryCode, int limit);
    ExamResultResponse submitMockExam(Long userId, ExamSubmitRequest request);

    // Standardized secure exam workflow
    MockExamSessionResponse startMockExam(Long userId, StartMockExamRequest request);
    MockExamSessionResponse getMockExamSession(String sessionCode, Long userId);
    MockExamResultResponse submitMockExamSession(String sessionCode, Long userId, SubmitMockExamRequest request);
    List<MockExamSummaryResponse> getUserExamHistory(Long userId);
    MockExamResultResponse getExamDetail(String sessionCode, Long userId);
}
