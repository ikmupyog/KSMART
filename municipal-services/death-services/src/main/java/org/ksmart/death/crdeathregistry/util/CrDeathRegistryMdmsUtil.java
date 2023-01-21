package org.ksmart.death.crdeathregistry.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

import org.ksmart.death.common.repository.ServiceRequestRepository;
import org.ksmart.death.crdeathregistry.config.CrDeathRegistryConfiguration;
import org.egov.common.contract.request.RequestInfo;
import org.egov.mdms.model.MasterDetail;
import org.egov.mdms.model.MdmsCriteria;
import org.egov.mdms.model.MdmsCriteriaReq;
import org.egov.mdms.model.ModuleDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
/**
     * Creates CrDeathService
     * Rakhi S IKM
     * 
     */
@Component
public class CrDeathRegistryMdmsUtil {

    private ServiceRequestRepository serviceRequestRepository;
    private CrDeathRegistryConfiguration config;

    @Autowired
    public CrDeathRegistryMdmsUtil(CrDeathRegistryConfiguration config, ServiceRequestRepository serviceRequestRepository) {
        this.config = config;
        this.serviceRequestRepository = serviceRequestRepository;
    }

    public Object mDMSCall(RequestInfo requestInfo, String tenantId) {
        MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequest(requestInfo, tenantId);
        Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
        return result;
    }

    public StringBuilder getMdmsSearchUrl() {
        return new StringBuilder().append(config.getMdmsHost()).append(config.getMdmsEndPoint());
    }

    private MdmsCriteriaReq getMDMSRequest(RequestInfo requestInfo, String tenantId) {
        ModuleDetail tenantIdRequest = getTenantIdRequest(tenantId);
        List<ModuleDetail> GenderTypeRequest = getGenderTypeRequest();
        List<ModuleDetail> BNDListRequest = getBNDListRequest();
        // ModuleDetail DeathPlaceRequest = getDeathPlaceRequest();

        
        List<ModuleDetail> moduleDetails = new LinkedList<>();
        moduleDetails.add(tenantIdRequest);
        moduleDetails.addAll(GenderTypeRequest);
        moduleDetails.addAll(BNDListRequest);
        // moduleDetails.add(DeathPlaceRequest);


        // MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(requestInfo.getUserInfo().getTenantId())
        // .build();
        //modified by Rakhi S ikm on 24.12.2022
        MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(config.getEgovStateLevelTenant())
                                    .build();

        MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
                .requestInfo(requestInfo).build();

        // System.out.println("mdmsreq2"+mdmsCriteriaReq);
        return mdmsCriteriaReq;
    }

     /**
     * Creates request to search tenantID in mdms
     * 
     * @return MDMS request for tenantID
     */
    private ModuleDetail getTenantIdRequest(String tenantId) {

        // master details for crDeath module
        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();

        // filter to only get code field from master data    
        final String filterCode = "$.[?(@.code=='"+tenantId+"')].*";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.TENANTS).filter(filterCode).build());

        // crDeathMasterDetails
        //         .add(MasterDetail.builder().name(CrDeathConstants.TENANTS).build());
        

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(CrDeathRegistryConstants.TENANT_MODULE_NAME).build();

       
        return crDeathModuleDtls;
    }

     /**
     * Creates request to search Gender Type in mdms
     * 
     * @return MDMS request for Gender Type
     */
    private List<ModuleDetail> getGenderTypeRequest() {

        // master details for crDeath module
        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();

        // filter to only get code field from master data    
        final String filterCode = "$.[?(@.active==true)].code";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.GENDERTYPE).filter(filterCode).build());

        final String filterCodePlaceMaster = "$.[?(@.active==true)].code";
                crDeathMasterDetails
                           .add(MasterDetail.builder().name(CrDeathRegistryConstants.DEATH_PLACE).filter(filterCodePlaceMaster).build());
       

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(CrDeathRegistryConstants.GENDER_MODULE_NAME).build();
              
         return Arrays.asList(crDeathModuleDtls);
    }

     /**
     * Creates request to search Gender Type in mdms
     * 
     * @return MDMS request for HospitalList
     */
    private List<ModuleDetail> getBNDListRequest() {

        // master details for crDeath module
        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();

        // filter to only get code field from master data  
        //Modified by Rakhi S on 20.12.2022   
        final String filterCode = "$.[?(@.active==true)].code";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.HOSPITAL_LIST).filter(filterCode).build());


        // final String filterCodePlaceMaster = "$.[?(@.active==true)].code";
        //  crDeathMasterDetails
        //             .add(MasterDetail.builder().name(CrDeathRegistryConstants.DEATH_PLACE).filter(filterCodePlaceMaster).build());
        //Rakhi S on 07.12.2022 DeathCause main validation
        final String filterCodeDeathCauseMain = "$.[?(@.active==true)].code";
         crDeathMasterDetails
                    .add(MasterDetail.builder().name(CrDeathRegistryConstants.DEATH_CAUSE_MAIN).filter(filterCodeDeathCauseMain).build());
                    
        final String filterCodeDeathCauseSub = "$.[?(@.active==true)].code";
                    crDeathMasterDetails
                               .add(MasterDetail.builder().name(CrDeathRegistryConstants.DEATH_CAUSE_SUB).filter(filterCodeDeathCauseSub).build());

        final String filterCodeMaleDependentType = "$.[?(@.active==true)].code";
                               crDeathMasterDetails
                                          .add(MasterDetail.builder().name(CrDeathRegistryConstants.MALE_DEPENDENT_TYPE).filter(filterCodeMaleDependentType).build());
       

        // final String filterCodeFemaleDependentType = "$.[?(@.active==true)].code";
        //                                   crDeathMasterDetails
        //                                              .add(MasterDetail.builder().name(CrDeathRegistryConstants.FEMALE_DEPENDENT_TYPE).filter(filterCodeFemaleDependentType).build());

        final String filterCodeAgeUnit = "$.[?(@.active==true)].code";
                                          crDeathMasterDetails
                                                     .add(MasterDetail.builder().name(CrDeathRegistryConstants.AGE_UNIT).filter(filterCodeAgeUnit).build());

        final String filterCodeMedicalAttention = "$.[?(@.active==true)].code";
                                           crDeathMasterDetails
                                                     .add(MasterDetail.builder().name(CrDeathRegistryConstants.MEDICAL_ATTENTION_TYPE).filter(filterCodeMedicalAttention).build());

        final String filterCodeProfession = "$.[?(@.active==true)].code";
                                           crDeathMasterDetails
                                                        .add(MasterDetail.builder().name(CrDeathRegistryConstants.PROFESSION).filter(filterCodeProfession).build());

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(CrDeathRegistryConstants.BND_MODULE_NAME).build();

               
         return Arrays.asList(crDeathModuleDtls);
    }

    
    //RAkhi S ikm on 23.12.2022
    public Object mDMSCallCertificate(RequestInfo requestInfo
                        , String tenantId
                        , String presentAddressDistrict
                        , String presentAddressState
                        , String presentAddressCountry) {
        MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequestCertificate(requestInfo
                                        , tenantId
                                        , presentAddressDistrict
                                        , presentAddressState
                                        , presentAddressCountry);
        Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
        return result;
    }

    //RAkhi S ikm on 23.12.2022
    private MdmsCriteriaReq getMDMSRequestCertificate(RequestInfo requestInfo
                            , String tenantId
                            , String presentAddressDistrict
                            , String presentAddressState
                            , String presentAddressCountry) {
        ModuleDetail tenantIdRequest = getTenantIdCertificate(tenantId);
        List<ModuleDetail> commonMasterRequest = getcommonMasterRequest(presentAddressDistrict
                                ,presentAddressState
                                ,presentAddressCountry);     
        
        List<ModuleDetail> moduleDetails = new LinkedList<>();
        moduleDetails.add(tenantIdRequest);     
        moduleDetails.addAll(commonMasterRequest);

        MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(config.getEgovStateLevelTenant())
                                    .build();

        MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
                .requestInfo(requestInfo).build();

        System.out.println("mdmsreq2"+mdmsCriteriaReq);
        return mdmsCriteriaReq;
    }

     /**
     * Creates request to search tenantID in mdms
     * 
     * @return MDMS request for tenantID
     */
    //RAkhi S ikm on 23.12.2022
    private ModuleDetail getTenantIdCertificate(String tenantId) {

        // master details for crDeath module
        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();

        // filter to only get code field from master data            
        final String filterCode = "$.[?(@.code=='"+tenantId+"')].name";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.TENANTS).filter(filterCode).build());       

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(CrDeathRegistryConstants.TENANT_MODULE_NAME).build();

       
        return crDeathModuleDtls;
    }
    //RAkhi S ikm on 07.01.2023 for Malayalam fields 
    public Object mDMSCallCertificateMl(RequestInfo requestInfo
                                , String tenantId
                                , String presentAddressDistrict
                                , String presentAddressState
                                , String presentAddressCountry) {
        MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequestCertificateMl(requestInfo
                                                , tenantId
                                                , presentAddressDistrict
                                                , presentAddressState
                                                , presentAddressCountry);
        Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
        return result;
    }
    //RAkhi S ikm on 07.01.2023 for Malayalam fields 
    private MdmsCriteriaReq getMDMSRequestCertificateMl(RequestInfo requestInfo
                                , String tenantId
                                , String presentAddressDistrict
                                , String presentAddressState
                                , String presentAddressCountry) {
        ModuleDetail tenantIdRequest = getTenantIdCertificateMl(tenantId);
        List<ModuleDetail> commonMasterRequest = getcommonMasterRequestMl(presentAddressDistrict
                                        ,presentAddressState
                                        ,presentAddressCountry); 

        
        List<ModuleDetail> moduleDetails = new LinkedList<>();
        moduleDetails.add(tenantIdRequest);
        moduleDetails.addAll(commonMasterRequest);

        MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(config.getEgovStateLevelTenant())
                                    .build();

        MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
                .requestInfo(requestInfo).build();

        System.out.println("mdmsreqML"+mdmsCriteriaReq);
        return mdmsCriteriaReq;
    }
     /**
     * Creates request to search tenantID in mdms
     * 
     * @return MDMS request for tenantID
     */
    //RAkhi S ikm on  07.01.2023 for Malayalam fields
    private ModuleDetail getTenantIdCertificateMl(String tenantId) {

        // master details for crDeath module
        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();

        // filter to only get code field from master data            
        final String filterCode = "$.[?(@.code=='"+tenantId+"')].city.localName";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.TENANTS).filter(filterCode).build());       

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(CrDeathRegistryConstants.TENANT_MODULE_NAME).build();

       
        return crDeathModuleDtls;
    }
    //RAkhi S ikm on 09.01.2023
    private List<ModuleDetail> getcommonMasterRequest(String presentAddressDistrict
                                        , String presentAddressState
                                        , String presentAddressCountry) {
        // master details for death certificate
        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();

        final String filterCode = "$.[?(@.code=='"+presentAddressDistrict+"')].name";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.DISTRICT).filter(filterCode).build());  
        
        //Rakhi S on 11.01.2023 state , COUNTRY
        final String filterCodeState = "$.[?(@.code=='"+presentAddressState+"')].name"; 
        crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.STATE).filter(filterCodeState).build());        
                
        final String filterCodeCountry = "$.[?(@.code=='"+presentAddressCountry+"')].name"; 
        crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.COUNTRY).filter(filterCodeCountry).build());        

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(CrDeathRegistryConstants.COMMON_MASTERS_MODULE).build();

               
         return Arrays.asList(crDeathModuleDtls);
    }
    //RAkhi S ikm on 11.01.2023
    private List<ModuleDetail> getcommonMasterRequestMl(String presentAddressDistrict
                                               ,String presentAddressState
                                               ,String presentAddressCountry) {

        // master details for death certificate
        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();

        final String filterCode = "$.[?(@.code=='"+presentAddressDistrict+"')].localname";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.DISTRICT).filter(filterCode).build());  

        final String filterCodeState = "$.[?(@.code=='"+presentAddressState+"')].namelocal";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.STATE).filter(filterCodeState).build()); 
                
        final String filterCodeCountry = "$.[?(@.code=='"+presentAddressCountry+"')].namelocal";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.COUNTRY).filter(filterCodeCountry).build());  

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(CrDeathRegistryConstants.COMMON_MASTERS_MODULE).build();

               
         return Arrays.asList(crDeathModuleDtls);
    }
    //mdms for permanent fields
     //RAkhi S ikm on 12.01.2023
     public Object mDMSCallCertificateP(RequestInfo requestInfo  
                        , String tenantId   
                        , String permanentAddressDistrict
                        , String permanentAddressState
                        , String permanentAddressCountry) {
        MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequestCertificateP(requestInfo   
                        , tenantId
                        , permanentAddressDistrict
                        , permanentAddressState
                        , permanentAddressCountry);
        Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
        return result;
        }
    private MdmsCriteriaReq getMDMSRequestCertificateP(RequestInfo requestInfo    
                            , String tenantId                       
                            , String permanentAddressDistrict
                            , String permanentAddressState
                            , String permanentAddressCountry) {

        ModuleDetail tenantIdRequest = getTenantIdCertificate(tenantId);
        List<ModuleDetail> commonMasterRequest = getcommonMasterRequestP(
                                 tenantId
                                ,permanentAddressDistrict
                                ,permanentAddressState
                                ,permanentAddressCountry);       

        
        List<ModuleDetail> moduleDetails = new LinkedList<>();
        moduleDetails.add(tenantIdRequest);
        moduleDetails.addAll(commonMasterRequest);

        MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(config.getEgovStateLevelTenant())
                                    .build();

        MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
                .requestInfo(requestInfo).build();

        System.out.println("mdmsreq2"+mdmsCriteriaReq);
        return mdmsCriteriaReq;
    }
    private List<ModuleDetail> getcommonMasterRequestP( String tenantId
                                        , String permanentAddressDistrict
                                        , String permanentAddressState
                                        , String permanentAddressCountry) {

        // master details for death certificate
        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();      
        final String perAddrfilterCode = "$.[?(@.code=='"+permanentAddressDistrict+"')].name";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.DISTRICT).filter(perAddrfilterCode).build());  
        
        final String perAddrfilterCodeState = "$.[?(@.code=='"+permanentAddressState+"')].name"; 
        crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.STATE).filter(perAddrfilterCodeState).build());        
                
        final String perAddrfilterCodeCountry = "$.[?(@.code=='"+permanentAddressCountry+"')].name"; 
        crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.COUNTRY).filter(perAddrfilterCodeCountry).build()); 

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(CrDeathRegistryConstants.COMMON_MASTERS_MODULE).build();

               
         return Arrays.asList(crDeathModuleDtls);
    }
    public Object mDMSCallCertificatePMl(RequestInfo requestInfo  
        , String tenantId   
        , String permanentAddressDistrict
        , String permanentAddressState
        , String permanentAddressCountry) {
        MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequestCertificatePMl(requestInfo   
        , tenantId
        , permanentAddressDistrict
        , permanentAddressState
        , permanentAddressCountry);
        Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
        return result;
        }
   private MdmsCriteriaReq getMDMSRequestCertificatePMl(RequestInfo requestInfo    
                , String tenantId                       
                , String permanentAddressDistrict
                , String permanentAddressState
                , String permanentAddressCountry) {

        ModuleDetail tenantIdRequest = getTenantIdCertificate(tenantId);
        List<ModuleDetail> commonMasterRequest = getcommonMasterRequestPMl(
                tenantId
                ,permanentAddressDistrict
                ,permanentAddressState
                ,permanentAddressCountry);       


        List<ModuleDetail> moduleDetails = new LinkedList<>();
        moduleDetails.add(tenantIdRequest);
        moduleDetails.addAll(commonMasterRequest);

        MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(config.getEgovStateLevelTenant())
                        .build();

        MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
        .requestInfo(requestInfo).build();

        System.out.println("mdmsreq2"+mdmsCriteriaReq);
        return mdmsCriteriaReq;
        }
        private List<ModuleDetail> getcommonMasterRequestPMl( String tenantId
                        , String permanentAddressDistrict
                        , String permanentAddressState
                        , String permanentAddressCountry) {

        // master details for death certificate
        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();      
        final String perAddrfilterCode = "$.[?(@.code=='"+permanentAddressDistrict+"')].localname";
        crDeathMasterDetails
        .add(MasterDetail.builder().name(CrDeathRegistryConstants.DISTRICT).filter(perAddrfilterCode).build());  

        final String perAddrfilterCodeState = "$.[?(@.code=='"+permanentAddressState+"')].namelocal"; 
        crDeathMasterDetails
        .add(MasterDetail.builder().name(CrDeathRegistryConstants.STATE).filter(perAddrfilterCodeState).build());        

        final String perAddrfilterCodeCountry = "$.[?(@.code=='"+permanentAddressCountry+"')].namelocal"; 
        crDeathMasterDetails
        .add(MasterDetail.builder().name(CrDeathRegistryConstants.COUNTRY).filter(perAddrfilterCodeCountry).build()); 

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
        .moduleName(CrDeathRegistryConstants.COMMON_MASTERS_MODULE).build();


        return Arrays.asList(crDeathModuleDtls);
        }


        //mdms for death place home address
     //RAkhi S ikm on 13.01.2023
     public Object mDMSCallCertificateHome(RequestInfo requestInfo  
                                , String tenantId   
                                , String deathplaceAddressDistrict
                                , String deathplaceAddressState
                                , String deathplaceAddressCountry) {
                MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequestCertificateHome(requestInfo   
                                                , tenantId
                                                , deathplaceAddressDistrict
                                                , deathplaceAddressState
                                                , deathplaceAddressCountry);
                Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
                return result;
       }
   private MdmsCriteriaReq getMDMSRequestCertificateHome(RequestInfo requestInfo    
                            , String tenantId                       
                            , String deathplaceAddressDistrict
                            , String deathplaceAddressState
                            , String deathplaceAddressCountry) {

        ModuleDetail tenantIdRequest = getTenantIdCertificate(tenantId);
        List<ModuleDetail> commonMasterRequest = getcommonMasterRequestHome(
                                 tenantId
                                ,deathplaceAddressDistrict
                                ,deathplaceAddressState
                                ,deathplaceAddressCountry);       

        
        List<ModuleDetail> moduleDetails = new LinkedList<>();
        moduleDetails.add(tenantIdRequest);
        moduleDetails.addAll(commonMasterRequest);

        MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(config.getEgovStateLevelTenant())
                                    .build();

        MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
                .requestInfo(requestInfo).build();

        // System.out.println("mdmsreq2"+mdmsCriteriaReq);
        return mdmsCriteriaReq;
    }
    private List<ModuleDetail> getcommonMasterRequestHome( String tenantId
                                        , String deathplaceAddressDistrict
                                        , String deathplaceAddressState
                                        , String deathplaceAddressCountry) {

        // master details for death certificate
        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();      
        final String perAddrfilterCode = "$.[?(@.code=='"+deathplaceAddressDistrict+"')].name";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.DISTRICT).filter(perAddrfilterCode).build());  
        
        final String perAddrfilterCodeState = "$.[?(@.code=='"+deathplaceAddressState+"')].name"; 
        crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.STATE).filter(perAddrfilterCodeState).build());        
                
        final String perAddrfilterCodeCountry = "$.[?(@.code=='"+deathplaceAddressCountry+"')].name"; 
        crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.COUNTRY).filter(perAddrfilterCodeCountry).build()); 

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(CrDeathRegistryConstants.COMMON_MASTERS_MODULE).build();

               
         return Arrays.asList(crDeathModuleDtls);
    }
    public Object mDMSCallCertificateHomeMl(RequestInfo requestInfo  
                                , String tenantId   
                                , String deathplaceAddressDistrict
                                , String deathplaceAddressState
                                , String deathplaceAddressCountry) {
        MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequestCertificateHomeMl(requestInfo   
                        , tenantId
                        , deathplaceAddressDistrict
                        , deathplaceAddressState
                        , deathplaceAddressCountry);
        Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
        return result;
    }
    private MdmsCriteriaReq getMDMSRequestCertificateHomeMl(RequestInfo requestInfo    
                                , String tenantId                       
                                , String deathplaceAddressDistrict
                                , String deathplaceAddressState
                                , String deathplaceAddressCountry) {

        ModuleDetail tenantIdRequest = getTenantIdCertificate(tenantId);
        List<ModuleDetail> commonMasterRequest = getcommonMasterRequestHomeMl(
                                        tenantId
                                        ,deathplaceAddressDistrict
                                        ,deathplaceAddressState
                                        ,deathplaceAddressCountry);       


                List<ModuleDetail> moduleDetails = new LinkedList<>();
                moduleDetails.add(tenantIdRequest);
                moduleDetails.addAll(commonMasterRequest);

                MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(config.getEgovStateLevelTenant())
                                .build();

                MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
                .requestInfo(requestInfo).build();

                // System.out.println("mdmsreq2"+mdmsCriteriaReq);
                return mdmsCriteriaReq;
        }
        private List<ModuleDetail> getcommonMasterRequestHomeMl( String tenantId
                                        , String deathplaceAddressDistrict
                                        , String deathplaceAddressState
                                        , String deathplaceAddressCountry) {

                // master details for death certificate
                List<MasterDetail> crDeathMasterDetails = new ArrayList<>();      
                final String perAddrfilterCode = "$.[?(@.code=='"+deathplaceAddressDistrict+"')].localname";
                crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.DISTRICT).filter(perAddrfilterCode).build());  

                final String perAddrfilterCodeState = "$.[?(@.code=='"+deathplaceAddressState+"')].namelocal"; 
                crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.STATE).filter(perAddrfilterCodeState).build());        

                final String perAddrfilterCodeCountry = "$.[?(@.code=='"+deathplaceAddressCountry+"')].namelocal"; 
                crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.COUNTRY).filter(perAddrfilterCodeCountry).build()); 

                ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(CrDeathRegistryConstants.COMMON_MASTERS_MODULE).build();


                return Arrays.asList(crDeathModuleDtls);
        }
        public Object mDMSCallCertificateHospital(RequestInfo requestInfo  
                                , String tenantId   
                                , String deathPlace) {
                MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequestCertificateHospital(requestInfo   
                                                , tenantId
                                                , deathPlace);
                Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
                return result;
       }
       private MdmsCriteriaReq getMDMSRequestCertificateHospital(RequestInfo requestInfo    
                                , String tenantId                       
                                , String deathPlace) {

                ModuleDetail tenantIdRequest = getTenantIdCertificate(tenantId);
                ModuleDetail commonMasterRequest = getcommonMasterRequestHospial(
                                tenantId
                                ,deathPlace);    

                List<ModuleDetail> moduleDetails = new LinkedList<>();
                moduleDetails.add(tenantIdRequest);
                moduleDetails.add(commonMasterRequest);

                MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(config.getEgovStateLevelTenant())
                        .build();

                MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
                .requestInfo(requestInfo).build();

                // System.out.println("mdmsreq2"+mdmsCriteriaReq);
                return mdmsCriteriaReq;
      }
      private ModuleDetail  getcommonMasterRequestHospial( String tenantId, String deathPlace ) {

        // master details for death certificate
        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();      
        final String perAddrfilterCode = "$.[?(@.code=='"+deathPlace+"')].addressen";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.HOSPITAL_LIST).filter(perAddrfilterCode).build());  

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(CrDeathRegistryConstants.BND_MODULE_NAME).build();
               
         return (crDeathModuleDtls);
    }

    public Object mDMSCallCertificateHospitalMl(RequestInfo requestInfo  
                                        , String tenantId   
                                        , String deathPlace) {
        MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequestCertificateHospitalMl(requestInfo   
                        , tenantId
                        , deathPlace);
        Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
        return result;
    }
    private MdmsCriteriaReq getMDMSRequestCertificateHospitalMl(RequestInfo requestInfo    
                                        , String tenantId                       
                                        , String deathPlace) {

        ModuleDetail tenantIdRequest = getTenantIdCertificate(tenantId);
        ModuleDetail commonMasterRequest = getcommonMasterRequestHospialMl(
        tenantId
        ,deathPlace);    

        List<ModuleDetail> moduleDetails = new LinkedList<>();
        moduleDetails.add(tenantIdRequest);
        moduleDetails.add(commonMasterRequest);

        MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(config.getEgovStateLevelTenant())
        .build();

        MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
        .requestInfo(requestInfo).build();

        // System.out.println("mdmsreq2"+mdmsCriteriaReq);
        return mdmsCriteriaReq;
    }
    private ModuleDetail  getcommonMasterRequestHospialMl( String tenantId, String deathPlace ) {

        // master details for death certificate
        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();      
        final String perAddrfilterCode = "$.[?(@.code=='"+deathPlace+"')].addressml";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.HOSPITAL_LIST).filter(perAddrfilterCode).build());  

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(CrDeathRegistryConstants.BND_MODULE_NAME).build();
               
         return (crDeathModuleDtls);
    }
    public Object mDMSCallCertificateInstitution(RequestInfo requestInfo  
                                , String tenantId  
                                , String deathPlaceInstId) {
        MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequestCertificateInstitution(requestInfo   
                        , tenantId
                        , deathPlaceInstId);
        Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
        return result;
    }
    private MdmsCriteriaReq getMDMSRequestCertificateInstitution(RequestInfo requestInfo    
                                , String tenantId                       
                                , String deathPlaceInstId) {

        ModuleDetail tenantIdRequest = getTenantIdCertificate(tenantId);
        ModuleDetail commonMasterRequest = getcommonMasterRequestInstitution(deathPlaceInstId); 
                 
                List<ModuleDetail> moduleDetails = new LinkedList<>();
                moduleDetails.add(tenantIdRequest);
                moduleDetails.add(commonMasterRequest);

                MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(config.getEgovStateLevelTenant())
                .build();

                MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
                .requestInfo(requestInfo).build();

                // System.out.println("mdmsreq2"+mdmsCriteriaReq);
                return mdmsCriteriaReq;
        }
        private ModuleDetail  getcommonMasterRequestInstitution(String deathPlaceInstId) {

                 // master details for crDeath module
                List<MasterDetail> crDeathMasterDetails = new ArrayList<>();
                // master details for death certificate              
                final String institutionfilterCode = "$.[?(@.code=='"+deathPlaceInstId+"')].address"; 
                crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.INSTITUTION_NAME).filter(institutionfilterCode).build());       
                
                ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(CrDeathRegistryConstants.BND_MODULE_NAME).build();

                return (crDeathModuleDtls);
        }
        public Object mDMSCallCertificateInstitutionMl(RequestInfo requestInfo  
                                , String tenantId  
                                , String deathPlaceInstId) {
                MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequestCertificateInstitutionMl(requestInfo   
                , tenantId
                , deathPlaceInstId);
                Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
                return result;
        }
        private MdmsCriteriaReq getMDMSRequestCertificateInstitutionMl(RequestInfo requestInfo    
                                , String tenantId                       
                                , String deathPlaceInstId) {

                ModuleDetail tenantIdRequest = getTenantIdCertificate(tenantId);
                ModuleDetail commonMasterRequest = getcommonMasterRequestInstitutionMl(deathPlaceInstId); 
                 
                List<ModuleDetail> moduleDetails = new LinkedList<>();
                moduleDetails.add(tenantIdRequest);
                moduleDetails.add(commonMasterRequest);

                MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(config.getEgovStateLevelTenant())
                .build();

                MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
                .requestInfo(requestInfo).build();

                // System.out.println("mdmsreq2"+mdmsCriteriaReq);
                return mdmsCriteriaReq;
        }
        private ModuleDetail  getcommonMasterRequestInstitutionMl(String deathPlaceInstId) {

               List<MasterDetail> crDeathMasterDetails = new ArrayList<>();           
               final String institutionfilterCode = "$.[?(@.code=='"+deathPlaceInstId+"')].addresslocal"; 
               crDeathMasterDetails
               .add(MasterDetail.builder().name(CrDeathRegistryConstants.INSTITUTION_NAME).filter(institutionfilterCode).build());       
               
               ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
               .moduleName(CrDeathRegistryConstants.BND_MODULE_NAME).build();

               return (crDeathModuleDtls);
       }
       public Object mDMSCallCertificateVehicle(RequestInfo requestInfo  
                                , String vehicleFirstHalt) {
        MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequestCertificateVehicle(requestInfo   
                        , vehicleFirstHalt);
        Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
        return result;
    }
    private MdmsCriteriaReq getMDMSRequestCertificateVehicle(RequestInfo requestInfo   
                               , String vehicleFirstHalt) {

                ModuleDetail tenantIdRequest = getTenantIdCertificate(vehicleFirstHalt);
                        
                List<ModuleDetail> moduleDetails = new LinkedList<>();
                moduleDetails.add(tenantIdRequest);

                MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(config.getEgovStateLevelTenant())
                .build();

                MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
                .requestInfo(requestInfo).build();

                // System.out.println("mdmsreq2"+mdmsCriteriaReq);
                return mdmsCriteriaReq;
        }
    public Object mDMSCallCertificateVehicleMl(RequestInfo requestInfo  
                                , String vehicleFirstHalt) {
        MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequestCertificateVehicleMl(requestInfo   
                        , vehicleFirstHalt);
        Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
        return result;
    }
    private MdmsCriteriaReq getMDMSRequestCertificateVehicleMl(RequestInfo requestInfo   
                               , String vehicleFirstHalt) {

                ModuleDetail tenantIdRequest = getTenantIdCertificateMl(vehicleFirstHalt);
                        
                List<ModuleDetail> moduleDetails = new LinkedList<>();
                moduleDetails.add(tenantIdRequest);

                MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(config.getEgovStateLevelTenant())
                .build();

                MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
                .requestInfo(requestInfo).build();

                // System.out.println("mdmsreq2"+mdmsCriteriaReq);
                return mdmsCriteriaReq;
        }
    public Object mDMSCallCertificateOther(RequestInfo requestInfo  
                                , String deathPlaceType) {
        MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequestCertificateOther(requestInfo   
                        , deathPlaceType);
        Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
        return result;
    }
    private MdmsCriteriaReq getMDMSRequestCertificateOther(RequestInfo requestInfo   
                               , String deathPlaceType) {

                ModuleDetail tenantIdRequest = getdeathPlaceType(deathPlaceType);
                        
                List<ModuleDetail> moduleDetails = new LinkedList<>();
                moduleDetails.add(tenantIdRequest);

                MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(config.getEgovStateLevelTenant())
                .build();

                MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
                .requestInfo(requestInfo).build();

                // System.out.println("mdmsreq2"+mdmsCriteriaReq);
                return mdmsCriteriaReq;
        }
        private ModuleDetail getdeathPlaceType(String deathPlaceType) {

                // master details for crDeath module
                List<MasterDetail> crDeathMasterDetails = new ArrayList<>();
        
                // filter to only get code field from master data            
                final String filterCode = "$.[?(@.code=='"+deathPlaceType+"')].name";
                crDeathMasterDetails
                        .add(MasterDetail.builder().name(CrDeathRegistryConstants.OTHER_PLACE_TYPE).filter(filterCode).build());       
        
                ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                        .moduleName(CrDeathRegistryConstants.BND_MODULE_NAME).build();
        
               
                return crDeathModuleDtls;
        }
        
         //RAkhi S ikm on 21.01.2023
    public Object mDMSCallRegNoFormating(RequestInfo requestInfo
                                , String tenantId) {
        MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequestRegNoFormating(requestInfo
                        , tenantId);
        Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
        return result;
        }

        //RAkhi S ikm on21.01.2023
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

         //RAkhi S ikm on 21.01.2023
    private ModuleDetail getTenantIdRegNoFormating(String tenantId) {

        // master details for crDeath module
        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();

        // filter to only get code field from master data            
        final String filterCode = "$.[?(@.code=='"+tenantId+"')].idgencode";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.TENANTS).filter(filterCode).build());       

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(CrDeathRegistryConstants.TENANT_MODULE_NAME).build();

       
        return crDeathModuleDtls;
    }

    public Object mDMSCallLBType(RequestInfo requestInfo
                        , String tenantId) {
        MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequestLBType(requestInfo
                                , tenantId);
        Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
        return result;
    }
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
    private ModuleDetail getTenantIdLBType(String tenantId) {

        // master details for crDeath module
        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();

        // filter to only get code field from master data            
        final String filterCode = "$.[?(@.code=='"+tenantId+"')].lbtypecode";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.TENANTS).filter(filterCode).build());       

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(CrDeathRegistryConstants.TENANT_MODULE_NAME).build();

       
        return crDeathModuleDtls;
    }
}
