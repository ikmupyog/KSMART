package org.egov.filemgmnt.service;

import java.util.LinkedList;
import java.util.List;

import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.ServiceDetailsEnrichment;
import org.egov.filemgmnt.kafka.Producer;
import org.egov.filemgmnt.repository.ServiceDetailsRepository;
import org.egov.filemgmnt.validators.ServiceDetailsValidator;
import org.egov.filemgmnt.web.models.ApplicantServiceDetail;
import org.egov.filemgmnt.web.models.ServiceDetailsRequest;
import org.egov.filemgmnt.web.models.ServiceDetailsSearchCriteria;
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
    ServiceDetailsService(ServiceDetailsValidator validatorService, ServiceDetailsEnrichment enrichmentService,
                          ServiceDetailsRepository repository, @Qualifier("fmProducer") Producer producer,
                          FMConfiguration fmConfig) {
        this.validatorService = validatorService;
        this.enrichmentService = enrichmentService;
        this.repository = repository;
        this.producer = producer;
        this.fmConfig = fmConfig;

    }

    public List<ApplicantServiceDetail> create(ServiceDetailsRequest request) {
        // validate request
        validatorService.validateCreate(request);

        // enrich request
        enrichmentService.enrichCreate(request);

        producer.push(fmConfig.getSaveServiceDetailsTopic(), request);

        return request.getServiceDetails();
    }

    public List<ApplicantServiceDetail> search(ServiceDetailsSearchCriteria criteria) {

//        if (CollectionUtils.isEmpty(criteria.getIds())) {
//
//        }

        return repository.getApplicantServices(criteria);
    }

    public List<ApplicantServiceDetail> update(ServiceDetailsRequest request) {
        if (log.isDebugEnabled()) {
            log.debug("ServiceDetails.update\n{}", request);
        }

        List<String> ids = new LinkedList<>();
        request.getServiceDetails()
               .forEach(personal -> ids.add(personal.getId()));

        // search database
        List<ApplicantServiceDetail> searchResult = repository.getApplicantServices(ServiceDetailsSearchCriteria.builder()
                                                                                                        .ids(ids)
                                                                                                        .build());
        // validate request
        validatorService.validateUpdate(request, searchResult);

        enrichmentService.enrichUpdate(request);

        producer.push(fmConfig.getSaveApplicantPersonalTopic(), request);

        return request.getServiceDetails();
    }

}
