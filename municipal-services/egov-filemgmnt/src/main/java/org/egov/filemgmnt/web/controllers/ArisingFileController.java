package org.egov.filemgmnt.web.controllers;

import java.util.List;

import org.egov.filemgmnt.service.ArisingFileService;
import org.egov.filemgmnt.util.FMUtils;
import org.egov.filemgmnt.util.ResponseInfoFactory;
import org.egov.filemgmnt.web.models.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.egov.filemgmnt.web.models.ArisingFileSearchResponse;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/v1")
public class ArisingFileController {
	
	
	 private final ResponseInfoFactory responseInfoFactory;
	 private final ArisingFileService arisingFileService;
	 
	 ArisingFileController(final ArisingFileService arisingFileService, final ResponseInfoFactory responseInfoFactory) {
	        this.arisingFileService = arisingFileService;
	        this.responseInfoFactory = responseInfoFactory;
	    }

	
	@PostMapping("/applicantservices/_createArisingFile")
    public ResponseEntity<ArisingFileResponse> createArisingFile(@RequestBody final ArisingFileRequest request) {
        if (log.isDebugEnabled()) {
            log.debug("ArisingFileRequest-create:  \n{}", FMUtils.toJson(request));
        }
        List<ArisingFile> arisingFileDetails = arisingFileService.createArisingFile(request);
       
        
        ArisingFileResponse response = ArisingFileResponse.builder()
        								.responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
        																						Boolean.TRUE))
        								.arisingFileDetail(arisingFileDetails)
        								.build();
        return ResponseEntity.ok(response);
    }




    @PostMapping("/applicantservice/_search")
    public ResponseEntity<ArisingFileSearchResponse> searchFile(@RequestBody final RequestInfoWrapper request,
                                                          @ModelAttribute final ArisingFileSearchCriteria searchCriteria) {
        if (log.isDebugEnabled()) {
            log.debug("ArisingFile-search:  \n{}", FMUtils.toJson(searchCriteria));
        }
        final List<ArisingFile> result = arisingFileService.searchFile(request.getRequestInfo(), searchCriteria);

        return ResponseEntity.ok(ArisingFileSearchResponse.builder()
                .responseInfo(responseInfoFactory.createResponseInfoFromRequestInfo(request.getRequestInfo(),
                        Boolean.TRUE))
                .arisingFileDetails(result)
                .build());
    }
}