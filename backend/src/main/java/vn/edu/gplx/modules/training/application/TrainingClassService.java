package vn.edu.gplx.modules.training.application;

import vn.edu.gplx.modules.training.api.dto.CreateClassRequest;
import vn.edu.gplx.modules.training.api.dto.TrainingClassResponse;
import vn.edu.gplx.modules.training.domain.ClassStatus;

import java.util.List;

public interface TrainingClassService {

    TrainingClassResponse createClass(CreateClassRequest request);

    List<TrainingClassResponse> getClasses(ClassStatus status);

    TrainingClassResponse getClassById(Long id);

    void enrollStudent(Long classId, Long studentId);
}
