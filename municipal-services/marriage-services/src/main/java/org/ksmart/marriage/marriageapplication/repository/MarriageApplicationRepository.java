package org.ksmart.marriage.marriageapplication.repository;

import lombok.extern.slf4j.Slf4j;
//import org.ksmart.marriage.common.producer.BndProducer;

import org.ksmart.marriage.common.producer.MarriageProducer;
import org.ksmart.marriage.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageapplication.enrichment.MarriageDetailsEnrichment;
import org.ksmart.marriage.marriageapplication.model.MarriageApplicationDetail;
//import org.ksmart.marriage.common.producer.MarriageProducer;
import org.ksmart.marriage.marriageapplication.model.marriage.MarriageDetailsRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
public class MarriageApplicationRepository {
    private final MarriageProducer producer;

    private final MarriageApplicationConfiguration marriageApplicationConfiguration;

    private final MarriageDetailsEnrichment marriageDetailsEnrichment;
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public MarriageApplicationRepository(MarriageProducer producer, MarriageApplicationConfiguration marriageApplicationConfiguration, JdbcTemplate jdbcTemplate, MarriageDetailsEnrichment marriageDetailsEnrichment) {
        this.producer = producer;
        this.marriageApplicationConfiguration = marriageApplicationConfiguration;
        this.marriageDetailsEnrichment = marriageDetailsEnrichment;
        this.jdbcTemplate = jdbcTemplate;

    }


    public List<MarriageApplicationDetail> saveMarriageDetails(MarriageDetailsRequest request) {

        marriageDetailsEnrichment.enrichCreate(request);
        producer.push(marriageApplicationConfiguration.getSaveMarriageApplicationTopic(), request);
        return request.getMarriageDetails();
    }

    public List<MarriageApplicationDetail> updateMarriageDetails(MarriageDetailsRequest request) {
        marriageDetailsEnrichment.enrichCreate(request);
        producer.push(marriageApplicationConfiguration.getUpdateMarriageApplicationTopic(), request);
        return request.getMarriageDetails();
    }

    //private final org.ksmart.birth.common.producer.MarriageProducer producer;

}
