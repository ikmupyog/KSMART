package org.ksmart.marriage.marriageapplication.validator;

import org.apache.commons.collections4.CollectionUtils;
import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.marriageapplication.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageDetailsRequest;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.checkerframework.checker.units.qual.g;
import org.ksmart.marriage.marriageapplication.model.marriage.BrideAddressDetails;
import org.ksmart.marriage.marriageapplication.model.marriage.BrideDetails;
import org.ksmart.marriage.marriageapplication.model.marriage.GroomAddressDetails;
import org.ksmart.marriage.marriageapplication.model.marriage.GroomDetails;
import org.ksmart.marriage.marriageapplication.model.marriage.WitnessDetails;
import org.ksmart.marriage.utils.MarriageConstants;
import org.springframework.stereotype.Component;
import static org.ksmart.marriage.utils.enums.ErrorCodes.MARRIAGE_DETAILS_INVALID_UPDATE;
import static org.ksmart.marriage.utils.enums.ErrorCodes.MARRIAGE_DETAILS_REQUIRED;

//import static org.ksmart.marriage.utils.enums.ErrorCodes.BIRTH_DETAILS_REQUIRED;

@Component
public class MarriageApplicationValidator {

    public void validateUpdate(MarriageDetailsRequest request, List<MarriageApplicationDetails> searchResult) {
        List<MarriageApplicationDetails> deathdetails = request.getMarriageDetails();

        if (CollectionUtils.isEmpty(deathdetails)) {
            throw new CustomException(MARRIAGE_DETAILS_REQUIRED.getCode(), "Marriage registration is required.");
        }

        if (deathdetails.size() > 1) { // NOPMD
            throw new CustomException(MARRIAGE_DETAILS_INVALID_UPDATE.getCode(),
                    "Supports only single Marriage registration update request.");
        }

        if (deathdetails.size() != searchResult.size()) {
            throw new CustomException(MARRIAGE_DETAILS_INVALID_UPDATE.getCode(),
                    "Marriage registration(s) not found in database.");
        }
        // IMP:Have to enable after URI submission
        // validateCommonFields( request);
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
                            throw new CustomException("DECEASED DATE OF MARRIAGE INVALID",
                                    "The deceased  Date of marriage" +
                                            groomInfo.getResidentship() + " is invalid");
                        }

                        if (StringUtils.isEmpty(marriagedtls.getDistrictid())) {
                            throw new CustomException("DECEASED DISTRICT INVALID", "The deceased District" +
                                    marriagedtls.getDistrictid() + " is invalid");
                        }

                        if (StringUtils.isEmpty(marriagedtls.getTalukid())) {
                            throw new CustomException("DECEASED TALUK INVALID", "The deceased Taluk" +
                                    marriagedtls.getTalukid() + " is invalid");
                        }
                        if (StringUtils.isEmpty(marriagedtls.getVillage_name())) {
                            throw new CustomException("DECEASED VILLAGE INVALID", "The deceased Village" +
                                    marriagedtls.getVillage_name() + " is invalid");
                        }

                        if (StringUtils.isEmpty(marriagedtls.getLbtype())) {
                            throw new CustomException("DECEASED LB TYPE INVALID", "The deceased LB type " +
                                    marriagedtls.getLbtype() + " is invalid");
                        }

                        if (StringUtils.isEmpty(marriagedtls.getWard_code())) {
                            throw new CustomException("DECEASED LB TYPE INVALID", "The deceased LB type " +
                                    marriagedtls.getWard_code() + " is invalid");
                        }

                        if (StringUtils.isEmpty(marriagedtls.getPlacetype())) {
                            throw new CustomException("DECEASED MARRIAGE PLACE TYPE INVALID",
                                    "The deceased Place type " +
                                            marriagedtls.getPlacetype() + " is invalid");
                        } else {
                            if (marriagedtls.getPlacetype().equals(MarriageConstants.PLACE_TYPE_HOUSE)) {
                                if (StringUtils.isEmpty(marriagedtls.getLocality_en())) {
                                    throw new CustomException("DECEASED MARRIAGE PLACE LOCALITY ENGLISH INVALID",
                                            "The deceased Place Locality Name in English " +
                                                    marriagedtls.getLocality_en() + " is invalid");
                                }
                                if (StringUtils.isEmpty(marriagedtls.getLocality_ml())) {
                                    throw new CustomException("DECEASED MARRIAGE PLACE LOCALITY MALAYALAM INVALID",
                                            "The deceased Place Locality Name in Malayalam " +
                                                    marriagedtls.getLocality_ml() + " is invalid");
                                }
                                if (StringUtils.isEmpty(marriagedtls.getMarriageHouseNoAndNameEn())) {
                                    throw new CustomException("DECEASED HOUSE NAME ENGLISH INVALID",
                                            "The deceased House Name English " +
                                                    marriagedtls.getMarriageHouseNoAndNameEn() + " is invalid");
                                }
                                if (StringUtils.isEmpty(marriagedtls.getMarriageHouseNoAndNameMl())) {
                                    throw new CustomException("DECEASED HOUSE NAME MALAYALAM INVALID",
                                            "The deceased House Name Malayalam " +
                                                    marriagedtls.getMarriageHouseNoAndNameMl() + " is invalid");
                                }
                                if (StringUtils.isEmpty(marriagedtls.getLandmark())) {
                                    throw new CustomException("DECEASED LANDMARK IS INVALID", "The deceased Landmark" +
                                            marriagedtls.getLandmark() + " is invalid");
                                }
                            }
                            if (marriagedtls.getPlacetype()
                                    .equals(MarriageConstants.PLACE_TYPE_RELIGIOUS_INSTITUTION)) {
                                if (StringUtils.isEmpty(marriagedtls.getPlacenameEn())) {
                                    throw new CustomException("DECEASED PLACE NAME ENGLISH IS INVALID",
                                            "The deceased Place Name English" +
                                                    marriagedtls.getPlacenameEn() + " is invalid");
                                } else {
                                    if (marriagedtls.getPlacenameEn().equals(MarriageConstants.PLACE_OTHER)) {
                                        if (StringUtils.isEmpty(marriagedtls.getPlacenameEn())) {
                                            throw new CustomException("DECEASED PLACE NAME ENGLISH IS INVALID",
                                                    "The deceased Place Name English" +
                                                            marriagedtls.getPlacenameEn() + " is invalid");
                                        }
                                        if (StringUtils.isEmpty(marriagedtls.getPlacenameMl())) {
                                            throw new CustomException("DECEASED PLACE NAME MALAYALAM IS INVALID",
                                                    "The deceased Place Name Malayalam" +
                                                            marriagedtls.getPlacenameMl() + " is invalid");
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
                            throw new CustomException("GROOM BIRTH DATE INVALID", "The date can't be null");
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
                        // if
                        // (groomInfo.getMaritalstatusid().equals(MarriageConstants.MARITAL_STATUS_DIVORCED))
                        // {
                        // if (groomInfo.getGroomIsSpouseLiving().equals(MarriageConstants.VALUE_FALSE)
                        // && groomInfo.getGroomNoOfSpouse().equals(MarriageConstants.VALUE_FALSE)) {
                        // throw new CustomException("DECEASED IS SPOUSE LIVING AND NO OF SPOUSE
                        // INVALID",
                        // "The deceased Is spouse living and no of spouse living" +
                        // groomInfo.getGroomIsSpouseLiving() + "and"
                        // + groomInfo.getGroomNoOfSpouse() + " is invalid");
                        // }
                        // }
                        // else
                        // if(groomInfo.getMaritalstatusid().equals(MarriageConstants.MARITAL_STATUS_ANNULLED))
                        // {
                        // if (groomInfo.getGroomIsSpouseLiving().equals(MarriageConstants.VALUE_FALSE)
                        // && groomInfo.getGroomNoOfSpouse().equals(MarriageConstants.VALUE_FALSE)) {
                        // throw new CustomException("DECEASED IS SPOUSE LIVING AND NO OF SPOUSE
                        // INVALID",
                        // "The deceased Is spouse living and no of spouse living" +
                        // groomInfo.getGroomIsSpouseLiving() + "and"
                        // + groomInfo.getGroomNoOfSpouse() + " is invalid");
                        // }
                        // }
                        // else
                        // if(groomInfo.getMaritalstatusid().equals(MarriageConstants.MARITAL_STATUS_MARRIED))
                        // {
                        // if (groomInfo.getGroomIsSpouseLiving().equals(MarriageConstants.VALUE_FALSE)
                        // && groomInfo.getGroomNoOfSpouse().equals(MarriageConstants.VALUE_FALSE)) {
                        // throw new CustomException("DECEASED IS SPOUSE LIVING AND NO OF SPOUSE
                        // INVALID",
                        // "The deceased Is spouse living and no of spouse living" +
                        // groomInfo.getGroomIsSpouseLiving() + "and"
                        // + groomInfo.getGroomNoOfSpouse() + " is invalid");
                        // }
                        // }
                        // else
                        // if(groomInfo.getMaritalstatusid().equals(MarriageConstants.MARITAL_STATUS_WIDOWED))
                        // {
                        // if (groomInfo.getGroomIsSpouseLiving().equals(MarriageConstants.VALUE_FALSE)
                        // && groomInfo.getGroomNoOfSpouse().equals(MarriageConstants.VALUE_FALSE)) {
                        // throw new CustomException("DECEASED IS SPOUSE LIVING AND NO OF SPOUSE
                        // INVALID",
                        // "The deceased Is spouse living and no of spouse living" +
                        // groomInfo.getGroomIsSpouseLiving() + "and"
                        // + groomInfo.getGroomNoOfSpouse() + " is invalid");
                        // }
                        // }
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
                            throw new CustomException("BRIDE BIRTH DATE INVALID", "The date can't be null");
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
                        // if
                        // (brideInfo.getMaritalstatusid().equals(MarriageConstants.MARITAL_STATUS_DIVORCED))
                        // {
                        // if (brideInfo.getGroomIsSpouseLiving().equals(MarriageConstants.VALUE_FALSE)
                        // && brideInfo.getGroomNoOfSpouse().equals(MarriageConstants.VALUE_FALSE)) {
                        // throw new CustomException("DECEASED IS SPOUSE LIVING AND NO OF SPOUSE
                        // INVALID",
                        // "The deceased Is spouse living and no of spouse living" +
                        // brideInfo.getGroomIsSpouseLiving() + "and"
                        // + brideInfo.getGroomNoOfSpouse() + " is invalid");
                        // }
                        // }
                        // else
                        // if(brideInfo.getMaritalstatusid().equals(MarriageConstants.MARITAL_STATUS_ANNULLED))
                        // {
                        // if (brideInfo.getGroomIsSpouseLiving().equals(MarriageConstants.VALUE_FALSE)
                        // && brideInfo.getGroomNoOfSpouse().equals(MarriageConstants.VALUE_FALSE)) {
                        // throw new CustomException("DECEASED IS SPOUSE LIVING AND NO OF SPOUSE
                        // INVALID",
                        // "The deceased Is spouse living and no of spouse living" +
                        // brideInfo.getGroomIsSpouseLiving() + "and"
                        // + brideInfo.getGroomNoOfSpouse() + " is invalid");
                        // }
                        // }
                        // else
                        // if(brideInfo.getMaritalstatusid().equals(MarriageConstants.MARITAL_STATUS_MARRIED))
                        // {
                        // if (brideInfo.getGroomIsSpouseLiving().equals(MarriageConstants.VALUE_FALSE)
                        // && brideInfo.getGroomNoOfSpouse().equals(MarriageConstants.VALUE_FALSE)) {
                        // throw new CustomException("DECEASED IS SPOUSE LIVING AND NO OF SPOUSE
                        // INVALID",
                        // "The deceased Is spouse living and no of spouse living" +
                        // brideInfo.getGroomIsSpouseLiving() + "and"
                        // + brideInfo.getGroomNoOfSpouse() + " is invalid");
                        // }
                        // }
                        // else
                        // if(brideInfo.getMaritalstatusid().equals(MarriageConstants.MARITAL_STATUS_WIDOWED))
                        // {
                        // if (brideInfo.getGroomIsSpouseLiving().equals(MarriageConstants.VALUE_FALSE)
                        // && brideInfo.getGroomNoOfSpouse().equals(MarriageConstants.VALUE_FALSE)) {
                        // throw new CustomException("DECEASED IS SPOUSE LIVING AND NO OF SPOUSE
                        // INVALID",
                        // "The deceased Is spouse living and no of spouse living" +
                        // brideInfo.getGroomIsSpouseLiving() + "and"
                        // + brideInfo.getGroomNoOfSpouse() + " is invalid");
                        // }
                        // }
                        // }

                        // groom permanent address start

                        if (groomaddressInfo.getPermtaddressCountry().equals(MarriageConstants.ADDRESS_INDIA)) {
                            if (StringUtils.isEmpty(groomaddressInfo.getPermtaddressStateName())) {
                                throw new CustomException("DECEASED STATE INVALID",
                                        "The deceased  State" +
                                                groomaddressInfo.getPermtaddressStateName() + " is invalid");
                            } else {
                                if (groomaddressInfo.getPermtaddressStateName()
                                        .equals(MarriageConstants.ADDRESS_KERALA)) {
                                    if (StringUtils.isEmpty(groomaddressInfo.getPermntInKeralaAdrDistrict())) {
                                        throw new CustomException("DECEASED DISTRICT INVALID",
                                                "The deceased  District" +
                                                        groomaddressInfo.getPermntInKeralaAdrDistrict()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(groomaddressInfo.getPermntInKeralaAdrTaluk())) {
                                        throw new CustomException("DECEASED TALUK INVALID",
                                                "The deceased  Taluk" +
                                                        groomaddressInfo.getPermntInKeralaAdrTaluk() + " is invalid");
                                    }

                                    if (StringUtils.isEmpty(groomaddressInfo.getPermntInKeralaAdrVillage())) {
                                        throw new CustomException("DECEASED VILLAGE INVALID",
                                                "The deceased  Village" +
                                                        groomaddressInfo.getPresentInsideKeralaVillage()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(groomaddressInfo.getPermntInKeralaAdrLBName())) {
                                        throw new CustomException("DECEASED LOCALBODY NAME INVALID",
                                                "The deceased  Localbody Name" +
                                                        groomaddressInfo.getPermntInKeralaAdrLBName() + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(groomaddressInfo.getPermntInKeralaWardNo())) {
                                        throw new CustomException("DECEASED WARD INVALID",
                                                "The deceased  Ward" +
                                                        groomaddressInfo.getPermntInKeralaWardNo() + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(groomaddressInfo.getPermntInKeralaAdrPostOffice())) {
                                        throw new CustomException("DECEASED POSTOFFICE INVALID",
                                                "The deceased  Postofficef" +
                                                        groomaddressInfo.getPermntInKeralaAdrPostOffice()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(groomaddressInfo.getPermntInKeralaAdrPincode())) {
                                        throw new CustomException("DECEASED PINCODE INVALID",
                                                "The deceased  Pincode" +
                                                        groomaddressInfo.getPermntInKeralaAdrPincode() + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(groomaddressInfo.getPermntInKeralaAdrLocalityNameEn())) {
                                        throw new CustomException("DECEASED LOCALITY NAME ENGLISH IS  INVALID",
                                                "The deceased  Locality English" +
                                                        groomaddressInfo.getPermntInKeralaAdrLocalityNameEn()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(groomaddressInfo.getPermntInKeralaAdrLocalityNameMl())) {
                                        throw new CustomException("DECEASED LOCALITY NAME MALAYALAM IS INVALID",
                                                "The deceased  Locality Malayalam" +
                                                        groomaddressInfo.getPermntInKeralaAdrLocalityNameMl()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(groomaddressInfo.getPermntInKeralaAdrHouseNameEn())) {
                                        throw new CustomException("DECEASED HOUSE NAME ENGLISH INVALID",
                                                "The deceased  House Name English" +
                                                        groomaddressInfo.getPermntInKeralaAdrHouseNameEn()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(groomaddressInfo.getPermntInKeralaAdrHouseNameMl())) {
                                        throw new CustomException("DECEASED HOUSE NAME MALAYALAM INVALID",
                                                "The deceased  House Name Malayalam" +
                                                        groomaddressInfo.getPermntInKeralaAdrHouseNameMl()
                                                        + " is invalid");
                                    }
                                }
                            }
                        } else {
                            if (StringUtils.isEmpty(groomaddressInfo.getPermntOutSideIndiaProvinceEn())) {
                                throw new CustomException("DECEASED PROVINCE ENGLISH INVALID",
                                        "The deceased  Province English" +
                                                groomaddressInfo.getPermntOutSideIndiaProvinceEn() + " is invalid");
                            }
                            if (StringUtils.isEmpty(groomaddressInfo.getPermntOutSideIndiaProvinceMl())) {
                                throw new CustomException("DECEASED PROVINCE MALAYALAM INVALID",
                                        "The deceased  Province Malayalam" +
                                                groomaddressInfo.getPermntOutSideIndiaProvinceMl() + " is invalid");
                            }
                            if (StringUtils.isEmpty(groomaddressInfo.getPermntOutsideIndiaVillage())) {
                                throw new CustomException("DECEASED VILLAGE INVALID",
                                        "The deceased  Village" +
                                                groomaddressInfo.getPermntOutsideIndiaVillage() + " is invalid");
                            }
                            if (StringUtils.isEmpty(groomaddressInfo.getPermntOutsideIndiaCityTown())) {
                                throw new CustomException("DECEASED CITY INVALID",
                                        "The deceased  City" +
                                                groomaddressInfo.getPermntOutsideIndiaCityTown() + " is invalid");
                            }
                            if (StringUtils.isEmpty(groomaddressInfo.getPermanentOutsideIndiaPostCode())) {
                                throw new CustomException("DECEASED POST CODE INVALID",
                                        "The deceased  Post Code" +
                                                groomaddressInfo.getPermanentOutsideIndiaPostCode() + " is invalid");
                            }
                            if (StringUtils.isEmpty(groomaddressInfo.getPermntOutsideIndiaLineoneEn())) {
                                throw new CustomException("DECEASED ADDRESS LINE ONE ENGLISH INVALID",
                                        "The deceased  Adress Line One English" +
                                                groomaddressInfo.getPermntOutsideIndiaLineoneEn() + " is invalid");
                            }
                            if (StringUtils.isEmpty(groomaddressInfo.getPermntOutsideIndiaLinetwoEn())) {
                                throw new CustomException("DECEASED ADDRESS LINE Two ENGLISH INVALID",
                                        "The deceased  Adress Line Two English" +
                                                groomaddressInfo.getPermntOutsideIndiaLinetwoEn() + " is invalid");
                            }
                            if (StringUtils.isEmpty(groomaddressInfo.getPermntOutsideIndiaLineoneMl())) {
                                throw new CustomException("DECEASED ADDRESS LINE ONE MALAYALAM INVALID",
                                        "The deceased  Adress Line One Malayalam" +
                                                groomaddressInfo.getPermntOutsideIndiaLineoneMl() + " is invalid");
                            }
                            if (StringUtils.isEmpty(groomaddressInfo.getPermntOutsideIndiaLinetwoMl())) {
                                throw new CustomException("DECEASED ADDRESS LINE TWO MALAYALAM INVALID",
                                        "The deceased  Adress Line Two Malayalam" +
                                                groomaddressInfo.getPermntOutsideIndiaLinetwoMl() + " is invalid");
                            }

                        }
                        // groom permanent address end
                        // groom present address start
                        if (groomaddressInfo.getPresentaddressCountry().equals(MarriageConstants.ADDRESS_INDIA)) {
                            if (StringUtils.isEmpty(groomaddressInfo.getPresentaddressStateName())) {
                                throw new CustomException("DECEASED STATE INVALID",
                                        "The deceased  State" +
                                                groomaddressInfo.getPresentaddressStateName() + " is invalid");
                            } else {
                                if (groomaddressInfo.getPresentaddressStateName()
                                        .equals(MarriageConstants.ADDRESS_KERALA)) {
                                    if (StringUtils.isEmpty(groomaddressInfo.getPresentInsideKeralaDistrict())) {
                                        throw new CustomException("DECEASED DISTRICT INVALID",
                                                "The deceased  District" +
                                                        groomaddressInfo.getPresentInsideKeralaDistrict()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(groomaddressInfo.getPresentInsideKeralaTaluk())) {
                                        throw new CustomException("DECEASED TALUK INVALID",
                                                "The deceased  Taluk" +
                                                        groomaddressInfo.getPresentInsideKeralaTaluk() + " is invalid");
                                    }

                                    if (StringUtils.isEmpty(groomaddressInfo.getPresentInsideKeralaVillage())) {
                                        throw new CustomException("DECEASED VILLAGE INVALID",
                                                "The deceased  Village" +
                                                        groomaddressInfo.getPresentInsideKeralaVillage()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(groomaddressInfo.getPresentInsideKeralaLBName())) {
                                        throw new CustomException("DECEASED LOCALBODY NAME INVALID",
                                                "The deceased  Localbody Name" +
                                                        groomaddressInfo.getPresentInsideKeralaLBName()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(groomaddressInfo.getPresentWardNo())) {
                                        throw new CustomException("DECEASED WARD INVALID",
                                                "The deceased  Ward" +
                                                        groomaddressInfo.getPresentWardNo() + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(groomaddressInfo.getPresentInsideKeralaPostOffice())) {
                                        throw new CustomException("DECEASED POSTOFFICE INVALID",
                                                "The deceased  Postofficef" +
                                                        groomaddressInfo.getPresentInsideKeralaPostOffice()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(groomaddressInfo.getPresentInsideKeralaPincode())) {
                                        throw new CustomException("DECEASED PINCODE INVALID",
                                                "The deceased  Pincode" +
                                                        groomaddressInfo.getPresentInsideKeralaPincode()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(groomaddressInfo.getPresentInsideKeralaLocalityNameEn())) {
                                        throw new CustomException("DECEASED LOCALITY NAME ENGLISH IS  INVALID",
                                                "The deceased  Locality English" +
                                                        groomaddressInfo.getPresentInsideKeralaLocalityNameEn()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(groomaddressInfo.getPresentInsideKeralaLocalityNameMl())) {
                                        throw new CustomException("DECEASED LOCALITY NAME MALAYALAM IS INVALID",
                                                "The deceased  Locality Malayalam" +
                                                        groomaddressInfo.getPresentInsideKeralaLocalityNameMl()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(groomaddressInfo.getPresentInsideKeralaHouseNameEn())) {
                                        throw new CustomException("DECEASED HOUSE NAME ENGLISH INVALID",
                                                "The deceased  House Name English" +
                                                        groomaddressInfo.getPresentInsideKeralaHouseNameEn()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(groomaddressInfo.getPresentInsideKeralaHouseNameMl())) {
                                        throw new CustomException("DECEASED HOUSE NAME MALAYALAM INVALID",
                                                "The deceased  House Name Malayalam" +
                                                        groomaddressInfo.getPresentInsideKeralaHouseNameMl()
                                                        + " is invalid");
                                    }
                                }
                            }
                        } else {
                            if (StringUtils.isEmpty(groomaddressInfo.getPresentOutSideIndiaProvinceEn())) {
                                throw new CustomException("DECEASED PROVINCE ENGLISH INVALID",
                                        "The deceased  Province English" +
                                                groomaddressInfo.getPresentOutSideIndiaProvinceEn() + " is invalid");
                            }
                            if (StringUtils.isEmpty(groomaddressInfo.getPresentOutSideIndiaProvinceMl())) {
                                throw new CustomException("DECEASED PROVINCE MALAYALAM INVALID",
                                        "The deceased  Province Malayalam" +
                                                groomaddressInfo.getPresentOutSideIndiaProvinceMl() + " is invalid");
                            }
                            if (StringUtils.isEmpty(groomaddressInfo.getPresentOutSideIndiaadrsVillage())) {
                                throw new CustomException("DECEASED VILLAGE INVALID",
                                        "The deceased  Village" +
                                                groomaddressInfo.getPresentOutSideIndiaadrsVillage() + " is invalid");
                            }
                            if (StringUtils.isEmpty(groomaddressInfo.getPresentOutSideIndiaadrsCityTown())) {
                                throw new CustomException("DECEASED CITY INVALID",
                                        "The deceased  City" +
                                                groomaddressInfo.getPresentOutSideIndiaadrsCityTown() + " is invalid");
                            }
                            // if(StringUtils.isEmpty(groomaddressInfo.getPresentOutSideIndiaPostCode()))
                            // {
                            // throw new CustomException("DECEASED POST CODE INVALID",
                            // "The deceased Post Code" +
                            // groomaddressInfo.getPresentOutSideIndiaPostCode() + " is invalid");
                            // }
                            if (StringUtils.isEmpty(groomaddressInfo.getPresentOutSideIndiaAdressEn())) {
                                throw new CustomException("DECEASED ADDRESS LINE ONE ENGLISH INVALID",
                                        "The deceased  Adress Line One English" +
                                                groomaddressInfo.getPresentOutSideIndiaAdressEn() + " is invalid");
                            }
                            if (StringUtils.isEmpty(groomaddressInfo.getPresentOutSideIndiaAdressEnB())) {
                                throw new CustomException("DECEASED ADDRESS LINE Two ENGLISH INVALID",
                                        "The deceased  Adress Line Two English" +
                                                groomaddressInfo.getPresentOutSideIndiaAdressEnB() + " is invalid");
                            }
                            if (StringUtils.isEmpty(groomaddressInfo.getPresentOutSideIndiaAdressMl())) {
                                throw new CustomException("DECEASED ADDRESS LINE ONE MALAYALAM INVALID",
                                        "The deceased  Adress Line One Malayalam" +
                                                groomaddressInfo.getPresentOutSideIndiaAdressMl() + " is invalid");
                            }
                            if (StringUtils.isEmpty(groomaddressInfo.getPresentOutSideIndiaAdressMlB())) {
                                throw new CustomException("DECEASED ADDRESS LINE TWO MALAYALAM INVALID",
                                        "The deceased  Adress Line Two Malayalam" +
                                                groomaddressInfo.getPresentOutSideIndiaAdressMlB() + " is invalid");
                            }

                        }
                        // groom present address end
                        // bride permanent address start

                        if (brideaddressInfo.getPermtaddressCountry().equals(MarriageConstants.ADDRESS_INDIA)) {
                            if (StringUtils.isEmpty(brideaddressInfo.getPermtaddressStateName())) {
                                throw new CustomException("DECEASED STATE INVALID",
                                        "The deceased  State" +
                                                brideaddressInfo.getPermtaddressStateName() + " is invalid");
                            } else {
                                if (brideaddressInfo.getPermtaddressStateName()
                                        .equals(MarriageConstants.ADDRESS_KERALA)) {
                                    if (StringUtils.isEmpty(brideaddressInfo.getPermntInKeralaAdrDistrict())) {
                                        throw new CustomException("DECEASED DISTRICT INVALID",
                                                "The deceased  District" +
                                                        brideaddressInfo.getPermntInKeralaAdrDistrict()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(brideaddressInfo.getPermntInKeralaAdrTaluk())) {
                                        throw new CustomException("DECEASED TALUK INVALID",
                                                "The deceased  Taluk" +
                                                        brideaddressInfo.getPermntInKeralaAdrTaluk() + " is invalid");
                                    }

                                    if (StringUtils.isEmpty(brideaddressInfo.getPermntInKeralaAdrVillage())) {
                                        throw new CustomException("DECEASED VILLAGE INVALID",
                                                "The deceased  Village" +
                                                        brideaddressInfo.getPresentInsideKeralaVillage()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(brideaddressInfo.getPermntInKeralaAdrLBName())) {
                                        throw new CustomException("DECEASED LOCALBODY NAME INVALID",
                                                "The deceased  Localbody Name" +
                                                        brideaddressInfo.getPermntInKeralaAdrLBName() + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(brideaddressInfo.getPermntInKeralaWardNo())) {
                                        throw new CustomException("DECEASED WARD INVALID",
                                                "The deceased  Ward" +
                                                        brideaddressInfo.getPermntInKeralaWardNo() + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(brideaddressInfo.getPermntInKeralaAdrPostOffice())) {
                                        throw new CustomException("DECEASED POSTOFFICE INVALID",
                                                "The deceased  Postofficef" +
                                                        brideaddressInfo.getPermntInKeralaAdrPostOffice()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(brideaddressInfo.getPermntInKeralaAdrPincode())) {
                                        throw new CustomException("DECEASED PINCODE INVALID",
                                                "The deceased  Pincode" +
                                                        brideaddressInfo.getPermntInKeralaAdrPincode() + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(brideaddressInfo.getPermntInKeralaAdrLocalityNameEn())) {
                                        throw new CustomException("DECEASED LOCALITY NAME ENGLISH IS  INVALID",
                                                "The deceased  Locality English" +
                                                        brideaddressInfo.getPermntInKeralaAdrLocalityNameEn()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(brideaddressInfo.getPermntInKeralaAdrLocalityNameMl())) {
                                        throw new CustomException("DECEASED LOCALITY NAME MALAYALAM IS INVALID",
                                                "The deceased  Locality Malayalam" +
                                                        brideaddressInfo.getPermntInKeralaAdrLocalityNameMl()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(brideaddressInfo.getPermntInKeralaAdrHouseNameEn())) {
                                        throw new CustomException("DECEASED HOUSE NAME ENGLISH INVALID",
                                                "The deceased  House Name English" +
                                                        brideaddressInfo.getPermntInKeralaAdrHouseNameEn()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(brideaddressInfo.getPermntInKeralaAdrHouseNameMl())) {
                                        throw new CustomException("DECEASED HOUSE NAME MALAYALAM INVALID",
                                                "The deceased  House Name Malayalam" +
                                                        brideaddressInfo.getPermntInKeralaAdrHouseNameMl()
                                                        + " is invalid");
                                    }
                                }
                            }
                        } else {
                            if (StringUtils.isEmpty(brideaddressInfo.getPermntOutSideIndiaProvinceEn())) {
                                throw new CustomException("DECEASED PROVINCE ENGLISH INVALID",
                                        "The deceased  Province English" +
                                                brideaddressInfo.getPermntOutSideIndiaProvinceEn() + " is invalid");
                            }
                            if (StringUtils.isEmpty(brideaddressInfo.getPermntOutSideIndiaProvinceMl())) {
                                throw new CustomException("DECEASED PROVINCE MALAYALAM INVALID",
                                        "The deceased  Province Malayalam" +
                                                brideaddressInfo.getPermntOutSideIndiaProvinceMl() + " is invalid");
                            }
                            if (StringUtils.isEmpty(brideaddressInfo.getPermntOutsideIndiaVillage())) {
                                throw new CustomException("DECEASED VILLAGE INVALID",
                                        "The deceased  Village" +
                                                brideaddressInfo.getPermntOutsideIndiaVillage() + " is invalid");
                            }
                            if (StringUtils.isEmpty(brideaddressInfo.getPermntOutsideIndiaCityTown())) {
                                throw new CustomException("DECEASED CITY INVALID",
                                        "The deceased  City" +
                                                brideaddressInfo.getPermntOutsideIndiaCityTown() + " is invalid");
                            }
                            if (StringUtils.isEmpty(brideaddressInfo.getPermanentOutsideIndiaPostCode())) {
                                throw new CustomException("DECEASED POST CODE INVALID",
                                        "The deceased  Post Code" +
                                                brideaddressInfo.getPermanentOutsideIndiaPostCode() + " is invalid");
                            }
                            if (StringUtils.isEmpty(brideaddressInfo.getPermntOutsideIndiaLineoneEn())) {
                                throw new CustomException("DECEASED ADDRESS LINE ONE ENGLISH INVALID",
                                        "The deceased  Adress Line One English" +
                                                brideaddressInfo.getPermntOutsideIndiaLineoneEn() + " is invalid");
                            }
                            if (StringUtils.isEmpty(brideaddressInfo.getPermntOutsideIndiaLinetwoEn())) {
                                throw new CustomException("DECEASED ADDRESS LINE Two ENGLISH INVALID",
                                        "The deceased  Adress Line Two English" +
                                                brideaddressInfo.getPermntOutsideIndiaLinetwoEn() + " is invalid");
                            }
                            if (StringUtils.isEmpty(brideaddressInfo.getPermntOutsideIndiaLineoneMl())) {
                                throw new CustomException("DECEASED ADDRESS LINE ONE MALAYALAM INVALID",
                                        "The deceased  Adress Line One Malayalam" +
                                                brideaddressInfo.getPermntOutsideIndiaLineoneMl() + " is invalid");
                            }
                            if (StringUtils.isEmpty(brideaddressInfo.getPermntOutsideIndiaLinetwoMl())) {
                                throw new CustomException("DECEASED ADDRESS LINE TWO MALAYALAM INVALID",
                                        "The deceased  Adress Line Two Malayalam" +
                                                brideaddressInfo.getPermntOutsideIndiaLinetwoMl() + " is invalid");
                            }

                        }
                        // bride permanent address end
                        // bride present address start
                        if (brideaddressInfo.getPresentaddressCountry().equals(MarriageConstants.ADDRESS_INDIA)) {
                            if (StringUtils.isEmpty(brideaddressInfo.getPresentaddressStateName())) {
                                throw new CustomException("DECEASED STATE INVALID",
                                        "The deceased  State" +
                                                brideaddressInfo.getPresentaddressStateName() + " is invalid");
                            } else {
                                if (brideaddressInfo.getPresentaddressStateName()
                                        .equals(MarriageConstants.ADDRESS_KERALA)) {
                                    if (StringUtils.isEmpty(brideaddressInfo.getPresentInsideKeralaDistrict())) {
                                        throw new CustomException("DECEASED DISTRICT INVALID",
                                                "The deceased  District" +
                                                        brideaddressInfo.getPresentInsideKeralaDistrict()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(brideaddressInfo.getPresentInsideKeralaTaluk())) {
                                        throw new CustomException("DECEASED TALUK INVALID",
                                                "The deceased  Taluk" +
                                                        brideaddressInfo.getPresentInsideKeralaTaluk() + " is invalid");
                                    }

                                    if (StringUtils.isEmpty(brideaddressInfo.getPresentInsideKeralaVillage())) {
                                        throw new CustomException("DECEASED VILLAGE INVALID",
                                                "The deceased  Village" +
                                                        brideaddressInfo.getPresentInsideKeralaVillage()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(brideaddressInfo.getPresentInsideKeralaLBName())) {
                                        throw new CustomException("DECEASED LOCALBODY NAME INVALID",
                                                "The deceased  Localbody Name" +
                                                        brideaddressInfo.getPresentInsideKeralaLBName()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(brideaddressInfo.getPresentWardNo())) {
                                        throw new CustomException("DECEASED WARD INVALID",
                                                "The deceased  Ward" +
                                                        brideaddressInfo.getPresentWardNo() + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(brideaddressInfo.getPresentInsideKeralaPostOffice())) {
                                        throw new CustomException("DECEASED POSTOFFICE INVALID",
                                                "The deceased  Postofficef" +
                                                        brideaddressInfo.getPresentInsideKeralaPostOffice()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(brideaddressInfo.getPresentInsideKeralaPincode())) {
                                        throw new CustomException("DECEASED PINCODE INVALID",
                                                "The deceased  Pincode" +
                                                        brideaddressInfo.getPresentInsideKeralaPincode()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(brideaddressInfo.getPresentInsideKeralaLocalityNameEn())) {
                                        throw new CustomException("DECEASED LOCALITY NAME ENGLISH IS  INVALID",
                                                "The deceased  Locality English" +
                                                        brideaddressInfo.getPresentInsideKeralaLocalityNameEn()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(brideaddressInfo.getPresentInsideKeralaLocalityNameMl())) {
                                        throw new CustomException("DECEASED LOCALITY NAME MALAYALAM IS INVALID",
                                                "The deceased  Locality Malayalam" +
                                                        brideaddressInfo.getPresentInsideKeralaLocalityNameMl()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(brideaddressInfo.getPresentInsideKeralaHouseNameEn())) {
                                        throw new CustomException("DECEASED HOUSE NAME ENGLISH INVALID",
                                                "The deceased  House Name English" +
                                                        brideaddressInfo.getPresentInsideKeralaHouseNameEn()
                                                        + " is invalid");
                                    }
                                    if (StringUtils.isEmpty(brideaddressInfo.getPresentInsideKeralaHouseNameMl())) {
                                        throw new CustomException("DECEASED HOUSE NAME MALAYALAM INVALID",
                                                "The deceased  House Name Malayalam" +
                                                        brideaddressInfo.getPresentInsideKeralaHouseNameMl()
                                                        + " is invalid");
                                    }
                                }
                            }
                        } else {
                            if (StringUtils.isEmpty(brideaddressInfo.getPresentOutSideIndiaProvinceEn())) {
                                throw new CustomException("DECEASED PROVINCE ENGLISH INVALID",
                                        "The deceased  Province English" +
                                                brideaddressInfo.getPresentOutSideIndiaProvinceEn() + " is invalid");
                            }
                            if (StringUtils.isEmpty(brideaddressInfo.getPresentOutSideIndiaProvinceMl())) {
                                throw new CustomException("DECEASED PROVINCE MALAYALAM INVALID",
                                        "The deceased  Province Malayalam" +
                                                brideaddressInfo.getPresentOutSideIndiaProvinceMl() + " is invalid");
                            }
                            if (StringUtils.isEmpty(brideaddressInfo.getPresentOutSideIndiaadrsVillage())) {
                                throw new CustomException("DECEASED VILLAGE INVALID",
                                        "The deceased  Village" +
                                                brideaddressInfo.getPresentOutSideIndiaadrsVillage() + " is invalid");
                            }
                            if (StringUtils.isEmpty(brideaddressInfo.getPresentOutSideIndiaadrsCityTown())) {
                                throw new CustomException("DECEASED CITY INVALID",
                                        "The deceased  City" +
                                                brideaddressInfo.getPresentOutSideIndiaadrsCityTown() + " is invalid");
                            }
                            if(StringUtils.isEmpty(brideaddressInfo.getPresentOutSideIndiaPostCode()))
                            {
                            throw new CustomException("DECEASED POST CODE INVALID",
                            "The deceased Post Code" +
                            brideaddressInfo.getPresentOutSideIndiaPostCode() + " is invalid");
                            }
                            if (StringUtils.isEmpty(brideaddressInfo.getPresentOutSideIndiaAdressEn())) {
                                throw new CustomException("DECEASED ADDRESS LINE ONE ENGLISH INVALID",
                                        "The deceased  Adress Line One English" +
                                                brideaddressInfo.getPresentOutSideIndiaAdressEn() + " is invalid");
                            }
                            if (StringUtils.isEmpty(brideaddressInfo.getPresentOutSideIndiaAdressEnB())) {
                                throw new CustomException("DECEASED ADDRESS LINE Two ENGLISH INVALID",
                                        "The deceased  Adress Line Two English" +
                                                brideaddressInfo.getPresentOutSideIndiaAdressEnB() + " is invalid");
                            }
                            if (StringUtils.isEmpty(brideaddressInfo.getPresentOutSideIndiaAdressMl())) {
                                throw new CustomException("DECEASED ADDRESS LINE ONE MALAYALAM INVALID",
                                        "The deceased  Adress Line One Malayalam" +
                                                brideaddressInfo.getPresentOutSideIndiaAdressMl() + " is invalid");
                            }
                            if (StringUtils.isEmpty(brideaddressInfo.getPresentOutSideIndiaAdressMlB())) {
                                throw new CustomException("DECEASED ADDRESS LINE TWO MALAYALAM INVALID",
                                        "The deceased  Adress Line Two Malayalam" +
                                                brideaddressInfo.getPresentOutSideIndiaAdressMlB() + " is invalid");
                            }

                        }
                        // witness1
                      if(StringUtils.isEmpty(witnessDtls.getWitness1AadharNo())){
                        
                        throw new CustomException("DECEASED  WITNESS1 AADHAR NUMBER INVALID",
                        "The deceased Witness1 Aadhar Number" +
                        witnessDtls.getWitness1AadharNo() + " is invalid");
                      }
                      if(StringUtils.isEmpty(witnessDtls.getWitness1NameEn())){
                        
                        throw new CustomException("DECEASED WITNESS1 NAME  ENGLISH INVALID",
                        "The deceased  Witness1 Name English" +
                        witnessDtls.getWitness1NameEn() + " is invalid");
                      }
                      if(StringUtils.isEmpty(witnessDtls.getWitness1NameMl())){
                        
                        throw new CustomException("DECEASED WITNESS1 NAME  MALAYALAM INVALID",
                        "The deceased  Witness1 Name Malayalam" +
                        witnessDtls.getWitness1NameMl() + " is invalid");
                      }
                      if((witnessDtls.getWitness1Age()<18 && witnessDtls.getWitness1Age()==0)){
                        
                        throw new CustomException("DECEASED WITNESS1 AGE INVALID",
                        "The deceased  Witness1 Age" +
                        witnessDtls.getWitness1Age() + " is invalid");
                      }
                      if((StringUtils.isEmpty(witnessDtls.getWitness1AddresSEn()))){
                        
                        throw new CustomException("DECEASED WITNESS1 ADDRESS ENGLISH INVALID",
                        "The deceased  Witness1 Address English" +
                        witnessDtls.getWitness1AddresSEn() + " is invalid");
                      }
                      if((StringUtils.isEmpty(witnessDtls.getWitness1AddressMl()))){
                        
                        throw new CustomException("DECEASED WITNESS1 ADDRESS MALAYALAM INVALID",
                        "The deceased  Witness1 Address Malayalam" +
                        witnessDtls.getWitness1AddressMl() + " is invalid");
                      }
                      if((witnessDtls.getWitness1Mobile()<=0 )){
                        
                        throw new CustomException("DECEASED WITNESS1 MOBILE NUMBER  INVALID",
                        "The deceased  Witness1 Mobile Number " +
                        witnessDtls.getWitness1Mobile() + " is invalid");
                      }
                      if((witnessDtls.getWitness1Esigned().equals(MarriageConstants.VALUE_FALSE))){
                        
                        throw new CustomException("DECEASED WITNESS1 E-SIGN INVALID",
                        "The deceased  Witness1  E-sign " +
                        witnessDtls.getWitness1Esigned()+ " is invalid");
                      }






                      
                      //witness2
                      if(StringUtils.isEmpty(witnessDtls.getWitness2AadharNo())){
                        
                        throw new CustomException("DECEASED WITNESS2 AADHAR NUMBER INVALID",
                        "The deceased  Witness2 Aadhar Number" +
                        witnessDtls.getWitness2AadharNo() + " is invalid");
                      }
                      if(StringUtils.isEmpty(witnessDtls.getWitness2NameEn())){
                        
                        throw new CustomException("DECEASED WITNESS2 NAME  ENGLISH INVALID",
                        "The deceased  Witness2 Name English" +
                        witnessDtls.getWitness2NameEn() + " is invalid");
                      }
                      if(StringUtils.isEmpty(witnessDtls.getWitness2NameMl())){
                        
                        throw new CustomException("DECEASED WITNESS2 NAME  MALAYALAM INVALID",
                        "The deceased  Witness2 Name Malayalam" +
                        witnessDtls.getWitness2NameMl() + " is invalid");
                      }
                      if((witnessDtls.getWitness2Age()<18 && witnessDtls.getWitness2Age()==0)){
                        
                        throw new CustomException("DECEASED WITNESS2 AGE INVALID",
                        "The deceased  Witness2 Age" +
                        witnessDtls.getWitness2Age() + " is invalid");
                      }
                      if((StringUtils.isEmpty(witnessDtls.getWitness2AddresSEn()))){
                        
                        throw new CustomException("DECEASED WITNESS2 ADDRESS ENGLISH INVALID",
                        "The deceased  Witness2 Address English" +
                        witnessDtls.getWitness2AddresSEn() + " is invalid");
                      }
                      if((StringUtils.isEmpty(witnessDtls.getWitness2AddressMl()))){
                        
                        throw new CustomException("DECEASED WITNESS2 ADDRESS MALAYALAM INVALID",
                        "The deceased  Witness2 Address Malayalam" +
                        witnessDtls.getWitness2AddressMl() + " is invalid");
                      }
                      if((witnessDtls.getWitness2Mobile()<=0 )){
                        
                        throw new CustomException("DECEASED WITNESS2 MOBILE NUMBER  INVALID",
                        "The deceased  Witness2 Mobile Number " +
                        witnessDtls.getWitness2Mobile() + " is invalid");
                      }
                      if((witnessDtls.getWitness2Esigned().equals(MarriageConstants.VALUE_FALSE))){
                        
                        throw new CustomException("DECEASED WITNESS2 E-SIGN INVALID",
                        "The deceased  Witness2  E-sign " +
                        witnessDtls.getWitness2Esigned()+ " is invalid");
                      }
                    });
        }

    }
}
