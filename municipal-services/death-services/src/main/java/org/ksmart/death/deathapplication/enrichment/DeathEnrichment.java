package org.ksmart.death.deathapplication.enrichment;
import java.util.Arrays;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.tracer.model.CustomException;
import org.ksmart.death.common.repository.ServiceRequestRepository;
import org.ksmart.death.deathapplication.repository.DeathApplnRepository;
import org.ksmart.death.deathapplication.util.DeathConstants;
import org.ksmart.death.deathapplication.util.DeathMdmsUtil;
import org.ksmart.death.deathapplication.util.IDGenerator;
import org.ksmart.death.deathapplication.web.models.AuditDetails;
import org.ksmart.death.deathapplication.web.models.DeathAbandonedInformantDtls;
import org.ksmart.death.deathapplication.web.models.DeathAbandonedRequest;
import org.ksmart.death.deathapplication.web.models.DeathDtlRequest;
import org.ksmart.death.deathapplication.web.models.DeathFamilyInfo;
import org.ksmart.death.deathapplication.web.models.DeathDtl;
import org.ksmart.death.deathapplication.web.models.DeathAddressInfo;
import org.ksmart.death.deathapplication.web.models.DeathBasicInfo;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionBasicInfo;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionDtls;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionRequest;
import org.ksmart.death.deathapplication.web.models.DeathStatisticalInfo;
import org.ksmart.death.deathapplication.web.models.DeathInformantDtls;
import org.ksmart.death.deathapplication.web.models.DeathInitiatorDtls;
import org.ksmart.death.common.contract.EncryptionDecryptionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import com.jayway.jsonpath.JsonPath;

import lombok.extern.slf4j.Slf4j;

/**
     * Creates DeathEnrichment for UUID ,Audit details and IDGeneration
     * Rakhi S IKM
     * on 08.02.2023
     */
@Slf4j
@Component
public class DeathEnrichment implements BaseEnrichment{
    //Jasmine 16.02.2023
    private IDGenerator idGenerator;

    //Rakhi S on 08.02.2023
    @Autowired
	ServiceRequestRepository serviceRequestRepository;

    @Autowired
    DeathApplnRepository repository;

    @Autowired
    DeathMdmsUtil util;
    //Jasmine 8.02.2023
    @Autowired
    EncryptionDecryptionUtil encryptionDecryptionUtil;
    
    @Autowired
    public DeathEnrichment( IDGenerator idGenerator) {

        this.idGenerator = idGenerator;
    }

    //Rakhi S on 08.02.2023
    public void enrichCreate(DeathDtlRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        request.getDeathCertificateDtls()
               .forEach(deathdtls -> {
                deathdtls.getDeathBasicInfo().setId(UUID.randomUUID().toString());
                deathdtls.setDeathAuditDetails(auditDetails);                
                //Rakhi S on 09.02.2023 //Validation Jasmine 11.02.2023
                DeathAddressInfo  addressinfo = deathdtls.getDeathAddressInfo();
                if (addressinfo!=null){
                    addressinfo.setPresentAddrId(UUID.randomUUID().toString());
                    addressinfo.setPermanentAddrId(UUID.randomUUID().toString());
                }
                DeathStatisticalInfo  statisticalInfo = deathdtls.getDeathStatisticalInfo();
                if (statisticalInfo!=null){
                    statisticalInfo.setStatisticalId(UUID.randomUUID().toString()); 
                } 
                System.out.println("REQUEST"+request.getDeathCertificateDtls());
                //Jasmine informant and initiator 11.02.2023
                // DeathInformantDtls  informantInfo = deathdtls.getDeathInformantDtls();
                // if (informantInfo!=null){
                //     informantInfo.setInformantAddrId(UUID.randomUUID().toString());  
                // }
                // DeathInitiatorDtls  initiatorInfo = deathdtls.getDeathInitiatorDtls();
                // if (initiatorInfo!=null){
                //     initiatorInfo.setInitiatorAddrId(UUID.randomUUID().toString());  
                // }                  
                //Encryption Jasmine 10.02.2023
                // request.getDeathCertificateDtls().get(0)
                DeathBasicInfo deathBasicDtls =deathdtls.getDeathBasicInfo();
                DeathBasicInfo deathBasicEnc =  encryptionDecryptionUtil.encryptObject(deathBasicDtls, "BndDetail", DeathBasicInfo.class);
                deathBasicDtls.setDeceasedAadharNumber(deathBasicEnc.getDeceasedAadharNumber());
                DeathFamilyInfo deathFamilyDtls =deathdtls.getDeathFamilyInfo() ;
                DeathFamilyInfo deathFamilyEnc = encryptionDecryptionUtil.encryptObject(deathFamilyDtls, "BndDetail", DeathFamilyInfo.class);
                deathFamilyDtls.setFatherAadharNo(deathFamilyEnc.getFatherAadharNo());
                deathFamilyDtls.setMotherAadharNo(deathFamilyEnc.getMotherAadharNo());
                deathFamilyDtls.setSpouseAadhaar(deathFamilyEnc.getSpouseAadhaar());
                DeathInformantDtls deathInformant =deathdtls.getDeathInformantDtls() ;
                if (deathInformant!=null){
                    DeathInformantDtls deathInformantEnc = encryptionDecryptionUtil.encryptObject(deathInformant, "BndDetail", DeathInformantDtls.class);
                    deathInformant.setInformantAadharNo(deathInformantEnc.getInformantAadharNo());
                }
                DeathInitiatorDtls deathInitiator =deathdtls.getDeathInitiatorDtls() ;
                if (deathInitiator!=null){
                        DeathInitiatorDtls deathInitiatorEnc = encryptionDecryptionUtil.encryptObject(deathInitiator, "BndDetail", DeathInitiatorDtls.class);
                        deathInitiator.setInitiatorAadhaar(deathInitiatorEnc.getInitiatorAadhaar());
                }
            });
        }  
    //Rakhi S on 08.02.2023 ACK no formating
    public void setACKNumber(DeathDtlRequest request) {
        RequestInfo requestInfo = request.getRequestInfo();
        int Year = Calendar.getInstance().get(Calendar.YEAR) ;
        Long currentTime = Long.valueOf(System.currentTimeMillis());
        String tenantId = requestInfo.getUserInfo().getTenantId();
        List<Map<String, Object>> ackNoDetails = repository.getDeathACKDetails(tenantId, Year);

        request.getDeathCertificateDtls()
        .forEach(deathdtls -> {    
               String IDGenerated = null;
                IDGenerated = idGenerator.setIDGenerator(request, DeathConstants.FUN_MODULE_NEWAPPLN,
                                DeathConstants.ACK_NUMBER_CAPTION);
            Long ackNoId=null;
            String inputString = IDGenerated; 
            String[] ackNoIdArray= inputString.split("-");
            for (int i=0; i < 1; i++){
                ackNoId=Long.parseLong(ackNoIdArray[1]);
            }
                deathdtls.getDeathBasicInfo().setDeathACKNo(IDGenerated);
                deathdtls.getDeathBasicInfo().setAckNoID(ackNoId);
                deathdtls.getDeathBasicInfo().setApplicationDate(currentTime);
        });

    }
    //Rakhi S ikm on 08.02.2023
    private Map<String, List<String>> getAttributeValues(Object mdmsdata){
        List<String> modulepaths = Arrays.asList(DeathConstants.TENANT_JSONPATH);
        final Map<String, List<String>> mdmsResMap = new HashMap<>();
       
        modulepaths.forEach(modulepath -> {
            try {
                mdmsResMap.putAll(JsonPath.read(mdmsdata,modulepath));
                log.error("jsonpath1"+JsonPath.read(mdmsdata,modulepath));
            } catch (Exception e) {
                log.error("Error while fetching MDMS data",e);
                throw new CustomException(DeathConstants.INVALID_TENANT_ID_MDMS_KEY,
                    DeathConstants.INVALID_TENANT_ID_MDMS_MSG);
            }
           
        });
        // System.out.println("mdmsResMap"+mdmsResMap);
        return mdmsResMap;
    }
        //UPDATE  BEGIN Jasmine 8.02.2023
        public void enrichUpdate(DeathDtlRequest request) {

            RequestInfo requestInfo = request.getRequestInfo();
            User userInfo = requestInfo.getUserInfo();
            AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
//Jasmine Encryption 10.02.2023
             request.getDeathCertificateDtls()
                     .forEach(deathDtls -> {
                        DeathBasicInfo deathBasicDtls = deathDtls.getDeathBasicInfo();
                        DeathBasicInfo deathBasicEnc =  encryptionDecryptionUtil.encryptObject(deathBasicDtls, "BndDetail", DeathBasicInfo.class);
                        deathBasicDtls.setDeceasedAadharNumber(deathBasicEnc.getDeceasedAadharNumber());
                        DeathFamilyInfo deathFamilyDtls =deathDtls.getDeathFamilyInfo() ;
                        DeathFamilyInfo deathFamilyEnc = encryptionDecryptionUtil.encryptObject(deathFamilyDtls, "BndDetail", DeathFamilyInfo.class);
                        deathFamilyDtls.setFatherAadharNo(deathFamilyEnc.getFatherAadharNo());
                        deathFamilyDtls.setMotherAadharNo(deathFamilyEnc.getMotherAadharNo());
                        deathFamilyDtls.setSpouseAadhaar(deathFamilyEnc.getSpouseAadhaar());
                        DeathInformantDtls deathInformant =deathDtls.getDeathInformantDtls() ;
                        if (deathInformant!=null){
                        DeathInformantDtls deathInformantEnc = encryptionDecryptionUtil.encryptObject(deathInformant, "BndDetail", DeathInformantDtls.class);
                        deathInformant.setInformantAadharNo(deathInformantEnc.getInformantAadharNo());
                        }
                        DeathInitiatorDtls deathInitiator =deathDtls.getDeathInitiatorDtls() ;
                        if (deathInitiator!=null){
                        DeathInitiatorDtls deathInitiatorEnc = encryptionDecryptionUtil.encryptObject(deathInitiator, "BndDetail", DeathInitiatorDtls.class);
                        deathInitiator.setInitiatorAadhaar(deathInitiatorEnc.getInitiatorAadhaar());
                        }
                        deathDtls.setDeathAuditDetails(auditDetails);
                    } );        
        }//UPDATE END

//Rakhi S on 16.02.2023
        public void setPresentAddress(DeathDtlRequest request) {
            request.getDeathCertificateDtls()
                    .forEach(death -> {
                    if (death.getDeathAddressInfo() != null) {

                     if (death.getDeathAddressInfo().getPresentaddressCountry() != null && death.getDeathAddressInfo().getPresentaddressStateName() != null) {
                        if (death.getDeathAddressInfo().getPresentaddressCountry().contains(DeathConstants.COUNTRY_CODE)) {
                            if(death.getDeathAddressInfo().getPresentaddressStateName().contains(DeathConstants.STATE_CODE_SMALL)) {

                                death.getDeathAddressInfo().setPresentAddrCountryId(death.getDeathAddressInfo().getPresentaddressCountry());    
                                death.getDeathAddressInfo().setPresentAddrStateId(death.getDeathAddressInfo().getPresentaddressStateName());    
                                death.getDeathAddressInfo().setPresentAddrDistrictId(death.getDeathAddressInfo().getPresentInsideKeralaDistrict());
                                death.getDeathAddressInfo().setPresentAddrVillageId(death.getDeathAddressInfo().getPresentInsideKeralaVillage());
                                death.getDeathAddressInfo().setPresentAddrTalukId(death.getDeathAddressInfo().getPresentInsideKeralaTaluk());
                                death.getDeathAddressInfo().setPresentAddrWardId(death.getDeathAddressInfo().getPresentWardNo());
                                death.getDeathAddressInfo().setPresentAddrPostofficeId(death.getDeathAddressInfo().getPresentInsideKeralaPostOffice());
                                death.getDeathAddressInfo().setPresentAddrPincode(death.getDeathAddressInfo().getPresentInsideKeralaPincode());
                                death.getDeathAddressInfo().setPresentAddrLocalityEn(death.getDeathAddressInfo().getPresentInsideKeralaLocalityNameEn());
                                death.getDeathAddressInfo().setPresentAddrLocalityMl(death.getDeathAddressInfo().getPresentInsideKeralaLocalityNameMl());
                                death.getDeathAddressInfo().setPresentAddrStreetNameEn(death.getDeathAddressInfo().getPresentInsideKeralaStreetNameEn());
                                death.getDeathAddressInfo().setPresentAddrStreetNameMl(death.getDeathAddressInfo().getPresentInsideKeralaStreetNameMl());
                                death.getDeathAddressInfo().setPresentAddrHoueNameEn(death.getDeathAddressInfo().getPresentInsideKeralaHouseNameEn());
                                death.getDeathAddressInfo().setPresentAddrHoueNameMl(death.getDeathAddressInfo().getPresentInsideKeralaHouseNameMl());
                            } else{

                                death.getDeathAddressInfo().setPresentAddrCountryId(death.getDeathAddressInfo().getPresentaddressCountry());
                                death.getDeathAddressInfo().setPresentAddrStateId(death.getDeathAddressInfo().getPresentaddressStateName());    
                                death.getDeathAddressInfo().setPresentAddrDistrictId(death.getDeathAddressInfo().getPresentOutsideKeralaDistrict());
                                death.getDeathAddressInfo().setPresentAddrCityOrVillageEn(death.getDeathAddressInfo().getPresentOutsideKeralaVillageName());
                                death.getDeathAddressInfo().setPresentAddrTownOrVillage(death.getDeathAddressInfo().getPresentOutsideKeralaCityVilgeEn());
                                death.getDeathAddressInfo().setPresentAddrTalukId(death.getDeathAddressInfo().getPresentOutsideKeralaTalukName());
                                death.getDeathAddressInfo().setPresentAddrPincode(death.getDeathAddressInfo().getPresentOutsideKeralaPincode());
                                death.getDeathAddressInfo().setPresentAddrLocalityEn(death.getDeathAddressInfo().getPresentOutsideKeralaLocalityNameEn());
                                death.getDeathAddressInfo().setPresentAddrLocalityMl(death.getDeathAddressInfo().getPresentOutsideKeralaLocalityNameMl());
                                death.getDeathAddressInfo().setPresentAddrStreetNameEn(death.getDeathAddressInfo().getPresentOutsideKeralaStreetNameEn());
                                death.getDeathAddressInfo().setPresentAddrStreetNameMl(death.getDeathAddressInfo().getPresentOutsideKeralaStreetNameMl());
                                death.getDeathAddressInfo().setPresentAddrHoueNameEn(death.getDeathAddressInfo().getPresentOutsideKeralaHouseNameEn());
                                death.getDeathAddressInfo().setPresentAddrHoueNameMl(death.getDeathAddressInfo().getPresentOutsideKeralaHouseNameMl());
                               
                            }
                        } else{

                            if (death.getDeathAddressInfo().getPresentOutSideCountry() != null) {
                                death.getDeathAddressInfo().setPresentAddrCountryId(death.getDeathAddressInfo().getPresentOutSideCountry());
                                death.getDeathAddressInfo().setPresentOutSideIndiaProvinceEn(death.getDeathAddressInfo().getPresentOutSideIndiaProvinceEn());
                                death.getDeathAddressInfo().setPresentOutSideIndiaProvinceMl(death.getDeathAddressInfo().getPresentOutSideIndiaProvinceMl());
                                death.getDeathAddressInfo().setPresentAddrTownOrVillage(death.getDeathAddressInfo().getPresentOutSideIndiaadrsVillage());
                                death.getDeathAddressInfo().setPresentAddrCityOrVillageEn(death.getDeathAddressInfo().getPresentOutSideIndiaadrsCityTown());
                                death.getDeathAddressInfo().setPresentAddrHoueNameEn(death.getDeathAddressInfo().getPresentOutSideIndiaAdressEn());
                                death.getDeathAddressInfo().setPresentAddrHoueNameMl(death.getDeathAddressInfo().getPresentOutSideIndiaAdressMl());
                                death.getDeathAddressInfo().setPresentAddrStreetNameEn(death.getDeathAddressInfo().getPresentOutSideIndiaAdressEnB());
                                death.getDeathAddressInfo().setPresentAddrStreetNameMl(death.getDeathAddressInfo().getPresentOutSideIndiaAdressMlB()); 
                            }
                        }
                    }
                }
             });
        }
        //Rakhi S on 16.02.2023
        public void setPermanentAddress(DeathDtlRequest request) {
            request.getDeathCertificateDtls()
                    .forEach(death -> {
                    if (death.getDeathAddressInfo() != null) {
                        death.getDeathAddressInfo().setIsPrsentAddressInt(death.getDeathAddressInfo().getIsPrsentAddress() == true ? 1 : 0);

                        if(death.getDeathAddressInfo().getIsPrsentAddress()){
                            death.getDeathAddressInfo().setPermtaddressCountry(death.getDeathAddressInfo().getPresentaddressCountry());
                            death.getDeathAddressInfo().setPermtaddressStateName(death.getDeathAddressInfo().getPresentaddressStateName());                            
                        }
                        if (death.getDeathAddressInfo().getPermtaddressCountry() != null && death.getDeathAddressInfo().getPermtaddressStateName() != null) {

                            if (death.getDeathAddressInfo().getPermtaddressCountry().contains(DeathConstants.COUNTRY_CODE)) {
                                if (death.getDeathAddressInfo().getPermtaddressStateName().contains(DeathConstants.STATE_CODE_SMALL)) {

                                    death.getDeathAddressInfo().setPermanentAddrCountryId(death.getDeathAddressInfo().getPermtaddressCountry());
                                    death.getDeathAddressInfo().setPermanentAddrStateId(death.getDeathAddressInfo().getPermtaddressStateName());
                                    death.getDeathAddressInfo().setPermanentAddrDistrictId(death.getDeathAddressInfo().getPermntInKeralaAdrDistrict());
                                    death.getDeathAddressInfo().setPermanentAddrVillageId(death.getDeathAddressInfo().getPermntInKeralaAdrVillage());
                                    death.getDeathAddressInfo().setPermanentAddrTalukId(death.getDeathAddressInfo().getPermntInKeralaAdrTaluk());
                                    death.getDeathAddressInfo().setPermanentAddrLocalityEn(death.getDeathAddressInfo().getPermntInKeralaAdrLocalityNameEn());
                                    death.getDeathAddressInfo().setPermanentAddrLocalityMl(death.getDeathAddressInfo().getPermntInKeralaAdrLocalityNameMl());
                                    death.getDeathAddressInfo().setPermanentAddrStreetNameEn(death.getDeathAddressInfo().getPermntInKeralaAdrStreetNameEn());
                                    death.getDeathAddressInfo().setPermanentAddrStreetNameMl(death.getDeathAddressInfo().getPermntInKeralaAdrStreetNameMl());
                                    death.getDeathAddressInfo().setPermanentAddrHoueNameEn(death.getDeathAddressInfo().getPermntInKeralaAdrHouseNameEn());
                                    death.getDeathAddressInfo().setPermanentAddrHoueNameMl(death.getDeathAddressInfo().getPermntInKeralaAdrHouseNameMl());
                                    death.getDeathAddressInfo().setPermanentAddrPincode(death.getDeathAddressInfo().getPermntInKeralaAdrPincode());
                                    death.getDeathAddressInfo().setPermanentAddrWardId(death.getDeathAddressInfo().getPermntInKeralaWardNo());
                                    death.getDeathAddressInfo().setPermanentAddrPostofficeId(death.getDeathAddressInfo().getPermntInKeralaAdrPostOffice());
                                }else{
                                    death.getDeathAddressInfo().setPermanentAddrCountryId(death.getDeathAddressInfo().getPermtaddressCountry());
                                    death.getDeathAddressInfo().setPermanentAddrStateId(death.getDeathAddressInfo().getPermtaddressStateName());
                                    death.getDeathAddressInfo().setPermanentAddrCityOrVillageEn(death.getDeathAddressInfo().getPermntOutsideKeralaCityVilgeEn());
                                    death.getDeathAddressInfo().setPermanentAddrTownOrVillage(death.getDeathAddressInfo().getPermntOutsideKeralaVillage());
                                    death.getDeathAddressInfo().setPermanentAddrDistrictId(death.getDeathAddressInfo().getPermntOutsideKeralaDistrict());
                                    death.getDeathAddressInfo().setPresentAddrTalukId(death.getDeathAddressInfo().getPermntOutsideKeralaTaluk());
                                    death.getDeathAddressInfo().setPermanentAddrLocalityEn(death.getDeathAddressInfo().getPermntOutsideKeralaLocalityNameEn());
                                    death.getDeathAddressInfo().setPermanentAddrLocalityMl(death.getDeathAddressInfo().getPermntOutsideKeralaLocalityNameMl());
                                    death.getDeathAddressInfo().setPermanentAddrStreetNameEn(death.getDeathAddressInfo().getPermntOutsideKeralaStreetNameEn());
                                    death.getDeathAddressInfo().setPermanentAddrStreetNameMl(death.getDeathAddressInfo().getPermntOutsideKeralaStreetNameMl());
                                    death.getDeathAddressInfo().setPermanentAddrHoueNameEn(death.getDeathAddressInfo().getPermntOutsideKeralaHouseNameEn());
                                    death.getDeathAddressInfo().setPermanentAddrHoueNameMl(death.getDeathAddressInfo().getPermntOutsideKeralaHouseNameMl());
                                    death.getDeathAddressInfo().setPermanentAddrPincode(death.getDeathAddressInfo().getPermntOutsideKeralaPincode());
                                }
        
                            } else{
                                if (death.getDeathAddressInfo().getPermntOutsideIndiaCountry() != null) {
                                    death.getDeathAddressInfo().setPermanentAddrCountryId(death.getDeathAddressInfo().getPermntOutsideIndiaCountry());
                                    death.getDeathAddressInfo().setPermanentAddrTownOrVillage(death.getDeathAddressInfo().getPermntOutsideIndiaVillage());
                                    death.getDeathAddressInfo().setPermanentAddrCityOrVillageEn(death.getDeathAddressInfo().getPermntOutsideIndiaCityTown());
                                    death.getDeathAddressInfo().setPermanentAddrHoueNameEn(death.getDeathAddressInfo().getPermntOutsideIndiaLineoneEn());
                                    death.getDeathAddressInfo().setPermanentAddrHoueNameMl(death.getDeathAddressInfo().getPermntOutsideIndiaLineoneMl());
                                    death.getDeathAddressInfo().setPermanentAddrStreetNameEn(death.getDeathAddressInfo().getPermntOutsideIndiaLinetwoEn());
                                    death.getDeathAddressInfo().setPermanentAddrStreetNameMl(death.getDeathAddressInfo().getPermntOutsideIndiaLinetwoMl()); 
                                }
                            }
                        }
                    }
                });
        }

        //Jasmine 03.03.2023
        public void setCorrectionPresentAddress(DeathCorrectionRequest request) {
            request.getDeathCorrection()
                    .forEach(death -> {
                    if (death.getDeathCorrAddressInfo() != null) {

                     if (death.getDeathCorrAddressInfo().getPresentaddressCountry() != null && death.getDeathCorrAddressInfo().getPresentaddressStateName() != null) {
                        if (death.getDeathCorrAddressInfo().getPresentaddressCountry().contains(DeathConstants.COUNTRY_CODE)) {
                            if(death.getDeathCorrAddressInfo().getPresentaddressStateName().contains(DeathConstants.STATE_CODE_SMALL)) {

                                death.getDeathCorrAddressInfo().setPresentAddrCountryId(death.getDeathCorrAddressInfo().getPresentaddressCountry());    
                                death.getDeathCorrAddressInfo().setPresentAddrStateId(death.getDeathCorrAddressInfo().getPresentaddressStateName());    
                                death.getDeathCorrAddressInfo().setPresentAddrDistrictId(death.getDeathCorrAddressInfo().getPresentInsideKeralaDistrict());
                                death.getDeathCorrAddressInfo().setPresentAddrVillageId(death.getDeathCorrAddressInfo().getPresentInsideKeralaVillage());
                                death.getDeathCorrAddressInfo().setPresentAddrTalukId(death.getDeathCorrAddressInfo().getPresentInsideKeralaTaluk());
                                death.getDeathCorrAddressInfo().setPresentAddrWardId(death.getDeathCorrAddressInfo().getPresentWardNo());
                                death.getDeathCorrAddressInfo().setPresentAddrPostofficeId(death.getDeathCorrAddressInfo().getPresentInsideKeralaPostOffice());
                                death.getDeathCorrAddressInfo().setPresentAddrPincode(death.getDeathCorrAddressInfo().getPresentInsideKeralaPincode());
                                death.getDeathCorrAddressInfo().setPresentAddrLocalityEn(death.getDeathCorrAddressInfo().getPresentInsideKeralaLocalityNameEn());
                                death.getDeathCorrAddressInfo().setPresentAddrLocalityMl(death.getDeathCorrAddressInfo().getPresentInsideKeralaLocalityNameMl());
                                death.getDeathCorrAddressInfo().setPresentAddrStreetNameEn(death.getDeathCorrAddressInfo().getPresentInsideKeralaStreetNameEn());
                                death.getDeathCorrAddressInfo().setPresentAddrStreetNameMl(death.getDeathCorrAddressInfo().getPresentInsideKeralaStreetNameMl());
                                death.getDeathCorrAddressInfo().setPresentAddrHoueNameEn(death.getDeathCorrAddressInfo().getPresentInsideKeralaHouseNameEn());
                                death.getDeathCorrAddressInfo().setPresentAddrHoueNameMl(death.getDeathCorrAddressInfo().getPresentInsideKeralaHouseNameMl());
                            } else{

                                death.getDeathCorrAddressInfo().setPresentAddrCountryId(death.getDeathCorrAddressInfo().getPresentaddressCountry());
                                death.getDeathCorrAddressInfo().setPresentAddrStateId(death.getDeathCorrAddressInfo().getPresentaddressStateName());    
                                death.getDeathCorrAddressInfo().setPresentAddrDistrictId(death.getDeathCorrAddressInfo().getPresentOutsideKeralaDistrict());
                                death.getDeathCorrAddressInfo().setPresentAddrCityOrVillageEn(death.getDeathCorrAddressInfo().getPresentOutsideKeralaVillageName());
                                death.getDeathCorrAddressInfo().setPresentAddrTownOrVillage(death.getDeathCorrAddressInfo().getPresentOutsideKeralaCityVilgeEn());
                                death.getDeathCorrAddressInfo().setPresentAddrTalukId(death.getDeathCorrAddressInfo().getPresentOutsideKeralaTalukName());
                                death.getDeathCorrAddressInfo().setPresentAddrPincode(death.getDeathCorrAddressInfo().getPresentOutsideKeralaPincode());
                                death.getDeathCorrAddressInfo().setPresentAddrLocalityEn(death.getDeathCorrAddressInfo().getPresentOutsideKeralaLocalityNameEn());
                                death.getDeathCorrAddressInfo().setPresentAddrLocalityMl(death.getDeathCorrAddressInfo().getPresentOutsideKeralaLocalityNameMl());
                                death.getDeathCorrAddressInfo().setPresentAddrStreetNameEn(death.getDeathCorrAddressInfo().getPresentOutsideKeralaStreetNameEn());
                                death.getDeathCorrAddressInfo().setPresentAddrStreetNameMl(death.getDeathCorrAddressInfo().getPresentOutsideKeralaStreetNameMl());
                                death.getDeathCorrAddressInfo().setPresentAddrHoueNameEn(death.getDeathCorrAddressInfo().getPresentOutsideKeralaHouseNameEn());
                                death.getDeathCorrAddressInfo().setPresentAddrHoueNameMl(death.getDeathCorrAddressInfo().getPresentOutsideKeralaHouseNameMl());
                               
                            }
                        } else{

                            if (death.getDeathCorrAddressInfo().getPresentOutSideCountry() != null) {
                                death.getDeathCorrAddressInfo().setPresentAddrCountryId(death.getDeathCorrAddressInfo().getPresentOutSideCountry());
                                death.getDeathCorrAddressInfo().setPresentOutSideIndiaProvinceEn(death.getDeathCorrAddressInfo().getPresentOutSideIndiaProvinceEn());
                                death.getDeathCorrAddressInfo().setPresentOutSideIndiaProvinceMl(death.getDeathCorrAddressInfo().getPresentOutSideIndiaProvinceMl());
                                death.getDeathCorrAddressInfo().setPresentAddrTownOrVillage(death.getDeathCorrAddressInfo().getPresentOutSideIndiaadrsVillage());
                                death.getDeathCorrAddressInfo().setPresentAddrCityOrVillageEn(death.getDeathCorrAddressInfo().getPresentOutSideIndiaadrsCityTown());
                                death.getDeathCorrAddressInfo().setPresentAddrHoueNameEn(death.getDeathCorrAddressInfo().getPresentOutSideIndiaAdressEn());
                                death.getDeathCorrAddressInfo().setPresentAddrHoueNameMl(death.getDeathCorrAddressInfo().getPresentOutSideIndiaAdressMl());
                                death.getDeathCorrAddressInfo().setPresentAddrStreetNameEn(death.getDeathCorrAddressInfo().getPresentOutSideIndiaAdressEnB());
                                death.getDeathCorrAddressInfo().setPresentAddrStreetNameMl(death.getDeathCorrAddressInfo().getPresentOutSideIndiaAdressMlB()); 
                            }
                        }
                    }
                }
             });
        }
        public void setCorrectionPermanentAddress(DeathCorrectionRequest request) {
            request.getDeathCorrection()
                    .forEach(death -> {
                    if (death.getDeathCorrAddressInfo() != null) {
                        death.getDeathCorrAddressInfo().setIsPrsentAddressInt(death.getDeathCorrAddressInfo().getIsPrsentAddress() == true ? 1 : 0);

                        if(death.getDeathCorrAddressInfo().getIsPrsentAddress()){
                            death.getDeathCorrAddressInfo().setPermtaddressCountry(death.getDeathCorrAddressInfo().getPresentaddressCountry());
                            death.getDeathCorrAddressInfo().setPermtaddressStateName(death.getDeathCorrAddressInfo().getPresentaddressStateName());                            
                        }
                        if (death.getDeathCorrAddressInfo().getPermtaddressCountry() != null && death.getDeathCorrAddressInfo().getPermtaddressStateName() != null) {

                            if (death.getDeathCorrAddressInfo().getPermtaddressCountry().contains(DeathConstants.COUNTRY_CODE)) {
                                if (death.getDeathCorrAddressInfo().getPermtaddressStateName().contains(DeathConstants.STATE_CODE_SMALL)) {

                                    death.getDeathCorrAddressInfo().setPermanentAddrCountryId(death.getDeathCorrAddressInfo().getPermtaddressCountry());
                                    death.getDeathCorrAddressInfo().setPermanentAddrStateId(death.getDeathCorrAddressInfo().getPermtaddressStateName());
                                    death.getDeathCorrAddressInfo().setPermanentAddrDistrictId(death.getDeathCorrAddressInfo().getPermntInKeralaAdrDistrict());
                                    death.getDeathCorrAddressInfo().setPermanentAddrVillageId(death.getDeathCorrAddressInfo().getPermntInKeralaAdrVillage());
                                    death.getDeathCorrAddressInfo().setPermanentAddrTalukId(death.getDeathCorrAddressInfo().getPermntInKeralaAdrTaluk());
                                    death.getDeathCorrAddressInfo().setPermanentAddrLocalityEn(death.getDeathCorrAddressInfo().getPermntInKeralaAdrLocalityNameEn());
                                    death.getDeathCorrAddressInfo().setPermanentAddrLocalityMl(death.getDeathCorrAddressInfo().getPermntInKeralaAdrLocalityNameMl());
                                    death.getDeathCorrAddressInfo().setPermanentAddrStreetNameEn(death.getDeathCorrAddressInfo().getPermntInKeralaAdrStreetNameEn());
                                    death.getDeathCorrAddressInfo().setPermanentAddrStreetNameMl(death.getDeathCorrAddressInfo().getPermntInKeralaAdrStreetNameMl());
                                    death.getDeathCorrAddressInfo().setPermanentAddrHoueNameEn(death.getDeathCorrAddressInfo().getPermntInKeralaAdrHouseNameEn());
                                    death.getDeathCorrAddressInfo().setPermanentAddrHoueNameMl(death.getDeathCorrAddressInfo().getPermntInKeralaAdrHouseNameMl());
                                    death.getDeathCorrAddressInfo().setPermanentAddrPincode(death.getDeathCorrAddressInfo().getPermntInKeralaAdrPincode());
                                    death.getDeathCorrAddressInfo().setPermanentAddrWardId(death.getDeathCorrAddressInfo().getPermntInKeralaWardNo());
                                    death.getDeathCorrAddressInfo().setPermanentAddrPostofficeId(death.getDeathCorrAddressInfo().getPermntInKeralaAdrPostOffice());
                                }else{
                                    death.getDeathCorrAddressInfo().setPermanentAddrCountryId(death.getDeathCorrAddressInfo().getPermtaddressCountry());
                                    death.getDeathCorrAddressInfo().setPermanentAddrStateId(death.getDeathCorrAddressInfo().getPermtaddressStateName());
                                    death.getDeathCorrAddressInfo().setPermanentAddrCityOrVillageEn(death.getDeathCorrAddressInfo().getPermntOutsideKeralaCityVilgeEn());
                                    death.getDeathCorrAddressInfo().setPermanentAddrTownOrVillage(death.getDeathCorrAddressInfo().getPermntOutsideKeralaVillage());
                                    death.getDeathCorrAddressInfo().setPermanentAddrDistrictId(death.getDeathCorrAddressInfo().getPermntOutsideKeralaDistrict());
                                    death.getDeathCorrAddressInfo().setPresentAddrTalukId(death.getDeathCorrAddressInfo().getPermntOutsideKeralaTaluk());
                                    death.getDeathCorrAddressInfo().setPermanentAddrLocalityEn(death.getDeathCorrAddressInfo().getPermntOutsideKeralaLocalityNameEn());
                                    death.getDeathCorrAddressInfo().setPermanentAddrLocalityMl(death.getDeathCorrAddressInfo().getPermntOutsideKeralaLocalityNameMl());
                                    death.getDeathCorrAddressInfo().setPermanentAddrStreetNameEn(death.getDeathCorrAddressInfo().getPermntOutsideKeralaStreetNameEn());
                                    death.getDeathCorrAddressInfo().setPermanentAddrStreetNameMl(death.getDeathCorrAddressInfo().getPermntOutsideKeralaStreetNameMl());
                                    death.getDeathCorrAddressInfo().setPermanentAddrHoueNameEn(death.getDeathCorrAddressInfo().getPermntOutsideKeralaHouseNameEn());
                                    death.getDeathCorrAddressInfo().setPermanentAddrHoueNameMl(death.getDeathCorrAddressInfo().getPermntOutsideKeralaHouseNameMl());
                                    death.getDeathCorrAddressInfo().setPermanentAddrPincode(death.getDeathCorrAddressInfo().getPermntOutsideKeralaPincode());
                                }
        
                            } else{
                                if (death.getDeathCorrAddressInfo().getPermntOutsideIndiaCountry() != null) {
                                    death.getDeathCorrAddressInfo().setPermanentAddrCountryId(death.getDeathCorrAddressInfo().getPermntOutsideIndiaCountry());
                                    death.getDeathCorrAddressInfo().setPermanentAddrTownOrVillage(death.getDeathCorrAddressInfo().getPermntOutsideIndiaVillage());
                                    death.getDeathCorrAddressInfo().setPermanentAddrCityOrVillageEn(death.getDeathCorrAddressInfo().getPermntOutsideIndiaCityTown());
                                    death.getDeathCorrAddressInfo().setPermanentAddrHoueNameEn(death.getDeathCorrAddressInfo().getPermntOutsideIndiaLineoneEn());
                                    death.getDeathCorrAddressInfo().setPermanentAddrHoueNameMl(death.getDeathCorrAddressInfo().getPermntOutsideIndiaLineoneMl());
                                    death.getDeathCorrAddressInfo().setPermanentAddrStreetNameEn(death.getDeathCorrAddressInfo().getPermntOutsideIndiaLinetwoEn());
                                    death.getDeathCorrAddressInfo().setPermanentAddrStreetNameMl(death.getDeathCorrAddressInfo().getPermntOutsideIndiaLinetwoMl()); 
                                }
                            }
                        }
                    }
                });
        }
        public void setCorrectionACKNumber(DeathCorrectionRequest request) {
            RequestInfo requestInfo = request.getRequestInfo();
            int Year = Calendar.getInstance().get(Calendar.YEAR) ;
            Long currentTime = Long.valueOf(System.currentTimeMillis());
            String tenantId = requestInfo.getUserInfo().getTenantId();
            List<Map<String, Object>> ackNoDetails = repository.getDeathACKDetails(tenantId, Year);
    
            request.getDeathCorrection()
            .forEach(deathdtls -> {    
                String IDGenerated = null;
                    IDGenerated = idGenerator.setIDGeneratorCorrection(request, DeathConstants.FUN_MODULE_NEWAPPLN,
                                    DeathConstants.ACK_NUMBER_CAPTION);
                Long ackNoId=null;
                String inputString = IDGenerated; 
                String[] ackNoIdArray= inputString.split("-");
                for (int i=0; i < 1; i++){
                    ackNoId=Long.parseLong(ackNoIdArray[1]);
                }
                    deathdtls.getDeathCorrectionBasicInfo().setDeathACKNo(IDGenerated);
                    deathdtls.getDeathCorrectionBasicInfo().setAckNoID(ackNoId);
                    deathdtls.getDeathCorrectionBasicInfo().setApplicationDate(currentTime);
            });
    
        }

        //Jasmine 04.03.2023
    public void enrichCreateCorrection(DeathCorrectionRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        request.getDeathCorrection()
               .forEach(deathdtls -> {
                deathdtls.getDeathCorrectionBasicInfo().setId(UUID.randomUUID().toString());
                deathdtls.setDeathCorrAuditDetails(auditDetails);               
                DeathAddressInfo  addressinfo = deathdtls.getDeathCorrAddressInfo();
                if (addressinfo!=null){
                    addressinfo.setPresentAddrId(UUID.randomUUID().toString());
                    addressinfo.setPermanentAddrId(UUID.randomUUID().toString());
                }
                DeathCorrectionBasicInfo deathBasicDtls =deathdtls.getDeathCorrectionBasicInfo();
                DeathCorrectionBasicInfo deathBasicEnc =  encryptionDecryptionUtil.encryptObject(deathBasicDtls, "BndDetail", DeathCorrectionBasicInfo.class);
                deathBasicDtls.setDeceasedAadharNumber(deathBasicEnc.getDeceasedAadharNumber());
                deathdtls.setDeathCorrAuditDetails(auditDetails);
            });
        }  

    //Jasmine 06.03.2023
    public void enrichUpdateCorrection(DeathCorrectionRequest request) {
        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
         request.getDeathCorrection()
                 .forEach(deathDtls -> {
                    DeathCorrectionBasicInfo deathBasicDtls = deathDtls.getDeathCorrectionBasicInfo();
                    DeathCorrectionBasicInfo deathBasicEnc =  encryptionDecryptionUtil.encryptObject(deathBasicDtls, "BndDetail", DeathCorrectionBasicInfo.class);
                    deathBasicDtls.setDeceasedAadharNumber(deathBasicEnc.getDeceasedAadharNumber());
                    deathDtls.setDeathCorrAuditDetails(auditDetails);
                } ); 
        }  

    //Rakhi S on 06.03.2023 
    public void enrichCreateAbandoned(DeathAbandonedRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        request.getDeathAbandonedDtls()
               .forEach(deathdtls -> {
                deathdtls.getDeathBasicInfo().setId(UUID.randomUUID().toString());
                deathdtls.setDeathAuditDetails(auditDetails);                
                DeathAddressInfo  addressinfo = deathdtls.getDeathAddressInfo();
                if (addressinfo!=null){
                    addressinfo.setPresentAddrId(UUID.randomUUID().toString());
                    addressinfo.setPermanentAddrId(UUID.randomUUID().toString());
                }
                DeathStatisticalInfo  statisticalInfo = deathdtls.getDeathStatisticalInfo();
                if (statisticalInfo!=null){
                    statisticalInfo.setStatisticalId(UUID.randomUUID().toString()); 
                }               
                DeathBasicInfo deathBasicDtls =deathdtls.getDeathBasicInfo();
                if(deathBasicDtls.getDeceasedAadharNumber()!=null){
                    DeathBasicInfo deathBasicEnc =  encryptionDecryptionUtil.encryptObject(deathBasicDtls, "BndDetail", DeathBasicInfo.class);
                    deathBasicDtls.setDeceasedAadharNumber(deathBasicEnc.getDeceasedAadharNumber());
                }
                DeathFamilyInfo deathFamilyDtls =deathdtls.getDeathFamilyInfo() ;
                DeathFamilyInfo deathFamilyEnc = encryptionDecryptionUtil.encryptObject(deathFamilyDtls, "BndDetail", DeathFamilyInfo.class);
                deathFamilyDtls.setFatherAadharNo(deathFamilyEnc.getFatherAadharNo());
                deathFamilyDtls.setMotherAadharNo(deathFamilyEnc.getMotherAadharNo());
                deathFamilyDtls.setSpouseAadhaar(deathFamilyEnc.getSpouseAadhaar());
                DeathAbandonedInformantDtls deathInformant =deathdtls.getDeathInformantDtls() ;
                if (deathInformant!=null){
                    if(deathInformant.getInformantAadhaarNo()!=null){
                        DeathAbandonedInformantDtls deathInformantEnc = encryptionDecryptionUtil.encryptObject(deathInformant, "BndDetail", DeathAbandonedInformantDtls.class);
                        deathInformant.setInformantAadhaarNo(deathInformantEnc.getInformantAadhaarNo());
                    }                    
                }                
            });
        } 

        //Rakhi S on 06.03.2023
        public void setAbandonedPresentAddress(DeathAbandonedRequest request) {
            request.getDeathAbandonedDtls()
                    .forEach(death -> {
                    if (death.getDeathAddressInfo() != null) {

                     if (death.getDeathAddressInfo().getPresentaddressCountry() != null && death.getDeathAddressInfo().getPresentaddressStateName() != null) {
                        if (death.getDeathAddressInfo().getPresentaddressCountry().contains(DeathConstants.COUNTRY_CODE)) {
                            if(death.getDeathAddressInfo().getPresentaddressStateName().contains(DeathConstants.STATE_CODE_SMALL)) {

                                death.getDeathAddressInfo().setPresentAddrCountryId(death.getDeathAddressInfo().getPresentaddressCountry());    
                                death.getDeathAddressInfo().setPresentAddrStateId(death.getDeathAddressInfo().getPresentaddressStateName());    
                                death.getDeathAddressInfo().setPresentAddrDistrictId(death.getDeathAddressInfo().getPresentInsideKeralaDistrict());
                                death.getDeathAddressInfo().setPresentAddrVillageId(death.getDeathAddressInfo().getPresentInsideKeralaVillage());
                                death.getDeathAddressInfo().setPresentAddrTalukId(death.getDeathAddressInfo().getPresentInsideKeralaTaluk());
                                death.getDeathAddressInfo().setPresentAddrWardId(death.getDeathAddressInfo().getPresentWardNo());
                                death.getDeathAddressInfo().setPresentAddrPostofficeId(death.getDeathAddressInfo().getPresentInsideKeralaPostOffice());
                                death.getDeathAddressInfo().setPresentAddrPincode(death.getDeathAddressInfo().getPresentInsideKeralaPincode());
                                death.getDeathAddressInfo().setPresentAddrLocalityEn(death.getDeathAddressInfo().getPresentInsideKeralaLocalityNameEn());
                                death.getDeathAddressInfo().setPresentAddrLocalityMl(death.getDeathAddressInfo().getPresentInsideKeralaLocalityNameMl());
                                death.getDeathAddressInfo().setPresentAddrStreetNameEn(death.getDeathAddressInfo().getPresentInsideKeralaStreetNameEn());
                                death.getDeathAddressInfo().setPresentAddrStreetNameMl(death.getDeathAddressInfo().getPresentInsideKeralaStreetNameMl());
                                death.getDeathAddressInfo().setPresentAddrHoueNameEn(death.getDeathAddressInfo().getPresentInsideKeralaHouseNameEn());
                                death.getDeathAddressInfo().setPresentAddrHoueNameMl(death.getDeathAddressInfo().getPresentInsideKeralaHouseNameMl());
                            } else{

                                death.getDeathAddressInfo().setPresentAddrCountryId(death.getDeathAddressInfo().getPresentaddressCountry());
                                death.getDeathAddressInfo().setPresentAddrStateId(death.getDeathAddressInfo().getPresentaddressStateName());    
                                death.getDeathAddressInfo().setPresentAddrDistrictId(death.getDeathAddressInfo().getPresentOutsideKeralaDistrict());
                                death.getDeathAddressInfo().setPresentAddrCityOrVillageEn(death.getDeathAddressInfo().getPresentOutsideKeralaVillageName());
                                death.getDeathAddressInfo().setPresentAddrTownOrVillage(death.getDeathAddressInfo().getPresentOutsideKeralaCityVilgeEn());
                                death.getDeathAddressInfo().setPresentAddrTalukId(death.getDeathAddressInfo().getPresentOutsideKeralaTalukName());
                                death.getDeathAddressInfo().setPresentAddrPincode(death.getDeathAddressInfo().getPresentOutsideKeralaPincode());
                                death.getDeathAddressInfo().setPresentAddrLocalityEn(death.getDeathAddressInfo().getPresentOutsideKeralaLocalityNameEn());
                                death.getDeathAddressInfo().setPresentAddrLocalityMl(death.getDeathAddressInfo().getPresentOutsideKeralaLocalityNameMl());
                                death.getDeathAddressInfo().setPresentAddrStreetNameEn(death.getDeathAddressInfo().getPresentOutsideKeralaStreetNameEn());
                                death.getDeathAddressInfo().setPresentAddrStreetNameMl(death.getDeathAddressInfo().getPresentOutsideKeralaStreetNameMl());
                                death.getDeathAddressInfo().setPresentAddrHoueNameEn(death.getDeathAddressInfo().getPresentOutsideKeralaHouseNameEn());
                                death.getDeathAddressInfo().setPresentAddrHoueNameMl(death.getDeathAddressInfo().getPresentOutsideKeralaHouseNameMl());
                               
                            }
                        } else{

                            if (death.getDeathAddressInfo().getPresentOutSideCountry() != null) {
                                death.getDeathAddressInfo().setPresentAddrCountryId(death.getDeathAddressInfo().getPresentOutSideCountry());
                                death.getDeathAddressInfo().setPresentOutSideIndiaProvinceEn(death.getDeathAddressInfo().getPresentOutSideIndiaProvinceEn());
                                death.getDeathAddressInfo().setPresentOutSideIndiaProvinceMl(death.getDeathAddressInfo().getPresentOutSideIndiaProvinceMl());
                                death.getDeathAddressInfo().setPresentAddrTownOrVillage(death.getDeathAddressInfo().getPresentOutSideIndiaadrsVillage());
                                death.getDeathAddressInfo().setPresentAddrCityOrVillageEn(death.getDeathAddressInfo().getPresentOutSideIndiaadrsCityTown());
                                death.getDeathAddressInfo().setPresentAddrHoueNameEn(death.getDeathAddressInfo().getPresentOutSideIndiaAdressEn());
                                death.getDeathAddressInfo().setPresentAddrHoueNameMl(death.getDeathAddressInfo().getPresentOutSideIndiaAdressMl());
                                death.getDeathAddressInfo().setPresentAddrStreetNameEn(death.getDeathAddressInfo().getPresentOutSideIndiaAdressEnB());
                                death.getDeathAddressInfo().setPresentAddrStreetNameMl(death.getDeathAddressInfo().getPresentOutSideIndiaAdressMlB()); 
                            }
                        }
                    }
                }
             });
        }

        //Rakhi S on 06.03.2023
        public void setAbandonedPermanentAddress(DeathAbandonedRequest request) {
            request.getDeathAbandonedDtls()
                    .forEach(death -> {
                    if (death.getDeathAddressInfo() != null) {
                        death.getDeathAddressInfo().setIsPrsentAddressInt(death.getDeathAddressInfo().getIsPrsentAddress() == true ? 1 : 0);

                        if(death.getDeathAddressInfo().getIsPrsentAddress()){
                            death.getDeathAddressInfo().setPermtaddressCountry(death.getDeathAddressInfo().getPresentaddressCountry());
                            death.getDeathAddressInfo().setPermtaddressStateName(death.getDeathAddressInfo().getPresentaddressStateName());                            
                        }
                        if (death.getDeathAddressInfo().getPermtaddressCountry() != null && death.getDeathAddressInfo().getPermtaddressStateName() != null) {

                            if (death.getDeathAddressInfo().getPermtaddressCountry().contains(DeathConstants.COUNTRY_CODE)) {
                                if (death.getDeathAddressInfo().getPermtaddressStateName().contains(DeathConstants.STATE_CODE_SMALL)) {

                                    death.getDeathAddressInfo().setPermanentAddrCountryId(death.getDeathAddressInfo().getPermtaddressCountry());
                                    death.getDeathAddressInfo().setPermanentAddrStateId(death.getDeathAddressInfo().getPermtaddressStateName());
                                    death.getDeathAddressInfo().setPermanentAddrDistrictId(death.getDeathAddressInfo().getPermntInKeralaAdrDistrict());
                                    death.getDeathAddressInfo().setPermanentAddrVillageId(death.getDeathAddressInfo().getPermntInKeralaAdrVillage());
                                    death.getDeathAddressInfo().setPermanentAddrTalukId(death.getDeathAddressInfo().getPermntInKeralaAdrTaluk());
                                    death.getDeathAddressInfo().setPermanentAddrLocalityEn(death.getDeathAddressInfo().getPermntInKeralaAdrLocalityNameEn());
                                    death.getDeathAddressInfo().setPermanentAddrLocalityMl(death.getDeathAddressInfo().getPermntInKeralaAdrLocalityNameMl());
                                    death.getDeathAddressInfo().setPermanentAddrStreetNameEn(death.getDeathAddressInfo().getPermntInKeralaAdrStreetNameEn());
                                    death.getDeathAddressInfo().setPermanentAddrStreetNameMl(death.getDeathAddressInfo().getPermntInKeralaAdrStreetNameMl());
                                    death.getDeathAddressInfo().setPermanentAddrHoueNameEn(death.getDeathAddressInfo().getPermntInKeralaAdrHouseNameEn());
                                    death.getDeathAddressInfo().setPermanentAddrHoueNameMl(death.getDeathAddressInfo().getPermntInKeralaAdrHouseNameMl());
                                    death.getDeathAddressInfo().setPermanentAddrPincode(death.getDeathAddressInfo().getPermntInKeralaAdrPincode());
                                    death.getDeathAddressInfo().setPermanentAddrWardId(death.getDeathAddressInfo().getPermntInKeralaWardNo());
                                    death.getDeathAddressInfo().setPermanentAddrPostofficeId(death.getDeathAddressInfo().getPermntInKeralaAdrPostOffice());
                                }else{
                                    death.getDeathAddressInfo().setPermanentAddrCountryId(death.getDeathAddressInfo().getPermtaddressCountry());
                                    death.getDeathAddressInfo().setPermanentAddrStateId(death.getDeathAddressInfo().getPermtaddressStateName());
                                    death.getDeathAddressInfo().setPermanentAddrCityOrVillageEn(death.getDeathAddressInfo().getPermntOutsideKeralaCityVilgeEn());
                                    death.getDeathAddressInfo().setPermanentAddrTownOrVillage(death.getDeathAddressInfo().getPermntOutsideKeralaVillage());
                                    death.getDeathAddressInfo().setPermanentAddrDistrictId(death.getDeathAddressInfo().getPermntOutsideKeralaDistrict());
                                    death.getDeathAddressInfo().setPresentAddrTalukId(death.getDeathAddressInfo().getPermntOutsideKeralaTaluk());
                                    death.getDeathAddressInfo().setPermanentAddrLocalityEn(death.getDeathAddressInfo().getPermntOutsideKeralaLocalityNameEn());
                                    death.getDeathAddressInfo().setPermanentAddrLocalityMl(death.getDeathAddressInfo().getPermntOutsideKeralaLocalityNameMl());
                                    death.getDeathAddressInfo().setPermanentAddrStreetNameEn(death.getDeathAddressInfo().getPermntOutsideKeralaStreetNameEn());
                                    death.getDeathAddressInfo().setPermanentAddrStreetNameMl(death.getDeathAddressInfo().getPermntOutsideKeralaStreetNameMl());
                                    death.getDeathAddressInfo().setPermanentAddrHoueNameEn(death.getDeathAddressInfo().getPermntOutsideKeralaHouseNameEn());
                                    death.getDeathAddressInfo().setPermanentAddrHoueNameMl(death.getDeathAddressInfo().getPermntOutsideKeralaHouseNameMl());
                                    death.getDeathAddressInfo().setPermanentAddrPincode(death.getDeathAddressInfo().getPermntOutsideKeralaPincode());
                                }
        
                            } else{
                                if (death.getDeathAddressInfo().getPermntOutsideIndiaCountry() != null) {
                                    death.getDeathAddressInfo().setPermanentAddrCountryId(death.getDeathAddressInfo().getPermntOutsideIndiaCountry());
                                    death.getDeathAddressInfo().setPermanentAddrTownOrVillage(death.getDeathAddressInfo().getPermntOutsideIndiaVillage());
                                    death.getDeathAddressInfo().setPermanentAddrCityOrVillageEn(death.getDeathAddressInfo().getPermntOutsideIndiaCityTown());
                                    death.getDeathAddressInfo().setPermanentAddrHoueNameEn(death.getDeathAddressInfo().getPermntOutsideIndiaLineoneEn());
                                    death.getDeathAddressInfo().setPermanentAddrHoueNameMl(death.getDeathAddressInfo().getPermntOutsideIndiaLineoneMl());
                                    death.getDeathAddressInfo().setPermanentAddrStreetNameEn(death.getDeathAddressInfo().getPermntOutsideIndiaLinetwoEn());
                                    death.getDeathAddressInfo().setPermanentAddrStreetNameMl(death.getDeathAddressInfo().getPermntOutsideIndiaLinetwoMl()); 
                                }
                            }
                        }
                    }
                });
        }

    //Rakhi S on 06.03.2023  ACK no formating
    public void setAbandonedACKNumber(DeathAbandonedRequest request) {
        RequestInfo requestInfo = request.getRequestInfo();
        int Year = Calendar.getInstance().get(Calendar.YEAR) ;
        Long currentTime = Long.valueOf(System.currentTimeMillis());
        String tenantId = requestInfo.getUserInfo().getTenantId();
        List<Map<String, Object>> ackNoDetails = repository.getDeathACKDetails(tenantId, Year);

        request.getDeathAbandonedDtls()
        .forEach(deathdtls -> {    
               String IDGenerated = null;
                IDGenerated = idGenerator.setIDGeneratorAbandoned(request, DeathConstants.FUN_MODULE_NEWAPPLN,
                                DeathConstants.ACK_NUMBER_CAPTION);
            Long ackNoId=null;
            String inputString = IDGenerated; 
            String[] ackNoIdArray= inputString.split("-");
            for (int i=0; i < 1; i++){
                ackNoId=Long.parseLong(ackNoIdArray[1]);
            }
                deathdtls.getDeathBasicInfo().setDeathACKNo(IDGenerated);
                deathdtls.getDeathBasicInfo().setAckNoID(ackNoId);
                deathdtls.getDeathBasicInfo().setApplicationDate(currentTime);
        });

    }

}
