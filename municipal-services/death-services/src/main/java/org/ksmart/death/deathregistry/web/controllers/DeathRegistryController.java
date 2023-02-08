package org.ksmart.death.deathregistry.web.controllers;

import java.util.List;
import javax.validation.Valid;

import org.ksmart.death.common.contract.RequestInfoWrapper;
import org.ksmart.death.deathregistry.service.DeathRegistryService;
import org.ksmart.death.deathregistry.web.models.DeathRegistryCriteria;
import org.ksmart.death.deathregistry.web.models.DeathRegistryDtl;
import org.ksmart.death.deathregistry.web.models.DeathRegistryRequest;
import org.ksmart.death.deathregistry.web.models.DeathRegistryResponse;
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

/**
     * Creates DeathRegistryController 
     * Jasmine 06/02/2023
     * 
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

        //Update Jasmine 07.02.2023
        @PostMapping("/deathregistry/_updatedeath")

        public ResponseEntity<DeathRegistryResponse> update(@RequestBody DeathRegistryRequest request) {
    
            List<DeathRegistryDtl> deathDetails = deathService.update(request);
    
            DeathRegistryResponse response = DeathRegistryResponse
                                                .builder()
                                                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),Boolean.TRUE))
                                                .deathCertificateDtls(deathDetails)
                                                .build();
            return ResponseEntity.ok(response);
        }
    
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
    
}
