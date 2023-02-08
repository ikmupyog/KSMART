package org.ksmart.death.deathregistry.service;

import java.util.List;
import java.util.UUID;


import org.egov.tracer.model.CustomException;
import org.ksmart.death.deathregistry.config.DeathRegistryConfiguration;
import org.ksmart.death.deathregistry.kafka.producer.DeathRegistryProducer;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCriteria;
import org.ksmart.death.deathregistry.web.models.DeathRegistryDtl;
import org.ksmart.death.deathregistry.web.models.DeathRegistryRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

/**
     * Creates CrDeathService
     * Jasmine IKM
     * on 07.02.2023
     */
 @Service
 
public class DeathRegistryService {

     private final DeathRegistryProducer producer;
     private final DeathRegistryConfiguration deathConfig;
    // private final CrDeathRegistryEnrichment enrichmentService;
    // private final CrDeathRegistryRepository repository;
    // private final CrDeathRegistryMdmsUtil util;
    // private final RegistryMDMSValidator mdmsValidator;
    // private final CrDeathRegistryValidator validatorService;

    @Autowired
    DeathRegistryService(
      
     DeathRegistryProducer producer,DeathRegistryConfiguration deathConfig){
    // CrDeathRegistryEnrichment enrichmentService ,CrDeathRegistryRepository repository ,
    // CrDeathRegistryMdmsUtil util,RegistryMDMSValidator mdmsValidator,
    // CrDeathRegistryValidator validatorService){
         this.producer = producer;
         this.deathConfig = deathConfig;
    //     this.enrichmentService = enrichmentService;
    //     this.repository=repository;
    //     this.util=util;
    //     this.mdmsValidator=mdmsValidator;
    //     this.validatorService=validatorService;
    }


      //UPDATE BEGIN Jasmine
      public List<DeathRegistryDtl> update(DeathRegistryRequest request) {

       String regNo = request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getRegistrationNo();

       String tenantId = request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getTenantId();

        // List<DeathRegistryDtl> searchResult = repository.getDeathApplication(DeathRegistryCriteria
        //                                                                       .builder()
        //                                                                       .tenantId(tenantId)
        //                                                                       .registrationNo(regNo)
        //                                                                       .build());

        producer.push(deathConfig.getUpdateDeathRegistryTopic(), request);

        return request.getDeathCertificateDtls();
      }
    //Search  
    //  public List<DeathRegistryDtl> search(DeathRegistryCriteria criteria, RequestInfo requestInfo) {

		//     return repository.getDeathApplication(criteria);
    //  }

    
}
