package org.egov.filemgmnt.service;

import java.util.Objects;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.Role;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.repository.ServiceRequestRepository;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.web.enums.FMUserType;
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.egov.filemgmnt.web.models.user.FMUser;
import org.egov.filemgmnt.web.models.user.FMUserRequest;
import org.egov.filemgmnt.web.models.user.FMUserResponse;
import org.egov.filemgmnt.web.models.user.FMUserSearchRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Slf4j
class UserService {

    @Autowired
    private FMConfiguration fmConfig;
    @Autowired
    private ServiceRequestRepository srRepository;

    protected FMUser createOrUpdateUser(final RequestInfo request, final ApplicantPersonal applicant) {

        // Get existing FMUser by tenantId and aadhaarNumber
        FMUser user = findUserByTenantIdAndAadhaar(request, applicant);

        if (user == null) {
            // user not exists, create
            user = createUser(request, applicant);
        } else {
            // user exists, update
            user = updateUser(request, applicant, user);
        }

        return user;
    }

    private FMUser updateUser(final RequestInfo request, final ApplicantPersonal applicant, final FMUser user) {
        final FMUserRequest userRequest = FMUserRequest.builder()
                                                       .requestInfo(request)
                                                       .user(buildUserForUpdate(applicant, user))
                                                       .build();

        final StringBuilder uri = new StringBuilder().append(fmConfig.getUserHost())
                                                     .append(fmConfig.getUserContextPath())
                                                     .append(fmConfig.getUserUpdateEndpoint());
        final FMUserResponse result = (FMUserResponse) srRepository.fetchResult(uri, userRequest, FMUserResponse.class);

        if (log.isDebugEnabled()) {
            log.debug("*** User update response: \n {}", FMUtils.toJson(result));
        }

        return Objects.nonNull(result) && CollectionUtils.isNotEmpty(result.getUser())
                ? result.getUser()
                        .get(0)
                : null;
    }

    private FMUser createUser(final RequestInfo request, final ApplicantPersonal applicant) {
        final FMUserRequest userRequest = FMUserRequest.builder()
                                                       .requestInfo(request)
                                                       .user(buildUserForCreate(applicant))
                                                       .build();

        final StringBuilder uri = new StringBuilder().append(fmConfig.getUserHost())
                                                     .append(fmConfig.getUserContextPath())
                                                     .append(fmConfig.getUserCreateEndpoint());
        final FMUserResponse result = (FMUserResponse) srRepository.fetchResult(uri, userRequest, FMUserResponse.class);

        if (log.isDebugEnabled()) {
            log.debug("*** User create response: \n {}", FMUtils.toJson(result));
        }

        return Objects.nonNull(result) && CollectionUtils.isNotEmpty(result.getUser())
                ? result.getUser()
                        .get(0)
                : null;
    }

    private FMUser buildUserForUpdate(final ApplicantPersonal applicant, final FMUser user) {
        final String name = StringUtils.isNotBlank(applicant.getLastName())
                ? StringUtils.joinWith(", ", applicant.getFirstName(), applicant.getLastName())
                : applicant.getFirstName();

        user.setName(name);
        user.setMobileNumber(applicant.getMobileNumber());
        user.setEmailId(applicant.getEmailId());
        return user;
    }

    private FMUser buildUserForCreate(final ApplicantPersonal applicant) {
        final String name = StringUtils.isNotBlank(applicant.getLastName())
                ? StringUtils.joinWith(", ", applicant.getFirstName(), applicant.getLastName())
                : applicant.getFirstName();

        final FMUser user = FMUser.builder()
                                  .name(name)
                                  .mobileNumber(applicant.getMobileNumber())
                                  .emailId(applicant.getEmailId())
                                  .aadhaarNumber(applicant.getAadhaarNumber())
                                  .tenantId(applicant.getTenantId())
                                  .dob(new java.util.Date(applicant.getDateOfBirth()))
                                  .build();

        user.addRole(buildCitizenRole(applicant.getTenantId()));

        return user;
    }

    private FMUser findUserByTenantIdAndAadhaar(final RequestInfo request, final ApplicantPersonal applicant) {
        final FMUserSearchRequest searchRequest = FMUserSearchRequest.builder()
                                                                     .tenantId(applicant.getTenantId())
                                                                     .aadhaarNumber(applicant.getAadhaarNumber())
                                                                     // .mobileNumber(applicant.getMobileNumber())
                                                                     .requestInfo(request)
                                                                     .build();

        final StringBuilder uri = new StringBuilder().append(fmConfig.getUserHost())
                                                     .append(fmConfig.getUserSearchEndpoint());
        final FMUserResponse result = (FMUserResponse) srRepository.fetchResult(uri,
                                                                                searchRequest,
                                                                                FMUserResponse.class);

        if (log.isDebugEnabled()) {
            log.debug("*** User search response: \n {}", FMUtils.toJson(result));
        }

        return Objects.nonNull(result) && CollectionUtils.isNotEmpty(result.getUser())
                ? result.getUser()
                        .get(0)
                : null;
    }

    private Role buildCitizenRole(final String tenantId) {
        return Role.builder()
                   .code(FMUserType.CITIZEN.getCode())
                   .name(FMUserType.CITIZEN.getName())
                   .tenantId(getStateLevelTenant(tenantId))
                   .build();
    }

    private String getStateLevelTenant(final String tenantId) {
        Assert.isTrue(StringUtils.isNotBlank(tenantId), "Tenant identification number required.");
        return tenantId.split("\\.")[0];
    }
}
