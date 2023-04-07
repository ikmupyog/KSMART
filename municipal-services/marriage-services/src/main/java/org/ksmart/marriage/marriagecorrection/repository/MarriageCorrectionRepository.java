package org.ksmart.marriage.marriagecorrection.repository;

import lombok.extern.slf4j.Slf4j;
import org.ksmart.marriage.common.producer.MarriageProducer;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageapplication.enrichment.MarriageDetailsEnrichment;
import org.ksmart.marriage.marriageapplication.validator.MarriageMDMSValidator;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.utils.MarriageMdmsUtil;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
public class MarriageCorrectionRepository {

    private final MarriageProducer producer;
    private final MarriageApplicationConfiguration marriageApplicationConfiguration;

    private final MarriageDetailsEnrichment marriageDetailsEnrichment;
    private final MarriageMdmsUtil util;
    private final MarriageMDMSValidator mdmsValidator;

    public MarriageCorrectionRepository(MarriageProducer producer, MarriageApplicationConfiguration marriageApplicationConfiguration, MarriageDetailsEnrichment marriageDetailsEnrichment, MarriageMdmsUtil util, MarriageMDMSValidator mdmsValidator) {
        this.producer = producer;
        this.marriageApplicationConfiguration = marriageApplicationConfiguration;
        this.marriageDetailsEnrichment = marriageDetailsEnrichment;
        this.util = util;
        this.mdmsValidator = mdmsValidator;
    }


    public List<MarriageApplicationDetails> saveCorrectionDetails(MarriageDetailsRequest request) {

        Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getMarriageDetails().get(0).getTenantid());
        //mdmsValidator.validateMarriageMDMSData(request,mdmsData);
        marriageDetailsEnrichment.enrichCreate(request);

        producer.push(marriageApplicationConfiguration.getSaveMarriageCorrectionTopic(), request);

        //producer.push(marriageApplicationConfiguration.getSaveMarriageCorrectionTopic(), request);
        return request.getMarriageDetails();
    }

}
