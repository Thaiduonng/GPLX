package vn.edu.gplx;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class GplxApplicationTests {

    @Test
    @DisplayName("Đảm bảo Spring Boot Application Context khởi tạo thành công")
    void contextLoads() {
        // Kiểm chứng tính tương thích của bean context và configuration
    }
}
