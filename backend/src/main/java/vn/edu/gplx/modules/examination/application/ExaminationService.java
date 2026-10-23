package vn.edu.gplx.modules.examination.application;

import vn.edu.gplx.modules.examination.api.dto.CandidateResponse;
import vn.edu.gplx.modules.examination.api.dto.CreateExamSessionRequest;
import vn.edu.gplx.modules.examination.api.dto.ExamResultDetailResponse;
import vn.edu.gplx.modules.examination.api.dto.ExamSessionResponse;
import vn.edu.gplx.modules.examination.api.dto.RecordExamScoreRequest;
import vn.edu.gplx.modules.examination.api.dto.RegisterCandidateRequest;
import vn.edu.gplx.modules.examination.domain.ExamSessionStatus;

import java.util.List;

public interface ExaminationService {

    ExamSessionResponse createExamSession(CreateExamSessionRequest request);

    List<ExamSessionResponse> getExamSessions(Long categoryId, ExamSessionStatus status);

    ExamSessionResponse getExamSessionById(Long id);

    CandidateResponse registerCandidate(Long sessionId, RegisterCandidateRequest request);

    List<CandidateResponse> getCandidatesBySession(Long sessionId);

    ExamResultDetailResponse recordScore(Long candidateId, Long examinerId, RecordExamScoreRequest request);

    ExamResultDetailResponse getCandidateResult(Long candidateId);

    List<ExamResultDetailResponse> getMyResults(Long userId);
}
