package org.ksmart.marriage.marriageapplication.repository;

// import lombok.extern.slf4j.Slf4j;
//import org.ksmart.marriage.common.producer.BndProducer;

import org.egov.common.contract.request.RequestInfo;
import org.ksmart.marriage.common.contract.EncryptionDecryptionUtil;
import org.ksmart.marriage.common.producer.MarriageProducer;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageapplication.enrichment.MarriageDetailsEnrichment;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.BrideDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.GroomDetails;
//import org.ksmart.marriage.common.producer.MarriageProducer;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageApplicationSearchCriteria;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDocument;
import org.ksmart.marriage.marriageapplication.web.model.marriage.WitnessDetails;
import org.ksmart.marriage.marriageapplication.repository.querybuilder.MarriageApplicationQueryBuilder;
import org.ksmart.marriage.marriageapplication.repository.rowmapper.MarriageApplicationRowMapper;
import org.ksmart.marriage.marriageapplication.validator.MarriageMDMSValidator;
import org.ksmart.marriage.marriageregistry.repository.rowmapper.MarriageRegistryRowMapper;
import org.ksmart.marriage.marriageapplication.repository.rowmapper.MarriageDocumentRowMapper;
import org.ksmart.marriage.utils.MarriageMdmsUtil;
// import org.ksmart.marriage.workflow.WorkflowIntegrator;
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
    private final MarriageRegistryRowMapper marriageRegistryRowMapper;

    private final JdbcTemplate jdbcTemplate;
   // private final WorkflowIntegrator workflowIntegrator;
    private final MarriageMdmsUtil util;
    private final MarriageMDMSValidator mdmsValidator;
    private final MarriageDocumentRowMapper documentRowMapper;

    @Autowired
    EncryptionDecryptionUtil encryptionDecryptionUtil;
    
    @Autowired
    public MarriageApplicationRepository(MarriageProducer producer, MarriageApplicationConfiguration marriageApplicationConfiguration,
                                         JdbcTemplate jdbcTemplate, MarriageDetailsEnrichment marriageDetailsEnrichment, MarriageApplicationQueryBuilder marriageQueryBuilder,
                                         MarriageApplicationRowMapper marriageApplicationRowMapper,
                                         MarriageRegistryRowMapper marriageRegistryRowMapper,
                                         // WorkflowIntegrator workflowIntegrator,
                                         MarriageMdmsUtil util,
                                         MarriageMDMSValidator mdmsValidator,MarriageDocumentRowMapper documentRowMapper) {
        this.producer = producer;
        this.marriageApplicationConfiguration = marriageApplicationConfiguration;
        this.marriageDetailsEnrichment = marriageDetailsEnrichment;
        this.jdbcTemplate = jdbcTemplate;
        this.marriageQueryBuilder = marriageQueryBuilder;
        this.marriageApplicationRowMapper = marriageApplicationRowMapper;
        this.marriageRegistryRowMapper = marriageRegistryRowMapper;
       // this.workflowIntegrator = workflowIntegrator;
        this.util = util;
        this.mdmsValidator = mdmsValidator;
        this.documentRowMapper = documentRowMapper;
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

    // public List<MarriageApplicationDetails> saveMarriageDetails(MarriageDetailsRequest request) {

    //     // marriageDetailsEnrichment.enrichCreate(request);
    //     producer.push(marriageApplicationConfiguration.getSaveMarriageApplicationTopic(), request);
    //     return request.getMarriageDetails();
    // }
    //Jasmine 31.03.2023

    public List<MarriageApplicationDetails> searchMarriageDetails(MarriageApplicationSearchCriteria criteria,RequestInfo requestInfo) {
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = marriageQueryBuilder.getMarriageApplicationSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<MarriageApplicationDetails> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriageApplicationRowMapper);
        // if(result != null) {
		// 	result.forEach(marriage -> {
                              
        //         GroomDetails groomDetails =marriage.getGroomDetails();
        //         GroomDetails groomDetailsDec =  encryptionDecryptionUtil.decryptObject(groomDetails, "BndDetail", GroomDetails.class, requestInfo);
        //         groomDetails.setAadharno(groomDetailsDec.getAadharno());
        //         groomDetails.setMotherAadharno(groomDetailsDec.getMotherAadharno());
        //         groomDetails.setFatherAadharno(groomDetailsDec.getFatherAadharno());
        //         groomDetails.setGuardianAadharno(groomDetailsDec.getGuardianAadharno());
                
        //         BrideDetails brideDetails =marriage.getBrideDetails();
        //         BrideDetails brideDetailsDec =  encryptionDecryptionUtil.decryptObject(brideDetails, "BndDetail", BrideDetails.class, requestInfo);
        //         brideDetails.setAadharno(brideDetailsDec.getAadharno());
        //         brideDetails.setMotherAadharno(brideDetailsDec.getMotherAadharno());
        //         brideDetails.setFatherAadharno(brideDetailsDec.getFatherAadharno());
        //         brideDetails.setGuardianAadharno(brideDetailsDec.getGuardianAadharno());
    
        //         WitnessDetails witnessDetails =marriage.getWitnessDetails();
        //         WitnessDetails witnessDetailsDec =  encryptionDecryptionUtil.decryptObject(witnessDetails, "BndDetail", WitnessDetails.class, requestInfo);
        //         witnessDetails.setWitness1AadharNo(witnessDetailsDec.getWitness1AadharNo());
        //         witnessDetails.setWitness2AadharNo(witnessDetailsDec.getWitness2AadharNo());
                // DeathInformantDtls deathInformant =deathDtl.getDeathInformantDtls() ;
                // if (deathInformant!=null){
                //     DeathInformantDtls deathInformantEnc = encryptionDecryptionUtil.decryptObject(deathInformant, "BndDetail", DeathInformantDtls.class,requestInfo);
                //     deathInformant.setInformantAadharNo(deathInformantEnc.getInformantAadharNo());
                // }
                // DeathInitiatorDtls deathInitiator =deathDtl.getDeathInitiatorDtls() ;
                // if (deathInitiator!= null){
                   
                //     DeathInitiatorDtls deathInitiatorEnc = encryptionDecryptionUtil.decryptObject(deathInitiator, "BndDetail", DeathInitiatorDtls.class,requestInfo);
                //     deathInitiator.setInitiatorAadhaar(deathInitiatorEnc.getInitiatorAadhaar());
                // }
		// 	});
        // }
        
        
        return result;
    }

    public List<MarriageDocument> getDocumentDetails(String documentType, String documentOwner ,String applicationNumber) {
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = marriageQueryBuilder.getMarriageDocumentSearchQuery(documentType,documentOwner,applicationNumber, preparedStmtValues, Boolean.FALSE);
        List<MarriageDocument> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), documentRowMapper);
        return result;
    }   

    public List<MarriageApplicationDetails> getMarriageApplication(MarriageApplicationSearchCriteria criteria, RequestInfo requestInfo) {
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = marriageQueryBuilder.getMarriageApplicationSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<MarriageApplicationDetails> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriageApplicationRowMapper);
        return result;
    }

    }
