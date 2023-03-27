package org.egov.filemgmnt.web.controllers;


import lombok.extern.slf4j.Slf4j;
import org.egov.filemgmnt.service.DraftingService;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.util.ResponseInfoFactory;
import org.egov.filemgmnt.web.models.RequestInfoWrapper;
import org.egov.filemgmnt.web.models.drafting.Drafting;
import org.egov.filemgmnt.web.models.drafting.DraftingRequest;
import org.egov.filemgmnt.web.models.drafting.DraftingResponse;
import org.egov.filemgmnt.web.models.drafting.DraftingSearchCriteria;
import org.egov.filemgmnt.web.models.drafting.DraftingSearchResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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

   @PostMapping("/applicantservices/_createDraftingMain")
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

    
    @PostMapping("/applicantservice/_searchDrafting")
    public ResponseEntity<DraftingSearchResponse>searchDraft(@RequestBody final RequestInfoWrapper request,
                                                             @ModelAttribute DraftingSearchCriteria searchCriteria){
        if (log.isDebugEnabled()) {
            log.debug("Drafting-search:  \n{}", FMUtils.toJson(searchCriteria));
        }
        final List<Drafting> result = draftingService.searchDraft(request.getRequestInfo(),searchCriteria);
        return ResponseEntity.ok(DraftingSearchResponse.builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                        Boolean.TRUE))
                .draftings(result)
                .build());
    }
}
