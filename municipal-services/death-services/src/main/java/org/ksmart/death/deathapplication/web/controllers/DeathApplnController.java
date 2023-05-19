package org.ksmart.death.deathapplication.web.controllers;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import javax.validation.Valid;
import org.ksmart.death.common.contract.RequestInfoWrapper;
import org.ksmart.death.common.model.common.CommonPay;
import org.ksmart.death.common.model.common.CommonPayRequest;
import org.ksmart.death.common.repository.CommonRepository;
import org.ksmart.death.deathapplication.repository.DeathApplnRepository;
import org.ksmart.death.deathapplication.service.DeathApplnService;
import org.ksmart.death.deathapplication.service.DeathRegistryRequestService;
import org.ksmart.death.deathapplication.util.DeathConstants;
import org.ksmart.death.deathapplication.web.models.DeathAbandonedDtls;
import org.ksmart.death.deathapplication.web.models.DeathAbandonedRequest;
import org.ksmart.death.deathapplication.web.models.DeathAbandonedResponse;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionDtls;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionRequest;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionResponse;
import org.ksmart.death.deathapplication.web.models.DeathDtl;
import org.ksmart.death.deathapplication.web.models.DeathDtlRequest;
import org.ksmart.death.deathapplication.web.models.DeathDtlResponse;
import org.ksmart.death.deathapplication.web.models.DeathNACDtls;
import org.ksmart.death.deathapplication.web.models.DeathNACRequest;
import org.ksmart.death.deathapplication.web.models.DeathNACResponse;
import org.ksmart.death.deathapplication.web.models.DeathSearchCriteria;
import org.ksmart.death.deathregistry.service.DeathRegistryService;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCorrectionDtls;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCorrectionRequest;
import org.ksmart.death.deathregistry.web.models.DeathRegistryDtl;
import org.ksmart.death.deathregistry.web.models.DeathRegistryNACDtls;
import org.ksmart.death.deathregistry.web.models.DeathRegistryNACRequest;
import org.ksmart.death.deathregistry.web.models.DeathRegistryRequest;
import org.ksmart.death.utils.ResponseInfoFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/v1")
@Validated
public class DeathApplnController {

    //Rakhi S on 06.02.2023
    @Autowired
    private ResponseInfoFactory responseInfoFactory;
    private final DeathApplnService deathService;
    private final DeathRegistryRequestService deathRegistryRequestService;
    private final DeathRegistryService deathRegistryService;
    private final DeathApplnRepository repository;
    private CommonRepository crepository;

    @Autowired
    public DeathApplnController(DeathApplnService deathService,DeathRegistryRequestService deathRegistryRequestService ,  
                                DeathRegistryService deathRegistryService,
                                DeathApplnRepository repository,
                                CommonRepository crepository) {      
        this.deathService = deathService;
        this.deathRegistryRequestService = deathRegistryRequestService;
        this.deathRegistryService = deathRegistryService;
        this.repository = repository;
        this.crepository = crepository;
    }

    //Rakhi S on 06.02.2023 - Death Create Controller 
    @PostMapping("/deathdetails/_createdeath")
    public ResponseEntity<DeathDtlResponse> create(@Valid @RequestBody DeathDtlRequest request) {
       
        List<DeathDtl> deathDetails = deathService.create(request);

        DeathDtlResponse response = DeathDtlResponse
                                        .builder()
                                        .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))                                                            
                                        .deathCertificateDtls(deathDetails)
                                        .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/deathdetails/_searchdeath")
    public ResponseEntity<DeathDtlResponse> search(@RequestBody RequestInfoWrapper request,
                                                            @ModelAttribute DeathSearchCriteria criteria) {
        
        int count=repository.getDeathCount(criteria);
        List<DeathDtl> deathDetails = deathService.search(criteria, request.getRequestInfo());

        DeathDtlResponse response = DeathDtlResponse
                                        .builder()
                                        .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))                                                            
                                        .deathCertificateDtls(deathDetails)
                                        .count(count)
                                        .build();
        return ResponseEntity.ok(response);
    }
    
    //Jasmine on 07.02.2023    
    @PostMapping("/deathdetails/_updatedeath")
    public ResponseEntity<DeathDtlResponse> update(@RequestBody DeathDtlRequest request) {
 
        List<DeathDtl> deathDetails = deathService.update(request);
        String status=request.getDeathCertificateDtls().get(0).getApplicationStatus();
        String applicationType =request.getDeathCertificateDtls().get(0).getApplicationType();    

        if (status.equals(DeathConstants.WORKFLOW_STATUS_APPROVED) &&  request.getDeathCertificateDtls().get(0).getApplicationType().equals(DeathConstants.APPLICATION_NEW)){         
            DeathRegistryRequest registryRequest = deathRegistryRequestService.createRegistryRequest(request);
            List<DeathRegistryDtl> registryDeathDetails =  deathRegistryService.create(registryRequest);
        }
        DeathDtlResponse response = DeathDtlResponse
                                        .builder()
                                        .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),Boolean.TRUE))
                                        .deathCertificateDtls(deathDetails)
                                        .build();
        return ResponseEntity.ok(response);    
}
   //Rakhi S on 06.03.2023 - Death Abandoned Create Controller 
   @PostMapping("/deathdetails/_createdeathabandoned")
   public ResponseEntity<DeathAbandonedResponse> create(@Valid @RequestBody DeathAbandonedRequest request) {
      
       List<DeathAbandonedDtls> deathDetails = deathService.createAbandoned(request);

       DeathAbandonedResponse response = DeathAbandonedResponse
                                       .builder()
                                       .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))                                                            
                                       .deathAbandonedDtls(deathDetails)
                                       .build();
       return ResponseEntity.ok(response);
   }

   //Rakhi S on 08.03.2023 - Death Abandoned Update  
   @PostMapping("/deathdetails/_updatedeathabandoned")
   public ResponseEntity<DeathAbandonedResponse> update(@RequestBody DeathAbandonedRequest request) {

       List<DeathAbandonedDtls> deathDetails = deathService.updateAbandoned(request);
       String status=request.getDeathAbandonedDtls().get(0).getApplicationStatus();
       String applicationType =request.getDeathAbandonedDtls().get(0).getApplicationType();

       if (status.equals(DeathConstants.WORKFLOW_STATUS_APPROVED) &&  request.getDeathAbandonedDtls().get(0).getApplicationType().equals(DeathConstants.APPLICATION_NEW)){         
           DeathRegistryRequest registryRequest = deathRegistryRequestService.createRegistryAbandonedRequest(request);
           List<DeathRegistryDtl> registryDeathDetails =  deathRegistryService.create(registryRequest);
       }  

       DeathAbandonedResponse response = DeathAbandonedResponse
                                       .builder()
                                       .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),Boolean.TRUE))
                                       .deathAbandonedDtls(deathDetails)
                                       .build();
       return ResponseEntity.ok(response);    
   }
   //Rakhi S on 25.03.2023 - Death NAC Create Controller 
   @PostMapping("/deathdetails/_createdeathnac")
   public ResponseEntity<DeathNACResponse> create(@Valid @RequestBody DeathNACRequest request) {
      
       List<DeathNACDtls> deathNACDetails = deathService.createNAC(request);

       DeathNACResponse response = DeathNACResponse
                                       .builder()
                                       .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))                                                            
                                       .deathNACDtls(deathNACDetails)
                                       .build();
       return ResponseEntity.ok(response);
   }

      //Rakhi S on 30.03.2023 - Death NAC Update  
      @PostMapping("/deathdetails/_updatedeathnac")
      public ResponseEntity<DeathNACResponse> update(@RequestBody DeathNACRequest request) {
   
          List<DeathNACDtls> deathDetails = deathService.updateNAC(request);
          String status=request.getDeathNACDtls().get(0).getApplicationStatus();
          String applicationType =request.getDeathNACDtls().get(0).getApplicationType();
  
       if (status.equals(DeathConstants.WORKFLOW_STATUS_APPROVED) &&  request.getDeathNACDtls().get(0).getApplicationType().equals(DeathConstants.APPLICATION_TYPE)){  
           DeathRegistryNACRequest registryRequest = deathRegistryRequestService.createRegistryNACRequest(request);
           List<DeathRegistryNACDtls> registryDeathDetails =  deathRegistryService.createNAC(registryRequest);
       }
  
       DeathNACResponse response = DeathNACResponse
                           .builder()
                           .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))                                                            
                           .deathNACDtls(deathDetails)
                           .build();
           return ResponseEntity.ok(response);
       }

   //Death NAC Search by Rakhi S ikm on 08.04.2023
   @PostMapping("/deathdetails/_searchdeathnac")
   public ResponseEntity<DeathNACResponse> searchNAC(@RequestBody RequestInfoWrapper request,
                                                           @ModelAttribute DeathSearchCriteria criteria) {

       List<DeathNACDtls> deathDetails = deathService.searchNAC(criteria, request.getRequestInfo());

       DeathNACResponse response = DeathNACResponse
                                       .builder()
                                       .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))                                                            
                                       .deathNACDtls(deathDetails)
                                       .build();
       return ResponseEntity.ok(response);
   }

   //Death Abandoned Search by Rakhi S ikm on 08.04.2023
   @PostMapping("/deathdetails/_searchdeathabandoned")
   public ResponseEntity<DeathAbandonedResponse> searchAbandoned(@RequestBody RequestInfoWrapper request,
                                                           @ModelAttribute DeathSearchCriteria criteria) {

       List<DeathAbandonedDtls> deathDetails = deathService.searchAbandoned(criteria, request.getRequestInfo());

       DeathAbandonedResponse response = DeathAbandonedResponse
                                       .builder()
                                       .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))                                                            
                                       .deathAbandonedDtls(deathDetails)
                                       .build();
       return ResponseEntity.ok(response);
   }
    //Jasmine 03.03.2023- Death Create Correction Controller 
    // @PostMapping("/deathdetails/_createdeathcorrection")
    // public ResponseEntity<DeathCorrectionResponse> create(@Valid @RequestBody DeathCorrectionRequest request) {    
    //     List<DeathCorrectionDtls> deathCorrDetails = deathService.createcorrection(request);

    //     DeathCorrectionResponse response = DeathCorrectionResponse
    //                                     .builder()
    //                                     .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))                                                            
    //                                     .deathCorrection(deathCorrDetails)
    //                                     .build();
    //     return ResponseEntity.ok(response);
    // }//Jasmine        
//     @PostMapping("/deathdetails/_updatedeathcorrection")
//     public ResponseEntity<DeathCorrectionResponse> update(@RequestBody DeathCorrectionRequest request) {

//         List<DeathCorrectionDtls> deathDetails = deathService.updateCorrection(request);
//         String status=request.getDeathCorrection().get(0).getApplicationStatus();
//         String applicationType =request.getDeathCorrection().get(0).getApplicationType();
//         if (status.equals(DeathConstants.WORKFLOW_STATUS_APPROVED) &&  request.getDeathCorrection().get(0).getApplicationType().equals(DeathConstants.APPLICATION_CORRECTION)){
//             DeathRegistryCorrectionRequest registryRequest = deathRegistryRequestService.createRegistrycorrectionRequest(request);
//             List<DeathRegistryCorrectionDtls> registryDeathDetails =  deathRegistryService.update(registryRequest);
//         }

//         DeathCorrectionResponse response = DeathCorrectionResponse
//                                         .builder()
//                                         .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),Boolean.TRUE))
//                                         .deathCorrection(deathDetails)
//                                         .build();
//         return ResponseEntity.ok(response);    
// }
//    @PostMapping(value = {"/get"})
//    public void getdet(@RequestBody DeathDtlRequest request) {
   	
//   	 List<CommonPay> commonPays =  new ArrayList<>();
// 	 CommonPay pay = new CommonPay();
	 
          
// 		  pay.setAction("PAY");
// 		  pay.setApplicationStatus("INITIATED");
// 		  pay.setHasPayment(true);
// 		  pay.setAmount(new BigDecimal(10));
//          pay.setIsPaymentSuccess(true);    
//          pay.setApplicationNumber("KL-KOCHI-C-000091-CRDRAB-2023-AKNO");
// //          pay.setAuditDetails(auditDetails);
//          commonPays.add(pay);
           

// 	 System.out.println("commonPays1 "+commonPays.get(0).getAction());
	  
// 	CommonPayRequest paymentReq =CommonPayRequest.builder().requestInfo(request.getRequestInfo())
// 				.commonPays(commonPays).build();
		
//                         try {
//             ObjectMapper mapper = new ObjectMapper();
//             Object obj = paymentReq;
//             mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
//            System.out.println("rakhi4 "+ mapper.writeValueAsString(obj));
//     }catch(Exception e) {
//         log.error("Exception while fetching from searcher: ",e);
//     }
//                 crepository.updatePaymentDetails(paymentReq);

//    	}

 
}

   // System.out.println("hai");
           /********************************************* */

    //        try {
    //         ObjectMapper mapper = new ObjectMapper();
    //         Object obj = request;
    //         mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
    //        System.out.println("rakhi3 "+ mapper.writeValueAsString(obj));
    // }catch(Exception e) {
    //     log.error("Exception while fetching from searcher: ",e);
    // }

    
    /********************************************** */
