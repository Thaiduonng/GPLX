package vn.edu.gplx.modules.learning.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.gplx.modules.learning.api.dto.TrafficSignResponse;
import vn.edu.gplx.modules.learning.api.dto.TrafficSignUpdateRequest;
import vn.edu.gplx.modules.learning.application.TrafficSignService;
import vn.edu.gplx.modules.learning.domain.TrafficSignGroup;
import vn.edu.gplx.shared.api.ApiResponse;

@Tag(name = "Traffic Signs", description = "Danh mục biển báo hiệu đường bộ")
@SecurityRequirement(name = "bearerAuth")
@RestController
@RequestMapping("/api/v1/learning/traffic-signs")
@PreAuthorize("isAuthenticated()")
public class TrafficSignController {

    private static final int MAX_PAGE_SIZE = 100;

    private final TrafficSignService trafficSignService;

    public TrafficSignController(TrafficSignService trafficSignService) {
        this.trafficSignService = trafficSignService;
    }

    @Operation(summary = "Tra cứu danh mục biển báo (tìm theo mã/tên, không phân biệt dấu; lọc theo nhóm)")
    @GetMapping
    public ResponseEntity<ApiResponse<Page<TrafficSignResponse>>> search(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) TrafficSignGroup group,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "24") int size) {
        int safeSize = Math.min(Math.max(size, 1), MAX_PAGE_SIZE);
        Page<TrafficSignResponse> result = trafficSignService.search(q, group, PageRequest.of(Math.max(page, 0), safeSize));
        return ResponseEntity.ok(ApiResponse.success(result));
    }

    @Operation(summary = "Xem chi tiết một biển báo theo mã")
    @GetMapping("/{code}")
    public ResponseEntity<ApiResponse<TrafficSignResponse>> getByCode(@PathVariable String code) {
        return ResponseEntity.ok(ApiResponse.success(trafficSignService.getByCode(code)));
    }

    @Operation(summary = "Cập nhật thông tin biển báo (Quản trị viên, Quản lý)")
    @PutMapping("/{code}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    public ResponseEntity<ApiResponse<TrafficSignResponse>> update(
            @PathVariable String code,
            @Valid @RequestBody TrafficSignUpdateRequest request) {
        TrafficSignResponse updated = trafficSignService.update(code, request);
        return ResponseEntity.ok(ApiResponse.success("Đã cập nhật biển báo", updated));
    }
}
