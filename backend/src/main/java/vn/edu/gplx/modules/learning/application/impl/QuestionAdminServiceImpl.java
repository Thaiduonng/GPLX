package vn.edu.gplx.modules.learning.application.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.learning.api.dto.QuestionDetailResponse;
import vn.edu.gplx.modules.learning.api.dto.QuestionImportResultResponse;
import vn.edu.gplx.modules.learning.api.dto.QuestionUpsertRequest;
import vn.edu.gplx.modules.learning.api.dto.StudyAnswerOptionResponse;
import vn.edu.gplx.modules.learning.application.QuestionAdminService;
import vn.edu.gplx.modules.learning.domain.TheoryAnswer;
import vn.edu.gplx.modules.learning.domain.TheoryQuestion;
import vn.edu.gplx.modules.learning.domain.TheoryTopic;
import vn.edu.gplx.modules.learning.infrastructure.TheoryQuestionRepository;
import vn.edu.gplx.modules.learning.infrastructure.TheoryTopicRepository;
import vn.edu.gplx.shared.exception.BadRequestException;
import vn.edu.gplx.shared.exception.ResourceNotFoundException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class QuestionAdminServiceImpl implements QuestionAdminService {

    private static final Logger log = LoggerFactory.getLogger(QuestionAdminServiceImpl.class);

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
        validateQuestionRequest(request);

        TheoryTopic topic = resolveTopic(request.topicId(), request.questionNumber());

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
        validateQuestionRequest(request);

        TheoryQuestion question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TheoryQuestion", "id", id));

        TheoryTopic topic = resolveTopic(request.topicId(), request.questionNumber());

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

    @Override
    public QuestionImportResultResponse importQuestions(List<QuestionUpsertRequest> requests) {
        if (requests == null || requests.isEmpty()) {
            return new QuestionImportResultResponse(0, 0, 0, List.of("Danh sách câu hỏi nhập trống."));
        }

        int success = 0;
        int failed = 0;
        List<String> errors = new ArrayList<>();

        for (int i = 0; i < requests.size(); i++) {
            QuestionUpsertRequest req = requests.get(i);
            try {
                validateQuestionRequest(req);
                TheoryTopic topic = resolveTopic(req.topicId(), req.questionNumber());

                // Kiểm tra xem câu hỏi đã tồn tại theo questionNumber chưa
                Optional<TheoryQuestion> existingOpt = questionRepository.findByQuestionNumber(req.questionNumber());
                TheoryQuestion question;

                if (existingOpt.isPresent()) {
                    question = existingOpt.get();
                    question.setCategoryCode(req.categoryCode());
                    question.setContent(req.content());
                    question.setImageUrl(req.imageUrl());
                    question.setExplanation(req.explanation());
                    question.setParalysis(req.isParalysis());
                    question.setLegalReference(req.legalReference());
                    question.setTopic(topic);
                    question.getAnswers().clear();
                } else {
                    question = new TheoryQuestion(
                            req.categoryCode(),
                            req.questionNumber(),
                            req.content(),
                            req.imageUrl(),
                            req.explanation(),
                            req.isParalysis()
                    );
                    question.setTopic(topic);
                    question.setLegalReference(req.legalReference());
                }

                if (req.answers() != null) {
                    for (QuestionUpsertRequest.AnswerUpsertItem item : req.answers()) {
                        TheoryAnswer answer = new TheoryAnswer(question, item.answerText(), item.isCorrect(), item.orderIndex());
                        question.addAnswer(answer);
                    }
                }

                questionRepository.save(question);
                success++;
            } catch (Exception ex) {
                failed++;
                String err = String.format("Câu hỏi số %d (thứ tự %d): %s", req.questionNumber(), i + 1, ex.getMessage());
                errors.add(err);
                log.warn("Lỗi khi import câu hỏi: {}", err);
            }
        }

        return new QuestionImportResultResponse(requests.size(), success, failed, errors);
    }

    @Override
    @Transactional(readOnly = true)
    public List<QuestionDetailResponse> exportQuestions(Long topicId, String categoryCode) {
        List<TheoryQuestion> list;
        if (topicId != null) {
            list = questionRepository.findByTopicIdOrderByQuestionNumberAsc(topicId);
        } else if (categoryCode != null && !categoryCode.isBlank()) {
            list = questionRepository.findForLicenseCategory(categoryCode);
        } else {
            list = questionRepository.findAll();
        }

        return list.stream().map(q -> toDetail(q, false)).toList();
    }

    private void validateQuestionRequest(QuestionUpsertRequest request) {
        if (request.content() == null || request.content().isBlank()) {
            throw new BadRequestException("Nội dung câu hỏi không được để trống.");
        }
        if (request.answers() == null || request.answers().size() < 2) {
            throw new BadRequestException("Câu hỏi phải có ít nhất 2 phương án trả lời.");
        }
        long correctCount = request.answers().stream().filter(QuestionUpsertRequest.AnswerUpsertItem::isCorrect).count();
        if (correctCount != 1) {
            throw new BadRequestException("Mỗi câu hỏi sát hạch lý thuyết bắt buộc phải có duy nhất 1 đáp án đúng (hiện tại có " + correctCount + ").");
        }
    }

    private TheoryTopic resolveTopic(Long topicId, int questionNumber) {
        if (topicId != null) {
            return topicRepository.findById(topicId).orElse(null);
        }

        // Tự động suy diễn chủ đề theo dải câu hỏi chuẩn Tổng cục ĐBVN 600 câu:
        // 1-166: CH1_RULES
        // 167-196: CH2_TRANSPORT
        // 197-217: CH3_CULTURE
        // 218-273: CH4_TECHNIQUES
        // 274-308: CH5_REPAIR
        // 309-486: CH6_SIGNS
        // 487-600: CH7_SCENARIOS
        String code;
        if (questionNumber <= 166) code = "CH1_RULES";
        else if (questionNumber <= 196) code = "CH2_TRANSPORT";
        else if (questionNumber <= 217) code = "CH3_CULTURE";
        else if (questionNumber <= 273) code = "CH4_TECHNIQUES";
        else if (questionNumber <= 308) code = "CH5_REPAIR";
        else if (questionNumber <= 486) code = "CH6_SIGNS";
        else code = "CH7_SCENARIOS";

        return topicRepository.findByCode(code).orElse(null);
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
