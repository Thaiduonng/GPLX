package vn.edu.gplx.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import vn.edu.gplx.modules.identity.application.JwtAuthenticationEntryPoint;
import vn.edu.gplx.modules.identity.application.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter,
            JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .exceptionHandling(ex -> ex.authenticationEntryPoint(jwtAuthenticationEntryPoint))
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(authorize -> authorize
                // Public Health and Actuator endpoints
                .requestMatchers("/api/v1/health/**").permitAll()
                .requestMatchers("/actuator/health/**").permitAll()
                // Public Admissions, Inquiries & Applications Tracking
                .requestMatchers("/api/v1/public/**").permitAll()
                // Public Authentication endpoints (login, register)
                .requestMatchers("/api/v1/auth/login", "/api/v1/auth/register").permitAll()
                // Public Catalogs: License Categories, Courses, Theory questions, Examination sessions, Fleet
                .requestMatchers("/api/v1/license-categories/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/courses/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/theory/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/examination/sessions/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/fleet/**").permitAll()
                // OpenAPI / Swagger endpoints
                .requestMatchers("/swagger-ui/**", "/swagger-ui.html", "/v3/api-docs/**").permitAll()
                // All other requests require authentication
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
}
