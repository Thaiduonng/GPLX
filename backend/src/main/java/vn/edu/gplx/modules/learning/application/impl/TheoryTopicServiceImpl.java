package vn.edu.gplx.modules.learning.application.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.learning.api.dto.QuestionDetailResponse;
import vn.edu.gplx.modules.learning.api.dto.StudyAnswerOptionResponse;
import vn.edu.gplx.modules.learning.api.dto.TopicResponse;
import vn.edu.gplx.modules.learning.application.TheoryTopicService;
import vn.edu.gplx.modules.learning.domain.TheoryQuestion;
import vn.edu.gplx.modules.learning.domain.TheoryTopic;
import vn.edu.gplx.modules.learning.infrastructure.BookmarkedQuestionRepository;
import vn.edu.gplx.modules.learning.infrastructure.PracticeAnswerRepository;
import vn.edu.gplx.modules.learning.infrastructure.TheoryQuestionRepository;
import vn.edu.gplx.modules.learning.infrastructure.TheoryTopicRepository;
import vn.edu.gplx.shared.exception.ResourceNotFoundException;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional(readOnly = true)
public class TheoryTopicServiceImpl implements TheoryTopicService {

    private final TheoryTopicRepository topicRepository;
    private final TheoryQuestionRepository questionRepository;
    private final BookmarkedQuestionRepository bookmarkRepository;
    private final PracticeAnswerRepository practiceAnswerRepository;

    public TheoryTopicServiceImpl(TheoryTopicRepository topicRepository,
                                  TheoryQuestionRepository questionRepository,
                                  BookmarkedQuestionRepository bookmarkRepository,
                                  PracticeAnswerRepository practiceAnswerRepository) {
        this.topicRepository = topicRepository;
        this.questionRepository = questionRepository;
        this.bookmarkRepository = bookmarkRepository;
        this.practiceAnswerRepository = practiceAnswerRepository;
    }

    @Override
    public List<TopicResponse> getAllTopics(Long userId) {
        List<TheoryTopic> topics = topicRepository.findAllByOrderByOrderIndexAsc();
        Set<Long> answeredQuestionIds = (userId != null)
                ? new HashSet<>(practiceAnswerRepository.findAnsweredQuestionIdsByUserId(userId))
                : Collections.emptySet();

        return topics.stream().map(t -> {
            int learnedCount = 0;
            if (!answeredQuestionIds.isEmpty()) {
                List<TheoryQuestion> questions = questionRepository.findByTopicIdOrderByQuestionNumberAsc(t.getId());
                learnedCount = (int) questions.stream().filter(q -> answeredQuestionIds.contains(q.getId())).count();
            }
            return new TopicResponse(
                    t.getId(),
                    t.getCode(),
                    t.getName(),
                    t.getDescription(),
                    t.getOrderIndex(),
                    t.getTotalQuestions(),
                    t.getParalysisQuestions(),
                    learnedCount
            );
        }).toList();
    }

    @Override
    public TopicResponse getTopicByCode(String code) {
        TheoryTopic t = topicRepository.findByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("TheoryTopic", "code", code));
        return new TopicResponse(
                t.getId(),
                t.getCode(),
                t.getName(),
                t.getDescription(),
                t.getOrderIndex(),
                t.getTotalQuestions(),
                t.getParalysisQuestions(),
                0
        );
    }

    @Override
    public List<QuestionDetailResponse> getQuestionsByTopic(Long topicId, Long userId) {
        TheoryTopic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new ResourceNotFoundException("TheoryTopic", "id", topicId));

        List<TheoryQuestion> questions = questionRepository.findByTopicIdOrderByQuestionNumberAsc(topicId);
        Set<Long> bookmarkedIds = (userId != null)
                ? new HashSet<>(bookmarkRepository.findByUserIdOrderByCreatedAtDesc(userId).stream().map(b -> b.getQuestion().getId()).toList())
                : Collections.emptySet();

        return questions.stream().map(q -> toDetailResponse(q, topic.getName(), bookmarkedIds.contains(q.getId()))).toList();
    }

    private QuestionDetailResponse toDetailResponse(TheoryQuestion q, String topicName, boolean isBookmarked) {
        List<StudyAnswerOptionResponse> answers = q.getAnswers().stream()
                .map(a -> new StudyAnswerOptionResponse(a.getId(), a.getAnswerText(), a.getOrderIndex(), a.isCorrect()))
                .toList();

        return new QuestionDetailResponse(
                q.getId(),
                q.getCategoryCode(),
                q.getTopic() != null ? q.getTopic().getId() : null,
                topicName != null ? topicName : (q.getTopic() != null ? q.getTopic().getName() : ""),
                q.getQuestionNumber(),
                q.getContent(),
                q.getImageUrl(),
                q.getExplanation(),
                q.isParalysis(),
                q.getLegalReference(),
                isBookmarked,
                answers
        );
    }
}
