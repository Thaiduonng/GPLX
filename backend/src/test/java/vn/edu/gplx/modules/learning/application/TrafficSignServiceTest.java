package vn.edu.gplx.modules.learning.application;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.learning.api.dto.TrafficSignResponse;
import vn.edu.gplx.modules.learning.api.dto.TrafficSignUpdateRequest;
import vn.edu.gplx.modules.learning.domain.TrafficSign;
import vn.edu.gplx.modules.learning.domain.TrafficSignGroup;
import vn.edu.gplx.modules.learning.infrastructure.TrafficSignRepository;
import vn.edu.gplx.shared.exception.ResourceNotFoundException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class TrafficSignServiceTest {

    @Autowired
    private TrafficSignService service;

    @Autowired
    private TrafficSignRepository repository;

    private TrafficSign seed(String code, String name, TrafficSignGroup group) {
        TrafficSign sign = new TrafficSign(code, name, group, "QCVN41:2019");
        sign.setSearchText(TrafficSignService.normalize(code + " " + name));
        return repository.save(sign);
    }

    private Page<TrafficSignResponse> search(String q, TrafficSignGroup group) {
        return service.search(q, group, PageRequest.of(0, 24));
    }

    @Test
    @DisplayName("Tìm theo mã biến thể trả đúng biển")
    void searchByCodeReturnsVariant() {
        seed("P.103a", "Cấm xe ô tô", TrafficSignGroup.CAM);
        seed("P.103b", "Cấm xe ô tô rẽ phải", TrafficSignGroup.CAM);

        Page<TrafficSignResponse> page = search("p.103b", null);

        assertThat(page.getContent()).extracting(TrafficSignResponse::code).containsExactly("P.103b");
    }

    @Test
    @DisplayName("Tìm không dấu hoặc chữ hoa có dấu đều ra biển Dừng lại")
    void searchMatchesWithoutDiacritics() {
        seed("R.122", "Dừng lại", TrafficSignGroup.HIEU_LENH);
        seed("P.101", "Đường cấm", TrafficSignGroup.CAM);

        assertThat(search("dung lai", null).getContent()).extracting(TrafficSignResponse::code).containsExactly("R.122");
        assertThat(search("DỪNG LẠI", null).getContent()).extracting(TrafficSignResponse::code).containsExactly("R.122");
        assertThat(search("duong cam", null).getContent()).extracting(TrafficSignResponse::code).containsExactly("P.101");
    }

    @Test
    @DisplayName("Lọc theo nhóm biển")
    void filterByGroup() {
        seed("P.101", "Đường cấm", TrafficSignGroup.CAM);
        seed("W.224", "Đường người đi bộ cắt ngang", TrafficSignGroup.NGUY_HIEM);

        Page<TrafficSignResponse> page = search(null, TrafficSignGroup.NGUY_HIEM);

        assertThat(page.getContent()).extracting(TrafficSignResponse::code).containsExactly("W.224");
        assertThat(page.getContent().get(0).group()).isEqualTo("NGUY_HIEM");
    }

    @Test
    @DisplayName("Cập nhật tính lại search_text và từ chối mã không tồn tại")
    void updateRecomputesSearchTextAndRejectsUnknownCode() {
        seed("R.122", "Dừng lại", TrafficSignGroup.HIEU_LENH);
        TrafficSignUpdateRequest request = new TrafficSignUpdateRequest(
                "Dừng lại bắt buộc", "Ý nghĩa mới", "VERIFIED", null, "/signs/svg/R.122.svg");

        TrafficSignResponse updated = service.update("R.122", request);

        assertThat(updated.legalStatus()).isEqualTo("VERIFIED");
        assertThat(updated.svgAsset()).isEqualTo("/signs/svg/R.122.svg");
        assertThat(search("bat buoc", null).getContent()).extracting(TrafficSignResponse::code).containsExactly("R.122");
        assertThatThrownBy(() -> service.update("X.999", request)).isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    @DisplayName("Chuẩn hóa tìm kiếm khớp quy tắc của script Python")
    void normalizeMatchesToolRule() {
        assertThat(TrafficSignService.normalize("  R.122 DỪNG LẠI Đường ")).isEqualTo("r.122 dung lai duong");
    }
}
