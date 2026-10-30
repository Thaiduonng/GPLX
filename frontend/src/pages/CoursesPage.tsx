import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { learningService } from '../services/learningService';
import type { Course, Lesson } from '../types/learning';
import { useAuth } from '../features/auth/AuthContext';
import {
  PageHeader,
  AppButton,
  Alert,
  LoadingSpinner,
} from '../components/ui';
import ConsultationModal from '../components/ConsultationModal';

export default function CoursesPage() {
  const { isAuthenticated } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  // Consultation Modal State
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [consultCourse, setConsultCourse] = useState<Course | null>(null);

  // Bộ đếm thời gian học bài (giây)
  const [studyTimerSeconds, setStudyTimerSeconds] = useState<number>(0);

  useEffect(() => {
    learningService
      .getCourses()
      .then((data) => {
        setCourses(data);
        if (data.length > 0 && data[0]) {
          handleSelectCourse(data[0]);
        }
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          setErrorMsg('Không thể tải danh sách khóa học: ' + (err.response?.data?.message || err.message));
        } else if (err instanceof Error) {
          setErrorMsg(err.message);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (activeLesson) {
      setStudyTimerSeconds(0);
      interval = setInterval(() => {
        setStudyTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeLesson]);

  const handleSelectCourse = async (course: Course) => {
    setSelectedCourse(course);
    setErrorMsg('');
    try {
      const lessonData = await learningService.getLessons(course.id);
      setLessons(lessonData);
      if (lessonData.length > 0 && lessonData[0]) {
        setActiveLesson(lessonData[0]);
      } else {
        setActiveLesson(null);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorMsg('Lỗi tải danh sách bài giảng: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleCompleteLesson = async () => {
    if (!activeLesson) return;
    try {
      await learningService.updateProgress(activeLesson.id, {
        markCompleted: true,
        timeSpentSeconds: studyTimerSeconds,
      });

      setSuccessMsg(`Chúc mừng! Bạn đã hoàn thành: "${activeLesson.title}".`);
      setLessons((prev) =>
        prev.map((l) => (l.id === activeLesson.id ? { ...l, completed: true } : l))
      );
      setActiveLesson((prev) => (prev ? { ...prev, completed: true } : null));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorMsg(err.response?.data?.message || 'Lỗi cập nhật tiến độ bài học.');
      } else if (err instanceof Error) {
        setErrorMsg(err.message);
      }
    }
  };

  const formatCurrency = (val?: number) => {
    if (!val) return 'Liên hệ';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title="Danh Mục Khóa Học & Đào Tạo GPLX 2026"
        description="Chương trình đào tạo lái xe các hạng chuẩn quốc gia. Học viên có thể xem chi tiết lộ trình, nộp hồ sơ trực tuyến hoặc học trực tuyến các chuyên đề lý thuyết."
      />

      {errorMsg && (
        <Alert
          type="danger"
          message={errorMsg}
          onClose={() => setErrorMsg('')}
        />
      )}

      {successMsg && (
        <Alert
          type="success"
          message={successMsg}
          onClose={() => setSuccessMsg('')}
        />
      )}

      {/* Featured Courses Showcase Cards (Phân hệ A - Quảng bá khóa học) */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
            Các khóa đào tạo lái xe đang tuyển sinh
          </h3>
          <Link
            to="/apply"
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--color-primary)',
              textDecoration: 'none',
            }}
          >
            Đăng ký nộp hồ sơ nhanh →
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--space-4)',
          }}
        >
          {courses.map((c) => (
            <div
              key={c.id}
              style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-4)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-xs)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 'var(--space-3)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(22, 93, 255, 0.12)',
                      color: 'var(--color-primary)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Hạng {c.category?.code || 'GPLX'}
                  </span>
                  {c.featured && (
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '12px',
                        backgroundColor: '#FEF3C7',
                        color: '#B45309',
                      }}
                    >
                      ★ Tiêu biểu
                    </span>
                  )}
                </div>

                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '4px' }}>
                  {c.title}
                </h4>

                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }} className="line-clamp-2">
                  {c.description || 'Chương trình đào tạo lái xe toàn diện theo chuẩn quy định.'}
                </p>

                <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.75rem' }}>
                  <div>
                    <span style={{ color: 'var(--color-text-muted)' }}>Học phí trọn gói: </span>
                    <strong style={{ color: 'var(--color-primary)', fontSize: '0.85rem' }}>
                      {formatCurrency(c.tuitionFee)}
                    </strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-text-muted)' }}>Thời lượng: </span>
                    <strong>{c.totalHours} giờ đào tạo</strong>
                  </div>
                  {c.expectedStartDate && (
                    <div>
                      <span style={{ color: 'var(--color-text-muted)' }}>Khai giảng: </span>
                      <strong>{c.expectedStartDate}</strong>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px', paddingTop: '8px', borderTop: '1px solid var(--color-border)' }}>
                <Link
                  to={`/courses/${c.slug || c.id}`}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '6px 8px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-primary)',
                    color: 'var(--color-primary)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Xem lộ trình
                </Link>
                <Link
                  to={`/apply?courseId=${c.id}&categoryId=${c.category?.id || ''}`}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '6px 8px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-primary)',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  Nộp hồ sơ
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setConsultCourse(c);
                    setIsConsultModalOpen(true);
                  }}
                  style={{
                    padding: '6px 8px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text-main)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                  }}
                  title="Nhận tư vấn miễn phí"
                >
                  📞
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Phân hệ Bài giảng Trực tuyến (E-learning viewer) */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
          Học trực tuyến chuyên đề lý thuyết (E-Learning)
        </h3>

        {loading ? (
          <div style={{ padding: '60px 0', textAlign: 'center' }}>
            <LoadingSpinner size="lg" text="Đang tải bài giảng..." />
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(280px, 340px) 1fr',
              gap: 'var(--space-6)',
              alignItems: 'start',
            }}
          >
            {/* Cột trái: Chọn khóa học & Bài học */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-5)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 'var(--space-3)' }}>
                  Chọn khóa học
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {courses.map((c) => {
                    const isSelected = selectedCourse?.id === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => handleSelectCourse(c)}
                        style={{
                          textAlign: 'left',
                          padding: 'var(--space-3) var(--space-4)',
                          borderRadius: 'var(--radius-md)',
                          border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                          backgroundColor: isSelected ? 'var(--color-primary-light)' : 'var(--color-surface)',
                          color: isSelected ? 'var(--color-primary-dark)' : 'var(--color-text-main)',
                          fontWeight: isSelected ? 600 : 400,
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)',
                        }}
                      >
                        <div style={{ fontWeight: 600 }}>{c.title}</div>
                        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                          Hạng {c.category?.code} | {c.totalHours} giờ đào tạo
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Danh sách bài giảng */}
              <div
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-5)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: 'var(--space-3)' }}>
                  Danh sách chuyên đề ({lessons.length})
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {lessons.map((lesson) => {
                    const isCurrent = activeLesson?.id === lesson.id;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson)}
                        style={{
                          textAlign: 'left',
                          padding: 'var(--space-3) var(--space-4)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--color-border)',
                          backgroundColor: isCurrent ? '#f1f5f9' : 'var(--color-surface)',
                          color: 'var(--color-text-main)',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'all var(--transition-fast)',
                        }}
                      >
                        <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: isCurrent ? 600 : 400 }}>
                          {lesson.title}
                        </span>
                        {lesson.completed && (
                          <span style={{ color: 'var(--color-success)', fontSize: '0.75rem', fontWeight: 700 }}>
                            ✓ Đã học
                          </span>
                        )}
                      </button>
                    );
                  })}
                  {lessons.length === 0 && (
                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                      Khóa học chưa có bài giảng trực tuyến.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Cột phải: Chi tiết bài giảng & Trình phát */}
            <div>
              {activeLesson ? (
                <div
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderRadius: 'var(--radius-xl)',
                    padding: 'var(--space-6)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-xs)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-5)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                        {activeLesson.title}
                      </h2>
                      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                        Thời lượng dự kiến: {activeLesson.durationMinutes} phút | Thời gian đang học: {Math.floor(studyTimerSeconds / 60)} phút {studyTimerSeconds % 60} giây
                      </div>
                    </div>
                    {activeLesson.completed ? (
                      <span
                        style={{
                          backgroundColor: '#DEF7EC',
                          color: '#03543F',
                          padding: '4px 12px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 600,
                        }}
                      >
                        Đã hoàn thành bài học ✓
                      </span>
                    ) : (
                      <span
                        style={{
                          backgroundColor: '#FEF08A',
                          color: '#713F12',
                          padding: '4px 12px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 600,
                        }}
                      >
                        Đang học...
                      </span>
                    )}
                  </div>

                  {/* Video / Trình phát giả lập */}
                  {activeLesson.videoUrl ? (
                    <div
                      style={{
                        position: 'relative',
                        paddingBottom: '56.25%',
                        height: 0,
                        overflow: 'hidden',
                        borderRadius: 'var(--radius-lg)',
                        backgroundColor: '#000',
                      }}
                    >
                      <iframe
                        src={activeLesson.videoUrl}
                        title={activeLesson.title}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          border: 0,
                        }}
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        backgroundColor: 'var(--color-bg-app)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--space-6)',
                        textAlign: 'center',
                        color: 'var(--color-text-muted)',
                        fontSize: 'var(--font-size-sm)',
                      }}
                    >
                      Chuyên đề đọc tài liệu lý thuyết và củng cố kiến thức.
                    </div>
                  )}

                  {/* Nội dung bài học */}
                  <div
                    style={{
                      lineHeight: 1.6,
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-main)',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {activeLesson.content || 'Nội dung chi tiết đang được cập nhật.'}
                  </div>

                  {/* Hành động hoàn thành bài học */}
                  {isAuthenticated && !activeLesson.completed && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' }}>
                      <AppButton variant="primary" onClick={handleCompleteLesson}>
                        Đánh dấu đã hoàn thành bài học ✓
                      </AppButton>
                    </div>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '80px var(--space-6)',
                    textAlign: 'center',
                    border: '1px dashed var(--color-border)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  Vui lòng chọn bài giảng từ danh sách chuyên đề bên trái để bắt đầu học.
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Consultation Modal */}
      {consultCourse && (
        <ConsultationModal
          isOpen={isConsultModalOpen}
          onClose={() => setIsConsultModalOpen(false)}
          initialCourseId={consultCourse.id}
          initialCategoryId={consultCourse.category?.id}
          courseTitle={consultCourse.title}
          source="HOMEPAGE"
        />
      )}
    </div>
  );
}
