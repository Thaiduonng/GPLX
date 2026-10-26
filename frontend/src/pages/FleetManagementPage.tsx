import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fleetService } from '../services/fleetService';
import { admissionService } from '../services/admissionService';
import type { Vehicle, VehicleMaintenance, TransmissionType } from '../types/fleet';
import type { LicenseCategory } from '../types/admission';
import { useAuth } from '../features/auth/AuthContext';
import {
  PageHeader,
  AppButton,
  AppInput,
  AppSelect,
  StatusBadge,
  Modal,
  Alert,
  LoadingSpinner,
  EmptyState,
} from '../components/ui';
import { formatCurrency, formatDate } from '../utils/formatters';

export const FleetManagementPage: React.FC = () => {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [categories, setCategories] = useState<LicenseCategory[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [maintenances, setMaintenances] = useState<VehicleMaintenance[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
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
  const [maintDate, setMaintDate] = useState<string>(new Date().toISOString().split('T')[0] || '');
  const [maintDesc, setMaintDesc] = useState<string>('');
  const [maintCost, setMaintCost] = useState<number>(1000000);
  const [maintPerformer, setMaintPerformer] = useState<string>('Gara Trung Tâm');

  const isAdminOrManager = user?.roles?.some((r) => r === 'ROLE_ADMIN' || r === 'ROLE_MANAGER');

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [vData, cData] = await Promise.all([
        fleetService.getAllVehicles(),
        admissionService.getCategories(),
      ]);
      setVehicles(vData);
      setCategories(cData);
      if (cData.length > 0 && cData[0]) setCategoryId(cData[0].id);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Không thể tải danh sách phương tiện.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Lỗi không xác định khi tải dữ liệu xe tập lái');
      }
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
      setSubmitting(true);
      setError(null);
      const res = await fleetService.addVehicle({
        plateNumber: plateNumber.trim(),
        model: model.trim(),
        categoryId: Number(categoryId),
        transmission,
        inspectionExpiryDate,
      });
      setShowAddModal(false);
      setPlateNumber('');
      setModel('');
      setSuccessMsg(`Thêm xe ${res.plateNumber} vào đội xe thành công!`);
      loadData();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Thêm phương tiện thất bại.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Lỗi không xác định khi thêm xe mới');
      }
    } finally {
      setSubmitting(false);
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
      setSubmitting(true);
      setError(null);
      await fleetService.logMaintenance(selectedVehicle.id, {
        maintenanceDate: maintDate,
        description: maintDesc.trim(),
        cost: Number(maintCost),
        performedBy: maintPerformer.trim(),
      });
      setShowMaintModal(false);
      setMaintDesc('');
      setSuccessMsg(`Đã ghi nhận bảo dưỡng thành công cho xe ${selectedVehicle.plateNumber}!`);
      loadData();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Lỗi khi lưu thông tin bảo dưỡng.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Lỗi không xác định khi ghi nhận bảo dưỡng');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title="Quản lý Đội Xe Tập Lái & Bảo Dưỡng (FLT-001)"
        description="Theo dõi thời hạn đăng kiểm an toàn kỹ thuật, trạng thái sẵn sàng đào tạo DAT và bảo dưỡng định kỳ."
        actions={
          isAdminOrManager ? (
            <AppButton variant="primary" onClick={() => setShowAddModal(true)} icon="➕">
              Thêm xe mới
            </AppButton>
          ) : undefined
        }
      />

      {successMsg && (
        <Alert
          type="success"
          message={successMsg}
          onClose={() => setSuccessMsg(null)}
        />
      )}

      {error && (
        <Alert
          type="danger"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {loading ? (
        <div style={{ padding: '60px 0', textAlign: 'center' }}>
          <LoadingSpinner size="lg" text="Đang tải danh sách đội xe tập lái..." />
        </div>
      ) : vehicles.length === 0 ? (
        <EmptyState
          icon="🚗"
          title="Chưa có xe tập lái"
          description="Hiện chưa có phương tiện nào được đăng ký trong hệ thống."
          action={
            isAdminOrManager ? (
              <AppButton variant="primary" onClick={() => setShowAddModal(true)}>
                Thêm xe đầu tiên
              </AppButton>
            ) : undefined
          }
        />
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 'var(--space-5)',
          }}
        >
          {vehicles.map((v) => {
            const isInspectionValid = v.isInspectionValid;
            return (
              <div
                key={v.id}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: 'var(--radius-xl)',
                  border: isInspectionValid
                    ? '1px solid var(--color-border)'
                    : '2px solid var(--color-danger)',
                  padding: 'var(--space-5)',
                  boxShadow: 'var(--shadow-xs)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 'var(--space-4)',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 'var(--space-3)',
                    }}
                  >
                    <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-main)' }}>
                      {v.plateNumber}
                    </span>
                    <StatusBadge
                      type="vehicle"
                      status={!isInspectionValid ? 'INSPECTION_OVERDUE' : v.status}
                    />
                  </div>

                  <div
                    style={{
                      fontSize: 'var(--font-size-sm)',
                      color: 'var(--color-text-secondary)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    <div>
                      Dòng xe: <strong>{v.model}</strong>
                    </div>
                    <div>
                      Hạng GPLX:{' '}
                      <strong style={{ color: 'var(--color-primary)' }}>{v.categoryCode}</strong> | Hộp số:{' '}
                      <strong>{v.transmission === 'AUTOMATIC' ? 'Tự động (AT)' : 'Số sàn (MT)'}</strong>
                    </div>
                    <div>
                      Hạn đăng kiểm:{' '}
                      <strong
                        style={{
                          color: isInspectionValid ? 'var(--color-success)' : 'var(--color-danger)',
                        }}
                      >
                        {formatDate(v.inspectionExpiryDate)}
                      </strong>
                      {!isInspectionValid && (
                        <span
                          style={{
                            fontSize: '0.75rem',
                            color: 'var(--color-danger)',
                            fontWeight: 600,
                            marginLeft: '6px',
                          }}
                        >
                          (Quá hạn FLT-001)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <AppButton
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => handleOpenMaintenance(v)}
                  icon="🛠️"
                >
                  Ghi nhận / Lịch sử bảo dưỡng
                </AppButton>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal thêm xe */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Thêm phương tiện tập lái mới"
      >
        <form onSubmit={handleAddVehicle} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <AppInput
            label="Biển số xe"
            required
            placeholder="Ví dụ: 29A-888.12"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
          />

          <AppInput
            label="Dòng xe / Mẫu xe"
            required
            placeholder="Ví dụ: Toyota Vios 1.5G 2024"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />

          <AppSelect
            label="Hạng đào tạo GPLX"
            required
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            options={categories.map((c) => ({
              value: c.id,
              label: `${c.code} - ${c.name}`,
            }))}
          />

          <AppSelect
            label="Loại hộp số"
            required
            value={transmission}
            onChange={(e) => setTransmission(e.target.value as TransmissionType)}
            options={[
              { value: 'MANUAL', label: 'Số sàn (MT)' },
              { value: 'AUTOMATIC', label: 'Số tự động (AT)' },
            ]}
          />

          <AppInput
            label="Hạn kiểm định an toàn (FLT-001)"
            type="date"
            required
            value={inspectionExpiryDate}
            onChange={(e) => setInspectionExpiryDate(e.target.value)}
            helperText="Xe quá hạn đăng kiểm sẽ tự động bị khóa không được phân lớp thực hành"
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: 'var(--space-3)' }}>
            <AppButton variant="outline" type="button" onClick={() => setShowAddModal(false)}>
              Hủy bỏ
            </AppButton>
            <AppButton variant="primary" type="submit" loading={submitting}>
              Lưu phương tiện
            </AppButton>
          </div>
        </form>
      </Modal>

      {/* Modal bảo dưỡng */}
      {selectedVehicle && (
        <Modal
          isOpen={showMaintModal}
          onClose={() => setShowMaintModal(false)}
          title={`Bảo dưỡng xe: ${selectedVehicle.plateNumber}`}
          size="lg"
        >
          <div>
            <form onSubmit={handleSaveMaintenance} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                <AppInput
                  label="Ngày bảo dưỡng"
                  type="date"
                  required
                  value={maintDate}
                  onChange={(e) => setMaintDate(e.target.value)}
                />
                <AppInput
                  label="Chi phí bảo dưỡng (₫)"
                  type="number"
                  min="0"
                  required
                  value={maintCost}
                  onChange={(e) => setMaintCost(Number(e.target.value))}
                />
              </div>

              <AppInput
                label="Đơn vị / Gara thực hiện"
                required
                placeholder="Gara Trung Tâm hoặc tên đơn vị"
                value={maintPerformer}
                onChange={(e) => setMaintPerformer(e.target.value)}
              />

              <AppInput
                label="Hạng mục bảo dưỡng / thay thế phụ tùng"
                required
                placeholder="Ví dụ: Thay dầu động cơ, thay má phanh, kiểm tra hệ thống lái"
                value={maintDesc}
                onChange={(e) => setMaintDesc(e.target.value)}
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <AppButton variant="outline" type="button" onClick={() => setShowMaintModal(false)}>
                  Đóng
                </AppButton>
                <AppButton variant="success" type="submit" loading={submitting}>
                  Ghi nhận bảo dưỡng
                </AppButton>
              </div>
            </form>

            {/* Lịch sử bảo dưỡng */}
            {maintenances.length > 0 && (
              <div style={{ marginTop: 'var(--space-6)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)' }}>
                <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
                  📋 Lịch sử bảo dưỡng gần đây:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {maintenances.map((m) => (
                    <div
                      key={m.id}
                      style={{
                        padding: 'var(--space-2) var(--space-3)',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--color-bg-app)',
                        fontSize: 'var(--font-size-xs)',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>
                        <strong>{formatDate(m.maintenanceDate)}</strong>: {m.description} ({m.performedBy})
                      </span>
                      <strong style={{ color: 'var(--color-danger)' }}>{formatCurrency(m.cost)}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
export default FleetManagementPage;
