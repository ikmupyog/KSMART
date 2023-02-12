package org.ksmart.death.deathregistry.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@Component
//Config  RAkhi S ikm on 10.02.2023
public class DeathRegistryConfiguration {
   
      //Persister Config  RAkhi S ikm on 10.02.2023    
    @Value("${persister.save.deathregistry.topic}")
    private String saveDeathRegistryDetailsTopic;

    @Value("${persister.save.crdeathregistry.topic}")
    private String saveDeathRegistryTopic;

    @Value("${persister.update.crdeathregistry.topic}")
    private String updateDeathRegistryTopic;

    
    //MDMS
    @Value("${egov.mdms.host}")
    private String mdmsHost;

    @Value("${egov.mdms.search.endpoint}")
    private String mdmsEndPoint;

    //IDGen

    @Value("${egov.idgen.host}")
    private String idGenHost;

    @Value("${egov.idgen.path}")
    private String idGenPath;

    
    @Value("${egov.idgen.deathapplfilecode.name}")
    private String deathApplnFileCodeName;

    @Value("${egov.idgen.deathapplfilecode.format}")
    private String deathApplnFileCodeFormat;


    @Value("${egov.idgen.deathackno.name}")
    private String deathAckName;

    @Value("${egov.idgen.deathackno.format}")
    private String deathACKFormat;

     //Rakhi S on 16.12.2022
     @Value("${egov.ui.app.host}")
     private String uiAppHost;
 
     @Value("${egov.bnd.deathcert.link}")
     private String deathCertLink;
 
     @Value("${egov.url.shortner.host}")
     private String urlShortnerHost;
 
     @Value("${egov.url.shortner.endpoint}")
     private String urlShortnerEndpoint;
 
     @Value("${egov.pdfservice.host}")
     private String	egovPdfHost;
 
     @Value("${egov.pdf.deathcert.createEndPoint}")
     private String	egovPdfDeathEndPoint;    

    //Rakhi S on 24.12.2022 
    @Value("${egov.state.level.tenant.id}")
    private String egovStateLevelTenant;

    //Rakhi S on 12.02.2023
    @Value("${persister.save.deathcertificate.topic}")
    private String saveDeathTopic;

    @Value("${persister.update.deathcertificate.topic}")
    private String updateDeathCertificateTopic;

}
