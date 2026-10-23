package vn.edu.gplx.modules.finance.api;

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
import vn.edu.gplx.modules.finance.api.dto.CreateInvoiceRequest;
import vn.edu.gplx.modules.finance.api.dto.RecordPaymentRequest;
import vn.edu.gplx.modules.finance.domain.PaymentMethod;
import vn.edu.gplx.modules.identity.api.dto.RegisterRequest;
import vn.edu.gplx.modules.identity.domain.User;
import vn.edu.gplx.modules.identity.infrastructure.UserRepository;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
class FinanceAndFleetIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private LicenseCategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    private String staffToken;
    private String studentToken;
    private User savedStudent;
    private LicenseCategory savedCategory;

    @BeforeEach
    void setUp() throws Exception {
        savedCategory = categoryRepository.findByCode("B1")
                .orElseGet(() -> categoryRepository.save(new LicenseCategory("B1", "Hạng B1", "Mô tả", 18, BigDecimal.valueOf(14000000))));

        RegisterRequest staffRegister = new RegisterRequest(
                "staff_cashier", "cashier@gmail.com", "pass12345", "Cán Bộ Tài Vụ", "0911223344", "ROLE_STAFF"
        );
        String staffRes = mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(staffRegister)))
                .andReturn().getResponse().getContentAsString();
        staffToken = objectMapper.readTree(staffRes).path("data").path("accessToken").asText();

        RegisterRequest studentRegister = new RegisterRequest(
                "student_payer", "payer@gmail.com", "pass12345", "Học Viên Nộp Tiền", "0955667788", "ROLE_STUDENT"
        );
        String studentRes = mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(studentRegister)))
                .andReturn().getResponse().getContentAsString();
        studentToken = objectMapper.readTree(studentRes).path("data").path("accessToken").asText();

        savedStudent = userRepository.findByUsername("student_payer").orElseThrow();
    }

    @Test
    @DisplayName("Quy trình Tài chính: Tạo hóa đơn và nộp tiền học phí chống trùng FIN-001")
    void should_createInvoice_andPay_successfully() throws Exception {
        // 1. Cán bộ tài vụ tạo hóa đơn học phí
        CreateInvoiceRequest invoiceRequest = new CreateInvoiceRequest(
                savedStudent.getId(), savedCategory.getId(), BigDecimal.valueOf(14000000), LocalDate.now().plusMonths(1)
        );

        String createRes = mockMvc.perform(post("/api/v1/finance/invoices")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invoiceRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.status").value("PENDING"))
                .andReturn().getResponse().getContentAsString();

        long invoiceId = objectMapper.readTree(createRes).path("data").path("id").asLong();

        // 2. Học viên thanh toán học phí
        RecordPaymentRequest payRequest = new RecordPaymentRequest(
                BigDecimal.valueOf(14000000), PaymentMethod.BANK_TRANSFER, "TXN-VNPAY-888999", "Thanh toán toàn bộ học phí B1"
        );

        mockMvc.perform(post("/api/v1/finance/invoices/" + invoiceId + "/pay")
                        .header("Authorization", "Bearer " + studentToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payRequest)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.amount").value(14000000));

        // 3. FIN-001: Thanh toán lại cùng key -> Bị từ chối
        mockMvc.perform(post("/api/v1/finance/invoices/" + invoiceId + "/pay")
                        .header("Authorization", "Bearer " + studentToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payRequest)))
                .andExpect(status().isUnprocessableEntity());
    }

    @Test
    @DisplayName("GET /api/v1/fleet/available - Công khai danh sách xe tập lái sẵn sàng hoạt động")
    void should_getAvailableVehicles_publicly() throws Exception {
        mockMvc.perform(get("/api/v1/fleet/available"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray());
    }
}
