package org.egov.filemgmnt.service;

import static org.egov.filemgmnt.web.enums.ErrorCodes.INVALID_UPDATE;

import java.util.List;
import java.util.Objects;

import javax.validation.Valid;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.FileManagementEnrichment;
import org.egov.filemgmnt.kafka.Producer;
import org.egov.filemgmnt.repository.FileManagementRepository;
import org.egov.filemgmnt.util.EncryptionUtil;
import org.egov.filemgmnt.util.MdmsUtil;
import org.egov.filemgmnt.validators.FileManagementValidator;
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.egov.filemgmnt.web.models.ApplicantSearchCriteria;
import org.egov.filemgmnt.web.models.ApplicantServiceDetail;
import org.egov.filemgmnt.web.models.ApplicantServiceRequest;
import org.egov.filemgmnt.web.models.ApplicantServiceSearchCriteria;
import org.egov.filemgmnt.web.models.certificate.CertificateDetails;
import org.egov.filemgmnt.web.models.certificate.CertificateRequest;
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
    private WorkflowIntegrator wfIntegrator;
    @Autowired
    private EncryptionUtil encUtil;
    @Autowired
    private MdmsUtil mdmsUtil;
    @Autowired
    @Qualifier("fmProducer")
    private Producer producer;

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
        // Get mdms data
        final Object mdmsData = mdmsUtil.mdmsCall(request.getRequestInfo(), fmConfig.getStateLevelTenantId());

        // validate applicant personal
        final ApplicantServiceDetail serviceDetail = request.getApplicantServiceDetail();

        ApplicantPersonal applicant = serviceDetail.getApplicant();
        Assert.notNull(applicant, "Applicant personal must not be null");

//        // encrypt PII information - aadhaarNumber, mobileNumber, emailId
//        applicant = encUtil.encryptObject(applicant, FMConstants.FM_APPLICANT_ENC_KEY, ApplicantPersonal.class);
//        serviceDetail.setApplicant(applicant);

        // check applicant personal exists or not
        final ApplicantPersonal existingApplicant = findApplicantPersonalByIdOrAadhaar(applicant);

        validator.validateApplicantPersonal(request, existingApplicant);

        // validate file service details
        validator.validateCreate(request, mdmsData);

        // enrich applicant personal
        enrichment.enrichApplicantPersonal(request, existingApplicant);

        // enrich file service details
        enrichment.enrichCreate(request, Objects.nonNull(existingApplicant));

        // create/update user

        // create applicant file service details and create/update applicant details
        producer.push(fmConfig.getSaveApplicantServiceTopic(), request);

        // create workflow
        wfIntegrator.callWorkFlow(request);

//        // decrypt PII information - aadhaarNumber, mobileNumber, emailId
//        applicant = encUtil.decryptObject(serviceDetail.getApplicant(),
//                                          FMConstants.FM_APPLICANT_ENC_KEY,
//                                          ApplicantPersonal.class,
//                                          request.getRequestInfo());
//        serviceDetail.setApplicant(applicant);

        return request.getApplicantServiceDetail();
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
        final ApplicantPersonal applicant = serviceDetail.getApplicant();
        Assert.notNull(applicant, "Applicant personal must not be null.");

//      // encrypt PII information - aadhaarNumber, mobileNumber, emailId
//      applicant = encUtil.encryptObject(applicant, FMConstants.FM_APPLICANT_ENC_KEY, ApplicantPersonal.class);
//      serviceDetail.setApplicant(applicant);

        if (StringUtils.isBlank(applicant.getId())) {
            throw new CustomException(INVALID_UPDATE.getCode(),
                    "Applicant personal id is required for update request.");
        }

        final ApplicantPersonal existingApplicant = findApplicantPersonalByIdOrAadhaar(applicant);
        validator.validateApplicantPersonal(request, existingApplicant);

        // validate file service details
        final ApplicantServiceDetail existingServiceDetail = findApplicantServiceDetailById(serviceDetail);
        validator.validateUpdate(request, existingServiceDetail);

        // enrich applicant personal
        enrichment.enrichApplicantPersonal(request, existingApplicant);

        // enrich file service details
        enrichment.enrichUpdate(request, existingServiceDetail);

        // update user

        // update applicant file service details along with applicant details
        producer.push(fmConfig.getUpdateApplicantServiceTopic(), request);

        // update workflow
        wfIntegrator.callWorkFlow(request);

//      // decrypt PII information - aadhaarNumber, mobileNumber, emailId
//      applicant = encUtil.decryptObject(serviceDetail.getApplicant(),
//                                        FMConstants.FM_APPLICANT_ENC_KEY,
//                                        ApplicantPersonal.class,
//                                        request.getRequestInfo());
//      serviceDetail.setApplicant(applicant);

        return request.getApplicantServiceDetail();
    }

    private ApplicantServiceDetail findApplicantServiceDetailById(final ApplicantServiceDetail serviceDetail) {
        ApplicantServiceSearchCriteria searchCriteria = ApplicantServiceSearchCriteria.builder()
                                                                                      .serviceDetailId(serviceDetail.getId())
                                                                                      .build();
//        // encrypt PII information - aadhaarNumber, mobileNumber, emailId
//        searchCriteria = encUtil.encryptObject(searchCriteria,
//                                               FMConstants.FM_APPLICANT_ENC_KEY,
//                                               ApplicantServiceSearchCriteria.class);

        final List<ApplicantServiceDetail> serviceDetails = repository.searchApplicantServices(searchCriteria);
        return CollectionUtils.isNotEmpty(serviceDetails) ? serviceDetails.get(0) : null;
    }

    private ApplicantPersonal findApplicantPersonalByIdOrAadhaar(final ApplicantPersonal applicant) {
        ApplicantSearchCriteria searchCriteria = buildApplicantSearchCriteria(applicant);
//        // encrypt PII information - aadhaarNumber, mobileNumber, emailId
//        searchCriteria = encUtil.encryptObject(searchCriteria, FMConstants.FM_APPLICANT_ENC_KEY, ApplicantSearchCriteria.class);

        final List<ApplicantPersonal> applicantPersonals = repository.searchApplicantPersonals(searchCriteria);

        return CollectionUtils.isNotEmpty(applicantPersonals) ? applicantPersonals.get(0) : null;
    }

    private ApplicantSearchCriteria buildApplicantSearchCriteria(final ApplicantPersonal applicant) {
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

    // Applicant services search
    public List<ApplicantServiceDetail> searchServices(final RequestInfo requestInfo,
                                                       final ApplicantServiceSearchCriteria searchCriteria) {
//      // encrypt PII information - aadhaarNumber, mobileNumber, emailId
//      searchCriteria = encUtil.encryptObject(searchCriteria,
//                                             FMConstants.FM_APPLICANT_ENC_KEY,
//                                             ApplicantServiceSearchCriteria.class);

        validator.validateSearchServices(requestInfo, searchCriteria);
        return repository.searchApplicantServices(searchCriteria);

        // TODO: decrypt applicant personal
    }

    // Applicant personal search
    public List<ApplicantPersonal> searchApplicants(final RequestInfo requestInfo,
                                                    final ApplicantSearchCriteria searchCriteria) {
//      // encrypt PII information - aadhaarNumber, mobileNumber, emailId
//      searchCriteria = encUtil.encryptObject(searchCriteria, FMConstants.FM_APPLICANT_ENC_KEY, ApplicantSearchCriteria.class);

        validator.validateSearchApplicants(requestInfo, searchCriteria);
        return repository.searchApplicantPersonals(searchCriteria);

        // TODO: decrypt applicant personal
    }

    public List<CertificateDetails> download(@Valid final ApplicantSearchCriteria criteria,
                                             final RequestInfo requestInfo) {
        CertificateRequest request;
        request = repository.getResidentialCertificate(criteria, requestInfo);

        if (log.isDebugEnabled()) {
            log.debug("Pdf response " + request.getCertificateDetails());
        }

        producer.push(fmConfig.getSaveApplicantCertificateTopic(), request);

        return request.getCertificateDetails();
    }
}
