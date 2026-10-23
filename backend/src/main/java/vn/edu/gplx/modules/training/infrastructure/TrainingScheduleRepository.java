package vn.edu.gplx.modules.training.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.training.domain.TrainingSchedule;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TrainingScheduleRepository extends JpaRepository<TrainingSchedule, Long> {

    List<TrainingSchedule> findByTrainingClassIdOrderByStartTimeAsc(Long classId);

    List<TrainingSchedule> findByInstructorIdOrderByStartTimeAsc(Long instructorId);

    @Query("SELECT s FROM TrainingSchedule s WHERE s.instructorId = :instructorId " +
           "AND s.startTime < :endTime AND s.endTime > :startTime")
    List<TrainingSchedule> findConflictingInstructorSchedules(
            @Param("instructorId") Long instructorId,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime
    );
}
