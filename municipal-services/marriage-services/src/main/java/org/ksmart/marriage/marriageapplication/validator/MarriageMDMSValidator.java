package org.ksmart.marriage.marriageapplication.validator;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.utils.MarriageConstants;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import com.jayway.jsonpath.JsonPath;
import lombok.extern.slf4j.Slf4j;
    
    /**
     * Creates Jasmine 30.03.2023
     */
@Component
@Slf4j
public class MarriageMDMSValidator {
    //Rakhi S ikm on 14.02.2023
    public void validateMarriageMDMSData(MarriageDetailsRequest request,Object mdmsdata){
        Map<String,String> errorMap = new HashMap<>();
        Map<String,List<String>> masterData = getAttributeValues(mdmsdata);
        
        String[] masterArray = {MarriageConstants.TENANTS,MarriageConstants.GENDERTYPE};
                            // ,DeathConstants.DEATH_PLACE_LIST,DeathConstants.DEATH_CAUSE_MAIN
                            // ,DeathConstants.DEATH_CAUSE_SUB};
        validateIfMasterPresent(masterArray,masterData);

        if(!masterData.get(MarriageConstants.TENANTS)
                .contains(request.getMarriageDetails().get(0).getTenantid()))
        errorMap.put("INVALID TENAND ID", "The tenand id  "+ request.getMarriageDetails().get(0).getTenantid() +
                    " does not exists");

        // if(request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getDeceasedGender() != null) {   
        //     if(!masterData.get(DeathConstants.GENDERTYPE)
        //             .contains(request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getDeceasedGender()))
        //     errorMap.put("INVALID GENDER TYPE", "The gender of the deceased " +
        //                 request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getDeceasedGender()+ " is invalid");     
        // }  

        // if(!masterData.get(DeathConstants.DEATH_PLACE_LIST)
        //                 .contains(request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getDeathPlace()))
        //     errorMap.put("DEATH PLACE DETAILS INVALID", "The deceased death place details " +
        //                     request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getDeathPlace()+ " is invalid");

        // if(request.getDeathCertificateDtls().get(0).getDeathStatisticalInfo().getDeathCauseMain() != null) {        
        //     if(!masterData.get(DeathConstants.DEATH_CAUSE_MAIN)
        //                     .contains(request.getDeathCertificateDtls().get(0).getDeathStatisticalInfo().getDeathCauseMain()))
        //         errorMap.put("DEATH CAUSE MAIN INVALID", "The deceased death cause main details " +
        //                         request.getDeathCertificateDtls().get(0).getDeathStatisticalInfo().getDeathCauseMain()+ " is invalid");
        // }
        // if(request.getDeathCertificateDtls().get(0).getDeathStatisticalInfo().getDeathCauseSub() != null) {    
        //     if(!masterData.get(DeathConstants.DEATH_CAUSE_SUB)
        //                         .contains(request.getDeathCertificateDtls().get(0).getDeathStatisticalInfo().getDeathCauseSub()))
        //             errorMap.put("DEATH CAUSE SUB INVALID", "The deceased death cause sub details " +
        //                             request.getDeathCertificateDtls().get(0).getDeathStatisticalInfo().getDeathCauseSub()+ " is invalid");
        // }
        // if(request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getAgeUnit() != null) {   
        //     if(!masterData.get(DeathConstants.AGE_UNIT)
        //                                 .contains(request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getAgeUnit()))
        //                     errorMap.put("AGE UNIT INVALID", "The deceased age unit details " +
        //         request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getAgeUnit()+ " is invalid");
        // }

        // if(request.getDeathCertificateDtls().get(0).getDeathStatisticalInfo().getMedicalAttentionType() != null) {
        //     if(!masterData.get(DeathConstants.MEDICAL_ATTENTION_TYPE)
        //                             .contains(request.getDeathCertificateDtls().get(0).getDeathStatisticalInfo().getMedicalAttentionType()))
        //                 errorMap.put("MEDICAL ATTENTION TYPE INVALID", "The deceased medical attention  details " +
        //         request.getDeathCertificateDtls().get(0).getDeathStatisticalInfo().getMedicalAttentionType()+ " is invalid");
       // }
        if(!CollectionUtils.isEmpty(errorMap))
            throw new CustomException(errorMap);

    }
    //Rakhi S ikm on 14.02.2023
    private Map<String, List<String>> getAttributeValues(Object mdmsdata){
        List<String> modulepaths = Arrays.asList(MarriageConstants.TENANT_JSONPATH, 
                                    MarriageConstants.COMMON_MASTER_JSONPATH,
                                    MarriageConstants.BND_LIST_JSONPATH);
        final Map<String, List<String>> mdmsResMap = new HashMap<>();
       
        modulepaths.forEach(modulepath -> {
            try {
                mdmsResMap.putAll(JsonPath.read(mdmsdata,modulepath));
                log.error("jsonpath1"+JsonPath.read(mdmsdata,modulepath));
            } catch (Exception e) {
                log.error("Error while fetching MDMS data",e);
                throw new CustomException( MarriageConstants .INVALID_TENANT_ID_MDMS_KEY,
                MarriageConstants.INVALID_TENANT_ID_MDMS_MSG);
            }
           
        });
        return mdmsResMap;
    }
    //Rakhi S ikm on 14.02.2023
    private void validateIfMasterPresent(String[] masterNames, Map<String, List<String>> codes){
        Map<String,String> errorMap = new HashMap<>();
        for(String masterName : masterNames){
                if(!codes.containsKey(masterName)){
                errorMap.put("MDMS DATA ERROR ","Unable to fetch "+ masterName + " codes from MDMS ");
            }
        }
        if(!errorMap.isEmpty())
            throw new CustomException(errorMap);
    }
}
