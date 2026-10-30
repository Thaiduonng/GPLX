package vn.edu.gplx.modules.rawvehicle.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.rawvehicle.domain.RawVehicleSessionChangeLog;

import java.util.List;

@Repository
public interface RawVehicleSessionChangeLogRepository extends JpaRepository<RawVehicleSessionChangeLog, Long> {

    List<RawVehicleSessionChangeLog> findBySessionIdOrderByCreatedAtDesc(Long sessionId);

    @Query("SELECT l FROM RawVehicleSessionChangeLog l JOIN FETCH l.changedBy u WHERE l.session.id = :sessionId ORDER BY l.createdAt DESC")
    List<RawVehicleSessionChangeLog> findSessionLogsWithUser(@Param("sessionId") Long sessionId);
}
