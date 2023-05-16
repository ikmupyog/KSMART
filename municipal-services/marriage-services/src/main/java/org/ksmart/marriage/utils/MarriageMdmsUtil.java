package org.ksmart.marriage.utils;

import com.jayway.jsonpath.JsonPath;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.mdms.model.MasterDetail;
import org.egov.mdms.model.MdmsCriteria;
import org.egov.mdms.model.MdmsCriteriaReq;
import org.egov.mdms.model.ModuleDetail;
import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.common.repository.ServiceRequestRepository;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryDetails;
import org.ksmart.marriage.marriageregistry.web.model.certmodel.MarriageCertPDFRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.*;

/*Jasmine 31.03.2023 */
@Slf4j
@Component
public class MarriageMdmsUtil {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${egov.mdms.host}")
    private String mdmsHost;

    @Value("${egov.mdms.search.endpoint}")
    private String mdmsUrl;

    @Value("${egov.mdms.module.name}")
    
    private String moduleName;
    private ServiceRequestRepository serviceRequestRepository;
    private MarriageApplicationConfiguration config;

    @Autowired
    public MarriageMdmsUtil(MarriageApplicationConfiguration config, ServiceRequestRepository serviceRequestRepository) {
        this.config = config;
        this.serviceRequestRepository = serviceRequestRepository;
    }

    public Object mDMSCall(RequestInfo requestInfo, String tenantId) {
        MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequest(requestInfo, tenantId);
        Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);                 
        return result;
    }

    private MdmsCriteriaReq getMDMSRequest(RequestInfo requestInfo, String tenantId) {
        ModuleDetail tenantIdRequest = getTenantIdRequest(tenantId);
        ModuleDetail tenantIds = getTenantIds();
        ModuleDetail commomMasterRequest = getCommonMastersRequest();
        List<ModuleDetail> BNDListRequest = getMarriageListRequest();

        List<ModuleDetail> moduleDetails = new LinkedList<>();
        moduleDetails.add(tenantIdRequest);
        moduleDetails.add(tenantIds);
        moduleDetails.add(commomMasterRequest);
        moduleDetails.addAll(BNDListRequest);

        MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(config.getEgovStateLevelTenant())
                                    .build();

        MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
                .requestInfo(requestInfo).build();
        return mdmsCriteriaReq;
    }

    private MdmsCriteriaReq getMDMSRequestForTenant(RequestInfo requestInfo, String tenantId) {
        ModuleDetail tenantIdRequest = getTenantIdRequest(tenantId);
        List<ModuleDetail> moduleDetails = new LinkedList<>();
        moduleDetails.add(tenantIdRequest);
        MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(config.getEgovStateLevelTenant())
                .build();
        MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
                .requestInfo(requestInfo).build();
        return mdmsCriteriaReq;
    }
    public StringBuilder getMdmsSearchUrl() {
        return new StringBuilder().append(config.getMdmsHost()).append(config.getMdmsEndPoint());
    }
    private ModuleDetail getTenantIdRequest(String tenantId) {

        // master details for Marriage module
        List<MasterDetail> marriageMasterDetails = new ArrayList<>();
        // filter to only get code field from master data    
        final String filterCode = "$.[?(@.code=='"+tenantId+"')]";
    //    final String filterCode = "$.[?(@.active==true)].code";
        marriageMasterDetails
                .add(MasterDetail.builder().name(MarriageConstants.TENANTS).filter(filterCode).build());

        ModuleDetail marriageModuleDtls = ModuleDetail.builder().masterDetails(marriageMasterDetails)
                .moduleName(MarriageConstants.TENANT_MODULE_NAME).build();
       //System.out.println("JasmineTenantId"+marriageModuleDtls);

        return marriageModuleDtls;
    }
    private ModuleDetail getTenantIds() {

        // master details for Marriage module
        List<MasterDetail> marriageMasterDetails = new ArrayList<>();
        // filter to only get code field from master data    
        final String filterCode = "$.[*].code";
        marriageMasterDetails
                .add(MasterDetail.builder().name(MarriageConstants.TENANTS).filter(filterCode).build());

        ModuleDetail marriageModuleDtls = ModuleDetail.builder().masterDetails(marriageMasterDetails)
                .moduleName(MarriageConstants.TENANT_MODULE_NAME).build();
       
        return marriageModuleDtls;
    }
    private ModuleDetail getCommonMastersRequest() {

        List<MasterDetail> marriageMasterDetails = new ArrayList<>();  
        //Country
        final String filterCodeCountry = "$.[?(@.active==true)].code";
        marriageMasterDetails
                 .add(MasterDetail.builder().name(MarriageConstants.COUNTRY).filter(filterCodeCountry).build()); 
        //State
        final String filterCodeState = "$.[?(@.active==true)].code";
        marriageMasterDetails
                 .add(MasterDetail.builder().name(MarriageConstants.STATE).filter(filterCodeState).build()); 
        //District
        final String filterCodeDistrict = "$.[?(@.active==true)].code";
        marriageMasterDetails
                .add(MasterDetail.builder().name(MarriageConstants.DISTRICT).filter(filterCodeDistrict).build());               
        //Taluk
        final String filterCodeTaluk = "$.[?(@.active==true)].code";
        marriageMasterDetails
                .add(MasterDetail.builder().name(MarriageConstants.TALUK).filter(filterCodeTaluk).build());
        //LbType
        final String filterCodeLbType = "$.[?(@.active==true)].code";
        marriageMasterDetails
                .add(MasterDetail.builder().name(MarriageConstants.LBTYPE).filter(filterCodeLbType).build());
        //Village
        final String filterCodeVillage = "$.[?(@.active==true)].code";
        marriageMasterDetails
                .add(MasterDetail.builder().name(MarriageConstants.VILLAGE).filter(filterCodeVillage).build());
        //Gender
        final String filterCodeGender = "$.[?(@.active==true)].code";
        marriageMasterDetails
                .add(MasterDetail.builder().name(MarriageConstants.GENDERTYPE).filter(filterCodeGender).build());
        //Religion
        final String filterCodeReligion = "$.[?(@.active==true)].code";
        marriageMasterDetails
                 .add(MasterDetail.builder().name(MarriageConstants.RELIGION).filter(filterCodeReligion).build()); 
        //Religion
        final String filterCodePostOffice = "$.[?(@.active==true)].code";
        marriageMasterDetails
                 .add(MasterDetail.builder().name(MarriageConstants.POSTOFFICE).filter(filterCodePostOffice).build());  
                 

        ModuleDetail marriageModuleDtls = ModuleDetail.builder().masterDetails(marriageMasterDetails)
                .moduleName(MarriageConstants.COMMON_MASTER_MODULE_NAME).build();
       
        return marriageModuleDtls;
    }
    private List<ModuleDetail> getMarriageListRequest() {

        List<MasterDetail> marriageMasterDetails = new ArrayList<>();
        final String filterCodeMaritalStatus = "$.[?(@.active==true)].code";
        marriageMasterDetails
                    .add(MasterDetail.builder().name(MarriageConstants.MARITAL_STATUS).filter(filterCodeMaritalStatus).build());
                    
        final String filterCodeMarriagePlaceType = "$.[?(@.active==true)].code";
        marriageMasterDetails
                    .add(MasterDetail.builder().name(MarriageConstants.MARRIAGE_PLACE_TYPE).filter(filterCodeMarriagePlaceType).build());        

        final String filterCodeMarriageType = "$.[?(@.active==true)].code";
        marriageMasterDetails
                    .add(MasterDetail.builder().name(MarriageConstants.MARRIAGE_TYPE).filter(filterCodeMarriageType).build());

        // Add Module workflow
        marriageMasterDetails
                    .add(MasterDetail.builder().name(MarriageConstants.CR_MDMS_WORKFLOW_NEW).build());

        ModuleDetail marriageModuleDtls = ModuleDetail.builder().masterDetails(marriageMasterDetails)
                .moduleName(MarriageConstants.BND_MODULE_NAME).build();
             
         return Arrays.asList(marriageModuleDtls);
    }
    public Object mdmsCall(RequestInfo requestInfo) {
        // Call MDMS microservice with MdmsCriteriaReq as params

        MdmsCriteriaReq mdmsCriteriaReq = getMdmsRequest(requestInfo);
        String mdmsUri = String.format("%s%s", mdmsHost, mdmsUrl);
        Object result = null;
        try {
            result = restTemplate.postForObject(mdmsUri, mdmsCriteriaReq, Map.class);
        } catch (Exception e) {
            log.error("Exception occurred while fetching MDMS data: ", e);
        }
        return result;
    }
    private List<ModuleDetail> getAddressRequest(String district
            , String state
            , String country
            , String postOfficeId
            , String village
            , String taluk) {
        // master details for marriage certificate
        List<MasterDetail> marriageMasterDetails = new ArrayList<>();
        if(null!=district) {
            final String filterCode = "$.[?(@.code=='" + district + "')].name";
            marriageMasterDetails
                    .add(MasterDetail.builder().name(MarriageConstants.DISTRICT).filter(filterCode).build());
        }
        if(null!=state) {
            final String filterCodeState = "$.[?(@.code=='" + state + "')].name";
            marriageMasterDetails
                    .add(MasterDetail.builder().name(MarriageConstants.STATE).filter(filterCodeState).build());
        }
        if(null!=country) {
            final String filterCodeCountry = "$.[?(@.code=='" + country + "')].name";
            marriageMasterDetails
                    .add(MasterDetail.builder().name(MarriageConstants.COUNTRY).filter(filterCodeCountry).build());
        }
        if(null!=postOfficeId) {
            final String filterCodePostOffice = "$.[?(@.code=='" + postOfficeId + "')].name";
            marriageMasterDetails
                    .add(MasterDetail.builder().name(MarriageConstants.POSTOFFICE).filter(filterCodePostOffice).build());
        }
        if(null!=village) {
            final String filterCodeVillage = "$.[?(@.code=='" + village + "')].name";
            marriageMasterDetails
                    .add(MasterDetail.builder().name(MarriageConstants.VILLAGE).filter(filterCodeVillage).build());
        }
        if(null!=taluk) {
            //taluk
            final String filterCodeTaluk = "$.[?(@.code=='" + taluk + "')].name";
            marriageMasterDetails
                    .add(MasterDetail.builder().name(MarriageConstants.TALUK).filter(filterCodeTaluk).build());
        }
        ModuleDetail marriageModuleDtls = ModuleDetail.builder().masterDetails(marriageMasterDetails)
                .moduleName(MarriageConstants.COMMON_MASTER_MODULE_NAME).build();

        return Arrays.asList(marriageModuleDtls);
    }

    private List<ModuleDetail> getAddressRequestFromIds(String district
            , String state
            , String country
            , String postOfficeId
            , String village
            , String taluk) {
        // master details for marriage certificate
        List<MasterDetail> marriageMasterDetails = new ArrayList<>();
        if(null!=district) {
            final String filterCode = "$.[?(@.districtid=='" + district + "')].name";
            marriageMasterDetails
                    .add(MasterDetail.builder().name(MarriageConstants.DISTRICT).filter(filterCode).build());
        }
        if(null!=state) {
            final String filterCodeState = "$.[?(@.id=='" + state + "')].name";
            marriageMasterDetails
                    .add(MasterDetail.builder().name(MarriageConstants.STATE).filter(filterCodeState).build());
        }
        if(null!=country) {
            final String filterCodeCountry = "$.[?(@.id=='" + country + "')].name";
            marriageMasterDetails
                    .add(MasterDetail.builder().name(MarriageConstants.COUNTRY).filter(filterCodeCountry).build());
        }
        if(null!=postOfficeId) {
            final String filterCodePostOffice = "$.[?(@.id=='" + postOfficeId + "')].name";
            marriageMasterDetails
                    .add(MasterDetail.builder().name(MarriageConstants.POSTOFFICE).filter(filterCodePostOffice).build());
        }
        if(null!=village) {
            final String filterCodeVillage = "$.[?(@.id=='" + village + "')].name";
            marriageMasterDetails
                    .add(MasterDetail.builder().name(MarriageConstants.VILLAGE).filter(filterCodeVillage).build());
        }
        if(null!=taluk) {
            //taluk
            final String filterCodeTaluk = "$.[?(@.id=='" + taluk + "')].name";
            marriageMasterDetails
                    .add(MasterDetail.builder().name(MarriageConstants.TALUK).filter(filterCodeTaluk).build());
        }
        ModuleDetail marriageModuleDtls = ModuleDetail.builder().masterDetails(marriageMasterDetails)
                .moduleName(MarriageConstants.COMMON_MASTER_MODULE_NAME).build();

        return Arrays.asList(marriageModuleDtls);
    }


    private MdmsCriteriaReq getMDMSRequestForAddress(RequestInfo requestInfo
            , String tenantId
            , String presentAddressDistrict
            , String presentAddressState
            , String presentAddressCountry
            , String presentPostOfficeId
            , String presentAddressVillage
            , String presentAddrTaluk) {
        ModuleDetail tenantIdRequest = getTenantIdCertificate(tenantId);
        List<ModuleDetail> commonMasterRequest = getAddressRequest(presentAddressDistrict
                ,presentAddressState
                ,presentAddressCountry
                ,presentPostOfficeId
                ,presentAddressVillage
                ,presentAddrTaluk);

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
    private ModuleDetail getTenantIdCertificate(String tenantId) {

        List<MasterDetail> masterDetails = new ArrayList<>();

        // filter to only get code field from master data
        final String filterCode = "$.[?(@.code=='"+tenantId+"')].name";
        masterDetails
                .add(MasterDetail.builder().name(MarriageConstants.TENANTS).filter(filterCode).build());

        ModuleDetail marriageModuleDtls = ModuleDetail.builder().masterDetails(masterDetails)
                .moduleName(MarriageConstants.TENANT_MODULE_NAME).build();


        return marriageModuleDtls;
    }

    private ModuleDetail getCountry(String counrtyCode){
        List<MasterDetail> masterDetails = new ArrayList<>();

        // filter to only get code field from master data
        final String filterCode = "$.[?(@.code=='"+counrtyCode+"')].name";
        masterDetails
                .add(MasterDetail.builder().name(MarriageConstants.COUNTRY).filter(filterCode).build());

        ModuleDetail marriageModuleDtls = ModuleDetail.builder().masterDetails(masterDetails)
                .moduleName(MarriageConstants.COMMON_MASTER_MODULE_NAME).build();


        return marriageModuleDtls;
    }
    private ModuleDetail getMarriagePalceCertificate(String placeId,String placeType) {

        List<MasterDetail> masterDetails = new ArrayList<>();
        if(StringUtils.isNotBlank(placeId)) {
            // filter to only get code field from master data
            final String filterCode = "$.[?(@.code=='" + placeId + "')]";
            masterDetails
                    .add(MasterDetail.builder().name(MarriageConstants.MARRIAGE_PLACE).filter(filterCode).build());
        }


        ModuleDetail marriageModuleDtls = ModuleDetail.builder().masterDetails(masterDetails)
                .moduleName(MarriageConstants.TENANT_EGOV_LOCATION).build();


        return marriageModuleDtls;
    }
    public Object mDMSCallGetAddress(RequestInfo requestInfo
            , String tenantId
            , String presentAddressDistrict
            , String presentAddressState
            , String presentAddressCountry
            , String presentPostOfficeId
            , String presentAddressVillage
            , String presentAddrTaluk) {
        MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequestForAddress(requestInfo
                , tenantId
                , presentAddressDistrict
                , presentAddressState
                , presentAddressCountry
                , presentPostOfficeId
                , presentAddressVillage
                , presentAddrTaluk);
        Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);
        return result;
    }

    public Object mDMSCallGetMandapamAddress(RequestInfo requestInfo, MarriageRegistryDetails marriageRegistryDetails){
        if(StringUtils.isNotBlank(marriageRegistryDetails.getPlaceid())) {
            ModuleDetail moduleDetail = getMarriagePalceCertificate(marriageRegistryDetails.getPlaceid(), marriageRegistryDetails.getPlacetype());
            List<ModuleDetail> moduleDetails = new LinkedList<>();
            moduleDetails.add(moduleDetail);
            MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(marriageRegistryDetails.getTenantid())
                    .build();

            MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
                    .requestInfo(requestInfo).build();
            Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);
            return result;
        }else{
            return null;
        }
    }

//    public Object mdmsCallForLocation (RequestInfo requestInfo, String tenantId) {
//        // Call MDMS microservice with MdmsCriteriaReq as params
//
//        MdmsCriteriaReq mdmsCriteriaReq = getLocRequest(requestInfo, tenantId);
//        String mdmsUri = String.format("%s%s", mdmsHost, mdmsUrl);
//        Object result = null;
//        try {
//            result = restTemplate.postForObject(mdmsUri, mdmsCriteriaReq, Map.class);
//        } catch (Exception e) {
//            log.error("Exception occurred while fetching MDMS data: ", e);
//        }
//        return result;
//    }
//
//    private MdmsCriteriaReq getLocRequest(RequestInfo requestInfo, String tenantId) {
//
//        List<ModuleDetail> moduleDetails = new LinkedList<>();
//
//        moduleDetails.addAll(getBoundaryDetails());
//
//        //Prepare MDMS Criteria wih all modules in birth-death services and common services
//
//        MdmsCriteria mdmsCriteria = MdmsCriteria.builder()
//                .moduleDetails(moduleDetails)
//                .tenantId(tenantId)
//                .build();
//        //Return MDMS criteria request for calling  MDMS microservice
//        return MdmsCriteriaReq.builder()
//                .mdmsCriteria(mdmsCriteria)
//                .requestInfo(requestInfo)
//                .build();
//    }
//
    private MdmsCriteriaReq getMdmsRequest(RequestInfo requestInfo) {

        List<ModuleDetail> moduleDetails = new LinkedList<>();

        List<ModuleDetail> moduleDetailsLoc = new LinkedList<>();

        //Add all modules of birth-death services
        //moduleDetails.addAll(getCRModuleDetails());

        //Add all modules of common services
      //  moduleDetails.addAll(getCommonModuleDetails());

        //moduleDetails.addAll(getTenantModuleDetails());

        //Prepare MDMS Criteria wih all modules in birth-death services and common services

        MdmsCriteria mdmsCriteria = MdmsCriteria.builder()
                                                .moduleDetails(moduleDetails)
                                               // .tenantId(BirthConstants.CR_MDMS_TENANT)
                                                .build();
        //Return MDMS criteria request for calling  MDMS microservice
        return MdmsCriteriaReq.builder()
                              .mdmsCriteria(mdmsCriteria)
                              .requestInfo(requestInfo)
                              .build();
    }
//
//    public List<ModuleDetail> getBoundaryDetails() {
//        // master details for Boundary
//
////        List<MasterDetail> crMasterDetails = new LinkedList<>();
////
////        List<MasterDetail> masterHospital = Collections.singletonList(MasterDetail.builder()
////                .name(BirthConstants.LOCATION_MDMS_HOSPITAL)
////                .build());
////        crMasterDetails.addAll(masterHospital);
////
////        List<MasterDetail> masterInstitution = Collections.singletonList(MasterDetail.builder()
////                .name(BirthConstants.LOCATION_MDMS_INSTITUTION)
////                .build());
////        crMasterDetails.addAll(masterInstitution);
////
////        ModuleDetail crModuleDetail = ModuleDetail.builder()
////                .masterDetails(crMasterDetails)
////                .moduleName(BirthConstants.LOCATION_MDMS_MODULE)
////                .build();
//
//        return Collections.singletonList(crModuleDetail);

  //  }

//    public List<ModuleDetail> getCRModuleDetails() {
//        // master details for CR module
//
//        List<MasterDetail> crMasterDetails = new LinkedList<>();
//
//        //
//        List<MasterDetail> masterProfession = Collections.singletonList(MasterDetail.builder()
//                                                                                    .name(BirthConstants.CR_MDMS_PROFESSION)
//                                                                                    .build());
//        crMasterDetails.addAll(masterProfession);
//
//        // Add Module Qualification
//        List<MasterDetail> masterQualification = Collections.singletonList(MasterDetail.builder()
//                                                                                       .name(BirthConstants.CR_MDMS_QUALIFICATION)
//                                                                                       .build());
//        crMasterDetails.addAll(masterQualification);
//
//        // Add Module Medical Attention Type
//        List<MasterDetail> masterMedicalAttentionType = Collections.singletonList(MasterDetail.builder()
//                                                                                              .name(BirthConstants.COMMON_MDMS_MEDICAL_ATTENTION_TYPE)
//                                                                                              .build());
//        crMasterDetails.addAll(masterMedicalAttentionType);
//
//        // Add Module InstitutionType
//        List<MasterDetail> masterInstitutionType = Collections.singletonList(MasterDetail.builder()
//                                                                                         .name(BirthConstants.CR_MDMS_INSTITUTIONTYPE)
//                                                                                         .build());
//        crMasterDetails.addAll(masterInstitutionType);
//
//        // Add Module DeliveryMethod
//        List<MasterDetail> masterDeliveryMethod = Collections.singletonList(MasterDetail.builder()
//                                                                                        .name(BirthConstants.CR_MDMS_DELIVERYMETHOD)
//                                                                                        .build());
//        crMasterDetails.addAll(masterDeliveryMethod);
//
//
//        //Add masters to modules
//        ModuleDetail crModuleDetail = ModuleDetail.builder()
//                                                  .masterDetails(crMasterDetails)
//                                                  .moduleName(BirthConstants.CR_MDMS_MODULE)
//                                                  .build();
//
//        return Collections.singletonList(crModuleDetail);
//
//    }
//
//    public List<ModuleDetail> getCommonModuleDetails() {
//        // master details for Common module
//
//        List<MasterDetail> commonMasterDetails = new LinkedList<>();
//        // Add Module Religion
//        List<MasterDetail> masterReligion = Collections.singletonList(MasterDetail.builder()
//                                                                                  .name(BirthConstants.COMMON_MDMS_RELIGION)
//                                                                                  .build());
//
//        commonMasterDetails.addAll(masterReligion);
//        // Add Module Taluk
//        List<MasterDetail> masterTaluk = Collections.singletonList(MasterDetail.builder()
//                                                                               .name(BirthConstants.COMMON_MDMS_TALUK)
//                                                                               .build());
//
//        commonMasterDetails.addAll(masterTaluk);
//        // Add Module State
//        List<MasterDetail> masterState = Collections.singletonList(MasterDetail.builder()
//                                                                               .name(BirthConstants.COMMON_MDMS_STATE)
//                                                                               .build());
//        commonMasterDetails.addAll(masterState);
//        // Add Module Country
//        List<MasterDetail> masterCountry = Collections.singletonList(MasterDetail.builder()
//                                                                                 .name(BirthConstants.COMMON_MDMS_COUNTRY)
//                                                                                 .build());
//        commonMasterDetails.addAll(masterCountry);
//
//
//        // Add Module Village
//        List<MasterDetail> masterVillage = Collections.singletonList(MasterDetail.builder()
//                                                                                 .name(BirthConstants.COMMON_MDMS_VILLAGE)
//                                                                                 .build());
//        commonMasterDetails.addAll(masterVillage);
//
//        // Add Module District
//        List<MasterDetail> masterDistrict = Collections.singletonList(MasterDetail.builder()
//                                                                                  .name(BirthConstants.COMMON_MDMS_DISTRICT)
//                                                                                  .build());
//        commonMasterDetails.addAll(masterDistrict);
//
//        // Add Module Postoffice
//        List<MasterDetail> masterPostOffice = Collections.singletonList(MasterDetail.builder()
//                                                                                    .name(BirthConstants.COMMON_MDMS_POSTOFFICE)
//                                                                                    .build());
//        commonMasterDetails.addAll(masterPostOffice);
//
//        // Add Module LbType
//        List<MasterDetail> masterLbType = Collections.singletonList(MasterDetail.builder()
//                                                                                .name(BirthConstants.COMMON_MDMS_LBTYPE)
//                                                                                .build());
//        commonMasterDetails.addAll(masterLbType);
//
//        // Add Module PlaceMaster
//        List<MasterDetail> masterBirthPlace = Collections.singletonList(MasterDetail.builder()
//                                                                                    .name(BirthConstants.COMMON_MDMS_PLACEMASTER)
//                                                                                    .build());
//        commonMasterDetails.addAll(masterBirthPlace);
//
//        ModuleDetail commonModuleDetail = ModuleDetail.builder()
//                                                      .masterDetails(commonMasterDetails)
//                                                      .moduleName(BirthConstants.COMMON_MDMS_MODULE)
//                                                      .build();
//
//        return Collections.singletonList(commonModuleDetail);
//
//    }
//
//    public List<ModuleDetail> getTenantModuleDetails() {
//        // master details for Tenant module
//        moduleName = "tenant";
//        List<MasterDetail> tenantDetails = new LinkedList<>();
//
//        List<MasterDetail> masterTenants = Collections.singletonList(MasterDetail.builder()
//                                                                                  .name(BirthConstants.CR_MDMS_TENANTS)
//                                                                                  .build());
//        tenantDetails.addAll(masterTenants);
//
//        ModuleDetail tenantModuleDetail = ModuleDetail.builder()
//                                                      .masterDetails(tenantDetails)
//                                                      .moduleName(BirthConstants.TENANTS_MODULE)
//                                                      .build();
//
//        return Collections.singletonList(tenantModuleDetail);
//
//    }

    public Map<String,List<String>> getMarriageMDMSData(MarriageCertPDFRequest request, Object mdmsdata) {
//        Map<String, String> errorMap = new HashMap<>();
        Map<String, List<String>> masterData = getAttributeValues(mdmsdata);
       // System.out.println(masterData);
        return masterData;
    }

    public Map<String,List<String>> getMarriageMDMSData(Object mdmsdata) {
//        Map<String, String> errorMap = new HashMap<>();
        Map<String, List<String>> masterData = getAttributeValues(mdmsdata);
        // System.out.println(masterData);
        return masterData;
    }

    private Map<String, List<String>> getAttributeValues(Object mdmsdata) {
        List<String> modulepaths = Arrays.asList(
                //MarriageConstants.CR_MDMS_TENANTS_CODE_JSONPATH,
                MarriageConstants.TENANT_JSONPATH,
                MarriageConstants.COMMON_MASTER_JSONPATH);
//        final Map<String, List<String>> mdmsResMap = new HashMap<>();
//        // System.out.println("Jasminemodulepaths"+modulepaths);
//        modulepaths.forEach(modulepath -> {
//            try {
//                mdmsResMap.putAll(JsonPath.read(mdmsdata, modulepath));
//                // log.error("jsonpath1" + JsonPath.read(mdmsdata, modulepath));
//            } catch (Exception e) {
//                log.error("Error while fetching MDMS data", e);
//                throw new CustomException(MarriageConstants.INVALID_TENANT_ID_MDMS_KEY,
//                        MarriageConstants.INVALID_TENANT_ID_MDMS_MSG);
//            }
//
//        });
//        return mdmsResMap;
        return  getAttributeValuesForJsonPaths(mdmsdata,modulepaths);
    }


    private Map<String, List<String>> getAttributeValuesForJsonPaths(Object mdmsdata,List<String> modulepaths) {
        if(modulepaths!=null&&!modulepaths.isEmpty()) {
            final Map<String, List<String>> mdmsResMap = new HashMap<>();
            modulepaths.forEach(modulepath -> {
                try {
                    mdmsResMap.putAll(JsonPath.read(mdmsdata, modulepath));
                } catch (Exception e) {
                    log.error("Error while fetching MDMS data", e);
                    throw new CustomException(MarriageConstants.INVALID_TENANT_ID_MDMS_KEY,
                            MarriageConstants.INVALID_TENANT_ID_MDMS_MSG);
                }

            });
            return mdmsResMap;
        }else{
            log.error("Error while fetching MDMS data,modulepaths is invalid");
            throw new CustomException(MarriageConstants.INVALID_TENANT_ID_MDMS_KEY,
                    MarriageConstants.INVALID_TENANT_ID_MDMS_MSG);
        }
    }
    private Map<String, Object> getAttributeStrValuesForJsonPaths(Object mdmsdata,List<String> modulepaths) {
        if(modulepaths!=null&&!modulepaths.isEmpty()) {
            final Map<String, Object> mdmsResMap = new HashMap<>();
            modulepaths.forEach(modulepath -> {
                try {
                    mdmsResMap.putAll(JsonPath.read(mdmsdata, modulepath));
                } catch (Exception e) {
                    log.error("Error while fetching MDMS data", e);
                    throw new CustomException(MarriageConstants.INVALID_TENANT_ID_MDMS_KEY,
                            MarriageConstants.INVALID_TENANT_ID_MDMS_MSG);
                }

            });
            return mdmsResMap;
        }else{
            log.error("Error while fetching MDMS data,modulepaths is invalid");
            throw new CustomException(MarriageConstants.INVALID_TENANT_ID_MDMS_KEY,
                    MarriageConstants.INVALID_TENANT_ID_MDMS_MSG);
        }
    }
    public Map<String, Object> getMandapamAttributeValues(Object mdmsdata) {
        if(null!=mdmsdata) {
            List<String> modulepaths = Arrays.asList(
                    //MarriageConstants.CR_MDMS_TENANTS_CODE_JSONPATH,
//                MarriageConstants.TENANT_JSONPATH,
//                MarriageConstants.COMMON_MASTER_JSONPATH,
//                MarriageConstants.EGOV_LOCATION_JSONPATH,
                    MarriageConstants.MARRIAGE_PLACE_JSONPATH);

            return getAttributeStrValuesForJsonPaths(mdmsdata, modulepaths);
        }else{
            return null;
        }
    }

    public StringBuilder appendIfNotBlank(String v,StringBuilder s,boolean addSemicolon){
        if(StringUtils.isNotBlank(v)){
            s.append(v);
            if(addSemicolon){
                s.append(",");
            }
        }
        return  s;
    }

    private MdmsCriteriaReq MdmsRequestForCountry(RequestInfo requestInfo,String countryCode){
        List<ModuleDetail> moduleDetails = new LinkedList<>();
        ModuleDetail countryRequest = getCountry(countryCode);
        moduleDetails.add(countryRequest);
        MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(config.getEgovStateLevelTenant())
                .build();

        MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
                .requestInfo(requestInfo).build();

        // System.out.println("mdmsreq2"+mdmsCriteriaReq);
        return mdmsCriteriaReq;
    }

    public Map<String, List<String>> mDMSCallGetCountry(RequestInfo requestInfo
            , String countryCode) {
        log.info("Inside mDMSCallGetCountry "+countryCode);
        MdmsCriteriaReq mdmsCriteriaReq = MdmsRequestForCountry(requestInfo, countryCode);
        Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);
        log.info("result mDMSCallGetCountry "+result.toString());
        if(null!=result){
            List<String> modulepaths = Arrays.asList(
                    MarriageConstants.COMMON_MASTER_JSONPATH);
           return  getAttributeValuesForJsonPaths(result,modulepaths);
        }
        return null;
    }


    public Map<String, List<String>> mDMSCallGetTenantData(RequestInfo requestInfo
            , String tenantId) {
        log.info("Inside mDMSCallGetTenant "+tenantId);
        MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequestForTenant(requestInfo, tenantId);
        Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);
        log.info("result mDMSCallGetTenant "+result.toString());
        if(null!=result){
            List<String> modulepaths = Arrays.asList(
                    MarriageConstants.COMMON_MASTER_JSONPATH,
                    MarriageConstants.TENANT_JSONPATH);
            return  getAttributeValuesForJsonPaths(result,modulepaths);
        }
        return null;
    }

    private MdmsCriteriaReq getMDMSRequestForAddressFromIds(RequestInfo requestInfo
            , String tenantId
            , String presentAddressDistrict
            , String presentAddressState
            , String presentAddressCountry
            , String presentPostOfficeId
            , String presentAddressVillage
            , String presentAddrTaluk) {
        ModuleDetail tenantIdRequest = getTenantIdCertificate(tenantId);
        List<ModuleDetail> commonMasterRequest = getAddressRequestFromIds(presentAddressDistrict
                ,presentAddressState
                ,presentAddressCountry
                ,presentPostOfficeId
                ,presentAddressVillage
                ,presentAddrTaluk);

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
    public Object mDMSCallGetAddressFromIds(RequestInfo requestInfo
            , String tenantId
            , String presentAddressDistrict
            , String presentAddressState
            , String presentAddressCountry
            , String presentPostOfficeId
            , String presentAddressVillage
            , String presentAddrTaluk) {
        MdmsCriteriaReq mdmsCriteriaReq = getMDMSRequestForAddressFromIds(requestInfo
                , tenantId
                , presentAddressDistrict
                , presentAddressState
                , presentAddressCountry
                , presentPostOfficeId
                , presentAddressVillage
                , presentAddrTaluk);
        Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);
        return result;
    }
    //Jasmine 03.05.2023
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
    private ModuleDetail getTenantDetails(String tenantId) {

        // master details for crDeath module
        List<MasterDetail> crMarriageMasterDetails = new ArrayList<>();        
        crMarriageMasterDetails
                .add(MasterDetail.builder().name(MarriageConstants.TENANTS).build());

        ModuleDetail crMarriageModuleDtls = ModuleDetail.builder().masterDetails(crMarriageMasterDetails)
                .moduleName(MarriageConstants.TENANT_MODULE_NAME).build();
       
        return crMarriageModuleDtls;
    }

    private ModuleDetail getCommonMastersSearch() {

        List<MasterDetail> crMarriageMasterDetails = new ArrayList<>();  
        //Gender
        crMarriageMasterDetails
                .add(MasterDetail.builder().name(MarriageConstants.GENDERTYPE)
                .build());
        //District        
        crMarriageMasterDetails
                .add(MasterDetail.builder().name(MarriageConstants.DISTRICT)
                .build());   
        //State        
        crMarriageMasterDetails
                 .add(MasterDetail.builder().name(MarriageConstants.STATE)
                 .build());    
        //Country        
        crMarriageMasterDetails
                 .add(MasterDetail.builder().name(MarriageConstants.COUNTRY)
                 .build());     
        //Religion        
        crMarriageMasterDetails
                 .add(MasterDetail.builder().name(MarriageConstants.RELIGION)
                 .build());                    
        //PostOffice
        crMarriageMasterDetails
                        .add(MasterDetail.builder().name(MarriageConstants.POSTOFFICE)
                        .build());  
                        
        //Taluk
        crMarriageMasterDetails
                        .add(MasterDetail.builder().name(MarriageConstants.TALUK)
                        .build()); 
        //VILLAGE
        crMarriageMasterDetails
                        .add(MasterDetail.builder().name(MarriageConstants.VILLAGE)
                        .build());
        //LBTYPE
        crMarriageMasterDetails
                        .add(MasterDetail.builder().name(MarriageConstants.LBTYPE)
                        .build());

        ModuleDetail crMarriageModuleDtls = ModuleDetail.builder().masterDetails(crMarriageMasterDetails)
                .moduleName(MarriageConstants.COMMON_MASTER_MODULE_NAME).build();
       
        return crMarriageModuleDtls;
    }

    private List<ModuleDetail> getBNDSearch() {

        List<MasterDetail> crMarriageMasterDetails = new ArrayList<>();
        crMarriageMasterDetails
                    .add(MasterDetail.builder().name(MarriageConstants.MARITAL_STATUS)
                    .build());
        crMarriageMasterDetails
                           .add(MasterDetail.builder().name(MarriageConstants.MARRIAGE_PLACE_TYPE)
                           .build());
        crMarriageMasterDetails
                              .add(MasterDetail.builder().name(MarriageConstants.MARRIAGE_TYPE)
                              .build());
        crMarriageMasterDetails
                             .add(MasterDetail.builder().name(MarriageConstants.SUB_REGISTAR_PLACE_TYPE)
                              .build());
        // Add Module workflow
        crMarriageMasterDetails.add(MasterDetail.builder()
                                                        .name(MarriageConstants.CR_MDMS_WORKFLOW_NEW)
                                                        .build());

        ModuleDetail crMarriageModuleDtls = ModuleDetail.builder().masterDetails(crMarriageMasterDetails)
                .moduleName(MarriageConstants.BND_MODULE_NAME).build();

               
         return Arrays.asList(crMarriageModuleDtls);
    }

    public String getCountryNameEn(Object mdmsData, String CountryId) {
        List<String> countries  = getCountryCode(mdmsData);
        int index = countries.indexOf(CountryId);
        return index<0?null:JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_COUNTRY_CODES_JSONPATH+"["+index+"].name");
    }
    public String getCountryNameMl(Object mdmsData, String CountryId) {
        List<String> countries  = getCountryCode(mdmsData);
        int index = countries.indexOf(CountryId);
        return index<0?null:JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_COUNTRY_CODES_JSONPATH+"["+index+"].namelocal");
    }
    public String getStateNameEn(Object mdmsData, String StateId) {
        List<String> states  = getStateCode(mdmsData);
        int index = states.indexOf(StateId);
        return index<0?null:JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_STATE_JSONPATH+"["+index+"].name");
    }
    public String getStateNameMl(Object mdmsData, String StateId) {
        List<String> states  = getStateCode(mdmsData);
        int index = states.indexOf(StateId);
        return index<0?null:JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_STATE_JSONPATH+"["+index+"].namelocal");
    }
    public String getDistrictNameEn(Object mdmsData, String DistrictId) {
        List<String> districts  = getDistrictCode(mdmsData);
        int index = districts.indexOf(DistrictId);
        return index<0?null:JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_DISTRICT_JSONPATH+"["+index+"].name");
    }    
    public String getDistrictNameMl(Object mdmsData, String DistrictId) {
        List<String> districts  = getDistrictCode(mdmsData);
        int index = districts.indexOf(DistrictId);
        return index<0?null:JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_DISTRICT_JSONPATH+"["+index+"].namelocal");
    }
    public String getTalukNameEn(Object mdmsData, String TalukId) {
        List<String> taluks  = getTalukCode(mdmsData);
        int index = taluks.indexOf(TalukId);
        return index<0?null:JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_TALUK_JSONPATH+"["+index+"].name");
    }  
    public String getTalukNameMl(Object mdmsData, String TalukId) {
        List<String> taluks  = getTalukCode(mdmsData);
        int index = taluks.indexOf(TalukId);
        return index<0?null:JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_TALUK_JSONPATH+"["+index+"].namelocal");
    }    
    public String getVillageNameEn(Object mdmsData, String VillageId) {
        List<String> villages  = getVillageCode(mdmsData);
        int index = villages.indexOf(VillageId);
        return index<0?null:JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_VILLAGE_JSONPATH+"["+index+"].name");
    }  
    public String getVillageNameMl(Object mdmsData, String VillageId) {
        List<String> villages  = getVillageCode(mdmsData);
        int index = villages.indexOf(VillageId);
        return index<0?null:JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_VILLAGE_JSONPATH+"["+index+"].namelocal");
    }  
    public String getPONameEn(Object mdmsData, String POId) {
        List<String> po  = getPOCode(mdmsData);
        int index = po.indexOf(POId);
        return index<0?null:JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_POSTOFFICE_JSONPATH+"["+index+"].name");
    }  
    public String getPONameMl(Object mdmsData, String POId) {
        List<String> po  = getPOCode(mdmsData);
        int index = po.indexOf(POId);
        return index<0?null:JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_POSTOFFICE_JSONPATH+"["+index+"].namelocal");
    }
    public String getMaritalStatusEn(Object mdmsData, String POId) {
        List<String> maritalStatus  = getMaritalStatusCode(mdmsData);
        int index = maritalStatus.indexOf(POId);
        return index<0?null:JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_MARITALSTATUS_JSONPATH+"["+index+"].name");
    }
    public String getMaritalStatusMl(Object mdmsData, String POId) {
        List<String> po  = getPOCode(mdmsData);
        int index = po.indexOf(POId);
        return index<0?null:JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_MARITALSTATUS_JSONPATH+"["+index+"].namelocal");
    }
//    public String getGenderEn(Object mdmsData, String POId) {
//        List<String> po  = getPOCode(mdmsData);
//        int index = po.indexOf(POId);
//        return JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_GENDER_JSONPATH+"["+index+"].name");
//    }
//    public String getGenderMl(Object mdmsData, String POId) {
//        List<String> po  = getPOCode(mdmsData);
//        int index = po.indexOf(POId);
//        return JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_GENDER_JSONPATH+"["+index+"].namelocal");
//    }
    private List<String> getCountryCode(Object mdmsData) {
        return JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_COUNTRY_CODE_JSONPATH);
    }
    private List<String> getStateCode(Object mdmsData) {
        return JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_STATE_CODE_JSONPATH);
    }
    private List<String> getDistrictCode(Object mdmsData) {
        return JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_DISTRICT_CODE_JSONPATH);
    }
    private List<String> getTalukCode(Object mdmsData) {
        return JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_TALUK_CODE_JSONPATH);
    }
    private List<String> getVillageCode(Object mdmsData) {
        return JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_VILLAGE_CODE_JSONPATH);
    }
    private List<String> getPOCode(Object mdmsData) {
        return JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_POSTOFFICE_CODE_JSONPATH);
    }
    private List<String> getMaritalStatusCode(Object mdmsData) {
        return JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_MARITALSTATUS_JSONPATH);
    }
    private List<String> getLBCode(Object mdmsData) {
        return JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_MARRIAGE_TENANT_CODE_JSONPATH);
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

        // List<MasterDetail> masterHospital = Collections.singletonList(MasterDetail.builder()
        //         .name(MarriageConstants.LOCATION_MDMS_HOSPITAL)
        //         .build());
        // crMasterDetails.addAll(masterHospital);

        // List<MasterDetail> masterInstitution = Collections.singletonList(MasterDetail.builder()
        //         .name(DeathConstants.INSTITUTION_NAME)
        //         .build());
        // crMasterDetails.addAll(masterInstitution);

        List<MasterDetail> masterBoundary = Collections.singletonList(MasterDetail.builder()
                .name(MarriageConstants.LOCATION_MDMS_BOUNDARY)
                .build());
        crMasterDetails.addAll(masterBoundary);

         List<MasterDetail> masterMarriagePlace = Collections.singletonList(MasterDetail.builder()
                 .name(MarriageConstants.MARRIAGE_PLACE)
                 .build());
         crMasterDetails.addAll(masterMarriagePlace);

        ModuleDetail crModuleDetail = ModuleDetail.builder()
                .masterDetails(crMasterDetails)
                .moduleName(MarriageConstants.TENANT_EGOV_LOCATION)
                .build();

        return Collections.singletonList(crModuleDetail);

    }
    private List<String> getBoundaryCode(Object mdmsData) {
        return JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_BOUNDARY_CODE_JSONPATH);
    }
    // private List<String> getAgeUnitCode(Object mdmsData) {
    //     return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DEATH_AGE_UNIT_CODE_JSONPATH);
    // }
    // private List<String> getPublicPlaceCode(Object mdmsData) {
    //     return JsonPath.read(mdmsData, DeathConstants.CR_MDMS_DEATH_OTHER_PLACE_CODE_JSONPATH);
    // }
    public String getWardNameEn(Object mdmsData, String WardId) {
        List<String> tenants  = getBoundaryCode(mdmsData);
        int index = tenants.indexOf(WardId);
        ArrayList<String> names =  JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_BOUNDARY_CODES_JSONPATH+".name");
        return index<0?null:names.get(index);
    }

    public String getWardNameMl(Object mdmsData, String WardId) {
        List<String> tenants  = getBoundaryCode(mdmsData);
        int index = tenants.indexOf(WardId);
        ArrayList<String> names =  JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_BOUNDARY_CODES_JSONPATH+".localname");
        return index<0?null:names.get(index);
    }

    public String getPlaceTypeNameEn(Object mdmsData, String placetype) {
        List<String> tenants  = getPlaceTypeCode(mdmsData);
        int index = tenants.indexOf(placetype);
        return  index<0?null:JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_PLACE_TYPE_JSONPATH+"["+index+"].name");
    }
    public String getPlaceTypeNameMl(Object mdmsData, String placetype) {
        List<String> tenants  = getPlaceTypeCode(mdmsData);
        int index = tenants.indexOf(placetype);
        return  index<0?null:JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_PLACE_TYPE_JSONPATH+"["+index+"].namelocal");
    }

    public String getMarriageTypeEn(Object mdmsData, String marriageType) {
        List<String> tenants  = getMarriageTypeCode(mdmsData);
        int index = tenants.indexOf(marriageType);
        return  index<0?null:JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_MARRIAGE_TYPE_JSONPATH+"["+index+"].name");
    }
    public String getMarriageTypeMl(Object mdmsData, String marriageType) {
        List<String> tenants  = getMarriageTypeCode(mdmsData);
        int index = tenants.indexOf(marriageType);
        return  index<0?null:JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_MARRIAGE_TYPE_JSONPATH+"["+index+"].namelocal");
    }

    public String getMarriagePlaceIdEn(Object mdmsData, String placeId) {
        List<String> tenants  = getPlaceIdCode(mdmsData);
        int index = tenants.indexOf(placeId);
        ArrayList<String> names =  JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_PLACEID_JSONPATH+".name");
        return index<0?null:names.get(index);
    }
    public String getMarriagePlaceIdMl(Object mdmsData, String placeId) {
        List<String> tenants  = getPlaceIdCode(mdmsData);
        int index = tenants.indexOf(placeId);
        ArrayList<String> names =  JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_PLACEID_JSONPATH+".nameLocal");
        return index<0?null:names.get(index);
    }

    public String getMarriagePlaceIdSubRegiEn(Object mdmsData, String placeId) {
        List<String> tenants  = getPlaceIdCodeSubRegi(mdmsData);
        int index = tenants.indexOf(placeId);
        ArrayList<String> names =  JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_PLACESUBREGISTARID_JSONPATH+".locationOfOffice");
        return index<0?null:names.get(index);
    }
    public String getMarriagePlaceIdSubRegiMl(Object mdmsData, String placeId) {
        List<String> tenants  = getPlaceIdCodeSubRegi(mdmsData);
        int index = tenants.indexOf(placeId);
        ArrayList<String> names =  JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_PLACESUBREGISTARID_JSONPATH+".officeLocal");
        return index<0?null:names.get(index);
    }

    public String getMarriageLbtypeEn(Object mdmsData, String Lbtype) {
        List<String> tenants  = getLBTypeCode(mdmsData);
        int index = tenants.indexOf(Lbtype);
        return index<0?null:JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_LBTYPE_JSONPATH+"["+index+"].name");
    }
    public String getMarriageLbtypeMl(Object mdmsData, String Lbtype) {
        List<String> tenants  = getLBTypeCode(mdmsData);
        int index = tenants.indexOf(Lbtype);
        return index<0?null:JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_LBTYPE_JSONPATH+"["+index+"].namelocal");
    }
    public String getMarriageTenantEn(Object mdmsData, String tenantId) {
        List<String> tenants  = getTenantIdCode(mdmsData);
        int index = tenants.indexOf(tenantId);
        return  index<0?null:JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_TENANTS_JSONPATH+"["+index+"].city.name");
    }
    public String getMarriageTenantMl(Object mdmsData, String tenantId) {
        List<String> tenants  = getTenantIdCode(mdmsData);
        int index = tenants.indexOf(tenantId);
        return  index<0?null:JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_TENANTS_JSONPATH+"["+index+"].city.localName");
    }

    private List<String> getLBTypeCode(Object mdmsData) {
        return JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_LBTYPE_CODE_JSONPATH);
    }
    private List<String> getPlaceTypeCode(Object mdmsData) {
        return JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_PLACETYPE_CODE_JSONPATH);
    }
    private List<String> getMarriageTypeCode(Object mdmsData) {
        return JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_MARRIAGETYPE_CODE_JSONPATH);
    }
    private List<String> getPlaceIdCode(Object mdmsData) {
        return JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_PLACEID_CODE_JSONPATH);
    }
    private List<String> getTenantIdCode(Object mdmsData) {
        return JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_TENANTS_CODE_JSONPATH);
    }

    private List<String> getPlaceIdCodeSubRegi(Object mdmsData) {
        return JsonPath.read(mdmsData, MarriageConstants.CR_MDMS_PLACESUBREGISTARID_CODE_JSONPATH);
    }
}