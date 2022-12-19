package org.ksmart.death.crdeathregistry.repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egov.common.contract.request.RequestInfo;
import org.ksmart.death.crdeathregistry.repository.querybuilder.CrDeathRgistryQueryBuilder;
import org.ksmart.death.crdeathregistry.repository.rowmapper.CrDeathRegistryRowMapper;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryDtl;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.databind.SerializationFeature;

import ch.qos.logback.core.joran.conditional.ThenAction;

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
    // public String getDeathRegNoold(String tenantId,int  Year) {
        
    //    List<Object> preparedStmtValues = new ArrayList<>();
    //    String result=null;

    //    String query = queryBuilder.getDeathRegNoIdQuery(tenantId, String.valueOf(Year),preparedStmtValues);
    //    List<Map<String,Object>> regno= jdbcTemplate.queryForList(query);
    //    if (regno.size()>1) {
    //      result=String.valueOf(regno.get(0).get("regno"))+"/"+String.valueOf(Year);
    //    }
    //    else{
    //      result="1/"+String.valueOf(Year);
    //    }
    //    System.out.println("JasmineRegNo"+regno);
    //   // regno.put("result",result);
    //    return result; 
    // }

    public List<Map<String, Object>>  getDeathRegDetails(String tenantId,int  Year) {
        
        List<Object> preparedStmtValues = new ArrayList<>();
       // String query = queryBuilder.getDeathRegNoIdQuery(tenantId, String.valueOf(Year),preparedStmtValues);
       String query = queryBuilder.getDeathRegNoIdQuery(tenantId, Year,preparedStmtValues);
        List<Map<String, Object>> regDetails= jdbcTemplate.queryForList(query,preparedStmtValues.toArray());
       // List<> regDetails = jdbcTemplate.query(query, preparedStmtValues.toArray());
        return regDetails; 
     }




}
