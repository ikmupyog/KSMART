package com.translator.utlis;

import lombok.extern.slf4j.Slf4j;
import org.egov.common.contract.request.RequestInfo;
import org.egov.mdms.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class MdmsUtil {
    private final RestTemplate restTemplate;

    @Autowired
    MdmsUtil(RestTemplate restTemplate){
        this.restTemplate = restTemplate;
    }
    @Value("${egov.mdms.host}")
    private String mdmsHost;

    @Value("${egov.mdms.search.endpoint}")
    private String mdmsUrl;


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

    private MdmsCriteriaReq getMdmsRequest(RequestInfo requestInfo) {

        List<ModuleDetail> moduleDetails = new LinkedList<>();

        //Add all modules of common services
        moduleDetails.addAll(getCommonModuleDetails());

        //Prepare MDMS Criteria wih all modules in  common services

        MdmsCriteria mdmsCriteria = MdmsCriteria.builder()
                                                .moduleDetails(moduleDetails)
                                                .tenantId(TranslatorConstants.COMMON_MDMS_TENANT)
                                                .build();
        //Return MDMS criteria request for calling  MDMS microservice
        return MdmsCriteriaReq.builder()
                              .mdmsCriteria(mdmsCriteria)
                              .requestInfo(requestInfo)
                              .build();
    }



    public List<ModuleDetail> getCommonModuleDetails() {
        // master details for Common module

        List<MasterDetail> commonMasterDetails = new LinkedList<>();
        // Add Module Local Language
        List<MasterDetail> masterReligion = Collections.singletonList(MasterDetail.builder()
                                                                                  .name(TranslatorConstants.COMMON_MDMS_LOCAL_LANG)
                                                                                  .build());

        commonMasterDetails.addAll(masterReligion);

        ModuleDetail commonModuleDetail = ModuleDetail.builder()
                                                      .masterDetails(commonMasterDetails)
                                                      .moduleName(TranslatorConstants.COMMON_MDMS_MODULE)
                                                      .build();

        return Collections.singletonList(commonModuleDetail);

    }
}