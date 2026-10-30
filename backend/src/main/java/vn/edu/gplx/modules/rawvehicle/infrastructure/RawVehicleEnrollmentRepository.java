package vn.edu.gplx.modules.rawvehicle.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.rawvehicle.domain.RawVehicleEnrollment;
import vn.edu.gplx.modules.rawvehicle.domain.RawVehicleEnrollmentStatus;

import java.util.List;
import java.util.Optional;

@Repository
public interface RawVehicleEnrollmentRepository extends JpaRepository<RawVehicleEnrollment, Long> {

    Optional<RawVehicleEnrollment> findByStudentIdAndLicenseCategoryId(Long studentId, Long categoryId);

    List<RawVehicleEnrollment> findByStudentId(Long studentId);

    List<RawVehicleEnrollment> findByInstructorId(Long instructorId);

    List<RawVehicleEnrollment> findByStatus(RawVehicleEnrollmentStatus status);

    @Query("SELECT e FROM RawVehicleEnrollment e JOIN FETCH e.student s JOIN FETCH e.licenseCategory c WHERE s.id = :studentId ORDER BY e.id DESC")
    List<RawVehicleEnrollment> findStudentEnrollmentsWithDetails(@Param("studentId") Long studentId);

    @Query("SELECT e FROM RawVehicleEnrollment e JOIN FETCH e.student s JOIN FETCH e.licenseCategory c WHERE e.instructor.id = :instructorId ORDER BY e.id DESC")
    List<RawVehicleEnrollment> findInstructorEnrollmentsWithDetails(@Param("instructorId") Long instructorId);

    @Query("SELECT e FROM RawVehicleEnrollment e JOIN FETCH e.student s JOIN FETCH e.licenseCategory c ORDER BY e.id DESC")
    List<RawVehicleEnrollment> findAllWithDetails();
}
