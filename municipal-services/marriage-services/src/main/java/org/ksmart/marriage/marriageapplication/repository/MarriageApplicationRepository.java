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
    MarriageApplicationRowMapper marriageApplicationRowMapper,WorkflowIntegrator workflowIntegrator,MarriageMdmsUtil util,MarriageMDMSValidator mdmsValidator) {
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
    public List<MarriageApplicationDetails> saveMarriageDetails(MarriageDetailsRequest request) {
       Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getMarriageDetails().get(0).getTenantid());
        //validatorService.validateCommonFields( request);
        mdmsValidator.validateMarriageMDMSData(request,mdmsData);
        marriageDetailsEnrichment.enrichCreate(request);
        producer.push(marriageApplicationConfiguration.getSaveMarriageApplicationTopic(), request);
        workflowIntegrator.callWorkFlow(request);
        request.getMarriageDetails().forEach(marriage->{
            if(marriage.getStatus() == MarriageConstants.STATUS_FOR_PAYMENT){
                List<Demand> demands = new ArrayList<>();
                Demand demand = new Demand();
                demand.setTenantId(marriage.getTenantid());
                demand.setConsumerCode(marriage.getApplicationNumber());
                demands.add(demand);
                marriageDetailsEnrichment.saveDemand(request.getRequestInfo(),demands);
            }
        }); 
        return request.getMarriageDetails();

                //   Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getTenantId());
                //    validatorService.validateCommonFields( request);
                //    mdmsValidator.validateDeathMDMSData(request,mdmsData);
                //    enrichmentService.setPresentAddress(request);
                //    enrichmentService.setPermanentAddress(request);
                //    enrichmentService.enrichCreate(request);
                //    enrichmentService.setACKNumber(request);           
                //   //RAkhi S ikm  on 06.02.2023         
                //    producer.push(deathConfig.getSaveDeathDetailsTopic(), request);
                //    workflowIntegrator.callWorkFlow(request);
         
                //    //Rakhi S on 21.03.2023
                //    request.getDeathCertificateDtls().forEach(death->{
                //         if(death.getApplicationStatus() == DeathConstants.STATUS_FOR_PAYMENT){
                //             List<Demand> demands = new ArrayList<>();
                //             Demand demand = new Demand();
                //             demand.setTenantId(death.getDeathBasicInfo().getTenantId());
                //             demand.setConsumerCode(death.getDeathBasicInfo().getDeathACKNo());
                //             demands.add(demand);
                //             enrichmentService.saveDemand(request.getRequestInfo(),demands);
                //         }
                //     });         
         
                //    return request.getDeathCertificateDtls();
    }

    public List<MarriageApplicationDetails> updateMarriageDetails(MarriageDetailsRequest request) {
        marriageDetailsEnrichment.enrichUpdate(request);
        workflowIntegrator.callWorkFlow(request);
        producer.push(marriageApplicationConfiguration.getUpdateMarriageApplicationTopic(), request);
        return request.getMarriageDetails();
    }

    public List<MarriageApplicationDetails> searchMarriageDetails(MarriageApplicationSearchCriteria criteria) {
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = marriageQueryBuilder.getMarriageApplicationSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<MarriageApplicationDetails> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriageApplicationRowMapper);
        return result;
    }


}
