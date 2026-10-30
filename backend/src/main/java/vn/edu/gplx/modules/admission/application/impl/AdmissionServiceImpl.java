package vn.edu.gplx.modules.admission.application.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.admission.api.dto.ApplicationResponse;
import vn.edu.gplx.modules.admission.api.dto.DocumentResponse;
import vn.edu.gplx.modules.admission.api.dto.DocumentUploadItem;
import vn.edu.gplx.modules.admission.api.dto.EnrollApplicationRequest;
import vn.edu.gplx.modules.admission.api.dto.LicenseCategoryResponse;
import vn.edu.gplx.modules.admission.api.dto.PublicApplicationResponse;
import vn.edu.gplx.modules.admission.api.dto.ReviewApplicationRequest;
import vn.edu.gplx.modules.admission.api.dto.StatusHistoryResponse;
import vn.edu.gplx.modules.admission.api.dto.SubmitApplicationRequest;
import vn.edu.gplx.modules.admission.api.dto.SupplementDocumentRequest;
import vn.edu.gplx.modules.admission.api.dto.TrackApplicationRequest;
import vn.edu.gplx.modules.admission.application.AdmissionService;
import vn.edu.gplx.modules.admission.domain.AdmissionApplication;
import vn.edu.gplx.modules.admission.domain.AdmissionDocument;
import vn.edu.gplx.modules.admission.domain.ApplicationStatus;
import vn.edu.gplx.modules.admission.domain.ApplicationStatusHistory;
import vn.edu.gplx.modules.admission.domain.LicenseCategory;
import vn.edu.gplx.modules.admission.infrastructure.AdmissionApplicationRepository;
import vn.edu.gplx.modules.admission.infrastructure.LicenseCategoryRepository;
import vn.edu.gplx.modules.identity.domain.User;
import vn.edu.gplx.modules.identity.infrastructure.UserRepository;
import vn.edu.gplx.modules.learning.domain.Course;
import vn.edu.gplx.modules.learning.infrastructure.CourseRepository;
import vn.edu.gplx.modules.training.domain.ClassEnrollment;
import vn.edu.gplx.modules.training.domain.TrainingClass;
import vn.edu.gplx.modules.training.infrastructure.ClassEnrollmentRepository;
import vn.edu.gplx.modules.training.infrastructure.TrainingClassRepository;
import vn.edu.gplx.shared.exception.BadRequestException;
import vn.edu.gplx.shared.exception.BusinessRuleViolationException;
import vn.edu.gplx.shared.exception.ResourceNotFoundException;

import java.time.Instant;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

@Service
@Transactional
public class AdmissionServiceImpl implements AdmissionService {

    private static final Logger log = LoggerFactory.getLogger(AdmissionServiceImpl.class);

    private final AdmissionApplicationRepository applicationRepository;
    private final LicenseCategoryRepository categoryRepository;
    private final CourseRepository courseRepository;
    private final TrainingClassRepository trainingClassRepository;
    private final ClassEnrollmentRepository classEnrollmentRepository;
    private final UserRepository userRepository;

    public AdmissionServiceImpl(AdmissionApplicationRepository applicationRepository,
                                LicenseCategoryRepository categoryRepository,
                                CourseRepository courseRepository,
                                TrainingClassRepository trainingClassRepository,
                                ClassEnrollmentRepository classEnrollmentRepository,
                                UserRepository userRepository) {
        this.applicationRepository = applicationRepository;
        this.categoryRepository = categoryRepository;
        this.courseRepository = courseRepository;
        this.trainingClassRepository = trainingClassRepository;
        this.classEnrollmentRepository = classEnrollmentRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ApplicationResponse submitApplication(Long userId, SubmitApplicationRequest request) {
        AdmissionApplication application = processSubmit(userId, request);
        return toResponse(application);
    }

    @Override
    public PublicApplicationResponse submitPublicApplication(SubmitApplicationRequest request) {
        AdmissionApplication application = processSubmit(null, request);
        return toPublicResponse(application);
    }

    private AdmissionApplication processSubmit(Long userId, SubmitApplicationRequest request) {
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

        // Kiểm tra hồ sơ đang xử lý trùng lặp theo CCCD
        List<ApplicationStatus> activeStatuses = List.of(
                ApplicationStatus.SUBMITTED,
                ApplicationStatus.UNDER_REVIEW,
                ApplicationStatus.SUPPLEMENT_REQUIRED,
                ApplicationStatus.RESUBMITTED
        );
        boolean hasActiveApp = applicationRepository.existsByNationalIdAndStatusIn(request.nationalId(), activeStatuses);
        if (hasActiveApp) {
            throw new BusinessRuleViolationException(
                    "ADM-005",
                    "Đang tồn tại hồ sơ ở trạng thái tiếp nhận/chờ duyệt với số CCCD " + request.nationalId() + ". Vui lòng không nộp trùng lặp."
            );
        }

        String applicationCode = generateApplicationCode(category.getCode());
        String trackingToken = UUID.randomUUID().toString().replace("-", "").substring(0, 16);

        AdmissionApplication application = new AdmissionApplication(
                applicationCode,
                userId,
                category,
                request.fullName().trim(),
                request.nationalId().trim(),
                request.dateOfBirth(),
                request.gender(),
                request.phone().trim(),
                request.email().trim(),
                request.address().trim()
        );

        application.setTrackingToken(trackingToken);
        application.setPreferredSchedule(request.preferredSchedule());
        application.setTrainingLocation(request.trainingLocation());
        application.setConsentDataProcessing(request.consentDataProcessing());

        if (request.courseId() != null) {
            Course course = courseRepository.findById(request.courseId()).orElse(null);
            application.setCourse(course);
        }

        // Thêm documents
        if (request.documents() != null) {
            for (DocumentUploadItem docItem : request.documents()) {
                AdmissionDocument doc = new AdmissionDocument(
                        application,
                        docItem.documentType(),
                        docItem.fileName(),
                        docItem.fileUrl(),
                        docItem.fileSize(),
                        docItem.mimeType()
                );
                application.addDocument(doc);
            }
        }

        // Thêm lịch sử trạng thái ban đầu
        ApplicationStatusHistory initialHistory = new ApplicationStatusHistory(
                application,
                null,
                ApplicationStatus.SUBMITTED,
                "Học viên nộp hồ sơ đăng ký đào tạo trực tuyến",
                userId
        );
        application.addStatusHistory(initialHistory);

        AdmissionApplication saved = applicationRepository.save(application);
        log.info("Application {} submitted successfully (userId: {}, trackingToken: {})",
                saved.getApplicationCode(), userId, trackingToken);

        return saved;
    }

    @Override
    @Transactional(readOnly = true)
    public PublicApplicationResponse trackPublicApplication(TrackApplicationRequest request) {
        AdmissionApplication app = null;

        if (request.trackingToken() != null && !request.trackingToken().trim().isEmpty()) {
            app = applicationRepository.findByApplicationCodeAndTrackingToken(
                    request.applicationCode().trim(), request.trackingToken().trim()
            ).orElse(null);
        }

        if (app == null && request.phone() != null && !request.phone().trim().isEmpty()) {
            app = applicationRepository.findByApplicationCodeAndPhone(
                    request.applicationCode().trim(), request.phone().trim()
            ).orElse(null);
        }

        if (app == null) {
            throw new ResourceNotFoundException("AdmissionApplication", "mã hồ sơ hoặc số điện thoại", request.applicationCode());
        }

        return toPublicResponse(app);
    }

    @Override
    public PublicApplicationResponse supplementDocuments(String applicationCode, SupplementDocumentRequest request) {
        AdmissionApplication app = applicationRepository.findByApplicationCode(applicationCode)
                .orElseThrow(() -> new ResourceNotFoundException("AdmissionApplication", "code", applicationCode));

        // Kiểm tra quyền xác thực tra cứu
        boolean authorized = false;
        if (request.trackingToken() != null && request.trackingToken().equals(app.getTrackingToken())) {
            authorized = true;
        } else if (request.phone() != null && request.phone().equals(app.getPhone())) {
            authorized = true;
        }

        if (!authorized) {
            throw new BusinessRuleViolationException("SEC-002", "Thông tin xác thực bổ sung tài liệu không chính xác.");
        }

        if (app.getStatus() != ApplicationStatus.SUPPLEMENT_REQUIRED) {
            throw new BusinessRuleViolationException("ADM-008", "Hồ sơ hiện không ở trạng thái yêu cầu bổ sung giấy tờ.");
        }

        // Thêm các tài liệu mới
        for (DocumentUploadItem docItem : request.documents()) {
            AdmissionDocument doc = new AdmissionDocument(
                    app,
                    docItem.documentType(),
                    docItem.fileName(),
                    docItem.fileUrl(),
                    docItem.fileSize(),
                    docItem.mimeType()
            );
            app.addDocument(doc);
        }

        ApplicationStatus oldStatus = app.getStatus();
        app.setStatus(ApplicationStatus.RESUBMITTED);

        ApplicationStatusHistory history = new ApplicationStatusHistory(
                app,
                oldStatus,
                ApplicationStatus.RESUBMITTED,
                "Học viên đã nộp bổ sung giấy tờ: " + (request.note() != null ? request.note() : "Không ghi chú"),
                app.getUserId()
        );
        app.addStatusHistory(history);

        AdmissionApplication saved = applicationRepository.save(app);
        log.info("Application {} resubmitted supplemental documents successfully", saved.getApplicationCode());
        return toPublicResponse(saved);
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
        if (!isStaffOrAdmin && (application.getUserId() == null || !application.getUserId().equals(currentUserId))) {
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
    @Transactional(readOnly = true)
    public Page<ApplicationResponse> searchApplications(ApplicationStatus status, Long categoryId, Long staffId,
                                                        String keyword, Pageable pageable) {
        String cleanKeyword = (keyword != null && !keyword.trim().isEmpty()) ? keyword.trim() : null;
        return applicationRepository.searchApplications(status, categoryId, staffId, cleanKeyword, pageable)
                .map(this::toResponse);
    }

    @Override
    public ApplicationResponse reviewApplication(Long id, Long reviewerId, ReviewApplicationRequest request) {
        AdmissionApplication application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AdmissionApplication", "id", id));

        ApplicationStatus currentStatus = application.getStatus();
        ApplicationStatus targetStatus = request.targetStatus();

        // Quy tắc ADM-003: Không cho phép hoàn tác hồ sơ đã hoàn thành hoặc ghi nhận nhập học
        if (currentStatus == ApplicationStatus.ENROLLED) {
            throw new BusinessRuleViolationException("ADM-003", "Hồ sơ đã được chuyển thành học viên chính thức trong lớp đào tạo.");
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

    @Override
    public ApplicationResponse enrollApplication(Long id, Long staffId, EnrollApplicationRequest request) {
        AdmissionApplication application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AdmissionApplication", "id", id));

        // Hồ sơ bắt buộc phải ở trạng thái APPROVED mới được chuyển thành học viên chính thức ENROLLED
        if (application.getStatus() != ApplicationStatus.APPROVED) {
            throw new BusinessRuleViolationException(
                    "ADM-007",
                    "Chỉ hồ sơ đã được phê duyệt (APPROVED) mới có thể chuyển thành học viên chính thức và xếp lớp đào tạo."
            );
        }

        TrainingClass trainingClass = trainingClassRepository.findById(request.classId())
                .orElseThrow(() -> new ResourceNotFoundException("TrainingClass", "id", request.classId()));

        Long studentUserId = application.getUserId();
        if (studentUserId == null) {
            // Nếu hồ sơ là của khách nộp online chưa có user, tìm hoặc liên kết theo số điện thoại
            User matchedUser = userRepository.findByPhone(application.getPhone()).orElse(null);
            if (matchedUser != null) {
                studentUserId = matchedUser.getId();
                application.setUserId(studentUserId);
            } else {
                throw new BadRequestException("Học viên chưa có tài khoản hệ thống. Vui lòng hướng dẫn học viên đăng ký hoặc liên kết tài khoản trước khi xếp lớp.");
            }
        }

        // Kiểm tra xem đã ghi nhận vào lớp chưa
        boolean alreadyEnrolled = classEnrollmentRepository.existsByTrainingClassIdAndUserId(trainingClass.getId(), studentUserId);
        if (alreadyEnrolled) {
            log.warn("Student {} is already enrolled in class {}", studentUserId, trainingClass.getId());
        } else {
            ClassEnrollment enrollment = new ClassEnrollment(trainingClass, studentUserId);
            classEnrollmentRepository.save(enrollment);
        }

        ApplicationStatus oldStatus = application.getStatus();
        application.setStatus(ApplicationStatus.ENROLLED);
        application.setEnrolledClass(trainingClass);
        application.setEnrolledAt(Instant.now());

        ApplicationStatusHistory history = new ApplicationStatusHistory(
                application,
                oldStatus,
                ApplicationStatus.ENROLLED,
                String.format("Xếp lớp đào tạo thành công vào lớp %s (%s). Ghi chú: %s",
                        trainingClass.getName(), trainingClass.getClassCode(), request.note() != null ? request.note() : ""),
                staffId
        );
        application.addStatusHistory(history);

        AdmissionApplication saved = applicationRepository.save(application);
        log.info("Application {} transitioned to ENROLLED in class {} by staff {}",
                saved.getApplicationCode(), trainingClass.getClassCode(), staffId);

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
            case SUPPLEMENT_REQUIRED -> target == ApplicationStatus.RESUBMITTED
                    || target == ApplicationStatus.UNDER_REVIEW
                    || target == ApplicationStatus.APPROVED
                    || target == ApplicationStatus.REJECTED;
            case RESUBMITTED -> target == ApplicationStatus.UNDER_REVIEW
                    || target == ApplicationStatus.APPROVED
                    || target == ApplicationStatus.REJECTED
                    || target == ApplicationStatus.SUPPLEMENT_REQUIRED;
            case APPROVED -> target == ApplicationStatus.ENROLLED;
            case ENROLLED, REJECTED, WITHDRAWN -> false;
        };

        if (!isValid) {
            if (current == ApplicationStatus.APPROVED) {
                throw new BusinessRuleViolationException("ADM-003", "Hồ sơ đã được phê duyệt, không thể thay đổi trạng thái");
            }
            String ruleCode = (current == ApplicationStatus.ENROLLED || current == ApplicationStatus.REJECTED) ? "ADM-003" : "ADM-001";
            throw new BusinessRuleViolationException(
                    ruleCode,
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

        Long courseId = app.getCourse() != null ? app.getCourse().getId() : null;
        String courseTitle = app.getCourse() != null ? app.getCourse().getTitle() : null;

        String assignedStaffName = app.getAssignedStaff() != null ? app.getAssignedStaff().getFullName() : null;

        Long enrolledClassId = app.getEnrolledClass() != null ? app.getEnrolledClass().getId() : null;
        String enrolledClassName = app.getEnrolledClass() != null ? app.getEnrolledClass().getName() : null;

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
                app.getTrackingToken(),
                app.getUserId(),
                catResponse,
                courseId,
                courseTitle,
                app.getFullName(),
                app.getNationalId(),
                app.getDateOfBirth(),
                app.getGender(),
                app.getPhone(),
                app.getEmail(),
                app.getAddress(),
                app.getPreferredSchedule(),
                app.getTrainingLocation(),
                app.getStatus(),
                app.getRejectionReason(),
                app.getReviewedBy(),
                app.getReviewedAt(),
                assignedStaffName,
                enrolledClassId,
                enrolledClassName,
                app.getEnrolledAt(),
                app.getVersion(),
                app.getCreatedAt(),
                app.getUpdatedAt(),
                docResponses,
                historyResponses
        );
    }

    private PublicApplicationResponse toPublicResponse(AdmissionApplication app) {
        String maskedName = maskName(app.getFullName());
        String maskedPhone = maskPhone(app.getPhone());
        String catCode = app.getCategory() != null ? app.getCategory().getCode() : "";
        String catName = app.getCategory() != null ? app.getCategory().getName() : "";
        String courseTitle = app.getCourse() != null ? app.getCourse().getTitle() : null;
        String enrolledClassName = app.getEnrolledClass() != null ? app.getEnrolledClass().getName() : null;

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

        return new PublicApplicationResponse(
                app.getApplicationCode(),
                app.getTrackingToken(),
                maskedName,
                maskedPhone,
                catCode,
                catName,
                courseTitle,
                app.getStatus(),
                app.getRejectionReason(),
                app.getTrainingLocation(),
                app.getPreferredSchedule(),
                enrolledClassName,
                app.getEnrolledAt(),
                app.getCreatedAt(),
                app.getUpdatedAt(),
                docResponses,
                historyResponses
        );
    }

    private String maskName(String fullName) {
        if (fullName == null || fullName.length() < 3) return "***";
        String[] parts = fullName.split(" ");
        if (parts.length == 1) return parts[0].charAt(0) + "***";
        return parts[0] + " *** " + parts[parts.length - 1];
    }

    private String maskPhone(String phone) {
        if (phone == null || phone.length() < 7) return "***";
        return phone.substring(0, 3) + "****" + phone.substring(phone.length() - 3);
    }
}
