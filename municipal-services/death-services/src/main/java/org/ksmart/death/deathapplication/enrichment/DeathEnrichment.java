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
import org.ksmart.death.deathapplication.web.models.AuditDetails;
import org.ksmart.death.deathapplication.web.models.DeathDtlRequest;
import org.ksmart.death.deathapplication.web.models.DeathFamilyInfo;
import org.ksmart.death.deathapplication.web.models.DeathDtl;
import org.ksmart.death.deathapplication.web.models.DeathAddressInfo;
import org.ksmart.death.deathapplication.web.models.DeathBasicInfo;
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

    //Rakhi S on 08.02.2023
    public void enrichCreate(DeathDtlRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);
        request.getDeathCertificateDtls()
               .forEach(deathdtls -> {
                deathdtls.getDeathBasicInfo().setId(UUID.randomUUID().toString());
                deathdtls.setDeathAuditDetails(auditDetails);
                //Rakhi S on 09.02.2023
                deathdtls.getDeathAddressInfo().setPresentAddrId(UUID.randomUUID().toString());
                deathdtls.getDeathAddressInfo().setPermanentAddrId(UUID.randomUUID().toString());
                deathdtls.getDeathStatisticalInfo().setStatisticalId(UUID.randomUUID().toString());                        
                //Encryption Jasmine 10.02.2023
                DeathBasicInfo deathBasicDtls = request.getDeathCertificateDtls().get(0).getDeathBasicInfo();
                DeathBasicInfo deathBasicEnc =  encryptionDecryptionUtil.encryptObject(deathBasicDtls, "BndDetail", DeathBasicInfo.class);
                deathBasicDtls.setDeceasedAadharNumber(deathBasicEnc.getDeceasedAadharNumber());
                DeathFamilyInfo deathFamilyDtls =request.getDeathCertificateDtls().get(0).getDeathFamilyInfo() ;
                DeathFamilyInfo deathFamilyEnc = encryptionDecryptionUtil.encryptObject(deathFamilyDtls, "BndDetail", DeathFamilyInfo.class);
                deathFamilyDtls.setFatherAadharNo(deathFamilyEnc.getFatherAadharNo());
                deathFamilyDtls.setMotherAadharNo(deathFamilyEnc.getMotherAadharNo());
                deathFamilyDtls.setSpouseAadhaar(deathFamilyEnc.getSpouseAadhaar());

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
            String ackNo=null;
            Long ackNoId=null;
            //Rakhi S on 08.02.2023 mdms call for tenand idgencode and lbtypecode
            Object mdmsData = util.mDMSCallRegNoFormating(request.getRequestInfo()
                                , request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getTenantId());

            Map<String,List<String>> masterData = getAttributeValues(mdmsData);

            String idgenCode = masterData.get(DeathConstants.TENANTS).toString();
            idgenCode = idgenCode.replaceAll("[\\[\\]\\(\\)]", "");

            Object mdmsDataLBType = util.mDMSCallLBType(request.getRequestInfo()
                            , request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getTenantId());

            Map<String,List<String>> masterDataLBType = getAttributeValues(mdmsDataLBType);

            String lbType = masterDataLBType.get(DeathConstants.TENANTS).toString();
            lbType = lbType.replaceAll("[\\[\\]\\(\\)]", "");

            String lbTypeCode = "";

            if(lbType.equals(DeathConstants.LB_TYPE_CORPORATION.toString())){
                lbTypeCode=DeathConstants.LB_TYPE_CORPORATION_CAPTION.toString();
            }
            else if(lbType.equals(DeathConstants.LB_TYPE_MUNICIPALITY.toString())){
                lbTypeCode=DeathConstants.LB_TYPE_MUNICIPALITY_CAPTION.toString();
            }
            //end
            System.out.println("ackNo"+ackNoDetails);
            if (ackNoDetails.size()>=1) {
                //Ackno new format decision by Domain team created by Rakhi S                       
                ackNo=String.valueOf(DeathConstants.ACK_NUMBER_CAPTION+"-"+ackNoDetails.get(0).get("ackno"))+"-"+String.valueOf(Year)+"-"+deathdtls.getDeathBasicInfo().getFuncionUID()+"-"+lbTypeCode+"-"+idgenCode+"-"+DeathConstants.STATE_CODE.toString();
                ackNoId=Long.parseLong(String.valueOf(ackNoDetails.get(0).get("ackno")));
            }
            else{
                ackNo=DeathConstants.ACK_NUMBER_CAPTION+"-"+DeathConstants.ACK_NUMBER_FIRST+"-"+String.valueOf(Year)+"-"+deathdtls.getDeathBasicInfo().getFuncionUID()+"-"+lbTypeCode+"-"+idgenCode+"-"+DeathConstants.STATE_CODE.toString();
                ackNoId=Long.parseLong(DeathConstants.ACK_NUMBER_FIRST);
            }

                deathdtls.getDeathBasicInfo().setDeathACKNo(ackNo);
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
//Jasmine 10.02.2023
             request.getDeathCertificateDtls()
                     .forEach(deathDtls -> {
                        DeathBasicInfo deathBasicDtls = request.getDeathCertificateDtls().get(0).getDeathBasicInfo();
                        DeathBasicInfo deathBasicEnc =  encryptionDecryptionUtil.encryptObject(deathBasicDtls, "BndDetail", DeathBasicInfo.class);
                        deathBasicDtls.setDeceasedAadharNumber(deathBasicEnc.getDeceasedAadharNumber());
                        DeathFamilyInfo deathFamilyDtls =request.getDeathCertificateDtls().get(0).getDeathFamilyInfo() ;
                        DeathFamilyInfo deathFamilyEnc = encryptionDecryptionUtil.encryptObject(deathFamilyDtls, "BndDetail", DeathFamilyInfo.class);
                        deathFamilyDtls.setFatherAadharNo(deathFamilyEnc.getFatherAadharNo());
                        deathFamilyDtls.setMotherAadharNo(deathFamilyEnc.getMotherAadharNo());
                        deathFamilyDtls.setSpouseAadhaar(deathFamilyEnc.getSpouseAadhaar());
                        deathDtls.setDeathAuditDetails(auditDetails);
                    } );        
        }//UPDATE END
}
