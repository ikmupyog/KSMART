package org.ksmart.death.crdeathregistry.repository;

import java.util.ArrayList;
import java.util.List;

import org.ksmart.death.crdeathregistry.repository.querybuilder.CrDeathRgistryQueryBuilder;
import org.ksmart.death.crdeathregistry.repository.rowmapper.CrDeathRegistryRowMapper;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryDtl;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.databind.SerializationFeature;

/**
     * Creates CrDeathService
     * Rakhi S IKM
     * on 05.12.2022
     */

@Repository
public class CrDeathRegistryRepository {
    
    private final JdbcTemplate jdbcTemplate;
    private final CrDeathRgistryQueryBuilder queryBuilder;
    private final CrDeathRegistryRowMapper rowMapper;

    @Autowired
    CrDeathRegistryRepository(JdbcTemplate jdbcTemplate, CrDeathRgistryQueryBuilder queryBuilder,CrDeathRegistryRowMapper rowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.queryBuilder = queryBuilder;
        this.rowMapper = rowMapper;
    }

    public List<CrDeathRegistryDtl> getDeathApplication(CrDeathRegistryCriteria criteria) {
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getDeathSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<CrDeathRegistryDtl> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);
        return result; // NOPMD
    }
    //UPDATE
    // public List<CrDeathDtl> getDeathDetails(CrDeathSearchCriteria criteria) {
    //     List<Object> preparedStmtValues = new ArrayList<>();
    //     String query = queryBuilder.getDeathDetailsSearchQuery(criteria, preparedStmtValues, Boolean.FALSE)
    //     List<CrDeathDtl> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);
    //     return result; // NOPMD
    // }



}
