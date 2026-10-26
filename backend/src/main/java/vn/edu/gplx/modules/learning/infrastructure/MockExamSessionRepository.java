package vn.edu.gplx.modules.learning.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.learning.domain.MockExamSession;

import java.util.List;
import java.util.Optional;

@Repository
public interface MockExamSessionRepository extends JpaRepository<MockExamSession, Long> {
    Optional<MockExamSession> findBySessionCode(String sessionCode);
    List<MockExamSession> findByUserIdOrderByStartedAtDesc(Long userId);

    long countByUserId(Long userId);
    long countByUserIdAndPassedTrue(Long userId);

    @Query("SELECT COUNT(m) FROM MockExamSession m WHERE m.userId = :userId AND m.status = 'COMPLETED'")
    long countCompletedByUserId(@Param("userId") Long userId);
}
