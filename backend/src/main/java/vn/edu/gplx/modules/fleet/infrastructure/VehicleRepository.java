package vn.edu.gplx.modules.fleet.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.fleet.domain.Vehicle;
import vn.edu.gplx.modules.fleet.domain.VehicleStatus;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    Optional<Vehicle> findByPlateNumber(String plateNumber);

    boolean existsByPlateNumber(String plateNumber);

    List<Vehicle> findByCategoryId(Long categoryId);

    List<Vehicle> findByStatus(VehicleStatus status);

    // FLT-001: Tìm các xe sẵn sàng hoạt động (status = AVAILABLE và chưa hết hạn đăng kiểm)
    List<Vehicle> findByCategoryIdAndStatusAndInspectionExpiryDateAfter(
            Long categoryId, VehicleStatus status, LocalDate currentDate
    );
}
