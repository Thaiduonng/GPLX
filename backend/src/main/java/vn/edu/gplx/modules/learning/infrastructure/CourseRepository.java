package vn.edu.gplx.modules.learning.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.learning.domain.Course;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    Optional<Course> findByCode(String code);

    Optional<Course> findBySlug(String slug);

    List<Course> findByIsActiveTrue();

    List<Course> findByFeaturedTrueAndIsActiveTrue();

    List<Course> findByCategoryIdAndIsActiveTrue(Long categoryId);
}
