package vn.edu.gplx.modules.learning.infrastructure;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.edu.gplx.modules.learning.domain.TheoryQuestion;

import java.util.Collection;
import java.util.List;

@Repository
public interface TheoryQuestionRepository extends JpaRepository<TheoryQuestion, Long> {

    List<TheoryQuestion> findByCategoryCodeOrderByQuestionNumberAsc(String categoryCode);

    List<TheoryQuestion> findByTopicIdOrderByQuestionNumberAsc(Long topicId);

    List<TheoryQuestion> findByIsParalysisTrueOrderByQuestionNumberAsc();

    @Query("SELECT q FROM TheoryQuestion q WHERE (:categoryCode = 'ALL' OR q.categoryCode = 'ALL' OR q.categoryCode = :categoryCode) ORDER BY q.questionNumber ASC")
    List<TheoryQuestion> findForLicenseCategory(@Param("categoryCode") String categoryCode);

    @Query("SELECT q FROM TheoryQuestion q WHERE (:categoryCode = 'ALL' OR q.categoryCode = 'ALL' OR q.categoryCode = :categoryCode) AND q.isParalysis = true")
    List<TheoryQuestion> findParalysisForLicenseCategory(@Param("categoryCode") String categoryCode);

    @Query("SELECT q FROM TheoryQuestion q WHERE q.id IN :ids")
    List<TheoryQuestion> findByIdsIn(@Param("ids") Collection<Long> ids);

    @Query("SELECT q FROM TheoryQuestion q WHERE (:topicId IS NULL OR q.topic.id = :topicId) AND (:categoryCode IS NULL OR q.categoryCode = :categoryCode OR q.categoryCode = 'ALL') AND (:isParalysis IS NULL OR q.isParalysis = :isParalysis)")
    Page<TheoryQuestion> searchQuestions(
            @Param("topicId") Long topicId,
            @Param("categoryCode") String categoryCode,
            @Param("isParalysis") Boolean isParalysis,
            Pageable pageable
    );

    long countByTopicId(Long topicId);
}
