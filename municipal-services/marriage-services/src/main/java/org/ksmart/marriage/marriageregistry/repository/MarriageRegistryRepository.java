package org.ksmart.marriage.marriageregistry.repository;

import org.ksmart.marriage.common.producer.MarriageProducer;
 import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageregistry.enrichment.MarriageRegistryEnrichment;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryDetails;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistryRequest;
import org.ksmart.marriage.marriageregistry.web.model.MarriageRegistrySearchCriteria;
import org.ksmart.marriage.marriageregistry.repository.querybuilder.MarriageRegistryQueryBuilder;
import org.ksmart.marriage.marriageregistry.repository.rowmapper.MarriageRegistryRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import lombok.extern.slf4j.Slf4j;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Repository
public class MarriageRegistryRepository {
    private final MarriageProducer producer;

     private final MarriageApplicationConfiguration marriageApplicationConfiguration;

     private final MarriageRegistryEnrichment marriageRegistryEnrichment;
     private final MarriageRegistryQueryBuilder queryBuilder;
     private final MarriageRegistryRowMapper marriageRegistryRowMapper;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MarriageRegistryRepository(MarriageRegistryEnrichment marriageRegistryEnrichment, MarriageProducer producer, 
                                    MarriageApplicationConfiguration marriageApplicationConfiguration, 
                                    JdbcTemplate jdbcTemplate, 
                                    MarriageRegistryEnrichment marriageDetailsEnrichment, 
                                    MarriageRegistryQueryBuilder queryBuilder, 
                                    MarriageRegistryRowMapper marriageRegistryRowMapper) {
        this.producer = producer;
        this.marriageApplicationConfiguration = marriageApplicationConfiguration;
        this.marriageRegistryEnrichment = marriageRegistryEnrichment;
        this.jdbcTemplate = jdbcTemplate;
        this.queryBuilder = queryBuilder;
        this.marriageRegistryRowMapper = marriageRegistryRowMapper;
    }


    public List<MarriageRegistryDetails> createMarriageRegistry(MarriageRegistryRequest request) {

        marriageRegistryEnrichment.enrichCreate(request);
        producer.push(marriageApplicationConfiguration.getSaveMarriageRegistryTopic(), request);
        MarriageRegistryRequest result = MarriageRegistryRequest
                                .builder()
                                .requestInfo(request.getRequestInfo())
                                .marriageDetails(request.getMarriageDetails())
                                .build();
        return result.getMarriageDetails();
    }
    public List<MarriageRegistryDetails> searchMarriageRegistry(MarriageRegistrySearchCriteria criteria) {
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = queryBuilder.getMarriageRegistrySearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<MarriageRegistryDetails> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriageRegistryRowMapper);
 
        return result; 
    }

    // public List<MarriageRegistryDetails> updateMarriageRegistry(MarriageRegistryRequest request) {
    //     marriageRegistryEnrichment.enrichUpdate(request);
    //     producer.push(marriageApplicationConfiguration.getUpdateMarriageRegistryTopic(), request);
    //     MarriageRegistryRequest result = MarriageRegistryRequest
    //                                     .builder()
    //                                     .requestInfo(request.getRequestInfo())
    //                                     .marriageDetails(request.getMarriageDetails())
    //                                     .build();
    //     return result.getMarriageDetails();
    // }

    // public List<MarriageRegistryDetails> searchMarriageRegistry(MarriageRegistrySearchCriteria criteria) {
    //     List<Object> preparedStmtValues = new ArrayList<>();
    //     String query = marriageRegistryQueryBuilder.getMarriageApplicationSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
    //     List<MarriageRegistryDetails> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriageRegistryRowMapper);
    //     return result;
    // }

    //private final org.ksmart.birth.common.producer.MarriageProducer producer;

}
