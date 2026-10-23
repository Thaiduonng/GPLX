import React, { useState, useEffect } from 'react';
import { fleetService } from '../services/fleetService';
import { admissionService } from '../services/admissionService';
import { Vehicle, VehicleMaintenance, TransmissionType } from '../types/fleet';
import { LicenseCategory } from '../types/admission';
import { useAuth } from '../features/auth/AuthContext';

export const FleetManagementPage: React.FC = () => {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [categories, setCategories] = useState<LicenseCategory[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [maintenances, setMaintenances] = useState<VehicleMaintenance[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal thêm xe
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [plateNumber, setPlateNumber] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [categoryId, setCategoryId] = useState<number>(0);
  const [transmission, setTransmission] = useState<TransmissionType>('MANUAL');
  const [inspectionExpiryDate, setInspectionExpiryDate] = useState<string>('');

  // Modal bảo dưỡng
  const [showMaintModal, setShowMaintModal] = useState<boolean>(false);
  const [maintDate, setMaintDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [maintDesc, setMaintDesc] = useState<string>('');
  const [maintCost, setMaintCost] = useState<number>(1000000);
  const [maintPerformer, setMaintPerformer] = useState<string>('Gara Trung Tâm');

  const isAdminOrManager = user?.roles.some(r => r === 'ROLE_ADMIN' || r === 'ROLE_MANAGER');

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [vData, cData] = await Promise.all([
        fleetService.getAllVehicles(),
        admissionService.getCategories()
      ]);
      setVehicles(vData);
      setCategories(cData);
      if (cData.length > 0) setCategoryId(cData[0].id);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể tải danh sách phương tiện.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const res = await fleetService.addVehicle({
        plateNumber,
        model,
        categoryId: Number(categoryId),
        transmission,
        inspectionExpiryDate
      });
      setShowAddModal(false);
      setPlateNumber('');
      setModel('');
      setSuccessMsg(`Thêm xe ${res.plateNumber} vào đội xe thành công!`);
      loadData();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Thêm phương tiện thất bại.');
    }
  };

  const handleOpenMaintenance = async (v: Vehicle) => {
    setSelectedVehicle(v);
    setShowMaintModal(true);
    setSuccessMsg(null);
    setError(null);
    try {
      const history = await fleetService.getMaintenances(v.id);
      setMaintenances(history);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveMaintenance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVehicle) return;

    try {
      setError(null);
      await fleetService.logMaintenance(selectedVehicle.id, {
        maintenanceDate: maintDate,
        description: maintDesc,
        cost: Number(maintCost),
        performedBy: maintPerformer
      });
      setShowMaintModal(false);
      setMaintDesc('');
      setSuccessMsg(`Đã lưu bảo dưỡng cho xe ${selectedVehicle.plateNumber}!`);
      loadData();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi lưu bảo dưỡng.');
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b' }}>
            Quản lý đội xe tập lái & Bảo dưỡng (FLT-001)
          </h1>
          <p style={{ color: '#64748b', marginTop: '4px' }}>
            Theo dõi hạn kiểm định an toàn kỹ thuật, trạng thái sẵn sàng đào tạo DAT và bảo dưỡng định kỳ
          </p>
        </div>
        {isAdminOrManager && (
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              padding: '10px 18px',
              backgroundColor: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            + Thêm xe mới
          </button>
        )}
      </div>

      {successMsg && (
        <div style={{ padding: '14px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', color: '#166534', marginBottom: '16px' }}>
          {successMsg}
        </div>
      )}

      {error && (
        <div style={{ padding: '14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#b91c1c', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Đang tải danh sách xe...</div>
      ) : vehicles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', background: '#f8fafc', borderRadius: '12px', color: '#94a3b8' }}>
          Hiện chưa có xe tập lái nào trong hệ thống.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {vehicles.map((v) => (
            <div
              key={v.id}
              style={{
                background: '#fff',
                borderRadius: '12px',
                border: v.isInspectionValid ? '1px solid #e2e8f0' : '2px solid #ef4444',
                padding: '20px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#1e293b' }}>{v.plateNumber}</span>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: v.status === 'AVAILABLE' && v.isInspectionValid ? '#dcfce7' : '#fee2e2',
                    color: v.status === 'AVAILABLE' && v.isInspectionValid ? '#15803d' : '#b91c1c'
                  }}>
                    {v.status === 'AVAILABLE' && v.isInspectionValid ? 'SẴN SÀNG (AVAILABLE)' : v.status === 'MAINTENANCE' ? 'ĐANG BẢO DƯỠNG' : 'KHÔNG KHẢ DỤNG'}
                  </span>
                </div>

                <div style={{ fontSize: '14px', color: '#334155', lineHeight: '1.6', marginBottom: '14px' }}>
                  <div>Dòng xe: <strong>{v.model}</strong></div>
                  <div>Hạng GPLX: <strong style={{ color: '#2563eb' }}>{v.categoryCode}</strong> | Hộp số: <strong>{v.transmission}</strong></div>
                  <div>
                    Hạn đăng kiểm: <strong style={{ color: v.isInspectionValid ? '#15803d' : '#dc2626' }}>{v.inspectionExpiryDate}</strong>
                    {!v.isInspectionValid && <span style={{ fontSize: '11px', color: '#dc2626', marginLeft: '6px' }}>(Đã quá hạn FLT-001)</span>}
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => handleOpenMaintenance(v)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  🛠️ Ghi nhận / Lịch sử bảo dưỡng
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal thêm xe */}
      {showAddModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', width: '460px', maxWidth: '90%' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 'bold', marginBottom: '16px', color: '#1e293b' }}>
              Thêm xe tập lái mới
            </h2>
            <form onSubmit={handleAddVehicle}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Biển số xe:</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: 29A-888.12"
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Dòng xe / Model:</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Toyota Vios 1.5G 2024"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Hạng GPLX:</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.code} - {c.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Hộp số:</label>
                <select
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value as TransmissionType)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                >
                  <option value="MANUAL">Số sàn (MT)</option>
                  <option value="AUTOMATIC">Số tự động (AT)</option>
                </select>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Hạn đăng kiểm:</label>
                <input
                  type="date"
                  required
                  value={inspectionExpiryDate}
                  onChange={(e) => setInspectionExpiryDate(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{ padding: '8px 16px', background: '#f1f5f9', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 18px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Lưu xe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal bảo dưỡng */}
      {showMaintModal && selectedVehicle && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', width: '550px', maxWidth: '90%' }}>
            <h2 style={{ fontSize: '19px', fontWeight: 'bold', marginBottom: '14px', color: '#1e293b' }}>
              Bảo dưỡng & Sửa chữa xe: {selectedVehicle.plateNumber}
            </h2>
            <form onSubmit={handleSaveMaintenance} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Ngày bảo dưỡng:</label>
                  <input
                    type="date"
                    required
                    value={maintDate}
                    onChange={(e) => setMaintDate(e.target.value)}
                    style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Chi phí (VNĐ):</label>
                  <input
                    type="number"
                    min="0"
                    value={maintCost}
                    onChange={(e) => setMaintCost(Number(e.target.value))}
                    style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>Nội dung sửa chữa / bảo dưỡng:</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Thay dầu động cơ, thay má phanh, kiểm tra lốp"
                  value={maintDesc}
                  onChange={(e) => setMaintDesc(e.target.value)}
                  style={{ width: '100%', padding: '7px 10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowMaintModal(false)}
                  style={{ padding: '7px 14px', background: '#f1f5f9', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  style={{ padding: '7px 16px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Lưu bảo dưỡng
                </button>
              </div>
            </form>

            {maintenances.length > 0 && (
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '14px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#334155' }}>Lịch sử bảo dưỡng gần đây:</h3>
                <ul style={{ maxHeight: '150px', overflowY: 'auto', paddingLeft: '20px', fontSize: '13px', color: '#64748b' }}>
                  {maintenances.map((m) => (
                    <li key={m.id} style={{ marginBottom: '6px' }}>
                      <strong>{m.maintenanceDate}</strong>: {m.description} — <strong>{m.cost.toLocaleString('vi-VN')} đ</strong> ({m.performedBy})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
