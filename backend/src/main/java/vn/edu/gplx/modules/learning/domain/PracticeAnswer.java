package vn.edu.gplx.modules.learning.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import vn.edu.gplx.shared.domain.BaseEntity;

import java.time.Instant;

@Entity
@Table(name = "practice_answers")
public class PracticeAnswer extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    private PracticeSession session;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private TheoryQuestion question;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "selected_answer_id")
    private TheoryAnswer selectedAnswer;

    @Column(name = "is_correct", nullable = false)
    private boolean correct = false;

    @Column(name = "answered_at", nullable = false)
    private Instant answeredAt = Instant.now();

    public PracticeAnswer() {
    }

    public PracticeAnswer(PracticeSession session, TheoryQuestion question, TheoryAnswer selectedAnswer, boolean correct) {
        this.session = session;
        this.question = question;
        this.selectedAnswer = selectedAnswer;
        this.correct = correct;
        this.answeredAt = Instant.now();
    }

    public PracticeSession getSession() {
        return session;
    }

    public void setSession(PracticeSession session) {
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

    public Instant getAnsweredAt() {
        return answeredAt;
    }

    public void setAnsweredAt(Instant answeredAt) {
        this.answeredAt = answeredAt;
    }
}
