package org.egov.kssmSnehapoorvam.repository;

import java.util.ArrayList;
import java.util.List;

import org.egov.kssmSnehapoorvam.repository.querybuilder.SnehapoorvamSchoolQueryBuilder;
import org.egov.kssmSnehapoorvam.repository.rowmapper.SnehapoorvamSchoolRowMapper;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvamSchoolMaster.SchoolSearchCriteria;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvamSchoolMaster.m_SnehapoorvamSchoolReg;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


@Repository
public class SnehapoorvamSchoolRepository {

    private final JdbcTemplate jdbcTemplate;
    private final SnehapoorvamSchoolQueryBuilder queryBuilder;
    private final SnehapoorvamSchoolRowMapper rowMapper;

    public SnehapoorvamSchoolRepository(JdbcTemplate jdbcTemplate, SnehapoorvamSchoolQueryBuilder queryBuilder,
            SnehapoorvamSchoolRowMapper rowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.queryBuilder = queryBuilder;
        this.rowMapper = rowMapper;
    }

    public List<m_SnehapoorvamSchoolReg> getSchoolDetails(SchoolSearchCriteria criteria) {
        List<Object> preparedStmtValues = new ArrayList<>();

        String query = queryBuilder.getSchoolDatailSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<m_SnehapoorvamSchoolReg> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);
        return result;

    }

}

