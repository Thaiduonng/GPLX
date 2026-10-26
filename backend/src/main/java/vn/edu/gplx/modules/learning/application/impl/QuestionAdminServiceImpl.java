package vn.edu.gplx.modules.learning.application.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.learning.api.dto.QuestionDetailResponse;
import vn.edu.gplx.modules.learning.api.dto.QuestionUpsertRequest;
import vn.edu.gplx.modules.learning.api.dto.StudyAnswerOptionResponse;
import vn.edu.gplx.modules.learning.application.QuestionAdminService;
import vn.edu.gplx.modules.learning.domain.TheoryAnswer;
import vn.edu.gplx.modules.learning.domain.TheoryQuestion;
import vn.edu.gplx.modules.learning.domain.TheoryTopic;
import vn.edu.gplx.modules.learning.infrastructure.TheoryQuestionRepository;
import vn.edu.gplx.modules.learning.infrastructure.TheoryTopicRepository;
import vn.edu.gplx.shared.exception.ResourceNotFoundException;

import java.util.List;

@Service
@Transactional
public class QuestionAdminServiceImpl implements QuestionAdminService {

    private final TheoryQuestionRepository questionRepository;
    private final TheoryTopicRepository topicRepository;

    public QuestionAdminServiceImpl(TheoryQuestionRepository questionRepository, TheoryTopicRepository topicRepository) {
        this.questionRepository = questionRepository;
        this.topicRepository = topicRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<QuestionDetailResponse> searchQuestions(Long topicId, String categoryCode, Boolean isParalysis, Pageable pageable) {
        String cat = (categoryCode != null && !categoryCode.isBlank()) ? categoryCode : null;
        Page<TheoryQuestion> page = questionRepository.searchQuestions(topicId, cat, isParalysis, pageable);
        return page.map(q -> toDetail(q, false));
    }

    @Override
    @Transactional(readOnly = true)
    public QuestionDetailResponse getQuestionById(Long id) {
        TheoryQuestion question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TheoryQuestion", "id", id));
        return toDetail(question, false);
    }

    @Override
    public QuestionDetailResponse createQuestion(QuestionUpsertRequest request) {
        TheoryTopic topic = null;
        if (request.topicId() != null) {
            topic = topicRepository.findById(request.topicId()).orElse(null);
        }

        TheoryQuestion question = new TheoryQuestion(
                request.categoryCode(),
                request.questionNumber(),
                request.content(),
                request.imageUrl(),
                request.explanation(),
                request.isParalysis()
        );
        question.setTopic(topic);
        question.setLegalReference(request.legalReference());

        if (request.answers() != null) {
            for (QuestionUpsertRequest.AnswerUpsertItem item : request.answers()) {
                TheoryAnswer answer = new TheoryAnswer(question, item.answerText(), item.isCorrect(), item.orderIndex());
                question.addAnswer(answer);
            }
        }

        question = questionRepository.save(question);
        return toDetail(question, false);
    }

    @Override
    public QuestionDetailResponse updateQuestion(Long id, QuestionUpsertRequest request) {
        TheoryQuestion question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TheoryQuestion", "id", id));

        TheoryTopic topic = null;
        if (request.topicId() != null) {
            topic = topicRepository.findById(request.topicId()).orElse(null);
        }

        question.setCategoryCode(request.categoryCode());
        question.setTopic(topic);
        question.setQuestionNumber(request.questionNumber());
        question.setContent(request.content());
        question.setImageUrl(request.imageUrl());
        question.setExplanation(request.explanation());
        question.setParalysis(request.isParalysis());
        question.setLegalReference(request.legalReference());

        // Update answers
        question.getAnswers().clear();
        if (request.answers() != null) {
            for (QuestionUpsertRequest.AnswerUpsertItem item : request.answers()) {
                TheoryAnswer answer = new TheoryAnswer(question, item.answerText(), item.isCorrect(), item.orderIndex());
                question.addAnswer(answer);
            }
        }

        question = questionRepository.save(question);
        return toDetail(question, false);
    }

    @Override
    public void deleteQuestion(Long id) {
        if (!questionRepository.existsById(id)) {
            throw new ResourceNotFoundException("TheoryQuestion", "id", id);
        }
        questionRepository.deleteById(id);
    }

    private QuestionDetailResponse toDetail(TheoryQuestion q, boolean isBookmarked) {
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
                isBookmarked,
                answers
        );
    }
}
