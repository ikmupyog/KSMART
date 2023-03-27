package org.egov.tl.util;

import com.jayway.jsonpath.JsonPath;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.mdms.model.MasterDetail;
import org.egov.mdms.model.MdmsCriteria;
import org.egov.mdms.model.MdmsCriteriaReq;
import org.egov.mdms.model.ModuleDetail;
import org.egov.tl.config.TLConfiguration;
import org.egov.tl.repository.ServiceRequestRepository;
import org.egov.tl.repository.TLRepository;
import org.egov.tl.web.models.AuditDetails;
import org.egov.tl.web.models.CorrectionRequest;
import org.egov.tl.web.models.TradeLicense;
import org.egov.tl.web.models.TradeLicenseRequest;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

import static org.egov.tl.util.TLConstants.*;

@Component
@Slf4j
public class IDGenerator {

    private TLConfiguration config;

    private ServiceRequestRepository serviceRequestRepository;

    private TLRepository tlrepository;

    @Autowired
    public IDGenerator(TLConfiguration config, ServiceRequestRepository serviceRequestRepository,
            TLRepository tlrepository) {
        this.config = config;
        this.serviceRequestRepository = serviceRequestRepository;
        this.tlrepository = tlrepository;
    }

    /**
     * Sets the ApplicationNumber for given TradeLicenseRequest
     *
     * @param request TradeLicenseRequest which is to be created
     */
    public String setIDGenerator(TradeLicenseRequest request, String moduleCode, String idType) {
        RequestInfo requestInfo = request.getRequestInfo();
        int Year = Calendar.getInstance().get(Calendar.YEAR);
        Long currentTime = Long.valueOf(System.currentTimeMillis());
        String tenantId = request.getLicenses().get(0).getTenantId();
        String nextID = tlrepository.getNewID(tenantId, Year, moduleCode, idType);
        String idGenerated = null;
        Long ackNoId = null;
        // mdms call for tenand idgencode and lbtypecode
        Object mdmsData = mDMSCallForTenant(request.getRequestInfo(), tenantId);

        Map<String, Object> masterData = getAttributeValues(mdmsData);

        String idgenCode = String.valueOf(masterData.get("idgencode"));
        String lbType = String.valueOf(masterData.get("lbtypecode"));

        String lbTypeCode = "";

        if (lbType.equals(TLConstants.LB_TYPE_CORPORATION.toString())) {
            lbTypeCode = TLConstants.LB_TYPE_CORPORATION_CAPTION.toString();
        } else if (lbType.equals(TLConstants.LB_TYPE_MUNICIPALITY.toString())) {
            lbTypeCode = TLConstants.LB_TYPE_MUNICIPALITY_CAPTION.toString();
        }

        idGenerated = idType + "-" + nextID
                + "-" + String.valueOf(Year) + "-" + moduleCode + "-" + lbTypeCode + "-"
                + idgenCode + "-" + TLConstants.STATE_CODE.toString();
        return idGenerated;
    }

    private Map<String, Object> getAttributeValues(Object mdmsData) {

        List<Map<String, Object>> response = new ArrayList<>();
        List<String> modulepaths = Arrays.asList(TLConstants.TENANTS_JSONPATH);
        modulepaths.forEach(modulepath -> {
            try {
                List<Map<String, Object>> maindata = JsonPath.read(mdmsData, modulepath);
                Map<String, Object> rowdata = maindata.get(0);
                response.add((Map<String, Object>) rowdata.get("city"));
                // mdmsResMap.putAll(JsonPath.read(mdmsData, modulepath));
            } catch (Exception e) {
                log.error("Error while fetvhing MDMS data", e);
                throw new CustomException(TLConstants.INVALID_TENANT_ID_MDMS_KEY,
                        TLConstants.INVALID_TENANT_ID_MDMS_MSG);
            }
        });

        return response.get(0);
    }

    public Object mDMSCallForTenant(RequestInfo requestInfo, String tenantId) {
        List<MasterDetail> masterDetails = new ArrayList<>();
        final String filterCode = "$.[?(@.code =='" + tenantId + "')]";
        masterDetails.add(MasterDetail.builder().name(TLConstants.TENANTS)
                .filter(filterCode).build());
        ModuleDetail moduleDetail = ModuleDetail.builder().masterDetails(masterDetails)
                .moduleName(TLConstants.TENANTS_MODULE).build();

        MdmsCriteria mdmsCriteria = MdmsCriteria.builder().moduleDetails(Collections.singletonList(moduleDetail))
                .tenantId(tenantId)
                .build();

        MdmsCriteriaReq mdmsCriteriaReq = MdmsCriteriaReq.builder().mdmsCriteria(mdmsCriteria)
                .requestInfo(requestInfo).build();
        Object result = serviceRequestRepository.fetchResult(getMdmsSearchUrl(), mdmsCriteriaReq);
        return result;
    }

    /**
     * Returns the url for mdms search endpoint
     *
     * @return url for mdms search endpoint
     */
    public StringBuilder getMdmsSearchUrl() {
        return new StringBuilder().append(config.getMdmsHost()).append(config.getMdmsEndPoint());
    }

    /**
     * Sets the ApplicationNumber for given TradeLicenseRequest
     *
     * @param request TradeLicenseRequest which is to be created
     */
    public String setIDGenCorrection(CorrectionRequest request, String moduleCode, String idType) {
        RequestInfo requestInfo = request.getRequestInfo();
        int Year = Calendar.getInstance().get(Calendar.YEAR);
        Long currentTime = Long.valueOf(System.currentTimeMillis());
        String tenantId = request.getLicenseCorrection().get(0).getTenantId();
        String nextID = tlrepository.getNewID(tenantId, Year, moduleCode, idType);
        String idGenerated = null;
        Long ackNoId = null;
        // mdms call for tenand idgencode and lbtypecode
        Object mdmsData = mDMSCallForTenant(request.getRequestInfo(), tenantId);

        Map<String, Object> masterData = getAttributeValues(mdmsData);

        String idgenCode = String.valueOf(masterData.get("idgencode"));
        String lbType = String.valueOf(masterData.get("lbtypecode"));

        String lbTypeCode = "";

        if (lbType.equals(TLConstants.LB_TYPE_CORPORATION.toString())) {
            lbTypeCode = TLConstants.LB_TYPE_CORPORATION_CAPTION.toString();
        } else if (lbType.equals(TLConstants.LB_TYPE_MUNICIPALITY.toString())) {
            lbTypeCode = TLConstants.LB_TYPE_MUNICIPALITY_CAPTION.toString();
        }

        idGenerated = idType + "-" + nextID
                + "-" + String.valueOf(Year) + "-" + moduleCode + "-" + lbTypeCode + "-"
                + idgenCode + "-" + TLConstants.STATE_CODE.toString();
        return idGenerated;
    }

}
