package vn.edu.gplx.modules.examination.api.dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import vn.edu.gplx.modules.examination.domain.ExamType;

import java.time.LocalDate;

public record CreateExamSessionRequest(
        @NotBlank(message = "Tên kỳ thi không được để trống")
        @Size(max = 150, message = "Tên kỳ thi không quá 150 ký tự")
        String name,

        @NotNull(message = "Hạng GPLX sát hạch không được để trống")
        Long categoryId,

        @NotNull(message = "Ngày tổ chức thi không được để trống")
        LocalDate examDate,

        @NotBlank(message = "Địa điểm tổ chức không được để trống")
        @Size(max = 200, message = "Địa điểm không quá 200 ký tự")
        String location,

        @NotNull(message = "Loại kỳ thi không được để trống")
        ExamType examType
) {
}
