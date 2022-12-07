package org.bel.birthdeath.birthregistry.repository;

import lombok.extern.slf4j.Slf4j;
import org.bel.birthdeath.birthregistry.enrichment.RegisterBirthDetailsEnrichment;
import org.bel.birthdeath.birthregistry.model.RegisterBirthDetail;
import org.bel.birthdeath.birthregistry.model.RegisterBirthDetailsRequest;
import org.bel.birthdeath.birthregistry.model.RegisterBirthSearchCriteria;
import org.bel.birthdeath.common.producer.BndProducer;
import org.bel.birthdeath.config.BirthDeathConfiguration;
import org.bel.birthdeath.crbirth.model.BirthDetail;
import org.bel.birthdeath.crbirth.repository.querybuilder.BirthApplicationQueryBuilder;
import org.bel.birthdeath.crbirth.repository.rowmapper.BirthApplicationRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
@Slf4j
@Repository
public class RegisterBirthRepository {
    private final BndProducer producer;
    private final BirthDeathConfiguration birthDeathConfiguration;
    private final JdbcTemplate jdbcTemplate;
    private final RegisterBirthDetailsEnrichment registerBirthDetailsEnrichment;
//    private final BirthApplicationQueryBuilder birthQueryBuilder;
//    private final BirthApplicationRowMapper birthApplicationRowMapper;

    @Autowired
    RegisterBirthRepository(JdbcTemplate jdbcTemplate, RegisterBirthDetailsEnrichment registerBirthDetailsEnrichment,
                      BirthDeathConfiguration birthDeathConfiguration, BndProducer producer) {
        this.jdbcTemplate = jdbcTemplate;
        this.registerBirthDetailsEnrichment = registerBirthDetailsEnrichment;
        this.birthDeathConfiguration = birthDeathConfiguration;
        this.producer = producer;
    }
    public List<RegisterBirthDetail> saveRegisterBirthDetails(RegisterBirthDetailsRequest request) {
        registerBirthDetailsEnrichment.enrichCreate(request);
        producer.push(birthDeathConfiguration.getSaveBirthRegisterTopic(), request);
        return request.getRegisterBirthDetails();
    }

    public List<RegisterBirthDetail> updateRegisterBirthDetails(RegisterBirthDetailsRequest request) {
        registerBirthDetailsEnrichment.enrichUpdate(request);
        producer.push(birthDeathConfiguration.getUpdateBirthRegisterTopic(), request);
        return request.getRegisterBirthDetails();
    }

//    public List<RegisterBirthDetail> searchRegisterBirthDetails(RegisterBirthSearchCriteria criteria) {
//        List<Object> preparedStmtValues = new ArrayList<>();
//        String query = birthQueryBuilder.getBirthApplicationSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
//        List<BirthDetail> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), birthApplicationRowMapper);
//        return result;
//    }
}
