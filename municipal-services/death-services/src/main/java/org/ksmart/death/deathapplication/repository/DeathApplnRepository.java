package org.ksmart.death.deathapplication.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.ksmart.death.deathapplication.repository.querybuilder.DeathApplnQueryBuilder;
import org.ksmart.death.deathapplication.repository.rowmapper.DeathApplnRowMapper;
import org.ksmart.death.deathapplication.web.models.DeathDtl;
import org.ksmart.death.deathapplication.web.models.DeathSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
     * Creates repository
     * Jasmine 
     * on 06/02/2023
     */
@Repository
public class DeathApplnRepository {

    
    private final JdbcTemplate jdbcTemplate;
    private final DeathApplnQueryBuilder queryBuilder;
    private final DeathApplnRowMapper rowMapper;

    @Autowired
    DeathApplnRepository(JdbcTemplate jdbcTemplate, DeathApplnQueryBuilder queryBuilder,
                        DeathApplnRowMapper rowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.queryBuilder = queryBuilder;
        this.rowMapper = rowMapper;
    }
     //Jasmine on 07.02.2023
    public List<DeathDtl> getDeathApplication(DeathSearchCriteria criteria) {
        
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getDeathSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<DeathDtl> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);
        return result; 
    }
     //Rakhi S on 08.02.2023
     public List<Map<String, Object>>  getDeathACKDetails(String tenantId,int  Year) {
        
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getDeathAckNoIdQuery(tenantId, Year,preparedStmtValues);
        List<Map<String, Object>> ackDetails= jdbcTemplate.queryForList(query,preparedStmtValues.toArray());
        return ackDetails; 
     }
    
}
