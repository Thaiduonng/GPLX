package vn.edu.gplx.modules.admission.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.admission.domain.AdmissionDocument;

import java.util.List;

@Repository
public interface AdmissionDocumentRepository extends JpaRepository<AdmissionDocument, Long> {

    List<AdmissionDocument> findByApplicationId(Long applicationId);
}
