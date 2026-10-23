package vn.edu.gplx.modules.identity.application.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import vn.edu.gplx.modules.identity.api.dto.AuthResponse;
import vn.edu.gplx.modules.identity.api.dto.LoginRequest;
import vn.edu.gplx.modules.identity.api.dto.RegisterRequest;
import vn.edu.gplx.modules.identity.api.dto.UserProfileResponse;
import vn.edu.gplx.modules.identity.application.AuthService;
import vn.edu.gplx.modules.identity.application.JwtService;
import vn.edu.gplx.modules.identity.application.UserPrincipal;
import vn.edu.gplx.modules.identity.domain.Role;
import vn.edu.gplx.modules.identity.domain.RoleType;
import vn.edu.gplx.modules.identity.domain.User;
import vn.edu.gplx.modules.identity.infrastructure.RoleRepository;
import vn.edu.gplx.modules.identity.infrastructure.UserRepository;
import vn.edu.gplx.shared.exception.BusinessRuleViolationException;
import vn.edu.gplx.shared.exception.ResourceNotFoundException;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthServiceImpl.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthServiceImpl(
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        log.info("Processing user registration for username: {}, email: {}", request.username(), request.email());

        if (userRepository.existsByUsername(request.username())) {
            throw new BusinessRuleViolationException("ID-001", "Tên đăng nhập đã được sử dụng");
        }

        if (userRepository.existsByEmail(request.email())) {
            throw new BusinessRuleViolationException("ID-002", "Email đã được đăng ký trong hệ thống");
        }

        User user = new User(
                request.username(),
                request.email(),
                passwordEncoder.encode(request.password()),
                request.fullName(),
                request.phone()
        );

        String targetRole = StringUtils.hasText(request.role()) ? request.role() : RoleType.ROLE_STUDENT.name();
        Role role = roleRepository.findByName(targetRole)
                .orElseGet(() -> roleRepository.save(new Role(targetRole, "Tự động khởi tạo vai trò")));

        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRoles(roles);

        User savedUser = userRepository.save(user);
        log.info("User registered successfully with ID: {}", savedUser.getId());

        UserPrincipal principal = UserPrincipal.create(savedUser);
        String token = jwtService.generateToken(principal);

        List<String> roleNames = savedUser.getRoles().stream()
                .map(Role::getName)
                .toList();

        return AuthResponse.of(
                token,
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getFullName(),
                roleNames
        );
    }

    @Override
    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        log.info("Processing login attempt for: {}", request.usernameOrEmail());

        User user = userRepository.findByUsernameOrEmail(request.usernameOrEmail(), request.usernameOrEmail())
                .orElseThrow(() -> new BadCredentialsException("Tên đăng nhập hoặc mật khẩu không chính xác"));

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), request.password())
            );

            UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
            String token = jwtService.generateToken(principal);

            List<String> roleNames = user.getRoles().stream()
                    .map(Role::getName)
                    .toList();

            log.info("User {} logged in successfully", user.getUsername());
            return AuthResponse.of(
                    token,
                    user.getId(),
                    user.getUsername(),
                    user.getEmail(),
                    user.getFullName(),
                    roleNames
            );
        } catch (BadCredentialsException ex) {
            log.warn("Invalid password for user: {}", user.getUsername());
            throw new BadCredentialsException("Tên đăng nhập hoặc mật khẩu không chính xác");
        }
    }

    @Override
    @Transactional(readOnly = true)
    public UserProfileResponse getCurrentUser(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        List<String> roleNames = user.getRoles().stream()
                .map(Role::getName)
                .toList();

        return new UserProfileResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getFullName(),
                user.getPhone(),
                user.isActive(),
                roleNames
        );
    }
}
