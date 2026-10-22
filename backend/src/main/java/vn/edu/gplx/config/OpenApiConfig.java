package vn.edu.gplx.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * OpenAPI 3.1 / Swagger Configuration.
 */
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI gplxOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("GPLX Training System REST API")
                        .description("Tài liệu API Hệ thống học, đào tạo và tiếp nhận hồ sơ thi cấp giấy phép lái xe các hạng")
                        .version("0.1.0")
                        .contact(new Contact()
                                .name("Đội ngũ phát triển GPLX")
                                .email("dev@gplx.edu.vn"))
                        .license(new License()
                                .name("Bản quyền Đồ án Tốt nghiệp 2026")))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Môi trường Phát triển Local"),
                        new Server().url("http://backend:8080").description("Môi trường Docker Compose Internal")
                ));
    }
}
