package vn.edu.gplx.modules.training.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import vn.edu.gplx.modules.training.api.dto.AttendanceResponse;
import vn.edu.gplx.modules.training.api.dto.CheckAttendanceRequest;
import vn.edu.gplx.modules.training.application.impl.AttendanceServiceImpl;
import vn.edu.gplx.modules.training.domain.AttendanceRecord;
import vn.edu.gplx.modules.training.domain.AttendanceStatus;
import vn.edu.gplx.modules.training.domain.ScheduleType;
import vn.edu.gplx.modules.training.domain.TrainingSchedule;
import vn.edu.gplx.modules.training.infrastructure.AttendanceRecordRepository;
import vn.edu.gplx.modules.training.infrastructure.TrainingScheduleRepository;
import vn.edu.gplx.shared.exception.BusinessRuleViolationException;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AttendanceServiceTest {

    @Mock
    private AttendanceRecordRepository attendanceRepository;

    @Mock
    private TrainingScheduleRepository scheduleRepository;

    @InjectMocks
    private AttendanceServiceImpl attendanceService;

    private TrainingSchedule todaySchedule;
    private TrainingSchedule tomorrowSchedule;

    @BeforeEach
    void setUp() {
        LocalDateTime now = LocalDateTime.now();
        todaySchedule = new TrainingSchedule(null, "Buổi học hôm nay", ScheduleType.THEORY, now.minusHours(1), now.plusHours(1), "P101", 1L);
        ReflectionTestUtils.setField(todaySchedule, "id", 100L);

        LocalDateTime tomorrow = now.plusDays(1);
        tomorrowSchedule = new TrainingSchedule(null, "Buổi học ngày mai", ScheduleType.THEORY, tomorrow, tomorrow.plusHours(2), "P102", 1L);
        ReflectionTestUtils.setField(tomorrowSchedule, "id", 200L);
    }

    @Test
    @DisplayName("Quy tắc TRN-002: Điểm danh thành công khi thực hiện trong ngày diễn ra buổi học")
    void should_recordAttendance_successfully_when_sameDay() {
        when(scheduleRepository.findById(100L)).thenReturn(Optional.of(todaySchedule));
        when(attendanceRepository.findByScheduleIdAndUserId(100L, 50L)).thenReturn(Optional.empty());
        when(attendanceRepository.save(any(AttendanceRecord.class))).thenAnswer(i -> {
            AttendanceRecord r = i.getArgument(0);
            ReflectionTestUtils.setField(r, "id", 1L);
            return r;
        });

        CheckAttendanceRequest request = new CheckAttendanceRequest(100L, 50L, AttendanceStatus.PRESENT, "Đúng giờ");
        AttendanceResponse response = attendanceService.recordAttendance(request);

        assertThat(response).isNotNull();
        assertThat(response.status()).isEqualTo(AttendanceStatus.PRESENT);
        assertThat(response.note()).isEqualTo("Đúng giờ");

        verify(attendanceRepository).save(any(AttendanceRecord.class));
    }

    @Test
    @DisplayName("Vi phạm Rule TRN-002: Từ chối điểm danh nếu ngày điểm danh không khớp ngày buổi học")
    void should_throwException_when_attendanceRecordedOnDifferentDay() {
        when(scheduleRepository.findById(200L)).thenReturn(Optional.of(tomorrowSchedule));

        CheckAttendanceRequest request = new CheckAttendanceRequest(200L, 50L, AttendanceStatus.PRESENT, "Điểm danh trước");

        assertThatThrownBy(() -> attendanceService.recordAttendance(request))
                .isInstanceOf(BusinessRuleViolationException.class)
                .hasMessageContaining("TRN-002")
                .hasMessageContaining("Điểm danh chỉ được phép thực hiện trong ngày diễn ra buổi học");
    }
}
