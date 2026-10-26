package vn.edu.gplx.modules.learning.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.learning.domain.TheoryTopic;

import java.util.List;
import java.util.Optional;

@Repository
public interface TheoryTopicRepository extends JpaRepository<TheoryTopic, Long> {
    List<TheoryTopic> findAllByOrderByOrderIndexAsc();
    Optional<TheoryTopic> findByCode(String code);
}
