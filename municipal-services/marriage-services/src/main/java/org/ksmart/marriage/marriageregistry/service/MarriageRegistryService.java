package org.ksmart.marriage.marriageregistry.service;

import lombok.extern.slf4j.Slf4j;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryDetails;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryRequest;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistrySearchCriteria;
import org.ksmart.marriage.marriageregistry.repository.MarriageRegistryRepository;
import org.springframework.stereotype.Service;
import org.ksmart.marriage.common.producer.MarriageProducer;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageregistry.enrichment.MarriageRegistryEnrichment;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryDetails;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryRequest;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistrySearchCriteria;
import org.ksmart.marriage.marriageregistry.repository.querybuilder.MarriageRegistryQueryBuilder;
import org.ksmart.marriage.marriageregistry.repository.rowmapper.MarriageRegistryRowMapper;
import java.util.List;
/**
     * Created by Jasmine
     * on 24.03.2023
     */
@Slf4j
@Service
public class MarriageRegistryService {
    private final MarriageProducer producer;
    private final MarriageApplicationConfiguration marriageApplicationConfiguration;
    private final MarriageRegistryEnrichment marriageRegistryEnrichment;
    private final MarriageRegistryRepository repository;

    public MarriageRegistryService(MarriageRegistryRepository repository,MarriageRegistryEnrichment marriageRegistryEnrichment, 
                                    MarriageProducer producer, 
                                    MarriageApplicationConfiguration marriageApplicationConfiguration ) {

            this.producer = producer;
            this.marriageApplicationConfiguration = marriageApplicationConfiguration;
            this.marriageRegistryEnrichment = marriageRegistryEnrichment;
            this.repository = repository;
    }

    public List<MarriageRegistryDetails> createRegistry(MarriageRegistryRequest request) {

        marriageRegistryEnrichment.enrichCreate(request);

        producer.push(marriageApplicationConfiguration.getSaveMarriageRegistryTopic(), request);

        MarriageRegistryRequest result = MarriageRegistryRequest
                                .builder()
                                .requestInfo(request.getRequestInfo())
                                .marriageDetails(request.getMarriageDetails())
                                .build();
        return result.getMarriageDetails();

    }


    // public List<MarriageRegistryDetails> updateRegistry(MarriageRegistryRequest request) {

    //     return repository.updateMarriageRegistry(request);
    // }

    public List<MarriageRegistryDetails> searchRegistry(MarriageRegistrySearchCriteria criteria) {
        
        return repository.searchMarriageRegistry(criteria);
    }


}
