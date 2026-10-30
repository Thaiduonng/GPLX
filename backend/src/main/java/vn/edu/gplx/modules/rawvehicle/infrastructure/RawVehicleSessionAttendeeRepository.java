package vn.edu.gplx.modules.rawvehicle.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.rawvehicle.domain.RawVehicleSessionAttendee;

import java.util.List;
import java.util.Optional;

@Repository
public interface RawVehicleSessionAttendeeRepository extends JpaRepository<RawVehicleSessionAttendee, Long> {

    List<RawVehicleSessionAttendee> findBySessionId(Long sessionId);

    List<RawVehicleSessionAttendee> findByStudentId(Long studentId);

    List<RawVehicleSessionAttendee> findByEnrollmentId(Long enrollmentId);

    Optional<RawVehicleSessionAttendee> findBySessionIdAndStudentId(Long sessionId, Long studentId);

    @Query("SELECT a FROM RawVehicleSessionAttendee a " +
           "JOIN FETCH a.session s " +
           "JOIN FETCH s.instructor i " +
           "JOIN FETCH s.vehicle v " +
           "LEFT JOIN FETCH s.stage st " +
           "WHERE a.student.id = :studentId " +
           "ORDER BY s.scheduledStartTime DESC")
    List<RawVehicleSessionAttendee> findStudentSessionsWithDetails(@Param("studentId") Long studentId);

    @Query("SELECT a FROM RawVehicleSessionAttendee a " +
           "JOIN FETCH a.student st " +
           "JOIN FETCH a.enrollment e " +
           "WHERE a.session.id = :sessionId")
    List<RawVehicleSessionAttendee> findSessionAttendeesWithDetails(@Param("sessionId") Long sessionId);
}
