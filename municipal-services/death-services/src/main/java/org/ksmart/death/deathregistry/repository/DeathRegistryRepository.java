package org.ksmart.death.deathregistry.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


import org.ksmart.death.deathregistry.repository.querybuilder.DeathRegistryQueryBuilder;
import org.ksmart.death.deathregistry.repository.rowmapper.DeathRegistryRowMapper;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCriteria;
import org.ksmart.death.deathregistry.web.models.DeathRegistryDtl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
     * Creates repository
     * Jasmine 
     * on 08/02/2023
     */
@Repository
public class DeathRegistryRepository {

    
    private final JdbcTemplate jdbcTemplate;
    private final DeathRegistryQueryBuilder queryBuilder;
    private final DeathRegistryRowMapper rowMapper;

    @Autowired
    DeathRegistryRepository(JdbcTemplate jdbcTemplate, DeathRegistryQueryBuilder queryBuilder,DeathRegistryRowMapper rowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.queryBuilder = queryBuilder;
        this.rowMapper = rowMapper;
    }
    public List<DeathRegistryDtl> getDeathApplication(DeathRegistryCriteria criteria) {
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getDeathSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<DeathRegistryDtl> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);
        return result; 
    }
    //Rakhi S on 10.02.2023
    public List<Map<String, Object>>  getDeathRegDetails(String tenantId,int  Year) {
        
        List<Object> preparedStmtValues = new ArrayList<>();
       String query = queryBuilder.getDeathRegNoIdQuery(tenantId, Year,preparedStmtValues);
        List<Map<String, Object>> regDetails= jdbcTemplate.queryForList(query,preparedStmtValues.toArray());
        return regDetails; 
     }

    
}
