package org.ksmart.death.deathapplication.service;
// import java.util.ArrayList;
// import java.util.List;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// import com.fasterxml.jackson.databind.ObjectMapper;
// import com.fasterxml.jackson.databind.SerializationFeature;

// import org.ksmart.death.deathapplication.config.DeathConfiguration;
// import org.ksmart.death.deathapplication.enrichment.DeathEnrichment;
// import org.ksmart.death.deathapplication.kafka.producer.DeathProducer;
// import org.ksmart.death.deathapplication.repository.DeathApplnRepository;
// import org.ksmart.death.deathapplication.util.DeathMdmsUtil;
// import org.ksmart.death.deathapplication.validators.DeathApplnValidator;
// import org.ksmart.death.deathapplication.validators.DeathMDMSValidator;
// import org.ksmart.death.deathapplication.web.models.DeathCorrectionDtls;
// import org.ksmart.death.deathapplication.web.models.DeathCorrectionRequest;
// import org.ksmart.death.deathapplication.web.models.DeathDtl;
// import org.ksmart.death.deathapplication.web.models.DeathDtlRequest;
// import org.ksmart.death.deathapplication.web.models.DeathSearchCriteria;
// import org.ksmart.death.workflow.WorkflowIntegrator;
// import org.egov.common.contract.request.RequestInfo;

// /**
//      * Creates DeathCorrectionService
//      * Jasmine on 03.03.2023
//      * 
//      */
//     import com.fasterxml.jackson.databind.ObjectMapper;
//     import com.fasterxml.jackson.databind.SerializationFeature;
    
//     import lombok.extern.slf4j.Slf4j;
    

    
//       @Slf4j
// @Service
 public class DeathCorrectionService {

//     private final DeathProducer producer;
//     private final DeathEnrichment enrichmentService;
//     private final DeathConfiguration deathConfig;
//     private final DeathMdmsUtil util;
//     private final WorkflowIntegrator workflowIntegrator;
//     private final DeathApplnValidator validatorService;
//     private final DeathApplnRepository repository;
//     private final DeathMDMSValidator mdmsValidator;

//      @Autowired
//      DeathCorrectionService(DeathApplnRepository repository 
//                             ,DeathProducer producer
//                             ,DeathEnrichment enrichmentService
//                             ,DeathApplnValidator validatorService
//                             ,DeathConfiguration deathConfig
//                             ,WorkflowIntegrator workflowIntegrator
//                             ,DeathMdmsUtil util
//                             ,DeathMDMSValidator mdmsValidator){

//          this.mdmsValidator = mdmsValidator;
//          this.validatorService = validatorService;
//          this.producer = producer;
//          this.deathConfig = deathConfig;
//          this.enrichmentService = enrichmentService;
//          this.repository = repository;
//          this.workflowIntegrator = workflowIntegrator;
//          this.util = util;
//      }
//         public List<DeathCorrectionDtls> createcorrection(DeathCorrectionRequest request) {
//           //  Object mdmsData = util.mDMSCall(request.getRequestInfo(), request.getDeathCertificateDtls().get(0).getDeathBasicInfo().getTenantId());

//             enrichmentService.setPresentAddress(request);
//             enrichmentService.setPermanentAddress(request);
//             enrichmentService.enrichCreateCorrection(request);
//             enrichmentService.setACKNumber(request);                  
//             producer.push(deathConfig.getSaveDeathDetailsTopic(), request);
//             workflowIntegrator.callWorkFlow(request);
//             return request.getDeathCertificateDtls();
//        }
    
}
