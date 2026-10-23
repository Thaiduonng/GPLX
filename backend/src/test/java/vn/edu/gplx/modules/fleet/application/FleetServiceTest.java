package vn.edu.gplx.modules.fleet.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import vn.edu.gplx.modules.admission.domain.LicenseCategory;
import vn.edu.gplx.modules.admission.infrastructure.LicenseCategoryRepository;
import vn.edu.gplx.modules.fleet.api.dto.CreateVehicleRequest;
import vn.edu.gplx.modules.fleet.api.dto.VehicleResponse;
import vn.edu.gplx.modules.fleet.application.impl.FleetServiceImpl;
import vn.edu.gplx.modules.fleet.domain.TransmissionType;
import vn.edu.gplx.modules.fleet.domain.Vehicle;
import vn.edu.gplx.modules.fleet.domain.VehicleStatus;
import vn.edu.gplx.modules.fleet.infrastructure.VehicleMaintenanceRepository;
import vn.edu.gplx.modules.fleet.infrastructure.VehicleRepository;
import vn.edu.gplx.shared.exception.BusinessRuleViolationException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FleetServiceTest {

    @Mock
    private VehicleRepository vehicleRepository;

    @Mock
    private VehicleMaintenanceRepository maintenanceRepository;

    @Mock
    private LicenseCategoryRepository categoryRepository;

    @InjectMocks
    private FleetServiceImpl fleetService;

    private LicenseCategory categoryB1;
    private Vehicle validVehicle;
    private Vehicle expiredVehicle;
    private Vehicle maintenanceVehicle;

    @BeforeEach
    void setUp() {
        categoryB1 = new LicenseCategory("B1", "Hạng B1 tự động", "Mô tả", 18, BigDecimal.valueOf(14000000));
        ReflectionTestUtils.setField(categoryB1, "id", 10L);

        // Xe hợp lệ: còn hạn đăng kiểm, trạng thái AVAILABLE
        validVehicle = new Vehicle("29A-123.45", "Toyota Vios 2023", categoryB1, TransmissionType.AUTOMATIC, LocalDate.now().plusMonths(6));
        ReflectionTestUtils.setField(validVehicle, "id", 1L);

        // Xe hết hạn đăng kiểm
        expiredVehicle = new Vehicle("29A-555.55", "Hyundai Accent", categoryB1, TransmissionType.AUTOMATIC, LocalDate.now().minusDays(10));
        ReflectionTestUtils.setField(expiredVehicle, "id", 2L);

        // Xe đang bảo dưỡng
        maintenanceVehicle = new Vehicle("29A-999.99", "Kia Cerato", categoryB1, TransmissionType.AUTOMATIC, LocalDate.now().plusMonths(3));
        maintenanceVehicle.setStatus(VehicleStatus.MAINTENANCE);
        ReflectionTestUtils.setField(maintenanceVehicle, "id", 3L);
    }

    @Test
    @DisplayName("FLT-001: getAvailableVehicles chỉ trả về xe trạng thái AVAILABLE và còn hạn đăng kiểm")
    void should_filterOut_expiredAndMaintenanceVehicles() {
        when(vehicleRepository.findByCategoryIdAndStatusAndInspectionExpiryDateAfter(10L, VehicleStatus.AVAILABLE, LocalDate.now()))
                .thenReturn(List.of(validVehicle));

        List<VehicleResponse> result = fleetService.getAvailableVehicles(10L);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).plateNumber()).isEqualTo("29A-123.45");
        assertThat(result.get(0).isInspectionValid()).isTrue();
    }

    @Test
    @DisplayName("Thêm xe tập lái mới thành công")
    void should_addVehicle_successfully() {
        CreateVehicleRequest request = new CreateVehicleRequest(
                "30H-888.88", "Mazda 3 2024", 10L, TransmissionType.AUTOMATIC, LocalDate.now().plusYears(1)
        );

        when(vehicleRepository.existsByPlateNumber("30H-888.88")).thenReturn(false);
        when(categoryRepository.findById(10L)).thenReturn(Optional.of(categoryB1));
        when(vehicleRepository.save(any(Vehicle.class))).thenAnswer(i -> {
            Vehicle v = i.getArgument(0);
            ReflectionTestUtils.setField(v, "id", 4L);
            return v;
        });

        VehicleResponse response = fleetService.addVehicle(request);

        assertThat(response).isNotNull();
        assertThat(response.plateNumber()).isEqualTo("30H-888.88");
        assertThat(response.status()).isEqualTo(VehicleStatus.AVAILABLE);
        verify(vehicleRepository).save(any(Vehicle.class));
    }

    @Test
    @DisplayName("Chặn thêm xe khi biển số đã tồn tại trong đội xe")
    void should_throwException_when_plateNumberDuplicated() {
        CreateVehicleRequest request = new CreateVehicleRequest(
                "29A-123.45", "Toyota Vios", 10L, TransmissionType.AUTOMATIC, LocalDate.now().plusYears(1)
        );

        when(vehicleRepository.existsByPlateNumber("29A-123.45")).thenReturn(true);

        assertThatThrownBy(() -> fleetService.addVehicle(request))
                .isInstanceOf(BusinessRuleViolationException.class)
                .hasMessageContaining("FLT-002");
    }
}
