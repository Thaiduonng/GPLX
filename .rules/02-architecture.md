# Rule 02 — Kiến trúc Modular Monolith

## 1. Nguyên tắc cốt lõi

- Hệ thống được triển khai dưới dạng **Modular Monolith**: Đóng gói trong một deployable artifact duy nhất nhưng được phân chia ranh giới module nghiệp vụ độc lập, chặt chẽ.
- **Ranh giới module (Module Boundaries):**
  - Mỗi module sở hữu toàn bộ các tầng: Controller/DTO (`api`), Service (`application`), Entity/Domain logic (`domain`), Repository (`infrastructure`).
  - Một module **KHÔNG ĐƯỢC** gọi trực tiếp JPA Repository hoặc thao tác trực tiếp trên Entity nội bộ của module khác.
  - Khi cần giao tiếp giữa các module, bắt buộc thông qua Service Interface công khai được định nghĩa rõ ràng hoặc thông qua Application Event.
  - Tuyệt đối tránh **Circular Dependency** (phụ thuộc vòng) giữa các module.

## 2. Phân tầng chuẩn trong từng Module

```text
vn.edu.gplx.modules.<module_name>/
├── api/
│   ├── <Name>Controller.java      # Chỉ nhận request HTTP, validate và điều phối
│   └── dto/                      # Request / Response DTOs
│       ├── Create<Name>Request.java
│       └── <Name>Response.java
├── application/
│   ├── <Name>Service.java        # Interface định nghĩa nghiệp vụ
│   └── impl/
│       └── <Name>ServiceImpl.java # Triển khai business logic, quản lý transaction
├── domain/
│   ├── <Name>.java               # JPA Entity
│   └── <Name>Status.java         # Enums & Domain rules
└── infrastructure/
    └── <Name>Repository.java     # Spring Data JPA Repository
```

## 3. Quy định trách nhiệm từng tầng

- **API Layer (Controller):**
  - Chịu trách nhiệm tiếp nhận HTTP Request, binding tham số, trigger validation (`@Valid`).
  - Gọi Service tương ứng, nhận kết quả và bọc vào `ApiResponse<T>`.
  - Không chứa bất kỳ câu lệnh SQL hay logic tính toán nghiệp vụ nào.
- **Application Layer (Service):**
  - Nơi thực thi toàn bộ logic nghiệp vụ (business rules, kiểm tra điều kiện, tính toán).
  - Quản lý transaction (`@Transactional`).
  - Chuyển đổi dữ liệu giữa Entity và DTO (không trả trực tiếp Entity ra ngoài).
- **Domain Layer (Entity):**
  - Đại diện cho bảng cơ sở dữ liệu và các quy tắc nghiệp vụ nội tại của đối tượng.
  - Kế thừa `BaseEntity` để tự động ghi nhận thời gian `createdAt`, `updatedAt`.
- **Infrastructure Layer (Repository):**
  - Chỉ thực hiện các thao tác truy vấn dữ liệu từ MySQL thông qua Spring Data JPA.
