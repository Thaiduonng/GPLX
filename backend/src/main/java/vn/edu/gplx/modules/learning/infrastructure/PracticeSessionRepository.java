package vn.edu.gplx.modules.learning.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.learning.domain.PracticeSession;

import java.util.List;
import java.util.Optional;

@Repository
public interface PracticeSessionRepository extends JpaRepository<PracticeSession, Long> {
    Optional<PracticeSession> findBySessionCode(String sessionCode);
    List<PracticeSession> findByUserIdOrderByCreatedAtDesc(Long userId);
    long countByUserId(Long userId);
}
