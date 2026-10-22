# Tổng quan Kiến trúc Hệ thống

## 1. Giới thiệu tổng quan

Hệ thống quản lý đào tạo, sát hạch và cấp giấy phép lái xe (GPLX Training System) là hệ thống thông tin phục vụ cơ sở đào tạo lái xe và học viên. Hệ thống được thiết kế theo mô hình **Modular Monolith**, kết hợp ưu điểm của tính toàn vẹn dữ liệu trong cơ sở dữ liệu quan hệ ACID và khả năng phân định rõ ranh giới nghiệp vụ giúp dễ dàng bảo trì, kiểm thử và mở rộng.

## 2. Sơ đồ Kiến trúc Tổng thể

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                       Giao diện người dùng (Frontend)                       │
│           React 19 + TypeScript + Vite + React Router DOM + Axios           │
│         (Responsive: Desktop & Tablet, Giao diện chuẩn tiếng Việt)          │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       │ REST API (JSON /api/v1/*)
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                  Hệ thống Backend (Spring Boot 4.1.1 - Java 21)             │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │               Lớp Bảo vệ Bảo mật (Spring Security 7.x)                 │  │
│  │             RBAC + Kiểm tra quyền sở hữu tài nguyên dữ liệu           │  │
│  └───────────────────────────────────┬───────────────────────────────────┘  │
│                                      │                                      │
│  ┌───────────────────────────────────▼───────────────────────────────────┐  │
│  │                    Các Module Nghiệp vụ (Modular Monolith)            │  │
│  │                                                                       │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌───────────┐  │  │
│  │  │   identity   │  │  admission   │  │   learning   │  │ training  │  │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  └───────────┘  │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌───────────┐  │  │
│  │  │ examination  │  │     crm      │  │   finance    │  │   fleet   │  │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  └───────────┘  │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────────────────────┐  │  │
│  │  │ notification │  │  reporting   │  │           shared            │  │  │
│  │  └──────────────┘  └──────────────┘  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┬───────────────────────────────────┘  │
│                                      │                                      │
│  ┌───────────────────────────────────▼───────────────────────────────────┐  │
│  │             Tầng Dữ liệu (Spring Data JPA + Hibernate 7.x)            │  │
│  │                      Quản lý Migration qua Flyway                     │  │
│  └───────────────────────────────────┬───────────────────────────────────┘  │
└──────────────────────────────────────┼──────────────────────────────────────┘
                                       │
                                       │ Connection Pool (HikariCP)
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                    Cơ sở dữ liệu MySQL 8.4 LTS Server                       │
│        (Bảng mã utf8mb4 / Collation utf8mb4_unicode_ci / Timezone UTC)      │
└─────────────────────────────────────────────────────────────────────────────┘
```

## 3. Lý do lựa chọn Modular Monolith

1. **Phù hợp với quy mô đồ án tốt nghiệp:** Đảm bảo tính khả thi cao khi triển khai, vận hành và nghiệm thu trong một repository duy nhất mà không phải chịu chi phí phức tạp của microservices (distributed tracing, network latency, distributed transaction).
2. **Bảo đảm tính toàn vẹn dữ liệu (Data Integrity):** Các nghiệp vụ tuyển sinh, học phí, điều kiện thi có mối quan hệ ràng buộc chặt chẽ cần hỗ trợ ACID transactions.
3. **Dễ dàng chuyển đổi trong tương lai:** Ranh giới giữa các module được định nghĩa tường minh, cho phép tách thành các microservice độc lập khi quy mô người dùng tăng vọt mà không phải tái cấu trúc toàn bộ logic.
