package vn.edu.gplx.modules.training.application.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.edu.gplx.modules.learning.domain.Course;
import vn.edu.gplx.modules.learning.infrastructure.CourseRepository;
import vn.edu.gplx.modules.training.api.dto.CreateClassRequest;
import vn.edu.gplx.modules.training.api.dto.TrainingClassResponse;
import vn.edu.gplx.modules.training.application.TrainingClassService;
import vn.edu.gplx.modules.training.domain.ClassEnrollment;
import vn.edu.gplx.modules.training.domain.ClassStatus;
import vn.edu.gplx.modules.training.domain.TrainingClass;
import vn.edu.gplx.modules.training.infrastructure.ClassEnrollmentRepository;
import vn.edu.gplx.modules.training.infrastructure.TrainingClassRepository;
import vn.edu.gplx.shared.exception.BusinessRuleViolationException;
import vn.edu.gplx.shared.exception.ResourceNotFoundException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
@Transactional
public class TrainingClassServiceImpl implements TrainingClassService {

    private static final Logger log = LoggerFactory.getLogger(TrainingClassServiceImpl.class);

    private final TrainingClassRepository classRepository;
    private final CourseRepository courseRepository;
    private final ClassEnrollmentRepository enrollmentRepository;

    public TrainingClassServiceImpl(TrainingClassRepository classRepository,
                                    CourseRepository courseRepository,
                                    ClassEnrollmentRepository enrollmentRepository) {
        this.classRepository = classRepository;
        this.courseRepository = courseRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    @Override
    public TrainingClassResponse createClass(CreateClassRequest request) {
        Course course = courseRepository.findById(request.courseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", request.courseId()));

        if (request.startDate().isAfter(request.endDate())) {
            throw new BusinessRuleViolationException("TRN-003", "Ngày khai giảng không được sau ngày kết thúc khóa học.");
        }

        String classCode = generateClassCode(course.getCode());

        TrainingClass trainingClass = new TrainingClass(
                course,
                classCode,
                request.name(),
                request.instructorId(),
                request.startDate(),
                request.endDate(),
                request.maxStudents()
        );

        TrainingClass saved = classRepository.save(trainingClass);
        log.info("Training class {} created successfully by instructor {}", saved.getClassCode(), request.instructorId());

        return toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TrainingClassResponse> getClasses(ClassStatus status) {
        List<TrainingClass> classes = status != null
                ? classRepository.findByStatus(status)
                : classRepository.findAll();

        return classes.stream().map(this::toResponse).toList();
    }

    @Override
    @Transactional(readOnly = true)
    public TrainingClassResponse getClassById(Long id) {
        TrainingClass trainingClass = classRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("TrainingClass", "id", id));
        return toResponse(trainingClass);
    }

    @Override
    public void enrollStudent(Long classId, Long studentId) {
        TrainingClass trainingClass = classRepository.findById(classId)
                .orElseThrow(() -> new ResourceNotFoundException("TrainingClass", "id", classId));

        if (enrollmentRepository.existsByTrainingClassIdAndUserId(classId, studentId)) {
            throw new BusinessRuleViolationException("TRN-004", "Học viên này đã được phân vào lớp học.");
        }

        List<ClassEnrollment> currentEnrollments = enrollmentRepository.findByTrainingClassId(classId);
        if (currentEnrollments.size() >= trainingClass.getMaxStudents()) {
            throw new BusinessRuleViolationException(
                    "TRN-005",
                    String.format("Lớp học đã đạt sĩ số tối đa (%d học viên).", trainingClass.getMaxStudents())
            );
        }

        ClassEnrollment enrollment = new ClassEnrollment(trainingClass, studentId);
        enrollmentRepository.save(enrollment);
        log.info("Student {} enrolled in class {}", studentId, trainingClass.getClassCode());
    }

    private String generateClassCode(String courseCode) {
        String dateStr = LocalDate.now().format(DateTimeFormatter.ofPattern("yyMM"));
        int rand = ThreadLocalRandom.current().nextInt(100, 999);
        return String.format("CLS-%s-%s-%d", courseCode.replace("COURSE-", ""), dateStr, rand);
    }

    private TrainingClassResponse toResponse(TrainingClass tc) {
        int enrolledCount = tc.getEnrollments() != null ? tc.getEnrollments().size() : 0;
        return new TrainingClassResponse(
                tc.getId(),
                tc.getCourse().getId(),
                tc.getCourse().getTitle(),
                tc.getClassCode(),
                tc.getName(),
                tc.getInstructorId(),
                tc.getStartDate(),
                tc.getEndDate(),
                tc.getMaxStudents(),
                enrolledCount,
                tc.getStatus(),
                tc.getCreatedAt()
        );
    }
}
