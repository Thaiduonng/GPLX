package vn.edu.gplx.modules.admission.application.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.admission.api.dto.LicenseCategoryResponse;
import vn.edu.gplx.modules.admission.application.LicenseCategoryService;
import vn.edu.gplx.modules.admission.domain.LicenseCategory;
import vn.edu.gplx.modules.admission.infrastructure.LicenseCategoryRepository;
import vn.edu.gplx.shared.exception.ResourceNotFoundException;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class LicenseCategoryServiceImpl implements LicenseCategoryService {

    private final LicenseCategoryRepository categoryRepository;

    public LicenseCategoryServiceImpl(LicenseCategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<LicenseCategoryResponse> getActiveCategories() {
        return categoryRepository.findByIsActiveTrueOrderByCodeAsc().stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public LicenseCategoryResponse getCategoryById(Long id) {
        LicenseCategory category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("LicenseCategory", "id", id));
        return toResponse(category);
    }

    private LicenseCategoryResponse toResponse(LicenseCategory category) {
        return new LicenseCategoryResponse(
                category.getId(),
                category.getCode(),
                category.getName(),
                category.getDescription(),
                category.getMinAge(),
                category.getTuitionFee(),
                category.getIsActive()
        );
    }
}
