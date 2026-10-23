package vn.edu.gplx.modules.learning.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.learning.domain.LearningProgress;

import java.util.List;
import java.util.Optional;

@Repository
public interface LearningProgressRepository extends JpaRepository<LearningProgress, Long> {

    Optional<LearningProgress> findByUserIdAndLessonId(Long userId, Long lessonId);

    List<LearningProgress> findByUserId(Long userId);

    List<LearningProgress> findByUserIdAndLessonCourseId(Long userId, Long courseId);
}
