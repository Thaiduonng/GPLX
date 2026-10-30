import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../components/ui';
import { crmService } from '../services/crmService';
import { AdmissionDashboardStats } from '../types/crm';

export const AdmissionDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<AdmissionDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await crmService.getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error('Lỗi khi tải thống kê tuyển sinh:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <Icons.TrendingUp size={20} />
              </span>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                Báo cáo & Thống kê Tuyển sinh GPLX
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Dữ liệu thời gian thực về phễu tuyển sinh, tỷ lệ chuyển đổi khách hàng và tiến độ thẩm định hồ sơ.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={fetchStats}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Icons.RefreshCw size={14} />
              Làm mới dữ liệu
            </button>
            <Link
              to="/admin/admissions/leads"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all shadow-sm"
            >
              Quản lý Leads
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="p-16 text-center">
            <Icons.Loader size={32} className="text-blue-600 mx-auto" />
            <p className="text-xs text-slate-500 mt-2">Đang tổng hợp số liệu tuyển sinh...</p>
          </div>
        ) : stats ? (
          <div className="space-y-8">
            {/* Top KPI Cards (4 cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Total Leads */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-bold uppercase tracking-wider">Tổng Leads tư vấn</span>
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600">
                    <Icons.Users size={16} />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {stats.totalLeads}
                  </span>
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-full">
                    +{stats.newLeads} mới
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
                  <span>Đang tư vấn: {stats.contactingLeads}</span>
                  <span>Đã chuyển đổi: {stats.convertedLeads}</span>
                </div>
              </div>

              {/* Card 2: Conversion Rate */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-bold uppercase tracking-wider">Tỷ lệ chuyển đổi Lead</span>
                  <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600">
                    <Icons.TrendingUp size={16} />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    {stats.leadConversionRate.toFixed(1)}%
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                    {stats.convertedLeads} hồ sơ
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
                  Từ yêu cầu tư vấn thành đơn đăng ký chính thức
                </div>
              </div>

              {/* Card 3: Total Applications & Review Status */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-bold uppercase tracking-wider">Hồ sơ đăng ký học</span>
                  <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
                    <Icons.FileText size={16} />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                    {stats.totalApplications}
                  </span>
                  <span className="text-xs font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded-full">
                    {stats.underReviewApplications} đang duyệt
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
                  <span>Cần bổ sung: {stats.supplementRequiredApplications}</span>
                  <span>Đã duyệt: {stats.approvedApplications}</span>
                </div>
              </div>

              {/* Card 4: Enrolled Students & Approval Rate */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-bold uppercase tracking-wider">Nhập học chính thức</span>
                  <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600">
                    <Icons.UserCheck size={16} />
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">
                    {stats.enrolledStudents}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                    {stats.applicationApprovalRate.toFixed(1)}% duyệt
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
                  Đã xếp lớp đào tạo thực hành & DAT
                </div>
              </div>
            </div>

            {/* Phễu Tuyển sinh & Thẩm định */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Icons.Layers size={20} className="text-blue-600" />
                Phễu quy trình Tuyển sinh & Thẩm định hồ sơ
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900">
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-bold block mb-1">GIAI ĐOẠN 1</span>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.totalLeads}</div>
                  <span className="text-xs text-slate-500 mt-1 block">Leads tiếp nhận</span>
                </div>

                <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900">
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold block mb-1">GIAI ĐOẠN 2</span>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.totalApplications}</div>
                  <span className="text-xs text-slate-500 mt-1 block">Nộp đơn đăng ký</span>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
                  <span className="text-xs text-amber-600 dark:text-amber-400 font-bold block mb-1">GIAI ĐOẠN 3</span>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.underReviewApplications + stats.supplementRequiredApplications}</div>
                  <span className="text-xs text-slate-500 mt-1 block">Đang thẩm định</span>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900">
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold block mb-1">GIAI ĐOẠN 4</span>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.approvedApplications}</div>
                  <span className="text-xs text-slate-500 mt-1 block">Đã duyệt hồ sơ</span>
                </div>

                <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900">
                  <span className="text-xs text-purple-600 dark:text-purple-400 font-bold block mb-1">GIAI ĐOẠN 5</span>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">{stats.enrolledStudents}</div>
                  <span className="text-xs text-slate-500 mt-1 block">Xếp lớp nhập học</span>
                </div>
              </div>
            </div>

            {/* Breakdown Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Box 1: Leads by Source */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Icons.PieChart size={16} className="text-blue-600" />
                    Phân bổ Leads theo Nguồn tiếp cận
                  </h3>
                </div>

                <div className="space-y-3 pt-2">
                  {Object.entries(stats.leadsBySource || {}).map(([source, count]) => {
                    const percent = stats.totalLeads > 0 ? (count / stats.totalLeads) * 100 : 0;
                    return (
                      <div key={source} className="space-y-1 text-xs">
                        <div className="flex items-center justify-between font-medium">
                          <span className="text-slate-700 dark:text-slate-300">{source}</span>
                          <span className="font-bold text-slate-900 dark:text-slate-100">{count} ({percent.toFixed(0)}%)</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Box 2: Applications by License Category */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Icons.BarChart size={16} className="text-emerald-600" />
                    Hồ sơ đăng ký theo Hạng bằng lái
                  </h3>
                </div>

                <div className="space-y-3 pt-2">
                  {Object.entries(stats.applicationsByCategory || {}).map(([cat, count]) => {
                    const percent = stats.totalApplications > 0 ? (count / stats.totalApplications) * 100 : 0;
                    return (
                      <div key={cat} className="space-y-1 text-xs">
                        <div className="flex items-center justify-between font-medium">
                          <span className="text-slate-700 dark:text-slate-300">Hạng {cat}</span>
                          <span className="font-bold text-slate-900 dark:text-slate-100">{count} hồ sơ ({percent.toFixed(0)}%)</span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AdmissionDashboardPage;
