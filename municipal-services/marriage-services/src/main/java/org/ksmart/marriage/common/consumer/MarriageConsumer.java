package org.ksmart.marriage.common.consumer;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.ksmart.marriage.marriageapplication.web.model.marriage.MarriageDetailsRequest;
import org.ksmart.marriage.marriagecommon.services.notification.MarriageNotificationService;
import org.ksmart.marriage.marriagecorrection.web.model.MarriageCorrectionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;

import java.util.HashMap;

@Slf4j
@Component
public class MarriageConsumer {

    private MarriageNotificationService marriageNotificationService;
    @Autowired
    public MarriageConsumer(MarriageNotificationService marriageNotificationService ) {
        this.marriageNotificationService=marriageNotificationService;
    }

    @KafkaListener(topics = {"${persister.save.marriage.application.topic}","${persister.update.marriage.application.topic}"})
    public void listen(final HashMap<String, Object> record, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic) {
        ObjectMapper mapper = new ObjectMapper();
        MarriageDetailsRequest request = new MarriageDetailsRequest();
        System.out.println("Inside kafka listner topic for notificaton..................");
        try {
            request = mapper.convertValue(record, MarriageDetailsRequest.class);
        } catch (final Exception e) {
            log.error("Error while listening to value: " + record + " on topic: " + topic + ": " + e);
        }

        marriageNotificationService.process(request.getRequestInfo(),request.getMarriageDetails());
    }

    @KafkaListener(topics = {"${persister.save.marriage.correction.topic}","${persister.update.marriage.application.correction.topic}"})
    public void listenCorrection(final HashMap<String, Object> record, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic) {
        ObjectMapper mapper = new ObjectMapper();
        MarriageCorrectionRequest request = new MarriageCorrectionRequest();
        System.out.println("Inside kafka listner correction topic for notificaton..................");
        try {
            request = mapper.convertValue(record, MarriageCorrectionRequest.class);
        } catch (final Exception e) {
            log.error("Error while listening to value: " + record + " on topic: " + topic + ": " + e);
        }

        marriageNotificationService.process(request.getRequestInfo(),request.getMarriageDetails());
    }
}
