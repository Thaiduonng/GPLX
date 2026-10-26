package vn.edu.gplx.modules.learning.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import vn.edu.gplx.shared.domain.BaseEntity;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

/**
 * Quản lý trạng thái ghi nhớ, mức độ nắm vững và chu kỳ lặp lại ngắt quãng (Spaced Repetition / Leitner System)
 * cho từng câu hỏi đối với từng học viên.
 */
@Entity
@Table(name = "question_retention_states")
public class QuestionRetentionState extends BaseEntity {

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private TheoryQuestion question;

    @Column(name = "box_level", nullable = false)
    private int boxLevel = 1; // Hộp 1..5

    @Column(name = "consecutive_correct", nullable = false)
    private int consecutiveCorrect = 0;

    @Column(name = "total_attempts", nullable = false)
    private int totalAttempts = 0;

    @Column(name = "correct_attempts", nullable = false)
    private int correctAttempts = 0;

    @Column(name = "incorrect_attempts", nullable = false)
    private int incorrectAttempts = 0;

    @Column(name = "last_reviewed_at")
    private Instant lastReviewedAt;

    @Column(name = "next_review_at")
    private Instant nextReviewAt;

    @Column(name = "interval_days", nullable = false)
    private int intervalDays = 1;

    @Column(name = "ease_factor", nullable = false)
    private double easeFactor = 2.5;

    @Column(name = "mastery_status", nullable = false, length = 30)
    private String masteryStatus = "NEEDS_PRACTICE"; // NEEDS_PRACTICE, REVIEWING, MASTERED

    @Column(name = "priority_score", nullable = false)
    private double priorityScore = 0.0;

    public QuestionRetentionState() {
    }

    public QuestionRetentionState(Long userId, TheoryQuestion question) {
        this.userId = userId;
        this.question = question;
        this.boxLevel = 1;
        this.intervalDays = 1;
        this.easeFactor = 2.5;
        this.masteryStatus = "NEEDS_PRACTICE";
        this.nextReviewAt = Instant.now();
        calculatePriorityScore();
    }

    /**
     * Cập nhật trạng thái sau một lần trả lời theo thuật toán Spaced Repetition cải tiến
     */
    public void recordAttempt(boolean isCorrect) {
        Instant now = Instant.now();
        this.lastReviewedAt = now;
        this.totalAttempts++;

        if (isCorrect) {
            this.correctAttempts++;
            this.consecutiveCorrect++;

            // Nâng hộp Leitner (tối đa hộp 5)
            if (this.boxLevel < 5) {
                this.boxLevel++;
            }

            // Tính chu kỳ ngày ngắt quãng theo hộp
            switch (this.boxLevel) {
                case 1 -> this.intervalDays = 1;
                case 2 -> this.intervalDays = 3;
                case 3 -> this.intervalDays = 7;
                case 4 -> this.intervalDays = 14;
                case 5 -> this.intervalDays = 30;
                default -> this.intervalDays = Math.max(1, (int) Math.round(this.intervalDays * this.easeFactor));
            }

            // Tăng nhẹ hệ số ease nếu trả lời đúng liên tục
            this.easeFactor = Math.min(3.0, this.easeFactor + 0.1);

            // Cập nhật mức độ thành thạo: Cần đạt box 4 trở lên và đúng liên tiếp >= 3 lần
            if (this.boxLevel >= 4 && this.consecutiveCorrect >= 3) {
                this.masteryStatus = "MASTERED";
            } else {
                this.masteryStatus = "REVIEWING";
            }
        } else {
            this.incorrectAttempts++;
            this.consecutiveCorrect = 0;

            // Rớt về hộp 1 khi trả lời sai (nguyên lý củng cố triệt để)
            this.boxLevel = 1;
            this.intervalDays = 1;
            this.easeFactor = Math.max(1.3, this.easeFactor - 0.2);
            this.masteryStatus = "NEEDS_PRACTICE";
        }

        this.nextReviewAt = now.plus(this.intervalDays, ChronoUnit.DAYS);
        calculatePriorityScore();
    }

    /**
     * Thuật toán tính điểm ưu tiên thông minh (Priority Score) cho hàng đợi ôn tập:
     * - Câu điểm liệt (Paralysis): +35 điểm
     * - Trả lời sai (Incorrect attempts): +10 điểm mỗi lần sai (tối đa 40 điểm)
     * - Tỷ lệ sai cao: +15 điểm
     * - Quá hạn ôn tập (Overdue): +20 điểm
     * - Đang ở hộp 1 hoặc 2 (kém ghi nhớ): +15 điểm
     */
    public void calculatePriorityScore() {
        double score = 0.0;

        if (question != null && question.isParalysis()) {
            score += 35.0;
        }

        score += Math.min(40.0, this.incorrectAttempts * 10.0);

        if (this.totalAttempts > 0) {
            double errorRate = (double) this.incorrectAttempts / this.totalAttempts;
            score += errorRate * 20.0;
        }

        if (this.nextReviewAt != null && this.nextReviewAt.isBefore(Instant.now())) {
            score += 20.0;
        }

        if (this.boxLevel <= 2) {
            score += (3 - this.boxLevel) * 7.5;
        }

        this.priorityScore = Math.round(score * 100.0) / 100.0;
    }

    // Getters and Setters

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

    public int getBoxLevel() {
        return boxLevel;
    }

    public void setBoxLevel(int boxLevel) {
        this.boxLevel = boxLevel;
    }

    public int getConsecutiveCorrect() {
        return consecutiveCorrect;
    }

    public void setConsecutiveCorrect(int consecutiveCorrect) {
        this.consecutiveCorrect = consecutiveCorrect;
    }

    public int getTotalAttempts() {
        return totalAttempts;
    }

    public void setTotalAttempts(int totalAttempts) {
        this.totalAttempts = totalAttempts;
    }

    public int getCorrectAttempts() {
        return correctAttempts;
    }

    public void setCorrectAttempts(int correctAttempts) {
        this.correctAttempts = correctAttempts;
    }

    public int getIncorrectAttempts() {
        return incorrectAttempts;
    }

    public void setIncorrectAttempts(int incorrectAttempts) {
        this.incorrectAttempts = incorrectAttempts;
    }

    public Instant getLastReviewedAt() {
        return lastReviewedAt;
    }

    public void setLastReviewedAt(Instant lastReviewedAt) {
        this.lastReviewedAt = lastReviewedAt;
    }

    public Instant getNextReviewAt() {
        return nextReviewAt;
    }

    public void setNextReviewAt(Instant nextReviewAt) {
        this.nextReviewAt = nextReviewAt;
    }

    public int getIntervalDays() {
        return intervalDays;
    }

    public void setIntervalDays(int intervalDays) {
        this.intervalDays = intervalDays;
    }

    public double getEaseFactor() {
        return easeFactor;
    }

    public void setEaseFactor(double easeFactor) {
        this.easeFactor = easeFactor;
    }

    public String getMasteryStatus() {
        return masteryStatus;
    }

    public void setMasteryStatus(String masteryStatus) {
        this.masteryStatus = masteryStatus;
    }

    public double getPriorityScore() {
        return priorityScore;
    }

    public void setPriorityScore(double priorityScore) {
        this.priorityScore = priorityScore;
    }
}
