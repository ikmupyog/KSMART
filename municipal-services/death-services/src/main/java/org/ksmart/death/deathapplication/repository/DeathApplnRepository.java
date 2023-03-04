package org.ksmart.death.deathapplication.repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.ksmart.death.deathapplication.repository.querybuilder.DeathApplnQueryBuilder;
import org.ksmart.death.deathapplication.repository.rowmapper.DeathApplnRowMapper;
import org.ksmart.death.deathapplication.util.DeathConstants;
import org.ksmart.death.deathapplication.util.DeathMdmsUtil;
import org.ksmart.death.deathapplication.web.models.DeathBasicInfo;
import org.ksmart.death.deathapplication.web.models.DeathDtl;
import org.ksmart.death.deathapplication.web.models.DeathFamilyInfo;
import org.ksmart.death.deathapplication.web.models.DeathInformantDtls;
import org.ksmart.death.deathapplication.web.models.DeathInitiatorDtls;
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

    @Autowired
    DeathApplnRepository(JdbcTemplate jdbcTemplate, DeathApplnQueryBuilder queryBuilder,
                        DeathApplnRowMapper rowMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.queryBuilder = queryBuilder;
        this.rowMapper = rowMapper;
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
                DeathFamilyInfo deathFamilyDtls =deathDtl.getDeathFamilyInfo() ;
                DeathFamilyInfo deathFamilyDcr = encryptionDecryptionUtil.decryptObject(deathFamilyDtls, "BndDetail", DeathFamilyInfo.class,requestInfo);
                deathFamilyDtls.setFatherAadharNo(deathFamilyDcr.getFatherAadharNo());
                deathFamilyDtls.setMotherAadharNo(deathFamilyDcr.getMotherAadharNo());
                deathFamilyDtls.setSpouseAadhaar(deathFamilyDcr.getSpouseAadhaar()); 
                DeathInformantDtls deathInformant =deathDtl.getDeathInformantDtls() ;
                if (deathInformant!=null){
                    DeathInformantDtls deathInformantEnc = encryptionDecryptionUtil.decryptObject(deathInformant, "BndDetail", DeathInformantDtls.class,requestInfo);
                    deathInformant.setInformantAadharNo(deathInformantEnc.getInformantAadharNo());
                }
                DeathInitiatorDtls deathInitiator =deathDtl.getDeathInitiatorDtls() ;
                if (deathInitiator!= null){
                    DeathInitiatorDtls deathInitiatorEnc = encryptionDecryptionUtil.decryptObject(deathInitiator, "BndDetail", DeathInitiatorDtls.class,requestInfo);
                    deathInitiator.setInitiatorAadhaar(deathInitiatorEnc.getInitiatorAadhaar());
                }

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

                   String deathPlaceHospital = masterDataHospital.get(DeathConstants.HOSPITAL_LIST).toString();
                   deathPlaceHospital = deathPlaceHospital.replaceAll("[\\[\\]\\(\\)]", "");

                   String deathPlaceHospitalMl = masterDataHospitalMl.get(DeathConstants.HOSPITAL_LIST).toString();
                   deathPlaceHospitalMl = deathPlaceHospitalMl.replaceAll("[\\[\\]\\(\\)]", "");

                deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameEn(deathPlaceHospital);
                deathDtl.getDeathBasicInfo().setDeathPlaceHospitalNameMl(deathPlaceHospitalMl);
               }

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
    
}
