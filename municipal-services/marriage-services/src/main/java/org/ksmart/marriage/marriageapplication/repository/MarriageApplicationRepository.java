package org.ksmart.marriage.marriageapplication.repository;

import lombok.extern.slf4j.Slf4j;
import org.ksmart.marriage.common.producer.BndProducer;
import org.ksmart.marriage.config.MarriageConfiguration;
import org.ksmart.marriage.marriageapplication.enrichment.birth.MarriageDetailsEnrichment;
import org.ksmart.marriage.marriageapplication.model.marriage.BirthApplicationSearchCriteria;
import org.ksmart.marriage.marriageapplication.model.MarriageApplicationDetail;
import org.ksmart.marriage.marriageapplication.model.marriage.BirthDetailsRequest;
import org.ksmart.marriage.marriageapplication.repository.querybuilder.BirthApplicationQueryBuilder;
import org.ksmart.marriage.marriageapplication.repository.rowmapper.BirthApplicationRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Repository
public class BirthApplicationRepository {

    private final BndProducer producer;
    private final MarriageConfiguration birthDeathConfiguration;
    private final JdbcTemplate jdbcTemplate;
    private final BirthApplicationQueryBuilder birthQueryBuilder;
    private final BirthApplicationRowMapper birthApplicationRowMapper;
    private final MarriageDetailsEnrichment birthDetailsEnrichment;

    @Autowired
    BirthApplicationRepository(JdbcTemplate jdbcTemplate, BirthApplicationQueryBuilder birthQueryBuilder,
                               BirthApplicationRowMapper birthApplicationRowMapper, MarriageDetailsEnrichment birthDetailsEnrichment,
                               MarriageConfiguration birthDeathConfiguration, BndProducer producer) {
        this.jdbcTemplate = jdbcTemplate;
        this.birthQueryBuilder = birthQueryBuilder;
        this.birthApplicationRowMapper = birthApplicationRowMapper;
        this.birthDetailsEnrichment = birthDetailsEnrichment;
        this.birthDeathConfiguration = birthDeathConfiguration;
        this.producer = producer;
    }

    public List<MarriageApplicationDetail> saveBirthDetails(BirthDetailsRequest request) {
        birthDetailsEnrichment.enrichCreate(request);
        producer.push(birthDeathConfiguration.getSaveBirthApplicationTopic(), request);
        return request.getBirthDetails();
    }


    public List<MarriageApplicationDetail> updateBirthDetails(BirthDetailsRequest request) {
        birthDetailsEnrichment.enrichUpdate(request);
        producer.push(birthDeathConfiguration.getUpdateBirthApplicationTopic(), request);
        return request.getBirthDetails();
    }

    public List<MarriageApplicationDetail> searchBirthDetails(BirthApplicationSearchCriteria criteria) {
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = birthQueryBuilder.getBirthApplicationSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
        List<MarriageApplicationDetail> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), birthApplicationRowMapper);
        return result;
    }
}
