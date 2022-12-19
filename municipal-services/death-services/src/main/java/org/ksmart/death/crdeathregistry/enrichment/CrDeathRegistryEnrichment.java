package org.ksmart.death.crdeathregistry.enrichment;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.ksmart.death.common.Idgen.IdResponse;
import org.ksmart.death.common.repository.IdGenRepository;
import org.ksmart.death.common.repository.ServiceRequestRepository;
import org.ksmart.death.crdeathregistry.config.CrDeathRegistryConfiguration;
import org.ksmart.death.crdeathregistry.repository.CrDeathRegistryRepository;
import org.ksmart.death.crdeathregistry.util.CrDeathRegistryConstants;
import org.ksmart.death.crdeathregistry.web.models.AuditDetails;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryAddressInfo;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryDtl;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryRequest;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import lombok.extern.slf4j.Slf4j;

@Slf4j

/**
     * Creates CrDeathRegistryEnrichment for UUID ,Audit details and IDGeneration by Rakhi S IKM on 28.11.2022
     * Create Registration Number and update that in death application based on application number and tenentId
     */

@Component
public class CrDeathRegistryEnrichment implements BaseEnrichment{

   
	@Autowired
	IdGenRepository idGenRepository;

    @Autowired
	ServiceRequestRepository serviceRequestRepository;

    @Autowired
	CrDeathRegistryConfiguration config;

    @Autowired
    CrDeathRegistryRepository repository;


    public void enrichCreate(CrDeathRegistryRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);

        request.getDeathCertificateDtls()
               .forEach(deathdtls -> {
                deathdtls.setId(UUID.randomUUID().toString());
                deathdtls.setAuditDetails(auditDetails);
                deathdtls.getStatisticalInfo().setId(UUID.randomUUID().toString());     
                
                
                // deathdtls.getAddressInfo().get(0).setParentdeathDtlId(deathdtls.getId());
                // deathdtls.getAddressInfo().get(0).setAuditDetails(auditDetails);
                // deathdtls.getAddressInfo().forEach(addressdtls -> {
                //       addressdtls.getPresentAddress().setId(UUID.randomUUID().toString());
                //       addressdtls.getPermanentAddress().setId(UUID.randomUUID().toString());
                //       addressdtls.getInformantAddress().setId(UUID.randomUUID().toString());
                //       addressdtls.getDeathplaceAddress().setId(UUID.randomUUID().toString());
                //       addressdtls.getBurialAddress().setId(UUID.randomUUID().toString());                       
                //      });
                CrDeathRegistryAddressInfo  addressInfo = deathdtls.getAddressInfo();
                addressInfo.setParentdeathDtlId(deathdtls.getId());
                addressInfo.setAuditDetails(auditDetails);
                addressInfo.getPresentAddress().setId(UUID.randomUUID().toString());
                addressInfo.getPermanentAddress().setId(UUID.randomUUID().toString());
                addressInfo.getInformantAddress().setId(UUID.randomUUID().toString());
                addressInfo.getDeathplaceAddress().setId(UUID.randomUUID().toString());
                addressInfo.getBurialAddress().setId(UUID.randomUUID().toString());

            });
    }
    //Registration Number Creation by Jasmine
    public void setRegistrationNumberDetails(CrDeathRegistryRequest request) {
        RequestInfo requestInfo = request.getRequestInfo();
        int Year = Calendar.getInstance().get(Calendar.YEAR) ;
        Long currentTime = Long.valueOf(System.currentTimeMillis());
        String tenantId = requestInfo.getUserInfo().getTenantId();
        List<Map<String, Object>> RegistrationNoDetails = repository.getDeathRegDetails(tenantId, Year);
        request.getDeathCertificateDtls()
                .forEach(deathdtls -> {    
                    String registrationNo=null;
                    Long registrationNoId=null;
                    if (RegistrationNoDetails.size()>=1) {
                        registrationNo=String.valueOf(RegistrationNoDetails.get(0).get("regno"))+"/"+String.valueOf(Year);
                        registrationNoId=Long.parseLong(String.valueOf(RegistrationNoDetails.get(0).get("regno")));
                    }
                    else{
                        registrationNo=CrDeathRegistryConstants.REGISTRATION_NUMBER_FIRST+"/"+String.valueOf(Year);
                        registrationNoId=Long.parseLong(CrDeathRegistryConstants.REGISTRATION_NUMBER_FIRST);
                    }

                        deathdtls.setRegistrationNo(registrationNo);
                        deathdtls.setRegistrationNoId(registrationNoId);
                        deathdtls.setRegistrationDate(currentTime);
                });

        // try {
        //         ObjectMapper mapper = new ObjectMapper();
        //         Object obj = deathDtls;
        //         mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        //        System.out.println("JasmineRegistry "+ mapper.writeValueAsString(obj));
        // }catch(Exception e) {
        //     log.error("Exception while fetching from searcher: ",e);
        // }

    }  
        
    //UPDATE  BEGIN Jasmine
    public void enrichUpdate(CrDeathRegistryRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
        
        request.getDeathCertificateDtls()
                .forEach(deathDtls -> {
                    deathDtls.setAuditDetails(auditDetails);

                    CrDeathRegistryAddressInfo  addressInfo = deathDtls.getAddressInfo();
                    addressInfo.setParentdeathDtlId(deathDtls.getId());
                    addressInfo.setAuditDetails(auditDetails);  
                } );
    }
        //UPDATE END
}
