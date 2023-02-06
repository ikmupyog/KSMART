package org.ksmart.death.deathapplication.web.controllers;

import java.util.List;
import javax.validation.Valid;

import org.ksmart.death.deathapplication.service.DeathApplnService;
import org.ksmart.death.deathapplication.web.models.DeathDtl;
import org.ksmart.death.deathapplication.web.models.DeathDtlRequest;
import org.ksmart.death.deathapplication.web.models.DeathDtlResponse;
import org.ksmart.death.utils.ResponseInfoFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.extern.slf4j.Slf4j;
/**
     * Creates DeathController 
     * Jasmine 06/02/2023
     * 
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

    @Autowired
    public DeathApplnController(DeathApplnService deathService) {
      
        this.deathService = deathService;
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
    
}
