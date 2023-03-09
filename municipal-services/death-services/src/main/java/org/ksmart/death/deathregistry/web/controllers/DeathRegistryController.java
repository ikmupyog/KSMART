package org.ksmart.death.deathregistry.web.controllers;

import java.util.List;
import javax.validation.Valid;

import org.ksmart.death.common.contract.RequestInfoWrapper;
import org.ksmart.death.deathregistry.service.DeathRegistryService;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCriteria;
import org.ksmart.death.deathregistry.web.models.DeathRegistryDtl;
import org.ksmart.death.deathregistry.web.models.DeathRegistryRequest;
import org.ksmart.death.deathregistry.web.models.DeathRegistryResponse;
import org.ksmart.death.deathregistry.web.models.certmodel.DeathCertResponse;
import org.ksmart.death.deathregistry.web.models.certmodel.DeathCertificate;
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
import org.ksmart.death.deathregistry.web.models.DeathRegistryCorrectionResponse;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCorrectionRequest;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCorrectionDtls;

/**
     * Creates DeathRegistryController 
     * Jasmine 06/02/2023
     * Death Registry Create, Death Certificate download Rakhi S ikm on 09.02.2023
     */

    @Slf4j
    @RestController
    @RequestMapping("/v1")
    @Validated
public class DeathRegistryController {

    @Autowired
    private ResponseInfoFactory responseInfoFactory;

	private final DeathRegistryService deathService;
    
    @Autowired
    public DeathRegistryController(DeathRegistryService deathService) {

        this.deathService = deathService;
    }
    //Rakhi S on 09.02.2023 - Death Registry Create Controller 
    @PostMapping("/crdeathregistry/_createdeath")

    public ResponseEntity<DeathRegistryResponse> create(@Valid @RequestBody DeathRegistryRequest request) {
 
        List<DeathRegistryDtl> deathDetails = deathService.create(request);

        DeathRegistryResponse response = DeathRegistryResponse
                                            .builder()
                                            .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))                                                            
                                            .deathCertificateDtls(deathDetails)
                                            .build();
        return ResponseEntity.ok(response);
    }
        // //Update Jasmine 07.02.2023
        // @PostMapping("/deathregistry/_updatedeath")

        // public ResponseEntity<DeathRegistryResponse> update(@RequestBody DeathRegistryRequest request) {
    
        //     List<DeathRegistryDtl> deathDetails = deathService.update(request);
    
        //     DeathRegistryResponse response = DeathRegistryResponse
        //                                         .builder()
        //                                         .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),Boolean.TRUE))
        //                                         .deathCertificateDtls(deathDetails)
        //                                         .build();
        //     return ResponseEntity.ok(response);
        // }
    
        //Search  Jasmine 08.02.2023
        @PostMapping("/deathregistry/_searchdeath")
    
        public ResponseEntity<DeathRegistryResponse> search(@RequestBody RequestInfoWrapper request,
                                                              @ModelAttribute DeathRegistryCriteria criteria) {
    
            List<DeathRegistryDtl> deathDetails = deathService.search(criteria, request.getRequestInfo());
    
            DeathRegistryResponse response = DeathRegistryResponse
                                                .builder()
                                                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))                                                            
                                                .deathCertificateDtls(deathDetails)
                                                .build();
            return ResponseEntity.ok(response);
        }

    //Certificate Download by Rakhi S on 10.02.2023
    @PostMapping("/deathregistry/_downloaddeath")
    public ResponseEntity<DeathCertResponse> download(@RequestBody RequestInfoWrapper requestInfoWrapper,
                                                    @Valid @ModelAttribute DeathRegistryCriteria criteria){

    List<DeathCertificate> deathCertSearch = deathService.searchCertificate(criteria); 
        
    DeathCertResponse response ;
    if (null != deathCertSearch && !deathCertSearch.isEmpty()){
        if(deathCertSearch.get(0).getCounter()<=0){
           DeathCertificate deathCert = deathService.download(criteria,requestInfoWrapper.getRequestInfo());
        
            response = DeathCertResponse
                                        .builder()
                                        .filestoreId(deathCert.getFilestoreid())
                                        .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(requestInfoWrapper.getRequestInfo(), true))
                                        .build();
            return ResponseEntity.ok(response);
          }
    
          else{
                response = DeathCertResponse
                            .builder()
                            .filestoreId(deathCertSearch.get(0).getFilestoreid())
                            .consumerCode(deathCertSearch.get(0).getDeathcertificateno())
                            // .tenantId(deathCertSearch.get(0).getTenantId())
                            .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(requestInfoWrapper.getRequestInfo(), true))
                            .build();
             return ResponseEntity.ok(response);
          }
    }
    else{
        DeathCertificate deathCert = deathService.download(criteria,requestInfoWrapper.getRequestInfo());
        
            response = DeathCertResponse
                                        .builder()
                                        .filestoreId(deathCert.getFilestoreid())
                                        .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(requestInfoWrapper.getRequestInfo(), true))
                                        .build();
            return ResponseEntity.ok(response);
    }
    }

    //Update Jasmine 06.03.2023
    @PostMapping("/deathregistry/_updatedeath")

    public ResponseEntity<DeathRegistryCorrectionResponse> update(@RequestBody DeathRegistryCorrectionRequest request) {
        
        try {
            ObjectMapper mapper = new ObjectMapper();
            Object obj = request;
            mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
           System.out.println("JasmineRegistryCorrection "+ mapper.writeValueAsString(obj));
    }catch(Exception e) {
        log.error("Exception while fetching from searcher: ",e);
    }

        List<DeathRegistryCorrectionDtls> deathDetails = deathService.update(request);
        
        DeathRegistryCorrectionResponse response = DeathRegistryCorrectionResponse
                                                    .builder()
                                                    .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),Boolean.TRUE))
                                                    .deathCorrection(deathDetails)
                                                    .build();
        return ResponseEntity.ok(response);
    }
    
}
