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

    public void validateMarriageMDMSData(MarriageDetailsRequest request,Object mdmsdata){
        Map<String,String> errorMap = new HashMap<>();
        Map<String,List<String>> masterData = getAttributeValues(mdmsdata);
        
        String[] masterArray = {MarriageConstants.TENANTS,MarriageConstants.GENDERTYPE,
                                MarriageConstants.MARITAL_STATUS,MarriageConstants.MARRIAGE_TYPE,
                                MarriageConstants.MARRIAGE_PLACE_TYPE};
                            //MarriageConstants.MARRIAGE_PLACE
                           // System.out.println("Jasminemdmsdata"+mdmsdata)

        validateIfMasterPresent(masterArray,masterData);

        if(!masterData.get(MarriageConstants.TENANTS)
                .contains(request.getMarriageDetails().get(0).getTenantid()))
        errorMap.put("INVALID TENAND ID", "The tenand id  "+ request.getMarriageDetails().get(0).getTenantid() +
                    " does not exists");

        if(request.getMarriageDetails().get(0).getGroomDetails().getGender() != null) {   
            if(!masterData.get(MarriageConstants.GENDERTYPE)
                    .contains(request.getMarriageDetails().get(0).getGroomDetails().getGender()))
            errorMap.put("INVALID GENDER TYPE", "The gender of the groom " +
                        request.getMarriageDetails().get(0).getGroomDetails().getGender()+ " is invalid");     
        }  

        if(request.getMarriageDetails().get(0).getGroomDetails().getMaritalstatusid() != null) {  
            if(!masterData.get(MarriageConstants.MARITAL_STATUS)
                        .contains(request.getMarriageDetails().get(0).getGroomDetails().getMaritalstatusid()))
            errorMap.put("MARITAL STATUS INVALID", "The marital status of groom  " +
                            request.getMarriageDetails().get(0).getGroomDetails().getMaritalstatusid()+ " is invalid");
        }

        if(request.getMarriageDetails().get(0).getMarriage_type() != null) {  
            if(!masterData.get(MarriageConstants.MARRIAGE_TYPE)
                        .contains(request.getMarriageDetails().get(0).getMarriage_type()))
            errorMap.put("TYPE OF MARRIAGE INVALID", "The marriage type " +
                            request.getMarriageDetails().get(0).getMarriage_type()+ " is invalid");
        }

        if(request.getMarriageDetails().get(0).getPlacetype() != null) {  
            if(!masterData.get(MarriageConstants.MARRIAGE_PLACE_TYPE)
                        .contains(request.getMarriageDetails().get(0).getPlacetype()))
            errorMap.put(" MARRIAGE PLACE TYPE INVALID ", "The marriage place type " +
                            request.getMarriageDetails().get(0).getPlacetype()+ " is invalid");
        }
        if(!CollectionUtils.isEmpty(errorMap))
            throw new CustomException(errorMap);

    }
    //Rakhi S ikm on 14.02.2023
    private Map<String, List<String>> getAttributeValues(Object mdmsdata){
        List<String> modulepaths = Arrays.asList(MarriageConstants.TENANT_JSONPATH,
                                    MarriageConstants.COMMON_MASTER_JSONPATH,
                                    MarriageConstants.BND_LIST_JSONPATH);
        final Map<String, List<String>> mdmsResMap = new HashMap<>();
       //System.out.println("Jasminemodulepaths"+modulepaths);
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
