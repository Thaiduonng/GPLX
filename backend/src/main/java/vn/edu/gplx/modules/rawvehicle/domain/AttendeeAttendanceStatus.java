package vn.edu.gplx.modules.rawvehicle.domain;

/**
 * Trạng thái điểm danh học viên trong buổi học xe thô.
 */
public enum AttendeeAttendanceStatus {
    NOT_YET,   // Chưa điểm danh
    PRESENT,   // Có mặt tham gia thực hành
    ABSENT,    // Vắng mặt không phép
    EXCUSED    // Vắng mặt có phép / xin đổi lịch
}
