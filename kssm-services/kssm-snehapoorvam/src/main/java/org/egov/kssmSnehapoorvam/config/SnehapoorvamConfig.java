package org.egov.kssmSnehapoorvam.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Component
public class SnehapoorvamConfig {
    @Value("${app.timezone}")
    private String timeZone;

    @Value("${persister.save.kssmsnehapoorvamCreate.topic}")
    private String saveSnehapoorvamCreateTopic;

    @Value("${persister.update.kssmsnehapoorvamUpdate.topic}")
    private String saveSnehapoorvamUpdateTopic;

    @Value("${persister.save.kssmsnehapoorvamSchoolCreate.topic}")
    private String saveSnehapoorvamSchoolCreateTopic;

    @Value("${persister.update.kssmsnehapoorvamSchoolUpdate.topic}")
    private String saveSnehapoorvamSchoolUpdateTopic;




    
   
}
