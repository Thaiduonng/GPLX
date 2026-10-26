package vn.edu.gplx.modules.learning.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import vn.edu.gplx.shared.domain.BaseEntity;

/**
 * Chi tiết kết quả trả lời từng câu trong phiên ôn tập
 */
@Entity
@Table(name = "review_session_answers")
public class ReviewSessionAnswer extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    private ReviewSession session;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private TheoryQuestion question;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "selected_answer_id")
    private TheoryAnswer selectedAnswer;

    @Column(name = "is_correct", nullable = false)
    private boolean correct = false;

    @Column(name = "order_index", nullable = false)
    private int orderIndex = 1;

    public ReviewSessionAnswer() {
    }

    public ReviewSessionAnswer(ReviewSession session, TheoryQuestion question, TheoryAnswer selectedAnswer, boolean correct, int orderIndex) {
        this.session = session;
        this.question = question;
        this.selectedAnswer = selectedAnswer;
        this.correct = correct;
        this.orderIndex = orderIndex;
    }

    public ReviewSession getSession() {
        return session;
    }

    public void setSession(ReviewSession session) {
        this.session = session;
    }

    public TheoryQuestion getQuestion() {
        return question;
    }

    public void setQuestion(TheoryQuestion question) {
        this.question = question;
    }

    public TheoryAnswer getSelectedAnswer() {
        return selectedAnswer;
    }

    public void setSelectedAnswer(TheoryAnswer selectedAnswer) {
        this.selectedAnswer = selectedAnswer;
    }

    public boolean isCorrect() {
        return correct;
    }

    public void setCorrect(boolean correct) {
        this.correct = correct;
    }

    public int getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(int orderIndex) {
        this.orderIndex = orderIndex;
    }
}
