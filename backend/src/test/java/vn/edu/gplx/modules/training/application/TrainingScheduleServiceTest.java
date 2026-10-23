package vn.edu.gplx.modules.training.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import vn.edu.gplx.modules.learning.domain.Course;
import vn.edu.gplx.modules.training.api.dto.CreateScheduleRequest;
import vn.edu.gplx.modules.training.api.dto.TrainingScheduleResponse;
import vn.edu.gplx.modules.training.application.impl.TrainingScheduleServiceImpl;
import vn.edu.gplx.modules.training.domain.ScheduleType;
import vn.edu.gplx.modules.training.domain.TrainingClass;
import vn.edu.gplx.modules.training.domain.TrainingSchedule;
import vn.edu.gplx.modules.training.infrastructure.TrainingClassRepository;
import vn.edu.gplx.modules.training.infrastructure.TrainingScheduleRepository;
import vn.edu.gplx.shared.exception.BusinessRuleViolationException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TrainingScheduleServiceTest {

    @Mock
    private TrainingScheduleRepository scheduleRepository;

    @Mock
    private TrainingClassRepository classRepository;

    @InjectMocks
    private TrainingScheduleServiceImpl scheduleService;

    private TrainingClass trainingClass;

    @BeforeEach
    void setUp() {
        trainingClass = new TrainingClass(null, "CLS-B1-01", "Lớp B1 Khóa 1", 5L, LocalDate.now(), LocalDate.now().plusMonths(3), 30);
        ReflectionTestUtils.setField(trainingClass, "id", 20L);
    }

    @Test
    @DisplayName("Xếp lịch đào tạo thành công khi giảng viên không bị trùng lịch")
    void should_createSchedule_successfully_when_noConflict() {
        LocalDateTime start = LocalDateTime.now().plusDays(1).withHour(8).withMinute(0);
        LocalDateTime end = start.plusHours(2);

        when(classRepository.findById(20L)).thenReturn(Optional.of(trainingClass));
        when(scheduleRepository.findConflictingInstructorSchedules(5L, start, end)).thenReturn(List.of());
        when(scheduleRepository.save(any(TrainingSchedule.class))).thenAnswer(i -> {
            TrainingSchedule s = i.getArgument(0);
            ReflectionTestUtils.setField(s, "id", 200L);
            return s;
        });

        CreateScheduleRequest request = new CreateScheduleRequest(
                20L, "Thực hành bài 1", ScheduleType.PRACTICE_YARD, start, end, "Sân tập A", 5L
        );

        TrainingScheduleResponse response = scheduleService.createSchedule(request);

        assertThat(response).isNotNull();
        assertThat(response.title()).isEqualTo("Thực hành bài 1");
        assertThat(response.scheduleType()).isEqualTo(ScheduleType.PRACTICE_YARD);

        verify(scheduleRepository).save(any(TrainingSchedule.class));
    }

    @Test
    @DisplayName("Vi phạm Rule TRN-001: Báo lỗi xung đột khi giảng viên đã có lịch khác trong khung giờ")
    void should_throwException_when_instructorHasConflictingSchedule() {
        LocalDateTime start = LocalDateTime.now().plusDays(1).withHour(8).withMinute(0);
        LocalDateTime end = start.plusHours(2);

        TrainingSchedule conflict = new TrainingSchedule(
                trainingClass, "Đào tạo lớp khác", ScheduleType.THEORY, start, end, "Phòng 101", 5L
        );

        when(classRepository.findById(20L)).thenReturn(Optional.of(trainingClass));
        when(scheduleRepository.findConflictingInstructorSchedules(5L, start, end)).thenReturn(List.of(conflict));

        CreateScheduleRequest request = new CreateScheduleRequest(
                20L, "Thực hành bài 1", ScheduleType.PRACTICE_YARD, start, end, "Sân tập A", 5L
        );

        assertThatThrownBy(() -> scheduleService.createSchedule(request))
                .isInstanceOf(BusinessRuleViolationException.class)
                .hasMessageContaining("TRN-001")
                .hasMessageContaining("Giảng viên đã có lịch đào tạo trùng lặp");
    }
}
