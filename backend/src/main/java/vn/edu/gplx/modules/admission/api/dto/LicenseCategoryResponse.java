package vn.edu.gplx.modules.admission.api.dto;

import vn.edu.gplx.modules.admission.domain.LicenseCategory;

import java.math.BigDecimal;

public record LicenseCategoryResponse(
        Long id,
        String code,
        String name,
        String description,
        int minAge,
        BigDecimal tuitionFee,
        boolean active
) {
    public static LicenseCategoryResponse fromEntity(LicenseCategory entity) {
        return new LicenseCategoryResponse(
                entity.getId(),
                entity.getCode(),
                entity.getName(),
                entity.getDescription(),
                entity.getMinAge(),
                entity.getTuitionFee(),
                entity.isActive()
        );
    }
}
