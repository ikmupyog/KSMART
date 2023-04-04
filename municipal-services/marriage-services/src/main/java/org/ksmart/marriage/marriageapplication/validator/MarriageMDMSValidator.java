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

    public void validateMarriageMDMSData(MarriageDetailsRequest request, Object mdmsdata) {
        Map<String, String> errorMap = new HashMap<>();
        Map<String, List<String>> masterData = getAttributeValues(mdmsdata);

        String[] masterArray = { MarriageConstants.TENANTS, MarriageConstants.GENDERTYPE,
                MarriageConstants.MARITAL_STATUS, MarriageConstants.MARRIAGE_TYPE,
                MarriageConstants.MARRIAGE_PLACE_TYPE };
        // MarriageConstants.MARRIAGE_PLACE
        // System.out.println("Jasminemdmsdata"+mdmsdata)

        validateIfMasterPresent(masterArray, masterData);

        if (!masterData.get(MarriageConstants.TENANTS)
                .contains(request.getMarriageDetails().get(0).getTenantid()))
            errorMap.put("INVALID TENAND ID", "The tenand id  " + request.getMarriageDetails().get(0).getTenantid() +
                    " does not exists");

        if (request.getMarriageDetails().get(0).getGroomDetails().getGender() != null) {
            if (!masterData.get(MarriageConstants.GENDERTYPE)
                    .contains(request.getMarriageDetails().get(0).getGroomDetails().getGender()))
                errorMap.put("GROOM:INVALID GENDER TYPE", "The gender of the groom " +
                        request.getMarriageDetails().get(0).getGroomDetails().getGender() + " is invalid");
        }

        if (request.getMarriageDetails().get(0).getGroomDetails().getMaritalstatusid() != null) {
            if (!masterData.get(MarriageConstants.MARITAL_STATUS)
                    .contains(request.getMarriageDetails().get(0).getGroomDetails().getMaritalstatusid()))
                errorMap.put("GROOM:MARITAL STATUS INVALID", "The marital status of groom  " +
                        request.getMarriageDetails().get(0).getGroomDetails().getMaritalstatusid() + " is invalid");
        }

        if (request.getMarriageDetails().get(0).getMarriage_type() != null) {
            if (!masterData.get(MarriageConstants.MARRIAGE_TYPE)
                    .contains(request.getMarriageDetails().get(0).getMarriage_type()))
                errorMap.put("GROOM:TYPE OF MARRIAGE INVALID", "The marriage type " +
                        request.getMarriageDetails().get(0).getMarriage_type() + " is invalid");
        }

        if (request.getMarriageDetails().get(0).getPlacetype() != null) {
            if (!masterData.get(MarriageConstants.MARRIAGE_PLACE_TYPE)
                    .contains(request.getMarriageDetails().get(0).getPlacetype()))
                errorMap.put("GROOM: MARRIAGE PLACE TYPE INVALID ", "The marriage place type " +
                        request.getMarriageDetails().get(0).getPlacetype() + " is invalid");
        }

        // Jasmine 03.04.2023

        if (request.getMarriageDetails().get(0).getBrideDetails().getGender() != null) {
            if (!masterData.get(MarriageConstants.GENDERTYPE)
                    .contains(request.getMarriageDetails().get(0).getGroomDetails().getGender()))
                errorMap.put("BRIDE:INVALID GENDER TYPE", "The gender of the groom " +
                        request.getMarriageDetails().get(0).getGroomDetails().getGender() + " is invalid");
        }

        if (request.getMarriageDetails().get(0).getBrideDetails().getMaritalstatusid() != null) {
            if (!masterData.get(MarriageConstants.MARITAL_STATUS)
                    .contains(request.getMarriageDetails().get(0).getGroomDetails().getMaritalstatusid()))
                errorMap.put("BRIDE:MARITAL STATUS INVALID", "The marital status of groom  " +
                        request.getMarriageDetails().get(0).getGroomDetails().getMaritalstatusid() + " is invalid");
        }
        // MASTER DETAILS VALIDATION

        if (request.getMarriageDetails().get(0).getDistrictid() != null) {
            if (!masterData.get(MarriageConstants.DISTRICT)
                    .contains(request.getMarriageDetails().get(0).getDistrictid()))
                errorMap.put(" DISTRICT NAME INVALID", "The district name of marriage place " +
                        request.getMarriageDetails().get(0).getDistrictid() + " is invalid");
        }
        if (request.getMarriageDetails().get(0).getTalukid() != null) {
            if (!masterData.get(MarriageConstants.TALUK)
                    .contains(request.getMarriageDetails().get(0).getTalukid()))
                errorMap.put(" TALUK NAME INVALID", "The taluk name of marriage place " +
                        request.getMarriageDetails().get(0).getTalukid() + " is invalid");
        }
        // have to change as villageId
        if (request.getMarriageDetails().get(0).getVillage_name() != null) {
            if (!masterData.get(MarriageConstants.VILLAGE)
                    .contains(request.getMarriageDetails().get(0).getVillage_name()))
                errorMap.put(" VILLAGE NAME INVALID", "The village name of marriage place " +
                        request.getMarriageDetails().get(0).getVillage_name() + " is invalid");
        }
        if (request.getMarriageDetails().get(0).getLbtype() != null) {
            if (!masterData.get(MarriageConstants.LBTYPE)
                    .contains(request.getMarriageDetails().get(0).getLbtype()))
                errorMap.put(" LBTYPE INVALID", "The LBTYpe  of marriage place " +
                        request.getMarriageDetails().get(0).getLbtype() + " is invalid");
        }
        // if(request.getMarriageDetails().get(0).getWard_code() != null) {
        // if(!masterData.get(MarriageConstants.WARD)
        // .contains(request.getMarriageDetails().get(0).getWard_code()))
        // errorMap.put(" LB TYPE INVALID", "The LBTYpe of marriage place " +
        // request.getMarriageDetails().get(0).getWard_code()+ " is invalid");
        // }

        // ADDRESS VALIDATION

        if (request.getMarriageDetails().get(0).getGroomAddressDetails().getCountryIdPermanent() != null) {
            if (!masterData.get(MarriageConstants.COUNTRY)
                    .contains(request.getMarriageDetails().get(0).getGroomAddressDetails().getCountryIdPermanent()))
                errorMap.put("GROOM PERMANENT ADDRESS: COUNTRY NAME INVALID", "The country name of  groom " +
                        request.getMarriageDetails().get(0).getGroomAddressDetails().getCountryIdPermanent()
                        + " is invalid");
        }
        if (request.getMarriageDetails().get(0).getGroomAddressDetails().getStateIdPermanent() != null) {
            if (!masterData.get(MarriageConstants.STATE)
                    .contains(request.getMarriageDetails().get(0).getGroomAddressDetails().getStateIdPermanent()))
                errorMap.put("GROOM PERMANENT ADDRESS: STATE NAME INVALID", "The state name of  groom " +
                        request.getMarriageDetails().get(0).getGroomAddressDetails().getStateIdPermanent()
                        + " is invalid");
        }
        // if(request.getMarriageDetails().get(0).getTalukid() != null) {
        // if(!masterData.get(MarriageConstants.TALUK)
        // .contains(request.getMarriageDetails().get(0).getTalukid()))
        // errorMap.put(" TALUK NAME INVALID", "The taluk name of marriage place " +
        // request.getMarriageDetails().get(0).getTalukid()+ " is invalid");
        // }
        // //have to change as villageId
        // if(request.getMarriageDetails().get(0).getVillage_name() != null) {
        // if(!masterData.get(MarriageConstants.VILLAGE)
        // .contains(request.getMarriageDetails().get(0).getVillage_name()))
        // errorMap.put(" VILLAGE NAME INVALID", "The village name of marriage place " +
        // request.getMarriageDetails().get(0).getVillage_name()+ " is invalid");
        // }
        // if(request.getMarriageDetails().get(0).getLbtype() != null) {
        // if(!masterData.get(MarriageConstants.LBTYPE)
        // .contains(request.getMarriageDetails().get(0).getLbtype()))
        // errorMap.put(" LBTYPE INVALID", "The LBTYpe of marriage place " +
        // request.getMarriageDetails().get(0).getLbtype()+ " is invalid");

        if (!CollectionUtils.isEmpty(errorMap))
            throw new CustomException(errorMap);

    }

    // Rakhi S ikm on 14.02.2023
    private Map<String, List<String>> getAttributeValues(Object mdmsdata) {
        List<String> modulepaths = Arrays.asList(MarriageConstants.TENANT_JSONPATH,
                MarriageConstants.COMMON_MASTER_JSONPATH,
                MarriageConstants.BND_LIST_JSONPATH);
        final Map<String, List<String>> mdmsResMap = new HashMap<>();
        // System.out.println("Jasminemodulepaths"+modulepaths);
        modulepaths.forEach(modulepath -> {
            try {
                mdmsResMap.putAll(JsonPath.read(mdmsdata, modulepath));
                log.error("jsonpath1" + JsonPath.read(mdmsdata, modulepath));
            } catch (Exception e) {
                log.error("Error while fetching MDMS data", e);
                throw new CustomException(MarriageConstants.INVALID_TENANT_ID_MDMS_KEY,
                        MarriageConstants.INVALID_TENANT_ID_MDMS_MSG);
            }

        });
        return mdmsResMap;
    }

    // Rakhi S ikm on 14.02.2023
    private void validateIfMasterPresent(String[] masterNames, Map<String, List<String>> codes) {
        Map<String, String> errorMap = new HashMap<>();
        for (String masterName : masterNames) {
            if (!codes.containsKey(masterName)) {
                errorMap.put("MDMS DATA ERROR ", "Unable to fetch " + masterName + " codes from MDMS ");
            }
        }
        if (!errorMap.isEmpty())
            throw new CustomException(errorMap);
    }
}
