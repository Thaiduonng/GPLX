package vn.edu.gplx.modules.crm.application.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.admission.domain.AdmissionApplication;
import vn.edu.gplx.modules.admission.domain.ApplicationStatus;
import vn.edu.gplx.modules.admission.domain.LicenseCategory;
import vn.edu.gplx.modules.admission.infrastructure.AdmissionApplicationRepository;
import vn.edu.gplx.modules.admission.infrastructure.LicenseCategoryRepository;
import vn.edu.gplx.modules.crm.api.dto.AddInteractionRequest;
import vn.edu.gplx.modules.crm.api.dto.AdmissionDashboardStatsResponse;
import vn.edu.gplx.modules.crm.api.dto.AdmissionLeadResponse;
import vn.edu.gplx.modules.crm.api.dto.ConvertLeadRequest;
import vn.edu.gplx.modules.crm.api.dto.CreateLeadInquiryRequest;
import vn.edu.gplx.modules.crm.api.dto.LeadInteractionResponse;
import vn.edu.gplx.modules.crm.api.dto.UpdateLeadStatusRequest;
import vn.edu.gplx.modules.crm.application.CrmLeadService;
import vn.edu.gplx.modules.crm.domain.AdmissionLead;
import vn.edu.gplx.modules.crm.domain.InteractionType;
import vn.edu.gplx.modules.crm.domain.LeadInteraction;
import vn.edu.gplx.modules.crm.domain.LeadSource;
import vn.edu.gplx.modules.crm.domain.LeadStatus;
import vn.edu.gplx.modules.crm.infrastructure.AdmissionLeadRepository;
import vn.edu.gplx.modules.crm.infrastructure.LeadInteractionRepository;
import vn.edu.gplx.modules.identity.domain.User;
import vn.edu.gplx.modules.identity.infrastructure.UserRepository;
import vn.edu.gplx.modules.learning.domain.Course;
import vn.edu.gplx.modules.learning.infrastructure.CourseRepository;
import vn.edu.gplx.shared.exception.BusinessRuleViolationException;
import vn.edu.gplx.shared.exception.ResourceNotFoundException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

@Service
@Transactional
public class CrmLeadServiceImpl implements CrmLeadService {

    private static final Logger log = LoggerFactory.getLogger(CrmLeadServiceImpl.class);

    private final AdmissionLeadRepository leadRepository;
    private final LeadInteractionRepository interactionRepository;
    private final LicenseCategoryRepository categoryRepository;
    private final CourseRepository courseRepository;
    private final AdmissionApplicationRepository applicationRepository;
    private final UserRepository userRepository;

    public CrmLeadServiceImpl(AdmissionLeadRepository leadRepository,
                              LeadInteractionRepository interactionRepository,
                              LicenseCategoryRepository categoryRepository,
                              CourseRepository courseRepository,
                              AdmissionApplicationRepository applicationRepository,
                              UserRepository userRepository) {
        this.leadRepository = leadRepository;
        this.interactionRepository = interactionRepository;
        this.categoryRepository = categoryRepository;
        this.courseRepository = courseRepository;
        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
    }

    @Override
    public AdmissionLeadResponse createInquiry(CreateLeadInquiryRequest request) {
        LicenseCategory category = null;
        if (request.categoryId() != null) {
            category = categoryRepository.findById(request.categoryId()).orElse(null);
        }

        Course course = null;
        if (request.courseId() != null) {
            course = courseRepository.findById(request.courseId()).orElse(null);
            if (category == null && course != null) {
                category = course.getCategory();
            }
        }

        // Chống trùng lặp lead đang hoạt động: nếu sđt đã gửi yêu cầu và chưa xử lý xong, cập nhật ghi chú
        var existingLeadOpt = leadRepository.findByPhone(request.phone().trim());
        if (existingLeadOpt.isPresent()) {
            AdmissionLead existing = existingLeadOpt.get();
            if (existing.getStatus() != LeadStatus.CONVERTED && existing.getStatus() != LeadStatus.NOT_INTERESTED) {
                existing.setNotes((existing.getNotes() != null ? existing.getNotes() + " | " : "") +
                        "Yêu cầu tư vấn gửi lại: " + (request.notes() != null ? request.notes() : ""));
                if (course != null) existing.setCourse(course);
                if (category != null) existing.setCategory(category);
                AdmissionLead saved = leadRepository.save(existing);
                log.info("Lead {} updated with new inquiry request", saved.getLeadCode());
                return toResponse(saved);
            }
        }

        String leadCode = generateLeadCode();
        AdmissionLead lead = new AdmissionLead(
                leadCode,
                request.fullName().trim(),
                request.phone().trim(),
                request.email() != null ? request.email().trim() : null,
                category,
                course,
                request.preferredContactChannel(),
                request.preferredContactTime(),
                request.trainingLocation(),
                request.source(),
                request.notes()
        );

        AdmissionLead saved = leadRepository.save(lead);
        log.info("New Admission Lead created: {} for customer {}", saved.getLeadCode(), saved.getFullName());
        return toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AdmissionLeadResponse> getLeads(LeadStatus status, Long categoryId, LeadSource source,
                                                Long assignedToId, String keyword, Pageable pageable) {
        String cleanKeyword = (keyword != null && !keyword.trim().isEmpty()) ? keyword.trim() : null;
        return leadRepository.searchLeads(status, categoryId, source, assignedToId, cleanKeyword, pageable)
                .map(this::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public AdmissionLeadResponse getLeadById(Long id) {
        AdmissionLead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AdmissionLead", "id", id));
        return toResponse(lead);
    }

    @Override
    public AdmissionLeadResponse updateLead(Long id, UpdateLeadStatusRequest request, Long staffId) {
        AdmissionLead lead = leadRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("AdmissionLead", "id", id));

        LeadStatus oldStatus = lead.getStatus();
        lead.setStatus(request.status());

        if (request.notes() != null) {
            lead.setNotes(request.notes());
        }

        if (request.followUpAt() != null) {
            lead.setFollowUpAt(request.followUpAt());
        }

        if (request.assignedToId() != null) {
            User staff = userRepository.findById(request.assignedToId())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", request.assignedToId()));
            lead.setAssignedTo(staff);
        }

        AdmissionLead saved = leadRepository.save(lead);

        // Tự động ghi nhật ký chuyển trạng thái nếu có staffId
        if (staffId != null && oldStatus != request.status()) {
            User staff = userRepository.findById(staffId).orElse(null);
            if (staff != null) {
                LeadInteraction interaction = new LeadInteraction(
                        saved,
                        staff,
                        InteractionType.NOTE,
                        String.format("Cập nhật trạng thái từ %s sang %s. Ghi chú: %s",
                                oldStatus, request.status(), request.notes() != null ? request.notes() : "Không"),
                        "Thành công",
                        request.followUpAt() != null ? "Gọi lại chăm sóc" : null,
                        request.followUpAt()
                );
                interactionRepository.save(interaction);
            }
        }

        log.info("Lead {} updated to status {} by staff {}", saved.getLeadCode(), saved.getStatus(), staffId);
        return toResponse(saved);
    }

    @Override
    public LeadInteractionResponse addInteraction(Long leadId, Long staffId, AddInteractionRequest request) {
        AdmissionLead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new ResourceNotFoundException("AdmissionLead", "id", leadId));

        User staff = userRepository.findById(staffId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", staffId));

        LeadInteraction interaction = new LeadInteraction(
                lead,
                staff,
                request.interactionType(),
                request.content(),
                request.result(),
                request.nextAction(),
                request.nextActionAt()
        );

        LeadInteraction saved = interactionRepository.save(interaction);

        // Tự động chuyển trạng thái từ NEW sang CONTACTING hoặc CONSULTED nếu đang là NEW
        if (lead.getStatus() == LeadStatus.NEW) {
            lead.setStatus(LeadStatus.CONTACTING);
            leadRepository.save(lead);
        }

        if (request.nextActionAt() != null) {
            lead.setFollowUpAt(request.nextActionAt());
            leadRepository.save(lead);
        }

        return toInteractionResponse(saved);
    }

    @Override
    public AdmissionLeadResponse convertLeadToApplication(Long leadId, ConvertLeadRequest request, Long staffId) {
        AdmissionLead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new ResourceNotFoundException("AdmissionLead", "id", leadId));

        AdmissionApplication app = applicationRepository.findById(request.applicationId())
                .orElseThrow(() -> new ResourceNotFoundException("AdmissionApplication", "id", request.applicationId()));

        lead.setStatus(LeadStatus.CONVERTED);
        lead.setConvertedApplication(app);
        AdmissionLead saved = leadRepository.save(lead);

        if (staffId != null) {
            User staff = userRepository.findById(staffId).orElse(null);
            if (staff != null) {
                LeadInteraction interaction = new LeadInteraction(
                        saved,
                        staff,
                        InteractionType.NOTE,
                        String.format("Chuyển đổi thành công thành Hồ sơ học viên %s. Ghi chú: %s",
                                app.getApplicationCode(), request.note() != null ? request.note() : ""),
                        "Đã chuyển đổi thành công",
                        "Theo dõi tiến độ hồ sơ tuyển sinh",
                        null
                );
                interactionRepository.save(interaction);
            }
        }

        log.info("Lead {} converted to application {}", saved.getLeadCode(), app.getApplicationCode());
        return toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public AdmissionDashboardStatsResponse getDashboardStats() {
        long totalLeads = leadRepository.count();
        long newLeads = leadRepository.countByStatus(LeadStatus.NEW);
        long contactingLeads = leadRepository.countByStatus(LeadStatus.CONTACTING);
        long convertedLeads = leadRepository.countByStatus(LeadStatus.CONVERTED);

        long totalApps = applicationRepository.count();
        long submittedApps = applicationRepository.countByStatus(ApplicationStatus.SUBMITTED);
        long underReviewApps = applicationRepository.countByStatus(ApplicationStatus.UNDER_REVIEW);
        long supplementApps = applicationRepository.countByStatus(ApplicationStatus.SUPPLEMENT_REQUIRED);
        long approvedApps = applicationRepository.countByStatus(ApplicationStatus.APPROVED);
        long enrolledApps = applicationRepository.countByStatus(ApplicationStatus.ENROLLED);
        long rejectedApps = applicationRepository.countByStatus(ApplicationStatus.REJECTED);

        double leadConversionRate = totalLeads > 0 ? (double) convertedLeads / totalLeads * 100.0 : 0.0;
        double appApprovalRate = totalApps > 0 ? (double) (approvedApps + enrolledApps) / totalApps * 100.0 : 0.0;

        Map<String, Long> leadsBySource = new HashMap<>();
        for (LeadSource src : LeadSource.values()) {
            leadsBySource.put(src.name(), leadRepository.countBySource(src));
        }

        Map<String, Long> appsByCategory = new HashMap<>();
        List<LicenseCategory> categories = categoryRepository.findAll();
        for (LicenseCategory cat : categories) {
            long count = applicationRepository.findAll().stream()
                    .filter(a -> a.getCategory() != null && a.getCategory().getId().equals(cat.getId()))
                    .count();
            appsByCategory.put(cat.getCode(), count);
        }

        return new AdmissionDashboardStatsResponse(
                totalLeads,
                newLeads,
                contactingLeads,
                convertedLeads,
                totalApps,
                submittedApps,
                underReviewApps,
                supplementApps,
                approvedApps,
                enrolledApps,
                rejectedApps,
                Math.round(leadConversionRate * 10.0) / 10.0,
                Math.round(appApprovalRate * 10.0) / 10.0,
                leadsBySource,
                appsByCategory
        );
    }

    private String generateLeadCode() {
        String dateStr = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        int rand = ThreadLocalRandom.current().nextInt(1000, 9999);
        return String.format("LEAD-%s-%d", dateStr, rand);
    }

    private AdmissionLeadResponse toResponse(AdmissionLead lead) {
        String catCode = lead.getCategory() != null ? lead.getCategory().getCode() : null;
        String catName = lead.getCategory() != null ? lead.getCategory().getName() : null;
        Long catId = lead.getCategory() != null ? lead.getCategory().getId() : null;

        Long courseId = lead.getCourse() != null ? lead.getCourse().getId() : null;
        String courseCode = lead.getCourse() != null ? lead.getCourse().getCode() : null;
        String courseTitle = lead.getCourse() != null ? lead.getCourse().getTitle() : null;

        Long staffId = lead.getAssignedTo() != null ? lead.getAssignedTo().getId() : null;
        String staffName = lead.getAssignedTo() != null ? lead.getAssignedTo().getFullName() : null;

        Long convertedId = lead.getConvertedApplication() != null ? lead.getConvertedApplication().getId() : null;
        String convertedCode = lead.getConvertedApplication() != null ? lead.getConvertedApplication().getApplicationCode() : null;

        List<LeadInteractionResponse> interactions = lead.getInteractions() != null ?
                lead.getInteractions().stream().map(this::toInteractionResponse).toList() : List.of();

        return new AdmissionLeadResponse(
                lead.getId(),
                lead.getLeadCode(),
                lead.getFullName(),
                lead.getPhone(),
                lead.getEmail(),
                catId,
                catCode,
                catName,
                courseId,
                courseCode,
                courseTitle,
                lead.getPreferredContactChannel(),
                lead.getPreferredContactTime(),
                lead.getTrainingLocation(),
                lead.getPreferredStartDate(),
                lead.getSource(),
                lead.getStatus(),
                lead.getNotes(),
                staffId,
                staffName,
                lead.getFollowUpAt(),
                convertedId,
                convertedCode,
                lead.isConsentGdpr(),
                lead.getCreatedAt(),
                lead.getUpdatedAt(),
                interactions
        );
    }

    private LeadInteractionResponse toInteractionResponse(LeadInteraction i) {
        return new LeadInteractionResponse(
                i.getId(),
                i.getLead().getId(),
                i.getStaff().getId(),
                i.getStaff().getFullName(),
                i.getInteractionType(),
                i.getContent(),
                i.getResult(),
                i.getNextAction(),
                i.getNextActionAt(),
                i.getCreatedAt()
        );
    }
}
