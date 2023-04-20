package org.ksmart.marriage.marriageapplication.repository;

// import lombok.extern.slf4j.Slf4j;
//import org.ksmart.marriage.common.producer.BndProducer;

import org.egov.common.contract.request.RequestInfo;
import org.ksmart.marriage.common.contract.EncryptionDecryptionUtil;
import org.ksmart.marriage.common.producer.MarriageProducer;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
//import org.ksmart.marriage.marriageapplication.enrichment.MarriageDetailsEnrichment;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.BrideDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.GroomDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageApplicationSearchCriteria;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDocument;
import org.ksmart.marriage.marriageapplication.web.model.marriage.WitnessDetails;
import org.ksmart.marriage.utils.MarriageConstants;
import org.ksmart.marriage.marriageapplication.repository.querybuilder.MarriageApplicationQueryBuilder;
import org.ksmart.marriage.marriageapplication.repository.rowmapper.MarriageApplicationRowMapper;
import org.ksmart.marriage.marriageapplication.repository.rowmapper.MarriageDocumentRowMapper;
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
    private final MarriageApplicationQueryBuilder marriageQueryBuilder;
    private final MarriageApplicationRowMapper marriageApplicationRowMapper;
    private final JdbcTemplate jdbcTemplate;
    private final MarriageDocumentRowMapper marriagedocumentRowMapper;

    @Autowired
    EncryptionDecryptionUtil encryptionDecryptionUtil;
    
    @Autowired
    public MarriageApplicationRepository(MarriageProducer producer, MarriageApplicationConfiguration marriageApplicationConfiguration,
                                         JdbcTemplate jdbcTemplate, 
                                         MarriageApplicationQueryBuilder marriageQueryBuilder,
                                         MarriageApplicationRowMapper marriageApplicationRowMapper,
                                         MarriageDocumentRowMapper marriagedocumentRowMapper) {
        this.producer = producer;
        this.jdbcTemplate = jdbcTemplate;
        this.marriageQueryBuilder = marriageQueryBuilder;
        this.marriageApplicationRowMapper = marriageApplicationRowMapper;
        this.marriagedocumentRowMapper = marriagedocumentRowMapper;
    }
    //Jasmine 31.03.2023

    public List<MarriageApplicationDetails> searchMarriageDetails(MarriageApplicationSearchCriteria criteria,RequestInfo requestInfo) {
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = marriageQueryBuilder.getMarriageApplicationSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<MarriageApplicationDetails> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriageApplicationRowMapper);
       
        if(result != null) {
			result.forEach(marriage -> {                  
                GroomDetails groomDetails =marriage.getGroomDetails();
                GroomDetails groomDetailsDec =  encryptionDecryptionUtil.decryptObject(groomDetails, "BndDetail", GroomDetails.class, requestInfo);
                groomDetails.setAadharno(groomDetailsDec.getAadharno());
                if (groomDetails.getParentGuardian().equals(MarriageConstants.PARENT)){
                    groomDetails.setMotherAadharno(groomDetailsDec.getMotherAadharno());
                    groomDetails.setFatherAadharno(groomDetailsDec.getFatherAadharno());
                }
                else if (groomDetails.getParentGuardian().equals(MarriageConstants.GUARDIAN)){
                    groomDetails.setGuardianAadharno(groomDetailsDec.getGuardianAadharno());
                }
                BrideDetails brideDetails =marriage.getBrideDetails();
                BrideDetails brideDetailsDec =  encryptionDecryptionUtil.decryptObject(brideDetails, "BndDetail", BrideDetails.class, requestInfo);
                brideDetails.setAadharno(brideDetailsDec.getAadharno());
                if (brideDetails.getParentGuardian().equals(MarriageConstants.PARENT)){
                    brideDetails.setMotherAadharno(brideDetailsDec.getMotherAadharno());
                    brideDetails.setFatherAadharno(brideDetailsDec.getFatherAadharno());
                }
                else  if(brideDetails.getParentGuardian().equals(MarriageConstants.GUARDIAN)){
                    brideDetails.setGuardianAadharno(brideDetailsDec.getGuardianAadharno());
                }
                WitnessDetails witnessDetails =marriage.getWitnessDetails();
                WitnessDetails witnessDetailsDec =  encryptionDecryptionUtil.decryptObject(witnessDetails, "BndDetail", WitnessDetails.class, requestInfo);
                witnessDetails.setWitness1AadharNo(witnessDetailsDec.getWitness1AadharNo());
                witnessDetails.setWitness2AadharNo(witnessDetailsDec.getWitness2AadharNo());

                criteria.setApplicationType(marriage.getApplicationtype());
                criteria.setApplicationNo(marriage.getApplicationNumber());
                criteria.setTenantId(marriage.getTenantid());
                List<MarriageDocument> completeDocumentDetails = getDocumentSearchDetails( criteria, requestInfo);
                marriage.setMarriageDocuments(completeDocumentDetails);
                });
        }
        return result;
    }

        public List<MarriageDocument> getDocumentDetails(MarriageApplicationSearchCriteria criteria,RequestInfo requestInfo) {
            List<Object> preparedStmtValues = new ArrayList<>();
            String query = marriageQueryBuilder.getMarriageDocumentQuery( criteria, preparedStmtValues, Boolean.FALSE);
            List<MarriageDocument> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriagedocumentRowMapper);
            return result;
        }   

        public List<MarriageDocument> getDocumentSearchDetails(MarriageApplicationSearchCriteria criteria,RequestInfo requestInfo) {
            List<Object> preparedStmtValues = new ArrayList<>();
            String query = marriageQueryBuilder.getMarriageDocumentSearchQuery( criteria, preparedStmtValues, Boolean.FALSE);
            List<MarriageDocument> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriagedocumentRowMapper); 
            return result;
        }  

        public List<MarriageApplicationDetails> getMarriageApplication(MarriageApplicationSearchCriteria criteria, RequestInfo requestInfo) {
            List<Object> preparedStmtValues = new ArrayList<>();
            String query = marriageQueryBuilder.getMarriageApplicationSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
            List<MarriageApplicationDetails> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriageApplicationRowMapper);
            return result;
        }

        public int getMarriageCount(MarriageApplicationSearchCriteria criteria) {
            List<Object> preparedStmtList = new ArrayList<>();
            String query = marriageQueryBuilder.getMarriageCountQuery(criteria, preparedStmtList, Boolean.FALSE);
          // System.out.println("searchQuery"+query);
            int MarriageCount = jdbcTemplate.queryForObject(query,preparedStmtList.toArray(),Integer.class);
            return MarriageCount;
        }

    }
