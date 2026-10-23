package vn.edu.gplx.modules.admission.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import vn.edu.gplx.modules.admission.api.dto.ApplicationResponse;
import vn.edu.gplx.modules.admission.api.dto.DocumentUploadItem;
import vn.edu.gplx.modules.admission.api.dto.ReviewApplicationRequest;
import vn.edu.gplx.modules.admission.api.dto.SubmitApplicationRequest;
import vn.edu.gplx.modules.admission.application.impl.AdmissionServiceImpl;
import vn.edu.gplx.modules.admission.domain.AdmissionApplication;
import vn.edu.gplx.modules.admission.domain.ApplicationStatus;
import vn.edu.gplx.modules.admission.domain.DocumentType;
import vn.edu.gplx.modules.admission.domain.Gender;
import vn.edu.gplx.modules.admission.domain.LicenseCategory;
import vn.edu.gplx.modules.admission.infrastructure.AdmissionApplicationRepository;
import vn.edu.gplx.modules.admission.infrastructure.LicenseCategoryRepository;
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
class AdmissionServiceTest {

    @Mock
    private AdmissionApplicationRepository applicationRepository;

    @Mock
    private LicenseCategoryRepository categoryRepository;

    @InjectMocks
    private AdmissionServiceImpl admissionService;

    private LicenseCategory categoryB1;
    private SubmitApplicationRequest validRequest;

    @BeforeEach
    void setUp() {
        categoryB1 = new LicenseCategory("B1", "Hạng B1 tự động", "Mô tả", 18, BigDecimal.valueOf(14500000));
        ReflectionTestUtils.setField(categoryB1, "id", 1L);

        DocumentUploadItem doc = new DocumentUploadItem(
                DocumentType.NATIONAL_ID_FRONT,
                "cccd_front.jpg",
                "https://storage.example.com/cccd_front.jpg",
                102400L,
                "image/jpeg"
        );

        validRequest = new SubmitApplicationRequest(
                1L,
                "Nguyễn Văn A",
                "001200001234",
                LocalDate.now().minusYears(20), // 20 tuổi
                Gender.MALE,
                "0987654321",
                "nguyenvana@example.com",
                "Hà Nội",
                List.of(doc)
        );
    }

    @Test
    @DisplayName("Nộp hồ sơ hợp lệ thành công - sinh mã APP, trạng thái SUBMITTED")
    void should_submitApplication_when_validRequest() {
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(categoryB1));
        when(applicationRepository.existsByNationalIdAndStatusIn(any(), any())).thenReturn(false);
        when(applicationRepository.save(any(AdmissionApplication.class))).thenAnswer(invocation -> {
            AdmissionApplication app = invocation.getArgument(0);
            ReflectionTestUtils.setField(app, "id", 100L);
            return app;
        });

        ApplicationResponse response = admissionService.submitApplication(10L, validRequest);

        assertThat(response).isNotNull();
        assertThat(response.applicationCode()).startsWith("APP-B1-");
        assertThat(response.status()).isEqualTo(ApplicationStatus.SUBMITTED);
        assertThat(response.fullName()).isEqualTo("Nguyễn Văn A");
        assertThat(response.documents()).hasSize(1);
        assertThat(response.statusHistories()).hasSize(1);

        verify(applicationRepository).save(any(AdmissionApplication.class));
    }

    @Test
    @DisplayName("Vi phạm Rule ADM-004: Chưa đủ tuổi tối thiểu của hạng bằng thì từ chối")
    void should_throwException_when_underAge() {
        SubmitApplicationRequest underAgeRequest = new SubmitApplicationRequest(
                1L,
                "Nguyễn Văn Nhỏ",
                "001205001234",
                LocalDate.now().minusYears(16), // 16 tuổi (< 18 tuổi)
                Gender.MALE,
                "0987654321",
                "nhonguyen@example.com",
                "Hà Nội",
                validRequest.documents()
        );

        when(categoryRepository.findById(1L)).thenReturn(Optional.of(categoryB1));

        assertThatThrownBy(() -> admissionService.submitApplication(10L, underAgeRequest))
                .isInstanceOf(BusinessRuleViolationException.class)
                .hasMessageContaining("ADM-004")
                .hasMessageContaining("chưa đủ tuổi tối thiểu");
    }

    @Test
    @DisplayName("Vi phạm Rule ADM-005: Đã có hồ sơ cùng số CCCD đang xử lý thì không cho nộp trùng")
    void should_throwException_when_duplicateActiveApplication() {
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(categoryB1));
        when(applicationRepository.existsByNationalIdAndStatusIn(any(), any())).thenReturn(true);

        assertThatThrownBy(() -> admissionService.submitApplication(10L, validRequest))
                .isInstanceOf(BusinessRuleViolationException.class)
                .hasMessageContaining("ADM-005")
                .hasMessageContaining("Đang tồn tại hồ sơ ở trạng thái tiếp nhận/chờ duyệt");
    }

    @Test
    @DisplayName("Thẩm định hồ sơ: Chuyển SUBMITTED sang APPROVED thành công")
    void should_reviewApplication_successfully_when_validStatusTransition() {
        AdmissionApplication app = new AdmissionApplication(
                "APP-B1-20261023-1111", 10L, categoryB1, "Nguyễn Văn A",
                "001200001234", LocalDate.now().minusYears(20), Gender.MALE,
                "0987654321", "nguyenvana@example.com", "Hà Nội"
        );
        ReflectionTestUtils.setField(app, "id", 100L);

        when(applicationRepository.findById(100L)).thenReturn(Optional.of(app));
        when(applicationRepository.save(any(AdmissionApplication.class))).thenAnswer(i -> i.getArgument(0));

        ReviewApplicationRequest reviewRequest = new ReviewApplicationRequest(
                ApplicationStatus.APPROVED,
                "Hồ sơ đầy đủ, hợp lệ"
        );

        ApplicationResponse response = admissionService.reviewApplication(100L, 2L, reviewRequest);

        assertThat(response.status()).isEqualTo(ApplicationStatus.APPROVED);
        assertThat(response.reviewedBy()).isEqualTo(2L);
        assertThat(response.statusHistories()).hasSize(1);
    }

    @Test
    @DisplayName("Vi phạm Rule ADM-002: Từ chối hoặc yêu cầu bổ sung không có lý do cụ thể")
    void should_throwException_when_reviewRejectsWithoutReason() {
        AdmissionApplication app = new AdmissionApplication(
                "APP-B1-20261023-1111", 10L, categoryB1, "Nguyễn Văn A",
                "001200001234", LocalDate.now().minusYears(20), Gender.MALE,
                "0987654321", "nguyenvana@example.com", "Hà Nội"
        );
        ReflectionTestUtils.setField(app, "id", 100L);

        when(applicationRepository.findById(100L)).thenReturn(Optional.of(app));

        ReviewApplicationRequest invalidReview = new ReviewApplicationRequest(
                ApplicationStatus.REJECTED,
                "   " // Rỗng lý do
        );

        assertThatThrownBy(() -> admissionService.reviewApplication(100L, 2L, invalidReview))
                .isInstanceOf(BusinessRuleViolationException.class)
                .hasMessageContaining("ADM-002")
                .hasMessageContaining("Bắt buộc phải ghi nhận lý do cụ thể");
    }

    @Test
    @DisplayName("Vi phạm Rule ADM-003: Cấm hoàn tác hoặc sửa trạng thái hồ sơ đã APPROVED")
    void should_throwException_when_tryingToRollbackApprovedApplication() {
        AdmissionApplication app = new AdmissionApplication(
                "APP-B1-20261023-1111", 10L, categoryB1, "Nguyễn Văn A",
                "001200001234", LocalDate.now().minusYears(20), Gender.MALE,
                "0987654321", "nguyenvana@example.com", "Hà Nội"
        );
        app.setStatus(ApplicationStatus.APPROVED);
        ReflectionTestUtils.setField(app, "id", 100L);

        when(applicationRepository.findById(100L)).thenReturn(Optional.of(app));

        ReviewApplicationRequest rollbackReview = new ReviewApplicationRequest(
                ApplicationStatus.UNDER_REVIEW,
                "Xem lại"
        );

        assertThatThrownBy(() -> admissionService.reviewApplication(100L, 2L, rollbackReview))
                .isInstanceOf(BusinessRuleViolationException.class)
                .hasMessageContaining("ADM-003")
                .hasMessageContaining("Hồ sơ đã được phê duyệt, không thể thay đổi trạng thái");
    }
}
