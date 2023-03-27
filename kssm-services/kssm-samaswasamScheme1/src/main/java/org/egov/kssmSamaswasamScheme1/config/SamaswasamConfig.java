package org.egov.kssmSamaswasamScheme1.config;

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

    @Value("${persister.save.samaswasam.topic}")
    private String saveSamaswasamTopic;

    @Value("${persister.update.samaswasam.topic}")
    private String updateSamaswasamTopic;

    



    
   
}
