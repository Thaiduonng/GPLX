package vn.edu.gplx.modules.admission.application;

import vn.edu.gplx.modules.admission.api.dto.LicenseCategoryResponse;

import java.util.List;

public interface LicenseCategoryService {

    List<LicenseCategoryResponse> getActiveCategories();

    LicenseCategoryResponse getCategoryById(Long id);
}
