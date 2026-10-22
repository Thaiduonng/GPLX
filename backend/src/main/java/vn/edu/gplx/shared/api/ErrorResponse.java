package vn.edu.gplx.shared.api;

import java.time.Instant;
import java.util.List;

/**
 * Standard Error Response Payload.
 */
public record ErrorResponse(
        Instant timestamp,
        int status,
        String error,
        String message,
        String path,
        List<FieldErrorDetail> details
) {

    public record FieldErrorDetail(String field, String message) {
    }

    public static ErrorResponse of(int status, String error, String message, String path) {
        return new ErrorResponse(Instant.now(), status, error, message, path, null);
    }

    public static ErrorResponse of(int status, String error, String message, String path, List<FieldErrorDetail> details) {
        return new ErrorResponse(Instant.now(), status, error, message, path, details);
    }
}
