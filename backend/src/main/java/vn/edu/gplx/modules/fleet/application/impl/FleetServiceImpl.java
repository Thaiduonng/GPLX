package vn.edu.gplx.modules.fleet.application.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.admission.domain.LicenseCategory;
import vn.edu.gplx.modules.admission.infrastructure.LicenseCategoryRepository;
import vn.edu.gplx.modules.fleet.api.dto.CreateVehicleRequest;
import vn.edu.gplx.modules.fleet.api.dto.LogMaintenanceRequest;
import vn.edu.gplx.modules.fleet.api.dto.MaintenanceResponse;
import vn.edu.gplx.modules.fleet.api.dto.VehicleResponse;
import vn.edu.gplx.modules.fleet.application.FleetService;
import vn.edu.gplx.modules.fleet.domain.Vehicle;
import vn.edu.gplx.modules.fleet.domain.VehicleMaintenance;
import vn.edu.gplx.modules.fleet.domain.VehicleStatus;
import vn.edu.gplx.modules.fleet.infrastructure.VehicleMaintenanceRepository;
import vn.edu.gplx.modules.fleet.infrastructure.VehicleRepository;
import vn.edu.gplx.shared.exception.BusinessRuleViolationException;
import vn.edu.gplx.shared.exception.ResourceNotFoundException;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class FleetServiceImpl implements FleetService {

    private static final Logger log = LoggerFactory.getLogger(FleetServiceImpl.class);

    private final VehicleRepository vehicleRepository;
    private final VehicleMaintenanceRepository maintenanceRepository;
    private final LicenseCategoryRepository categoryRepository;

    public FleetServiceImpl(VehicleRepository vehicleRepository,
                            VehicleMaintenanceRepository maintenanceRepository,
                            LicenseCategoryRepository categoryRepository) {
        this.vehicleRepository = vehicleRepository;
        this.maintenanceRepository = maintenanceRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public VehicleResponse addVehicle(CreateVehicleRequest request) {
        log.info("Adding new training vehicle: plateNumber={}, model={}", request.plateNumber(), request.model());

        if (vehicleRepository.existsByPlateNumber(request.plateNumber())) {
            throw new BusinessRuleViolationException("FLT-002", "Biển số xe " + request.plateNumber() + " đã tồn tại trong đội xe.");
        }

        LicenseCategory category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new ResourceNotFoundException("LicenseCategory", "id", request.categoryId()));

        Vehicle vehicle = new Vehicle(
                request.plateNumber(),
                request.model(),
                category,
                request.transmission(),
                request.inspectionExpiryDate()
        );

        Vehicle saved = vehicleRepository.save(vehicle);
        return toVehicleResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<VehicleResponse> getAllVehicles(Long categoryId, VehicleStatus status) {
        List<Vehicle> list;
        if (categoryId != null) {
            list = vehicleRepository.findByCategoryId(categoryId);
        } else if (status != null) {
            list = vehicleRepository.findByStatus(status);
        } else {
            list = vehicleRepository.findAll();
        }

        return list.stream().map(this::toVehicleResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<VehicleResponse> getAvailableVehicles(Long categoryId) {
        // FLT-001: Chỉ lấy các xe đang AVAILABLE và hạn đăng kiểm còn hiệu lực
        LocalDate today = LocalDate.now();
        List<Vehicle> list;

        if (categoryId != null) {
            list = vehicleRepository.findByCategoryIdAndStatusAndInspectionExpiryDateAfter(
                    categoryId, VehicleStatus.AVAILABLE, today
            );
        } else {
            list = vehicleRepository.findByStatus(VehicleStatus.AVAILABLE).stream()
                    .filter(v -> v.getInspectionExpiryDate().isAfter(today))
                    .toList();
        }

        return list.stream().map(this::toVehicleResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public VehicleResponse getVehicleById(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle", "id", id));
        return toVehicleResponse(vehicle);
    }

    @Override
    public VehicleResponse updateVehicleStatus(Long id, VehicleStatus status) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle", "id", id));

        vehicle.setStatus(status);
        Vehicle saved = vehicleRepository.save(vehicle);
        return toVehicleResponse(saved);
    }

    @Override
    public MaintenanceResponse logMaintenance(Long vehicleId, LogMaintenanceRequest request) {
        log.info("Logging maintenance for vehicleId: {}, date: {}", vehicleId, request.maintenanceDate());

        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new ResourceNotFoundException("Vehicle", "id", vehicleId));

        VehicleMaintenance maintenance = new VehicleMaintenance(
                vehicle,
                request.maintenanceDate(),
                request.description(),
                request.cost(),
                request.performedBy()
        );

        VehicleMaintenance saved = maintenanceRepository.save(maintenance);

        // Đánh dấu xe đang bảo dưỡng nếu bảo dưỡng diễn ra hôm nay
        if (request.maintenanceDate().equals(LocalDate.now())) {
            vehicle.setStatus(VehicleStatus.MAINTENANCE);
            vehicleRepository.save(vehicle);
        }

        return toMaintenanceResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MaintenanceResponse> getMaintenancesByVehicle(Long vehicleId) {
        List<VehicleMaintenance> list = maintenanceRepository.findByVehicleIdOrderByMaintenanceDateDesc(vehicleId);
        return list.stream().map(this::toMaintenanceResponse).toList();
    }

    private VehicleResponse toVehicleResponse(Vehicle vehicle) {
        boolean isInspectionValid = vehicle.getInspectionExpiryDate().isAfter(LocalDate.now());

        return new VehicleResponse(
                vehicle.getId(),
                vehicle.getPlateNumber(),
                vehicle.getModel(),
                vehicle.getCategory().getId(),
                vehicle.getCategory().getCode(),
                vehicle.getTransmission(),
                vehicle.getStatus(),
                vehicle.getInspectionExpiryDate(),
                isInspectionValid,
                vehicle.getCreatedAt()
        );
    }

    private MaintenanceResponse toMaintenanceResponse(VehicleMaintenance m) {
        return new MaintenanceResponse(
                m.getId(),
                m.getVehicle().getId(),
                m.getVehicle().getPlateNumber(),
                m.getMaintenanceDate(),
                m.getDescription(),
                m.getCost(),
                m.getPerformedBy(),
                m.getCreatedAt()
        );
    }
}
