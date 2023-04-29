package org.ksmart.death.deathapplication.service;

import java.util.ArrayList;
import java.util.LinkedList;
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
import org.ksmart.death.deathapplication.web.models.DeathNACDtls;
import org.ksmart.death.deathapplication.web.models.DeathNACRequest;
import org.ksmart.death.deathapplication.web.models.DeathSearchCriteria;
import org.ksmart.death.deathapplication.web.models.WorkFlowCheck;
import org.ksmart.death.deathapplication.web.models.Demand.Demand;
import org.ksmart.death.deathapplication.web.models.Demand.DemandDetail;
import org.ksmart.death.workflow.WorkflowIntegrator;
import org.egov.common.contract.request.RequestInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;    
import lombok.extern.slf4j.Slf4j;  

@Slf4j
@Service
public class DeathApplnService {

     private final DeathProducer producer;
     private final DeathEnrichment enrichmentService;
     private final DeathConfiguration deathConfig;
     private final DeathMdmsUtil util;
     private final WorkflowIntegrator workflowIntegrator;
     private final DeathApplnValidator validatorService;
     private final DeathApplnRepository repository;
     private final DeathMDMSValidator mdmsValidator;
     private final DemandService demandService;

     DeathApplnService(DeathApplnRepository repository ,DeathProducer producer
                         ,DeathEnrichment enrichmentService,DeathApplnValidator validatorService,DeathConfiguration deathConfig
                         ,WorkflowIntegrator workflowIntegrator,DeathMdmsUtil util
                         ,DeathMDMSValidator mdmsValidator,DemandService demandService){

         this.mdmsValidator = mdmsValidator;
         this.validatorService = validatorService;
         this.producer = producer;
         this.deathConfig = deathConfig;
         this.enrichmentService = enrichmentService;
         this.repository = repository;
         this.workflowIntegrator = workflowIntegrator;
         this.util = util;
         this.demandService = demandService;
     }

     //RAkhi S ikm  on 06.02.2023
     public List<DeathDtl> create(DeathDtlRequest request) {
          WorkFlowCheck wfc = new WorkFlowCheck();
          Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getTenantId());
          validatorService.ruleEngineDeath(request, wfc, mdmsData);
          validatorService.validateCommonFields(request);
          mdmsValidator.validateDeathMDMSData(request,mdmsData);
          enrichmentService.setDeathPlaceTypes(request);
          enrichmentService.setPresentAddress(request);
          enrichmentService.setPermanentAddress(request);
          enrichmentService.enrichCreate(request);
          enrichmentService.setACKNumber(request);         
          producer.push(deathConfig.getSaveDeathDetailsTopic(), request);
          workflowIntegrator.callWorkFlow(request);
          request.getDeathCertificateDtls().forEach(death->{
               if(wfc.getPayment()!= null){
                   if(death.getApplicationStatus().equals(DeathConstants.STATUS_FOR_PAYMENT)){
                       List<Demand> demands = new ArrayList<>();
                       Demand demand = new Demand();
                       demand.setTenantId(death.getDeathBasicInfo().getTenantId());
                       demand.setConsumerCode(death.getDeathBasicInfo().getDeathACKNo());
                       demands.add(demand);
                       death.setDemands(demandService.saveDemandDetails(demands,request.getRequestInfo(), wfc));
                   }
               }
          });     
 
          return request.getDeathCertificateDtls();
     }

    public List<DeathDtl> search(DeathSearchCriteria criteria, RequestInfo requestInfo) {
          criteria.setFuncionUID(DeathConstants.FUN_MODULE_NEWAPPLN);
          return repository.getDeathApplication(criteria, requestInfo);
     }

     //Jasmine  Update 07.02.2023
     public List<DeathDtl> update(DeathDtlRequest request) {
          Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getTenantId());
          enrichmentService.setDeathPlaceTypes(request);
          enrichmentService.setPresentAddress(request);
          enrichmentService.setPermanentAddress(request);
          String ackNumber = request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getDeathACKNo();
          DeathSearchCriteria criteria =(DeathSearchCriteria.builder()
                                        .deathACKNo(ackNumber)
                                        .build());

          List<DeathDtl> searchResult = repository.getDeathApplication(criteria,request.getRequestInfo());
          validatorService.validateUpdate(request, searchResult);
          mdmsValidator.validateDeathMDMSData(request,mdmsData);                      
          enrichmentService.enrichUpdate(request);
          workflowIntegrator.callWorkFlow(request);
          producer.push(deathConfig.getUpdateDeathDetailsTopic(), request);          
          DeathDtlRequest result = DeathDtlRequest
                                   .builder()
                                   .requestInfo(request.getRequestInfo())
                                   .deathCertificateDtls(request.getDeathCertificateDtls())
                                   .build();
          return result.getDeathCertificateDtls();
     } 
     //Jasmine 03.03.2023
     public List<DeathCorrectionDtls> createcorrection(DeathCorrectionRequest request) {
            Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getDeathCorrection().get(0).getDeathCorrectionBasicInfo().getTenantId());
            enrichmentService.setCorrectionPresentAddress(request);
            enrichmentService.setCorrectionPermanentAddress(request);
            validatorService.validateCorrectionCommonFields( request);
            enrichmentService.enrichCreateCorrection(request);
            enrichmentService.setCorrectionACKNumber(request);                  
            producer.push(deathConfig.getSaveDeathCorrectionTopic(), request);
            workflowIntegrator.callCorrectionWorkFlow(request);
            return request.getDeathCorrection();
       }   

     //Jasmine  Update 07.02.2023
     public List<DeathCorrectionDtls> updateCorrection(DeathCorrectionRequest request) {
          Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getDeathCorrection().get(0).getDeathCorrectionBasicInfo().getTenantId());
          enrichmentService.setCorrectionPresentAddress(request);
          enrichmentService.setCorrectionPermanentAddress(request);
          String ackNumber = request.getDeathCorrection().get(0).getDeathCorrectionBasicInfo().getDeathACKNo();
          DeathSearchCriteria criteria =(DeathSearchCriteria.builder()
                                        .deathACKNo(ackNumber)
                                        .build());
          List<DeathCorrectionDtls> searchResult = repository.getDeathCorrection(criteria,request.getRequestInfo());
          validatorService.validateCorrectionUpdate(request, searchResult);
         // mdmsValidator.validateMDMSData(request,mdmsData);
          enrichmentService.enrichUpdateCorrection(request);
          workflowIntegrator.callCorrectionWorkFlow(request);
          producer.push(deathConfig.getUpdateDeathCorrectionTopic(), request);
          DeathCorrectionRequest result = DeathCorrectionRequest
                                   .builder()
                                   .requestInfo(request.getRequestInfo())
                                   .deathCorrection(request.getDeathCorrection())
                                   .build();
          return result.getDeathCorrection();
     } 

      //RAkhi S ikm  on 06.03.2023 - Service to create Abandoned request
      public List<DeathAbandonedDtls> createAbandoned(DeathAbandonedRequest request) {

          enrichmentService.setAbandonedDeathPlaceTypes(request);
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
          enrichmentService.setAbandonedDeathPlaceTypes(request);
          enrichmentService.setAbandonedPresentAddress(request);
          enrichmentService.setAbandonedPermanentAddress(request);
          // enrichmentService.enrichAbandonedUpdate(request);
          String ackNumber = request.getDeathAbandonedDtls().get(0).getDeathBasicInfo().getDeathACKNo();
          DeathSearchCriteria criteria =(DeathSearchCriteria.builder()
                                        .deathACKNo(ackNumber)
                                        .build());

          List<DeathAbandonedDtls> searchResult = repository.getDeathAbandoned(criteria,request.getRequestInfo());
          validatorService.validateAbandonedUpdate(request, searchResult);                   
          enrichmentService.enrichAbandonedUpdate(request);
          workflowIntegrator.callWorkFlowAbandoned(request);
          producer.push(deathConfig.getUpdateDeathAbandonedTopic(), request);
         
          DeathAbandonedRequest result = DeathAbandonedRequest
                                   .builder()
                                   .requestInfo(request.getRequestInfo())
                                   .deathAbandonedDtls(request.getDeathAbandonedDtls())
                                   .build();
          return result.getDeathAbandonedDtls();
     } 
     // //RAkhi S ikm  on 27.03.2023 - Service to create NAC request
      public List<DeathNACDtls> createNAC(DeathNACRequest request) {
          Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getDeathNACDtls().get(0).getDeathBasicInfo().getTenantId());          
          validatorService.validateNACCommonFieldss(request);
          mdmsValidator.validateNACMDMSData(request,mdmsData);
          
          enrichmentService.setNACDeathPlaceTypes(request);
          enrichmentService.setNACPresentAddress(request);
          enrichmentService.setNACPermanentAddress(request);
          enrichmentService.enrichCreateNAC(request);
          enrichmentService.setNACACKNumber(request);            
          producer.push(deathConfig.getSaveDeathNACTopic(), request);
          workflowIntegrator.callWorkFlowNAC(request);
          return request.getDeathNACDtls();
     }

      // //RAkhi S ikm  on 30.03.2023 - Service to update NAC request
      public List<DeathNACDtls> updateNAC(DeathNACRequest request) {
          enrichmentService.setNACPresentAddress(request);
          enrichmentService.setNACPermanentAddress(request);
          String ackNumber = request.getDeathNACDtls().get(0).getDeathBasicInfo().getDeathACKNo();
          DeathSearchCriteria criteria =(DeathSearchCriteria.builder()
                                        .deathACKNo(ackNumber)
                                        .build());

          List<DeathNACDtls> searchResult = repository.getDeathNACDetails(criteria,request.getRequestInfo());
          request.getDeathNACDtls().get(0).getDeathBasicInfo().setFatherAadharNo(searchResult.get(0).getDeathBasicInfo().getFatherAadharNo());
          request.getDeathNACDtls().get(0).getDeathBasicInfo().setMotherAadharNo(searchResult.get(0).getDeathBasicInfo().getMotherAadharNo());
          request.getDeathNACDtls().get(0).getDeathBasicInfo().setSpouseAadhaar(searchResult.get(0).getDeathBasicInfo().getSpouseAadhaar());

          enrichmentService.setNACDeathPlaceTypes(request);
          validatorService.validateNACUpdate(request, searchResult);    
          workflowIntegrator.callWorkFlowNAC(request);
          producer.push(deathConfig.getUpdateDeathNACTopic(), request);
          DeathNACRequest result = DeathNACRequest
                                        .builder()
                                        .requestInfo(request.getRequestInfo())
                                        .deathNACDtls(request.getDeathNACDtls())
                                        .build();

          return result.getDeathNACDtls();
     }
     
    //Death NAC Search by Rakhi S ikm on 08.04.2023
     public List<DeathNACDtls> searchNAC(DeathSearchCriteria criteria, RequestInfo requestInfo) {
          criteria.setFuncionUID(DeathConstants.FUN_MODULE_NAC);
          return repository.getDeathNACDetails(criteria, requestInfo);
     }

      //Death Abandoned Search by Rakhi S ikm on 08.04.2023
      public List<DeathAbandonedDtls> searchAbandoned(DeathSearchCriteria criteria, RequestInfo requestInfo) {
          criteria.setFuncionUID(DeathConstants.FUN_MODULE_ABANDONED);
          return repository.getDeathAbandoned(criteria, requestInfo);
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