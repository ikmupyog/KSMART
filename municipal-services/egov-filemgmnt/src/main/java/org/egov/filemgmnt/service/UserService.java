package org.egov.filemgmnt.service;

import java.util.List;

import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.repository.ServiceRequestRepository;
import org.egov.filemgmnt.util.FMConstants;
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.egov.filemgmnt.web.models.ApplicantPersonalRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
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
        RequestInfo requestInfo = request.getRequestInfo();
        List<ApplicantPersonal> applicants = request.getApplicantPersonals();

        final String serviceCode = FMConstants.BUSINESS_SERVICE_FM;
        applicants.forEach(applicant -> {
            // TODO: verify all fields required to create user in user service is available
            // in applicantpersonal

            // create user
        });

    }
}
