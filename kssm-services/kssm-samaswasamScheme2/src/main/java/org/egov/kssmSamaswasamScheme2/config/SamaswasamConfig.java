package org.egov.kssmSamaswasamScheme2.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Component
public class SamaswasamConfig {
    @Value("${app.timezone}")
    private String timeZone;

    @Value("${persister.save.Samaswasam.topic}")
    private String saveSamaswasamTopic;

    @Value("${persister.update.Samaswasam.topic}")
    private String updateSamaswasamTopic;


    


    
   
}
