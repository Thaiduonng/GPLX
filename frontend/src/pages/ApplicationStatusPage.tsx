import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Icons } from '../components/ui';
import { admissionService } from '../services/admissionService';
import {
  ApplicationStatus,
  DocumentUploadItem,
  PublicApplicationResponse
} from '../types/admission';
import styles from './ApplicationStatusPage.module.css';

export const ApplicationStatusPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [applicationCode, setApplicationCode] = useState(searchParams.get('code') || '');
  const [authInput, setAuthInput] = useState(searchParams.get('token') || '');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PublicApplicationResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Supplement Form State
  const [supplementDocs, setSupplementDocs] = useState<DocumentUploadItem[]>([]);
  const [supplementNote, setSupplementNote] = useState('');
  const [submittingSupplement, setSubmittingSupplement] = useState(false);
  const [supplementSuccess, setSupplementSuccess] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!applicationCode.trim()) {
      setErrorMsg('Vui lòng nhập Mã hồ sơ (VD: APP-B1-20261028-5560).');
      return;
    }
    if (!authInput.trim()) {
      setErrorMsg('Vui lòng nhập Số điện thoại đăng ký hoặc Mã bảo mật (Tracking Token).');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg(null);
      setSupplementSuccess(false);

      const trimmedAuth = authInput.trim();
      const isToken = /^[a-f0-9]{16}$/i.test(trimmedAuth) || trimmedAuth.length > 13;

      const data = await admissionService.trackApplication({
        applicationCode: applicationCode.trim(),
        phone: !isToken ? trimmedAuth : undefined,
        trackingToken: isToken ? trimmedAuth : undefined
      });
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'Không tìm thấy hồ sơ hoặc thông tin xác thực chưa chính xác. Vui lòng kiểm tra lại.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.get('code') && (searchParams.get('token') || authInput)) {
      handleSearch();
    }
  }, []);

  const handleSupplementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (supplementDocs.length === 0) {
      alert('Vui lòng đính kèm ít nhất 1 tài liệu bổ sung.');
      return;
    }

    try {
      setSubmittingSupplement(true);
      const updated = await admissionService.supplementDocuments(result!.applicationCode, {
        trackingToken: authInput.trim() || undefined,
        documents: supplementDocs,
        note: supplementNote.trim() || undefined
      });
      setResult(updated);
      setSupplementDocs([]);
      setSupplementNote('');
      setSupplementSuccess(true);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Không thể gửi bổ sung hồ sơ. Vui lòng kiểm tra lại mã tra cứu.');
    } finally {
      setSubmittingSupplement(false);
    }
  };

  const getStatusBadgeConfig = (status: ApplicationStatus) => {
    switch (status) {
      case 'SUBMITTED':
        return { text: 'Đã tiếp nhận trực tuyến', styleClass: styles.badgeSubmitted };
      case 'UNDER_REVIEW':
        return { text: 'Đang thẩm định hồ sơ', styleClass: styles.badgeUnderReview };
      case 'SUPPLEMENT_REQUIRED':
        return { text: 'Yêu cầu bổ sung giấy tờ', styleClass: styles.badgeSupplement };
      case 'RESUBMITTED':
        return { text: 'Đã nộp bổ sung giấy tờ', styleClass: styles.badgeUnderReview };
      case 'APPROVED':
        return { text: 'Hồ sơ đã được phê duyệt', styleClass: styles.badgeApproved };
      case 'ENROLLED':
        return { text: 'Đã xếp lớp & Nhập học', styleClass: styles.badgeEnrolled };
      case 'REJECTED':
        return { text: 'Từ chối tiếp nhận', styleClass: styles.badgeRejected };
      default:
        return { text: status, styleClass: styles.badgeSubmitted };
    }
  };

  const getTimelineStepIndex = (status: ApplicationStatus) => {
    switch (status) {
      case 'SUBMITTED':
        return 1;
      case 'UNDER_REVIEW':
      case 'SUPPLEMENT_REQUIRED':
      case 'RESUBMITTED':
        return 2;
      case 'APPROVED':
        return 3;
      case 'ENROLLED':
        return 4;
      default:
        return 1;
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.headerBadge}>
          <Icons.Shield size={14} />
          Cổng tra cứu điện tử an toàn • Bảo mật dữ liệu cá nhân
        </div>
        <h1 className={styles.headerTitle}>Tra Cứu Tiến Độ Hồ Sơ Tuyển Sinh</h1>
        <p className={styles.headerSubtitle}>
          Theo dõi trạng thái thẩm định, yêu cầu bổ sung giấy tờ và thông tin lớp học đào tạo lái xe trực tuyến mọi lúc, mọi nơi.
        </p>
      </div>

      {/* Search Card */}
      <div className={styles.cardSurface}>
        <form onSubmit={handleSearch}>
          <div className={styles.searchGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Mã hồ sơ điện tử <span className={styles.requiredStar}>*</span>
              </label>
              <input
                type="text"
                required
                placeholder="VD: APP-B1-20261028-5560"
                value={applicationCode}
                onChange={e => setApplicationCode(e.target.value.toUpperCase())}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Số điện thoại HOẶC Mã Token <span className={styles.requiredStar}>*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Số điện thoại hoặc Tracking Token"
                value={authInput}
                onChange={e => setAuthInput(e.target.value)}
                className={styles.formInput}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={styles.searchBtn}
            >
              {loading ? (
                <>
                  <Icons.Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  Đang tra cứu...
                </>
              ) : (
                <>
                  <Icons.Search size={16} />
                  Tra cứu ngay
                </>
              )}
            </button>
          </div>
        </form>

        {errorMsg && (
          <div style={{ marginTop: '1.25rem', background: 'var(--color-danger-bg)', border: '1px solid var(--color-danger-border)', color: 'var(--color-danger)', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem', fontWeight: 600 }}>
            <Icons.AlertTriangle size={18} style={{ flexShrink: 0 }} />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* KẾT QUẢ TRA CỨU */}
      {result && (
        <div className={styles.cardSurface}>
          {/* Header kết quả */}
          <div className={styles.resultHeader}>
            <div>
              <div className={styles.appCodeTitle}>
                <Icons.FileText size={22} style={{ color: 'var(--color-primary)' }} />
                <span>{result.applicationCode}</span>
              </div>
              <div className={styles.dateSubmitted}>
                Thời gian nộp: {new Date(result.submittedAt || result.createdAt || '').toLocaleString('vi-VN')}
              </div>
            </div>

            <div>
              {(() => {
                const badge = getStatusBadgeConfig(result.status);
                return (
                  <div className={`${styles.statusBadge} ${badge.styleClass}`}>
                    <span className={styles.statusDot}></span>
                    <span>{badge.text}</span>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Dòng thời gian 5 chặng */}
          <div className={styles.timelineWrapper}>
            <div className={styles.timelineGrid}>
              {[
                { step: 1, title: '1. Tiếp nhận Online' },
                { step: 2, title: '2. Thẩm định hồ sơ' },
                { step: 3, title: '3. Phê duyệt điều kiện' },
                { step: 4, title: '4. Xếp lớp đào tạo' },
                { step: 5, title: '5. Đào tạo DAT' }
              ].map(item => {
                const currentStepIdx = getTimelineStepIndex(result.status);
                const isDone = item.step < currentStepIdx;
                const isActive = item.step === currentStepIdx;

                return (
                  <div
                    key={item.step}
                    className={`${styles.timelineStep} ${isActive ? styles.timelineStepActive : ''} ${isDone ? styles.timelineStepDone : ''}`}
                  >
                    <div className={styles.timelineCircle}>
                      {isDone ? <Icons.Check size={16} /> : item.step}
                    </div>
                    <span className={styles.timelineText}>{item.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Thông tin hồ sơ (Bảo vệ dữ liệu cá nhân Nghị định 13/2023/NĐ-CP) */}
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Họ và tên học viên</span>
              <span className={styles.infoValue}>{result.maskedFullName || result.fullName || 'Học viên'}</span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Số điện thoại liên hệ</span>
              <span className={styles.infoValue}>{result.maskedPhone || 'Đã bảo mật theo NĐ 13/2023'}</span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Hạng GPLX đăng ký</span>
              <span className={styles.infoValue}>
                Hạng {result.categoryCode} — {result.categoryName}
              </span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Chương trình khóa học</span>
              <span className={styles.infoValue}>{result.courseTitle || 'Khóa đào tạo tiêu chuẩn'}</span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Thời gian học ưu tiên</span>
              <span className={styles.infoValue}>{result.preferredSchedule || 'Linh hoạt'}</span>
            </div>

            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Địa điểm thực hành</span>
              <span className={styles.infoValue}>{result.trainingLocation || 'Cơ sở chính'}</span>
            </div>

            {result.enrolledClassName && (
              <div className={`${styles.infoItem}`} style={{ gridColumn: '1 / -1', background: 'var(--color-success-bg)', borderColor: 'var(--color-success-border)' }}>
                <span className={styles.infoLabel} style={{ color: 'var(--color-success)' }}>Lớp đào tạo chính thức</span>
                <span className={styles.infoValue} style={{ color: 'var(--color-success)', fontSize: '1.1rem' }}>
                  ✓ {result.enrolledClassName}
                </span>
              </div>
            )}
          </div>

          {/* CẢNH BÁO YÊU CẦU BỔ SUNG TÀI LIỆU (SUPPLEMENT_REQUIRED) */}
          {result.status === 'SUPPLEMENT_REQUIRED' && (
            <div className={styles.supplementBox}>
              <h3 className={styles.supplementTitle}>
                <Icons.AlertTriangle size={20} />
                Yêu cầu bổ sung tài liệu từ cán bộ tuyển sinh
              </h3>
              <div className={styles.supplementReason}>
                <strong>Nội dung yêu cầu: </strong>
                {result.rejectionReason || 'Vui lòng cung cấp lại ảnh giấy tờ rõ nét theo hướng dẫn của trung tâm.'}
              </div>

              {supplementSuccess ? (
                <div style={{ background: 'var(--color-success-bg)', border: '1px solid var(--color-success-border)', color: 'var(--color-success)', padding: '1rem', borderRadius: 'var(--radius-lg)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icons.Check size={20} />
                  <span>Hồ sơ bổ sung đã được gửi thành công! Cán bộ sẽ thẩm định lại trong 24 giờ.</span>
                </div>
              ) : (
                <form onSubmit={handleSupplementSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label className={styles.formLabel} style={{ marginBottom: '6px', display: 'block' }}>
                      Đính kèm tài liệu bổ sung
                    </label>
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => {
                          const doc: DocumentUploadItem = {
                            documentType: 'NATIONAL_ID_FRONT',
                            fileName: 'cccd_mat_truoc_chup_lai.jpg',
                            fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=60',
                            fileSize: 204800,
                            mimeType: 'image/jpeg'
                          };
                          setSupplementDocs(prev => [...prev, doc]);
                        }}
                        style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-heading)' }}
                      >
                        + CCCD Mặt trước (chụp lại)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const doc: DocumentUploadItem = {
                            documentType: 'NATIONAL_ID_BACK',
                            fileName: 'cccd_mat_sau_chup_lai.jpg',
                            fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=60',
                            fileSize: 215000,
                            mimeType: 'image/jpeg'
                          };
                          setSupplementDocs(prev => [...prev, doc]);
                        }}
                        style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-heading)' }}
                      >
                        + CCCD Mặt sau (chụp lại)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const doc: DocumentUploadItem = {
                            documentType: 'HEALTH_CERTIFICATE',
                            fileName: 'giay_kham_suc_khoe_moi.pdf',
                            fileUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=60',
                            fileSize: 520000,
                            mimeType: 'application/pdf'
                          };
                          setSupplementDocs(prev => [...prev, doc]);
                        }}
                        style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--color-surface)', border: '1px solid var(--color-border)', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-heading)' }}
                      >
                        + Giấy khám sức khỏe mới
                      </button>
                    </div>

                    {supplementDocs.length > 0 && (
                      <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {supplementDocs.map((doc, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.4rem 0.75rem', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem' }}>
                            <span>✓ {doc.fileName}</span>
                            <button
                              type="button"
                              onClick={() => setSupplementDocs(prev => prev.filter((_, i) => i !== idx))}
                              style={{ background: 'none', border: 'none', color: 'var(--color-danger)', cursor: 'pointer', fontWeight: 700 }}
                            >
                              Xóa
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className={styles.formLabel} style={{ marginBottom: '4px', display: 'block' }}>
                      Ghi chú phản hồi cán bộ tuyển sinh
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Nhập phản hồi hoặc ghi chú thêm..."
                      value={supplementNote}
                      onChange={e => setSupplementNote(e.target.value)}
                      style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-heading)', fontSize: '0.875rem' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingSupplement || supplementDocs.length === 0}
                    className={styles.searchBtn}
                    style={{ alignSelf: 'flex-start' }}
                  >
                    {submittingSupplement ? 'Đang gửi...' : 'Gửi bổ sung hồ sơ ngay'}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Danh sách tài liệu đã đính kèm */}
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-heading)', margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icons.FileText size={18} style={{ color: 'var(--color-primary)' }} />
              Tài liệu điện tử đính kèm ({result.documents?.length || 0})
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.75rem' }}>
              {result.documents && result.documents.map((doc) => (
                <div key={doc.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'var(--color-surface-hover)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden' }}>
                    <Icons.FileText size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-heading)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {doc.fileName}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-success)', flexShrink: 0 }}>
                    ✓ Hợp lệ
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationStatusPage;
