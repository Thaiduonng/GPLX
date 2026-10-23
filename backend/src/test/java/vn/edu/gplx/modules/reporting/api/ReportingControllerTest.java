package vn.edu.gplx.modules.reporting.api;

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
import vn.edu.gplx.modules.identity.api.dto.RegisterRequest;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class ReportingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    private String adminToken;
    private String studentToken;

    @BeforeEach
    void setUp() throws Exception {
        // Đăng ký Admin
        RegisterRequest adminRegister = new RegisterRequest(
                "admin_rpt_tester", "admin_rpt@gmail.com", "pass12345", "Quản Trị Báo Cáo", "0911223344", "ROLE_ADMIN"
        );
        String adminRes = mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(adminRegister)))
                .andReturn().getResponse().getContentAsString();
        adminToken = objectMapper.readTree(adminRes).path("data").path("accessToken").asText();

        // Đăng ký Student
        RegisterRequest studentRegister = new RegisterRequest(
                "student_rpt_tester", "student_rpt@gmail.com", "pass12345", "Học Viên Báo Cáo", "0988776655", "ROLE_STUDENT"
        );
        String studentRes = mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(studentRegister)))
                .andReturn().getResponse().getContentAsString();
        studentToken = objectMapper.readTree(studentRes).path("data").path("accessToken").asText();
    }

    @Test
    @DisplayName("Admin can view dashboard summary (HTTP 200 OK)")
    void should_allowAdminToAccessDashboard() throws Exception {
        mockMvc.perform(get("/api/v1/reporting/dashboard")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.totalStudents").exists())
                .andExpect(jsonPath("$.data.overallPassRate").exists())
                .andExpect(jsonPath("$.data.categoryStats").isArray());
    }

    @Test
    @DisplayName("Admin can view audit logs (HTTP 200 OK)")
    void should_allowAdminToAccessAuditLogs() throws Exception {
        mockMvc.perform(get("/api/v1/reporting/audit-logs")
                        .param("page", "0")
                        .param("size", "10")
                        .header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray());
    }

    @Test
    @DisplayName("Student should be forbidden from accessing dashboard (HTTP 403)")
    void should_forbidStudentFromAccessingDashboard() throws Exception {
        mockMvc.perform(get("/api/v1/reporting/dashboard")
                        .header("Authorization", "Bearer " + studentToken))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("Unauthenticated request should be unauthorized (HTTP 401)")
    void should_denyUnauthenticatedAccess() throws Exception {
        mockMvc.perform(get("/api/v1/reporting/dashboard"))
                .andExpect(status().isUnauthorized());
    }
}
