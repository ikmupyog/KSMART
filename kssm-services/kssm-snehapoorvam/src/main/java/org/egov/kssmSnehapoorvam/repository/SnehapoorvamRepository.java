package org.egov.kssmSnehapoorvam.repository;
import java.util.ArrayList;
import java.util.List;

import org.egov.kssmSnehapoorvam.repository.querybuilder.SnehapoorvamQueryBuilder;
import org.egov.kssmSnehapoorvam.repository.rowmapper.SnehapoorvamRowMapper;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvam.m_SnehapoorvamSearchResponse;
import org.egov.kssmSnehapoorvam.web.models.snehapoorvam.snehapoorvamSearchCriteria;
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
    public List<m_SnehapoorvamSearchResponse> getSnehapoorvamDetails(snehapoorvamSearchCriteria criteria) {
        List<Object> preparedStmtValues = new ArrayList<>();

        String query = queryBuilder.getKssmpensionerIdSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<m_SnehapoorvamSearchResponse> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);
        return result; 

    }
}
