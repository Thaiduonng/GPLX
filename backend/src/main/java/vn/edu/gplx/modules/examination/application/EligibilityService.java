package vn.edu.gplx.modules.examination.application;

import vn.edu.gplx.modules.examination.api.dto.EligibilityCheckResult;

public interface EligibilityService {

    EligibilityCheckResult checkEligibility(Long userId, String categoryCode);
}
