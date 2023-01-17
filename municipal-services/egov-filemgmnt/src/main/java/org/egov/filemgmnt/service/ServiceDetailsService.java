package org.egov.filemgmnt.service;

import java.util.LinkedList;
import java.util.List;

import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.ServiceDetailsEnrichment;
import org.egov.filemgmnt.kafka.Producer;
import org.egov.filemgmnt.repository.ServiceDetailsRepository;
import org.egov.filemgmnt.validators.ServiceDetailsValidator;
import org.egov.filemgmnt.web.models.ApplicantServiceDetail;
import org.egov.filemgmnt.web.models.ApplicantServiceSearchCriteria;
import org.egov.filemgmnt.web.models.ServiceDetailsRequest;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ServiceDetailsService {

    private final ServiceDetailsValidator validatorService;
    private final ServiceDetailsEnrichment enrichmentService;
    private final ServiceDetailsRepository repository;
    private final Producer producer;
    private final FMConfiguration fmConfig;

    // @Autowired
    ServiceDetailsService(final ServiceDetailsValidator validatorService,
                          final ServiceDetailsEnrichment enrichmentService, final ServiceDetailsRepository repository,
                          @Qualifier("fmProducer") final Producer producer, final FMConfiguration fmConfig) {
        this.validatorService = validatorService;
        this.enrichmentService = enrichmentService;
        this.repository = repository;
        this.producer = producer;
        this.fmConfig = fmConfig;

    }

    public List<ApplicantServiceDetail> create(final ServiceDetailsRequest request) {
        // validate request
        validatorService.validateCreate(request);

        // enrich request
        enrichmentService.enrichCreate(request);

        producer.push(fmConfig.getSaveServiceDetailsTopic(), request);

        return request.getServiceDetails();
    }

    public List<ApplicantServiceDetail> search(final ApplicantServiceSearchCriteria criteria) {

//        if (CollectionUtils.isEmpty(criteria.getIds())) {
//
//        }

        return repository.getApplicantServices(criteria);
    }

    public List<ApplicantServiceDetail> update(final ServiceDetailsRequest request) {
        if (log.isDebugEnabled()) {
            log.debug("ServiceDetails.update\n{}", request);
        }

        final List<String> ids = new LinkedList<>();
        request.getServiceDetails()
               .forEach(personal -> ids.add(personal.getId()));

        // search database
        final List<ApplicantServiceDetail> searchResult = repository.getApplicantServices(ApplicantServiceSearchCriteria.builder()
                                                                                                                        .applicantIds(ids)
                                                                                                                        .build());
        // validate request
        validatorService.validateUpdate(request, searchResult);

        enrichmentService.enrichUpdate(request);

        producer.push(fmConfig.getSaveApplicantPersonalTopic(), request);

        return request.getServiceDetails();
    }

}
