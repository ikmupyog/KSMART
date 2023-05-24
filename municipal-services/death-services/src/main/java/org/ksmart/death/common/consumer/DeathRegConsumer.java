package org.ksmart.death.common.consumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;
import java.util.HashMap;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;

import org.ksmart.death.common.services.DeathNotificationService;
import org.ksmart.death.deathapplication.web.models.DeathDtlRequest;
import org.ksmart.death.deathapplication.web.models.DeathNACRequest;

@Slf4j
@Component
public class DeathRegConsumer {
	
	private DeathNotificationService notificationService;	
	@Autowired
    public DeathRegConsumer(DeathNotificationService notificationService ) {
		this.notificationService=notificationService;
	}
      
	 @KafkaListener(topics = {"${persister.save.deathappln.topic}","${persister.update.deathappln.topic}","${persister.save.deathnac.topic}"})
	    public void listen(final HashMap<String, Object> record, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic) {
	        ObjectMapper mapper = new ObjectMapper();
	        DeathDtlRequest request = new DeathDtlRequest();
	        DeathNACRequest nacRequest= new DeathNACRequest();
	        String nacTopic = "save-deathapplndetails-topic";
	        String deathTopic = "save-deathnac-topic";
	        try {
	        	 if( topic.equals(deathTopic)) {
	        	request = mapper.convertValue(record, DeathDtlRequest.class);
	        	 }
	        	 else if( topic.equals(nacTopic)) {
	        	nacRequest = mapper.convertValue(record, DeathNACRequest.class);
	         }
	        	 
	        	
	        } catch (final Exception e) {
	            log.error("Error while listening to value: " + record + " on topic: " + topic + ": " + e);
	        }
 
	        notificationService.process(request,nacRequest);
	    }
     

}
