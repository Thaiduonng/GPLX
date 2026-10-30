package vn.edu.gplx.modules.crm.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.crm.domain.LeadInteraction;

import java.util.List;

@Repository
public interface LeadInteractionRepository extends JpaRepository<LeadInteraction, Long> {

    List<LeadInteraction> findByLeadIdOrderByCreatedAtDesc(Long leadId);
}
