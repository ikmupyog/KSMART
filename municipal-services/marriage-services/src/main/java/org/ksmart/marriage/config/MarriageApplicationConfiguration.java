package org.ksmart.marriage.config;

import lombok.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Component
public class MarriageApplicationConfiguration {

    @Value("${egov.idgen.host}")
    private String idGenHost;
    @Value("${egov.idgen.path}")
    private String idGenPath;
    @Value("${persister.save.marriage.application.topic}")
    private String saveMarriageApplicationTopic;


    @Value("${persister.update.marriage.application.topic}")
    private String updateMarriageApplicationTopic;
}
