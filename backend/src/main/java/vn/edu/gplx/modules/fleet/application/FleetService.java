package vn.edu.gplx.modules.fleet.application;

import vn.edu.gplx.modules.fleet.api.dto.CreateVehicleRequest;
import vn.edu.gplx.modules.fleet.api.dto.LogMaintenanceRequest;
import vn.edu.gplx.modules.fleet.api.dto.MaintenanceResponse;
import vn.edu.gplx.modules.fleet.api.dto.VehicleResponse;
import vn.edu.gplx.modules.fleet.domain.VehicleStatus;

import java.util.List;

public interface FleetService {

    VehicleResponse addVehicle(CreateVehicleRequest request);

    List<VehicleResponse> getAllVehicles(Long categoryId, VehicleStatus status);

    List<VehicleResponse> getAvailableVehicles(Long categoryId);

    VehicleResponse getVehicleById(Long id);

    VehicleResponse updateVehicleStatus(Long id, VehicleStatus status);

    MaintenanceResponse logMaintenance(Long vehicleId, LogMaintenanceRequest request);

    List<MaintenanceResponse> getMaintenancesByVehicle(Long vehicleId);
}
