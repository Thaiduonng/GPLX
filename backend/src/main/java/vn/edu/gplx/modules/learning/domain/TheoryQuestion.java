package vn.edu.gplx.modules.learning.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import vn.edu.gplx.shared.domain.BaseEntity;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "theory_questions")
public class TheoryQuestion extends BaseEntity {

    @Column(name = "category_code", nullable = false, length = 20)
    private String categoryCode;

    @Column(name = "question_number", nullable = false)
    private int questionNumber;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    @Column(name = "explanation", columnDefinition = "TEXT")
    private String explanation;

    @Column(name = "is_paralysis", nullable = false)
    private boolean isParalysis = false; // Câu hỏi điểm liệt

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("orderIndex ASC")
    private List<TheoryAnswer> answers = new ArrayList<>();

    public TheoryQuestion() {
    }

    public TheoryQuestion(String categoryCode, int questionNumber, String content, String imageUrl, String explanation, boolean isParalysis) {
        this.categoryCode = categoryCode;
        this.questionNumber = questionNumber;
        this.content = content;
        this.imageUrl = imageUrl;
        this.explanation = explanation;
        this.isParalysis = isParalysis;
    }

    public String getCategoryCode() {
        return categoryCode;
    }

    public void setCategoryCode(String categoryCode) {
        this.categoryCode = categoryCode;
    }

    public int getQuestionNumber() {
        return questionNumber;
    }

    public void setQuestionNumber(int questionNumber) {
        this.questionNumber = questionNumber;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public boolean isParalysis() {
        return isParalysis;
    }

    public void setParalysis(boolean paralysis) {
        isParalysis = paralysis;
    }

    public List<TheoryAnswer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<TheoryAnswer> answers) {
        this.answers = answers;
    }

    public void addAnswer(TheoryAnswer answer) {
        answers.add(answer);
        answer.setQuestion(this);
    }
}
