import React, { useState, useEffect } from 'react';
import { Icons } from '../components/ui';
import { crmService } from '../services/crmService';
import { admissionService } from '../services/admissionService';
import {
  AdmissionLead,
  InteractionType,
  LeadSource,
  LeadStatus
} from '../types/crm';
import { LicenseCategory } from '../types/admission';

export const CrmLeadsPage: React.FC = () => {
  const [leads, setLeads] = useState<AdmissionLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<LicenseCategory[]>([]);

  // Filter states
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus | ''>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | ''>('');
  const [selectedSource, setSelectedSource] = useState<LeadSource | ''>('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Interaction modal state
  const [activeLead, setActiveLead] = useState<AdmissionLead | null>(null);
  const [isInteractionModalOpen, setIsInteractionModalOpen] = useState(false);
  const [interactionType, setInteractionType] = useState<InteractionType>('CALL');
  const [interactionContent, setInteractionContent] = useState('');
  const [interactionResult, setInteractionResult] = useState('Khách hàng quan tâm khóa B1');
  const [interactionNextAction, setInteractionNextAction] = useState('Hẹn gọi lại sau 18h');
  const [savingInteraction, setSavingInteraction] = useState(false);

  // Status update modal state
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<LeadStatus>('CONTACTING');
  const [statusNote, setStatusNote] = useState('');
  const [savingStatus, setSavingStatus] = useState(false);

  // Convert lead modal state
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);
  const [convertNote, setConvertNote] = useState('');
  const [savingConvert, setSavingConvert] = useState(false);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const data = await crmService.getLeads({
        status: selectedStatus || undefined,
        categoryId: selectedCategoryId ? Number(selectedCategoryId) : undefined,
        source: selectedSource || undefined,
        keyword: searchKeyword || undefined,
        page,
        size: 15
      });
      setLeads(data.content || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error('Lỗi khi tải danh sách leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    admissionService.getActiveCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [selectedStatus, selectedCategoryId, selectedSource, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    fetchLeads();
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'NEW':
        return { text: 'Mới đăng ký', color: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' };
      case 'CONTACTING':
        return { text: 'Đang liên hệ', color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300' };
      case 'CONSULTED':
        return { text: 'Đã tư vấn', color: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' };
      case 'FOLLOW_UP':
        return { text: 'Cần chăm sóc lại', color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' };
      case 'CONVERTED':
        return { text: 'Đã tạo hồ sơ', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' };
      case 'NOT_INTERESTED':
        return { text: 'Không quan tâm', color: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' };
      default:
        return { text: status, color: 'bg-slate-100 text-slate-700 dark:bg-slate-800' };
    }
  };

  const submitInteraction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLead) return;
    try {
      setSavingInteraction(true);
      await crmService.addInteraction(activeLead.id, {
        interactionType,
        content: interactionContent,
        result: interactionResult,
        nextAction: interactionNextAction
      });
      setIsInteractionModalOpen(false);
      setInteractionContent('');
      fetchLeads();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Có lỗi khi lưu nhật ký tương tác.');
    } finally {
      setSavingInteraction(false);
    }
  };

  const submitStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLead) return;
    try {
      setSavingStatus(true);
      await crmService.updateLead(activeLead.id, {
        status: newStatus,
        notes: statusNote
      });
      setIsStatusModalOpen(false);
      setStatusNote('');
      fetchLeads();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Có lỗi khi cập nhật trạng thái lead.');
    } finally {
      setSavingStatus(false);
    }
  };

  const submitConvertLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeLead) return;
    try {
      setSavingConvert(true);
      const converted = await crmService.convertLead(activeLead.id, {
        note: convertNote
      });
      setIsConvertModalOpen(false);
      setConvertNote('');
      alert(`Đã chuyển đổi thành công sang Hồ sơ học viên: ${converted.convertedApplicationCode}`);
      fetchLeads();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Có lỗi khi chuyển đổi hồ sơ.');
    } finally {
      setSavingConvert(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <Icons.Users size={20} />
              </span>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                CRM & Quản lý Khách hàng Tiềm năng (Leads)
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Phân hệ tiếp nhận yêu cầu tư vấn, ghi nhận nhật ký cuộc gọi và chuyển đổi thành hồ sơ tuyển sinh.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchLeads}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Icons.RefreshCw size={14} />
              Làm mới
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400">
                <Icons.Search size={14} />
              </span>
              <input
                type="text"
                placeholder="Tìm tên, SĐT, mã Lead..."
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <select
                value={selectedStatus}
                onChange={e => { setSelectedStatus(e.target.value as any); setPage(0); }}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              >
                <option value="">-- Tất cả trạng thái --</option>
                <option value="NEW">Mới đăng ký (NEW)</option>
                <option value="CONTACTING">Đang liên hệ (CONTACTING)</option>
                <option value="CONSULTED">Đã tư vấn (CONSULTED)</option>
                <option value="FOLLOW_UP">Cần chăm sóc lại (FOLLOW_UP)</option>
                <option value="CONVERTED">Đã tạo hồ sơ (CONVERTED)</option>
                <option value="NOT_INTERESTED">Không quan tâm (NOT_INTERESTED)</option>
              </select>
            </div>

            <div>
              <select
                value={selectedCategoryId}
                onChange={e => { setSelectedCategoryId(e.target.value ? Number(e.target.value) : ''); setPage(0); }}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              >
                <option value="">-- Tất cả hạng GPLX --</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>Hạng {c.code} - {c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedSource}
                onChange={e => { setSelectedSource(e.target.value as any); setPage(0); }}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              >
                <option value="">-- Nguồn tiếp cận --</option>
                <option value="HOMEPAGE">Trang chủ (HOMEPAGE)</option>
                <option value="COURSE_DETAIL">Chi tiết khóa học</option>
                <option value="CAMPAIGN">Chiến dịch quảng cáo</option>
                <option value="DIRECT">Trực tiếp tại quầy</option>
                <option value="REFERRAL">Giới thiệu</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-sm transition-all"
              >
                Lọc kết quả
              </button>
            </div>
          </form>
        </div>

        {/* Leads Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <Icons.Loader size={32} className="text-blue-600 mx-auto" />
              <p className="text-xs text-slate-500 mt-2">Đang tải danh sách khách hàng tiềm năng...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <Icons.Users size={40} className="text-slate-400 mx-auto" />
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-base">Không có dữ liệu phù hợp</h4>
              <p className="text-xs text-slate-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-semibold">
                    <th className="p-4">Mã Lead & Họ tên</th>
                    <th className="p-4">Liên hệ & Kênh</th>
                    <th className="p-4">Hạng & Gói quan tâm</th>
                    <th className="p-4">Trạng thái</th>
                    <th className="p-4">Chuyên viên phụ trách</th>
                    <th className="p-4">Ngày tạo</th>
                    <th className="p-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {leads.map(lead => {
                    const badge = getStatusBadge(lead.status);
                    return (
                      <tr key={lead.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-4">
                          <div className="font-mono text-[11px] text-blue-600 dark:text-blue-400 font-bold">
                            {lead.leadCode}
                          </div>
                          <div className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5">
                            {lead.fullName}
                          </div>
                          {lead.trainingLocation && (
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {lead.trainingLocation}
                            </div>
                          )}
                        </td>

                        <td className="p-4 space-y-1">
                          <div className="flex items-center gap-1.5 font-medium text-slate-900 dark:text-slate-100">
                            <Icons.Phone size={14} className="text-slate-400" />
                            <span>{lead.phone}</span>
                          </div>
                          {lead.email && (
                            <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                              <Icons.Mail size={14} className="text-slate-400" />
                              <span className="truncate max-w-[150px]">{lead.email}</span>
                            </div>
                          )}
                          <div className="text-[10px] text-slate-400">
                            Ưu tiên: {lead.preferredContactChannel} ({lead.preferredContactTime || 'Linh hoạt'})
                          </div>
                        </td>

                        <td className="p-4">
                          <div className="font-bold text-slate-800 dark:text-slate-200">
                            Hạng {lead.categoryCode || 'N/A'}
                          </div>
                          <div className="text-slate-500 text-[11px] line-clamp-1">
                            {lead.courseTitle || lead.categoryName || 'Chưa chọn khóa'}
                          </div>
                          <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                            Nguồn: {lead.source}
                          </span>
                        </td>

                        <td className="p-4">
                          <span className={`inline-block px-2.5 py-1 rounded-lg font-bold text-[11px] ${badge.color}`}>
                            {badge.text}
                          </span>
                          {lead.convertedApplicationCode && (
                            <div className="text-[10px] text-emerald-600 font-mono mt-1 font-semibold">
                              Hồ sơ: {lead.convertedApplicationCode}
                            </div>
                          )}
                        </td>

                        <td className="p-4">
                          <span className="text-slate-700 dark:text-slate-300 font-medium">
                            {lead.assignedToName || 'Chưa phân công'}
                          </span>
                          {lead.followUpAt && (
                            <div className="text-[10px] text-amber-600 flex items-center gap-1 mt-0.5">
                              <Icons.Clock size={12} />
                              <span>Hẹn: {lead.followUpAt.replace('T', ' ').slice(0, 16)}</span>
                            </div>
                          )}
                        </td>

                        <td className="p-4 text-slate-500 text-[11px]">
                          {lead.createdAt?.slice(0, 10)}
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              title="Ghi nhật ký tương tác / gọi điện"
                              onClick={() => {
                                setActiveLead(lead);
                                setIsInteractionModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                            >
                              <Icons.Phone size={16} />
                            </button>

                            <button
                              type="button"
                              title="Cập nhật trạng thái"
                              onClick={() => {
                                setActiveLead(lead);
                                setNewStatus(lead.status);
                                setIsStatusModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
                            >
                              <Icons.ChevronDown size={16} />
                            </button>

                            {lead.status !== 'CONVERTED' && (
                              <button
                                type="button"
                                title="Chuyển thành hồ sơ chính thức"
                                onClick={() => {
                                  setActiveLead(lead);
                                  setIsConvertModalOpen(true);
                                }}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] transition-all"
                              >
                                <Icons.UserCheck size={14} />
                                <span>Tạo hồ sơ</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Trang {page + 1} / {totalPages}</span>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={page === 0}
                onClick={() => setPage(p => Math.max(0, p - 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 disabled:opacity-40"
              >
                Trước
              </button>
              <button
                type="button"
                disabled={page >= totalPages - 1}
                onClick={() => setPage(p => p + 1)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 disabled:opacity-40"
              >
                Sau
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal 1: Add Interaction Log */}
      {isInteractionModalOpen && activeLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Icons.Phone size={18} className="text-blue-600" />
              Ghi nhật ký tương tác — {activeLead.fullName}
            </h3>

            <form onSubmit={submitInteraction} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Hình thức tương tác</label>
                <select
                  value={interactionType}
                  onChange={e => setInteractionType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                >
                  <option value="CALL">Cuộc gọi điện thoại</option>
                  <option value="ZALO_MESSAGE">Nhắn tin Zalo</option>
                  <option value="SMS">Tin nhắn SMS</option>
                  <option value="EMAIL">Gửi Email tư vấn</option>
                  <option value="MEETING">Tư vấn trực tiếp tại cơ sở</option>
                  <option value="NOTE">Ghi chú nội bộ</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Nội dung trao đổi <span className="text-red-500">*</span></label>
                <textarea
                  required
                  rows={3}
                  placeholder="Ghi lại chi tiết nội dung cuộc gọi hoặc phản hồi của học viên..."
                  value={interactionContent}
                  onChange={e => setInteractionContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Kết quả cuộc gọi</label>
                <input
                  type="text"
                  placeholder="VD: Đã đồng ý khóa B1 cuối tuần..."
                  value={interactionResult}
                  onChange={e => setInteractionResult(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Hành động tiếp theo</label>
                <input
                  type="text"
                  placeholder="VD: Hẹn gọi lại vào chiều mai sau 18h..."
                  value={interactionNextAction}
                  onChange={e => setInteractionNextAction(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsInteractionModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={savingInteraction}
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold"
                >
                  {savingInteraction ? 'Đang lưu...' : 'Lưu nhật ký'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Update Lead Status */}
      {isStatusModalOpen && activeLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-sm w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Cập nhật trạng thái Lead
            </h3>

            <form onSubmit={submitStatusUpdate} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Trạng thái mới</label>
                <select
                  value={newStatus}
                  onChange={e => setNewStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                >
                  <option value="NEW">NEW - Mới đăng ký</option>
                  <option value="CONTACTING">CONTACTING - Đang liên hệ</option>
                  <option value="CONSULTED">CONSULTED - Đã tư vấn xong</option>
                  <option value="FOLLOW_UP">FOLLOW_UP - Cần chăm sóc lại</option>
                  <option value="CONVERTED">CONVERTED - Đã tạo hồ sơ</option>
                  <option value="NOT_INTERESTED">NOT_INTERESTED - Không quan tâm</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Ghi chú trạng thái</label>
                <textarea
                  rows={2}
                  placeholder="Ghi chú lý do thay đổi..."
                  value={statusNote}
                  onChange={e => setStatusNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsStatusModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={savingStatus}
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold"
                >
                  {savingStatus ? 'Đang lưu...' : 'Cập nhật'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Convert Lead to Application */}
      {isConvertModalOpen && activeLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Icons.UserCheck size={20} className="text-emerald-600" />
              Chuyển đổi thành Hồ sơ đăng ký học chính thức
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-400">
              Hệ thống sẽ tạo mới một <strong>Hồ sơ tuyển sinh (Admission Application)</strong> với mã tự động, liên kết dữ liệu của học viên <strong>{activeLead.fullName}</strong> ({activeLead.phone}) để cán bộ thẩm định tiếp nhận hồ sơ.
            </p>

            <form onSubmit={submitConvertLead} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Ghi chú tiếp nhận tuyển sinh</label>
                <textarea
                  rows={2}
                  placeholder="VD: Học viên đã nộp học phí đợt 1 tại quầy hoặc đồng ý lịch học..."
                  value={convertNote}
                  onChange={e => setConvertNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsConvertModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={savingConvert}
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-semibold"
                >
                  {savingConvert ? 'Đang chuyển đổi...' : 'Xác nhận tạo hồ sơ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrmLeadsPage;
