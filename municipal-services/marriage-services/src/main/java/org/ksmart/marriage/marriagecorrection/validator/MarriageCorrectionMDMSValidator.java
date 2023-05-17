package org.ksmart.marriage.marriagecorrection.validator;

import com.jayway.jsonpath.JsonPath;
import lombok.extern.slf4j.Slf4j;
import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.marriageapplication.web.model.marriage.WorkFlowCheck;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionRequest;
import org.ksmart.marriage.utils.MarriageConstants;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.*;

@Component
@Slf4j
public class MarriageCorrectionMDMSValidator {

    public void validateMarriageCorrectionMDMSData(MarriageCorrectionRequest correctionRequest, Object mdmsdata) {
        Map<String, String> errorMap = new HashMap<>();
        Map<String, List<String>> masterData = getAttributeValues(mdmsdata);

        String[] masterArray = {MarriageConstants.TENANTS, MarriageConstants.GENDERTYPE,
                MarriageConstants.MARITAL_STATUS, MarriageConstants.MARRIAGE_TYPE,
                MarriageConstants.MARRIAGE_PLACE_TYPE};


        validateIfMasterPresent(masterArray, masterData);

        if (!masterData.get(MarriageConstants.TENANTS).contains(correctionRequest.getMarriageCorrectionDetails().get(0).getTenantid()))
            errorMap.put("INVALID TENAND ID", "The tenand id  " + correctionRequest.getMarriageCorrectionDetails().get(0).getTenantid() +
                    " does not exists");

        /*correctionRequest.getMarriageCorrectionDetails().forEach(correctionDtls -> {
            correctionDtls.getCorrectionField().forEach(correctionField -> {
                correctionField.getCorrectionFieldValue().forEach(field -> {
                    // MASTER DETAILS VALIDATION
                    *//*if (field.getField().equalsIgnoreCase("marriagePlacetype")) {
                        if (field.getNewValue() != null) {
                            if (!masterData.get(MarriageConstants.MARRIAGE_PLACE_TYPE).contains(field.getNewValue()))
                                errorMap.put(" MARRIAGE PLACE TYPE INVALID ", "The marriage place type " +
                                        field.getNewValue() + " is invalid");
                        }
                    } else if (field.getField().equalsIgnoreCase("marriageDistrictid")) {
                        if (field.getNewValue() != null) {
                            if (!masterData.get(MarriageConstants.DISTRICT).contains(field.getNewValue()))
                                errorMap.put(" DISTRICT NAME INVALID", "The district name of marriage place " +
                                        field.getNewValue() + " is invalid");
                        }
                    } else if (field.getField().equalsIgnoreCase("marriageTalukID")) {
                        if (field.getNewValue() != null) {
                            if (!masterData.get(MarriageConstants.TALUK).contains(field.getNewValue()))
                                errorMap.put(" TALUK NAME INVALID", "The taluk name of marriage place " +
                                        field.getNewValue() + " is invalid");
                        }
                    } else if (field.getField().equalsIgnoreCase("marriageVillageName")) {
                        if (field.getNewValue() != null) {
                            if (!masterData.get(MarriageConstants.VILLAGE).contains(field.getNewValue()))
                                errorMap.put(" VILLAGE NAME INVALID", "The village name of marriage place " +
                                        field.getNewValue() + " is invalid");
                        }
                    } else if (field.getField().equalsIgnoreCase("marriageLBtype")) {
                        if (field.getNewValue() != null) {
                            if (!masterData.get(MarriageConstants.LBTYPE).contains(field.getNewValue()))
                                errorMap.put(" LBTYPE INVALID", "The LBTYpe  of marriage place " +
                                        field.getNewValue() + " is invalid");
                        }
                    }*//*

                    //GROOM PERMANENT ADDRESS DETAILS VALIDATION
                    *//*if (field.getField().equalsIgnoreCase("GroomAddressDetails.permtaddressCountry")) {
                        if (field.getNewValue() != null) {
                            if (!masterData.get(MarriageConstants.COUNTRY).contains(field.getNewValue()))
                                errorMap.put("GROOM PERMANENT ADDRESS: COUNTRY NAME INVALID", "The country name of  groom " +
                                        field.getNewValue() + " is invalid");
                        }
                    } else if (field.getField().equalsIgnoreCase("GroomAddressDetails.permtaddressStateName")) {
                        if (field.getNewValue() != null) {
                            if (!masterData.get(MarriageConstants.STATE).contains(field.getNewValue()))
                                errorMap.put("GROOM PERMANENT ADDRESS: STATE NAME INVALID", "The state name of  groom " +
                                        field.getNewValue() + " is invalid");
                        }
                    } else if (field.getField().equalsIgnoreCase("GroomAddressDetails.permntInKeralaAdrDistrict")) {
                        if (field.getNewValue() != null) {
                            if (!masterData.get(MarriageConstants.DISTRICT).contains(field.getNewValue()))
                                errorMap.put("GROOM PERMANENT ADDRESS: DISTRICT NAME INVALID", "groom district inside kerala " +
                                        field.getNewValue() + " is invalid");
                        }
                    } else if (field.getField().equalsIgnoreCase("GroomAddressDetails.permntOutsideKeralaDistrict")) {
                        if (field.getNewValue() != null) {
                            if (!masterData.get(MarriageConstants.DISTRICT).contains(field.getNewValue()))
                                errorMap.put("GROOM PERMANENT ADDRESS: DISTRICT  INVALID", "groom district outside kerala is  " +
                                        field.getNewValue() + " is invalid");
                        }
                    } else if (field.getField().equalsIgnoreCase("GroomAddressDetails.permntInKeralaAdrTaluk")) {
                        if (field.getNewValue() != null) {
                            if (!masterData.get(MarriageConstants.TALUK).contains(field.getNewValue()))
                                errorMap.put("GROOM PERMANENT ADDRESS: TALUK NAME INVALID", "groom taluk inside kerala " +
                                        field.getNewValue() + " is invalid");
                        }
                    } else if (field.getField().equalsIgnoreCase("GroomAddressDetails.permntInKeralaAdrVillage")) {
                        if (field.getNewValue() != null) {
                            if (!masterData.get(MarriageConstants.VILLAGE).contains(field.getNewValue()))
                                errorMap.put("GROOM PERMANENT ADDRESS: VILLAGE NAME INVALID", "groom village inside kerala  " +
                                        field.getNewValue() + " is invalid");
                        }
                    } else if (field.getField().equalsIgnoreCase("GroomAddressDetails.permntInKeralaAdrLBName")) {
                        if (field.getNewValue() != null) {
                            if (!masterData.get(MarriageConstants.TENANTS).contains(field.getNewValue()))
                                errorMap.put("GROOM PERMANENT ADDRESS: LB NAME INVALID", "groom lbname inside kerala  " +
                                        field.getNewValue() + " is invalid");
                        }
                    } else if (field.getField().equalsIgnoreCase("GroomAddressDetails.permntInKeralaAdrPostOffice")) {
                        if (field.getNewValue() != null) {
                            if (!masterData.get(MarriageConstants.POSTOFFICE).contains(field.getNewValue()))
                                errorMap.put("GROOM PERMANENT ADDRESS: POST OFFICE INVALID", "groom post office inside kerala is invalid" +
                                        field.getNewValue() + " is invalid");
                        }
                    }*//*

                    //BRIDE PERMANENT ADDRESS DETAILS VALIDATION
                    *//*else if (field.getField().equalsIgnoreCase("BrideAddressDetails.permtaddressCountry")) {
                        if (field.getNewValue() != null) {
                            if (!masterData.get(MarriageConstants.COUNTRY).contains(field.getNewValue()))
                                errorMap.put("BRIDE PERMANENT ADDRESS: COUNTRY NAME INVALID", "The country name of  bride " +
                                        field.getNewValue() + " is invalid");
                        }
                    } else if (field.getField().equalsIgnoreCase("BrideAddressDetails.permtaddressStateName")) {
                        if (field.getNewValue() != null) {
                            if (!masterData.get(MarriageConstants.STATE).contains(field.getNewValue()))
                                errorMap.put("BRIDE PERMANENT ADDRESS: STATE NAME INVALID", "The state name of  bride " +
                                        field.getNewValue()+ " is invalid");
                        }
                    } else if (field.getField().equalsIgnoreCase("BrideAddressDetails.permntInKeralaAdrDistrict")) {
                        if (field.getNewValue() != null) {
                            if (!masterData.get(MarriageConstants.DISTRICT).contains(field.getNewValue()))
                                errorMap.put("BRIDE PERMANENT ADDRESS: DISTRICT NAME INVALID", "bride district inside kerala " +
                                        field.getNewValue()+ " is invalid");
                        }
                    } else if (field.getField().equalsIgnoreCase("BrideAddressDetails.permntOutsideKeralaDistrict")) {
                        if (field.getNewValue() != null) {
                            if (!masterData.get(MarriageConstants.DISTRICT).contains(field.getNewValue()))
                                errorMap.put("BRIDE PERMANENT ADDRESS: DISTRICT  INVALID", "bride district ouside kerala" +
                                        field.getNewValue()+ " is invalid");
                        }
                    } else if (field.getField().equalsIgnoreCase("BrideAddressDetails.permntInKeralaAdrTaluk")) {
                        if (field.getNewValue() != null) {
                            if (!masterData.get(MarriageConstants.TALUK).contains(field.getNewValue()))
                                errorMap.put("BRIDE PERMANENT ADDRESS: TALUK NAME INVALID", "bride taluk inside kerala" +
                                        field.getNewValue() + " is invalid");
                        }
                    } else if (field.getField().equalsIgnoreCase("BrideAddressDetails.permntInKeralaAdrVillage")) {
                        if (field.getNewValue() != null) {
                            if (!masterData.get(MarriageConstants.VILLAGE).contains(field.getNewValue()))
                                errorMap.put("BRIDE PERMANENT ADDRESS: VILLAGE NAME INVALID", "bride village inside kerala " +
                                        field.getNewValue()+ " is invalid");
                        }
                    } else if (field.getField().equalsIgnoreCase("BrideAddressDetails.permntInKeralaAdrLBName")) {
                        if (field.getNewValue() != null) {
                            if (!masterData.get(MarriageConstants.TENANTS).contains(field.getNewValue()))
                                errorMap.put("BRIDE PERMANENT ADDRESS: LB NAME INVALID", "bride lbname inside kerala " +
                                        field.getNewValue()+ " is invalid");
                        }
                    } else if (field.getField().equalsIgnoreCase("BrideAddressDetails.permntInKeralaAdrPostOffice")) {
                        if (field.getNewValue() != null) {
                            if (!masterData.get(MarriageConstants.POSTOFFICE).contains(field.getNewValue()))
                                errorMap.put("BRIDE PERMANENT ADDRESS: POST OFFICE INVALID", "bride post office inside kerala " +
                                        field.getNewValue()+ " is invalid");
                        }
                    }*//*
                });
            });
        });*/

        if (!CollectionUtils.isEmpty(errorMap))
            throw new CustomException(errorMap);

    }

    private Map<String, List<String>> getAttributeValues(Object mdmsdata) {
        List<String> modulepaths = Arrays.asList(
                //MarriageConstants.CR_MDMS_TENANTS_CODE_JSONPATH,
                MarriageConstants.TENANT_JSONPATH,
                MarriageConstants.COMMON_MASTER_JSONPATH,
                MarriageConstants.BND_LIST_JSONPATH);
        final Map<String, List<String>> mdmsResMap = new HashMap<>();
        modulepaths.forEach(modulepath -> {
            try {
                mdmsResMap.putAll(JsonPath.read(mdmsdata, modulepath));
            } catch (Exception e) {
                log.error("Error while fetching MDMS data", e);
                throw new CustomException(MarriageConstants.INVALID_TENANT_ID_MDMS_KEY,
                        MarriageConstants.INVALID_TENANT_ID_MDMS_MSG);
            }

        });
        return mdmsResMap;
    }

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


    public WorkFlowCheck setMarriageCorrectionAmountFromMDMS(Object mdmsData, WorkFlowCheck wfc) {

        List<LinkedHashMap<String, Object>> wfLists = JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_MARRIAGE_NEW_WF_JSONPATH + "[*]");
        if(wfLists!=null){
            wfLists.stream().filter(wf->wf.get("WorkflowCode").equals(wfc.getWorkflowCode())).forEach(workFlow->{
                wfc.setApplicationType(workFlow.get("ApplicationType").toString());
                wfc.setPayment(Boolean.getBoolean(workFlow.get("payment").toString()));
                wfc.setAmount(Integer.parseInt(workFlow.get("amount").toString()));
                wfc.setActive(Boolean.getBoolean(workFlow.get("active").toString()));
            });
        }
        return wfc;
    }
}
