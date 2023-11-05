package org.ksmart.marriage.marriagecorrection.validator;

import org.apache.commons.collections4.CollectionUtils;
import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDetailsRequest;

import java.util.Calendar;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.ksmart.marriage.marriageapplication.web.model.marriage.WorkFlowCheck;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionRequest;
import org.ksmart.marriage.utils.MarriageConstants;
import org.springframework.stereotype.Component;

import com.jayway.jsonpath.JsonPath;

import static org.ksmart.marriage.marriageapplication.web.enums.ErrorCodes.MARRIAGE_DETAILS_INVALID_UPDATE;
import static org.ksmart.marriage.marriageapplication.web.enums.ErrorCodes.MARRIAGE_DETAILS_REQUIRED;
import static org.ksmart.marriage.marriageapplication.web.enums.ErrorCodes.MARRIAGE_DETAILS_INVALID_CREATE;



//import static org.ksmart.marriage.marriageapplication.web.enums.ErrorCodes.BIRTH_DETAILS_REQUIRED;

@Component
public class MarriageCorrectionValidator {
//
        public void validateCorrectionUpdate(MarriageCorrectionRequest request, List<MarriageApplicationDetails> searchResult) {
                List<MarriageApplicationDetails> marriageDetails = searchResult;

                if (CollectionUtils.isEmpty(marriageDetails)) {
                        throw new CustomException(MARRIAGE_DETAILS_REQUIRED.getCode(),
                                        "Marriage Correction Application is required.");
                }

                if (marriageDetails.size() > 1) { // NOPMD
                        throw new CustomException(MARRIAGE_DETAILS_INVALID_UPDATE.getCode(),
                                        "Supports only single Marriage Correction Application update request.");
                }

                if (marriageDetails.size() != searchResult.size()) {
                        throw new CustomException(MARRIAGE_DETAILS_INVALID_UPDATE.getCode(),
                                        "Marriage Correction Application(s) not found in database.");
                }
                // IMP:Have to enable after URI submission
               // validateCommonFields(request);
        }
        public void ruleEngineMarriage(MarriageDetailsRequest request, WorkFlowCheck wfc,Object mdmsdata){
                Long dateOfMarriage = 0L;
                String marriagePlace = null;
                String wfCode = null;
                String applicationType = null;
            
                List<MarriageApplicationDetails> marriageApplication = request.getMarriageDetails();
                for (MarriageApplicationDetails marriage : marriageApplication) {
                    dateOfMarriage = marriage.getDateofmarriage();
                    wfCode = marriage.getWorkflowcode();
                    applicationType = marriage.getModuleCode();
                }
                if (dateOfMarriage == null) {
                    throw new CustomException(MARRIAGE_DETAILS_INVALID_CREATE.getCode(),
                            "Date of birth is required for create request.");
                } else {
                    validateDoM(dateOfMarriage, wfCode,applicationType,mdmsdata, wfc);
                }
                if (marriageApplication!=null){
                        marriageApplication.forEach(marriagedtls -> {
   
                      Long dom = marriagedtls.getDateofmarriage();          
                      java.sql.Date domDate=new java.sql.Date(dom); 
                      int diffDays= getDaysDiff(domDate);  
                           
                      if(diffDays <= 45){
                        marriagedtls.setWfnormalRegn(true);
                      }
                      else if(diffDays > 45 && diffDays <= 1825){
                        marriagedtls.setWfdelayedWithinFiveYear(true);
                      }
                      else if(diffDays > 1825){
                        marriagedtls.setWfdelayedAfterFiveYear(true);
                      }
                    });
                }
             }
        //Jasmine -  Date of Marriage 11.04.2023
             public int getDaysDiff(Date dateToCheck) 
                {
                    long diffMilliseconds = new Date().getTime() - dateToCheck.getTime();
                    double diffSeconds = diffMilliseconds / 1000;
                    double diffMinutes = diffSeconds / 60;
                    double diffHours = diffMinutes / 60;
                    double diffDays = diffHours / 24;
                        
                    return (int) Math.round(diffDays);
                }
        //Jasmine -  Date of Marriage 11.04.2023
            private void validateDoM(Long dateOfMarriage, String wfCode, String applicationType,Object mdmsData, WorkFlowCheck wfc) {
                Calendar calendar = Calendar.getInstance();
                Long currentDate = calendar.getTimeInMillis();
            
                if (dateOfMarriage > currentDate) {
                    throw new CustomException(MARRIAGE_DETAILS_INVALID_CREATE.getCode(),
                            "Date of death should be less than or same as  current date.");
                } else {
                    wfc = checkValidation(mdmsData, dateOfMarriage, wfc);
            
                    if(!wfc.getWorkflowCode().equals(wfCode)) {
                        throw new CustomException(MARRIAGE_DETAILS_INVALID_CREATE.getCode(),
                                "Workflow code from the application request is wrong.");
                    }
                    if(!wfc.getApplicationType().equals(applicationType)) {
                        throw new CustomException(MARRIAGE_DETAILS_INVALID_CREATE.getCode(),
                                "Application type from the application request is wrong.");
                    }
                }
            }
 // Validate Marriage date MDMS data
        public WorkFlowCheck checkValidation(Object mdmsData, Long dateOfMarriage, WorkFlowCheck wfc) {
        // WorkFlowCheck wfc = new WorkFlowCheck();
                        Calendar calendar = Calendar.getInstance();
                        Long currentDate = calendar.getTimeInMillis();
  
                        List<LinkedHashMap<String, Object>> wfLists = JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_MARRIAGE_NEW_WF_JSONPATH + "[*]");
                        for (int n = 0; n < wfLists.size(); n++) {
                        String startStr = wfLists.get(n).get("startdateperiod").toString();
                        String endStr = wfLists.get(n).get("enddateperiod").toString();
                         Long start = Long.parseLong(startStr);
                         Long end = Long.parseLong(endStr);
                         if (end > 0L) {
                                Long comp = currentDate - dateOfMarriage;
                                if (comp > start && comp <= end){
                                        wfc.setApplicationType(wfLists.get(n).get("ApplicationType").toString());
                                        wfc.setWorkflowCode(wfLists.get(n).get("WorkflowCode").toString());
                                        wfc.setPayment(Boolean.getBoolean(wfLists.get(n).get("payment").toString()));
                                        wfc.setAmount(Integer.parseInt(wfLists.get(n).get("amount").toString()));
                                        wfc.setActive(Boolean.getBoolean(wfLists.get(n).get("active").toString()));
                                        //  System.out.println("wfCodetesting"+wfLists.get(n).get("WorkflowCode").toString());
                                }
                        }
                        }
                return wfc;
        }
       
}
