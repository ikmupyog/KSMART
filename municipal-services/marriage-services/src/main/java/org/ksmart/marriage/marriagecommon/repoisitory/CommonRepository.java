package org.ksmart.marriage.marriagecommon.repoisitory;

import lombok.extern.slf4j.Slf4j;

import org.ksmart.marriage.common.producer.MarriageProducer;
import org.ksmart.marriage.marriageapplication.config.MarriageApplicationConfiguration;
import org.ksmart.marriage.marriagecommon.model.common.CommonPay;
import org.ksmart.marriage.marriagecommon.model.common.CommonPayRequest;
// import org.ksmart.birth.birthcommon.model.common.CommonPay;
// import org.ksmart.birth.birthcommon.model.common.CommonPayRequest;
// import org.ksmart.birth.common.producer.BndProducer;
// import org.ksmart.birth.config.BirthConfiguration;
// import org.ksmart.birth.web.model.newbirth.NewBirthApplication;
// import org.ksmart.birth.web.model.newbirth.NewBirthDetailRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Slf4j
@Repository
public class CommonRepository {
    private final MarriageProducer producer;

    private final MarriageApplicationConfiguration marriageConfiguration;
    @Autowired
    CommonRepository(MarriageProducer producer, MarriageApplicationConfiguration marriageConfiguration){
        this.producer = producer;
        this.marriageConfiguration = marriageConfiguration;
    }
    public List<CommonPay> updatePaymentDetails(CommonPayRequest request) {
        producer.push(marriageConfiguration.getUpdateDemandTopic(), request);
        return request.getCommonPays();
    }
}
