package org.egov.filemgmnt.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.Role;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.repository.ServiceRequestRepository;
import org.egov.filemgmnt.util.FMConstants;
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.egov.filemgmnt.web.models.ApplicantPersonalRequest;
import org.egov.filemgmnt.web.models.user.UserDetailResponse;
import org.egov.filemgmnt.web.models.user.UserSearchRequest;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
class UserService {

    private final ServiceRequestRepository restRepo;
    private final FMConfiguration fmConfig;
    private final ObjectMapper mapper;

    @Autowired
    UserService(ServiceRequestRepository restRepo, FMConfiguration fmConfig, ObjectMapper mapper) {
        this.restRepo = restRepo;
        this.fmConfig = fmConfig;
        this.mapper = mapper;

    }

    public void createUser(ApplicantPersonalRequest request) {

        List<ApplicantPersonal> applicant = request.getApplicantPersonals();
        RequestInfo requestInfo = request.getRequestInfo();
        Role role = getCitizenRole(applicant.get(0)
                                            .getTenantId());

        final String serviceCode = FMConstants.BUSINESS_SERVICE_FM;
        applicant.forEach(personal -> {

            String businessService = personal.getFileDetail()
                                             .getBusinessService();
        });

    }

    /**
     * Creates citizen role
     * 
     * @return Role object for citizen
     */
    private Role getCitizenRole(String tenantId) {
        return Role.builder()
                   .code("CITIZEN")
                   .name("Citizen")
                   .tenantId(getStateLevelTenant(tenantId))
                   .build();
    }

    private String getStateLevelTenant(String tenantId) {
        return tenantId.split("\\.")[0];
    }

    private UserDetailResponse searchByUserName(String userName, String tenantId) {
        StringBuilder uri = new StringBuilder(fmConfig.getUserHost()).append(fmConfig.getUserSearchEndpoint());

        UserSearchRequest request = UserSearchRequest.builder()
                                                     .userType("CITIZEN")
                                                     .userName(userName)
                                                     .tenantId(tenantId)
                                                     .build();
        return userCall(request, uri);

    }

    /**
     * Returns UserDetailResponse by calling user service with given uri and object
     * 
     * @param userRequest Request object for user service
     * @param uri         The address of the endpoint
     * @return Response from user service as parsed as userDetailResponse
     */
    private UserDetailResponse userCall(Object userRequest, StringBuilder uri) {
        String dobFormat = getDobDateFormat(uri.toString());

        try {
            Map<?, ?> responseMap = (LinkedHashMap<?, ?>) restRepo.fetchResult(uri, userRequest);
            parseResponse(responseMap, dobFormat);

            UserDetailResponse userDetailResponse = mapper.convertValue(responseMap, UserDetailResponse.class);
            return userDetailResponse; // NOPMD
        } catch (IllegalArgumentException e) {
            throw new CustomException("IllegalArgumentException", "ObjectMapper not able to convertValue in userCall");
        }
    }

    private String getDobDateFormat(String uri) {
        String result = StringUtils.EMPTY;
        if (uri.contains(fmConfig.getUserSearchEndpoint()) || uri.contains(fmConfig.getUserUpdateEndpoint())) {
            result = "yyyy-MM-dd";
        } else if (uri.contains(fmConfig.getUserCreateEndpoint())) {
            result = "dd/MM/yyyy";
        }
        return result;
    }

    private Long dateTolong(final Map<Object, Object> map, final String key, final String format) {
        final SimpleDateFormat sdf = new SimpleDateFormat(format); // NOPMD

        String value = String.valueOf(map.get(key));

        Long result = Long.valueOf(0L);
        try {
            Date dt = sdf.parse(value);
            result = Long.valueOf(dt.getTime());
        } catch (ParseException e) {
            log.error(e.getMessage(), e);
        }
        return result;
    }

    /**
     * Parses date formats to long for all users in responseMap
     * 
     * @param responeMap LinkedHashMap got from user api response
     */
    @SuppressWarnings("unchecked")
    private void parseResponse(final Map<?, ?> responeMap, final String dobFormat) {
        List<Map<Object, Object>> users = (List<Map<Object, Object>>) responeMap.get("user");

        String defaultFormat = "dd-MM-yyyy HH:mm:ss";
        if (CollectionUtils.isNotEmpty(users)) {
            users.forEach(map -> {
                map.put("createdDate", dateTolong(map, "createdDate", defaultFormat));

                if (map.get("lastModifiedDate") != null) {
                    map.put("lastModifiedDate", dateTolong(map, "lastModifiedDate", defaultFormat));
                }
                if (map.get("dob") != null) {
                    map.put("dob", dateTolong(map, "dob", dobFormat));
                }
                if (map.get("pwdExpiryDate") != null) {
                    map.put("pwdExpiryDate", dateTolong(map, "pwdExpiryDate", defaultFormat));
                }
            });
        }
    }
}
