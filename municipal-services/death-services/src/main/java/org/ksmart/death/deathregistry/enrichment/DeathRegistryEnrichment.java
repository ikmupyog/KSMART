package org.ksmart.death.deathregistry.enrichment;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.ksmart.death.common.Idgen.IdResponse;
import org.ksmart.death.common.contract.EncryptionDecryptionUtil;
import org.ksmart.death.common.repository.IdGenRepository;
import org.ksmart.death.common.repository.ServiceRequestRepository;
import org.ksmart.death.deathapplication.util.IDGenerator;
import org.ksmart.death.deathregistry.config.DeathRegistryConfiguration;
import org.ksmart.death.deathregistry.repository.DeathRegistryRepository;
import org.ksmart.death.deathregistry.util.DeathRegistryConstants;
import org.ksmart.death.deathregistry.util.DeathRegistryMdmsUtil;
import org.ksmart.death.deathregistry.util.RegistryIDGenerator;
import org.ksmart.death.deathregistry.web.models.AuditDetails;
import org.ksmart.death.deathregistry.web.models.DeathRegistryDtl;
import org.ksmart.death.deathregistry.web.models.DeathRegistryRequest;
import org.ksmart.death.deathregistry.web.models.DeathRegistryInformantDtls;
import org.ksmart.death.deathregistry.web.models.DeathRegistryNACDtls;
import org.ksmart.death.deathregistry.web.models.DeathRegistryNACRequest;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.jayway.jsonpath.JsonPath;
import org.ksmart.death.deathapplication.util.DeathApplicationUtil; 
import java.util.ListIterator;




import lombok.extern.slf4j.Slf4j;

@Slf4j

/**
     * Creates DeathRegistryEnrichment for UUID ,Audit details and IDGeneration 
     * by Rakhi S IKM on 09.02.2023
     */

@Component
public class DeathRegistryEnrichment implements BaseEnrichment{
  //Jasmine 16.02.2023
    private RegistryIDGenerator idGenerator;
   
	@Autowired
	IdGenRepository idGenRepository;

    @Autowired
	ServiceRequestRepository serviceRequestRepository;

    @Autowired
	DeathRegistryConfiguration config;

    @Autowired
    DeathRegistryRepository repository;

    @Autowired
    EncryptionDecryptionUtil encryptionDecryptionUtil;

    @Autowired
      DeathApplicationUtil deathApplnUtil;

    @Autowired
    DeathRegistryMdmsUtil util;
    public DeathRegistryEnrichment( RegistryIDGenerator idGenerator) {

        this.idGenerator = idGenerator;
    }

//Rakhi S ikm on 09.02.2023
    public void enrichCreate(DeathRegistryRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);

        request.getDeathCertificateDtls()
               .forEach(deathdtls -> {
                deathdtls.getDeathBasicInfo().setId(UUID.randomUUID().toString());
                deathdtls.setDeathAuditDetails(auditDetails);                 
                //Rakhi S on 10.02.2023
                deathdtls.getDeathAddressInfo().setPresentAddrId(UUID.randomUUID().toString());
                deathdtls.getDeathAddressInfo().setPermanentAddrId(UUID.randomUUID().toString());
                deathdtls.getDeathStatisticalInfo().setStatisticalId(UUID.randomUUID().toString());
                //Jasmine 11.02.2023
                // DeathRegistryInformantDtls  informantInfo = deathdtls.getDeathInformantDtls();
                //     if (informantInfo!=null){
                //         informantInfo.setInformantAddrId(UUID.randomUUID().toString());  
                //     }
                });
    }
    //Registration Number Creation by Rakhi S ikm on 10.02.2023
    // public void setRegistrationNumberDetails(DeathRegistryRequest request) {
    //     RequestInfo requestInfo = request.getRequestInfo();
    //     int Year = Calendar.getInstance().get(Calendar.YEAR) ;
    //     Long currentTime = Long.valueOf(System.currentTimeMillis());
    //     String tenantId = requestInfo.getUserInfo().getTenantId();
    //     List<Map<String, Object>> RegistrationNoDetails = repository.getDeathRegDetails(tenantId, Year);
        
    //     request.getDeathCertificateDtls()
    //             .forEach(deathdtls -> {    
    //                     //Jasmine 16.02.2023
    //                 String IDGenerated = null;
    //                 IDGenerated = idGenerator.setIDGenerator(request, DeathRegistryConstants.FUN_MODULE_NEWAPPLN,
    //                             DeathRegistryConstants.REG_NUMBER_CAPTION);
    //                 System.out.println("IDGenerated"+IDGenerated);
    //                 Long registrationNoId=null;
    //                 String inputString = IDGenerated; 
    //                 String[] registrationNoIdArray= inputString.split("-");
    //                 for (int i=0; i < 1; i++){
    //                     registrationNoId=Long.parseLong(registrationNoIdArray[1]);
    //                     }
    //                     deathdtls.getDeathBasicInfo().setRegistrationNo(IDGenerated);
    //                     deathdtls.getDeathBasicInfo().setRegistrationNoID(registrationNoId);
    //                     deathdtls.getDeathBasicInfo().setRegistrationDate(currentTime);
    //             });     
    // }  
    //Jasmine 13.03.2023
    public void setRegistrationNumberDetails(DeathRegistryRequest request) {
        RequestInfo requestInfo = request.getRequestInfo();
        List<DeathRegistryDtl> deathDtls = request.getDeathCertificateDtls();
        Long currentTime = Long.valueOf(System.currentTimeMillis());
        String tenantId = deathDtls.get(0).getDeathBasicInfo().getTenantId();
        
        List<String> ackNoDetails = idGenRepository.getIdList(requestInfo,
                                    tenantId,
                                    config.getDeathRegNumberIdName(),
                                    request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getFuncionUID(),
                                    "REGN",deathDtls.size());
        // validateFileCodes(filecodes, birthDetails.size());
        ListIterator<String> itr = ackNoDetails.listIterator();
        request.getDeathCertificateDtls()
                .forEach(deathdtls -> {
                    deathdtls.getDeathBasicInfo().setRegistrationNo(itr.next());
                    deathdtls.getDeathBasicInfo().setRegistrationNoID(deathApplnUtil.setSeqId(ackNoDetails));
                    deathdtls.getDeathBasicInfo().setRegistrationDate(currentTime);

                });
    }

    
    //Rakhi S ikm on 10.02.2023
    private Map<String, List<String>> getAttributeValues(Object mdmsdata){
        List<String> modulepaths = Arrays.asList(DeathRegistryConstants.TENANT_JSONPATH);
        final Map<String, List<String>> mdmsResMap = new HashMap<>();
       
        modulepaths.forEach(modulepath -> {
            try {
                mdmsResMap.putAll(JsonPath.read(mdmsdata,modulepath));
                log.error("jsonpath1"+JsonPath.read(mdmsdata,modulepath));
            } catch (Exception e) {
                log.error("Error while fetching MDMS data",e);
                throw new CustomException(DeathRegistryConstants.INVALID_TENANT_ID_MDMS_KEY,
                DeathRegistryConstants.INVALID_TENANT_ID_MDMS_MSG);
            }
           
        });
        // System.out.println("mdmsResMap"+mdmsResMap);
        return mdmsResMap;
    }



    // //Certificate Number Creation by Rakhi S 10.02.2023
    // public void setCertificateNumberDetails(DeathRegistryRequest request) {
    //     RequestInfo requestInfo = request.getRequestInfo();
    //     int Year = Calendar.getInstance().get(Calendar.YEAR) ;
    //     Long currentTime = Long.valueOf(System.currentTimeMillis());
    //     String tenantId = requestInfo.getUserInfo().getTenantId();
    //     List<Map<String, Object>> RegistrationNoDetails = repository.getDeathCertificate(tenantId, Year);
        
    //     request.getDeathCertificateDtls()
    //             .forEach(deathdtls -> {    
    //                 String certificateNo=null;
    //                 Long certificateNoId=null;
    //                         //Jasmine 16/02/2023
    //                     String IDGenerated = null;
    //                     IDGenerated = idGenerator.setIDGenerator(request, DeathRegistryConstants.FUN_MODULE_NEWAPPLN,
    //                                         DeathRegistryConstants.CERT_NUMBER_CAPTION);
    //                     String inputString = IDGenerated; 
    //                     String[] certificateNoArray= inputString.split("-");
    //                     for (int i=0; i < 1; i++){
    //                         certificateNoId=Long.parseLong(certificateNoArray[1]);
    //                     }

    //                     deathdtls.getDeathBasicInfo().setCertificateNo(IDGenerated);
    //                     deathdtls.getDeathBasicInfo().setCertificateNoId(certificateNoId);
    //                     deathdtls.getDeathBasicInfo().setCertificateDate(currentTime);
    //             });       
    // }  
    //Jasmine 13.03.2023
    public void setCertificateNumberDetails(DeathRegistryRequest request) {
        RequestInfo requestInfo = request.getRequestInfo();
        List<DeathRegistryDtl> deathDtls = request.getDeathCertificateDtls();
        Long currentTime = Long.valueOf(System.currentTimeMillis());
        String tenantId = deathDtls.get(0).getDeathBasicInfo().getTenantId();
        
        List<String> ackNoDetails = idGenRepository.getIdList(requestInfo,
                                    tenantId,
                                    config.getDeathCertNumberIdName(),
                                    request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getFuncionUID(),
                                    "CERT",deathDtls.size());
        // validateFileCodes(filecodes, birthDetails.size());
        ListIterator<String> itr = ackNoDetails.listIterator();
        request.getDeathCertificateDtls()
                .forEach(deathdtls -> {
                    deathdtls.getDeathBasicInfo().setCertificateNo(itr.next());
                    deathdtls.getDeathBasicInfo().setCertificateNoId(deathApplnUtil.setSeqId(ackNoDetails));
                    deathdtls.getDeathBasicInfo().setCertificateDate(currentTime);

                });
    }

    //Rakhi S ikm on 04.04.2023
    public void enrichCreateNAC(DeathRegistryNACRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);

        request.getDeathNACDtls()
               .forEach(deathdtls -> {
                deathdtls.getDeathBasicInfo().setId(UUID.randomUUID().toString());
                deathdtls.setDeathAuditDetails(auditDetails);                 
                deathdtls.getDeathAddressInfo().setPresentAddrId(UUID.randomUUID().toString());
                deathdtls.getDeathAddressInfo().setPermanentAddrId(UUID.randomUUID().toString());                
                });
    }
    //Rakhi S ikm on 04.04.2023
    public void setRegistrationNumberNAC(DeathRegistryNACRequest request) {
        RequestInfo requestInfo = request.getRequestInfo();
        List<DeathRegistryNACDtls> deathDtls = request.getDeathNACDtls();
        Long currentTime = Long.valueOf(System.currentTimeMillis());
        String tenantId = deathDtls.get(0).getDeathBasicInfo().getTenantId();
        
        List<String> ackNoDetails = idGenRepository.getIdList(requestInfo,
                                    tenantId,
                                    config.getDeathRegNumberIdName(),
                                    request.getDeathNACDtls().get(0).getDeathBasicInfo().getFuncionUID(),
                                    "REGN",deathDtls.size());

        ListIterator<String> itr = ackNoDetails.listIterator();
        request.getDeathNACDtls()
                .forEach(deathdtls -> {
                    deathdtls.getDeathBasicInfo().setRegistrationNo(itr.next());
                    deathdtls.getDeathBasicInfo().setRegistrationNoID(deathApplnUtil.setSeqId(ackNoDetails));
                    deathdtls.getDeathBasicInfo().setRegistrationDate(currentTime);

                });
    }
    //Rakhi S ikm on 04.04.2023
    public void setCertificateNumberNAC(DeathRegistryNACRequest request) {
        RequestInfo requestInfo = request.getRequestInfo();
        List<DeathRegistryNACDtls> deathDtls = request.getDeathNACDtls();
        Long currentTime = Long.valueOf(System.currentTimeMillis());
        String tenantId = deathDtls.get(0).getDeathBasicInfo().getTenantId();
        
        List<String> ackNoDetails = idGenRepository.getIdList(requestInfo,
                                    tenantId,
                                    config.getDeathCertNumberIdName(),
                                    request.getDeathNACDtls().get(0).getDeathBasicInfo().getFuncionUID(),
                                    "CERT",deathDtls.size());

        ListIterator<String> itr = ackNoDetails.listIterator();
        request.getDeathNACDtls()
                .forEach(deathdtls -> {
                    deathdtls.getDeathBasicInfo().setCertificateNo(itr.next());
                    deathdtls.getDeathBasicInfo().setCertificateNoId(deathApplnUtil.setSeqId(ackNoDetails));
                    deathdtls.getDeathBasicInfo().setCertificateDate(currentTime);

                });
    }

}
