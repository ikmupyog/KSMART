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
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class EnquiryService {

    private final FMConfiguration fmConfig;
    private final EnquiryRepository repository;

    @Qualifier("fmProducer")
    private final Producer producer;

    private final EnquiryEnrichment enquiryEnrichment;

    public EnquiryService(final FMConfiguration fmConfig, final Producer producer,
                          final EnquiryEnrichment enquiryEnrichment, final EnquiryRepository repository) {
        this.fmConfig = fmConfig;
        this.producer = producer;
        this.enquiryEnrichment = enquiryEnrichment;
        this.repository = repository;
    }

    public List<Enquiry> saveEnquiry(final EnquiryRequest request) {

        enquiryEnrichment.enrichSaveEnquiry(request);
        producer.push(fmConfig.getSaveEnquiryTopic(), request);
        return request.getEnquiryList();

    }

    public List<Enquiry> searchEnquiry(final RequestInfo requestInfo,
                                       final EnquirySearchCriteria enquirySearchCriteria) {

        return repository.searchEnquiry(enquirySearchCriteria);
    }
}
