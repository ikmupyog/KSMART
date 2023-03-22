package org.egov.kssmSnehaswanthanam.repository;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.egov.kssmSnehaswanthanam.repository.querybuilder.SnehaswanthanamQueryBuilder;
import org.egov.kssmSnehaswanthanam.repository.rowmapper.SnehaswanthanamRowMapper;
import org.egov.kssmSnehaswanthanam.web.models.SnehaswanthanamSearchCriteria;
import org.egov.kssmSnehaswanthanam.web.models.m_Snehaswanthanam;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class  SnehaswanthanamRepository {

    private final JdbcTemplate jdbcTemplate;
    private final SnehaswanthanamQueryBuilder queryBuilder;
    private final  SnehaswanthanamRowMapper rowMapper;
    
    public SnehaswanthanamRepository(JdbcTemplate jdbcTemplate, SnehaswanthanamQueryBuilder queryBuilder,
            SnehaswanthanamRowMapper rowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.queryBuilder = queryBuilder;
        this.rowMapper = rowMapper;
    }

    public List<m_Snehaswanthanam> getSnehaswanthanamDetails(@Valid SnehaswanthanamSearchCriteria searchCriteria) {
        List<Object> preparedStmtValues = new ArrayList<>();

        String query = queryBuilder.getSnehaswanthanamDetailSearchQuery(searchCriteria, preparedStmtValues, Boolean.FALSE);
        List<m_Snehaswanthanam> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);
        return result; // NOPMD
    }
    
}
