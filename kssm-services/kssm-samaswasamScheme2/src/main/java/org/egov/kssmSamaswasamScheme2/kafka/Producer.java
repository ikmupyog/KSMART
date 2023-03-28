package org.egov.kssmSamaswasamScheme2.kafka;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import lombok.extern.slf4j.Slf4j;

import org.egov.tracer.kafka.CustomKafkaTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.egov.tracer.kafka.CustomKafkaTemplate;
@Slf4j
@Service
public class Producer {

    @Autowired
    private CustomKafkaTemplate<String, Object> kafkaTemplate;

    public void push(String topic, Object value) {

        System.out.println(topic);

        try {
            ObjectMapper mapper = new ObjectMapper();
            Object obj = value;
            mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
            System.out.println("Push OB "+ mapper.writeValueAsString(obj));
        }catch(Exception e) {
            log.error("Exception while fetching from searcher: ",e);
        }
        kafkaTemplate.send(topic, value);
    }

}
