package vn.edu.gplx.config;

import org.flywaydb.core.Flyway;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.util.Arrays;

/**
 * Cấu hình tự động thực thi Flyway Database Migration.
 * Đảm bảo toàn bộ migration script (V1 đến V7) được áp dụng trước khi
 * Hibernate EntityManagerFactory tiến hành schema validation.
 */
@Configuration
public class FlywayConfig {

    private static final Logger log = LoggerFactory.getLogger(FlywayConfig.class);

    @Value("${spring.flyway.locations:classpath:db/migration}")
    private String locations;

    @Value("${spring.flyway.baseline-on-migrate:true}")
    private boolean baselineOnMigrate;

    @Bean
    public Flyway flyway(DataSource dataSource) {
        log.info("Khởi chạy Flyway Database Migration từ: {}", locations);
        Flyway flyway = Flyway.configure()
                .dataSource(dataSource)
                .locations(locations)
                .baselineOnMigrate(baselineOnMigrate)
                .cleanDisabled(true)
                .load();
        flyway.repair();
        flyway.migrate();
        log.info("Flyway Database Migration đã hoàn tất thành công!");
        return flyway;
    }

    @Bean
    public static BeanFactoryPostProcessor dependsOnFlywayPostProcessor() {
        return beanFactory -> {
            if (beanFactory.containsBeanDefinition("entityManagerFactory")) {
                BeanDefinition def = beanFactory.getBeanDefinition("entityManagerFactory");
                String[] current = def.getDependsOn();
                if (current == null) {
                    def.setDependsOn("flyway");
                } else {
                    String[] updated = Arrays.copyOf(current, current.length + 1);
                    updated[current.length] = "flyway";
                    def.setDependsOn(updated);
                }
            }
        };
    }
}
