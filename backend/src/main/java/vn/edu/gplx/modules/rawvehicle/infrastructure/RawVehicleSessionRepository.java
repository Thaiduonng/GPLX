package vn.edu.gplx.modules.rawvehicle.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.rawvehicle.domain.RawVehicleSession;
import vn.edu.gplx.modules.rawvehicle.domain.RawVehicleSessionStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface RawVehicleSessionRepository extends JpaRepository<RawVehicleSession, Long> {

    Optional<RawVehicleSession> findBySessionCode(String sessionCode);

    List<RawVehicleSession> findByInstructorIdOrderByScheduledStartTimeDesc(Long instructorId);

    List<RawVehicleSession> findByVehicleId(Long vehicleId);

    List<RawVehicleSession> findByStatus(RawVehicleSessionStatus status);

    @Query("SELECT s FROM RawVehicleSession s JOIN FETCH s.instructor i JOIN FETCH s.vehicle v LEFT JOIN FETCH s.stage st ORDER BY s.scheduledStartTime DESC")
    List<RawVehicleSession> findAllWithDetails();

    @Query("SELECT s FROM RawVehicleSession s JOIN FETCH s.instructor i JOIN FETCH s.vehicle v LEFT JOIN FETCH s.stage st WHERE s.instructor.id = :instructorId ORDER BY s.scheduledStartTime DESC")
    List<RawVehicleSession> findInstructorSessionsWithDetails(@Param("instructorId") Long instructorId);

    // Kiểm tra xung đột lịch của giáo viên (không trùng thời gian trừ khi buổi đó bị CANCELLED)
    @Query("SELECT COUNT(s) > 0 FROM RawVehicleSession s " +
           "WHERE s.instructor.id = :instructorId " +
           "AND s.status <> 'CANCELLED' " +
           "AND (:excludeSessionId IS NULL OR s.id <> :excludeSessionId) " +
           "AND s.scheduledStartTime < :endTime AND s.scheduledEndTime > :startTime")
    boolean existsOverlappingSessionForInstructor(@Param("instructorId") Long instructorId,
                                                @Param("startTime") LocalDateTime startTime,
                                                @Param("endTime") LocalDateTime endTime,
                                                @Param("excludeSessionId") Long excludeSessionId);

    // Kiểm tra xung đột phương tiện (xe không thể dùng cùng lúc cho 2 buổi)
    @Query("SELECT COUNT(s) > 0 FROM RawVehicleSession s " +
           "WHERE s.vehicle.id = :vehicleId " +
           "AND s.status <> 'CANCELLED' " +
           "AND (:excludeSessionId IS NULL OR s.id <> :excludeSessionId) " +
           "AND s.scheduledStartTime < :endTime AND s.scheduledEndTime > :startTime")
    boolean existsOverlappingSessionForVehicle(@Param("vehicleId") Long vehicleId,
                                             @Param("startTime") LocalDateTime startTime,
                                             @Param("endTime") LocalDateTime endTime,
                                             @Param("excludeSessionId") Long excludeSessionId);
}
