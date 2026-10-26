package vn.edu.gplx.modules.learning.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import vn.edu.gplx.shared.domain.BaseEntity;

@Entity
@Table(name = "theory_topics")
public class TheoryTopic extends BaseEntity {

    @Column(name = "code", nullable = false, unique = true, length = 50)
    private String code;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "order_index", nullable = false)
    private int orderIndex = 1;

    @Column(name = "total_questions", nullable = false)
    private int totalQuestions = 0;

    @Column(name = "paralysis_questions", nullable = false)
    private int paralysisQuestions = 0;

    public TheoryTopic() {
    }

    public TheoryTopic(String code, String name, String description, int orderIndex, int totalQuestions, int paralysisQuestions) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.orderIndex = orderIndex;
        this.totalQuestions = totalQuestions;
        this.paralysisQuestions = paralysisQuestions;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(int orderIndex) {
        this.orderIndex = orderIndex;
    }

    public int getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(int totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public int getParalysisQuestions() {
        return paralysisQuestions;
    }

    public void setParalysisQuestions(int paralysisQuestions) {
        this.paralysisQuestions = paralysisQuestions;
    }
}
