package vn.edu.gplx.modules.training.application;

import vn.edu.gplx.modules.training.api.dto.DatSessionResponse;
import vn.edu.gplx.modules.training.api.dto.DatSummaryResponse;
import vn.edu.gplx.modules.training.api.dto.LogDatSessionRequest;

public interface DatPracticeService {

    DatSessionResponse logPracticeSession(Long instructorId, LogDatSessionRequest request);

    DatSummaryResponse getStudentDatSummary(Long studentId);
}
