package org.ksmart.death.deathregistry.kafka.producer;

import org.egov.tracer.kafka.CustomKafkaTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
     * Creates CrDeathProducer for kafka push 
     * Rakhi S IKM
     * on 10.02.2023
     */

@Service
public class DeathRegistryProducer {
    @Autowired
    private CustomKafkaTemplate<String, Object> kafkaTemplate;

    public void push(String topic, Object value) {
        kafkaTemplate.send(topic, value);
    }
}
