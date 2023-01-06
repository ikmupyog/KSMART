package org.egov.filemgmnt.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.egov.common.contract.request.RequestInfo;
import org.egov.mdms.model.MasterDetail;
import org.egov.mdms.model.MdmsCriteria;
import org.egov.mdms.model.MdmsCriteriaReq;
import org.egov.mdms.model.ModuleDetail;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class MdmsUtil {
	private ObjectMapper mapper;


	private RestTemplate restTemplate;

    @Autowired
	public MdmsUtil(ObjectMapper mapper, RestTemplate restTemplate) {
		this.mapper = mapper;
		this.restTemplate = restTemplate;
	}

    @Value("${egov.mdms.host}")
    private String mdmsHost;

    @Value("${egov.mdms.search.endpoint}")
    private String mdmsUrl;

    @Value("${egov.mdms.master.name}")
    private String masterName;

    @Value("${egov.mdms.module.name}")
    private String moduleName;

    public Object mdmsCall(RequestInfo requestInfo, String tenantId) {
        MdmsCriteriaReq mdmsCriteriaReq = getMdmsRequest(requestInfo, tenantId);

        String mdmsUri = String.format("%s%s", mdmsHost, mdmsUrl);
        Object result = null;
        try {

            result = restTemplate.postForObject(mdmsUri, mdmsCriteriaReq, Map.class);
        } catch (Exception e) {
            log.error("Exception occurred while fetching category lists from mdms: ", e);
        }
		System.out.println("result  :" + result);
        return result;
    }

    private MdmsCriteriaReq getMdmsRequest(RequestInfo requestInfo, String tenantId) {




        List<ModuleDetail> moduleDetails = new LinkedList<>();


        moduleDetails.addAll(getFMModuleDetails());

        MdmsCriteria mdmsCriteria = MdmsCriteria.builder()
                                                .moduleDetails(moduleDetails)
                                                .tenantId(tenantId)
                                                .build();

		MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder()
                              .mdmsCriteria(mdmsCriteria)
                              .requestInfo(requestInfo)
                              .build();


		return mdmsCriteriaReq;

    }

    public List<ModuleDetail> getFMModuleDetails() {
        // master details for FM module
        List<MasterDetail> fmMasterDetails = Collections.singletonList(MasterDetail.builder()
                                                                                   .name(FMConstants.FM_MDMS_FILE_SERVICE_SUBTYPE)
                                                                                   .build());

        ModuleDetail fmModuleDetail = ModuleDetail.builder()
                                                  .masterDetails(fmMasterDetails)
                                                  .moduleName(FMConstants.FILEMANAGEMENT_MODULE)
                                                  .build();

        return Collections.singletonList(fmModuleDetail);

    }




	private List<ModuleDetail> getTenantIdRequestAddress(String tenantId) {

		List<MasterDetail> fmMasterDetails = new ArrayList<>();

		final String address = "$.[?(@.code=='" + tenantId + "')].address";


		fmMasterDetails.add(MasterDetail.builder().name(FMConstants.TENANTS).filter(address).build());

		ModuleDetail masterModule = ModuleDetail.builder().masterDetails(fmMasterDetails)
				.moduleName(FMConstants.TENANT_MODULE_NAME).build();


		return Arrays.asList(masterModule);
	}


	public Map<String, List<String>> getAttributeValues(Object mdmsdata) {
		List<String> modulepaths = Arrays.asList(FMConstants.TENANT_JSONPATH);
		final Map<String, List<String>> mdmsResMap = new HashMap<>();

		modulepaths.forEach(modulepath -> {
			try {
				mdmsResMap.putAll(JsonPath.read(mdmsdata, modulepath));

			} catch (Exception e) {
				log.error("Error while fetching MDMS data", e);
				throw new CustomException(FMConstants.INVALID_TENANT_ID_MDMS_KEY,
						FMConstants.INVALID_TENANT_ID_MDMS_MSG);
			}

		});

		return mdmsResMap;
	}

	public Object mdmsCallCertificateOfficeAddress(RequestInfo requestInfo, String tenantId) {
		MdmsCriteriaReq mdmsCriteriaReq = getMdmsRequestCertificateOfficeAddress(requestInfo, tenantId);

		String mdmsUri = String.format("%s%s", mdmsHost, mdmsUrl);
		Object result = null;
		try {

			result = restTemplate.postForObject(mdmsUri, mdmsCriteriaReq, Map.class);
		} catch (Exception e) {
			log.error("Exception occurred while fetching category lists from mdms: ", e);
		}

		return result;
	}

	private MdmsCriteriaReq getMdmsRequestCertificateOfficeAddress(RequestInfo requestInfo, String tenantId) {

		List<ModuleDetail> tenantIdRequest = getTenantIdRequestAddress(tenantId);

		List<ModuleDetail> moduleDetails = new LinkedList<>();

		moduleDetails.addAll(tenantIdRequest);

		MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(moduleDetails).tenantId(tenantId).build();

		MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria).requestInfo(requestInfo)
				.build();

		System.out.println(mdmsCriteriaReq);
		return mdmsCriteriaReq;

	}
}