package org.ksmart.marriage.marriageapplication.validator;

<<<<<<< HEAD

import org.apache.commons.collections4.CollectionUtils;
import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.marriageapplication.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageDetailsRequest;
=======
import java.util.List;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.checkerframework.checker.units.qual.g;
import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.marriageapplication.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.model.marriage.BrideAddressDetails;
import org.ksmart.marriage.marriageapplication.model.marriage.BrideDetails;
import org.ksmart.marriage.marriageapplication.model.marriage.GroomAddressDetails;
import org.ksmart.marriage.marriageapplication.model.marriage.GroomDetails;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.marriageapplication.model.marriage.WitnessDetails;
import org.ksmart.marriage.utils.MarriageConstants;
>>>>>>> bed9061267 (Field validation)
import org.springframework.stereotype.Component;

import java.util.List;

import static org.ksmart.marriage.utils.enums.ErrorCodes.MARRIAGE_DETAILS_INVALID_UPDATE;
import static org.ksmart.marriage.utils.enums.ErrorCodes.MARRIAGE_DETAILS_REQUIRED;

//import static org.ksmart.marriage.utils.enums.ErrorCodes.BIRTH_DETAILS_REQUIRED;

@Component
public class MarriageApplicationValidator {

    public void validateCommonFields(MarriageDetailsRequest request) {

<<<<<<< HEAD
    public void validateUpdate(MarriageDetailsRequest request, List<MarriageApplicationDetails> searchResult) {
        List<MarriageApplicationDetails> deathdetails = request.getMarriageDetails();

        if (CollectionUtils.isEmpty(deathdetails)) {
            throw new CustomException(MARRIAGE_DETAILS_REQUIRED.getCode(), "Marriage registration is required.");
        }

        if (deathdetails.size() > 1) { // NOPMD
            throw new CustomException( MARRIAGE_DETAILS_INVALID_UPDATE.getCode(),
                    "Supports only single Marriage registration update request.");
        }

        if (deathdetails.size() != searchResult.size()) {
            throw new CustomException(MARRIAGE_DETAILS_INVALID_UPDATE.getCode(),
                    "Marriage registration(s) not found in database.");
        }
        //IMP:Have to enable after URI submission
        //validateCommonFields( request);
=======
        List<MarriageApplicationDetails> marriageApplication = request.getMarriageDetails();
        if (marriageApplication != null) {
            marriageApplication
                    .forEach(marriagedtls -> {
                        GroomDetails groomInfo = marriagedtls.getGroomDetails();
                        GroomAddressDetails groomaddressInfo = marriagedtls.getGroomAddressDetails();
                        BrideDetails brideInfo = marriagedtls.getBrideDetails();
                        BrideAddressDetails brideaddressInfo = marriagedtls.getBrideAddressDetails();
                        WitnessDetails witnessDtls = marriagedtls.getWitnessDetails();

                        if(marriagedtls.getDateofmarriage() <= 0){
                            throw new CustomException("DECEASED DATE OF MARRIAGE INVALID", "The deceased  Date of marriage" +
                            groomInfo.getResidentship() + " is invalid");
                        }

                        if(StringUtils.isEmpty(marriagedtls.getDistrictid())){
                            throw new CustomException("DECEASED DISTRICT INVALID", "The deceased District" +
                            marriagedtls.getDistrictid() + " is invalid");
                        }

                        if(StringUtils.isEmpty(marriagedtls.getTalukid())){
                            throw new CustomException("DECEASED TALUK INVALID", "The deceased Taluk" +
                            marriagedtls.getTalukid() + " is invalid");
                        }
                        if(StringUtils.isEmpty(marriagedtls.getVillage_name())){
                            throw new CustomException("DECEASED VILLAGE INVALID", "The deceased Village" +
                            marriagedtls.getVillage_name() + " is invalid");
                        }

                        if(StringUtils.isEmpty(marriagedtls.getLbtype())){
                            throw new CustomException("DECEASED LB TYPE INVALID", "The deceased LB type " +
                            marriagedtls.getLbtype() + " is invalid");
                        }

                        if(StringUtils.isEmpty(marriagedtls.getWard_code())){
                            throw new CustomException("DECEASED LB TYPE INVALID", "The deceased LB type " +
                            marriagedtls.getWard_code() + " is invalid");
                        }



                        if(StringUtils.isEmpty(marriagedtls.getPlacetype())){
                            throw new CustomException("DECEASED MARRIAGE PLACE TYPE INVALID", "The deceased Place type " +
                            marriagedtls.getPlacetype() + " is invalid");
                        }
                        else{
                            if(marriagedtls.getPlacetype().equals(MarriageConstants.PLACE_TYPE_HOUSE)){
                                if(StringUtils.isEmpty(marriagedtls.getLocality_en())){
                                    throw new CustomException("DECEASED MARRIAGE PLACE LOCALITY ENGLISH INVALID", "The deceased Place Locality Name in English " +
                                    marriagedtls.getLocality_en()+ " is invalid");
                                }
                                if(StringUtils.isEmpty(marriagedtls.getLocality_ml())){
                                    throw new CustomException("DECEASED MARRIAGE PLACE LOCALITY MALAYALAM INVALID", "The deceased Place Locality Name in Malayalam " +
                                    marriagedtls.getLocality_ml()+ " is invalid");
                                }
                                if(StringUtils.isEmpty(marriagedtls.getMarriageHouseNoAndNameEn())){
                                    throw new CustomException("DECEASED HOUSE NAME ENGLISH INVALID", "The deceased House Name English " +
                                    marriagedtls.getMarriageHouseNoAndNameEn()+ " is invalid");
                                }
                                if(StringUtils.isEmpty(marriagedtls.getMarriageHouseNoAndNameMl())){
                                    throw new CustomException("DECEASED HOUSE NAME MALAYALAM INVALID", "The deceased House Name Malayalam " +
                                    marriagedtls.getMarriageHouseNoAndNameMl()+ " is invalid");
                                }
                                if(StringUtils.isEmpty(marriagedtls.getLandmark())){
                                    throw new CustomException("DECEASED LANDMARK IS INVALID", "The deceased Landmark" +
                                    marriagedtls.getLandmark()+ " is invalid");
                                }
                            }
                            if(marriagedtls.getPlacetype().equals(MarriageConstants.PLACE_TYPE_RELIGIOUS_INSTITUTION)){
                                if(StringUtils.isEmpty(marriagedtls.getPlacenameEn())){
                                    throw new CustomException("DECEASED PLACE NAME ENGLISH IS INVALID", "The deceased Place Name English" +
                                    marriagedtls.getPlacenameEn()+ " is invalid");
                                }
                                else {
                                    if(marriagedtls.getPlacenameEn().equals(MarriageConstants.PLACE_OTHER)){
                                        if(StringUtils.isEmpty(marriagedtls.getPlacenameEn())){
                                            throw new CustomException("DECEASED PLACE NAME ENGLISH IS INVALID", "The deceased Place Name English" +
                                            marriagedtls.getPlacenameEn()+ " is invalid");
                                        }
                                        if(StringUtils.isEmpty(marriagedtls.getPlacenameMl())){
                                            throw new CustomException("DECEASED PLACE NAME MALAYALAM IS INVALID", "The deceased Place Name Malayalam" +
                                            marriagedtls.getPlacenameMl()+ " is invalid");
                                        }
                                    }
                                    

                                }
                               
                            }
                        }







                        if (StringUtils.isEmpty(groomInfo.getResidentship())) {
                            throw new CustomException("DECEASED RESIDENTSHIP INVALID", "The deceased  resident" +
                                    groomInfo.getResidentship() + " is invalid");

                        } else {
                            if (groomInfo.getResidentship().equals(MarriageConstants.RESIDENTSHIP_INDIAN)) {
                                if (StringUtils.isEmpty(groomInfo.getAadharno())) {
                                    throw new CustomException("DECEASED AADHAR INVALID", "The deceased  Aadhar number" +
                                            groomInfo.getAadharno() + " is invalid");
                                }

                            } else if (groomInfo.getResidentship().equals(MarriageConstants.RESIDENTSHIP_NRI)) {
                                if (StringUtils.isEmpty(groomInfo.getPassportno())) {
                                    throw new CustomException("DECEASED PASSPORT NUMBER INVALID",
                                            "The deceased  Passport number" +
                                                    groomInfo.getPassportno() + " is invalid");
                                }
                            } else if (groomInfo.getResidentship().equals(MarriageConstants.RESIDENTSHIP_FOREIGN)) {
                                if (StringUtils.isEmpty(groomInfo.getPassportno())
                                        && StringUtils.isEmpty(groomInfo.getSocialsecurityno())) {
                                    throw new CustomException(
                                            "DECEASED PASSPORT NUMBER AND SOCIAL SECURITY NUMBER INVALID",
                                            "The deceased  Passport number and Social security number" +
                                                    groomInfo.getPassportno() + "and" + groomInfo.getSocialsecurityno()
                                                    + " is invalid");
                                }
                            }

                        }

                        if (StringUtils.isEmpty(groomInfo.getFirstname_en())) {
                            throw new CustomException("DECEASED NAME INVALID", "The deceased name in english" +
                                    groomInfo.getFirstname_en() + " is invalid");
                        }
                        if (StringUtils.isEmpty(groomInfo.getFirstname_ml())) {
                            throw new CustomException("DECEASED NAME INVALID", "The deceased name in malayalam" +
                                    groomInfo.getFirstname_ml() + " is invalid");
                        }
                        if (groomInfo.getMobile() <= 0) {
                            throw new CustomException("CONTACT NUMBER INVALID", "The  groom mobile number " +
                                    groomInfo.getMobile() + " is invalid");
                        }
                        if (StringUtils.isEmpty(groomInfo.getGender())) {
                            throw new CustomException("DECEASED GENDER INVALID", "The deceased  gender" +
                                    groomInfo.getGender() + " is invalid");
                        }
                        if ((groomInfo.getDateofbirth() <= 0)) {
                            throw new CustomException("DEATH DATE INVALID", "The date can't be null");
                        }

                        if (StringUtils.isEmpty(groomInfo.getFather_aadharno())) {
                            throw new CustomException("DECEASED AADHAR INVALID", "The deceased  Father Aadhar number" +
                                    groomInfo.getFather_aadharno() + " is invalid");
                        }
                        if (StringUtils.isEmpty(groomInfo.getMother_aadharno())) {
                            throw new CustomException("DECEASED AADHAR INVALID", "The deceased  Father Aadhar number" +
                                    groomInfo.getMother_aadharno() + " is invalid");
                        }
                        if (StringUtils.isEmpty(groomInfo.getMaritalstatusid())) {
                            throw new CustomException("DECEASED MARITAL STATUS INVALID",
                                    "The deceased  Marital status" +
                                            groomInfo.getMaritalstatusid() + " is invalid");
                        } 
                        // else {
                        //     if (groomInfo.getMaritalstatusid().equals(MarriageConstants.MARITAL_STATUS_DIVORCED)) {
                        //         if (groomInfo.getGroomIsSpouseLiving().equals(MarriageConstants.VALUE_FALSE)
                        //                 && groomInfo.getGroomNoOfSpouse().equals(MarriageConstants.VALUE_FALSE)) {
                        //             throw new CustomException("DECEASED IS SPOUSE LIVING AND NO OF SPOUSE INVALID",
                        //                     "The deceased  Is spouse living and no of spouse living" +
                        //                             groomInfo.getGroomIsSpouseLiving() + "and"
                        //                             + groomInfo.getGroomNoOfSpouse() + " is invalid");
                        //         }
                        //     }
                        //     else if(groomInfo.getMaritalstatusid().equals(MarriageConstants.MARITAL_STATUS_ANNULLED)) {
                        //         if (groomInfo.getGroomIsSpouseLiving().equals(MarriageConstants.VALUE_FALSE)
                        //                 && groomInfo.getGroomNoOfSpouse().equals(MarriageConstants.VALUE_FALSE)) {
                        //             throw new CustomException("DECEASED IS SPOUSE LIVING AND NO OF SPOUSE INVALID",
                        //                     "The deceased  Is spouse living and no of spouse living" +
                        //                             groomInfo.getGroomIsSpouseLiving() + "and"
                        //                             + groomInfo.getGroomNoOfSpouse() + " is invalid");
                        //         }
                        //     }
                        //     else if(groomInfo.getMaritalstatusid().equals(MarriageConstants.MARITAL_STATUS_MARRIED)) {
                        //         if (groomInfo.getGroomIsSpouseLiving().equals(MarriageConstants.VALUE_FALSE)
                        //                 && groomInfo.getGroomNoOfSpouse().equals(MarriageConstants.VALUE_FALSE)) {
                        //             throw new CustomException("DECEASED IS SPOUSE LIVING AND NO OF SPOUSE INVALID",
                        //                     "The deceased  Is spouse living and no of spouse living" +
                        //                             groomInfo.getGroomIsSpouseLiving() + "and"
                        //                             + groomInfo.getGroomNoOfSpouse() + " is invalid");
                        //         }
                        //     }
                        //     else if(groomInfo.getMaritalstatusid().equals(MarriageConstants.MARITAL_STATUS_WIDOWED)) {
                        //         if (groomInfo.getGroomIsSpouseLiving().equals(MarriageConstants.VALUE_FALSE)
                        //                 && groomInfo.getGroomNoOfSpouse().equals(MarriageConstants.VALUE_FALSE)) {
                        //             throw new CustomException("DECEASED IS SPOUSE LIVING AND NO OF SPOUSE INVALID",
                        //                     "The deceased  Is spouse living and no of spouse living" +
                        //                             groomInfo.getGroomIsSpouseLiving() + "and"
                        //                             + groomInfo.getGroomNoOfSpouse() + " is invalid");
                        //         }
                        //     }
                        // }
                        
                        if (StringUtils.isEmpty(brideInfo.getResidentship())) {
                            throw new CustomException("DECEASED RESIDENTSHIP INVALID", "The deceased  resident" +
                                    brideInfo.getResidentship() + " is invalid");

                        } else {
                            if (brideInfo.getResidentship().equals(MarriageConstants.RESIDENTSHIP_INDIAN)) {
                                if (StringUtils.isEmpty(brideInfo.getAadharno())) {
                                    throw new CustomException("DECEASED AADHAR INVALID", "The deceased  Aadhar number" +
                                            brideInfo.getAadharno() + " is invalid");
                                }

                            } else if (brideInfo.getResidentship().equals(MarriageConstants.RESIDENTSHIP_NRI)) {
                                if (StringUtils.isEmpty(brideInfo.getPassportno())) {
                                    throw new CustomException("DECEASED PASSPORT NUMBER INVALID",
                                            "The deceased  Passport number" +
                                                    brideInfo.getPassportno() + " is invalid");
                                }
                            } else if (brideInfo.getResidentship().equals(MarriageConstants.RESIDENTSHIP_FOREIGN)) {
                                if (StringUtils.isEmpty(brideInfo.getPassportno())
                                        && StringUtils.isEmpty(brideInfo.getSocialsecurityno())) {
                                    throw new CustomException(
                                            "DECEASED PASSPORT NUMBER AND SOCIAL SECURITY NUMBER INVALID",
                                            "The deceased  Passport number and Social security number" +
                                                    brideInfo.getPassportno() + "and" + brideInfo.getSocialsecurityno()
                                                    + " is invalid");
                                }
                            }

                        }

                        if (StringUtils.isEmpty(brideInfo.getFirstname_en())) {
                            throw new CustomException("DECEASED NAME INVALID", "The deceased name in english" +
                                    brideInfo.getFirstname_en() + " is invalid");
                        }
                        if (StringUtils.isEmpty(brideInfo.getFirstname_ml())) {
                            throw new CustomException("DECEASED NAME INVALID", "The deceased name in malayalam" +
                                    brideInfo.getFirstname_ml() + " is invalid");
                        }
                        if (brideInfo.getMobile() <= 0) {
                            throw new CustomException("CONTACT NUMBER INVALID", "The  groom mobile number " +
                                    brideInfo.getMobile() + " is invalid");
                        }
                        if (StringUtils.isEmpty(brideInfo.getGender())) {
                            throw new CustomException("DECEASED GENDER INVALID", "The deceased  gender" +
                                    brideInfo.getGender() + " is invalid");
                        }
                        if ((brideInfo.getDateofbirth() <= 0)) {
                            throw new CustomException("DEATH DATE INVALID", "The date can't be null");
                        }

                        if (StringUtils.isEmpty(brideInfo.getFather_aadharno())) {
                            throw new CustomException("DECEASED AADHAR INVALID", "The deceased  Father Aadhar number" +
                                    brideInfo.getFather_aadharno() + " is invalid");
                        }
                        if (StringUtils.isEmpty(brideInfo.getMother_aadharno())) {
                            throw new CustomException("DECEASED AADHAR INVALID", "The deceased  Father Aadhar number" +
                                    brideInfo.getMother_aadharno() + " is invalid");
                        }
                        if (StringUtils.isEmpty(brideInfo.getMaritalstatusid())) {
                            throw new CustomException("DECEASED MARITAL STATUS INVALID",
                                    "The deceased  Marital status" +
                                            brideInfo.getMaritalstatusid() + " is invalid");
                        } 
                        // else {
                        //     if (brideInfo.getMaritalstatusid().equals(MarriageConstants.MARITAL_STATUS_DIVORCED)) {
                        //         if (brideInfo.getGroomIsSpouseLiving().equals(MarriageConstants.VALUE_FALSE)
                        //                 && brideInfo.getGroomNoOfSpouse().equals(MarriageConstants.VALUE_FALSE)) {
                        //             throw new CustomException("DECEASED IS SPOUSE LIVING AND NO OF SPOUSE INVALID",
                        //                     "The deceased  Is spouse living and no of spouse living" +
                        //                             brideInfo.getGroomIsSpouseLiving() + "and"
                        //                             + brideInfo.getGroomNoOfSpouse() + " is invalid");
                        //         }
                        //     }
                        //     else if(brideInfo.getMaritalstatusid().equals(MarriageConstants.MARITAL_STATUS_ANNULLED)) {
                        //         if (brideInfo.getGroomIsSpouseLiving().equals(MarriageConstants.VALUE_FALSE)
                        //                 && brideInfo.getGroomNoOfSpouse().equals(MarriageConstants.VALUE_FALSE)) {
                        //             throw new CustomException("DECEASED IS SPOUSE LIVING AND NO OF SPOUSE INVALID",
                        //                     "The deceased  Is spouse living and no of spouse living" +
                        //                             brideInfo.getGroomIsSpouseLiving() + "and"
                        //                             + brideInfo.getGroomNoOfSpouse() + " is invalid");
                        //         }
                        //     }
                        //     else if(brideInfo.getMaritalstatusid().equals(MarriageConstants.MARITAL_STATUS_MARRIED)) {
                        //         if (brideInfo.getGroomIsSpouseLiving().equals(MarriageConstants.VALUE_FALSE)
                        //                 && brideInfo.getGroomNoOfSpouse().equals(MarriageConstants.VALUE_FALSE)) {
                        //             throw new CustomException("DECEASED IS SPOUSE LIVING AND NO OF SPOUSE INVALID",
                        //                     "The deceased  Is spouse living and no of spouse living" +
                        //                             brideInfo.getGroomIsSpouseLiving() + "and"
                        //                             + brideInfo.getGroomNoOfSpouse() + " is invalid");
                        //         }
                        //     }
                        //     else if(brideInfo.getMaritalstatusid().equals(MarriageConstants.MARITAL_STATUS_WIDOWED)) {
                        //         if (brideInfo.getGroomIsSpouseLiving().equals(MarriageConstants.VALUE_FALSE)
                        //                 && brideInfo.getGroomNoOfSpouse().equals(MarriageConstants.VALUE_FALSE)) {
                        //             throw new CustomException("DECEASED IS SPOUSE LIVING AND NO OF SPOUSE INVALID",
                        //                     "The deceased  Is spouse living and no of spouse living" +
                        //                             brideInfo.getGroomIsSpouseLiving() + "and"
                        //                             + brideInfo.getGroomNoOfSpouse() + " is invalid");
                        //         }
                        //     }
                        // }
                       

                        
                    });
        }
>>>>>>> bed9061267 (Field validation)
    }
}
