package vn.edu.gplx.modules.learning.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.learning.domain.QuestionRetentionState;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRetentionStateRepository extends JpaRepository<QuestionRetentionState, Long> {

    Optional<QuestionRetentionState> findByUserIdAndQuestionId(Long userId, Long questionId);

    List<QuestionRetentionState> findByUserId(Long userId);

    List<QuestionRetentionState> findByUserIdOrderByPriorityScoreDesc(Long userId);

    @Query("SELECT qrs FROM QuestionRetentionState qrs WHERE qrs.userId = :userId AND qrs.nextReviewAt <= :now ORDER BY qrs.priorityScore DESC")
    List<QuestionRetentionState> findDueForReview(@Param("userId") Long userId, @Param("now") Instant now);

    @Query("SELECT qrs FROM QuestionRetentionState qrs WHERE qrs.userId = :userId AND qrs.incorrectAttempts > 0 ORDER BY qrs.incorrectAttempts DESC, qrs.priorityScore DESC")
    List<QuestionRetentionState> findIncorrectQuestions(@Param("userId") Long userId);

    @Query("SELECT qrs FROM QuestionRetentionState qrs WHERE qrs.userId = :userId AND qrs.question.isParalysis = true ORDER BY qrs.priorityScore DESC")
    List<QuestionRetentionState> findParalysisQuestions(@Param("userId") Long userId);

    long countByUserId(Long userId);

    long countByUserIdAndMasteryStatus(Long userId, String masteryStatus);

    @Query("SELECT COUNT(qrs) FROM QuestionRetentionState qrs WHERE qrs.userId = :userId AND qrs.incorrectAttempts > 0 AND qrs.masteryStatus != 'MASTERED'")
    long countUnmasteredWrongQuestions(@Param("userId") Long userId);

    @Query("SELECT COUNT(qrs) FROM QuestionRetentionState qrs WHERE qrs.userId = :userId AND qrs.nextReviewAt <= :now")
    long countDueToday(@Param("userId") Long userId, @Param("now") Instant now);

    @Query("SELECT COUNT(qrs) FROM QuestionRetentionState qrs WHERE qrs.userId = :userId AND qrs.question.isParalysis = true AND qrs.masteryStatus != 'MASTERED'")
    long countParalysisNeedingReview(@Param("userId") Long userId);
}
