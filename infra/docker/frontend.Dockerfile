# ==============================================================================
# Frontend Development Container
# ==============================================================================
FROM node:20-alpine

WORKDIR /app

# Sao chép cấu hình gói thư viện
COPY package.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép mã nguồn giao diện
COPY . .

EXPOSE 3000

# Khởi chạy Vite Dev Server mở rộng cổng cho container host
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
