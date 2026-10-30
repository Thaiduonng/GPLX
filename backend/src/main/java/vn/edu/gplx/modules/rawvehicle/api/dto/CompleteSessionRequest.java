package vn.edu.gplx.modules.rawvehicle.api.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record CompleteSessionRequest(
        @NotNull(message = "Thời gian bắt đầu thực tế không được để trống")
        LocalDateTime actualStartTime,

        @NotNull(message = "Thời gian kết thúc thực tế không được để trống")
        LocalDateTime actualEndTime,

        String instructorNotes
) {}
