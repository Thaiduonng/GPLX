package vn.edu.gplx.modules.fleet.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.fleet.domain.VehicleMaintenance;

import java.util.List;

@Repository
public interface VehicleMaintenanceRepository extends JpaRepository<VehicleMaintenance, Long> {

    List<VehicleMaintenance> findByVehicleIdOrderByMaintenanceDateDesc(Long vehicleId);
}
