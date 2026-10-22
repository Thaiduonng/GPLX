# Ranh giới Module và Quy tắc Tương tác

## 1. Bản đồ phụ thuộc giữa các Module

```text
shared ◄──────────────── (Được sử dụng bởi tất cả các module)

identity ◄────────────── admission, learning, training, examination,
                         crm, finance, fleet, notification, reporting

admission ◄───────────── examination (kiểm tra hồ sơ hợp lệ trước khi thi),
                         finance (liên kết học phí khóa học đăng ký)

learning ◄────────────── examination (kiểm tra tiến độ học lý thuyết)

training ◄────────────── examination (kiểm tra giờ thực hành, dữ liệu DAT),
                         fleet (phân công xe tập lái cho buổi học)
```

## 2. Quy tắc giao tiếp liên module

1. **Không truy cập chéo Repository/Entity:** Module A **tuyệt đối không** inject repository hay câu lệnh query trực tiếp vào bảng nội bộ của Module B.
2. **Giao tiếp qua Service Interface công khai:** Module B cung cấp Interface dịch vụ công khai (VD: `AdmissionVerificationService`) để Module A gọi khi cần thẩm định dữ liệu.
3. **Sử dụng DTO trung gian:** Dữ liệu trao đổi giữa các module phải sử dụng DTO hoặc Domain Event, không trao đổi trực tiếp JPA Entity để tránh hiện tượng Lazy Loading Exception hoặc N+1 query không kiểm soát được.
4. **Không phụ thuộc vòng (No Circular Dependency):** Nếu Module A gọi Module B thì Module B không được phép phụ thuộc ngược lại vào Module A. Khi có nhu cầu phụ thuộc hai chiều, cần tái cấu trúc qua sự kiện bất đồng bộ (Application Events) hoặc đưa nghiệp vụ chung vào một module thứ ba.
