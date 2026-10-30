package vn.edu.gplx.modules.rawvehicle.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import vn.edu.gplx.modules.admission.domain.LicenseCategory;
import vn.edu.gplx.modules.admission.infrastructure.LicenseCategoryRepository;
import vn.edu.gplx.modules.fleet.domain.Vehicle;
import vn.edu.gplx.modules.fleet.domain.VehicleStatus;
import vn.edu.gplx.modules.fleet.infrastructure.VehicleRepository;
import vn.edu.gplx.modules.identity.domain.User;
import vn.edu.gplx.modules.identity.infrastructure.UserRepository;
import vn.edu.gplx.modules.rawvehicle.api.dto.*;
import vn.edu.gplx.modules.rawvehicle.application.impl.RawVehicleTrainingServiceImpl;
import vn.edu.gplx.modules.rawvehicle.domain.*;
import vn.edu.gplx.modules.rawvehicle.infrastructure.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RawVehicleTrainingServiceTest {

    @Mock
    private RawVehicleStageRepository stageRepository;

    @Mock
    private RawVehicleEnrollmentRepository enrollmentRepository;

    @Mock
    private RawVehicleSessionRepository sessionRepository;

    @Mock
    private RawVehicleSessionAttendeeRepository attendeeRepository;

    @Mock
    private RawVehicleSkillEvaluationRepository skillEvaluationRepository;

    @Mock
    private RawVehicleSessionChangeLogRepository changeLogRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private LicenseCategoryRepository categoryRepository;

    @Mock
    private VehicleRepository vehicleRepository;

    @InjectMocks
    private RawVehicleTrainingServiceImpl trainingService;

    private User student;
    private User instructor;
    private LicenseCategory categoryB2;
    private Vehicle vehicle;
    private RawVehicleStage stage1;
    private RawVehicleEnrollment enrollment;

    @BeforeEach
    void setUp() {
        student = new User();
        student.setId(10L);
        student.setUsername("student10");
        student.setFullName("Nguyễn Văn Học Viên");

        instructor = new User();
        instructor.setId(20L);
        instructor.setUsername("instructor20");
        instructor.setFullName("Trần Văn Giáo Viên");

        categoryB2 = new LicenseCategory("B2", "Hạng B2 - Xe ô tô chở người đến 9 chỗ", "Hạng B2 tiêu chuẩn", 18, BigDecimal.valueOf(15000000));
        categoryB2.setId(2L);

        vehicle = new Vehicle();
        vehicle.setId(5L);
        vehicle.setPlateNumber("29A-12345");
        vehicle.setModel("Toyota Vios");
        vehicle.setStatus(VehicleStatus.AVAILABLE);
        vehicle.setInspectionExpiryDate(LocalDate.now().plusMonths(6));

        stage1 = new RawVehicleStage(
                "RVT_STAGE_01",
                "Nhận biết cấu tạo và bộ phận điều khiển",
                "Khảo sát khoang động cơ cơ bản...",
                1,
                null,
                60,
                "Tiêu chí chuẩn",
                "ACTIVE",
                "INTERNAL_RULE"
        );
        stage1.setId(1L);

        enrollment = new RawVehicleEnrollment(student, categoryB2, instructor, LocalDate.now());
        enrollment.setId(100L);
    }

    @Test
    @DisplayName("TC-01: Đăng ký học viên vào chương trình xe thô thành công")
    void should_enrollStudent_successfully() {
        EnrollRawVehicleRequest request = new EnrollRawVehicleRequest(10L, 2L, 20L, "Học viên mới");

        when(userRepository.findById(10L)).thenReturn(Optional.of(student));
        when(categoryRepository.findById(2L)).thenReturn(Optional.of(categoryB2));
        when(enrollmentRepository.findByStudentIdAndLicenseCategoryId(10L, 2L)).thenReturn(Optional.empty());
        when(userRepository.findById(20L)).thenReturn(Optional.of(instructor));
        when(enrollmentRepository.save(any(RawVehicleEnrollment.class))).thenReturn(enrollment);
        when(stageRepository.findAllByOrderByStepOrderAsc()).thenReturn(List.of(stage1));

        RawVehicleEnrollmentSummaryDto summary = trainingService.enrollStudent(request);

        assertThat(summary).isNotNull();
        assertThat(summary.studentName()).isEqualTo("Nguyễn Văn Học Viên");
        assertThat(summary.categoryCode()).isEqualTo("B2");
        assertThat(summary.instructorName()).isEqualTo("Trần Văn Giáo Viên");
        assertThat(summary.status()).isEqualTo(RawVehicleEnrollmentStatus.ENROLLED);
        verify(enrollmentRepository, times(1)).save(any(RawVehicleEnrollment.class));
    }

    @Test
    @DisplayName("TC-02: Ném ngoại lệ khi học viên đã đăng ký chương trình xe thô cho hạng này")
    void should_throwException_when_alreadyEnrolled() {
        EnrollRawVehicleRequest request = new EnrollRawVehicleRequest(10L, 2L, 20L, "Ghi danh lại");

        when(userRepository.findById(10L)).thenReturn(Optional.of(student));
        when(categoryRepository.findById(2L)).thenReturn(Optional.of(categoryB2));
        when(enrollmentRepository.findByStudentIdAndLicenseCategoryId(10L, 2L)).thenReturn(Optional.of(enrollment));

        assertThatThrownBy(() -> trainingService.enrollStudent(request))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("đã được đăng ký chương trình xe thô");
    }

    @Test
    @DisplayName("TC-03: Ngăn xếp lịch khi giáo viên bị trùng lịch thực hành khác")
    void should_throwException_when_instructorHasScheduleConflict() {
        LocalDateTime start = LocalDateTime.now().plusDays(1).withHour(8).withMinute(0);
        LocalDateTime end = start.plusHours(2);
        CreateRawVehicleSessionRequest request = new CreateRawVehicleSessionRequest(
                20L, 5L, 1L, "Sân tập số 1", start, end, 2, List.of(10L)
        );

        when(userRepository.findById(20L)).thenReturn(Optional.of(instructor));
        when(vehicleRepository.findById(5L)).thenReturn(Optional.of(vehicle));
        when(sessionRepository.existsOverlappingSessionForInstructor(20L, start, end, null)).thenReturn(true);

        assertThatThrownBy(() -> trainingService.createSession(1L, request))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("đã có lịch dạy khác trong khoảng thời gian này");
    }

    @Test
    @DisplayName("TC-04: Ngăn xếp lịch khi phương tiện hết hạn kiểm định an toàn kỹ thuật (FLT-001)")
    void should_throwException_when_vehicleInspectionExpired() {
        LocalDateTime start = LocalDateTime.now().plusDays(2).withHour(9).withMinute(0);
        LocalDateTime end = start.plusHours(2);
        vehicle.setInspectionExpiryDate(LocalDate.now().minusDays(1)); // Đã hết hạn đăng kiểm

        CreateRawVehicleSessionRequest request = new CreateRawVehicleSessionRequest(
                20L, 5L, 1L, "Sân tập số 2", start, end, 2, List.of(10L)
        );

        when(userRepository.findById(20L)).thenReturn(Optional.of(instructor));
        when(vehicleRepository.findById(5L)).thenReturn(Optional.of(vehicle));

        assertThatThrownBy(() -> trainingService.createSession(1L, request))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("đã hết hạn kiểm định an toàn kỹ thuật");
    }

    @Test
    @DisplayName("TC-05: Điểm danh và hoàn thành buổi học, tính đúng thời lượng thực tế (minutes)")
    void should_completeSession_and_accumulateActualMinutes() {
        RawVehicleSession session = new RawVehicleSession(
                "RVT-20261028-001", instructor, vehicle, stage1, "Sân số 1",
                LocalDateTime.now().minusHours(2), LocalDateTime.now(), 2
        );
        session.setId(50L);

        RawVehicleSessionAttendee attendee = new RawVehicleSessionAttendee(session, enrollment, student);
        attendee.setAttendanceStatus(AttendeeAttendanceStatus.PRESENT);

        when(sessionRepository.findById(50L)).thenReturn(Optional.of(session));
        when(attendeeRepository.findBySessionId(50L)).thenReturn(List.of(attendee));
        when(attendeeRepository.findSessionAttendeesWithDetails(50L)).thenReturn(List.of(attendee));

        LocalDateTime actualStart = LocalDateTime.of(2026, 10, 28, 8, 15);
        LocalDateTime actualEnd = LocalDateTime.of(2026, 10, 28, 10, 0); // 105 phút
        CompleteSessionRequest request = new CompleteSessionRequest(actualStart, actualEnd, "Học viên tập tốt");

        RawVehicleSessionDto result = trainingService.completeSession(50L, 20L, request);

        assertThat(result.status()).isEqualTo(RawVehicleSessionStatus.COMPLETED);
        assertThat(result.actualDurationMinutes()).isEqualTo(105);
        assertThat(enrollment.getTotalConfirmedMinutes()).isEqualTo(105);
        assertThat(enrollment.getTotalSessionsCount()).isEqualTo(1);
        verify(changeLogRepository, times(1)).save(any(RawVehicleSessionChangeLog.class));
    }

    @Test
    @DisplayName("TC-06: Đánh giá kỹ năng và nâng cấp tiến độ giai đoạn khi đạt")
    void should_evaluateSkill_and_updateEnrollmentProgress() {
        EvaluateSkillRequest request = new EvaluateSkillRequest(
                100L, 1L, "RVT_STAGE_01_BASE", "Khảo sát khoang động cơ", 4, SkillEvaluationStatus.PASSED, "Nắm vững"
        );

        when(userRepository.findById(20L)).thenReturn(Optional.of(instructor));
        when(enrollmentRepository.findById(100L)).thenReturn(Optional.of(enrollment));
        when(stageRepository.findById(1L)).thenReturn(Optional.of(stage1));
        when(skillEvaluationRepository.findByEnrollmentIdAndCriterionCode(100L, "RVT_STAGE_01_BASE"))
                .thenReturn(Optional.empty());

        RawVehicleSkillEvaluation savedEval = new RawVehicleSkillEvaluation(
                enrollment, student, stage1, "RVT_STAGE_01_BASE", "Khảo sát khoang động cơ", 4, SkillEvaluationStatus.PASSED, "Nắm vững", instructor
        );
        when(skillEvaluationRepository.findByEnrollmentId(100L)).thenReturn(List.of(savedEval));

        RawVehicleSkillEvaluationDto evalDto = trainingService.evaluateSkill(20L, request);

        assertThat(evalDto).isNotNull();
        assertThat(evalDto.evaluationStatus()).isEqualTo(SkillEvaluationStatus.PASSED);
        assertThat(evalDto.ratingLevel()).isEqualTo(4);
        assertThat(enrollment.getTotalCompletedStages()).isEqualTo(1);
        assertThat(enrollment.getStatus()).isEqualTo(RawVehicleEnrollmentStatus.IN_PROGRESS);
    }
}
