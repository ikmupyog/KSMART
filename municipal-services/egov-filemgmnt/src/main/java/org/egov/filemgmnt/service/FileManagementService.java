package org.egov.filemgmnt.service;

import static org.egov.filemgmnt.web.enums.ErrorCodes.INVALID_UPDATE;

import java.util.List;
import java.util.Objects;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.FileManagementEnrichment;
import org.egov.filemgmnt.kafka.Producer;
import org.egov.filemgmnt.repository.FileManagementRepository;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.util.MdmsUtil;
import org.egov.filemgmnt.validators.FileManagementValidator;
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.egov.filemgmnt.web.models.ApplicantSearchCriteria;
import org.egov.filemgmnt.web.models.ApplicantServiceDetail;
import org.egov.filemgmnt.web.models.ApplicantServiceRequest;
import org.egov.filemgmnt.web.models.ApplicantServiceSearchCriteria;
import org.egov.filemgmnt.web.models.certificate.CertificateDetails;
import org.egov.filemgmnt.web.models.certificate.CertificateRequest;
import org.egov.filemgmnt.workflow.WorkflowIntegrator;
import org.egov.tracer.model.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FileManagementService extends AbstractFileManagementService {

    @Autowired
    private FMConfiguration fmConfig;
    @Autowired
    private WorkflowIntegrator wfIntegrator;
    @Autowired
    private MdmsUtil mdmsUtil;
    @Autowired
    @Qualifier("fmProducer")
    private Producer producer;

    private final FileManagementValidator validator;
    private final FileManagementEnrichment enrichment;
    private final FileManagementRepository repository;
    private final CertificateService certService;

    FileManagementService(final FileManagementValidator validator, final FileManagementEnrichment enrichment,
                          final FileManagementRepository repository, final CertificateService certService) {
        super();
        this.validator = validator;
        this.enrichment = enrichment;
        this.repository = repository;
        this.certService = certService;
    }

    public ApplicantServiceDetail create(final ApplicantServiceRequest request) {
        // Get mdms data
        final Object mdmsData = mdmsUtil.mdmsCallForModuleDetails(request.getRequestInfo(),
                                                                  fmConfig.getStateLevelTenantId());

        // validate applicant personal
        final ApplicantServiceDetail serviceDetail = request.getApplicantServiceDetail();

        final ApplicantPersonal applicantRaw = serviceDetail.getApplicant(); // non-encrypted version
        Assert.notNull(applicantRaw, "Applicant personal must not be null");

        // encrypt PII information - aadhaarNumber, mobileNumber, emailId,...
        final ApplicantPersonal applicant = encrypt(applicantRaw);
       serviceDetail.setApplicant(applicant);

        // check applicant personal exists or not
        final ApplicantPersonal existingApplicant = findApplicantPersonalByIdOrAadhaar(applicant);

        validator.validateApplicantPersonal(request, existingApplicant, true);

        // validate file service details
        validator.validateCreate(request, mdmsData);

        // enrich applicant personal
        enrichment.enrichApplicantPersonal(request, existingApplicant, true);

        // enrich file service details
        enrichment.enrichCreate(request, Objects.nonNull(existingApplicant));

        // create/update user
//        final FMUser fmUser = createOrUpdateUser(request.getRequestInfo(), applicantRaw);
//        enrichment.enrichCreate(request, fmUser);

        // create applicant file service details and create/update applicant details
        producer.push(fmConfig.getSaveApplicantServiceTopic(), request);

        // create workflow
        wfIntegrator.callWorkFlow(request);

        // decrypt PII information - aadhaarNumber, mobileNumber, emailId,...
        return decrypt(request.getApplicantServiceDetail(), request.getRequestInfo());
    }

    public ApplicantServiceDetail update(final ApplicantServiceRequest request) {
        // validate file service detail
        final ApplicantServiceDetail serviceDetail = request.getApplicantServiceDetail();
        Assert.notNull(serviceDetail, "Applicant service detail must not be null.");

        if (StringUtils.isBlank(serviceDetail.getId())) {
            throw new CustomException(INVALID_UPDATE.getCode(),
                    "Applicant service detail id is required for update request.");
        }

        // validate applicant personal
        final ApplicantPersonal applicantRaw = serviceDetail.getApplicant(); // non-encrypted version
        Assert.notNull(applicantRaw, "Applicant personal must not be null");

        if (StringUtils.isBlank(applicantRaw.getId())) {
            throw new CustomException(INVALID_UPDATE.getCode(),
                    "Applicant personal id is required for update request.");
        }

        // encrypt PII information - aadhaarNumber, mobileNumber, emailId,...
        final ApplicantPersonal applicant = encrypt(applicantRaw);
        serviceDetail.setApplicant(applicant);

        final ApplicantPersonal existingApplicant = findApplicantPersonalByIdOrAadhaar(applicant);
        validator.validateApplicantPersonal(request, existingApplicant, false);

        // validate file service details
        final ApplicantServiceDetail existingServiceDetail = findApplicantServiceDetailById(serviceDetail);
        validator.validateUpdate(request, existingServiceDetail);

        // enrich applicant personal
        enrichment.enrichApplicantPersonal(request, existingApplicant, false);

        // enrich file service details
        enrichment.enrichUpdate(request, existingServiceDetail);

        // update user
//        createOrUpdateUser(request.getRequestInfo(), applicantRaw);

        // update applicant file service details along with applicant details
        producer.push(fmConfig.getUpdateApplicantServiceTopic(), request);

        // update workflow
        wfIntegrator.callWorkFlow(request);

        // decrypt PII information - aadhaarNumber, mobileNumber, emailId,...
        return decrypt(request.getApplicantServiceDetail(), request.getRequestInfo());
    }

    private ApplicantServiceDetail findApplicantServiceDetailById(final ApplicantServiceDetail serviceDetail) {
        final ApplicantServiceSearchCriteria searchCriteria = ApplicantServiceSearchCriteria.builder()
                                                                                            .serviceDetailId(serviceDetail.getId())
                                                                                            .build();
        final List<ApplicantServiceDetail> serviceDetails = repository.searchApplicantServices(searchCriteria);

        return CollectionUtils.isNotEmpty(serviceDetails)
                ? serviceDetails.get(0)
                : null;
    }

    private ApplicantPersonal findApplicantPersonalByIdOrAadhaar(final ApplicantPersonal applicant) {
        final ApplicantSearchCriteria searchCriteria = buildApplicantSearchCriteria(applicant);
        final List<ApplicantPersonal> applicantPersonals = repository.searchApplicantPersonals(searchCriteria);

        return CollectionUtils.isNotEmpty(applicantPersonals)
                ? applicantPersonals.get(0)
                : null;
    }

    // Applicant services search
    public List<ApplicantServiceDetail> searchServices(final RequestInfo requestInfo,
                                                       final ApplicantServiceSearchCriteria searchCriteria) {
        // encrypt PII information - aadhaarNumber, mobileNumber, emailId
        final ApplicantServiceSearchCriteria criteria = encrypt(searchCriteria);

        validator.validateSearchServices(requestInfo, criteria);
        final List<ApplicantServiceDetail> result = repository.searchApplicantServices(criteria);

        return decryptServices(result, requestInfo);
    }

    // Applicant personal search
    public List<ApplicantPersonal> searchApplicants(final RequestInfo requestInfo,
                                                    final ApplicantSearchCriteria searchCriteria) {
        // encrypt PII information - aadhaarNumber, mobileNumber, emailId
        final ApplicantSearchCriteria criteria = encrypt(searchCriteria);

        validator.validateSearchApplicants(requestInfo, criteria);
        final List<ApplicantPersonal> result = repository.searchApplicantPersonals(criteria);

        return decryptApplicants(result, requestInfo);
    }

    // Residential certificate download
    public List<CertificateDetails> downloadCertificate(final RequestInfo requestInfo,
                                                        final ApplicantServiceSearchCriteria searchCriteria) {
        final CertificateRequest request = certService.creteCertificateRequest(searchCriteria, requestInfo);

        if (log.isDebugEnabled()) {
            log.debug("Certificate request: \n{}", FMUtils.toJson(request));
        }

        // producer.push(fmConfig.getSaveApplicantCertificateTopic(), request);

        return request.getCertificateDetails();
    }

	
	
}
