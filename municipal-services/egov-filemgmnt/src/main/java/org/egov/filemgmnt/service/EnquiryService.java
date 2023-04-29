package org.egov.filemgmnt.service;

import java.util.List;

import org.egov.common.contract.request.RequestInfo;
import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.EnquiryEnrichment;
import org.egov.filemgmnt.kafka.Producer;
import org.egov.filemgmnt.repository.EnquiryRepository;
import org.egov.filemgmnt.web.models.enquiry.Enquiry;
import org.egov.filemgmnt.web.models.enquiry.EnquiryRequest;
import org.egov.filemgmnt.web.models.enquiry.EnquirySearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class EnquiryService {

    @Autowired
    private FMConfiguration fmConfig;

    @Autowired
    @Qualifier("fmProducer")
    private Producer producer;

    private final EnquiryRepository repository;
    private final EnquiryEnrichment enrichment;

    EnquiryService(final EnquiryEnrichment enquiryEnrichment, final EnquiryRepository repository) {
        this.enrichment = enquiryEnrichment;
        this.repository = repository;
    }

    public List<Enquiry> create(final EnquiryRequest request) {

        // enrich
        enrichment.enrichCreate(request);

        // persist
        producer.push(fmConfig.getSaveEnquiryTopic(), request);

        return request.getEnquiryList();

    }

    public List<Enquiry> search(final RequestInfo requestInfo, final EnquirySearchCriteria enquirySearchCriteria) {
        return repository.search(enquirySearchCriteria);
    }
}
