package org.ksmart.death.deathapplication.repository;


import org.ksmart.death.deathapplication.config.DeathConfiguration;
import org.ksmart.death.deathapplication.enrichment.DeathCorrectionEnrichment;
import org.ksmart.death.deathapplication.kafka.producer.DeathProducer;
import org.ksmart.death.deathapplication.repository.querybuilder.DeathCorrectionQueryBuilder;
import org.ksmart.death.deathapplication.repository.rowmapper.correction.CorrectionApplicationRowMapper;
import org.ksmart.death.deathapplication.util.DeathMdmsUtil;
import org.ksmart.death.deathapplication.web.models.DeathCorrection.CorrectionDetails;
import org.ksmart.death.deathapplication.web.models.DeathCorrection.CorrectionRequest;
import org.ksmart.death.deathapplication.web.models.DeathSearchCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

 @Repository
public class DeathCorrectionRepository {

    private final DeathProducer producer;
    private final DeathCorrectionEnrichment enrichment;
    private final DeathConfiguration config;
    private final DeathMdmsUtil util;
    private final DeathCorrectionQueryBuilder queryBuilder;
    private final JdbcTemplate jdbcTemplate;
     private final CorrectionApplicationRowMapper rowMapper;
    @Autowired
    DeathCorrectionRepository( DeathProducer producer,DeathCorrectionEnrichment enrichment,
                               DeathConfiguration config,  DeathMdmsUtil util,
                               DeathCorrectionQueryBuilder queryBuilder, JdbcTemplate jdbcTemplate, CorrectionApplicationRowMapper rowMapper) {
        this.producer = producer;
        this.enrichment = enrichment;
        this.config = config;
        this.util = util;
        this.queryBuilder = queryBuilder;
        this.jdbcTemplate = jdbcTemplate;
        this.rowMapper = rowMapper;

    }

    public List<CorrectionDetails> saveCorrectionBirthDetails(CorrectionRequest request) {
        enrichment.enrichCreateCorrection(request);
        producer.push(config.getSaveDeathCorrectionTopic(), request);
        return request.getCorrectionDetails();
    }

    public List<CorrectionDetails> updateCorrectionBirthDetails(CorrectionRequest request) {
//        enrichment.enrichUpdate(request);
        producer.push(config.getUpdateDeathCorrectionTopic(), request);
        return request.getCorrectionDetails();
    }
     public List<CorrectionDetails> searchCorrectionDetails(CorrectionRequest request, DeathSearchCriteria criteria) {
         List<Object> preparedStmtValues = new ArrayList<>();
         criteria.setApplicationType("CRDRCN");
         String query = queryBuilder.getDeathSearchQuery(criteria,  preparedStmtValues, Boolean.FALSE);
         System.out.println(query);
         System.out.println(preparedStmtValues.get(0));
         System.out.println(preparedStmtValues.get(1));
         System.out.println(preparedStmtValues.get(2));
         List<CorrectionDetails> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), rowMapper);;
         return result;
     }
}
