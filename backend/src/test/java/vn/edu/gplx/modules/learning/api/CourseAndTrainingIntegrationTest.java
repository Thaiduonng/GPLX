package vn.edu.gplx.modules.learning.api;

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
import vn.edu.gplx.modules.identity.api.dto.RegisterRequest;
import vn.edu.gplx.modules.learning.domain.Course;
import vn.edu.gplx.modules.learning.domain.TheoryAnswer;
import vn.edu.gplx.modules.learning.domain.TheoryQuestion;
import vn.edu.gplx.modules.learning.infrastructure.CourseRepository;
import vn.edu.gplx.modules.learning.infrastructure.TheoryQuestionRepository;
import vn.edu.gplx.modules.training.api.dto.CreateClassRequest;

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
class CourseAndTrainingIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private LicenseCategoryRepository categoryRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private TheoryQuestionRepository questionRepository;

    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    private Course savedCourse;
    private String staffToken;
    private String studentToken;

    @BeforeEach
    void setUp() throws Exception {
        LicenseCategory cat = new LicenseCategory("B1", "Hạng B1 tự động", "Mô tả", 18, BigDecimal.valueOf(14000000));
        categoryRepository.save(cat);

        Course course = new Course(cat, "COURSE-B1-INT", "Khóa đào tạo B1", "Mô tả", 60);
        savedCourse = courseRepository.save(course);

        TheoryQuestion q = new TheoryQuestion("B1", 1, "Cấm uống rượu bia lái xe không?", null, "Nghiêm cấm", true);
        TheoryAnswer a1 = new TheoryAnswer(q, "Nghiêm cấm", true, 1);
        q.addAnswer(a1);
        questionRepository.save(q);

        // Staff token
        RegisterRequest staffRegister = new RegisterRequest(
                "staff_trainer", "staff_trainer@gmail.com", "pass12345", "Cán Bộ Đào Tạo", "0911002233", "ROLE_STAFF"
        );
        String staffRes = mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(staffRegister)))
                .andReturn().getResponse().getContentAsString();
        staffToken = objectMapper.readTree(staffRes).path("data").path("accessToken").asText();

        // Student token
        RegisterRequest studentRegister = new RegisterRequest(
                "student_driver", "student_driver@gmail.com", "pass12345", "Học Viên Lái Xe", "0922334455", "ROLE_STUDENT"
        );
        String studentRes = mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(studentRegister)))
                .andReturn().getResponse().getContentAsString();
        studentToken = objectMapper.readTree(studentRes).path("data").path("accessToken").asText();
    }

    @Test
    @DisplayName("GET /api/v1/courses - Công khai danh sách khóa học đào tạo")
    void should_getCourses_publicly() throws Exception {
        mockMvc.perform(get("/api/v1/courses"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].code").value("COURSE-B1-INT"));
    }

    @Test
    @DisplayName("GET /api/v1/theory/questions - Công khai câu hỏi ôn tập theo hạng GPLX")
    void should_getTheoryQuestions_publicly() throws Exception {
        mockMvc.perform(get("/api/v1/theory/questions?category=B1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data", hasSize(1)))
                .andExpect(jsonPath("$.data[0].isParalysis").value(true));
    }

    @Test
    @DisplayName("POST /api/v1/training/classes - Cán bộ tạo lớp học thành công 201 Created")
    void should_createClass_when_staffAuthenticated() throws Exception {
        CreateClassRequest request = new CreateClassRequest(
                savedCourse.getId(),
                "Lớp B1 Khóa 2026-A",
                1L,
                LocalDate.now().plusDays(2),
                LocalDate.now().plusMonths(3),
                25
        );

        mockMvc.perform(post("/api/v1/training/classes")
                        .header("Authorization", "Bearer " + staffToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.name").value("Lớp B1 Khóa 2026-A"))
                .andExpect(jsonPath("$.data.maxStudents").value(25));
    }

    @Test
    @DisplayName("GET /api/v1/training/dat/my-summary - Học viên tra cứu tổng hợp tiến độ thực hành DAT")
    void should_getDatSummary_when_studentAuthenticated() throws Exception {
        mockMvc.perform(get("/api/v1/training/dat/my-summary")
                        .header("Authorization", "Bearer " + studentToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.totalDistanceKm").value(0))
                .andExpect(jsonPath("$.data.isCompleted").value(false));
    }
}
