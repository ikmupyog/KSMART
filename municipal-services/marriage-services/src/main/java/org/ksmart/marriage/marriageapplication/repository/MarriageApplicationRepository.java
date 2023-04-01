package org.ksmart.marriage.marriageapplication.repository;

// import lombok.extern.slf4j.Slf4j;
//import org.ksmart.marriage.common.producer.BndProducer;

import org.ksmart.marriage.common.producer.MarriageProducer;
import org.ksmart.marriage.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageapplication.enrichment.MarriageDetailsEnrichment;
import org.ksmart.marriage.marriageapplication.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.model.Demand.Demand;
//import org.ksmart.marriage.common.producer.MarriageProducer;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageApplicationSearchCriteria;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.marriageapplication.repository.querybuilder.MarriageApplicationQueryBuilder;
import org.ksmart.marriage.marriageapplication.repository.rowmapper.MarriageApplicationRowMapper;
import org.ksmart.marriage.marriageapplication.validator.MarriageMDMSValidator;
import org.ksmart.marriage.utils.MarriageConstants;
import org.ksmart.marriage.utils.MarriageMdmsUtil;
 import org.ksmart.marriage.workflow.WorkflowIntegrator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Repository
public class MarriageApplicationRepository {
    private final MarriageProducer producer;
    private final MarriageApplicationConfiguration marriageApplicationConfiguration;
    private final MarriageDetailsEnrichment marriageDetailsEnrichment;
    private final MarriageApplicationQueryBuilder marriageQueryBuilder;
    private final MarriageApplicationRowMapper marriageApplicationRowMapper;
    private final JdbcTemplate jdbcTemplate;
    private final WorkflowIntegrator workflowIntegrator;
    private final MarriageMdmsUtil util;
    private final MarriageMDMSValidator mdmsValidator;

    @Autowired
    public MarriageApplicationRepository(MarriageProducer producer, MarriageApplicationConfiguration marriageApplicationConfiguration, 
    JdbcTemplate jdbcTemplate, MarriageDetailsEnrichment marriageDetailsEnrichment, MarriageApplicationQueryBuilder marriageQueryBuilder, 
    MarriageApplicationRowMapper marriageApplicationRowMapper,
     WorkflowIntegrator workflowIntegrator,
    MarriageMdmsUtil util,
    MarriageMDMSValidator mdmsValidator) {
        this.producer = producer;
        this.marriageApplicationConfiguration = marriageApplicationConfiguration;
        this.marriageDetailsEnrichment = marriageDetailsEnrichment;
        this.jdbcTemplate = jdbcTemplate;
        this.marriageQueryBuilder = marriageQueryBuilder;
        this.marriageApplicationRowMapper = marriageApplicationRowMapper;
        this.workflowIntegrator = workflowIntegrator;
        this.util = util;
        this.mdmsValidator=mdmsValidator;
    }
    // public List<MarriageApplicationDetails> saveMarriageDetails(MarriageDetailsRequest request) {

    //    // marriageDetailsEnrichment.enrichCreate(request);
    //     producer.push(marriageApplicationConfiguration.getSaveMarriageApplicationTopic(), request);
    //     return request.getMarriageDetails();
    // }

    // public List<MarriageApplicationDetails> updateMarriageDetails(MarriageDetailsRequest request) {
       
    //    // workflowIntegrator.callWorkFlow(request);
    //     producer.push(marriageApplicationConfiguration.getUpdateMarriageApplicationTopic(), request);
    //     return request.getMarriageDetails();
    // }
    //Jasmine 31.03.2023
    // public List<MarriageDetailsRequest> saveMarriageDetails(MarriageDetailsRequest request) {

    //     marriageDetailsEnrichment.enrichCreate(request);
    //     producer.push(marriageApplicationConfiguration.getSaveMarriageApplicationTopic(), request);
    //     return request;
    // }

    // public List<MarriageApplicationDetails> updateMarriageDetails(MarriageDetailsRequest request) {
    //     marriageDetailsEnrichment.enrichUpdate(request);
    //     //workflowIntegrator.callWorkFlow(request);
    //     producer.push(marriageApplicationConfiguration.getUpdateMarriageApplicationTopic(), request);
    //     return request.getMarriageDetails();
    // }

    public List<MarriageApplicationDetails> searchMarriageDetails(MarriageApplicationSearchCriteria criteria) {
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = marriageQueryBuilder.getMarriageApplicationSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<MarriageApplicationDetails> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriageApplicationRowMapper);
        return result;
    }


}
