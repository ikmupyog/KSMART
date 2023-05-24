package org.ksmart.death.deathapplication.enrichment;
import java.util.Arrays;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.ListIterator;
import java.util.stream.Collectors;
import org.apache.commons.collections4.CollectionUtils;

import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.tracer.model.CustomException;
import org.ksmart.death.common.repository.ServiceRequestRepository;
import org.ksmart.death.deathapplication.repository.DeathApplnRepository;
import org.ksmart.death.deathapplication.util.DeathConstants;
import org.ksmart.death.deathapplication.util.DeathMdmsUtil;
import org.ksmart.death.deathapplication.util.IDGenerator;
import org.ksmart.death.deathapplication.web.models.AuditDetails;
import org.ksmart.death.deathapplication.web.models.DeathAbandonedDtls;
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
import org.ksmart.death.deathapplication.web.models.DeathDocument;
import org.ksmart.death.deathapplication.web.models.DeathStatisticalInfo;
import org.ksmart.death.deathapplication.web.models.WorkFlowDocuments;
import org.ksmart.death.deathapplication.web.models.Demand.Demand;
import org.ksmart.death.deathapplication.web.models.Demand.DemandRequest;
import org.ksmart.death.deathapplication.web.models.Demand.DemandResponse;
import org.ksmart.death.deathapplication.web.models.DeathInformantDtls;
import org.ksmart.death.deathapplication.web.models.DeathInitiatorDtls;
import org.ksmart.death.deathapplication.web.models.DeathNACApplicantDtls;
import org.ksmart.death.deathapplication.web.models.DeathNACDtls;
import org.ksmart.death.deathapplication.web.models.DeathNACRequest;
import org.ksmart.death.common.contract.EncryptionDecryptionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.ksmart.death.deathapplication.config.DeathConfiguration; 
import org.ksmart.death.common.repository.IdGenRepository;
import org.ksmart.death.deathapplication.util.DeathApplicationUtil; 	
import com.fasterxml.jackson.databind.ObjectMapper;
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

    //Rakhi S on 21.03.2023
    @Autowired
	@Qualifier("objectMapperBnd")
	private ObjectMapper mapper;

    // //Jasmine 16.02.2023
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

//Jasmine 10.03.2023
    @Autowired
    DeathConfiguration config;

    @Autowired
	IdGenRepository idGenRepository;

    @Autowired
	DeathApplicationUtil deathApplnUtil;
    
    @Autowired
    public DeathEnrichment( IDGenerator idGenerator) {

        this.idGenerator = idGenerator;
    }

    //Rakhi S on 08.02.2023
    public void enrichCreate(DeathDtlRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        
        setDeathPlaceTypes(request);
        setPresentAddress(request);
        setPermanentAddress(request);

        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        request.getDeathCertificateDtls()
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
                //Rakhi S ikm on 04.05.2023 Document Upload (NAC) for after 1 year 
                List<DeathDocument> documentInfo = deathdtls.getDeathNACDocuments();
                if (documentInfo!=null){
                    if(documentInfo.get(0).getFileStoreId()!=null){
                        documentInfo
                            .forEach(document -> {
                        document.setId(UUID.randomUUID().toString());
                        document.setActive(true);
                        document.setTenantId(deathdtls.getDeathBasicInfo().getTenantId());
                        document.setDeathDtlId(deathdtls.getDeathBasicInfo().getId());
                        document.setDeathDocAuditDetails(auditDetails);
                    });
                }else{
                    documentInfo.clear();
                }
            }      
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
            setACKNumber(request); 
        }  
    //Rakhi S on 08.02.2023 ACK no formating
    //Commented by jasmine on 13.03.2023
    // public void setACKNumber(DeathDtlRequest request) {
    //     RequestInfo requestInfo = request.getRequestInfo();
    //     int Year = Calendar.getInstance().get(Calendar.YEAR) ;
    //     Long currentTime = Long.valueOf(System.currentTimeMillis());
    //     String tenantId = requestInfo.getUserInfo().getTenantId();
    //     List<Map<String, Object>> ackNoDetails = repository.getDeathACKDetails(tenantId, Year);

    //     request.getDeathCertificateDtls()
    //     .forEach(deathdtls -> {    
    //            String IDGenerated = null;
    //             IDGenerated = idGenerator.setIDGenerator(request, DeathConstants.FUN_MODULE_NEWAPPLN,
    //                             DeathConstants.ACK_NUMBER_CAPTION);
    //         Long ackNoId=null;
    //         String inputString = IDGenerated; 
    //         String[] ackNoIdArray= inputString.split("-");
    //         for (int i=0; i < 1; i++){
    //             ackNoId=Long.parseLong(ackNoIdArray[1]);
    //         }
    //             deathdtls.getDeathBasicInfo().setDeathACKNo(IDGenerated);
    //             deathdtls.getDeathBasicInfo().setAckNoID(ackNoId);
    //             deathdtls.getDeathBasicInfo().setApplicationDate(currentTime);
    //     });

    // }
        //Jasmine 13.03.2023
        public void setACKNumber(DeathDtlRequest request) {
            RequestInfo requestInfo = request.getRequestInfo();
            List<DeathDtl> deathDtls = request.getDeathCertificateDtls();
            Long currentTime = Long.valueOf(System.currentTimeMillis());
            String tenantId = deathDtls.get(0).getDeathBasicInfo().getTenantId();
            
            List<String> ackNoDetails =idGenRepository.getIdList(requestInfo,
                                        tenantId,
                                        config.getDeathACKNumberIdName(),
                                        request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getFuncionUID(),
                                        "AKNO",deathDtls.size());
            // validateFileCodes(ackNoDetails, deathDtls.size());
            ListIterator<String> itr = ackNoDetails.listIterator();
            request.getDeathCertificateDtls()
                    .forEach(deathdtls -> {
                        deathdtls.getDeathBasicInfo().setDeathACKNo(itr.next());
                        deathdtls.getDeathBasicInfo().setAckNoID(deathApplnUtil.setSeqId(ackNoDetails));
                        deathdtls.getDeathBasicInfo().setApplicationDate(currentTime);

                        List<DeathDocument> documentInfo = deathdtls.getDeathNACDocuments();
                        if (documentInfo!=null){
                            documentInfo
                                .forEach(document -> {                        
                            document.setDeathACKNo(deathdtls.getDeathBasicInfo().getDeathACKNo());
                        });
                    }

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

                    //Rakhi S ikm on 24.05.2023 Document Upload (Workflow) 
                    List<WorkFlowDocuments> documentInfo = deathDtls.getWfDocuments();
                    if (documentInfo!=null){                        
                            documentInfo
                                .forEach(document -> {
                            document.setId(UUID.randomUUID().toString());
                            document.setActive(true);
                            document.setTenantId(deathDtls.getDeathBasicInfo().getTenantId());
                            document.setDeathDtlId(deathDtls.getDeathBasicInfo().getId());
                            document.setDeathDocAuditDetails(auditDetails);
                        });                   
                      }   
                });        
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

                            if (death.getDeathAddressInfo().getPresentaddressCountry() != null && death.getDeathAddressInfo().getPresentaddressCountry() != DeathConstants.COUNTRY_CODE) {
                                // death.getDeathAddressInfo().setPresentAddrCountryId(death.getDeathAddressInfo().getPresentOutSideCountry());
                                death.getDeathAddressInfo().setPresentAddrCountryId(death.getDeathAddressInfo().getPresentaddressCountry());
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
                                if (death.getDeathAddressInfo().getPermtaddressCountry() != null && death.getDeathAddressInfo().getPermtaddressCountry() != DeathConstants.COUNTRY_CODE) {
                                    // death.getDeathAddressInfo().setPermanentAddrCountryId(death.getDeathAddressInfo().getPermntOutsideIndiaCountry());
                                    death.getDeathAddressInfo().setPermanentAddrCountryId(death.getDeathAddressInfo().getPermtaddressCountry());
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

        //Jasmine 10.03.2023

        public void setCorrectionACKNumber(DeathCorrectionRequest request) {
            RequestInfo requestInfo = request.getRequestInfo();
            List<DeathCorrectionDtls> deathDtls = request.getDeathCorrection();
            Long currentTime = Long.valueOf(System.currentTimeMillis());
            String tenantId = deathDtls.get(0).getDeathCorrectionBasicInfo().getTenantId();
            List<String> ackNoDetails =idGenRepository.getIdList(requestInfo,
                                        tenantId,
                                        config.getDeathACKNumberIdName(),
                                        request.getDeathCorrection().get(0).getDeathCorrectionBasicInfo().getFuncionUID(),
                                        "AKNO",deathDtls.size());
                                   

            // validateAckNo(ackNoDetails, deathDtls.size());
            ListIterator<String> itr = ackNoDetails.listIterator();
            request.getDeathCorrection()
                    .forEach(deathdtls -> {
                        deathdtls.getDeathCorrectionBasicInfo().setDeathACKNo(itr.next());
                        deathdtls.getDeathCorrectionBasicInfo().setAckNoID(deathApplnUtil.setSeqId(ackNoDetails));
                        deathdtls.getDeathCorrectionBasicInfo().setApplicationDate(currentTime);
                        List <DeathDocument> correctiondocument = deathdtls.getCorrectionDocuments();
                        if (correctiondocument!=null){
                            correctiondocument
                            .forEach(document -> {
                            document.setDeathACKNo(deathdtls.getDeathCorrectionBasicInfo().getDeathACKNo());
                            });
                        }
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
                    List <DeathDocument> correctiondocument = deathdtls.getCorrectionDocuments();
                    if (correctiondocument!=null){
                    correctiondocument
                    .forEach(document -> {
                        document.setId(UUID.randomUUID().toString());
                        document.setActive(true);
                        document.setTenantId(deathdtls.getDeathCorrectionBasicInfo().getTenantId());
                        document.setDeathCorrectionId(deathdtls.getDeathCorrectionBasicInfo().getId());
                        document.setDeathDocAuditDetails(auditDetails);
                    });
                }
                });
        }  

        //Jasmine 06.03.2023
        public void enrichUpdateCorrection(DeathCorrectionRequest request) {
            RequestInfo requestInfo = request.getRequestInfo();
            User userInfo = requestInfo.getUserInfo();
            AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
           // System.out.println("JasmineEnrichCorrection");
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
                List<DeathDocument> documentInfo = deathdtls.getDeathAbandonedDocuments();
                if (documentInfo!=null){
                    documentInfo
                        .forEach(document -> {
                    document.setId(UUID.randomUUID().toString());
                    document.setActive(true);
                    document.setTenantId(deathdtls.getDeathBasicInfo().getTenantId());
                    document.setDeathDtlId(deathdtls.getDeathBasicInfo().getId());
                    // document.setDeathACKNo(deathdtls.getDeathBasicInfo().getDeathACKNo());
                    document.setDeathDocAuditDetails(auditDetails);
                });
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
                // System.out.println(deathInformant);
                if (deathInformant!=null){
                    // System.out.println("In");
                //    System.out.println(deathInformant);
                    if(deathInformant.getInformantAadhaarNo()!=null){
                        // System.out.println("Inv Aadhaar");
                        // System.out.println(deathInformant.getInformantAadhaarNo());
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

    //Rakhi S on 15.03.2023  ACK no formating
    public void setAbandonedACKNumber(DeathAbandonedRequest request) {
        RequestInfo requestInfo = request.getRequestInfo();
        List<DeathAbandonedDtls> deathDtls = request.getDeathAbandonedDtls();
        Long currentTime = Long.valueOf(System.currentTimeMillis());
        String tenantId = deathDtls.get(0).getDeathBasicInfo().getTenantId();
        
        List<String> ackNoDetails =idGenRepository.getIdList(requestInfo,
                                    tenantId,
                                    config.getDeathACKNumberIdName(),
                                    request.getDeathAbandonedDtls().get(0).getDeathBasicInfo().getFuncionUID(),
                                    "AKNO",deathDtls.size());
        // validateFileCodes(ackNoDetails, deathDtls.size());
        ListIterator<String> itr = ackNoDetails.listIterator();
        request.getDeathAbandonedDtls()
                .forEach(deathdtls -> {
                    deathdtls.getDeathBasicInfo().setDeathACKNo(itr.next());
                    deathdtls.getDeathBasicInfo().setAckNoID(deathApplnUtil.setSeqId(ackNoDetails));
                    deathdtls.getDeathBasicInfo().setApplicationDate(currentTime);

                    List<DeathDocument> documentInfo = deathdtls.getDeathAbandonedDocuments();
                    if (documentInfo!=null){
                        documentInfo
                            .forEach(document -> {                        
                        document.setDeathACKNo(deathdtls.getDeathBasicInfo().getDeathACKNo());
                    });
                }

                });
    }
    //Rakhi S on 06.03.2023  ACK no formating
        // public void setAbandonedACKNumber(DeathAbandonedRequest request) {
        //     RequestInfo requestInfo = request.getRequestInfo();
        //     int Year = Calendar.getInstance().get(Calendar.YEAR) ;
        //     Long currentTime = Long.valueOf(System.currentTimeMillis());
        //     String tenantId = requestInfo.getUserInfo().getTenantId();
        //     List<Map<String, Object>> ackNoDetails = repository.getDeathACKDetails(tenantId, Year);

        //     request.getDeathAbandonedDtls()
        //     .forEach(deathdtls -> {    
        //         String IDGenerated = null;
        //             IDGenerated = idGenerator.setIDGeneratorAbandoned(request, DeathConstants.FUN_MODULE_NEWAPPLN,
        //                             DeathConstants.ACK_NUMBER_CAPTION);
        //         Long ackNoId=null;
        //         String inputString = IDGenerated; 
        //         String[] ackNoIdArray= inputString.split("-");
        //         for (int i=0; i < 1; i++){
        //             ackNoId=Long.parseLong(ackNoIdArray[1]);
        //         }
        //             deathdtls.getDeathBasicInfo().setDeathACKNo(IDGenerated);
        //             deathdtls.getDeathBasicInfo().setAckNoID(ackNoId);
        //             deathdtls.getDeathBasicInfo().setApplicationDate(currentTime);
        //     });

        // }
     //Rakhi S on 08.03.2023 Abandoned Update

        public void enrichAbandonedUpdate(DeathAbandonedRequest request) {

            RequestInfo requestInfo = request.getRequestInfo();
            User userInfo = requestInfo.getUserInfo();
            AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
            request.getDeathAbandonedDtls()
                 .forEach(deathDtls -> {
                    DeathBasicInfo deathBasicDtls = deathDtls.getDeathBasicInfo();
                    DeathBasicInfo deathBasicEnc =  encryptionDecryptionUtil.encryptObject(deathBasicDtls, "BndDetail", DeathBasicInfo.class);
                    deathBasicDtls.setDeceasedAadharNumber(deathBasicEnc.getDeceasedAadharNumber());
                    DeathFamilyInfo deathFamilyDtls =deathDtls.getDeathFamilyInfo() ;
                    DeathFamilyInfo deathFamilyEnc = encryptionDecryptionUtil.encryptObject(deathFamilyDtls, "BndDetail", DeathFamilyInfo.class);
                    deathFamilyDtls.setFatherAadharNo(deathFamilyEnc.getFatherAadharNo());
                    deathFamilyDtls.setMotherAadharNo(deathFamilyEnc.getMotherAadharNo());
                    deathFamilyDtls.setSpouseAadhaar(deathFamilyEnc.getSpouseAadhaar());
                    DeathAbandonedInformantDtls deathInformant =deathDtls.getDeathInformantDtls() ;
                    if (deathInformant!=null){
                        DeathAbandonedInformantDtls deathInformantEnc = encryptionDecryptionUtil.encryptObject(deathInformant, "BndDetail", DeathAbandonedInformantDtls.class);
                    deathInformant.setInformantAadhaarNo(deathInformantEnc.getInformantAadhaarNo());
                    }                    
                    deathDtls.setDeathAuditDetails(auditDetails);
                } );        
        }//UPDATE END
    //RAkhi S on 21.03.2023 Demand Save
    public List<Demand> saveDemand(RequestInfo requestInfo, List<Demand> demands){
        StringBuilder url = new StringBuilder(config.getBillingHost());
        url.append(config.getDemandCreateEndpoint());
        DemandRequest request = new DemandRequest(requestInfo,demands);
        Object result = serviceRequestRepository.fetchResult(url,request);
        DemandResponse response = null;
        try{
            response = mapper.convertValue(result,DemandResponse.class);
        }
        catch(IllegalArgumentException e){
            throw new CustomException("PARSING ERROR","Failed to parse response of create demand");
        }
        return response.getDemands();
    }

    //Rakhi S on 27.03.2023 
    public void enrichCreateNAC(DeathNACRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        request.getDeathNACDtls()
           .forEach(deathdtls -> {
            deathdtls.getDeathBasicInfo().setId(UUID.randomUUID().toString());
            deathdtls.setDeathAuditDetails(auditDetails);                
            DeathAddressInfo  addressinfo = deathdtls.getDeathAddressInfo();
            if (addressinfo!=null){
                addressinfo.setPresentAddrId(UUID.randomUUID().toString());
                addressinfo.setPermanentAddrId(UUID.randomUUID().toString());
            }  
            List<DeathDocument> documentInfo = deathdtls.getDeathNACDocuments();
                if (documentInfo!=null){
                    documentInfo
                        .forEach(document -> {
                    document.setId(UUID.randomUUID().toString());
                    document.setActive(true);
                    document.setTenantId(deathdtls.getDeathBasicInfo().getTenantId());
                    document.setDeathDtlId(deathdtls.getDeathBasicInfo().getId());
                    document.setDeathDocAuditDetails(auditDetails);
                });
            }                    
            DeathBasicInfo deathBasicDtls =deathdtls.getDeathBasicInfo();
            if(deathBasicDtls.getDeceasedAadharNumber()!=null){
                DeathBasicInfo deathBasicEnc =  encryptionDecryptionUtil.encryptObject(deathBasicDtls, "BndDetail", DeathBasicInfo.class);
                deathBasicDtls.setDeceasedAadharNumber(deathBasicEnc.getDeceasedAadharNumber());
                deathBasicDtls.setFatherAadharNo(deathBasicEnc.getFatherAadharNo());
                deathBasicDtls.setMotherAadharNo(deathBasicEnc.getMotherAadharNo());
                deathBasicDtls.setSpouseAadhaar(deathBasicEnc.getSpouseAadhaar());
            }          
            DeathNACApplicantDtls deathApplicant =deathdtls.getDeathApplicantDtls();
            if(deathApplicant.getApplicantAadhaarNo()!=null){
                DeathNACApplicantDtls deathApplicantEnc = encryptionDecryptionUtil.encryptObject(deathApplicant, "BndDetail", DeathNACApplicantDtls.class);
                deathApplicant.setApplicantAadhaarNo(deathApplicantEnc.getApplicantAadhaarNo());
            }                
        });
    } 

    //Rakhi S on 27.03.2023  ACK no formating
    public void setNACACKNumber(DeathNACRequest request) {
        RequestInfo requestInfo = request.getRequestInfo();
        List<DeathNACDtls> deathDtls = request.getDeathNACDtls();
        Long currentTime = Long.valueOf(System.currentTimeMillis());
        String tenantId = deathDtls.get(0).getDeathBasicInfo().getTenantId();
        
        List<String> ackNoDetails =idGenRepository.getIdList(requestInfo,
                                    tenantId,
                                    config.getDeathACKNumberIdName(),
                                    request.getDeathNACDtls().get(0).getDeathBasicInfo().getFuncionUID(),
                                    "AKNO",deathDtls.size());
        ListIterator<String> itr = ackNoDetails.listIterator();
        request.getDeathNACDtls()
                .forEach(deathdtls -> {
                    deathdtls.getDeathBasicInfo().setDeathACKNo(itr.next());
                    deathdtls.getDeathBasicInfo().setAckNoID(deathApplnUtil.setSeqId(ackNoDetails));
                    deathdtls.getDeathBasicInfo().setApplicationDate(currentTime);

                    List<DeathDocument> documentInfo = deathdtls.getDeathNACDocuments();
                    if (documentInfo!=null){
                        documentInfo
                            .forEach(document -> {                        
                        document.setDeathACKNo(deathdtls.getDeathBasicInfo().getDeathACKNo());
                    });
                }

                });
    }
     //Rakhi S on 27.03.2023
     public void setNACPresentAddress(DeathNACRequest request) {
        request.getDeathNACDtls()
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

    //Rakhi S on 27.03.2023
    public void setNACPermanentAddress(DeathNACRequest request) {
        request.getDeathNACDtls()
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

    //RAkhi S ikm on 16.04.2023 Set Deathplace types
    public void setDeathPlaceTypes(DeathDtlRequest request) {
        request.getDeathCertificateDtls()
            .forEach(death -> {
                if (death.getDeathBasicInfo().getDeathPlace() != null) {
                    if(death.getDeathBasicInfo().getDeathPlace().equals(DeathConstants.DEATH_PLACE_HOSPITAL)){
                        death.getDeathBasicInfo().setDeathPlaceType(death.getDeathBasicInfo().getHospitalNameEn());
                    }
                    else if(death.getDeathBasicInfo().getDeathPlace().equals(DeathConstants.DEATH_PLACE_INSTITUTION)){
                        death.getDeathBasicInfo().setDeathPlaceType(death.getDeathBasicInfo().getInstitution());
                    }
                    else if(death.getDeathBasicInfo().getDeathPlace().equals(DeathConstants.DEATH_PLACE_VEHICLE)){
                        death.getDeathBasicInfo().setDeathPlaceType(death.getDeathBasicInfo().getVehicleType());
                    }
                    else if(death.getDeathBasicInfo().getDeathPlace().equals(DeathConstants.DEATH_PLACE_PUBLICPLACES)){
                        death.getDeathBasicInfo().setDeathPlaceType(death.getDeathBasicInfo().getPublicPlaceType());
                    }
                }
            }
          );          
        }

     //RAkhi S ikm on 16.04.2023 Set Deathplace types
    public void setNACDeathPlaceTypes(DeathNACRequest request) {
        request.getDeathNACDtls()
            .forEach(death -> {
                if (death.getDeathBasicInfo().getDeathPlace() != null) {
                    if(death.getDeathBasicInfo().getDeathPlace().equals(DeathConstants.DEATH_PLACE_HOSPITAL)){
                        death.getDeathBasicInfo().setDeathPlaceType(death.getDeathBasicInfo().getHospitalNameEn());
                    }
                    else if(death.getDeathBasicInfo().getDeathPlace().equals(DeathConstants.DEATH_PLACE_INSTITUTION)){
                        death.getDeathBasicInfo().setDeathPlaceType(death.getDeathBasicInfo().getInstitution());
                    }
                    else if(death.getDeathBasicInfo().getDeathPlace().equals(DeathConstants.DEATH_PLACE_VEHICLE)){
                        death.getDeathBasicInfo().setDeathPlaceType(death.getDeathBasicInfo().getVehicleType());
                    }
                    else if(death.getDeathBasicInfo().getDeathPlace().equals(DeathConstants.DEATH_PLACE_PUBLICPLACES)){
                        death.getDeathBasicInfo().setDeathPlaceType(death.getDeathBasicInfo().getPublicPlaceType());
                    }
                }
            }
          );          
        }
        
         //RAkhi S ikm on 16.04.2023 Set Deathplace types
    public void setAbandonedDeathPlaceTypes(DeathAbandonedRequest request) {
        request.getDeathAbandonedDtls()
            .forEach(death -> {
                if (death.getDeathBasicInfo().getDeathPlace() != null) {
                    if(death.getDeathBasicInfo().getDeathPlace().equals(DeathConstants.DEATH_PLACE_HOSPITAL)){
                        death.getDeathBasicInfo().setDeathPlaceType(death.getDeathBasicInfo().getHospitalNameEn());
                    }
                    else if(death.getDeathBasicInfo().getDeathPlace().equals(DeathConstants.DEATH_PLACE_INSTITUTION)){
                        death.getDeathBasicInfo().setDeathPlaceType(death.getDeathBasicInfo().getInstitution());
                    }
                    else if(death.getDeathBasicInfo().getDeathPlace().equals(DeathConstants.DEATH_PLACE_VEHICLE)){
                        death.getDeathBasicInfo().setDeathPlaceType(death.getDeathBasicInfo().getVehicleType());
                    }
                    else if(death.getDeathBasicInfo().getDeathPlace().equals(DeathConstants.DEATH_PLACE_PUBLICPLACES)){
                        death.getDeathBasicInfo().setDeathPlaceType(death.getDeathBasicInfo().getPublicPlaceType());
                    }
                }
            }
          );          
        }
}
