package vn.edu.gplx.modules.identity.application;

import vn.edu.gplx.modules.identity.api.dto.AuthResponse;
import vn.edu.gplx.modules.identity.api.dto.LoginRequest;
import vn.edu.gplx.modules.identity.api.dto.RegisterRequest;
import vn.edu.gplx.modules.identity.api.dto.UserProfileResponse;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    UserProfileResponse getCurrentUser(String username);
}
