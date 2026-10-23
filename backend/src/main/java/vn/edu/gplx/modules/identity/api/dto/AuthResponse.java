package vn.edu.gplx.modules.identity.api.dto;

import java.util.List;

public record AuthResponse(
        String accessToken,
        String tokenType,
        Long userId,
        String username,
        String email,
        String fullName,
        List<String> roles
) {
    public static AuthResponse of(String accessToken, Long userId, String username, String email, String fullName, List<String> roles) {
        return new AuthResponse(accessToken, "Bearer", userId, username, email, fullName, roles);
    }
}
