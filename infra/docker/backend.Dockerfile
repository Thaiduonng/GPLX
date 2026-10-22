# ==============================================================================
# Stage 1: Build Source Code
# ==============================================================================
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

# Copy wrapper và file mô tả dependency để tận dụng Docker cache layer
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# Phân quyền chạy cho maven wrapper
RUN chmod +x mvnw

# Tải trước dependencies (nếu có maven wrapper jar)
# Sao chép toàn bộ mã nguồn
COPY src/ src/

# Build gói ứng dụng (bỏ qua test trong image build)
RUN ./mvnw clean package -DskipTests -B

# ==============================================================================
# Stage 2: Runtime Image (Tối ưu kích thước & Bảo mật)
# ==============================================================================
FROM eclipse-temurin:21-jre

WORKDIR /app

# Tạo non-root user nhằm hạn chế đặc quyền thực thi
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Sao chép file JAR đã build từ stage 1
COPY --from=build /app/target/*.jar app.jar
RUN chown -R appuser:appuser /app

USER appuser

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --retries=3 --start-period=30s \
    CMD curl -f http://localhost:8080/api/v1/health || exit 1

ENTRYPOINT ["java", "-jar", "app.jar"]
