package vn.edu.gplx.modules.learning.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.learning.domain.ExamConfiguration;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExamConfigurationRepository extends JpaRepository<ExamConfiguration, Long> {
    Optional<ExamConfiguration> findByCategoryCodeAndActiveTrue(String categoryCode);
    List<ExamConfiguration> findAllByActiveTrue();
}
