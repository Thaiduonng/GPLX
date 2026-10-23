package vn.edu.gplx.modules.identity.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import vn.edu.gplx.modules.identity.api.dto.AuthResponse;
import vn.edu.gplx.modules.identity.api.dto.LoginRequest;
import vn.edu.gplx.modules.identity.api.dto.RegisterRequest;
import vn.edu.gplx.modules.identity.api.dto.UserProfileResponse;
import vn.edu.gplx.modules.identity.application.impl.AuthServiceImpl;
import vn.edu.gplx.modules.identity.domain.Role;
import vn.edu.gplx.modules.identity.domain.User;
import vn.edu.gplx.modules.identity.infrastructure.RoleRepository;
import vn.edu.gplx.modules.identity.infrastructure.UserRepository;
import vn.edu.gplx.shared.exception.BusinessRuleViolationException;
import vn.edu.gplx.shared.exception.ResourceNotFoundException;

import java.util.Optional;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private Authentication authentication;

    private AuthServiceImpl authService;

    @BeforeEach
    void setUp() {
        authService = new AuthServiceImpl(
                userRepository,
                roleRepository,
                passwordEncoder,
                jwtService,
                authenticationManager
        );
    }

    @Test
    @DisplayName("Đăng ký người dùng thành công khi dữ liệu hợp lệ")
    void should_registerUserSuccessfully_when_validData() {
        // Given
        RegisterRequest request = new RegisterRequest(
                "nguyenvana",
                "nguyenvana@gmail.com",
                "password123",
                "Nguyễn Văn A",
                "0901234567",
                "ROLE_STUDENT"
        );

        Role role = new Role("ROLE_STUDENT", "Học viên");
        role.setId(1L);

        User savedUser = new User(
                request.username(),
                request.email(),
                "encodedPassword",
                request.fullName(),
                request.phone()
        );
        savedUser.setId(10L);
        savedUser.setRoles(Set.of(role));

        given(userRepository.existsByUsername(request.username())).willReturn(false);
        given(userRepository.existsByEmail(request.email())).willReturn(false);
        given(passwordEncoder.encode(request.password())).willReturn("encodedPassword");
        given(roleRepository.findByName("ROLE_STUDENT")).willReturn(Optional.of(role));
        given(userRepository.save(any(User.class))).willReturn(savedUser);
        given(jwtService.generateToken(any())).willReturn("fake-jwt-token");

        // When
        AuthResponse response = authService.register(request);

        // Then
        assertThat(response).isNotNull();
        assertThat(response.accessToken()).isEqualTo("fake-jwt-token");
        assertThat(response.username()).isEqualTo("nguyenvana");
        assertThat(response.roles()).contains("ROLE_STUDENT");
        verify(userRepository).save(any(User.class));
    }

    @Test
    @DisplayName("Ném ngoại lệ vi phạm nghiệp vụ khi username đã tồn tại (ID-001)")
    void should_throwException_when_usernameAlreadyExists() {
        // Given
        RegisterRequest request = new RegisterRequest(
                "existinguser",
                "test@gmail.com",
                "password123",
                "Test User",
                "0901234567",
                null
        );

        given(userRepository.existsByUsername(request.username())).willReturn(true);

        // When & Then
        assertThatThrownBy(() -> authService.register(request))
                .isInstanceOf(BusinessRuleViolationException.class)
                .hasMessageContaining("Tên đăng nhập đã được sử dụng");
    }

    @Test
    @DisplayName("Ném ngoại lệ vi phạm nghiệp vụ khi email đã tồn tại (ID-002)")
    void should_throwException_when_emailAlreadyExists() {
        // Given
        RegisterRequest request = new RegisterRequest(
                "newuser",
                "existing@gmail.com",
                "password123",
                "Test User",
                "0901234567",
                null
        );

        given(userRepository.existsByUsername(request.username())).willReturn(false);
        given(userRepository.existsByEmail(request.email())).willReturn(true);

        // When & Then
        assertThatThrownBy(() -> authService.register(request))
                .isInstanceOf(BusinessRuleViolationException.class)
                .hasMessageContaining("Email đã được đăng ký trong hệ thống");
    }

    @Test
    @DisplayName("Đăng nhập thành công khi thông tin chính xác")
    void should_loginSuccessfully_when_validCredentials() {
        // Given
        LoginRequest request = new LoginRequest("nguyenvana", "password123");

        Role role = new Role("ROLE_STUDENT", "Học viên");
        User user = new User("nguyenvana", "nguyenvana@gmail.com", "encodedPassword", "Nguyễn Văn A", "0901234567");
        user.setId(10L);
        user.setRoles(Set.of(role));
        UserPrincipal principal = UserPrincipal.create(user);

        given(userRepository.findByUsernameOrEmail(request.usernameOrEmail(), request.usernameOrEmail()))
                .willReturn(Optional.of(user));
        given(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .willReturn(authentication);
        given(authentication.getPrincipal()).willReturn(principal);
        given(jwtService.generateToken(principal)).willReturn("valid-jwt-token");

        // When
        AuthResponse response = authService.login(request);

        // Then
        assertThat(response).isNotNull();
        assertThat(response.accessToken()).isEqualTo("valid-jwt-token");
        assertThat(response.username()).isEqualTo("nguyenvana");
    }

    @Test
    @DisplayName("Ném ngoại lệ BadCredentialsException khi sai mật khẩu")
    void should_throwException_when_invalidPassword() {
        // Given
        LoginRequest request = new LoginRequest("nguyenvana", "wrongpassword");

        User user = new User("nguyenvana", "nguyenvana@gmail.com", "encodedPassword", "Nguyễn Văn A", "0901234567");
        given(userRepository.findByUsernameOrEmail(request.usernameOrEmail(), request.usernameOrEmail()))
                .willReturn(Optional.of(user));
        given(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .willThrow(new BadCredentialsException("Sai mật khẩu"));

        // When & Then
        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(BadCredentialsException.class)
                .hasMessageContaining("Tên đăng nhập hoặc mật khẩu không chính xác");
    }

    @Test
    @DisplayName("Trả về thông tin UserProfileResponse khi user tồn tại")
    void should_returnUserProfile_when_userExists() {
        // Given
        User user = new User("nguyenvana", "nguyenvana@gmail.com", "encoded", "Nguyễn Văn A", "0901234567");
        user.setId(10L);
        user.setRoles(Set.of(new Role("ROLE_STUDENT", "Học viên")));

        given(userRepository.findByUsername("nguyenvana")).willReturn(Optional.of(user));

        // When
        UserProfileResponse profile = authService.getCurrentUser("nguyenvana");

        // Then
        assertThat(profile).isNotNull();
        assertThat(profile.username()).isEqualTo("nguyenvana");
        assertThat(profile.email()).isEqualTo("nguyenvana@gmail.com");
        assertThat(profile.roles()).contains("ROLE_STUDENT");
    }

    @Test
    @DisplayName("Ném ngoại lệ ResourceNotFoundException khi không tìm thấy user")
    void should_throwResourceNotFoundException_when_userNotFound() {
        given(userRepository.findByUsername("nonexistent")).willReturn(Optional.empty());

        assertThatThrownBy(() -> authService.getCurrentUser("nonexistent"))
                .isInstanceOf(ResourceNotFoundException.class);
    }
}
