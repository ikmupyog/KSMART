package org.ksmart.marriage.marriagecorrection.repository;

import lombok.extern.slf4j.Slf4j;
import org.egov.common.contract.request.RequestInfo;
import org.ksmart.marriage.common.producer.MarriageProducer;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageapplication.repository.querybuilder.MarriageApplicationQueryBuilder;
import org.ksmart.marriage.marriageapplication.repository.rowmapper.MarriageApplicationRowMapper;
import org.ksmart.marriage.marriageapplication.validator.MarriageMDMSValidator;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageApplicationSearchCriteria;
import org.ksmart.marriage.marriagecorrection.repository.querybuilder.CorrectionApplicationQueryBuilder;
import org.ksmart.marriage.marriagecorrection.repository.rowmapper.CorrectionApplicationRowMapper;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionDetails;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionRequest;
import org.ksmart.marriage.utils.MarriageMdmsUtil;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Repository
public class MarriageCorrectionRepository {

    private final MarriageProducer producer;
    private final MarriageApplicationConfiguration marriageApplicationConfiguration;
    private final MarriageMdmsUtil util;
    private final MarriageMDMSValidator mdmsValidator;
    private final MarriageApplicationQueryBuilder marriageQueryBuilder;
    private final JdbcTemplate jdbcTemplate;
    private final MarriageApplicationRowMapper marriageApplicationRowMapper;
    private final CorrectionApplicationQueryBuilder correctionApplicationQueryBuilder;
    private final CorrectionApplicationRowMapper correctionApplicationRowMapper;

    public MarriageCorrectionRepository(MarriageProducer producer, MarriageApplicationConfiguration marriageApplicationConfiguration, MarriageMdmsUtil util, MarriageMDMSValidator mdmsValidator, MarriageApplicationQueryBuilder marriageQueryBuilder, JdbcTemplate jdbcTemplate, MarriageApplicationRowMapper marriageApplicationRowMapper, CorrectionApplicationQueryBuilder correctionApplicationQueryBuilder, CorrectionApplicationRowMapper correctionApplicationRowMapper) {
        this.producer = producer;
        this.marriageApplicationConfiguration = marriageApplicationConfiguration;
        this.util = util;
        this.mdmsValidator = mdmsValidator;
        this.marriageQueryBuilder = marriageQueryBuilder;
        this.jdbcTemplate = jdbcTemplate;
        this.marriageApplicationRowMapper = marriageApplicationRowMapper;
        this.correctionApplicationQueryBuilder = correctionApplicationQueryBuilder;
        this.correctionApplicationRowMapper = correctionApplicationRowMapper;
    }


    public List<MarriageApplicationDetails> saveCorrectionDetails(MarriageCorrectionRequest request) {

//        Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getMarriageDetails().get(0).getTenantid());
//        //mdmsValidator.validateMarriageMDMSData(request,mdmsData);
//
//        producer.push(marriageApplicationConfiguration.getSaveMarriageCorrectionTopic(), request);

        return request.getMarriageDetails();
    }

//
//
//    public List<MarriageApplicationDetails> searchMarriageDetails(MarriageApplicationSearchCriteria criteria, RequestInfo requestInfo) {
//        List<Object> preparedStmtValues = new ArrayList<>();
//        String query = marriageQueryBuilder.getMarriageApplicationSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
//        List<MarriageApplicationDetails> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriageApplicationRowMapper);
//
//        return result;
//    }

//    public List<MarriageApplicationDetails> searchMarriageCorrectionApplnDetails(MarriageApplicationSearchCriteria criteria) {
//        List<Object> preparedStmtValues = new ArrayList<>();
//        String query = marriageQueryBuilder.getMarriageApplicationSearchQuery(criteria, preparedStmtValues, Boolean.FALSE);
//        List<MarriageApplicationDetails> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), marriageApplicationRowMapper);
//
//        return result;
//    }

    public List<MarriageCorrectionDetails> searchCorrectionDetails(String marriageid) {
        List<Object> preparedStmtValues = new ArrayList<>();
        String query = correctionApplicationQueryBuilder.getMarriageCorrectionSearchQueryByMarriageId(marriageid, preparedStmtValues, Boolean.FALSE);
        List<MarriageCorrectionDetails> result = jdbcTemplate.query(query, preparedStmtValues.toArray(), correctionApplicationRowMapper);

        return result;
    }

}
