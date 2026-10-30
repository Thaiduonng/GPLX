import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Icons } from '../components/ui';
import { learningService } from '../services/learningService';
import { Course } from '../types/learning';
import ConsultationModal from '../components/ConsultationModal';

export const CourseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    learningService.getCourseBySlug(slug)
      .then(data => {
        setCourse(data);
        setError(null);
      })
      .catch(err => {
        console.error('Lỗi khi tải thông tin khóa học:', err);
        setError('Không tìm thấy thông tin khóa học hoặc khóa học đã ngừng tuyển sinh.');
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <Icons.Loader size={36} className="text-blue-600" />
          <p className="text-slate-600 dark:text-slate-400 font-medium text-sm">Đang tải thông tin khóa học...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl text-center border border-slate-200 dark:border-slate-800 space-y-4">
          <Icons.AlertTriangle size={48} className="text-amber-500 mx-auto" />
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Không tìm thấy khóa học</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">{error || 'Vui lòng kiểm tra lại đường dẫn.'}</p>
          <div className="pt-2">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all"
            >
              <Icons.ChevronLeft size={16} />
              Xem danh sách khóa học
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatCurrency = (val?: number) => {
    if (!val) return 'Liên hệ tư vấn';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 pb-20">
      {/* Breadcrumb Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <Link to="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
            <Icons.ChevronRight size={14} className="text-slate-400" />
            <Link to="/courses" className="hover:text-blue-600 transition-colors">Khóa học đào tạo</Link>
            <Icons.ChevronRight size={14} className="text-slate-400" />
            <span className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">{course.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white relative overflow-hidden py-12 sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500 text-white shadow-sm">
                  Hạng {course.category?.code || 'GPLX'}
                </span>
                {course.featured && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    <Icons.Sparkles size={14} />
                    Khóa học tiêu biểu
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Tuyển sinh đợt mới 2026
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                {course.description || 'Chương trình đào tạo lái xe toàn diện từ cơ bản đến nâng cao theo quy chuẩn quốc gia, cam kết vững tay lái và tỷ lệ đỗ cao.'}
              </p>

              {/* Key metadata badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 text-xs sm:text-sm">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <Icons.Clock size={20} className="text-blue-400 shrink-0" />
                  <div>
                    <div className="text-white/70 text-xs">Thời lượng học</div>
                    <div className="font-semibold">{course.totalHours} giờ đào tạo</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <Icons.Calendar size={20} className="text-amber-400 shrink-0" />
                  <div>
                    <div className="text-white/70 text-xs">Khai giảng dự kiến</div>
                    <div className="font-semibold">{course.expectedStartDate || 'Hàng tuần'}</div>
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1 flex items-center gap-2 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <Icons.MapPin size={20} className="text-rose-400 shrink-0" />
                  <div>
                    <div className="text-white/70 text-xs">Địa điểm đào tạo</div>
                    <div className="font-semibold line-clamp-1">{course.trainingLocation || 'Trung tâm đào tạo'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl space-y-4">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wider text-blue-200">Học phí trọn gói</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white">
                  {formatCurrency(course.tuitionFee)}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <Icons.CheckCircle size={16} className="shrink-0" />
                  <span>Cam kết minh bạch - Không phát sinh chi phí phụ</span>
                </div>
              </div>

              <div className="pt-2 space-y-2.5">
                <Link
                  to={`/apply?courseId=${course.id}&categoryId=${course.category?.id || ''}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all"
                >
                  <Icons.FileText size={16} />
                  Nộp hồ sơ trực tuyến ngay
                </Link>

                <button
                  type="button"
                  onClick={() => setIsConsultModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-white/20 hover:bg-white/30 text-white font-medium text-sm transition-all"
                >
                  <Icons.Phone size={16} className="text-emerald-400" />
                  Yêu cầu gọi lại tư vấn miễn phí
                </button>
              </div>

              <div className="text-[11px] text-white/60 text-center leading-relaxed">
                Hỗ trợ trả góp học phí 0% lãi suất. Hỗ trợ chụp ảnh và khám sức khỏe tại trung tâm.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Target Audience */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  <Icons.UserCheck size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Đối tượng & Điều kiện tham gia</h3>
                  <p className="text-xs text-slate-500">Quy định độ tuổi và sức khỏe theo Luật Giao thông đường bộ</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {course.targetAudience || `• Công dân Việt Nam hoặc người nước ngoài cư trú hợp pháp tại Việt Nam từ đủ ${course.category?.minAge || 18} tuổi trở lên tính đến ngày dự thi sát hạch.\n• Đủ điều kiện sức khỏe lái xe theo Thông tư liên tịch của Bộ Y tế và Bộ GTVT (không mắc bệnh động kinh, cụt chi cản trở điều khiển xe, thị lực đạt tiêu chuẩn).\n• Người có nhu cầu học lái xe để phục vụ nhu cầu đi lại cá nhân, gia đình hoặc công việc chuyên nghiệp.`}
              </p>
            </div>

            {/* Curriculum Summary */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  <Icons.BookOpen size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Nội dung chương trình đào tạo</h3>
                  <p className="text-xs text-slate-500">Lộ trình bài bản chuẩn theo quy định hiện hành</p>
                </div>
              </div>

              {course.curriculumSummary ? (
                <div className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 font-mono">
                  {course.curriculumSummary}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                      1
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">Lý thuyết giao thông đường bộ</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        Học luật giao thông đường bộ, hệ thống biển báo, quy tắc nhường đường, văn hóa đạo đức lái xe, cấu tạo sửa chữa cơ bản và 600 câu hỏi sát hạch lý thuyết.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                      2
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">Học trên Cabin mô phỏng & 120 tình huống</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        Luyện tập xử lý các tình huống nguy hiểm tiềm ẩn trên phần mềm mô phỏng và cabin điện tử trước khi ra sân thực tế.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                      3
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-semibold text-slate-900 dark:text-slate-100">Thực hành lái xe sa hình</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        Thực hành 11 bài thi liên hoàn trong sân sa hình đạt chuẩn: Dốc cầu, vệt bánh xe, đường vuông góc, ghép ngang/dọc...
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Documents Required */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                  <Icons.ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Hồ sơ đăng ký nhập học cần chuẩn bị</h3>
                  <p className="text-xs text-slate-500">Hỗ trợ chụp ảnh và làm giấy khám sức khỏe trực tiếp tại trung tâm</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center mb-2">
                    <Icons.FileText size={20} />
                  </div>
                  <h5 className="font-semibold text-slate-800 dark:text-slate-200">CCCD / Hộ chiếu</h5>
                  <p className="text-xs text-slate-500 mt-1">02 bản photo hoặc ảnh chụp rõ nét 2 mặt không cần công chứng</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mb-2">
                    <Icons.Award size={20} />
                  </div>
                  <h5 className="font-semibold text-slate-800 dark:text-slate-200">Ảnh chân dung 3x4</h5>
                  <p className="text-xs text-slate-500 mt-1">Ảnh chụp nền xanh/trắng, không đeo kính (hỗ trợ chụp miễn phí)</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center mb-2">
                    <Icons.CheckCircle size={20} />
                  </div>
                  <h5 className="font-semibold text-slate-800 dark:text-slate-200">Giấy khám sức khỏe</h5>
                  <p className="text-xs text-slate-500 mt-1">Mẫu giấy KSK lái xe do cơ sở y tế đủ thẩm quyền cấp trong 6 tháng</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Action Card */}
          <div className="space-y-6">
            <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Chi phí đào tạo</span>
                <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                  {formatCurrency(course.tuitionFee)}
                </div>
                <p className="text-xs text-slate-500">
                  Đã bao gồm chi phí sân bãi, xăng xe, giáo viên hướng dẫn 1 kèm 1 và tài liệu học tập.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  to={`/apply?courseId=${course.id}&categoryId=${course.category?.id || ''}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  <Icons.FileText size={16} />
                  Nộp hồ sơ trực tuyến ngay
                </Link>

                <button
                  type="button"
                  onClick={() => setIsConsultModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 font-medium text-sm transition-all"
                >
                  <Icons.Phone size={16} />
                  Yêu cầu tư vấn miễn phí
                </button>
              </div>

              <hr className="border-slate-200 dark:border-slate-800" />

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Cam kết của trung tâm</h4>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <Icons.CheckCircle size={16} className="text-emerald-500 shrink-0" />
                    <span>Giáo viên tận tâm, 1 kèm 1 suốt khóa học</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icons.CheckCircle size={16} className="text-emerald-500 shrink-0" />
                    <span>Xe tập lái đời mới, máy lạnh 100%</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icons.CheckCircle size={16} className="text-emerald-500 shrink-0" />
                    <span>Sân tập chuẩn sát hạch, giống sân thi 99%</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800/80 dark:to-indigo-950/40 border border-blue-100 dark:border-slate-700/60 text-center space-y-1">
                <span className="text-xs text-slate-500 dark:text-slate-400">Tổng đài hỗ trợ tuyển sinh 24/7</span>
                <div className="text-lg font-bold text-blue-700 dark:text-blue-300">
                  1900 6868 - 0988 123 456
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
        initialCourseId={course.id}
        initialCategoryId={course.category?.id}
        courseTitle={course.title}
        source="COURSE_DETAIL"
      />
    </div>
  );
};

export default CourseDetailPage;
