package vn.edu.gplx.modules.identity.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.gplx.shared.api.ApiResponse;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * REST Endpoint for Health & Readiness Status Verification.
 */
@RestController
@RequestMapping("/api/v1/health")
@Tag(name = "Health Check", description = "Kiểm tra tình trạng hoạt động của hệ thống")
public class HealthController {

    @GetMapping
    @Operation(summary = "Kiểm tra tình trạng sống", description = "Trả về trạng thái UP, phiên bản và thời điểm hiện tại")
    public ApiResponse<Map<String, Object>> getHealth() {
        Map<String, Object> healthInfo = new LinkedHashMap<>();
        healthInfo.put("status", "UP");
        healthInfo.put("application", "GPLX Training System");
        healthInfo.put("version", "0.1.0");
        healthInfo.put("timestamp", Instant.now().toString());
        healthInfo.put("framework", "Spring Boot 4.1.1 (Java 21)");
        return ApiResponse.success("Hệ thống hoạt động bình thường", healthInfo);
    }
}
