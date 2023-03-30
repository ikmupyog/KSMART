package org.egov.filemgmnt.service;

import org.egov.filemgmnt.config.FMConfiguration;
import org.egov.filemgmnt.enrichment.EnquiryEnrichment;
import org.egov.filemgmnt.kafka.Producer;
import org.egov.filemgmnt.web.models.Enquiry.Enquiry;
import org.egov.filemgmnt.web.models.Enquiry.EnquiryRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class EnquiryService {

    private final FMConfiguration fmConfig;

    @Qualifier("fmProducer")
    private final Producer producer;

    private final EnquiryEnrichment enquiryEnrichment;

    public EnquiryService(FMConfiguration fmConfig, Producer producer, EnquiryEnrichment enquiryEnrichment) {
        this.fmConfig = fmConfig;
        this.producer = producer;
        this.enquiryEnrichment = enquiryEnrichment;
    }


    public List<Enquiry> saveEnquiry(EnquiryRequest request) {

        enquiryEnrichment.enrichSaveEnquiry(request);
        producer.push(fmConfig.getSaveEnquiryTopic(), request);
        return request.getEnquiryList();


    }
}
