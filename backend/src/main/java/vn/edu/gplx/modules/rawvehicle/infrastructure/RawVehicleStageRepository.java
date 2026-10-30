package vn.edu.gplx.modules.rawvehicle.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.rawvehicle.domain.RawVehicleStage;

import java.util.List;
import java.util.Optional;

@Repository
public interface RawVehicleStageRepository extends JpaRepository<RawVehicleStage, Long> {

    Optional<RawVehicleStage> findByStageCode(String stageCode);

    List<RawVehicleStage> findAllByOrderByStepOrderAsc();
}
