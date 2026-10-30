import { useEffect, useState } from 'react';
import { rawVehicleService } from '../services/rawVehicleService';
import {
  RawVehicleOverviewResponse,
  RawVehicleStageDto,
  RawVehicleSessionDto,
  RawVehicleSkillEvaluationDto,
} from '../types/rawVehicle';
import { LoadingSpinner, Alert, StatusBadge } from '../components/ui';
import styles from './RawVehicle.module.css';

type TabType = 'STAGES' | 'SESSIONS' | 'EVALUATIONS';

export default function RawVehicleStudentPage() {
  const [overview, setOverview] = useState<RawVehicleOverviewResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('STAGES');

  const fetchOverview = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await rawVehicleService.getStudentOverview();
      setOverview(res.data);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Chưa có thông tin ghi danh đào tạo xe thô';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  const renderStars = (rating: number) => {
    return (
      <div className={styles.starRating} title={`${rating}/5 sao`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} style={{ opacity: star <= rating ? 1 : 0.25 }}>
            ★
          </span>
        ))}
      </div>
    );
  };

  const formatDateTime = (dateStr?: string) => {
    if (!dateStr) return '---';
    try {
      const d = new Date(dateStr);
      return d.toLocaleString('vi-VN', {
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
        <LoadingSpinner text="Đang tải dữ liệu đào tạo xe thô..." />
      </div>
    );
  }

  // Thu thập danh sách đánh giá từ các giai đoạn
  const allEvaluations: RawVehicleSkillEvaluationDto[] = (overview?.stagesProgress || []).flatMap(
    (st) => st.evaluations || []
  );

  return (
    <div className={styles.container}>
      {/* Header Banner */}
      <div className={styles.headerSection}>
        <div className={styles.headerContent}>
          <div className={styles.badgeTag}>
            <span>🚗</span>
            <span>ĐÀO TẠO THỰC HÀNH BAN ĐẦU (INTERNAL_RULE)</span>
          </div>
          <h1 className={styles.title}>Đào tạo Làm quen Xe & Thao tác Cơ bản</h1>
          <p className={styles.description}>
            Chương trình đào tạo kỹ năng ban đầu giúp học viên làm quen với xe, nhận biết bộ phận điều khiển,
            tư thế lái an toàn và thực hành thao tác cơ bản trước khi ra đường trường hoặc học thiết bị giám sát.
          </p>
          <div className={styles.ruleNotice}>
            <span>ℹ️</span>
            <div>
              <strong>Quy tắc độc lập:</strong> Tiến độ xe thô được đào tạo song song với lý thuyết, không phụ thuộc
              vào việc hoàn thành lý thuyết và không tự động quyết định điều kiện dự thi sát hạch.
            </div>
          </div>
        </div>
      </div>

      {error && !overview && (
        <Alert
          type="info"
          title="Thông tin tham gia khóa học"
          message="Bạn chưa được ghi danh vào chương trình Đào tạo xe thô hoặc trung tâm đang chuẩn bị xếp lớp. Vui lòng liên hệ Phòng Đào tạo để được hỗ trợ sắp xếp lịch làm quen xe."
        />
      )}

      {overview && (
        <>
          {/* Stats Overview */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Hạng Đào Tạo & Trạng Thái</span>
              <div className={styles.statValue}>{overview.categoryCode || 'Chưa đăng ký'}</div>
              <span className={styles.statSub}>
                <StatusBadge
                  variant={
                    overview.enrollmentStatus === 'COMPLETED'
                      ? 'success'
                      : overview.enrollmentStatus === 'IN_PROGRESS'
                      ? 'info'
                      : 'default'
                  }
                  label={
                    overview.enrollmentStatus === 'COMPLETED'
                      ? 'Đã hoàn thành'
                      : overview.enrollmentStatus === 'IN_PROGRESS'
                      ? 'Đang thực hành'
                      : 'Đã ghi danh'
                  }
                />
              </span>
            </div>

            <div className={styles.statCard}>
              <span className={styles.statLabel}>Giáo Viên Hướng Dẫn</span>
              <div className={styles.statValue} style={{ fontSize: '1.25rem' }}>
                {overview.instructorName || 'Chưa phân công'}
              </div>
              <span className={styles.statSub}>Giám sát & đánh giá trực tiếp</span>
            </div>

            <div className={styles.statCard}>
              <span className={styles.statLabel}>Tiến Độ Làm Quen Xe</span>
              <div className={styles.statValue} style={{ color: '#2563eb' }}>
                {overview.totalCompletedStages || 0} / {overview.totalStagesCount || 8} Giai đoạn
              </div>
              <span className={styles.statSub}>Hoàn thành {overview.progressPercentage || 0}%</span>
            </div>

            <div className={styles.statCard}>
              <span className={styles.statLabel}>Thời Lượng Thực Tế Đã Học</span>
              <div className={styles.statValue} style={{ color: '#059669' }}>
                {overview.totalConfirmedMinutes || 0} Phút
              </div>
              <span className={styles.statSub}>Đã tham gia {overview.totalSessionsCount || 0} buổi</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className={styles.navTabs}>
            <button
              className={`${styles.navTabBtn} ${activeTab === 'STAGES' ? styles.navTabBtnActive : ''}`}
              onClick={() => setActiveTab('STAGES')}
            >
              Lộ Trình 8 Giai Đoạn ({(overview.stagesProgress || []).length})
            </button>
            <button
              className={`${styles.navTabBtn} ${activeTab === 'SESSIONS' ? styles.navTabBtnActive : ''}`}
              onClick={() => setActiveTab('SESSIONS')}
            >
              Lịch Học & Thực Hành (
              {(overview.nextSession ? 1 : 0) + (overview.recentSessions || []).length})
            </button>
            <button
              className={`${styles.navTabBtn} ${activeTab === 'EVALUATIONS' ? styles.navTabBtnActive : ''}`}
              onClick={() => setActiveTab('EVALUATIONS')}
            >
              Đánh Giá Kỹ Năng ({allEvaluations.length})
            </button>
          </div>

          {/* Tab 1: Stages */}
          {activeTab === 'STAGES' && (
            <div className={styles.contentCard}>
              <h3 className={styles.cardTitle}>
                <span>Lộ Trình Làm Quen Xe Ban Đầu</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#64748b' }}>
                  Bắt buộc hoàn thành dưới sự kèm cặp của giáo viên
                </span>
              </h3>

              <div className={styles.stageList}>
                {(overview.stagesProgress || []).map((stage: RawVehicleStageDto, idx: number) => {
                  const isCompleted = stage.isCompleted || idx < (overview.totalCompletedStages || 0);
                  const isCurrent = idx === (overview.totalCompletedStages || 0);

                  return (
                    <div key={stage.id} className={styles.stageCard}>
                      <div
                        className={`${styles.stageNumber} ${
                          isCompleted
                            ? styles.stagePassedNumber
                            : isCurrent
                            ? styles.stageCurrentNumber
                            : ''
                        }`}
                      >
                        {isCompleted ? '✓' : idx + 1}
                      </div>

                      <div className={styles.stageBody}>
                        <div className={styles.stageHeader}>
                          <h4 className={styles.stageName}>
                            {stage.stageCode}: {stage.stageName}
                          </h4>
                          <StatusBadge
                            variant={isCompleted ? 'success' : isCurrent ? 'info' : 'default'}
                            label={isCompleted ? 'Đã đạt' : isCurrent ? 'Đang thực hiện' : 'Chưa học'}
                          />
                        </div>

                        <p className={styles.stageDesc}>{stage.description}</p>

                        {stage.evaluationCriteria && (
                          <div className={styles.safetyAlert}>
                            ⚠️ <strong>Quy định an toàn & tiêu chí:</strong> {stage.evaluationCriteria}
                          </div>
                        )}

                        <div className={styles.stageFooter}>
                          <span>⏱️ Thời lượng ước tính: {stage.expectedDurationMinutes} phút</span>
                          <span>🔒 Yêu cầu bắt buộc</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Sessions */}
          {activeTab === 'SESSIONS' && (
            <div className={styles.contentCard}>
              <h3 className={styles.cardTitle}>Lịch Học Đã Xếp & Lịch Sử Thực Hành</h3>

              <h4 style={{ margin: '1rem 0 0.5rem 0', color: '#1e293b' }}>Buổi Học Sắp Tới</h4>
              {!overview.nextSession ? (
                <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Hiện chưa có buổi thực hành sắp tới được xếp lịch.
                </div>
              ) : (
                <div className={styles.sessionGrid} style={{ marginBottom: '1.5rem' }}>
                  <div className={styles.sessionCard}>
                    <div className={styles.sessionCardHeader}>
                      <span className={styles.sessionCode}>{overview.nextSession.sessionCode}</span>
                      <StatusBadge
                        variant={overview.nextSession.status === 'CONFIRMED' ? 'success' : 'info'}
                        label={overview.nextSession.status === 'CONFIRMED' ? 'Đã xác nhận' : 'Đã lên lịch'}
                      />
                    </div>
                    <div className={styles.sessionInfoRow}>
                      <span>👨‍🏫 Giáo viên:</span>
                      <strong>{overview.nextSession.instructorName}</strong>
                    </div>
                    <div className={styles.sessionInfoRow}>
                      <span>🚗 Xe tập lái:</span>
                      <span>
                        {overview.nextSession.plateNumber
                          ? `${overview.nextSession.plateNumber} (${overview.nextSession.vehicleModel || 'Tập lái'})`
                          : 'Đang xếp xe'}
                      </span>
                    </div>
                    <div className={styles.sessionInfoRow}>
                      <span>📍 Địa điểm:</span>
                      <span>{overview.nextSession.practiceLocation}</span>
                    </div>
                    <div className={styles.sessionInfoRow}>
                      <span>⏰ Thời gian:</span>
                      <span>{formatDateTime(overview.nextSession.scheduledStartTime)}</span>
                    </div>
                    {overview.nextSession.instructorNotes && (
                      <div className={styles.sessionNotes}>Ghi chú: {overview.nextSession.instructorNotes}</div>
                    )}
                  </div>
                </div>
              )}

              <h4 style={{ margin: '1.5rem 0 0.5rem 0', color: '#1e293b' }}>Lịch Sử Các Buổi Đã Tham Gia</h4>
              {(!overview.recentSessions || overview.recentSessions.length === 0) ? (
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Chưa có lịch sử buổi học nào.</div>
              ) : (
                <div className={styles.tableContainer}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Mã Buổi</th>
                        <th>Thời Gian Bắt Đầu Thực Tế</th>
                        <th>Thời Lượng</th>
                        <th>Địa Điểm</th>
                        <th>Điểm Danh</th>
                        <th>Nhận Xét Giáo Viên</th>
                      </tr>
                    </thead>
                    <tbody>
                      {overview.recentSessions.map((s: RawVehicleSessionDto) => {
                        const myAttendee = (s.attendees || []).find((a) => a.studentId === overview.studentId);
                        return (
                          <tr key={s.id}>
                            <td>
                              <strong>{s.sessionCode}</strong>
                            </td>
                            <td>{formatDateTime(s.actualStartTime || s.scheduledStartTime)}</td>
                            <td>{s.actualDurationMinutes || 60} phút</td>
                            <td>{s.practiceLocation}</td>
                            <td>
                              <StatusBadge
                                variant={
                                  myAttendee?.attendanceStatus === 'PRESENT'
                                    ? 'success'
                                    : myAttendee?.attendanceStatus === 'EXCUSED'
                                    ? 'warning'
                                    : 'danger'
                                }
                                label={
                                  myAttendee?.attendanceStatus === 'PRESENT'
                                    ? 'Có mặt'
                                    : myAttendee?.attendanceStatus === 'EXCUSED'
                                    ? 'Có phép'
                                    : 'Vắng mặt'
                                }
                              />
                            </td>
                            <td>
                              {myAttendee?.instructorFeedback || 'Chưa có nhận xét'}
                              {myAttendee?.skillsToImprove && (
                                <div style={{ color: '#b45309', fontSize: '0.8rem', marginTop: '0.25rem' }}>
                                  Cần luyện: {myAttendee.skillsToImprove}
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Evaluations */}
          {activeTab === 'EVALUATIONS' && (
            <div className={styles.contentCard}>
              <h3 className={styles.cardTitle}>Bảng Đánh Giá Kỹ Năng Chi Tiết</h3>

              {allEvaluations.length === 0 ? (
                <div style={{ color: '#64748b', padding: '1.5rem', textAlign: 'center' }}>
                  Chưa có đánh giá kỹ năng từ giáo viên. Sau mỗi buổi thực hành, giáo viên sẽ chấm điểm và ghi nhận vào đây.
                </div>
              ) : (
                <div className={styles.tableContainer}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Giai Đoạn</th>
                        <th>Tiêu Chí Kỹ Năng</th>
                        <th>Đánh Giá</th>
                        <th>Kết Quả</th>
                        <th>Giáo Viên Nhận Xét</th>
                        <th>Thời Điểm</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allEvaluations.map((ev: RawVehicleSkillEvaluationDto) => (
                        <tr key={ev.id}>
                          <td>
                            <strong>{ev.stageCode}</strong>
                            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{ev.stageName}</div>
                          </td>
                          <td>
                            <strong>{ev.skillName}</strong>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Mã: {ev.criterionCode}</div>
                          </td>
                          <td>{renderStars(ev.ratingLevel)}</td>
                          <td>
                            <StatusBadge
                              variant={ev.evaluationStatus === 'PASSED' ? 'success' : 'warning'}
                              label={ev.evaluationStatus === 'PASSED' ? 'Đã đạt' : 'Cần luyện thêm'}
                            />
                          </td>
                          <td>
                            <div>{ev.comments || 'Thực hành đúng quy chuẩn.'}</div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>
                              Người đánh giá: {ev.evaluatedByName}
                            </div>
                          </td>
                          <td>{formatDateTime(ev.evaluatedAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
