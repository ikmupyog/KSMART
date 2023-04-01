package org.ksmart.marriage.utils;

import lombok.extern.slf4j.Slf4j;
import org.egov.common.contract.request.RequestInfo;
import org.egov.mdms.model.MasterDetail;
import org.egov.mdms.model.MdmsCriteria;
import org.egov.mdms.model.MdmsCriteriaReq;
import org.egov.mdms.model.ModuleDetail;
import org.ksmart.marriage.common.repository.ServiceRequestRepository;
import org.ksmart.marriage.config.MarriageApplicationConfiguration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
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
        ModuleDetail commomMasterRequest = getCommonMastersRequest();
        List<ModuleDetail> BNDListRequest = getMarriageListRequest();

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
    public StringBuilder getMdmsSearchUrl() {
        return new StringBuilder().append(config.getMdmsHost()).append(config.getMdmsEndPoint());
    }
    private ModuleDetail getTenantIdRequest(String tenantId) {

        // master details for Marriage module
        List<MasterDetail> marriageMasterDetails = new ArrayList<>();
        // filter to only get code field from master data    
        final String filterCode = "$.[?(@.code=='"+tenantId+"')].*";
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
}