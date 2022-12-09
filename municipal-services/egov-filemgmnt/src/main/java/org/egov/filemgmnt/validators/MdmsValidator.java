package org.egov.filemgmnt.validators;

import static org.egov.filemgmnt.web.enums.ErrorCodes.MDMS_DATA_ERROR;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.collections4.MapUtils;
import org.egov.filemgmnt.util.FMConstants;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.web.models.ApplicantPersonalRequest;
import org.egov.tracer.model.CustomException;
import org.springframework.stereotype.Component;

import com.jayway.jsonpath.JsonPath;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class MdmsValidator {

//    private final ServiceRequestRepository requestRepository;
//
//    @Autowired
//    public MdmsValidator(ServiceRequestRepository requestRepository) {
//        this.requestRepository = requestRepository;
//    }

    public void validateMdmsData(ApplicantPersonalRequest request, Object mdmsData) {

        if (log.isDebugEnabled()) {
            log.debug("MDMS master data \n {}", FMUtils.toJson(mdmsData));
        }

        Map<String, Object> masterData = getFileManagementMasterData(mdmsData);
        validateFileManagementMasterData(masterData);

        List<String> subTypeCodes = getFileServiceSubTypeCodes(mdmsData);

        Map<String, String> errorMap = new ConcurrentHashMap<>();
        request.getApplicantPersonals()
               .forEach(personal -> {
                   String serviceCode = personal.getServiceDetails()
                                                .getServiceCode();

                   if (log.isDebugEnabled()) {
                       log.debug("Service code : \n{}", serviceCode);
                   }

                   if (CollectionUtils.isEmpty(subTypeCodes) || !subTypeCodes.contains(serviceCode)) {
                       errorMap.put("FileServiceSubtype", "The Service SubType '" + serviceCode + "' does not exists");
                   }
               });

        if (MapUtils.isNotEmpty(errorMap)) {
            throw new CustomException(errorMap);
        }
    }

    private Map<String, Object> getFileManagementMasterData(Object mdmsData) {
        return JsonPath.read(mdmsData, FMConstants.FM_MDMS_JSONPATH);
    }

    private void validateFileManagementMasterData(Map<String, Object> masterData) {
        if (masterData.get(FMConstants.FM_MDMS_FILE_SERVICE_SUBTYPE) == null) {
            throw new CustomException(Collections.singletonMap(MDMS_DATA_ERROR.getCode(),
                                                               "Unable to fetch "
                                                                       + FMConstants.FM_MDMS_FILE_SERVICE_SUBTYPE
                                                                       + " codes from MDMS"));
        }
    }

    private List<String> getFileServiceSubTypeCodes(Object mdmsData) {
        return JsonPath.read(mdmsData, FMConstants.FM_MDMS_FILE_SERVICE_SUBTYPE_CODE_JSONPATH);
    }

}
