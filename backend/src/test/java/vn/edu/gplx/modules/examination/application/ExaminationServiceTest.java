package vn.edu.gplx.modules.examination.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import vn.edu.gplx.modules.admission.domain.LicenseCategory;
import vn.edu.gplx.modules.admission.infrastructure.LicenseCategoryRepository;
import vn.edu.gplx.modules.examination.api.dto.CandidateResponse;
import vn.edu.gplx.modules.examination.api.dto.CreateExamSessionRequest;
import vn.edu.gplx.modules.examination.api.dto.EligibilityCheckResult;
import vn.edu.gplx.modules.examination.api.dto.ExamResultDetailResponse;
import vn.edu.gplx.modules.examination.api.dto.ExamSessionResponse;
import vn.edu.gplx.modules.examination.api.dto.RecordExamScoreRequest;
import vn.edu.gplx.modules.examination.api.dto.RegisterCandidateRequest;
import vn.edu.gplx.modules.examination.application.impl.ExaminationServiceImpl;
import vn.edu.gplx.modules.examination.domain.CandidateEligibility;
import vn.edu.gplx.modules.examination.domain.ExamCandidate;
import vn.edu.gplx.modules.examination.domain.ExamResult;
import vn.edu.gplx.modules.examination.domain.ExamSession;
import vn.edu.gplx.modules.examination.domain.ExamSessionStatus;
import vn.edu.gplx.modules.examination.domain.ExamType;
import vn.edu.gplx.modules.examination.domain.FinalExamResult;
import vn.edu.gplx.modules.examination.infrastructure.ExamCandidateRepository;
import vn.edu.gplx.modules.examination.infrastructure.ExamResultRepository;
import vn.edu.gplx.modules.examination.infrastructure.ExamSessionRepository;
import vn.edu.gplx.shared.exception.BusinessRuleViolationException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collections;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ExaminationServiceTest {

    @Mock
    private ExamSessionRepository sessionRepository;

    @Mock
    private ExamCandidateRepository candidateRepository;

    @Mock
    private ExamResultRepository resultRepository;

    @Mock
    private LicenseCategoryRepository categoryRepository;

    @Mock
    private EligibilityService eligibilityService;

    @InjectMocks
    private ExaminationServiceImpl examinationService;

    private LicenseCategory categoryB1;
    private ExamSession session;
    private ExamCandidate candidate;

    @BeforeEach
    void setUp() {
        categoryB1 = new LicenseCategory("B1", "Hạng B1 số tự động", "Mô tả", 18, BigDecimal.valueOf(14000000));
        ReflectionTestUtils.setField(categoryB1, "id", 1L);

        session = new ExamSession("EXAM-B1-20261101-001", "Kỳ sát hạch GPLX Khóa 10", categoryB1,
                LocalDate.now().plusDays(10), "Trung tâm Sát hạch Lái xe Quốc gia", ExamType.CERTIFICATION);
        ReflectionTestUtils.setField(session, "id", 10L);

        candidate = new ExamCandidate(session, 100L, "SBD-B1-001", CandidateEligibility.QUALIFIED, null);
        ReflectionTestUtils.setField(candidate, "id", 50L);
    }

    @Test
    @DisplayName("Tạo kỳ thi sát hạch thành công")
    void should_createExamSession_successfully() {
        CreateExamSessionRequest request = new CreateExamSessionRequest(
                "Kỳ thi tháng 11", 1L, LocalDate.now().plusDays(15), "Sân thi số 1", ExamType.CERTIFICATION
        );

        when(categoryRepository.findById(1L)).thenReturn(Optional.of(categoryB1));
        when(sessionRepository.count()).thenReturn(0L);
        when(sessionRepository.save(any(ExamSession.class))).thenAnswer(i -> {
            ExamSession s = i.getArgument(0);
            ReflectionTestUtils.setField(s, "id", 10L);
            return s;
        });

        ExamSessionResponse response = examinationService.createExamSession(request);

        assertThat(response).isNotNull();
        assertThat(response.categoryCode()).isEqualTo("B1");
        assertThat(response.name()).isEqualTo("Kỳ thi tháng 11");
        verify(sessionRepository).save(any(ExamSession.class));
    }

    @Test
    @DisplayName("EXM-001: Đăng ký thí sinh đủ điều kiện -> gán QUALIFIED và sinh SBD")
    void should_registerCandidate_asQualified_when_eligible() {
        when(sessionRepository.findById(10L)).thenReturn(Optional.of(session));
        when(candidateRepository.existsByExamSessionIdAndUserId(10L, 100L)).thenReturn(false);

        EligibilityCheckResult eligibleResult = new EligibilityCheckResult(
                100L, "B1", true, true, true, true,
                BigDecimal.valueOf(820), BigDecimal.valueOf(810), 1250, 1200, Collections.emptyList()
        );
        when(eligibilityService.checkEligibility(100L, "B1")).thenReturn(eligibleResult);
        when(candidateRepository.countByExamSessionId(10L)).thenReturn(0);

        when(candidateRepository.save(any(ExamCandidate.class))).thenAnswer(i -> {
            ExamCandidate c = i.getArgument(0);
            ReflectionTestUtils.setField(c, "id", 50L);
            return c;
        });

        CandidateResponse response = examinationService.registerCandidate(10L, new RegisterCandidateRequest(100L));

        assertThat(response).isNotNull();
        assertThat(response.eligibilityStatus()).isEqualTo(CandidateEligibility.QUALIFIED);
        assertThat(response.candidateNumber()).isEqualTo("SBD-B1-001");
        verify(resultRepository).save(any(ExamResult.class));
    }

    @Test
    @DisplayName("EXM-001: Đăng ký thí sinh chưa đủ điều kiện -> gán DISQUALIFIED kèm lý do")
    void should_registerCandidate_asDisqualified_when_notEligible() {
        when(sessionRepository.findById(10L)).thenReturn(Optional.of(session));
        when(candidateRepository.existsByExamSessionIdAndUserId(10L, 100L)).thenReturn(false);

        EligibilityCheckResult notEligibleResult = new EligibilityCheckResult(
                100L, "B1", false, false, true, false,
                BigDecimal.valueOf(100), BigDecimal.valueOf(810), 200, 1200,
                Collections.singletonList("Hồ sơ chưa duyệt")
        );
        when(eligibilityService.checkEligibility(100L, "B1")).thenReturn(notEligibleResult);
        when(candidateRepository.countByExamSessionId(10L)).thenReturn(0);

        when(candidateRepository.save(any(ExamCandidate.class))).thenAnswer(i -> {
            ExamCandidate c = i.getArgument(0);
            ReflectionTestUtils.setField(c, "id", 50L);
            return c;
        });

        CandidateResponse response = examinationService.registerCandidate(10L, new RegisterCandidateRequest(100L));

        assertThat(response.eligibilityStatus()).isEqualTo(CandidateEligibility.DISQUALIFIED);
        assertThat(response.disqualificationReason()).contains("Hồ sơ chưa duyệt");
    }

    @Test
    @DisplayName("EXM-002: Sát hạch viên nhập điểm 4 môn đạt tiêu chuẩn -> PASSED")
    void should_recordScore_andPass_when_allSubjectsPassed() {
        when(candidateRepository.findById(50L)).thenReturn(Optional.of(candidate));
        ExamResult initialResult = new ExamResult(candidate);
        when(resultRepository.findByCandidateId(50L)).thenReturn(Optional.of(initialResult));
        when(resultRepository.save(any(ExamResult.class))).thenAnswer(i -> i.getArgument(0));

        RecordExamScoreRequest scoreRequest = new RecordExamScoreRequest(28, 40, 90, 85, "Lái xe tốt");

        ExamResultDetailResponse response = examinationService.recordScore(50L, 999L, scoreRequest);

        assertThat(response).isNotNull();
        assertThat(response.theoryPassed()).isTrue();
        assertThat(response.simulationPassed()).isTrue();
        assertThat(response.yardPassed()).isTrue();
        assertThat(response.roadPassed()).isTrue();
        assertThat(response.finalResult()).isEqualTo(FinalExamResult.PASSED);
        assertThat(response.examinerId()).isEqualTo(999L);
    }

    @Test
    @DisplayName("EXM-002: Thí sinh trượt 1 môn sát hạch bất kỳ -> FAILED")
    void should_recordScore_andFail_when_oneSubjectFails() {
        when(candidateRepository.findById(50L)).thenReturn(Optional.of(candidate));
        ExamResult initialResult = new ExamResult(candidate);
        when(resultRepository.findByCandidateId(50L)).thenReturn(Optional.of(initialResult));
        when(resultRepository.save(any(ExamResult.class))).thenAnswer(i -> i.getArgument(0));

        // Trượt sa hình (75 < 80)
        RecordExamScoreRequest scoreRequest = new RecordExamScoreRequest(29, 45, 75, 90, "Chạm vạch sa hình");

        ExamResultDetailResponse response = examinationService.recordScore(50L, 999L, scoreRequest);

        assertThat(response.yardPassed()).isFalse();
        assertThat(response.finalResult()).isEqualTo(FinalExamResult.FAILED);
    }

    @Test
    @DisplayName("Chặn nhập điểm đối với thí sinh bị loại điều kiện dự thi (DISQUALIFIED)")
    void should_throwException_when_candidateIsDisqualified() {
        candidate.setEligibilityStatus(CandidateEligibility.DISQUALIFIED);
        candidate.setDisqualificationReason("Chưa hoàn thành DAT");
        when(candidateRepository.findById(50L)).thenReturn(Optional.of(candidate));

        RecordExamScoreRequest scoreRequest = new RecordExamScoreRequest(28, 40, 90, 85, null);

        assertThatThrownBy(() -> examinationService.recordScore(50L, 999L, scoreRequest))
                .isInstanceOf(BusinessRuleViolationException.class)
                .hasMessageContaining("Thí sinh không đủ điều kiện");
    }
}
