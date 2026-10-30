package vn.edu.gplx.modules.rawvehicle.domain;

/**
 * Trạng thái của buổi thực hành xe thô.
 */
public enum RawVehicleSessionStatus {
    SCHEDULED,    // Đã lên lịch dự kiến
    CONFIRMED,    // Đã xác nhận giáo viên & xe
    IN_PROGRESS,  // Đang diễn ra
    COMPLETED,    // Đã hoàn thành (có ghi nhận thời gian thực tế)
    CANCELLED     // Đã hủy lịch
}
