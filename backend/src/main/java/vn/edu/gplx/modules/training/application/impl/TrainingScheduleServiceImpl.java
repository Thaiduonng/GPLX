package vn.edu.gplx.modules.training.application.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.training.api.dto.CreateScheduleRequest;
import vn.edu.gplx.modules.training.api.dto.TrainingScheduleResponse;
import vn.edu.gplx.modules.training.application.TrainingScheduleService;
import vn.edu.gplx.modules.training.domain.TrainingClass;
import vn.edu.gplx.modules.training.domain.TrainingSchedule;
import vn.edu.gplx.modules.training.infrastructure.TrainingClassRepository;
import vn.edu.gplx.modules.training.infrastructure.TrainingScheduleRepository;
import vn.edu.gplx.shared.exception.BusinessRuleViolationException;
import vn.edu.gplx.shared.exception.ResourceNotFoundException;

import java.util.List;

@Service
@Transactional
public class TrainingScheduleServiceImpl implements TrainingScheduleService {

    private static final Logger log = LoggerFactory.getLogger(TrainingScheduleServiceImpl.class);

    private final TrainingScheduleRepository scheduleRepository;
    private final TrainingClassRepository classRepository;

    public TrainingScheduleServiceImpl(TrainingScheduleRepository scheduleRepository,
                                       TrainingClassRepository classRepository) {
        this.scheduleRepository = scheduleRepository;
        this.classRepository = classRepository;
    }

    @Override
    public TrainingScheduleResponse createSchedule(CreateScheduleRequest request) {
        TrainingClass trainingClass = classRepository.findById(request.classId())
                .orElseThrow(() -> new ResourceNotFoundException("TrainingClass", "id", request.classId()));

        if (!request.startTime().isBefore(request.endTime())) {
            throw new BusinessRuleViolationException("TRN-006", "Thời gian bắt đầu buổi học phải trước thời gian kết thúc.");
        }

        // Quy tắc TRN-001: Không cho phép phân công lịch học gây xung đột giảng viên
        List<TrainingSchedule> conflicts = scheduleRepository.findConflictingInstructorSchedules(
                request.instructorId(),
                request.startTime(),
                request.endTime()
        );

        if (!conflicts.isEmpty()) {
            TrainingSchedule conflict = conflicts.get(0);
            throw new BusinessRuleViolationException(
                    "TRN-001",
                    String.format("Giảng viên đã có lịch đào tạo trùng lặp trong khung giờ này: '%s' (%s đến %s).",
                            conflict.getTitle(), conflict.getStartTime(), conflict.getEndTime())
            );
        }

        TrainingSchedule schedule = new TrainingSchedule(
                trainingClass,
                request.title(),
                request.scheduleType(),
                request.startTime(),
                request.endTime(),
                request.location(),
                request.instructorId()
        );

        TrainingSchedule saved = scheduleRepository.save(schedule);
        log.info("Schedule {} created for class {} by instructor {}",
                saved.getId(), trainingClass.getClassCode(), request.instructorId());

        return toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TrainingScheduleResponse> getSchedulesByClass(Long classId) {
        return scheduleRepository.findByTrainingClassIdOrderByStartTimeAsc(classId).stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<TrainingScheduleResponse> getSchedulesByInstructor(Long instructorId) {
        return scheduleRepository.findByInstructorIdOrderByStartTimeAsc(instructorId).stream()
                .map(this::toResponse)
                .toList();
    }

    private TrainingScheduleResponse toResponse(TrainingSchedule s) {
        return new TrainingScheduleResponse(
                s.getId(),
                s.getTrainingClass().getId(),
                s.getTrainingClass().getName(),
                s.getTitle(),
                s.getScheduleType(),
                s.getStartTime(),
                s.getEndTime(),
                s.getLocation(),
                s.getInstructorId(),
                s.getStatus()
        );
    }
}
