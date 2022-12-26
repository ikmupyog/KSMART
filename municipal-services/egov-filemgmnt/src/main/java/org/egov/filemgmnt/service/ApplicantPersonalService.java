package org.egov.filemgmnt.service;

import java.util.List;

import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.ApplicantPersonalEnrichment;
import org.egov.filemgmnt.kafka.Producer;
import org.egov.filemgmnt.repository.ApplicantPersonalRepository;
import org.egov.filemgmnt.util.MdmsUtil;
import org.egov.filemgmnt.validators.ApplicantPersonalValidator;
import org.egov.filemgmnt.web.models.ApplicantPersonal;
import org.egov.filemgmnt.web.models.ApplicantPersonalRequest;
import org.egov.filemgmnt.web.models.ApplicantPersonalSearchCriteria;
import org.egov.filemgmnt.workflow.WorkflowIntegrator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * The Class ApplicantPersonalService, provides methods for creating, updating
 * and searching applicant personals.
 * 
 * @see ApplicantPersonalValidator
 * @see ApplicantPersonalEnrichment
 * @see ApplicantPersonalRepository
 */
@Service
public class ApplicantPersonalService {

    private final ApplicantPersonalValidator validatorService;
    private final ApplicantPersonalEnrichment enrichmentService;
    private final ApplicantPersonalRepository repository;
    private final Producer producer;
    private final MdmsUtil mdmsUtil;
    private final FMConfiguration fmConfig;
    private final WorkflowIntegrator wfIntegrator;

    @Autowired
    ApplicantPersonalService(ApplicantPersonalValidator validatorService, ApplicantPersonalEnrichment enrichmentService,
                             ApplicantPersonalRepository repository, Producer producer, MdmsUtil mdmsUtil,
                             FMConfiguration fmConfig, WorkflowIntegrator wfIntegrator) {
        this.validatorService = validatorService;
        this.enrichmentService = enrichmentService;
        this.repository = repository;
        this.producer = producer;
        this.mdmsUtil = mdmsUtil;
        this.fmConfig = fmConfig;
        this.wfIntegrator = wfIntegrator;
    }

    /**
     * Creates applicant personal.
     *
     * @param request the {@link ApplicantPersonalRequest}
     * @return the list of {@link ApplicantPersonal}
     */
    public List<ApplicantPersonal> create(ApplicantPersonalRequest request) {
        String tenantId = request.getApplicantPersonals()
                                 .get(0)
                                 .getTenantId();

        // validate mdms data
        Object mdmsData = mdmsUtil.mdmsCall(request.getRequestInfo(), tenantId);

        // validate request
        validatorService.validateCreate(request, mdmsData);

        // enrich request
        enrichmentService.enrichCreate(request);

        producer.push(fmConfig.getSaveApplicantPersonalTopic(), request);

        // wfIntegrator.callWorkFlow(request);

        return request.getApplicantPersonals();

    }

    /**
     * Update applicant personal details.
     *
     * @param request the {@link ApplicantPersonalRequest}
     * @return the list of {@link ApplicantPersonal}
     */
    public List<ApplicantPersonal> update(ApplicantPersonalRequest request) {

        String id = request.getApplicantPersonals()
                           .get(0)
                           .getId();

        // search database
        List<ApplicantPersonal> searchResult = repository.getApplicantPersonals(ApplicantPersonalSearchCriteria.builder()
                                                                                                               .id(id)
                                                                                                               .build());

        // validate request
        validatorService.validateUpdate(request, searchResult);

        enrichmentService.enrichUpdate(request);

        producer.push(fmConfig.getUpdateApplicantPersonalTopic(), request);

        wfIntegrator.callWorkFlow(request);

        return request.getApplicantPersonals();
    }

    /**
     * Search applicant personal(s).
     *
     * @param criteria    the {@link ApplicantPersonalSearchCriteria}
     * @param requestInfo the {@link RequestInfo}
     * @return the list of {@link ApplicantPersonal}
     */
    public List<ApplicantPersonal> search(ApplicantPersonalSearchCriteria criteria, RequestInfo requestInfo) {
        validatorService.validateSearch(requestInfo, criteria);
        return repository.getApplicantPersonals(criteria);
    }
}
