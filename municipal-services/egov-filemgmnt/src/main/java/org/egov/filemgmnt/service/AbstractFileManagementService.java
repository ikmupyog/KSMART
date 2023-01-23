package org.egov.filemgmnt.service;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.util.EncryptionUtil;
import org.egov.filemgmnt.util.FMConstants;
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.egov.filemgmnt.web.models.ApplicantSearchCriteria;
import org.egov.filemgmnt.web.models.ApplicantServiceDetail;
import org.egov.filemgmnt.web.models.ApplicantServiceSearchCriteria;
import org.egov.filemgmnt.web.models.user.FMUser;
import org.springframework.beans.factory.annotation.Autowired;

abstract class AbstractFileManagementService { // NOPMD

    private EncryptionUtil encUtil;
    private UserService userService;

    @Autowired
    public final void setLogRepository(final EncryptionUtil encUtil) {
        this.encUtil = encUtil;
    }

    @Autowired
    public final void setUserService(final UserService userService) {
        this.userService = userService;
    }

    // create/update user service
    protected FMUser createOrUpdateUser(final RequestInfo request, final ApplicantPersonal applicant) {
        return userService.createOrUpdateUser(request, applicant);
    }

    // encrypt / decrypt methods
    protected ApplicantPersonal encrypt(final ApplicantPersonal applicant) {
        return encUtil.encryptObject(applicant, FMConstants.FM_APPLICANT_ENC_KEY, ApplicantPersonal.class);
    }

    protected ApplicantPersonal decrypt(final ApplicantPersonal applicant, final RequestInfo requestInfo) {
        return encUtil.decryptObject(applicant, FMConstants.FM_APPLICANT_ENC_KEY, ApplicantPersonal.class, requestInfo);
    }

    protected ApplicantServiceDetail decrypt(final ApplicantServiceDetail serviceDetail,
                                             final RequestInfo requestInfo) {
        return encUtil.decryptObject(serviceDetail,
                                     FMConstants.FM_APPLICANT_ENC_KEY,
                                     ApplicantServiceDetail.class,
                                     requestInfo);
    }

    protected ApplicantSearchCriteria encrypt(final ApplicantSearchCriteria searchCriteria) {
        return encUtil.encryptObject(searchCriteria, FMConstants.FM_APPLICANT_ENC_KEY, ApplicantSearchCriteria.class);
    }

    protected ApplicantServiceSearchCriteria encrypt(final ApplicantServiceSearchCriteria searchCriteria) {
        return encUtil.encryptObject(searchCriteria,
                                     FMConstants.FM_APPLICANT_ENC_KEY,
                                     ApplicantServiceSearchCriteria.class);
    }

    // decrypt search results
    protected List<ApplicantPersonal> decryptApplicants(final List<ApplicantPersonal> list,
                                                        final RequestInfo requestInfo) {
        return encUtil.decryptObject(list, FMConstants.FM_APPLICANT_ENC_KEY, ApplicantPersonal.class, requestInfo);
    }

    protected List<ApplicantServiceDetail> decryptServices(final List<ApplicantServiceDetail> list,
                                                           final RequestInfo requestInfo) {
        return encUtil.decryptObject(list, FMConstants.FM_APPLICANT_ENC_KEY, ApplicantServiceDetail.class, requestInfo);
    }

    // utility methods
    protected ApplicantSearchCriteria buildApplicantSearchCriteria(final ApplicantPersonal applicant) {
        ApplicantSearchCriteria searchCriteria = null;

        if (StringUtils.isNotBlank(applicant.getId()) || StringUtils.isNotBlank(applicant.getAadhaarNumber())) {
            searchCriteria = new ApplicantSearchCriteria();

            if (StringUtils.isNotBlank(applicant.getId())) {
                searchCriteria.setId(applicant.getId());
            } else if (StringUtils.isNotBlank(applicant.getAadhaarNumber())) {
                searchCriteria.setAadhaarNumber(applicant.getAadhaarNumber());
            }
        }
        return searchCriteria;
    }
}
