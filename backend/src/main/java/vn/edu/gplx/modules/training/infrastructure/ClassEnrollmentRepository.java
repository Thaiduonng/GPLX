package vn.edu.gplx.modules.training.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.training.domain.ClassEnrollment;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClassEnrollmentRepository extends JpaRepository<ClassEnrollment, Long> {

    Optional<ClassEnrollment> findByTrainingClassIdAndUserId(Long classId, Long userId);

    List<ClassEnrollment> findByUserId(Long userId);

    List<ClassEnrollment> findByTrainingClassId(Long classId);

    boolean existsByTrainingClassIdAndUserId(Long classId, Long userId);
}
