package org.egov.kssmwecare.repository;

import java.util.ArrayList;
import java.util.List;

import org.egov.kssmwecare.repository.querybuilder.WecareQueryBuilder;
import org.egov.kssmwecare.repository.rowmapper.WecareRowMapper;
import org.egov.kssmwecare.web.models.Wecare.WecareSearchCriteria;
import org.egov.kssmwecare.web.models.Wecare.m_WecareSearch;
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

    public List<m_WecareSearch> getDetails(WecareSearchCriteria criteria) {
        List<Object> preparedStmtValues = new ArrayList<>();

        String query = queryBuilder.getWecareDetailsSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<m_WecareSearch> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);
        return result; 

    }


}

