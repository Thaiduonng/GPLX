package vn.edu.gplx.modules.learning.infrastructure;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.PageRequest;
import vn.edu.gplx.modules.learning.domain.TheoryQuestion;
import vn.edu.gplx.modules.learning.domain.TheoryTopic;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class VersionedQuestionBankIntegrationTest {
    @Autowired TheoryQuestionRepository questions;
    @Autowired TheoryTopicRepository topics;

    private TheoryQuestion question(int number, String categories, String critical, boolean active, TheoryTopic topic) {
        TheoryQuestion q = new TheoryQuestion("ALL", number, "Câu thử " + number, null, null, !critical.equals(",,"));
        q.setApplicableCategories(categories);
        q.setParalysisCategories(critical);
        q.setActive(active);
        q.setTopic(topic);
        return questions.saveAndFlush(q);
    }

    @Test
    void should_filterCurrentBankAndRetainArchivedId_when_versionsShareNumber() {
        TheoryQuestion old = question(1, ",B,", ",,", false, null);
        TheoryQuestion current = question(1, ",B,A1,", ",,", true, null);
        assertThat(questions.findByQuestionNumber(1)).contains(current);
        assertThat(questions.findAll()).contains(current).doesNotContain(old);
        assertThat(questions.findById(old.getId())).contains(old);
        assertThat(questions.count()).isEqualTo(1);
    }

    @Test
    void should_useExactMembershipAndCategoryCriticalRule_when_sameQuestionHasDifferentScopes() {
        TheoryTopic topic = topics.saveAndFlush(new TheoryTopic("TEST_SCOPE", "Quy tắc", null, 1, 2, 1));
        TheoryQuestion carCritical = question(32, ",A,A1,B,B1,", ",B,", true, topic);
        TheoryQuestion truck = question(250, ",C1,", ",,", true, topic);
        assertThat(questions.findForLicenseCategory("A1")).containsExactly(carCritical);
        assertThat(questions.findForLicenseCategory("C")).isEmpty();
        assertThat(questions.findForLicenseCategory("C1")).containsExactly(truck);
        assertThat(questions.findParalysisForLicenseCategory("A1")).isEmpty();
        assertThat(questions.findParalysisForLicenseCategory("B")).containsExactly(carCritical);
        assertThat(questions.findByTopicCodeAndParalysis("TEST_SCOPE", "A1", false)).containsExactly(carCritical);
        assertThat(questions.findByTopicCodeAndParalysis("TEST_SCOPE", "B", false)).isEmpty();
        assertThat(questions.searchQuestionsAdvanced(topic.getId(), "A1", false, null, PageRequest.of(0, 10)).getContent()).containsExactly(carCritical);
        assertThat(carCritical.isParalysisForCategory("A1")).isFalse();
        assertThat(carCritical.isParalysisForCategory("B")).isTrue();
    }

    @Test
    void should_hideArchivedChapters_when_readingCurrentTopics() {
        TheoryTopic old = new TheoryTopic("OLD_TEST", "Cũ", null, 1, 1, 0);
        old.setActive(false); topics.saveAndFlush(old);
        TheoryTopic current = topics.saveAndFlush(new TheoryTopic("NEW_TEST", "Mới", null, 1, 1, 0));
        assertThat(topics.findAllByOrderByOrderIndexAsc()).contains(current).doesNotContain(old);
        assertThat(topics.findById(old.getId())).contains(old);
    }
}
