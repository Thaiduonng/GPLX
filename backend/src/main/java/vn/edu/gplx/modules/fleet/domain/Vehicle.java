package vn.edu.gplx.modules.fleet.domain;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import vn.edu.gplx.modules.admission.domain.LicenseCategory;
import vn.edu.gplx.shared.domain.BaseEntity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "vehicles")
public class Vehicle extends BaseEntity {

    @Column(name = "plate_number", nullable = false, unique = true, length = 20)
    private String plateNumber;

    @Column(name = "model", nullable = false, length = 100)
    private String model;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private LicenseCategory category;

    @Enumerated(EnumType.STRING)
    @Column(name = "transmission", nullable = false, length = 20)
    private TransmissionType transmission = TransmissionType.MANUAL;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    private VehicleStatus status = VehicleStatus.AVAILABLE;

    @Column(name = "inspection_expiry_date", nullable = false)
    private LocalDate inspectionExpiryDate;

    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("maintenanceDate DESC")
    private List<VehicleMaintenance> maintenances = new ArrayList<>();

    public Vehicle() {
    }

    public Vehicle(String plateNumber, String model, LicenseCategory category,
                   TransmissionType transmission, LocalDate inspectionExpiryDate) {
        this.plateNumber = plateNumber;
        this.model = model;
        this.category = category;
        this.transmission = transmission;
        this.inspectionExpiryDate = inspectionExpiryDate;
        this.status = VehicleStatus.AVAILABLE;
    }

    public String getPlateNumber() {
        return plateNumber;
    }

    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public LicenseCategory getCategory() {
        return category;
    }

    public void setCategory(LicenseCategory category) {
        this.category = category;
    }

    public TransmissionType getTransmission() {
        return transmission;
    }

    public void setTransmission(TransmissionType transmission) {
        this.transmission = transmission;
    }

    public VehicleStatus getStatus() {
        return status;
    }

    public void setStatus(VehicleStatus status) {
        this.status = status;
    }

    public LocalDate getInspectionExpiryDate() {
        return inspectionExpiryDate;
    }

    public void setInspectionExpiryDate(LocalDate inspectionExpiryDate) {
        this.inspectionExpiryDate = inspectionExpiryDate;
    }

    public List<VehicleMaintenance> getMaintenances() {
        return maintenances;
    }

    public void addMaintenance(VehicleMaintenance maintenance) {
        this.maintenances.add(maintenance);
        maintenance.setVehicle(this);
    }
}
