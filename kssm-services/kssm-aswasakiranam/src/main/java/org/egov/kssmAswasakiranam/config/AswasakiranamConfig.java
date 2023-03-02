package org.egov.kssmAswasakiranam.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Component
public class AswasakiranamConfig {
    @Value("${app.timezone}")
    private String timeZone;

    @Value("${persister.save.aswasakiranam.topic}")
    private String saveAswasakiranamTopic;

    @Value("${persister.update.aswasakiranam.topic}")
    private String updateAswasakiranamTopic;




    
   
}
