package vn.edu.gplx.modules.examination.api;

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
import vn.edu.gplx.modules.admission.domain.LicenseCategory;
import vn.edu.gplx.modules.admission.infrastructure.LicenseCategoryRepository;
import vn.edu.gplx.modules.examination.api.dto.CreateExamSessionRequest;
import vn.edu.gplx.modules.examination.domain.ExamType;
import vn.edu.gplx.modules.identity.api.dto.RegisterRequest;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class ExaminationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private LicenseCategoryRepository categoryRepository;

    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    private String adminToken;
    private String studentToken;
    private LicenseCategory savedCategory;

    @BeforeEach
    void setUp() throws Exception {
        savedCategory = categoryRepository.findByCode("B1")
                .orElseGet(() -> categoryRepository.save(new LicenseCategory("B1", "Hạng B1", "Mô tả", 18, BigDecimal.valueOf(14000000))));

        // Đăng ký tài khoản Admin và lấy Token
        RegisterRequest adminRegister = new RegisterRequest(
                "admin_exam_tester", "admin_exam@gmail.com", "pass12345", "Quản Trị Thi", "0933445566", "ROLE_ADMIN"
        );
        String adminRes = mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(adminRegister)))
                .andReturn().getResponse().getContentAsString();
        adminToken = objectMapper.readTree(adminRes).path("data").path("accessToken").asText();

        // Đăng ký tài khoản Học viên và lấy Token
        RegisterRequest studentRegister = new RegisterRequest(
                "student_exam_tester", "student_exam@gmail.com", "pass12345", "Học Viên Thi", "0944556677", "ROLE_STUDENT"
        );
        String studentRes = mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(studentRegister)))
                .andReturn().getResponse().getContentAsString();
        studentToken = objectMapper.readTree(studentRes).path("data").path("accessToken").asText();
    }

    @Test
    @DisplayName("GET /api/v1/examination/sessions - Public truy cập danh sách các kỳ thi sát hạch")
    void should_getExamSessions_withoutAuthentication() throws Exception {
        mockMvc.perform(get("/api/v1/examination/sessions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray());
    }

    @Test
    @DisplayName("POST /api/v1/examination/sessions - Bị cấm 403 khi role STUDENT cố tạo kỳ thi")
    void should_denyCreateSession_when_roleIsStudent() throws Exception {
        CreateExamSessionRequest request = new CreateExamSessionRequest(
                "Kỳ thi thử", savedCategory.getId(), LocalDate.now().plusDays(20), "Sân thi 1", ExamType.GRADUATION
        );

        mockMvc.perform(post("/api/v1/examination/sessions")
                        .header("Authorization", "Bearer " + studentToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("POST /api/v1/examination/sessions - Cho phép ADMIN tạo kỳ thi sát hạch thành công 201")
    void should_createSession_successfully_when_roleIsAdmin() throws Exception {
        CreateExamSessionRequest request = new CreateExamSessionRequest(
                "Kỳ Sát Hạch GPLX Hạng B1 Đợt 1",
                savedCategory.getId(),
                LocalDate.now().plusDays(30),
                "Trung tâm Sát hạch Lái xe Quốc gia",
                ExamType.CERTIFICATION
        );

        mockMvc.perform(post("/api/v1/examination/sessions")
                        .header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.name").value("Kỳ Sát Hạch GPLX Hạng B1 Đợt 1"))
                .andExpect(jsonPath("$.data.categoryCode").value("B1"));
    }
}
