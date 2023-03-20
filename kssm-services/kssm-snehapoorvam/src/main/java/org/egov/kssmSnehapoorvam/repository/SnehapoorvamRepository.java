package org.egov.kssmSnehapoorvam.repository;

import java.util.ArrayList;
import java.util.List;

import org.egov.kssmSnehapoorvam.repository.querybuilder.SnehapoorvamQueryBuilder;
import org.egov.kssmSnehapoorvam.repository.rowmapper.SnehapoorvamRowMapper;
import org.egov.kssmSnehapoorvam.web.models.SchoolSearchCriteria;
import org.egov.kssmSnehapoorvam.web.models.SnehapoorvamSchoolReg;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


@Repository
public class SnehapoorvamRepository {

    private final JdbcTemplate jdbcTemplate;
    private final SnehapoorvamQueryBuilder queryBuilder;
    private final SnehapoorvamRowMapper rowMapper;

    public SnehapoorvamRepository(JdbcTemplate jdbcTemplate, SnehapoorvamQueryBuilder queryBuilder,
            SnehapoorvamRowMapper rowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.queryBuilder = queryBuilder;
        this.rowMapper = rowMapper;
    }

    public List<SnehapoorvamSchoolReg> getSchoolDetails(SchoolSearchCriteria criteria) {
        List<Object> preparedStmtValues = new ArrayList<>();

        String query = queryBuilder.getSchoolDatailSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<SnehapoorvamSchoolReg> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);
        return result; // NOPMD

    }

}

