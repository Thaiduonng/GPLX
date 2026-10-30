package vn.edu.gplx.modules.crm.infrastructure;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.crm.domain.AdmissionLead;
import vn.edu.gplx.modules.crm.domain.LeadSource;
import vn.edu.gplx.modules.crm.domain.LeadStatus;

import java.util.Optional;

@Repository
public interface AdmissionLeadRepository extends JpaRepository<AdmissionLead, Long> {

    Optional<AdmissionLead> findByLeadCode(String leadCode);

    Optional<AdmissionLead> findByPhone(String phone);

    boolean existsByPhoneAndStatusNot(String phone, LeadStatus status);

    @Query("SELECT l FROM AdmissionLead l WHERE " +
           "(:status IS NULL OR l.status = :status) AND " +
           "(:categoryId IS NULL OR l.category.id = :categoryId) AND " +
           "(:source IS NULL OR l.source = :source) AND " +
           "(:assignedToId IS NULL OR (l.assignedTo IS NOT NULL AND l.assignedTo.id = :assignedToId)) AND " +
           "(:keyword IS NULL OR LOWER(l.fullName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR l.phone LIKE CONCAT('%', :keyword, '%') OR l.leadCode LIKE CONCAT('%', :keyword, '%'))")
    Page<AdmissionLead> searchLeads(@Param("status") LeadStatus status,
                                    @Param("categoryId") Long categoryId,
                                    @Param("source") LeadSource source,
                                    @Param("assignedToId") Long assignedToId,
                                    @Param("keyword") String keyword,
                                    Pageable pageable);

    long countByStatus(LeadStatus status);

    long countBySource(LeadSource source);
}
