package org.ksmart.marriage.marriageapplication.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.egov.common.contract.request.RequestInfo;
import org.egov.mdms.model.MasterDetail;
import org.egov.mdms.model.MdmsCriteria;
import org.egov.mdms.model.MdmsCriteriaReq;
import org.egov.mdms.model.ModuleDetail;
import org.ksmart.marriage.common.repository.ServiceRequestRepository;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageapplication.enrichment.MarriageDetailsEnrichment;
import org.ksmart.marriage.marriageapplication.web.model.Demand.Demand;
import org.ksmart.marriage.marriageapplication.web.model.Demand.DemandDetail;
import org.ksmart.marriage.marriageapplication.web.model.marriage.WorkFlowCheck;
import org.ksmart.marriage.utils.MarriageConstants;
// import org.ksmart.death.common.repository.ServiceRequestRepository;
// import org.ksmart.death.deathapplication.config.DeathConfiguration;
// import org.ksmart.death.deathapplication.enrichment.DeathEnrichment;
// import org.ksmart.death.deathapplication.web.models.WorkFlowCheck;
// import org.ksmart.death.deathapplication.web.models.Demand.Demand;
// import org.ksmart.death.deathapplication.web.models.Demand.DemandDetail;
// import org.ksmart.death.utils.BirthDeathConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jayway.jsonpath.JsonPath;
/**
     * Creates DemandService
     * Jasmine on 10.04.2023
     * 
     */

@Service
public class DemandService {
    
    public static final String TAX_MASTER = "TaxHeadMaster";

    public static final String TAX_MASTER_JSONPATH_CODE = "$.MdmsRes.BillingService.TaxHeadMaster[?(@.code==\"{}\")]";

    @Autowired
    MarriageApplicationConfiguration config;

    @Autowired
    ServiceRequestRepository serviceRequestRepository;

    @Autowired
    MarriageDetailsEnrichment enrichmentService;

    public List<Demand> saveDemandDetails(List<Demand> demands, RequestInfo requestInfo, WorkFlowCheck wfc) {
        demands.forEach(demand -> setDemandParamsLateFee(demand, requestInfo, wfc));
        return  enrichmentService.saveDemand(requestInfo,demands);
    }
    public void setDemandParamsLateFee(Demand demand, RequestInfo requestInfo, WorkFlowCheck wfc) {

        demand.setConsumerType("FEE");
        demand.setBusinessService("CR");
        ArrayList<DemandDetail> demandDetails = new ArrayList<>();
        DemandDetail demandDetail=new DemandDetail();
        demandDetail.setTaxHeadMasterCode(config.getTaxHeadMasterCode());
        demandDetail.setTaxAmount(new BigDecimal(wfc.getAmount()));
        demandDetail.setTenantId(demand.getTenantId());
        setGLCode(demandDetail, requestInfo);
        demandDetails.add(demandDetail);
        demand.setDemandDetails(demandDetails);
        demand.setPayer(requestInfo.getUserInfo());
        demand.setTaxPeriodFrom(System.currentTimeMillis());
        demand.setTaxPeriodTo(System.currentTimeMillis()+86400000);
        demand.setMinimumAmountPayable(new BigDecimal(wfc.getAmount()));
    }

    private ModuleDetail getGLCodeRequest() {
        List<MasterDetail> masterDetails = new ArrayList<>();
        masterDetails.add(MasterDetail.builder().name(TAX_MASTER).build());
        return ModuleDetail.builder().masterDetails(masterDetails).moduleName(MarriageConstants.BILLING_SERVICE).build();
    }

    public void setGLCode(DemandDetail demandDetail, RequestInfo requestInfo) {
        String tenantId = demandDetail.getTenantId();
        ModuleDetail glCodeRequest = getGLCodeRequest();
        List<ModuleDetail> moduleDetails = new LinkedList<>();
        moduleDetails.add(glCodeRequest);
        MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(tenantId)
                .build();
        MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
                .requestInfo(requestInfo).build();

        StringBuilder url = new StringBuilder().append(config.getMdmsHost()).append(config.getMdmsEndPoint());

        Object result = serviceRequestRepository.fetchResult(url, mdmsCriteriaReq);
        String jsonPath = TAX_MASTER_JSONPATH_CODE.replace("{}",demandDetail.getTaxHeadMasterCode());
        List<Map<String,Object>> jsonOutput =  JsonPath.read(result, jsonPath);
        if(!jsonOutput.isEmpty()) {
            Map<String,Object> glCodeObj = jsonOutput.get(0);
            demandDetail.setAdditionalDetails(glCodeObj);
        }
    }
}
