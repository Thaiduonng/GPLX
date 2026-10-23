package vn.edu.gplx.modules.training.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.training.domain.ClassStatus;
import vn.edu.gplx.modules.training.domain.TrainingClass;

import java.util.List;
import java.util.Optional;

@Repository
public interface TrainingClassRepository extends JpaRepository<TrainingClass, Long> {

    Optional<TrainingClass> findByClassCode(String classCode);

    List<TrainingClass> findByStatus(ClassStatus status);

    List<TrainingClass> findByInstructorId(Long instructorId);
}
