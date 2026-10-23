package vn.edu.gplx.modules.reporting.application.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.admission.domain.AdmissionApplication;
import vn.edu.gplx.modules.admission.domain.ApplicationStatus;
import vn.edu.gplx.modules.admission.domain.LicenseCategory;
import vn.edu.gplx.modules.admission.infrastructure.AdmissionApplicationRepository;
import vn.edu.gplx.modules.admission.infrastructure.LicenseCategoryRepository;
import vn.edu.gplx.modules.examination.domain.ExamCandidate;
import vn.edu.gplx.modules.examination.domain.FinalExamResult;
import vn.edu.gplx.modules.examination.infrastructure.ExamCandidateRepository;
import vn.edu.gplx.modules.examination.infrastructure.ExamResultRepository;
import vn.edu.gplx.modules.finance.domain.PaymentReceipt;
import vn.edu.gplx.modules.finance.infrastructure.PaymentReceiptRepository;
import vn.edu.gplx.modules.fleet.domain.Vehicle;
import vn.edu.gplx.modules.fleet.domain.VehicleStatus;
import vn.edu.gplx.modules.fleet.infrastructure.VehicleRepository;
import vn.edu.gplx.modules.identity.infrastructure.UserRepository;
import vn.edu.gplx.modules.reporting.api.dto.AuditLogResponse;
import vn.edu.gplx.modules.reporting.api.dto.CategoryStatResponse;
import vn.edu.gplx.modules.reporting.api.dto.DashboardSummaryResponse;
import vn.edu.gplx.modules.reporting.application.ReportingService;
import vn.edu.gplx.modules.reporting.domain.AuditLog;
import vn.edu.gplx.modules.reporting.infrastructure.AuditLogRepository;
import vn.edu.gplx.modules.training.domain.DatPracticeSession;
import vn.edu.gplx.modules.training.infrastructure.DatPracticeSessionRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ReportingServiceImpl implements ReportingService {

    private static final Logger log = LoggerFactory.getLogger(ReportingServiceImpl.class);

    private final AuditLogRepository auditLogRepository;
    private final UserRepository userRepository;
    private final AdmissionApplicationRepository applicationRepository;
    private final LicenseCategoryRepository categoryRepository;
    private final ExamCandidateRepository candidateRepository;
    private final ExamResultRepository resultRepository;
    private final PaymentReceiptRepository receiptRepository;
    private final DatPracticeSessionRepository datSessionRepository;
    private final VehicleRepository vehicleRepository;

    public ReportingServiceImpl(AuditLogRepository auditLogRepository,
                                UserRepository userRepository,
                                AdmissionApplicationRepository applicationRepository,
                                LicenseCategoryRepository categoryRepository,
                                ExamCandidateRepository candidateRepository,
                                ExamResultRepository resultRepository,
                                PaymentReceiptRepository receiptRepository,
                                DatPracticeSessionRepository datSessionRepository,
                                VehicleRepository vehicleRepository) {
        this.auditLogRepository = auditLogRepository;
        this.userRepository = userRepository;
        this.applicationRepository = applicationRepository;
        this.categoryRepository = categoryRepository;
        this.candidateRepository = candidateRepository;
        this.resultRepository = resultRepository;
        this.receiptRepository = receiptRepository;
        this.datSessionRepository = datSessionRepository;
        this.vehicleRepository = vehicleRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public DashboardSummaryResponse getDashboardSummary() {
        log.info("Generating system dashboard KPI summary");

        // 1. Số lượng học viên & hồ sơ
        long totalStudents = userRepository.count();
        List<AdmissionApplication> allApps = applicationRepository.findAll();
        long totalApplications = allApps.size();
        long approvedApplications = allApps.stream()
                .filter(a -> a.getStatus() == ApplicationStatus.APPROVED)
                .count();

        // 2. Thí sinh & Tỷ lệ đỗ sát hạch
        List<ExamCandidate> allCandidates = candidateRepository.findAll();
        long totalExamCandidates = allCandidates.size();
        long totalPassedCandidates = resultRepository.findByFinalResult(FinalExamResult.PASSED).size();
        double overallPassRate = totalExamCandidates > 0
                ? Math.round(((double) totalPassedCandidates / totalExamCandidates) * 1000.0) / 10.0
                : 0.0;

        // 3. Doanh thu học phí
        BigDecimal totalTuitionRevenue = receiptRepository.findAll().stream()
                .map(PaymentReceipt::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // 4. Tổng quãng đường thực hành DAT
        BigDecimal totalDatDistanceKm = datSessionRepository.findAll().stream()
                .map(DatPracticeSession::getDistanceKm)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // 5. Đội xe tập lái
        List<Vehicle> allVehicles = vehicleRepository.findAll();
        long totalVehicles = allVehicles.size();
        LocalDate today = LocalDate.now();
        long availableVehicles = allVehicles.stream()
                .filter(v -> v.getStatus() == VehicleStatus.AVAILABLE && v.getInspectionExpiryDate().isAfter(today))
                .count();

        // 6. Thống kê theo từng hạng bằng
        List<LicenseCategory> categories = categoryRepository.findByIsActiveTrueOrderByCodeAsc();
        List<CategoryStatResponse> categoryStats = new ArrayList<>();

        for (LicenseCategory cat : categories) {
            long appCount = allApps.stream()
                    .filter(a -> a.getCategory().getId().equals(cat.getId()))
                    .count();

            List<ExamCandidate> catCandidates = allCandidates.stream()
                    .filter(c -> c.getExamSession().getCategory().getId().equals(cat.getId()))
                    .toList();
            long cCount = catCandidates.size();

            long pCount = catCandidates.stream()
                    .filter(c -> c.getResult() != null && c.getResult().getFinalResult() == FinalExamResult.PASSED)
                    .count();

            double pRate = cCount > 0
                    ? Math.round(((double) pCount / cCount) * 1000.0) / 10.0
                    : 0.0;

            categoryStats.add(new CategoryStatResponse(cat.getCode(), cat.getName(), appCount, cCount, pCount, pRate));
        }

        // 7. Hoạt động kiểm toán gần đây
        List<AuditLogResponse> recent = auditLogRepository.findAllByOrderByCreatedAtDesc(PageRequest.of(0, 8))
                .stream()
                .map(this::toAuditResponse)
                .toList();

        return new DashboardSummaryResponse(
                totalStudents,
                totalApplications,
                approvedApplications,
                totalExamCandidates,
                totalPassedCandidates,
                overallPassRate,
                totalTuitionRevenue,
                totalDatDistanceKm,
                totalVehicles,
                availableVehicles,
                categoryStats,
                recent
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<AuditLogResponse> getAuditLogs(String resourceType, String action, int page, int size) {
        Pageable pageable = PageRequest.of(Math.max(page, 0), Math.max(size, 1));
        List<AuditLog> list;

        if (resourceType != null && !resourceType.isBlank()) {
            list = auditLogRepository.findByResourceTypeOrderByCreatedAtDesc(resourceType, pageable);
        } else if (action != null && !action.isBlank()) {
            list = auditLogRepository.findByActionOrderByCreatedAtDesc(action, pageable);
        } else {
            list = auditLogRepository.findAllByOrderByCreatedAtDesc(pageable);
        }

        return list.stream().map(this::toAuditResponse).toList();
    }

    @Override
    public void recordAuditLog(Long userId, String username, String action, String resourceType,
                               String resourceId, String details, String ipAddress) {
        AuditLog logEntry = new AuditLog(userId, username, action, resourceType, resourceId, details, ipAddress);
        auditLogRepository.save(logEntry);
    }

    private AuditLogResponse toAuditResponse(AuditLog log) {
        return new AuditLogResponse(
                log.getId(),
                log.getUserId(),
                log.getUsername(),
                log.getAction(),
                log.getResourceType(),
                log.getResourceId(),
                log.getDetails(),
                log.getIpAddress(),
                log.getCreatedAt()
        );
    }
}
