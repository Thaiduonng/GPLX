import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { reportingService } from '../services/reportingService';
import { DashboardSummary } from '../types/reporting';

export const DashboardPage: React.FC = () => {
    const [summary, setSummary] = useState<DashboardSummary | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSummary = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await reportingService.getDashboardSummary();
            setSummary(data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Không thể tải dữ liệu Dashboard báo cáo');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSummary();
    }, []);

    const formatVnd = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    if (loading) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <p>Đang tổng hợp dữ liệu thống kê quản trị...</p>
            </div>
        );
    }

    if (error || !summary) {
        return (
            <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ padding: '16px', background: '#ffebee', color: '#c62828', borderRadius: '8px' }}>
                    {error || 'Không có dữ liệu báo cáo'}
                </div>
                <button
                    onClick={fetchSummary}
                    style={{ marginTop: '16px', padding: '8px 16px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Thử lại
                </button>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', color: '#1a237e' }}>Dashboard Quản Trị & Báo Cáo KPI</h1>
                    <p style={{ margin: 0, color: '#555' }}>
                        Giám sát thời gian thực toàn bộ chu trình: Tuyển sinh, Đào tạo, Thực hành DAT, Sát hạch và Tài chính.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <Link
                        to="/audit-logs"
                        style={{ padding: '10px 18px', background: '#37474f', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontWeight: 500 }}
                    >
                        📋 Nhật Ký Kiểm Toán (Audit Log)
                    </Link>
                    <button
                        onClick={fetchSummary}
                        style={{ padding: '10px 18px', background: '#0288d1', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}
                    >
                        🔄 Làm mới dữ liệu
                    </button>
                </div>
            </div>

            {/* KPI Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderLeft: '5px solid #1976d2' }}>
                    <div style={{ fontSize: '13px', color: '#666', textTransform: 'uppercase', fontWeight: 600 }}>Tài khoản học viên</div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1976d2', margin: '8px 0' }}>{summary.totalStudents}</div>
                    <div style={{ fontSize: '12px', color: '#888' }}>Người dùng đăng ký trong hệ thống</div>
                </div>

                <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderLeft: '5px solid #2e7d32' }}>
                    <div style={{ fontSize: '13px', color: '#666', textTransform: 'uppercase', fontWeight: 600 }}>Hồ sơ tuyển sinh</div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2e7d32', margin: '8px 0' }}>
                        {summary.approvedApplications} <span style={{ fontSize: '16px', color: '#666', fontWeight: 'normal' }}>/ {summary.totalApplications}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#888' }}>Hồ sơ đã được phê duyệt hợp lệ</div>
                </div>

                <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderLeft: '5px solid #e65100' }}>
                    <div style={{ fontSize: '13px', color: '#666', textTransform: 'uppercase', fontWeight: 600 }}>Tỷ lệ đỗ sát hạch</div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#e65100', margin: '8px 0' }}>
                        {summary.overallPassRate}%
                    </div>
                    <div style={{ fontSize: '12px', color: '#888' }}>
                        {summary.totalPassedCandidates} đạt trên {summary.totalExamCandidates} thí sinh dự thi
                    </div>
                </div>

                <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderLeft: '5px solid #00897b' }}>
                    <div style={{ fontSize: '13px', color: '#666', textTransform: 'uppercase', fontWeight: 600 }}>Doanh thu học phí</div>
                    <div style={{ fontSize: '26px', fontWeight: 'bold', color: '#00897b', margin: '8px 0' }}>
                        {formatVnd(summary.totalTuitionRevenue)}
                    </div>
                    <div style={{ fontSize: '12px', color: '#888' }}>Tổng biên lai thanh toán đã thu</div>
                </div>

                <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderLeft: '5px solid #7b1fa2' }}>
                    <div style={{ fontSize: '13px', color: '#666', textTransform: 'uppercase', fontWeight: 600 }}>Thực hành lái xe DAT</div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#7b1fa2', margin: '8px 0' }}>
                        {summary.totalDatDistanceKm} <span style={{ fontSize: '18px', fontWeight: 'normal', color: '#666' }}>km</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#888' }}>Tổng quãng đường học viên tích lũy</div>
                </div>

                <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', borderLeft: '5px solid #d81b60' }}>
                    <div style={{ fontSize: '13px', color: '#666', textTransform: 'uppercase', fontWeight: 600 }}>Phương tiện sẵn sàng</div>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#d81b60', margin: '8px 0' }}>
                        {summary.availableVehicles} <span style={{ fontSize: '16px', color: '#666', fontWeight: 'normal' }}>/ {summary.totalVehicles}</span>
                    </div>
                    <div style={{ fontSize: '12px', color: '#888' }}>Xe sẵn sàng & còn hạn đăng kiểm</div>
                </div>
            </div>

            {/* Category Statistics Table */}
            <div style={{ background: '#fff', borderRadius: '10px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '32px' }}>
                <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#333' }}>📊 Thống kê chỉ số theo từng hạng Giấy phép lái xe</h2>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: '#f5f7fa', borderBottom: '2px solid #e0e0e0' }}>
                                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Hạng GPLX</th>
                                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Tên hạng</th>
                                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Hồ sơ đăng ký</th>
                                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Thí sinh dự thi</th>
                                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Số lượng ĐẠT</th>
                                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Tỷ lệ đỗ (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {summary.categoryStats.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ padding: '24px', textAlign: 'center', color: '#888' }}>
                                        Chưa có số liệu thống kê hạng giấy phép.
                                    </td>
                                </tr>
                            ) : (
                                summary.categoryStats.map(cat => (
                                    <tr key={cat.categoryCode} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#1565c0' }}>{cat.categoryCode}</td>
                                        <td style={{ padding: '12px 16px' }}>{cat.categoryName}</td>
                                        <td style={{ padding: '12px 16px' }}>{cat.totalApplications}</td>
                                        <td style={{ padding: '12px 16px' }}>{cat.totalExamCandidates}</td>
                                        <td style={{ padding: '12px 16px', color: '#2e7d32', fontWeight: 600 }}>{cat.totalPassedCandidates}</td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ flex: 1, height: '8px', background: '#e0e0e0', borderRadius: '4px', overflow: 'hidden', minWidth: '60px' }}>
                                                    <div
                                                        style={{
                                                            width: `${Math.min(cat.passRate, 100)}%`,
                                                            height: '100%',
                                                            background: cat.passRate >= 80 ? '#2e7d32' : cat.passRate >= 50 ? '#f57c00' : '#d32f2f'
                                                        }}
                                                    />
                                                </div>
                                                <span style={{ fontWeight: 600, minWidth: '45px' }}>{cat.passRate}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Recent Audit Activities */}
            <div style={{ background: '#fff', borderRadius: '10px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2 style={{ margin: 0, fontSize: '18px', color: '#333' }}>🛡️ Nhật ký kiểm toán gần đây (Audit Trail)</h2>
                    <Link to="/audit-logs" style={{ color: '#1976d2', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
                        Xem tất cả nhật ký &rarr;
                    </Link>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ background: '#f5f7fa', borderBottom: '2px solid #e0e0e0' }}>
                                <th style={{ padding: '10px 14px' }}>Thời gian</th>
                                <th style={{ padding: '10px 14px' }}>Tài khoản</th>
                                <th style={{ padding: '10px 14px' }}>Hành động</th>
                                <th style={{ padding: '10px 14px' }}>Module</th>
                                <th style={{ padding: '10px 14px' }}>Mã đối tượng</th>
                                <th style={{ padding: '10px 14px' }}>Nội dung chi tiết</th>
                            </tr>
                        </thead>
                        <tbody>
                            {summary.recentActivities.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                                        Chưa có nhật ký hoạt động nào.
                                    </td>
                                </tr>
                            ) : (
                                summary.recentActivities.map(log => (
                                    <tr key={log.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <td style={{ padding: '10px 14px', whiteSpace: 'nowrap', color: '#666' }}>
                                            {new Date(log.createdAt).toLocaleString('vi-VN')}
                                        </td>
                                        <td style={{ padding: '10px 14px', fontWeight: 500 }}>{log.username}</td>
                                        <td style={{ padding: '10px 14px' }}>
                                            <span style={{
                                                padding: '3px 8px',
                                                borderRadius: '4px',
                                                background: '#e3f2fd',
                                                color: '#1565c0',
                                                fontSize: '12px',
                                                fontFamily: 'monospace',
                                                fontWeight: 600
                                            }}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td style={{ padding: '10px 14px', color: '#555' }}>{log.resourceType}</td>
                                        <td style={{ padding: '10px 14px', color: '#666' }}>{log.resourceId || '—'}</td>
                                        <td style={{ padding: '10px 14px', color: '#333' }}>{log.details}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
