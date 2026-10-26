package vn.edu.gplx.modules.learning.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import vn.edu.gplx.shared.domain.BaseEntity;

@Entity
@Table(name = "mock_exam_session_answers")
public class MockExamSessionAnswer extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mock_exam_id", nullable = false)
    private MockExamSession mockExam;

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

    public MockExamSessionAnswer() {
    }

    public MockExamSessionAnswer(MockExamSession mockExam, TheoryQuestion question, int orderIndex) {
        this.mockExam = mockExam;
        this.question = question;
        this.orderIndex = orderIndex;
        this.correct = false;
    }

    public MockExamSession getMockExam() {
        return mockExam;
    }

    public void setMockExam(MockExamSession mockExam) {
        this.mockExam = mockExam;
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
