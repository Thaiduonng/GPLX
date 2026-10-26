package vn.edu.gplx.modules.learning.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.learning.domain.BookmarkedQuestion;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookmarkedQuestionRepository extends JpaRepository<BookmarkedQuestion, Long> {
    List<BookmarkedQuestion> findByUserIdOrderByCreatedAtDesc(Long userId);
    Optional<BookmarkedQuestion> findByUserIdAndQuestionId(Long userId, Long questionId);
    boolean existsByUserIdAndQuestionId(Long userId, Long questionId);
    void deleteByUserIdAndQuestionId(Long userId, Long questionId);
    long countByUserId(Long userId);

    @Query("SELECT b.question.id FROM BookmarkedQuestion b WHERE b.userId = :userId")
    List<Long> findQuestionIdsByUserId(@Param("userId") Long userId);
}
