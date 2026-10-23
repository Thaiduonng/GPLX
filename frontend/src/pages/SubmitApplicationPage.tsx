import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { admissionService } from '../services/admissionService';
import { DocumentType, DocumentUploadItem, Gender, LicenseCategory } from '../types/admission';

export default function SubmitApplicationPage() {
  const { user, isAuthenticated } = useAuth();
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
  const [documents, setDocuments] = useState<DocumentUploadItem[]>([
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
        if (data.length > 0) {
          setSelectedCategoryId(data[0].id);
        }
      })
      .catch((err) => {
        setErrorMsg('Không thể tải danh mục hạng GPLX: ' + (err.response?.data?.message || err.message));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!selectedCategoryId) {
      setErrorMsg('Vui lòng chọn hạng bằng lái xe đăng ký.');
      return;
    }

    if (isUnderAge && selectedCategory) {
      setErrorMsg(
        `Quy định: Hạng ${selectedCategory.code} yêu cầu tối thiểu ${selectedCategory.minAge} tuổi (hiện tại bạn ${currentAge} tuổi).`
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
      }, 1800);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Lỗi nộp hồ sơ. Vui lòng kiểm tra lại.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <div style={{ background: '#ffffff', borderRadius: '12px', padding: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
        <h2 style={{ fontSize: '1.6rem', color: '#1e3a8a', marginBottom: '0.5rem', fontWeight: 700 }}>
          📝 Nộp Hồ Sơ Đăng Ký Đào Tạo GPLX
        </h2>
        <p style={{ color: '#4b5563', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          Tiếp nhận hồ sơ điện tử chính quy theo quy chế đào tạo sát hạch lái xe.
        </p>

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

        <form onSubmit={handleSubmit}>
          {/* Hạng bằng lái */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>
              Chọn hạng Giấy phép lái xe <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem' }}
              required
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.code} — {cat.name} (Tuổi tối thiểu: {cat.minAge} | Học phí: {cat.tuitionFee?.toLocaleString('vi-VN')} VNĐ)
                </option>
              ))}
            </select>
            {selectedCategory && (
              <div style={{ background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: '6px', marginTop: '0.5rem', fontSize: '0.875rem', color: '#475569' }}>
                💡 {selectedCategory.description}
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            {/* Họ và tên */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                Họ và tên <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nguyễn Văn A"
                style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
                required
              />
            </div>

            {/* Số CCCD */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                Số CCCD / CMND (9-12 chữ số) <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="text"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                placeholder="001200001234"
                pattern="^[0-9]{9,12}$"
                style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
                required
              />
            </div>

            {/* Ngày sinh */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                Ngày sinh <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: isUnderAge ? '1px solid #ef4444' : '1px solid #d1d5db' }}
                required
              />
              {isUnderAge && (
                <span style={{ fontSize: '0.8rem', color: '#ef4444', marginTop: '0.25rem', display: 'block' }}>
                  ⚠️ Bạn hiện {currentAge} tuổi, chưa đủ điều kiện {selectedCategory?.minAge} tuổi của hạng này.
                </span>
              )}
            </div>

            {/* Giới tính */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                Giới tính <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as Gender)}
                style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
              >
                <option value="MALE">Nam</option>
                <option value="FEMALE">Nữ</option>
                <option value="OTHER">Khác</option>
              </select>
            </div>

            {/* Điện thoại */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                Số điện thoại liên hệ <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0912345678"
                style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                Email nhận thông báo <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hocvien@gmail.com"
                style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
                required
              />
            </div>
          </div>

          {/* Địa chỉ */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
              Địa chỉ thường trú / tạm trú <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Số nhà, đường/phố, phường/xã, quận/huyện, tỉnh/thành phố"
              style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
              required
            />
          </div>

          {/* Danh mục tài liệu đính kèm */}
          <div style={{ marginBottom: '2rem', background: '#f8fafc', padding: '1.25rem', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
            <h4 style={{ fontWeight: 600, color: '#1e3a8a', marginBottom: '0.75rem' }}>
              📎 Tài liệu số hóa đính kèm (Quy chuẩn tiếp nhận hồ sơ)
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem' }}>
              Hệ thống tự động liên kết các tài liệu mẫu đạt chuẩn bảo mật để phục vụ công tác thẩm định.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {documents.map((doc, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#ffffff', padding: '0.6rem 1rem', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.9rem' }}>
                  <span>📄 <strong>{doc.documentType}</strong>: {doc.fileName} ({(doc.fileSize / 1024).toFixed(0)} KB)</span>
                  <span style={{ color: '#16a34a', fontSize: '0.8rem', fontWeight: 600 }}>✓ Sẵn sàng nộp</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button
              type="button"
              onClick={() => navigate('/')}
              style={{ padding: '0.75rem 1.5rem', background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={loading || isUnderAge}
              style={{
                padding: '0.75rem 2rem',
                background: isUnderAge ? '#9ca3af' : '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: isUnderAge ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Đang gửi hồ sơ...' : 'Nộp Hồ Sơ Ngay'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
