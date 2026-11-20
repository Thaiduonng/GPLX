package vn.edu.gplx.modules.learning.api;

import com.fasterxml.jackson.databind.ObjectMapper;
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
import vn.edu.gplx.modules.learning.api.dto.TrafficSignUpdateRequest;
import vn.edu.gplx.modules.learning.application.TrafficSignService;
import vn.edu.gplx.modules.learning.domain.TrafficSign;
import vn.edu.gplx.modules.learning.domain.TrafficSignGroup;
import vn.edu.gplx.modules.learning.infrastructure.TrafficSignRepository;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class TrafficSignControllerTest {

    private static final String BASE = "/api/v1/learning/traffic-signs";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TrafficSignRepository repository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private String studentToken;
    private String adminToken;

    private String register(String username, String role) throws Exception {
        RegisterRequest request = new RegisterRequest(
                username, username + "@gmail.com", "pass12345", "Người dùng " + username, "0911002233", role);
        String body = mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andReturn().getResponse().getContentAsString();
        return objectMapper.readTree(body).path("data").path("accessToken").asText();
    }

    @BeforeEach
    void setUp() throws Exception {
        TrafficSign stop = new TrafficSign("R.122", "Dừng lại", TrafficSignGroup.HIEU_LENH, "QCVN41:2019");
        stop.setSearchText(TrafficSignService.normalize("R.122 Dừng lại"));
        repository.save(stop);
        studentToken = register("sign_student", "ROLE_STUDENT");
        adminToken = register("sign_admin", "ROLE_ADMIN");
    }

    private String updateBody(String legalStatus) throws Exception {
        return objectMapper.writeValueAsString(
                new TrafficSignUpdateRequest("Dừng lại", "Ý nghĩa", legalStatus, null, null));
    }

    @Test
    @DisplayName("Chưa đăng nhập không được tra cứu")
    void listRequiresAuthentication() throws Exception {
        mockMvc.perform(get(BASE)).andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("Học viên tra cứu được danh mục")
    void studentCanSearch() throws Exception {
        mockMvc.perform(get(BASE).param("q", "dung lai").header("Authorization", "Bearer " + studentToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.content[0].code").value("R.122"))
                .andExpect(jsonPath("$.data.content[0].group").value("HIEU_LENH"))
                .andExpect(jsonPath("$.data.totalElements").value(1))
                .andExpect(jsonPath("$.data.totalPages").value(1))
                .andExpect(jsonPath("$.data.number").value(0));
    }

    @Test
    @DisplayName("Mã không tồn tại trả 404")
    void unknownCodeReturns404() throws Exception {
        mockMvc.perform(get(BASE + "/X.999").header("Authorization", "Bearer " + studentToken))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("Học viên không được sửa biển")
    void studentCannotUpdate() throws Exception {
        mockMvc.perform(put(BASE + "/R.122").header("Authorization", "Bearer " + studentToken)
                        .contentType(MediaType.APPLICATION_JSON).content(updateBody("VERIFIED")))
                .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("Trạng thái pháp lý sai trả 400")
    void invalidLegalStatusReturns400() throws Exception {
        mockMvc.perform(put(BASE + "/R.122").header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON).content(updateBody("SAI")))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("Quản trị viên cập nhật biển thành công")
    void adminCanUpdate() throws Exception {
        mockMvc.perform(put(BASE + "/R.122").header("Authorization", "Bearer " + adminToken)
                        .contentType(MediaType.APPLICATION_JSON).content(updateBody("VERIFIED")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.legalStatus").value("VERIFIED"));
    }
}
