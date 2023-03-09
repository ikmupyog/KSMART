package org.ksmart.death.deathapplication.web.controllers;

import java.util.List;
import javax.validation.Valid;

import org.ksmart.death.common.contract.RequestInfoWrapper;
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
import org.ksmart.death.deathapplication.web.models.DeathSearchCriteria;
import org.ksmart.death.deathregistry.service.DeathRegistryService;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCorrectionDtls;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCorrectionRequest;
import org.ksmart.death.deathregistry.web.models.DeathRegistryDtl;
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
/**
     * Creates DeathController 
     * Jasmine 06/02/2023
     * Death Application Create Api- Rakhi S on 06.02.2023 
     */

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

    @Autowired
    public DeathApplnController(DeathApplnService deathService,DeathRegistryRequestService deathRegistryRequestService ,  DeathRegistryService deathRegistryService) {
      
        this.deathService = deathService;

        this.deathRegistryRequestService = deathRegistryRequestService;

        this.deathRegistryService = deathRegistryService;
    }


    //Rakhi S on 06.02.2023 - Death Create Controller 
    // @Override
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

   // @Override
     //Jasmine  on 06.02.2023 - Death search Controller 
    @PostMapping("/deathdetails/_searchdeath")
    public ResponseEntity<DeathDtlResponse> search(@RequestBody RequestInfoWrapper request,
                                                            @ModelAttribute DeathSearchCriteria criteria) {

        List<DeathDtl> deathDetails = deathService.search(criteria, request.getRequestInfo());

        DeathDtlResponse response = DeathDtlResponse
                                        .builder()
                                        .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))                                                            
                                        .deathCertificateDtls(deathDetails)
                                        .build();
        return ResponseEntity.ok(response);
    }
    
    //Jasmine on 07.02.2023
    
    @PostMapping("/deathdetails/_updatedeath")

    public ResponseEntity<DeathDtlResponse> update(@RequestBody DeathDtlRequest request) {
 
        List<DeathDtl> deathDetails = deathService.update(request);

        String status=request.getDeathCertificateDtls().get(0).getApplicationStatus();

        String applicationType =request.getDeathCertificateDtls().get(0).getApplicationType();

        //System.out.println("status and applicationType"+status +" "+applicationType);

        if (status.equals(DeathConstants.WORKFLOW_STATUS_APPROVED) &&  request.getDeathCertificateDtls().get(0).getApplicationType().equals(DeathConstants.APPLICATION_NEW)){
         
            DeathRegistryRequest registryRequest = deathRegistryRequestService.createRegistryRequest(request);

            List<DeathRegistryDtl> registryDeathDetails =  deathRegistryService.create(registryRequest);


        }

    //    if((status.equals(DeathConstants.WORKFLOW_STATUS_APPROVED))&&  (applicationType.equals(DeathConstants.APPLICATION_CORRECTION))){

    //         DeathRegistryRequest registryRequest = deathRegistryRequestService.createRegistryRequest(request);

    //         List<DeathRegistryDtl> registryDeathDetails =  deathRegistryService.update(registryRequest);                   
       
    //     }

        DeathDtlResponse response = DeathDtlResponse
                                        .builder()
                                        .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),Boolean.TRUE))
                                        .deathCertificateDtls(deathDetails)
                                        .build();
        return ResponseEntity.ok(response);

    
}
    //Jasmine 03.03.2023- Death Create Correction Controller 

    @PostMapping("/deathdetails/_createdeathcorrection")
    public ResponseEntity<DeathCorrectionResponse> create(@Valid @RequestBody DeathCorrectionRequest request) {
       
        List<DeathCorrectionDtls> deathCorrDetails = deathService.createcorrection(request);

        DeathCorrectionResponse response = DeathCorrectionResponse
                                        .builder()
                                        .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))                                                            
                                        .deathCorrection(deathCorrDetails)
                                        .build();
        return ResponseEntity.ok(response);
    }
//Jasmine
        
    @PostMapping("/deathdetails/_updatedeathcorrection")
    public ResponseEntity<DeathCorrectionResponse> update(@RequestBody DeathCorrectionRequest request) {
 System.out.println("HiCorrectionUpdate");
        List<DeathCorrectionDtls> deathDetails = deathService.updateCorrection(request);

        String status=request.getDeathCorrection().get(0).getApplicationStatus();

        String applicationType =request.getDeathCorrection().get(0).getApplicationType();

        System.out.println("status"+status +" "+applicationType);

        if (status.equals(DeathConstants.WORKFLOW_STATUS_APPROVED) &&  request.getDeathCorrection().get(0).getApplicationType().equals(DeathConstants.APPLICATION_CORRECTION)){
         
            DeathRegistryCorrectionRequest registryRequest = deathRegistryRequestService.createRegistrycorrectionRequest(request);

            List<DeathRegistryCorrectionDtls> registryDeathDetails =  deathRegistryService.update(registryRequest);

        }

        DeathCorrectionResponse response = DeathCorrectionResponse
                                        .builder()
                                        .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),Boolean.TRUE))
                                        .deathCorrection(deathDetails)
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

}
