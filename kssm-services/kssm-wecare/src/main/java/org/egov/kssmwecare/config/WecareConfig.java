package org.egov.kssmwecare.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Component
public class WecareConfig {
    @Value("${app.timezone}")
    private String timeZone;

    @Value("${persister.save.wecare.topic}")
    private String saveWecareTopic;

    @Value("${persister.update.wecare.topic}")
    private String updateWecareTopic;




    
   
}
