import React, { useState, useEffect } from 'react';
import { Icons } from './ui';
import { crmService } from '../services/crmService';
import { admissionService } from '../services/admissionService';
import { LicenseCategory } from '../types/admission';
import { ContactChannel, LeadSource } from '../types/crm';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourseId?: number;
  initialCategoryId?: number;
  courseTitle?: string;
  source?: LeadSource;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialCourseId,
  initialCategoryId,
  courseTitle,
  source = 'HOMEPAGE',
}) => {
  const [categories, setCategories] = useState<LicenseCategory[]>([]);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(initialCategoryId);
  const [contactChannel, setContactChannel] = useState<ContactChannel>('PHONE');
  const [preferredContactTime, setPreferredContactTime] = useState('Bất kỳ lúc nào');
  const [trainingLocation, setTrainingLocation] = useState('Cơ sở trung tâm');
  const [notes, setNotes] = useState('');
  const [consentGdpr, setConsentGdpr] = useState(true);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      admissionService.getActiveCategories()
        .then(data => setCategories(data || []))
        .catch(console.error);
      setSubmitted(false);
      setErrorMsg('');
      if (initialCategoryId) {
        setSelectedCategoryId(initialCategoryId);
      }
    }
  }, [isOpen, initialCategoryId]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMsg('Vui lòng nhập Họ tên và Số điện thoại liên hệ.');
      return;
    }
    if (!consentGdpr) {
      setErrorMsg('Vui lòng đồng ý cho phép trung tâm liên hệ để được hỗ trợ.');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg('');
      await crmService.submitInquiry({
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        categoryId: selectedCategoryId,
        courseId: initialCourseId,
        preferredContactChannel: contactChannel,
        preferredContactTime,
        trainingLocation,
        source,
        notes: notes.trim() || undefined,
        consentGdpr: true,
      });
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div>
            <h3 className="text-xl font-bold">Đăng ký tư vấn khóa học</h3>
            <p className="text-xs text-blue-100 mt-0.5">
              {courseTitle ? `Khóa học: ${courseTitle}` : 'Nhận lộ trình & ưu đãi học phí mới nhất 2026'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors"
          >
            <Icons.X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <Icons.CheckCircle size={36} />
              </div>
              <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                Gửi yêu cầu thành công!
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-sm max-w-sm mx-auto">
                Cảm ơn bạn <span className="font-semibold text-slate-900 dark:text-white">{fullName}</span>. 
                Chuyên viên tư vấn tuyển sinh sẽ liên hệ qua {contactChannel === 'PHONE' ? 'cuộc gọi' : contactChannel} trong thời gian sớm nhất.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all shadow-md hover:shadow-lg"
                >
                  Đóng cửa sổ
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-900">
                  {errorMsg}
                </div>
              )}

              {/* Họ tên & Điện thoại */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-400">
                      <Icons.User size={16} />
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-400">
                      <Icons.Phone size={16} />
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="0912 345 678"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Hạng GPLX & Kênh liên hệ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Hạng GPLX quan tâm
                  </label>
                  <select
                    value={selectedCategoryId || ''}
                    onChange={e => setSelectedCategoryId(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Chọn hạng giấy phép --</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        Hạng {cat.code} - {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Kênh nhận tư vấn
                  </label>
                  <select
                    value={contactChannel}
                    onChange={e => setContactChannel(e.target.value as ContactChannel)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="PHONE">Gọi điện thoại trực tiếp</option>
                    <option value="ZALO">Nhắn tin Zalo</option>
                    <option value="EMAIL">Gửi thông tin qua Email</option>
                  </select>
                </div>
              </div>

              {/* Giờ tiện liên hệ & Cơ sở học */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Thời gian tiện nghe máy
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Sau 18h, Cuối tuần..."
                    value={preferredContactTime}
                    onChange={e => setPreferredContactTime(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Cơ sở học mong muốn
                  </label>
                  <select
                    value={trainingLocation}
                    onChange={e => setTrainingLocation(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Cơ sở trung tâm">Cơ sở 1 (Trung tâm đào tạo chính)</option>
                    <option value="Sân tập lái xe khu vực 1">Sân tập sa hình 1 (Hà Nội)</option>
                    <option value="Sân tập lái xe khu vực 2">Sân tập sa hình 2 (Ngoại thành)</option>
                  </select>
                </div>
              </div>

              {/* Ghi chú câu hỏi */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Yêu cầu hoặc câu hỏi thêm (tùy chọn)
                </label>
                <textarea
                  rows={2}
                  placeholder="VD: Tôi muốn học vào thứ 7 và Chủ nhật, trọn gói gồm những chi phí gì?..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Cam kết bảo mật dữ liệu (Nghị định 13) */}
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  id="gdprCheck"
                  checked={consentGdpr}
                  onChange={e => setConsentGdpr(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="gdprCheck" className="cursor-pointer">
                  Tôi đồng ý cho trung tâm lưu trữ thông tin để liên hệ tư vấn thủ tục tuyển sinh GPLX theo Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân.
                </label>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Icons.Loader size={16} />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Icons.Send size={16} />
                      Nhận tư vấn ngay
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationModal;
