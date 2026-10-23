package vn.edu.gplx.modules.examination.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.examination.domain.ExamSession;
import vn.edu.gplx.modules.examination.domain.ExamSessionStatus;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExamSessionRepository extends JpaRepository<ExamSession, Long> {

    Optional<ExamSession> findByExamCode(String examCode);

    List<ExamSession> findByStatus(ExamSessionStatus status);

    List<ExamSession> findByCategoryId(Long categoryId);
}
