package vn.edu.gplx.modules.admission.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.gplx.modules.admission.api.dto.LicenseCategoryResponse;
import vn.edu.gplx.modules.admission.application.LicenseCategoryService;
import vn.edu.gplx.shared.api.ApiResponse;

import java.util.List;

@Tag(name = "License Categories", description = "Danh mục hạng giấy phép lái xe")
@RestController
@RequestMapping("/api/v1/license-categories")
public class LicenseCategoryController {

    private final LicenseCategoryService categoryService;

    public LicenseCategoryController(LicenseCategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Operation(summary = "Lấy danh sách các hạng GPLX đang hoạt động")
    @GetMapping
    public ResponseEntity<ApiResponse<List<LicenseCategoryResponse>>> getActiveCategories() {
        List<LicenseCategoryResponse> categories = categoryService.getActiveCategories();
        return ResponseEntity.ok(ApiResponse.success(categories));
    }

    @Operation(summary = "Xem thông tin chi tiết một hạng GPLX theo ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<LicenseCategoryResponse>> getCategoryById(@PathVariable Long id) {
        LicenseCategoryResponse category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(ApiResponse.success(category));
    }
}
