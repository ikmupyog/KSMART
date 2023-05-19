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
     
     //Persister Abandoned Update - Rakhi S on 13.03.2023
     @Value("${persister.update.deathabandoned.topic}")
     private String updateDeathAbandonedTopic;

     //Jasmine 10.03.2023

    //Jasmine 10.03.2023
     
    @Value("${egov.idgen.deathapplnackno.name}")
    private String deathACKNumberIdName;

//     @Value("${egov.idgen.deathapplnregno.name}")
//     private String deathRegNumberIdName;

//     @Value("${egov.idgen.deathapplncertno.name}")
//     private String deathCertNumberIdName;

    

    //Idgen Config
    @Value("${egov.idgen.host}")
    private String idGenHost;
  
    @Value("${egov.idgen.path}")
    private String idGenPath;

    //Rakhi S on 21.03.2023
    @Value("${egov.billingservice.host}")
    private String billingHost;

    @Value("${egov.bill.gen.endpoint}")
    private String fetchBillEndpoint;

    @Value("${egov.demand.create.endpoint}")
    private String demandCreateEndpoint;

    //Persister NAC Save - Rakhi S on 27.03.2023
    @Value("${persister.save.deathnac.topic}")
    private String saveDeathNACTopic;

    //Persister NAC Save - Rakhi S on 30.03.2023
    @Value("${persister.update.deathnac.topic}")
    private String updateDeathNACTopic;
    
    @Value("${persister.update.death.payment.topic}")
    private String updateDeathPaymentTopic;
}
