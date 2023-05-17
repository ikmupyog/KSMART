package org.ksmart.marriage.common.repository;

import lombok.extern.slf4j.Slf4j;
import net.logstash.logback.encoder.org.apache.commons.lang.StringUtils;
import org.egov.common.contract.request.RequestInfo;
import org.egov.tracer.model.CustomException;
import org.ksmart.marriage.common.model.common.CommonPay;
import org.ksmart.marriage.common.model.common.CommonPayRequest;
// import org.ksmart.birth.birthcommon.model.common.CommonPay;
// import org.ksmart.birth.birthcommon.model.common.CommonPayRequest;
 import org.ksmart.marriage.common.producer.MarriageProducer;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
// import org.ksmart.birth.common.repository.builder.CommonQueryBuilder;
// import org.ksmart.birth.config.BirthConfiguration;
// import org.ksmart.birth.newbirth.enrichment.NewBirthResponseEnrichment;
// import org.ksmart.birth.newbirth.repository.rowmapper.BirthApplicationRowMapper;
// import org.ksmart.birth.utils.enums.ErrorCodes;
// import org.ksmart.birth.web.model.SearchCriteria;
// import org.ksmart.birth.web.model.newbirth.NewBirthApplication;
// import org.ksmart.birth.web.model.newbirth.NewBirthDetailRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Repository
public class CommonRepository {
    // @Autowired
    // CommonQueryBuilder commonQueryBuilder;

    @Autowired
    MarriageApplicationConfiguration config;

    private final MarriageProducer producer;

     @Autowired
     CommonRepository(MarriageProducer producer){
         this.producer = producer;
     }
    public List<CommonPay> updatePaymentDetails(CommonPayRequest request) {   
    	 
        producer.push(config.getUpdateMarriagePaymentTopic(), request);
        return request.getCommonPays();
    }


}
