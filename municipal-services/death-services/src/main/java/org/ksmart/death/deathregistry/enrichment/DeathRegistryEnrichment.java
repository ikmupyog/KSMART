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
import org.ksmart.death.deathregistry.config.DeathRegistryConfiguration;
import org.ksmart.death.deathregistry.repository.DeathRegistryRepository;
import org.ksmart.death.deathregistry.web.models.AuditDetails;
import org.ksmart.death.deathregistry.web.models.DeathRegistryRequest;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.jayway.jsonpath.JsonPath;

import lombok.extern.slf4j.Slf4j;

@Slf4j

/**
     * Creates DeathRegistryEnrichment for UUID ,Audit details and IDGeneration 
     * by Rakhi S IKM on 09.02.2023
     */

@Component
public class DeathRegistryEnrichment implements BaseEnrichment{

   
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

    // @Autowired
    // DeathRegistryMdmsUtil util;

//Rakhi S ikm on 09.02.2023
    public void enrichCreate(DeathRegistryRequest request) {

        RequestInfo requestInfo = request.getRequestInfo();
        User userInfo = requestInfo.getUserInfo();
        
        AuditDetails auditDetails = buildAuditDetails(userInfo.getUuid(), Boolean.TRUE);

        request.getDeathCertificateDtls()
               .forEach(deathdtls -> {
                deathdtls.getDeathBasicInfo().setId(UUID.randomUUID().toString());
                deathdtls.setDeathAuditDetails(auditDetails);                 
            });
    }
    //Registration Number Creation by Rakhi S ikm on 09.02.2023
    // public void setRegistrationNumberDetails(DeathRegistryRequest request) {
    //     RequestInfo requestInfo = request.getRequestInfo();
    //     int Year = Calendar.getInstance().get(Calendar.YEAR) ;
    //     Long currentTime = Long.valueOf(System.currentTimeMillis());
    //     String tenantId = requestInfo.getUserInfo().getTenantId();
    //     List<Map<String, Object>> RegistrationNoDetails = repository.getDeathRegDetails(tenantId, Year);
        
    //     request.getDeathCertificateDtls()
    //             .forEach(deathdtls -> {    
    //                 String registrationNo=null;
    //                 Long registrationNoId=null;
    //                 //Rakhi S on 21.01.2023 mdms call for tenand idgencode and lbtypecode
    //                 Object mdmsData = util.mDMSCallRegNoFormating(request.getRequestInfo()
    //                                     , request.getDeathCertificateDtls().get(0).getTenantId());

    //                 Map<String,List<String>> masterData = getAttributeValues(mdmsData);

    //                 String idgenCode = masterData.get(CrDeathRegistryConstants.TENANTS).toString();
    //                 idgenCode = idgenCode.replaceAll("[\\[\\]\\(\\)]", "");

    //                 Object mdmsDataLBType = util.mDMSCallLBType(request.getRequestInfo()
    //                                 , request.getDeathCertificateDtls().get(0).getTenantId());

    //                 Map<String,List<String>> masterDataLBType = getAttributeValues(mdmsDataLBType);

    //                 String lbType = masterDataLBType.get(CrDeathRegistryConstants.TENANTS).toString();
    //                 lbType = lbType.replaceAll("[\\[\\]\\(\\)]", "");

    //                 String lbTypeCode = "";

    //                 if(lbType.equals(CrDeathRegistryConstants.LB_TYPE_CORPORATION.toString())){
    //                     lbTypeCode=CrDeathRegistryConstants.LB_TYPE_CORPORATION_CAPTION.toString();
    //                 }
    //                 else if(lbType.equals(CrDeathRegistryConstants.LB_TYPE_MUNICIPALITY.toString())){
    //                     lbTypeCode=CrDeathRegistryConstants.LB_TYPE_MUNICIPALITY_CAPTION.toString();
    //                 }
    //                 //end

    //                 if (RegistrationNoDetails.size()>=1) {
    //                     //RegistrationNo new format decision by Domain team created by Rakhi S                       
    //                     registrationNo=String.valueOf("RG-"+RegistrationNoDetails.get(0).get("regno"))+"-"+String.valueOf(Year)+"-"+CrDeathRegistryConstants.DEATH_REGNO_UID.toString()+"-"+lbTypeCode+"-"+idgenCode+"-"+CrDeathRegistryConstants.STATE_CODE.toString();
    //                     registrationNoId=Long.parseLong(String.valueOf(RegistrationNoDetails.get(0).get("regno")));
    //                 }
    //                 else{
    //                     registrationNo="RG-"+CrDeathRegistryConstants.REGISTRATION_NUMBER_FIRST+"-"+String.valueOf(Year)+"-"+CrDeathRegistryConstants.DEATH_REGNO_UID.toString()+"-"+lbTypeCode+"-"+idgenCode+"-"+CrDeathRegistryConstants.STATE_CODE.toString();
    //                     registrationNoId=Long.parseLong(CrDeathRegistryConstants.REGISTRATION_NUMBER_FIRST);
    //                 }

    //                     deathdtls.setRegistrationNo(registrationNo);
    //                     deathdtls.setRegistrationNoId(registrationNoId);
    //                     deathdtls.setRegistrationDate(currentTime);
    //             });     
    // }  

    // //Rakhi S ikm on 09.02.2023
    // private Map<String, List<String>> getAttributeValues(Object mdmsdata){
    //     List<String> modulepaths = Arrays.asList(CrDeathRegistryConstants.TENANT_JSONPATH);
    //     final Map<String, List<String>> mdmsResMap = new HashMap<>();
       
    //     modulepaths.forEach(modulepath -> {
    //         try {
    //             mdmsResMap.putAll(JsonPath.read(mdmsdata,modulepath));
    //             log.error("jsonpath1"+JsonPath.read(mdmsdata,modulepath));
    //         } catch (Exception e) {
    //             log.error("Error while fetching MDMS data",e);
    //             throw new CustomException(CrDeathRegistryConstants.INVALID_TENANT_ID_MDMS_KEY,
    //             CrDeathRegistryConstants.INVALID_TENANT_ID_MDMS_MSG);
    //         }
           
    //     });
    //     // System.out.println("mdmsResMap"+mdmsResMap);
    //     return mdmsResMap;
    // }

    // //Certificate Number Creation by Rakhi S 23.01.2023
    // public void setCertificateNumberDetails(CrDeathRegistryRequest request) {
    //     RequestInfo requestInfo = request.getRequestInfo();
    //     int Year = Calendar.getInstance().get(Calendar.YEAR) ;
    //     Long currentTime = Long.valueOf(System.currentTimeMillis());
    //     String tenantId = requestInfo.getUserInfo().getTenantId();
    //     List<Map<String, Object>> RegistrationNoDetails = repository.getDeathCertificate(tenantId, Year);
        
    //     request.getDeathCertificateDtls()
    //             .forEach(deathdtls -> {    
    //                 String certificateNo=null;
    //                 Long certificateNoId=null;
    //                 //Rakhi S on 23.01.2023 mdms call for tenand idgencode and lbtypecode
    //                 Object mdmsData = util.mDMSCallRegNoFormating(request.getRequestInfo()
    //                                     , request.getDeathCertificateDtls().get(0).getTenantId());

    //                 Map<String,List<String>> masterData = getAttributeValues(mdmsData);

    //                 String idgenCode = masterData.get(CrDeathRegistryConstants.TENANTS).toString();
    //                 idgenCode = idgenCode.replaceAll("[\\[\\]\\(\\)]", "");

    //                 Object mdmsDataLBType = util.mDMSCallLBType(request.getRequestInfo()
    //                                 , request.getDeathCertificateDtls().get(0).getTenantId());

    //                 Map<String,List<String>> masterDataLBType = getAttributeValues(mdmsDataLBType);

    //                 String lbType = masterDataLBType.get(CrDeathRegistryConstants.TENANTS).toString();
    //                 lbType = lbType.replaceAll("[\\[\\]\\(\\)]", "");

    //                 String lbTypeCode = "";

    //                 if(lbType.equals(CrDeathRegistryConstants.LB_TYPE_CORPORATION.toString())){
    //                     lbTypeCode=CrDeathRegistryConstants.LB_TYPE_CORPORATION_CAPTION.toString();
    //                 }
    //                 else if(lbType.equals(CrDeathRegistryConstants.LB_TYPE_MUNICIPALITY.toString())){
    //                     lbTypeCode=CrDeathRegistryConstants.LB_TYPE_MUNICIPALITY_CAPTION.toString();
    //                 }
    //                 //end

    //                 if (RegistrationNoDetails.size()>=1) {
    //                     //RegistrationNo new format decision by Domain team created by Rakhi S                       
    //                     certificateNo=String.valueOf("CT-"+RegistrationNoDetails.get(0).get("certNo"))+"-"+String.valueOf(Year)+"-"+deathdtls.getFuncionUID()+"-"+lbTypeCode+"-"+idgenCode+"-"+CrDeathRegistryConstants.STATE_CODE.toString();
    //                     certificateNoId=Long.parseLong(String.valueOf(RegistrationNoDetails.get(0).get("certNo")));
    //                 }
    //                 else{
    //                     certificateNo="CT-"+CrDeathRegistryConstants.REGISTRATION_NUMBER_FIRST+"-"+String.valueOf(Year)+"-"+deathdtls.getFuncionUID()+"-"+lbTypeCode+"-"+idgenCode+"-"+CrDeathRegistryConstants.STATE_CODE.toString();
    //                     certificateNoId=Long.parseLong(CrDeathRegistryConstants.REGISTRATION_NUMBER_FIRST);
    //                 }

    //                     deathdtls.setCertificateNo(certificateNo);
    //                     deathdtls.setCertificateNoId(certificateNoId);
    //                     deathdtls.setCertificateDate(currentTime);
    //             });       
    // }  
}
