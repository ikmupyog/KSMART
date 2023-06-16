package org.ksmart.marriage.marriageapplication.validator;

import org.apache.commons.collections4.CollectionUtils;
import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDetailsRequest;

import java.util.Calendar;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.ObjectUtils.Null;
import org.ksmart.marriage.marriageapplication.web.model.marriage.BrideAddressDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.BrideDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.GroomAddressDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.GroomDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.WitnessDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.WorkFlowCheck;
import org.ksmart.marriage.utils.MarriageConstants;
import org.springframework.stereotype.Component;

import com.jayway.jsonpath.JsonPath;

import static org.ksmart.marriage.marriageapplication.web.enums.ErrorCodes.MARRIAGE_DETAILS_INVALID_UPDATE;
import static org.ksmart.marriage.marriageapplication.web.enums.ErrorCodes.MARRIAGE_DETAILS_REQUIRED;
import static org.ksmart.marriage.marriageapplication.web.enums.ErrorCodes.MARRIAGE_DETAILS_INVALID_CREATE;



//import static org.ksmart.marriage.marriageapplication.web.enums.ErrorCodes.BIRTH_DETAILS_REQUIRED;

@Component
public class MarriageApplicationValidator {

        public void validateUpdate(MarriageDetailsRequest request, List<MarriageApplicationDetails> searchResult) {
                List<MarriageApplicationDetails> marriageDetails = request.getMarriageDetails();

                if (CollectionUtils.isEmpty(marriageDetails)) {
                        throw new CustomException(MARRIAGE_DETAILS_REQUIRED.getCode(),
                                        "Marriage registration is required.");
                }

                if (marriageDetails.size() > 1) { // NOPMD
                        throw new CustomException(MARRIAGE_DETAILS_INVALID_UPDATE.getCode(),
                                        "Supports only single Marriage registration update request.");
                }

                if (marriageDetails.size() != searchResult.size()) {
                        throw new CustomException(MARRIAGE_DETAILS_INVALID_UPDATE.getCode(),
                                        "Marriage registration(s) not found in database.");
                }
                // IMP:Have to enable after URI submission
                validateCommonFields(request);
        }

        public void ruleEngineMarriage(MarriageDetailsRequest request, WorkFlowCheck wfc,Object mdmsdata){
                Long dateOfMarriage = 0L;
                //String marriagePlace = null;
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
                            "Date of marriage is required for create request.");
                } else {
                        Boolean isBackward = request.getMarriageDetails().get(0).getWitnessDetails().getIsBackward();
                    validateDoM(dateOfMarriage, wfCode,applicationType,mdmsdata, wfc,isBackward);
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
            private void validateDoM(Long dateOfMarriage, String wfCode, String applicationType,Object mdmsData, WorkFlowCheck wfc ,Boolean isBackward) {
                Calendar calendar = Calendar.getInstance();
                Long currentDate = calendar.getTimeInMillis();
                if (dateOfMarriage > currentDate) {
                    throw new CustomException(MARRIAGE_DETAILS_INVALID_CREATE.getCode(),
                            "Date of marriage should be less than or same as  current date.");
                } else {
                    wfc = checkValidation(mdmsData, dateOfMarriage, wfc ,isBackward);
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
        public WorkFlowCheck checkValidation(Object mdmsData, Long dateOfMarriage, WorkFlowCheck wfc ,Boolean isBackward) {
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
                              //   System.out.println("datedifference"+wfLists);
                                if (comp > start && comp <= end){
                                        wfc.setApplicationType(wfLists.get(n).get("ApplicationType").toString());
                                        wfc.setWorkflowCode(wfLists.get(n).get("WorkflowCode").toString());
                                        wfc.setPayment(Boolean.getBoolean(wfLists.get(n).get("payment").toString()));
                                        if (isBackward){
                                                wfc.setAmount(Integer.parseInt(wfLists.get(n).get("scstamount").toString()));
                                        }else{
                                                wfc.setAmount(Integer.parseInt(wfLists.get(n).get("amount").toString()));
                                        }
                                        wfc.setActive(Boolean.getBoolean(wfLists.get(n).get("active").toString()));
                                }
                        }
                        }
                return wfc;
        }
        public void validateCommonFields(MarriageDetailsRequest request) {

                List<MarriageApplicationDetails> marriageApplication = request.getMarriageDetails();
                if (marriageApplication != null) {
                        marriageApplication
                                        .forEach(marriagedtls -> {
                                                GroomDetails groomInfo = marriagedtls.getGroomDetails();
                                                GroomAddressDetails groomaddressInfo = marriagedtls.getGroomAddressDetails();
                                                BrideDetails brideInfo = marriagedtls.getBrideDetails();
                                                BrideAddressDetails brideaddressInfo = marriagedtls.getBrideAddressDetails();
                                                WitnessDetails witnessDtls = marriagedtls.getWitnessDetails();
                                                if (marriagedtls.getDateofmarriage() <= 0) {
                                                        throw new CustomException(" DATE OF MARRIAGE INVALID ",
                                                                        "The  Date of marriage " +
                                                                                        marriagedtls.getDateofmarriage()
                                                                                        + " is invalid");
                                                }

                                                if (StringUtils.isEmpty(marriagedtls.getDistrictid())) {
                                                        throw new CustomException(" DISTRICT INVALID ",
                                                                        "The  District " +
                                                                                        marriagedtls.getDistrictid()
                                                                                        + " is invalid");
                                                }

                                                if (StringUtils.isEmpty(marriagedtls.getTalukid())) {
                                                        throw new CustomException(" TALUK INVALID ", "The  Taluk " +
                                                                        marriagedtls.getTalukid() + " is invalid");
                                                }
                                                if (StringUtils.isEmpty(marriagedtls.getVillageName())) {
                                                        throw new CustomException(" VILLAGE INVALID ", "The  Village " +
                                                                        marriagedtls.getVillageName() + " is invalid");
                                                }

                                                if (StringUtils.isEmpty(marriagedtls.getLbtype())) {
                                                        throw new CustomException(" LB TYPE INVALID ", "The  LB type " +
                                                                        marriagedtls.getLbtype() + " is invalid");
                                                }

                                                if (StringUtils.isEmpty(marriagedtls.getWardCode())) {
                                                        throw new CustomException(" WARD INVALID ", "The  Ward " +
                                                                        marriagedtls.getWardCode() + " is invalid");
                                                }

                                                if (StringUtils.isEmpty(marriagedtls.getPlacetype())) {
                                                        throw new CustomException(" MARRIAGE PLACE TYPE INVALID ",
                                                                        "The  Place type " +
                                                                                        marriagedtls.getPlacetype()
                                                                                        + " is invalid");
                                                } else {
                                                        if (marriagedtls.getPlacetype()
                                                                        .equals(MarriageConstants.PLACE_TYPE_HOUSE)) {
                                                                if (StringUtils.isEmpty(
                                                                                marriagedtls.getLocalityEn())) {
                                                                        throw new CustomException(
                                                                                        " MARRIAGE PLACE LOCALITY ENGLISH INVALID ",
                                                                                        "The  Place Locality Name in English "
                                                                                                        +
                                                                                                        marriagedtls.getLocalityEn()
                                                                                                        + " is invalid");
                                                                }
                                                                if (StringUtils.isEmpty(
                                                                                marriagedtls.getLocalityMl())) {
                                                                        throw new CustomException(
                                                                                        " MARRIAGE PLACE LOCALITY MALAYALAM INVALID ",
                                                                                        "The  Place Locality Name in Malayalam "
                                                                                                        +
                                                                                                        marriagedtls.getLocalityMl()
                                                                                                        + " is invalid");
                                                                }
                                                                if (StringUtils.isEmpty(marriagedtls
                                                                                .getMarriageHouseNoAndNameEn())) {
                                                                        throw new CustomException(
                                                                                        " HOUSE NAME ENGLISH INVALID ",
                                                                                        "The  House Name English " +
                                                                                                        marriagedtls.getMarriageHouseNoAndNameEn()
                                                                                                        + " is invalid");
                                                                }
                                                                if (StringUtils.isEmpty(marriagedtls
                                                                                .getMarriageHouseNoAndNameMl())) {
                                                                        throw new CustomException(
                                                                                        " HOUSE NAME MALAYALAM INVALID ",
                                                                                        "The  House Name Malayalam " +
                                                                                                        marriagedtls.getMarriageHouseNoAndNameMl()
                                                                                                        + " is invalid");
                                                                }

                                                        }

                                                        if (marriagedtls.getPlacetype().equals(MarriageConstants.PLACE_TYPE_RELIGIOUS_INSTITUTION)
                                                        || marriagedtls.getPlacetype().equals(MarriageConstants.PLACE_TYPE_MANDAPAM_OTHER)
                                                        || marriagedtls.getPlacetype().equals(MarriageConstants.PLACE_TYPE_REGISTRAR_OFFICE))
                                                        {
                                                                if (StringUtils.isEmpty(

                                                                                marriagedtls.getPlaceid())) {
                                                                      //  System.out.println("marriageward" + marriagedtls.getPlaceid());
                                                                        throw new CustomException(
                                                                                        " PLACE ID  IS INVALID ",
                                                                                        "The  Place Id English " +
                                                                                                        marriagedtls.getPlaceid()
                                                                                                        + " is invalid");
                                                                } 
                                                                // else {
                                                                //         if (marriagedtls.getPlacenameEn().equals(
                                                                //                         MarriageConstants.PLACE_OTHER)) {
                                                                //                 if (StringUtils.isEmpty(marriagedtls
                                                                //                                 .getPlacenameEn())) {
                                                                //                         throw new CustomException(
                                                                //                                         " PLACE NAME ENGLISH IS INVALID ",
                                                                //                                         "The  Place Name English "
                                                                //                                                         +
                                                                //                                                         marriagedtls.getPlacenameEn()
                                                                //                                                         + " is invalid");
                                                                //                 }
                                                                //                 if (StringUtils.isEmpty(marriagedtls
                                                                //                                 .getPlacenameMl())) {
                                                                //                         throw new CustomException(
                                                                //                                         " PLACE NAME MALAYALAM IS INVALID ",
                                                                //                                         "The  Place Name Malayalam "
                                                                //                                                         +
                                                                //                                                         marriagedtls.getPlacenameMl()
                                                                //                                                         + " is invalid");
                                                                //                 }
                                                                //                 if (StringUtils.isEmpty(marriagedtls
                                                                //                                 .getLocalityEn())) {
                                                                //                         throw new CustomException(
                                                                //                                         " LOCALITY NAME ENGLISH IS INVALID ",
                                                                //                                         "The  Locality Name English "
                                                                //                                                         +
                                                                //                                                         marriagedtls.getLocalityEn()
                                                                //                                                         + " is invalid");
                                                                //                 }
                                                                //                 if (StringUtils.isEmpty(marriagedtls
                                                                //                                 .getLocalityMl())) {
                                                                //                         throw new CustomException(
                                                                //                                         " LOCALITY NAME MALAYALAM IS INVALID ",
                                                                //                                         "The  Locality Name Malayalam "
                                                                //                                                         +
                                                                //                                                         marriagedtls.getLocalityMl()
                                                                //                                                         + " is invalid");
                                                                //                 }
                                                                //         }

                                                                // }

                                                        }

                                                        if (marriagedtls.getPlacetype().equals(MarriageConstants.PLACE_TYPE_PRIVATE_PLACE) 
                                                        || (marriagedtls.getPlacetype().equals(MarriageConstants.PLACE_TYPE_PUBLIC_PLACE))
                                                        || (marriagedtls.getPlacetype().equals(MarriageConstants.PLACE_OTHER))
                                                        ) {
                                                                if (StringUtils.isEmpty(
                                                                                marriagedtls.getPlacenameEn())) {
                                                                        throw new CustomException(
                                                                                        " PLACE NAME ENGLISH IS INVALID ",
                                                                                        "The  Place Name English " +
                                                                                                        marriagedtls.getPlacenameEn()
                                                                                                        + " is invalid");
                                                                }
                                                                if (StringUtils.isEmpty(
                                                                                marriagedtls.getPlacenameMl())) {
                                                                        throw new CustomException(
                                                                                        " PLACE NAME MALAYALAM IS INVALID ",
                                                                                        "The  Place Name Malayalam " +
                                                                                                        marriagedtls.getPlacenameMl()
                                                                                                        + " is invalid");
                                                                }
                                                                 if (StringUtils.isEmpty(
                                                                                 marriagedtls.getLocalityEn())) {
                                                                         throw new CustomException(
                                                                                         " LOCALITY NAME ENGLISH IS INVALID ",
                                                                                         "The  Locality Name English " +
                                                                                                         marriagedtls.getLocalityEn()
                                                                                                         + " is invalid");
                                                                 }
                                                                 if (StringUtils.isEmpty(
                                                                                 marriagedtls.getLocalityMl())) {
                                                                         throw new CustomException(
                                                                                         " LOCALITY NAME MALAYALAM IS INVALID ",
                                                                                         "The  Locality Name Malayalam" +
                                                                                                         marriagedtls.getLocalityMl()
                                                                                                         + " is invalid");
                                                                }
                                                        }
                                                }

                                                if (StringUtils.isEmpty(groomInfo.getResidentship())) {
                                                        throw new CustomException("GROOM RESIDENTSHIP INVALID ",
                                                                        "The  groom residentship " +
                                                                                        groomInfo.getResidentship()
                                                                                        + " is invalid");

                                                } else {
                                                        if (groomInfo.getResidentship().equals(
                                                                        MarriageConstants.RESIDENTSHIP_INDIAN)) {
                                                                if (StringUtils.isEmpty(groomInfo.getAadharno())) {
                                                                        System.out.println(groomInfo.getAadharno());

                                                                        throw new CustomException(
                                                                                        "GROOM AADHAR INVALID ",
                                                                                        "The groom  Aadhar number " +
                                                                                                        groomInfo.getAadharno()
                                                                                                        + " is invalid");
                                                                }

                                                        } else if (groomInfo.getResidentship()
                                                                        .equals(MarriageConstants.RESIDENTSHIP_NRI)) {
                                                                if (StringUtils.isEmpty(groomInfo.getPassportno())) {
                                                                        throw new CustomException(
                                                                                        "GROOM PASSPORT NUMBER INVALID ",
                                                                                        "The groom  Passport number " +
                                                                                                        groomInfo.getPassportno()
                                                                                                        + " is invalid");
                                                                }
                                                        } else if (groomInfo.getResidentship().equals(
                                                                        MarriageConstants.RESIDENTSHIP_FOREIGN)) {
                                                                if (StringUtils.isEmpty(groomInfo.getPassportno())
                                                                                && StringUtils.isEmpty(groomInfo
                                                                                                .getSocialsecurityno())
                                                                                || StringUtils.isEmpty(groomInfo
                                                                                                .getPassportno())
                                                                                ||
                                                                                StringUtils.isEmpty(groomInfo
                                                                                                .getSocialsecurityno())) {
                                                                        throw new CustomException(
                                                                                        "GROOM PASSPORT NUMBER AND SOCIAL SECURITY NUMBER INVALID ",
                                                                                        "The groom  Passport number and Social security number "
                                                                                                        +
                                                                                                        groomInfo.getPassportno()
                                                                                                        + " and "
                                                                                                        + groomInfo.getSocialsecurityno()
                                                                                                        + " is invalid");
                                                                }
                                                        }

                                                }
                                             //   System.out.println("groomname" + groomInfo.getFirstnameEn());
                                                if (StringUtils.isEmpty(groomInfo.getFirstnameEn())) {
                                                        throw new CustomException(" GROOM NAME ENGLISH INVALID ",
                                                                        "The groom name in english " +
                                                                                        groomInfo.getFirstnameEn()
                                                                                        + " is invalid");
                                                }
                                                if (StringUtils.isEmpty(groomInfo.getFirstnameMl())) {
                                                        throw new CustomException("GROOM NAME MALAYALAM INVALID ",
                                                                        "The groom name in malayalam " +
                                                                                        groomInfo.getFirstnameMl()
                                                                                        + " is invalid");
                                                }
                                                if (groomInfo.getMobile() <= 0) {
                                                        throw new CustomException("GROOM CONTACT NUMBER INVALID ",
                                                                        "The  groom mobile number " +
                                                                                        groomInfo.getMobile()
                                                                                        + " is invalid");
                                                }
                                                if (StringUtils.isEmpty(groomInfo.getGender())) {
                                                        throw new CustomException("GROOM GENDER INVALID ",
                                                                        "The groom  gender " +
                                                                                        groomInfo.getGender()
                                                                                        + " is invalid");
                                                }
                                                if ((groomInfo.getDateofbirth() <= 0)) {
                                                        throw new CustomException("GROOM BIRTH DATE INVALID ",
                                                                        "The groom date of birth can't be null ");
                                                }
                                                if (groomInfo.getParentGuardian().equals(MarriageConstants.PARENT)) {

                                                        if (StringUtils.isEmpty(groomInfo.getFathernameEn())) {
                                                                throw new CustomException(" GROOM FATHER NAME ENGLISH ",
                                                                                "The  groom Father  Name in english " +
                                                                                                groomInfo.getFathernameEn()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(groomInfo.getFathernameMl())) {
                                                                throw new CustomException(
                                                                                " GROOM FATHER NAME MALAYALAM ",
                                                                                "The  groom Father  Name in malayalam "
                                                                                                +
                                                                                                groomInfo.getFathernameMl()
                                                                                                + " is invalid");
                                                        }

                                                        if (StringUtils.isEmpty(groomInfo.getMothernameEn())) {
                                                                throw new CustomException(" GROOM MOTHER NAME ENGLISH ",
                                                                                "The  groom Mother  Name in english " +
                                                                                                groomInfo.getMothernameEn()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(groomInfo.getMothernameMl())) {
                                                                throw new CustomException(
                                                                                " GROOM MOTHER NAME MALAYALAM ",
                                                                                "The  groom Mother  Name in malayalam "
                                                                                                +
                                                                                                groomInfo.getMothernameMl()
                                                                                                + " is invalid");
                                                        }
                                               } else {
                                                        if (StringUtils.isEmpty(groomInfo.getGuardiannameEn())) {
                                                                throw new CustomException(
                                                                                " GROOM GUARDIAN NAME ENGLISH ",
                                                                                "The  groom Guardian  Name in english "
                                                                                                +
                                                                                                groomInfo.getGuardiannameEn()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(groomInfo.getGuardiannameMl())) {
                                                                throw new CustomException(
                                                                                " GROOM GUARDIAN NAME MALAYALAM ",
                                                                                "The  groom Guardian  Name in malayalam "
                                                                                                +
                                                                                                groomInfo.getGuardiannameMl()
                                                                                                + " is invalid");
                                                        }
                                                }

                                                if (StringUtils.isEmpty(groomInfo.getMaritalstatusid())) {
                                                        throw new CustomException("GROOM MARITAL STATUS INVALID ",
                                                                        "The groom Marital status " +
                                                                                        groomInfo.getMaritalstatusid()
                                                                                        + " is invalid");
                                                }
                                                // else {
                                                // if
                                                // (groomInfo.getMaritalstatusid().equals(MarriageConstants.MARITAL_STATUS_DIVORCED))
                                                // {
                                                // if
                                                // (groomInfo.getGroomIsSpouseLiving().equals(MarriageConstants.VALUE_FALSE)
                                                // &&
                                                // groomInfo.getGroomNoOfSpouse().equals(MarriageConstants.VALUE_FALSE))
                                                // {
                                                // throw new CustomException(" IS SPOUSE LIVING AND NO OF SPOUSE
                                                // INVALID",
                                                // "The Is spouse living and no of spouse living" +
                                                // groomInfo.getGroomIsSpouseLiving() + "and"
                                                // + groomInfo.getGroomNoOfSpouse() + " is invalid");
                                                // }
                                                // }
                                                // else
                                                // if(groomInfo.getMaritalstatusid().equals(MarriageConstants.MARITAL_STATUS_ANNULLED))
                                                // {
                                                // if
                                                // (groomInfo.getGroomIsSpouseLiving().equals(MarriageConstants.VALUE_FALSE)
                                                // &&
                                                // groomInfo.getGroomNoOfSpouse().equals(MarriageConstants.VALUE_FALSE))
                                                // {
                                                // throw new CustomException(" IS SPOUSE LIVING AND NO OF SPOUSE
                                                // INVALID",
                                                // "The Is spouse living and no of spouse living" +
                                                // groomInfo.getGroomIsSpouseLiving() + "and"
                                                // + groomInfo.getGroomNoOfSpouse() + " is invalid");
                                                // }
                                                // }
                                                // else
                                                // if(groomInfo.getMaritalstatusid().equals(MarriageConstants.MARITAL_STATUS_MARRIED))
                                                // {
                                                // if
                                                // (groomInfo.getGroomIsSpouseLiving().equals(MarriageConstants.VALUE_FALSE)
                                                // &&
                                                // groomInfo.getGroomNoOfSpouse().equals(MarriageConstants.VALUE_FALSE))
                                                // {
                                                // throw new CustomException(" IS SPOUSE LIVING AND NO OF SPOUSE
                                                // INVALID",
                                                // "The Is spouse living and no of spouse living" +
                                                // groomInfo.getGroomIsSpouseLiving() + "and"
                                                // + groomInfo.getGroomNoOfSpouse() + " is invalid");
                                                // }
                                                // }
                                                // else
                                                // if(groomInfo.getMaritalstatusid().equals(MarriageConstants.MARITAL_STATUS_WIDOWED))
                                                // {
                                                // if
                                                // (groomInfo.getGroomIsSpouseLiving().equals(MarriageConstants.VALUE_FALSE)
                                                // &&
                                                // groomInfo.getGroomNoOfSpouse().equals(MarriageConstants.VALUE_FALSE))
                                                // {
                                                // throw new CustomException(" IS SPOUSE LIVING AND NO OF SPOUSE
                                                // INVALID",
                                                // "The Is spouse living and no of spouse living" +
                                                // groomInfo.getGroomIsSpouseLiving() + "and"
                                                // + groomInfo.getGroomNoOfSpouse() + " is invalid");
                                                // }
                                                // }
                                                // }

                                                if (StringUtils.isEmpty(brideInfo.getResidentship())) {
                                                        throw new CustomException("BRIDE RESIDENTSHIP INVALID ",
                                                                        "The  bride resident" +
                                                                                        brideInfo.getResidentship()
                                                                                        + " is invalid ");

                                                } else {
                                                        if (brideInfo.getResidentship().equals(
                                                                        MarriageConstants.RESIDENTSHIP_INDIAN)) {
                                                                if (StringUtils.isEmpty(brideInfo.getAadharno())) {
                                                                        throw new CustomException(
                                                                                        "BRIDE AADHAR INVALID ",
                                                                                        "The bride Aadhar number " +
                                                                                                        brideInfo.getAadharno()
                                                                                                        + " is invalid");
                                                                }

                                                        } else if (brideInfo.getResidentship()
                                                                        .equals(MarriageConstants.RESIDENTSHIP_NRI)) {
                                                                if (StringUtils.isEmpty(brideInfo.getPassportno())) {
                                                                        throw new CustomException(
                                                                                        "BRIDE PASSPORT NUMBER INVALID ",
                                                                                        "The bride  Passport number " +
                                                                                                        brideInfo.getPassportno()
                                                                                                        + " is invalid");
                                                                }
                                                        } else if (brideInfo.getResidentship().equals(
                                                                        MarriageConstants.RESIDENTSHIP_FOREIGN)) {

                                                                if (StringUtils.isEmpty(brideInfo.getPassportno())
                                                                                && StringUtils.isEmpty(brideInfo
                                                                                                .getSocialsecurityno())
                                                                                || StringUtils.isEmpty(brideInfo
                                                                                                .getPassportno())
                                                                                ||
                                                                                StringUtils.isEmpty(brideInfo
                                                                                                .getSocialsecurityno())) {
                                                                        throw new CustomException(
                                                                                        "BRIDE PASSPORT NUMBER AND SOCIAL SECURITY NUMBER INVALID ",
                                                                                        "The  bride Passport number and Social security number "
                                                                                                        +
                                                                                                        brideInfo.getPassportno()
                                                                                                        + "and"
                                                                                                        + brideInfo.getSocialsecurityno()
                                                                                                        + " is invalid");
                                                                }
                                                        }

                                                }

                                                if (StringUtils.isEmpty(brideInfo.getFirstnameEn())) {
                                                        throw new CustomException("BRIDE NAME ENGLISH INVALID ",
                                                                        "The bride name in english " +
                                                                                        brideInfo.getFirstnameEn()
                                                                                        + " is invalid");
                                                }
                                                if (StringUtils.isEmpty(brideInfo.getFirstnameMl())) {
                                                        throw new CustomException("BRIDE NAME MALAYALAM INVALID ",
                                                                        "The bride name in malayalam " +
                                                                                        brideInfo.getFirstnameMl()
                                                                                        + " is invalid");
                                                }
                                                if (brideInfo.getMobile() <= 0) {
                                                        throw new CustomException("BRIDE CONTACT NUMBER INVALID ",
                                                                        "The  bride mobile number " +
                                                                                        brideInfo.getMobile()
                                                                                        + " is invalid");
                                                }
                                                if (StringUtils.isEmpty(brideInfo.getGender())) {
                                                        throw new CustomException("BRIDE GENDER INVALID",
                                                                        "The bride  gender " +
                                                                                        brideInfo.getGender()
                                                                                        + " is invalid ");
                                                }
                                                if ((brideInfo.getDateofbirth() <= 0)) {
                                                        throw new CustomException("BRIDE DATE OF BIRTH INVALID ",
                                                                        "The bride date of birth can't be null ");
                                                }
                                                if (brideInfo.getParentGuardian().equals(MarriageConstants.PARENT)) {
                                                        if (StringUtils.isEmpty(brideInfo.getFathernameEn())) {
                                                                throw new CustomException(" BRIDE FATHER NAME ENGLISH ",
                                                                                "The  bride Father  Name in english " +
                                                                                                brideInfo.getFathernameEn()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(brideInfo.getFathernameMl())) {
                                                                throw new CustomException(
                                                                                " BRIDE FATHER NAME MALAYALAM ",
                                                                                "The  bride Father  Name in malayalam "
                                                                                                +
                                                                                                brideInfo.getFathernameMl()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(brideInfo.getMothernameEn())) {
                                                                throw new CustomException(" BRIDE MOTHER NAME ENGLISH ",
                                                                                "The  bride Mother  Name in english " +
                                                                                                brideInfo.getMothernameEn()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(brideInfo.getMothernameMl())) {
                                                                throw new CustomException(
                                                                                " BRIDE MOTHER NAME MALAYALAM ",
                                                                                "The  bride Mother  Name in malayalam "
                                                                                                +
                                                                                                brideInfo.getMothernameMl()
                                                                                                + " is invalid");
                                                        }
                                                } else {
                                                        if (StringUtils.isEmpty(brideInfo.getGuardiannameEn())) {
                                                                throw new CustomException(
                                                                                " BRIDE GUARDIAN NAME ENGLISH ",
                                                                                "The  bride Guardian  Name in english "
                                                                                                +
                                                                                                brideInfo.getGuardiannameEn()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(brideInfo.getGuardiannameMl())) {
                                                                throw new CustomException(
                                                                                " BRIDE GUARDIAN NAME MALAYALAM ",
                                                                                "The  bride Guardian  Name in malayalam "
                                                                                                +
                                                                                                brideInfo.getGuardiannameMl()
                                                                                                + " is invalid");
                                                        }
                                                }

                                                if (StringUtils.isEmpty(brideInfo.getMaritalstatusid())) {
                                                        throw new CustomException("BRIDE: MARITAL STATUS INVALID ",
                                                                        "The bride Marital status " +
                                                                                        brideInfo.getMaritalstatusid()
                                                                                        + " is invalid");
                                                }
                                                // else {
                                                // if
                                                // (brideInfo.getMaritalstatusid().equals(MarriageConstants.MARITAL_STATUS_DIVORCED))
                                                // {
                                                // if
                                                // (brideInfo.getGroomIsSpouseLiving().equals(MarriageConstants.VALUE_FALSE)
                                                // &&
                                                // brideInfo.getGroomNoOfSpouse().equals(MarriageConstants.VALUE_FALSE))
                                                // {
                                                // throw new CustomException(" IS SPOUSE LIVING AND NO OF SPOUSE
                                                // INVALID",
                                                // "The Is spouse living and no of spouse living" +
                                                // brideInfo.getGroomIsSpouseLiving() + "and"
                                                // + brideInfo.getGroomNoOfSpouse() + " is invalid");
                                                // }
                                                // }
                                                // else
                                                // if(brideInfo.getMaritalstatusid().equals(MarriageConstants.MARITAL_STATUS_ANNULLED))
                                                // {
                                                // if
                                                // (brideInfo.getGroomIsSpouseLiving().equals(MarriageConstants.VALUE_FALSE)
                                                // &&
                                                // brideInfo.getGroomNoOfSpouse().equals(MarriageConstants.VALUE_FALSE))
                                                // {
                                                // throw new CustomException(" IS SPOUSE LIVING AND NO OF SPOUSE
                                                // INVALID",
                                                // "The Is spouse living and no of spouse living" +
                                                // brideInfo.getGroomIsSpouseLiving() + "and"
                                                // + brideInfo.getGroomNoOfSpouse() + " is invalid");
                                                // }
                                                // }
                                                // else
                                                // if(brideInfo.getMaritalstatusid().equals(MarriageConstants.MARITAL_STATUS_MARRIED))
                                                // {
                                                // if
                                                // (brideInfo.getGroomIsSpouseLiving().equals(MarriageConstants.VALUE_FALSE)
                                                // &&
                                                // brideInfo.getGroomNoOfSpouse().equals(MarriageConstants.VALUE_FALSE))
                                                // {
                                                // throw new CustomException(" IS SPOUSE LIVING AND NO OF SPOUSE
                                                // INVALID",
                                                // "The Is spouse living and no of spouse living" +
                                                // brideInfo.getGroomIsSpouseLiving() + "and"
                                                // + brideInfo.getGroomNoOfSpouse() + " is invalid");
                                                // }
                                                // }
                                                // else
                                                // if(brideInfo.getMaritalstatusid().equals(MarriageConstants.MARITAL_STATUS_WIDOWED))
                                                // {
                                                // if
                                                // (brideInfo.getGroomIsSpouseLiving().equals(MarriageConstants.VALUE_FALSE)
                                                // &&
                                                // brideInfo.getGroomNoOfSpouse().equals(MarriageConstants.VALUE_FALSE))
                                                // {
                                                // throw new CustomException(" IS SPOUSE LIVING AND NO OF SPOUSE
                                                // INVALID",
                                                // "The Is spouse living and no of spouse living" +
                                                // brideInfo.getGroomIsSpouseLiving() + "and"
                                                // + brideInfo.getGroomNoOfSpouse() + " is invalid");
                                                // }
                                                // }
                                                // }

                                                // groom permanent address start
                                        if (StringUtils.isEmpty(groomaddressInfo.getPermtaddressCountry())) {
                                                        throw new CustomException(
                                                                        "GROOM PERMANENT ADDRESS: COUNTRY INVALID ",
                                                                        "The Country name " + groomaddressInfo.getPermtaddressCountry()+ " is invalid");
                                        } else {
                                                        if (groomaddressInfo.getPermtaddressCountry().equals(MarriageConstants.ADDRESS_INDIA)) {
                                                                if (StringUtils.isEmpty(groomaddressInfo.getPermtaddressStateName())) {
                                                                        throw new CustomException(
                                                                                        "GROOM PERMANENT ADDRESS: STATE INVALID ",
                                                                                        "The State " + groomaddressInfo.getPermtaddressStateName() + " is invalid");
                                                                } else {
                                                                        if (groomaddressInfo.getPermtaddressStateName().equals(MarriageConstants.ADDRESS_KERALA)) {
                                                                                if (StringUtils.isEmpty(groomaddressInfo.getPermntInKeralaAdrDistrict())) {
                                                                                        throw new CustomException(
                                                                                                        "GROOM PERMANENT ADDRESS INSIDE KERALA: DISTRICT INVALID ",
                                                                                                        "The   District " +
                                                                                                                        groomaddressInfo.getPermntInKeralaAdrDistrict()
                                                                                                                        + " is invalid");
                                                                                }
                                                                                if (StringUtils.isEmpty(groomaddressInfo.getPermntInKeralaAdrTaluk())) {
                                                                                        throw new CustomException(
                                                                                                        "GROOM PERMANENT ADDRESS INSIDE KERALA: TALUK INVALID ",
                                                                                                        "The   Taluk " +
                                                                                                                        groomaddressInfo.getPermntInKeralaAdrTaluk()
                                                                                                                        + " is invalid");
                                                                                }

                                                                                if (StringUtils.isEmpty(groomaddressInfo.getPermntInKeralaAdrVillage())) {
                                                                                        throw new CustomException(
                                                                                                        "GROOM PERMANENT ADDRESS INSIDE KERALA: VILLAGE INVALID ",
                                                                                                        "The   Village " +
                                                                                                                        groomaddressInfo.getPermntInKeralaAdrVillage()
                                                                                                                        + " is invalid");
                                                                                }
                                                                                if (StringUtils.isEmpty(groomaddressInfo
                                                                                                .getPermntInKeralaAdrLBName())) {
                                                                                        throw new CustomException(
                                                                                                        "GROOM PERMANENT ADDRESS INSIDE KERALA: LOCALBODY NAME INVALID ",
                                                                                                        "The   Localbody Name "
                                                                                                                        +
                                                                                                                        groomaddressInfo.getPermntInKeralaAdrLBName()
                                                                                                                        + " is invalid");
                                                                                }
                                                                                if (StringUtils.isEmpty(groomaddressInfo
                                                                                                .getPermntInKeralaWardNo())) {
                                                                                        throw new CustomException(
                                                                                                        "GROOM PERMANENT ADDRESS INSIDE KERALA: WARD INVALID ",
                                                                                                        "The   Ward " +
                                                                                                                        groomaddressInfo.getPermntInKeralaWardNo()
                                                                                                                        + " is invalid");
                                                                                }
                                                                                if (StringUtils.isEmpty(groomaddressInfo
                                                                                                .getPermntInKeralaAdrPostOffice())) {
                                                                                        throw new CustomException(
                                                                                                        "GROOM PERMANENT ADDRESS INSIDE KERALA: POSTOFFICE INVALID ",
                                                                                                        "The Postoffice " +
                                                                                                                        groomaddressInfo.getPermntInKeralaAdrPostOffice()
                                                                                                                        + " is invalid");
                                                                                }
                                                                                if (StringUtils.isEmpty(groomaddressInfo
                                                                                                .getPermntInKeralaAdrPincode())) {

                                                                                        throw new CustomException(
                                                                                                        "GROOM PERMANENT ADDRESS INSIDE KERALA: PINCODE INVALID ",
                                                                                                        "The Pincode " +
                                                                                                                        groomaddressInfo.getPermntInKeralaAdrPincode()
                                                                                                                        + " is invalid");
                                                                                }
                                                                                // if (StringUtils.isEmpty(groomaddressInfo
                                                                                //                 .getPermntInKeralaAdrLocalityNameEn())) {
                                                                                //         throw new CustomException(
                                                                                //                         "GROOM PERMANENT ADDRESS INSIDE KERALA: LOCALITY NAME ENGLISH IS  INVALID ",
                                                                                //                         "The Locality English "
                                                                                //                                         +
                                                                                //                                         groomaddressInfo.getPermntInKeralaAdrLocalityNameEn()
                                                                                //                                         + " is invalid");
                                                                                // }
                                                                                // if (StringUtils.isEmpty(groomaddressInfo
                                                                                //                 .getPermntInKeralaAdrLocalityNameMl())) {
                                                                                //         throw new CustomException(
                                                                                //                         "GROOM PERMANENT ADDRESS INSIDE KERALA: LOCALITY NAME MALAYALAM IS INVALID ",
                                                                                //                         "The Locality Malayalam "
                                                                                //                                         +
                                                                                //                                         groomaddressInfo.getPermntInKeralaAdrLocalityNameMl()
                                                                                //                                         + " is invalid");
                                                                                // }
                                                                                if (StringUtils.isEmpty(groomaddressInfo
                                                                                                .getPermntInKeralaAdrHouseNameEn())) {
                                                                                        throw new CustomException(
                                                                                                        "GROOM PERMANENT ADDRESS INSIDE KERALA: HOUSE NAME ENGLISH INVALID ",
                                                                                                        "The House Name English "
                                                                                                                        +
                                                                                                                        groomaddressInfo.getPermntInKeralaAdrHouseNameEn()
                                                                                                                        + " is invalid");
                                                                                }
                                                                                if (StringUtils.isEmpty(groomaddressInfo
                                                                                                .getPermntInKeralaAdrHouseNameMl())) {
                                                                                        throw new CustomException(
                                                                                                        "GROOM PERMANENT ADDRESS INSIDE KERALA: HOUSE NAME MALAYALAM INVALID ",
                                                                                                        "The House Name Malayalam "
                                                                                                                        +
                                                                                                                        groomaddressInfo.getPermntInKeralaAdrHouseNameMl()
                                                                                                                        + " is invalid");
                                                                                }

                                                                        }
                                                                        /// *****************permanent outside kerala address
                                                                /// *****************************************/
                                                                else {
                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                                        .getPermntOutsideKeralaDistrict())) {
                                                                                throw new CustomException(
                                                                                                "GROOM PERMANENT ADDRESS OUTSIDE KERALA: DISTRICT INVALID ",
                                                                                                "The   District " +
                                                                                                                groomaddressInfo.getPermntOutsideKeralaDistrict()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                                        .getPermntOutsideKeralaTaluk())) {
                                                                                throw new CustomException(
                                                                                                "GROOM PERMANENT ADDRESS OUTSIDE KERALA: TALUK INVALID ",
                                                                                                "The   Taluk " +
                                                                                                                groomaddressInfo.getPermntOutsideKeralaTaluk()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                                        .getPermntOutsideKeralaVillageorTown())) {
                                                                                throw new CustomException(
                                                                                                "GROOM PERMANENT ADDRESS OUTSIDE KERALA: VILLAGE INVALID ",
                                                                                                "The   Village " +groomaddressInfo.getPermntOutsideKeralaVillageorTown()+ " is invalid");
                                                                        }
                                                                        
                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                                        .getPermntOutsideKeralaCityVilgeEn())) {
                                                                                throw new CustomException(
                                                                                                " GROOM PERMANENT ADDRESS OUTSIDE KERALA: CITY INVALID ",
                                                                                                "The City/Town " +
                                                                                                                groomaddressInfo.getPermntOutsideKeralaCityVilgeEn()
                                                                                                                + " is invalid");
                                                                        }

                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                                        .getPermntOutsideKeralaVillageorTown())) {
                                                                                throw new CustomException(
                                                                                                " GROOM PERMANENT ADDRESS OUTSIDE KERALA: VILLAGE INVALID ",
                                                                                                "The Village " +
                                                                                                                groomaddressInfo.getPermntOutsideKeralaVillageorTown()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                                        .getPermntOutsideKeralaPincode())) {
                                                                                throw new CustomException(
                                                                                                "GROOM PERMANENT ADDRESS OUTSIDE KERALA: PINCODE INVALID ",
                                                                                                "The Pincode " +
                                                                                                                groomaddressInfo.getPermntOutsideKeralaPincode()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                                        .getPermntOutsideKeralaPostOfficeEn())) {
                                                                                throw new CustomException(
                                                                                                "GROOM PERMANENT ADDRESS OUTSIDE KERALA: POSTOFFICE INVALID ",
                                                                                                "The Postofficef " +
                                                                                                                groomaddressInfo.getPermntOutsideKeralaPostOfficeEn()
                                                                                                                + " is invalid");
                                                                        }
                                                                        // if (StringUtils.isEmpty(groomaddressInfo
                                                                        //                 .getPermntOutsideKeralaLocalityNameMl())) {
                                                                        //         throw new CustomException(
                                                                        //                         "GROOM PERMANENT ADDRESS OUTSIDE KERALA: LOCALITY NAME MALAYALAM IS INVALID ",
                                                                        //                         "The Locality Malayalam "
                                                                        //                                         +
                                                                        //                                         groomaddressInfo.getPermntOutsideKeralaLocalityNameMl()
                                                                        //                                         + " is invalid");
                                                                        // }
                                                                        // if (StringUtils.isEmpty(groomaddressInfo
                                                                        //                 .getPermntOutsideKeralaLocalityNameEn())) {
                                                                        //         throw new CustomException(
                                                                        //                         "GROOM PERMANENT ADDRESS OUTSIDE KERALA: LOCALITY NAME ENGLISH IS  INVALID ",
                                                                        //                         "The Locality English "
                                                                        //                                         +
                                                                        //                                         groomaddressInfo.getPermntOutsideKeralaLocalityNameEn()
                                                                        //                                         + " is invalid");
                                                                        // }
                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                                        .getPermntOutsideKeralaHouseNameEn())) {
                                                                                throw new CustomException(
                                                                                                "GROOM PERMANENT ADDRESS OUTSIDE KERALA: HOUSE NAME ENGLISH INVALID ",
                                                                                                "The House Name English "
                                                                                                                +
                                                                                                                groomaddressInfo.getPermntOutsideKeralaHouseNameEn()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                                        .getPermntOutsideKeralaHouseNameMl())) {
                                                                                throw new CustomException(
                                                                                                "GROOM PERMANENT ADDRESS OUTSIDE KERALA: HOUSE NAME MALAYALAM INVALID ",
                                                                                                "The House Name Malayalam "
                                                                                                                +
                                                                                                                groomaddressInfo.getPermntOutsideKeralaHouseNameMl()
                                                                                                                + " is invalid");
                                                                        }
                                                                }
                                                        }
                                                } else {
                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                        .getPermntOutSideIndiaProvinceEn())) {
                                                                throw new CustomException(
                                                                                " GROOM PERMANENT ADDRESS OUSIDE INDIA: PROVINCE ENGLISH INVALID ",
                                                                                "The   Province English " +
                                                                                                groomaddressInfo.getPermntOutSideIndiaProvinceEn()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                        .getPermntOutSideIndiaProvinceMl())) {
                                                                throw new CustomException(
                                                                                "GROOM PERMANENT ADDRESS OUSIDE INDIA: PROVINCE MALAYALAM INVALID ",
                                                                                "The   Province Malayalam " +
                                                                                                groomaddressInfo.getPermntOutSideIndiaProvinceMl()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                        .getPermntOutsideIndiaVillage())) {
                                                                throw new CustomException(
                                                                                "GROOM PERMANENT ADDRESS OUSIDE INDIA: VILLAGE INVALID ",
                                                                                "The   Village " +
                                                                                                groomaddressInfo.getPermntOutsideIndiaVillage()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                        .getPermntOutsideIndiaCityTown())) {
                                                                throw new CustomException(
                                                                                "GROOM PERMANENT ADDRESS OUSIDE INDIA: CITY INVALID ",
                                                                                "The   City " +
                                                                                                groomaddressInfo.getPermntOutsideIndiaCityTown()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                        .getPermanentOutsideIndiaPostCode())) {
                                                                throw new CustomException(
                                                                                "GROOM PERMANENT ADDRESS OUSIDE INDIA: POST CODE INVALID ",
                                                                                "The   Post Code " +
                                                                                                groomaddressInfo.getPermanentOutsideIndiaPostCode()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                        .getPermntOutsideIndiaLineoneEn())) {
                                                                throw new CustomException(
                                                                                "GROOM PERMANENT ADDRESS OUSIDE INDIA: ADDRESS LINE ONE ENGLISH INVALID ",
                                                                                "The   Adress Line One English " +
                                                                                                groomaddressInfo.getPermntOutsideIndiaLineoneEn()
                                                                                                + " is invalid");
                                                        }
                                                        // if (StringUtils.isEmpty(groomaddressInfo
                                                        //                 .getPermntOutsideIndiaLinetwoEn())) {
                                                        //         throw new CustomException(
                                                        //                         "GROOM PERMANENT ADDRESS OUSIDE INDIA: ADDRESS LINE Two ENGLISH INVALID ",
                                                        //                         "The   Adress Line Two English " +
                                                        //                                         groomaddressInfo.getPermntOutsideIndiaLinetwoEn()
                                                        //                                         + " is invalid");
                                                        // }
                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                        .getPermntOutsideIndiaLineoneMl())) {
                                                                throw new CustomException(
                                                                                "GROOM PERMANENT ADDRESS OUSIDE INDIA: ADDRESS LINE ONE MALAYALAM INVALID ",
                                                                                "The   Adress Line One Malayalam " +
                                                                                                groomaddressInfo.getPermntOutsideIndiaLineoneMl()
                                                                                                + " is invalid");
                                                        }
                                                        // if (StringUtils.isEmpty(groomaddressInfo
                                                        //                 .getPermntOutsideIndiaLinetwoMl())) {
                                                        //         throw new CustomException(
                                                        //                         "GROOM PERMANENT ADDRESS OUSIDE INDIA: ADDRESS LINE TWO MALAYALAM INVALID ",
                                                        //                         "The   Adress Line Two Malayalam " +
                                                        //                                         groomaddressInfo.getPermntOutsideIndiaLinetwoMl()
                                                        //                                         + " is invalid");
                                                        // }

                                                }
                                        }
                                // groom permanent address end
                                // groom present address start
                                        if (StringUtils.isEmpty(groomaddressInfo.getPresentaddressCountry())) {
                                                        throw new CustomException(
                                                                        "GROOM PERMANENT ADDRESS: COUNTRY INVALID ",
                                                                        "The Country name " + groomaddressInfo.getPresentaddressCountry()+ " is invalid");
                                        } 
                                        else 
                                        {

                                                if (groomaddressInfo.getPresentaddressCountry()
                                                                .equals(MarriageConstants.ADDRESS_INDIA)) {
                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                        .getPresentaddressStateName())) {
                                                                throw new CustomException("GROOM PRESENT ADDRESS INSIDE INDIA: STATE INVALID ",
                                                                                "The   State " +
                                                                                                groomaddressInfo.getPresentaddressStateName()
                                                                                                + " is invalid");
                                                        } else {
                                                                if (groomaddressInfo.getPresentaddressStateName()
                                                                                .equals(MarriageConstants.ADDRESS_KERALA)) {
                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                                        .getPresentInsideKeralaDistrict())) {
                                                                                throw new CustomException(
                                                                                                "GROOM PRESENT ADDRESS INSIDE KERALA: DISTRICT INVALID ",
                                                                                                "The   district " +
                                                                                                                groomaddressInfo.getPresentInsideKeralaDistrict()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                                        .getPresentInsideKeralaTaluk())) {
                                                                                throw new CustomException(
                                                                                                "GROOM PRESENT ADDRESS INSIDE KERALA: TALUK INVALID ",
                                                                                                "The   Taluk " +
                                                                                                                groomaddressInfo.getPresentInsideKeralaTaluk()
                                                                                                                + " is invalid");
                                                                        }

                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                                        .getPresentInsideKeralaVillage())) {
                                                                                throw new CustomException(
                                                                                                "GROOM PRESENT ADDRESS INSIDE KERALA: VILLAGE INVALID ",
                                                                                                "The   Village " +
                                                                                                                groomaddressInfo.getPresentInsideKeralaVillage()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                                        .getPresentInsideKeralaLBName())) {
                                                                                throw new CustomException(
                                                                                                "GROOM PRESENT ADDRESS INSIDE KERALA: LOCALBODY NAME INVALID ",
                                                                                                "The   Localbody Name "
                                                                                                                +
                                                                                                                groomaddressInfo.getPresentInsideKeralaLBName()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                                        .getPresentWardNo())) {
                                                                                throw new CustomException(
                                                                                                "GROOM PRESENT ADDRESS INSIDE KERALA: WARD INVALID ",
                                                                                                "The   Ward " +
                                                                                                                groomaddressInfo.getPresentWardNo()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                                        .getPresentInsideKeralaPostOffice())) {
                                                                                throw new CustomException(
                                                                                                "GROOM PRESENT ADDRESS INSIDE KERALA: POSTOFFICE INVALID ",
                                                                                                "The   Postofficef " +
                                                                                                                groomaddressInfo.getPresentInsideKeralaPostOffice()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                        .getPresentInsideKeralaPincode())) {
                                                                       
                                                                        
                                                                       
                                                                        throw new CustomException(
                                                                        "GROOM PRESENT ADDRESS INSIDE KERALA: PINCODE INVALID ",
                                                                        
                                                                        "The Pincode " +
                                                                        groomaddressInfo.getPresentInsideKeralaPincode()
                                                                        + " is invalid");
                                                                        }

                                                                        // if (StringUtils.isEmpty(groomaddressInfo
                                                                        //                 .getPresentInsideKeralaLocalityNameEn())) {
                                                                        //         throw new CustomException(
                                                                        //                         "GROOM PRESENT ADDRESS INSIDE KERALA: LOCALITY NAME ENGLISH IS  INVALID ",
                                                                        //                         "The   Locality English "
                                                                        //                                         +
                                                                        //                                         groomaddressInfo.getPresentInsideKeralaLocalityNameEn()
                                                                        //                                         + " is invalid");
                                                                        // }
                                                                        // if (StringUtils.isEmpty(groomaddressInfo
                                                                        //                 .getPresentInsideKeralaLocalityNameMl())) {
                                                                        //         throw new CustomException(
                                                                        //                         "GROOM PRESENT ADDRESS INSIDE KERALA: LOCALITY NAME MALAYALAM IS INVALID ",
                                                                        //                         "The   Locality Malayalam "
                                                                        //                                         +
                                                                        //                                         groomaddressInfo.getPresentInsideKeralaLocalityNameMl()
                                                                        //                                         + " is invalid");
                                                                        // }
                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                                        .getPresentInsideKeralaHouseNameEn())) {
                                                                                throw new CustomException(
                                                                                                "GROOM PRESENT ADDRESS INSIDE KERALA: HOUSE NAME ENGLISH INVALID ",
                                                                                                "The   House Name English "
                                                                                                                +
                                                                                                                groomaddressInfo.getPresentInsideKeralaHouseNameEn()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                                        .getPresentInsideKeralaHouseNameMl())) {
                                                                                throw new CustomException(
                                                                                                "GROOM PRESENT ADDRESS INSIDE KERALA: HOUSE NAME MALAYALAM INVALID ",
                                                                                                "The   House Name Malayalam "
                                                                                                                +
                                                                                                                groomaddressInfo.getPresentInsideKeralaHouseNameMl()
                                                                                                                + " is invalid");
                                                                        }
                                                                } else {
                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                                        .getPresentOutsideKeralaDistrict())) {
                                                                                throw new CustomException(
                                                                                                "GROOM PRESENT ADDRESS OUTSIDE KERALA: DISTRICT INVALID ",
                                                                                                "The   District " +
                                                                                                                groomaddressInfo.getPresentOutsideKeralaDistrict()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                                        .getPresentOutsideKeralaTalukName())) {
                                                                                throw new CustomException(
                                                                                                "GROOM PRESENT ADDRESS OUTSIDE KERALA: TALUK INVALID ",
                                                                                                "The   Taluk " +
                                                                                                                groomaddressInfo.getPresentOutsideKeralaTalukName()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                                        .getPresentOutsideKeralaCityVilgeNameEn())) {
                                                                                throw new CustomException(
                                                                                                "GROOM PRESENT ADDRESS OUTSIDE KERALA: VILLAGE INVALID ",
                                                                                                "The   Village " +
                                                                                                                groomaddressInfo.getPresentOutsideKeralaCityVilgeNameEn()
                                                                                                                + " is invalid");
                                                                        }

                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                                        .getPresentOutsideKeralaVillageorTown ())) {
                                                                                throw new CustomException(
                                                                                                " GROOM PRESENT ADDRESS OUTSIDE KERALA: CITY INVALID ",
                                                                                                "The City/Town " +
                                                                                                                groomaddressInfo.getPresentOutsideKeralaVillageorTown ()
                                                                                                                + " is invalid");
                                                                        }

                                                                        // if (StringUtils.isEmpty(groomaddressInfo
                                                                        // .getPermntOutsideKeralaVillage())) {
                                                                        // throw new CustomException(
                                                                        // " GROOM PERMANENT ADDRESS OUTSIDE KERALA:
                                                                        // VILLAGE INVALID ",
                                                                        // "The Village " +
                                                                        // groomaddressInfo.getPermntOutsideKeralaVillage()
                                                                        // + " is invalid");
                                                                        // }
                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                                        .getPresentOutsideKeralaPincode())) {
                                                                                throw new CustomException(
                                                                                                "GROOM PRESENT ADDRESS OUTSIDE KERALA: PINCODE INVALID ",
                                                                                                "The Pincode " +
                                                                                                                groomaddressInfo.getPresentOutsideKeralaPincode()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                                        .getPresentOutsideKeralaPostOfficeEn())) {
                                                                                throw new CustomException(
                                                                                                "GROOM PRESENT ADDRESS OUTSIDE KERALA: POSTOFFICE INVALID ",
                                                                                                "The Postofficef " +
                                                                                                                groomaddressInfo.getPresentOutsideKeralaPostOfficeEn()
                                                                                                                + " is invalid");
                                                                        }
                                                                        // if (StringUtils.isEmpty(groomaddressInfo
                                                                        //                 .getPresentOutsideKeralaLocalityNameMl())) {
                                                                        //         throw new CustomException(
                                                                        //                         "GROOM PRESENT ADDRESS OUTSIDE KERALA: LOCALITY NAME MALAYALAM IS INVALID ",
                                                                        //                         "The Locality Malayalam "
                                                                        //                                         +
                                                                        //                                         groomaddressInfo.getPresentOutsideKeralaLocalityNameMl()
                                                                        //                                         + " is invalid");
                                                                        // }
                                                                        // if (StringUtils.isEmpty(groomaddressInfo
                                                                        //                 .getPresentOutsideKeralaLocalityNameEn())) {
                                                                        //         throw new CustomException(
                                                                        //                         "GROOM PRESENT ADDRESS OUTSIDE KERALA: LOCALITY NAME ENGLISH IS  INVALID ",
                                                                        //                         "The Locality English "
                                                                        //                                         +
                                                                        //                                         groomaddressInfo.getPresentOutsideKeralaLocalityNameEn()
                                                                        //                                         + " is invalid");
                                                                        // }
                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                                        .getPresentOutsideKeralaHouseNameEn())) {
                                                                                throw new CustomException(
                                                                                                "GROOM PRESENT ADDRESS OUTSIDE KERALA: HOUSE NAME ENGLISH INVALID ",
                                                                                                "The House Name English "
                                                                                                                +
                                                                                                                groomaddressInfo.getPresentOutsideKeralaHouseNameEn()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                                        .getPresentOutsideKeralaHouseNameMl())) {
                                                                                throw new CustomException(
                                                                                                "GROOM PRESENT ADDRESS OUTSIDE KERALA: HOUSE NAME MALAYALAM INVALID ",
                                                                                                "The House Name Malayalam "
                                                                                                                +
                                                                                                                groomaddressInfo.getPresentOutsideKeralaHouseNameMl()
                                                                                                                + " is invalid");
                                                                        }
                                                                }
                                                        }
                                                } else {
                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                        .getPresentOutSideIndiaProvinceEn())) {
                                                                throw new CustomException(
                                                                                " GROOM PRESENT ADDRESS OUTSIDE INDIA: PROVINCE ENGLISH INVALID ",
                                                                                "The   Province English " +
                                                                                                groomaddressInfo.getPresentOutSideIndiaProvinceEn()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                        .getPresentOutSideIndiaProvinceMl())) {
                                                                throw new CustomException(
                                                                                " GROOM PRESENT ADDRESS OUTSIDE INDIA: PROVINCE MALAYALAM INVALID ",
                                                                                "The   Province Malayalam " +
                                                                                                groomaddressInfo.getPresentOutSideIndiaProvinceMl()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                        .getPresentOutSideIndiaadrsVillage())) {
                                                                throw new CustomException(
                                                                                " GROOM PRESENT ADDRESS OUTSIDE INDIA: VILLAGE INVALID ",
                                                                                "The   Village " +
                                                                                                groomaddressInfo.getPresentOutSideIndiaadrsVillage()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                        .getPresentOutSideIndiaadrsCityTown())) {
                                                                throw new CustomException(
                                                                                " GROOM PRESENT ADDRESS OUTSIDE INDIA: CITY INVALID ",
                                                                                "The City/Town " +
                                                                                                groomaddressInfo.getPresentOutSideIndiaadrsCityTown()
                                                                                                + " is invalid");
                                                        }
                                                        // if(StringUtils.isEmpty(groomaddressInfo.getPresentOutSideIndiaPostCode()))
                                                        // {
                                                        // throw new CustomException(" GROOM PRESENT ADDRESS OUTSIDE
                                                        // INDIA: POST CODE INVALID",
                                                        // "The Post Code" +
                                                        // groomaddressInfo.getPresentOutSideIndiaPostCode() + " is
                                                        // invalid");
                                                        // }
                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                        .getPresentOutSideIndiaAdressEn())) {
                                                                throw new CustomException(
                                                                                " GROOM PRESENT ADDRESS OUTSIDE INDIA: ADDRESS LINE ONE ENGLISH INVALID ",
                                                                                "The   Adress Line One English " +
                                                                                                groomaddressInfo.getPresentOutSideIndiaAdressEn()
                                                                                                + " is invalid");
                                                        }
                                                        // if (StringUtils.isEmpty(groomaddressInfo
                                                        //                 .getPresentOutSideIndiaAdressEnB())) {
                                                        //         throw new CustomException(
                                                        //                         " GROOM PRESENT ADDRESS OUTSIDE INDIA: ADDRESS LINE TWO ENGLISH INVALID ",
                                                        //                         "The   Adress Line Two English " +
                                                        //                                         groomaddressInfo.getPresentOutSideIndiaAdressEnB()
                                                        //                                         + " is invalid");
                                                        // }
                                                        if (StringUtils.isEmpty(groomaddressInfo
                                                                        .getPresentOutSideIndiaAdressMl())) {
                                                                throw new CustomException(
                                                                                " GROOM PRESENT ADDRESS OUTSIDE INDIA: ADDRESS LINE ONE MALAYALAM INVALID ",
                                                                                "The   Adress Line One Malayalam " +
                                                                                                groomaddressInfo.getPresentOutSideIndiaAdressMl()
                                                                                                + " is invalid");
                                                        }
                                                        // if (StringUtils.isEmpty(groomaddressInfo
                                                        //                 .getPresentOutSideIndiaAdressMlB())) {
                                                        //         throw new CustomException(
                                                        //                         " GROOM PRESENT ADDRESS OUTSIDE INDIA: ADDRESS LINE TWO MALAYALAM INVALID ",
                                                        //                         "The   Adress Line Two Malayalam " +
                                                        //                                         groomaddressInfo.getPresentOutSideIndiaAdressMlB()
                                                        //                                         + " is invalid");
                                                        // }

                                                }
                                        }
                                                // groom present address end
                                                // bride permanent address start
                                        if (StringUtils.isEmpty(brideaddressInfo.getPermtaddressCountry())) {
                                                throw new CustomException(
                                                                " BRIDE PERMANENT ADDRESS : COUNTRY INVALID ",
                                                                "The   COUNTRY " +brideaddressInfo.getPermtaddressCountry()+ " is invalid");
                                        }else{                                       
                                                if (brideaddressInfo.getPermtaddressCountry().equals(MarriageConstants.ADDRESS_INDIA)) {
                                                        if (StringUtils.isEmpty(brideaddressInfo.getPermtaddressStateName())) {
                                                                throw new CustomException(" STATE INVALID ",
                                                                                "The   State " + brideaddressInfo.getPermtaddressStateName()+ " is invalid");
                                                        } else {
                                                                if (brideaddressInfo.getPermtaddressStateName()
                                                                                .equals(MarriageConstants.ADDRESS_KERALA)) {
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPermntInKeralaAdrDistrict())) {
                                                                                throw new CustomException(
                                                                                                " BRIDE PERMANENT ADDRESS INSIDE KERALA: DISTRICT INVALID ",
                                                                                                "The   District " +
                                                                                                                brideaddressInfo.getPermntInKeralaAdrDistrict()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPermntInKeralaAdrTaluk())) {
                                                                                throw new CustomException(
                                                                                                " BRIDE PERMANENT ADDRESS INSIDE KERALA: TALUK INVALID ",
                                                                                                "The   Taluk " +
                                                                                                                brideaddressInfo.getPermntInKeralaAdrTaluk()
                                                                                                                + " is invalid");
                                                                        }

                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPermntInKeralaAdrVillage())) {
                                                                                throw new CustomException(
                                                                                                " BRIDE PERMANENT ADDRESS INSIDE KERALA: VILLAGE INVALID ",
                                                                                                "The   Village " +
                                                                                                                brideaddressInfo.getPresentInsideKeralaVillage()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPermntInKeralaAdrLBName())) {
                                                                                throw new CustomException(
                                                                                                " BRIDE PERMANENT ADDRESS INSIDE KERALA: LOCALBODY NAME INVALID ",
                                                                                                "The   Localbody Name " + brideaddressInfo.getPermntInKeralaAdrLBName() + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPermntInKeralaWardNo())) {
                                                                                throw new CustomException(
                                                                                                " BRIDE PERMANENT ADDRESS INSIDE KERALA: WARD INVALID ",
                                                                                                "The   Ward " +
                                                                                                                brideaddressInfo.getPermntInKeralaWardNo()
                                                                                                                + " is invalid");
                                                                        }
//                                                                        if (StringUtils.isEmpty(brideaddressInfo
//                                                                                        .getPresentOutsideKeralaPostOfficeEn())) {
//                                                                                throw new CustomException(
//                                                                                                " BRIDE PERMANENT ADDRESS INSIDE KERALA: POSTOFFICE INVALID ",
//                                                                                                "The   Postofficef " +
//                                                                                                                brideaddressInfo.getPresentOutsideKeralaPostOfficeEn()
//                                                                                                                + " is invalid");
//                                                                        }
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPermntInKeralaAdrPincode())) {
                                                                                throw new CustomException(
                                                                                                " BRIDE PERMANENT ADDRESS INSIDE KERALA: PINCODE INVALID ",
                                                                                                "The   Pincode " +
                                                                                                                brideaddressInfo.getPermntInKeralaAdrPincode()
                                                                                                                + " is invalid");
                                                                        }
                                                                        // if (StringUtils.isEmpty(brideaddressInfo
                                                                        //                 .getPermntInKeralaAdrLocalityNameEn())) {
                                                                        //         throw new CustomException(
                                                                        //                         " BRIDE PERMANENT ADDRESS INSIDE KERALA: LOCALITY NAME ENGLISH IS  INVALID ",
                                                                        //                         "The   Locality English "
                                                                        //                                         +
                                                                        //                                         brideaddressInfo.getPermntInKeralaAdrLocalityNameEn()
                                                                        //                                         + " is invalid");
                                                                        // }
                                                                        // if (StringUtils.isEmpty(brideaddressInfo
                                                                        //                 .getPermntInKeralaAdrLocalityNameMl())) {
                                                                        //         throw new CustomException(
                                                                        //                         " BRIDE PERMANENT ADDRESS INSIDE KERALA: LOCALITY NAME MALAYALAM IS INVALID ",
                                                                        //                         "The   Locality Malayalam "
                                                                        //                                         +
                                                                        //                                         brideaddressInfo.getPermntInKeralaAdrLocalityNameMl()
                                                                        //                                         + " is invalid");
                                                                       // }
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPermntInKeralaAdrHouseNameEn())) {
                                                                                throw new CustomException(
                                                                                                " BRIDE PERMANENT ADDRESS INSIDE KERALA: HOUSE NAME ENGLISH INVALID ",
                                                                                                "The   House Name English "
                                                                                                                +
                                                                                                                brideaddressInfo.getPermntInKeralaAdrHouseNameEn()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPermntInKeralaAdrHouseNameMl())) {
                                                                                throw new CustomException(
                                                                                                " BRIDE PERMANENT ADDRESS INSIDE KERALA: HOUSE NAME MALAYALAM INVALID ",
                                                                                                "The   House Name Malayalam "
                                                                                                                +
                                                                                                                brideaddressInfo.getPermntInKeralaAdrHouseNameMl()
                                                                                                                + " is invalid");
                                                                        }
                                                                }
                                                                /// *****************permanent outside kerala addre
                                                                /// *****************************************/
                                                                else {
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPermntOutsideKeralaDistrict())) {
                                                                                throw new CustomException(
                                                                                                "BRIDE PERMANENT ADDRESS OUTSIDE KERALA: DISTRICT INVALID ",
                                                                                                "The   District " +
                                                                                                                brideaddressInfo.getPermntOutsideKeralaDistrict()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPermntOutsideKeralaTaluk())) {
                                                                                throw new CustomException(
                                                                                                "BRIDE PERMANENT ADDRESS OUTSIDE KERALA: TALUK INVALID ",
                                                                                                "The   Taluk " +
                                                                                                                brideaddressInfo.getPermntOutsideKeralaTaluk()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPermntOutsideKeralaVillageorTown())) {
                                                                                throw new CustomException(
                                                                                                "BRIDE PERMANENT ADDRESS OUTSIDE KERALA: VILLAGE INVALID ",
                                                                                                "The   Village " +
                                                                                                                brideaddressInfo.getPermntOutsideKeralaVillageorTown()
                                                                                                                + " is invalid");
                                                                        }
                                                                       
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPermntOutsideKeralaCityVilgeEn())) {
                                                                                throw new CustomException(
                                                                                                " BRIDE PERMANENT ADDRESS OUTSIDE KERALA: CITY INVALID ",
                                                                                                "The City/Town " +
                                                                                                                brideaddressInfo.getPermntOutsideKeralaCityVilgeEn()
                                                                                                                + " is invalid");
                                                                        }

                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPermntOutsideKeralaVillageorTown())) {
                                                                                throw new CustomException(
                                                                                                " BRIDE PERMANENT ADDRESS OUTSIDE KERALA: VILLAGE INVALID ",
                                                                                                "The Village " +
                                                                                                                brideaddressInfo.getPermntOutsideKeralaVillageorTown()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPermntOutsideKeralaPincode())) {
                                                                                throw new CustomException(
                                                                                                "BRIDE PERMANENT ADDRESS OUTSIDE KERALA: PINCODE INVALID ",
                                                                                                "The Pincode " +
                                                                                                                brideaddressInfo.getPermntOutsideKeralaPincode()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPermntOutsideKeralaPostOfficeEn())) {
                                                                                throw new CustomException(
                                                                                                "BRIDE PERMANENT ADDRESS OUTSIDE KERALA: POSTOFFICE INVALID ",
                                                                                                "The Postofficef " +
                                                                                                                brideaddressInfo.getPermntOutsideKeralaPostOfficeEn()
                                                                                                                + " is invalid");
                                                                        }
                                                                        // if (StringUtils.isEmpty(brideaddressInfo
                                                                        //                 .getPermntOutsideKeralaLocalityNameMl())) {
                                                                        //         throw new CustomException(
                                                                        //                         "BRIDE PERMANENT ADDRESS OUTSIDE KERALA: LOCALITY NAME MALAYALAM IS INVALID ",
                                                                        //                         "The Locality Malayalam "
                                                                        //                                         +
                                                                        //                                         brideaddressInfo.getPermntOutsideKeralaLocalityNameMl()
                                                                        //                                         + " is invalid");
                                                                        // }
                                                                        // if (StringUtils.isEmpty(brideaddressInfo
                                                                        //                 .getPermntOutsideKeralaLocalityNameEn())) {
                                                                        //         throw new CustomException(
                                                                        //                         "BRIDE PERMANENT ADDRESS OUTSIDE KERALA: LOCALITY NAME ENGLISH IS  INVALID ",
                                                                        //                         "The Locality English "
                                                                        //                                         +
                                                                        //                                         brideaddressInfo.getPermntOutsideKeralaLocalityNameEn()
                                                                        //                                         + " is invalid");
                                                                        // }
                                                                         if (StringUtils.isEmpty(brideaddressInfo
                                                                                         .getPermntOutsideKeralaHouseNameEn())) {
                                                                                 throw new CustomException(
                                                                                                 "BRIDE PERMANENT ADDRESS OUTSIDE KERALA: HOUSE NAME ENGLISH INVALID ",
                                                                                                 "The House Name English "
                                                                                                                 +
                                                                                                                 brideaddressInfo.getPermntOutsideKeralaHouseNameEn()
                                                                                                                 + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPermntOutsideKeralaHouseNameMl())) {
                                                                                throw new CustomException(
                                                                                                "BRIDE PERMANENT ADDRESS OUTSIDE KERALA: HOUSE NAME MALAYALAM INVALID ",
                                                                                                "The House Name Malayalam "
                                                                                                                +
                                                                                                                brideaddressInfo.getPermntOutsideKeralaHouseNameMl()
                                                                                                                + " is invalid");
                                                                        }

                                                                }

                                                        }
                                                } else {
                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                        .getPermntOutSideIndiaProvinceEn())) {
                                                                throw new CustomException(
                                                                                " BRIDE PERMANENT ADDRESS OUTSIDE INDIA: PROVINCE ENGLISH INVALID ",
                                                                                "The   Province English " +
                                                                                                brideaddressInfo.getPermntOutSideIndiaProvinceEn()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                        .getPermntOutSideIndiaProvinceMl())) {
                                                                throw new CustomException(
                                                                                " BRIDE PERMANENT ADDRESS OUTSIDE INDIA: PROVINCE MALAYALAM INVALID ",
                                                                                "The   Province Malayalam " +
                                                                                                brideaddressInfo.getPermntOutSideIndiaProvinceMl()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                        .getPermntOutsideIndiaVillage())) {
                                                                throw new CustomException(
                                                                                " BRIDE PERMANENT ADDRESS OUTSIDE INDIA: VILLAGE INVALID ",
                                                                                "The   Village " +
                                                                                                brideaddressInfo.getPermntOutsideIndiaVillage()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                        .getPermntOutsideIndiaCityTown())) {
                                                                throw new CustomException(
                                                                                " BRIDE PERMANENT ADDRESS OUTSIDE INDIA: CITY INVALID ",
                                                                                "The   City/Town " +
                                                                                                brideaddressInfo.getPermntOutsideIndiaCityTown()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                        .getPermanentOutsideIndiaPostCode())) {
                                                                throw new CustomException(
                                                                                " BRIDE PERMANENT ADDRESS OUTSIDE INDIA: POST CODE INVALID ",
                                                                                "The   Post Code " +
                                                                                                brideaddressInfo.getPermanentOutsideIndiaPostCode()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                        .getPermntOutsideIndiaLineoneEn())) {
                                                                throw new CustomException(
                                                                                " BRIDE PERMANENT ADDRESS OUTSIDE INDIA: ADDRESS LINE ONE ENGLISH INVALID ",
                                                                                "The   Adress Line One English " +
                                                                                                brideaddressInfo.getPermntOutsideIndiaLineoneEn()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                        .getPermntOutsideIndiaLinetwoEn())) {
                                                                throw new CustomException(
                                                                                " BRIDE PERMANENT ADDRESS OUTSIDE INDIA: ADDRESS LINE Two ENGLISH INVALID ",
                                                                                "The   Adress Line Two English " +
                                                                                                brideaddressInfo.getPermntOutsideIndiaLinetwoEn()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                        .getPermntOutsideIndiaLineoneMl())) {
                                                                throw new CustomException(
                                                                                " BRIDE PERMANENT ADDRESS OUTSIDE INDIA: ADDRESS LINE ONE MALAYALAM INVALID ",
                                                                                "The   Adress Line One Malayalam " +
                                                                                                brideaddressInfo.getPermntOutsideIndiaLineoneMl()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                        .getPermntOutsideIndiaLinetwoMl())) {
                                                                throw new CustomException(
                                                                                " BRIDE PERMANENT ADDRESS OUTSIDE INDIA: ADDRESS LINE TWO MALAYALAM INVALID ",
                                                                                "The   Adress Line Two Malayalam " +
                                                                                                brideaddressInfo.getPermntOutsideIndiaLinetwoMl()
                                                                                                + " is invalid");
                                                        }

                                                }
                                        }
                                        // bride permanent address end
                                        // bride present address start
                                        if (StringUtils.isEmpty(brideaddressInfo.getPresentaddressCountry())) {
                                                throw new CustomException(" BRIDE PRESENT ADDRESS : COUNTRY INVALID ","The   Country " + brideaddressInfo.getPresentaddressCountry()+ " is invalid");
                                        }
                                        else
                                        {
                                                if (brideaddressInfo.getPresentaddressCountry().equals(MarriageConstants.ADDRESS_INDIA)) {
                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                        .getPresentaddressStateName())) {
                                                                                throw new CustomException(
                                                                                " BRIDE PRESENT ADDRESS : STATE INVALID ",
                                                                                "The   State " +brideaddressInfo.getPresentaddressStateName() + " is invalid");
                                                        } else {
                                                                if (brideaddressInfo.getPresentaddressStateName()
                                                                                .equals(MarriageConstants.ADDRESS_KERALA)) {
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPresentInsideKeralaDistrict())) {
                                                                                throw new CustomException(
                                                                                                "BRIDE PRESENT ADDRESS INSIDE KERALA: DISTRICT INVALID ",
                                                                                                "The   District " +
                                                                                                                brideaddressInfo.getPresentInsideKeralaDistrict()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPresentInsideKeralaTaluk())) {
                                                                                throw new CustomException(
                                                                                                "BRIDE PRESENT ADDRESS INSIDE KERALA: TALUK INVALID ",
                                                                                                "The   Taluk " +
                                                                                                                brideaddressInfo.getPresentInsideKeralaTaluk()
                                                                                                                + " is invalid");
                                                                        }

                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPresentInsideKeralaVillage())) {
                                                                                throw new CustomException(
                                                                                                "BRIDE PRESENT ADDRESS INSIDE KERALA: VILLAGE INVALID ",
                                                                                                "The   Village " +
                                                                                                                brideaddressInfo.getPresentInsideKeralaVillage()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPresentInsideKeralaLBName())) {
                                                                                throw new CustomException(
                                                                                                "BRIDE PRESENT ADDRESS INSIDE KERALA: LOCALBODY NAME INVALID ",
                                                                                                "The   Localbody Name "
                                                                                                                +
                                                                                                                brideaddressInfo.getPresentInsideKeralaLBName()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPresentWardNo())) {
                                                                                throw new CustomException(
                                                                                                "BRIDE PRESENT ADDRESS INSIDE KERALA: WARD INVALID ",
                                                                                                "The   Ward " +
                                                                                                                brideaddressInfo.getPresentWardNo()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPresentInsideKeralaPostOffice())) {
                                                                                throw new CustomException(
                                                                                                "BRIDE PRESENT ADDRESS INSIDE KERALA: POSTOFFICE INVALID ",
                                                                                                "The   Post office " +
                                                                                                                brideaddressInfo.getPresentInsideKeralaPostOffice()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(brideaddressInfo.getPresentInsideKeralaPincode())) {
                                                                        throw new CustomException(
                                                                                "BRIDE PRESENT ADDRESS INSIDE KERALA: PINCODE  INVALID ","The Pincode " +
                                                                                brideaddressInfo.getPresentInsideKeralaPincode()
                                                                                + " is invalid");
                                                                        }
                                                                        // if (StringUtils.isEmpty(brideaddressInfo
                                                                        //                 .getPresentInsideKeralaLocalityNameEn())) {
                                                                        //         throw new CustomException(
                                                                        //                         "BRIDE PRESENT ADDRESS INSIDE KERALA: LOCALITY NAME ENGLISH IS  INVALID ",
                                                                        //                         "The   Locality English "
                                                                        //                                         +
                                                                        //                                         brideaddressInfo.getPresentInsideKeralaLocalityNameEn()
                                                                        //                                         + " is invalid");
                                                                        // }
                                                                        // if (StringUtils.isEmpty(brideaddressInfo
                                                                        //                 .getPresentInsideKeralaLocalityNameMl())) {
                                                                        //         throw new CustomException(
                                                                        //                         "BRIDE PRESENT ADDRESS INSIDE KERALA: LOCALITY NAME MALAYALAM IS INVALID ",
                                                                        //                         "The   Locality Malayalam "
                                                                        //                                         +
                                                                        //                                         brideaddressInfo.getPresentInsideKeralaLocalityNameMl()
                                                                        //                                         + " is invalid");
                                                                        // }
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPresentInsideKeralaHouseNameEn())) {
                                                                                throw new CustomException(
                                                                                                "BRIDE PRESENT ADDRESS INSIDE KERALA: HOUSE NAME ENGLISH INVALID ",
                                                                                                "The   House Name English "
                                                                                                                +
                                                                                                                brideaddressInfo.getPresentInsideKeralaHouseNameEn()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPresentInsideKeralaHouseNameMl())) {
                                                                                throw new CustomException(
                                                                                                "BRIDE PRESENT ADDRESS INSIDE KERALA: HOUSE NAME MALAYALAM INVALID ",
                                                                                                "The   House Name Malayalam "
                                                                                                                +
                                                                                                                brideaddressInfo.getPresentInsideKeralaHouseNameMl()
                                                                                                                + " is invalid");
                                                                        }
                                                                }

                                                        else {
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPresentOutsideKeralaDistrict())) {
                                                                                throw new CustomException(
                                                                                                "BRIDE PRESENT ADDRESS OUTSIDE KERALA: DISTRICT INVALID ",
                                                                                                "The   District " +
                                                                                                                brideaddressInfo.getPresentOutsideKeralaDistrict()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPresentOutsideKeralaTalukName())) {
                                                                                throw new CustomException(
                                                                                                "BRIDE PRESENT ADDRESS OUTSIDE KERALA: TALUK INVALID ",
                                                                                                "The   Taluk " +
                                                                                                                brideaddressInfo.getPresentOutsideKeralaTalukName()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPresentOutsideKeralaVillageorTown())) {
                                                                                throw new CustomException(
                                                                                                "BRIDE PRESENT ADDRESS OUTSIDE KERALA: VILLAGE INVALID ",
                                                                                                "The   Village  " +
                                                                                                                brideaddressInfo.getPresentOutsideKeralaVillageorTown()
                                                                                                                + " is invalid");
                                                                        }

                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPresentOutsideKeralaCityVilgeNameEn())) {
                                                                                throw new CustomException(
                                                                                                " BRIDE PRESENT ADDRESS OUTSIDE KERALA: CITY INVALID ",
                                                                                                "The City/Town " +
                                                                                                                brideaddressInfo.getPresentOutsideKeralaCityVilgeNameEn()
                                                                                                                + " is invalid");
                                                                        }

                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPresentOutsideKeralaPincode())) {
                                                                                throw new CustomException(
                                                                                                "BRIDE PRESENT ADDRESS OUTSIDE KERALA: PINCODE INVALID ",
                                                                                                "The Pincode " +
                                                                                                                brideaddressInfo.getPresentOutsideKeralaPincode()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPresentOutsideKeralaPostOfficeEn())) {
                                                                                throw new CustomException(
                                                                                                "BRIDE PRESENT ADDRESS OUTSIDE KERALA: POSTOFFICE INVALID ",
                                                                                                "The Postofficef " +
                                                                                                                brideaddressInfo.getPresentOutsideKeralaLocalityNameEn()
                                                                                                                + " is invalid");
                                                                        }
                                                                        // if (StringUtils.isEmpty(brideaddressInfo
                                                                        //                 .getPresentOutsideKeralaLocalityNameMl())) {
                                                                        //         throw new CustomException(
                                                                        //                         "BRIDE PRESENT ADDRESS OUTSIDE KERALA: LOCALITY NAME MALAYALAM IS INVALID ",
                                                                        //                         "The Locality Malayalam "
                                                                        //                                         +
                                                                        //                                         brideaddressInfo.getPresentOutsideKeralaLocalityNameMl()
                                                                        //                                         + " is invalid");
                                                                        // }
                                                                        // if (StringUtils.isEmpty(brideaddressInfo
                                                                        //                 .getPresentOutsideKeralaLocalityNameEn())) {
                                                                        //         throw new CustomException(
                                                                        //                         "BRIDE PRESENT ADDRESS OUTSIDE KERALA: LOCALITY NAME ENGLISH IS  INVALID ",
                                                                        //                         "The Locality English "
                                                                        //                                         +
                                                                        //                                         brideaddressInfo.getPresentOutsideKeralaLocalityNameEn()
                                                                        //                                         + " is invalid");
                                                                        // }
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPresentOutsideKeralaHouseNameEn())) {
                                                                                throw new CustomException(
                                                                                                "BRIDE PRESENT ADDRESS OUTSIDE KERALA: HOUSE NAME ENGLISH INVALID ",
                                                                                                "The House Name English "
                                                                                                                +
                                                                                                                brideaddressInfo.getPresentOutsideKeralaHouseNameEn()
                                                                                                                + " is invalid");
                                                                        }
                                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                                        .getPresentOutsideKeralaHouseNameMl())) {
                                                                                throw new CustomException(
                                                                                                "BRIDE PRESENT ADDRESS OUTSIDE KERALA: HOUSE NAME MALAYALAM INVALID ",
                                                                                                "The House Name Malayalam "
                                                                                                                +
                                                                                                                brideaddressInfo.getPresentOutsideKeralaHouseNameMl()
                                                                                                                + " is invalid");
                                                                        }

                                                                }

                                                        }
                                                } else {
                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                        .getPresentOutSideIndiaProvinceEn())) {
                                                                throw new CustomException(
                                                                                "BRIDE PRESENT ADDRESS OUTSIDE INDIA: PROVINCE ENGLISH INVALID ",
                                                                                "The   Province English " +
                                                                                                brideaddressInfo.getPresentOutSideIndiaProvinceEn()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                        .getPresentOutSideIndiaProvinceMl())) {
                                                                throw new CustomException(
                                                                                "BRIDE PRESENT ADDRESS OUTSIDE INDIA: PROVINCE MALAYALAM INVALID ",
                                                                                "The   Province Malayalam " +
                                                                                                brideaddressInfo.getPresentOutSideIndiaProvinceMl()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                        .getPresentOutSideIndiaadrsVillage())) {
                                                                throw new CustomException(
                                                                                "BRIDE PRESENT ADDRESS OUTSIDE INDIA: VILLAGE INVALID ",
                                                                                "The   Village " +
                                                                                                brideaddressInfo.getPresentOutSideIndiaadrsVillage()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                        .getPresentOutSideIndiaadrsCityTown())) {
                                                                throw new CustomException(
                                                                                "BRIDE PRESENT ADDRESS OUTSIDE INDIA: CITY INVALID ",
                                                                                "The City/Town " +
                                                                                                brideaddressInfo.getPresentOutSideIndiaadrsCityTown()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                        .getPresentOutSideIndiaPostCode())) {
                                                                throw new CustomException(
                                                                                "BRIDE PRESENT ADDRESS OUTSIDE INDIA: POST CODE INVALID ",
                                                                                "The  Post Code " +
                                                                                                brideaddressInfo.getPresentOutSideIndiaPostCode()
                                                                                                + " is invalid");
                                                        }
                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                        .getPresentOutSideIndiaAdressEn())) {
                                                                throw new CustomException(
                                                                                "BRIDE PRESENT ADDRESS OUTSIDE INDIA: ADDRESS LINE ONE ENGLISH INVALID ",
                                                                                "The   Adress Line One English " +
                                                                                                brideaddressInfo.getPresentOutSideIndiaAdressEn()
                                                                                                + " is invalid");
                                                        }
                                                        // if (StringUtils.isEmpty(brideaddressInfo
                                                        //                 .getPresentOutSideIndiaAdressEnB())) {
                                                        //         throw new CustomException(
                                                        //                         "BRIDE PRESENT ADDRESS OUTSIDE INDIA: ADDRESS LINE Two ENGLISH INVALID ",
                                                        //                         "The   Adress Line Two English " +
                                                        //                                         brideaddressInfo.getPresentOutSideIndiaAdressEnB()
                                                        //                                         + " is invalid");
                                                        // }
                                                        if (StringUtils.isEmpty(brideaddressInfo
                                                                        .getPresentOutSideIndiaAdressMl())) {
                                                                throw new CustomException(
                                                                                "BRIDE PRESENT ADDRESS OUTSIDE INDIA: ADDRESS LINE ONE MALAYALAM INVALID ",
                                                                                "The   Adress Line One Malayalam " +
                                                                                                brideaddressInfo.getPresentOutSideIndiaAdressMl()
                                                                                                + " is invalid");
                                                        }
                                                        // if (StringUtils.isEmpty(brideaddressInfo
                                                        //                 .getPresentOutSideIndiaAdressMlB())) {
                                                        //         throw new CustomException(
                                                        //                         "BRIDE PRESENT ADDRESS OUTSIDE INDIA: ADDRESS LINE TWO MALAYALAM INVALID ",
                                                        //                         "The   Adress Line Two Malayalam " +
                                                        //                                         brideaddressInfo.getPresentOutSideIndiaAdressMlB()
                                                        //                                         + " is invalid");
                                                        // }

                                                }
                                        }
                                                // witness1
                                                if (StringUtils.isEmpty(witnessDtls.getWitness1AadharNo())) {

                                                        throw new CustomException("  WITNESS1 AADHAR NUMBER INVALID ",
                                                                        "The  Witness1 Aadhar Number " +
                                                                                        witnessDtls.getWitness1AadharNo()
                                                                                        + " is invalid");
                                                }
                                                if (StringUtils.isEmpty(witnessDtls.getWitness1NameEn())) {

                                                        throw new CustomException(" WITNESS1 NAME  ENGLISH INVALID ",
                                                                        "The   Witness1 Name English " +
                                                                                        witnessDtls.getWitness1NameEn()
                                                                                        + " is invalid");
                                                }
                                                // if (StringUtils.isEmpty(witnessDtls.getWitness1NameMl())) {

                                                //         throw new CustomException(" WITNESS1 NAME  MALAYALAM INVALID ",
                                                //                         "The   Witness1 Name Malayalam " +
                                                //                                         witnessDtls.getWitness1NameMl()
                                                //                                         + " is invalid");
                                                // }
                                                if ((witnessDtls.getWitness1Age() < 18
                                                                || witnessDtls.getWitness1Age() == 0)) {

                                                        throw new CustomException(" WITNESS1 AGE INVALID ",
                                                                        "The   Witness1 Age " +
                                                                                        witnessDtls.getWitness1Age()
                                                                                        + " is invalid");
                                                }
                                                if ((StringUtils.isEmpty(witnessDtls.getWitness1AddresSEn()))) {

                                                        throw new CustomException(" WITNESS1 ADDRESS ENGLISH INVALID ",
                                                                        "The   Witness1 Address English " +
                                                                                        witnessDtls.getWitness1AddresSEn()
                                                                                        + " is invalid");
                                                }
                                                // if ((StringUtils.isEmpty(witnessDtls.getWitness1AddressMl()))) {

                                                //         throw new CustomException(
                                                //                         " WITNESS1 ADDRESS MALAYALAM INVALID ",
                                                //                         "The   Witness1 Address Malayalam " +
                                                //                                         witnessDtls.getWitness1AddressMl()
                                                //                                         + " is invalid");
                                                // }
                                                if ((witnessDtls.getWitness1Mobile() <= 0)) {

                                                        throw new CustomException(" WITNESS1 MOBILE NUMBER  INVALID ",
                                                                        "The   Witness1 Mobile Number " +
                                                                                        witnessDtls.getWitness1Mobile()
                                                                                        + " is invalid");
                                                }
                                                // if (!witnessDtls.getWitness1Esigned()) {

                                                //         throw new CustomException(" WITNESS1 E-SIGN INVALID ",
                                                //                         "The   Witness1  E-sign " +
                                                //                                         witnessDtls.getWitness1Esigned()
                                                //                                         + " is invalid");
                                                // }

                                                // witness2
                                                if (StringUtils.isEmpty(witnessDtls.getWitness2AadharNo())) {

                                                        throw new CustomException(" WITNESS2 AADHAR NUMBER INVALID ",
                                                                        "The   Witness2 Aadhar Number " +
                                                                                        witnessDtls.getWitness2AadharNo()
                                                                                        + " is invalid");
                                                }
                                                if (StringUtils.isEmpty(witnessDtls.getWitness2NameEn())) {

                                                        throw new CustomException(" WITNESS2 NAME  ENGLISH INVALID ",
                                                                        "The   Witness2 Name English " +
                                                                                        witnessDtls.getWitness2NameEn()
                                                                                        + " is invalid");
                                                }
                                                // if (StringUtils.isEmpty(witnessDtls.getWitness2NameMl())) {

                                                //         throw new CustomException(" WITNESS2 NAME  MALAYALAM INVALID ",
                                                //                         "The   Witness2 Name Malayalam " +
                                                //                                         witnessDtls.getWitness2NameMl()
                                                //                                         + " is invalid");
                                                // }
                                                if ((witnessDtls.getWitness2Age() < 18
                                                                || witnessDtls.getWitness2Age() == 0)) {

                                                        throw new CustomException(" WITNESS2 AGE INVALID",
                                                                        "The   Witness2 Age " +
                                                                                        witnessDtls.getWitness2Age()
                                                                                        + " is invalid");
                                                }
                                                if ((StringUtils.isEmpty(witnessDtls.getWitness2AddresSEn()))) {

                                                        throw new CustomException(" WITNESS2 ADDRESS ENGLISH INVALID ",
                                                                        "The   Witness2 Address English " +
                                                                                        witnessDtls.getWitness2AddresSEn()
                                                                                        + " is invalid");
                                                }
                                                // if ((StringUtils.isEmpty(witnessDtls.getWitness2AddressMl()))) {

                                                //         throw new CustomException(
                                                //                         " WITNESS2 ADDRESS MALAYALAM INVALID ",
                                                //                         "The   Witness2 Address Malayalam " +
                                                //                                         witnessDtls.getWitness2AddressMl()
                                                //                                         + " is invalid");
                                                // }
                                                if ((witnessDtls.getWitness2Mobile() <= 0)) {

                                                        throw new CustomException(" WITNESS2 MOBILE NUMBER  INVALID ",
                                                                        "The   Witness2 Mobile Number " +
                                                                                        witnessDtls.getWitness2Mobile()
                                                                                        + " is invalid");
                                                }
                                                // if (!witnessDtls.getWitness2Esigned()) {

                                                //         throw new CustomException(" WITNESS2 E-SIGN INVALID ",
                                                //                         "The   Witness2  E-sign " +
                                                //                                         witnessDtls.getWitness2Esigned()
                                                //                                         + " is invalid");
                                                // }
                                        });
                }

        }
}
