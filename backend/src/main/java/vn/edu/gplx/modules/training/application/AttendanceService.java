package vn.edu.gplx.modules.training.application;

import vn.edu.gplx.modules.training.api.dto.AttendanceResponse;
import vn.edu.gplx.modules.training.api.dto.CheckAttendanceRequest;

import java.util.List;

public interface AttendanceService {

    AttendanceResponse recordAttendance(CheckAttendanceRequest request);

    List<AttendanceResponse> getAttendanceBySchedule(Long scheduleId);

    List<AttendanceResponse> getMyAttendance(Long studentId);
}
