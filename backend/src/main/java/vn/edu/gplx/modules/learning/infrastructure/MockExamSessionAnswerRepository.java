package vn.edu.gplx.modules.learning.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.learning.domain.MockExamSessionAnswer;

import java.util.List;

@Repository
public interface MockExamSessionAnswerRepository extends JpaRepository<MockExamSessionAnswer, Long> {
    List<MockExamSessionAnswer> findByMockExamIdOrderByOrderIndexAsc(Long mockExamId);
}
