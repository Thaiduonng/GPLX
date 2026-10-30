package vn.edu.gplx.modules.rawvehicle.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import vn.edu.gplx.modules.identity.domain.User;
import vn.edu.gplx.shared.domain.BaseEntity;

import java.time.LocalDateTime;

/**
 * Học viên tham gia và kết quả điểm danh của buổi thực hành xe thô.
 */
@Entity
@Table(name = "raw_vehicle_session_attendees")
public class RawVehicleSessionAttendee extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session_id", nullable = false)
    private RawVehicleSession session;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enrollment_id", nullable = false)
    private RawVehicleEnrollment enrollment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @Enumerated(EnumType.STRING)
    @Column(name = "attendance_status", nullable = false, length = 30)
    private AttendeeAttendanceStatus attendanceStatus = AttendeeAttendanceStatus.NOT_YET;

    @Column(name = "attended_at")
    private LocalDateTime attendedAt;

    @Column(name = "instructor_feedback", columnDefinition = "TEXT")
    private String instructorFeedback;

    @Column(name = "skills_to_improve", columnDefinition = "TEXT")
    private String skillsToImprove;

    public RawVehicleSessionAttendee() {
    }

    public RawVehicleSessionAttendee(RawVehicleSession session, RawVehicleEnrollment enrollment, User student) {
        this.session = session;
        this.enrollment = enrollment;
        this.student = student;
        this.attendanceStatus = AttendeeAttendanceStatus.NOT_YET;
    }

    public RawVehicleSession getSession() {
        return session;
    }

    public void setSession(RawVehicleSession session) {
        this.session = session;
    }

    public RawVehicleEnrollment getEnrollment() {
        return enrollment;
    }

    public void setEnrollment(RawVehicleEnrollment enrollment) {
        this.enrollment = enrollment;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public AttendeeAttendanceStatus getAttendanceStatus() {
        return attendanceStatus;
    }

    public void setAttendanceStatus(AttendeeAttendanceStatus attendanceStatus) {
        this.attendanceStatus = attendanceStatus;
    }

    public LocalDateTime getAttendedAt() {
        return attendedAt;
    }

    public void setAttendedAt(LocalDateTime attendedAt) {
        this.attendedAt = attendedAt;
    }

    public String getInstructorFeedback() {
        return instructorFeedback;
    }

    public void setInstructorFeedback(String instructorFeedback) {
        this.instructorFeedback = instructorFeedback;
    }

    public String getSkillsToImprove() {
        return skillsToImprove;
    }

    public void setSkillsToImprove(String skillsToImprove) {
        this.skillsToImprove = skillsToImprove;
    }
}
