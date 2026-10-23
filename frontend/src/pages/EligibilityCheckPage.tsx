import React, { useState, useEffect } from 'react';
import { examinationService } from '../services/examinationService';
import { admissionService } from '../services/admissionService';
import { EligibilityCheckResult } from '../types/examination';
import { LicenseCategory } from '../types/admission';
import { useNavigate } from 'react-router-dom';

export const EligibilityCheckPage: React.FC = () => {
  const [categories, setCategories] = useState<LicenseCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('B1');
  const [result, setResult] = useState<EligibilityCheckResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await admissionService.getCategories();
        setCategories(cats);
        if (cats.length > 0 && !cats.some(c => c.code === 'B1')) {
          setSelectedCategory(cats[0].code);
        }
      } catch (err: any) {
        console.error('Lỗi tải danh mục hạng GPLX', err);
      }
    };
    fetchCategories();
  }, []);

  const handleCheck = async (categoryCode: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await examinationService.checkEligibility(categoryCode);
      setResult(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi kiểm tra điều kiện dự thi.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      handleCheck(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 'bold', color: '#1e293b' }}>
          Xét duyệt điều kiện dự thi sát hạch (EXM-001)
        </h1>
        <p style={{ color: '#64748b', marginTop: '6px' }}>
          Hệ thống tự động thẩm định 3 tiêu chuẩn cốt lõi: Hồ sơ duyệt, Tiến độ lý thuyết 100%, và Thực hành DAT đường trường.
        </p>
      </div>

      {/* Bộ chọn Hạng GPLX */}
      <div style={{ background: '#fff', padding: '16px 20px', borderRadius: '10px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
        <label style={{ display: 'block', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>
          Chọn hạng giấy phép lái xe thẩm định:
        </label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.code)}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: selectedCategory === cat.code ? '2px solid #2563eb' : '1px solid #cbd5e1',
                background: selectedCategory === cat.code ? '#eff6ff' : '#f8fafc',
                color: selectedCategory === cat.code ? '#1d4ed8' : '#475569',
                fontWeight: selectedCategory === cat.code ? 'bold' : 'normal',
                cursor: 'pointer'
              }}
            >
              Hạng {cat.code} - {cat.name}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
          Đang truy vết và đánh giá tự động dữ liệu đào tạo...
        </div>
      )}

      {error && (
        <div style={{ padding: '16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#b91c1c', marginBottom: '20px' }}>
          {error}
        </div>
      )}

      {result && !loading && (
        <div>
          {/* Badge tổng kết */}
          <div
            style={{
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '24px',
              background: result.isEligible ? '#f0fdf4' : '#fffbeb',
              border: result.isEligible ? '1px solid #bbf7d0' : '1px solid #fde68a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: result.isEligible ? '#166534' : '#92400e' }}>
                {result.isEligible
                  ? '✅ ĐỦ ĐIỀU KIỆN DỰ THI SÁT HẠCH / TỐT NGHIỆP'
                  : '⚠️ CHƯA ĐỦ ĐIỀU KIỆN DỰ THI'}
              </div>
              <div style={{ fontSize: '14px', color: result.isEligible ? '#15803d' : '#b45309', marginTop: '4px' }}>
                {result.isEligible
                  ? 'Học viên đã đáp ứng đầy đủ hồ sơ pháp lý, hoàn thành bài học lý thuyết và thời lượng thực hành đường trường theo quy định.'
                  : 'Cần hoàn thành bổ sung các tiêu chí còn thiếu bên dưới trước khi đăng ký kỳ thi.'}
              </div>
            </div>
            {result.isEligible && (
              <button
                onClick={() => navigate('/examination/sessions')}
                style={{
                  padding: '10px 20px',
                  background: '#16a34a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(22,163,74,0.3)'
                }}
              >
                Đăng ký kỳ thi ngay
              </button>
            )}
          </div>

          {/* 3 Tiêu chuẩn kiểm tra */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {/* Tiêu chuẩn 1 */}
            <div style={{ background: '#fff', padding: '18px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontWeight: 600, color: '#334155' }}>1. Hồ sơ điện tử</span>
                <span style={{
                  fontSize: '12px',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: result.isAdmissionApproved ? '#dcfce7' : '#fee2e2',
                  color: result.isAdmissionApproved ? '#15803d' : '#b91c1c',
                  fontWeight: 600
                }}>
                  {result.isAdmissionApproved ? 'ĐÃ DUYỆT (APPROVED)' : 'CHƯA ĐẠT'}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                Hồ sơ tuyển sinh và giấy khám sức khỏe được hội đồng xét duyệt hợp lệ.
              </p>
            </div>

            {/* Tiêu chuẩn 2 */}
            <div style={{ background: '#fff', padding: '18px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontWeight: 600, color: '#334155' }}>2. Lý thuyết trực tuyến</span>
                <span style={{
                  fontSize: '12px',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: result.isTheoryCompleted ? '#dcfce7' : '#fee2e2',
                  color: result.isTheoryCompleted ? '#15803d' : '#b91c1c',
                  fontWeight: 600
                }}>
                  {result.isTheoryCompleted ? 'HOÀN THÀNH 100%' : 'CHƯA ĐẠT'}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                Hoàn thành toàn bộ các bài giảng chuyên đề luật GTĐB & văn hóa giao thông.
              </p>
            </div>

            {/* Tiêu chuẩn 3 */}
            <div style={{ background: '#fff', padding: '18px', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontWeight: 600, color: '#334155' }}>3. Thực hành DAT</span>
                <span style={{
                  fontSize: '12px',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: result.isDatCompleted ? '#dcfce7' : '#fee2e2',
                  color: result.isDatCompleted ? '#15803d' : '#b91c1c',
                  fontWeight: 600
                }}>
                  {result.isDatCompleted ? 'ĐẠT CHỈ TIÊU' : 'CHƯA ĐỦ'}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 6px 0' }}>
                Quãng đường: <strong>{result.datDistanceKm} / {result.targetDatDistanceKm} km</strong>
              </p>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                Thời gian: <strong>{result.datDurationMinutes} / {result.targetDatDurationMinutes} phút</strong>
              </p>
            </div>
          </div>

          {/* Chi tiết các yêu cầu còn thiếu */}
          {result.missingRequirements.length > 0 && (
            <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #fed7aa' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#c2410c', marginBottom: '12px' }}>
                Danh sách các điều kiện cần bổ sung để được dự thi:
              </h3>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#7c2d12', fontSize: '14px', lineHeight: '1.6' }}>
                {result.missingRequirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
