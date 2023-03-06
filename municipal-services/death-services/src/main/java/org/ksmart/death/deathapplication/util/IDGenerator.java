package org.ksmart.death.deathapplication.util;

import com.jayway.jsonpath.JsonPath;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.mdms.model.MasterDetail;
import org.egov.mdms.model.MdmsCriteria;
import org.egov.mdms.model.MdmsCriteriaReq;
import org.egov.mdms.model.ModuleDetail;
import org.egov.tracer.model.CustomException;
import org.ksmart.death.common.repository.ServiceRequestRepository;
import org.ksmart.death.deathapplication.config.DeathConfiguration;
import org.ksmart.death.deathapplication.repository.DeathApplnRepository;
import org.ksmart.death.deathapplication.web.models.DeathAbandonedRequest;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionRequest;
import org.ksmart.death.deathapplication.web.models.DeathDtlRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;


@Component
@Slf4j
public class IDGenerator {

    private DeathConfiguration config;

    private ServiceRequestRepository serviceRequestRepository;

    private DeathApplnRepository deathApplnRepository;

    @Autowired
    DeathMdmsUtil util;

    @Autowired
    public IDGenerator(DeathConfiguration config, ServiceRequestRepository serviceRequestRepository,
    DeathApplnRepository deathApplnRepository) {
        this.config = config;
        this.serviceRequestRepository = serviceRequestRepository;
        this.deathApplnRepository = deathApplnRepository;
    }

    /**
     * Sets the ApplicationNumber for given TradeLicenseRequest
     *
     * @param request TradeLicenseRequest which is to be created
     */
    public String setIDGenerator(DeathDtlRequest request, String moduleCode, String idType) {
        RequestInfo requestInfo = request.getRequestInfo();
        int Year = Calendar.getInstance().get(Calendar.YEAR);
        Long currentTime = Long.valueOf(System.currentTimeMillis());
       // String tenantId = requestInfo.getUserInfo().getTenantId();
        String tenantId = request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getTenantId();
        String nextID = deathApplnRepository.getNewID(tenantId, Year, moduleCode, idType);
        String idGenerated = null;
        Long ackNoId = null;

             Object mdmsData = util.mDMSCallRegNoFormating(request.getRequestInfo()
                                , request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getTenantId());

            Map<String,List<String>> masterData = getAttributeValues(mdmsData);

            String idgenCode = masterData.get(DeathConstants.TENANTS).toString();
            idgenCode = idgenCode.replaceAll("[\\[\\]\\(\\)]", "");

            Object mdmsDataLBType = util.mDMSCallLBType(request.getRequestInfo()
                            , request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getTenantId());

            Map<String,List<String>> masterDataLBType = getAttributeValues(mdmsDataLBType);

            String lbType = masterDataLBType.get(DeathConstants.TENANTS).toString();
            lbType = lbType.replaceAll("[\\[\\]\\(\\)]", "");

            String lbTypeCode = "";

            if(lbType.equals(DeathConstants.LB_TYPE_CORPORATION.toString())){
                lbTypeCode=DeathConstants.LB_TYPE_CORPORATION_CAPTION.toString();
            }
            else if(lbType.equals(DeathConstants.LB_TYPE_MUNICIPALITY.toString())){
                lbTypeCode=DeathConstants.LB_TYPE_MUNICIPALITY_CAPTION.toString();
            }
            //end
          //  System.out.println("ackNo"+ackNoDetails);
             idGenerated = idType + "-" + nextID
                + "-" + String.valueOf(Year) + "-" + moduleCode + "-" + lbTypeCode + "-"
                + idgenCode + "-" + DeathConstants.STATE_CODE.toString();
             return idGenerated;
    }
    public String setIDGeneratorCorrection(DeathCorrectionRequest request, String moduleCode, String idType) {
        RequestInfo requestInfo = request.getRequestInfo();
        int Year = Calendar.getInstance().get(Calendar.YEAR);
        Long currentTime = Long.valueOf(System.currentTimeMillis());
       // String tenantId = requestInfo.getUserInfo().getTenantId();
        String tenantId = request.getDeathCorrection().get(0).getDeathCorrectionBasicInfo().getTenantId();
        String nextID = deathApplnRepository.getNewID(tenantId, Year, moduleCode, idType);
        String idGenerated = null;
        Long ackNoId = null;

             Object mdmsData = util.mDMSCallRegNoFormating(request.getRequestInfo()
                                , request.getDeathCorrection().get(0).getDeathCorrectionBasicInfo().getTenantId());

            Map<String,List<String>> masterData = getAttributeValues(mdmsData);

            String idgenCode = masterData.get(DeathConstants.TENANTS).toString();
            idgenCode = idgenCode.replaceAll("[\\[\\]\\(\\)]", "");

            Object mdmsDataLBType = util.mDMSCallLBType(request.getRequestInfo()
                            , request.getDeathCorrection().get(0).getDeathCorrectionBasicInfo().getTenantId());

            Map<String,List<String>> masterDataLBType = getAttributeValues(mdmsDataLBType);

            String lbType = masterDataLBType.get(DeathConstants.TENANTS).toString();
            lbType = lbType.replaceAll("[\\[\\]\\(\\)]", "");

            String lbTypeCode = "";

            if(lbType.equals(DeathConstants.LB_TYPE_CORPORATION.toString())){
                lbTypeCode=DeathConstants.LB_TYPE_CORPORATION_CAPTION.toString();
            }
            else if(lbType.equals(DeathConstants.LB_TYPE_MUNICIPALITY.toString())){
                lbTypeCode=DeathConstants.LB_TYPE_MUNICIPALITY_CAPTION.toString();
            }
            //end
          //  System.out.println("ackNo"+ackNoDetails);
             idGenerated = idType + "-" + nextID
                + "-" + String.valueOf(Year) + "-" + moduleCode + "-" + lbTypeCode + "-"
                + idgenCode + "-" + DeathConstants.STATE_CODE.toString();
             return idGenerated;
    }
   
        //Rakhi S ikm on 10.02.2023
        private Map<String, List<String>> getAttributeValues(Object mdmsdata){
            List<String> modulepaths = Arrays.asList(DeathConstants.TENANT_JSONPATH);
            final Map<String, List<String>> mdmsResMap = new HashMap<>();
           
            modulepaths.forEach(modulepath -> {
                try {
                    mdmsResMap.putAll(JsonPath.read(mdmsdata,modulepath));
                    log.error("jsonpath1"+JsonPath.read(mdmsdata,modulepath));
                } catch (Exception e) {
                    log.error("Error while fetching MDMS data",e);
                    throw new CustomException(DeathConstants.INVALID_TENANT_ID_MDMS_KEY,
                    DeathConstants.INVALID_TENANT_ID_MDMS_MSG);
                }
               
            });
            // System.out.println("mdmsResMap"+mdmsResMap);
            return mdmsResMap;
        }


    public Object mDMSCallForTenant(RequestInfo requestInfo, String tenantId) {
        List<MasterDetail> masterDetails = new ArrayList<>();
        final String filterCode = "$.[?(@.code =='" + tenantId + "')]";
        masterDetails.add(MasterDetail.builder().name(DeathConstants.TENANTS)
                .filter(filterCode).build());
        ModuleDetail moduleDetail = ModuleDetail.builder().masterDetails(masterDetails)
                .moduleName(DeathConstants.TENANT_MODULE_NAME).build();

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

    //Rakhi S ikm on 06.03.2023
    public String setIDGeneratorAbandoned(DeathAbandonedRequest request, String moduleCode, String idType) {
        RequestInfo requestInfo = request.getRequestInfo();
        int Year = Calendar.getInstance().get(Calendar.YEAR);
        Long currentTime = Long.valueOf(System.currentTimeMillis());
        String tenantId = request.getDeathAbandonedDtls().get(0).getDeathBasicInfo().getTenantId();
        String nextID = deathApplnRepository.getNewID(tenantId, Year, moduleCode, idType);
        String idGenerated = null;
        Long ackNoId = null;

             Object mdmsData = util.mDMSCallRegNoFormating(request.getRequestInfo()
                                , request.getDeathAbandonedDtls().get(0).getDeathBasicInfo().getTenantId());

            Map<String,List<String>> masterData = getAttributeValues(mdmsData);

            String idgenCode = masterData.get(DeathConstants.TENANTS).toString();
            idgenCode = idgenCode.replaceAll("[\\[\\]\\(\\)]", "");

            Object mdmsDataLBType = util.mDMSCallLBType(request.getRequestInfo()
                            , request.getDeathAbandonedDtls().get(0).getDeathBasicInfo().getTenantId());

            Map<String,List<String>> masterDataLBType = getAttributeValues(mdmsDataLBType);

            String lbType = masterDataLBType.get(DeathConstants.TENANTS).toString();
            lbType = lbType.replaceAll("[\\[\\]\\(\\)]", "");

            String lbTypeCode = "";

            if(lbType.equals(DeathConstants.LB_TYPE_CORPORATION.toString())){
                lbTypeCode=DeathConstants.LB_TYPE_CORPORATION_CAPTION.toString();
            }
            else if(lbType.equals(DeathConstants.LB_TYPE_MUNICIPALITY.toString())){
                lbTypeCode=DeathConstants.LB_TYPE_MUNICIPALITY_CAPTION.toString();
            }
            //end
             idGenerated = idType + "-" + nextID
                + "-" + String.valueOf(Year) + "-" + moduleCode + "-" + lbTypeCode + "-"
                + idgenCode + "-" + DeathConstants.STATE_CODE.toString();
             return idGenerated;
    }
}
