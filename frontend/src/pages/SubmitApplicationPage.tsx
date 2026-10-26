import { useEffect, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../features/auth/AuthContext';
import { admissionService } from '../services/admissionService';
import type { DocumentUploadItem, Gender, LicenseCategory } from '../types/admission';
import {
  PageHeader,
  AppInput,
  AppSelect,
  AppButton,
  Alert,
} from '../components/ui';
import { formatCurrency } from '../utils/formatters';

export default function SubmitApplicationPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<LicenseCategory[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | ''>('');
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [nationalId, setNationalId] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState<Gender>('MALE');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState('');

  // Documents demo
  const [documents] = useState<DocumentUploadItem[]>([
    {
      documentType: 'NATIONAL_ID_FRONT',
      fileName: 'cccd_mat_truoc.jpg',
      fileUrl: 'https://storage.gplx.edu.vn/uploads/cccd_front_sample.jpg',
      fileSize: 245000,
      mimeType: 'image/jpeg',
    },
    {
      documentType: 'HEALTH_CERTIFICATE',
      fileName: 'giay_kham_suc_khoe.pdf',
      fileUrl: 'https://storage.gplx.edu.vn/uploads/kham_suc_khoe_sample.pdf',
      fileSize: 812000,
      mimeType: 'application/pdf',
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    admissionService
      .getActiveCategories()
      .then((data) => {
        setCategories(data);
        if (data.length > 0 && data[0]) {
          setSelectedCategoryId(data[0].id);
        }
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          setErrorMsg('Không thể tải danh mục hạng GPLX: ' + (err.response?.data?.message || err.message));
        } else if (err instanceof Error) {
          setErrorMsg(err.message);
        }
      });
  }, []);

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);

  // Tính tuổi client-side
  const calculateAge = (dobString: string): number => {
    if (!dobString) return 0;
    const dob = new Date(dobString);
    const diffMs = Date.now() - dob.getTime();
    const ageDate = new Date(diffMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const currentAge = calculateAge(dateOfBirth);
  const isUnderAge = selectedCategory && dateOfBirth ? currentAge < selectedCategory.minAge : false;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!selectedCategoryId) {
      setErrorMsg('Vui lòng chọn hạng bằng lái xe đăng ký.');
      return;
    }

    if (isUnderAge && selectedCategory) {
      setErrorMsg(
        `Quy định độ tuổi: Hạng ${selectedCategory.code} yêu cầu tối thiểu ${selectedCategory.minAge} tuổi (hiện tại bạn ${currentAge} tuổi).`
      );
      return;
    }

    setLoading(true);
    try {
      const response = await admissionService.submitApplication({
        categoryId: Number(selectedCategoryId),
        fullName: fullName.trim(),
        nationalId: nationalId.trim(),
        dateOfBirth,
        gender,
        phone: phone.trim(),
        email: email.trim(),
        address: address.trim(),
        documents,
      });

      setSuccessMsg(`Nộp hồ sơ thành công! Mã hồ sơ của bạn là: ${response.applicationCode}`);
      setTimeout(() => {
        navigate('/my-applications');
      }, 1500);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setErrorMsg(err.response?.data?.message || 'Lỗi nộp hồ sơ. Vui lòng kiểm tra lại.');
      } else if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Lỗi không xác định khi nộp hồ sơ.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title="Nộp Hồ Sơ Đăng Ký Đào Tạo GPLX"
        description="Tiếp nhận hồ sơ điện tử chính quy theo quy chế đào tạo sát hạch lái xe của Bộ Giao thông Vận tải."
      />

      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-8)',
          boxShadow: 'var(--shadow-xs)',
          border: '1px solid var(--color-border)',
        }}
      >
        {errorMsg && (
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <Alert
              type="danger"
              message={errorMsg}
              onClose={() => setErrorMsg('')}
            />
          </div>
        )}

        {successMsg && (
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <Alert
              type="success"
              message={successMsg}
              onClose={() => setSuccessMsg('')}
            />
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* Hạng bằng lái */}
          <div>
            <AppSelect
              label="Chọn hạng Giấy phép lái xe"
              required
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
              options={categories.map((cat) => ({
                value: cat.id,
                label: `${cat.code} — ${cat.name} (Tuổi tối thiểu: ${cat.minAge} | Học phí: ${formatCurrency(cat.tuitionFee)})`,
              }))}
            />
            {selectedCategory && (
              <div
                style={{
                  backgroundColor: 'var(--color-bg-app)',
                  padding: 'var(--space-3) var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  marginTop: 'var(--space-2)',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                💡 {selectedCategory.description}
              </div>
            )}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'var(--space-4)',
            }}
          >
            <AppInput
              label="Họ và tên"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nguyễn Văn A"
            />

            <AppInput
              label="Số CCCD / CMND (9-12 chữ số)"
              required
              value={nationalId}
              onChange={(e) => setNationalId(e.target.value)}
              placeholder="001200001234"
              pattern="^[0-9]{9,12}$"
            />

            <div>
              <AppInput
                label="Ngày sinh"
                type="date"
                required
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                error={isUnderAge ? `Bạn hiện ${currentAge} tuổi, chưa đủ điều kiện ${selectedCategory?.minAge} tuổi.` : undefined}
              />
            </div>

            <AppSelect
              label="Giới tính"
              required
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
              options={[
                { value: 'MALE', label: 'Nam' },
                { value: 'FEMALE', label: 'Nữ' },
                { value: 'OTHER', label: 'Khác' },
              ]}
            />

            <AppInput
              label="Số điện thoại liên hệ"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0912345678"
            />

            <AppInput
              label="Email nhận thông báo"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hocvien@gmail.com"
            />
          </div>

          <AppInput
            label="Địa chỉ thường trú / tạm trú"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
          />

          {/* Danh mục tài liệu số hóa */}
          <div
            style={{
              backgroundColor: 'var(--color-bg-app)',
              padding: 'var(--space-4) var(--space-5)',
              borderRadius: 'var(--radius-lg)',
              border: '1px dashed var(--color-border)',
            }}
          >
            <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '4px' }}>
              📎 Tài liệu số hóa đính kèm (Tiêu chuẩn thẩm định ADM-002)
            </h4>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
              Hệ thống tự động liên kết các tài liệu mẫu bảo mật phục vụ công tác đối soát CCCD & Giấy KSK.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {documents.map((doc, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'var(--color-surface)',
                    padding: 'var(--space-2) var(--space-3)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    fontSize: 'var(--font-size-xs)',
                  }}
                >
                  <span>
                    📄 <strong>{doc.documentType}</strong>: {doc.fileName} ({(doc.fileSize / 1024).toFixed(0)} KB)
                  </span>
                  <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>✓ Đã đính kèm</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            <AppButton variant="outline" type="button" onClick={() => navigate('/')}>
              Hủy bỏ
            </AppButton>
            <AppButton
              variant="primary"
              type="submit"
              loading={loading}
              disabled={isUnderAge}
              icon="📤"
            >
              Nộp Hồ Sơ Đăng Ký
            </AppButton>
          </div>
        </form>
      </div>
    </div>
  );
}
