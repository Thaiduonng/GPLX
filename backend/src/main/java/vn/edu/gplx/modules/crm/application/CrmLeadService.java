package vn.edu.gplx.modules.crm.application;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vn.edu.gplx.modules.crm.api.dto.AddInteractionRequest;
import vn.edu.gplx.modules.crm.api.dto.AdmissionDashboardStatsResponse;
import vn.edu.gplx.modules.crm.api.dto.AdmissionLeadResponse;
import vn.edu.gplx.modules.crm.api.dto.ConvertLeadRequest;
import vn.edu.gplx.modules.crm.api.dto.CreateLeadInquiryRequest;
import vn.edu.gplx.modules.crm.api.dto.LeadInteractionResponse;
import vn.edu.gplx.modules.crm.api.dto.UpdateLeadStatusRequest;
import vn.edu.gplx.modules.crm.domain.LeadSource;
import vn.edu.gplx.modules.crm.domain.LeadStatus;

public interface CrmLeadService {

    AdmissionLeadResponse createInquiry(CreateLeadInquiryRequest request);

    Page<AdmissionLeadResponse> getLeads(LeadStatus status, Long categoryId, LeadSource source,
                                         Long assignedToId, String keyword, Pageable pageable);

    AdmissionLeadResponse getLeadById(Long id);

    AdmissionLeadResponse updateLead(Long id, UpdateLeadStatusRequest request, Long staffId);

    LeadInteractionResponse addInteraction(Long leadId, Long staffId, AddInteractionRequest request);

    AdmissionLeadResponse convertLeadToApplication(Long leadId, ConvertLeadRequest request, Long staffId);

    AdmissionDashboardStatsResponse getDashboardStats();
}
