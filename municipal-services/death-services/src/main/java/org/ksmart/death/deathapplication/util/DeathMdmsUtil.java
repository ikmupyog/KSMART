package org.ksmart.death.deathapplication.util;

import java.util.ArrayList;
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
    
}
