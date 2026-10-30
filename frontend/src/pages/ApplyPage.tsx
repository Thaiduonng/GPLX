import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Icons } from '../components/ui';
import { admissionService } from '../services/admissionService';
import { learningService } from '../services/learningService';
import {
  DocumentUploadItem,
  Gender,
  LicenseCategory,
  SubmitApplicationRequest
} from '../types/admission';
import { Course } from '../types/learning';
import styles from './ApplyPage.module.css';

export const ApplyPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const [currentStep, setCurrentStep] = useState(1);
  const [categories, setCategories] = useState<LicenseCategory[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingInitial, setLoadingInitial] = useState(true);

  // Form State - Step 1: Course selection
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | undefined>(undefined);
  const [selectedCourseId, setSelectedCourseId] = useState<number | undefined>(undefined);
  const [preferredSchedule, setPreferredSchedule] = useState('Cuối tuần (Thứ 7 & CN)');
  const [trainingLocation, setTrainingLocation] = useState('Cơ sở 1 (Trung tâm đào tạo chính)');

  // Form State - Step 2: Personal info
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('2000-01-01');
  const [gender, setGender] = useState<Gender>('MALE');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  // Form State - Step 3: Documents
  const [documents, setDocuments] = useState<DocumentUploadItem[]>([
    {
      documentType: 'NATIONAL_ID_FRONT',
      fileName: 'cccd_mat_truoc.jpg',
      fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=60',
      fileSize: 204800,
      mimeType: 'image/jpeg'
    },
    {
      documentType: 'NATIONAL_ID_BACK',
      fileName: 'cccd_mat_sau.jpg',
      fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=60',
      fileSize: 215000,
      mimeType: 'image/jpeg'
    },
    {
      documentType: 'PORTRAIT_PHOTO',
      fileName: 'anh_chan_dung_3x4.jpg',
      fileUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=60',
      fileSize: 154000,
      mimeType: 'image/jpeg'
    },
    {
      documentType: 'HEALTH_CERTIFICATE',
      fileName: 'giay_kham_suc_khoe.pdf',
      fileUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=600&auto=format&fit=crop&q=60',
      fileSize: 520000,
      mimeType: 'application/pdf'
    }
  ]);

  // Form State - Step 4: Consent & Submit
  const [consentTerms, setConsentTerms] = useState(true);
  const [consentDataProcessing, setConsentDataProcessing] = useState(true);

  // Submission Status
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    applicationCode: string;
    trackingToken?: string;
  } | null>(null);
  const [copiedToken, setCopiedToken] = useState(false);

  useEffect(() => {
    Promise.all([
      admissionService.getActiveCategories(),
      learningService.getCourses()
    ]).then(([cats, crs]) => {
      setCategories(cats || []);
      setCourses(crs || []);

      const paramCatId = searchParams.get('categoryId');
      const paramCourseId = searchParams.get('courseId');

      if (paramCatId) {
        setSelectedCategoryId(Number(paramCatId));
      } else if (cats && cats.length > 0 && cats[0]) {
        setSelectedCategoryId(cats[0].id);
      }

      if (paramCourseId) {
        setSelectedCourseId(Number(paramCourseId));
      } else if (crs && crs.length > 0 && crs[0]) {
        setSelectedCourseId(crs[0].id);
      }
    }).catch(console.error).finally(() => setLoadingInitial(false));
  }, [searchParams]);

  const selectedCategory = categories.find(c => c.id === selectedCategoryId);

  // Validate age rule based on category
  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const currentAge = calculateAge(dateOfBirth);
  const minRequiredAge = selectedCategory?.minAge || 18;
  const isAgeValid = currentAge >= minRequiredAge;

  const handleNextStep = () => {
    setSubmitError(null);
    if (currentStep === 1) {
      if (!selectedCategoryId) {
        setSubmitError('Vui lòng chọn Hạng giấy phép lái xe bạn muốn đăng ký.');
        return;
      }
      setCurrentStep(2);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else if (currentStep === 2) {
      if (!fullName.trim() || !nationalId.trim() || !phone.trim() || !email.trim() || !address.trim()) {
        setSubmitError('Vui lòng điền đầy đủ tất cả thông tin cá nhân bắt buộc (*).');
        return;
      }
      if (!isAgeValid) {
        setSubmitError(`Hạng ${selectedCategory?.code || 'GPLX'} yêu cầu học viên từ đủ ${minRequiredAge} tuổi trở lên. Hiện tại bạn ${currentAge} tuổi.`);
        return;
      }
      if (!/^\d{9,12}$/.test(nationalId.trim())) {
        setSubmitError('Số CCCD/CMND phải gồm từ 9 đến 12 chữ số.');
        return;
      }
      if (!/^\d{9,12}$/.test(phone.trim().replace(/\s+/g, ''))) {
        setSubmitError('Số điện thoại không hợp lệ.');
        return;
      }
      setCurrentStep(3);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else if (currentStep === 3) {
      const hasCccdFront = documents.some(d => d.documentType === 'NATIONAL_ID_FRONT');
      const hasCccdBack = documents.some(d => d.documentType === 'NATIONAL_ID_BACK');
      const hasPortrait = documents.some(d => d.documentType === 'PORTRAIT_PHOTO');

      if (!hasCccdFront || !hasCccdBack || !hasPortrait) {
        setSubmitError('Hồ sơ bắt buộc phải có ảnh CCCD (mặt trước & sau) và ảnh chân dung 3x4.');
        return;
      }
      setCurrentStep(4);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setSubmitError(null);
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleSubmitApplication = async () => {
    if (!consentTerms || !consentDataProcessing) {
      setSubmitError('Vui lòng đồng ý với các cam kết đào tạo và chính sách xử lý dữ liệu cá nhân.');
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);

      const requestPayload: SubmitApplicationRequest = {
        categoryId: selectedCategoryId!,
        courseId: selectedCourseId || undefined,
        fullName: fullName.trim(),
        nationalId: nationalId.trim(),
        dateOfBirth,
        gender,
        phone: phone.trim(),
        email: email.trim(),
        address: address.trim(),
        preferredSchedule,
        trainingLocation,
        consentDataProcessing,
        documents
      };

      const result = await admissionService.submitPublicApplication(requestPayload);
      setSubmittedData({
        applicationCode: result.applicationCode,
        trackingToken: result.trackingToken
      });
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch (err: any) {
      console.error(err);
      setSubmitError(
        err.response?.data?.message ||
        'Đã xảy ra lỗi trong quá trình nộp hồ sơ. Vui lòng kiểm tra lại thông tin và thử lại.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  if (loadingInitial) {
    return (
      <div className={styles.pageWrapper} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div style={{ textAlign: 'center' }}>
          <Icons.Loader size={36} style={{ animation: 'spin 1s linear infinite', color: 'var(--color-primary)' }} />
          <p style={{ marginTop: '1rem', color: 'var(--color-muted-text)', fontWeight: 600 }}>Đang chuẩn bị hồ sơ tuyển sinh...</p>
        </div>
      </div>
    );
  }

  // MÀN HÌNH THÀNH CÔNG
  if (submittedData) {
    return (
      <div className={styles.pageWrapper}>
        <div className={`${styles.cardSurface} ${styles.successContainer}`}>
          <div className={styles.successIconWrap}>
            <Icons.Check size={36} />
          </div>

          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-heading)', margin: '0 0 0.5rem' }}>
            Nộp Hồ Sơ Thành Công!
          </h2>
          <p style={{ color: 'var(--color-body)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
            Hồ sơ điện tử của học viên <strong>{fullName}</strong> đã được hệ thống ghi nhận. Cán bộ tuyển sinh sẽ tiến hành thẩm định trong vòng <strong>24 giờ làm việc</strong>.
          </p>

          <div className={styles.codeBox}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-muted-text)', fontWeight: 700 }}>
                Mã Hồ Sơ Điện Tử
              </div>
              <div className={styles.codeValue}>{submittedData.applicationCode}</div>
            </div>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={() => copyToClipboard(submittedData.applicationCode)}
            >
              <Icons.Copy size={14} />
              {copiedToken ? 'Đã sao chép' : 'Sao chép'}
            </button>
          </div>

          {submittedData.trackingToken && (
            <div style={{ background: 'var(--color-surface)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: '1.5rem', fontSize: '0.8125rem', color: 'var(--color-body)' }}>
              <span>Mã bảo mật tra cứu (Tracking Token): </span>
              <strong style={{ fontFamily: 'var(--font-family-mono)', color: 'var(--color-heading)' }}>{submittedData.trackingToken}</strong>
            </div>
          )}

          <div style={{ textAlign: 'left', background: 'var(--color-surface)', padding: '1.25rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '0.9375rem', fontWeight: 800, margin: '0 0 0.75rem', color: 'var(--color-heading)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icons.Sparkles size={16} style={{ color: 'var(--color-primary)' }} />
              Các bước tiếp theo:
            </h4>
            <ol style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--color-body)', lineHeight: 1.7 }}>
              <li>Bộ phận tuyển sinh kiểm tra tính hợp pháp của CCCD và Giấy khám sức khỏe.</li>
              <li>Thông báo kết quả duyệt hồ sơ hoặc yêu cầu bổ sung sẽ được gửi qua SMS / Zalo theo số <strong>{phone}</strong>.</li>
              <li>Sau khi phê duyệt, học viên sẽ nhận thông báo xếp lớp lý thuyết và phân công giáo viên đào tạo thực hành DAT.</li>
            </ol>
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to={`/application-status?code=${submittedData.applicationCode}&token=${submittedData.trackingToken || ''}`}
              className={styles.nextBtn}
              style={{ textDecoration: 'none' }}
            >
              <Icons.Search size={16} />
              Tra cứu tiến độ hồ sơ ngay
            </Link>
            <Link
              to="/"
              className={styles.backBtn}
              style={{ textDecoration: 'none' }}
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      {/* Page Header */}
      <div className={styles.headerSection}>
        <div className={styles.headerBadge}>
          <Icons.Shield size={14} />
          Cổng tiếp nhận trực tuyến 2026 • Chuẩn Nghị định 13/2023/NĐ-CP
        </div>
        <h1 className={styles.headerTitle}>Đăng Ký Học & Nộp Hồ Sơ GPLX</h1>
        <p className={styles.headerSubtitle}>
          Thủ tục số hóa 100%, bảo mật dữ liệu cá nhân, hỗ trợ liên thông Giấy khám sức khỏe điện tử và tiếp nhận hồ sơ trong 24 giờ.
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className={styles.stepperContainer}>
        <div className={`${styles.stepItem} ${currentStep === 1 ? styles.stepItemActive : currentStep > 1 ? styles.stepItemCompleted : ''}`}>
          <div className={styles.stepCircle}>
            {currentStep > 1 ? <Icons.Check size={16} /> : '1'}
          </div>
          <div className={styles.stepMeta}>
            <span className={styles.stepNumberText}>Bước 1</span>
            <span className={styles.stepTitleText}>Khóa học & Ca học</span>
          </div>
        </div>

        <div className={`${styles.stepItem} ${currentStep === 2 ? styles.stepItemActive : currentStep > 2 ? styles.stepItemCompleted : ''}`}>
          <div className={styles.stepCircle}>
            {currentStep > 2 ? <Icons.Check size={16} /> : '2'}
          </div>
          <div className={styles.stepMeta}>
            <span className={styles.stepNumberText}>Bước 2</span>
            <span className={styles.stepTitleText}>Thông tin cá nhân</span>
          </div>
        </div>

        <div className={`${styles.stepItem} ${currentStep === 3 ? styles.stepItemActive : currentStep > 3 ? styles.stepItemCompleted : ''}`}>
          <div className={styles.stepCircle}>
            {currentStep > 3 ? <Icons.Check size={16} /> : '3'}
          </div>
          <div className={styles.stepMeta}>
            <span className={styles.stepNumberText}>Bước 3</span>
            <span className={styles.stepTitleText}>Tải ảnh hồ sơ</span>
          </div>
        </div>

        <div className={`${styles.stepItem} ${currentStep === 4 ? styles.stepItemActive : ''}`}>
          <div className={styles.stepCircle}>4</div>
          <div className={styles.stepMeta}>
            <span className={styles.stepNumberText}>Bước 4</span>
            <span className={styles.stepTitleText}>Xác nhận & Nộp</span>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {submitError && (
        <div style={{ background: 'var(--color-danger-bg)', border: '1px solid var(--color-danger-border)', color: 'var(--color-danger)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-xl)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9375rem', fontWeight: 600 }}>
          <Icons.AlertTriangle size={20} style={{ flexShrink: 0 }} />
          <span>{submitError}</span>
        </div>
      )}

      {/* STEP 1: Khóa học & Ca học */}
      {currentStep === 1 && (
        <div className={styles.cardSurface}>
          <h2 className={styles.sectionHeading}>
            <Icons.Sparkles size={22} className={styles.headingIcon} />
            Bước 1: Chọn Hạng GPLX & Khóa đào tạo mong muốn
          </h2>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className={styles.formLabel}>
              1. Chọn Hạng bằng lái xe đào tạo <span className={styles.requiredStar}>*</span>
            </label>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted-text)', margin: '2px 0 10px' }}>
              Phân hạng áp dụng theo Luật Trật tự an toàn giao thông đường bộ 2024.
            </p>

            <div className={styles.categoryGrid}>
              {categories.map((cat) => {
                const isSelected = selectedCategoryId === cat.id;
                return (
                  <div
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategoryId(cat.id);
                      // Tìm khóa học tương ứng
                      const matchedCourse = courses.find(c => c.category?.id === cat.id || c.code.includes(cat.code));
                      if (matchedCourse) setSelectedCourseId(matchedCourse.id);
                    }}
                    className={`${styles.categoryCard} ${isSelected ? styles.categoryCardSelected : ''}`}
                  >
                    <div>
                      <div className={styles.categoryCardHeader}>
                        <span className={styles.categoryBadge}>Hạng {cat.code}</span>
                        <span className={styles.ageTag}>Từ {cat.minAge} tuổi</span>
                      </div>
                      <div className={styles.categoryName}>{cat.name}</div>
                      <div className={styles.categoryDesc}>{cat.description}</div>
                    </div>
                    <div className={styles.categoryFee}>
                      <span>Học phí:</span>
                      <strong>{cat.tuitionFee ? `${cat.tuitionFee.toLocaleString('vi-VN')} đ` : 'Liên hệ'}</strong>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                2. Chương trình khóa học
              </label>
              <select
                value={selectedCourseId || ''}
                onChange={e => setSelectedCourseId(Number(e.target.value))}
                className={styles.formSelect}
              >
                {courses.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.totalHours} giờ học - {c.category?.code || 'GPLX'})
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                3. Thời gian học ưu tiên
              </label>
              <select
                value={preferredSchedule}
                onChange={e => setPreferredSchedule(e.target.value)}
                className={styles.formSelect}
              >
                <option value="Cuối tuần (Thứ 7 & CN)">Lớp cuối tuần (Thứ 7 & Chủ Nhật)</option>
                <option value="Buổi tối (18h00 - 21h00)">Lớp buổi tối (18h00 - 21h00)</option>
                <option value="Giờ hành chính (T2 - T6)">Lớp giờ hành chính (Thứ 2 - Thứ 6)</option>
                <option value="Linh hoạt tự sắp xếp với giảng viên">Lịch linh hoạt tự thỏa thuận với giáo viên</option>
              </select>
            </div>

            <div className={`${styles.formGroup} ${styles.formGridFull}`}>
              <label className={styles.formLabel}>
                4. Địa điểm học thực hành & Sân tập sa hình mong muốn
              </label>
              <select
                value={trainingLocation}
                onChange={e => setTrainingLocation(e.target.value)}
                className={styles.formSelect}
              >
                <option value="Cơ sở chính - 136 Xuân Thủy, Cầu Giấy, Hà Nội">Cơ sở chính - 136 Xuân Thủy, Cầu Giấy, Hà Nội</option>
                <option value="Sân tập sa hình Thượng Cát - Bắc Từ Liêm">Sân tập sa hình Thượng Cát - Bắc Từ Liêm</option>
                <option value="Sân tập sa hình số 2 - Khu liên hợp sát hạch">Sân tập sa hình số 2 - Khu liên hợp sát hạch</option>
                <option value="Sân tập lái xe Hà Đông">Sân tập lái xe Hà Đông</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Thông tin cá nhân */}
      {currentStep === 2 && (
        <div className={styles.cardSurface}>
          <h2 className={styles.sectionHeading}>
            <Icons.User size={22} className={styles.headingIcon} />
            Bước 2: Thông tin cá nhân học viên
          </h2>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Họ và tên (viết hoa có dấu) <span className={styles.requiredStar}>*</span>
              </label>
              <input
                type="text"
                required
                placeholder="NGUYỄN VĂN AN"
                value={fullName}
                onChange={e => setFullName(e.target.value.toUpperCase())}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Số CCCD / Hộ chiếu <span className={styles.requiredStar}>*</span>
              </label>
              <input
                type="text"
                required
                placeholder="001200012345"
                value={nationalId}
                onChange={e => setNationalId(e.target.value)}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Ngày sinh <span className={styles.requiredStar}>*</span>
              </label>
              <input
                type="date"
                required
                value={dateOfBirth}
                onChange={e => setDateOfBirth(e.target.value)}
                className={styles.formInput}
              />
              <div>
                {isAgeValid ? (
                  <span className={styles.ageBadgeSuccess}>
                    <Icons.CheckCircle size={14} /> {currentAge} tuổi — Đủ điều kiện độ tuổi ({minRequiredAge}+)
                  </span>
                ) : (
                  <span className={styles.ageBadgeError}>
                    <Icons.AlertTriangle size={14} /> {currentAge} tuổi — Chưa đủ độ tuổi quy định ({minRequiredAge}+)
                  </span>
                )}
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Giới tính <span className={styles.requiredStar}>*</span>
              </label>
              <select
                value={gender}
                onChange={e => setGender(e.target.value as Gender)}
                className={styles.formSelect}
              >
                <option value="MALE">Nam</option>
                <option value="FEMALE">Nữ</option>
                <option value="OTHER">Khác</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Số điện thoại liên hệ <span className={styles.requiredStar}>*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="0912345678"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Địa chỉ Email <span className={styles.requiredStar}>*</span>
              </label>
              <input
                type="email"
                required
                placeholder="nguyenvanan@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={styles.formInput}
              />
            </div>

            <div className={`${styles.formGroup} ${styles.formGridFull}`}>
              <label className={styles.formLabel}>
                Địa chỉ cư trú hiện tại <span className={styles.requiredStar}>*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Số nhà, tên đường, Phường/Xã, Quận/Huyện, Tỉnh/TP"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className={styles.formInput}
              />
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Tải ảnh hồ sơ */}
      {currentStep === 3 && (
        <div className={styles.cardSurface}>
          <h2 className={styles.sectionHeading}>
            <Icons.FileText size={22} className={styles.headingIcon} />
            Bước 3: Tải ảnh hồ sơ giấy tờ điện tử
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-body)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            Vui lòng chụp hoặc tải ảnh rõ nét, không bị lóa sáng, không cắt góc. Hệ thống hỗ trợ ảnh định dạng JPG, PNG hoặc tệp PDF.
          </p>

          <div className={styles.docGrid}>
            {[
              { type: 'NATIONAL_ID_FRONT', label: '1. CCCD / CMND Mặt trước', required: true, desc: 'Rõ số CCCD, ảnh chân dung và thông tin cá nhân' },
              { type: 'NATIONAL_ID_BACK', label: '2. CCCD / CMND Mặt sau', required: true, desc: 'Rõ đặc điểm nhận dạng, ngày cấp và vân tay' },
              { type: 'PORTRAIT_PHOTO', label: '3. Ảnh thẻ 3x4 phông nền trắng', required: true, desc: 'Ảnh chụp thẳng, rõ khuôn mặt, không đeo kính râm' },
              { type: 'HEALTH_CERTIFICATE', label: '4. Giấy khám sức khỏe lái xe', required: false, desc: 'Có kết luận đủ điều kiện lái xe (có thể bổ sung sau)' }
            ].map(item => {
              const currentDoc = documents.find(d => d.documentType === item.type);
              const isUploaded = !!currentDoc;

              return (
                <div key={item.type} className={`${styles.docCard} ${isUploaded ? styles.docCardUploaded : ''}`}>
                  <div>
                    <div className={styles.docHeader}>
                      <div className={styles.docIconWrap}>
                        <Icons.FileText size={18} />
                      </div>
                      <div>
                        <div className={styles.docInfoTitle}>
                          {item.label} {item.required && <span className={styles.requiredStar}>*</span>}
                        </div>
                        <div className={styles.docInfoDesc}>{item.desc}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    {isUploaded ? (
                      <div className={styles.docFileMeta}>
                        <span className={styles.docFileName}>{currentDoc.fileName}</span>
                        <span className={styles.docStatusTag}>
                          <Icons.Check size={14} /> Đã tải lên
                        </span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          const newDoc: DocumentUploadItem = {
                            documentType: item.type as any,
                            fileName: `${item.type.toLowerCase()}_sample.jpg`,
                            fileUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=60',
                            fileSize: 204800,
                            mimeType: 'image/jpeg'
                          };
                          setDocuments(prev => [...prev.filter(d => d.documentType !== item.type), newDoc]);
                        }}
                        style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)', border: '1px dashed var(--color-primary)', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.8125rem', cursor: 'pointer' }}
                      >
                        + Tải lên tệp tin
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 4: Xác nhận & Điều khoản */}
      {currentStep === 4 && (
        <div className={styles.cardSurface}>
          <h2 className={styles.sectionHeading}>
            <Icons.Shield size={22} className={styles.headingIcon} />
            Bước 4: Kiểm tra tóm tắt & Xác nhận đăng ký
          </h2>

          <div className={styles.reviewSummaryBox}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Hạng GPLX đăng ký:</span>
              <span className={styles.summaryValue}>Hạng {selectedCategory?.code} — {selectedCategory?.name}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Học phí đào tạo niêm yết:</span>
              <span className={styles.summaryValue} style={{ color: 'var(--color-primary)', fontSize: '1.1rem' }}>
                {selectedCategory?.tuitionFee ? `${selectedCategory.tuitionFee.toLocaleString('vi-VN')} đ` : 'Theo biểu phí trung tâm'}
              </span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Họ và tên học viên:</span>
              <span className={styles.summaryValue}>{fullName}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Số CCCD / CMND:</span>
              <span className={styles.summaryValue}>{nationalId}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Ngày sinh & Độ tuổi:</span>
              <span className={styles.summaryValue}>{dateOfBirth} ({currentAge} tuổi)</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Số điện thoại:</span>
              <span className={styles.summaryValue}>{phone}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Địa chỉ cư trú:</span>
              <span className={styles.summaryValue}>{address}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Thời gian & Địa điểm tập:</span>
              <span className={styles.summaryValue}>{preferredSchedule} • {trainingLocation}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Tài liệu đính kèm:</span>
              <span className={styles.summaryValue} style={{ color: 'var(--color-success)' }}>
                {documents.length} tệp tài liệu đã sẵn sàng
              </span>
            </div>
          </div>

          <div className={styles.termsBox}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={consentTerms}
                onChange={e => setConsentTerms(e.target.checked)}
                className={styles.checkboxInput}
              />
              <span>
                Tôi cam kết các thông tin khai báo trên là chính xác và chấp hành đầy đủ quy chế học tập, kiểm tra, thi sát hạch cấp GPLX theo quy định của Cục Cảnh sát giao thông.
              </span>
            </label>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={consentDataProcessing}
                onChange={e => setConsentDataProcessing(e.target.checked)}
                className={styles.checkboxInput}
              />
              <span>
                Tôi đồng ý cho phép Trung tâm thu thập, lưu trữ và xử lý dữ liệu cá nhân theo quy định tại <strong>Nghị định 13/2023/NĐ-CP</strong> phục vụ công tác đào tạo và báo cáo quản lý nhà nước.
              </span>
            </label>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className={styles.actionsBar}>
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={handlePrevStep}
            className={styles.backBtn}
            disabled={submitting}
          >
            <Icons.ChevronLeft size={16} />
            Quay lại
          </button>
        ) : (
          <div></div>
        )}

        {currentStep < 4 ? (
          <button
            type="button"
            onClick={handleNextStep}
            className={styles.nextBtn}
          >
            Tiếp tục
            <Icons.ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmitApplication}
            disabled={submitting || !consentTerms || !consentDataProcessing}
            className={styles.nextBtn}
          >
            {submitting ? (
              <>
                <Icons.Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />
                Đang xử lý hồ sơ...
              </>
            ) : (
              <>
                <Icons.Send size={18} />
                Xác nhận & Nộp hồ sơ ngay
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default ApplyPage;
