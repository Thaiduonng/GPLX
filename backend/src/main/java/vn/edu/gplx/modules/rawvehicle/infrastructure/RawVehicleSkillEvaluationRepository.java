package vn.edu.gplx.modules.rawvehicle.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.rawvehicle.domain.RawVehicleSkillEvaluation;

import java.util.List;
import java.util.Optional;

@Repository
public interface RawVehicleSkillEvaluationRepository extends JpaRepository<RawVehicleSkillEvaluation, Long> {

    List<RawVehicleSkillEvaluation> findByEnrollmentId(Long enrollmentId);

    List<RawVehicleSkillEvaluation> findByStudentId(Long studentId);

    Optional<RawVehicleSkillEvaluation> findByEnrollmentIdAndCriterionCode(Long enrollmentId, String criterionCode);

    @Query("SELECT e FROM RawVehicleSkillEvaluation e " +
           "JOIN FETCH e.stage st " +
           "JOIN FETCH e.evaluatedBy ins " +
           "WHERE e.enrollment.id = :enrollmentId " +
           "ORDER BY st.stepOrder ASC, e.id ASC")
    List<RawVehicleSkillEvaluation> findEnrollmentEvaluationsWithDetails(@Param("enrollmentId") Long enrollmentId);
}
