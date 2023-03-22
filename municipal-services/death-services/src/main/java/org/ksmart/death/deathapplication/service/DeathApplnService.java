package org.ksmart.death.deathapplication.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import org.ksmart.death.deathapplication.config.DeathConfiguration;
import org.ksmart.death.deathapplication.enrichment.DeathEnrichment;
import org.ksmart.death.deathapplication.kafka.producer.DeathProducer;
import org.ksmart.death.deathapplication.repository.DeathApplnRepository;
import org.ksmart.death.deathapplication.util.DeathConstants;
import org.ksmart.death.deathapplication.util.DeathMdmsUtil;
import org.ksmart.death.deathapplication.validators.DeathApplnValidator;
import org.ksmart.death.deathapplication.validators.DeathMDMSValidator;
import org.ksmart.death.deathapplication.web.models.DeathAbandonedDtls;
import org.ksmart.death.deathapplication.web.models.DeathAbandonedRequest;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionDtls;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionRequest;
import org.ksmart.death.deathapplication.web.models.DeathDtl;
import org.ksmart.death.deathapplication.web.models.DeathDtlRequest;
import org.ksmart.death.deathapplication.web.models.DeathSearchCriteria;
import org.ksmart.death.deathapplication.web.models.Demand.Demand;
import org.ksmart.death.workflow.WorkflowIntegrator;
import org.egov.common.contract.request.RequestInfo;

/**
     * Creates DeathService
     * Jasmine on 06.02.2023
     * 
     */
   import com.fasterxml.jackson.databind.ObjectMapper;
    import com.fasterxml.jackson.databind.SerializationFeature;
    
    import lombok.extern.slf4j.Slf4j;
    
    /**
         * Creates CrDeathService
         * Jasmine IKM
         * on 07.02.2023
         * DeathRegistryService create Rakhi S on 09.02.2023
         */
    

    
       @Slf4j
@Service
public class DeathApplnService {

     private final DeathProducer producer;
     //Rakhi S ikm on 08.02.2023
     private final DeathEnrichment enrichmentService;
     private final DeathConfiguration deathConfig;
     private final DeathMdmsUtil util;
     private final WorkflowIntegrator workflowIntegrator;
     private final DeathApplnValidator validatorService;
     private final DeathApplnRepository repository;
     //RAkhi S on 14.02.2023
      private final DeathMDMSValidator mdmsValidator;

     //Rakhi S ikm on 08.02.2023

     DeathApplnService(DeathApplnRepository repository ,DeathProducer producer
                         ,DeathEnrichment enrichmentService,DeathApplnValidator validatorService,DeathConfiguration deathConfig
                         ,WorkflowIntegrator workflowIntegrator,DeathMdmsUtil util
                         ,DeathMDMSValidator mdmsValidator){

         this.mdmsValidator = mdmsValidator;
         this.validatorService = validatorService;
         this.producer = producer;
         this.deathConfig = deathConfig;
         this.enrichmentService = enrichmentService;
         this.repository = repository;
         this.workflowIntegrator = workflowIntegrator;
         this.util = util;
     }

     //RAkhi S ikm  on 06.02.2023
     public List<DeathDtl> create(DeathDtlRequest request) {
          // Rakhi S IKM validate mdms data on 14.02.2023
          Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getTenantId());
          mdmsValidator.validateDeathMDMSData(request,mdmsData);
          //Rakhi S ikm on 08.02.2023
          enrichmentService.setPresentAddress(request);
          enrichmentService.setPermanentAddress(request);
          enrichmentService.enrichCreate(request);
          enrichmentService.setACKNumber(request);           
         //RAkhi S ikm  on 06.02.2023         
          producer.push(deathConfig.getSaveDeathDetailsTopic(), request);
          workflowIntegrator.callWorkFlow(request);

          //Rakhi S on 21.03.2023
          request.getDeathCertificateDtls().forEach(death->{
               if(death.getApplicationStatus() == DeathConstants.STATUS_FOR_PAYMENT){
                   List<Demand> demands = new ArrayList<>();
                   Demand demand = new Demand();
                   demand.setTenantId(death.getDeathBasicInfo().getTenantId());
                   demand.setConsumerCode(death.getDeathBasicInfo().getDeathACKNo());
                   demands.add(demand);
                   enrichmentService.saveDemand(request.getRequestInfo(),demands);
               }
           });         

          return request.getDeathCertificateDtls();
     }

    //Jasmine Search 06.02.2023
    public List<DeathDtl> search(DeathSearchCriteria criteria, RequestInfo requestInfo) {
          return repository.getDeathApplication(criteria, requestInfo);
     }

     //Jasmine  Update 07.02.2023
     public List<DeathDtl> update(DeathDtlRequest request) {
          
          enrichmentService.setPresentAddress(request);
          enrichmentService.setPermanentAddress(request);
          String ackNumber = request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getDeathACKNo();
          DeathSearchCriteria criteria =(DeathSearchCriteria.builder()
                                        .deathACKNo(ackNumber)
                                        .build());

          List<DeathDtl> searchResult = repository.getDeathApplication(criteria,request.getRequestInfo());
          validatorService.validateUpdate(request, searchResult);
         // mdmsValidator.validateMDMSData(request,mdmsData);

          //Jasmine 09.02.2023                        
          enrichmentService.enrichUpdate(request);
   
          //Jasmine 13.02.2023
          workflowIntegrator.callWorkFlow(request);
          producer.push(deathConfig.getUpdateDeathDetailsTopic(), request);
          
          // List<DeathDtl> response = new ArrayList<>();
          
          DeathDtlRequest result = DeathDtlRequest
                                   .builder()
                                   .requestInfo(request.getRequestInfo())
                                   .deathCertificateDtls(request.getDeathCertificateDtls())
                                   .build();
          return result.getDeathCertificateDtls();
     } 
     //Jasmine 03.03.2023
     public List<DeathCorrectionDtls> createcorrection(DeathCorrectionRequest request) {
          //  Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getTenantId());
            enrichmentService.setCorrectionPresentAddress(request);
            enrichmentService.setCorrectionPermanentAddress(request);
            enrichmentService.enrichCreateCorrection(request);
            enrichmentService.setCorrectionACKNumber(request);                  
            producer.push(deathConfig.getSaveDeathCorrectionTopic(), request);
            workflowIntegrator.callCorrectionWorkFlow(request);
            return request.getDeathCorrection();
       }   

     //Jasmine  Update 07.02.2023
     public List<DeathCorrectionDtls> updateCorrection(DeathCorrectionRequest request) {
          
          enrichmentService.setCorrectionPresentAddress(request);
          enrichmentService.setCorrectionPermanentAddress(request);
          String ackNumber = request.getDeathCorrection().get(0).getDeathCorrectionBasicInfo().getDeathACKNo();
         // System.out.println("CorrectionackNumber"+ackNumber);
          DeathSearchCriteria criteria =(DeathSearchCriteria.builder()
                                        .deathACKNo(ackNumber)
                                        .build());
          List<DeathCorrectionDtls> searchResult = repository.getDeathCorrection(criteria,request.getRequestInfo());
         // System.out.println("JasmineSearchResult");
           validatorService.validateCorrectionUpdate(request, searchResult);
         // mdmsValidator.validateMDMSData(request,mdmsData);

 
          enrichmentService.enrichUpdateCorrection(request);
          workflowIntegrator.callCorrectionWorkFlow(request);

          // try {
          //      ObjectMapper mapper = new ObjectMapper();
          //      Object obj = request;
          //      mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
          //     System.out.println("CorrectionAddress "+ mapper.writeValueAsString(obj));
          //         }catch(Exception e) {
          //         log.error("Exception while fetching from searcher: ",e);
          //     }
          producer.push(deathConfig.getUpdateDeathCorrectionTopic(), request);
          // List<DeathCorrectionDtls> response = new ArrayList<>();
          DeathCorrectionRequest result = DeathCorrectionRequest
                                   .builder()
                                   .requestInfo(request.getRequestInfo())
                                   .deathCorrection(request.getDeathCorrection())
                                   .build();
          return result.getDeathCorrection();
     } 

      //RAkhi S ikm  on 06.03.2023 - Service to create Abandoned request
      public List<DeathAbandonedDtls> createAbandoned(DeathAbandonedRequest request) {

          enrichmentService.setAbandonedPresentAddress(request);
          enrichmentService.setAbandonedPermanentAddress(request);
          enrichmentService.enrichCreateAbandoned(request);
          enrichmentService.setAbandonedACKNumber(request);            
          producer.push(deathConfig.getSaveDeathAbandonedTopic(), request);
          workflowIntegrator.callWorkFlowAbandoned(request);
          return request.getDeathAbandonedDtls();
     }
     //RAkhi S ikm  on 08.03.2023 - Service to update Abandoned request
     public List<DeathAbandonedDtls> updateAbandoned(DeathAbandonedRequest request) {
          
          enrichmentService.setAbandonedPresentAddress(request);
          enrichmentService.setAbandonedPermanentAddress(request);
          String ackNumber = request.getDeathAbandonedDtls().get(0).getDeathBasicInfo().getDeathACKNo();
          DeathSearchCriteria criteria =(DeathSearchCriteria.builder()
                                        .deathACKNo(ackNumber)
                                        .build());

          List<DeathAbandonedDtls> searchResult = repository.getDeathAbandoned(criteria,request.getRequestInfo());
          //// System.out.println("searchresult:"+searchResult);
          validatorService.validateAbandonedUpdate(request, searchResult);                   
          enrichmentService.enrichAbandonedUpdate(request);
          workflowIntegrator.callWorkFlowAbandoned(request);
          producer.push(deathConfig.getUpdateDeathAbandonedTopic(), request);

          // List<DeathAbandonedDtls> response = new ArrayList<>();
          
          DeathAbandonedRequest result = DeathAbandonedRequest
                                   .builder()
                                   .requestInfo(request.getRequestInfo())
                                   .deathAbandonedDtls(request.getDeathAbandonedDtls())
                                   .build();
          return result.getDeathAbandonedDtls();
     } 

  /********************************************* */

//   try {
//      ObjectMapper mapper = new ObjectMapper();
//      Object obj = request;
//      mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
//     System.out.println("rakhi3 "+ mapper.writeValueAsString(obj));
//         }catch(Exception e) {
//         log.error("Exception while fetching from searcher: ",e);
//     }


/********************************************** */
}