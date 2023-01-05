package org.ksmart.death.crdeathregistry.validators;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.ksmart.death.crdeathregistry.util.CrDeathRegistryConstants;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryRequest;
import org.egov.tracer.model.CustomException;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import com.jayway.jsonpath.JsonPath;

import lombok.extern.slf4j.Slf4j;
    
    /**
     * Creates RegistryMDMSValidator 
    Rakhi S IKM 
     */
@Component
@Slf4j
public class RegistryMDMSValidator {
    

    public void validateMDMSData(CrDeathRegistryRequest request,Object mdmsdata){
        Map<String,String> errorMap = new HashMap<>();
        Map<String,List<String>> masterData = getAttributeValues(mdmsdata);
        
        String[] masterArray = {CrDeathRegistryConstants.TENANTS,CrDeathRegistryConstants.GENDERTYPE
                            ,CrDeathRegistryConstants.HOSPITAL_LIST,CrDeathRegistryConstants.DEATH_PLACE};
        validateIfMasterPresent(masterArray,masterData);

        if(!masterData.get(CrDeathRegistryConstants.TENANTS)
                .contains(request.getDeathCertificateDtls().get(0).getTenantId()))
        errorMap.put("INVALID TENAND ID", "The tenand id  "+ request.getDeathCertificateDtls().get(0).getTenantId() +
                    " does not exists");

         System.out.println("genderMAster"+masterData.get(CrDeathRegistryConstants.GENDERTYPE).contains(request.getDeathCertificateDtls().get(0).getDeceasedGender()));

        if(!masterData.get(CrDeathRegistryConstants.GENDERTYPE)
                .contains(request.getDeathCertificateDtls().get(0).getDeceasedGender()))
        errorMap.put("INVALID GENDER TYPE", "The gender of the deceased " +
                    request.getDeathCertificateDtls().get(0).getDeceasedGender()+ " is invalid");

        if(!masterData.get(CrDeathRegistryConstants.HOSPITAL_LIST)
                    .contains(request.getDeathCertificateDtls().get(0).getDeathPlaceOfficeName()))
            errorMap.put("HOSPITAL DETAILS INVALID", "The deceased hospital details " +
                        request.getDeathCertificateDtls().get(0).getDeathPlaceOfficeName()+ " is invalid");

        if(!masterData.get(CrDeathRegistryConstants.DEATH_PLACE)
                        .contains(request.getDeathCertificateDtls().get(0).getDeathPlace()))
            errorMap.put("DEATH PLACE DETAILS INVALID", "The deceased death place details " +
                            request.getDeathCertificateDtls().get(0).getDeathPlace()+ " is invalid");
        //RAkhi S on 07.12.2022 
        System.out.println("datacheckDeathCause: "+request.getDeathCertificateDtls().get(0).getStatisticalInfo().getDeathCauseMain());
        if(!masterData.get(CrDeathRegistryConstants.DEATH_CAUSE_MAIN)
                        .contains(request.getDeathCertificateDtls().get(0).getStatisticalInfo().getDeathCauseMain()))
            errorMap.put("DEATH CAUSE MAIN INVALID", "The deceased death cause main details " +
                            request.getDeathCertificateDtls().get(0).getStatisticalInfo().getDeathCauseMain()+ " is invalid");
                            
        if(!masterData.get(CrDeathRegistryConstants.DEATH_CAUSE_SUB)
                            .contains(request.getDeathCertificateDtls().get(0).getStatisticalInfo().getDeathCauseSub()))
                errorMap.put("DEATH CAUSE SUB INVALID", "The deceased death cause sub details " +
                                request.getDeathCertificateDtls().get(0).getStatisticalInfo().getDeathCauseSub()+ " is invalid");

        if(!masterData.get(CrDeathRegistryConstants.MALE_DEPENDENT_TYPE)
                                .contains(request.getDeathCertificateDtls().get(0).getMaleDependentType()))
                    errorMap.put("MALE DEPENDENT INVALID", "The deceased father/husband details " +
                                    request.getDeathCertificateDtls().get(0).getMaleDependentType()+ " is invalid");


        // if(request.getDeathCertificateDtls().get(0).getFemaleDependentType() != null) {
            // if(!masterData.get(CrDeathRegistryConstants.FEMALE_DEPENDENT_TYPE)
            //                         .contains(request.getDeathCertificateDtls().get(0).getFemaleDependentType()))
            //             errorMap.put("FEMALE DEPENDENT INVALID", "The deceased mother/wife/daughter details " +
            //                             request.getDeathCertificateDtls().get(0).getFemaleDependentType()+ " is invalid");

        // }

        if(!masterData.get(CrDeathRegistryConstants.AGE_UNIT)
                                    .contains(request.getDeathCertificateDtls().get(0).getAgeUnit()))
                        errorMap.put("AGE UNIT INVALID", "The deceased age unit details " +
            request.getDeathCertificateDtls().get(0).getAgeUnit()+ " is invalid");

        if(request.getDeathCertificateDtls().get(0).getStatisticalInfo().getMedicalAttentionType() != null) {
            if(!masterData.get(CrDeathRegistryConstants.MEDICAL_ATTENTION_TYPE)
                                    .contains(request.getDeathCertificateDtls().get(0).getStatisticalInfo().getMedicalAttentionType()))
                        errorMap.put("MEDICAL ATTENTION TYPE INVALID", "The deceased medical attention  details " +
                request.getDeathCertificateDtls().get(0).getStatisticalInfo().getMedicalAttentionType()+ " is invalid");
        }

        if(request.getDeathCertificateDtls().get(0).getStatisticalInfo().getOccupation() != null) {
            if(!masterData.get(CrDeathRegistryConstants.PROFESSION)
                                    .contains(request.getDeathCertificateDtls().get(0).getStatisticalInfo().getOccupation()))
                        errorMap.put("OCCUPATION INVALID", "The deceased occupation  details " +
                request.getDeathCertificateDtls().get(0).getStatisticalInfo().getOccupation()+ " is invalid");
        }
        if(!CollectionUtils.isEmpty(errorMap))
            throw new CustomException(errorMap);

    }

    private Map<String, List<String>> getAttributeValues(Object mdmsdata){
        List<String> modulepaths = Arrays.asList(CrDeathRegistryConstants.TENANT_JSONPATH, 
        CrDeathRegistryConstants.COMMON_MASTER_JSONPATH,
        CrDeathRegistryConstants.BND_LIST_JSONPATH);
        final Map<String, List<String>> mdmsResMap = new HashMap<>();
       
        modulepaths.forEach(modulepath -> {
            try {
                mdmsResMap.putAll(JsonPath.read(mdmsdata,modulepath));
                log.error("jsonpath1"+JsonPath.read(mdmsdata,modulepath));
            } catch (Exception e) {
                log.error("Error while fetching MDMS data",e);
                throw new CustomException(CrDeathRegistryConstants.INVALID_TENANT_ID_MDMS_KEY,
                CrDeathRegistryConstants.INVALID_TENANT_ID_MDMS_MSG);
            }
           
        });
        System.out.println("mdmsResMap"+mdmsResMap);
        return mdmsResMap;
    }
    private void validateIfMasterPresent(String[] masterNames, Map<String, List<String>> codes){
        System.out.println("codescheck"+codes);
        Map<String,String> errorMap = new HashMap<>();
        for(String masterName : masterNames){
            System.out.println("masterName"+masterName);
            System.out.println("codesfound1"+codes.containsKey(masterName));
            // if(CollectionUtils.isEmpty(codes.get(masterName))){
                if(!codes.containsKey(masterName)){
                errorMap.put("MDMS DATA ERROR ","Unable to fetch "+ masterName + " codes from MDMS ");
            }
        }
        if(!errorMap.isEmpty())
            throw new CustomException(errorMap);
    }
    
   
}
