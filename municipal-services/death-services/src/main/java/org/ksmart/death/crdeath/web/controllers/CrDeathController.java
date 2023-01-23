package org.ksmart.death.crdeath.web.controllers;

import java.util.List;

import javax.validation.Valid;

import org.ksmart.death.crdeath.service.CrDeathRegistryRequestService;
import org.ksmart.death.crdeath.service.CrDeathService;
import org.ksmart.death.crdeath.util.CrDeathConstants;
import org.ksmart.death.crdeath.web.models.CrDeathDtl;
import org.ksmart.death.crdeath.web.models.CrDeathDtlRequest;
import org.ksmart.death.crdeath.web.models.CrDeathDtlResponse;
import org.ksmart.death.crdeath.web.models.CrDeathSearchCriteria;
import org.ksmart.death.crdeath.web.models.RequestInfoWrapper;
import org.ksmart.death.crdeathregistry.service.CrDeathRegistryService;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryDtl;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryRequest;
import org.ksmart.death.utils.ResponseInfoFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.util.StringUtils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import lombok.extern.slf4j.Slf4j;
import java.util.LinkedList;
import java.util.List;

//import io.swagger.v3.oas.annotations.parameters.RequestBody;
/**
     * Creates CrDeathController 
     * Rakhi S IKM
     * 
     */

@Slf4j
@RestController
@RequestMapping("/v1")
@Validated
public class CrDeathController implements CrDeathResource  {

    @Autowired
    private ResponseInfoFactory responseInfoFactory;

	private final CrDeathService deathService;

	private final CrDeathRegistryService deathRegistryService;

    private final CrDeathRegistryRequestService deathRegistryRequestService;

    
    @Autowired
    public CrDeathController(CrDeathService deathService,CrDeathRegistryService deathRegistryService ,CrDeathRegistryRequestService deathRegistryRequestService) {
      
        this.deathService = deathService;

        this.deathRegistryService = deathRegistryService;

        this.deathRegistryRequestService =deathRegistryRequestService;
    }

    @Override
    @PostMapping("/crdeathdetails/_create")
    public ResponseEntity<CrDeathDtlResponse> create(@Valid @RequestBody CrDeathDtlRequest request) {

        List<CrDeathDtl> deathDetails = deathService.create(request);

        CrDeathDtlResponse response = CrDeathDtlResponse
                                        .builder()
                                        .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))                                                            
                                        .deathCertificateDtls(deathDetails)
                                        .build();
        return ResponseEntity.ok(response);
    }

    //RAkhi S on 05.12.2022
    @Override
    @PostMapping("/crdeathdetails/_search")
    public ResponseEntity<CrDeathDtlResponse> search(@RequestBody RequestInfoWrapper request,
                                                            @ModelAttribute CrDeathSearchCriteria criteria) {

        List<CrDeathDtl> deathDetails = deathService.search(criteria, request.getRequestInfo());

        CrDeathDtlResponse response = CrDeathDtlResponse
                                        .builder()
                                        .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))                                                            
                                        .deathCertificateDtls(deathDetails)
                                        .build();
        return ResponseEntity.ok(response);
    }

    //Update Begin Jasmine
    @Override
    @PutMapping("/crdeathdetails/_update")

    public ResponseEntity<CrDeathDtlResponse> update(@RequestBody CrDeathDtlRequest request) {
 
        List<CrDeathDtl> deathDetails = deathService.update(request);

    //Jasmine on 18.01.2023
        String status=request.getDeathCertificateDtls().get(0).getApplicationStatus();

        String applicationType =request.getDeathCertificateDtls().get(0).getApplicationType();

        if (!request.getDeathCertificateDtls().get(0).getApplicationStatus().equals(CrDeathConstants.WORKFLOW_STATUS_APPROVED)) {
       


        }

        if (request.getDeathCertificateDtls().get(0).getApplicationStatus().equals(CrDeathConstants.WORKFLOW_STATUS_APPROVED) &&  request.getDeathCertificateDtls().get(0).getApplicationType().equals(CrDeathConstants.APPLICATION_NEW)){
         
            CrDeathRegistryRequest registryRequest = deathRegistryRequestService.createRegistryRequest(request);

            List<CrDeathRegistryDtl> registryDeathDetails =  deathRegistryService.create(registryRequest);


        }
        //Jasmine on 21.01.2023
        else if((status==CrDeathConstants.WORKFLOW_STATUS_APPROVED) &&  (applicationType==CrDeathConstants.APPLICATION_CORRECTION)){

            CrDeathRegistryRequest registryRequest = deathRegistryRequestService.createRegistryRequest(request);

            List<CrDeathRegistryDtl> registryDeathDetails =  deathRegistryService.update(registryRequest);                   
       
        }
        CrDeathDtlResponse response = CrDeathDtlResponse
                                        .builder()
                                        .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),Boolean.TRUE))
                                        .deathCertificateDtls(deathDetails)
                                        .build();
        return ResponseEntity.ok(response);
   
    }

    // @Override
    // @PutMapping("/crdeathdetails/_create")

    // public ResponseEntity<CrDeathDtlResponse> create(@RequestBody CrDeathDtlRequest request) {
 
    //     List<CrDeathDtl> deathDetails = deathService.update(request);
    
    //     CrDeathDtlResponse response = CrDeathDtlResponse.builder()
    //                                         .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),Boolean.TRUE))
    //                                         .deathCertificateDtls(deathDetails)
    //                                         .build();
    //     return ResponseEntity.ok(response);
    // }
            // System.out.println("hai");
           /********************************************* */

        // try {
        //         ObjectMapper mapper = new ObjectMapper();
        //         Object obj = request;
        //         mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        //        System.out.println("rakhi3 "+ mapper.writeValueAsString(obj));
        // }catch(Exception e) {
        //     log.error("Exception while fetching from searcher: ",e);
        // }

        
        /********************************************** */

}
