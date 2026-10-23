package vn.edu.gplx.modules.training.application.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.training.api.dto.AttendanceResponse;
import vn.edu.gplx.modules.training.api.dto.CheckAttendanceRequest;
import vn.edu.gplx.modules.training.application.AttendanceService;
import vn.edu.gplx.modules.training.domain.AttendanceRecord;
import vn.edu.gplx.modules.training.domain.TrainingSchedule;
import vn.edu.gplx.modules.training.infrastructure.AttendanceRecordRepository;
import vn.edu.gplx.modules.training.infrastructure.TrainingScheduleRepository;
import vn.edu.gplx.shared.exception.BusinessRuleViolationException;
import vn.edu.gplx.shared.exception.ResourceNotFoundException;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class AttendanceServiceImpl implements AttendanceService {

    private static final Logger log = LoggerFactory.getLogger(AttendanceServiceImpl.class);

    private final AttendanceRecordRepository attendanceRepository;
    private final TrainingScheduleRepository scheduleRepository;

    public AttendanceServiceImpl(AttendanceRecordRepository attendanceRepository,
                                 TrainingScheduleRepository scheduleRepository) {
        this.attendanceRepository = attendanceRepository;
        this.scheduleRepository = scheduleRepository;
    }

    @Override
    public AttendanceResponse recordAttendance(CheckAttendanceRequest request) {
        TrainingSchedule schedule = scheduleRepository.findById(request.scheduleId())
                .orElseThrow(() -> new ResourceNotFoundException("TrainingSchedule", "id", request.scheduleId()));

        // Quy tắc TRN-002: Điểm danh phải được ghi nhận trong khung thời gian cho phép (trong ngày diễn ra buổi học)
        LocalDate scheduleDate = schedule.getStartTime().toLocalDate();
        LocalDate today = LocalDate.now();

        if (!scheduleDate.isEqual(today)) {
            throw new BusinessRuleViolationException(
                    "TRN-002",
                    String.format("Điểm danh chỉ được phép thực hiện trong ngày diễn ra buổi học (%s). Ngày hiện tại: %s.",
                            scheduleDate, today)
            );
        }

        AttendanceRecord record = attendanceRepository.findByScheduleIdAndUserId(request.scheduleId(), request.studentId())
                .orElseGet(() -> new AttendanceRecord(schedule, request.studentId(), request.status(), request.note()));

        record.setStatus(request.status());
        record.setNote(request.note());

        AttendanceRecord saved = attendanceRepository.save(record);
        log.info("Attendance recorded for student {} on schedule {}: status={}",
                request.studentId(), request.scheduleId(), request.status());

        return toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AttendanceResponse> getAttendanceBySchedule(Long scheduleId) {
        return attendanceRepository.findByScheduleId(scheduleId).stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<AttendanceResponse> getMyAttendance(Long studentId) {
        return attendanceRepository.findByUserId(studentId).stream()
                .map(this::toResponse)
                .toList();
    }

    private AttendanceResponse toResponse(AttendanceRecord r) {
        return new AttendanceResponse(
                r.getId(),
                r.getSchedule().getId(),
                r.getUserId(),
                r.getStatus(),
                r.getCheckedInAt(),
                r.getNote()
        );
    }
}
