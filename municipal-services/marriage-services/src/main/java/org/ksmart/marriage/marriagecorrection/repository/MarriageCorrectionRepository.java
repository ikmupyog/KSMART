package org.ksmart.marriage.marriagecorrection.repository;

import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.ksmart.marriage.common.producer.MarriageProducer;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriageapplication.validator.MarriageMDMSValidator;
import org.ksmart.marriage.marriageapplication.web.model.MarriageApplicationDetails;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionRequest;
import org.ksmart.marriage.utils.MarriageMdmsUtil;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
public class MarriageCorrectionRepository {

    private final MarriageProducer producer;
    private final MarriageApplicationConfiguration marriageApplicationConfiguration;
    private final MarriageMdmsUtil util;
    private final MarriageMDMSValidator mdmsValidator;

    public MarriageCorrectionRepository(MarriageProducer producer, MarriageApplicationConfiguration marriageApplicationConfiguration, MarriageMdmsUtil util, MarriageMDMSValidator mdmsValidator) {
        this.producer = producer;
        this.marriageApplicationConfiguration = marriageApplicationConfiguration;
        this.util = util;
        this.mdmsValidator = mdmsValidator;
    }


    public List<MarriageApplicationDetails> saveCorrectionDetails(MarriageCorrectionRequest request) {

//        Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getMarriageDetails().get(0).getTenantid());
//        //mdmsValidator.validateMarriageMDMSData(request,mdmsData);
//
//        producer.push(marriageApplicationConfiguration.getSaveMarriageCorrectionTopic(), request);

        return request.getMarriageDetails();
    }

}
