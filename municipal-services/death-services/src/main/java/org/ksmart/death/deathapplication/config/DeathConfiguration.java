package org.ksmart.death.deathapplication.config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
     * Creates DeathConfiguration 
     * Rakhi S IKM
     * on 08.02.2023
     */
@Getter
@Setter
@NoArgsConstructor
@Component
public class DeathConfiguration {
    
    //Rakhi S on 08.02.2023
    @Value("${egov.state.level.tenant.id}")
    private String egovStateLevelTenant;

     //MDMS
     @Value("${egov.mdms.host}")
     private String mdmsHost;
 
     @Value("${egov.mdms.search.endpoint}")
     private String mdmsEndPoint;

     //Persister Config
     @Value("${persister.save.deathappln.topic}")
     private String saveDeathDetailsTopic;

     @Value("${persister.update.deathappln.topic}")
     private String updateDeathDetailsTopic;

     //Jasmine 09.02.2023
     @Value("${egov.workflow.host}")
     private String wfHost;
 
     @Value("${egov.workflow.path}")
     private String wfTransitionPath;

     //Rakhi S on 27.02.2023
	@Value("${egov.bnd.default.limit}")
     private Integer defaultBndLimit;
       
     @Value("${egov.bnd.default.offset}")
     private Integer defaultOffset;
       
     @Value("${egov.bnd.max.limit}")
     private Integer maxSearchLimit;

     //Jasmine 04.03.2023

     @Value("${persister.save.deathcorrection.topic}")
     private String saveDeathCorrectionTopic;

     @Value("${persister.update.deathcorrection.topic}")
     private String updateDeathCorrectionTopic;
     

     //Persister Abandoned - Rakhi S on 06.03.2023
     @Value("${persister.save.deathabandoned.topic}")
     private String saveDeathAbandonedTopic;
    
}
