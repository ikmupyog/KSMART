package org.egov.kssmSamaswasam.repository;

import java.util.ArrayList;
import java.util.List;

import org.egov.kssmSamaswasam.repository.querybuilder.SamaswasamQueryBuilder;
import org.egov.kssmSamaswasam.repository.rowmapper.AswasakiranamRowMapper;
import org.egov.kssmSamaswasam.web.models.Aswasakiranam.SamaswasamSearchCriteria;
import org.egov.kssmSamaswasam.web.models.Aswasakiranam.m_SamaswasamSearchResponse;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


@Repository
public class SamaswasamRepository {

    private final JdbcTemplate jdbcTemplate;
    private final SamaswasamQueryBuilder queryBuilder;
    private final AswasakiranamRowMapper rowMapper;

    public SamaswasamRepository(JdbcTemplate jdbcTemplate, SamaswasamQueryBuilder queryBuilder,
    AswasakiranamRowMapper rowMapper) {
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

