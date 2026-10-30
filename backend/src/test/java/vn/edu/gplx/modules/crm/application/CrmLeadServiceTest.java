package vn.edu.gplx.modules.crm.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import vn.edu.gplx.modules.admission.domain.ApplicationStatus;
import vn.edu.gplx.modules.admission.infrastructure.AdmissionApplicationRepository;
import vn.edu.gplx.modules.admission.infrastructure.LicenseCategoryRepository;
import vn.edu.gplx.modules.crm.api.dto.AddInteractionRequest;
import vn.edu.gplx.modules.crm.api.dto.AdmissionDashboardStatsResponse;
import vn.edu.gplx.modules.crm.api.dto.AdmissionLeadResponse;
import vn.edu.gplx.modules.crm.api.dto.CreateLeadInquiryRequest;
import vn.edu.gplx.modules.crm.api.dto.UpdateLeadStatusRequest;
import vn.edu.gplx.modules.crm.application.impl.CrmLeadServiceImpl;
import vn.edu.gplx.modules.crm.domain.AdmissionLead;
import vn.edu.gplx.modules.crm.domain.ContactChannel;
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

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CrmLeadServiceTest {

    @Mock
    private AdmissionLeadRepository leadRepository;

    @Mock
    private LeadInteractionRepository interactionRepository;

    @Mock
    private CourseRepository courseRepository;

    @Mock
    private LicenseCategoryRepository categoryRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private AdmissionApplicationRepository applicationRepository;

    @InjectMocks
    private CrmLeadServiceImpl crmLeadService;

    private Course sampleCourse;

    @BeforeEach
    void setUp() {
        sampleCourse = new Course();
        sampleCourse.setCode("B1-2026");
        sampleCourse.setTitle("Học lái xe B1 Tự động");
        ReflectionTestUtils.setField(sampleCourse, "id", 10L);
    }

    @Test
    @DisplayName("Tạo lead mới từ form tư vấn thành công")
    void shouldCreateLeadInquirySuccessfully() {
        CreateLeadInquiryRequest request = new CreateLeadInquiryRequest(
                "Nguyễn Văn Nam",
                "0987654321",
                "nam@example.com",
                null,
                10L,
                ContactChannel.PHONE,
                "Tối thứ 7",
                "Cơ sở 1",
                LeadSource.HOMEPAGE,
                "Tôi muốn học gấp",
                true
        );

        when(courseRepository.findById(10L)).thenReturn(Optional.of(sampleCourse));
        when(leadRepository.save(any(AdmissionLead.class))).thenAnswer(invocation -> {
            AdmissionLead lead = invocation.getArgument(0);
            ReflectionTestUtils.setField(lead, "id", 1L);
            return lead;
        });

        AdmissionLeadResponse response = crmLeadService.createInquiry(request);

        assertThat(response).isNotNull();
        assertThat(response.fullName()).isEqualTo("Nguyễn Văn Nam");
        assertThat(response.phone()).isEqualTo("0987654321");
        assertThat(response.status()).isEqualTo(LeadStatus.NEW);
        verify(leadRepository).save(any(AdmissionLead.class));
    }

    @Test
    @DisplayName("Cập nhật trạng thái lead và ghi log tương tác")
    void shouldUpdateLeadStatusAndAddInteraction() {
        AdmissionLead lead = new AdmissionLead(
                "LEAD-001", "Trần Thị Mai", "0912345678", "mai@example.com",
                null, null, ContactChannel.PHONE, "Sáng", "Cơ sở 1", LeadSource.COURSE_DETAIL, "Ghi chú"
        );
        ReflectionTestUtils.setField(lead, "id", 2L);

        when(leadRepository.findById(2L)).thenReturn(Optional.of(lead));
        when(leadRepository.save(any(AdmissionLead.class))).thenAnswer(i -> i.getArgument(0));

        User staff = new User();
        ReflectionTestUtils.setField(staff, "id", 99L);
        staff.setFullName("Chuyên viên tư vấn");
        when(userRepository.findById(99L)).thenReturn(Optional.of(staff));
        when(interactionRepository.save(any(LeadInteraction.class))).thenAnswer(i -> {
            LeadInteraction interaction = i.getArgument(0);
            ReflectionTestUtils.setField(interaction, "id", 101L);
            return interaction;
        });

        UpdateLeadStatusRequest statusRequest = new UpdateLeadStatusRequest(
                LeadStatus.CONTACTING,
                "Đã gọi nhưng bận máy",
                null,
                null
        );

        AdmissionLeadResponse updated = crmLeadService.updateLead(2L, statusRequest, 99L);

        assertThat(updated.status()).isEqualTo(LeadStatus.CONTACTING);

        // Thêm ghi chú cuộc gọi
        AddInteractionRequest interactionRequest = new AddInteractionRequest(
                InteractionType.CALL,
                "Đã gọi lại lúc 14h, học viên hẹn chiều tối tư vấn kỹ hơn",
                "Hẹn gọi lại sau 18h",
                "Gọi lại",
                null
        );

        crmLeadService.addInteraction(2L, 99L, interactionRequest);
        verify(interactionRepository, org.mockito.Mockito.times(2)).save(any());
    }

    @Test
    @DisplayName("Thống kê số liệu dashboard tuyển sinh chính xác")
    void shouldCalculateDashboardStatsCorrectly() {
        when(leadRepository.count()).thenReturn(100L);
        when(leadRepository.countByStatus(LeadStatus.NEW)).thenReturn(20L);
        when(leadRepository.countByStatus(LeadStatus.CONTACTING)).thenReturn(10L);
        when(leadRepository.countByStatus(LeadStatus.CONVERTED)).thenReturn(40L);

        when(applicationRepository.count()).thenReturn(50L);
        when(applicationRepository.countByStatus(ApplicationStatus.SUBMITTED)).thenReturn(5L);
        when(applicationRepository.countByStatus(ApplicationStatus.UNDER_REVIEW)).thenReturn(10L);
        when(applicationRepository.countByStatus(ApplicationStatus.SUPPLEMENT_REQUIRED)).thenReturn(5L);
        when(applicationRepository.countByStatus(ApplicationStatus.APPROVED)).thenReturn(20L);
        when(applicationRepository.countByStatus(ApplicationStatus.ENROLLED)).thenReturn(10L);
        when(applicationRepository.countByStatus(ApplicationStatus.REJECTED)).thenReturn(0L);

        AdmissionDashboardStatsResponse stats = crmLeadService.getDashboardStats();

        assertThat(stats.totalLeads()).isEqualTo(100L);
        assertThat(stats.newLeads()).isEqualTo(20L);
        assertThat(stats.convertedLeads()).isEqualTo(40L);
        assertThat(stats.totalApplications()).isEqualTo(50L);
        assertThat(stats.approvedApplications()).isEqualTo(20L);
        assertThat(stats.enrolledStudents()).isEqualTo(10L);
        assertThat(stats.leadConversionRate()).isEqualTo(40.0);
        assertThat(stats.applicationApprovalRate()).isEqualTo(60.0);
    }
}
