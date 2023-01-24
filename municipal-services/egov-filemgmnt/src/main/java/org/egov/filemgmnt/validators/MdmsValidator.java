package org.egov.filemgmnt.validators;

import static org.egov.filemgmnt.web.enums.ErrorCodes.MDMS_DATA_ERROR;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.MapUtils;
import org.egov.filemgmnt.util.FMConstants;
import org.egov.filemgmnt.web.models.ApplicantServiceDetail;
import org.egov.filemgmnt.web.models.ApplicantServiceRequest;
import org.egov.tracer.model.CustomException;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import com.jayway.jsonpath.JsonPath;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class MdmsValidator {

    public void validateMdmsData(final ApplicantServiceRequest request, final Object mdmsData) {

        final Map<String, Object> masterData = getFileManagementMasterData(mdmsData);
        validateFileManagementMasterData(masterData);

        final List<String> subTypeCodes = getFileServiceSubTypeCodes(mdmsData);

        final Map<String, String> errorMap = new ConcurrentHashMap<>();
        final ApplicantServiceDetail serviceDetail = request.getApplicantServiceDetail();
        Assert.notNull(serviceDetail, "Applicant service details must not be null");

        final String serviceCode = serviceDetail.getServiceCode();
        if (log.isDebugEnabled()) {
            log.debug("Mdms service code : {}", serviceCode);
        }

        if (CollectionUtils.isEmpty(subTypeCodes) || !subTypeCodes.contains(serviceCode)) {
            errorMap.put("FileServiceSubtype", "The service sub type '" + serviceCode + "' does not exists");
        }

        if (MapUtils.isNotEmpty(errorMap)) {
            throw new CustomException(errorMap);
        }
    }

    private Map<String, Object> getFileManagementMasterData(final Object mdmsData) {
        return JsonPath.read(mdmsData, FMConstants.FM_MDMS_JSONPATH);
    }

    private void validateFileManagementMasterData(final Map<String, Object> masterData) {
        if (masterData.get(FMConstants.FM_MDMS_FILE_SERVICE_SUBTYPE) == null) {
            throw new CustomException(Collections.singletonMap(MDMS_DATA_ERROR.getCode(),
                                                               "Unable to fetch "
                                                                       + FMConstants.FM_MDMS_FILE_SERVICE_SUBTYPE
                                                                       + " codes from MDMS"));
        }
    }

    private List<String> getFileServiceSubTypeCodes(final Object mdmsData) {
        return JsonPath.read(mdmsData, FMConstants.FM_MDMS_FILE_SERVICE_SUBTYPE_CODE_JSONPATH);
    }

}
