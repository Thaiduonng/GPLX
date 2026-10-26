package vn.edu.gplx.modules.learning.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import vn.edu.gplx.shared.domain.BaseEntity;

@Entity
@Table(name = "bookmarked_questions")
public class BookmarkedQuestion extends BaseEntity {

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private TheoryQuestion question;

    @Column(name = "note", length = 500)
    private String note;

    public BookmarkedQuestion() {
    }

    public BookmarkedQuestion(Long userId, TheoryQuestion question, String note) {
        this.userId = userId;
        this.question = question;
        this.note = note;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public TheoryQuestion getQuestion() {
        return question;
    }

    public void setQuestion(TheoryQuestion question) {
        this.question = question;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
