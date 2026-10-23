package vn.edu.gplx.modules.identity.api.dto;

import java.util.List;

public record UserProfileResponse(
        Long id,
        String username,
        String email,
        String fullName,
        String phone,
        boolean active,
        List<String> roles
) {
}
