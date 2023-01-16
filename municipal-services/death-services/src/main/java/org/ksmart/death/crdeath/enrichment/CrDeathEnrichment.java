package org.ksmart.death.crdeath.enrichment;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.ksmart.death.common.Idgen.IdResponse;
import org.ksmart.death.common.contract.EncryptionDecryptionUtil;
import org.ksmart.death.common.repository.IdGenRepository;
import org.ksmart.death.common.repository.ServiceRequestRepository;
import org.ksmart.death.crdeath.config.CrDeathConfiguration;
import org.ksmart.death.crdeath.web.models.AuditDetails;
import org.ksmart.death.crdeath.web.models.CrDeathAddressInfo;
import org.ksmart.death.crdeath.web.models.CrDeathApplicantDetails;
import org.ksmart.death.crdeath.web.models.CrDeathDtl;
import org.ksmart.death.crdeath.web.models.CrDeathDtlRequest;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
     * Creates CrDeathEnrichment for UUID ,Audit details and IDGeneration
     * Rakhi S IKM
     * 
     */

@Component
public class CrDeathEnrichment implements BaseEnrichment{

   
	@Autowired
	IdGenRepository idGenRepository;

    @Autowired
	ServiceRequestRepository serviceRequestRepository;

    @Autowired
	CrDeathConfiguration config;

    @Autowired
    EncryptionDecryptionUtil encryptionDecryptionUtil;


    public void enrichCreate(CrDeathDtlRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();

        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
    //     List<CrDeathDtl> deathDtls = request.getDeathCertificateDtls();
    //     String deathDtlsNew = StringUtils.join(deathDtls, " and ");
    //     CrDeathDtl deathDtlEnc1 = encryptionDecryptionUtil.encryptObject(deathDtlsNew, "BndDetail", CrDeathDtl.class);
    //    System.out.println("EncryptionDetailsNew"+deathDtlEnc1);
        request.getDeathCertificateDtls()
               .forEach(deathdtls -> {
                deathdtls.setId(UUID.randomUUID().toString());
                deathdtls.setAuditDetails(auditDetails);
                deathdtls.getStatisticalInfo().setId(UUID.randomUUID().toString());               
                CrDeathDtl deathDtlEnc = encryptionDecryptionUtil.encryptObject(deathdtls, "BndDetail", CrDeathDtl.class);
                deathdtls.setDeceasedAadharNumber(deathDtlEnc.getDeceasedAadharNumber());
                deathdtls.setInformantAadharNo(deathDtlEnc.getInformantAadharNo());
                deathdtls.setMaleDependentAadharNo(deathDtlEnc.getMaleDependentAadharNo());
                deathdtls.setFemaleDependentAadharNo(deathDtlEnc.getFemaleDependentAadharNo());
                CrDeathAddressInfo  addressInfo = deathdtls.getAddressInfo();
                addressInfo.setParentdeathDtlId(deathdtls.getId());
                addressInfo.setAuditDetails(auditDetails);
                addressInfo.getPresentAddress().setId(UUID.randomUUID().toString());
                addressInfo.getPermanentAddress().setId(UUID.randomUUID().toString());
                addressInfo.getInformantAddress().setId(UUID.randomUUID().toString());
                addressInfo.getDeathplaceAddress().setId(UUID.randomUUID().toString());
                //addressInfo.getBurialAddress().setId(UUID.randomUUID().toString());
                addressInfo.getApplicantAddress().setId(UUID.randomUUID().toString());
                CrDeathApplicantDetails  applicantDetails = deathdtls.getApplicantDetails();
                applicantDetails.setId(UUID.randomUUID().toString());
                applicantDetails.setApplicantAadhar(deathDtlEnc.getApplicantDetails().getApplicantAadhar());
               });
      
    }

    private List<String> getIdList(RequestInfo requestInfo, String tenantId, String idKey,
                                   String idformat, int count) {
        List<IdResponse> idResponses = idGenRepository.getId(requestInfo, tenantId, idKey, idformat, count).getIdResponses();
        if (CollectionUtils.isEmpty(idResponses))
            throw new CustomException("IDGEN ERROR", "No ids returned from idgen Service");
        return idResponses.stream()
                .map(IdResponse::getId).collect(Collectors.toList());
    }
    public void setIdgenIds(CrDeathDtlRequest request) {
        RequestInfo requestInfo = request.getRequestInfo();
        // String tenantId = request.getDeathCertificateDtls().get(0).getTenantId();
        String tenantId = requestInfo.getUserInfo().getTenantId();
       // String tenantIdPath = tenantId.split("\\.")[1];
       // System.out.println("tenantIdPath"+tenantIdPath);
        List<CrDeathDtl> deathDtls = request.getDeathCertificateDtls();
        String applNo = getIdList(requestInfo, tenantId, config.getDeathApplnFileCodeName(), config.getDeathApplnFileCodeFormat(), 1).get(0);
        deathDtls.get(0).setDeathApplicationNo(applNo);

        String ackNo = getIdList(requestInfo, tenantId, config.getDeathAckName(), config.getDeathACKFormat(), 1).get(0);
        deathDtls.get(0).setDeathACKNo(ackNo);
    }    

    //UPDATE  BEGIN Jasmine
    public void enrichUpdate(CrDeathDtlRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.FALSE);
    
        request.getDeathCertificateDtls()
                .forEach(deathDtls -> {
                CrDeathDtl deathDtlEnc = encryptionDecryptionUtil.encryptObject(deathDtls, "BndDetail", CrDeathDtl.class);
                deathDtls.setDeceasedAadharNumber(deathDtlEnc.getDeceasedAadharNumber());
                deathDtls.setInformantAadharNo(deathDtlEnc.getInformantAadharNo());
                deathDtls.setMaleDependentAadharNo(deathDtlEnc.getMaleDependentAadharNo());
                deathDtls.setFemaleDependentAadharNo(deathDtlEnc.getFemaleDependentAadharNo());
                deathDtls.setAuditDetails(auditDetails);
                CrDeathAddressInfo  addressInfo = deathDtls.getAddressInfo();
                addressInfo.setParentdeathDtlId(deathDtls.getId());
                addressInfo.setAuditDetails(auditDetails);
                deathDtls.setAssignuser(deathDtls.getAssignees().get(0));
                } );
    
    }//UPDATE END

    
}
