package vn.edu.gplx.modules.rawvehicle.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import vn.edu.gplx.modules.fleet.domain.Vehicle;
import vn.edu.gplx.modules.identity.domain.User;
import vn.edu.gplx.shared.domain.BaseEntity;

import java.time.LocalDateTime;

/**
 * Buổi thực hành xe thô theo lịch.
 */
@Entity
@Table(name = "raw_vehicle_sessions")
public class RawVehicleSession extends BaseEntity {

    @Column(name = "session_code", nullable = false, unique = true, length = 50)
    private String sessionCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "instructor_id", nullable = false)
    private User instructor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stage_id")
    private RawVehicleStage stage;

    @Column(name = "practice_location", nullable = false, length = 255)
    private String practiceLocation;

    @Column(name = "scheduled_start_time", nullable = false)
    private LocalDateTime scheduledStartTime;

    @Column(name = "scheduled_end_time", nullable = false)
    private LocalDateTime scheduledEndTime;

    @Column(name = "actual_start_time")
    private LocalDateTime actualStartTime;

    @Column(name = "actual_end_time")
    private LocalDateTime actualEndTime;

    @Column(name = "actual_duration_minutes", nullable = false)
    private Integer actualDurationMinutes = 0;

    @Column(name = "max_students", nullable = false)
    private Integer maxStudents = 2;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    private RawVehicleSessionStatus status = RawVehicleSessionStatus.SCHEDULED;

    @Column(name = "safety_checklist_passed", nullable = false)
    private Boolean safetyChecklistPassed = false;

    @Column(name = "instructor_notes", columnDefinition = "TEXT")
    private String instructorNotes;

    @Column(name = "cancel_reason", length = 255)
    private String cancelReason;

    public RawVehicleSession() {
    }

    public RawVehicleSession(String sessionCode, User instructor, Vehicle vehicle, RawVehicleStage stage,
                             String practiceLocation, LocalDateTime scheduledStartTime, LocalDateTime scheduledEndTime,
                             Integer maxStudents) {
        this.sessionCode = sessionCode;
        this.instructor = instructor;
        this.vehicle = vehicle;
        this.stage = stage;
        this.practiceLocation = practiceLocation;
        this.scheduledStartTime = scheduledStartTime;
        this.scheduledEndTime = scheduledEndTime;
        this.maxStudents = maxStudents;
        this.status = RawVehicleSessionStatus.SCHEDULED;
    }

    public String getSessionCode() {
        return sessionCode;
    }

    public void setSessionCode(String sessionCode) {
        this.sessionCode = sessionCode;
    }

    public User getInstructor() {
        return instructor;
    }

    public void setInstructor(User instructor) {
        this.instructor = instructor;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public RawVehicleStage getStage() {
        return stage;
    }

    public void setStage(RawVehicleStage stage) {
        this.stage = stage;
    }

    public String getPracticeLocation() {
        return practiceLocation;
    }

    public void setPracticeLocation(String practiceLocation) {
        this.practiceLocation = practiceLocation;
    }

    public LocalDateTime getScheduledStartTime() {
        return scheduledStartTime;
    }

    public void setScheduledStartTime(LocalDateTime scheduledStartTime) {
        this.scheduledStartTime = scheduledStartTime;
    }

    public LocalDateTime getScheduledEndTime() {
        return scheduledEndTime;
    }

    public void setScheduledEndTime(LocalDateTime scheduledEndTime) {
        this.scheduledEndTime = scheduledEndTime;
    }

    public LocalDateTime getActualStartTime() {
        return actualStartTime;
    }

    public void setActualStartTime(LocalDateTime actualStartTime) {
        this.actualStartTime = actualStartTime;
    }

    public LocalDateTime getActualEndTime() {
        return actualEndTime;
    }

    public void setActualEndTime(LocalDateTime actualEndTime) {
        this.actualEndTime = actualEndTime;
    }

    public Integer getActualDurationMinutes() {
        return actualDurationMinutes;
    }

    public void setActualDurationMinutes(Integer actualDurationMinutes) {
        this.actualDurationMinutes = actualDurationMinutes;
    }

    public Integer getMaxStudents() {
        return maxStudents;
    }

    public void setMaxStudents(Integer maxStudents) {
        this.maxStudents = maxStudents;
    }

    public RawVehicleSessionStatus getStatus() {
        return status;
    }

    public void setStatus(RawVehicleSessionStatus status) {
        this.status = status;
    }

    public Boolean getSafetyChecklistPassed() {
        return safetyChecklistPassed;
    }

    public void setSafetyChecklistPassed(Boolean safetyChecklistPassed) {
        this.safetyChecklistPassed = safetyChecklistPassed;
    }

    public String getInstructorNotes() {
        return instructorNotes;
    }

    public void setInstructorNotes(String instructorNotes) {
        this.instructorNotes = instructorNotes;
    }

    public String getCancelReason() {
        return cancelReason;
    }

    public void setCancelReason(String cancelReason) {
        this.cancelReason = cancelReason;
    }
}
