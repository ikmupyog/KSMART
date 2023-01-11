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
        ModuleDetail GenderTypeRequest = getGenderTypeRequest();
        List<ModuleDetail> BNDListRequest = getBNDListRequest();
        // ModuleDetail DeathPlaceRequest = getDeathPlaceRequest();

        
        List<ModuleDetail> moduleDetails = new LinkedList<>();
        moduleDetails.add(tenantIdRequest);
        moduleDetails.add(GenderTypeRequest);
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
    private ModuleDetail getGenderTypeRequest() {

        // master details for crDeath module
        List<MasterDetail> crDeathMasterDetails = new ArrayList<>();

        // filter to only get code field from master data    
        final String filterCode = "$.[?(@.active==true)].code";
        crDeathMasterDetails
                .add(MasterDetail.builder().name(CrDeathRegistryConstants.GENDERTYPE).filter(filterCode).build());
       

        ModuleDetail crDeathModuleDtls = ModuleDetail.builder().masterDetails(crDeathMasterDetails)
                .moduleName(CrDeathRegistryConstants.GENDER_MODULE_NAME).build();

       
        return crDeathModuleDtls;
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


        final String filterCodePlaceMaster = "$.[?(@.active==true)].code";
         crDeathMasterDetails
                    .add(MasterDetail.builder().name(CrDeathRegistryConstants.DEATH_PLACE).filter(filterCodePlaceMaster).build());
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
}
