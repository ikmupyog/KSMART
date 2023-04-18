package org.ksmart.death.deathapplication.web.controllers;

import lombok.extern.slf4j.Slf4j;
import org.ksmart.death.deathapplication.service.DeathCorrectionService;
import org.ksmart.death.deathapplication.service.DeathRegistryRequestService;
import org.ksmart.death.deathapplication.web.models.DeathCorrection.CorrectionDetails;
import org.ksmart.death.deathapplication.web.models.DeathCorrection.CorrectionRequest;
import org.ksmart.death.deathapplication.web.models.DeathCorrection.CorrectionResponse;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionDtls;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionRequest;
import org.ksmart.death.deathapplication.web.models.DeathCorrectionResponse;
import org.ksmart.death.deathregistry.service.DeathRegistryService;
import org.ksmart.death.utils.ResponseInfoFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/v1/deathdetails")
public class DeathCorrectionController {
    private final DeathCorrectionService service;
    private final DeathRegistryRequestService deathRegistryRequestService;
    private final DeathRegistryService deathRegistryService;
    private final ResponseInfoFactory responseInfoFactory;

    @Autowired
    public DeathCorrectionController(ResponseInfoFactory responseInfoFactory, DeathCorrectionService service,DeathRegistryRequestService deathRegistryRequestService ,  DeathRegistryService deathRegistryService) {
        this.responseInfoFactory = responseInfoFactory;
        this.service = service;
        this.deathRegistryRequestService = deathRegistryRequestService;
        this.deathRegistryService = deathRegistryService;
    }
    @PostMapping(value = {"/createdeathcorrection"})
    public ResponseEntity<CorrectionResponse> create(@Valid @RequestBody CorrectionRequest request) {
        List<CorrectionDetails> deathCorrDetails = service.createcorrection(request);

        CorrectionResponse response = CorrectionResponse
                .builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))
                .deathCorrection(deathCorrDetails)
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = {"/uodatedeathcorrection"})
    public ResponseEntity<CorrectionResponse> update(@Valid @RequestBody CorrectionRequest request) {
        List<CorrectionDetails> deathCorrDetails = service.updateCorrection(request);

        CorrectionResponse response = CorrectionResponse
                .builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(), Boolean.TRUE))
                .deathCorrection(deathCorrDetails)
                .build();
        return ResponseEntity.ok(response);
    }
}
