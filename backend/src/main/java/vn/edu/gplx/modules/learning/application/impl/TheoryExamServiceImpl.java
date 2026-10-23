package vn.edu.gplx.modules.learning.application.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.learning.api.dto.AnswerResponse;
import vn.edu.gplx.modules.learning.api.dto.ExamResultResponse;
import vn.edu.gplx.modules.learning.api.dto.ExamSubmitRequest;
import vn.edu.gplx.modules.learning.api.dto.QuestionResponse;
import vn.edu.gplx.modules.learning.application.TheoryExamService;
import vn.edu.gplx.modules.learning.domain.TheoryAnswer;
import vn.edu.gplx.modules.learning.domain.TheoryQuestion;
import vn.edu.gplx.modules.learning.infrastructure.TheoryQuestionRepository;
import vn.edu.gplx.shared.exception.ResourceNotFoundException;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
@Transactional(readOnly = true)
public class TheoryExamServiceImpl implements TheoryExamService {

    private static final Logger log = LoggerFactory.getLogger(TheoryExamServiceImpl.class);

    private final TheoryQuestionRepository questionRepository;

    public TheoryExamServiceImpl(TheoryQuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @Override
    public List<QuestionResponse> getQuestionsByCategory(String categoryCode) {
        return questionRepository.findByCategoryCodeOrderByQuestionNumberAsc(categoryCode).stream()
                .map(this::toQuestionResponse)
                .toList();
    }

    @Override
    public List<QuestionResponse> generateMockExam(String categoryCode, int limit) {
        List<TheoryQuestion> all = questionRepository.findByCategoryCodeOrderByQuestionNumberAsc(categoryCode);
        if (all.isEmpty()) {
            return List.of();
        }

        // Đảo ngẫu nhiên câu hỏi
        List<TheoryQuestion> shuffled = new ArrayList<>(all);
        Collections.shuffle(shuffled);

        int count = Math.min(limit > 0 ? limit : 25, shuffled.size());
        return shuffled.subList(0, count).stream()
                .map(this::toQuestionResponse)
                .toList();
    }

    @Override
    @Transactional
    public ExamResultResponse submitMockExam(Long userId, ExamSubmitRequest request) {
        Map<Long, Long> userAnswers = request.userAnswers();
        List<ExamResultResponse.QuestionResultDetail> details = new ArrayList<>();

        int correctCount = 0;
        int wrongCount = 0;
        boolean failedDueToParalysis = false;

        for (Map.Entry<Long, Long> entry : userAnswers.entrySet()) {
            Long questionId = entry.getKey();
            Long selectedAnswerId = entry.getValue();

            TheoryQuestion question = questionRepository.findById(questionId)
                    .orElseThrow(() -> new ResourceNotFoundException("TheoryQuestion", "id", questionId));

            Long correctAnswerId = question.getAnswers().stream()
                    .filter(TheoryAnswer::isCorrect)
                    .map(TheoryAnswer::getId)
                    .findFirst()
                    .orElse(null);

            boolean isCorrect = correctAnswerId != null && correctAnswerId.equals(selectedAnswerId);
            if (isCorrect) {
                correctCount++;
            } else {
                wrongCount++;
                // Điểm liệt: Sai câu điểm liệt bị trượt ngay
                if (question.isParalysis()) {
                    failedDueToParalysis = true;
                }
            }

            details.add(new ExamResultResponse.QuestionResultDetail(
                    question.getId(),
                    question.getQuestionNumber(),
                    question.getContent(),
                    question.isParalysis(),
                    selectedAnswerId,
                    correctAnswerId,
                    isCorrect,
                    question.getExplanation()
            ));
        }

        int totalQuestions = userAnswers.size();
        // Điểm đạt tối thiểu 80% câu đúng
        int passingScore = (int) Math.ceil(totalQuestions * 0.80);
        boolean passed = !failedDueToParalysis && (correctCount >= passingScore);

        log.info("Mock exam result for user {}: total={}, correct={}, failedDueToParalysis={}, passed={}",
                userId, totalQuestions, correctCount, failedDueToParalysis, passed);

        return new ExamResultResponse(
                request.categoryCode(),
                totalQuestions,
                correctCount,
                wrongCount,
                failedDueToParalysis,
                passed,
                passingScore,
                Instant.now(),
                details
        );
    }

    private QuestionResponse toQuestionResponse(TheoryQuestion q) {
        List<AnswerResponse> answerResponses = q.getAnswers().stream()
                .map(a -> new AnswerResponse(a.getId(), a.getAnswerText(), a.getOrderIndex()))
                .toList();

        return new QuestionResponse(
                q.getId(),
                q.getCategoryCode(),
                q.getQuestionNumber(),
                q.getContent(),
                q.getImageUrl(),
                q.getExplanation(),
                q.isParalysis(),
                answerResponses
        );
    }
}
