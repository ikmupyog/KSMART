package org.egov.filemgmnt.validators;

import static org.egov.filemgmnt.web.enums.ErrorCodes.INVALID_CREATE;
import static org.egov.filemgmnt.web.enums.ErrorCodes.INVALID_SEARCH;
import static org.egov.filemgmnt.web.enums.ErrorCodes.INVALID_UPDATE;
import static org.egov.filemgmnt.web.enums.ErrorCodes.REQUIRED;

import java.util.Arrays;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.egov.filemgmnt.web.models.ApplicantPersonalRequest;
import org.egov.filemgmnt.web.models.ApplicantPersonalSearchCriteria;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * The Class ApplicantPersonalValidator.
 * 
 * <p>
 * Validate applicant personal create and update requests
 * </p>
 * <p>
 * Validate applicant personal search criteria
 * </p>
 * 
 */
@Component
public class ApplicantPersonalValidator {

    private final FMConfiguration config;
    private final MdmsValidator mdmsValidator;

    @Autowired
    public ApplicantPersonalValidator(FMConfiguration config, MdmsValidator mdmsValidator) {
        this.config = config;
        this.mdmsValidator = mdmsValidator;

    }

    /**
     * Validate applicant personal create request.
     *
     * @param request the {@link ApplicantPersonalRequest}
     */
    public void validateCreate(ApplicantPersonalRequest request, Object mdmsData) {
        List<ApplicantPersonal> applicantPersonals = request.getApplicantPersonals();

        if (CollectionUtils.isEmpty(applicantPersonals)) {
            throw new CustomException(REQUIRED.getCode(), "Applicant personal is required.");
        }

        if (applicantPersonals.size() > 1) { // NOPMD
            throw new CustomException(INVALID_CREATE.getCode(),
                    "Supports only single Applicant personal create request.");
        }

        // validateApplicantPersonalRequiredFields(request);
        mdmsValidator.validateMdmsData(request, mdmsData);
    }

    /**
     * Validate applicant personal update request.
     *
     * @param request the {@link ApplicantPersonalRequest}
     */
    public void validateUpdate(ApplicantPersonalRequest request, List<ApplicantPersonal> searchResult) {
        List<ApplicantPersonal> applicantPersonals = request.getApplicantPersonals();

        if (CollectionUtils.isEmpty(applicantPersonals)) {
            throw new CustomException(REQUIRED.getCode(), "Applicant personal is required.");
        }

        if (applicantPersonals.size() > 1) { // NOPMD
            throw new CustomException(INVALID_UPDATE.getCode(),
                    "Supports only single Applicant personal update request.");
        }

        if (applicantPersonals.size() != searchResult.size()) {
            throw new CustomException(INVALID_UPDATE.getCode(), "Applicant Personal(s) not found in database.");
        }
    }

    /**
     * Validate search criteria.
     *
     * @param requestInfo the {@link RequestInfo}
     * @param criteria    the {@link ApplicantPersonalSearchCriteria}
     */
    public void validateSearch(RequestInfo requestInfo, ApplicantPersonalSearchCriteria criteria) { // NOPMD
        if (StringUtils.isBlank(criteria.getTenantId())) {
            throw new CustomException(INVALID_SEARCH.getCode(), "Tenant id is required.");
        }

        String allowedSearchParams = config.getAllowedCitizenSearchParams();

        if (StringUtils.isNotBlank(allowedSearchParams)) {
            List<String> allowedSearchTokens = Arrays.asList(allowedSearchParams.split(","));
            validateSearchParams(criteria, allowedSearchTokens);
        }

        if (StringUtils.isNotBlank(criteria.getTenantId()) && StringUtils.isBlank(criteria.getId())
                && StringUtils.isBlank(criteria.getFileCode()) && criteria.getFromDate() == null
                && StringUtils.isBlank(criteria.getAadhaarNo())) {
            throw new CustomException(INVALID_SEARCH.getCode(), "Search based only on tenant id is not allowed.");
        }
    }

    private void validateSearchParams(ApplicantPersonalSearchCriteria criteria, List<String> allowedParams) {
        BeanWrapper bw = new BeanWrapperImpl(criteria);

        FMUtils.validateSearchParam(bw, "tenantId", allowedParams);
        FMUtils.validateSearchParam(bw, "id", allowedParams);
        FMUtils.validateSearchParam(bw, "fileCode", allowedParams);
        FMUtils.validateSearchParam(bw, "fromDate", allowedParams);
        FMUtils.validateSearchParam(bw, "toDate", allowedParams);
        FMUtils.validateSearchParam(bw, "aadhaarNo", allowedParams);
        FMUtils.validateSearchParam(bw, "offset", allowedParams);
        FMUtils.validateSearchParam(bw, "limit", allowedParams);
    }

}
