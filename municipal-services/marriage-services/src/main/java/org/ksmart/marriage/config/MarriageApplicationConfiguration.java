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

//     @Value("persister.save.marriage.application.topic")
//     private String saveMarriageApplicationTopic;
     @Value("${persister.update.marriage.application.topic}")
     private String updateMarriageApplicationTopic;

    @Value("${egov.idgen.marriagehapp.name}")
    private String marriageApplNumberIdName;

    @Value("${egov.idgen.marriagefile.name}")
    private String marriageFileNumberName;

    @Value("${egov.idgen.marriagereg.name}")
    private String getMarriageRegisNumberName;

    //Jasmine 24.03.2023

    @Value("${persister.save.marriage.registry.topic}")
    private String SaveMarriageRegistryTopic;

    @Value("${persister.update.marriage.registry.topic}")
    private String UpdateMarriageRegistryTopic;
    

    @Value("${egov.bnd.default.limit}")
    private Integer defaultBndLimit;

    @Value("${egov.bnd.default.offset}")
    private Integer defaultOffset;

    @Value("${egov.bnd.max.limit}")
    private Integer maxSearchLimit;

}
