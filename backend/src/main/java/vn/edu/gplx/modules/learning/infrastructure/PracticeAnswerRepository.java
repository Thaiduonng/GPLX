package vn.edu.gplx.modules.learning.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.learning.domain.PracticeAnswer;

import java.util.List;

@Repository
public interface PracticeAnswerRepository extends JpaRepository<PracticeAnswer, Long> {
    List<PracticeAnswer> findBySessionId(Long sessionId);

    @Query("SELECT DISTINCT pa.question.id FROM PracticeAnswer pa WHERE pa.session.userId = :userId AND pa.correct = false")
    List<Long> findIncorrectQuestionIdsByUserId(@Param("userId") Long userId);

    @Query("SELECT DISTINCT pa.question.id FROM PracticeAnswer pa WHERE pa.session.userId = :userId")
    List<Long> findAnsweredQuestionIdsByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(pa) FROM PracticeAnswer pa WHERE pa.session.userId = :userId")
    long countTotalAnswersByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(pa) FROM PracticeAnswer pa WHERE pa.session.userId = :userId AND pa.correct = true")
    long countCorrectAnswersByUserId(@Param("userId") Long userId);
}
