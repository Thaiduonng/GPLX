package vn.edu.gplx.modules.training.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.training.domain.DatPracticeSession;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface DatPracticeSessionRepository extends JpaRepository<DatPracticeSession, Long> {

    List<DatPracticeSession> findByUserIdOrderByStartTimeDesc(Long userId);

    @Query("SELECT COALESCE(SUM(s.distanceKm), 0) FROM DatPracticeSession s WHERE s.userId = :userId AND s.status = 'VERIFIED'")
    BigDecimal calculateTotalDistanceByUserId(@Param("userId") Long userId);

    @Query("SELECT COALESCE(SUM(s.durationMinutes), 0) FROM DatPracticeSession s WHERE s.userId = :userId AND s.status = 'VERIFIED'")
    Integer calculateTotalDurationMinutesByUserId(@Param("userId") Long userId);
}
