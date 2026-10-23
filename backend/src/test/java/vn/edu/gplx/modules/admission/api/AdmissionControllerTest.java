package vn.edu.gplx.modules.admission.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.admission.api.dto.DocumentUploadItem;
import vn.edu.gplx.modules.admission.api.dto.ReviewApplicationRequest;
import vn.edu.gplx.modules.admission.api.dto.SubmitApplicationRequest;
import vn.edu.gplx.modules.admission.domain.ApplicationStatus;
import vn.edu.gplx.modules.admission.domain.DocumentType;
import vn.edu.gplx.modules.admission.domain.Gender;
import vn.edu.gplx.modules.admission.domain.LicenseCategory;
import vn.edu.gplx.modules.admission.infrastructure.LicenseCategoryRepository;
import vn.edu.gplx.modules.identity.api.dto.RegisterRequest;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class AdmissionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private LicenseCategoryRepository categoryRepository;

    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    private LicenseCategory savedCategory;
    private String studentToken;
    private String staffToken;

    @BeforeEach
    void setUp() throws Exception {
        // Đảm bảo có category cho việc test
        LicenseCategory cat = new LicenseCategory("B1", "Hạng B1 xe tự động", "Mô tả", 18, BigDecimal.valueOf(14500000));
        savedCategory = categoryRepository.save(cat);

        // Đăng ký học viên và lấy token
        RegisterRequest studentRegister = new RegisterRequest(
                "student_tester",
                "student_tester@gmail.com",
                "password123",
                "Học Viên Test",
                "0988776655",
                "ROLE_STUDENT"
        );
        String studentRes = mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(studentRegister)))
                .andReturn().getResponse().getContentAsString();
        studentToken = objectMapper.readTree(studentRes).path("data").path("accessToken").asText();

        // Đăng ký cán bộ tuyển sinh và lấy token
        RegisterRequest staffRegister = new RegisterRequest(
                "staff_tester",
                "staff_tester@gmail.com",
                "password123",
                "Cán Bộ Tuyển Sinh",
                "0977889900",
                "ROLE_STAFF"
        );
        String staffRes = mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(staffRegister)))
                .andReturn().getResponse().getContentAsString();
        staffToken = objectMapper.readTree(staffRes).path("data").path("accessToken").asText();
    }

    @Test
    @DisplayName("GET /api/v1/license-categories - Public truy cập không cần token trả về danh sách 200 OK")
    void should_getLicenseCategories_withoutAuth() throws Exception {
        mockMvc.perform(get("/api/v1/license-categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].code").value("B1"));
    }

    @Test
    @DisplayName("POST /api/v1/admissions - Học viên nộp hồ sơ thành công trả về 201 Created")
    void should_submitApplication_when_studentAuthenticated() throws Exception {
        DocumentUploadItem doc = new DocumentUploadItem(
                DocumentType.NATIONAL_ID_FRONT,
                "cccd.jpg",
                "https://storage.gplx.edu.vn/cccd.jpg",
                204800L,
                "image/jpeg"
        );

        SubmitApplicationRequest request = new SubmitApplicationRequest(
                savedCategory.getId(),
                "Học Viên Test",
                "001201001234",
                LocalDate.now().minusYears(22),
                Gender.MALE,
                "0988776655",
                "student_tester@gmail.com",
                "Quận Cầu Giấy, TP Hà Nội",
                List.of(doc)
        );

        mockMvc.perform(post("/api/v1/admissions")
                        .header("Authorization", "Bearer " + studentToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.applicationCode").value(notNullValue()))
                .andExpect(jsonPath("$.data.status").value("SUBMITTED"))
                .andExpect(jsonPath("$.data.nationalId").value("001201001234"));
    }

    @Test
    @DisplayName("GET /api/v1/admissions/my-applications - Học viên xem danh sách hồ sơ của mình")
    void should_getMyApplications_when_studentAuthenticated() throws Exception {
        mockMvc.perform(get("/api/v1/admissions/my-applications")
                        .header("Authorization", "Bearer " + studentToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.content").isArray());
    }

    @Test
    @DisplayName("POST /api/v1/admissions/{id}/review - Bị từ chối 403 Forbidden khi học viên cố tình duyệt hồ sơ")
    void should_forbidReview_when_userIsStudent() throws Exception {
        ReviewApplicationRequest reviewRequest = new ReviewApplicationRequest(
                ApplicationStatus.APPROVED,
                "Tự duyệt"
        );

        mockMvc.perform(post("/api/v1/admissions/1/review")
                        .header("Authorization", "Bearer " + studentToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(reviewRequest)))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("POST /api/v1/admissions/{id}/review - Cán bộ thẩm định duyệt hồ sơ thành công 200 OK")
    void should_allowReview_when_userIsStaff() throws Exception {
        // Học viên nộp trước 1 hồ sơ
        DocumentUploadItem doc = new DocumentUploadItem(
                DocumentType.HEALTH_CERTIFICATE,
                "sk.pdf",
                "https://storage.gplx.edu.vn/sk.pdf",
                102400L,
                "application/pdf"
        );
        SubmitApplicationRequest submitReq = new SubmitApplicationRequest(
                savedCategory.getId(),
                "Học Viên Test",
                "001201009999",
                LocalDate.now().minusYears(25),
                Gender.FEMALE,
                "0988776655",
                "student_tester@gmail.com",
                "Hà Nội",
                List.of(doc)
        );
        String submitRes = mockMvc.perform(post("/api/v1/admissions")
                        .header("Authorization", "Bearer " + studentToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(submitReq)))
                .andReturn().getResponse().getContentAsString();

        long appId = objectMapper.readTree(submitRes).path("data").path("id").asLong();

        // Cán bộ duyệt hồ sơ
        ReviewApplicationRequest reviewRequest = new ReviewApplicationRequest(
                ApplicationStatus.APPROVED,
                "Hồ sơ đầy đủ, hợp lệ theo quy chế đào tạo"
        );

        mockMvc.perform(post("/api/v1/admissions/" + appId + "/review")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(reviewRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.status").value("APPROVED"));
    }
}
