# Hướng dẫn Khởi chạy Dự án Môi trường Cục bộ

## 1. Yêu cầu Môi trường cài đặt

- **Hệ điều hành:** Windows 10/11, macOS hoặc Linux.
- **Công cụ bắt buộc:**
  - Git
  - Docker Desktop (Docker Engine v24+ và Docker Compose v2+)
  - Java JDK 21 (nếu chạy trực tiếp ngoài Docker)
  - Node.js v20 LTS (nếu chạy frontend trực tiếp ngoài Docker)

## 2. Hướng dẫn Khởi chạy nhanh bằng Docker Compose

### Bước 1: Chuẩn bị file cấu hình môi trường
Từ thư mục gốc dự án:
```powershell
cp .env.example .env
```
*(Chỉnh sửa mật khẩu trong `.env` nếu cần thiết).*

### Bước 2: Khởi động toàn bộ dịch vụ
```powershell
docker compose up -d --build
```

### Bước 3: Kiểm tra trạng thái dịch vụ
```powershell
docker compose ps
```

Các dịch vụ sẽ sẵn sàng tại:
- **Frontend App:** [http://localhost:3000](http://localhost:3000)
- **Backend Health Check:** [http://localhost:8080/api/v1/health](http://localhost:8080/api/v1/health)
- **OpenAPI Swagger UI:** [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
- **MySQL Server:** `localhost:3306`

## 3. Khởi chạy từng thành phần độc lập (dành cho lập trình viên)

### Chạy Database MySQL qua Docker:
```powershell
docker compose up -d mysql
```

### Chạy Backend (Spring Boot):
```powershell
cd backend
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
# Hoặc trên Windows PowerShell:
.\mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev
```

### Chạy Frontend (React + Vite):
```powershell
cd frontend
npm install
npm run dev
```

## 4. Hướng dẫn Reset toàn bộ dữ liệu Cơ sở dữ liệu

> [!CAUTION]
> Lệnh này sẽ **XÓA SẠCH TOÀN BỘ DỮ LIỆU** trong Docker volume của MySQL và tạo lại từ đầu.

```powershell
docker compose down -v
docker compose up -d
```
