import { useEffect, useState } from 'react';
import axios from 'axios';
import { learningService } from '../services/learningService';
import type { Course, Lesson } from '../types/learning';
import { useAuth } from '../features/auth/AuthContext';
import {
  PageHeader,
  StatusBadge,
  AppButton,
  Alert,
  LoadingSpinner,
} from '../components/ui';

export default function CoursesPage() {
  const { isAuthenticated } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

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
      const lessonList = await learningService.getLessons(course.id);
      setLessons(lessonList);
      if (lessonList.length > 0 && lessonList[0]) {
        setActiveLesson(lessonList[0]);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorMsg('Không thể tải bài học: ' + (err.response?.data?.message || err.message));
      } else if (err instanceof Error) {
        setErrorMsg(err.message);
      }
    }
  };

  const handleCompleteLesson = async () => {
    if (!activeLesson) return;
    setErrorMsg('');
    setSuccessMsg('');

    if (studyTimerSeconds < 30) {
      setErrorMsg('Theo quy định (LRN-002): Bạn cần xem bài giảng tối thiểu 30 giây trước khi đánh dấu hoàn thành.');
      return;
    }

    try {
      await learningService.updateProgress(activeLesson.id, {
        timeSpentSeconds: studyTimerSeconds,
        markCompleted: true,
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title="Khóa Học & Đào Tạo Trực Tuyến (E-Learning)"
        description="Học lý thuyết Luật Giao thông đường bộ, kỹ thuật lái xe và văn hóa đạo đức người lái xe theo chuẩn Cục Đường bộ."
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

      {loading ? (
        <div style={{ padding: '60px 0', textAlign: 'center' }}>
          <LoadingSpinner size="lg" text="Đang tải danh sách khóa học và bài giảng..." />
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
          {/* Cột trái: Khóa học & Bài học */}
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
                Khóa học đào tạo
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
                      {lesson.completed ? (
                        <StatusBadge variant="success" label="✓ Đã học" />
                      ) : (
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                          {lesson.durationMinutes}p
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Cột phải: Khung bài giảng */}
          <div
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-6)',
              boxShadow: 'var(--shadow-xs)',
              border: '1px solid var(--color-border)',
            }}
          >
            {activeLesson ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid var(--color-border)',
                    paddingBottom: 'var(--space-4)',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--color-text-main)', fontWeight: 700, margin: '0 0 4px 0' }}>
                      {activeLesson.title}
                    </h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)', margin: 0 }}>
                      Thời lượng tiêu chuẩn: {activeLesson.durationMinutes} phút | Thời gian đang xem:{' '}
                      <strong style={{ color: 'var(--color-primary)' }}>{studyTimerSeconds} giây</strong>
                    </p>
                  </div>

                  <div>
                    {activeLesson.completed ? (
                      <StatusBadge variant="success" label="Đã hoàn thành bài học ✓" />
                    ) : (
                      <AppButton
                        variant={studyTimerSeconds >= 30 ? 'success' : 'outline'}
                        size="sm"
                        onClick={handleCompleteLesson}
                        disabled={!isAuthenticated || studyTimerSeconds < 30}
                        icon={studyTimerSeconds >= 30 ? '✓' : '⏱️'}
                      >
                        {studyTimerSeconds >= 30
                          ? 'Đánh dấu hoàn thành bài'
                          : `Xem thêm ${30 - studyTimerSeconds}s để hoàn thành`}
                      </AppButton>
                    )}
                  </div>
                </div>

                {/* Khung mô phỏng video bài giảng */}
                <div
                  style={{
                    backgroundColor: '#0f172a',
                    borderRadius: 'var(--radius-lg)',
                    height: '320px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                  }}
                >
                  <span style={{ fontSize: '3rem', marginBottom: '8px' }}>🎬</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>Video bài giảng điện tử GPLX</div>
                  <div style={{ fontSize: 'var(--font-size-xs)', color: '#94a3b8', marginTop: '4px' }}>
                    Đang phát chuyên đề: {activeLesson.title}
                  </div>
                </div>

                <div style={{ lineHeight: 1.7, color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                  <h4 style={{ color: 'var(--color-text-main)', marginBottom: 'var(--space-2)', fontWeight: 600 }}>
                    Nội dung trọng tâm bài học:
                  </h4>
                  <p>{activeLesson.content}</p>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-text-muted)' }}>
                Vui lòng chọn bài giảng từ danh sách bên trái để bắt đầu học trực tuyến.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
