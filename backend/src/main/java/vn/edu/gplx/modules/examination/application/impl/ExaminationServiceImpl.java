package vn.edu.gplx.modules.examination.application.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.admission.domain.LicenseCategory;
import vn.edu.gplx.modules.admission.infrastructure.LicenseCategoryRepository;
import vn.edu.gplx.modules.examination.api.dto.CandidateResponse;
import vn.edu.gplx.modules.examination.api.dto.CreateExamSessionRequest;
import vn.edu.gplx.modules.examination.api.dto.EligibilityCheckResult;
import vn.edu.gplx.modules.examination.api.dto.ExamResultDetailResponse;
import vn.edu.gplx.modules.examination.api.dto.ExamSessionResponse;
import vn.edu.gplx.modules.examination.api.dto.RecordExamScoreRequest;
import vn.edu.gplx.modules.examination.api.dto.RegisterCandidateRequest;
import vn.edu.gplx.modules.examination.application.EligibilityService;
import vn.edu.gplx.modules.examination.application.ExaminationService;
import vn.edu.gplx.modules.examination.domain.CandidateEligibility;
import vn.edu.gplx.modules.examination.domain.ExamCandidate;
import vn.edu.gplx.modules.examination.domain.ExamResult;
import vn.edu.gplx.modules.examination.domain.ExamSession;
import vn.edu.gplx.modules.examination.domain.ExamSessionStatus;
import vn.edu.gplx.modules.examination.domain.FinalExamResult;
import vn.edu.gplx.modules.examination.infrastructure.ExamCandidateRepository;
import vn.edu.gplx.modules.examination.infrastructure.ExamResultRepository;
import vn.edu.gplx.modules.examination.infrastructure.ExamSessionRepository;
import vn.edu.gplx.shared.exception.BusinessRuleViolationException;
import vn.edu.gplx.shared.exception.ResourceNotFoundException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Transactional
public class ExaminationServiceImpl implements ExaminationService {

    private static final Logger log = LoggerFactory.getLogger(ExaminationServiceImpl.class);

    private final ExamSessionRepository sessionRepository;
    private final ExamCandidateRepository candidateRepository;
    private final ExamResultRepository resultRepository;
    private final LicenseCategoryRepository categoryRepository;
    private final EligibilityService eligibilityService;

    public ExaminationServiceImpl(ExamSessionRepository sessionRepository,
                                  ExamCandidateRepository candidateRepository,
                                  ExamResultRepository resultRepository,
                                  LicenseCategoryRepository categoryRepository,
                                  EligibilityService eligibilityService) {
        this.sessionRepository = sessionRepository;
        this.candidateRepository = candidateRepository;
        this.resultRepository = resultRepository;
        this.categoryRepository = categoryRepository;
        this.eligibilityService = eligibilityService;
    }

    @Override
    public ExamSessionResponse createExamSession(CreateExamSessionRequest request) {
        log.info("Creating exam session: name={}, categoryId={}", request.name(), request.categoryId());

        LicenseCategory category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new ResourceNotFoundException("LicenseCategory", "id", request.categoryId()));

        String examCode = generateExamCode(category.getCode(), request.examDate());

        ExamSession session = new ExamSession(
                examCode,
                request.name(),
                category,
                request.examDate(),
                request.location(),
                request.examType()
        );

        ExamSession savedSession = sessionRepository.save(session);
        return toSessionResponse(savedSession);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ExamSessionResponse> getExamSessions(Long categoryId, ExamSessionStatus status) {
        List<ExamSession> sessions;

        if (categoryId != null) {
            sessions = sessionRepository.findByCategoryId(categoryId);
        } else if (status != null) {
            sessions = sessionRepository.findByStatus(status);
        } else {
            sessions = sessionRepository.findAll();
        }

        return sessions.stream().map(this::toSessionResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ExamSessionResponse getExamSessionById(Long id) {
        ExamSession session = sessionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ExamSession", "id", id));
        return toSessionResponse(session);
    }

    @Override
    public CandidateResponse registerCandidate(Long sessionId, RegisterCandidateRequest request) {
        log.info("Registering candidate: sessionId={}, userId={}", sessionId, request.studentId());

        ExamSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new ResourceNotFoundException("ExamSession", "id", sessionId));

        if (session.getStatus() == ExamSessionStatus.COMPLETED || session.getStatus() == ExamSessionStatus.CANCELLED) {
            throw new BusinessRuleViolationException("EXM-003", "Kỳ thi đã kết thúc hoặc bị hủy, không thể tiếp nhận đăng ký thí sinh mới.");
        }

        if (candidateRepository.existsByExamSessionIdAndUserId(sessionId, request.studentId())) {
            throw new BusinessRuleViolationException("EXM-004", "Học viên này đã được đăng ký trong kỳ thi này rồi.");
        }

        // Tự động kiểm tra điều kiện dự thi theo quy tắc EXM-001
        EligibilityCheckResult eligibility = eligibilityService.checkEligibility(
                request.studentId(), session.getCategory().getCode()
        );

        CandidateEligibility eligibilityStatus;
        String disqualificationReason = null;

        if (eligibility.isEligible()) {
            eligibilityStatus = CandidateEligibility.QUALIFIED;
        } else {
            eligibilityStatus = CandidateEligibility.DISQUALIFIED;
            disqualificationReason = String.join("; ", eligibility.missingRequirements());
        }

        int currentCount = candidateRepository.countByExamSessionId(sessionId);
        String candidateNumber = String.format("SBD-%s-%03d", session.getCategory().getCode(), currentCount + 1);

        ExamCandidate candidate = new ExamCandidate(
                session,
                request.studentId(),
                candidateNumber,
                eligibilityStatus,
                disqualificationReason
        );

        ExamCandidate savedCandidate = candidateRepository.save(candidate);

        // Khởi tạo bảng kết quả thi sẵn sàng ghi nhận (EXM-002)
        ExamResult result = new ExamResult(savedCandidate);
        resultRepository.save(result);
        savedCandidate.setResult(result);

        return toCandidateResponse(savedCandidate);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CandidateResponse> getCandidatesBySession(Long sessionId) {
        List<ExamCandidate> candidates = candidateRepository.findByExamSessionId(sessionId);
        return candidates.stream().map(this::toCandidateResponse).toList();
    }

    @Override
    public ExamResultDetailResponse recordScore(Long candidateId, Long examinerId, RecordExamScoreRequest request) {
        log.info("Recording exam score for candidateId: {}, examinerId: {}", candidateId, examinerId);

        ExamCandidate candidate = candidateRepository.findById(candidateId)
                .orElseThrow(() -> new ResourceNotFoundException("ExamCandidate", "id", candidateId));

        if (candidate.getEligibilityStatus() == CandidateEligibility.DISQUALIFIED) {
            throw new BusinessRuleViolationException("EXM-005", "Thí sinh không đủ điều kiện dự thi: " + candidate.getDisqualificationReason());
        }

        ExamResult result = resultRepository.findByCandidateId(candidateId)
                .orElseGet(() -> new ExamResult(candidate));

        String categoryCode = candidate.getExamSession().getCategory().getCode().toUpperCase();
        boolean isMotorbike = "A1".equals(categoryCode) || "A2".equals(categoryCode);

        // 1. Chấm điểm Lý thuyết
        if (request.theoryScore() != null) {
            result.setTheoryScore(request.theoryScore());
            int minTheoryPass = isMotorbike ? ("A1".equals(categoryCode) ? 21 : 23) : 27;
            result.setTheoryPassed(request.theoryScore() >= minTheoryPass);
        }

        // 2. Chấm điểm Mô phỏng tình huống (chỉ áp dụng ô tô B1, B2, C...)
        if (request.simulationScore() != null) {
            result.setSimulationScore(request.simulationScore());
            result.setSimulationPassed(request.simulationScore() >= 35);
        } else if (isMotorbike) {
            // Không áp dụng cho mô tô
            result.setSimulationScore(null);
            result.setSimulationPassed(true);
        }

        // 3. Chấm điểm Thực hành sa hình (đạt >= 80/100)
        if (request.yardScore() != null) {
            result.setYardScore(request.yardScore());
            result.setYardPassed(request.yardScore() >= 80);
        }

        // 4. Chấm điểm Thực hành đường trường (đạt >= 80/100)
        if (request.roadScore() != null) {
            result.setRoadScore(request.roadScore());
            result.setRoadPassed(request.roadScore() >= 80);
        } else if (isMotorbike) {
            // Xe máy không có nội dung đường trường
            result.setRoadScore(null);
            result.setRoadPassed(true);
        }

        // Tính kết quả tổng hợp FinalExamResult
        boolean allGraded = result.getTheoryPassed() != null
                && result.getYardPassed() != null
                && (isMotorbike || (result.getSimulationPassed() != null && result.getRoadPassed() != null));

        if (allGraded) {
            boolean allPassed = Boolean.TRUE.equals(result.getTheoryPassed())
                    && Boolean.TRUE.equals(result.getYardPassed())
                    && Boolean.TRUE.equals(result.getSimulationPassed())
                    && Boolean.TRUE.equals(result.getRoadPassed());

            result.setFinalResult(allPassed ? FinalExamResult.PASSED : FinalExamResult.FAILED);
        } else {
            result.setFinalResult(FinalExamResult.PENDING);
        }

        result.setExaminerId(examinerId);
        result.setExaminerNote(request.examinerNote());

        ExamResult savedResult = resultRepository.save(result);
        return toDetailResponse(savedResult);
    }

    @Override
    @Transactional(readOnly = true)
    public ExamResultDetailResponse getCandidateResult(Long candidateId) {
        ExamResult result = resultRepository.findByCandidateId(candidateId)
                .orElseThrow(() -> new ResourceNotFoundException("ExamResult", "candidateId", candidateId));
        return toDetailResponse(result);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ExamResultDetailResponse> getMyResults(Long userId) {
        List<ExamCandidate> candidates = candidateRepository.findByUserId(userId);
        return candidates.stream()
                .map(c -> resultRepository.findByCandidateId(c.getId()).orElseGet(() -> new ExamResult(c)))
                .map(this::toDetailResponse)
                .toList();
    }

    private String generateExamCode(String categoryCode, LocalDate examDate) {
        String dateStr = examDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        long count = sessionRepository.count();
        return String.format("EXAM-%s-%s-%03d", categoryCode, dateStr, count + 1);
    }

    private ExamSessionResponse toSessionResponse(ExamSession session) {
        int candidateCount = candidateRepository.countByExamSessionId(session.getId());
        return new ExamSessionResponse(
                session.getId(),
                session.getExamCode(),
                session.getName(),
                session.getCategory().getId(),
                session.getCategory().getCode(),
                session.getExamDate(),
                session.getLocation(),
                session.getExamType(),
                session.getStatus(),
                candidateCount,
                session.getCreatedAt()
        );
    }

    private CandidateResponse toCandidateResponse(ExamCandidate candidate) {
        FinalExamResult finalResult = candidate.getResult() != null
                ? candidate.getResult().getFinalResult()
                : FinalExamResult.PENDING;

        return new CandidateResponse(
                candidate.getId(),
                candidate.getExamSession().getId(),
                candidate.getExamSession().getExamCode(),
                candidate.getUserId(),
                candidate.getCandidateNumber(),
                candidate.getEligibilityStatus(),
                candidate.getDisqualificationReason(),
                finalResult,
                candidate.getCreatedAt()
        );
    }

    private ExamResultDetailResponse toDetailResponse(ExamResult result) {
        ExamCandidate candidate = result.getCandidate();
        ExamSession session = candidate.getExamSession();

        return new ExamResultDetailResponse(
                candidate.getId(),
                candidate.getCandidateNumber(),
                candidate.getUserId(),
                session.getExamCode(),
                session.getCategory().getCode(),
                result.getTheoryScore(),
                result.getTheoryPassed(),
                result.getSimulationScore(),
                result.getSimulationPassed(),
                result.getYardScore(),
                result.getYardPassed(),
                result.getRoadScore(),
                result.getRoadPassed(),
                result.getFinalResult(),
                result.getExaminerId(),
                result.getExaminerNote(),
                result.getUpdatedAt()
        );
    }
}
