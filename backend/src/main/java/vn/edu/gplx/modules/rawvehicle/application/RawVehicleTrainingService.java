package vn.edu.gplx.modules.rawvehicle.application;

import vn.edu.gplx.modules.rawvehicle.api.dto.*;
import vn.edu.gplx.modules.rawvehicle.domain.RawVehicleEnrollmentStatus;

import java.util.List;

public interface RawVehicleTrainingService {

    // --- Chức năng dành cho Học viên ---
    RawVehicleOverviewResponse getStudentOverview(Long studentId, Long categoryId);

    List<RawVehicleStageDto> getStudentStages(Long studentId);

    List<RawVehicleSessionDto> getStudentSessions(Long studentId);

    List<RawVehicleSkillEvaluationDto> getStudentEvaluations(Long studentId);

    // --- Chức năng dành cho Giáo viên ---
    List<RawVehicleEnrollmentSummaryDto> getInstructorAssignedStudents(Long instructorId);

    List<RawVehicleSessionDto> getInstructorSessions(Long instructorId);

    RawVehicleSessionDto getSessionDetail(Long sessionId, Long currentUserId, boolean isInstructorOrAdmin);

    RawVehicleSessionDto recordAttendance(Long sessionId, Long instructorId, RecordSessionAttendanceRequest request);

    RawVehicleSessionDto completeSession(Long sessionId, Long instructorId, CompleteSessionRequest request);

    RawVehicleSkillEvaluationDto evaluateSkill(Long instructorId, EvaluateSkillRequest request);

    // --- Chức năng dành cho Quản lý / Tuyển sinh / Quản trị viên ---
    RawVehicleEnrollmentSummaryDto enrollStudent(EnrollRawVehicleRequest request);

    List<RawVehicleEnrollmentSummaryDto> getAllEnrollments(Long categoryId, RawVehicleEnrollmentStatus status);

    RawVehicleSessionDto createSession(Long createdById, CreateRawVehicleSessionRequest request);

    RawVehicleSessionDto updateSession(Long sessionId, Long changedById, UpdateRawVehicleSessionRequest request);

    RawVehicleSessionDto cancelSession(Long sessionId, Long cancelledById, CancelRawVehicleSessionRequest request);

    List<RawVehicleSessionDto> getAllSessions();

    List<RawVehicleSessionChangeLogDto> getSessionChangeLogs(Long sessionId);

    List<RawVehicleStageDto> getAllStages();
}
