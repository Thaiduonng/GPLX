import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { reportingService } from '../services/reportingService';
import { AuditLog } from '../types/reporting';

export const AuditLogPage: React.FC = () => {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Filters
    const [resourceType, setResourceType] = useState<string>('');
    const [action, setAction] = useState<string>('');
    const [page, setPage] = useState<number>(0);
    const pageSize = 20;

    const fetchLogs = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await reportingService.getAuditLogs(
                resourceType || undefined,
                action || undefined,
                page,
                pageSize
            );
            setLogs(data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Không thể tải nhật ký kiểm toán hệ thống');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [page, resourceType, action]);

    const handleFilterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(0);
        fetchLogs();
    };

    const handleResetFilters = () => {
        setResourceType('');
        setAction('');
        setPage(0);
    };

    return (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h1 style={{ margin: '0 0 8px 0', fontSize: '26px', color: '#1a237e' }}>🛡️ Nhật Ký Kiểm Toán Toàn Hệ Thống (Audit Logs)</h1>
                    <p style={{ margin: 0, color: '#555' }}>
                        Truy vết mọi hành động quản trị, cập nhật trạng thái hồ sơ, chấm điểm thi, duyệt thanh toán và phân công xe.
                    </p>
                </div>
                <div>
                    <Link
                        to="/dashboard"
                        style={{ padding: '8px 16px', background: '#1976d2', color: '#fff', textDecoration: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 500 }}
                    >
                        &larr; Quay lại Dashboard
                    </Link>
                </div>
            </div>

            {/* Filter Bar */}
            <form onSubmit={handleFilterSubmit} style={{ background: '#fff', padding: '16px 20px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#555', marginBottom: '4px' }}>
                        Module / Phân hệ:
                    </label>
                    <select
                        value={resourceType}
                        onChange={(e) => { setResourceType(e.target.value); setPage(0); }}
                        style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '180px' }}
                    >
                        <option value="">-- Tất cả phân hệ --</option>
                        <option value="ADMISSION">ADMISSION (Hồ sơ)</option>
                        <option value="EXAMINATION">EXAMINATION (Sát hạch)</option>
                        <option value="FINANCE">FINANCE (Tài chính)</option>
                        <option value="FLEET">FLEET (Phương tiện)</option>
                        <option value="TRAINING">TRAINING (Đào tạo)</option>
                        <option value="IDENTITY">IDENTITY (Tài khoản)</option>
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#555', marginBottom: '4px' }}>
                        Hành động (Action):
                    </label>
                    <input
                        type="text"
                        placeholder="VD: APPROVE_APPLICATION"
                        value={action}
                        onChange={(e) => setAction(e.target.value)}
                        style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '220px' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '18px' }}>
                    <button
                        type="submit"
                        style={{ padding: '8px 16px', background: '#0288d1', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}
                    >
                        🔍 Tìm kiếm
                    </button>
                    <button
                        type="button"
                        onClick={handleResetFilters}
                        style={{ padding: '8px 16px', background: '#eee', color: '#333', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Đặt lại
                    </button>
                </div>
            </form>

            {error && (
                <div style={{ padding: '16px', background: '#ffebee', color: '#c62828', borderRadius: '8px', marginBottom: '16px' }}>
                    {error}
                </div>
            )}

            {/* Logs Table */}
            <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ background: '#eceff1', borderBottom: '2px solid #cfd8dc' }}>
                                <th style={{ padding: '12px 16px', width: '60px' }}>ID</th>
                                <th style={{ padding: '12px 16px', width: '160px' }}>Thời điểm (UTC)</th>
                                <th style={{ padding: '12px 16px', width: '140px' }}>Người thực hiện</th>
                                <th style={{ padding: '12px 16px', width: '180px' }}>Hành động</th>
                                <th style={{ padding: '12px 16px', width: '130px' }}>Phân hệ</th>
                                <th style={{ padding: '12px 16px', width: '120px' }}>Đối tượng</th>
                                <th style={{ padding: '12px 16px' }}>Chi tiết thay đổi</th>
                                <th style={{ padding: '12px 16px', width: '120px' }}>IP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={8} style={{ padding: '32px', textAlign: 'center', color: '#666' }}>
                                        Đang tải dữ liệu nhật ký kiểm toán...
                                    </td>
                                </tr>
                            ) : logs.length === 0 ? (
                                <tr>
                                    <td colSpan={8} style={{ padding: '32px', textAlign: 'center', color: '#888' }}>
                                        Không tìm thấy bản ghi nhật ký kiểm toán nào phù hợp với bộ lọc.
                                    </td>
                                </tr>
                            ) : (
                                logs.map((log) => (
                                    <tr key={log.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                                        <td style={{ padding: '12px 16px', color: '#888' }}>#{log.id}</td>
                                        <td style={{ padding: '12px 16px', whiteSpace: 'nowrap', color: '#555' }}>
                                            {new Date(log.createdAt).toLocaleString('vi-VN')}
                                        </td>
                                        <td style={{ padding: '12px 16px', fontWeight: 600 }}>
                                            {log.username} {log.userId && <span style={{ color: '#888', fontWeight: 'normal', fontSize: '12px' }}>(#{log.userId})</span>}
                                        </td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <span style={{
                                                padding: '3px 8px',
                                                borderRadius: '4px',
                                                background: '#e8eaf6',
                                                color: '#283593',
                                                fontSize: '12px',
                                                fontFamily: 'monospace',
                                                fontWeight: 600
                                            }}>
                                                {log.action}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px 16px', color: '#37474f', fontWeight: 500 }}>
                                            {log.resourceType}
                                        </td>
                                        <td style={{ padding: '12px 16px', color: '#666', fontFamily: 'monospace' }}>
                                            {log.resourceId || '—'}
                                        </td>
                                        <td style={{ padding: '12px 16px', color: '#263238' }}>
                                            {log.details}
                                        </td>
                                        <td style={{ padding: '12px 16px', color: '#78909c', fontSize: '12px' }}>
                                            {log.ipAddress || '—'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', background: '#fafafa', borderTop: '1px solid #eee' }}>
                    <div style={{ color: '#666', fontSize: '13px' }}>
                        Trang hiện tại: <strong>{page + 1}</strong> (Hiển thị tối đa {pageSize} dòng/trang)
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 0))}
                            disabled={page === 0 || loading}
                            style={{
                                padding: '6px 14px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                background: page === 0 ? '#f0f0f0' : '#fff',
                                cursor: page === 0 ? 'not-allowed' : 'pointer'
                            }}
                        >
                            &larr; Trang trước
                        </button>
                        <button
                            onClick={() => setPage((p) => p + 1)}
                            disabled={logs.length < pageSize || loading}
                            style={{
                                padding: '6px 14px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                background: logs.length < pageSize ? '#f0f0f0' : '#fff',
                                cursor: logs.length < pageSize ? 'not-allowed' : 'pointer'
                            }}
                        >
                            Trang sau &rarr;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
