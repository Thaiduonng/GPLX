package vn.edu.gplx.modules.admission.infrastructure;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.admission.domain.AdmissionApplication;
import vn.edu.gplx.modules.admission.domain.ApplicationStatus;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdmissionApplicationRepository extends JpaRepository<AdmissionApplication, Long> {

    Optional<AdmissionApplication> findByApplicationCode(String applicationCode);

    Optional<AdmissionApplication> findByApplicationCodeAndPhone(String applicationCode, String phone);

    Optional<AdmissionApplication> findByApplicationCodeAndTrackingToken(String applicationCode, String trackingToken);

    List<AdmissionApplication> findByUserId(Long userId);

    Page<AdmissionApplication> findByUserId(Long userId, Pageable pageable);

    Page<AdmissionApplication> findByStatus(ApplicationStatus status, Pageable pageable);

    boolean existsByNationalIdAndStatusIn(String nationalId, List<ApplicationStatus> activeStatuses);

    @Query("SELECT a FROM AdmissionApplication a WHERE " +
           "(:status IS NULL OR a.status = :status) AND " +
           "(:categoryId IS NULL OR a.category.id = :categoryId) AND " +
           "(:staffId IS NULL OR (a.assignedStaff IS NOT NULL AND a.assignedStaff.id = :staffId)) AND " +
           "(:keyword IS NULL OR LOWER(a.fullName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR a.phone LIKE CONCAT('%', :keyword, '%') OR a.applicationCode LIKE CONCAT('%', :keyword, '%') OR a.nationalId LIKE CONCAT('%', :keyword, '%'))")
    Page<AdmissionApplication> searchApplications(@Param("status") ApplicationStatus status,
                                                 @Param("categoryId") Long categoryId,
                                                 @Param("staffId") Long staffId,
                                                 @Param("keyword") String keyword,
                                                 Pageable pageable);

    long countByStatus(ApplicationStatus status);
}
