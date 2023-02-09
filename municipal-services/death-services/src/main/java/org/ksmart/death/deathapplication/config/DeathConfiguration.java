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
     
}
