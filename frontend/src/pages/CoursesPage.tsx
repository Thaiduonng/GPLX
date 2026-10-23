import React, { useEffect, useState } from 'react';
import { learningService } from '../services/learningService';
import { Course, Lesson } from '../types/learning';
import { useAuth } from '../features/auth/AuthContext';

export default function CoursesPage() {
  const { isAuthenticated } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Bộ đếm thời gian học bài
  const [studyTimerSeconds, setStudyTimerSeconds] = useState(0);

  useEffect(() => {
    learningService
      .getCourses()
      .then((data) => {
        setCourses(data);
        if (data.length > 0) {
          handleSelectCourse(data[0]);
        }
      })
      .catch((err) => {
        setErrorMsg('Không thể tải danh sách khóa học: ' + (err.response?.data?.message || err.message));
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
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
      if (lessonList.length > 0) {
        setActiveLesson(lessonList[0]);
      }
    } catch (err: any) {
      setErrorMsg('Không thể tải bài học: ' + (err.response?.data?.message || err.message));
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
      // Cập nhật lại trạng thái bài giảng
      setLessons((prev) =>
        prev.map((l) => (l.id === activeLesson.id ? { ...l, completed: true } : l))
      );
      setActiveLesson((prev) => (prev ? { ...prev, completed: true } : null));
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || err.message || 'Lỗi cập nhật tiến độ.');
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.6rem', color: '#1e3a8a', fontWeight: 700, margin: 0 }}>
          📚 Khóa Học & Đào Tạo Trực Tuyến (E-Learning)
        </h2>
        <p style={{ color: '#6b7280', fontSize: '0.95rem', margin: '0.25rem 0 0 0' }}>
          Học lý thuyết Luật Giao thông đường bộ, kỹ thuật lái xe và đạo đức người lái xe
        </p>
      </div>

      {errorMsg && (
        <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '1rem', color: '#991b1b', marginBottom: '1.5rem', borderRadius: '4px' }}>
          ⚠️ {errorMsg}
        </div>
      )}

      {successMsg && (
        <div style={{ background: '#f0fdf4', borderLeft: '4px solid #22c55e', padding: '1rem', color: '#166534', marginBottom: '1.5rem', borderRadius: '4px' }}>
          ✅ {successMsg}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>⏳ Đang tải khóa học...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem' }}>
          {/* Cột trái: Danh mục khóa học & Bài học */}
          <div>
            <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.75rem' }}>Khóa học đào tạo</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {courses.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelectCourse(c)}
                    style={{
                      textAlign: 'left',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px',
                      border: selectedCourse?.id === c.id ? '2px solid #2563eb' : '1px solid #e2e8f0',
                      background: selectedCourse?.id === c.id ? '#eff6ff' : '#ffffff',
                      color: selectedCourse?.id === c.id ? '#1d4ed8' : '#374151',
                      fontWeight: selectedCourse?.id === c.id ? 600 : 400,
                      cursor: 'pointer',
                    }}
                  >
                    <div>{c.title}</div>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Hạng: {c.category?.code} | {c.totalHours} giờ đào tạo</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Danh sách bài giảng */}
            <div style={{ background: '#ffffff', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.75rem' }}>Danh sách bài giảng</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLesson(lesson)}
                    style={{
                      textAlign: 'left',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '6px',
                      border: '1px solid #e2e8f0',
                      background: activeLesson?.id === lesson.id ? '#f1f5f9' : '#ffffff',
                      color: '#334155',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: '0.9rem', fontWeight: activeLesson?.id === lesson.id ? 600 : 400 }}>
                      {lesson.title}
                    </span>
                    {lesson.completed ? (
                      <span style={{ color: '#16a34a', fontSize: '0.8rem', fontWeight: 600 }}>✓ Đã học</span>
                    ) : (
                      <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{lesson.durationMinutes}p</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cột phải: Trình đọc nội dung bài học */}
          <div style={{ background: '#ffffff', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            {activeLesson ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.4rem', color: '#1e3a8a', fontWeight: 700, margin: 0 }}>
                      {activeLesson.title}
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>
                      Thời lượng tiêu chuẩn: {activeLesson.durationMinutes} phút | Thời gian đang xem: <strong>{studyTimerSeconds} giây</strong>
                    </p>
                  </div>
                  <div>
                    {activeLesson.completed ? (
                      <span style={{ background: '#dcfce7', color: '#166534', padding: '0.4rem 0.8rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 600 }}>
                        Đã hoàn thành ✓
                      </span>
                    ) : (
                      <button
                        onClick={handleCompleteLesson}
                        disabled={!isAuthenticated}
                        style={{
                          background: studyTimerSeconds >= 30 ? '#16a34a' : '#94a3b8',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1.25rem',
                          borderRadius: '6px',
                          fontWeight: 600,
                          cursor: studyTimerSeconds >= 30 ? 'pointer' : 'not-allowed',
                        }}
                      >
                        {studyTimerSeconds >= 30 ? 'Đánh dấu hoàn thành bài' : `Xem thêm ${30 - studyTimerSeconds}s để hoàn thành`}
                      </button>
                    )}
                  </div>
                </div>

                {/* Khung mô phỏng video bài giảng */}
                <div style={{ background: '#0f172a', borderRadius: '8px', height: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ffffff', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎬</span>
                  <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>Video bài giảng trực tuyến GPLX</div>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.25rem' }}>Đang phát: {activeLesson.title}</div>
                </div>

                <div style={{ lineHeight: 1.7, color: '#334155' }}>
                  <h4 style={{ color: '#1e3a8a', marginBottom: '0.5rem' }}>Nội dung trọng tâm bài học:</h4>
                  <p>{activeLesson.content}</p>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
                Vui lòng chọn bài giảng để bắt đầu học trực tuyến.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
