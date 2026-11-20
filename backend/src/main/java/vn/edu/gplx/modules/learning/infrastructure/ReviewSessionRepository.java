package vn.edu.gplx.modules.learning.infrastructure;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.learning.domain.ReviewSession;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewSessionRepository extends JpaRepository<ReviewSession, Long> {

    Optional<ReviewSession> findBySessionCode(String sessionCode);

    List<ReviewSession> findByUserIdOrderByCreatedAtDesc(Long userId);

    Page<ReviewSession> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);

    long countByUserId(Long userId);

    long countByUserIdAndStatus(Long userId, String status);

    @Query("SELECT r FROM ReviewSession r WHERE r.userId = :userId AND r.status = 'COMPLETED' ORDER BY r.completedAt DESC")
    List<ReviewSession> findRecentCompletedSessions(@Param("userId") Long userId, Pageable pageable);
}
