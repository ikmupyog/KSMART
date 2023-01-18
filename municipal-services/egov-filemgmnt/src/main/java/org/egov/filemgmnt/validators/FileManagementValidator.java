package org.egov.filemgmnt.validators;

import static org.egov.filemgmnt.web.enums.ErrorCodes.INVALID_CREATE;
import static org.egov.filemgmnt.web.enums.ErrorCodes.INVALID_SEARCH;
import static org.egov.filemgmnt.web.enums.ErrorCodes.INVALID_UPDATE;

import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.web.models.ApplicantAddress;
import org.egov.filemgmnt.web.models.ApplicantChild;
import org.egov.filemgmnt.web.models.ApplicantDocument;
import org.egov.filemgmnt.web.models.ApplicantFileDetail;
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.egov.filemgmnt.web.models.ApplicantSearchCriteria;
import org.egov.filemgmnt.web.models.ApplicantServiceDetail;
import org.egov.filemgmnt.web.models.ApplicantServiceDocument;
import org.egov.filemgmnt.web.models.ApplicantServiceRequest;
import org.egov.filemgmnt.web.models.ApplicantServiceSearchCriteria;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import org.springframework.util.ObjectUtils;

@Component
public class FileManagementValidator { // NOPMD

    @Autowired
    private FMConfiguration fmConfig;
    @Autowired
    private MdmsValidator mdmsValidator;

    public void validateApplicantPersonal(final ApplicantServiceRequest request,
                                          final ApplicantPersonal existingApplicant) {
        final ApplicantPersonal applicant = request.getApplicantServiceDetail()
                                                   .getApplicant();
        Assert.notNull(applicant, "Applicant personal must not be null");

        // 1. validate applicant personal
        if (StringUtils.isNotBlank(applicant.getId())) {
            if (existingApplicant == null) {
                throw new CustomException(INVALID_CREATE.getCode(), "Invalid applicant personal id.");
            }

            if (!ObjectUtils.nullSafeEquals(applicant.getAadhaarNo(), existingApplicant.getAadhaarNo())) {
                throw new CustomException(INVALID_CREATE.getCode(), "Invalid applicant personal aadhaar number.");
            }
        } else if (StringUtils.isNotBlank(applicant.getAadhaarNo()) && existingApplicant != null) {
            throw new CustomException(INVALID_CREATE.getCode(),
                    "Invalid applicant personal id, applicant with same aadhaar number exists.");
        }

        // 2. validate applicant address
        validateApplicantAddress(applicant, existingApplicant);

        // 3. validate applicant document
        validateApplicantDocument(applicant, existingApplicant);

        // TODO: don't we need to validate tenant id?
    }

    private void validateApplicantDocument(final ApplicantPersonal applicant,
                                           final ApplicantPersonal existingApplicant) {
        final ApplicantDocument document = applicant.getDocument();
        Assert.notNull(document, "Applicant document must not be null");

        if (StringUtils.isNotBlank(applicant.getId())) { // existing applicant personal
            if (!ObjectUtils.nullSafeEquals(applicant.getId(), document.getApplicantPersonalId())) {
                throw new CustomException(INVALID_CREATE.getCode(),
                        "Invalid applicant personal id in applicant document.");
            }

            final ApplicantDocument existingDocument = existingApplicant.getDocument();
            if (!ObjectUtils.nullSafeEquals(document.getId(), existingDocument.getId())) {
                throw new CustomException(INVALID_CREATE.getCode(), "Invalid applicant document id.");
            }
        } else { // new applicant personal
            if (StringUtils.isNotBlank(document.getId())) {
                throw new CustomException(INVALID_CREATE.getCode(),
                        "Invalid applicant document id, document id must be null for create request.");
            }
        }
    }

    private void validateApplicantAddress(final ApplicantPersonal applicant,
                                          final ApplicantPersonal existingApplicant) {
        final ApplicantAddress address = applicant.getAddress();
        Assert.notNull(address, "Applicant address must not be null.");

        if (StringUtils.isNotBlank(applicant.getId())) { // existing applicant personal
            if (!ObjectUtils.nullSafeEquals(applicant.getId(), address.getApplicantPersonalId())) {
                throw new CustomException(INVALID_CREATE.getCode(),
                        "Invalid applicant personal id in applicant address.");
            }

            final ApplicantAddress existingAddress = existingApplicant.getAddress();
            if (!ObjectUtils.nullSafeEquals(address.getId(), existingAddress.getId())) {
                throw new CustomException(INVALID_CREATE.getCode(), "Invalid applicant address id.");
            }
        } else { // new applicant personal
            if (StringUtils.isNotBlank(address.getId())) {
                throw new CustomException(INVALID_CREATE.getCode(),
                        "Invalid applicant address id, address id must be null for create request.");
            }
        }
    }

    public void validateCreate(final ApplicantServiceRequest request, final Object mdmsData) {
        if (StringUtils.isNotBlank(request.getApplicantServiceDetail()
                                          .getId())) {
            throw new CustomException(INVALID_CREATE.getCode(),
                    "Applicant service detail id must be null for create request.");
        }

        // validate service detail's service code
        mdmsValidator.validateMdmsData(request, mdmsData);
    }

    public void validateUpdate(final ApplicantServiceRequest request, // NOPMD
                               final ApplicantServiceDetail existingServiceDetail) {
        final ApplicantServiceDetail serviceDetail = request.getApplicantServiceDetail();
        final ApplicantPersonal applicant = serviceDetail.getApplicant();

        if (!ObjectUtils.nullSafeEquals(serviceDetail.getApplicantPersonalId(), applicant.getId())) {
            throw new CustomException(INVALID_UPDATE.getCode(),
                    "Invalid applicant personal id in applicant service detail.");
        }

        if (!ObjectUtils.nullSafeEquals(serviceDetail.getId(), existingServiceDetail.getId())) {
            throw new CustomException(INVALID_UPDATE.getCode(), "Invalid applicant service detail id.");
        }

        // validate service document
        final ApplicantServiceDocument serviceDocument = serviceDetail.getServiceDocument();
        if (StringUtils.isAnyBlank(serviceDocument.getId(), serviceDocument.getApplicantPersonalId())) {
            throw new CustomException(INVALID_UPDATE.getCode(),
                    "Applicant service document id and applicant personal id is required for update request.");
        }

        if (!ObjectUtils.nullSafeEquals(serviceDocument.getId(),
                                        existingServiceDetail.getServiceDocument()
                                                             .getId())) {
            throw new CustomException(INVALID_UPDATE.getCode(), "Invalid applicant service document id.");
        }

        if (!ObjectUtils.nullSafeEquals(serviceDocument.getApplicantPersonalId(), applicant.getId())) {
            throw new CustomException(INVALID_UPDATE.getCode(),
                    "Invalid applicant personal id in applicant service document.");
        }

        final String serviceDetailId = serviceDetail.getId();

        if (!ObjectUtils.nullSafeEquals(serviceDocument.getServiceDetailsId(), serviceDetailId)) {
            throw new CustomException(INVALID_UPDATE.getCode(),
                    "Invalid service details id in applicant service document.");
        }

        // validate file detail
        final ApplicantFileDetail fileDetail = serviceDetail.getFileDetail();
        if (StringUtils.isAnyBlank(fileDetail.getId(), fileDetail.getApplicantPersonalId())) {
            throw new CustomException(INVALID_UPDATE.getCode(),
                    "Applicant file detail id and applicant personal id is required for update request.");
        }
        if (!ObjectUtils.nullSafeEquals(fileDetail.getId(),
                                        existingServiceDetail.getFileDetail()
                                                             .getId())) {
            throw new CustomException(INVALID_UPDATE.getCode(), "Invalid applicant file detail id.");
        }
        if (!ObjectUtils.nullSafeEquals(fileDetail.getApplicantPersonalId(), applicant.getId())) {
            throw new CustomException(INVALID_UPDATE.getCode(),
                    "Invalid applicant personal id in applicant service file detail.");
        }

        if (!ObjectUtils.nullSafeEquals(fileDetail.getServiceDetailsId(), serviceDetailId)) {
            throw new CustomException(INVALID_UPDATE.getCode(),
                    "Invalid service details id in applicant service file detail.");
        }

        // validate applicant child (other applicant details)
        final ApplicantChild applicantDetail = serviceDetail.getApplicantChild();
        if (StringUtils.isAnyBlank(applicantDetail.getId(), applicantDetail.getApplicantPersonalId())) {
            throw new CustomException(INVALID_UPDATE.getCode(),
                    "Applicant child id and applicant personal id is required for update request.");
        }
        if (!ObjectUtils.nullSafeEquals(applicantDetail.getId(),
                                        existingServiceDetail.getApplicantChild()
                                                             .getId())) {
            throw new CustomException(INVALID_UPDATE.getCode(), "Invalid applicant child id.");
        }
        if (!ObjectUtils.nullSafeEquals(applicantDetail.getApplicantPersonalId(), applicant.getId())) {
            throw new CustomException(INVALID_UPDATE.getCode(), "Invalid applicant personal id in applicant child.");
        }
    }

    public void validateSearchServices(final RequestInfo requestInfo, // NOPMD
                                       final ApplicantServiceSearchCriteria searchCriteria) {
        if (StringUtils.isBlank(searchCriteria.getTenantId())) {
            throw new CustomException(INVALID_SEARCH.getCode(), "Tenant id is required for applicant service search.");
        }

        final String allowedSearchParams = fmConfig.getAllowedCitizenSearchParams();

        if (StringUtils.isNotBlank(allowedSearchParams)) {
            final List<String> allowedSearchTokens = Arrays.asList(allowedSearchParams.split(","));
            validateSearchParams(searchCriteria, allowedSearchTokens);
        }

        if (StringUtils.isNotBlank(searchCriteria.getTenantId()) && StringUtils.isBlank(searchCriteria.getApplicantId())
                && StringUtils.isBlank(searchCriteria.getFileCode()) && searchCriteria.getFromDate() == null
                && StringUtils.isBlank(searchCriteria.getAadhaarNo())) {
            throw new CustomException(INVALID_SEARCH.getCode(), "Search based only on tenant id is not allowed.");
        }
    }

    public void validateSearchApplicants(final RequestInfo requestInfo, final ApplicantSearchCriteria searchCriteria) { // NOPMD
        if (StringUtils.isBlank(searchCriteria.getTenantId())) {
            throw new CustomException(INVALID_SEARCH.getCode(), "Tenant id is required for applicant personal search.");
        }

        final String allowedSearchParams = fmConfig.getAllowedCitizenSearchParams();

        if (StringUtils.isNotBlank(allowedSearchParams)) {
            final List<String> allowedSearchTokens = Arrays.asList(allowedSearchParams.split(","));
            validateSearchParams(searchCriteria, allowedSearchTokens);
        }

        if (StringUtils.isNotBlank(searchCriteria.getTenantId()) && StringUtils.isBlank(searchCriteria.getId())
                && StringUtils.isBlank(searchCriteria.getAadhaarNo())) {
            throw new CustomException(INVALID_SEARCH.getCode(), "Search based only on tenant id is not allowed.");
        }
    }

    private void validateSearchParams(final ApplicantSearchCriteria searchCriteria, final List<String> allowedParams) {
        final BeanWrapper bw = new BeanWrapperImpl(searchCriteria);

        FMUtils.validateSearchParam(bw, "tenantId", allowedParams);
        FMUtils.validateSearchParam(bw, "id", allowedParams); // applicant id
        FMUtils.validateSearchParam(bw, "aadhaarNo", allowedParams);
    }

    private void validateSearchParams(final ApplicantServiceSearchCriteria searchCriteria,
                                      final List<String> allowedParams) {
        final BeanWrapper bw = new BeanWrapperImpl(searchCriteria);

        FMUtils.validateSearchParam(bw, "tenantId", allowedParams);
        // FMUtils.validateSearchParam(bw, "serviceDetailId", allowedParams);
        FMUtils.validateSearchParam(bw, "applicantId", allowedParams);
        FMUtils.validateSearchParam(bw, "fileCode", allowedParams);
        FMUtils.validateSearchParam(bw, "fromDate", allowedParams);
        FMUtils.validateSearchParam(bw, "toDate", allowedParams);
        FMUtils.validateSearchParam(bw, "aadhaarNo", allowedParams);
        FMUtils.validateSearchParam(bw, "offset", allowedParams);
        FMUtils.validateSearchParam(bw, "limit", allowedParams);
        // FMUtils.validateSearchParam(bw, "applicantIds", allowedParams);
    }

}
