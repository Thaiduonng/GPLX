package vn.edu.gplx.modules.admission.application.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.admission.api.dto.ApplicationResponse;
import vn.edu.gplx.modules.admission.api.dto.DocumentResponse;
import vn.edu.gplx.modules.admission.api.dto.LicenseCategoryResponse;
import vn.edu.gplx.modules.admission.api.dto.ReviewApplicationRequest;
import vn.edu.gplx.modules.admission.api.dto.StatusHistoryResponse;
import vn.edu.gplx.modules.admission.api.dto.SubmitApplicationRequest;
import vn.edu.gplx.modules.admission.application.AdmissionService;
import vn.edu.gplx.modules.admission.domain.AdmissionApplication;
import vn.edu.gplx.modules.admission.domain.AdmissionDocument;
import vn.edu.gplx.modules.admission.domain.ApplicationStatus;
import vn.edu.gplx.modules.admission.domain.ApplicationStatusHistory;
import vn.edu.gplx.modules.admission.domain.LicenseCategory;
import vn.edu.gplx.modules.admission.infrastructure.AdmissionApplicationRepository;
import vn.edu.gplx.modules.admission.infrastructure.LicenseCategoryRepository;
import vn.edu.gplx.shared.exception.BusinessRuleViolationException;
import vn.edu.gplx.shared.exception.ResourceNotFoundException;

import java.time.Instant;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
@Transactional
public class AdmissionServiceImpl implements AdmissionService {

    private static final Logger log = LoggerFactory.getLogger(AdmissionServiceImpl.class);

    private final AdmissionApplicationRepository applicationRepository;
    private final LicenseCategoryRepository categoryRepository;

    public AdmissionServiceImpl(AdmissionApplicationRepository applicationRepository,
                                LicenseCategoryRepository categoryRepository) {
        this.applicationRepository = applicationRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public ApplicationResponse submitApplication(Long userId, SubmitApplicationRequest request) {
        LicenseCategory category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new ResourceNotFoundException("LicenseCategory", "id", request.categoryId()));

        if (!Boolean.TRUE.equals(category.getIsActive())) {
            throw new BusinessRuleViolationException("ADM-006", "Hạng bằng lái này hiện đang tạm dừng tiếp nhận hồ sơ.");
        }

        // Kiểm tra độ tuổi tối thiểu theo hạng bằng
        int age = Period.between(request.dateOfBirth(), LocalDate.now()).getYears();
        if (age < category.getMinAge()) {
            throw new BusinessRuleViolationException(
                    "ADM-004",
                    String.format("Học viên chưa đủ tuổi tối thiểu (%d tuổi) để đăng ký hạng %s. Tuổi hiện tại: %d tuổi.",
                            category.getMinAge(), category.getCode(), age)
            );
        }

        // Kiểm tra hồ sơ đang xử lý trùng lặp
        List<ApplicationStatus> activeStatuses = List.of(ApplicationStatus.SUBMITTED, ApplicationStatus.UNDER_REVIEW);
        boolean hasActiveApp = applicationRepository.existsByNationalIdAndStatusIn(request.nationalId(), activeStatuses);
        if (hasActiveApp) {
            throw new BusinessRuleViolationException(
                    "ADM-005",
                    "Đang tồn tại hồ sơ ở trạng thái tiếp nhận/chờ duyệt với số CCCD " + request.nationalId() + ". Vui lòng không nộp trùng lặp."
            );
        }

        String applicationCode = generateApplicationCode(category.getCode());

        AdmissionApplication application = new AdmissionApplication(
                applicationCode,
                userId,
                category,
                request.fullName(),
                request.nationalId(),
                request.dateOfBirth(),
                request.gender(),
                request.phone(),
                request.email(),
                request.address()
        );

        // Thêm documents
        if (request.documents() != null) {
            request.documents().forEach(docItem -> {
                AdmissionDocument doc = new AdmissionDocument(
                        application,
                        docItem.documentType(),
                        docItem.fileName(),
                        docItem.fileUrl(),
                        docItem.fileSize(),
                        docItem.mimeType()
                );
                application.addDocument(doc);
            });
        }

        // Thêm lịch sử trạng thái ban đầu
        ApplicationStatusHistory initialHistory = new ApplicationStatusHistory(
                application,
                null,
                ApplicationStatus.SUBMITTED,
                "Nộp hồ sơ điện tử ban đầu qua cổng thông tin",
                userId
        );
        application.addStatusHistory(initialHistory);

        AdmissionApplication saved = applicationRepository.save(application);
        log.info("Application {} submitted successfully by user {}", saved.getApplicationCode(), userId);

        return toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ApplicationResponse> getMyApplications(Long userId, Pageable pageable) {
        return applicationRepository.findByUserId(userId, pageable)
                .map(this::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public ApplicationResponse getApplicationById(Long id, Long currentUserId, boolean isStaffOrAdmin) {
        AdmissionApplication application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AdmissionApplication", "id", id));

        // Kiểm tra quyền sở hữu tài nguyên (Resource Ownership)
        if (!isStaffOrAdmin && !application.getUserId().equals(currentUserId)) {
            throw new BusinessRuleViolationException("SEC-001", "Bạn không có quyền xem thông tin hồ sơ này.");
        }

        return toResponse(application);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ApplicationResponse> getApplications(ApplicationStatus status, Pageable pageable) {
        if (status != null) {
            return applicationRepository.findByStatus(status, pageable).map(this::toResponse);
        }
        return applicationRepository.findAll(pageable).map(this::toResponse);
    }

    @Override
    public ApplicationResponse reviewApplication(Long id, Long reviewerId, ReviewApplicationRequest request) {
        AdmissionApplication application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AdmissionApplication", "id", id));

        ApplicationStatus currentStatus = application.getStatus();
        ApplicationStatus targetStatus = request.targetStatus();

        // Quy tắc ADM-003: Không cho phép hoàn tác hồ sơ đã duyệt
        if (currentStatus == ApplicationStatus.APPROVED) {
            throw new BusinessRuleViolationException("ADM-003", "Hồ sơ đã được phê duyệt, không thể thay đổi trạng thái.");
        }

        // Quy tắc ADM-002: Bắt buộc ghi nhận lý do khi từ chối hoặc yêu cầu bổ sung
        if ((targetStatus == ApplicationStatus.REJECTED || targetStatus == ApplicationStatus.SUPPLEMENT_REQUIRED)
                && (request.note() == null || request.note().trim().isEmpty())) {
            throw new BusinessRuleViolationException(
                    "ADM-002",
                    "Bắt buộc phải ghi nhận lý do cụ thể khi từ chối hoặc yêu cầu bổ sung hồ sơ."
            );
        }

        // Quy tắc ADM-001: Máy trạng thái chuyển đổi hợp lệ
        validateStatusTransition(currentStatus, targetStatus);

        application.setStatus(targetStatus);
        application.setReviewedBy(reviewerId);
        application.setReviewedAt(Instant.now());

        if (targetStatus == ApplicationStatus.REJECTED || targetStatus == ApplicationStatus.SUPPLEMENT_REQUIRED) {
            application.setRejectionReason(request.note().trim());
        }

        ApplicationStatusHistory history = new ApplicationStatusHistory(
                application,
                currentStatus,
                targetStatus,
                request.note() != null ? request.note().trim() : null,
                reviewerId
        );
        application.addStatusHistory(history);

        AdmissionApplication saved = applicationRepository.save(application);
        log.info("Application {} status updated from {} to {} by reviewer {}",
                saved.getApplicationCode(), currentStatus, targetStatus, reviewerId);

        return toResponse(saved);
    }

    private void validateStatusTransition(ApplicationStatus current, ApplicationStatus target) {
        if (current == target) {
            throw new BusinessRuleViolationException("ADM-001", "Hồ sơ hiện đã ở trạng thái " + target);
        }

        boolean isValid = switch (current) {
            case DRAFT -> target == ApplicationStatus.SUBMITTED;
            case SUBMITTED -> target == ApplicationStatus.UNDER_REVIEW
                    || target == ApplicationStatus.APPROVED
                    || target == ApplicationStatus.REJECTED
                    || target == ApplicationStatus.SUPPLEMENT_REQUIRED;
            case UNDER_REVIEW -> target == ApplicationStatus.APPROVED
                    || target == ApplicationStatus.REJECTED
                    || target == ApplicationStatus.SUPPLEMENT_REQUIRED;
            case SUPPLEMENT_REQUIRED -> target == ApplicationStatus.UNDER_REVIEW
                    || target == ApplicationStatus.APPROVED
                    || target == ApplicationStatus.REJECTED;
            case REJECTED, APPROVED -> false;
        };

        if (!isValid) {
            throw new BusinessRuleViolationException(
                    "ADM-001",
                    String.format("Không thể chuyển trạng thái hồ sơ từ %s sang %s theo quy trình.", current, target)
            );
        }
    }

    private String generateApplicationCode(String categoryCode) {
        String dateStr = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        int randomSuffix = ThreadLocalRandom.current().nextInt(1000, 9999);
        return String.format("APP-%s-%s-%d", categoryCode, dateStr, randomSuffix);
    }

    private ApplicationResponse toResponse(AdmissionApplication app) {
        LicenseCategoryResponse catResponse = new LicenseCategoryResponse(
                app.getCategory().getId(),
                app.getCategory().getCode(),
                app.getCategory().getName(),
                app.getCategory().getDescription(),
                app.getCategory().getMinAge(),
                app.getCategory().getTuitionFee(),
                app.getCategory().getIsActive()
        );

        List<DocumentResponse> docResponses = app.getDocuments().stream()
                .map(d -> new DocumentResponse(
                        d.getId(),
                        d.getDocumentType(),
                        d.getFileName(),
                        d.getFileUrl(),
                        d.getFileSize(),
                        d.getMimeType(),
                        d.getCreatedAt()
                ))
                .toList();

        List<StatusHistoryResponse> historyResponses = app.getStatusHistories().stream()
                .map(h -> new StatusHistoryResponse(
                        h.getId(),
                        h.getFromStatus(),
                        h.getToStatus(),
                        h.getNote(),
                        h.getChangedBy(),
                        h.getCreatedAt()
                ))
                .toList();

        return new ApplicationResponse(
                app.getId(),
                app.getApplicationCode(),
                app.getUserId(),
                catResponse,
                app.getFullName(),
                app.getNationalId(),
                app.getDateOfBirth(),
                app.getGender(),
                app.getPhone(),
                app.getEmail(),
                app.getAddress(),
                app.getStatus(),
                app.getRejectionReason(),
                app.getReviewedBy(),
                app.getReviewedAt(),
                app.getVersion(),
                app.getCreatedAt(),
                app.getUpdatedAt(),
                docResponses,
                historyResponses
        );
    }
}
