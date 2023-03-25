package org.egov.kssmwecare.repository;

import java.util.ArrayList;
import java.util.List;

import org.egov.kssmwecare.repository.querybuilder.WecareQueryBuilder;
import org.egov.kssmwecare.repository.rowmapper.WecareRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


@Repository
public class WecareRepository {

    private final JdbcTemplate jdbcTemplate;
    private final WecareQueryBuilder queryBuilder;
    private final WecareRowMapper rowMapper;

    public WecareRepository(JdbcTemplate jdbcTemplate, WecareQueryBuilder queryBuilder,
    WecareRowMapper rowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.queryBuilder = queryBuilder;
        this.rowMapper = rowMapper;
    }

    // public List<m_AswasakiranamSearchResponse> getDetails(AswasakiranamSearchCriteria criteria) {
    //     List<Object> preparedStmtValues = new ArrayList<>();

    //     String query = queryBuilder.getAswasakiranamDetailsSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
    //     List<m_AswasakiranamSearchResponse> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);
    //     return result; 

    // }

}

