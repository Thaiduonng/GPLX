package vn.edu.gplx.modules.reporting.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Pageable;
import org.springframework.test.util.ReflectionTestUtils;
import vn.edu.gplx.modules.admission.domain.AdmissionApplication;
import vn.edu.gplx.modules.admission.domain.ApplicationStatus;
import vn.edu.gplx.modules.admission.domain.Gender;
import vn.edu.gplx.modules.admission.domain.LicenseCategory;
import vn.edu.gplx.modules.admission.infrastructure.AdmissionApplicationRepository;
import vn.edu.gplx.modules.admission.infrastructure.LicenseCategoryRepository;
import vn.edu.gplx.modules.examination.domain.CandidateEligibility;
import vn.edu.gplx.modules.examination.domain.ExamCandidate;
import vn.edu.gplx.modules.examination.domain.ExamResult;
import vn.edu.gplx.modules.examination.domain.ExamSession;
import vn.edu.gplx.modules.examination.domain.ExamType;
import vn.edu.gplx.modules.examination.domain.FinalExamResult;
import vn.edu.gplx.modules.examination.infrastructure.ExamCandidateRepository;
import vn.edu.gplx.modules.examination.infrastructure.ExamResultRepository;
import vn.edu.gplx.modules.finance.domain.FeeInvoice;
import vn.edu.gplx.modules.finance.domain.PaymentMethod;
import vn.edu.gplx.modules.finance.domain.PaymentReceipt;
import vn.edu.gplx.modules.finance.infrastructure.PaymentReceiptRepository;
import vn.edu.gplx.modules.fleet.domain.TransmissionType;
import vn.edu.gplx.modules.fleet.domain.Vehicle;
import vn.edu.gplx.modules.fleet.domain.VehicleStatus;
import vn.edu.gplx.modules.fleet.infrastructure.VehicleRepository;
import vn.edu.gplx.modules.identity.domain.User;
import vn.edu.gplx.modules.identity.infrastructure.UserRepository;
import vn.edu.gplx.modules.reporting.api.dto.AuditLogResponse;
import vn.edu.gplx.modules.reporting.api.dto.DashboardSummaryResponse;
import vn.edu.gplx.modules.reporting.application.impl.ReportingServiceImpl;
import vn.edu.gplx.modules.reporting.domain.AuditLog;
import vn.edu.gplx.modules.reporting.infrastructure.AuditLogRepository;
import vn.edu.gplx.modules.training.domain.DatPracticeSession;
import vn.edu.gplx.modules.training.infrastructure.DatPracticeSessionRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReportingServiceTest {

    @Mock
    private AuditLogRepository auditLogRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private AdmissionApplicationRepository applicationRepository;
    @Mock
    private LicenseCategoryRepository categoryRepository;
    @Mock
    private ExamCandidateRepository candidateRepository;
    @Mock
    private ExamResultRepository resultRepository;
    @Mock
    private PaymentReceiptRepository receiptRepository;
    @Mock
    private DatPracticeSessionRepository datSessionRepository;
    @Mock
    private VehicleRepository vehicleRepository;

    @InjectMocks
    private ReportingServiceImpl reportingService;

    private User sampleUser;
    private LicenseCategory catB1;

    @BeforeEach
    void setUp() {
        sampleUser = new User("student_test", "student@gmail.com", "pass", "Nguyen Van A", "0900000000");
        ReflectionTestUtils.setField(sampleUser, "id", 100L);

        catB1 = new LicenseCategory("B1", "Hạng B1", "Mô tả", 18, BigDecimal.valueOf(14000000));
        ReflectionTestUtils.setField(catB1, "id", 10L);
    }

    @Test
    @DisplayName("Dashboard Summary should calculate KPIs and pass rate correctly")
    void should_calculateDashboardSummary_correctly() {
        // 1. Users
        when(userRepository.count()).thenReturn(50L);

        // 2. Applications
        AdmissionApplication app1 = new AdmissionApplication(
                "APP-001", 100L, catB1, "Nguyen Van A", "001234567890",
                LocalDate.of(2000, 1, 1), Gender.MALE, "0900000000", "student@gmail.com", "Ha Noi"
        );
        app1.setStatus(ApplicationStatus.APPROVED);
        AdmissionApplication app2 = new AdmissionApplication(
                "APP-002", 101L, catB1, "Tran Van B", "001234567891",
                LocalDate.of(1999, 1, 1), Gender.MALE, "0900000001", "student2@gmail.com", "Ha Noi"
        );
        app2.setStatus(ApplicationStatus.SUBMITTED);
        when(applicationRepository.findAll()).thenReturn(List.of(app1, app2));

        // 3. Exam Candidates & Results
        ExamSession session = new ExamSession("EX-001", "Kỳ thi sát hạch B1", catB1, LocalDate.now(), "San sat hach 1", ExamType.CERTIFICATION);
        ExamCandidate cand1 = new ExamCandidate(session, 100L, "SBD01", CandidateEligibility.QUALIFIED, null);
        ExamResult res1 = new ExamResult(cand1);
        res1.setFinalResult(FinalExamResult.PASSED);
        cand1.setResult(res1);

        ExamCandidate cand2 = new ExamCandidate(session, 101L, "SBD02", CandidateEligibility.QUALIFIED, null);
        ExamResult res2 = new ExamResult(cand2);
        res2.setFinalResult(FinalExamResult.FAILED);
        cand2.setResult(res2);

        when(candidateRepository.findAll()).thenReturn(List.of(cand1, cand2));
        when(resultRepository.findByFinalResult(FinalExamResult.PASSED)).thenReturn(List.of(res1));

        // 4. Receipts
        FeeInvoice invoice = new FeeInvoice("INV-001", sampleUser, catB1, BigDecimal.valueOf(14000000), LocalDate.now().plusMonths(1));
        PaymentReceipt receipt = new PaymentReceipt("REC-001", invoice, BigDecimal.valueOf(14000000), PaymentMethod.BANK_TRANSFER, "TXN123", sampleUser, "idemp-01");
        when(receiptRepository.findAll()).thenReturn(List.of(receipt));

        // 5. DAT Sessions
        DatPracticeSession datSession = new DatPracticeSession(
                100L, 200L, "HIGHWAY",
                LocalDateTime.now().minusHours(2), LocalDateTime.now(),
                BigDecimal.valueOf(50.5), 120, "DEV-01", "Tot"
        );
        when(datSessionRepository.findAll()).thenReturn(List.of(datSession));

        // 6. Vehicles
        Vehicle v1 = new Vehicle("29A-99999", "Toyota Vios", catB1, TransmissionType.AUTOMATIC, LocalDate.now().plusMonths(6));
        v1.setStatus(VehicleStatus.AVAILABLE);
        when(vehicleRepository.findAll()).thenReturn(List.of(v1));

        // 7. Categories & Audit
        when(categoryRepository.findByIsActiveTrueOrderByCodeAsc()).thenReturn(List.of(catB1));
        when(auditLogRepository.findAllByOrderByCreatedAtDesc(any(Pageable.class))).thenReturn(List.of());

        // Act
        DashboardSummaryResponse summary = reportingService.getDashboardSummary();

        // Assert
        assertNotNull(summary);
        assertEquals(50L, summary.totalStudents());
        assertEquals(2L, summary.totalApplications());
        assertEquals(1L, summary.approvedApplications());
        assertEquals(2L, summary.totalExamCandidates());
        assertEquals(1L, summary.totalPassedCandidates());
        assertEquals(50.0, summary.overallPassRate());
        assertEquals(BigDecimal.valueOf(14000000), summary.totalTuitionRevenue());
        assertEquals(BigDecimal.valueOf(50.5), summary.totalDatDistanceKm());
        assertEquals(1L, summary.totalVehicles());
        assertEquals(1L, summary.availableVehicles());
        assertEquals(1, summary.categoryStats().size());
        assertEquals("B1", summary.categoryStats().get(0).categoryCode());
        assertEquals(50.0, summary.categoryStats().get(0).passRate());
    }

    @Test
    @DisplayName("Audit logs should be queried and mapped properly")
    void should_getAuditLogs_correctly() {
        AuditLog log1 = new AuditLog(1L, "admin", "APPROVE_APPLICATION", "ADMISSION", "10", "Duyệt hồ sơ thành công", "127.0.0.1");
        when(auditLogRepository.findByResourceTypeOrderByCreatedAtDesc(eq("ADMISSION"), any(Pageable.class)))
                .thenReturn(List.of(log1));

        List<AuditLogResponse> logs = reportingService.getAuditLogs("ADMISSION", null, 0, 10);

        assertNotNull(logs);
        assertEquals(1, logs.size());
        assertEquals("APPROVE_APPLICATION", logs.get(0).action());
        assertEquals("admin", logs.get(0).username());
    }

    @Test
    @DisplayName("recordAuditLog should save new audit log entry")
    void should_recordAuditLog_successfully() {
        reportingService.recordAuditLog(1L, "admin", "CREATE_EXAM", "EXAM", "100", "Tạo kỳ thi mới", "127.0.0.1");
        verify(auditLogRepository, times(1)).save(any(AuditLog.class));
    }
}
