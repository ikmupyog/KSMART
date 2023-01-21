package org.ksmart.death.crdeath.enrichment;

import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.ksmart.death.common.Idgen.IdResponse;
import org.ksmart.death.common.contract.EncryptionDecryptionUtil;
import org.ksmart.death.common.repository.IdGenRepository;
import org.ksmart.death.common.repository.ServiceRequestRepository;
import org.ksmart.death.crdeath.config.CrDeathConfiguration;
import org.ksmart.death.crdeath.repository.CrDeathRepository;
import org.ksmart.death.crdeath.util.CrDeathConstants;
import org.ksmart.death.crdeath.util.CrDeathMdmsUtil;
import org.ksmart.death.crdeath.web.models.AuditDetails;
import org.ksmart.death.crdeath.web.models.CrDeathAddress;
import org.ksmart.death.crdeath.web.models.CrDeathAddressInfo;
import org.ksmart.death.crdeath.web.models.CrDeathApplicantDetails;
import org.ksmart.death.crdeath.web.models.CrDeathDtl;
import org.ksmart.death.crdeath.web.models.CrDeathDtlRequest;
import org.ksmart.death.crdeath.web.models.CrDeathStatistical;
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
    
    @Autowired
    CrDeathRepository repository;

     //rakhi s on 21.01.2023
     @Autowired
     CrDeathMdmsUtil util;

    public void enrichCreate(CrDeathDtlRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();

        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        request.getDeathCertificateDtls()
               .forEach(deathdtls -> {
                deathdtls.setId(UUID.randomUUID().toString());
                deathdtls.setAuditDetails(auditDetails);
                CrDeathStatistical  statisticalInfo =deathdtls.getStatisticalInfo();
                if (statisticalInfo!=null){
                    statisticalInfo.setId(UUID.randomUUID().toString());
                }             
                CrDeathDtl deathDtlEnc = encryptionDecryptionUtil.encryptObject(deathdtls, "BndDetail", CrDeathDtl.class);
                deathdtls.setDeceasedAadharNumber(deathDtlEnc.getDeceasedAadharNumber());
                deathdtls.setInformantAadharNo(deathDtlEnc.getInformantAadharNo());
                deathdtls.setMaleDependentAadharNo(deathDtlEnc.getMaleDependentAadharNo());
                deathdtls.setFemaleDependentAadharNo(deathDtlEnc.getFemaleDependentAadharNo());
                CrDeathAddressInfo  addressInfo = deathdtls.getAddressInfo();
                addressInfo.setParentdeathDtlId(deathdtls.getId());
                addressInfo.setAuditDetails(auditDetails);
                CrDeathAddress  presentAddress = deathdtls.getAddressInfo().getPresentAddress();
                CrDeathAddress  permanentAddress = deathdtls.getAddressInfo().getPermanentAddress();
                CrDeathAddress  deathplaceAddress = deathdtls.getAddressInfo().getDeathplaceAddress();
                CrDeathAddress  informantAddress = deathdtls.getAddressInfo().getInformantAddress();
                CrDeathAddress  applicantAddress = deathdtls.getAddressInfo().getApplicantAddress();
                if (informantAddress!=null){
                    addressInfo.getInformantAddress().setId(UUID.randomUUID().toString());
                }
               if(presentAddress!=null){
                    addressInfo.getPresentAddress().setId(UUID.randomUUID().toString());
                }
                if(permanentAddress!=null){
                    addressInfo.getPermanentAddress().setId(UUID.randomUUID().toString());
                }
                if(deathplaceAddress!=null){
                    addressInfo.getDeathplaceAddress().setId(UUID.randomUUID().toString());
                }
                if(applicantAddress!=null){
                    addressInfo.getApplicantAddress().setId(UUID.randomUUID().toString());
                }   
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
  //Rakhi S on 21.01.2023 ACK no formating
     public void setACKNumber(CrDeathDtlRequest request) {
            RequestInfo requestInfo = request.getRequestInfo();
            int Year = Calendar.getInstance().get(Calendar.YEAR) ;
            Long currentTime = Long.valueOf(System.currentTimeMillis());
            String tenantId = requestInfo.getUserInfo().getTenantId();
            List<Map<String, Object>> ackNoDetails = repository.getDeathACKDetails(tenantId, Year);

            request.getDeathCertificateDtls()
            .forEach(deathdtls -> {    
                String ackNo=null;
                Long ackNoId=null;
                //Rakhi S on 21.01.2023 mdms call for tenand idgencode and lbtypecode
                // Object mdmsData = util.mDMSCallRegNoFormating(request.getRequestInfo()
                //                     , request.getDeathCertificateDtls().get(0).getTenantId());

                // Map<String,List<String>> masterData = getAttributeValues(mdmsData);

                // String idgenCode = masterData.get(CrDeathRegistryConstants.TENANTS).toString();
                // idgenCode = idgenCode.replaceAll("[\\[\\]\\(\\)]", "");

                // Object mdmsDataLBType = util.mDMSCallLBType(request.getRequestInfo()
                //                 , request.getDeathCertificateDtls().get(0).getTenantId());

                // Map<String,List<String>> masterDataLBType = getAttributeValues(mdmsDataLBType);

                // String lbType = masterDataLBType.get(CrDeathRegistryConstants.TENANTS).toString();
                // lbType = lbType.replaceAll("[\\[\\]\\(\\)]", "");

                // String lbTypeCode = "";

                // if(lbType.equals(CrDeathRegistryConstants.LB_TYPE_CORPORATION.toString())){
                //     lbTypeCode=CrDeathRegistryConstants.LB_TYPE_CORPORATION_CAPTION.toString();
                // }
                // else if(lbType.equals(CrDeathRegistryConstants.LB_TYPE_MUNICIPALITY.toString())){
                //     lbTypeCode=CrDeathRegistryConstants.LB_TYPE_MUNICIPALITY_CAPTION.toString();
                // }
                //end

                if (ackNoDetails.size()>=1) {
                    //Ackno new format decision by Domain team created by Rakhi S                       
                    ackNo=String.valueOf("AK-"+ackNoDetails.get(0).get("ackno"))+"-"+String.valueOf(Year)+"-"+CrDeathConstants.DEATH_REGNO_UID.toString()+"-"+"C"+"-"+"KOCHI"+"-"+CrDeathConstants.STATE_CODE.toString();
                    ackNoId=Long.parseLong(String.valueOf(ackNoDetails.get(0).get("ackno")));
                }
                else{
                    ackNo="AK-"+CrDeathConstants.ACK_NUMBER_FIRST+"-"+String.valueOf(Year)+"-"+CrDeathConstants.DEATH_REGNO_UID.toString()+"-"+"KOCHI"+"-"+"C"+"-"+CrDeathConstants.STATE_CODE.toString();
                    ackNoId=Long.parseLong(CrDeathConstants.ACK_NUMBER_FIRST);
                }

                    deathdtls.setDeathACKNo(ackNo);
                    deathdtls.setAckNoId(ackNoId);
                    deathdtls.setApplicationDate(currentTime);
            });
    
     }
    
}
