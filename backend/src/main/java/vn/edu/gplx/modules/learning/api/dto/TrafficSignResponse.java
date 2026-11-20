package vn.edu.gplx.modules.learning.api.dto;

import vn.edu.gplx.modules.learning.domain.TrafficSign;

/**
 * Thông tin một biển báo trong danh mục chuẩn.
 */
public record TrafficSignResponse(
        String code,
        String name,
        String group,
        String meaning,
        String shape,
        String standardVersion,
        String legalStatus,
        String legacyCode,
        String replacedByCode,
        String svgAsset,
        String rasterAsset
) {
    public static TrafficSignResponse from(TrafficSign sign) {
        return new TrafficSignResponse(
                sign.getCode(),
                sign.getName(),
                sign.getGroup().name(),
                sign.getMeaning(),
                sign.getShape(),
                sign.getStandardVersion(),
                sign.getLegalStatus(),
                sign.getLegacyCode(),
                sign.getReplacedByCode(),
                sign.getSvgAsset(),
                sign.getRasterAsset()
        );
    }
}
