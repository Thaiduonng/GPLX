# ==============================================================================
# Stage 1: Build Frontend Assets
# ==============================================================================
FROM node:20-alpine AS build

WORKDIR /app

# Copy package configurations
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy source code
COPY . .

# Build production bundle ra thư mục dist
RUN npm run build

# ==============================================================================
# Stage 2: Production Nginx Server (Multi-stage nhẹ và an toàn)
# ==============================================================================
FROM nginx:alpine

# Copy file cấu hình Nginx tối ưu cho React Router SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy static assets đã build từ Stage 1
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
