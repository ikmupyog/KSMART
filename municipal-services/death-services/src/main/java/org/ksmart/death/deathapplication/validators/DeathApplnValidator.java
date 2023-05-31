package org.ksmart.death.deathapplication.validators;

import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static org.ksmart.death.deathapplication.web.enums.ErrorCodes.DEATH_DETAILS_REQUIRED;
import static org.ksmart.death.deathapplication.web.enums.ErrorCodes.DEATH_DETAILS_INVALID_CREATE;
import static org.ksmart.death.deathapplication.web.enums.ErrorCodes.DEATH_REG_REQUIRED;
import static org.ksmart.death.deathapplication.web.enums.ErrorCodes.DEATH_REG_INVALID_UPDATE;

import org.apache.commons.collections4.CollectionUtils;
import org.ksmart.death.deathapplication.util.DeathConstants;
import org.ksmart.death.deathapplication.web.models.DeathAbandonedDtls;
import org.ksmart.death.deathapplication.web.models.DeathAbandonedRequest;
import org.ksmart.death.deathapplication.web.models.DeathAddressInfo;
import org.ksmart.death.deathapplication.web.models.DeathDtl;
import org.ksmart.death.deathapplication.web.models.DeathDtlRequest;
import org.ksmart.death.deathapplication.web.models.DeathFamilyInfo;
import org.ksmart.death.deathapplication.web.models.DeathInformantDtls;
import org.ksmart.death.deathapplication.web.models.DeathInitiatorDtls;
import org.ksmart.death.deathapplication.web.models.DeathNACApplicantDtls;
import org.ksmart.death.deathapplication.web.models.DeathNACDtls;
import org.ksmart.death.deathapplication.web.models.DeathNACRequest;
import org.ksmart.death.deathapplication.web.models.DeathStatisticalInfo;
import org.ksmart.death.deathapplication.web.models.WorkFlowCheck;
import org.ksmart.death.deathapplication.web.models.DeathBasicInfo;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionBasicInfo;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionRequest;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionDtls;


import org.egov.tracer.model.CustomException;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.jayway.jsonpath.JsonPath;

import org.apache.commons.lang3.StringUtils;
/**
     * Creates Jasmine
     * on  04/12/2022
     */
@Component

public class DeathApplnValidator {


    public void validateUpdate(DeathDtlRequest request, List<DeathDtl> searchResult) {
        List<DeathDtl> deathdetails = request.getDeathCertificateDtls();

        if (CollectionUtils.isEmpty(deathdetails)) {
            throw new CustomException(DEATH_REG_REQUIRED.getCode(), "Death registration is required.");
        }

        if (deathdetails.size() > 1) { // NOPMD
            throw new CustomException(DEATH_REG_INVALID_UPDATE.getCode(),
                    "Supports only single Death registration update request.");
        }

        if (deathdetails.size() != searchResult.size()) {
            throw new CustomException(DEATH_REG_INVALID_UPDATE.getCode(),
                    "Death registration(s) not found in database.");
        }
  //IMP:Have to enable after URI submission
        validateCommonFields( request);
    }
//Jasmine 06.03.2023
    public void validateCorrectionUpdate(DeathCorrectionRequest request, List<DeathCorrectionDtls> searchResult) {
        List<DeathCorrectionDtls> deathdetails = request.getDeathCorrection();

        if (CollectionUtils.isEmpty(deathdetails)) {
            throw new CustomException(DEATH_REG_REQUIRED.getCode(), "Death registration is required.");
        }

        if (deathdetails.size() > 1) { // NOPMD
            throw new CustomException(DEATH_REG_INVALID_UPDATE.getCode(),
                    "Supports only single Death registration update request.");
        }

        if (deathdetails.size() != searchResult.size()) {
            throw new CustomException(DEATH_REG_INVALID_UPDATE.getCode(),
                    "Death registration(s) not found in database.");
        }
  //IMP:Have to enable after URI submission
        validateCorrectionCommonFields( request);
    }

public void validateCommonFields(DeathDtlRequest request) {
      
    List<DeathDtl> deathApplication = request.getDeathCertificateDtls();
    if (deathApplication!=null){
     deathApplication
    .forEach(deathdtls -> {
        DeathBasicInfo  basicInfo = deathdtls.getDeathBasicInfo();
        DeathStatisticalInfo  statisticalInfo = deathdtls.getDeathStatisticalInfo();
        DeathFamilyInfo  familyInfo = deathdtls.getDeathFamilyInfo();
        DeathInformantDtls  informantDtls = deathdtls.getDeathInformantDtls();
        DeathInitiatorDtls  initiatorDtls = deathdtls.getDeathInitiatorDtls();
        DeathAddressInfo deathAddressInfo = deathdtls.getDeathAddressInfo();
        //Common validation for all cases
            if(StringUtils.isEmpty(basicInfo.getDeceasedGender()) ){
                throw new CustomException("DECEASED GENDER INVALID", "The deceased  gender" +
                basicInfo.getDeceasedGender()+ " is invalid");
                }

            if(basicInfo.getAge()<=0){
                throw new CustomException("DECEASED AGE INVALID", "The deceased  age" +
                basicInfo.getAge()+ " is invalid");
            }
             if(StringUtils.isEmpty(basicInfo.getAgeUnit()) ){
                throw new CustomException("DECEASED AGEUNIT INVALID", "The deceased  age unit" +
                basicInfo.getAgeUnit()+ " is invalid");
            }
            if(basicInfo.getDeceasedAadharNotAvailable().equals(DeathConstants.VALUE_FALSE)){

                if(StringUtils.isEmpty(basicInfo.getDeceasedAadharNumber()) ){
                        throw new CustomException("DECEASED AADHAR INVALID", "The deceased  Aadhar number" +
                        basicInfo.getAgeUnit()+ " is invalid");
                }
                else
                {      
                    if(StringUtils.isEmpty(basicInfo.getDeceasedIdproofType())||StringUtils.isEmpty(basicInfo.getDeceasedIdproofNo())){
                        throw new CustomException("DECEASED ID PROOF INVALID", "The deceased Id proof type " +
                        basicInfo.getDeceasedIdproofType()+ " or  The deceased Id proof number " +basicInfo.getDeceasedIdproofNo()  + " is invalid");
                    }
                }
            }
            if(StringUtils.isEmpty(basicInfo.getDeceasedFirstNameEn()) ){
                throw new CustomException("DECEASED NAME INVALID", "The deceased name in english" +
                basicInfo.getDeceasedFirstNameEn()+ " is invalid");
            }
            if(StringUtils.isEmpty(basicInfo.getDeceasedFirstNameMl()) ){
                throw new CustomException("DECEASED NAME INVALID", "The deceased name in malayalam" +
                basicInfo.getDeceasedFirstNameMl()+ " is invalid");
            }
            if(StringUtils.isEmpty(basicInfo.getNationality()) ){
                throw new CustomException("DECEASED NATIONALITY INVALID", "The deceased nationality" +
                basicInfo.getNationality()+ " is invalid");
            }
            if(StringUtils.isEmpty(basicInfo.getReligion()) ){
                throw new CustomException("DECEASED RELIGION INVALID", "The deceased  religion " +
                basicInfo.getReligion()+ " is invalid");
            }
            if(familyInfo.getFamilyMobileNo()<=0){
                throw new CustomException("CONTACT NUMBER INVALID", "The  family mobile number " +
                familyInfo.getFamilyMobileNo()+ " is invalid");
            }
        //DEATH PLACE HOSPITAL
            if (basicInfo.getDeathPlace().equals(DeathConstants.DEATH_PLACE_HOSPITAL)){
                if(StringUtils.isEmpty(basicInfo.getHospitalNameEn())){
                    throw new CustomException("HOSPITAL NAME IS INVALID", "The Hospital name " +
                    basicInfo.getHospitalNameEn()+ " is invalid");  
                } 
                //INFORMANT DETAILS
                // if(StringUtils.isEmpty(informantDtls.getInformantAadharNo())){
                //     throw new CustomException("INFORMANT AADHAR IS INVALID", "The Aadhar of informant " +
                //     informantDtls.getInformantAadharNo()+ " is invalid");  
                // } 
                // if(StringUtils.isEmpty(informantDtls.getInformantNameEn())){
                //     throw new CustomException("INFORMANT NAME IS INVALID", "The name of informant " +
                //     informantDtls.getInformantNameEn()+ " is invalid");  
                // } 
                // if(StringUtils.isEmpty(informantDtls.getDeathSignedOfficerDesignation())){
                //     throw new CustomException("INFORMANT DESIGNATION IS INVALID", "The designation of informant " +
                //     informantDtls.getDeathSignedOfficerDesignation()+ " is invalid");  
                // }
                // if(informantDtls.getInformantMobileNo()<=0){
                //     throw new CustomException("MOBILE NUMBER OF INFORMANT IS INVALID", "The mobile number of informant " +
                //     informantDtls.getInformantMobileNo()+ " is invalid");  
                // }
            }
        //DEATH PLACE INSTITUTION
            if (basicInfo.getDeathPlace().equals(DeathConstants.DEATH_PLACE_INSTITUTION)){
                if(StringUtils.isEmpty(basicInfo.getInstitution())){
                    throw new CustomException("INSTITUTION NAME IS INVALID", "The Institution name " +
                    basicInfo.getInstitution()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceInstId())){
                    throw new CustomException("INSTITUTION TYPE IS INVALID", "The Institution id " +
                    basicInfo.getDeathPlaceInstId()+ " is invalid");  
                } 
                //INFORMANT DETAILS
                // if(StringUtils.isEmpty(informantDtls.getInformantAadharNo())){
                //     throw new CustomException("INFORMANT AADHAR IS INVALID", "The Aadhar of informant " +
                //     informantDtls.getInformantAadharNo()+ " is invalid");  
                // } 
                // if(StringUtils.isEmpty(informantDtls.getInformantNameEn())){
                //     throw new CustomException("INFORMANT NAME IS INVALID", "The name of informant " +
                //     informantDtls.getInformantNameEn()+ " is invalid");  
                // } 
                // if(StringUtils.isEmpty(informantDtls.getDeathSignedOfficerDesignation())){
                //     throw new CustomException("INFORMANT DESIGNATION IS INVALID", "The designation of informant " +
                //     informantDtls.getDeathSignedOfficerDesignation()+ " is invalid");  
                // }
                // if(informantDtls.getInformantMobileNo()<=0){
                //     throw new CustomException("MOBILE NUMBER OF INFORMANT IS INVALID", "The mobile number of informant " +
                //     informantDtls.getInformantMobileNo()+ " is invalid");  
                // }

            }
//DEATH PLACE HOME
            if (basicInfo.getDeathPlace().equals(DeathConstants.DEATH_PLACE_HOME)){
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceHomeWardId())){
                    throw new CustomException("DEATHPLACE WARD IS INVALID", "The ward name " +
                    basicInfo.getDeathPlaceHomeWardId()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceHomePostofficeId())){
                    throw new CustomException("DEATHPLACE POSTOFFICE IS INVALID", "The postoffice name " +
                    basicInfo.getDeathPlaceHomePostofficeId()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceHomePincode())){
                    throw new CustomException("DEATHPLACE POSTOFFICE PINCODE IS INVALID", "The postoffice pincode " +
                    basicInfo.getDeathPlaceHomePincode()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceHomeLocalityEn())) {
                    throw new CustomException("DEATHPLACE LOCALITY IS INVALID", "The locality name in english" +
                    basicInfo.getDeathPlaceHomeLocalityEn()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceHomeLocalityMl())  ){
                    throw new CustomException("DEATHPLACE LOCALITY IS INVALID", "The locality name in malayalam" +
                    basicInfo.getDeathPlaceHomeLocalityMl()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceHomeHoueNameEn())){
                    throw new CustomException("DEATHPLACE HOUSE NAME IS INVALID", "The House name in english " +
                    basicInfo.getDeathPlaceHomeHoueNameEn()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceHomeHoueNameMl())){
                    throw new CustomException("DEATHPLACE HOUSE NAME IS INVALID", "The House name in malayalam " +
                    basicInfo.getDeathPlaceHomeHoueNameMl()+ " is invalid");  
                } 
            }

            //DEATH PLACE VEHICLE
            if (basicInfo.getDeathPlace().equals(DeathConstants.DEATH_PLACE_VEHICLE)){
                if(StringUtils.isEmpty(basicInfo.getVehicleType())){
                    throw new CustomException("DEATHPLACE VEHICLE TYPE IS INVALID", "The vehicle type " +
                    basicInfo.getVehicleType()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getVehicleNumber())){
                    throw new CustomException("DEATHPLACE VEHICLE NUMBER IS INVALID", "The Vehicle number " +
                    basicInfo.getVehicleNumber()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getVehicleFirstHaltEn())){
                    throw new CustomException("DEATHPLACE VEHICLE FIRST HALT IS INVALID", "The vehicle first halt in english " +
                    basicInfo.getVehicleFirstHaltEn()+ " is invalid");  
                } 
                // if(StringUtils.isEmpty(basicInfo.getVehicleFirstHaltMl())) {
                //     throw new CustomException("DEATHPLACE VEHICLE FIRST HALT IS INVALID", "The vehicle first halt in malayalam " +
                //     basicInfo.getVehicleFirstHaltMl()+ " is invalid");  
                // } 
                if(StringUtils.isEmpty(basicInfo.getVehicleHospitalEn())  ){
                    throw new CustomException("DEATHPLACE ADMITTED HOSPITAL IS INVALID", "The name of admitted hospital " +
                    basicInfo.getVehicleHospitalEn()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceWardId())){
                    throw new CustomException("DEATHPLACE WARD IS INVALID", "The ward name " +
                    basicInfo.getDeathPlaceWardId()+ " is invalid");  
                } 

            } 
            
    //DEATH PLACE PUBLIC PLACES
            if (basicInfo.getDeathPlace().equals(DeathConstants.DEATH_PLACE_PUBLICPLACES)){
                if(StringUtils.isEmpty(basicInfo.getPublicPlaceType())){
                    throw new CustomException("DEATHPLACE TYPE IS INVALID", "The Publicplace type " +
                    basicInfo.getPublicPlaceType()+ " is invalid");  
                } 
 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceWardId())){
                    throw new CustomException("DEATHPLACE WARD IS INVALID", "The ward name " +
                    basicInfo.getDeathPlaceWardId()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceLocalityEn())){
                    throw new CustomException("DEATHPLACE LOCALITY IS INVALID", "The locality name in english " +
                    basicInfo.getDeathPlaceLocalityEn()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceLocalityMl())){
                    throw new CustomException("DEATHPLACE LOCALITY IS INVALID", "The locality name in malayalam " +
                    basicInfo.getDeathPlaceLocalityMl()+ " is invalid");  
                } 
               
            } 
//DEATH PLACE OUTSIDE JURISDICATION
            if (basicInfo.getDeathPlace().equals(DeathConstants.DEATH_PLACE_OUTSIDE_JURISDICATION)){
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceCountry())){
                    throw new CustomException("DEATHPLACE COUNTRY IS INVALID", "The country name " +
                    basicInfo.getDeathPlaceCountry()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceState())){
                    throw new CustomException("DEATHPLACE STATE IS INVALID", "The state name " +
                    basicInfo.getDeathPlaceState()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceCity())){
                    throw new CustomException("DEATHPLACE CITY IS INVALID", "The city name  " +
                    basicInfo.getDeathPlaceCity()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getPlaceOfBurialEn())){
                    throw new CustomException("PLACE OF BURIAL IS INVALID", "The name of burial place  in english" +
                    basicInfo.getPlaceOfBurialEn()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getPlaceOfBurialMl())){
                    throw new CustomException("PLACE OF BURIAL IS INVALID", "The  name of burial place  in malayalam " +
                    basicInfo.getPlaceOfBurialMl()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceWardId())){
                    throw new CustomException("BURIAL WARD IS INVALID", "The ward name  of burial  " + 
                    basicInfo.getDeathPlaceWardId()+ " is invalid");  
                }               
               
            } 
//Address Validation

if (deathAddressInfo.getPermtaddressCountry()
.equals(DeathConstants.COUNTRY_CODE)) {
if (StringUtils.isEmpty(
        deathAddressInfo.getPermtaddressStateName())) {
throw new CustomException(
                " PERMANENT ADDRESS: STATE INVALID ",
                "The State " +
                                deathAddressInfo.getPermtaddressStateName()
                                + " is invalid");
} else {
if (deathAddressInfo.getPermtaddressStateName()
                .equals(DeathConstants.STATE_CODE_SMALL)) {
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPermntInKeralaAdrDistrict())) {
                throw new CustomException(
                                " PERMANENT ADDRESS INSIDE KERALA: DISTRICT INVALID ",
                                "The   District " +
                                                deathAddressInfo.getPermntInKeralaAdrDistrict()
                                                + " is invalid");
        }
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPermntInKeralaAdrTaluk())) {
                throw new CustomException(
                                " PERMANENT ADDRESS INSIDE KERALA: TALUK INVALID ",
                                "The   Taluk " +
                                                deathAddressInfo.getPermntInKeralaAdrTaluk()
                                                + " is invalid");
        }

        if (StringUtils.isEmpty(deathAddressInfo
                        .getPermntInKeralaAdrVillage())) {
                throw new CustomException(
                                " PERMANENT ADDRESS INSIDE KERALA: VILLAGE INVALID ",
                                "The   Village " +
                                                deathAddressInfo.getPermntInKeralaAdrVillage()
                                                + " is invalid");
        }
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPermntInKeralaAdrLBName())) {
                throw new CustomException(
                                " PERMANENT ADDRESS INSIDE KERALA: LOCALBODY NAME INVALID ",
                                "The   Localbody Name "
                                                +
                                                deathAddressInfo.getPermntInKeralaAdrLBName()
                                                + " is invalid");
        }
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPermntInKeralaWardNo())) {
                throw new CustomException(
                                " PERMANENT ADDRESS INSIDE KERALA: WARD INVALID ",
                                "The   Ward " +
                                                deathAddressInfo.getPermntInKeralaWardNo()
                                                + " is invalid");
        }
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPermntInKeralaAdrPostOffice())) {
                throw new CustomException(
                                " PERMANENT ADDRESS INSIDE KERALA: POSTOFFICE INVALID ",
                                "The Postofficef " +
                                                deathAddressInfo.getPermntInKeralaAdrPostOffice()
                                                + " is invalid");
        }
        // if (StringUtils.isEmpty(deathAddressInfo
        //                 .getPermntInKeralaAdrPincode())) {

        //         throw new CustomException(
        //                         " PERMANENT ADDRESS INSIDE KERALA: PINCODE INVALID ",
        //                         "The Pincode " +
        //                                         deathAddressInfo.getPermntInKeralaAdrPincode()
        //                                         + " is invalid");
        // }
        // if (StringUtils.isEmpty(deathAddressInfo
        //                 .getPermntInKeralaAdrLocalityNameEn())) {
        //         throw new CustomException(
        //                         " PERMANENT ADDRESS INSIDE KERALA: LOCALITY NAME ENGLISH IS  INVALID ",
        //                         "The Locality English "
        //                                         +
        //                                         deathAddressInfo.getPermntInKeralaAdrLocalityNameEn()
        //                                         + " is invalid");
        // }
        // if (StringUtils.isEmpty(deathAddressInfo
        //                 .getPermntInKeralaAdrLocalityNameMl())) {
        //         throw new CustomException(
        //                         " PERMANENT ADDRESS INSIDE KERALA: LOCALITY NAME MALAYALAM IS INVALID ",
        //                         "The Locality Malayalam "
        //                                         +
        //                                         deathAddressInfo.getPermntInKeralaAdrLocalityNameMl()
        //                                         + " is invalid");
        // }
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPermntInKeralaAdrHouseNameEn())) {
                throw new CustomException(
                                " PERMANENT ADDRESS INSIDE KERALA: HOUSE NAME ENGLISH INVALID ",
                                "The House Name English "
                                                +
                                                deathAddressInfo.getPermntInKeralaAdrHouseNameEn()
                                                + " is invalid");
        }
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPermntInKeralaAdrHouseNameMl())) {
                throw new CustomException(
                                " PERMANENT ADDRESS INSIDE KERALA: HOUSE NAME MALAYALAM INVALID ",
                                "The House Name Malayalam "
                                                +
                                                deathAddressInfo.getPermntInKeralaAdrHouseNameMl()
                                                + " is invalid");
        }

}
/// *****************permanent outside kerala address *****************************************//
else {
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPermntOutsideKeralaDistrict())) {
                throw new CustomException(
                                " PERMANENT ADDRESS OUTSIDE KERALA: DISTRICT INVALID ",
                                "The   District " +
                                                deathAddressInfo.getPermntOutsideKeralaDistrict()
                                                + " is invalid");
        }
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPermntOutsideKeralaTaluk())) {
                throw new CustomException(
                                " PERMANENT ADDRESS OUTSIDE KERALA: TALUK INVALID ",
                                "The   Taluk " +
                                                deathAddressInfo.getPermntOutsideKeralaTaluk()
                                                + " is invalid");
        }
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPermntOutsideKeralaVillage())) {
                throw new CustomException(
                                " PERMANENT ADDRESS OUTSIDE KERALA: VILLAGE INVALID ",
                                "The   Village " +
                                                deathAddressInfo.getPermntOutsideKeralaVillage()
                                                + " is invalid");
        }
        
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPermntOutsideKeralaCityVilgeEn())) {
                throw new CustomException(
                                "  PERMANENT ADDRESS OUTSIDE KERALA: CITY INVALID ",
                                "The City/Town " +
                                                deathAddressInfo.getPermntOutsideKeralaCityVilgeEn()
                                                + " is invalid");
        }

        if (StringUtils.isEmpty(deathAddressInfo
                        .getPermntOutsideKeralaVillage())) {
                throw new CustomException(
                                "  PERMANENT ADDRESS OUTSIDE KERALA: VILLAGE INVALID ",
                                "The Village " +
                                                deathAddressInfo.getPermntOutsideKeralaVillage()
                                                + " is invalid");
        }
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPermntOutsideKeralaPincode())) {
                throw new CustomException(
                                " PERMANENT ADDRESS OUTSIDE KERALA: PINCODE INVALID ",
                                "The Pincode " +
                                                deathAddressInfo.getPermntOutsideKeralaPincode()
                                                + " is invalid");
        }
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPermntOutsideKeralaPostOfficeEn())) {
                throw new CustomException(
                                " PERMANENT ADDRESS OUTSIDE KERALA: POSTOFFICE INVALID ",
                                "The Postofficef " +
                                                deathAddressInfo.getPermntOutsideKeralaPostOfficeEn()
                                                + " is invalid");
        }
        // if (StringUtils.isEmpty(deathAddressInfo
        //                 .getPermntOutsideKeralaLocalityNameMl())) {
        //         throw new CustomException(
        //                         " PERMANENT ADDRESS OUTSIDE KERALA: LOCALITY NAME MALAYALAM IS INVALID ",
        //                         "The Locality Malayalam "
        //                                         +
        //                                         deathAddressInfo.getPermntOutsideKeralaLocalityNameMl()
        //                                         + " is invalid");
        // }
        // if (StringUtils.isEmpty(deathAddressInfo
        //                 .getPermntOutsideKeralaLocalityNameEn())) {
        //         throw new CustomException(
        //                         " PERMANENT ADDRESS OUTSIDE KERALA: LOCALITY NAME ENGLISH IS  INVALID ",
        //                         "The Locality English "
        //                                         +
        //                                         deathAddressInfo.getPermntOutsideKeralaLocalityNameEn()
        //                                         + " is invalid");
        // }
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPermntOutsideKeralaHouseNameEn())) {
                throw new CustomException(
                                " PERMANENT ADDRESS OUTSIDE KERALA: HOUSE NAME ENGLISH INVALID ",
                                "The House Name English "
                                                +
                                                deathAddressInfo.getPermntOutsideKeralaHouseNameEn()
                                                + " is invalid");
        }
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPermntOutsideKeralaHouseNameMl())) {
                throw new CustomException(
                                " PERMANENT ADDRESS OUTSIDE KERALA: HOUSE NAME MALAYALAM INVALID ",
                                "The House Name Malayalam "
                                                +
                                                deathAddressInfo.getPermntOutsideKeralaHouseNameMl()
                                                + " is invalid");
        }
}
}
} else {
if (StringUtils.isEmpty(deathAddressInfo.getPermntOutsideIndiaprovinceEn())) {
throw new CustomException(
                "  PERMANENT ADDRESS OUSIDE INDIA: PROVINCE ENGLISH INVALID ",
                "The   Province English " +
                                deathAddressInfo.getPermntOutsideIndiaprovinceEn()
                                + " is invalid");
}
if (StringUtils.isEmpty(deathAddressInfo
        .getPermntOutsideIndiaprovinceMl())) {
throw new CustomException(
                " PERMANENT ADDRESS OUSIDE INDIA: PROVINCE MALAYALAM INVALID ",
                "The   Province Malayalam " +
                                deathAddressInfo.getPermntOutsideIndiaprovinceMl()
                                + " is invalid");
}
if (StringUtils.isEmpty(deathAddressInfo
        .getPermntOutsideIndiaVillage())) {
throw new CustomException(
                " PERMANENT ADDRESS OUSIDE INDIA: VILLAGE INVALID ",
                "The   Village " +
                                deathAddressInfo.getPermntOutsideIndiaVillage()
                                + " is invalid");
}
if (StringUtils.isEmpty(deathAddressInfo
        .getPermntOutsideIndiaCityTown())) {
throw new CustomException(
                " PERMANENT ADDRESS OUSIDE INDIA: CITY INVALID ",
                "The   City " +
                                deathAddressInfo.getPermntOutsideIndiaCityTown()
                                + " is invalid");
}
if (StringUtils.isEmpty(deathAddressInfo
        .getPermanentOutsideIndiaPostCode())) {
throw new CustomException(
                " PERMANENT ADDRESS OUSIDE INDIA: POST CODE INVALID ",
                "The   Post Code " +
                                deathAddressInfo.getPermanentOutsideIndiaPostCode()
                                + " is invalid");
}
if (StringUtils.isEmpty(deathAddressInfo
        .getPermntOutsideIndiaLineoneEn())) {
throw new CustomException(
                " PERMANENT ADDRESS OUSIDE INDIA: ADDRESS LINE ONE ENGLISH INVALID ",
                "The   Adress Line One English " +
                                deathAddressInfo.getPermntOutsideIndiaLineoneEn()
                                + " is invalid");
}

if (StringUtils.isEmpty(deathAddressInfo
        .getPermntOutsideIndiaLineoneMl())) {
throw new CustomException(
                " PERMANENT ADDRESS OUSIDE INDIA: ADDRESS LINE ONE MALAYALAM INVALID ",
                "The   Adress Line One Malayalam " +
                                deathAddressInfo.getPermntOutsideIndiaLineoneMl()
                                + " is invalid");
}


}
//  permanent address end
//  present address start
if (deathAddressInfo.getPresentaddressCountry()
.equals(DeathConstants.COUNTRY_CODE)) {
if (StringUtils.isEmpty(deathAddressInfo
        .getPresentaddressStateName())) {
throw new CustomException(" PRESENT ADDRESS INSIDE INDIA: STATE INVALID ",
                "The   State " +
                                deathAddressInfo.getPresentaddressStateName()
                                + " is invalid");
} else {
if (deathAddressInfo.getPresentaddressStateName()
                .equals(DeathConstants.STATE_CODE_SMALL)) {
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPresentInsideKeralaDistrict())) {
                throw new CustomException(
                                " PRESENT ADDRESS INSIDE KERALA: DISTRICT INVALID ",
                                "The   district " +
                                                deathAddressInfo.getPresentInsideKeralaDistrict()
                                                + " is invalid");
        }
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPresentInsideKeralaTaluk())) {
                throw new CustomException(
                                " PRESENT ADDRESS INSIDE KERALA: TALUK INVALID ",
                                "The   Taluk " +
                                                deathAddressInfo.getPresentInsideKeralaTaluk()
                                                + " is invalid");
        }

        if (StringUtils.isEmpty(deathAddressInfo
                        .getPresentInsideKeralaVillage())) {
                throw new CustomException(
                                " PRESENT ADDRESS INSIDE KERALA: VILLAGE INVALID ",
                                "The   Village " +
                                                deathAddressInfo.getPresentInsideKeralaVillage()
                                                + " is invalid");
        }
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPresentInsideKeralaLBName())) {
                throw new CustomException(
                                " PRESENT ADDRESS INSIDE KERALA: LOCALBODY NAME INVALID ",
                                "The   Localbody Name "
                                                +
                                                deathAddressInfo.getPresentInsideKeralaLBName()
                                                + " is invalid");
        }
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPresentWardNo())) {
                throw new CustomException(
                                " PRESENT ADDRESS INSIDE KERALA: WARD INVALID ",
                                "The   Ward " +
                                                deathAddressInfo.getPresentWardNo()
                                                + " is invalid");
        }
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPresentInsideKeralaPostOffice())) {
                throw new CustomException(
                                " PRESENT ADDRESS INSIDE KERALA: POSTOFFICE INVALID ",
                                "The   Postofficef " +
                                                deathAddressInfo.getPresentInsideKeralaPostOffice()
                                                + " is invalid");
        }
        // if (StringUtils.isEmpty(deathAddressInfo
        //             .getPresentInsideKeralaPincode())) {     
               
        //             throw new CustomException(
        //                  " PRESENT ADDRESS INSIDE KERALA: PINCODE INVALID ",
        
        //                     "The Pincode " +
        //                         deathAddressInfo.getPresentInsideKeralaPincode()
        //                         + " is invalid");
        // }

        // if (StringUtils.isEmpty(deathAddressInfo
        //                 .getPresentInsideKeralaLocalityNameEn())) {
        //         throw new CustomException(
        //                         " PRESENT ADDRESS INSIDE KERALA: LOCALITY NAME ENGLISH IS  INVALID ",
        //                         "The   Locality English "
        //                                         +
        //                                         deathAddressInfo.getPresentInsideKeralaLocalityNameEn()
        //                                         + " is invalid");
        // }
        // if (StringUtils.isEmpty(deathAddressInfo
        //                 .getPresentInsideKeralaLocalityNameMl())) {
        //         throw new CustomException(
        //                         " PRESENT ADDRESS INSIDE KERALA: LOCALITY NAME MALAYALAM IS INVALID ",
        //                         "The   Locality Malayalam "
        //                                         +
        //                                         deathAddressInfo.getPresentInsideKeralaLocalityNameMl()
        //                                         + " is invalid");
        // }
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPresentInsideKeralaHouseNameEn())) {
                throw new CustomException(
                                " PRESENT ADDRESS INSIDE KERALA: HOUSE NAME ENGLISH INVALID ",
                                "The   House Name English "
                                                +
                                                deathAddressInfo.getPresentInsideKeralaHouseNameEn()
                                                + " is invalid");
        }
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPresentInsideKeralaHouseNameMl())) {
                throw new CustomException(
                                " PRESENT ADDRESS INSIDE KERALA: HOUSE NAME MALAYALAM INVALID ",
                                "The   House Name Malayalam "
                                                +
                                                deathAddressInfo.getPresentInsideKeralaHouseNameMl()
                                                + " is invalid");
        }
} else {
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPresentOutsideKeralaDistrict())) {
                throw new CustomException(
                                " PRESENT ADDRESS OUTSIDE KERALA: DISTRICT INVALID ",
                                "The   District " +
                                                deathAddressInfo.getPresentOutsideKeralaDistrict()
                                                + " is invalid");
        }
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPresentOutsideKeralaTalukName())) {
                throw new CustomException(
                                " PRESENT ADDRESS OUTSIDE KERALA: TALUK INVALID ",
                                "The   Taluk " +
                                                deathAddressInfo.getPresentOutsideKeralaTalukName()
                                                + " is invalid");
        }
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPresentOutsideKeralaVillageName())) {
                throw new CustomException(
                                " PRESENT ADDRESS OUTSIDE KERALA: VILLAGE INVALID ",
                                "The   Village " +
                                                deathAddressInfo.getPresentOutsideKeralaVillageName()
                                                + " is invalid");
        }

        if (StringUtils.isEmpty(deathAddressInfo
                        .getPresentOutsideKeralaCityVilgeEn())) {
                throw new CustomException(
                                "  PRESENT ADDRESS OUTSIDE KERALA: CITY INVALID ",
                                "The City/Town " +
                                                deathAddressInfo.getPresentOutsideKeralaCityVilgeEn()
                                                + " is invalid");
        }

        if (StringUtils.isEmpty(deathAddressInfo
                        .getPresentOutsideKeralaPincode())) {
                throw new CustomException(
                                " PRESENT ADDRESS OUTSIDE KERALA: PINCODE INVALID ",
                                "The Pincode " +
                                                deathAddressInfo.getPresentOutsideKeralaPincode()
                                                + " is invalid");
        }
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPresentOutsideKeralaPostOfficeEn())) {
                throw new CustomException(
                                " PRESENT ADDRESS OUTSIDE KERALA: POSTOFFICE INVALID ",
                                "The Postofficef " +
                                                deathAddressInfo.getPresentOutsideKeralaPostOfficeEn()
                                                + " is invalid");
        }
        // if (StringUtils.isEmpty(deathAddressInfo
        //                 .getPresentOutsideKeralaLocalityNameMl())) {
        //         throw new CustomException(
        //                         " PRESENT ADDRESS OUTSIDE KERALA: LOCALITY NAME MALAYALAM IS INVALID ",
        //                         "The Locality Malayalam "
        //                                         +
        //                                         deathAddressInfo.getPresentOutsideKeralaLocalityNameMl()
        //                                         + " is invalid");
        // }
        // if (StringUtils.isEmpty(deathAddressInfo
        //                 .getPresentOutsideKeralaLocalityNameEn())) {
        //         throw new CustomException(
        //                         " PRESENT ADDRESS OUTSIDE KERALA: LOCALITY NAME ENGLISH IS  INVALID ",
        //                         "The Locality English "
        //                                         +
        //                                         deathAddressInfo.getPresentOutsideKeralaLocalityNameEn()
        //                                         + " is invalid");
        // }
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPresentOutsideKeralaHouseNameEn())) {
                throw new CustomException(
                                " PRESENT ADDRESS OUTSIDE KERALA: HOUSE NAME ENGLISH INVALID ",
                                "The House Name English "
                                                +
                                                deathAddressInfo.getPresentOutsideKeralaHouseNameEn()
                                                + " is invalid");
        }
        if (StringUtils.isEmpty(deathAddressInfo
                        .getPresentOutsideKeralaHouseNameMl())) {
                throw new CustomException(
                                " PRESENT ADDRESS OUTSIDE KERALA: HOUSE NAME MALAYALAM INVALID ",
                                "The House Name Malayalam "
                                                +
                                                deathAddressInfo.getPresentOutsideKeralaHouseNameMl()
                                                + " is invalid");
        }
}
}
} else {
if (StringUtils.isEmpty(deathAddressInfo
        .getPresentOutSideIndiaProvinceEn())) {
throw new CustomException(
                "  PRESENT ADDRESS OUTSIDE INDIA: PROVINCE ENGLISH INVALID ",
                "The   Province English " +
                                deathAddressInfo.getPresentOutSideIndiaProvinceEn()
                                + " is invalid");
}
if (StringUtils.isEmpty(deathAddressInfo
        .getPresentOutSideIndiaProvinceMl())) {
throw new CustomException(
                "  PRESENT ADDRESS OUTSIDE INDIA: PROVINCE MALAYALAM INVALID ",
                "The   Province Malayalam " +
                                deathAddressInfo.getPresentOutSideIndiaProvinceMl()
                                + " is invalid");
}
if (StringUtils.isEmpty(deathAddressInfo
        .getPresentOutSideIndiaadrsVillage())) {
throw new CustomException(
                "  PRESENT ADDRESS OUTSIDE INDIA: VILLAGE INVALID ",
                "The   Village " +
                                deathAddressInfo.getPresentOutSideIndiaadrsVillage()
                                + " is invalid");
}
if (StringUtils.isEmpty(deathAddressInfo
        .getPresentOutSideIndiaadrsCityTown())) {
throw new CustomException(
                "  PRESENT ADDRESS OUTSIDE INDIA: CITY INVALID ",
                "The City/Town " +
                                deathAddressInfo.getPresentOutSideIndiaadrsCityTown()
                                + " is invalid");
}
// if(StringUtils.isEmpty(deathAddressInfo.getPresentOutSideIndiaPostCode()))
// {
// throw new CustomException("  PRESENT ADDRESS OUTSIDE
// INDIA: POST CODE INVALID",
// "The Post Code" +
// deathAddressInfo.getPresentOutSideIndiaPostCode() + " is
// invalid");
// }
if (StringUtils.isEmpty(deathAddressInfo
        .getPresentOutSideIndiaAdressEn())) {
throw new CustomException(
                "  PRESENT ADDRESS OUTSIDE INDIA: ADDRESS LINE ONE ENGLISH INVALID ",
                "The   Adress Line One English " +
                                deathAddressInfo.getPresentOutSideIndiaAdressEn()
                                + " is invalid");
}
if (StringUtils.isEmpty(deathAddressInfo
        .getPresentOutSideIndiaAdressMl())) {
throw new CustomException(
                "  PRESENT ADDRESS OUTSIDE INDIA: ADDRESS LINE ONE MALAYALAM INVALID ",
                "The   Adress Line One Malayalam " +
                                deathAddressInfo.getPresentOutSideIndiaAdressMl()
                                + " is invalid");
}

}
//  present address end
        });
    }
}

//Validation for Correction 22.03.2023
public void validateCorrectionCommonFields(DeathCorrectionRequest request) {
      
    List<DeathCorrectionDtls> deathApplication = request.getDeathCorrection();
    if (deathApplication!=null){
     deathApplication
    .forEach(deathdtls -> {
        // DeathBasicInfo  basicInfo = deathdtls.getDeathBasicInfo();
        // DeathStatisticalInfo  statisticalInfo = deathdtls.getDeathStatisticalInfo();
        // DeathFamilyInfo  familyInfo = deathdtls.getDeathFamilyInfo();
        // DeathInformantDtls  informantDtls = deathdtls.getDeathInformantDtls();
        // DeathInitiatorDtls  initiatorDtls = deathdtls.getDeathInitiatorDtls();
        DeathCorrectionBasicInfo basicInfo = deathdtls.getDeathCorrectionBasicInfo();
        DeathAddressInfo addressinfo = deathdtls.getDeathCorrAddressInfo();

//Common validation for all cases
            if((basicInfo.getDateOfDeath()<=0) ) { 
                    throw new CustomException("DEATH DATE INVALID", "The date can't be null");
            }

            if(StringUtils.isEmpty(basicInfo.getDeceasedGender()) ){
                throw new CustomException("DECEASED GENDER INVALID", "The deceased  gender" +
                basicInfo.getDeceasedGender()+ " is invalid");
                }

            // if(basicInfo.getAge()<=0){
            //     throw new CustomException("DECEASED AGE INVALID", "The deceased  age" +
            //     basicInfo.getAge()+ " is invalid");
            // }
            //  if(StringUtils.isEmpty(basicInfo.getAgeUnit()) ){
            //     throw new CustomException("DECEASED AGEUNIT INVALID", "The deceased  age unit" +
            //     basicInfo.getAgeUnit()+ " is invalid");
            // }
            if(basicInfo.getDeceasedAadharNotAvailable().equals(DeathConstants.VALUE_FALSE)){

                if(StringUtils.isEmpty(basicInfo.getDeceasedAadharNumber()) ){
                        throw new CustomException("DECEASED AADHAR INVALID", "The deceased  Aadhar number" +
                        basicInfo.getDeceasedAadharNumber()+ " is invalid");
                }
            
           
            }
            if(StringUtils.isEmpty(basicInfo.getDeceasedFirstNameEn()) ){
                throw new CustomException("DECEASED NAME INVALID", "The deceased name in english" +
                basicInfo.getDeceasedFirstNameEn()+ " is invalid");
            }
            if(StringUtils.isEmpty(basicInfo.getDeceasedFirstNameMl()) ){
                throw new CustomException("DECEASED AGEUNIT INVALID", "The deceased name in malayalam" +
                basicInfo.getDeceasedFirstNameMl()+ " is invalid");
            }
            // if(StringUtils.isEmpty(basicInfo.getNationality()) ){
            //     throw new CustomException("DECEASED NATIONALITY INVALID", "The deceased nationality" +
            //     basicInfo.getNationality()+ " is invalid");
            // }
            // if(StringUtils.isEmpty(basicInfo.getReligion()) ){
            //     throw new CustomException("DECEASED RELIGION INVALID", "The deceased  religion " +
            //     basicInfo.getReligion()+ " is invalid");
            // }
            // if(StringUtils.isEmpty(basicInfo.getOccupation()) ){
            //     throw new CustomException("DECEASED PROFESSION INVALID", "The  deceased profession " +
            //     basicInfo.getOccupation()+ " is invalid");
            // }
            // if(familyInfo.getFamilyMobileNo()<=0){
            //     throw new CustomException("CONTACT NUMBER INVALID", "The  family mobile number " +
            //     familyInfo.getFamilyMobileNo()+ " is invalid");
            // }
//DEATH PLACE HOSPITAL
            if (basicInfo.getDeathPlace()==DeathConstants.DEATH_PLACE_HOSPITAL){
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceType())){
                    throw new CustomException("HOSPITAL NAME IS INVALID", "The Hospital name " +
                    basicInfo.getDeathPlace()+ " is invalid");  
                } 
                //INFORMANT DETAILS
                // if(StringUtils.isEmpty(informantDtls.getInformantAadharNo())){
                //     throw new CustomException("INFORMANT AADHAR IS INVALID", "The Aadhar of informant " +
                //     informantDtls.getInformantAadharNo()+ " is invalid");  
                // } 
                // if(StringUtils.isEmpty(informantDtls.getInformantNameEn())){
                //     throw new CustomException("INFORMANT NAME IS INVALID", "The name of informant " +
                //     informantDtls.getInformantNameEn()+ " is invalid");  
                // } 
                // if(StringUtils.isEmpty(informantDtls.getDeathSignedOfficerDesignation())){
                //     throw new CustomException("INFORMANT DESIGNATION IS INVALID", "The designation of informant " +
                //     informantDtls.getDeathSignedOfficerDesignation()+ " is invalid");  
                // }
                // if(informantDtls.getInformantMobileNo()<=0){
                //     throw new CustomException("MOBILE NUMBER OF INFORMANT IS INVALID", "The mobile number of informant " +
                //     informantDtls.getInformantMobileNo()+ " is invalid");  
               // }
            }
//DEATH PLACE INSTITUTION
            if (basicInfo.getDeathPlace()==DeathConstants.DEATH_PLACE_INSTITUTION){
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceType())){
                    throw new CustomException("INSTITUTION NAME IS INVALID", "The Hospital name " +
                    basicInfo.getDeathPlace()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceInstId())){
                    throw new CustomException("INSTITUTION TYPE IS INVALID", "The Hospital name " +
                    basicInfo.getDeathPlaceInstId()+ " is invalid");  
                } 
                // //INFORMANT DETAILS
                // if(StringUtils.isEmpty(informantDtls.getInformantAadharNo())){
                //     throw new CustomException("INFORMANT AADHAR IS INVALID", "The Aadhar of informant " +
                //     informantDtls.getInformantAadharNo()+ " is invalid");  
                // } 
                // if(StringUtils.isEmpty(informantDtls.getInformantNameEn())){
                //     throw new CustomException("INFORMANT NAME IS INVALID", "The name of informant " +
                //     informantDtls.getInformantNameEn()+ " is invalid");  
                // } 
                // if(StringUtils.isEmpty(informantDtls.getDeathSignedOfficerDesignation())){
                //     throw new CustomException("INFORMANT DESIGNATION IS INVALID", "The designation of informant " +
                //     informantDtls.getDeathSignedOfficerDesignation()+ " is invalid");  
                // }
                // if(informantDtls.getInformantMobileNo()<=0){
                //     throw new CustomException("MOBILE NUMBER OF INFORMANT IS INVALID", "The mobile number of informant " +
                //     informantDtls.getInformantMobileNo()+ " is invalid");  
                // }

            }
//DEATH PLACE HOME
            if (basicInfo.getDeathPlace()==DeathConstants.DEATH_PLACE_HOME){
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceHomeWardId())){
                    throw new CustomException("DEATHPLACE WARD IS INVALID", "The ward name " +
                    basicInfo.getDeathPlaceHomeWardId()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceHomePostofficeId())){
                    throw new CustomException("DEATHPLACE POSTOFFICE IS INVALID", "The postoffice name " +
                    basicInfo.getDeathPlaceHomePostofficeId()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceHomePincode())){
                    throw new CustomException("DEATHPLACE POSTOFFICE IS INVALID", "The postoffice name " +
                    basicInfo.getDeathPlaceHomePincode()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceHomeLocalityEn())) {
                    throw new CustomException("DEATHPLACE LOCALITY IS INVALID", "The locality name in english" +
                    basicInfo.getDeathPlaceHomeLocalityEn()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceHomeLocalityMl())  ){
                    throw new CustomException("DEATHPLACE LOCALITY IS INVALID", "The locality name in malayalam" +
                    basicInfo.getDeathPlaceHomeLocalityMl()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceHomeHouseNameEn())){
                    throw new CustomException("DEATHPLACE HOUSE NAME IS INVALID", "The House name in english " +
                    basicInfo.getDeathPlaceHomeHouseNameEn()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceHomeHouseNameMl())){
                    throw new CustomException("DEATHPLACE HOUSE NAME IS INVALID", "The House name in malayalam " +
                    basicInfo.getDeathPlaceHomeHouseNameMl()+ " is invalid");  
                } 
                // //INFORMANT DETAILS
                // if(StringUtils.isEmpty(informantDtls.getInformantAadharNo())){
                //     throw new CustomException("INFORMANT AADHAR IS INVALID", "The Aadhar of informant " +
                //     informantDtls.getInformantAadharNo()+ " is invalid");  
                // } 
                // if(StringUtils.isEmpty(informantDtls.getInformantNameEn())){
                //     throw new CustomException("INFORMANT NAME IS INVALID", "The name of informant " +
                //     informantDtls.getInformantNameEn()+ " is invalid");  
                // } 
                // if(StringUtils.isEmpty(informantDtls.getInformantMobileNo())){
                //     throw new CustomException("MOBILE NUMBER OF INFORMANT IS INVALID", "The mobile number of informant " +
                //     informantDtls.getInformantMobileNo()+ " is invalid");  
                // }

            }

//DEATH PLACE VEHICLE
            if (basicInfo.getDeathPlace()==DeathConstants.DEATH_PLACE_VEHICLE){
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceType())){
                    throw new CustomException("DEATHPLACE VEHICLE TYPE IS INVALID", "The vehicle type " +
                    basicInfo.getDeathPlaceType()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getVehicleNumber())){
                    throw new CustomException("DEATHPLACE VEHICLE NUMBER IS INVALID", "The Vehicle number " +
                    basicInfo.getVehicleNumber()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getVehicleFirstHaltEn())){
                    throw new CustomException("DEATHPLACE VEHICLE FIRST HALT IS INVALID", "The vehicle first halt in english " +
                    basicInfo.getVehicleFirstHaltEn()+ " is invalid");  
                } 
                // if(StringUtils.isEmpty(basicInfo.getVehicleFirstHaltMl())) {
                //     throw new CustomException("DEATHPLACE VEHICLE FIRST HALT IS INVALID", "The vehicle first halt in malayalam " +
                //     basicInfo.getVehicleFirstHaltMl()+ " is invalid");  
                // } 
                if(StringUtils.isEmpty(basicInfo.getVehicleHospitalEn())  ){
                    throw new CustomException("DEATHPLACE ADMITTED HOSPITAL IS INVALID", "The name of admitted hospital " +
                    basicInfo.getVehicleHospitalEn()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceWardId())){
                    throw new CustomException("DEATHPLACE WARD IS INVALID", "The ward name " +
                    basicInfo.getDeathPlaceWardId()+ " is invalid");  
                } 

            } 
            
//DEATH PLACE PUBLIC PLACES
            if (basicInfo.getDeathPlace()==DeathConstants.DEATH_PLACE_PUBLICPLACES){
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceType())){
                    throw new CustomException("DEATHPLACE TYPE IS INVALID", "The Publicplace type " +
                    basicInfo.getDeathPlaceType()+ " is invalid");  
                } 
 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceWardId())){
                    throw new CustomException("DEATHPLACE WARD IS INVALID", "The ward name " +
                    basicInfo.getDeathPlaceWardId()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceLocalityEn())){
                    throw new CustomException("DEATHPLACE LOCALITY IS INVALID", "The locality name in english " +
                    basicInfo.getDeathPlaceLocalityEn()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceLocalityMl())){
                    throw new CustomException("DEATHPLACE LOCALITY IS INVALID", "The locality name in malayalam " +
                    basicInfo.getDeathPlaceLocalityMl()+ " is invalid");  
                } 
               
            } 
//DEATH PLACE OUTSIDE JURISDICATION
            if (basicInfo.getDeathPlace()==DeathConstants.DEATH_PLACE_OUTSIDE_JURISDICATION){
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceCountry())){
                    throw new CustomException("DEATHPLACE COUNTRY IS INVALID", "The country name " +
                    basicInfo.getDeathPlaceCountry()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceState())){
                    throw new CustomException("DEATHPLACE STATE IS INVALID", "The state name " +
                    basicInfo.getDeathPlaceState()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceCity())){
                    throw new CustomException("DEATHPLACE CITY IS INVALID", "The city name  " +
                    basicInfo.getDeathPlaceCity()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getPlaceOfBurialEn())){
                    throw new CustomException("PLACE OF BURIAL IS INVALID", "The name of burial place  in english" +
                    basicInfo.getPlaceOfBurialEn()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getPlaceOfBurialMl())){
                    throw new CustomException("PLACE OF BURIAL IS INVALID", "The  name of burial place  in malayalam " +
                    basicInfo.getPlaceOfBurialMl()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceWardId())){
                    throw new CustomException("BURIAL WARD IS INVALID", "The ward name  of burial  " + 
                    basicInfo.getDeathPlaceWardId()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getGeneralRemarks())){
                    throw new CustomException("DESCRIPTION IS INVALID", "The discription  " + 
                    basicInfo.getGeneralRemarks()+ " is invalid");  
                } 
               
            } 
        });
    }
}


//             if(deathdtls.getMaleDependentUnavailable().equals(CrDeathConstants.VALUE_FALSE)){

//                 if(StringUtils.isEmpty(deathdtls.getMaleDependentNameEn()) || StringUtils.isEmpty(deathdtls.getMaleDependentNameMl()) ){
//                     throw new CustomException("FATHER/HUSBAND NAME INVALID", "The father/husband name " +
//                     deathdtls.getMaleDependentNameEn()+" or "+deathdtls.getMaleDependentNameMl()+ " is invalid");  
//                 } 
                
//                 if(StringUtils.isEmpty(deathdtls.getMaleDependentType()) ){
//                     throw new CustomException("FATHER/HUSBAND TYPE INVALID", "The father/husband type " +
//                     deathdtls.getMaleDependentNameEn()+" or "+deathdtls.getMaleDependentNameMl()+ " is invalid");  
//                 } 
//             } 
//             if(deathdtls.getFemaleDependentUnavailable().equals(CrDeathConstants.VALUE_FALSE)){

//                     if(StringUtils.isEmpty(deathdtls.getFemaleDependentNameEn()) || StringUtils.isEmpty(deathdtls.getFemaleDependentNameMl()) ){
//                         throw new CustomException("MOTHER NAME INVALID", "The mother name " +
//                         deathdtls.getFemaleDependentNameEn()+" or "+deathdtls.getFemaleDependentNameMl()+ " is invalid");  
//                     } 
//             } 
//             //DEATH_PLACE_HOME
//             if (deathdtls.getDeathPlace()==CrDeathConstants.DEATH_PLACE_HOME){
                
//                 if(StringUtils.isEmpty(addressInfo.getDeathplaceAddress().getHoueNameEn()) || StringUtils.isEmpty(addressInfo.getDeathplaceAddress().getHoueNameMl())){
//                     throw new CustomException("HOUSE NAME IS INVALID", "The House name " +
//                     addressInfo.getDeathplaceAddress().getHoueNameEn()+" or "+addressInfo.getDeathplaceAddress().getHoueNameMl()+ " is invalid");  
//                 } 
//                 // if(StringUtils.isEmpty(addressInfo.getDeathplaceAddress().getCityEn()) || StringUtils.isEmpty(addressInfo.getDeathplaceAddress().getCityMl())){
//                 //     throw new CustomException("CITY  IS INVALID", "The city name " +
//                 //     addressInfo.getDeathplaceAddress().getCityEn()+" or "+addressInfo.getDeathplaceAddress().getCityMl()+ " is invalid");  
//                 // } 
//                 if(StringUtils.isEmpty(addressInfo.getDeathplaceAddress().getWardId()) ){
//                     throw new CustomException("WARD NAME INVALID", "The ward name " +
//                     addressInfo.getDeathplaceAddress().getWardId() +" is invalid");  
//                 } 
//                 if(StringUtils.isEmpty(addressInfo.getDeathplaceAddress().getPostofficeId())){
//                     throw new CustomException("POSTOFFICE INVALID", "The postoffice name " +
//                     addressInfo.getDeathplaceAddress().getPostofficeId() +" is invalid");  
//                 } 
//                 if(StringUtils.isEmpty(addressInfo.getDeathplaceAddress().getDistrictId())){
//                     throw new CustomException("DISTRICT NAME INVALID", "The District name " +
//                     addressInfo.getDeathplaceAddress().getDistrictId() +" is invalid");  
//                 } 
//             }
//             //DEATH_PLACE_HOSPITAL
//             if (deathdtls.getDeathPlace()==CrDeathConstants.DEATH_PLACE_HOSPITAL){
            
//                 if(StringUtils.isEmpty(deathdtls.getDeathPlaceType()) ){
//                     throw new CustomException("HOSPITAL NAME INVALID", "The Hospital name " +deathdtls.getDeathPlaceType()
//                     + " is invalid");  
//                 } 
//                 if(StringUtils.isEmpty(deathdtls.getDeathPlaceOfficerName())){
//                     throw new CustomException("SIGNED OFFICER NAME INVALID", "The name of Signed authority   " +deathdtls.getDeathPlaceOfficerName()
//                     + " is invalid");  
//                 } 
//                 if(StringUtils.isEmpty(deathdtls.getDeathSignedOfficerDesignation())){
//                     throw new CustomException("SIGNED OFFICER DESIGNATION  INVALID", "The designation of Signed authority  " +deathdtls.getDeathPlaceOfficerName()
//                     + " is invalid");  
//                 } 
//             }
//             //DEATH_PLACE_INSTITUTION
//             if (deathdtls.getDeathPlace()==CrDeathConstants.DEATH_PLACE_INSTITUTION){
            
//                 if(StringUtils.isEmpty(deathdtls.getDeathPlaceType())){
//                     throw new CustomException("INSTITUTION TYPE  INVALID", "The institution type " +deathdtls.getDeathPlaceType()
//                     + " is invalid");  
//                 } 
//                 if(StringUtils.isEmpty(deathdtls.getDeathPlaceInstId())){
//                     throw new CustomException("INSTITUTION  NAME INVALID", "The institution name  " +deathdtls.getDeathPlaceInstId()
//                     + " is invalid");  
//                 } 
//                 if(StringUtils.isEmpty(deathdtls.getDeathPlaceOfficerName())){
//                     throw new CustomException("SIGNED OFFICER NAME INVALID", "The name of Signed authority " +deathdtls.getDeathPlaceOfficerName()
//                     + " is invalid");  
//                 } 
//                 if(StringUtils.isEmpty(deathdtls.getDeathSignedOfficerDesignation())){
//                     throw new CustomException("SIGNED OFFICER DESIGNATION INVALID", "The designation of Signed authority  " +deathdtls.getDeathPlaceOfficerName()
//                     + " is invalid");  
//                 } 

//             }
//             //DEATH_PLACE_VEHICLE
//             if (deathdtls.getDeathPlace()==CrDeathConstants.DEATH_PLACE_VEHICLE){

//                 //Vehicle type
//                 if(StringUtils.isEmpty(deathdtls.getDeathPlaceType())){
//                     throw new CustomException("VEHICLE TYPE INVALID", "The Vehicle type " +deathdtls.getDeathPlaceType()
//                     + " is invalid");  
//                 } 
//                 if(StringUtils.isEmpty(deathdtls.getVehicleNumber())){
//                     throw new CustomException("VEHICLE  NUMBER INVALID", "The Vehicle number " +deathdtls.getVehicleNumber()
//                     + " is invalid");  
//                 }  
//                 if(StringUtils.isEmpty(deathdtls.getVehicleFirstHalt())){
//                     throw new CustomException("VEHICLE  FIRST HALT INVALID", "The Vehicle first halt " +deathdtls.getVehicleNumber()
//                     + " is invalid");  
//                 }
//                 if(StringUtils.isEmpty(deathdtls.getVehicleFromplaceMl())|| StringUtils.isEmpty(deathdtls.getVehicleFromplaceEn())){
//                     throw new CustomException("VEHICLE FROM PLACE INVALID", "The Vehicle from  place " +deathdtls.getVehicleFromplaceMl()
//                 + " or " + deathdtls.getVehicleFromplaceEn()+  " is invalid");  
//                 }
//                 if(StringUtils.isEmpty(deathdtls.getVehicleToPlaceEn())|| StringUtils.isEmpty(deathdtls.getVehicleToPlaceMl())){
//                     throw new CustomException("VEHICLE TO PLACE INVALID", "The Vehicle to place " +deathdtls.getVehicleToPlaceEn()
//                 + " or " + deathdtls.getVehicleToPlaceMl()+  " is invalid");  
//                 }
//                 if(StringUtils.isEmpty(deathdtls.getInformantNameEn())|| StringUtils.isEmpty(deathdtls.getInformantNameMl())){
//                     throw new CustomException("INFORMANT :NAME INVALID", "The informant name " +deathdtls.getVehicleNumber()
//                     + " is invalid");  
//                 } 
//                 if(StringUtils.isEmpty(addressInfo.getInformantAddress().getHoueNameEn())||StringUtils.isEmpty( addressInfo.getInformantAddress().getHoueNameMl())){
//                     throw new CustomException("INFORMANT :HOUSE NAME INVALID", "The House name  of informant " +
//                     addressInfo.getInformantAddress().getHoueNameEn()+" or "+addressInfo.getInformantAddress().getHoueNameMl()+ " is invalid");  
//                 } 
//                 // if(StringUtils.isEmpty(addressInfo.getInformantAddress().getCityEn())|| StringUtils.isEmpty(addressInfo.getInformantAddress().getCityMl())){
//                 //     throw new CustomException("INFORMANT: CITY IS INVALID", "The city name " +
//                 //     addressInfo.getInformantAddress().getCityEn()+" or "+addressInfo.getInformantAddress().getCityMl()+ " is invalid");  
//                 // } 
//                 if(StringUtils.isEmpty(addressInfo.getInformantAddress().getWardId())){
//                     throw new CustomException("INFORMANT: WARD INVALID", "The ward name  " +
//                     addressInfo.getInformantAddress().getWardId() +" is invalid");  
//                 } 
//                 if(StringUtils.isEmpty(addressInfo.getInformantAddress().getPostofficeId())){
//                     throw new CustomException("INFORMANT: POSTOFFICE INVALID", "The postoffice  " +
//                     addressInfo.getInformantAddress().getPostofficeId() +" is invalid");  
//                 } 
//                 if(StringUtils.isEmpty(addressInfo.getInformantAddress().getDistrictId())){
//                     throw new CustomException("INFORMANT :DISTRICT INVALID", "The District name " +
//                     addressInfo.getInformantAddress().getDistrictId() +" is invalid");  
//                 } 
//             }
//             //ADDRESS TYPE:PRESENT ADDRESS
//             if ((deathdtls.getAddressInfo().getPresentAddress().getLocationType()==CrDeathConstants.ADDRESS_INSIDE_LB) || 
//                 (deathdtls.getAddressInfo().getPresentAddress().getLocationType()==CrDeathConstants.ADDRESS_INSIDE_KERALA)||
//                 (deathdtls.getAddressInfo().getPresentAddress().getLocationType()==CrDeathConstants.ADDRESS_INSIDE_INDIA)  
//                     ){
            
//                 if(StringUtils.isEmpty(addressInfo.getPresentAddress().getHoueNameEn())|| StringUtils.isEmpty(addressInfo.getPresentAddress().getHoueNameMl())){
//                     throw new CustomException("PRESENT ADDRESS:HOUSE NAME IS INVALID", "The House name " +
//                     addressInfo.getPresentAddress().getHoueNameEn()+" or "+addressInfo.getPresentAddress().getHoueNameMl()+ " is invalid");  
//                 } 
//                 // if(StringUtils.isEmpty(addressInfo.getPresentAddress().getCityEn()) || StringUtils.isEmpty(addressInfo.getPresentAddress().getCityMl())){
//                 //     throw new CustomException("PRESENT ADDRESS:CITY  IS INVALID", "The city name " +
//                 //     addressInfo.getPresentAddress().getCityEn()+" or "+addressInfo.getPresentAddress().getCityMl()+ " is invalid");  
//                 // } 

//                 if(StringUtils.isEmpty(addressInfo.getPresentAddress().getPostofficeId())){
//                     throw new CustomException("PRESENT ADDRESS:POSTOFFICE IS INVALID", "The postoffice name " +
//                     addressInfo.getPresentAddress().getPostofficeId() +" is invalid");  
//                 } 
//                 if ((deathdtls.getAddressInfo().getPresentAddress().getLocationType()==CrDeathConstants.ADDRESS_INSIDE_LB) ){
//                     if(StringUtils.isEmpty(addressInfo.getPresentAddress().getWardId())){
//                         throw new CustomException("PRESENT ADDRESS:WARD  IS INVALID", "The ward name " +
//                         addressInfo.getPresentAddress().getWardId() +" is invalid");  
//                     } 
//                 }
//                 if ((deathdtls.getAddressInfo().getPresentAddress().getLocationType()==CrDeathConstants.ADDRESS_INSIDE_KERALA) ){
//                     if(StringUtils.isEmpty(addressInfo.getPresentAddress().getDistrictId())){
//                         throw new CustomException("PRESENT ADDRESS:DISTRICT  IS INVALID", "The District name " +
//                         addressInfo.getPresentAddress().getDistrictId() +" is invalid");  
//                     } 
//                 }
//                 if ((deathdtls.getAddressInfo().getPresentAddress().getLocationType()==CrDeathConstants.ADDRESS_INSIDE_INDIA)){
//                     if(StringUtils.isEmpty(addressInfo.getPresentAddress().getDistrictId())){
//                         throw new CustomException("PRESENT ADDRESS:DISTRICT  IS INVALID", "The District name " +
//                         addressInfo.getPresentAddress().getDistrictId() +" is invalid");  
//                     } 
//                     if(StringUtils.isEmpty(addressInfo.getPresentAddress().getStateId())){
//                         throw new CustomException("PRESENT ADDRESS:STATE  IS INVALID", "The state name " +
//                         addressInfo.getPresentAddress().getDistrictId() +" is invalid");  
//                     } 
//                     if(StringUtils.isEmpty(addressInfo.getPresentAddress().getPostofficeNameEn())|| StringUtils.isEmpty(addressInfo.getPresentAddress().getPostofficeNameMl()) ){
//                         throw new CustomException("PRESENT ADDRESS:POSTOFFICE NAME  IS INVALID", "The post office name " +
//                         addressInfo.getPresentAddress().getPostofficeNameEn() + " or " + addressInfo.getPresentAddress().getPostofficeNameMl()+" is invalid");  
//                     } 
//                 }
//                 if ((deathdtls.getAddressInfo().getPresentAddress().getLocationType()==CrDeathConstants.ADDRESS_OUTSIDE_INDIA)){
//                     if(StringUtils.isEmpty(addressInfo.getPresentAddress().getCountryId())){
//                         throw new CustomException("PRESENT ADDRESS:COUNTRY  IS INVALID", "The name of country name " +
//                         addressInfo.getPresentAddress().getCountryId() +" is invalid");  
//                     }   
//                     if(StringUtils.isEmpty(addressInfo.getPresentAddress().getHoueNameEn())|| StringUtils.isEmpty(addressInfo.getPresentAddress().getHoueNameMl())){
//                         throw new CustomException("PRESENT ADDRESS:HOUSENAME  IS INVALID", "The house name " +
//                         addressInfo.getPresentAddress().getHoueNameEn() +" or "+addressInfo.getPresentAddress().getHoueNameMl() +"is invalid");  
//                     } 
//                     if(StringUtils.isEmpty(addressInfo.getPresentAddress().getStreetNameEn())|| StringUtils.isEmpty(addressInfo.getPresentAddress().getStreetNameEn())){
//                         throw new CustomException("PRESENT ADDRESS:STREET NAME IS INVALID", "The name of street " +
//                         addressInfo.getPresentAddress().getStreetNameEn() +"  or "+  addressInfo.getPresentAddress().getStreetNameEn() +  "is invalid");  
//                     } 
//                 }
//             }
// //        //ADDRESS TYPE:PERMANENT ADDRESS
//             if ((deathdtls.getAddressInfo().getPermanentAddress().getLocationType()==CrDeathConstants.ADDRESS_INSIDE_LB) || 
//             (deathdtls.getAddressInfo().getPermanentAddress().getLocationType()==CrDeathConstants.ADDRESS_INSIDE_KERALA)||
//             (deathdtls.getAddressInfo().getPermanentAddress().getLocationType()==CrDeathConstants.ADDRESS_INSIDE_INDIA) ){

//                 if(StringUtils.isEmpty(addressInfo.getPermanentAddress().getHoueNameEn()) || StringUtils.isEmpty(addressInfo.getPermanentAddress().getHoueNameMl())){
//                     throw new CustomException("PERMANENT ADDRESS:HOUSE NAME IS INVALID", "The House name " +
//                     addressInfo.getPermanentAddress().getHoueNameEn()+" or "+addressInfo.getPermanentAddress().getHoueNameMl()+ " is invalid");  
//                 } 
//                 // if(StringUtils.isEmpty(addressInfo.getPermanentAddress().getCityEn()) || StringUtils.isEmpty(addressInfo.getPermanentAddress().getCityMl())){
//                 //     throw new CustomException("PERMANENT ADDRESS:CITY  IS INVALID", "The city name " +
//                 //     addressInfo.getPermanentAddress().getCityEn()+" or "+addressInfo.getPermanentAddress().getCityMl()+ " is invalid");  
//                 // } 

//                 if(StringUtils.isEmpty(addressInfo.getPermanentAddress().getPostofficeId()) ){
//                     throw new CustomException("PERMANENT ADDRESS:POSTOFFICE IS INVALID", "The postoffice name " +
//                     addressInfo.getPermanentAddress().getPostofficeId() +" is invalid");  
//                 } 
//                 if ((deathdtls.getAddressInfo().getPermanentAddress().getLocationType()==CrDeathConstants.ADDRESS_INSIDE_LB) ){
//                     if(StringUtils.isEmpty(addressInfo.getPermanentAddress().getWardId()) ){
//                         throw new CustomException("PERMANENT ADDRESS:WARD  IS INVALID", "The ward name " +
//                         addressInfo.getPermanentAddress().getWardId() +" is invalid");  
//                     } 
//                 }
//                 if ((deathdtls.getAddressInfo().getPermanentAddress().getLocationType()==CrDeathConstants.ADDRESS_INSIDE_KERALA) ){
//                     if(StringUtils.isEmpty(addressInfo.getPermanentAddress().getDistrictId()) ){
//                         throw new CustomException("PERMANENT ADDRESS:DISTRICT  IS INVALID", "The District name " +
//                         addressInfo.getPermanentAddress().getDistrictId() +" is invalid");  
//                     } 
//                 }
//                 if ((deathdtls.getAddressInfo().getPermanentAddress().getLocationType()==CrDeathConstants.ADDRESS_INSIDE_INDIA)){
//                     if(StringUtils.isEmpty(addressInfo.getPermanentAddress().getDistrictId()) ){
//                         throw new CustomException("PERMANENT ADDRESS:DISTRICT  IS INVALID", "The District name " +
//                         addressInfo.getPermanentAddress().getDistrictId() +" is invalid");  
//                     } 
//                     if(StringUtils.isEmpty(addressInfo.getPermanentAddress().getStateId()) ){
//                         throw new CustomException("PERMANENT ADDRESS:STATE  IS INVALID", "The name of state " +
//                         addressInfo.getPermanentAddress().getDistrictId() +" is invalid");  
//                     } 
//                     if(StringUtils.isEmpty(addressInfo.getPermanentAddress().getPostofficeNameEn()) || StringUtils.isEmpty(addressInfo.getPermanentAddress().getPostofficeNameMl()) ){
//                         throw new CustomException("PERMANENT ADDRESS:POSTOFFICE NAME  IS INVALID", "The post office name " +
//                         addressInfo.getPermanentAddress().getPostofficeNameEn() + " or " + addressInfo.getPermanentAddress().getPostofficeNameMl()+" is invalid");  
//                     } 
//                 }
//                 if ((deathdtls.getAddressInfo().getPermanentAddress().getLocationType()==CrDeathConstants.ADDRESS_OUTSIDE_INDIA)){
//                     if(StringUtils.isEmpty(addressInfo.getPermanentAddress().getCountryId()) ){
//                         throw new CustomException("PERMANENT ADDRESS:COUNTRY  IS INVALID", "The name  of country" +
//                         addressInfo.getPermanentAddress().getCountryId() +" is invalid");  
//                     }   
//                     if(StringUtils.isEmpty(addressInfo.getPermanentAddress().getHoueNameEn()) || StringUtils.isEmpty(addressInfo.getPermanentAddress().getHoueNameMl()) ){
//                         throw new CustomException("PERMANENT ADDRESS:HOUSE NAME IS INVALID", "The house name " +
//                         addressInfo.getPermanentAddress().getHoueNameEn()+" or" +addressInfo.getPermanentAddress().getHoueNameMl() +" is invalid");  
//                     } 
//                     if(StringUtils.isEmpty(addressInfo.getPermanentAddress().getStreetNameEn()) || StringUtils.isEmpty(addressInfo.getPermanentAddress().getStreetNameEn()) ){
//                         throw new CustomException("PERMANENT ADDRESS:STREET NAME IS INVALID", "The street name " +
//                         addressInfo.getPermanentAddress().getStreetNameEn() +"  or "+  addressInfo.getPermanentAddress().getStreetNameEn() +  "is invalid");  
//                     } 
//                 }
//             }   
       
//         //STATISTICAL DETAILS VALIDATION
//             if (statisticalInfo.getSmokingType()==CrDeathConstants.VALUE_TRUE){
//                 if((statisticalInfo.getSmokingNumYears()<=0)){
//                     throw new CustomException("STATISTICAL DETAILS:", "The number of  years of smoking " +
//                     statisticalInfo.getSmokingNumYears() +" is invalid");  
//                 }  
//             } 
//             if (statisticalInfo.getAlcoholType()==CrDeathConstants.VALUE_TRUE){
//                 if((statisticalInfo.getAlcoholNumYears()<=0)){
//                     throw new CustomException("STATISTICAL DETAILS:", "The number of  years of alcohol " +
//                     statisticalInfo.getAlcoholNumYears() +" is invalid");  
//                 }  
//             }
//             if (statisticalInfo.getArecanutType()==CrDeathConstants.VALUE_TRUE){
//                 if((statisticalInfo.getArecanutNumYears()<=0)){
//                     throw new CustomException("STATISTICAL DETAILS:", "The number of  years of arecanut " +
//                     statisticalInfo.getArecanutNumYears() +" is invalid");  
//                 }  
//             }
//             if (statisticalInfo.getTobaccoType()==CrDeathConstants.VALUE_TRUE){
//                 if((statisticalInfo.getTobaccoNumYears()<=0)){
//                     throw new CustomException("STATISTICAL DETAILS:", "The number of  years of tobacco " +
//                     statisticalInfo.getTobaccoNumYears() +" is invalid");  
//                 }  
//             }

//         } 
//         //DECEASED UNIDENTIFIED BEGIN
//         if (deathdtls.getDeceasedUnIdentified().equals(CrDeathConstants.VALUE_FALSE)){
//                             //DEATH_PLACE_HOME
//             if (deathdtls.getDeathPlace()==CrDeathConstants.DEATH_PLACE_HOME){
                
//                 if(StringUtils.isEmpty(addressInfo.getDeathplaceAddress().getHoueNameEn()) || StringUtils.isEmpty(addressInfo.getDeathplaceAddress().getHoueNameMl())){
//                     throw new CustomException("HOUSE NAME IS INVALID", "The House name " +
//                     addressInfo.getDeathplaceAddress().getHoueNameEn()+" or "+addressInfo.getDeathplaceAddress().getHoueNameMl()+ " is invalid");  
//                 } 
//                 // if(StringUtils.isEmpty(addressInfo.getDeathplaceAddress().getCityEn()) || StringUtils.isEmpty(addressInfo.getDeathplaceAddress().getCityMl())){
//                 //     throw new CustomException("CITY  IS INVALID", "The city name " +
//                 //     addressInfo.getDeathplaceAddress().getCityEn()+" or "+addressInfo.getDeathplaceAddress().getCityMl()+ " is invalid");  
//                 // } 
//                 if(StringUtils.isEmpty(addressInfo.getDeathplaceAddress().getWardId()) ){
//                     throw new CustomException("WARD NAME INVALID", "The ward name " +
//                     addressInfo.getDeathplaceAddress().getWardId() +" is invalid");  
//                 } 
//                 if(StringUtils.isEmpty(addressInfo.getDeathplaceAddress().getPostofficeId())){
//                     throw new CustomException("POSTOFFICE INVALID", "The postoffice name " +
//                     addressInfo.getDeathplaceAddress().getPostofficeId() +" is invalid");  
//                 } 
//                 if(StringUtils.isEmpty(addressInfo.getDeathplaceAddress().getDistrictId())){
//                     throw new CustomException("DISTRICT NAME INVALID", "The District name " +
//                     addressInfo.getDeathplaceAddress().getDistrictId() +" is invalid");  
//                 } 
//             }
//             //DEATH_PLACE_HOSPITAL
//             if (deathdtls.getDeathPlace()==CrDeathConstants.DEATH_PLACE_HOSPITAL){
            
//                 if(StringUtils.isEmpty(deathdtls.getDeathPlaceType()) ){
//                     throw new CustomException("HOSPITAL NAME INVALID", "The Hospital name " +deathdtls.getDeathPlaceType()
//                     + " is invalid");  
//                 } 
//                 if(StringUtils.isEmpty(deathdtls.getDeathPlaceOfficerName())){
//                     throw new CustomException("SIGNED OFFICER NAME INVALID", "The name of Signed authority   " +deathdtls.getDeathPlaceOfficerName()
//                     + " is invalid");  
//                 } 
//                 if(StringUtils.isEmpty(deathdtls.getDeathSignedOfficerDesignation())){
//                     throw new CustomException("SIGNED OFFICER DESIGNATION  INVALID", "The designation of Signed authority  " +deathdtls.getDeathPlaceOfficerName()
//                     + " is invalid");  
//                 } 
//             }
//             //DEATH_PLACE_INSTITUTION
//             if (deathdtls.getDeathPlace()==CrDeathConstants.DEATH_PLACE_INSTITUTION){
            
//                 if(StringUtils.isEmpty(deathdtls.getDeathPlaceType())){
//                     throw new CustomException("INSTITUTION TYPE  INVALID", "The institution type " +deathdtls.getDeathPlaceType()
//                     + " is invalid");  
//                 } 
//                 if(StringUtils.isEmpty(deathdtls.getDeathPlaceInstId())){
//                     throw new CustomException("INSTITUTION  NAME INVALID", "The institution name  " +deathdtls.getDeathPlaceInstId()
//                     + " is invalid");  
//                 } 
//                 if(StringUtils.isEmpty(deathdtls.getDeathPlaceOfficerName())){
//                     throw new CustomException("SIGNED OFFICER NAME INVALID", "The name of Signed authority " +deathdtls.getDeathPlaceOfficerName()
//                     + " is invalid");  
//                 } 
//                 if(StringUtils.isEmpty(deathdtls.getDeathSignedOfficerDesignation())){
//                     throw new CustomException("SIGNED OFFICER DESIGNATION INVALID", "The designation of Signed authority  " +deathdtls.getDeathPlaceOfficerName()
//                     + " is invalid");  
//                 } 

//             }
//             //DEATH_PLACE_VEHICLE
//             if (deathdtls.getDeathPlace()==CrDeathConstants.DEATH_PLACE_VEHICLE){

//                 //Vehicle type
//                 if(StringUtils.isEmpty(deathdtls.getDeathPlaceType())){
//                     throw new CustomException("VEHICLE TYPE INVALID", "The Vehicle type " +deathdtls.getDeathPlaceType()
//                     + " is invalid");  
//                 } 
//                 if(StringUtils.isEmpty(deathdtls.getVehicleNumber())){
//                     throw new CustomException("VEHICLE  NUMBER INVALID", "The Vehicle number " +deathdtls.getVehicleNumber()
//                     + " is invalid");  
//                 }  
//                 if(StringUtils.isEmpty(deathdtls.getVehicleFirstHalt())){
//                     throw new CustomException("VEHICLE  FIRST HALT INVALID", "The Vehicle first halt " +deathdtls.getVehicleNumber()
//                     + " is invalid");  
//                 }
//                 if(StringUtils.isEmpty(deathdtls.getVehicleFromplaceMl())|| StringUtils.isEmpty(deathdtls.getVehicleFromplaceEn())){
//                     throw new CustomException("VEHICLE FROM PLACE INVALID", "The Vehicle from  place " +deathdtls.getVehicleFromplaceMl()
//                 + " or " + deathdtls.getVehicleFromplaceEn()+  " is invalid");  
//                 }
//                 if(StringUtils.isEmpty(deathdtls.getVehicleToPlaceEn())|| StringUtils.isEmpty(deathdtls.getVehicleToPlaceMl())){
//                     throw new CustomException("VEHICLE TO PLACE INVALID", "The Vehicle to place " +deathdtls.getVehicleToPlaceEn()
//                 + " or " + deathdtls.getVehicleToPlaceMl()+  " is invalid");  
//                 }
//                 if(StringUtils.isEmpty(deathdtls.getInformantNameEn())|| StringUtils.isEmpty(deathdtls.getInformantNameMl())){
//                     throw new CustomException("INFORMANT :NAME INVALID", "The informant name " +deathdtls.getVehicleNumber()
//                     + " is invalid");  
//                 } 
//                 if(StringUtils.isEmpty(addressInfo.getInformantAddress().getHoueNameEn())||StringUtils.isEmpty( addressInfo.getInformantAddress().getHoueNameMl())){
//                     throw new CustomException("INFORMANT :HOUSE NAME INVALID", "The House name  of informant " +
//                     addressInfo.getInformantAddress().getHoueNameEn()+" or "+addressInfo.getInformantAddress().getHoueNameMl()+ " is invalid");  
//                 } 
//                 // if(StringUtils.isEmpty(addressInfo.getInformantAddress().getCityEn())|| StringUtils.isEmpty(addressInfo.getInformantAddress().getCityMl())){
//                 //     throw new CustomException("INFORMANT: CITY IS INVALID", "The city name " +
//                 //     addressInfo.getInformantAddress().getCityEn()+" or "+addressInfo.getInformantAddress().getCityMl()+ " is invalid");  
//                 // } 
//                 if(StringUtils.isEmpty(addressInfo.getInformantAddress().getWardId())){
//                     throw new CustomException("INFORMANT: WARD INVALID", "The ward name  " +
//                     addressInfo.getInformantAddress().getWardId() +" is invalid");  
//                 } 
//                 if(StringUtils.isEmpty(addressInfo.getInformantAddress().getPostofficeId())){
//                     throw new CustomException("INFORMANT: POSTOFFICE INVALID", "The postoffice  " +
//                     addressInfo.getInformantAddress().getPostofficeId() +" is invalid");  
//                 } 
//                 if(StringUtils.isEmpty(addressInfo.getInformantAddress().getDistrictId())){
//                     throw new CustomException("INFORMANT :DISTRICT INVALID", "The District name " +
//                     addressInfo.getInformantAddress().getDistrictId() +" is invalid");  
//                 } 
//             }

//         }
  
//     });
//}
//Rakhi S on 08.03.2023
public void validateAbandonedUpdate(DeathAbandonedRequest request, List<DeathAbandonedDtls> searchResult) {
    List<DeathAbandonedDtls> deathdetails = request.getDeathAbandonedDtls();

    if (CollectionUtils.isEmpty(deathdetails)) {
        throw new CustomException(DEATH_REG_REQUIRED.getCode(), "Death registration is required.");
    }

    if (deathdetails.size() > 1) { // NOPMD
        throw new CustomException(DEATH_REG_INVALID_UPDATE.getCode(),
                "Supports only single Death registration update request.");
    }

    if (deathdetails.size() != searchResult.size()) {
        throw new CustomException(DEATH_REG_INVALID_UPDATE.getCode(),
                "Death registration(s) not found in database.");
    }
}

//Rakhi S on 30.03.2023
public void validateNACUpdate(DeathNACRequest request, List<DeathNACDtls> searchResult) {
    List<DeathNACDtls> deathdetails = request.getDeathNACDtls();

    if (CollectionUtils.isEmpty(deathdetails)) {
        throw new CustomException(DEATH_REG_REQUIRED.getCode(), "Death NAC is required.");
    }

    if (deathdetails.size() > 1) { // NOPMD
        throw new CustomException(DEATH_REG_INVALID_UPDATE.getCode(),
                "Supports only single Death NAC update request.");
    }

    if (deathdetails.size() != searchResult.size()) {
        throw new CustomException(DEATH_REG_INVALID_UPDATE.getCode(),
                "Death NAC registration(s) not found in database.");
    }
}
 //Rakhi S on 06.04.2023 
 public void ruleEngineDeath(DeathDtlRequest request, WorkFlowCheck wfc,Object mdmsdata){
    Long dateOfDeath = 0L;
    String deathPlace = null;
    String wfCode = null;
    String applicationType = null;

    List<DeathDtl> deathApplication = request.getDeathCertificateDtls();
    for (DeathDtl death : deathApplication) {
        dateOfDeath = death.getDeathBasicInfo().getDateOfDeath();
        deathPlace = death.getDeathBasicInfo().getDeathPlace();
        wfCode = death.getWorkflowcode();        
        applicationType = death.getDeathBasicInfo().getFuncionUID();
    }
    if (dateOfDeath == null) {
        throw new CustomException(DEATH_DETAILS_INVALID_CREATE.getCode(),
                "Date of death is required for create request.");
    } else {
        validateDoD(dateOfDeath, deathPlace, wfCode,applicationType,mdmsdata, wfc);
    }
    if (deathApplication!=null){
        deathApplication
                .forEach(deathdtls -> {
        DeathBasicInfo  basicInfo = deathdtls.getDeathBasicInfo();
        Long dod = basicInfo.getDateOfDeath();          
          java.sql.Date dodDate=new java.sql.Date(dod); 
          int diffDays= getDaysDiff(dodDate);        
          if(diffDays <= 21){
            basicInfo.setNormalRegn(true);
          }
          else if(diffDays > 21 && diffDays <= 30){
            basicInfo.setDelayedWithinThirty(true);
          }
          else if(diffDays > 30 && diffDays < 365){
            basicInfo.setDelayedWithinOneyear(true);
          }
          else if(diffDays >= 365){
            basicInfo.setDelayedAfterOneyear(true);
          }
        });
    }
 }
 //Rakhi S on 06.04.2023 
 public int getDaysDiff(Date dateToCheck) 
    {
        long diffMilliseconds = new Date().getTime() - dateToCheck.getTime();
        double diffSeconds = diffMilliseconds / 1000;
        double diffMinutes = diffSeconds / 60;
        double diffHours = diffMinutes / 60;
        double diffDays = diffHours / 24;
            
        return (int) Math.round(diffDays);
    }
//RAkhi S on 10.04.2023 - VAlidate DAte of Death
private void validateDoD(Long dateOfDeath, String deathPlace, String wfCode, String applicationType,Object mdmsData, WorkFlowCheck wfc) {
    Calendar calendar = Calendar.getInstance();
    Long currentDate = calendar.getTimeInMillis();    
    if (dateOfDeath > currentDate) {
        throw new CustomException(DEATH_DETAILS_INVALID_CREATE.getCode(),
                "Date of death should be less than or same as  current date.");
    } else {
        wfc = checkValidation(mdmsData, deathPlace, dateOfDeath, wfc);          
        if(!wfc.getWorkflowCode().equals(wfCode)) {
            throw new CustomException(DEATH_DETAILS_INVALID_CREATE.getCode(),
                    "Workflow code from the application request is wrong.");
        }
        if(!wfc.getApplicationType().equals(applicationType)) {
            throw new CustomException(DEATH_DETAILS_INVALID_CREATE.getCode(),
                    "Application type from the application request is wrong.");
        }
    }
}
//RAkhi S on 10.04.2023 - VAlidate DAte of Death MDMS data
public WorkFlowCheck checkValidation(Object mdmsData, String deathPlace, Long dateOfDeath, WorkFlowCheck wfc) {
    Calendar calendar = Calendar.getInstance();
    Long currentDate = calendar.getTimeInMillis();
    List<LinkedHashMap<String, Object>> wfLists = JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DEATH_NEW_WF_JSONPATH + "[*]");
    for (int n = 0; n < wfLists.size(); n++) {
        String startStr = wfLists.get(n).get("startdateperiod").toString();
        String endStr = wfLists.get(n).get("enddateperiod").toString();
        Long start = Long.parseLong(startStr);
        Long end = Long.parseLong(endStr);
        if (wfLists.get(n).get("DeathPlace").equals(deathPlace)) {
            if (end > 0L) {
                Long comp = currentDate - dateOfDeath;
                if (comp <= end && comp >= start) {
                    wfc.setApplicationType(wfLists.get(n).get("ApplicationType").toString());
                    wfc.setWorkflowCode(wfLists.get(n).get("WorkflowCode").toString());
                    wfc.setPayment(Boolean.getBoolean(wfLists.get(n).get("payment").toString()));
                    wfc.setAmount(Integer.parseInt(wfLists.get(n).get("amount").toString()));
                    wfc.setActive(Boolean.getBoolean(wfLists.get(n).get("active").toString()));
                }
            }
        }
    }
    return wfc;
}
//Rakhi S on 09.04.2023  - Death NAC Common Field Validation
public void validateNACCommonFieldss(DeathNACRequest request) {
      
    List<DeathNACDtls> deathApplication = request.getDeathNACDtls();
        if (deathApplication!=null){
        deathApplication
                        .forEach(deathdtls -> {
            DeathBasicInfo  basicInfo = deathdtls.getDeathBasicInfo();
            DeathNACApplicantDtls  applicantInfo = deathdtls.getDeathApplicantDtls();

            //Deceased Name Validation
            if(StringUtils.isEmpty(basicInfo.getDeceasedFirstNameEn()) ){
                throw new CustomException("DECEASED NAME INVALID", "The deceased name in english" +
                basicInfo.getDeceasedFirstNameEn()+ " is invalid");
            }
            if(StringUtils.isEmpty(basicInfo.getDeceasedFirstNameMl()) ){
                throw new CustomException("DECEASED NAME INVALID", "The deceased name in malayalam" +
                basicInfo.getDeceasedFirstNameMl()+ " is invalid");
            }
            //Deceased Gender Validation
            if(StringUtils.isEmpty(basicInfo.getDeceasedGender()) ){
                throw new CustomException("DECEASED GENDER INVALID", "The deceased  gender" +
                basicInfo.getDeceasedGender()+ " is invalid");
            }

            //Date of Death Validation
            Long dod = basicInfo.getDateOfDeath();          
            java.sql.Date dodDate=new java.sql.Date(dod); 
            int diffDays= getDaysDiff(dodDate);
            if(diffDays < 365){
                throw new CustomException("DECEASED DATE OF DEATH INVALID FOR NAC", "The deceased  date of death below 1 year " +
                basicInfo.getDateOfDeath()+ " no need for nac");
            }
            //Place of Burial
            if(StringUtils.isEmpty(basicInfo.getPlaceOfBurialEn()) ){
                throw new CustomException("DECEASED PLACE OF BURIAL INVALID", "The deceased  place of burial " +
                basicInfo.getPlaceOfBurialEn()+ " details invalid");
            }
            //Deceased Mother Name
            if(StringUtils.isEmpty(basicInfo.getMotherNameEn()) ){
                throw new CustomException("DECEASED MOTHER NAME INVALID", "The deceased mother name " +
                basicInfo.getMotherNameEn()+ " is invalid");
            }
            //Deceased Father Name
            if(StringUtils.isEmpty(basicInfo.getFatherNameEn()) ){
                throw new CustomException("DECEASED FATHER NAME INVALID", "The deceased father name " +
                basicInfo.getFatherNameEn()+ " is invalid");
            }
            //DEATH PLACE HOSPITAL
            if (basicInfo.getDeathPlace()==DeathConstants.DEATH_PLACE_HOSPITAL){
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceType())){
                    throw new CustomException("HOSPITAL NAME IS INVALID", "The Hospital name " +
                    basicInfo.getDeathPlaceType()+ " is invalid");  
                } 
            }
            //DEATH PLACE INSTITUTION
            if (basicInfo.getDeathPlace()==DeathConstants.DEATH_PLACE_INSTITUTION){
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceType())){
                    throw new CustomException("INSTITUTION NAME IS INVALID", "The Institution name " +
                    basicInfo.getDeathPlaceType()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceInstId())){
                    throw new CustomException("INSTITUTION TYPE IS INVALID", "The Institution type " +
                    basicInfo.getDeathPlaceInstId()+ " is invalid");  
                } 
            }
            //DEATH PLACE HOME
            if (basicInfo.getDeathPlace()==DeathConstants.DEATH_PLACE_HOME){
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceHomeWardId())){
                    throw new CustomException("DEATH PLACE WARD IS INVALID", "The ward name " +
                    basicInfo.getDeathPlaceHomeWardId()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceHomePostofficeId())){
                    throw new CustomException("DEATH PLACE POSTOFFICE IS INVALID", "The postoffice name " +
                    basicInfo.getDeathPlaceHomePostofficeId()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceHomePincode())){
                    throw new CustomException("DEATH PLACE POSTOFFICE PINCODE IS INVALID", "The postoffice pincode " +
                    basicInfo.getDeathPlaceHomePincode()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceHomeLocalityEn())) {
                    throw new CustomException("DEATH PLACE LOCALITY IS INVALID", "The locality name in english" +
                    basicInfo.getDeathPlaceHomeLocalityEn()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceHomeLocalityMl())  ){
                    throw new CustomException("DEATH PLACE LOCALITY IS INVALID", "The locality name in malayalam" +
                    basicInfo.getDeathPlaceHomeLocalityMl()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceHomeHoueNameEn())){
                    throw new CustomException("DEATH PLACE HOUSE NAME IS INVALID", "The House name in english " +
                    basicInfo.getDeathPlaceHomeHoueNameEn()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceHomeHoueNameMl())){
                    throw new CustomException("DEATH PLACE HOUSE NAME IS INVALID", "The House name in malayalam " +
                    basicInfo.getDeathPlaceHomeHoueNameMl()+ " is invalid");  
                } 
            }
            //DEATH PLACE VEHICLE
            if (basicInfo.getDeathPlace()==DeathConstants.DEATH_PLACE_VEHICLE){
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceType())){
                    throw new CustomException("DEATH PLACE VEHICLE TYPE IS INVALID", "The vehicle type " +
                    basicInfo.getDeathPlaceType()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getVehicleNumber())){
                    throw new CustomException("DEATH PLACE VEHICLE NUMBER IS INVALID", "The Vehicle number " +
                    basicInfo.getVehicleNumber()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getVehicleFirstHaltEn())){
                    throw new CustomException("DEATH PLACE VEHICLE FIRST HALT IS INVALID", "The vehicle first halt in english " +
                    basicInfo.getVehicleFirstHaltEn()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getVehicleFirstHaltMl())) {
                    throw new CustomException("DEATH PLACE VEHICLE FIRST HALT IS INVALID", "The vehicle first halt in malayalam " +
                    basicInfo.getVehicleFirstHaltMl()+ " is invalid");  
                }
                if(StringUtils.isEmpty(basicInfo.getVehicleHospitalEn())  ){
                    throw new CustomException("DEATH PLACE ADMITTED HOSPITAL IS INVALID", "The name of admitted hospital " +
                    basicInfo.getVehicleHospitalEn()+ " is invalid");  
                }  
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceWardId())){
                    throw new CustomException("DEATH PLACE WARD IS INVALID", "The ward name " +
                    basicInfo.getDeathPlaceWardId()+ " is invalid");  
                } 
            }
            //DEATH PLACE PUBLIC PLACES
            if (basicInfo.getDeathPlace()==DeathConstants.DEATH_PLACE_PUBLICPLACES){
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceType())){
                    throw new CustomException("DEATH PLACE TYPE IS INVALID", "The Publicplace type " +
                    basicInfo.getDeathPlaceType()+ " is invalid");  
                } 
 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceWardId())){
                    throw new CustomException("DEATH PLACE WARD IS INVALID", "The ward name " +
                    basicInfo.getDeathPlaceWardId()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceLocalityEn())){
                    throw new CustomException("DEATH PLACE LOCALITY IS INVALID", "The locality name in english " +
                    basicInfo.getDeathPlaceLocalityEn()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceLocalityMl())){
                    throw new CustomException("DEATH PLACE LOCALITY IS INVALID", "The locality name in malayalam " +
                    basicInfo.getDeathPlaceLocalityMl()+ " is invalid");  
                }                
            }            
            //APPLICANT DETAILS
            if(StringUtils.isEmpty(applicantInfo.getApplicantName())){
                throw new CustomException("APPLICANT NAME IS INVALID", "The Applicant Name " +
                applicantInfo.getApplicantName()+ " is invalid");  
            } 
            if(StringUtils.isEmpty(applicantInfo.getApplicantAadhaarNo())){
                throw new CustomException("APPLICANT AADHAR IS INVALID", "The Applicant Aadhar " +
                applicantInfo.getApplicantAadhaarNo()+ " is invalid");  
            } 
            if(StringUtils.isEmpty(applicantInfo.getApplicantRelation())){
                throw new CustomException("APPLICANT RELATION IS INVALID", "The Applicant Relation " +
                applicantInfo.getApplicantRelation()+ " is invalid");  
            } 
            if(StringUtils.isEmpty(applicantInfo.getApplicantAddress())){
                throw new CustomException("APPLICANT ADDRESS IS INVALID", "The Applicant Address " +
                applicantInfo.getApplicantAddress()+ " is invalid");  
            }            
            if(applicantInfo.getApplicantMobileNo()<=0){
                throw new CustomException("APPLICANT MOBILE NO IS INVALID", "The Applicant Mobile No " +
                applicantInfo.getApplicantMobileNo()+ " is invalid");
            }
        });        
      }
    }
}
