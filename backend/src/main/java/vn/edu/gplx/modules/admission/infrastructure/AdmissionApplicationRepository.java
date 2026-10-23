package vn.edu.gplx.modules.admission.infrastructure;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.admission.domain.AdmissionApplication;
import vn.edu.gplx.modules.admission.domain.ApplicationStatus;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdmissionApplicationRepository extends JpaRepository<AdmissionApplication, Long> {

    Optional<AdmissionApplication> findByApplicationCode(String applicationCode);

    List<AdmissionApplication> findByUserId(Long userId);

    Page<AdmissionApplication> findByUserId(Long userId, Pageable pageable);

    Page<AdmissionApplication> findByStatus(ApplicationStatus status, Pageable pageable);

    boolean existsByNationalIdAndStatusIn(String nationalId, List<ApplicationStatus> activeStatuses);
}
