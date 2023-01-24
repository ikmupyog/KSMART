package org.ksmart.death.crdeathregistry.web.controllers;

import java.util.List;

import javax.validation.Valid;

import org.ksmart.death.common.contract.RequestInfoWrapper;
import org.ksmart.death.crdeathregistry.service.CrDeathRegistryService;
import org.ksmart.death.utils.ResponseInfoFactory;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryCriteria;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryDtl;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryRequest;
import org.ksmart.death.crdeathregistry.web.models.CrDeathRegistryResponse;
import org.ksmart.death.crdeathregistry.web.models.certmodel.DeathCertResponse;
import org.ksmart.death.crdeathregistry.web.models.certmodel.DeathCertificate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import lombok.extern.slf4j.Slf4j;

/**
     * Creates CrDeathController 
     * Rakhi S IKM
     * on 28.11.2022
     */

    @Slf4j
    @RestController
    @RequestMapping("/v1")
    @Validated
public class CrDeathRegistryController {

    @Autowired
    private ResponseInfoFactory responseInfoFactory;

	private final CrDeathRegistryService deathService;

    
    @Autowired
    public CrDeathRegistryController(CrDeathRegistryService deathService) {

        this.deathService = deathService;
    }
    @PostMapping("/crdeathregistry/_create")

    public ResponseEntity<CrDeathRegistryResponse> create(@Valid @RequestBody CrDeathRegistryRequest request) {
 
        List<CrDeathRegistryDtl> deathDetails = deathService.create(request);

        CrDeathRegistryResponse response = CrDeathRegistryResponse
                                            .builder()
                                            .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))                                                            
                                            .deathCertificateDtls(deathDetails)
                                            .build();
        return ResponseEntity.ok(response);
    }

    //Update Begin Jasmine
    @PutMapping("/crdeathregistry/_update")

    public ResponseEntity<CrDeathRegistryResponse> update(@RequestBody CrDeathRegistryRequest request) {

        List<CrDeathRegistryDtl> deathDetails = deathService.update(request);

        CrDeathRegistryResponse response = CrDeathRegistryResponse
                                            .builder()
                                            .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),Boolean.TRUE))
                                            .deathCertificateDtls(deathDetails)
                                            .build();
        return ResponseEntity.ok(response);
    }

    //Search Begin Jasmine
    @PostMapping("/crdeathregistry/_search")

    public ResponseEntity<CrDeathRegistryResponse> search(@RequestBody RequestInfoWrapper request,
                                                          @ModelAttribute CrDeathRegistryCriteria criteria) {

        List<CrDeathRegistryDtl> deathDetails = deathService.search(criteria, request.getRequestInfo());

        CrDeathRegistryResponse response = CrDeathRegistryResponse
                                            .builder()
                                            .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))                                                            
                                            .deathCertificateDtls(deathDetails)
                                            .build();
        return ResponseEntity.ok(response);
    }
    //Certificate Download by Rakhi S on 15.12.2022
    @PostMapping("/crdeathregistry/_download")
    public ResponseEntity<DeathCertResponse> download(@RequestBody RequestInfoWrapper requestInfoWrapper,
                                                    @Valid @ModelAttribute CrDeathRegistryCriteria criteria){

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

    //Rakhi S on 24.01.2023
    @PostMapping(value = { "/crdeathregistry/_getfilestoreid"})
    public ResponseEntity<DeathCertResponse> getfilestoreid(@RequestBody RequestInfoWrapper requestInfoWrapper,
                                                       @Valid @ModelAttribute CrDeathRegistryCriteria criteria) {
		
        List<DeathCertificate> deathCert = deathService.searchCertificate(criteria);
        DeathCertResponse response = DeathCertResponse.builder()
                                    .filestoreId(deathCert.get(0).getFilestoreid())
                                    .consumerCode(deathCert.get(0).getDeathcertificateno())
                                    .tenantId(criteria.getTenantId())
                                    .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(requestInfoWrapper.getRequestInfo(), true))
                                    .build();
        // if(null!=deathCert.getFilestoreid()) {
        // 	// deathCert.setDeathCertificateNo(criteria.getConsumerCode());
        // 	// deathService.updateDownloadStatus(DeathCertRequest.builder().deathCertificate(deathCert).requestInfo(requestInfoWrapper.getRequestInfo()).build());
        // }
        // return new ResponseEntity<>(response, HttpStatus.OK);
        return ResponseEntity.ok(response);
    }
        // System.out.println("hai");
        //    /********************************************* */

        // try {
        //         ObjectMapper mapper = new ObjectMapper();
        //         Object obj = request;
        //         mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        //        System.out.println("rakhiRegistry "+ mapper.writeValueAsString(obj));
        // }catch(Exception e) {
        //     log.error("Exception while fetching from searcher: ",e);
        // }

 
        /********************************************** */

}
