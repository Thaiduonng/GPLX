import { useEffect, useState } from 'react';
import { rawVehicleService } from '../services/rawVehicleService';
import {
  RawVehicleSessionDto,
  RawVehicleEnrollmentSummaryDto,
  RawVehicleStageDto,
  RecordSessionAttendanceRequest,
  EvaluateSkillRequest,
  AttendeeAttendanceStatus,
  SkillEvaluationStatus,
} from '../types/rawVehicle';
import { LoadingSpinner, Alert, StatusBadge, AppButton, Modal } from '../components/ui';
import styles from './RawVehicle.module.css';

type TabType = 'SESSIONS' | 'STUDENTS' | 'EVALUATE';

export default function RawVehicleInstructorPage() {
  const [activeTab, setActiveTab] = useState<TabType>('SESSIONS');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [sessions, setSessions] = useState<RawVehicleSessionDto[]>([]);
  const [students, setStudents] = useState<RawVehicleEnrollmentSummaryDto[]>([]);
  const [stages, setStages] = useState<RawVehicleStageDto[]>([]);

  // Modal Attendance
  const [selectedSessionForAttendance, setSelectedSessionForAttendance] = useState<RawVehicleSessionDto | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<RecordSessionAttendanceRequest[]>([]);
  const [savingAttendance, setSavingAttendance] = useState<boolean>(false);

  // Modal Complete Session
  const [selectedSessionForComplete, setSelectedSessionForComplete] = useState<RawVehicleSessionDto | null>(null);
  const [completeForm, setCompleteForm] = useState<{
    actualStartTime: string;
    actualEndTime: string;
    safetyChecked: boolean;
    notes: string;
  }>({
    actualStartTime: '',
    actualEndTime: '',
    safetyChecked: true,
    notes: '',
  });
  const [completingSession, setCompletingSession] = useState<boolean>(false);

  // Evaluation Form
  const [evalForm, setEvalForm] = useState<EvaluateSkillRequest>({
    enrollmentId: 0,
    stageId: 0,
    criterionCode: 'SKILL_BASIC_01',
    skillName: 'Thao tác điều chỉnh gương chiếu hậu và tư thế ngồi',
    ratingLevel: 5,
    evaluationStatus: 'PASSED',
    comments: 'Học viên thực hành tốt, quan sát cẩn thận.',
  });
  const [savingEval, setSavingEval] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [sessRes, studRes, stageRes] = await Promise.all([
        rawVehicleService.getInstructorSessions(),
        rawVehicleService.getInstructorStudents(),
        rawVehicleService.getAllStages(),
      ]);
      setSessions(sessRes.data || []);
      setStudents(studRes.data || []);
      setStages(stageRes.data || []);

      if (studRes.data && studRes.data.length > 0 && stageRes.data && stageRes.data.length > 0) {
        const firstStudent = studRes.data[0];
        const firstStage = stageRes.data[0];
        if (firstStudent && firstStage) {
          setEvalForm((prev) => ({
            ...prev,
            enrollmentId: firstStudent.id,
            stageId: firstStage.id,
          }));
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Lỗi khi tải dữ liệu giáo viên');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAttendanceModal = (session: RawVehicleSessionDto) => {
    setSelectedSessionForAttendance(session);
    setAttendanceRecords(
      (session.attendees || []).map((a) => ({
        studentId: a.studentId,
        attendanceStatus: a.attendanceStatus === 'NOT_YET' ? 'PRESENT' : a.attendanceStatus,
        instructorFeedback: a.instructorFeedback || '',
        skillsToImprove: a.skillsToImprove || '',
      }))
    );
  };

  const handleSaveAttendance = async () => {
    if (!selectedSessionForAttendance) return;
    try {
      setSavingAttendance(true);
      await rawVehicleService.recordAttendance(selectedSessionForAttendance.id, attendanceRecords);
      setSuccessMsg('Ghi nhận điểm danh và nhận xét thành công!');
      setSelectedSessionForAttendance(null);
      fetchData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Lỗi khi điểm danh học viên');
    } finally {
      setSavingAttendance(false);
    }
  };

  const openCompleteModal = (session: RawVehicleSessionDto) => {
    setSelectedSessionForComplete(session);
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    setCompleteForm({
      actualStartTime: session.actualStartTime || oneHourAgo.toISOString().slice(0, 16),
      actualEndTime: session.actualEndTime || now.toISOString().slice(0, 16),
      safetyChecked: true,
      notes: session.instructorNotes || 'Đã kiểm tra an toàn và hoàn thành tốt buổi thực hành.',
    });
  };

  const handleCompleteSession = async () => {
    if (!selectedSessionForComplete) return;
    try {
      setCompletingSession(true);
      await rawVehicleService.completeSession(selectedSessionForComplete.id, {
        actualStartTime: completeForm.actualStartTime,
        actualEndTime: completeForm.actualEndTime,
        instructorNotes: completeForm.notes,
      });
      setSuccessMsg(
        `Hoàn thành buổi học thành công! Thời lượng thực tế đã được tích lũy cho học viên có mặt.`
      );
      setSelectedSessionForComplete(null);
      fetchData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Lỗi khi hoàn thành buổi học');
    } finally {
      setCompletingSession(false);
    }
  };

  const handleSubmitEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!evalForm.enrollmentId || !evalForm.stageId) {
      setError('Vui lòng chọn học viên và giai đoạn kỹ năng.');
      return;
    }
    try {
      setSavingEval(true);
      setError(null);
      await rawVehicleService.evaluateSkill(evalForm);
      setSuccessMsg('Đánh giá kỹ năng học viên thành công!');
      fetchData();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Lỗi khi lưu đánh giá kỹ năng');
    } finally {
      setSavingEval(false);
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

  if (loading) {
    return (
      <div className={styles.container}>
        <LoadingSpinner text="Đang tải dữ liệu đào tạo dành cho giáo viên..." />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header Banner */}
      <div className={styles.headerSection}>
        <div className={styles.headerContent}>
          <div className={styles.badgeTag}>
            <span>👨‍🏫</span>
            <span>BẢNG ĐIỀU KHIỂN GIÁO VIÊN HƯỚNG DẪN</span>
          </div>
          <h1 className={styles.title}>Quản Lý Buổi Thực Hành & Đánh Giá Kỹ Năng Xe Thô</h1>
          <p className={styles.description}>
            Giáo viên phụ trách kiểm tra an toàn phương tiện, ghi nhận điểm danh, xác nhận thời lượng thực tế
            bắt đầu - kết thúc và đánh giá tiến độ từng kỹ năng của học viên.
          </p>
        </div>
      </div>

      {error && <Alert type="danger" title="Thông báo lỗi" message={error} />}
      {successMsg && <Alert type="success" title="Thành công" message={successMsg} />}

      {/* Tabs */}
      <div className={styles.navTabs}>
        <button
          className={`${styles.navTabBtn} ${activeTab === 'SESSIONS' ? styles.navTabBtnActive : ''}`}
          onClick={() => setActiveTab('SESSIONS')}
        >
          Lịch Thực Hành Phụ Trách ({sessions.length})
        </button>
        <button
          className={`${styles.navTabBtn} ${activeTab === 'EVALUATE' ? styles.navTabBtnActive : ''}`}
          onClick={() => setActiveTab('EVALUATE')}
        >
          Chấm Điểm & Đánh Giá Kỹ Năng
        </button>
        <button
          className={`${styles.navTabBtn} ${activeTab === 'STUDENTS' ? styles.navTabBtnActive : ''}`}
          onClick={() => setActiveTab('STUDENTS')}
        >
          Học Viên Được Phân Công ({students.length})
        </button>
      </div>

      {/* Tab 1: Sessions */}
      {activeTab === 'SESSIONS' && (
        <div className={styles.contentCard}>
          <h3 className={styles.cardTitle}>Danh Sách Ca Học & Thực Hành</h3>

          {sessions.length === 0 ? (
            <div style={{ color: '#64748b', padding: '1.5rem', textAlign: 'center' }}>
              Hiện chưa có ca thực hành nào được phân công cho bạn.
            </div>
          ) : (
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
                          ? 'Đang diễn ra'
                          : s.status === 'CANCELLED'
                          ? 'Đã hủy'
                          : 'Đã lên lịch'
                      }
                    />
                  </div>

                  <div className={styles.sessionInfoRow}>
                    <span>🚗 Xe tập lái:</span>
                    <strong>{s.plateNumber || 'Chưa gán xe'}</strong>
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

                  {s.actualDurationMinutes && (
                    <div className={styles.sessionInfoRow} style={{ color: '#059669', fontWeight: 600 }}>
                      <span>⏱️ Thời lượng thực tế:</span>
                      <span>{s.actualDurationMinutes} phút</span>
                    </div>
                  )}

                  {s.instructorNotes && <div className={styles.sessionNotes}>Ghi chú: {s.instructorNotes}</div>}

                  {s.status !== 'COMPLETED' && s.status !== 'CANCELLED' && (
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                      <AppButton variant="secondary" size="sm" onClick={() => openAttendanceModal(s)}>
                        Điểm danh & Nhận xét
                      </AppButton>
                      <AppButton variant="primary" size="sm" onClick={() => openCompleteModal(s)}>
                        Hoàn thành ca học
                      </AppButton>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Evaluate Skill */}
      {activeTab === 'EVALUATE' && (
        <div className={styles.contentCard}>
          <h3 className={styles.cardTitle}>Đánh Giá Kỹ Năng Làm Quen Xe</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            Chấm điểm từng tiêu chí kỹ năng của học viên theo thang điểm 1-5 sao. Học viên đạt tất cả 8 giai đoạn sẽ được xác nhận hoàn thành phần làm quen xe.
          </p>

          <form onSubmit={handleSubmitEvaluation}>
            <div className={styles.formGrid}>
              <div className={styles.formRow}>
                <label className={styles.formLabel}>Chọn Học Viên</label>
                <select
                  className={styles.formSelect}
                  value={evalForm.enrollmentId}
                  onChange={(e) => setEvalForm({ ...evalForm, enrollmentId: Number(e.target.value) })}
                  required
                >
                  <option value={0}>-- Chọn học viên --</option>
                  {students.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.studentName} ({st.categoryCode}) - Đạt {st.totalCompletedStages}/8 giai đoạn
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formRow}>
                <label className={styles.formLabel}>Giai Đoạn Kỹ Năng Đánh Giá</label>
                <select
                  className={styles.formSelect}
                  value={evalForm.stageId}
                  onChange={(e) => setEvalForm({ ...evalForm, stageId: Number(e.target.value) })}
                  required
                >
                  <option value={0}>-- Chọn giai đoạn kỹ năng --</option>
                  {stages.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.stageCode}: {st.stageName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formRow}>
                <label className={styles.formLabel}>Mã Tiêu Chí & Tên Kỹ Năng</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={evalForm.skillName}
                  onChange={(e) => setEvalForm({ ...evalForm, skillName: e.target.value })}
                  placeholder="Ví dụ: Tư thế ngồi lái, chỉnh gương chiếu hậu..."
                  required
                />
              </div>

              <div className={styles.formRow}>
                <label className={styles.formLabel}>Mức Đánh Giá (1 - 5 Sao)</label>
                <select
                  className={styles.formSelect}
                  value={evalForm.ratingLevel}
                  onChange={(e) => setEvalForm({ ...evalForm, ratingLevel: Number(e.target.value) })}
                >
                  <option value={5}>5 Sao - Xuất sắc, thuần thục</option>
                  <option value={4}>4 Sao - Tốt, đúng thao tác</option>
                  <option value={3}>3 Sao - Khá, đạt yêu cầu</option>
                  <option value={2}>2 Sao - Yếu, còn lúng túng</option>
                  <option value={1}>1 Sao - Chưa đạt, cần hướng dẫn lại</option>
                </select>
              </div>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formRow}>
                <label className={styles.formLabel}>Kết Luận Trạng Thái</label>
                <select
                  className={styles.formSelect}
                  value={evalForm.evaluationStatus}
                  onChange={(e) =>
                    setEvalForm({ ...evalForm, evaluationStatus: e.target.value as SkillEvaluationStatus })
                  }
                >
                  <option value="PASSED">Đạt yêu cầu (PASSED)</option>
                  <option value="NEEDS_PRACTICE">Cần luyện thêm (NEEDS_PRACTICE)</option>
                </select>
              </div>

              <div className={styles.formRow}>
                <label className={styles.formLabel}>Nhận Xét Chi Tiết Của Giáo Viên</label>
                <textarea
                  className={styles.formTextarea}
                  rows={2}
                  value={evalForm.comments}
                  onChange={(e) => setEvalForm({ ...evalForm, comments: e.target.value })}
                  placeholder="Nhận xét ưu điểm, điểm cần khắc phục..."
                />
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <AppButton type="submit" variant="primary" disabled={savingEval}>
                {savingEval ? 'Đang lưu đánh giá...' : 'Lưu Đánh Giá Kỹ Năng'}
              </AppButton>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: Students */}
      {activeTab === 'STUDENTS' && (
        <div className={styles.contentCard}>
          <h3 className={styles.cardTitle}>Danh Sách Học Viên Phụ Trách</h3>

          {students.length === 0 ? (
            <div style={{ color: '#64748b', padding: '1.5rem', textAlign: 'center' }}>
              Chưa có học viên nào được phân công cho bạn.
            </div>
          ) : (
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Họ Tên Học Viên</th>
                    <th>Hạng GPLX</th>
                    <th>Tiến Độ Giai Đoạn</th>
                    <th>Thời Lượng Đã Học</th>
                    <th>Số Ca Học</th>
                    <th>Kỹ Năng Đạt / Cần Luyện</th>
                    <th>Trạng Thái</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((st) => (
                    <tr key={st.id}>
                      <td>
                        <strong>{st.studentName}</strong>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          {st.studentPhone || st.studentEmail}
                        </div>
                      </td>
                      <td>{st.categoryCode}</td>
                      <td>
                        <strong>
                          {st.totalCompletedStages}/8 ({st.progressPercentage}%)
                        </strong>
                      </td>
                      <td>{st.totalConfirmedMinutes} phút</td>
                      <td>{st.totalSessionsCount} buổi</td>
                      <td>
                        <span style={{ color: '#059669', fontWeight: 600 }}>{st.passedSkillsCount} Đạt</span> /{' '}
                        <span style={{ color: '#d97706', fontWeight: 600 }}>
                          {st.needsPracticeSkillsCount} Cần luyện
                        </span>
                      </td>
                      <td>
                        <StatusBadge
                          variant={st.status === 'COMPLETED' ? 'success' : 'info'}
                          label={st.status === 'COMPLETED' ? 'Hoàn thành' : 'Đang đào tạo'}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modal Attendance */}
      {selectedSessionForAttendance && (
        <Modal
          isOpen={true}
          title={`Điểm Danh Buổi Học: ${selectedSessionForAttendance.sessionCode}`}
          onClose={() => setSelectedSessionForAttendance(null)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Xác nhận sự có mặt của học viên trong buổi thực hành. Chỉ học viên <strong>Có mặt</strong> mới được tích lũy thời lượng thực tế.
            </p>

            {attendanceRecords.map((att, idx) => {
              const attendeeInfo = (selectedSessionForAttendance.attendees || []).find((a) => a.studentId === att.studentId);
              return (
                <div
                  key={att.studentId}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    padding: '0.75rem',
                    background: '#f8fafc',
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: '0.5rem', color: '#1e293b' }}>
                    {attendeeInfo?.studentName || `Học viên ID ${att.studentId}`}
                  </div>
                  <div className={styles.formGrid}>
                    <div>
                      <label className={styles.formLabel}>Trạng Thái Điểm Danh</label>
                      <select
                        className={styles.formSelect}
                        value={att.attendanceStatus}
                        onChange={(e) => {
                          const updated = [...attendanceRecords];
                          const targetItem = updated[idx];
                          if (targetItem) {
                            targetItem.attendanceStatus = e.target.value as AttendeeAttendanceStatus;
                            setAttendanceRecords(updated);
                          }
                        }}
                      >
                        <option value="PRESENT">Có mặt (PRESENT)</option>
                        <option value="ABSENT">Vắng mặt (ABSENT)</option>
                        <option value="EXCUSED">Có phép (EXCUSED)</option>
                      </select>
                    </div>

                    <div>
                      <label className={styles.formLabel}>Nhận Xét Nhanh</label>
                      <input
                        type="text"
                        className={styles.formInput}
                        value={att.instructorFeedback || ''}
                        onChange={(e) => {
                          const updated = [...attendanceRecords];
                          const targetItem = updated[idx];
                          if (targetItem) {
                            targetItem.instructorFeedback = e.target.value;
                            setAttendanceRecords(updated);
                          }
                        }}
                        placeholder="Nhận xét thái độ, thao tác..."
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
              <AppButton variant="secondary" onClick={() => setSelectedSessionForAttendance(null)}>
                Hủy
              </AppButton>
              <AppButton variant="primary" onClick={handleSaveAttendance} disabled={savingAttendance}>
                {savingAttendance ? 'Đang lưu...' : 'Lưu Điểm Danh'}
              </AppButton>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal Complete Session */}
      {selectedSessionForComplete && (
        <Modal
          isOpen={true}
          title={`Hoàn Thành Buổi Thực Hành: ${selectedSessionForComplete.sessionCode}`}
          onClose={() => setSelectedSessionForComplete(null)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Quy tắc tính thời lượng: Hệ thống sẽ tính chính xác số phút giữa giờ bắt đầu và giờ kết thúc thực tế, và tự động cộng dồn vào hồ sơ các học viên đã điểm danh Có mặt.
            </p>

            <div className={styles.formGrid}>
              <div className={styles.formRow}>
                <label className={styles.formLabel}>Giờ Bắt Đầu Thực Tế</label>
                <input
                  type="datetime-local"
                  className={styles.formInput}
                  value={completeForm.actualStartTime}
                  onChange={(e) => setCompleteForm({ ...completeForm, actualStartTime: e.target.value })}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <label className={styles.formLabel}>Giờ Kết Thúc Thực Tế</label>
                <input
                  type="datetime-local"
                  className={styles.formInput}
                  value={completeForm.actualEndTime}
                  onChange={(e) => setCompleteForm({ ...completeForm, actualEndTime: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                <input
                  type="checkbox"
                  checked={completeForm.safetyChecked}
                  onChange={(e) => setCompleteForm({ ...completeForm, safetyChecked: e.target.checked })}
                />
                <strong>Xác nhận an toàn:</strong> Đã kiểm tra phanh, lốp, gương, xăng và các điều kiện an toàn xe.
              </label>
            </div>

            <div className={styles.formRow}>
              <label className={styles.formLabel}>Ghi Chú Tổng Kết Ca Học</label>
              <textarea
                className={styles.formTextarea}
                rows={2}
                value={completeForm.notes}
                onChange={(e) => setCompleteForm({ ...completeForm, notes: e.target.value })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
              <AppButton variant="secondary" onClick={() => setSelectedSessionForComplete(null)}>
                Hủy
              </AppButton>
              <AppButton variant="primary" onClick={handleCompleteSession} disabled={completingSession}>
                {completingSession ? 'Đang hoàn thành...' : 'Xác Nhận Hoàn Thành Ca'}
              </AppButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
