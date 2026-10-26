package vn.edu.gplx.modules.learning.application.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.learning.api.dto.QuestionDetailResponse;
import vn.edu.gplx.modules.learning.api.dto.StudyAnswerOptionResponse;
import vn.edu.gplx.modules.learning.application.TheoryBookmarkService;
import vn.edu.gplx.modules.learning.domain.BookmarkedQuestion;
import vn.edu.gplx.modules.learning.domain.TheoryQuestion;
import vn.edu.gplx.modules.learning.infrastructure.BookmarkedQuestionRepository;
import vn.edu.gplx.modules.learning.infrastructure.TheoryQuestionRepository;
import vn.edu.gplx.shared.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TheoryBookmarkServiceImpl implements TheoryBookmarkService {

    private final BookmarkedQuestionRepository bookmarkRepository;
    private final TheoryQuestionRepository questionRepository;

    public TheoryBookmarkServiceImpl(BookmarkedQuestionRepository bookmarkRepository, TheoryQuestionRepository questionRepository) {
        this.bookmarkRepository = bookmarkRepository;
        this.questionRepository = questionRepository;
    }

    @Override
    public void addBookmark(Long userId, Long questionId, String note) {
        if (bookmarkRepository.existsByUserIdAndQuestionId(userId, questionId)) {
            return;
        }
        TheoryQuestion question = questionRepository.findById(questionId)
                .orElseThrow(() -> new ResourceNotFoundException("TheoryQuestion", "id", questionId));
        BookmarkedQuestion bookmark = new BookmarkedQuestion(userId, question, note);
        bookmarkRepository.save(bookmark);
    }

    @Override
    public void removeBookmark(Long userId, Long questionId) {
        bookmarkRepository.deleteByUserIdAndQuestionId(userId, questionId);
    }

    @Override
    public boolean toggleBookmark(Long userId, Long questionId) {
        Optional<BookmarkedQuestion> existing = bookmarkRepository.findByUserIdAndQuestionId(userId, questionId);
        if (existing.isPresent()) {
            bookmarkRepository.delete(existing.get());
            return false;
        } else {
            TheoryQuestion question = questionRepository.findById(questionId)
                    .orElseThrow(() -> new ResourceNotFoundException("TheoryQuestion", "id", questionId));
            bookmarkRepository.save(new BookmarkedQuestion(userId, question, null));
            return true;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<QuestionDetailResponse> getBookmarkedQuestions(Long userId) {
        List<BookmarkedQuestion> bookmarks = bookmarkRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return bookmarks.stream().map(b -> {
            TheoryQuestion q = b.getQuestion();
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
                    true,
                    answers
            );
        }).toList();
    }
}
