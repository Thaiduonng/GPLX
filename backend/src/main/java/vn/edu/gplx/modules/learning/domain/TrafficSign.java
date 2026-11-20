package vn.edu.gplx.modules.learning.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import vn.edu.gplx.shared.domain.BaseEntity;

/**
 * Biển báo hiệu đường bộ trong danh mục chuẩn (quy tắc LRN-SIGN-001).
 * Mỗi bản ghi gắn với một phiên bản quy chuẩn và trạng thái xác minh pháp lý.
 */
@Entity
@Table(name = "traffic_signs",
        uniqueConstraints = @UniqueConstraint(name = "uk_traffic_signs_code_version",
                columnNames = {"code", "standard_version"}))
public class TrafficSign extends BaseEntity {

    @Column(name = "code", nullable = false, length = 20)
    private String code;

    @Column(name = "name", nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "sign_group", nullable = false, length = 20)
    private TrafficSignGroup group;

    @Column(name = "meaning", columnDefinition = "TEXT")
    private String meaning;

    @Column(name = "shape", length = 30)
    private String shape;

    @Column(name = "standard_version", nullable = false, length = 30)
    private String standardVersion;

    @Column(name = "legal_status", nullable = false, length = 30)
    private String legalStatus = "NEEDS_VERIFICATION";

    @Column(name = "legacy_code", length = 20)
    private String legacyCode;

    @Column(name = "replaced_by_code", length = 20)
    private String replacedByCode;

    @Column(name = "svg_asset")
    private String svgAsset;

    @Column(name = "raster_asset")
    private String rasterAsset;

    @Column(name = "search_text", nullable = false, length = 400)
    private String searchText;

    public TrafficSign() {
    }

    public TrafficSign(String code, String name, TrafficSignGroup group, String standardVersion) {
        this.code = code;
        this.name = name;
        this.group = group;
        this.standardVersion = standardVersion;
    }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public TrafficSignGroup getGroup() { return group; }
    public void setGroup(TrafficSignGroup group) { this.group = group; }
    public String getMeaning() { return meaning; }
    public void setMeaning(String meaning) { this.meaning = meaning; }
    public String getShape() { return shape; }
    public void setShape(String shape) { this.shape = shape; }
    public String getStandardVersion() { return standardVersion; }
    public void setStandardVersion(String standardVersion) { this.standardVersion = standardVersion; }
    public String getLegalStatus() { return legalStatus; }
    public void setLegalStatus(String legalStatus) { this.legalStatus = legalStatus; }
    public String getLegacyCode() { return legacyCode; }
    public void setLegacyCode(String legacyCode) { this.legacyCode = legacyCode; }
    public String getReplacedByCode() { return replacedByCode; }
    public void setReplacedByCode(String replacedByCode) { this.replacedByCode = replacedByCode; }
    public String getSvgAsset() { return svgAsset; }
    public void setSvgAsset(String svgAsset) { this.svgAsset = svgAsset; }
    public String getRasterAsset() { return rasterAsset; }
    public void setRasterAsset(String rasterAsset) { this.rasterAsset = rasterAsset; }
    public String getSearchText() { return searchText; }
    public void setSearchText(String searchText) { this.searchText = searchText; }
}
