import React, { useState, useEffect, useCallback } from 'react';
import { learningService } from '../../services/learningService';
import type {
  ExamConfiguration,
  QuestionDetail,
  TheoryTopic,
  QuestionUpsertRequest,
  AnswerUpsertItem,
} from '../../types/learning';
import { AppButton, AppInput, AppSelect, LoadingSpinner, Alert, Modal } from '../../components/ui';

export const TheoryAdminConfigTab: React.FC = () => {
  // Navigation sub-tabs trong Admin
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<'CONFIG' | 'QUESTIONS' | 'IMPORT_EXPORT'>('CONFIG');

  // --- 1. STATE CẤU HÌNH ĐỀ THI ---
  const [configs, setConfigs] = useState<ExamConfiguration[]>([]);
  const [loadingConfigs, setLoadingConfigs] = useState<boolean>(false);
  const [editingConfig, setEditingConfig] = useState<ExamConfiguration | null>(null);
  const [savingConfig, setSavingConfig] = useState<boolean>(false);

  // --- 2. STATE QUẢN LÝ NGÂN HÀNG CÂU HỎI ---
  const [topics, setTopics] = useState<TheoryTopic[]>([]);
  const [questions, setQuestions] = useState<QuestionDetail[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState<boolean>(false);
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('');
  const [selectedParalysisFilter, setSelectedParalysisFilter] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);

  // Modal Chi tiết câu hỏi
  const [viewingQuestion, setViewingQuestion] = useState<QuestionDetail | null>(null);

  // Modal Tạo mới / Chỉnh sửa câu hỏi
  const [isUpsertModalOpen, setIsUpsertModalOpen] = useState<boolean>(false);
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);
  const [formCategory, setFormCategory] = useState<string>('B1');
  const [formTopicId, setFormTopicId] = useState<number>(1);
  const [formQuestionNumber, setFormQuestionNumber] = useState<number>(1);
  const [formContent, setFormContent] = useState<string>('');
  const [formImageUrl, setFormImageUrl] = useState<string>('');
  const [formExplanation, setFormExplanation] = useState<string>('');
  const [formIsParalysis, setFormIsParalysis] = useState<boolean>(false);
  const [formLegalRef, setFormLegalRef] = useState<string>('');
  const [formAnswers, setFormAnswers] = useState<AnswerUpsertItem[]>([
    { answerText: '', isCorrect: true, orderIndex: 1 },
    { answerText: '', isCorrect: false, orderIndex: 2 },
  ]);
  const [savingQuestion, setSavingQuestion] = useState<boolean>(false);

  // Modal Xóa câu hỏi
  const [deletingQuestion, setDeletingQuestion] = useState<QuestionDetail | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);

  // --- 3. STATE NHẬP / XUẤT DỮ LIỆU ---
  const [jsonInput, setJsonInput] = useState<string>('');
  const [importing, setImporting] = useState<boolean>(false);
  const [importResult, setImportResult] = useState<{
    totalReceived: number;
    successCount: number;
    failureCount: number;
    errors: string[];
  } | null>(null);
  const [exporting, setExporting] = useState<boolean>(false);

  // Feedback chung
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  // ---------------------------------------------------------------------------
  // LOAD DỮ LIỆU BAN ĐẦU
  // ---------------------------------------------------------------------------
  useEffect(() => {
    loadTopics();
    loadConfigs();
  }, []);

  const loadTopics = async () => {
    try {
      const data = await learningService.getTopics();
      setTopics(data);
    } catch (err: any) {
      console.error('Lỗi tải danh sách chủ đề:', err);
    }
  };

  const loadConfigs = async () => {
    setLoadingConfigs(true);
    try {
      const data = await learningService.getExamConfigurations();
      setConfigs(data);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Không thể tải cấu hình đề thi.');
    } finally {
      setLoadingConfigs(false);
    }
  };

  const loadQuestions = useCallback(async (targetPage = 0) => {
    setLoadingQuestions(true);
    setErrorMsg('');
    try {
      const res = await learningService.searchAdminQuestions({
        topicId: selectedTopicFilter ? parseInt(selectedTopicFilter, 10) : undefined,
        categoryCode: selectedCategoryFilter || undefined,
        isParalysis: selectedParalysisFilter === '' ? undefined : selectedParalysisFilter === 'true',
        page: targetPage,
        size: 15,
      });
      setQuestions(res.content);
      setTotalPages(res.totalPages);
      setTotalElements(res.totalElements);
      setPage(targetPage);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Lỗi khi tải danh sách câu hỏi.');
    } finally {
      setLoadingQuestions(false);
    }
  }, [selectedTopicFilter, selectedCategoryFilter, selectedParalysisFilter]);

  useEffect(() => {
    if (activeAdminSubTab === 'QUESTIONS') {
      loadQuestions(0);
    }
  }, [activeAdminSubTab, loadQuestions]);

  // ---------------------------------------------------------------------------
  // XỬ LÝ CẤU HÌNH ĐỀ THI
  // ---------------------------------------------------------------------------
  const handleSaveConfig = async () => {
    if (!editingConfig) return;
    setSavingConfig(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const updated = await learningService.updateExamConfig(editingConfig.id, editingConfig);
      setConfigs((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      setSuccessMsg(`Đã cập nhật cấu hình đề thi hạng ${updated.categoryCode} thành công!`);
      setEditingConfig(null);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Lỗi khi lưu cấu hình.');
    } finally {
      setSavingConfig(false);
    }
  };

  // ---------------------------------------------------------------------------
  // XỬ LÝ FORM CÂU HỎI (TẠO MỚI / CHỈNH SỬA)
  // ---------------------------------------------------------------------------
  const openCreateQuestionModal = () => {
    setEditingQuestionId(null);
    setFormCategory('B1');
    setFormTopicId(topics[0]?.id || 1);
    setFormQuestionNumber(totalElements + 1);
    setFormContent('');
    setFormImageUrl('');
    setFormExplanation('');
    setFormIsParalysis(false);
    setFormLegalRef('Thông tư 04/2022/TT-BGTVT');
    setFormAnswers([
      { answerText: '', isCorrect: true, orderIndex: 1 },
      { answerText: '', isCorrect: false, orderIndex: 2 },
    ]);
    setIsUpsertModalOpen(true);
  };

  const openEditQuestionModal = (q: QuestionDetail) => {
    setEditingQuestionId(q.id);
    setFormCategory(q.categoryCode);
    setFormTopicId(q.topicId || topics[0]?.id || 1);
    setFormQuestionNumber(q.questionNumber);
    setFormContent(q.content);
    setFormImageUrl(q.imageUrl || '');
    setFormExplanation(q.explanation || '');
    setFormIsParalysis(q.isParalysis);
    setFormLegalRef(q.legalReference || '');
    setFormAnswers(
      q.answers.map((a, idx) => ({
        id: a.id,
        answerText: a.answerText,
        isCorrect: Boolean(a.isCorrect),
        orderIndex: a.orderIndex || idx + 1,
      }))
    );
    setIsUpsertModalOpen(true);
  };

  const handleAddAnswerOption = () => {
    if (formAnswers.length >= 5) return;
    setFormAnswers((prev) => [
      ...prev,
      { answerText: '', isCorrect: false, orderIndex: prev.length + 1 },
    ]);
  };

  const handleRemoveAnswerOption = (index: number) => {
    if (formAnswers.length <= 2) {
      alert('Mỗi câu hỏi trắc nghiệm cần có ít nhất 2 phương án trả lời!');
      return;
    }
    setFormAnswers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSetCorrectAnswer = (index: number) => {
    setFormAnswers((prev) =>
      prev.map((ans, idx) => ({
        ...ans,
        isCorrect: idx === index,
      }))
    );
  };

  const handleSaveQuestion = async () => {
    if (!formContent.trim()) {
      setErrorMsg('Nội dung câu hỏi không được để trống!');
      return;
    }
    const hasEmptyOption = formAnswers.some((a) => !a.answerText.trim());
    if (hasEmptyOption) {
      setErrorMsg('Vui lòng điền đầy đủ nội dung cho tất cả các phương án trả lời!');
      return;
    }
    const hasCorrect = formAnswers.some((a) => a.isCorrect);
    if (!hasCorrect) {
      setErrorMsg('Vui lòng đánh dấu chính xác một đáp án đúng cho câu hỏi!');
      return;
    }

    setSavingQuestion(true);
    setErrorMsg('');
    setSuccessMsg('');

    const payload: QuestionUpsertRequest = {
      categoryCode: formCategory,
      topicId: formTopicId,
      questionNumber: formQuestionNumber,
      content: formContent.trim(),
      imageUrl: formImageUrl.trim() || null,
      explanation: formExplanation.trim() || null,
      isParalysis: formIsParalysis,
      legalReference: formLegalRef.trim() || null,
      answers: formAnswers.map((a, idx) => ({
        id: a.id,
        answerText: a.answerText.trim(),
        isCorrect: Boolean(a.isCorrect),
        orderIndex: idx + 1,
      })),
    };

    try {
      if (editingQuestionId) {
        await learningService.updateAdminQuestion(editingQuestionId, payload);
        setSuccessMsg(`Đã cập nhật thành công câu hỏi số ${payload.questionNumber}!`);
      } else {
        await learningService.createAdminQuestion(payload);
        setSuccessMsg(`Đã tạo mới thành công câu hỏi số ${payload.questionNumber}!`);
      }
      setIsUpsertModalOpen(false);
      loadQuestions(page);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Lỗi khi lưu câu hỏi.');
    } finally {
      setSavingQuestion(false);
    }
  };

  const handleDeleteQuestion = async () => {
    if (!deletingQuestion) return;
    setDeleting(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      await learningService.deleteAdminQuestion(deletingQuestion.id);
      setSuccessMsg(`Đã xóa câu hỏi số ${deletingQuestion.questionNumber} khỏi ngân hàng!`);
      setDeletingQuestion(null);
      loadQuestions(page);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Lỗi khi xóa câu hỏi.');
    } finally {
      setDeleting(false);
    }
  };

  // ---------------------------------------------------------------------------
  // XỬ LÝ BULK IMPORT / EXPORT
  // ---------------------------------------------------------------------------
  const handleBulkImport = async () => {
    if (!jsonInput.trim()) {
      setErrorMsg('Vui lòng dán nội dung JSON danh sách câu hỏi cần nhập!');
      return;
    }

    let parsed: any[];
    try {
      parsed = JSON.parse(jsonInput);
      if (!Array.isArray(parsed)) {
        throw new Error('Dữ liệu JSON phải là một mảng [] các câu hỏi.');
      }
    } catch (err: any) {
      setErrorMsg(`Lỗi cú pháp JSON: ${err.message}`);
      return;
    }

    setImporting(true);
    setErrorMsg('');
    setSuccessMsg('');
    setImportResult(null);

    try {
      const result = await learningService.importQuestions(parsed);
      setImportResult(result);
      setSuccessMsg(`Đã hoàn tất xử lý: Nhập thành công ${result.successCount}/${result.totalReceived} câu hỏi!`);
      if (activeAdminSubTab === 'QUESTIONS') {
        loadQuestions(0);
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Lỗi xử lý nhập dữ liệu.');
    } finally {
      setImporting(false);
    }
  };

  const handleExportJson = async () => {
    setExporting(true);
    setErrorMsg('');
    try {
      const topicId = selectedTopicFilter ? parseInt(selectedTopicFilter, 10) : undefined;
      const category = selectedCategoryFilter || undefined;
      const data = await learningService.exportQuestions(topicId, category);

      // Tạo file tải về
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ngan-hang-cau-hoi-gplx-${category || 'ALL'}-${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setSuccessMsg(`Đã xuất thành công ${data.length} câu hỏi ra file JSON!`);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Lỗi khi xuất dữ liệu.');
    } finally {
      setExporting(false);
    }
  };

  // Lọc câu hỏi theo từ khóa nội dung ở client
  const filteredQuestions = questions.filter((q) => {
    if (!searchKeyword.trim()) return true;
    const kw = searchKeyword.toLowerCase();
    return q.content.toLowerCase().includes(kw) || String(q.questionNumber).includes(kw);
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* THANH ĐIỀU HƯỚNG PHÂN KHU QUẢN TRỊ */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '1.25rem 1.5rem',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h2 style={{ margin: '0 0 0.3rem 0', color: '#1e293b', fontSize: '1.35rem' }}>
            🛠️ Quản Trị Dữ Liệu & Ngân Hàng Câu Hỏi GPLX
          </h2>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.88rem' }}>
            Quản lý ngân hàng 600 câu hỏi, cấu hình quy chế sát hạch các hạng GPLX và kiểm soát căn cứ pháp lý.
          </p>
        </div>

        {/* 3 Sub-tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', background: '#f1f5f9', padding: '0.3rem', borderRadius: '8px' }}>
          <button
            type="button"
            onClick={() => {
              setActiveAdminSubTab('CONFIG');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              background: activeAdminSubTab === 'CONFIG' ? '#1e3a8a' : 'transparent',
              color: activeAdminSubTab === 'CONFIG' ? '#ffffff' : '#475569',
              transition: 'all 0.2s',
            }}
          >
            ⚙️ Cấu hình đề thi
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveAdminSubTab('QUESTIONS');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              background: activeAdminSubTab === 'QUESTIONS' ? '#1e3a8a' : 'transparent',
              color: activeAdminSubTab === 'QUESTIONS' ? '#ffffff' : '#475569',
              transition: 'all 0.2s',
            }}
          >
            📚 Ngân hàng câu hỏi ({totalElements})
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveAdminSubTab('IMPORT_EXPORT');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              background: activeAdminSubTab === 'IMPORT_EXPORT' ? '#1e3a8a' : 'transparent',
              color: activeAdminSubTab === 'IMPORT_EXPORT' ? '#ffffff' : '#475569',
              transition: 'all 0.2s',
            }}
          >
            💾 Nhập / Xuất dữ liệu
          </button>
        </div>
      </div>

      {successMsg && <Alert type="success" message={successMsg} />}
      {errorMsg && <Alert type="danger" message={errorMsg} />}

      {/* ===================================================================== */}
      {/* PHÂN KHU 1: CẤU HÌNH ĐỀ THI THEO HẠNG GPLX                           */}
      {/* ===================================================================== */}
      {activeAdminSubTab === 'CONFIG' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {loadingConfigs ? (
            <LoadingSpinner text="Đang tải cấu hình đề thi..." />
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '1.25rem',
              }}
            >
              {configs.map((c) => (
                <div
                  key={c.id}
                  style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span
                      style={{
                        background: '#1e3a8a',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '1.1rem',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '6px',
                      }}
                    >
                      Hạng {c.categoryCode}
                    </span>
                    <span
                      style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        background: c.active ? '#dcfce7' : '#fee2e2',
                        color: c.active ? '#15803d' : '#b91c1c',
                      }}
                    >
                      {c.active ? 'Đang hiệu lực' : 'Tạm ngưng'}
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.9rem' }}>
                    <div>
                      <span style={{ color: '#64748b', display: 'block' }}>Số câu hỏi:</span>
                      <strong style={{ fontSize: '1.1rem', color: '#1e293b' }}>{c.totalQuestions} câu</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748b', display: 'block' }}>Thời gian thi:</span>
                      <strong style={{ fontSize: '1.1rem', color: '#1e293b' }}>{c.durationMinutes} phút</strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748b', display: 'block' }}>Điểm đạt tối thiểu:</span>
                      <strong style={{ fontSize: '1.1rem', color: '#059669' }}>
                        {c.passingScore} / {c.totalQuestions}
                      </strong>
                    </div>
                    <div>
                      <span style={{ color: '#64748b', display: 'block' }}>Phiên bản quy chế:</span>
                      <span style={{ fontWeight: 600, color: '#475569' }}>{c.rulesVersion}</span>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem', fontSize: '0.85rem', color: '#64748b' }}>
                    📜 <strong>Căn cứ:</strong> {c.legalSource}
                  </div>

                  <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                    <AppButton
                      variant="secondary"
                      size="sm"
                      onClick={() => setEditingConfig({ ...c })}
                      style={{ width: '100%' }}
                    >
                      ✏️ Điều chỉnh thông số
                    </AppButton>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal chỉnh sửa cấu hình đề thi */}
          {editingConfig && (
            <Modal
              isOpen={true}
              onClose={() => setEditingConfig(null)}
              title={`Điều chỉnh cấu hình thi sát hạch Hạng ${editingConfig.categoryCode}`}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    Tổng số câu hỏi trong đề:
                  </label>
                  <AppInput
                    type="number"
                    value={editingConfig.totalQuestions}
                    onChange={(e) =>
                      setEditingConfig({ ...editingConfig, totalQuestions: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    Thời gian làm bài (phút):
                  </label>
                  <AppInput
                    type="number"
                    value={editingConfig.durationMinutes}
                    onChange={(e) =>
                      setEditingConfig({ ...editingConfig, durationMinutes: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    Điểm sàn đạt yêu cầu (số câu đúng tối thiểu):
                  </label>
                  <AppInput
                    type="number"
                    value={editingConfig.passingScore}
                    onChange={(e) =>
                      setEditingConfig({ ...editingConfig, passingScore: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    Nguồn căn cứ văn bản pháp lý:
                  </label>
                  <AppInput
                    value={editingConfig.legalSource}
                    onChange={(e) =>
                      setEditingConfig({ ...editingConfig, legalSource: e.target.value })
                    }
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                  <AppButton variant="secondary" onClick={() => setEditingConfig(null)}>
                    Hủy bỏ
                  </AppButton>
                  <AppButton variant="primary" onClick={handleSaveConfig} disabled={savingConfig}>
                    {savingConfig ? 'Đang lưu...' : 'Lưu thay đổi'}
                  </AppButton>
                </div>
              </div>
            </Modal>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* PHÂN KHU 2: QUẢN LÝ NGÂN HÀNG CÂU HỎI                                */}
      {/* ===================================================================== */}
      {activeAdminSubTab === 'QUESTIONS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Thanh công cụ tìm kiếm, lọc & nút Tạo mới */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '1.25rem',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', flex: 1 }}>
                <div style={{ minWidth: '200px' }}>
                  <AppSelect
                    value={selectedTopicFilter}
                    onChange={(e) => setSelectedTopicFilter(e.target.value)}
                    options={[
                      { value: '', label: 'Tất cả 7 chương lý thuyết' },
                      ...topics.map((t) => ({ value: String(t.id), label: `${t.code}. ${t.name}` })),
                    ]}
                  />
                </div>
                <div style={{ minWidth: '150px' }}>
                  <AppSelect
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    options={[
                      { value: '', label: 'Tất cả hạng GPLX' },
                      { value: 'A1', label: 'Hạng A1' },
                      { value: 'A2', label: 'Hạng A2' },
                      { value: 'B1', label: 'Hạng B1' },
                      { value: 'B', label: 'Hạng B / B2' },
                      { value: 'C', label: 'Hạng C' },
                    ]}
                  />
                </div>
                <div style={{ minWidth: '160px' }}>
                  <AppSelect
                    value={selectedParalysisFilter}
                    onChange={(e) => setSelectedParalysisFilter(e.target.value)}
                    options={[
                      { value: '', label: 'Tất cả loại câu hỏi' },
                      { value: 'true', label: '⚠️ Chỉ câu điểm liệt' },
                      { value: 'false', label: 'Câu hỏi thường' },
                    ]}
                  />
                </div>
                <div style={{ minWidth: '220px', flex: 1 }}>
                  <AppInput
                    placeholder="Tìm theo nội dung hoặc số câu..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                  />
                </div>
              </div>

              <AppButton
                variant="primary"
                onClick={openCreateQuestionModal}
                style={{ backgroundColor: '#1e3a8a', borderColor: '#1e3a8a', whiteSpace: 'nowrap' }}
              >
                ➕ Thêm câu hỏi mới
              </AppButton>
            </div>
          </div>

          {/* Bảng danh sách câu hỏi */}
          {loadingQuestions ? (
            <LoadingSpinner text="Đang tải danh sách câu hỏi..." />
          ) : filteredQuestions.length === 0 ? (
            <div
              style={{
                background: '#ffffff',
                borderRadius: '12px',
                padding: '3rem',
                textAlign: 'center',
                color: '#64748b',
                border: '1px solid #e2e8f0',
              }}
            >
              Không tìm thấy câu hỏi nào phù hợp với điều kiện tìm kiếm.
            </div>
          ) : (
            <div
              style={{
                background: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                      <th style={{ padding: '0.75rem 1rem', width: '70px' }}>Số</th>
                      <th style={{ padding: '0.75rem 1rem', width: '90px' }}>Hạng</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Nội dung câu hỏi</th>
                      <th style={{ padding: '0.75rem 1rem', width: '130px' }}>Phân loại</th>
                      <th style={{ padding: '0.75rem 1rem', width: '80px' }}>Hình ảnh</th>
                      <th style={{ padding: '0.75rem 1rem', width: '160px', textAlign: 'right' }}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuestions.map((q) => (
                      <tr key={q.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '0.75rem 1rem', fontWeight: 700, color: '#1e3a8a' }}>
                          #{q.questionNumber}
                        </td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          <span
                            style={{
                              background: '#e0f2fe',
                              color: '#0369a1',
                              padding: '0.2rem 0.5rem',
                              borderRadius: '4px',
                              fontWeight: 700,
                              fontSize: '0.78rem',
                            }}
                          >
                            {q.categoryCode}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem 1rem', color: '#1e293b', fontWeight: 500 }}>
                          <div
                            style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              lineHeight: '1.4',
                            }}
                          >
                            {q.content}
                          </div>
                        </td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          {q.isParalysis ? (
                            <span
                              style={{
                                background: '#fee2e2',
                                color: '#b91c1c',
                                padding: '0.2rem 0.5rem',
                                borderRadius: '4px',
                                fontWeight: 700,
                                fontSize: '0.78rem',
                              }}
                            >
                              ⚠️ Điểm liệt
                            </span>
                          ) : (
                            <span style={{ color: '#64748b', fontSize: '0.82rem' }}>Thường</span>
                          )}
                        </td>
                        <td style={{ padding: '0.75rem 1rem' }}>
                          {q.imageUrl ? (
                            <span title="Có hình ảnh minh họa" style={{ fontSize: '1.1rem' }}>🖼️</span>
                          ) : (
                            <span style={{ color: '#cbd5e1' }}>—</span>
                          )}
                        </td>
                        <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.35rem' }}>
                            <button
                              type="button"
                              onClick={() => setViewingQuestion(q)}
                              style={{
                                background: '#f1f5f9',
                                border: '1px solid #cbd5e1',
                                borderRadius: '4px',
                                padding: '0.3rem 0.6rem',
                                cursor: 'pointer',
                                fontSize: '0.82rem',
                              }}
                              title="Xem chi tiết"
                            >
                              👁️
                            </button>
                            <button
                              type="button"
                              onClick={() => openEditQuestionModal(q)}
                              style={{
                                background: '#eff6ff',
                                border: '1px solid #bfdbfe',
                                color: '#1e40af',
                                borderRadius: '4px',
                                padding: '0.3rem 0.6rem',
                                cursor: 'pointer',
                                fontSize: '0.82rem',
                              }}
                              title="Chỉnh sửa câu hỏi"
                            >
                              ✏️
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeletingQuestion(q)}
                              style={{
                                background: '#fef2f2',
                                border: '1px solid #fecdd3',
                                color: '#dc2626',
                                borderRadius: '4px',
                                padding: '0.3rem 0.6rem',
                                cursor: 'pointer',
                                fontSize: '0.82rem',
                              }}
                              title="Xóa câu hỏi"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Phân trang câu hỏi */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.85rem 1.25rem',
                  background: '#f8fafc',
                  borderTop: '1px solid #e2e8f0',
                  fontSize: '0.85rem',
                  color: '#64748b',
                }}
              >
                <span>
                  Trang {page + 1} / {totalPages || 1} (Tổng cộng {totalElements} câu hỏi)
                </span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <AppButton
                    variant="secondary"
                    size="sm"
                    onClick={() => loadQuestions(page - 1)}
                    disabled={page === 0}
                  >
                    ← Trang trước
                  </AppButton>
                  <AppButton
                    variant="secondary"
                    size="sm"
                    onClick={() => loadQuestions(page + 1)}
                    disabled={page >= totalPages - 1}
                  >
                    Trang sau →
                  </AppButton>
                </div>
              </div>
            </div>
          )}

          {/* Modal Xem chi tiết câu hỏi */}
          {viewingQuestion && (
            <Modal
              isOpen={true}
              onClose={() => setViewingQuestion(null)}
              title={`Chi tiết Câu hỏi #${viewingQuestion.questionNumber} (Hạng ${viewingQuestion.categoryCode})`}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {viewingQuestion.isParalysis && (
                    <span
                      style={{
                        background: '#fee2e2',
                        color: '#b91c1c',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                      }}
                    >
                      ⚠️ CÂU ĐIỂM LIỆT
                    </span>
                  )}
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    Chương: <strong>{viewingQuestion.topicName}</strong>
                  </span>
                </div>

                <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1e293b', lineHeight: '1.5' }}>
                  {viewingQuestion.content}
                </div>

                {viewingQuestion.imageUrl && (
                  <div style={{ maxWidth: '400px' }}>
                    <img
                      src={viewingQuestion.imageUrl}
                      alt="Hình ảnh minh họa"
                      style={{ width: '100%', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    />
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <strong style={{ fontSize: '0.9rem', color: '#475569' }}>Các phương án trả lời:</strong>
                  {viewingQuestion.answers.map((ans, idx) => (
                    <div
                      key={ans.id}
                      style={{
                        padding: '0.65rem 0.85rem',
                        borderRadius: '6px',
                        border: ans.isCorrect ? '2px solid #10b981' : '1px solid #e2e8f0',
                        background: ans.isCorrect ? '#ecfdf5' : '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                      }}
                    >
                      <span style={{ fontWeight: 700, color: '#475569' }}>{String.fromCharCode(65 + idx)}.</span>
                      <span style={{ flex: 1, color: '#1e293b' }}>{ans.answerText}</span>
                      {ans.isCorrect && (
                        <span style={{ color: '#059669', fontWeight: 700, fontSize: '0.8rem' }}>
                          ✓ Đáp án đúng
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {viewingQuestion.explanation && (
                  <div style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem', color: '#334155' }}>
                    <strong>💡 Lời giải: </strong> {viewingQuestion.explanation}
                  </div>
                )}

                {viewingQuestion.legalReference && (
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic' }}>
                    ⚖️ Căn cứ pháp lý: {viewingQuestion.legalReference}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                  <AppButton variant="secondary" onClick={() => setViewingQuestion(null)}>
                    Đóng
                  </AppButton>
                </div>
              </div>
            </Modal>
          )}

          {/* Modal Tạo mới / Sửa câu hỏi */}
          {isUpsertModalOpen && (
            <Modal
              isOpen={true}
              onClose={() => setIsUpsertModalOpen(false)}
              title={editingQuestionId ? `Chỉnh sửa Câu hỏi #${formQuestionNumber}` : 'Thêm mới Câu hỏi vào Ngân hàng'}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '75vh', overflowY: 'auto', paddingRight: '0.3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                      Hạng GPLX:
                    </label>
                    <AppSelect
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      options={[
                        { value: 'A1', label: 'Hạng A1' },
                        { value: 'A2', label: 'Hạng A2' },
                        { value: 'B1', label: 'Hạng B1' },
                        { value: 'B', label: 'Hạng B / B2' },
                        { value: 'C', label: 'Hạng C' },
                      ]}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                      Chương / Nhóm:
                    </label>
                    <AppSelect
                      value={String(formTopicId)}
                      onChange={(e) => setFormTopicId(parseInt(e.target.value, 10))}
                      options={topics.map((t) => ({ value: String(t.id), label: `${t.code}. ${t.name}` }))}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                      Số thứ tự câu:
                    </label>
                    <AppInput
                      type="number"
                      value={formQuestionNumber}
                      onChange={(e) => setFormQuestionNumber(parseInt(e.target.value, 10) || 0)}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    Nội dung câu hỏi:
                  </label>
                  <textarea
                    rows={3}
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="Nhập nội dung câu hỏi sát hạch..."
                    style={{
                      width: '100%',
                      padding: '0.6rem',
                      borderRadius: '6px',
                      border: '1px solid #cbd5e1',
                      fontFamily: 'inherit',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                      Đường dẫn hình ảnh (nếu có):
                    </label>
                    <AppInput
                      placeholder="/images/theory/q1.png"
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', paddingTop: '1.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 600, color: '#b91c1c' }}>
                      <input
                        type="checkbox"
                        checked={formIsParalysis}
                        onChange={(e) => setFormIsParalysis(e.target.checked)}
                        style={{ width: '18px', height: '18px' }}
                      />
                      ⚠️ Đánh dấu là Câu hỏi điểm liệt
                    </label>
                  </div>
                </div>

                {/* Danh sách các phương án trả lời */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                      Các phương án trả lời (chọn nút tròn để chỉ định đáp án đúng):
                    </label>
                    <AppButton
                      variant="secondary"
                      size="sm"
                      onClick={handleAddAnswerOption}
                      disabled={formAnswers.length >= 5}
                    >
                      ➕ Thêm phương án
                    </AppButton>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {formAnswers.map((ans, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          background: ans.isCorrect ? '#ecfdf5' : '#f8fafc',
                          padding: '0.5rem 0.75rem',
                          borderRadius: '6px',
                          border: ans.isCorrect ? '1px solid #10b981' : '1px solid #e2e8f0',
                        }}
                      >
                        <input
                          type="radio"
                          name="correct-answer-group"
                          checked={ans.isCorrect}
                          onChange={() => handleSetCorrectAnswer(idx)}
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                          title="Chọn làm đáp án đúng"
                        />
                        <span style={{ fontWeight: 700, color: '#475569', width: '20px' }}>
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        <input
                          type="text"
                          value={ans.answerText}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFormAnswers((prev) =>
                              prev.map((a, i) => (i === idx ? { ...a, answerText: val } : a))
                            );
                          }}
                          placeholder={`Nội dung phương án ${String.fromCharCode(65 + idx)}...`}
                          style={{
                            flex: 1,
                            padding: '0.45rem 0.6rem',
                            borderRadius: '4px',
                            border: '1px solid #cbd5e1',
                            fontSize: '0.9rem',
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveAnswerOption(idx)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#94a3b8',
                            cursor: 'pointer',
                            fontSize: '1rem',
                          }}
                          title="Xóa phương án này"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    Lời giải thích chi tiết:
                  </label>
                  <AppInput
                    placeholder="Giải thích vì sao chọn đáp án này..."
                    value={formExplanation}
                    onChange={(e) => setFormExplanation(e.target.value)}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                    Căn cứ pháp lý:
                  </label>
                  <AppInput
                    placeholder="Ví dụ: Điều 12 Luật GTĐB 2008, Thông tư 04/2022/TT-BGTVT..."
                    value={formLegalRef}
                    onChange={(e) => setFormLegalRef(e.target.value)}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.75rem' }}>
                  <AppButton variant="secondary" onClick={() => setIsUpsertModalOpen(false)}>
                    Hủy bỏ
                  </AppButton>
                  <AppButton
                    variant="primary"
                    onClick={handleSaveQuestion}
                    disabled={savingQuestion}
                    style={{ backgroundColor: '#1e3a8a', borderColor: '#1e3a8a' }}
                  >
                    {savingQuestion ? 'Đang lưu...' : 'Lưu câu hỏi'}
                  </AppButton>
                </div>
              </div>
            </Modal>
          )}

          {/* Modal Xóa câu hỏi */}
          {deletingQuestion && (
            <Modal
              isOpen={true}
              onClose={() => setDeletingQuestion(null)}
              title="Xác nhận xóa câu hỏi"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p style={{ margin: 0, color: '#334155' }}>
                  Bạn có chắc chắn muốn xóa vĩnh viễn <strong>Câu hỏi #{deletingQuestion.questionNumber}</strong> khỏi hệ thống?
                </p>
                <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '6px', fontSize: '0.9rem', color: '#64748b' }}>
                  {deletingQuestion.content}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <AppButton variant="secondary" onClick={() => setDeletingQuestion(null)}>
                    Hủy bỏ
                  </AppButton>
                  <AppButton
                    variant="primary"
                    onClick={handleDeleteQuestion}
                    disabled={deleting}
                    style={{ backgroundColor: '#dc2626', borderColor: '#dc2626' }}
                  >
                    {deleting ? 'Đang xóa...' : 'Đồng ý xóa'}
                  </AppButton>
                </div>
              </div>
            </Modal>
          )}
        </div>
      )}

      {/* ===================================================================== */}
      {/* PHÂN KHU 3: BULK IMPORT / EXPORT & QUẢN LÝ PHIÊN BẢN                  */}
      {/* ===================================================================== */}
      {activeAdminSubTab === 'IMPORT_EXPORT' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Thông tin bộ dữ liệu & căn cứ pháp lý */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.15rem' }}>
              📜 Thông tin Bộ dữ liệu & Căn cứ Pháp lý
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Bộ câu hỏi sát hạch</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e3a8a', marginTop: '0.2rem' }}>
                  Bộ 600 câu hỏi Cục ĐBVN
                </div>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Trạng thái xác minh</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#059669', marginTop: '0.2rem' }}>
                  ✓ VERIFIED (60 câu điểm liệt)
                </div>
              </div>
              <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Văn bản quy phạm</span>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#334155', marginTop: '0.2rem' }}>
                  TT 12/2017 & TT 04/2022/TT-BGTVT
                </div>
              </div>
            </div>
          </div>

          {/* Khối Nhập hàng loạt (Bulk Import JSON) */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 0.3rem 0', color: '#1e293b', fontSize: '1.15rem' }}>
                📥 Nhập hàng loạt câu hỏi (Bulk Import JSON)
              </h3>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.88rem' }}>
                Dán danh sách câu hỏi dạng mảng JSON theo định dạng chuẩn (categoryCode, questionNumber, content, isParalysis, answers).
                Hệ thống tự động kiểm tra cú pháp và cấu trúc trước khi lưu vào ngân hàng dữ liệu.
              </p>
            </div>

            <textarea
              rows={8}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='[
  {
    "categoryCode": "B1",
    "questionNumber": 1,
    "content": "Hành vi nào dưới đây bị nghiêm cấm?",
    "isParalysis": true,
    "answers": [
      { "answerText": "Đỗ xe trên hè phố.", "isCorrect": false, "orderIndex": 1 },
      { "answerText": "Điều khiển xe chạy quá tốc độ.", "isCorrect": true, "orderIndex": 2 }
    ]
  }
]'
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                background: '#f8fafc',
              }}
            />

            {importResult && (
              <div
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  background: importResult.failureCount > 0 ? '#fff7ed' : '#ecfdf5',
                  border: importResult.failureCount > 0 ? '1px solid #fed7aa' : '1px solid #a7f3d0',
                  fontSize: '0.9rem',
                }}
              >
                <div style={{ fontWeight: 700, color: importResult.failureCount > 0 ? '#c2410c' : '#047857' }}>
                  📊 Báo cáo kết quả xử lý:
                </div>
                <div style={{ marginTop: '0.4rem', color: '#334155' }}>
                  - Tổng số câu nhận được: <strong>{importResult.totalReceived}</strong> | Thành công: <strong>{importResult.successCount}</strong> | Lỗi: <strong>{importResult.failureCount}</strong>
                </div>
                {importResult.errors && importResult.errors.length > 0 && (
                  <div style={{ marginTop: '0.5rem', color: '#b91c1c', fontSize: '0.85rem' }}>
                    <strong>Danh sách lỗi:</strong>
                    <ul style={{ margin: '0.3rem 0 0 1.25rem', padding: 0 }}>
                      {importResult.errors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div>
              <AppButton
                variant="primary"
                onClick={handleBulkImport}
                disabled={importing}
                style={{ backgroundColor: '#1e3a8a', borderColor: '#1e3a8a' }}
              >
                {importing ? 'Đang xác thực & nhập dữ liệu...' : '🚀 Bắt đầu nhập dữ liệu ngay'}
              </AppButton>
            </div>
          </div>

          {/* Khối Xuất dữ liệu (Export JSON) */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 0.3rem 0', color: '#1e293b', fontSize: '1.15rem' }}>
                📤 Xuất dữ liệu ngân hàng câu hỏi (Export JSON)
              </h3>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.88rem' }}>
                Tải xuống toàn bộ câu hỏi hoặc lọc theo chương và hạng GPLX dưới định dạng file JSON tiêu chuẩn.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <AppButton
                variant="secondary"
                onClick={handleExportJson}
                disabled={exporting}
              >
                {exporting ? 'Đang chuẩn bị file...' : '💾 Tải xuống file JSON ngân hàng câu hỏi'}
              </AppButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
