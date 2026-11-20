package vn.edu.gplx.modules.learning.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.learning.domain.ReviewSessionAnswer;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewSessionAnswerRepository extends JpaRepository<ReviewSessionAnswer, Long> {

    List<ReviewSessionAnswer> findBySessionIdOrderByOrderIndexAsc(Long sessionId);

    Optional<ReviewSessionAnswer> findBySessionIdAndQuestionId(Long sessionId, Long questionId);
}
