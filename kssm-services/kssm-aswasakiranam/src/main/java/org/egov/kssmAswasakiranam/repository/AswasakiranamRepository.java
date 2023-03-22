package org.egov.kssmAswasakiranam.repository;

import java.util.ArrayList;
import java.util.List;

import org.egov.kssmAswasakiranam.repository.querybuilder.AswasakiranamQueryBuilder;
import org.egov.kssmAswasakiranam.repository.rowmapper.AswasakiranamRowMapper;
import org.egov.kssmAswasakiranam.web.models.Aswasakiranam.AswasakiranamSearchCriteria;
import org.egov.kssmAswasakiranam.web.models.Aswasakiranam.m_AswasakiranamSearchResponse;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


@Repository
public class AswasakiranamRepository {

    private final JdbcTemplate jdbcTemplate;
    private final AswasakiranamQueryBuilder queryBuilder;
    private final AswasakiranamRowMapper rowMapper;

    public AswasakiranamRepository(JdbcTemplate jdbcTemplate, AswasakiranamQueryBuilder queryBuilder,
    AswasakiranamRowMapper rowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.queryBuilder = queryBuilder;
        this.rowMapper = rowMapper;
    }

    public List<m_AswasakiranamSearchResponse> getDetails(AswasakiranamSearchCriteria criteria) {
        List<Object> preparedStmtValues = new ArrayList<>();

        String query = queryBuilder.getAswasakiranamDetailsSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<m_AswasakiranamSearchResponse> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);
        return result; 

    }

}

