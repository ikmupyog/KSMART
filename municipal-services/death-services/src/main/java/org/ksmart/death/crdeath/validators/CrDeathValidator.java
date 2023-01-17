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
import org.ksmart.death.crdeath.web.models.CrDeathDtl;
import org.ksmart.death.crdeath.web.models.CrDeathDtlRequest;
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
        validateHOMEFields( request);
        
    }
    //Jasmine on 13.01.2022
    public void validateCommonFields(CrDeathDtlRequest request) {
      
        List<CrDeathDtl> deathApplication = request.getDeathCertificateDtls();
        deathApplication
        .forEach(deathdtls -> {
            //getDeathDateUnavailabl=0 ie death date is available
            if(deathdtls.getDeathDateUnavailable().equals(CrDeathConstants.VALUE_FALSE))
            {
   
                if(deathdtls.getDateOfDeath()>0){
                
                    errorMap.put("DEATH DATE IS INVALID", "The deceased death date" +
                    deathdtls.getDateOfDeath()+ " is invalid");
                }
          
        //         if(deathdtls.getDateOfDeath() != null){
        //             String deathDate=String.valueOf(deathdtls.getDateOfDeath()); 
        //             boolean validDate= isTimeStampValid(deathDate);
        //             System.out.println("validDate"+validDate);
        //                 if(validDate == false){
        //                     errorMap.put("DEATH DATE IS INVALID", "The deceased death date" +
        //                     request.getDeathCertificateDtls().get(0).getDateOfDeath()+ " is invalid");
        //                 } 
        // }

            }
            if(deathdtls.getDeathDateUnavailable().equals(CrDeathConstants.VALUE_TRUE)){
                if(deathdtls.getDateOfDeath1() > CrDeathConstants.VALUE_FALSE){                   
                    
                }
                else{
                    errorMap.put("DEATH DATE IS INVALID", "Death FromDate and death ToDate can't be null");
                }
            }

            if(StringUtils.isEmpty(deathdtls.getDeceasedFirstNameMl()) || (StringUtils.isEmpty(deathdtls.getDeceasedFirstNameEn()) )) { 
                    throw new CustomException("DECEASED NAME IS INVALID", "The deceased name can't be null");
            }

            if(StringUtils.isEmpty(deathdtls.getDeceasedGender()) ){
                throw new CustomException("DECEASED GENDER IS INVALID", "The deceased  gender" +
                deathdtls.getDeceasedGender()+ " is invalid");
                }

            // if(StringUtils.isEmpty(deathdtls.getDeceasedGender()) ){
            //         throw new CustomException("DECEASED GENDER IS INVALID", "The deceased  gender" +
            //         deathdtls.getDeceasedGender()+ " is invalid");
            //         }  
            if(deathdtls.getAge()<=0){
                throw new CustomException("DECEASED AGE IS INVALID", "The deceased  age" +
                deathdtls.getAge()+ " is invalid");
               }
               
            if(deathdtls.getMaleDependentUnavailable().equals(CrDeathConstants.VALUE_FALSE)){
                System.out.println("Hi-maledelValidation");
                if(deathdtls.getMaleDependentNameEn().isEmpty() || deathdtls.getMaleDependentNameMl().isEmpty() ){
                    errorMap.put("FATHER/HUSBAND NAME IS INVALID", "The father/husband name " +
                    deathdtls.getMaleDependentNameEn()+"or"+deathdtls.getMaleDependentNameMl()+ " is invalid");  
                } 
            } 
              

            // if(deathdtls.getMaleDependentUnavailable().equals(CrDeathConstants.VALUE_FALSE)){
            //     if(deathdtls.getMaleDependentNameEn() == null || deathdtls.getMaleDependentNameMl() == null ){
            //         errorMap.put("FATHER/HUSBAND NAME IS INVALID", "The father/husband name " +
            //         deathdtls.getMaleDependentNameEn()+"or"+deathdtls.getMaleDependentNameMl()+ " is invalid");  
            //     } 
            // }  
            // if(deathdtls.getFemaleDependentUnavailable().equals(CrDeathConstants.VALUE_FALSE)){
            //     if(deathdtls.getFemaleDependentNameEn() == null || deathdtls.getFemaleDependentNameMl() == null ){
            //         errorMap.put("MOTHER NAME IS INVALID", "The mother name " +
            //         deathdtls.getFemaleDependentNameEn()+"or"+deathdtls.getFemaleDependentNameMl()+ " is invalid");  
            //     } 
            // }

          
        });
    }

    public void validateHOMEFields(CrDeathDtlRequest request) {


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
    }
//UPDATE END

}
