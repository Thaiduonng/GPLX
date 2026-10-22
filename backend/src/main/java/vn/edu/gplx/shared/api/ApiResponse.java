package vn.edu.gplx.shared.api;

import java.time.Instant;

/**
 * Standard API Response Wrapper.
 *
 * @param success   Trạng thái thành công
 * @param message   Thông điệp phản hồi
 * @param data      Dữ liệu trả về
 * @param timestamp Thời điểm phản hồi
 * @param <T>       Kiểu dữ liệu dữ liệu phản hồi
 */
public record ApiResponse<T>(
        boolean success,
        String message,
        T data,
        Instant timestamp
) {

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, "Thao tác thành công", data, Instant.now());
    }

    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(true, message, data, Instant.now());
    }

    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, message, null, Instant.now());
    }
}
