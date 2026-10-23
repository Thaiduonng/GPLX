package vn.edu.gplx.modules.learning.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.learning.domain.TheoryQuestion;

import java.util.List;

@Repository
public interface TheoryQuestionRepository extends JpaRepository<TheoryQuestion, Long> {

    List<TheoryQuestion> findByCategoryCodeOrderByQuestionNumberAsc(String categoryCode);

    List<TheoryQuestion> findByCategoryCodeAndIsParalysisTrue(String categoryCode);

    @Query("SELECT q FROM TheoryQuestion q WHERE q.categoryCode = :categoryCode ORDER BY function('RAND') LIMIT :limit")
    List<TheoryQuestion> findRandomQuestionsByCategory(@Param("categoryCode") String categoryCode, @Param("limit") int limit);
}
