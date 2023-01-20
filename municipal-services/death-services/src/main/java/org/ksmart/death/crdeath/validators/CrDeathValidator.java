package org.ksmart.death.crdeath.validators;

import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.ksmart.death.crdeath.web.enums.ErrorCodes.DEATH_DETAILS_REQUIRED;
import static org.ksmart.death.crdeath.web.enums.ErrorCodes.DEATH_DETAILS_INVALID_CREATE;
import static org.ksmart.death.crdeath.web.enums.ErrorCodes.DEATH_REG_REQUIRED;
import static org.ksmart.death.crdeath.web.enums.ErrorCodes.DEATH_REG_INVALID_UPDATE;

import org.apache.commons.collections4.CollectionUtils;
import org.ksmart.death.crdeath.util.CrDeathConstants;
import org.ksmart.death.crdeath.web.models.CrDeathAddressInfo;
import org.ksmart.death.crdeath.web.models.CrDeathDtl;
import org.ksmart.death.crdeath.web.models.CrDeathDtlRequest;
import org.ksmart.death.crdeath.web.models.CrDeathStatistical;
import org.egov.tracer.model.CustomException;
import org.springframework.stereotype.Component;
import org.apache.commons.lang3.StringUtils;
/**
     * Creates CrDeathService
     * Rakhi S IKM
     * on  04/12/2022
     */
@Component
public class CrDeathValidator {
    Map<String,String> errorMap = new HashMap<>();
    
     /**
     * Validate death  create request.
     *
     * @param request the
     *                {
     *                CrDeathDtlRequest}
     * RAKHI S on 05.12.2022
     */
    public void validateCreate(CrDeathDtlRequest request) {
        System.out.println("validateCreate-Hi" );
        List<CrDeathDtl> deathDtls = request.getDeathCertificateDtls();

        if (CollectionUtils.isEmpty(deathDtls)) {
            throw new CustomException(DEATH_DETAILS_REQUIRED.getCode(), "Death details is required.");
        }

        if (deathDtls.size() > 1) { // NOPMD
            throw new CustomException(DEATH_DETAILS_INVALID_CREATE.getCode(),
                    "Supports only single death application create request.");
        }

        validateCommonFields( request);
        //validateHOMEFields( request);
        
    }
    //Jasmine on 13.01.2022,17/01/2023
    public void validateCommonFields(CrDeathDtlRequest request) {
      
        List<CrDeathDtl> deathApplication = request.getDeathCertificateDtls();
        deathApplication
        .forEach(deathdtls -> {
            CrDeathAddressInfo  addressInfo = deathdtls.getAddressInfo();
            CrDeathStatistical  statisticalInfo = deathdtls.getStatisticalInfo();
            //getDeathDateUnavailabl=0 ie death date is available
            if(deathdtls.getDeathDateUnavailable().equals(CrDeathConstants.VALUE_FALSE))
            {
                if(deathdtls.getDateOfDeath()<=0){
        
                    throw new CustomException("DEATH DATE IS INVALID", "The deceased death date" +
                    deathdtls.getDateOfDeath()+ " is invalid");
                 
                }
            }
            if(deathdtls.getDeathDateUnavailable().equals(CrDeathConstants.VALUE_TRUE)){
                if(deathdtls.getDateOfDeath1() <= CrDeathConstants.VALUE_FALSE || deathdtls.getDateOfDeath() <= CrDeathConstants.VALUE_FALSE ){                   
                    
                }
                else{
                    throw new CustomException("DEATH DATE IS INVALID", "Death FromDate and death ToDate can't be null or zero");
                }
            }
            //DECEASED IDENTIFIED
            if (deathdtls.getDeceasedUnIdentified().equals(CrDeathConstants.VALUE_FALSE)){

                if(StringUtils.isEmpty(deathdtls.getDeceasedFirstNameMl()) || (StringUtils.isEmpty(deathdtls.getDeceasedFirstNameEn()) )) { 
                        throw new CustomException("DECEASED NAME IS INVALID", "The deceased name can't be null");
                }

                if(StringUtils.isEmpty(deathdtls.getDeceasedGender()) ){
                    throw new CustomException("DECEASED GENDER IS INVALID", "The deceased  gender" +
                    deathdtls.getDeceasedGender()+ " is invalid");
                    }

                if(deathdtls.getAge()<=0){
                    throw new CustomException("DECEASED AGE IS INVALID", "The deceased  age" +
                    deathdtls.getAge()+ " is invalid");
                }
                
                if(deathdtls.getMaleDependentUnavailable().equals(CrDeathConstants.VALUE_FALSE)){

                    if(StringUtils.isEmpty(deathdtls.getMaleDependentNameEn()) || StringUtils.isEmpty(deathdtls.getMaleDependentNameMl()) ){
                        throw new CustomException("FATHER/HUSBAND NAME IS INVALID", "The father/husband name " +
                        deathdtls.getMaleDependentNameEn()+"or"+deathdtls.getMaleDependentNameMl()+ " is invalid");  
                    } 
                    
                    if(StringUtils.isEmpty(deathdtls.getMaleDependentType()) ){
                        throw new CustomException("FATHER/HUSBAND TYPE IS INVALID", "The father/husband type " +
                        deathdtls.getMaleDependentNameEn()+"or"+deathdtls.getMaleDependentNameMl()+ " is invalid");  
                    } 
                } 
                if(deathdtls.getFemaleDependentUnavailable().equals(CrDeathConstants.VALUE_FALSE)){

                        if(StringUtils.isEmpty(deathdtls.getFemaleDependentNameEn()) || StringUtils.isEmpty(deathdtls.getFemaleDependentNameMl()) ){
                            throw new CustomException("MOTHER NAME IS INVALID", "The mother name " +
                            deathdtls.getFemaleDependentNameEn()+"or"+deathdtls.getFemaleDependentNameMl()+ " is invalid");  
                        } 
                } 
                //DEATH_PLACE_HOME
                if (deathdtls.getDeathPlace()==CrDeathConstants.DEATH_PLACE_HOME){
                    
                    if(StringUtils.isEmpty(addressInfo.getDeathplaceAddress().getHoueNameEn()) || StringUtils.isEmpty(addressInfo.getDeathplaceAddress().getHoueNameMl())){
                        throw new CustomException("HOUSE NAME IS INVALID", "The House name " +
                        addressInfo.getDeathplaceAddress().getHoueNameEn()+" or "+addressInfo.getDeathplaceAddress().getHoueNameMl()+ " is invalid");  
                    } 
                    if(StringUtils.isEmpty(addressInfo.getDeathplaceAddress().getCityEn()) || StringUtils.isEmpty(addressInfo.getDeathplaceAddress().getCityMl())){
                        throw new CustomException("CITY  IS INVALID", "The city name " +
                        addressInfo.getDeathplaceAddress().getCityEn()+" or "+addressInfo.getDeathplaceAddress().getCityMl()+ " is invalid");  
                    } 
                    if(StringUtils.isEmpty(addressInfo.getDeathplaceAddress().getWardId()) ){
                        throw new CustomException("WARD NAME IS INVALID", "The ward name " +
                        addressInfo.getDeathplaceAddress().getWardId() +" is invalid");  
                    } 
                    if(StringUtils.isEmpty(addressInfo.getDeathplaceAddress().getPostOfficeId())){
                        throw new CustomException("POSTOFFICE IS INVALID", "The postoffice name " +
                        addressInfo.getDeathplaceAddress().getPostOfficeId() +" is invalid");  
                    } 
                    if(StringUtils.isEmpty(addressInfo.getDeathplaceAddress().getDistrictId())){
                        throw new CustomException("DISTRICT NAME IS INVALID", "The District name " +
                        addressInfo.getDeathplaceAddress().getDistrictId() +" is invalid");  
                    } 
                }
                //DEATH_PLACE_HOSPITAL
                if (deathdtls.getDeathPlace()==CrDeathConstants.DEATH_PLACE_HOSPITAL){
                
                    if(StringUtils.isEmpty(deathdtls.getDeathPlaceType()) ){
                        throw new CustomException("HOSPITAL NAME IS INVALID", "The Hospital name " +deathdtls.getDeathPlaceType()
                        + " is invalid");  
                    } 
                    if(StringUtils.isEmpty(deathdtls.getDeathPlaceOfficerName())){
                        throw new CustomException("OFFICER NAME IS INVALID", "The Signed authority  name " +deathdtls.getDeathPlaceOfficerName()
                        + " is invalid");  
                    } 
                    if(StringUtils.isEmpty(deathdtls.getDeathSignedOfficerDesignation())){
                        throw new CustomException("OFFICER DESIGNATION IS INVALID", "The Signed authority  designation " +deathdtls.getDeathPlaceOfficerName()
                        + " is invalid");  
                    } 
                }
                //DEATH_PLACE_INSTITUTION
                if (deathdtls.getDeathPlace()==CrDeathConstants.DEATH_PLACE_INSTITUTION){
                
                    if(StringUtils.isEmpty(deathdtls.getDeathPlaceType())){
                        throw new CustomException("INSTUTUTION TYPE  IS INVALID", "The institution type " +deathdtls.getDeathPlaceType()
                        + " is invalid");  
                    } 
                    if(StringUtils.isEmpty(deathdtls.getDeathPlaceInstId())){
                        throw new CustomException("INSTITUTION  NAME IS INVALID", "The institution name  " +deathdtls.getDeathPlaceInstId()
                        + " is invalid");  
                    } 
                    if(StringUtils.isEmpty(deathdtls.getDeathPlaceOfficerName())){
                        throw new CustomException("OFFICER NAME IS INVALID", "The Signed authority  name " +deathdtls.getDeathPlaceOfficerName()
                        + " is invalid");  
                    } 
                    if(StringUtils.isEmpty(deathdtls.getDeathSignedOfficerDesignation())){
                        throw new CustomException("OFFICER DESIGNATION IS INVALID", "The Signed authority  designation " +deathdtls.getDeathPlaceOfficerName()
                        + " is invalid");  
                    } 

                }
                //DEATH_PLACE_VEHICLE
                if (deathdtls.getDeathPlace()==CrDeathConstants.DEATH_PLACE_VEHICLE){
    
                    //Vehicle type
                    if(StringUtils.isEmpty(deathdtls.getDeathPlaceType())){
                        throw new CustomException("VEHICLE TYPE  IS INVALID", "The Vehicle type " +deathdtls.getDeathPlaceType()
                        + " is invalid");  
                    } 
                    if(StringUtils.isEmpty(deathdtls.getVehicleNumber())){
                        throw new CustomException("VEHICLE  NUMBER IS INVALID", "The Vehicle number " +deathdtls.getVehicleNumber()
                        + " is invalid");  
                    }  
                    if(StringUtils.isEmpty(deathdtls.getVehicleFirstHalt())){
                        throw new CustomException("VEHICLE  FIRST HALT IS INVALID", "The Vehicle first halt " +deathdtls.getVehicleNumber()
                        + " is invalid");  
                    }
                    if(StringUtils.isEmpty(deathdtls.getVehicleFromplaceMl())|| StringUtils.isEmpty(deathdtls.getVehicleFromplaceEn())){
                        throw new CustomException("VEHICLE  FROM PLACE IS INVALID", "The Vehicle first halt " +deathdtls.getVehicleFromplaceMl()
                    + " or " + deathdtls.getVehicleFromplaceEn()+  " is invalid");  
                    }
                    if(StringUtils.isEmpty(deathdtls.getVehicleToPlaceEn())|| StringUtils.isEmpty(deathdtls.getVehicleToPlaceMl())){
                        throw new CustomException("VEHICLE  TO PLACE IS INVALID", "The Vehicle first halt " +deathdtls.getVehicleToPlaceEn()
                    + " or " + deathdtls.getVehicleToPlaceMl()+  " is invalid");  
                    }
                    if(StringUtils.isEmpty(deathdtls.getInformantNameEn())|| StringUtils.isEmpty(deathdtls.getInformantNameMl())){
                        throw new CustomException("INFORMANT : NAME IS INVALID", "The informant name " +deathdtls.getVehicleNumber()
                        + " is invalid");  
                    } 
                    if(StringUtils.isEmpty(addressInfo.getInformantAddress().getHoueNameEn())||StringUtils.isEmpty( addressInfo.getInformantAddress().getHoueNameMl())){
                        throw new CustomException("INFORMANT :HOUSE NAME IS INVALID", "The House name " +
                        addressInfo.getInformantAddress().getHoueNameEn()+" or "+addressInfo.getInformantAddress().getHoueNameMl()+ " is invalid");  
                    } 
                    if(StringUtils.isEmpty(addressInfo.getInformantAddress().getCityEn())|| StringUtils.isEmpty(addressInfo.getInformantAddress().getCityMl())){
                        throw new CustomException("INFORMANT: CITY IS INVALID", "The city name " +
                        addressInfo.getInformantAddress().getCityEn()+" or "+addressInfo.getInformantAddress().getCityMl()+ " is invalid");  
                    } 
                    if(StringUtils.isEmpty(addressInfo.getInformantAddress().getWardId())){
                        throw new CustomException("INFORMANT: WARD IS INVALID", "The ward name " +
                        addressInfo.getInformantAddress().getWardId() +" is invalid");  
                    } 
                    if(StringUtils.isEmpty(addressInfo.getInformantAddress().getPostOfficeId())){
                        throw new CustomException("INFORMANT: POSTOFFICE IS INVALID", "The postoffice  " +
                        addressInfo.getInformantAddress().getPostOfficeId() +" is invalid");  
                    } 
                    if(StringUtils.isEmpty(addressInfo.getInformantAddress().getDistrictId())){
                        throw new CustomException("INFORMANT :DISTRICT  IS INVALID", "The District name " +
                        addressInfo.getInformantAddress().getDistrictId() +" is invalid");  
                    } 
                }
                    //ADDRESS TYPE:PRESENT ADDRESS
                if ((deathdtls.getAddressInfo().getPresentAddress().getLocationType()==CrDeathConstants.ADDRESS_INSIDE_LB) || 
                    (deathdtls.getAddressInfo().getPresentAddress().getLocationType()==CrDeathConstants.ADDRESS_INSIDE_KERALA)||
                    (deathdtls.getAddressInfo().getPresentAddress().getLocationType()==CrDeathConstants.ADDRESS_INSIDE_INDIA)  
                        ){
                
                    if(StringUtils.isEmpty(addressInfo.getPresentAddress().getHoueNameEn())|| StringUtils.isEmpty(addressInfo.getPresentAddress().getHoueNameMl())){
                        throw new CustomException("PRESENT ADDRESS:HOUSE NAME IS INVALID", "The House name " +
                        addressInfo.getPresentAddress().getHoueNameEn()+" or "+addressInfo.getPresentAddress().getHoueNameMl()+ " is invalid");  
                    } 
                    if(StringUtils.isEmpty(addressInfo.getPresentAddress().getCityEn()) || StringUtils.isEmpty(addressInfo.getPresentAddress().getCityMl())){
                        throw new CustomException("PRESENT ADDRESS:CITY  IS INVALID", "The city name " +
                        addressInfo.getPresentAddress().getCityEn()+" or "+addressInfo.getPresentAddress().getCityMl()+ " is invalid");  
                    } 

                    if(StringUtils.isEmpty(addressInfo.getPresentAddress().getPostOfficeId())){
                        throw new CustomException("PRESENT ADDRESS:POSTOFFICE IS INVALID", "The postoffice name " +
                        addressInfo.getPresentAddress().getPostOfficeId() +" is invalid");  
                    } 
                    if ((deathdtls.getAddressInfo().getPresentAddress().getLocationType()==CrDeathConstants.ADDRESS_INSIDE_LB) ){
                        if(StringUtils.isEmpty(addressInfo.getPresentAddress().getWardId())){
                            throw new CustomException("PRESENT ADDRESS:WARD  IS INVALID", "The ward name " +
                            addressInfo.getPresentAddress().getWardId() +" is invalid");  
                        } 
                    }
                    if ((deathdtls.getAddressInfo().getPresentAddress().getLocationType()==CrDeathConstants.ADDRESS_INSIDE_KERALA) ){
                        if(StringUtils.isEmpty(addressInfo.getPresentAddress().getDistrictId())){
                            throw new CustomException("PRESENT ADDRESS:DISTRICT  IS INVALID", "The District name " +
                            addressInfo.getPresentAddress().getDistrictId() +" is invalid");  
                        } 
                    }
                    if ((deathdtls.getAddressInfo().getPresentAddress().getLocationType()==CrDeathConstants.ADDRESS_INSIDE_INDIA)){
                        if(StringUtils.isEmpty(addressInfo.getPresentAddress().getDistrictId())){
                            throw new CustomException("PRESENT ADDRESS:DISTRICT  IS INVALID", "The District name " +
                            addressInfo.getPresentAddress().getDistrictId() +" is invalid");  
                        } 
                        if(StringUtils.isEmpty(addressInfo.getPresentAddress().getStateId())){
                            throw new CustomException("PRESENT ADDRESS:STATE  IS INVALID", "The state name " +
                            addressInfo.getPresentAddress().getDistrictId() +" is invalid");  
                        } 
                        if(StringUtils.isEmpty(addressInfo.getPresentAddress().getPostofficeNameEn())|| StringUtils.isEmpty(addressInfo.getPresentAddress().getPostofficeNameMl()) ){
                            throw new CustomException("PRESENT ADDRESS:POSTOFFICE NAME  IS INVALID", "The post office name " +
                            addressInfo.getPresentAddress().getPostofficeNameEn() + " or " + addressInfo.getPresentAddress().getPostofficeNameMl()+" is invalid");  
                        } 
                    }
                    if ((deathdtls.getAddressInfo().getPresentAddress().getLocationType()==CrDeathConstants.ADDRESS_OUTSIDE_INDIA)){
                        if(StringUtils.isEmpty(addressInfo.getPresentAddress().getCountryId())){
                            throw new CustomException("PRESENT ADDRESS:COUNTRY  IS INVALID", "The country name " +
                            addressInfo.getPresentAddress().getCountryId() +" is invalid");  
                        }   
                        if(StringUtils.isEmpty(addressInfo.getPresentAddress().getHoueNameEn())|| StringUtils.isEmpty(addressInfo.getPresentAddress().getHoueNameMl())){
                            throw new CustomException("PRESENT ADDRESS:COUNTRY  IS INVALID", "The country name " +
                            addressInfo.getPresentAddress().getCountryId() +" is invalid");  
                        } 
                        if(StringUtils.isEmpty(addressInfo.getPresentAddress().getStreetNameEn())|| StringUtils.isEmpty(addressInfo.getPresentAddress().getStreetNameEn())){
                            throw new CustomException("PRESENT ADDRESS:ADDRESS  IS INVALID", "The country name " +
                            addressInfo.getPresentAddress().getStreetNameEn() +"  or "+  addressInfo.getPresentAddress().getStreetNameEn() +  "is invalid");  
                        } 
                    }
                }
    //        //ADDRESS TYPE:PERMANENT ADDRESS
                if ((deathdtls.getAddressInfo().getPermanentAddress().getLocationType()==CrDeathConstants.ADDRESS_INSIDE_LB) || 
                (deathdtls.getAddressInfo().getPermanentAddress().getLocationType()==CrDeathConstants.ADDRESS_INSIDE_KERALA)||
                (deathdtls.getAddressInfo().getPermanentAddress().getLocationType()==CrDeathConstants.ADDRESS_INSIDE_INDIA) ){

                if(StringUtils.isEmpty(addressInfo.getPermanentAddress().getHoueNameEn()) || StringUtils.isEmpty(addressInfo.getPermanentAddress().getHoueNameMl())){
                    throw new CustomException("PERMANENT ADDRESS:HOUSE NAME IS INVALID", "The House name " +
                    addressInfo.getPermanentAddress().getHoueNameEn()+" or "+addressInfo.getPermanentAddress().getHoueNameMl()+ " is invalid");  
                } 
                if(StringUtils.isEmpty(addressInfo.getPermanentAddress().getCityEn()) || StringUtils.isEmpty(addressInfo.getPermanentAddress().getCityMl())){
                    throw new CustomException("PERMANENT ADDRESS:CITY  IS INVALID", "The city name " +
                    addressInfo.getPermanentAddress().getCityEn()+" or "+addressInfo.getPermanentAddress().getCityMl()+ " is invalid");  
                } 

                if(StringUtils.isEmpty(addressInfo.getPermanentAddress().getPostOfficeId()) ){
                    throw new CustomException("PERMANENT ADDRESS:POSTOFFICE IS INVALID", "The postoffice name " +
                    addressInfo.getPermanentAddress().getPostOfficeId() +" is invalid");  
                } 
                if ((deathdtls.getAddressInfo().getPermanentAddress().getLocationType()==CrDeathConstants.ADDRESS_INSIDE_LB) ){
                    if(StringUtils.isEmpty(addressInfo.getPermanentAddress().getWardId()) ){
                        throw new CustomException("PERMANENT ADDRESS:WARD  IS INVALID", "The ward name " +
                        addressInfo.getPermanentAddress().getWardId() +" is invalid");  
                    } 
                }
                if ((deathdtls.getAddressInfo().getPermanentAddress().getLocationType()==CrDeathConstants.ADDRESS_INSIDE_KERALA) ){
                    if(StringUtils.isEmpty(addressInfo.getPermanentAddress().getDistrictId()) ){
                        throw new CustomException("PERMANENT ADDRESS:DISTRICT  IS INVALID", "The District name " +
                        addressInfo.getPermanentAddress().getDistrictId() +" is invalid");  
                    } 
                }
                if ((deathdtls.getAddressInfo().getPermanentAddress().getLocationType()==CrDeathConstants.ADDRESS_INSIDE_INDIA)){
                    if(StringUtils.isEmpty(addressInfo.getPermanentAddress().getDistrictId()) ){
                        throw new CustomException("PERMANENT ADDRESS:DISTRICT  IS INVALID", "The District name " +
                        addressInfo.getPermanentAddress().getDistrictId() +" is invalid");  
                    } 
                    if(StringUtils.isEmpty(addressInfo.getPermanentAddress().getStateId()) ){
                        throw new CustomException("PERMANENT ADDRESS:STATE  IS INVALID", "The state name " +
                        addressInfo.getPermanentAddress().getDistrictId() +" is invalid");  
                    } 
                    if(StringUtils.isEmpty(addressInfo.getPermanentAddress().getPostofficeNameEn()) || StringUtils.isEmpty(addressInfo.getPermanentAddress().getPostofficeNameMl()) ){
                        throw new CustomException("PERMANENT ADDRESS:POSTOFFICE NAME  IS INVALID", "The post office name " +
                        addressInfo.getPermanentAddress().getPostofficeNameEn() + " or " + addressInfo.getPermanentAddress().getPostofficeNameMl()+" is invalid");  
                    } 
                }
                if ((deathdtls.getAddressInfo().getPermanentAddress().getLocationType()==CrDeathConstants.ADDRESS_OUTSIDE_INDIA)){
                    if(StringUtils.isEmpty(addressInfo.getPermanentAddress().getCountryId()) ){
                        throw new CustomException("PERMANENT ADDRESS:COUNTRY  IS INVALID", "The country name " +
                        addressInfo.getPermanentAddress().getCountryId() +" is invalid");  
                    }   
                    if(StringUtils.isEmpty(addressInfo.getPermanentAddress().getHoueNameEn()) || StringUtils.isEmpty(addressInfo.getPermanentAddress().getHoueNameMl()) ){
                        throw new CustomException("PERMANENT ADDRESS:COUNTRY  IS INVALID", "The country name " +
                        addressInfo.getPermanentAddress().getCountryId() +" is invalid");  
                    } 
                    if(StringUtils.isEmpty(addressInfo.getPermanentAddress().getStreetNameEn()) || StringUtils.isEmpty(addressInfo.getPermanentAddress().getStreetNameEn()) ){
                        throw new CustomException("PERMANENT ADDRESS:ADDRESS  IS INVALID", "The country name " +
                        addressInfo.getPermanentAddress().getStreetNameEn() +"  or "+  addressInfo.getPermanentAddress().getStreetNameEn() +  "is invalid");  
                    } 
                }
            }   
            //DECEASED IDENTIFIED END
            //STATISTICAL DETAILS VALIDATION
            if (statisticalInfo.getSmokingType()==CrDeathConstants.VALUE_TRUE){
                if((statisticalInfo.getSmokingNumYears()<=0)){
                    throw new CustomException("STATISTICAL DETAILS:", "The number of  years of smoking " +
                    statisticalInfo.getSmokingNumYears() +" is invalid");  
                }  
            } 
            if (statisticalInfo.getAlcoholType()==CrDeathConstants.VALUE_TRUE){
                if((statisticalInfo.getAlcoholNumYears()<=0)){
                    throw new CustomException("STATISTICAL DETAILS:", "The number of  years of alcohol " +
                    statisticalInfo.getAlcoholNumYears() +" is invalid");  
                }  
            }
            if (statisticalInfo.getArecanutType()==CrDeathConstants.VALUE_TRUE){
                if((statisticalInfo.getArecanutNumYears()<=0)){
                    throw new CustomException("STATISTICAL DETAILS:", "The number of  years of arecanut " +
                    statisticalInfo.getArecanutNumYears() +" is invalid");  
                }  
            }
            if (statisticalInfo.getTobaccoType()==CrDeathConstants.VALUE_TRUE){
                if((statisticalInfo.getTobaccoNumYears()<=0)){
                    throw new CustomException("STATISTICAL DETAILS:", "The number of  years of tobacco " +
                    statisticalInfo.getTobaccoNumYears() +" is invalid");  
                }  
            }

        }
      
        });
    }


        public static boolean isTimeStampValid(String inputString){
            SimpleDateFormat format = new java.text.SimpleDateFormat("dd/mm/yyyy");
            try{
                format.parse(inputString);
                return true;
                }
            catch(ParseException e)
                {
                    return false;
                }
            }

    
    //UPDATE
    /**
     * Validate applicant personal update request.
     *
     * @param request the
     *                {@link CrDeathDtlRequest
     *                ApplicantPersonalRequest}
     */
    public void validateUpdate(CrDeathDtlRequest request, List<CrDeathDtl> searchResult) {
        List<CrDeathDtl> deathdetails = request.getDeathCertificateDtls();

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
        validateCommonFields( request);
    }
//UPDATE END

}
