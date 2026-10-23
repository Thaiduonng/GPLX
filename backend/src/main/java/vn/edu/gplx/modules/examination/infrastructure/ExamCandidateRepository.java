package vn.edu.gplx.modules.examination.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.examination.domain.ExamCandidate;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExamCandidateRepository extends JpaRepository<ExamCandidate, Long> {

    List<ExamCandidate> findByExamSessionId(Long sessionId);

    List<ExamCandidate> findByUserId(Long userId);

    Optional<ExamCandidate> findByExamSessionIdAndUserId(Long sessionId, Long userId);

    boolean existsByExamSessionIdAndUserId(Long sessionId, Long userId);

    int countByExamSessionId(Long sessionId);
}
