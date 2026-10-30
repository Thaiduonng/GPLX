import { admissionService } from '../services/admissionService';
import type { LicenseCategory } from '../types/admission';
import { useEffect, useState } from 'react';
import { rawVehicleService } from '../services/rawVehicleService';
import {
  RawVehicleEnrollmentSummaryDto,
  RawVehicleSessionDto,
  RawVehicleStageDto,
  RawVehicleSessionChangeLogDto,
  CreateRawVehicleSessionRequest,
  EnrollRawVehicleRequest,
  UpdateRawVehicleSessionRequest,
} from '../types/rawVehicle';
import { LoadingSpinner, Alert, StatusBadge, AppButton, Modal } from '../components/ui';
import styles from './RawVehicle.module.css';

type TabType = 'ENROLLMENTS' | 'SESSIONS' | 'STAGES' | 'AUDIT_LOGS';

export default function RawVehicleManagerPage() {
  const [categories, setCategories] = useState<LicenseCategory[]>([]);
  useEffect(() => {
    admissionService.getActiveCategories().then(items => {
      setCategories(items);
      const selected = items.find(c => c.code === 'B');
      if (selected) setEnrollForm(form => ({ ...form, categoryId: selected.id }));
    }).catch(() => setError('Không tải được danh mục hạng GPLX. Vui lòng tải lại trang.'));
  }, []);
  const [activeTab, setActiveTab] = useState<TabType>('ENROLLMENTS');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Data states
  const [enrollments, setEnrollments] = useState<RawVehicleEnrollmentSummaryDto[]>([]);
  const [sessions, setSessions] = useState<RawVehicleSessionDto[]>([]);
  const [stages, setStages] = useState<RawVehicleStageDto[]>([]);
  const [auditLogs, setAuditLogs] = useState<RawVehicleSessionChangeLogDto[]>([]);
  const [selectedSessionForLogs, setSelectedSessionForLogs] = useState<number | null>(null);

  // Filters
  const [searchEnrollment, setSearchEnrollment] = useState<string>('');
  const [filterEnrollmentStatus, setFilterEnrollmentStatus] = useState<string>('');

  // Modal Enroll
  const [showEnrollModal, setShowEnrollModal] = useState<boolean>(false);
  const [enrollForm, setEnrollForm] = useState<EnrollRawVehicleRequest>({
    studentId: 1,
    categoryId: 2,
    instructorId: 1,
    notes: 'Đăng ký chương trình xe thô theo nhu cầu làm quen ban đầu.',
  });
  const [submittingEnroll, setSubmittingEnroll] = useState<boolean>(false);

  // Modal Create Session
  const [showCreateSessionModal, setShowCreateSessionModal] = useState<boolean>(false);
  const [sessionForm, setSessionForm] = useState<{
    instructorId: number;
    vehicleId: number;
    stageId: number;
    scheduledStartTime: string;
    scheduledEndTime: string;
    practiceLocation: string;
    selectedStudentIds: number[];
  }>({
    instructorId: 1,
    vehicleId: 1,
    stageId: 1,
    scheduledStartTime: '',
    scheduledEndTime: '',
    practiceLocation: 'Sân tập lái xe thô - Khu kỹ năng cơ bản',
    selectedStudentIds: [],
  });
  const [submittingSession, setSubmittingSession] = useState<boolean>(false);

  // Modal Update / Cancel Session
  const [selectedSessionForUpdate, setSelectedSessionForUpdate] = useState<RawVehicleSessionDto | null>(null);
  const [updateForm, setUpdateForm] = useState<UpdateRawVehicleSessionRequest>({
    scheduledStartTime: '',
    scheduledEndTime: '',
    practiceLocation: '',
    reason: '',
  });
  const [submittingUpdate, setSubmittingUpdate] = useState<boolean>(false);

  const [selectedSessionForCancel, setSelectedSessionForCancel] = useState<RawVehicleSessionDto | null>(null);
  const [cancelReason, setCancelReason] = useState<string>('');
  const [submittingCancel, setSubmittingCancel] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [enrollRes, sessRes, stagesRes] = await Promise.all([
        rawVehicleService.getAllEnrollments(filterEnrollmentStatus || undefined, searchEnrollment || undefined),
        rawVehicleService.getAllSessions(),
        rawVehicleService.getAllStages(),
      ]);
      setEnrollments(enrollRes.data || []);
      setSessions(sessRes.data || []);
      setStages(stagesRes.data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Lỗi khi tải dữ liệu quản lý xe thô');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterEnrollmentStatus]);

  const handleSearchEnrollments = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmittingEnroll(true);
      setError(null);
      await rawVehicleService.enrollStudent(enrollForm);
      setSuccessMsg('Đăng ký học viên vào chương trình xe thô thành công!');
      setShowEnrollModal(false);
      fetchData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Lỗi khi ghi danh học viên');
    } finally {
      setSubmittingEnroll(false);
    }
  };

  const handleCreateSessionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sessionForm.selectedStudentIds.length === 0) {
      setError('Vui lòng chọn ít nhất một học viên cho buổi thực hành.');
      return;
    }
    try {
      setSubmittingSession(true);
      setError(null);
      const payload: CreateRawVehicleSessionRequest = {
        instructorId: sessionForm.instructorId,
        vehicleId: sessionForm.vehicleId,
        stageId: sessionForm.stageId,
        scheduledStartTime: sessionForm.scheduledStartTime,
        scheduledEndTime: sessionForm.scheduledEndTime,
        practiceLocation: sessionForm.practiceLocation,
        studentIds: sessionForm.selectedStudentIds,
      };
      await rawVehicleService.createSession(payload);
      setSuccessMsg('Xếp lịch thực hành xe thô thành công!');
      setShowCreateSessionModal(false);
      fetchData();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'Lỗi xếp lịch: Vui lòng kiểm tra xung đột trùng lịch giáo viên, xe bảo dưỡng hoặc kiểm định an toàn.'
      );
    } finally {
      setSubmittingSession(false);
    }
  };

  const handleUpdateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSessionForUpdate) return;
    try {
      setSubmittingUpdate(true);
      setError(null);
      await rawVehicleService.updateSession(selectedSessionForUpdate.id, updateForm);
      setSuccessMsg('Cập nhật thông tin ca học và ghi log thay đổi thành công!');
      setSelectedSessionForUpdate(null);
      fetchData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Lỗi khi cập nhật ca học');
    } finally {
      setSubmittingUpdate(false);
    }
  };

  const handleCancelSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSessionForCancel) return;
    try {
      setSubmittingCancel(true);
      setError(null);
      await rawVehicleService.cancelSession(selectedSessionForCancel.id, {
        cancellationReason: cancelReason,
      });
      setSuccessMsg('Hủy ca học và ghi nhận lý do thành công!');
      setSelectedSessionForCancel(null);
      fetchData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Lỗi khi hủy ca học');
    } finally {
      setSubmittingCancel(false);
    }
  };

  const viewSessionLogs = async (sessionId: number) => {
    try {
      setSelectedSessionForLogs(sessionId);
      const res = await rawVehicleService.getSessionChangeLogs(sessionId);
      setAuditLogs(res.data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Lỗi khi xem nhật ký thay đổi lịch');
    }
  };

  const formatDateTime = (dateStr?: string) => {
    if (!dateStr) return '---';
    try {
      return new Date(dateStr).toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  if (loading && enrollments.length === 0) {
    return (
      <div className={styles.container}>
        <LoadingSpinner text="Đang tải dữ liệu quản lý đào tạo xe thô..." />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header Banner */}
      <div className={styles.headerSection}>
        <div className={styles.headerContent}>
          <div className={styles.badgeTag}>
            <span>🛡️</span>
            <span>PHÒNG ĐÀO TẠO & QUẢN LÝ XE THÔ</span>
          </div>
          <h1 className={styles.title}>Quản Lý & Điều Phối Đào Tạo Xe Thô (Raw Vehicle)</h1>
          <p className={styles.description}>
            Tiếp nhận học viên, phân công giáo viên phụ trách, xếp lịch thực hành kiểm tra xung đột an toàn kỹ thuật
            và theo dõi audit trail thay đổi lịch đào tạo.
          </p>
          <div className={styles.ruleNotice}>
            <span>⚠️</span>
            <div>
              <strong>Tuân thủ an toàn & quy định:</strong> Không xếp phương tiện đang bảo dưỡng hoặc đã hết hạn kiểm định
              an toàn kỹ thuật (FLT-001). Mọi thay đổi lịch đều được lưu lại nhật ký thay đổi phục vụ thanh tra.
            </div>
          </div>
        </div>
      </div>

      {error && <Alert type="danger" title="Lỗi thao tác" message={error} />}
      {successMsg && <Alert type="success" title="Thành công" message={successMsg} />}

      {/* Tabs */}
      <div className={styles.navTabs}>
        <button
          className={`${styles.navTabBtn} ${activeTab === 'ENROLLMENTS' ? styles.navTabBtnActive : ''}`}
          onClick={() => setActiveTab('ENROLLMENTS')}
        >
          Hồ Sơ Ghi Danh ({enrollments.length})
        </button>
        <button
          className={`${styles.navTabBtn} ${activeTab === 'SESSIONS' ? styles.navTabBtnActive : ''}`}
          onClick={() => setActiveTab('SESSIONS')}
        >
          Lịch Thực Hành & Điều Phối ({sessions.length})
        </button>
        <button
          className={`${styles.navTabBtn} ${activeTab === 'STAGES' ? styles.navTabBtnActive : ''}`}
          onClick={() => setActiveTab('STAGES')}
        >
          8 Giai Đoạn Chuẩn ({stages.length})
        </button>
        <button
          className={`${styles.navTabBtn} ${activeTab === 'AUDIT_LOGS' ? styles.navTabBtnActive : ''}`}
          onClick={() => setActiveTab('AUDIT_LOGS')}
        >
          Nhật Ký Thay Đổi Lịch (Audit)
        </button>
      </div>

      {/* Tab 1: Enrollments */}
      {activeTab === 'ENROLLMENTS' && (
        <div className={styles.contentCard}>
          <div className={styles.cardTitle}>
            <span>Danh Sách Học Viên Đăng Ký Xe Thô</span>
            <AppButton variant="primary" onClick={() => setShowEnrollModal(true)}>
              + Đăng Ký Học Viên Mới
            </AppButton>
          </div>

          <form onSubmit={handleSearchEnrollments} className={styles.filterBar}>
            <div className={styles.filterGroup}>
              <input
                type="text"
                className={styles.searchBox}
                placeholder="Tìm kiếm theo tên hoặc SĐT..."
                value={searchEnrollment}
                onChange={(e) => setSearchEnrollment(e.target.value)}
              />
              <select
                className={styles.formSelect}
                value={filterEnrollmentStatus}
                onChange={(e) => setFilterEnrollmentStatus(e.target.value)}
              >
                <option value="">Tất cả trạng thái</option>
                <option value="ENROLLED">Mới ghi danh (ENROLLED)</option>
                <option value="IN_PROGRESS">Đang thực hành (IN_PROGRESS)</option>
                <option value="COMPLETED">Đã hoàn thành (COMPLETED)</option>
                <option value="PAUSED">Tạm dừng (PAUSED)</option>
              </select>
              <AppButton type="submit" variant="secondary">
                Lọc
              </AppButton>
            </div>
          </form>

          {enrollments.length === 0 ? (
            <div style={{ color: '#64748b', padding: '1.5rem', textAlign: 'center' }}>
              Không tìm thấy học viên nào phù hợp tiêu chí.
            </div>
          ) : (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Họ Tên Học Viên</th>
                    <th>Hạng Đào Tạo</th>
                    <th>Giáo Viên Phụ Trách</th>
                    <th>Tiến Độ Giai Đoạn</th>
                    <th>Thời Lượng Đã Học</th>
                    <th>Số Ca Tham Gia</th>
                    <th>Trạng Thái</th>
                    <th>Ngày Đăng Ký</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map((e) => (
                    <tr key={e.id}>
                      <td>
                        <strong>{e.studentName}</strong>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          {e.studentPhone || e.studentEmail}
                        </div>
                      </td>
                      <td>
                        <strong>{e.categoryCode}</strong>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{e.categoryName}</div>
                      </td>
                      <td>{e.instructorName || 'Chưa phân công'}</td>
                      <td>
                        <strong>
                          {e.totalCompletedStages || 0}/8 ({e.progressPercentage || 0}%)
                        </strong>
                      </td>
                      <td>
                        <span style={{ color: '#059669', fontWeight: 600 }}>{e.totalConfirmedMinutes || 0} phút</span>
                      </td>
                      <td>{e.totalSessionsCount || 0} buổi</td>
                      <td>
                        <StatusBadge
                          variant={
                            e.status === 'COMPLETED'
                              ? 'success'
                              : e.status === 'IN_PROGRESS'
                              ? 'info'
                              : 'default'
                          }
                          label={
                            e.status === 'COMPLETED'
                              ? 'Đã hoàn thành'
                              : e.status === 'IN_PROGRESS'
                              ? 'Đang thực hành'
                              : 'Đã ghi danh'
                          }
                        />
                      </td>
                      <td>{e.enrolledDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Sessions */}
      {activeTab === 'SESSIONS' && (
        <div className={styles.contentCard}>
          <div className={styles.cardTitle}>
            <span>Lịch Thực Hành & Điều Phối Đào Tạo</span>
            <AppButton
              variant="primary"
              onClick={() => {
                const now = new Date();
                const nextHour = new Date(now.getTime() + 60 * 60 * 1000);
                const afterNextHour = new Date(now.getTime() + 2 * 60 * 60 * 1000);
                setSessionForm({
                  ...sessionForm,
                  scheduledStartTime: nextHour.toISOString().slice(0, 16),
                  scheduledEndTime: afterNextHour.toISOString().slice(0, 16),
                });
                setShowCreateSessionModal(true);
              }}
            >
              + Tạo Ca Thực Hành Mới
            </AppButton>
          </div>

          <div className={styles.sessionGrid}>
            {sessions.map((s) => (
              <div key={s.id} className={styles.sessionCard}>
                <div className={styles.sessionCardHeader}>
                  <span className={styles.sessionCode}>{s.sessionCode}</span>
                  <StatusBadge
                    variant={
                      s.status === 'COMPLETED'
                        ? 'success'
                        : s.status === 'IN_PROGRESS'
                        ? 'info'
                        : s.status === 'CANCELLED'
                        ? 'danger'
                        : 'warning'
                    }
                    label={
                      s.status === 'COMPLETED'
                        ? 'Đã hoàn thành'
                        : s.status === 'IN_PROGRESS'
                        ? 'Đang thực hành'
                        : s.status === 'CANCELLED'
                        ? 'Đã hủy'
                        : 'Đã lên lịch'
                    }
                  />
                </div>

                <div className={styles.sessionInfoRow}>
                  <span>👨‍🏫 Giáo viên:</span>
                  <strong>{s.instructorName}</strong>
                </div>
                <div className={styles.sessionInfoRow}>
                  <span>🚗 Xe:</span>
                  <span>{s.plateNumber || 'Chưa gán xe'}</span>
                </div>
                <div className={styles.sessionInfoRow}>
                  <span>📍 Địa điểm:</span>
                  <span>{s.practiceLocation}</span>
                </div>
                <div className={styles.sessionInfoRow}>
                  <span>⏰ Dự kiến:</span>
                  <span>{formatDateTime(s.scheduledStartTime)}</span>
                </div>
                <div className={styles.sessionInfoRow}>
                  <span>👥 Học viên ({(s.attendees || []).length}):</span>
                  <span>{(s.attendees || []).map((a) => a.studentName).join(', ') || 'Chưa có'}</span>
                </div>

                {s.status !== 'CANCELLED' && (
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                    <AppButton
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setSelectedSessionForUpdate(s);
                        setUpdateForm({
                          scheduledStartTime: s.scheduledStartTime ? s.scheduledStartTime.slice(0, 16) : '',
                          scheduledEndTime: s.scheduledEndTime ? s.scheduledEndTime.slice(0, 16) : '',
                          practiceLocation: s.practiceLocation,
                          reason: 'Điều chỉnh lịch đào tạo theo yêu cầu.',
                        });
                      }}
                    >
                      Sửa ca học
                    </AppButton>
                    <AppButton
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setSelectedSessionForCancel(s);
                        setCancelReason('Thời tiết xấu hoặc xe bảo dưỡng đột xuất.');
                      }}
                    >
                      Hủy ca
                    </AppButton>
                    <AppButton
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setActiveTab('AUDIT_LOGS');
                        viewSessionLogs(s.id);
                      }}
                    >
                      Xem Audit Log
                    </AppButton>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Stages */}
      {activeTab === 'STAGES' && (
        <div className={styles.contentCard}>
          <h3 className={styles.cardTitle}>Khung 8 Giai Đoạn Đào Tạo Làm Quen Xe Ban Đầu</h3>
          <div className={styles.stageList}>
            {stages.map((st, idx) => (
              <div key={st.id} className={styles.stageCard}>
                <div className={styles.stageNumber}>{idx + 1}</div>
                <div className={styles.stageBody}>
                  <div className={styles.stageHeader}>
                    <h4 className={styles.stageName}>
                      {st.stageCode}: {st.stageName}
                    </h4>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      Thời lượng chuẩn: {st.expectedDurationMinutes} phút
                    </span>
                  </div>
                  <p className={styles.stageDesc}>{st.description}</p>
                  {st.evaluationCriteria && (
                    <div className={styles.safetyAlert}>
                      ⚠️ <strong>Yêu cầu an toàn kỹ thuật:</strong> {st.evaluationCriteria}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Audit Logs */}
      {activeTab === 'AUDIT_LOGS' && (
        <div className={styles.contentCard}>
          <h3 className={styles.cardTitle}>
            <span>Nhật Ký Thay Đổi Lịch Đào Tạo (Audit Trail)</span>
            {selectedSessionForLogs && (
              <span style={{ fontSize: '0.9rem', color: '#64748b' }}>
                Đang xem ca học ID: {selectedSessionForLogs}
              </span>
            )}
          </h3>

          {auditLogs.length === 0 ? (
            <div style={{ color: '#64748b', padding: '1.5rem', textAlign: 'center' }}>
              {selectedSessionForLogs
                ? 'Chưa có thay đổi nào được ghi nhận cho ca học này.'
                : 'Vui lòng chọn một ca học tại tab "Lịch Thực Hành" để xem lịch sử thay đổi.'}
            </div>
          ) : (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Hành Động</th>
                    <th>Trường Thay Đổi</th>
                    <th>Giá Trị Cũ</th>
                    <th>Giá Trị Mới</th>
                    <th>Lý Do Thay Đổi</th>
                    <th>Người Thực Hiện</th>
                    <th>Thời Gian</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map((log) => (
                    <tr key={log.id}>
                      <td>
                        <StatusBadge
                          variant={
                            log.changeType === 'CREATED'
                              ? 'success'
                              : log.changeType === 'CANCELLED'
                              ? 'danger'
                              : 'warning'
                          }
                          label={log.changeType}
                        />
                      </td>
                      <td>
                        <strong>{log.oldValue ? 'Chỉnh sửa' : 'Tạo mới'}</strong>
                      </td>
                      <td>{log.oldValue || '---'}</td>
                      <td>
                        <strong>{log.newValue || '---'}</strong>
                      </td>
                      <td>{log.reason || 'Không ghi lý do'}</td>
                      <td>{log.changedByName}</td>
                      <td>{formatDateTime(log.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modal Enroll */}
      {showEnrollModal && (
        <Modal isOpen={true} title="Đăng Ký Học Viên Vào Xe Thô" onClose={() => setShowEnrollModal(false)}>
          <form onSubmit={handleEnrollSubmit}>
            <div className={styles.formRow}>
              <label className={styles.formLabel}>ID Học Viên</label>
              <input
                type="number"
                className={styles.formInput}
                value={enrollForm.studentId}
                onChange={(e) => setEnrollForm({ ...enrollForm, studentId: Number(e.target.value) })}
                required
              />
            </div>

            <div className={styles.formRow}>
              <label className={styles.formLabel}>Hạng Đào Tạo GPLX</label>
              <select
                className={styles.formSelect}
                value={enrollForm.categoryId}
                onChange={(e) => setEnrollForm({ ...enrollForm, categoryId: Number(e.target.value) })}
              >
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>

            <div className={styles.formRow}>
              <label className={styles.formLabel}>ID Giáo Viên Phụ Trách</label>
              <input
                type="number"
                className={styles.formInput}
                value={enrollForm.instructorId || 1}
                onChange={(e) => setEnrollForm({ ...enrollForm, instructorId: Number(e.target.value) })}
              />
            </div>

            <div className={styles.formRow}>
              <label className={styles.formLabel}>Ghi Chú Đăng Ký</label>
              <textarea
                className={styles.formTextarea}
                rows={2}
                value={enrollForm.notes || ''}
                onChange={(e) => setEnrollForm({ ...enrollForm, notes: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
              <AppButton variant="secondary" onClick={() => setShowEnrollModal(false)}>
                Hủy
              </AppButton>
              <AppButton type="submit" variant="primary" disabled={submittingEnroll}>
                {submittingEnroll ? 'Đang lưu...' : 'Xác Nhận Đăng Ký'}
              </AppButton>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal Create Session */}
      {showCreateSessionModal && (
        <Modal isOpen={true} title="Xếp Lịch Thực Hành Xe Thô" onClose={() => setShowCreateSessionModal(false)}>
          <form onSubmit={handleCreateSessionSubmit}>
            <div className={styles.formGrid}>
              <div className={styles.formRow}>
                <label className={styles.formLabel}>ID Giáo Viên Hướng Dẫn</label>
                <input
                  type="number"
                  className={styles.formInput}
                  value={sessionForm.instructorId}
                  onChange={(e) => setSessionForm({ ...sessionForm, instructorId: Number(e.target.value) })}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <label className={styles.formLabel}>ID Phương Tiện Thực Hành (Xe)</label>
                <input
                  type="number"
                  className={styles.formInput}
                  value={sessionForm.vehicleId}
                  onChange={(e) => setSessionForm({ ...sessionForm, vehicleId: Number(e.target.value) })}
                  required
                />
              </div>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formRow}>
                <label className={styles.formLabel}>Giờ Bắt Đầu Dự Kiến</label>
                <input
                  type="datetime-local"
                  className={styles.formInput}
                  value={sessionForm.scheduledStartTime}
                  onChange={(e) => setSessionForm({ ...sessionForm, scheduledStartTime: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <label className={styles.formLabel}>Giờ Kết Thúc Dự Kiến</label>
                <input
                  type="datetime-local"
                  className={styles.formInput}
                  value={sessionForm.scheduledEndTime}
                  onChange={(e) => setSessionForm({ ...sessionForm, scheduledEndTime: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <label className={styles.formLabel}>Địa Điểm Thực Hành</label>
              <input
                type="text"
                className={styles.formInput}
                value={sessionForm.practiceLocation}
                onChange={(e) => setSessionForm({ ...sessionForm, practiceLocation: e.target.value })}
                required
              />
            </div>

            <div className={styles.formRow}>
              <label className={styles.formLabel}>Chọn Học Viên Tham Gia</label>
              <div
                style={{
                  maxHeight: '150px',
                  overflowY: 'auto',
                  border: '1px solid #cbd5e1',
                  borderRadius: '0.375rem',
                  padding: '0.5rem',
                }}
              >
                {enrollments.map((enr) => (
                  <label
                    key={enr.studentId}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0' }}
                  >
                    <input
                      type="checkbox"
                      checked={sessionForm.selectedStudentIds.includes(enr.studentId)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSessionForm({
                            ...sessionForm,
                            selectedStudentIds: [...sessionForm.selectedStudentIds, enr.studentId],
                          });
                        } else {
                          setSessionForm({
                            ...sessionForm,
                            selectedStudentIds: sessionForm.selectedStudentIds.filter((id) => id !== enr.studentId),
                          });
                        }
                      }}
                    />
                    <span>
                      {enr.studentName} ({enr.categoryCode})
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
              <AppButton variant="secondary" onClick={() => setShowCreateSessionModal(false)}>
                Hủy
              </AppButton>
              <AppButton type="submit" variant="primary" disabled={submittingSession}>
                {submittingSession ? 'Đang tạo ca...' : 'Lưu Lịch Thực Hành'}
              </AppButton>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal Update Session */}
      {selectedSessionForUpdate && (
        <Modal
          isOpen={true}
          title={`Sửa Ca Học: ${selectedSessionForUpdate.sessionCode}`}
          onClose={() => setSelectedSessionForUpdate(null)}
        >
          <form onSubmit={handleUpdateSession}>
            <div className={styles.formRow}>
              <label className={styles.formLabel}>Địa Điểm Mới</label>
              <input
                type="text"
                className={styles.formInput}
                value={updateForm.practiceLocation || ''}
                onChange={(e) => setUpdateForm({ ...updateForm, practiceLocation: e.target.value })}
              />
            </div>

            <div className={styles.formRow}>
              <label className={styles.formLabel}>
                Lý Do Thay Đổi <span style={{ color: '#dc2626' }}>* (Bắt buộc lưu Audit Log)</span>
              </label>
              <textarea
                className={styles.formTextarea}
                rows={2}
                value={updateForm.reason}
                onChange={(e) => setUpdateForm({ ...updateForm, reason: e.target.value })}
                placeholder="Nhập lý do thay đổi lịch ca học..."
                required
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
              <AppButton variant="secondary" onClick={() => setSelectedSessionForUpdate(null)}>
                Hủy
              </AppButton>
              <AppButton type="submit" variant="primary" disabled={submittingUpdate}>
                {submittingUpdate ? 'Đang lưu...' : 'Lưu Thay Đổi'}
              </AppButton>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal Cancel Session */}
      {selectedSessionForCancel && (
        <Modal
          isOpen={true}
          title={`Hủy Ca Học: ${selectedSessionForCancel.sessionCode}`}
          onClose={() => setSelectedSessionForCancel(null)}
        >
          <form onSubmit={handleCancelSession}>
            <p style={{ color: '#dc2626', fontSize: '0.9rem' }}>
              Bạn có chắc chắn muốn hủy ca học này? Hành động này sẽ được ghi vào nhật ký và thông báo cho học viên.
            </p>

            <div className={styles.formRow}>
              <label className={styles.formLabel}>
                Lý Do Hủy Ca <span style={{ color: '#dc2626' }}>*</span>
              </label>
              <textarea
                className={styles.formTextarea}
                rows={3}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Ví dụ: Xe bảo dưỡng đột xuất, điều kiện thời tiết không bảo đảm an toàn..."
                required
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
              <AppButton variant="secondary" onClick={() => setSelectedSessionForCancel(null)}>
                Bỏ qua
              </AppButton>
              <AppButton type="submit" variant="danger" disabled={submittingCancel}>
                {submittingCancel ? 'Đang xử lý...' : 'Xác Nhận Hủy Ca'}
              </AppButton>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
