package org.egov.kssmSnehaswanthanam.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Component
public class SnehaswanthanamConfig {
    @Value("${app.timezone}")
    private String timeZone;

    @Value("${persister.save.kssmsnehaswanthanamCreate.topic}")
    private String SnehaswanthanamCreateTopic;

    @Value("${persister.update.kssmsnehaswanthanamUpdate.topic}")
    private String SnehaswanthanamUpdateTopic;

     
   
}
