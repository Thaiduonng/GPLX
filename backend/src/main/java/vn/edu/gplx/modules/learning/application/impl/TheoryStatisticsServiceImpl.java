package vn.edu.gplx.modules.learning.application.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.learning.api.dto.QuestionDetailResponse;
import vn.edu.gplx.modules.learning.api.dto.StudyAnswerOptionResponse;
import vn.edu.gplx.modules.learning.api.dto.TheoryStatisticsResponse;
import vn.edu.gplx.modules.learning.application.TheoryStatisticsService;
import vn.edu.gplx.modules.learning.domain.TheoryQuestion;
import vn.edu.gplx.modules.learning.domain.TheoryTopic;
import vn.edu.gplx.modules.learning.infrastructure.BookmarkedQuestionRepository;
import vn.edu.gplx.modules.learning.infrastructure.MockExamSessionRepository;
import vn.edu.gplx.modules.learning.infrastructure.PracticeAnswerRepository;
import vn.edu.gplx.modules.learning.infrastructure.TheoryQuestionRepository;
import vn.edu.gplx.modules.learning.infrastructure.TheoryTopicRepository;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional(readOnly = true)
public class TheoryStatisticsServiceImpl implements TheoryStatisticsService {

    private final TheoryQuestionRepository questionRepository;
    private final TheoryTopicRepository topicRepository;
    private final PracticeAnswerRepository practiceAnswerRepository;
    private final MockExamSessionRepository examSessionRepository;
    private final BookmarkedQuestionRepository bookmarkRepository;

    public TheoryStatisticsServiceImpl(TheoryQuestionRepository questionRepository,
                                       TheoryTopicRepository topicRepository,
                                       PracticeAnswerRepository practiceAnswerRepository,
                                       MockExamSessionRepository examSessionRepository,
                                       BookmarkedQuestionRepository bookmarkRepository) {
        this.questionRepository = questionRepository;
        this.topicRepository = topicRepository;
        this.practiceAnswerRepository = practiceAnswerRepository;
        this.examSessionRepository = examSessionRepository;
        this.bookmarkRepository = bookmarkRepository;
    }

    @Override
    public TheoryStatisticsResponse getUserStatistics(Long userId) {
        long totalQuestionsInBank = questionRepository.count();

        List<Long> answeredQuestionIds = practiceAnswerRepository.findAnsweredQuestionIdsByUserId(userId);
        Set<Long> uniqueAnsweredSet = new HashSet<>(answeredQuestionIds);
        long questionsLearned = uniqueAnsweredSet.size();
        double completionRate = totalQuestionsInBank > 0 ? (double) questionsLearned / totalQuestionsInBank * 100 : 0.0;

        long totalAnswers = practiceAnswerRepository.countTotalAnswersByUserId(userId);
        long correctAnswers = practiceAnswerRepository.countCorrectAnswersByUserId(userId);
        double accuracyRate = totalAnswers > 0 ? (double) correctAnswers / totalAnswers * 100 : 0.0;

        long examsTaken = examSessionRepository.countCompletedByUserId(userId);
        long examsPassed = examSessionRepository.countByUserIdAndPassedTrue(userId);
        long examsFailed = Math.max(0, examsTaken - examsPassed);
        double examPassRate = examsTaken > 0 ? (double) examsPassed / examsTaken * 100 : 0.0;

        long bookmarkedCount = bookmarkRepository.countByUserId(userId);
        List<Long> wrongIds = practiceAnswerRepository.findIncorrectQuestionIdsByUserId(userId);
        long incorrectQuestionsCount = wrongIds.size();

        // Tiến độ theo từng chủ đề
        List<TheoryTopic> topics = topicRepository.findAllByOrderByOrderIndexAsc();
        List<TheoryStatisticsResponse.TopicProgressDto> topicProgressList = new ArrayList<>();

        for (TheoryTopic topic : topics) {
            List<TheoryQuestion> questionsInTopic = questionRepository.findByTopicIdOrderByQuestionNumberAsc(topic.getId());
            int totalInTopic = questionsInTopic.size();
            int answeredInTopic = (int) questionsInTopic.stream().filter(q -> uniqueAnsweredSet.contains(q.getId())).count();
            double progress = totalInTopic > 0 ? (double) answeredInTopic / totalInTopic * 100 : 0.0;

            topicProgressList.add(new TheoryStatisticsResponse.TopicProgressDto(
                    topic.getId(),
                    topic.getCode(),
                    topic.getName(),
                    totalInTopic,
                    topic.getParalysisQuestions(),
                    answeredInTopic,
                    0,
                    Math.round(progress * 10.0) / 10.0
            ));
        }

        return new TheoryStatisticsResponse(
                totalQuestionsInBank,
                questionsLearned,
                Math.round(completionRate * 10.0) / 10.0,
                totalAnswers,
                correctAnswers,
                Math.round(accuracyRate * 10.0) / 10.0,
                examsTaken,
                examsPassed,
                examsFailed,
                Math.round(examPassRate * 10.0) / 10.0,
                bookmarkedCount,
                incorrectQuestionsCount,
                topicProgressList
        );
    }

    @Override
    public List<QuestionDetailResponse> getIncorrectQuestions(Long userId) {
        List<Long> wrongIds = practiceAnswerRepository.findIncorrectQuestionIdsByUserId(userId);
        if (wrongIds.isEmpty()) {
            return List.of();
        }

        List<TheoryQuestion> questions = questionRepository.findByIdsIn(wrongIds);
        Set<Long> bookmarkedIds = new HashSet<>(bookmarkRepository.findByUserIdOrderByCreatedAtDesc(userId).stream().map(b -> b.getQuestion().getId()).toList());

        return questions.stream().map(q -> {
            List<StudyAnswerOptionResponse> answers = q.getAnswers().stream()
                    .map(a -> new StudyAnswerOptionResponse(a.getId(), a.getAnswerText(), a.getOrderIndex(), a.isCorrect()))
                    .toList();

            return new QuestionDetailResponse(
                    q.getId(),
                    q.getCategoryCode(),
                    q.getTopic() != null ? q.getTopic().getId() : null,
                    q.getTopic() != null ? q.getTopic().getName() : "",
                    q.getQuestionNumber(),
                    q.getContent(),
                    q.getImageUrl(),
                    q.getExplanation(),
                    q.isParalysis(),
                    q.getLegalReference(),
                    bookmarkedIds.contains(q.getId()),
                    answers
            );
        }).toList();
    }
}
