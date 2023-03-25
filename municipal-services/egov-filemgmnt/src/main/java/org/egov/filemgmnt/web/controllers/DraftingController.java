package org.egov.filemgmnt.web.controllers;


import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.egov.filemgmnt.service.DraftingService;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.util.ResponseInfoFactory;
import org.egov.filemgmnt.web.models.drafting.Drafting;
import org.egov.filemgmnt.web.models.drafting.DraftingRequest;
import org.egov.filemgmnt.web.models.drafting.DraftingResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/v1")
public class DraftingController {

    private final ResponseInfoFactory responseInfoFactory;
    private final DraftingService draftingService;

   DraftingController(final DraftingService draftingService,final ResponseInfoFactory responseInfoFactory){
        this.draftingService = draftingService;
        this.responseInfoFactory = responseInfoFactory;
   }

   @PostMapping("/applicantservices/_createDraftOnSelect")
    public ResponseEntity<DraftingResponse> createDraftingMain(@RequestBody final DraftingRequest request) {
        if (log.isDebugEnabled()) {
            log.debug("Drafting main-create:  \n{}", FMUtils.toJson(request));
        }
        List<Drafting> draftingDetails = draftingService.createDraftingMain(request);
       
        
        DraftingResponse response = DraftingResponse.builder()
        								.responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
        																						Boolean.TRUE))
        								.drafting(draftingDetails)
        								.build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/applicantservices/_createDraftOnSelect")
    public ResponseEntity<DraftingResponse> createDraftingMain(@RequestBody final DraftingRequest request) {
        if (log.isDebugEnabled()) {
            log.debug("Drafting main-create:  \n{}", FMUtils.toJson(request));
        }
        List<Drafting> draftingDetails = draftingService.createDraftingMain(request);
       
        
        DraftingResponse response = DraftingResponse.builder()
        								.responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
        																						Boolean.TRUE))
        								.drafting(draftingDetails)
        								.build();
        return ResponseEntity.ok(response);
    }
}
