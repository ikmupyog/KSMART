package org.ksmart.death.deathapplication.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import org.ksmart.death.deathapplication.config.DeathConfiguration;
import org.ksmart.death.deathapplication.enrichment.DeathEnrichment;
import org.ksmart.death.deathapplication.kafka.producer.DeathProducer;
import org.ksmart.death.deathapplication.repository.DeathApplnRepository;
import org.ksmart.death.deathapplication.util.DeathMdmsUtil;
import org.ksmart.death.deathapplication.validators.DeathApplnValidator;
import org.ksmart.death.deathapplication.validators.MDMSValidator;
import org.ksmart.death.deathapplication.web.models.DeathDtl;
import org.ksmart.death.deathapplication.web.models.DeathDtlRequest;
import org.ksmart.death.deathapplication.web.models.DeathSearchCriteria;
import org.ksmart.death.workflow.WorkflowIntegrator;
import org.egov.common.contract.request.RequestInfo;

/**
     * Creates DeathService
     * Jasmine on 06.02.2023
     * 
     */

@Service
public class DeathApplnService {

     private final DeathProducer producer;
     //Rakhi S ikm on 08.02.2023
     private final DeathEnrichment enrichmentService;
     private final DeathConfiguration deathConfig;
   //  private final DeathEnrichment enrichmentService;
   //  private final DeathMdmsUtil util;
     private final WorkflowIntegrator workflowIntegrator;
   //  private final MDMSValidator mdmsValidator;
     private final DeathApplnValidator validatorService;
     private final DeathApplnRepository repository;

     //Rakhi S ikm on 08.02.2023
     @Autowired
     DeathApplnService(DeathApplnRepository repository ,DeathProducer producer
                         ,DeathEnrichment enrichmentService,DeathApplnValidator validatorService,DeathConfiguration deathConfig
                         ,WorkflowIntegrator workflowIntegrator){
          
     //,DeathConfiguration deathConfig
     //             DeathEnrichment enrichmentService,DeathMdmsUtil util,MDMSValidator mdmsValidator,
     //             ,,){

       //  this.deathConfig = deathConfig;
      //   
       //  this.enrichmentService = enrichmentService;
       //  this.util = util;
       //  this.mdmsValidator = mdmsValidator;
         this.validatorService = validatorService;
         this.producer = producer;
         this.deathConfig = deathConfig;
         this.enrichmentService = enrichmentService;
         this.repository = repository;
         this.workflowIntegrator = workflowIntegrator;
     }

     //RAkhi S ikm  on 06.02.2023
     public List<DeathDtl> create(DeathDtlRequest request) {
          enrichmentService.enrichCreate(request);
          enrichmentService.setACKNumber(request); 
          producer.push(deathConfig.getSaveDeathDetailsTopic(), request);
          return request.getDeathCertificateDtls();
     }

    //Jasmine Search 06.02.2023
    public List<DeathDtl> search(DeathSearchCriteria criteria, RequestInfo requestInfo) {
          return repository.getDeathApplication(criteria);
     }

     //Jasmine  Update 07.02.2023
     public List<DeathDtl> update(DeathDtlRequest request) {
      
          String ackNumber = request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getDeathACKNo();
          System.out.println("ackNo"+ackNumber);
          List<DeathDtl> searchResult = repository.getDeathApplication(DeathSearchCriteria
                                                    .builder()
                                                    .deathACKNo(ackNumber)
                                                    //.id(id)
                                                    .build());
         // System.out.println("searchResult"+searchResult);
          validatorService.validateUpdate(request, searchResult);
         // mdmsValidator.validateMDMSData(request,mdmsData);
         DeathDtlRequest result = DeathDtlRequest
                                  .builder()
                                  .requestInfo(request.getRequestInfo())
                                  .deathCertificateDtls(searchResult)
                                  .build();
          //Jasmine 09.02.2023                        
          enrichmentService.enrichUpdate(request);
        //  workflowIntegrator.callWorkFlow(request);
          producer.push(deathConfig.getUpdateDeathDetailsTopic(), request);
          return result.getDeathCertificateDtls();
     }    
}
             /********************************************* */

     //         try {
     //           ObjectMapper mapper = new ObjectMapper();
     //           Object obj = request;
     //           mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
     //           System.out.println("rakhi3 "+ mapper.writeValueAsString(obj));
     // }catch(Exception e) {
     //      //   log.error("Exception while fetching from searcher: ",e);
     // }


/********************************************** */