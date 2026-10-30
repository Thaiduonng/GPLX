package vn.edu.gplx.modules.rawvehicle.domain;

/**
 * Trạng thái Đăng ký tham gia đào tạo xe thô của học viên.
 */
public enum RawVehicleEnrollmentStatus {
    ENROLLED,      // Đã đăng ký, chờ xếp lịch
    IN_PROGRESS,   // Đang trong quá trình đào tạo
    COMPLETED,     // Đã hoàn thành 8 giai đoạn làm quen xe
    PAUSED         // Tạm hoãn / bảo lưu
}
