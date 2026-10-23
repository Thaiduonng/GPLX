package vn.edu.gplx.modules.examination.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.examination.domain.ExamResult;
import vn.edu.gplx.modules.examination.domain.FinalExamResult;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {

    Optional<ExamResult> findByCandidateId(Long candidateId);

    List<ExamResult> findByFinalResult(FinalExamResult finalResult);
}
