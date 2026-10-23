package vn.edu.gplx.modules.identity.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.identity.api.dto.LoginRequest;
import vn.edu.gplx.modules.identity.api.dto.RegisterRequest;

import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.notNullValue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    @DisplayName("POST /api/v1/auth/register - Đăng ký thành công trả về 201 Created và JWT Token")
    void should_registerUserSuccessfully() throws Exception {
        RegisterRequest request = new RegisterRequest(
                "tranvanb",
                "tranvanb@gmail.com",
                "securePass123",
                "Trần Văn B",
                "0912345678",
                "ROLE_STUDENT"
        );

        mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.accessToken").value(notNullValue()))
                .andExpect(jsonPath("$.data.username").value("tranvanb"))
                .andExpect(jsonPath("$.data.email").value("tranvanb@gmail.com"))
                .andExpect(jsonPath("$.data.roles[0]").value("ROLE_STUDENT"));
    }

    @Test
    @DisplayName("POST /api/v1/auth/register - Thất bại 400 Bad Request khi email không hợp lệ")
    void should_returnBadRequest_when_emailInvalid() throws Exception {
        RegisterRequest request = new RegisterRequest(
                "tranvanc",
                "invalid-email-format",
                "securePass123",
                "Trần Văn C",
                "0912345678",
                null
        );

        mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status").value(400))
                .andExpect(jsonPath("$.error").value("Validation Failed"));
    }

    @Test
    @DisplayName("POST /api/v1/auth/login - Đăng nhập thành công trả về 200 OK và JWT Token")
    void should_loginSuccessfully_when_validCredentials() throws Exception {
        // Đăng ký trước
        RegisterRequest register = new RegisterRequest(
                "userlogin",
                "userlogin@gmail.com",
                "password123",
                "Người Dùng Đăng Nhập",
                "0987654321",
                "ROLE_STUDENT"
        );
        mockMvc.perform(post("/api/v1/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(register)));

        // Đăng nhập
        LoginRequest login = new LoginRequest("userlogin", "password123");

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.accessToken").value(notNullValue()))
                .andExpect(jsonPath("$.data.username").value("userlogin"));
    }

    @Test
    @DisplayName("POST /api/v1/auth/login - Thất bại 401 Unauthorized khi mật khẩu sai")
    void should_returnUnauthorized_when_wrongPassword() throws Exception {
        // Đăng ký trước
        RegisterRequest register = new RegisterRequest(
                "userwrongpass",
                "wrongpass@gmail.com",
                "correctPassword",
                "User Wrong Pass",
                "0987654321",
                null
        );
        mockMvc.perform(post("/api/v1/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(register)));

        // Đăng nhập sai pass
        LoginRequest login = new LoginRequest("userwrongpass", "incorrectPassword");

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(login)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401));
    }

    @Test
    @DisplayName("GET /api/v1/auth/me - Truy cập bị từ chối 401 Unauthorized khi không gửi JWT Token")
    void should_denyAccessToMeEndpoint_when_noTokenProvided() throws Exception {
        mockMvc.perform(get("/api/v1/auth/me"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401));
    }

    @Test
    @DisplayName("GET /api/v1/auth/me - Trả về hồ sơ cá nhân khi gửi JWT Token hợp lệ")
    void should_returnUserProfile_when_validTokenProvided() throws Exception {
        RegisterRequest register = new RegisterRequest(
                "myprofileuser",
                "myprofile@gmail.com",
                "password123",
                "Nguyễn Văn Profile",
                "0911223344",
                "ROLE_STUDENT"
        );

        String regResponseStr = mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(register)))
                .andReturn().getResponse().getContentAsString();

        String token = objectMapper.readTree(regResponseStr).path("data").path("accessToken").asText();

        mockMvc.perform(get("/api/v1/auth/me")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.username").value("myprofileuser"))
                .andExpect(jsonPath("$.data.email").value("myprofile@gmail.com"))
                .andExpect(jsonPath("$.data.fullName").value("Nguyễn Văn Profile"));
    }
}
