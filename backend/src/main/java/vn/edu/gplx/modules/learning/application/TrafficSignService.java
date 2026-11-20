package vn.edu.gplx.modules.learning.application;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.edu.gplx.modules.learning.api.dto.TrafficSignResponse;
import vn.edu.gplx.modules.learning.api.dto.TrafficSignUpdateRequest;
import vn.edu.gplx.modules.learning.domain.TrafficSignGroup;

import java.text.Normalizer;
import java.util.Locale;

/**
 * Danh mục biển báo hiệu đường bộ chuẩn (LRN-SIGN-001).
 */
public interface TrafficSignService {

    Page<TrafficSignResponse> search(String query, TrafficSignGroup group, Pageable pageable);

    TrafficSignResponse getByCode(String code);

    TrafficSignResponse update(String code, TrafficSignUpdateRequest request);

    boolean existsByCode(String code);

    /**
     * Chuẩn hóa chuỗi tìm kiếm: bỏ dấu tiếng Việt, đ → d, chữ thường, gộp khoảng trắng.
     * Phải khớp {@code normalize} trong tools/signs/extract_signs.py (dùng để sinh dữ liệu seed).
     */
    static String normalize(String text) {
        if (text == null) {
            return "";
        }
        String replaced = text.replace('đ', 'd').replace('Đ', 'D');
        String stripped = Normalizer.normalize(replaced, Normalizer.Form.NFD).replaceAll("\\p{M}", "");
        return stripped.replaceAll("\\s+", " ").trim().toLowerCase(Locale.ROOT);
    }
}
