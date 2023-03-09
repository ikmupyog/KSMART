package org.egov.filemgmnt.util;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.web.enums.ErrorCodes;
import org.egov.mdms.model.MasterDetail;
import org.egov.mdms.model.MdmsCriteria;
import org.egov.mdms.model.MdmsCriteriaReq;
import org.egov.mdms.model.ModuleDetail;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.jayway.jsonpath.JsonPath;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MdmsUtil {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${egov.mdms.host}")
    private String mdmsHost;

    @Value("${egov.mdms.search.endpoint}")
    private String mdmsUrl;

    @Value("${egov.mdms.master.name}")
    private String masterName;

    @Value("${egov.mdms.module.name}")
    private String moduleName;

    public Object mdmsCallForModuleDetails(final RequestInfo requestInfo, final String tenantId) {
        final MdmsCriteriaReq mdmsCriteriaReq = getMdmsModuleDetailsRequest(requestInfo, tenantId);

        return mdmsCall(mdmsCriteriaReq);
    }

    public Object mdmsCallForOfficeAddress(final RequestInfo requestInfo, final String tenantId) {
        final MdmsCriteriaReq mdmsCriteriaReq = getMdmsOfficeAddressRequest(requestInfo, tenantId);
        return mdmsCall(mdmsCriteriaReq);
    }

    private Object mdmsCall(final MdmsCriteriaReq mdmsCriteriaReq) {
        final String uri = String.format("%s%s", mdmsHost, mdmsUrl);
        Object result = null;
        try {
            if (log.isInfoEnabled()) {
                log.info("Mdms URI: {}", uri);
                log.info("Mdms request: \n{}", FMUtils.toJson(mdmsCriteriaReq));
            }

            result = restTemplate.postForObject(uri, mdmsCriteriaReq, Map.class);

            if (log.isDebugEnabled()) {
                log.debug("Mdms response: \n{}", FMUtils.toJson(result));
            }
        } catch (Exception e) {
            log.error("Exception occurred while fetching category lists from mdms", e);
        }

        return result;
    }

    private MdmsCriteriaReq getMdmsModuleDetailsRequest(final RequestInfo requestInfo, final String tenantId) {

        final List<ModuleDetail> moduleDetails = new LinkedList<>();
        moduleDetails.addAll(getFMModuleDetails());

        final MdmsCriteria mdmsCriteria = MdmsCriteria.builder()
                                                      .moduleDetails(moduleDetails)
                                                      .tenantId(tenantId)
                                                      .build();

        return MdmsCriteriaReq.builder()
                              .mdmsCriteria(mdmsCriteria)
                              .requestInfo(requestInfo)
                              .build();

    }

    private List<ModuleDetail> getFMModuleDetails() {
        // master details for FM module
        final List<MasterDetail> fmMasterDetails = Collections.singletonList(MasterDetail.builder()
                                                                                         .name(FMConstants.FM_MDMS_FILE_SERVICE_SUBTYPE)
                                                                                         .build());

        final ModuleDetail fmModuleDetail = ModuleDetail.builder()
                                                        .masterDetails(fmMasterDetails)
                                                        .moduleName(FMConstants.FILEMANAGEMENT_MODULE)
                                                        .build();

        return Collections.singletonList(fmModuleDetail);

    }

    public Map<String, List<String>> getAttributeValues(final Object mdmsdata) {
        final List<String> modulepaths = Arrays.asList(FMConstants.TENANT_JSONPATH);

        final Map<String, List<String>> mdmsResMap = new HashMap<>();
        modulepaths.forEach(modulepath -> {
            try {
                mdmsResMap.putAll(JsonPath.read(mdmsdata, modulepath));
            } catch (Exception e) {
                log.error("Error while fetching MDMS data", e);
                throw new CustomException(ErrorCodes.INVALID_TENANT_ID.getCode(), "No data found for this tenantId");
            }
        });

        return mdmsResMap;
    }

    private MdmsCriteriaReq getMdmsOfficeAddressRequest(final RequestInfo requestInfo, final String tenantId) {
        final List<ModuleDetail> tenantIdRequest = getTenantIdtAddressRequest(tenantId);

        final MdmsCriteria mdmsCriteria = MdmsCriteria.builder()
                                                      .moduleDetails(tenantIdRequest)
                                                      .tenantId(tenantId)
                                                      .build();

        return MdmsCriteriaReq.builder()
                              .mdmsCriteria(mdmsCriteria)
                              .requestInfo(requestInfo)
                              .build();

    }

    private List<ModuleDetail> getTenantIdtAddressRequest(final String tenantId) {
        final String address = "$.[?(@.code=='" + tenantId + "')].address";

        final List<MasterDetail> fmMasterDetails = Collections.singletonList(MasterDetail.builder()
                                                                                         .name(FMConstants.TENANTS)
                                                                                         .filter(address)
                                                                                         .build());
        final ModuleDetail masterModule = ModuleDetail.builder()
                                                      .masterDetails(fmMasterDetails)
                                                      .moduleName(FMConstants.TENANT_MODULE_NAME)
                                                      .build();
        return Collections.singletonList(masterModule);
    }
}