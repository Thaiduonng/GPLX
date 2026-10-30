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
import java.util.Optional;

@Repository
public interface TheoryQuestionRepository extends JpaRepository<TheoryQuestion, Long> {

    @Query("SELECT q FROM TheoryQuestion q WHERE q.active = true AND (:categoryCode IS NULL OR :categoryCode = 'ALL' OR (q.applicableCategories IS NULL AND (q.categoryCode = 'ALL' OR q.categoryCode = :categoryCode)) OR LOCATE(CONCAT(',', :categoryCode, ','), q.applicableCategories) > 0) ORDER BY q.questionNumber")
    List<TheoryQuestion> findByCategoryCodeOrderByQuestionNumberAsc(@Param("categoryCode") String categoryCode);

    @Query("SELECT q FROM TheoryQuestion q WHERE q.active = true AND q.topic.id = :topicId ORDER BY q.questionNumber")
    List<TheoryQuestion> findByTopicIdOrderByQuestionNumberAsc(@Param("topicId") Long topicId);

    @Query("SELECT q FROM TheoryQuestion q WHERE q.active = true AND q.isParalysis = true ORDER BY q.questionNumber")
    List<TheoryQuestion> findByIsParalysisTrueOrderByQuestionNumberAsc();

    @Query("SELECT q FROM TheoryQuestion q WHERE q.active = true AND q.questionNumber = :number")
    Optional<TheoryQuestion> findByQuestionNumber(@Param("number") int questionNumber);

    @Query("SELECT q FROM TheoryQuestion q WHERE q.active = true AND (:categoryCode IS NULL OR :categoryCode = 'ALL' OR (q.applicableCategories IS NULL AND (q.categoryCode = 'ALL' OR q.categoryCode = :categoryCode)) OR LOCATE(CONCAT(',', :categoryCode, ','), q.applicableCategories) > 0) ORDER BY q.questionNumber ASC")
    List<TheoryQuestion> findForLicenseCategory(@Param("categoryCode") String categoryCode);

    @Query("SELECT q FROM TheoryQuestion q WHERE q.active = true AND (:categoryCode IS NULL OR :categoryCode = 'ALL' OR (q.applicableCategories IS NULL AND (q.categoryCode = 'ALL' OR q.categoryCode = :categoryCode)) OR LOCATE(CONCAT(',', :categoryCode, ','), q.applicableCategories) > 0) AND ((q.paralysisCategories IS NULL OR :categoryCode IS NULL OR :categoryCode = 'ALL') AND q.isParalysis = true OR LOCATE(CONCAT(',', :categoryCode, ','), q.paralysisCategories) > 0)")
    List<TheoryQuestion> findParalysisForLicenseCategory(@Param("categoryCode") String categoryCode);

    @Query("SELECT q FROM TheoryQuestion q WHERE q.id IN :ids")
    List<TheoryQuestion> findByIdsIn(@Param("ids") Collection<Long> ids);

    @Query("SELECT q FROM TheoryQuestion q WHERE q.active = true AND (:topicId IS NULL OR q.topic.id = :topicId) " +
            "AND (:categoryCode IS NULL OR :categoryCode = 'ALL' OR (q.applicableCategories IS NULL AND (q.categoryCode = 'ALL' OR q.categoryCode = :categoryCode)) OR LOCATE(CONCAT(',', :categoryCode, ','), q.applicableCategories) > 0) " +
            "AND (:isParalysis IS NULL OR CASE WHEN ((q.paralysisCategories IS NULL OR :categoryCode IS NULL OR :categoryCode = 'ALL') AND q.isParalysis = true OR LOCATE(CONCAT(',', :categoryCode, ','), q.paralysisCategories) > 0) THEN true ELSE false END = :isParalysis) " +
            "AND (:keyword IS NULL OR LOWER(q.content) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<TheoryQuestion> searchQuestionsAdvanced(
            @Param("topicId") Long topicId,
            @Param("categoryCode") String categoryCode,
            @Param("isParalysis") Boolean isParalysis,
            @Param("keyword") String keyword,
            Pageable pageable
    );

    @Query("SELECT q FROM TheoryQuestion q WHERE q.active = true AND (:topicId IS NULL OR q.topic.id = :topicId) AND (:categoryCode IS NULL OR :categoryCode = 'ALL' OR (q.applicableCategories IS NULL AND (q.categoryCode = 'ALL' OR q.categoryCode = :categoryCode)) OR LOCATE(CONCAT(',', :categoryCode, ','), q.applicableCategories) > 0) AND (:isParalysis IS NULL OR CASE WHEN ((q.paralysisCategories IS NULL OR :categoryCode IS NULL OR :categoryCode = 'ALL') AND q.isParalysis = true OR LOCATE(CONCAT(',', :categoryCode, ','), q.paralysisCategories) > 0) THEN true ELSE false END = :isParalysis)")
    Page<TheoryQuestion> searchQuestions(
            @Param("topicId") Long topicId,
            @Param("categoryCode") String categoryCode,
            @Param("isParalysis") Boolean isParalysis,
            Pageable pageable
    );

    @Query("SELECT q FROM TheoryQuestion q WHERE q.active = true AND q.topic.code = :topicCode AND (:categoryCode IS NULL OR :categoryCode = 'ALL' OR (q.applicableCategories IS NULL AND (q.categoryCode = 'ALL' OR q.categoryCode = :categoryCode)) OR LOCATE(CONCAT(',', :categoryCode, ','), q.applicableCategories) > 0) AND (:isParalysis IS NULL OR CASE WHEN ((q.paralysisCategories IS NULL OR :categoryCode IS NULL OR :categoryCode = 'ALL') AND q.isParalysis = true OR LOCATE(CONCAT(',', :categoryCode, ','), q.paralysisCategories) > 0) THEN true ELSE false END = :isParalysis)")
    List<TheoryQuestion> findByTopicCodeAndParalysis(
            @Param("topicCode") String topicCode,
            @Param("categoryCode") String categoryCode,
            @Param("isParalysis") Boolean isParalysis
    );

    @Override
    @Query("SELECT q FROM TheoryQuestion q WHERE q.active = true ORDER BY q.questionNumber")
    List<TheoryQuestion> findAll();

    @Override
    @Query("SELECT COUNT(q) FROM TheoryQuestion q WHERE q.active = true")
    long count();

    @Query("SELECT COUNT(q) FROM TheoryQuestion q WHERE q.active = true AND q.topic.id = :topicId")
    long countByTopicId(@Param("topicId") Long topicId);
}
