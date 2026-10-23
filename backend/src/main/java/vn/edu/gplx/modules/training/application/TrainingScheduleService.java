package vn.edu.gplx.modules.training.application;

import vn.edu.gplx.modules.training.api.dto.CreateScheduleRequest;
import vn.edu.gplx.modules.training.api.dto.TrainingScheduleResponse;

import java.util.List;

public interface TrainingScheduleService {

    TrainingScheduleResponse createSchedule(CreateScheduleRequest request);

    List<TrainingScheduleResponse> getSchedulesByClass(Long classId);

    List<TrainingScheduleResponse> getSchedulesByInstructor(Long instructorId);
}
