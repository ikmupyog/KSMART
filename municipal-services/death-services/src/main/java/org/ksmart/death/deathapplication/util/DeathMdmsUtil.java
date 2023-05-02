package org.ksmart.death.deathapplication.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

import org.egov.common.contract.request.RequestInfo;
import org.egov.mdms.model.MasterDetail;
import org.egov.mdms.model.MdmsCriteria;
import org.egov.mdms.model.MdmsCriteriaReq;
import org.egov.mdms.model.ModuleDetail;
import org.ksmart.death.common.repository.ServiceRequestRepository;
import org.ksmart.death.deathapplication.config.DeathConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.jayway.jsonpath.JsonPath;

/**
     * Creates DeathMdmsUtil 
     * Rakhi S IKM
     * on 08.02.2023
     */
@Component
public class DeathMdmsUtil {
    
    private ServiceRequestRepository serviceRequestRepository;
    private DeathConfiguration config;

    @Autowired
    public DeathMdmsUtil(DeathConfiguration config, ServiceRequestRepository serviceRequestRepository) {
        this.config = config;
        this.serviceRequestRepository = serviceRequestRepository;
    }

    //RAkhi S ikm on 08.02.2023
    public Object mDMSCallRegNoFormating(RequestInfo requestInfo
                                    , String tenantId) {
            MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequestRegNoFormating(requestInfo
                                                    , tenantId);
            Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
            return result;
    }
    //RAkhi S ikm on 08.02.2023
    private MdmsCriteriaReq getMDMSRequestRegNoFormating(RequestInfo requestInfo
                            , String tenantId) {
        ModuleDetail tenantIdRequest = getTenantIdRegNoFormating(tenantId);
        List<ModuleDetail> moduleDetails = new LinkedList<>();
        moduleDetails.add(tenantIdRequest);     
        MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(config.getEgovStateLevelTenant())
                                    .build();

        MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
        .requestInfo(requestInfo).build();

        // System.out.println("mdmsreq2"+mdmsCriteriaReq);
        return mdmsCriteriaReq;
    }
    public StringBuilder getMdmsSearchUrl() {
        return new StringBuilder().append(config.getMdmsHost()).append(config.getMdmsEndPoint());
    }

    //RAkhi S ikm on 08.02.2023
    private ModuleDetail getTenantIdRegNoFormating(String tenantId) {

        // master details for crDeath module
        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();

        // filter to only get code field from master data            
        final String filterCode = "$.[?(@.code=='"+tenantId+"')].city.idgencode";
        crDeathMasterDetails
        .add(MasterDetail.builder().name(DeathConstants.TENANTS).filter(filterCode).build());       

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
        .moduleName(DeathConstants.TENANT_MODULE_NAME).build();


        return crDeathModuleDtls;
    }
   //RAkhi S ikm on 08.02.2023
    public Object mDMSCallLBType(RequestInfo requestInfo
        , String tenantId) {
        MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequestLBType(requestInfo
                , tenantId);
        Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
        return result;
    }
    //RAkhi S ikm on 08.02.2023
    private MdmsCriteriaReq getMDMSRequestLBType(RequestInfo requestInfo
                , String tenantId) {
        ModuleDetail tenantIdRequest = getTenantIdLBType(tenantId);
        List<ModuleDetail> moduleDetails = new LinkedList<>();
        moduleDetails.add(tenantIdRequest);     
        MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(config.getEgovStateLevelTenant())
        .build();

        MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
        .requestInfo(requestInfo).build();

        // System.out.println("mdmsreq2"+mdmsCriteriaReq);
        return mdmsCriteriaReq;
    }
    //RAkhi S ikm on 08.02.2023
    private ModuleDetail getTenantIdLBType(String tenantId) {

        // master details for crDeath module
        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();

        // filter to only get code field from master data            
        final String filterCode = "$.[?(@.code=='"+tenantId+"')].city.lbtypecode";
        crDeathMasterDetails
        .add(MasterDetail.builder().name(DeathConstants.TENANTS).filter(filterCode).build());       

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
            .moduleName(DeathConstants.TENANT_MODULE_NAME).build();


        return crDeathModuleDtls;
    }
    //Rakhi S ikm on 14.02.2023
    public Object mDMSCall(RequestInfo requestInfo, String tenantId) {
        MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequest(requestInfo, tenantId);
        Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
        return result;
    }
     //Rakhi S ikm on 14.02.2023
    private MdmsCriteriaReq getMDMSRequest(RequestInfo requestInfo, String tenantId) {
        ModuleDetail tenantIdRequest = getTenantIdRequest(tenantId);
        ModuleDetail commomMasterRequest = getCommonMastersRequest();
        List<ModuleDetail> BNDListRequest = getBNDListRequest();

        List<ModuleDetail> moduleDetails = new LinkedList<>();
        moduleDetails.add(tenantIdRequest);
        moduleDetails.add(commomMasterRequest);
        moduleDetails.addAll(BNDListRequest);

        MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(config.getEgovStateLevelTenant())
                                    .build();

        MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
                .requestInfo(requestInfo).build();
        return mdmsCriteriaReq;
    }
     /**
     * Creates request to search tenantID in mdms
     * Rakhi S ikm on 14.02.2023
     * @return MDMS request for tenantID
     */
    private ModuleDetail getTenantIdRequest(String tenantId) {

        // master details for crDeath module
        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();

        // filter to only get code field from master data    
        final String filterCode = "$.[?(@.code=='"+tenantId+"')].*";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(DeathConstants.TENANTS).filter(filterCode).build());

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(DeathConstants.TENANT_MODULE_NAME).build();
       
        return crDeathModuleDtls;
    }
     /**
     * Creates request to search  mdms
     * Rakhi S ikm on 14.02.2023
     * @return MDMS request for Gender Type
     */
    private ModuleDetail getCommonMastersRequest() {

        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();  
        //Gender
        final String filterCodeGender = "$.[?(@.active==true)].code";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(DeathConstants.GENDERTYPE).filter(filterCodeGender).build());
        //Death Place Type
        final String filterCodeDeathPlace = "$.[?(@.active==true)].code";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(DeathConstants.DEATH_PLACE_LIST).filter(filterCodeDeathPlace).build());
        //District
        final String filterCodeDistrict = "$.[?(@.active==true)].code";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(DeathConstants.DISTRICT).filter(filterCodeDistrict).build());   
        //State
        final String filterCodeState = "$.[?(@.active==true)].code";
        crDeathMasterDetails
                 .add(MasterDetail.builder().name(DeathConstants.STATE).filter(filterCodeState).build());    
        //Country
        final String filterCodeCountry = "$.[?(@.active==true)].code";
        crDeathMasterDetails
                 .add(MasterDetail.builder().name(DeathConstants.COUNTRY).filter(filterCodeCountry).build());     
        //Religion
        final String filterCodeReligion = "$.[?(@.active==true)].code";
        crDeathMasterDetails
                 .add(MasterDetail.builder().name(DeathConstants.RELIGION).filter(filterCodeReligion).build());         

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(DeathConstants.COMMON_MASTER_MODULE_NAME).build();
       
        return crDeathModuleDtls;
    }
    /**
     * Creates request to search in mdms
     * Rakhi S ikm on 14.02.2023
     * @return MDMS request for bnd list
     */
    private List<ModuleDetail> getBNDListRequest() {

        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();
        final String filterCodeDeathCauseMain = "$.[?(@.active==true)].code";
         crDeathMasterDetails
                    .add(MasterDetail.builder().name(DeathConstants.DEATH_CAUSE_MAIN).filter(filterCodeDeathCauseMain).build());
                    
        final String filterCodeDeathCauseSub = "$.[?(@.active==true)].code";
        crDeathMasterDetails
                           .add(MasterDetail.builder().name(DeathConstants.DEATH_CAUSE_SUB).filter(filterCodeDeathCauseSub).build());        

        final String filterCodeAgeUnit = "$.[?(@.active==true)].code";
         crDeathMasterDetails
                              .add(MasterDetail.builder().name(DeathConstants.AGE_UNIT).filter(filterCodeAgeUnit).build());

        final String filterCodeMedicalAttention = "$.[?(@.active==true)].code";
        crDeathMasterDetails
                            .add(MasterDetail.builder().name(DeathConstants.MEDICAL_ATTENTION_TYPE).filter(filterCodeMedicalAttention).build());
       
        // Add Module workflow
        crDeathMasterDetails.add(MasterDetail.builder()
                                                        .name(DeathConstants.CR_MDMS_WORKFLOW_NEW)
                                                        .build());

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(DeathConstants.BND_MODULE_NAME).build();

               
         return Arrays.asList(crDeathModuleDtls);
    }
    //Rakhi S on 02.03.2023
    public Object mDMSCallHospital(RequestInfo requestInfo  
                                , String tenantId   
                                , String deathPlace) {
                MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequestHospital(requestInfo   
                                                , tenantId
                                                , deathPlace);
                Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
                return result;
       }
    //Rakhi S on 02.03.2023
    private MdmsCriteriaReq getMDMSRequestHospital(RequestInfo requestInfo    
                                , String tenantId                       
                                , String deathPlace) {

                // ModuleDetail tenantIdRequest = getTenantIdCertificate(tenantId);
                ModuleDetail commonMasterRequest = getcommonMasterRequestHospial(
                                tenantId
                                ,deathPlace);    

                List<ModuleDetail> moduleDetails = new LinkedList<>();
                // moduleDetails.add(tenantIdRequest);
                moduleDetails.add(commonMasterRequest);

                MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(tenantId)
                        .build();

                MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
                .requestInfo(requestInfo).build();

                // System.out.println("mdmsreq2"+mdmsCriteriaReq);
                return mdmsCriteriaReq;
      }	   
      //Rakhi S on 02.03.2023
      private ModuleDetail  getcommonMasterRequestHospial( String tenantId, String deathPlace ) {

        // master details for death certificate
        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();      
        final String perAddrfilterCode = "$.[?(@.code=='"+deathPlace+"')].address";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(DeathConstants.HOSPITAL_DATA).filter(perAddrfilterCode).build());  

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(DeathConstants.TENANT_EGOV_LOCATION).build();
               
         return (crDeathModuleDtls);
    }   

      //Rakhi S on 02.03.2023
    public Object mDMSCallHospitalMl(RequestInfo requestInfo  
                        , String tenantId   
                        , String deathPlace) {
         MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequestHospitalMl(requestInfo   
                        , tenantId
                        , deathPlace);
         Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
         return result;
    }
      //Rakhi S on 02.03.2023
    private MdmsCriteriaReq getMDMSRequestHospitalMl(RequestInfo requestInfo    
            , String tenantId                       
            , String deathPlace) {

        // ModuleDetail tenantIdRequest = getTenantIdCertificate(tenantId);
        ModuleDetail commonMasterRequest = getcommonMasterRequestHospialMl(
            tenantId
            ,deathPlace);    

        List<ModuleDetail> moduleDetails = new LinkedList<>();
        // moduleDetails.add(tenantIdRequest);
        moduleDetails.add(commonMasterRequest);

        MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(tenantId)
        .build();

        MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
        .requestInfo(requestInfo).build();

        // System.out.println("mdmsreq2"+mdmsCriteriaReq);
        return mdmsCriteriaReq;
    }
     //Rakhi S on 02.03.2023
    private ModuleDetail  getcommonMasterRequestHospialMl( String tenantId, String deathPlace ) {

        // master details for death certificate
        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();      
        final String perAddrfilterCode = "$.[?(@.code=='"+deathPlace+"')].addressLocal";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(DeathConstants.HOSPITAL_DATA).filter(perAddrfilterCode).build());  

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(DeathConstants.TENANT_EGOV_LOCATION).build();
               
         return (crDeathModuleDtls);
    }
    //Rakhi S on 02.04.2023
    public Object mDMSCallInstitution(RequestInfo requestInfo  
                                                    , String tenantId  
                                                    , String deathPlaceInstId) {
        MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequestInstitution(requestInfo   
                                                    , tenantId
                                                    , deathPlaceInstId);
        Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
        return result;
    }
     //Rakhi S on 02.04.2023
     private MdmsCriteriaReq getMDMSRequestInstitution(RequestInfo requestInfo    
                                , String tenantId                       
                                , String deathPlaceInstId) {

        // ModuleDetail tenantIdRequest = getTenantIdCertificate(tenantId);
        ModuleDetail commonMasterRequest = getcommonMasterRequestInstitution(deathPlaceInstId); 
                 
                List<ModuleDetail> moduleDetails = new LinkedList<>();
                // moduleDetails.add(tenantIdRequest);
                moduleDetails.add(commonMasterRequest);

                MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(tenantId)
                .build();

                MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
                .requestInfo(requestInfo).build();

                // System.out.println("mdmsreq2"+mdmsCriteriaReq);
                return mdmsCriteriaReq;
        }
    //Rakhi S on 02.04.2023
      private ModuleDetail  getcommonMasterRequestInstitution(String deathPlaceInstId) {

                 // master details for crDeath module
                List<MasterDetail> crDeathMasterDetails = new ArrayList<>();
                // master details for death certificate              
                final String institutionfilterCode = "$.[?(@.code=='"+deathPlaceInstId+"')].address"; 
                crDeathMasterDetails
                .add(MasterDetail.builder().name(DeathConstants.INSTITUTION_NAME).filter(institutionfilterCode).build());       
                
                ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(DeathConstants.TENANT_EGOV_LOCATION).build();

                return (crDeathModuleDtls);
        }
    //Rakhi S on 02.04.2023
        public Object mDMSCallInstitutionMl(RequestInfo requestInfo  
                                , String tenantId  
                                , String deathPlaceInstId) {
                MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequestInstitutionMl(requestInfo   
                , tenantId
                , deathPlaceInstId);
                Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
                return result;
        }
        //Rakhi S on 02.04.2023
        private MdmsCriteriaReq getMDMSRequestInstitutionMl(RequestInfo requestInfo    
                                , String tenantId                       
                                , String deathPlaceInstId) {

                // ModuleDetail tenantIdRequest = getTenantIdCertificate(tenantId);
                ModuleDetail commonMasterRequest = getcommonMasterRequestInstitutionMl(deathPlaceInstId); 
                 
                List<ModuleDetail> moduleDetails = new LinkedList<>();
                // moduleDetails.add(tenantIdRequest);
                moduleDetails.add(commonMasterRequest);

                MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(tenantId)
                .build();

                MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
                .requestInfo(requestInfo).build();

                // System.out.println("mdmsreq2"+mdmsCriteriaReq);
                return mdmsCriteriaReq;
        }
        //Rakhi S on 02.04.2023
        private ModuleDetail  getcommonMasterRequestInstitutionMl(String deathPlaceInstId) {

               List<MasterDetail> crDeathMasterDetails = new ArrayList<>();           
               final String institutionfilterCode = "$.[?(@.code=='"+deathPlaceInstId+"')].addressLocal"; 
               crDeathMasterDetails
               .add(MasterDetail.builder().name(DeathConstants.INSTITUTION_NAME).filter(institutionfilterCode).build());       
               
               ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
               .moduleName(DeathConstants.TENANT_EGOV_LOCATION).build();

               return (crDeathModuleDtls);
       }
       //RAkhi S ikm on 25.04.2023
     public Object mDMSCallCertificateP(RequestInfo requestInfo  
                                , String tenantId   
                                , String permanentAddressDistrict
                                , String permanentAddressState
                                , String permanentAddressCountry
                                , String permanentPostOfficeId
                                , String permanentVillage
                                , String permanentTaluk) {
        MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequestCertificateP(requestInfo   
                                                , tenantId
                                                , permanentAddressDistrict
                                                , permanentAddressState
                                                , permanentAddressCountry
                                                , permanentPostOfficeId
                                                , permanentVillage
                                                , permanentTaluk);
        Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
        return result;
        }
        private MdmsCriteriaReq getMDMSRequestCertificateP(RequestInfo requestInfo    
                            , String tenantId                       
                            , String permanentAddressDistrict
                            , String permanentAddressState
                            , String permanentAddressCountry
                            , String permanentPostOfficeId
                            , String permanentVillage
                            , String permanentTaluk) {

        ModuleDetail tenantIdRequest = getTenantIdCertificate(tenantId);
        List<ModuleDetail> commonMasterRequest = getcommonMasterRequestP(
                                 tenantId
                                ,permanentAddressDistrict
                                ,permanentAddressState
                                ,permanentAddressCountry
                                ,permanentPostOfficeId
                                ,permanentVillage
                                ,permanentTaluk);  
        List<ModuleDetail> moduleDetails = new LinkedList<>();
        moduleDetails.add(tenantIdRequest);
        moduleDetails.addAll(commonMasterRequest);

        MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(config.getEgovStateLevelTenant())
                                        .build();

        MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
                .requestInfo(requestInfo).build();

        //  System.out.println("mdmsreq2"+mdmsCriteriaReq);
        return mdmsCriteriaReq;
        }
        private List<ModuleDetail> getcommonMasterRequestP( String tenantId
                                        , String permanentAddressDistrict
                                        , String permanentAddressState
                                        , String permanentAddressCountry
                                        , String permanentPostOfficeId
                                        , String permanentVillage
                                        , String permanentTaluk) {

        // master details for death certificate
        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();      
        final String perAddrfilterCode = "$.[?(@.code=='"+permanentAddressDistrict+"')].name";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(DeathConstants.DISTRICT).filter(perAddrfilterCode).build());  
        
        final String perAddrfilterCodeState = "$.[?(@.code=='"+permanentAddressState+"')].name"; 
        crDeathMasterDetails
                .add(MasterDetail.builder().name(DeathConstants.STATE).filter(perAddrfilterCodeState).build());        
                
        final String perAddrfilterCodeCountry = "$.[?(@.code=='"+permanentAddressCountry+"')].name"; 
        crDeathMasterDetails
                .add(MasterDetail.builder().name(DeathConstants.COUNTRY).filter(perAddrfilterCodeCountry).build()); 

        final String filterCodePostOffice = "$.[?(@.code=='"+permanentPostOfficeId+"')].name";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(DeathConstants.POSTOFFICE).filter(filterCodePostOffice).build()); 
        //Rakhi S ikm on 12.02.2023
        final String filterCodeVillage = "$.[?(@.code=='"+permanentVillage+"')].name";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(DeathConstants.VILLAGE).filter(filterCodeVillage).build());

        final String filterCodeTaluk= "$.[?(@.code=='"+permanentTaluk+"')].name";
        crDeathMasterDetails
                        .add(MasterDetail.builder().name(DeathConstants.TALUK).filter(filterCodeTaluk).build());

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(DeathConstants.COMMON_MASTERS_MODULE).build();

               
         return Arrays.asList(crDeathModuleDtls);
    }
     //RAkhi S ikm on 25.04.2023
     private ModuleDetail getTenantIdCertificate(String tenantId) {

        // master details for crDeath module
        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();

        // filter to only get code field from master data            
        final String filterCode = "$.[?(@.code=='"+tenantId+"')].name";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(DeathConstants.TENANTS).filter(filterCode).build());       

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(DeathConstants.TENANT_MODULE_NAME).build();

       
        return crDeathModuleDtls;
    }

    //Rakhi S ikm on 29.04.2023
    public Object mDMSSearch(RequestInfo requestInfo, String tenantId) {
        MdmsCriteriaReq mdmsCriteriaReq = getMDMSSearchRequest(requestInfo, tenantId);
        Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
        return result;
    }
    private MdmsCriteriaReq getMDMSSearchRequest(RequestInfo requestInfo, String tenantId) {
        ModuleDetail tenantIdRequest = getTenantDetails(tenantId);
        ModuleDetail commomMasterRequest = getCommonMastersSearch();
        List<ModuleDetail> BNDListRequest = getBNDSearch();

        List<ModuleDetail> moduleDetails = new LinkedList<>();
        moduleDetails.add(tenantIdRequest);
        moduleDetails.add(commomMasterRequest);
        moduleDetails.addAll(BNDListRequest);

        MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(config.getEgovStateLevelTenant())
                                    .build();

        MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
                .requestInfo(requestInfo).build();
        return mdmsCriteriaReq;
    }
      /**
     * Creates request to search  mdms
     * Rakhi S ikm on 29.04.2023
     * @return MDMS request for Gender Type
     */
    private ModuleDetail getCommonMastersSearch() {

        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();  
        //Gender
        crDeathMasterDetails
                .add(MasterDetail.builder().name(DeathConstants.GENDERTYPE)
                .build());
        //Death Place Type        
        crDeathMasterDetails
                .add(MasterDetail.builder().name(DeathConstants.DEATH_PLACE_LIST)
                .build());
        //District        
        crDeathMasterDetails
                .add(MasterDetail.builder().name(DeathConstants.DISTRICT)
                .build());   
        //State        
        crDeathMasterDetails
                 .add(MasterDetail.builder().name(DeathConstants.STATE)
                 .build());    
        //Country        
        crDeathMasterDetails
                 .add(MasterDetail.builder().name(DeathConstants.COUNTRY)
                 .build());     
        //Religion        
        crDeathMasterDetails
                 .add(MasterDetail.builder().name(DeathConstants.RELIGION)
                 .build());  
        //Occupation        
        crDeathMasterDetails
                 .add(MasterDetail.builder().name(DeathConstants.OCCUPATION)
                 .build());                   
        //PostOffice
        crDeathMasterDetails
                        .add(MasterDetail.builder().name(DeathConstants.POSTOFFICE)
                        .build());  
                        
        //Taluk
        crDeathMasterDetails
                        .add(MasterDetail.builder().name(DeathConstants.TALUK)
                        .build()); 
        //VILLAGE
        crDeathMasterDetails
                        .add(MasterDetail.builder().name(DeathConstants.VILLAGE)
                        .build());       

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(DeathConstants.COMMON_MASTER_MODULE_NAME).build();
       
        return crDeathModuleDtls;
    }
    /**
     * Creates request to search in mdms
     * Rakhi S ikm on 29.04.2023
     * @return MDMS request for bnd list
     */
    private List<ModuleDetail> getBNDSearch() {

        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();
         crDeathMasterDetails
                    .add(MasterDetail.builder().name(DeathConstants.DEATH_CAUSE_MAIN)
                    .build());
        crDeathMasterDetails
                           .add(MasterDetail.builder().name(DeathConstants.DEATH_CAUSE_SUB)
                           .build());        
         crDeathMasterDetails
                              .add(MasterDetail.builder().name(DeathConstants.AGE_UNIT)
                              .build());
        crDeathMasterDetails
                            .add(MasterDetail.builder().name(DeathConstants.MEDICAL_ATTENTION_TYPE)
                            .build());
        crDeathMasterDetails
                            .add(MasterDetail.builder().name(DeathConstants.MANNER_OF_DEATH)
                            .build());
        crDeathMasterDetails
                            .add(MasterDetail.builder().name(DeathConstants.BND_MDMS_PUBLIC_PLACES)
                            .build());
       
        // Add Module workflow
        crDeathMasterDetails.add(MasterDetail.builder()
                                                        .name(DeathConstants.CR_MDMS_WORKFLOW_NEW)
                                                        .build());

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(DeathConstants.BND_MODULE_NAME).build();

               
         return Arrays.asList(crDeathModuleDtls);
    }

    //Rakhi S on 29.04.2023 Details for Summery Page  
   
    private List<String> getCountryCode(Object mdmsData) {
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_COUNTRY_CODE_JSONPATH);
    }
    private List<String> getStateCode(Object mdmsData) {
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_STATE_CODE_JSONPATH);
    }
    private List<String> getDistrictCode(Object mdmsData) {
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DISTRICT_CODE_JSONPATH);
    }
    private List<String> getTalukCode(Object mdmsData) {
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_TALUK_CODE_JSONPATH);
    }
    private List<String> getVillageCode(Object mdmsData) {
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_VILLAGE_CODE_JSONPATH);
    }
    private List<String> getPOCode(Object mdmsData) {
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_POSTOFFICE_CODE_JSONPATH);
    }
    private List<String> getLBCode(Object mdmsData) {
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DEATH_TENANT_CODE_JSONPATH);
    }
    private List<String> getDeathCauseMainCode(Object mdmsData) {
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DEATH_CAUSE_MAIN_CODE_JSONPATH);
    }
    private List<String> getDeathCauseSubCode(Object mdmsData) {
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DEATH_CAUSE_SUB_CODE_JSONPATH);
    }
    private List<String> getMedicalAttentionTypeCode(Object mdmsData) {
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DEATH_MED_ATTENTION_CODE_JSONPATH);
    }
    private List<String> getMannerOfDeathCode(Object mdmsData) {
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DEATH_MANNER_OF_DEATH_CODE_JSONPATH);
    }
    private List<String> getReligionCode(Object mdmsData) {
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_RELIGION_CODE_JSONPATH);
    }    
    private List<String> getOccupationCode(Object mdmsData) {
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_OCCUPATION_CODE_JSONPATH);
    }
    public String getCountryNameEn(Object mdmsData, String CountryId) {
        List<String> countries  = getCountryCode(mdmsData);
        int index = countries.indexOf(CountryId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_COUNTRY_CODES_JSONPATH+"["+index+"].name");        
    }
    public String getCountryNameMl(Object mdmsData, String CountryId) {
        List<String> countries  = getCountryCode(mdmsData);
        int index = countries.indexOf(CountryId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_COUNTRY_CODES_JSONPATH+"["+index+"].namelocal");        
    }
    public String getStateNameEn(Object mdmsData, String StateId) {
        List<String> states  = getStateCode(mdmsData);
        int index = states.indexOf(StateId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_STATE_JSONPATH+"["+index+"].name");        
    }
    public String getStateNameMl(Object mdmsData, String StateId) {
        List<String> states  = getStateCode(mdmsData);
        int index = states.indexOf(StateId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_STATE_JSONPATH+"["+index+"].namelocal");        
    }
    public String getDistrictNameEn(Object mdmsData, String DistrictId) {
        List<String> districts  = getDistrictCode(mdmsData);
        int index = districts.indexOf(DistrictId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DISTRICT_JSONPATH+"["+index+"].name");        
    }    
    public String getDistrictNameMl(Object mdmsData, String DistrictId) {
        List<String> districts  = getDistrictCode(mdmsData);
        int index = districts.indexOf(DistrictId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DISTRICT_JSONPATH+"["+index+"].namelocal");        
    }
    public String getTalukNameEn(Object mdmsData, String TalukId) {
        List<String> taluks  = getTalukCode(mdmsData);
        int index = taluks.indexOf(TalukId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_TALUK_JSONPATH+"["+index+"].name");        
    }  
    public String getTalukNameMl(Object mdmsData, String TalukId) {
        List<String> taluks  = getTalukCode(mdmsData);
        int index = taluks.indexOf(TalukId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_TALUK_JSONPATH+"["+index+"].namelocal");        
    }    
    public String getVillageNameEn(Object mdmsData, String VillageId) {
        List<String> villages  = getVillageCode(mdmsData);
        int index = villages.indexOf(VillageId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_VILLAGE_JSONPATH+"["+index+"].name");        
    }  
    public String getVillageNameMl(Object mdmsData, String VillageId) {
        List<String> villages  = getVillageCode(mdmsData);
        int index = villages.indexOf(VillageId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_VILLAGE_JSONPATH+"["+index+"].namelocal");        
    }  
    public String getPONameEn(Object mdmsData, String POId) {
        List<String> po  = getPOCode(mdmsData);
        int index = po.indexOf(POId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_POSTOFFICE_JSONPATH+"["+index+"].name");        
    }  
    public String getPONameMl(Object mdmsData, String POId) {
        List<String> po  = getPOCode(mdmsData);
        int index = po.indexOf(POId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_POSTOFFICE_JSONPATH+"["+index+"].namelocal");        
    }  
    public String getDeathCauseMainEn(Object mdmsData, String DeathCauseMainId) {
        List<String> mainCauses  = getDeathCauseMainCode(mdmsData);
        int index = mainCauses.indexOf(DeathCauseMainId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DEATH_CAUSE_MAIN_JSONPATH+"["+index+"].name");        
    }  
    public String getDeathCauseMainMl(Object mdmsData, String DeathCauseMainId) {
        List<String> mainCauses  = getDeathCauseMainCode(mdmsData);
        int index = mainCauses.indexOf(DeathCauseMainId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DEATH_CAUSE_MAIN_JSONPATH+"["+index+"].namelocal");        
    }     
    public String getDeathCauseSubEn(Object mdmsData, String DeathCauseSubId) {
        List<String> subCauses  = getDeathCauseSubCode(mdmsData);
        int index = subCauses.indexOf(DeathCauseSubId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DEATH_CAUSE_SUB_JSONPATH+"["+index+"].name");        
    }  
    public String getDeathCauseSubMl(Object mdmsData, String DeathCauseSubId) {
        List<String> subCauses  = getDeathCauseSubCode(mdmsData);
        int index = subCauses.indexOf(DeathCauseSubId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DEATH_CAUSE_SUB_JSONPATH+"["+index+"].namelocal");        
    } 
    public String getMedicalAttentionTypeEn(Object mdmsData, String MedicalAttentionTypeId) {
        List<String> medicalAttentionTypes  = getMedicalAttentionTypeCode(mdmsData);
        int index = medicalAttentionTypes.indexOf(MedicalAttentionTypeId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DEATH_MED_ATTENTION_JSONPATH+"["+index+"].name");        
    }  
    public String getMedicalAttentionTypeMl(Object mdmsData, String MedicalAttentionTypeId) {
        List<String> medicalAttentionTypes  = getMedicalAttentionTypeCode(mdmsData);
        int index = medicalAttentionTypes.indexOf(MedicalAttentionTypeId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DEATH_MED_ATTENTION_JSONPATH+"["+index+"].namelocal");        
    }  
    public String getMannerOfDeathEn(Object mdmsData, String MannerOfDeathId) {
        List<String> mannerOfDeathTypes  = getMannerOfDeathCode(mdmsData);
        int index = mannerOfDeathTypes.indexOf(MannerOfDeathId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DEATH_MANNER_OF_DEATH_JSONPATH+"["+index+"].name");        
    } 
    public String getMannerOfDeathMl(Object mdmsData, String MannerOfDeathId) {
        List<String> mannerOfDeathTypes  = getMannerOfDeathCode(mdmsData);
        int index = mannerOfDeathTypes.indexOf(MannerOfDeathId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DEATH_MANNER_OF_DEATH_JSONPATH+"["+index+"].namelocal");        
    } 
    public String getReligionEn(Object mdmsData, String ReligionId) {
        List<String> religions  = getReligionCode(mdmsData);
        int index = religions.indexOf(ReligionId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_RELIGION_CODES_JSONPATH+"["+index+"].name");        
    } 
    public String getReligionMl(Object mdmsData, String ReligionId) {
        List<String> religions  = getReligionCode(mdmsData);
        int index = religions.indexOf(ReligionId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_RELIGION_CODES_JSONPATH+"["+index+"].namelocal");        
    }    
    public String getOccupationEn(Object mdmsData, String OccupationId) {
        List<String> occupations  = getOccupationCode(mdmsData);
        int index = occupations.indexOf(OccupationId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_OCCUPATION_CODES_JSONPATH+"["+index+"].name");        
    } 
    public String getOccupationMl(Object mdmsData, String OccupationId) {
        List<String> occupations  = getOccupationCode(mdmsData);
        int index = occupations.indexOf(OccupationId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_OCCUPATION_CODES_JSONPATH+"["+index+"].namelocal");        
    }
    private ModuleDetail getTenantDetails(String tenantId) {

        // master details for crDeath module
        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();        
        crDeathMasterDetails
                .add(MasterDetail.builder().name(DeathConstants.TENANTS).build());

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(DeathConstants.TENANT_MODULE_NAME).build();
       
        return crDeathModuleDtls;
    }
    public Object mdmsCallForLocation (RequestInfo requestInfo, String tenantId) {
        // Call MDMS microservice with MdmsCriteriaReq as params
        MdmsCriteriaReq mdmsCriteriaReq = getLocRequest(requestInfo, tenantId);
        Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
        return result;
    }
    private MdmsCriteriaReq getLocRequest(RequestInfo requestInfo, String tenantId) {

        List<ModuleDetail> moduleDetails = new LinkedList<>();

        moduleDetails.addAll(getBoundaryDetails());

        //Prepare MDMS Criteria wih all modules in birth-death services and common services

        MdmsCriteria mdmsCriteria = MdmsCriteria.builder()
                .moduleDetails(moduleDetails)
                .tenantId(tenantId)
                .build();
        //Return MDMS criteria request for calling  MDMS microservice
        return MdmsCriteriaReq.builder()
                .mdmsCriteria(mdmsCriteria)
                .requestInfo(requestInfo)
                .build();
    }

    public List<ModuleDetail> getBoundaryDetails() {
        // master details for Boundary

        List<MasterDetail> crMasterDetails = new LinkedList<>();

        List<MasterDetail> masterHospital = Collections.singletonList(MasterDetail.builder()
                .name(DeathConstants.LOCATION_MDMS_HOSPITAL)
                .build());
        crMasterDetails.addAll(masterHospital);

        List<MasterDetail> masterInstitution = Collections.singletonList(MasterDetail.builder()
                .name(DeathConstants.INSTITUTION_NAME)
                .build());
        crMasterDetails.addAll(masterInstitution);

        List<MasterDetail> masterBoundary = Collections.singletonList(MasterDetail.builder()
                .name(DeathConstants.LOCATION_MDMS_BOUNDARY)
                .build());
        crMasterDetails.addAll(masterBoundary);

        ModuleDetail crModuleDetail = ModuleDetail.builder()
                .masterDetails(crMasterDetails)
                .moduleName(DeathConstants.TENANT_EGOV_LOCATION)
                .build();

        return Collections.singletonList(crModuleDetail);

    }
    private List<String> getBoundaryCode(Object mdmsData) {
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_BOUNDARY_CODE_JSONPATH);
    }
    private List<String> getAgeUnitCode(Object mdmsData) {
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DEATH_AGE_UNIT_CODE_JSONPATH);
    }
    private List<String> getPublicPlaceCode(Object mdmsData) {
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DEATH_OTHER_PLACE_CODE_JSONPATH);
    }
    public String getWardNameEn(Object mdmsData, String WardId) {
        List<String> tenants  = getBoundaryCode(mdmsData);
        int index = tenants.indexOf(WardId);
        ArrayList<String> names =  JsonPath.read(mdmsData, DeathConstants.CR_MDMS_BOUNDARY_CODES_JSONPATH+".name");
        return names.get(index);
    }

    public String getWardNameMl(Object mdmsData, String WardId) {
        List<String> tenants  = getBoundaryCode(mdmsData);
        int index = tenants.indexOf(WardId);
        ArrayList<String> names =  JsonPath.read(mdmsData, DeathConstants.CR_MDMS_BOUNDARY_CODES_JSONPATH+".localname");
        return names.get(index);
    }
    public String getAgeUnitEn(Object mdmsData, String AgeUnitId) {
        List<String> ageUnits  = getAgeUnitCode(mdmsData);
        int index = ageUnits.indexOf(AgeUnitId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DEATH_AGE_UNIT_JSONPATH+"["+index+"].name"); 
    }
    public String getAgeUnitMl(Object mdmsData, String AgeUnitId) {
        List<String> ageUnits  = getAgeUnitCode(mdmsData);
        int index = ageUnits.indexOf(AgeUnitId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DEATH_AGE_UNIT_JSONPATH+"["+index+"].namelocal"); 
    }
    public String getPublicPlaceEn(Object mdmsData, String PublicPlaceId) {
        List<String> publicpalces  = getPublicPlaceCode(mdmsData);
        int index = publicpalces.indexOf(PublicPlaceId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DEATH_OTHER_PLACE_JSONPATH+"["+index+"].name"); 
    }
    public String getPublicPlaceMl(Object mdmsData, String PublicPlaceId) {
        List<String> publicpalces  = getPublicPlaceCode(mdmsData);
        int index = publicpalces.indexOf(PublicPlaceId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DEATH_OTHER_PLACE_JSONPATH+"["+index+"].namelocal"); 
    }

    // public String getLBNameEn(Object mdmsData, String tenantId) {
    //     List<String> lbs  = getLBCode(mdmsData);
    //     int index = lbs.indexOf(tenantId);
    //     // return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DEATH_TENANT_JSONPATH+"["+index+"].name");  
    //     ArrayList<String> names =  JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DEATH_TENANT_JSONPATH+".name");
    //     return names.get(index);      
    // }  
    public String getLBNameMl(Object mdmsData, String tenantId) {
        List<String> lbs  = getLBCode(mdmsData);
        int index = lbs.indexOf(tenantId);
        return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DEATH_TENANT_JSONPATH+"["+index+"].localName");        
    }  

}
