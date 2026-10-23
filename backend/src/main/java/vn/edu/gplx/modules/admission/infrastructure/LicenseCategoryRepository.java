package vn.edu.gplx.modules.admission.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.admission.domain.LicenseCategory;

import java.util.List;
import java.util.Optional;

@Repository
public interface LicenseCategoryRepository extends JpaRepository<LicenseCategory, Long> {

    Optional<LicenseCategory> findByCode(String code);

    List<LicenseCategory> findByIsActiveTrue();

    List<LicenseCategory> findByIsActiveTrueOrderByCodeAsc();

    boolean existsByCode(String code);
}
