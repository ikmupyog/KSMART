package org.egov.filemgmnt.service;

import static org.egov.filemgmnt.web.enums.ErrorCodes.INVALID_UPDATE;

import java.util.List;

import javax.validation.Valid;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.FileManagementEnrichment;
import org.egov.filemgmnt.kafka.Producer;
import org.egov.filemgmnt.repository.FileManagementRepository;
import org.egov.filemgmnt.util.MdmsUtil;
import org.egov.filemgmnt.validators.FileManagementValidator;
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.egov.filemgmnt.web.models.ApplicantSearchCriteria;
import org.egov.filemgmnt.web.models.ApplicantServiceDetail;
import org.egov.filemgmnt.web.models.ApplicantServiceRequest;
import org.egov.filemgmnt.web.models.ApplicantServiceSearchCriteria;
import org.egov.filemgmnt.web.models.certificates.CertificateDetails;
import org.egov.filemgmnt.web.models.certificates.CertificateRequest;
//import org.egov.filemgmnt.web.models.certificates.CertificatePdfApplicationRequest;
import org.egov.filemgmnt.workflow.WorkflowIntegrator;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FileManagementService {

    @Autowired
    private FMConfiguration fmConfig;
    @Autowired
    @Qualifier("fmProducer")
    private Producer producer;
    @Autowired
    private MdmsUtil mdmsUtil;
    @Autowired
    private WorkflowIntegrator wfIntegrator;

    private final FileManagementValidator validator;
    private final FileManagementEnrichment enrichment;
    private final FileManagementRepository repository;

    FileManagementService(final FileManagementValidator validator, final FileManagementEnrichment enrichment,
                          final FileManagementRepository repository) {
        this.validator = validator;
        this.enrichment = enrichment;
        this.repository = repository;
    }

    public ApplicantServiceDetail create(final ApplicantServiceRequest request) {

        // 1. validate mdms data
        final Object mdmsData = mdmsUtil.mdmsCall(request.getRequestInfo(), fmConfig.getStateLevelTenantId());

        // 2. validate applicant personal
        final ApplicantPersonal applicant = request.getApplicantServiceDetail()
                                                   .getApplicant();
        Assert.notNull(applicant, "Applicant personal must not be null");

        // check applicant personal exists or not
        final ApplicantPersonal existingApplicant = findApplicantPersonalByIdOrAadhaar(applicant);

        validator.validateApplicantPersonal(request, existingApplicant);

        // 3. validate file service details
        validator.validateCreate(request, mdmsData);

        // 4. enrich applicant personal
        enrichment.enrichApplicantPersonal(request, existingApplicant);

        // 5. enrich file service details
        enrichment.enrichCreate(request);

        // 6. encrypt PII information - aadhaar number,

        // 7. create/update user

        // 8. create/update applicant personal
        final String applicantPersonalTopic = StringUtils.isBlank(applicant.getId())
                ? fmConfig.getSaveApplicantPersonalTopic()
                : fmConfig.getUpdateApplicantPersonalTopic();

        producer.push(applicantPersonalTopic, request);

        // 9. create file service details
        producer.push(fmConfig.getSaveApplicantServiceTopic(), request);

        // 10. create workflow
        wfIntegrator.callWorkFlow(request);

        return request.getApplicantServiceDetail();
    }

    public ApplicantServiceDetail update(final ApplicantServiceRequest request) {
        final ApplicantServiceDetail serviceDetail = request.getApplicantServiceDetail();
        Assert.notNull(serviceDetail, "Applicant service detail must not be null.");

        if (StringUtils.isBlank(serviceDetail.getId())) {
            throw new CustomException(INVALID_UPDATE.getCode(),
                    "Applicant service detail id is required for update request.");
        }

        // 1. validate applicant personal
        final ApplicantPersonal applicant = serviceDetail.getApplicant();
        Assert.notNull(applicant, "Applicant personal must not be null.");

        if (StringUtils.isBlank(applicant.getId())) {
            throw new CustomException(INVALID_UPDATE.getCode(),
                    "Applicant personal id is required for update request.");
        }

        final ApplicantPersonal existingApplicant = findApplicantPersonalByIdOrAadhaar(applicant);
        validator.validateApplicantPersonal(request, existingApplicant);

        // 2. validate file service details
        final ApplicantServiceDetail existingServiceDetail = findApplicantServiceDetailById(serviceDetail);
        validator.validateUpdate(request, existingServiceDetail);

        // 3. enrich applicant personal
        enrichment.enrichApplicantPersonal(request, existingApplicant);

        // 4. enrich file service details
        enrichment.enrichUpdate(request, existingServiceDetail);

        // 5. encrypt PII information - aadhaar number,

        // 6. update user

        // 7. update applicant personal
        producer.push(fmConfig.getUpdateApplicantPersonalTopic(), request);

        // 8. create file service details
        producer.push(fmConfig.getUpdateApplicantServiceTopic(), request);

        // 9. update workflow
        wfIntegrator.callWorkFlow(request);

        return request.getApplicantServiceDetail();
    }

    private ApplicantServiceDetail findApplicantServiceDetailById(final ApplicantServiceDetail serviceDetail) {
        final ApplicantServiceSearchCriteria searchCriteria = ApplicantServiceSearchCriteria.builder()
                                                                                            .serviceDetailId(serviceDetail.getId())
                                                                                            .build();
        final List<ApplicantServiceDetail> serviceDetails = repository.searchApplicantServices(searchCriteria);
        return CollectionUtils.isNotEmpty(serviceDetails) ? serviceDetails.get(0) : null;
    }

    private ApplicantPersonal findApplicantPersonalByIdOrAadhaar(final ApplicantPersonal applicant) {
        final ApplicantSearchCriteria searchCriteria = buildApplicantSearchCriteria(applicant);
        final List<ApplicantPersonal> applicantPersonals = repository.searchApplicantPersonals(searchCriteria);

        return CollectionUtils.isNotEmpty(applicantPersonals) ? applicantPersonals.get(0) : null;
    }

    private ApplicantSearchCriteria buildApplicantSearchCriteria(final ApplicantPersonal applicant) {
        ApplicantSearchCriteria searchCriteria = null;

        if (applicant.getId() != null || applicant.getAadhaarNo() != null) {
            searchCriteria = new ApplicantSearchCriteria();

            if (applicant.getId() != null) {
                searchCriteria.setId(applicant.getId());
            } else if (applicant.getAadhaarNo() != null) {
                searchCriteria.setAadhaarNo(applicant.getAadhaarNo());
            }
        }

        return searchCriteria;
    }

    public List<ApplicantServiceDetail> searchServices(final RequestInfo requestInfo,
                                                       final ApplicantServiceSearchCriteria searchCriteria) {
        validator.validateSearchServices(requestInfo, searchCriteria);
        return repository.searchApplicantServices(searchCriteria);
    }

    public List<ApplicantPersonal> searchApplicants(final RequestInfo requestInfo,
                                                    final ApplicantSearchCriteria searchCriteria) {
        validator.validateSearchApplicants(requestInfo, searchCriteria);
        return repository.searchApplicantPersonals(searchCriteria);
    }

    public List<CertificateDetails> download(@Valid final ApplicantSearchCriteria criteria,
                                             final RequestInfo requestInfo) {
        CertificateRequest request;
        request = repository.getResidentialCertificate(criteria, requestInfo);

        if (log.isDebugEnabled()) {
            log.debug("Pdf response " + request.getCertificateDetails());
        }

        producer.push(fmConfig.getSaveCertificateTopic(), request);

        return request.getCertificateDetails();

    }
}
