package org.ksmart.death.crdeathregistry.enrichment;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.ksmart.death.common.repository.IdGenRepository;
import org.ksmart.death.common.repository.ServiceRequestRepository;
import org.ksmart.death.crdeathregistry.config.CrDeathRegistryConfiguration;
import org.ksmart.death.crdeathregistry.web.models.AuditDetails;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryAddressInfo;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryRequest;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
     * Creates CrDeathRegistryEnrichment for UUID ,Audit details and IDGeneration
     * Rakhi S IKM
     * on 28.11.2022
     */

@Component
public class CrDeathRegistryEnrichment implements BaseEnrichment{

   
	@Autowired
	IdGenRepository idGenRepository;

    @Autowired
	ServiceRequestRepository serviceRequestRepository;

    @Autowired
	CrDeathRegistryConfiguration config;


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

    // private List<String> getIdList(RequestInfo requestInfo, String tenantId, String idKey,
    //                                String idformat, int count) {
    //     List<IdResponse> idResponses = idGenRepository.getId(requestInfo, tenantId, idKey, idformat, count).getIdResponses();
        
    //     System.out.println("idResponse"+idResponses);
    //     if (CollectionUtils.isEmpty(idResponses))
    //         throw new CustomException("IDGEN ERROR", "No ids returned from idgen Service");

    //     return idResponses.stream()
    //             .map(IdResponse::getId).collect(Collectors.toList());
    // }
    // public void setIdgenIds(CrDeathRegistryRequest request) {
    //     RequestInfo requestInfo = request.getRequestInfo();
    //     // String tenantId = request.getDeathCertificateDtls().get(0).getTenantId();
    //     String tenantId = requestInfo.getUserInfo().getTenantId();
    //     List<CrDeathRegistryDtl> deathDtls = request.getDeathCertificateDtls();
    //     String applNo = getIdList(requestInfo, tenantId, config.getDeathApplnFileCodeName(), config.getDeathApplnFileCodeFormat(), 1).get(0);
    //     deathDtls.get(0).setDeathApplicationNo(applNo);

    //     String ackNo = getIdList(requestInfo, tenantId, config.getDeathAckName(), config.getDeathACKFormat(), 1).get(0);
    //     deathDtls.get(0).setDeathACKNo(ackNo);
    // }  

        //UPDATE  BEGIN Jasmine
        public void enrichUpdate(CrDeathRegistryRequest request) {

            RequestInfo requestInfo = request.getRequestInfo();
            User userInfo = requestInfo.getUserInfo();
            AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
        
            request.getDeathCertificateDtls()
                    .forEach(deathDtls -> {
                    deathDtls.setAuditDetails(auditDetails);
                    // deathDtls.getAddressInfo().forEach(addressdtls -> {
                    //                            addressdtls.setParentdeathDtlId(deathDtls.getId());
                    //                            addressdtls.setAuditDetails(auditDetails);
                    //                         });
                    CrDeathRegistryAddressInfo  addressInfo = deathDtls.getAddressInfo();
                    addressInfo.setParentdeathDtlId(deathDtls.getId());
                    addressInfo.setAuditDetails(auditDetails);
                    
                    } );
        
        }//UPDATE END
}
