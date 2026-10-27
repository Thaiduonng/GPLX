import { Link } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';
import { AppButton, StatCard, Icons } from '../components/ui';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className={styles.container}>
      {/* ========================================================================
          1. HERO BANNER - QUẢNG BÁ CHÍNH & KÊU GỌI ĐĂNG KÝ / ĐĂNG NHẬP
          ======================================================================== */}
      <section className={styles.hero} aria-label="Cổng đào tạo và sát hạch lái xe">
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <Icons.ShieldCheck size={16} />
            <span>CỔNG ĐÀO TẠO & SÁT HẠCH LÁI XE QUỐC GIA</span>
          </div>

          <h1 className={styles.heroTitle}>
            Học Lái Xe Chuẩn Hóa —{' '}
            <span className={styles.heroHighlight}>Tự Tin Vững Tay Lái</span> & Chinh Phục GPLX
          </h1>

          <p className={styles.heroDescription}>
            Nền tảng đào tạo lái xe toàn diện theo tiêu chuẩn của Cục Đường bộ Việt Nam. Tiếp nhận hồ sơ điện tử trực tuyến,
            ôn luyện 600 câu hỏi lý thuyết ứng dụng Spaced Repetition thông minh và giám sát thực hành DAT 100% minh bạch.
          </p>

          {/* Action Buttons: Kêu gọi Đăng ký / Đăng nhập */}
          {isAuthenticated && user ? (
            <div className={styles.userWelcomeCard}>
              <div className={styles.userWelcomeInfo}>
                <div className={styles.userWelcomeHeader}>
                  <Icons.User size={20} className={styles.userIcon} />
                  <h4>Xin chào, {user.fullName || user.username}!</h4>
                </div>
                <p>
                  Tài khoản đã đăng nhập với vai trò:{' '}
                  <strong>{user.roles?.map((r) => r.replace('ROLE_', '')).join(', ')}</strong>.
                </p>
              </div>
              <div className={styles.userWelcomeActions}>
                <Link to="/my-applications">
                  <AppButton variant="secondary" size="sm" icon={<Icons.FileText size={16} />}>
                    Hồ sơ của tôi
                  </AppButton>
                </Link>
                <Link to="/courses">
                  <AppButton
                    variant="outline"
                    size="sm"
                    icon={<Icons.BookOpen size={16} />}
                    style={{ color: 'white', borderColor: 'rgba(255,255,255,0.7)' }}
                  >
                    Xem khóa học
                  </AppButton>
                </Link>
                <Link to="/student/review">
                  <AppButton variant="primary" size="sm" icon={<Icons.RefreshCw size={16} />}>
                    Ôn tập thông minh
                  </AppButton>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.heroActions}>
                <Link to="/register">
                  <AppButton
                    variant="success"
                    size="lg"
                    className={styles.primaryCtaBtn}
                    icon={<Icons.Plus size={18} />}
                  >
                    Đăng Ký Tài Khoản Học Viên Ngay
                  </AppButton>
                </Link>
                <Link to="/login">
                  <AppButton
                    variant="outline"
                    size="lg"
                    className={styles.secondaryCtaBtn}
                    icon={<Icons.User size={18} />}
                  >
                    Đăng Nhập Hệ Thống
                  </AppButton>
                </Link>
              </div>
              <div className={styles.heroTrustBadge}>
                <div className={styles.starsGroup}>
                  <Icons.Star size={16} />
                  <Icons.Star size={16} />
                  <Icons.Star size={16} />
                  <Icons.Star size={16} />
                  <Icons.Star size={16} />
                </div>
                <span>Hơn 15,000+ học viên đã đăng ký và thi đỗ giấy phép lái xe thành công.</span>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ========================================================================
          2. KPI & STATS HIGHLIGHTS (CÁC CON SỐ ẤN TƯỢNG)
          ======================================================================== */}
      <section className={styles.statsSection} aria-label="Các chỉ số ấn tượng">
        <div className={styles.statsGrid}>
          <StatCard
            title="Tỷ lệ thi đỗ lần đầu"
            value="98.6%"
            subtitle="Phương pháp đào tạo khoa học, bám sát đề thi thật"
            icon={<Icons.Award size={24} />}
            variant="success"
          />
          <StatCard
            title="Hạng GPLX đào tạo"
            value="A1, A2, B1, B2, C"
            subtitle="Chuẩn hóa theo quy chuẩn Cục Đường bộ VN"
            icon={<Icons.Car size={24} />}
            variant="primary"
          />
          <StatCard
            title="Giám sát DAT thực tế"
            value="100% km & Giờ"
            subtitle="Nhận diện khuôn mặt & định vị hành trình chuẩn xác"
            icon={<Icons.Activity size={24} />}
            variant="warning"
          />
          <StatCard
            title="Thẩm định hồ sơ online"
            value="Nhanh chóng 24h"
            subtitle="Nộp CCCD & Giấy KSK trực tuyến, không cần chờ đợi"
            icon={<Icons.FileText size={24} />}
            variant="primary"
          />
        </div>
      </section>

      {/* ========================================================================
          3. TẠI SAO NÊN CHỌN HỆ THỐNG ĐÀO TẠO CỦA CHÚNG TÔI? (WHY CHOOSE US)
          ======================================================================== */}
      <section aria-label="Lợi thế vượt trội của hệ thống">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>
            <Icons.ShieldCheck size={14} /> Ưu thế vượt trội
          </span>
          <h2 className={styles.sectionTitle}>Tại sao hơn 15,000 học viên tin chọn hệ thống?</h2>
          <p className={styles.sectionSubtitle}>
            Ứng dụng công nghệ hiện đại vào toàn bộ quy trình học tập, rèn luyện và sát hạch giúp học viên tiết kiệm
            thời gian, tối ưu chi phí và nắm vững kỹ năng lái xe an toàn.
          </p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper} style={{ backgroundColor: '#eff6ff', color: '#1d4ed8' }}>
              <Icons.FileText size={28} />
            </div>
            <h3 className={styles.featureTitle}>Hồ sơ điện tử 100% online</h3>
            <p className={styles.featureDesc}>
              Đăng ký tài khoản và nộp hồ sơ, giấy khám sức khỏe, căn cước công dân trực tiếp trên máy tính hoặc điện
              thoại. Tiếp nhận và thẩm định điện tử chỉ trong 24 giờ làm việc.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper} style={{ backgroundColor: '#f0fdf4', color: '#15803d' }}>
              <Icons.BookOpen size={28} />
            </div>
            <h3 className={styles.featureTitle}>Ôn tập thông minh 600 câu</h3>
            <p className={styles.featureDesc}>
              Thuật toán lặp lại ngắt quãng (Spaced Repetition) với 5 hộp Leitner tự động phát hiện lỗ hổng kiến thức,
              tập trung củng cố câu sai và bảo đảm làm chủ 60 câu hỏi điểm liệt.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper} style={{ backgroundColor: '#fffbeb', color: '#b45309' }}>
              <Icons.Activity size={28} />
            </div>
            <h3 className={styles.featureTitle}>Giám sát DAT minh bạch</h3>
            <p className={styles.featureDesc}>
              Hệ thống kết nối thiết bị DAT trên xe tập lái ghi nhận chính xác 100% quãng đường km và thời gian thực hành
              đường trường, đối soát khuôn mặt học viên theo chuẩn Cục ĐBVN.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconWrapper} style={{ backgroundColor: '#fdf2f8', color: '#be185d' }}>
              <Icons.Award size={28} />
            </div>
            <h3 className={styles.featureTitle}>Đội xe mới & Tỷ lệ đỗ cao</h3>
            <p className={styles.featureDesc}>
              Xe tập lái đời mới có điều hòa mát mẻ, giáo viên kèm cặp tận tâm 1-kèm-1 sa hình. Bộ đề thi thử bám sát đề
              sát hạch thực tế giúp học viên tự tin vượt qua kỳ thi.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================
          4. CÁC HẠNG ĐÀO TẠO & SHOWCASE KHÓA HỌC (CATEGORIES)
          ======================================================================== */}
      <section className={styles.categoriesSection} aria-label="Các hạng GPLX tuyển sinh">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>
            <Icons.Car size={14} /> Khóa học tuyển sinh
          </span>
          <h2 className={styles.sectionTitle}>Các hạng Giấy phép lái xe đang mở tuyển sinh</h2>
          <p className={styles.sectionSubtitle}>
            Đăng ký tài khoản ngay hôm nay để nhận tài liệu học tập chuẩn hóa và sắp xếp lịch học phù hợp nhất.
          </p>
        </div>

        <div className={styles.categoryGrid}>
          {/* Hạng A1 */}
          <div className={styles.categoryCard}>
            <div className={styles.categoryHeader}>
              <span className={styles.categoryBadge}>Hạng A1</span>
              <Icons.Car size={24} style={{ color: 'var(--color-primary)' }} />
            </div>
            <h3 className={styles.categoryTitle}>Mô tô hai bánh</h3>
            <p className={styles.categoryDesc}>Dung tích xylanh từ 50cc đến dưới 175cc. Phù hợp cho người đi làm và sinh viên.</p>
            <ul className={styles.categoryFeatures}>
              <li className={styles.categoryFeatureItem}>
                <Icons.CheckCircle size={15} className={styles.categoryFeatureIcon} />
                <span>Học lý thuyết online 200 câu hỏi</span>
              </li>
              <li className={styles.categoryFeatureItem}>
                <Icons.CheckCircle size={15} className={styles.categoryFeatureIcon} />
                <span>Thực hành sa hình số 8 không giới hạn</span>
              </li>
              <li className={styles.categoryFeatureItem}>
                <Icons.CheckCircle size={15} className={styles.categoryFeatureIcon} />
                <span>Lịch thi sát hạch vào Thứ 7 & Chủ Nhật</span>
              </li>
            </ul>
            <Link to="/register" className={styles.categoryCtaBtn}>
              <AppButton variant="outline" size="sm" fullWidth icon={<Icons.ArrowRight size={15} />}>
                Đăng ký học Hạng A1
              </AppButton>
            </Link>
          </div>

          {/* Hạng B1 */}
          <div className={styles.categoryCard}>
            <div className={styles.categoryHeader}>
              <span className={styles.categoryBadge}>Hạng B1</span>
              <Icons.Car size={24} style={{ color: 'var(--color-primary)' }} />
            </div>
            <h3 className={styles.categoryTitle}>Ô tô số tự động</h3>
            <p className={styles.categoryDesc}>Lái ô tô chở người đến 9 chỗ, xe tải dưới 3.500 kg (không kinh doanh vận tải).</p>
            <ul className={styles.categoryFeatures}>
              <li className={styles.categoryFeatureItem}>
                <Icons.CheckCircle size={15} className={styles.categoryFeatureIcon} />
                <span>Dễ học, không lo tắt máy khi leo dốc sa hình</span>
              </li>
              <li className={styles.categoryFeatureItem}>
                <Icons.CheckCircle size={15} className={styles.categoryFeatureIcon} />
                <span>710km thực hành giám sát DAT đường trường</span>
              </li>
              <li className={styles.categoryFeatureItem}>
                <Icons.CheckCircle size={15} className={styles.categoryFeatureIcon} />
                <span>Xe tập lái Vios, Accent đời mới có máy lạnh</span>
              </li>
            </ul>
            <Link to="/register" className={styles.categoryCtaBtn}>
              <AppButton variant="outline" size="sm" fullWidth icon={<Icons.ArrowRight size={15} />}>
                Đăng ký học Hạng B1
              </AppButton>
            </Link>
          </div>

          {/* Hạng B2 (Phổ biến nhất) */}
          <div className={`${styles.categoryCard} ${styles.popularCategoryCard}`}>
            <span className={styles.popularBadge}>Học viên chọn nhiều nhất</span>
            <div className={styles.categoryHeader}>
              <span className={styles.categoryBadge} style={{ background: '#2563eb', color: '#fff' }}>
                Hạng B2
              </span>
              <Icons.Award size={24} style={{ color: '#2563eb' }} />
            </div>
            <h3 className={styles.categoryTitle}>Ô tô số sàn & số tự động</h3>
            <p className={styles.categoryDesc}>Hành nghề kinh doanh vận tải (taxi, xe dịch vụ, công nghệ) và lái xe gia đình.</p>
            <ul className={styles.categoryFeatures}>
              <li className={styles.categoryFeatureItem}>
                <Icons.CheckCircle size={15} className={styles.categoryFeatureIcon} />
                <span>Nắm vững kỹ năng côn - số chuẩn mực chuyên nghiệp</span>
              </li>
              <li className={styles.categoryFeatureItem}>
                <Icons.CheckCircle size={15} className={styles.categoryFeatureIcon} />
                <span>810km thực hành DAT đường trường & cabin mô phỏng</span>
              </li>
              <li className={styles.categoryFeatureItem}>
                <Icons.CheckCircle size={15} className={styles.categoryFeatureIcon} />
                <span>Học 1-kèm-1, hỗ trợ đưa đón tại các điểm đào tạo</span>
              </li>
            </ul>
            <Link to="/register" className={styles.categoryCtaBtn}>
              <AppButton variant="primary" size="sm" fullWidth icon={<Icons.ArrowRight size={15} />}>
                Đăng ký học Hạng B2
              </AppButton>
            </Link>
          </div>

          {/* Hạng C */}
          <div className={styles.categoryCard}>
            <div className={styles.categoryHeader}>
              <span className={styles.categoryBadge}>Hạng C</span>
              <Icons.Car size={24} style={{ color: 'var(--color-primary)' }} />
            </div>
            <h3 className={styles.categoryTitle}>Ô tô tải hạng nặng</h3>
            <p className={styles.categoryDesc}>Lái xe tải trên 3.500 kg, máy kéo một rơ moóc và toàn bộ các loại xe quy định cho Hạng B.</p>
            <ul className={styles.categoryFeatures}>
              <li className={styles.categoryFeatureItem}>
                <Icons.CheckCircle size={15} className={styles.categoryFeatureIcon} />
                <span>Cơ hội việc làm thu nhập cao trong ngành Logistics</span>
              </li>
              <li className={styles.categoryFeatureItem}>
                <Icons.CheckCircle size={15} className={styles.categoryFeatureIcon} />
                <span>825km DAT đường trường thực tế trên xe tải lớn</span>
              </li>
              <li className={styles.categoryFeatureItem}>
                <Icons.CheckCircle size={15} className={styles.categoryFeatureIcon} />
                <span>Giáo viên nhiều năm kinh nghiệm lái xe đường dài</span>
              </li>
            </ul>
            <Link to="/register" className={styles.categoryCtaBtn}>
              <AppButton variant="outline" size="sm" fullWidth icon={<Icons.ArrowRight size={15} />}>
                Đăng ký học Hạng C
              </AppButton>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================
          5. ROADMAP 4 BƯỚC ĐÀO TẠO & SÁT HẠCH
          ======================================================================== */}
      <section className={styles.roadmapSection} aria-label="Lộ trình 4 bước sở hữu bằng lái">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>
            <Icons.Activity size={14} /> Lộ trình chuẩn hóa
          </span>
          <h2 className={styles.sectionTitle}>Quy trình 4 bước đơn giản để sở hữu GPLX</h2>
          <p className={styles.sectionSubtitle}>
            Từ ngày tạo tài khoản trực tuyến đến ngày nhận Giấy phép lái xe, toàn bộ quá trình được số hóa và đồng hành cùng bạn.
          </p>
        </div>

        <div className={styles.roadmapGrid}>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>1</div>
            <h3 className={styles.stepTitle}>Tạo tài khoản & Nộp hồ sơ</h3>
            <p className={styles.stepDesc}>
              Đăng ký tài khoản học viên trong 2 phút, chụp ảnh CCCD và Giấy khám sức khỏe. Cán bộ tuyển sinh thẩm định hồ sơ trực tuyến.
            </p>
          </div>

          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>2</div>
            <h3 className={styles.stepTitle}>Học lý thuyết & Thi thử</h3>
            <p className={styles.stepDesc}>
              Ôn luyện 600 câu hỏi trắc nghiệm, các tình huống mô phỏng và thi thử trực tiếp theo đề thi chuẩn của Cục Đường bộ.
            </p>
          </div>

          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>3</div>
            <h3 className={styles.stepTitle}>Thực hành sa hình & DAT</h3>
            <p className={styles.stepDesc}>
              Thực hành lái xe sa hình và chạy đường trường tích lũy đủ số km quy định qua thiết bị giám sát hành trình DAT.
            </p>
          </div>

          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>4</div>
            <h3 className={styles.stepTitle}>Sát hạch & Nhận bằng</h3>
            <p className={styles.stepDesc}>
              Tham gia kỳ sát hạch chính thức do Sở GTVT tổ chức và nhận Giấy phép lái xe quốc gia chỉ sau 10-14 ngày.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================
          6. ĐÁNH GIÁ CỦA HỌC VIÊN & CAM KẾT CHẤT LƯỢNG (TESTIMONIALS)
          ======================================================================== */}
      <section aria-label="Đánh giá học viên và cam kết">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>
            <Icons.Star size={14} /> Trải nghiệm thực tế
          </span>
          <h2 className={styles.sectionTitle}>Học viên nói gì về chúng tôi?</h2>
          <p className={styles.sectionSubtitle}>
            Hàng ngàn học viên đã vượt qua kỳ sát hạch tự tin nhờ phương pháp học tập thông minh và đội ngũ giáo viên tận tâm.
          </p>
        </div>

        <div className={styles.testimonialsGrid}>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialStars}>
              <Icons.Star size={16} />
              <Icons.Star size={16} />
              <Icons.Star size={16} />
              <Icons.Star size={16} />
              <Icons.Star size={16} />
            </div>
            <p className={styles.testimonialQuote}>
              "Hệ thống ôn thi 600 câu trên web quá tiện lợi! Nhờ thuật toán gợi ý ôn lại câu sai mà mình không hề bị nhầm lẫn
              60 câu điểm liệt. Đi thi lý thuyết đạt 35/35 điểm ngay lần đầu."
            </p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar}>HM</div>
              <div className={styles.authorInfo}>
                <h5>Hoàng Minh</h5>
                <p>Học viên Hạng B2 — Khóa K45</p>
              </div>
            </div>
          </div>

          <div className={styles.testimonialCard}>
            <div className={styles.testimonialStars}>
              <Icons.Star size={16} />
              <Icons.Star size={16} />
              <Icons.Star size={16} />
              <Icons.Star size={16} />
              <Icons.Star size={16} />
            </div>
            <p className={styles.testimonialQuote}>
              "Nộp hồ sơ online cực kỳ nhanh chóng. Mình bận đi làm cả tuần nên việc đăng ký tài khoản rồi theo dõi lịch học
              thực hành DAT trên điện thoại rất minh bạch, không sợ thiếu km."
            </p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar}>TL</div>
              <div className={styles.authorInfo}>
                <h5>Trần Thị Thùy Linh</h5>
                <p>Học viên Hạng B1 — Khóa K46</p>
              </div>
            </div>
          </div>

          <div className={styles.testimonialCard}>
            <div className={styles.testimonialStars}>
              <Icons.Star size={16} />
              <Icons.Star size={16} />
              <Icons.Star size={16} />
              <Icons.Star size={16} />
              <Icons.Star size={16} />
            </div>
            <p className={styles.testimonialQuote}>
              "Xe tập lái mới, thầy giáo dạy sa hình dốc cầu và lùi chuồng rất kỹ, không hề gắt gỏng. Học phí trọn gói minh
              bạch từ đầu, không phát sinh bất kỳ khoản phí ngoài nào."
            </p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorAvatar}>VT</div>
              <div className={styles.authorInfo}>
                <h5>Vũ Đình Thắng</h5>
                <p>Học viên Hạng C — Khóa K43</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cam kết 3 Không */}
        <div style={{ marginTop: 'var(--space-xl)' }}>
          <div className={styles.commitmentCard}>
            <div className={styles.commitmentItem}>
              <Icons.CheckCircle size={22} className={styles.commitmentIcon} />
              <span>KHÔNG PHÁT SINH CHI PHÍ ẨN</span>
            </div>
            <div className={styles.commitmentItem}>
              <Icons.CheckCircle size={22} className={styles.commitmentIcon} />
              <span>KHÔNG CẮT BỚT GIỜ & KM THỰC HÀNH DAT</span>
            </div>
            <div className={styles.commitmentItem}>
              <Icons.CheckCircle size={22} className={styles.commitmentIcon} />
              <span>BẢO HÀNH ĐÀO TẠO CHO ĐẾN KHI CÓ BẰNG</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          7. FINAL CONVERSION BANNER (KÊU GỌI HÀNH ĐỘNG CUỐI TRANG)
          ======================================================================== */}
      <section className={styles.ctaBanner} aria-label="Kêu gọi đăng ký và đăng nhập">
        <h2 className={styles.ctaBannerTitle}>
          Sẵn sàng làm chủ tay lái và chinh phục Giấy phép lái xe ngay hôm nay?
        </h2>
        <p className={styles.ctaBannerDesc}>
          Chỉ mất 2 phút để tạo tài khoản trực tuyến. Bắt đầu ngay lộ trình đào tạo chuẩn Cục Đường bộ với học phí ưu đãi
          và hỗ trợ nhiệt tình từ ban tuyển sinh.
        </p>
        <div className={styles.ctaBannerActions}>
          <Link to="/register">
            <AppButton
              variant="success"
              size="lg"
              className={styles.primaryCtaBtn}
              icon={<Icons.Plus size={18} />}
            >
              Đăng Ký Tài Khoản Học Viên Mới
            </AppButton>
          </Link>
          <Link to="/login">
            <AppButton
              variant="outline"
              size="lg"
              className={styles.secondaryCtaBtn}
              icon={<Icons.User size={18} />}
            >
              Đăng Nhập Tài Khoản
            </AppButton>
          </Link>
        </div>
      </section>
    </div>
  );
}
