package vn.edu.gplx.modules.admission.application;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.edu.gplx.modules.admission.api.dto.ApplicationResponse;
import vn.edu.gplx.modules.admission.api.dto.EnrollApplicationRequest;
import vn.edu.gplx.modules.admission.api.dto.PublicApplicationResponse;
import vn.edu.gplx.modules.admission.api.dto.ReviewApplicationRequest;
import vn.edu.gplx.modules.admission.api.dto.SubmitApplicationRequest;
import vn.edu.gplx.modules.admission.api.dto.SupplementDocumentRequest;
import vn.edu.gplx.modules.admission.api.dto.TrackApplicationRequest;
import vn.edu.gplx.modules.admission.domain.ApplicationStatus;

public interface AdmissionService {

    ApplicationResponse submitApplication(Long userId, SubmitApplicationRequest request);

    PublicApplicationResponse submitPublicApplication(SubmitApplicationRequest request);

    PublicApplicationResponse trackPublicApplication(TrackApplicationRequest request);

    PublicApplicationResponse supplementDocuments(String applicationCode, SupplementDocumentRequest request);

    Page<ApplicationResponse> getMyApplications(Long userId, Pageable pageable);

    ApplicationResponse getApplicationById(Long id, Long currentUserId, boolean isStaffOrAdmin);

    Page<ApplicationResponse> getApplications(ApplicationStatus status, Pageable pageable);

    Page<ApplicationResponse> searchApplications(ApplicationStatus status, Long categoryId, Long staffId,
                                                String keyword, Pageable pageable);

    ApplicationResponse reviewApplication(Long id, Long reviewerId, ReviewApplicationRequest request);

    ApplicationResponse enrollApplication(Long id, Long staffId, EnrollApplicationRequest request);
}
