package org.egov.kssmSamaswasamScheme3.repository;

import java.util.ArrayList;
import java.util.List;

import org.egov.kssmSamaswasamScheme3.repository.querybuilder.SamaswasamQueryBuilder;
import org.egov.kssmSamaswasamScheme3.repository.rowmapper.SamaswasamRowMapper;
import org.egov.kssmSamaswasamScheme3.web.models.SamaswasamScheme3.SamaswasamSearchCriteria;
import org.egov.kssmSamaswasamScheme3.web.models.SamaswasamScheme3.m_SamaswasamSearchResponse;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


@Repository
public class SamaswasamRepository {

    private final JdbcTemplate jdbcTemplate;
    private final SamaswasamQueryBuilder queryBuilder;
    private final SamaswasamRowMapper rowMapper;

    public SamaswasamRepository(JdbcTemplate jdbcTemplate, SamaswasamQueryBuilder queryBuilder,
    SamaswasamRowMapper rowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.queryBuilder = queryBuilder;
        this.rowMapper = rowMapper;
    }

    public List<m_SamaswasamSearchResponse> getDetails(SamaswasamSearchCriteria criteria) {
        List<Object> preparedStmtValues = new ArrayList<>();

        String query = queryBuilder.getSamaswasamDetailsSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<m_SamaswasamSearchResponse> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);
        return result; 

    }

}

