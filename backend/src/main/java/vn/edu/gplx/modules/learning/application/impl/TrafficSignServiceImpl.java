package vn.edu.gplx.modules.learning.application.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import vn.edu.gplx.modules.learning.api.dto.TrafficSignResponse;
import vn.edu.gplx.modules.learning.api.dto.TrafficSignUpdateRequest;
import vn.edu.gplx.modules.learning.application.TrafficSignService;
import vn.edu.gplx.modules.learning.domain.TrafficSign;
import vn.edu.gplx.modules.learning.domain.TrafficSignGroup;
import vn.edu.gplx.modules.learning.infrastructure.TrafficSignRepository;
import vn.edu.gplx.shared.exception.ResourceNotFoundException;

@Service
@Transactional(readOnly = true)
public class TrafficSignServiceImpl implements TrafficSignService {

    private static final Logger log = LoggerFactory.getLogger(TrafficSignServiceImpl.class);

    private final TrafficSignRepository repository;

    public TrafficSignServiceImpl(TrafficSignRepository repository) {
        this.repository = repository;
    }

    @Override
    public Page<TrafficSignResponse> search(String query, TrafficSignGroup group, Pageable pageable) {
        String normalized = StringUtils.hasText(query) ? TrafficSignService.normalize(query) : null;
        Pageable sorted = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("code").ascending());
        return repository.search(normalized, group, sorted).map(TrafficSignResponse::from);
    }

    @Override
    public TrafficSignResponse getByCode(String code) {
        return TrafficSignResponse.from(findLatest(code));
    }

    @Override
    @Transactional
    public TrafficSignResponse update(String code, TrafficSignUpdateRequest request) {
        TrafficSign sign = findLatest(code);
        sign.setName(request.name().trim());
        sign.setMeaning(request.meaning());
        sign.setLegalStatus(request.legalStatus());
        sign.setReplacedByCode(StringUtils.hasText(request.replacedByCode()) ? request.replacedByCode().trim() : null);
        sign.setSvgAsset(StringUtils.hasText(request.svgAsset()) ? request.svgAsset().trim() : null);
        sign.setSearchText(TrafficSignService.normalize(sign.getCode() + " " + sign.getName()));
        log.info("Cập nhật biển báo {} ({}), trạng thái pháp lý {}", sign.getCode(), sign.getStandardVersion(), sign.getLegalStatus());
        return TrafficSignResponse.from(repository.save(sign));
    }

    @Override
    public boolean existsByCode(String code) {
        return StringUtils.hasText(code) && repository.existsByCode(code.trim());
    }

    private TrafficSign findLatest(String code) {
        return repository.findByCodeOrderByIdDesc(code).stream()
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Biển báo", "mã", code));
    }
}
