import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { examinationService } from '../services/examinationService';
import { admissionService } from '../services/admissionService';
import type { EligibilityCheckResult } from '../types/examination';
import type { LicenseCategory } from '../types/admission';
import { useNavigate } from 'react-router-dom';
import {
  PageHeader,
  StatusBadge,
  AppButton,
  Alert,
  LoadingSpinner,
} from '../components/ui';

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
        if (cats.length > 0 && cats[0] && !cats.some((c: LicenseCategory) => c.code === 'B1')) {
          setSelectedCategory(cats[0].code);
        }
      } catch (err) {
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
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Có lỗi xảy ra khi kiểm tra điều kiện dự thi.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Lỗi không xác định khi kiểm tra điều kiện.');
      }
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <PageHeader
        title="Xét Duyệt Điều Kiện Dự Thi Sát Hạch (EXM-001)"
        description="Hệ thống tự động thẩm định 3 tiêu chuẩn cốt lõi: Hồ sơ duyệt, Tiến độ lý thuyết 100%, và Thực hành DAT đường trường."
      />

      {/* Bộ chọn Hạng GPLX */}
      <div
        style={{
          backgroundColor: 'var(--color-surface)',
          padding: 'var(--space-4) var(--space-5)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xs)',
          border: '1px solid var(--color-border)',
        }}
      >
        <label
          style={{
            display: 'block',
            fontWeight: 600,
            color: 'var(--color-text-main)',
            fontSize: 'var(--font-size-sm)',
            marginBottom: 'var(--space-3)',
          }}
        >
          Chọn hạng giấy phép lái xe thẩm định:
        </label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.code;
            return (
              <AppButton
                key={cat.id}
                variant={isSelected ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.code)}
              >
                Hạng {cat.code} — {cat.name}
              </AppButton>
            );
          })}
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <LoadingSpinner size="lg" text="Đang truy vết và đối chiếu dữ liệu đào tạo tự động..." />
        </div>
      )}

      {error && (
        <Alert
          type="danger"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      {result && !loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          {/* Tổng kết điều kiện */}
          <div
            style={{
              padding: 'var(--space-6)',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: result.isEligible ? 'var(--color-success-bg)' : 'var(--color-warning-bg)',
              border: `1px solid ${result.isEligible ? 'var(--color-success-border)' : 'var(--color-warning-border)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-4)',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: result.isEligible ? 'var(--color-success)' : 'var(--color-warning)',
                }}
              >
                {result.isEligible
                  ? '✅ ĐỦ ĐIỀU KIỆN DỰ THI SÁT HẠCH / TỐT NGHIỆP'
                  : '⚠️ CHƯA ĐỦ ĐIỀU KIỆN DỰ THI'}
              </div>
              <div
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: result.isEligible ? 'var(--color-success)' : 'var(--color-warning)',
                  marginTop: '4px',
                }}
              >
                {result.isEligible
                  ? 'Học viên đã đáp ứng đầy đủ hồ sơ pháp lý, hoàn thành bài học lý thuyết và thời lượng thực hành đường trường theo quy định.'
                  : 'Cần hoàn thành bổ sung các tiêu chuẩn còn thiếu bên dưới trước khi đăng ký dự thi.'}
              </div>
            </div>
            {result.isEligible && (
              <AppButton
                variant="success"
                onClick={() => navigate('/examination/sessions')}
                icon="📝"
              >
                Đăng ký kỳ thi sát hạch ngay
              </AppButton>
            )}
          </div>

          {/* 3 Tiêu chuẩn kiểm tra */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'var(--space-4)',
            }}
          >
            {/* Tiêu chuẩn 1 */}
            <div
              style={{
                backgroundColor: 'var(--color-surface)',
                padding: 'var(--space-5)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>1. Hồ sơ điện tử</span>
                <StatusBadge
                  variant={result.isAdmissionApproved ? 'success' : 'danger'}
                  label={result.isAdmissionApproved ? 'ĐÃ PHÊ DUYỆT' : 'CHƯA ĐẠT'}
                />
              </div>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                Hồ sơ tuyển sinh, CCCD và giấy khám sức khỏe đã được hội đồng xét duyệt hợp lệ.
              </p>
            </div>

            {/* Tiêu chuẩn 2 */}
            <div
              style={{
                backgroundColor: 'var(--color-surface)',
                padding: 'var(--space-5)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>2. Lý thuyết trực tuyến</span>
                <StatusBadge
                  variant={result.isTheoryCompleted ? 'success' : 'danger'}
                  label={result.isTheoryCompleted ? 'HOÀN THÀNH 100%' : 'CHƯA ĐỦ'}
                />
              </div>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                Hoàn thành toàn bộ các bài giảng chuyên đề luật GTĐB & văn hóa giao thông theo giáo trình.
              </p>
            </div>

            {/* Tiêu chuẩn 3 */}
            <div
              style={{
                backgroundColor: 'var(--color-surface)',
                padding: 'var(--space-5)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-xs)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                <span style={{ fontWeight: 600, color: 'var(--color-text-main)' }}>3. Thực hành DAT</span>
                <StatusBadge
                  variant={result.isDatCompleted ? 'success' : 'danger'}
                  label={result.isDatCompleted ? 'ĐẠT CHỈ TIÊU' : 'CHƯA ĐỦ'}
                />
              </div>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: '0 0 4px 0' }}>
                Quãng đường: <strong>{result.datDistanceKm} / {result.targetDatDistanceKm} km</strong>
              </p>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
                Thời gian: <strong>{(result.datDurationMinutes / 60).toFixed(1)} / {(result.targetDatDurationMinutes / 60).toFixed(0)} giờ</strong>
              </p>
            </div>
          </div>

          {/* Chi tiết các yêu cầu còn thiếu */}
          {result.missingRequirements.length > 0 && (
            <div
              style={{
                backgroundColor: 'var(--color-surface)',
                padding: 'var(--space-5)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-warning-border)',
              }}
            >
              <h4 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--color-warning)', marginBottom: 'var(--space-2)' }}>
                📋 Danh sách các điều kiện cần bổ sung để đủ tiêu chuẩn dự thi:
              </h4>
              <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', lineHeight: 1.6 }}>
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
export default EligibilityCheckPage;
