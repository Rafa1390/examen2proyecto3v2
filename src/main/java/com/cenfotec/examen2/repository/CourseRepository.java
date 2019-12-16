package com.cenfotec.examen2.repository;
import com.cenfotec.examen2.domain.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Course entity.
 */
@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    @Query(value = "select distinct course from Course course left join fetch course.students left join fetch course.professors left join fetch course.periods",
        countQuery = "select count(distinct course) from Course course")
    Page<Course> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct course from Course course left join fetch course.students left join fetch course.professors left join fetch course.periods")
    List<Course> findAllWithEagerRelationships();

    @Query("select course from Course course left join fetch course.students left join fetch course.professors left join fetch course.periods where course.id =:id")
    Optional<Course> findOneWithEagerRelationships(@Param("id") Long id);

}
