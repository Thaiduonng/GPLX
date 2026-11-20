package vn.edu.gplx.modules.learning.infrastructure;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import vn.edu.gplx.modules.learning.domain.TrafficSign;
import vn.edu.gplx.modules.learning.domain.TrafficSignGroup;

import java.util.List;

public interface TrafficSignRepository extends JpaRepository<TrafficSign, Long> {

    @Query("""
            SELECT s FROM TrafficSign s
            WHERE (:q IS NULL OR s.searchText LIKE CONCAT('%', :q, '%'))
              AND (:group IS NULL OR s.group = :group)
            """)
    Page<TrafficSign> search(@Param("q") String normalizedQuery,
                             @Param("group") TrafficSignGroup group,
                             Pageable pageable);

    /** Các phiên bản của cùng một mã, mới nhất (theo id) trước. */
    List<TrafficSign> findByCodeOrderByIdDesc(String code);

    boolean existsByCode(String code);
}
