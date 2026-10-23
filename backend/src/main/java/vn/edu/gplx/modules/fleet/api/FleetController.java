package vn.edu.gplx.modules.fleet.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.gplx.modules.fleet.api.dto.CreateVehicleRequest;
import vn.edu.gplx.modules.fleet.api.dto.LogMaintenanceRequest;
import vn.edu.gplx.modules.fleet.api.dto.MaintenanceResponse;
import vn.edu.gplx.modules.fleet.api.dto.VehicleResponse;
import vn.edu.gplx.modules.fleet.application.FleetService;
import vn.edu.gplx.modules.fleet.domain.VehicleStatus;
import vn.edu.gplx.shared.api.ApiResponse;

import java.util.List;

@Tag(name = "Fleet Management", description = "Quản lý xe tập lái & lịch bảo dưỡng (FLT-001)")
@RestController
@RequestMapping("/api/v1/fleet")
public class FleetController {

    private final FleetService fleetService;

    public FleetController(FleetService fleetService) {
        this.fleetService = fleetService;
    }

    @Operation(summary = "Lấy danh sách xe tập lái sẵn sàng hoạt động (FLT-001 - Còn hạn đăng kiểm)")
    @GetMapping("/available")
    public ResponseEntity<ApiResponse<List<VehicleResponse>>> getAvailableVehicles(
            @RequestParam(required = false) Long categoryId) {
        List<VehicleResponse> vehicles = fleetService.getAvailableVehicles(categoryId);
        return ResponseEntity.ok(ApiResponse.success(vehicles));
    }

    @Operation(summary = "Lấy danh sách toàn bộ phương tiện trong đội xe")
    @GetMapping
    public ResponseEntity<ApiResponse<List<VehicleResponse>>> getAllVehicles(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) VehicleStatus status) {
        List<VehicleResponse> vehicles = fleetService.getAllVehicles(categoryId, status);
        return ResponseEntity.ok(ApiResponse.success(vehicles));
    }

    @Operation(summary = "Xem thông tin chi tiết một phương tiện")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<VehicleResponse>> getVehicleById(@PathVariable Long id) {
        VehicleResponse vehicle = fleetService.getVehicleById(id);
        return ResponseEntity.ok(ApiResponse.success(vehicle));
    }

    @Operation(summary = "Thêm xe tập lái mới vào hệ thống (Role: ADMIN, MANAGER)")
    @SecurityRequirement(name = "BearerAuth")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PostMapping
    public ResponseEntity<ApiResponse<VehicleResponse>> addVehicle(
            @Valid @RequestBody CreateVehicleRequest request) {
        VehicleResponse response = fleetService.addVehicle(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Thêm xe tập lái mới thành công", response));
    }

    @Operation(summary = "Cập nhật trạng thái xe (Role: ADMIN, MANAGER, INSTRUCTOR)")
    @SecurityRequirement(name = "BearerAuth")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'INSTRUCTOR')")
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<VehicleResponse>> updateStatus(
            @PathVariable Long id,
            @RequestParam VehicleStatus status) {
        VehicleResponse response = fleetService.updateVehicleStatus(id, status);
        return ResponseEntity.ok(ApiResponse.success("Cập nhật trạng thái xe thành công", response));
    }

    @Operation(summary = "Ghi nhận lịch bảo dưỡng / sửa chữa phương tiện (Role: ADMIN, MANAGER)")
    @SecurityRequirement(name = "BearerAuth")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PostMapping("/{id}/maintenances")
    public ResponseEntity<ApiResponse<MaintenanceResponse>> logMaintenance(
            @PathVariable Long id,
            @Valid @RequestBody LogMaintenanceRequest request) {
        MaintenanceResponse response = fleetService.logMaintenance(id, request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Ghi nhận bảo dưỡng xe thành công", response));
    }

    @Operation(summary = "Xem lịch sử bảo dưỡng của một phương tiện")
    @GetMapping("/{id}/maintenances")
    public ResponseEntity<ApiResponse<List<MaintenanceResponse>>> getMaintenances(@PathVariable Long id) {
        List<MaintenanceResponse> maintenances = fleetService.getMaintenancesByVehicle(id);
        return ResponseEntity.ok(ApiResponse.success(maintenances));
    }
}
