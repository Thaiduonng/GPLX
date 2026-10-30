package vn.edu.gplx.modules.rawvehicle.application.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.admission.domain.LicenseCategory;
import vn.edu.gplx.modules.admission.infrastructure.LicenseCategoryRepository;
import vn.edu.gplx.modules.fleet.domain.Vehicle;
import vn.edu.gplx.modules.fleet.domain.VehicleStatus;
import vn.edu.gplx.modules.fleet.infrastructure.VehicleRepository;
import vn.edu.gplx.modules.identity.domain.User;
import vn.edu.gplx.modules.identity.infrastructure.UserRepository;
import vn.edu.gplx.modules.rawvehicle.api.dto.*;
import vn.edu.gplx.modules.rawvehicle.application.RawVehicleTrainingService;
import vn.edu.gplx.modules.rawvehicle.domain.*;
import vn.edu.gplx.modules.rawvehicle.infrastructure.*;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class RawVehicleTrainingServiceImpl implements RawVehicleTrainingService {

    private final RawVehicleStageRepository stageRepository;
    private final RawVehicleEnrollmentRepository enrollmentRepository;
    private final RawVehicleSessionRepository sessionRepository;
    private final RawVehicleSessionAttendeeRepository attendeeRepository;
    private final RawVehicleSkillEvaluationRepository skillEvaluationRepository;
    private final RawVehicleSessionChangeLogRepository changeLogRepository;
    private final UserRepository userRepository;
    private final LicenseCategoryRepository categoryRepository;
    private final VehicleRepository vehicleRepository;

    public RawVehicleTrainingServiceImpl(
            RawVehicleStageRepository stageRepository,
            RawVehicleEnrollmentRepository enrollmentRepository,
            RawVehicleSessionRepository sessionRepository,
            RawVehicleSessionAttendeeRepository attendeeRepository,
            RawVehicleSkillEvaluationRepository skillEvaluationRepository,
            RawVehicleSessionChangeLogRepository changeLogRepository,
            UserRepository userRepository,
            LicenseCategoryRepository categoryRepository,
            VehicleRepository vehicleRepository) {
        this.stageRepository = stageRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.sessionRepository = sessionRepository;
        this.attendeeRepository = attendeeRepository;
        this.skillEvaluationRepository = skillEvaluationRepository;
        this.changeLogRepository = changeLogRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.vehicleRepository = vehicleRepository;
    }

    // =========================================================================
    // 1. CHỨC NĂNG DÀNH CHO HỌC VIÊN
    // =========================================================================

    @Override
    @Transactional(readOnly = true)
    public RawVehicleOverviewResponse getStudentOverview(Long studentId, Long categoryId) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy học viên với ID: " + studentId));

        List<RawVehicleEnrollment> enrollments;
        if (categoryId != null) {
            enrollments = enrollmentRepository.findByStudentIdAndLicenseCategoryId(studentId, categoryId)
                    .map(List::of)
                    .orElse(Collections.emptyList());
        } else {
            enrollments = enrollmentRepository.findStudentEnrollmentsWithDetails(studentId);
        }

        if (enrollments.isEmpty()) {
            return new RawVehicleOverviewResponse(
                    null,
                    student.getId(),
                    student.getFullName(),
                    "N/A",
                    "Chưa đăng ký chương trình xe thô",
                    "Chưa phân công",
                    RawVehicleEnrollmentStatus.ENROLLED,
                    LocalDate.now(),
                    0,
                    0,
                    0,
                    8,
                    0.0,
                    0,
                    0,
                    null,
                    Collections.emptyList(),
                    getAllStages()
            );
        }

        RawVehicleEnrollment enrollment = enrollments.get(0);
        List<RawVehicleStage> allStages = stageRepository.findAllByOrderByStepOrderAsc();
        List<RawVehicleSkillEvaluation> evaluations = skillEvaluationRepository.findEnrollmentEvaluationsWithDetails(enrollment.getId());

        int passedSkillsCount = (int) evaluations.stream().filter(e -> e.getEvaluationStatus() == SkillEvaluationStatus.PASSED).count();
        int needsPracticeSkillsCount = (int) evaluations.stream().filter(e -> e.getEvaluationStatus() == SkillEvaluationStatus.NEEDS_PRACTICE).count();

        // Build stages progress
        Map<Long, List<RawVehicleSkillEvaluation>> evalsByStage = evaluations.stream()
                .collect(Collectors.groupingBy(e -> e.getStage().getId()));

        List<RawVehicleStageDto> stagesProgress = allStages.stream().map(st -> {
            List<RawVehicleSkillEvaluation> stageEvals = evalsByStage.getOrDefault(st.getId(), Collections.emptyList());
            boolean isCompleted = !stageEvals.isEmpty() && stageEvals.stream().allMatch(e -> e.getEvaluationStatus() == SkillEvaluationStatus.PASSED);

            List<RawVehicleSkillEvaluationDto> evalDtos = stageEvals.stream().map(this::toEvaluationDto).toList();
            return new RawVehicleStageDto(
                    st.getId(),
                    st.getStageCode(),
                    st.getStageName(),
                    st.getDescription(),
                    st.getStepOrder(),
                    st.getPrerequisiteStageCode(),
                    st.getExpectedDurationMinutes(),
                    st.getEvaluationCriteria(),
                    st.getStatus(),
                    st.getComplianceStatus(),
                    isCompleted,
                    evalDtos
            );
        }).toList();

        // Student sessions
        List<RawVehicleSessionAttendee> attendees = attendeeRepository.findStudentSessionsWithDetails(studentId);
        List<RawVehicleSessionDto> sessionDtos = attendees.stream()
                .map(a -> toSessionDto(a.getSession(), List.of(toAttendeeDto(a))))
                .toList();

        RawVehicleSessionDto nextSession = sessionDtos.stream()
                .filter(s -> s.status() == RawVehicleSessionStatus.SCHEDULED || s.status() == RawVehicleSessionStatus.CONFIRMED)
                .filter(s -> s.scheduledStartTime().isAfter(LocalDateTime.now()))
                .min(Comparator.comparing(RawVehicleSessionDto::scheduledStartTime))
                .orElse(null);

        double progressPct = allStages.isEmpty() ? 0.0 : Math.round(((double) enrollment.getTotalCompletedStages() / allStages.size()) * 1000.0) / 10.0;

        return new RawVehicleOverviewResponse(
                enrollment.getId(),
                student.getId(),
                student.getFullName(),
                enrollment.getLicenseCategory().getCode(),
                enrollment.getLicenseCategory().getName(),
                enrollment.getInstructor() != null ? enrollment.getInstructor().getFullName() : "Chưa phân công",
                enrollment.getStatus(),
                enrollment.getEnrolledDate(),
                enrollment.getTotalSessionsCount(),
                enrollment.getTotalConfirmedMinutes(),
                enrollment.getTotalCompletedStages(),
                allStages.size(),
                progressPct,
                passedSkillsCount,
                needsPracticeSkillsCount,
                nextSession,
                sessionDtos.stream().limit(5).toList(),
                stagesProgress
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<RawVehicleStageDto> getStudentStages(Long studentId) {
        List<RawVehicleEnrollment> enrollments = enrollmentRepository.findStudentEnrollmentsWithDetails(studentId);
        if (enrollments.isEmpty()) {
            return getAllStages();
        }
        RawVehicleEnrollment enrollment = enrollments.get(0);
        List<RawVehicleStage> allStages = stageRepository.findAllByOrderByStepOrderAsc();
        List<RawVehicleSkillEvaluation> evaluations = skillEvaluationRepository.findEnrollmentEvaluationsWithDetails(enrollment.getId());

        Map<Long, List<RawVehicleSkillEvaluation>> evalsByStage = evaluations.stream()
                .collect(Collectors.groupingBy(e -> e.getStage().getId()));

        return allStages.stream().map(st -> {
            List<RawVehicleSkillEvaluation> stageEvals = evalsByStage.getOrDefault(st.getId(), Collections.emptyList());
            boolean isCompleted = !stageEvals.isEmpty() && stageEvals.stream().allMatch(e -> e.getEvaluationStatus() == SkillEvaluationStatus.PASSED);
            List<RawVehicleSkillEvaluationDto> evalDtos = stageEvals.stream().map(this::toEvaluationDto).toList();
            return new RawVehicleStageDto(
                    st.getId(),
                    st.getStageCode(),
                    st.getStageName(),
                    st.getDescription(),
                    st.getStepOrder(),
                    st.getPrerequisiteStageCode(),
                    st.getExpectedDurationMinutes(),
                    st.getEvaluationCriteria(),
                    st.getStatus(),
                    st.getComplianceStatus(),
                    isCompleted,
                    evalDtos
            );
        }).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<RawVehicleSessionDto> getStudentSessions(Long studentId) {
        List<RawVehicleSessionAttendee> attendees = attendeeRepository.findStudentSessionsWithDetails(studentId);
        return attendees.stream()
                .map(a -> toSessionDto(a.getSession(), List.of(toAttendeeDto(a))))
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<RawVehicleSkillEvaluationDto> getStudentEvaluations(Long studentId) {
        List<RawVehicleEnrollment> enrollments = enrollmentRepository.findStudentEnrollmentsWithDetails(studentId);
        if (enrollments.isEmpty()) {
            return Collections.emptyList();
        }
        return skillEvaluationRepository.findEnrollmentEvaluationsWithDetails(enrollments.get(0).getId())
                .stream()
                .map(this::toEvaluationDto)
                .toList();
    }

    // =========================================================================
    // 2. CHỨC NĂNG DÀNH CHO GIÁO VIÊN
    // =========================================================================

    @Override
    @Transactional(readOnly = true)
    public List<RawVehicleEnrollmentSummaryDto> getInstructorAssignedStudents(Long instructorId) {
        return enrollmentRepository.findInstructorEnrollmentsWithDetails(instructorId).stream()
                .map(this::toEnrollmentSummaryDto)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<RawVehicleSessionDto> getInstructorSessions(Long instructorId) {
        List<RawVehicleSession> sessions = sessionRepository.findInstructorSessionsWithDetails(instructorId);
        return sessions.stream().map(s -> {
            List<RawVehicleSessionAttendeeDto> atts = attendeeRepository.findSessionAttendeesWithDetails(s.getId()).stream()
                    .map(this::toAttendeeDto)
                    .toList();
            return toSessionDto(s, atts);
        }).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public RawVehicleSessionDto getSessionDetail(Long sessionId, Long currentUserId, boolean isInstructorOrAdmin) {
        RawVehicleSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy buổi thực hành với ID: " + sessionId));

        List<RawVehicleSessionAttendeeDto> atts = attendeeRepository.findSessionAttendeesWithDetails(sessionId).stream()
                .map(this::toAttendeeDto)
                .toList();

        // Kiểm tra phạm vi truy cập: Nếu là học viên, học viên phải nằm trong danh sách attendees
        if (!isInstructorOrAdmin) {
            boolean isAttendee = atts.stream().anyMatch(a -> a.studentId().equals(currentUserId));
            if (!isAttendee) {
                throw new SecurityException("Bạn không có quyền xem thông tin buổi thực hành này");
            }
        }

        return toSessionDto(session, atts);
    }

    @Override
    public RawVehicleSessionDto recordAttendance(Long sessionId, Long instructorId, RecordSessionAttendanceRequest request) {
        RawVehicleSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy buổi thực hành với ID: " + sessionId));

        // Kiểm tra phân quyền: Giáo viên phải là người phụ trách buổi học
        if (!session.getInstructor().getId().equals(instructorId)) {
            User current = userRepository.findById(instructorId).orElse(null);
            boolean isAdmin = current != null && current.getRoles().stream()
                    .anyMatch(r -> r.getName().equals("ROLE_ADMIN") || r.getName().equals("ROLE_MANAGER"));
            if (!isAdmin) {
                throw new SecurityException("Chỉ giáo viên phụ trách mới có quyền điểm danh buổi thực hành này");
            }
        }

        if (session.getStatus() == RawVehicleSessionStatus.CANCELLED) {
            throw new IllegalStateException("Không thể điểm danh cho buổi học đã bị hủy");
        }

        List<RawVehicleSessionAttendee> attendees = attendeeRepository.findBySessionId(sessionId);
        Map<Long, RawVehicleSessionAttendee> attendeeMap = attendees.stream()
                .collect(Collectors.toMap(a -> a.getStudent().getId(), a -> a));

        for (var item : request.attendanceList()) {
            RawVehicleSessionAttendee attendee = attendeeMap.get(item.studentId());
            if (attendee != null) {
                attendee.setAttendanceStatus(item.attendanceStatus());
                if (item.attendanceStatus() == AttendeeAttendanceStatus.PRESENT) {
                    attendee.setAttendedAt(LocalDateTime.now());
                }
                if (item.feedback() != null) {
                    attendee.setInstructorFeedback(item.feedback());
                }
                if (item.skillsToImprove() != null) {
                    attendee.setSkillsToImprove(item.skillsToImprove());
                }
                attendeeRepository.save(attendee);
            }
        }

        if (request.safetyChecklistPassed() != null) {
            session.setSafetyChecklistPassed(request.safetyChecklistPassed());
        }
        if (request.instructorNotes() != null) {
            session.setInstructorNotes(request.instructorNotes());
        }

        if (session.getStatus() == RawVehicleSessionStatus.SCHEDULED || session.getStatus() == RawVehicleSessionStatus.CONFIRMED) {
            session.setStatus(RawVehicleSessionStatus.IN_PROGRESS);
        }

        sessionRepository.save(session);

        User changedBy = userRepository.findById(instructorId).orElse(session.getInstructor());
        changeLogRepository.save(new RawVehicleSessionChangeLog(
                session,
                changedBy,
                "UPDATE_ATTENDANCE",
                null,
                "Điểm danh " + request.attendanceList().size() + " học viên",
                "Giáo viên cập nhật điểm danh và nhận xét thực hành"
        ));

        List<RawVehicleSessionAttendeeDto> attDtos = attendeeRepository.findSessionAttendeesWithDetails(sessionId).stream()
                .map(this::toAttendeeDto)
                .toList();

        return toSessionDto(session, attDtos);
    }

    @Override
    public RawVehicleSessionDto completeSession(Long sessionId, Long instructorId, CompleteSessionRequest request) {
        RawVehicleSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy buổi thực hành với ID: " + sessionId));

        if (!session.getInstructor().getId().equals(instructorId)) {
            User current = userRepository.findById(instructorId).orElse(null);
            boolean isAdmin = current != null && current.getRoles().stream()
                    .anyMatch(r -> r.getName().equals("ROLE_ADMIN") || r.getName().equals("ROLE_MANAGER"));
            if (!isAdmin) {
                throw new SecurityException("Chỉ giáo viên phụ trách mới có quyền hoàn thành buổi thực hành này");
            }
        }

        if (request.actualEndTime().isBefore(request.actualStartTime())) {
            throw new IllegalArgumentException("Thời gian kết thúc thực tế phải sau thời gian bắt đầu thực tế");
        }

        int actualMinutes = (int) Duration.between(request.actualStartTime(), request.actualEndTime()).toMinutes();
        if (actualMinutes < 0) actualMinutes = 0;

        session.setActualStartTime(request.actualStartTime());
        session.setActualEndTime(request.actualEndTime());
        session.setActualDurationMinutes(actualMinutes);
        session.setStatus(RawVehicleSessionStatus.COMPLETED);
        if (request.instructorNotes() != null) {
            session.setInstructorNotes(request.instructorNotes());
        }

        sessionRepository.save(session);

        // Cập nhật số buổi và thời lượng tích lũy cho các học viên CÓ MẶT (PRESENT)
        List<RawVehicleSessionAttendee> attendees = attendeeRepository.findBySessionId(sessionId);
        for (RawVehicleSessionAttendee attendee : attendees) {
            if (attendee.getAttendanceStatus() == AttendeeAttendanceStatus.PRESENT) {
                RawVehicleEnrollment enrollment = attendee.getEnrollment();
                enrollment.setTotalConfirmedMinutes(enrollment.getTotalConfirmedMinutes() + actualMinutes);
                enrollment.setTotalSessionsCount(enrollment.getTotalSessionsCount() + 1);
                if (enrollment.getStatus() == RawVehicleEnrollmentStatus.ENROLLED) {
                    enrollment.setStatus(RawVehicleEnrollmentStatus.IN_PROGRESS);
                }
                enrollmentRepository.save(enrollment);
            }
        }

        User changedBy = userRepository.findById(instructorId).orElse(session.getInstructor());
        changeLogRepository.save(new RawVehicleSessionChangeLog(
                session,
                changedBy,
                "COMPLETE_SESSION",
                "Duration: 0 min",
                "Actual Duration: " + actualMinutes + " mins (" + request.actualStartTime() + " -> " + request.actualEndTime() + ")",
                "Hoàn thành buổi thực hành xe thô và xác nhận thời lượng thực tế"
        ));

        List<RawVehicleSessionAttendeeDto> attDtos = attendeeRepository.findSessionAttendeesWithDetails(sessionId).stream()
                .map(this::toAttendeeDto)
                .toList();

        return toSessionDto(session, attDtos);
    }

    @Override
    public RawVehicleSkillEvaluationDto evaluateSkill(Long instructorId, EvaluateSkillRequest request) {
        User instructor = userRepository.findById(instructorId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy giáo viên với ID: " + instructorId));

        RawVehicleEnrollment enrollment = enrollmentRepository.findById(request.enrollmentId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy đăng ký với ID: " + request.enrollmentId()));

        RawVehicleStage stage = stageRepository.findById(request.stageId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy giai đoạn với ID: " + request.stageId()));

        RawVehicleSkillEvaluation evaluation = skillEvaluationRepository
                .findByEnrollmentIdAndCriterionCode(enrollment.getId(), request.criterionCode())
                .orElseGet(RawVehicleSkillEvaluation::new);

        evaluation.setEnrollment(enrollment);
        evaluation.setStudent(enrollment.getStudent());
        evaluation.setStage(stage);
        evaluation.setCriterionCode(request.criterionCode());
        evaluation.setSkillName(request.skillName());
        evaluation.setRatingLevel(request.ratingLevel() != null ? request.ratingLevel() : 0);
        evaluation.setEvaluationStatus(request.evaluationStatus());
        evaluation.setComments(request.comments());
        evaluation.setEvaluatedBy(instructor);
        evaluation.setEvaluatedAt(LocalDateTime.now());

        skillEvaluationRepository.save(evaluation);

        // Kiểm tra xem học viên đã đạt bao nhiêu stage
        List<RawVehicleSkillEvaluation> allEvals = skillEvaluationRepository.findByEnrollmentId(enrollment.getId());
        Map<Long, List<RawVehicleSkillEvaluation>> byStage = allEvals.stream()
                .collect(Collectors.groupingBy(e -> e.getStage().getId()));

        int completedStagesCount = 0;
        for (var entry : byStage.entrySet()) {
            boolean allPassed = entry.getValue().stream().allMatch(e -> e.getEvaluationStatus() == SkillEvaluationStatus.PASSED);
            if (allPassed && !entry.getValue().isEmpty()) {
                completedStagesCount++;
            }
        }

        enrollment.setTotalCompletedStages(completedStagesCount);
        if (completedStagesCount >= 8) {
            enrollment.setStatus(RawVehicleEnrollmentStatus.COMPLETED);
            enrollment.setCompletedDate(LocalDate.now());
        } else if (enrollment.getStatus() == RawVehicleEnrollmentStatus.ENROLLED) {
            enrollment.setStatus(RawVehicleEnrollmentStatus.IN_PROGRESS);
        }
        enrollmentRepository.save(enrollment);

        return toEvaluationDto(evaluation);
    }

    // =========================================================================
    // 3. CHỨC NĂNG DÀNH CHO QUẢN LÝ / TUYỂN SINH
    // =========================================================================

    @Override
    public RawVehicleEnrollmentSummaryDto enrollStudent(EnrollRawVehicleRequest request) {
        User student = userRepository.findById(request.studentId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy học viên với ID: " + request.studentId()));

        LicenseCategory category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy hạng GPLX với ID: " + request.categoryId()));

        if (enrollmentRepository.findByStudentIdAndLicenseCategoryId(student.getId(), category.getId()).isPresent()) {
            throw new IllegalArgumentException("Học viên " + student.getFullName() + " đã được đăng ký chương trình xe thô hạng " + category.getCode());
        }

        User instructor = null;
        if (request.instructorId() != null) {
            instructor = userRepository.findById(request.instructorId())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy giáo viên với ID: " + request.instructorId()));
        }

        RawVehicleEnrollment enrollment = new RawVehicleEnrollment(student, category, instructor, LocalDate.now());
        if (request.notes() != null) {
            enrollment.setNotes(request.notes());
        }

        enrollment = enrollmentRepository.save(enrollment);

        // Khởi tạo các tiêu chí đánh giá ban đầu cho 8 giai đoạn (ở trạng thái NOT_EVALUATED)
        List<RawVehicleStage> stages = stageRepository.findAllByOrderByStepOrderAsc();
        User defaultEvaluator = instructor != null ? instructor : student;
        for (RawVehicleStage st : stages) {
            skillEvaluationRepository.save(new RawVehicleSkillEvaluation(
                    enrollment,
                    student,
                    st,
                    st.getStageCode() + "_BASE",
                    st.getStageName(),
                    0,
                    SkillEvaluationStatus.NOT_EVALUATED,
                    "Chưa bắt đầu đánh giá",
                    defaultEvaluator
            ));
        }

        return toEnrollmentSummaryDto(enrollment);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RawVehicleEnrollmentSummaryDto> getAllEnrollments(Long categoryId, RawVehicleEnrollmentStatus status) {
        List<RawVehicleEnrollment> enrollments = enrollmentRepository.findAllWithDetails();
        return enrollments.stream()
                .filter(e -> categoryId == null || e.getLicenseCategory().getId().equals(categoryId))
                .filter(e -> status == null || e.getStatus() == status)
                .map(this::toEnrollmentSummaryDto)
                .toList();
    }

    @Override
    public RawVehicleSessionDto createSession(Long createdById, CreateRawVehicleSessionRequest request) {
        if (request.scheduledEndTime().isBefore(request.scheduledStartTime())) {
            throw new IllegalArgumentException("Thời gian kết thúc dự kiến phải sau thời gian bắt đầu dự kiến");
        }

        User instructor = userRepository.findById(request.instructorId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy giáo viên với ID: " + request.instructorId()));

        Vehicle vehicle = vehicleRepository.findById(request.vehicleId())
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy phương tiện với ID: " + request.vehicleId()));

        // Kiểm tra an toàn phương tiện (FLT-001)
        if (vehicle.getStatus() == VehicleStatus.MAINTENANCE || vehicle.getStatus() == VehicleStatus.RETIRED) {
            throw new IllegalStateException("Phương tiện " + vehicle.getPlateNumber() + " đang trong tình trạng bảo dưỡng hoặc đã ngừng sử dụng");
        }
        if (vehicle.getInspectionExpiryDate().isBefore(request.scheduledStartTime().toLocalDate())) {
            throw new IllegalStateException("Phương tiện " + vehicle.getPlateNumber() + " đã hết hạn kiểm định an toàn kỹ thuật (Hạn: " + vehicle.getInspectionExpiryDate() + ")");
        }

        // Kiểm tra xung đột lịch của giáo viên
        boolean instructorConflict = sessionRepository.existsOverlappingSessionForInstructor(
                instructor.getId(), request.scheduledStartTime(), request.scheduledEndTime(), null
        );
        if (instructorConflict) {
            throw new IllegalStateException("Giáo viên " + instructor.getFullName() + " đã có lịch dạy khác trong khoảng thời gian này");
        }

        // Kiểm tra xung đột lịch của phương tiện
        boolean vehicleConflict = sessionRepository.existsOverlappingSessionForVehicle(
                vehicle.getId(), request.scheduledStartTime(), request.scheduledEndTime(), null
        );
        if (vehicleConflict) {
            throw new IllegalStateException("Phương tiện " + vehicle.getPlateNumber() + " đã được xếp lịch cho một buổi thực hành khác");
        }

        RawVehicleStage stage = null;
        if (request.stageId() != null) {
            stage = stageRepository.findById(request.stageId()).orElse(null);
        }

        int maxStudents = request.maxStudents() != null && request.maxStudents() > 0 ? request.maxStudents() : 2;
        if (request.studentIds().size() > maxStudents) {
            throw new IllegalArgumentException("Số lượng học viên (" + request.studentIds().size() + ") vượt quá sức chứa tối đa của buổi (" + maxStudents + ")");
        }

        String sessionCode = "RVT-" + DateTimeFormatter.ofPattern("yyyyMMdd").format(request.scheduledStartTime())
                + "-" + UUID.randomUUID().toString().substring(0, 5).toUpperCase();

        RawVehicleSession session = new RawVehicleSession(
                sessionCode,
                instructor,
                vehicle,
                stage,
                request.practiceLocation(),
                request.scheduledStartTime(),
                request.scheduledEndTime(),
                maxStudents
        );

        session = sessionRepository.save(session);

        // Ghi danh attendees
        List<RawVehicleSessionAttendeeDto> attendeeDtos = new ArrayList<>();
        for (Long studentId : request.studentIds()) {
            User student = userRepository.findById(studentId)
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy học viên với ID: " + studentId));

            List<RawVehicleEnrollment> studentEnrollments = enrollmentRepository.findByStudentId(studentId);
            if (studentEnrollments.isEmpty()) {
                throw new IllegalStateException("Học viên " + student.getFullName() + " chưa đăng ký chương trình xe thô nào");
            }
            RawVehicleEnrollment enrollment = studentEnrollments.get(0);

            RawVehicleSessionAttendee attendee = new RawVehicleSessionAttendee(session, enrollment, student);
            attendee = attendeeRepository.save(attendee);
            attendeeDtos.add(toAttendeeDto(attendee));
        }

        User creator = userRepository.findById(createdById).orElse(instructor);
        changeLogRepository.save(new RawVehicleSessionChangeLog(
                session,
                creator,
                "CREATE_SESSION",
                null,
                "Tạo mới buổi học " + sessionCode + " cho " + request.studentIds().size() + " học viên",
                "Lên lịch thực hành xe thô mới"
        ));

        return toSessionDto(session, attendeeDtos);
    }

    @Override
    public RawVehicleSessionDto updateSession(Long sessionId, Long changedById, UpdateRawVehicleSessionRequest request) {
        RawVehicleSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy buổi thực hành với ID: " + sessionId));

        if (session.getStatus() == RawVehicleSessionStatus.COMPLETED || session.getStatus() == RawVehicleSessionStatus.CANCELLED) {
            throw new IllegalStateException("Không thể chỉnh sửa buổi thực hành đã hoàn thành hoặc đã hủy");
        }

        if (request.scheduledEndTime().isBefore(request.scheduledStartTime())) {
            throw new IllegalArgumentException("Thời gian kết thúc mới phải sau thời gian bắt đầu mới");
        }

        Long targetInstructorId = request.instructorId() != null ? request.instructorId() : session.getInstructor().getId();
        Long targetVehicleId = request.vehicleId() != null ? request.vehicleId() : session.getVehicle().getId();

        // Kiểm tra xung đột giáo viên (loại trừ chính buổi này)
        boolean instructorConflict = sessionRepository.existsOverlappingSessionForInstructor(
                targetInstructorId, request.scheduledStartTime(), request.scheduledEndTime(), session.getId()
        );
        if (instructorConflict) {
            throw new IllegalStateException("Giáo viên đã có lịch dạy khác trong khoảng thời gian điều chỉnh");
        }

        // Kiểm tra xung đột xe (loại trừ chính buổi này)
        boolean vehicleConflict = sessionRepository.existsOverlappingSessionForVehicle(
                targetVehicleId, request.scheduledStartTime(), request.scheduledEndTime(), session.getId()
        );
        if (vehicleConflict) {
            throw new IllegalStateException("Phương tiện đã có lịch thực hành khác trong khoảng thời gian điều chỉnh");
        }

        String oldValue = "Time: " + session.getScheduledStartTime() + " - " + session.getScheduledEndTime()
                + ", Vehicle: " + session.getVehicle().getPlateNumber()
                + ", Instructor: " + session.getInstructor().getFullName();

        if (request.instructorId() != null && !request.instructorId().equals(session.getInstructor().getId())) {
            User newInstructor = userRepository.findById(request.instructorId())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy giáo viên mới"));
            session.setInstructor(newInstructor);
        }

        if (request.vehicleId() != null && !request.vehicleId().equals(session.getVehicle().getId())) {
            Vehicle newVehicle = vehicleRepository.findById(request.vehicleId())
                    .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy phương tiện mới"));
            session.setVehicle(newVehicle);
        }

        session.setScheduledStartTime(request.scheduledStartTime());
        session.setScheduledEndTime(request.scheduledEndTime());
        if (request.practiceLocation() != null) {
            session.setPracticeLocation(request.practiceLocation());
        }

        sessionRepository.save(session);

        String newValue = "Time: " + session.getScheduledStartTime() + " - " + session.getScheduledEndTime()
                + ", Vehicle: " + session.getVehicle().getPlateNumber()
                + ", Instructor: " + session.getInstructor().getFullName();

        User changer = userRepository.findById(changedById).orElse(session.getInstructor());
        changeLogRepository.save(new RawVehicleSessionChangeLog(
                session,
                changer,
                "RESCHEDULE",
                oldValue,
                newValue,
                request.reason()
        ));

        List<RawVehicleSessionAttendeeDto> attDtos = attendeeRepository.findSessionAttendeesWithDetails(sessionId).stream()
                .map(this::toAttendeeDto)
                .toList();

        return toSessionDto(session, attDtos);
    }

    @Override
    public RawVehicleSessionDto cancelSession(Long sessionId, Long cancelledById, CancelRawVehicleSessionRequest request) {
        RawVehicleSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy buổi thực hành với ID: " + sessionId));

        if (session.getStatus() == RawVehicleSessionStatus.COMPLETED) {
            throw new IllegalStateException("Không thể hủy buổi thực hành đã hoàn thành");
        }

        session.setStatus(RawVehicleSessionStatus.CANCELLED);
        session.setCancelReason(request.reason());
        sessionRepository.save(session);

        User changer = userRepository.findById(cancelledById).orElse(session.getInstructor());
        changeLogRepository.save(new RawVehicleSessionChangeLog(
                session,
                changer,
                "CANCEL_SESSION",
                "Status: " + session.getStatus(),
                "Status: CANCELLED",
                request.reason()
        ));

        List<RawVehicleSessionAttendeeDto> attDtos = attendeeRepository.findSessionAttendeesWithDetails(sessionId).stream()
                .map(this::toAttendeeDto)
                .toList();

        return toSessionDto(session, attDtos);
    }

    @Override
    @Transactional(readOnly = true)
    public List<RawVehicleSessionDto> getAllSessions() {
        return sessionRepository.findAllWithDetails().stream().map(s -> {
            List<RawVehicleSessionAttendeeDto> atts = attendeeRepository.findSessionAttendeesWithDetails(s.getId()).stream()
                    .map(this::toAttendeeDto)
                    .toList();
            return toSessionDto(s, atts);
        }).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<RawVehicleSessionChangeLogDto> getSessionChangeLogs(Long sessionId) {
        return changeLogRepository.findSessionLogsWithUser(sessionId).stream()
                .map(l -> new RawVehicleSessionChangeLogDto(
                        l.getId(),
                        l.getSession().getId(),
                        l.getChangedBy().getFullName(),
                        l.getChangeType(),
                        l.getOldValue(),
                        l.getNewValue(),
                        l.getReason(),
                        l.getCreatedAt()
                ))
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<RawVehicleStageDto> getAllStages() {
        return stageRepository.findAllByOrderByStepOrderAsc().stream()
                .map(st -> new RawVehicleStageDto(
                        st.getId(),
                        st.getStageCode(),
                        st.getStageName(),
                        st.getDescription(),
                        st.getStepOrder(),
                        st.getPrerequisiteStageCode(),
                        st.getExpectedDurationMinutes(),
                        st.getEvaluationCriteria(),
                        st.getStatus(),
                        st.getComplianceStatus(),
                        false,
                        Collections.emptyList()
                ))
                .toList();
    }

    // =========================================================================
    // HELPER MAPPERS
    // =========================================================================

    private RawVehicleSessionDto toSessionDto(RawVehicleSession s, List<RawVehicleSessionAttendeeDto> atts) {
        return new RawVehicleSessionDto(
                s.getId(),
                s.getSessionCode(),
                s.getInstructor().getId(),
                s.getInstructor().getFullName(),
                s.getVehicle().getId(),
                s.getVehicle().getPlateNumber(),
                s.getVehicle().getModel(),
                s.getStage() != null ? s.getStage().getId() : null,
                s.getStage() != null ? s.getStage().getStageCode() : null,
                s.getStage() != null ? s.getStage().getStageName() : "Làm quen xe tổng hợp",
                s.getPracticeLocation(),
                s.getScheduledStartTime(),
                s.getScheduledEndTime(),
                s.getActualStartTime(),
                s.getActualEndTime(),
                s.getActualDurationMinutes(),
                s.getMaxStudents(),
                s.getStatus(),
                s.getSafetyChecklistPassed(),
                s.getInstructorNotes(),
                s.getCancelReason(),
                atts
        );
    }

    private RawVehicleSessionAttendeeDto toAttendeeDto(RawVehicleSessionAttendee a) {
        return new RawVehicleSessionAttendeeDto(
                a.getId(),
                a.getStudent().getId(),
                a.getStudent().getFullName(),
                a.getStudent().getEmail(),
                a.getStudent().getPhone(),
                a.getAttendanceStatus(),
                a.getAttendedAt(),
                a.getInstructorFeedback(),
                a.getSkillsToImprove()
        );
    }

    private RawVehicleSkillEvaluationDto toEvaluationDto(RawVehicleSkillEvaluation e) {
        return new RawVehicleSkillEvaluationDto(
                e.getId(),
                e.getEnrollment().getId(),
                e.getStudent().getId(),
                e.getStage().getId(),
                e.getStage().getStageCode(),
                e.getStage().getStageName(),
                e.getCriterionCode(),
                e.getSkillName(),
                e.getRatingLevel(),
                e.getEvaluationStatus(),
                e.getComments(),
                e.getEvaluatedBy().getFullName(),
                e.getEvaluatedAt()
        );
    }

    private RawVehicleEnrollmentSummaryDto toEnrollmentSummaryDto(RawVehicleEnrollment e) {
        List<RawVehicleSkillEvaluation> evals = skillEvaluationRepository.findByEnrollmentId(e.getId());
        int passed = (int) evals.stream().filter(ev -> ev.getEvaluationStatus() == SkillEvaluationStatus.PASSED).count();
        int needsPractice = (int) evals.stream().filter(ev -> ev.getEvaluationStatus() == SkillEvaluationStatus.NEEDS_PRACTICE).count();

        double progressPct = Math.round(((double) e.getTotalCompletedStages() / 8.0) * 1000.0) / 10.0;

        return new RawVehicleEnrollmentSummaryDto(
                e.getId(),
                e.getStudent().getId(),
                e.getStudent().getFullName(),
                e.getStudent().getPhone(),
                e.getStudent().getEmail(),
                e.getLicenseCategory().getCode(),
                e.getLicenseCategory().getName(),
                e.getInstructor() != null ? e.getInstructor().getId() : null,
                e.getInstructor() != null ? e.getInstructor().getFullName() : "Chưa phân công",
                e.getStatus(),
                e.getEnrolledDate(),
                e.getCompletedDate(),
                e.getTotalCompletedStages(),
                e.getTotalConfirmedMinutes(),
                e.getTotalSessionsCount(),
                progressPct,
                passed,
                needsPractice,
                e.getNotes()
        );
    }
}
