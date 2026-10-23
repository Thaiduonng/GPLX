package vn.edu.gplx.modules.training.application.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.training.api.dto.DatSessionResponse;
import vn.edu.gplx.modules.training.api.dto.DatSummaryResponse;
import vn.edu.gplx.modules.training.api.dto.LogDatSessionRequest;
import vn.edu.gplx.modules.training.application.DatPracticeService;
import vn.edu.gplx.modules.training.domain.DatPracticeSession;
import vn.edu.gplx.modules.training.infrastructure.DatPracticeSessionRepository;

import java.math.BigDecimal;
import java.util.List;

@Service
@Transactional
public class DatPracticeServiceImpl implements DatPracticeService {

    private static final Logger log = LoggerFactory.getLogger(DatPracticeServiceImpl.class);

    // Chuẩn thực hành đường trường DAT (ví dụ hạng B1/B: tối thiểu 810 km và 20 giờ = 1200 phút)
    private static final BigDecimal TARGET_DISTANCE_KM = BigDecimal.valueOf(810.0);
    private static final int TARGET_DURATION_MINUTES = 1200;

    private final DatPracticeSessionRepository datRepository;

    public DatPracticeServiceImpl(DatPracticeSessionRepository datRepository) {
        this.datRepository = datRepository;
    }

    @Override
    public DatSessionResponse logPracticeSession(Long instructorId, LogDatSessionRequest request) {
        DatPracticeSession session = new DatPracticeSession(
                request.studentId(),
                instructorId,
                request.sessionType(),
                request.startTime(),
                request.endTime(),
                request.distanceKm(),
                request.durationMinutes(),
                request.deviceId(),
                request.note()
        );

        DatPracticeSession saved = datRepository.save(session);
        log.info("Logged DAT session for student {} by instructor {}: distance={}km, duration={}min",
                request.studentId(), instructorId, request.distanceKm(), request.durationMinutes());

        return toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public DatSummaryResponse getStudentDatSummary(Long studentId) {
        List<DatPracticeSession> sessions = datRepository.findByUserIdOrderByStartTimeDesc(studentId);
        BigDecimal totalDistance = datRepository.calculateTotalDistanceByUserId(studentId);
        int totalDuration = datRepository.calculateTotalDurationMinutesByUserId(studentId);

        boolean isCompleted = totalDistance.compareTo(TARGET_DISTANCE_KM) >= 0 && totalDuration >= TARGET_DURATION_MINUTES;

        List<DatSessionResponse> sessionResponses = sessions.stream()
                .map(this::toResponse)
                .toList();

        return new DatSummaryResponse(
                studentId,
                totalDistance,
                totalDuration,
                sessions.size(),
                TARGET_DISTANCE_KM,
                TARGET_DURATION_MINUTES,
                isCompleted,
                sessionResponses
        );
    }

    private DatSessionResponse toResponse(DatPracticeSession s) {
        return new DatSessionResponse(
                s.getId(),
                s.getUserId(),
                s.getInstructorId(),
                s.getSessionType(),
                s.getStartTime(),
                s.getEndTime(),
                s.getDistanceKm(),
                s.getDurationMinutes(),
                s.getStatus(),
                s.getDeviceId(),
                s.getNote(),
                s.getCreatedAt()
        );
    }
}
