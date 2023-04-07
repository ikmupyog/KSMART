package org.ksmart.death.deathapplication.repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.ksmart.death.deathapplication.repository.querybuilder.DeathApplnQueryBuilder;
import org.ksmart.death.deathapplication.repository.rowmapper.DeathAbandonedRowMapper;
import org.ksmart.death.deathapplication.repository.rowmapper.DeathApplnRowMapper;
import org.ksmart.death.deathapplication.repository.rowmapper.DeathCorrectionRowMapper;
import org.ksmart.death.deathapplication.repository.rowmapper.DeathNACRowMapper;
import org.ksmart.death.deathapplication.util.DeathConstants;
import org.ksmart.death.deathapplication.util.DeathMdmsUtil;
import org.ksmart.death.deathapplication.web.models.DeathAbandonedDtls;
import org.ksmart.death.deathapplication.web.models.DeathAbandonedInformantDtls;
import org.ksmart.death.deathapplication.web.models.DeathBasicInfo;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionBasicInfo;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionDtls;
import org.ksmart.death.deathapplication.web.models.DeathDtl;
import org.ksmart.death.deathapplication.web.models.DeathFamilyInfo;
import org.ksmart.death.deathapplication.web.models.DeathInformantDtls;
import org.ksmart.death.deathapplication.web.models.DeathInitiatorDtls;
import org.ksmart.death.deathapplication.web.models.DeathNACApplicantDtls;
import org.ksmart.death.deathapplication.web.models.DeathNACDtls;
import org.ksmart.death.deathapplication.web.models.DeathSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.ksmart.death.common.contract.EncryptionDecryptionUtil;
import org.egov.common.contract.request.RequestInfo;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.egov.tracer.model.CustomException;
import com.jayway.jsonpath.JsonPath;

import lombok.extern.slf4j.Slf4j;

/**
     * Creates repository
     * Jasmine 
     * on 06/02/2023
     */
@Slf4j
@Repository
public class DeathApplnRepository {

    @Autowired
    EncryptionDecryptionUtil encryptionDecryptionUtil;

    //Rakhi S on 02.03.2023
    @Autowired
    DeathMdmsUtil util;

    private final JdbcTemplate jdbcTemplate;
    private final DeathApplnQueryBuilder queryBuilder;
    private final DeathApplnRowMapper rowMapper;
    private final DeathCorrectionRowMapper correctionRowMapper;
    //rakhi S on 08.03.2023
    private final DeathAbandonedRowMapper abandonedRowMapper;
    //rakhi S on 30.03.2023
    private final DeathNACRowMapper deathNACRowMapper;

    @Autowired
    DeathApplnRepository(JdbcTemplate jdbcTemplate, DeathApplnQueryBuilder queryBuilder,
                        DeathApplnRowMapper rowMapper ,DeathCorrectionRowMapper correctionRowMapper,
                        DeathAbandonedRowMapper abandonedRowMapper,DeathNACRowMapper deathNACRowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.queryBuilder = queryBuilder;
        this.rowMapper = rowMapper;
        this.correctionRowMapper = correctionRowMapper;
        this.abandonedRowMapper = abandonedRowMapper;
        this.deathNACRowMapper = deathNACRowMapper;
    }
     //Jasmine on 07.02.2023
    public List<DeathDtl> getDeathApplication(DeathSearchCriteria criteria,RequestInfo requestInfo) {
        
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getDeathSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        // System.out.println("Query:"+query);
        List<DeathDtl> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);
        if(result != null) {
			result.forEach(deathDtl -> {
              
                DeathBasicInfo deathBasicDtls =deathDtl.getDeathBasicInfo();
                //deathBasicDtls.setDeceasedAadharNumber(encryptionDecryptionUtil.decryptObject(deathBasicDtls.getDeceasedAadharNumber(), "BndDetail", DeathBasicInfo.class,requestInfo));
                DeathBasicInfo dec = encryptionDecryptionUtil.decryptObject(deathBasicDtls, "BndDetail", DeathBasicInfo.class, requestInfo);
                deathBasicDtls.setDeceasedAadharNumber(dec.getDeceasedAadharNumber());

                deathBasicDtls.setFatherAadharNo(dec.getFatherAadharNo());
                deathBasicDtls.setMotherAadharNo(dec.getMotherAadharNo());
                deathBasicDtls.setSpouseAadhaar(dec.getSpouseAadhaar());
                
                DeathFamilyInfo deathFamilyDtls =deathDtl.getDeathFamilyInfo() ;
                DeathFamilyInfo deathFamilyDcr = encryptionDecryptionUtil.decryptObject(deathFamilyDtls, "BndDetail", DeathFamilyInfo.class,requestInfo);
                deathFamilyDtls.setFatherAadharNo(deathFamilyDcr.getFatherAadharNo());

                deathFamilyDtls.setMotherAadharNo(deathFamilyDcr.getMotherAadharNo());
                deathFamilyDtls.setSpouseAadhaar(deathFamilyDcr.getSpouseAadhaar()); 
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
                //Rakhi S on 02.03.2023 Mdms call  
                if(DeathConstants.DEATH_PLACE_HOSPITAL.toString().equals(deathDtl.getDeathBasicInfo().getDeathPlace())){
                    Object mdmsDataHospital = util.mDMSCallHospital(requestInfo    
                                           , deathDtl.getDeathBasicInfo().getTenantId()                           
                                           , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                   Map<String,List<String>> masterDataHospital = getAttributeValuesHospital(mdmsDataHospital);

                   Object mdmsDataHospitalMl = util.mDMSCallHospitalMl(requestInfo  
                                           , deathDtl.getDeathBasicInfo().getTenantId()                           
                                           , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                   Map<String,List<String>> masterDataHospitalMl = getAttributeValuesHospital(mdmsDataHospitalMl);

                   String deathPlaceHospital = masterDataHospital.get(DeathConstants.HOSPITAL_DATA).toString();
                   deathPlaceHospital = deathPlaceHospital.replaceAll("[\\[\\]\\(\\)]", "");

                   String deathPlaceHospitalMl = masterDataHospitalMl.get(DeathConstants.HOSPITAL_DATA).toString();
                   deathPlaceHospitalMl = deathPlaceHospitalMl.replaceAll("[\\[\\]\\(\\)]", "");
                    
                deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameEn(deathPlaceHospital);
                deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameMl(deathPlaceHospitalMl);               
               }

               //Rakhi S on 02.04.2023 Death place Institution
               else if(DeathConstants.DEATH_PLACE_INSTITUTION.toString().equals(deathDtl.getDeathBasicInfo().getDeathPlace())){
                Object mdmsDataInstitution = util.mDMSCallInstitution(requestInfo  
                                        , deathDtl.getDeathBasicInfo().getTenantId()                           
                                        , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                Map<String,List<String>> masterDataInstitution = getAttributeValuesHospital(mdmsDataInstitution);

                Object mdmsDataInstitutionMl = util.mDMSCallInstitutionMl(requestInfo     
                                        , deathDtl.getDeathBasicInfo().getTenantId()                           
                                        , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                Map<String,List<String>> masterDataInstitutionMl = getAttributeValuesHospital(mdmsDataInstitutionMl);

                String deathPlaceInstitution = masterDataInstitution.get(DeathConstants.INSTITUTION_NAME).toString();
                deathPlaceInstitution = deathPlaceInstitution.replaceAll("[\\[\\]\\(\\)]", "");

                String deathPlaceInstitutionMl = masterDataInstitutionMl.get(DeathConstants.INSTITUTION_NAME).toString();
                deathPlaceInstitutionMl = deathPlaceInstitutionMl.replaceAll("[\\[\\]\\(\\)]", "");
                
                deathDtl.getDeathBasicInfo().setDeathPlaceInstitutionNameEn(deathPlaceInstitution);
                deathDtl.getDeathBasicInfo().setDeathPlaceInstitutionNameMl(deathPlaceInstitutionMl);
            } 
            // System.out.println("regStatusNormal:"+deathDtl.getDeathBasicInfo().isNormalRegn());
            // System.out.println("Del30:"+deathDtl.getDeathBasicInfo().isDelayedWithinThirty());
            // System.out.println("Del1:"+deathDtl.getDeathBasicInfo().isDelayedWithinOneyear());
            // System.out.println("Delafter1:"+deathDtl.getDeathBasicInfo().isDelayedAfterOneyear());
			});
        }
        return result; 
    }
     //Rakhi S on 08.02.2023
     public List<Map<String, Object>>  getDeathACKDetails(String tenantId,int  Year) {
        
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getDeathAckNoIdQuery(tenantId, Year,preparedStmtValues);
        List<Map<String, Object>> ackDetails= jdbcTemplate.queryForList(query,preparedStmtValues.toArray());
        return ackDetails; 
     }

     //Jasmine 15/02/2023 for ID generation

     public String getNewID(String tenantId, int Year, String moduleCode, String idType) {

        List<Object> preparedStmtValues = new ArrayList<>();
        preparedStmtValues.add(idType);
        preparedStmtValues.add(moduleCode);
        preparedStmtValues.add(tenantId);
        preparedStmtValues.add(Year);
        String query = queryBuilder.getNextIDQuery();
        List<Map<String, Object>> nextID = jdbcTemplate.queryForList(query, preparedStmtValues.toArray());
        // finalid=String.format("%05d",Integer.parseInt(String.valueOf(nextID.get(0).get("genid"))));
        String finalid = String.valueOf(nextID.get(0).get("fn_next_id"));

        return finalid;
    }

    //Rakhi S ikm on 02.03.2023
    private Map<String, List<String>> getAttributeValuesHospital(Object mdmsdata){
        List<String> modulepaths = Arrays.asList(DeathConstants.EGOV_LOCATION_JSONPATH);
        final Map<String, List<String>> mdmsResMap = new HashMap<>();
       
        modulepaths.forEach(modulepath -> {
            try {
                mdmsResMap.putAll(JsonPath.read(mdmsdata,modulepath));
                log.error("jsonpathbnd"+JsonPath.read(mdmsdata,modulepath));
            } catch (Exception e) {
                log.error("Error while fetching MDMS data",e);
                throw new CustomException(DeathConstants.INVALID_TENANT_ID_MDMS_KEY,
                   DeathConstants.INVALID_TENANT_ID_MDMS_MSG);
            }
           
        });
        // System.out.println("mdmsResMap"+mdmsResMap);
        return mdmsResMap;
    }

       //Jasmine on 06.03.2023
       public List<DeathCorrectionDtls> getDeathCorrection(DeathSearchCriteria criteria,RequestInfo requestInfo) {
        
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getDeathSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        //System.out.println("Query:"+query);
        List<DeathCorrectionDtls> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), correctionRowMapper);
      //  System.out.println("Query:"+result);

        if(result != null) {
			result.forEach(deathDtl -> {

                DeathCorrectionBasicInfo deathBasicDtls =deathDtl.getDeathCorrectionBasicInfo();
                //deathBasicDtls.setDeceasedAadharNumber(encryptionDecryptionUtil.decryptObject(deathBasicDtls.getDeceasedAadharNumber(), "BndDetail", DeathBasicInfo.class,requestInfo));
                DeathCorrectionBasicInfo dec = encryptionDecryptionUtil.decryptObject(deathBasicDtls, "BndDetail", DeathCorrectionBasicInfo.class, requestInfo);
                deathBasicDtls.setDeceasedAadharNumber(dec.getDeceasedAadharNumber());
                //Rakhi S on 02.03.2023 Mdms call  
                if(DeathConstants.DEATH_PLACE_HOSPITAL.toString().equals(deathDtl.getDeathCorrectionBasicInfo().getDeathPlace())){
                    Object mdmsDataHospital = util.mDMSCallHospital(requestInfo    
                                           , deathDtl.getDeathCorrectionBasicInfo().getTenantId()                           
                                           , deathDtl.getDeathCorrectionBasicInfo().getDeathPlaceType());
                   Map<String,List<String>> masterDataHospital = getAttributeValuesHospital(mdmsDataHospital);

                   Object mdmsDataHospitalMl = util.mDMSCallHospitalMl(requestInfo  
                                           , deathDtl.getDeathCorrectionBasicInfo().getTenantId()                           
                                           , deathDtl.getDeathCorrectionBasicInfo().getDeathPlaceType());
                   Map<String,List<String>> masterDataHospitalMl = getAttributeValuesHospital(mdmsDataHospitalMl);

                   String deathPlaceHospital = masterDataHospital.get(DeathConstants.HOSPITAL_DATA).toString();
                   deathPlaceHospital = deathPlaceHospital.replaceAll("[\\[\\]\\(\\)]", "");

                   String deathPlaceHospitalMl = masterDataHospitalMl.get(DeathConstants.HOSPITAL_DATA).toString();
                   deathPlaceHospitalMl = deathPlaceHospitalMl.replaceAll("[\\[\\]\\(\\)]", "");

                deathDtl.getDeathCorrectionBasicInfo().setDeathPlaceHospitalNameEn(deathPlaceHospital);
                deathDtl.getDeathCorrectionBasicInfo().setDeathPlaceHospitalNameMl(deathPlaceHospitalMl);
               }

			});
        }
        return result; 
    }

    //Rakhi S on 08.03.2023
    public List<DeathAbandonedDtls> getDeathAbandoned(DeathSearchCriteria criteria,RequestInfo requestInfo) {
        
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getDeathSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<DeathAbandonedDtls> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), abandonedRowMapper);
        if(result != null) {
			result.forEach(deathDtl -> {

                DeathBasicInfo deathBasicDtls =deathDtl.getDeathBasicInfo();                
                DeathBasicInfo dec = encryptionDecryptionUtil.decryptObject(deathBasicDtls, "BndDetail", DeathBasicInfo.class, requestInfo);
                deathBasicDtls.setDeceasedAadharNumber(dec.getDeceasedAadharNumber());
                DeathFamilyInfo deathFamilyDtls =deathDtl.getDeathFamilyInfo() ;
                DeathFamilyInfo deathFamilyDcr = encryptionDecryptionUtil.decryptObject(deathFamilyDtls, "BndDetail", DeathFamilyInfo.class,requestInfo);
                deathFamilyDtls.setFatherAadharNo(deathFamilyDcr.getFatherAadharNo());
                deathFamilyDtls.setMotherAadharNo(deathFamilyDcr.getMotherAadharNo());
                deathFamilyDtls.setSpouseAadhaar(deathFamilyDcr.getSpouseAadhaar());                 
                DeathAbandonedInformantDtls deathInformant =deathDtl.getDeathInformantDtls() ;
                if (deathInformant!=null){
                    DeathAbandonedInformantDtls deathInformantEnc = encryptionDecryptionUtil.decryptObject(deathInformant, "BndDetail", DeathAbandonedInformantDtls.class,requestInfo);
                    deathInformant.setInformantAadhaarNo(deathInformantEnc.getInformantAadhaarNo());
                }
                if(DeathConstants.DEATH_PLACE_HOSPITAL.toString().equals(deathDtl.getDeathBasicInfo().getDeathPlace())){
                    Object mdmsDataHospital = util.mDMSCallHospital(requestInfo    
                                           , deathDtl.getDeathBasicInfo().getTenantId()                           
                                           , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                   Map<String,List<String>> masterDataHospital = getAttributeValuesHospital(mdmsDataHospital);

                   Object mdmsDataHospitalMl = util.mDMSCallHospitalMl(requestInfo  
                                           , deathDtl.getDeathBasicInfo().getTenantId()                           
                                           , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                   Map<String,List<String>> masterDataHospitalMl = getAttributeValuesHospital(mdmsDataHospitalMl);

                   String deathPlaceHospital = masterDataHospital.get(DeathConstants.HOSPITAL_DATA).toString();
                   deathPlaceHospital = deathPlaceHospital.replaceAll("[\\[\\]\\(\\)]", "");

                   String deathPlaceHospitalMl = masterDataHospitalMl.get(DeathConstants.HOSPITAL_DATA).toString();
                   deathPlaceHospitalMl = deathPlaceHospitalMl.replaceAll("[\\[\\]\\(\\)]", "");

                deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameEn(deathPlaceHospital);
                deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameMl(deathPlaceHospitalMl);
               }

			});
        }
        return result; 
    }

    //Rakhi S on 30.03.2023
    public List<DeathNACDtls> getDeathNACDetails(DeathSearchCriteria criteria,RequestInfo requestInfo) {
        
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getDeathSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<DeathNACDtls> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), deathNACRowMapper);
        if(result != null) {
			result.forEach(deathDtl -> {

                DeathBasicInfo deathBasicDtls =deathDtl.getDeathBasicInfo();                
                DeathBasicInfo dec = encryptionDecryptionUtil.decryptObject(deathBasicDtls, "BndDetail", DeathBasicInfo.class, requestInfo);
                deathBasicDtls.setDeceasedAadharNumber(dec.getDeceasedAadharNumber());               
                deathBasicDtls.setFatherAadharNo(dec.getFatherAadharNo());
                deathBasicDtls.setMotherAadharNo(dec.getMotherAadharNo());
                deathBasicDtls.setSpouseAadhaar(dec.getSpouseAadhaar());   
                
                // DeathNACApplicantDtls deathInformant =deathDtl.getDeathApplicantDtls() ;
                // if (deathInformant!=null){
                //     DeathNACApplicantDtls deathInformantEnc = encryptionDecryptionUtil.decryptObject(deathInformant, "BndDetail", DeathNACApplicantDtls.class,requestInfo);
                //     deathInformant.setApplicantAadhaarNo(deathInformantEnc.getApplicantAadhaarNo());
                // }            

                if(DeathConstants.DEATH_PLACE_HOSPITAL.toString().equals(deathDtl.getDeathBasicInfo().getDeathPlace())){
                    Object mdmsDataHospital = util.mDMSCallHospital(requestInfo    
                                           , deathDtl.getDeathBasicInfo().getTenantId()                           
                                           , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                   Map<String,List<String>> masterDataHospital = getAttributeValuesHospital(mdmsDataHospital);

                   Object mdmsDataHospitalMl = util.mDMSCallHospitalMl(requestInfo  
                                           , deathDtl.getDeathBasicInfo().getTenantId()                           
                                           , deathDtl.getDeathBasicInfo().getDeathPlaceType());
                   Map<String,List<String>> masterDataHospitalMl = getAttributeValuesHospital(mdmsDataHospitalMl);

                   String deathPlaceHospital = masterDataHospital.get(DeathConstants.HOSPITAL_DATA).toString();
                   deathPlaceHospital = deathPlaceHospital.replaceAll("[\\[\\]\\(\\)]", "");

                   String deathPlaceHospitalMl = masterDataHospitalMl.get(DeathConstants.HOSPITAL_DATA).toString();
                   deathPlaceHospitalMl = deathPlaceHospitalMl.replaceAll("[\\[\\]\\(\\)]", "");

                deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameEn(deathPlaceHospital);
                deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameMl(deathPlaceHospitalMl);
               }

			});
        }
        return result; 
    }
    
}
