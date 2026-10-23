package vn.edu.gplx.modules.training.api.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record CreateClassRequest(
        @NotNull(message = "Khóa học không được để trống")
        Long courseId,

        @NotBlank(message = "Tên lớp học không được để trống")
        @Size(max = 150, message = "Tên lớp học không quá 150 ký tự")
        String name,

        @NotNull(message = "Giảng viên phụ trách không được để trống")
        Long instructorId,

        @NotNull(message = "Ngày khai giảng không được để trống")
        LocalDate startDate,

        @NotNull(message = "Ngày kết thúc không được để trống")
        LocalDate endDate,

        @Min(value = 1, message = "Sĩ số lớp tối thiểu là 1")
        int maxStudents
) {
}
