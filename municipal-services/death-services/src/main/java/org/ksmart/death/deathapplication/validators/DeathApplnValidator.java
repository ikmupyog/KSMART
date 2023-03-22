package org.ksmart.death.deathapplication.validators;

import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
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
import org.ksmart.death.deathapplication.web.models.DeathStatisticalInfo;
import org.ksmart.death.deathapplication.web.models.DeathBasicInfo;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionBasicInfo;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionRequest;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionDtls;


import org.egov.tracer.model.CustomException;
import org.springframework.stereotype.Component;
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
//Jasmine 14.02.2023

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
//Common validation for all cases
            if((basicInfo.getDateOfDeath()<=0) || (basicInfo.getTimeOfDeath()<=0)) { 
                    throw new CustomException("DEATH DATE INVALID", "The date and time can't be null");
            }

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
                throw new CustomException("DECEASED AGEUNIT INVALID", "The deceased name in malayalam" +
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
            if(StringUtils.isEmpty(basicInfo.getOccupation()) ){
                throw new CustomException("DECEASED PROFESSION INVALID", "The  deceased profession " +
                basicInfo.getOccupation()+ " is invalid");
            }
            if(familyInfo.getFamilyMobileNo()<=0){
                throw new CustomException("CONTACT NUMBER INVALID", "The  family mobile number " +
                familyInfo.getFamilyMobileNo()+ " is invalid");
            }
//DEATH PLACE HOSPITAL
            if (basicInfo.getDeathPlace()==DeathConstants.DEATH_PLACE_HOSPITAL){
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceType())){
                    throw new CustomException("HOSPITAL NAME IS INVALID", "The Hospital name " +
                    basicInfo.getDeathPlace()+ " is invalid");  
                } 
                //INFORMANT DETAILS
                if(StringUtils.isEmpty(informantDtls.getInformantAadharNo())){
                    throw new CustomException("INFORMANT AADHAR IS INVALID", "The Aadhar of informant " +
                    informantDtls.getInformantAadharNo()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(informantDtls.getInformantNameEn())){
                    throw new CustomException("INFORMANT NAME IS INVALID", "The name of informant " +
                    informantDtls.getInformantNameEn()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(informantDtls.getDeathSignedOfficerDesignation())){
                    throw new CustomException("INFORMANT DESIGNATION IS INVALID", "The designation of informant " +
                    informantDtls.getDeathSignedOfficerDesignation()+ " is invalid");  
                }
                if(informantDtls.getInformantMobileNo()<=0){
                    throw new CustomException("MOBILE NUMBER OF INFORMANT IS INVALID", "The mobile number of informant " +
                    informantDtls.getInformantMobileNo()+ " is invalid");  
                }
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
                //INFORMANT DETAILS
                if(StringUtils.isEmpty(informantDtls.getInformantAadharNo())){
                    throw new CustomException("INFORMANT AADHAR IS INVALID", "The Aadhar of informant " +
                    informantDtls.getInformantAadharNo()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(informantDtls.getInformantNameEn())){
                    throw new CustomException("INFORMANT NAME IS INVALID", "The name of informant " +
                    informantDtls.getInformantNameEn()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(informantDtls.getDeathSignedOfficerDesignation())){
                    throw new CustomException("INFORMANT DESIGNATION IS INVALID", "The designation of informant " +
                    informantDtls.getDeathSignedOfficerDesignation()+ " is invalid");  
                }
                if(informantDtls.getInformantMobileNo()<=0){
                    throw new CustomException("MOBILE NUMBER OF INFORMANT IS INVALID", "The mobile number of informant " +
                    informantDtls.getInformantMobileNo()+ " is invalid");  
                }

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
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceHomeHoueNameEn())){
                    throw new CustomException("DEATHPLACE HOUSE NAME IS INVALID", "The House name in english " +
                    basicInfo.getDeathPlaceHomeHoueNameEn()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(basicInfo.getDeathPlaceHomeHoueNameMl())){
                    throw new CustomException("DEATHPLACE HOUSE NAME IS INVALID", "The House name in malayalam " +
                    basicInfo.getDeathPlaceHomeHoueNameMl()+ " is invalid");  
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
                if(StringUtils.isEmpty(basicInfo.getVehicleFirstHaltMl())) {
                    throw new CustomException("DEATHPLACE VEHICLE FIRST HALT IS INVALID", "The vehicle first halt in malayalam " +
                    basicInfo.getVehicleFirstHaltMl()+ " is invalid");  
                } 
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
                if(StringUtils.isEmpty(basicInfo.getVehicleFirstHaltMl())) {
                    throw new CustomException("DEATHPLACE VEHICLE FIRST HALT IS INVALID", "The vehicle first halt in malayalam " +
                    basicInfo.getVehicleFirstHaltMl()+ " is invalid");  
                } 
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
    
}
