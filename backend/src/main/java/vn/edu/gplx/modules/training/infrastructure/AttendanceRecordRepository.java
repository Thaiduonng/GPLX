package vn.edu.gplx.modules.training.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.training.domain.AttendanceRecord;

import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRecordRepository extends JpaRepository<AttendanceRecord, Long> {

    Optional<AttendanceRecord> findByScheduleIdAndUserId(Long scheduleId, Long userId);

    List<AttendanceRecord> findByScheduleId(Long scheduleId);

    List<AttendanceRecord> findByUserId(Long userId);
}
